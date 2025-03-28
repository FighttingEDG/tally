import config from '../config/index.js'

// 请求方法封装
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${config.baseUrl}:${config.port}${options.url}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'content-type': 'application/json',
        ...options.header
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res)
        }
      },
      fail: (err) => {
        reject(err)
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