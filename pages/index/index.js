// 首页逻辑区域
import { getRecord } from "../../service/index/indexService.js"
// 请求列表
async function getList() {
    const res = await getRecord(12);
    console.log(res);
}

Page({
  data: {
  },
});