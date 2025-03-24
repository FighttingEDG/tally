import {
  getOpenid
} from "../../service/common.js"
import {
  getRecord,
  getUser
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
    disburseTotal: 0
  },

  async onLoad() {
    // 刚开始获取一遍openid,并且存下来
    this.setData({
      userOpenid: await getOpenid()
    })
    // 先获取用户个人信息(月收入，默认12000)
    await this.getUserInfo(this.data.userOpenid)
    // 获取数据列表
    await this.getRecordList(this.data.userOpenid);
  },
  // 请求列表
  async getRecordList(uid) {
    const res = await getRecord(uid);
    this.setData({
      recordList: this.formatRecordList(res.data)
    })
  },
  // 获取用户信息
  async getUserInfo(uid) {
    const res = await getUser(uid);
    this.setData({
      monthlyIncome: res.data.monthlyIncome
    })
  },
  // 处理数据
  formatRecordList(list) {
    // 计算支付总额
    this.setData({
      disburseTotal: list.reduce((acc, curr) => acc + curr.amount, 0)
    })
    // 处理时间格式并按时间倒序排序
    const sortedList = list.sort((a, b) => new Date(b.time) - new Date(a.time));

    // 使用 reduce 按日期分组
    const groupedData = sortedList.reduce((acc, item) => {
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
});