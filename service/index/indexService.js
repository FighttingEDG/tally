import http from "../../utils/request/request.js";
// 请求记账列表
export const getRecord = function(uid){
  return http.get(`/api/tally/getRecord/${uid}`);
}

// 获取用户个人信息
export const getUser = function(uid){
  return http.get(`/api/tally/getUser/${uid}`);
}