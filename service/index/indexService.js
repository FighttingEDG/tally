import http from "../../utils/request/request.js";
// 请求记账列表
export const getRecord = function(uid){
  return http.get(`/api/tally/getRecord/${uid}`);
}