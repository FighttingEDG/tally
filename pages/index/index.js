import config from "../../utils/config/index"
import {
  getOpenid
} from "../../service/common.js"
import {
  getRecord,
  getUser,
  insertUser,
  getUserCount,
  putUserService
} from "../../service/index/indexService.js"
import {
  handleData
} from "../../utils/handle/fun.js";
Page({
  data: {
    // 用户openid
    userOpenid: '',
    // 记录列表
    recordList: [],
    // 月收入
    monthlyIncome: 0,
    // 支出总额
    disburseTotal: 0,
    // 弹出层显示
    sheetShow: false,
    // 时间选择器
    currentDate: new Date().getTime(),
    minDate: config.minDate, // 配置内2025.2.1
    dialogShow: false,
    earningValue: null
  },
  async onLoad() {
    // 刚开始获取一遍openid,并且存下来
    this.setData({
      userOpenid: await getOpenid()
    })
    // 存openid到数据库
    await this.insertUserService();
    // 先获取用户个人信息(月收入，默认12000)
    await this.getUserInfo(this.data.userOpenid)
    // 获取数据列表
    await this.getRecordList();
  },
  // 插入用户
  async insertUserService() {
    // 先查询用户是否存在
    const userRes = await getUserCount(this.data.userOpenid);
    // 404代表用户不存在
    if (userRes.code == 404) {
      await insertUser({
        uid: this.data.userOpenid
      });
    }
  },
  // 请求列表
  async getRecordList() {
    const res = await getRecord({
      uid: this.data.userOpenid,
      month: new Date(this.data.currentDate).getMonth() + 1,
      year: new Date(this.data.currentDate).getFullYear()
    });
    this.setData({
      recordList: this.formatRecordList(res.data)
    })
  },
  // 获取用户信息
  async getUserInfo(uid) {
    const res = await getUser(uid);
    this.setData({
      monthlyIncome: res?.data?.monthlyIncome || 0
    })
  },
  // 处理数据
  formatRecordList(list) {
    // 计算支付总额
    this.setData({
      disburseTotal: list.reduce((acc, curr) => acc + curr.amount, 0)
    })

    // 使用 reduce 按日期分组
    const groupedData = list.reduce((acc, item) => {
      const formatDate = handleData(item.time)

      // 如果该日期已存在，添加到数组中
      if (acc.find(x => Object.keys(x)[0] === formatDate)) {
        acc.forEach(obj => {
          if (Object.keys(obj)[0] === formatDate) {
            obj[formatDate].push({
              ...item
            });
          }
        });
      } else {
        // 如果该日期不存在，创建新的日期分组
        acc.push({
          [formatDate]: [{
            ...item
          }]
        });
      }
      return acc;
    }, []);
    return groupedData;
  },
  // 弹窗
  selectionTime() {
    this.setData({
      sheetShow: true
    })
  },
  // 点击遮罩
  // 关闭弹窗
  closeSheet() {
    this.setData({
      sheetShow: false
    })
  },
  // 选择日期后确定
  async onConfirm(event) {
    this.setData({
      currentDate: event.detail,
      sheetShow: false
    })
    await this.getRecordList();
  },
  // 编辑收入
  // 输入框改变事件
  onFieldChange(event) {
    this.setData({
      earningValue: event.detail
    })
  },
  // 关闭弹框
  onDialogClose() {
    this.setData({
      earningValue: this.data.monthlyIncome
    })
  },
  // 输入框确认
  async onDialogconfirm() {
    const res = await putUserService({
      uid: this.data.userOpenid,
      monthlyIncome: this.data.earningValue
    });
    if (res.code == 200) {
      this.setData({
        monthlyIncome: res.data.monthlyIncome
      })
      wx.showToast({
        title: '修改成功',
        icon: 'success'
      });
    } else {
      wx.showToast({
        title: res.message,
        icon: 'error'
      });
    }
  },
  async editClick() {
    this.setData({
      dialogShow: true,
      earningValue: this.data.monthlyIncome
    })
  },
});