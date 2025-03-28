import http from "../../utils/request/request.js";
// 插入用户
export const insertUser = function (obj) {
  return http.post(`/api/tally/insertUser`, obj);
}

// 请求记账列表
export const getRecord = function (obj) {
  return http.post(`/api/tally/getRecord`, obj);
}

// 查询用户是否存在
export const getUserCount = function (uid) {
  return http.get(`/api/tally/getUserCount/${uid}`);
}

// 获取用户个人信息
export const getUser = function (uid) {
  return http.get(`/api/tally/getUser/${uid}`);
}

// 修改用户信息
export const putUserService = function (obj) {
  return http.put(`/api/tally/putUser`, obj);
}