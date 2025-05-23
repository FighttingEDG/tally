// 数据共享层
// 所有接口方法只返回数据(且直接返回最顶层)
import http from "../../utils/request/request.js";
// 查询用户是否存在
export const getUserCount = async function (uid) {
  try {
    const res = await http.get(`/api/tally/getUserCount/${uid}`);
    res.status = 'success'
    return res;
  } catch (error) {
    // 错误是没有res返回的
    // 不做处理
    console.error(error)
  }
}
// 插入用户
export const insertUser = function (obj) {
  return http.post(`/api/tally/insertUser`, obj);
}
// 请求记账列表
export const getRecord = function (obj) {
  return http.post(`/api/tally/getRecord`, obj);
}



// 获取用户个人信息
export const getUser = function (uid) {
  return http.get(`/api/tally/getUser/${uid}`);
}

// 修改用户信息
export const putUserService = function (obj) {
  return http.put(`/api/tally/putUser`, obj);
}