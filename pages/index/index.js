import {
  getOpenid
} from "../../service/common.js"
import {
  getRecord
} from "../../service/index/indexService.js"

Page({
  data: {
    // 用户openid
    userOpenid: '',
    recordList: []
  },
  async onLoad() {
    const userOpenid = await getOpenid();
    if (userOpenid) {
      this.setData({ userOpenid });
      await this.getRecordList();
    } else {
      wx.showToast({
        title: '登录失败',
        icon: 'error'
      });
    }
  },
  // 请求列表
  async getRecordList() {
    const res = await getRecord(12);
    // console.log(res)
  },
});