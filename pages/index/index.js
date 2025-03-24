import {
  getOpenid
} from "../../service/common.js"
import {
  getRecord
} from "../../service/index/indexService.js"
import {
  handleData
} from "../../utils/handle/fun.js";
Page({
  data: {
    // 用户openid
    userOpenid: '',
    recordList: []
  },
  // 处理数据
  formatRecordList(list) {
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
  async onLoad() {
    // 获取openid    await getOpenid()
    // 获取数据列表
    await this.getRecordList(await getOpenid());
  },
  // 请求列表
  async getRecordList(uid) {
    const res = await getRecord(uid);
    this.setData({
      recordList: this.formatRecordList(res.data)
    })
    console.log(this.data.recordList)
  },

});