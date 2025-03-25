import http from "../../utils/request/request.js";
// 请求记账列表
export const getRecord = function(obj){
  return http.post(`/api/tally/getRecord`,obj);
}

// 获取用户个人信息
export const getUser = function(uid){
  return http.get(`/api/tally/getUser/${uid}`);
}