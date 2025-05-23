import config from '../config/index.js'
import {
  failBack
} from '../request/failRequest'
// 非200状态码统一处理
// 请求方法封装
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.baseUrl}:${config.port}${options.url}`,
      // 默认get方法
      method: options.method || 'GET',
      // 无数据就传空对象
      data: options.data || {},
      header: {
        'content-type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.data.code === 200) {
          resolve(res.data)
        } else {
          failBack(res.data.message)
          reject(res)
        }
      },
      fail: (err) => {
        // 错误统一报服务器错误
        failBack();
        reject(res)
      }
    })
  })
}

// 封装常用请求方法
const http = {
  // 以函数方式定义对象，调用封装的request
  get: (url, data) => request({
    url,
    data
  }),
  post: (url, data) => request({
    url,
    data,
    method: 'POST'
  }),
  put: (url, data) => request({
    url,
    data,
    method: 'PUT'
  }),
  delete: (url, data) => request({
    url,
    data,
    method: 'DELETE'
  })
}

export default http