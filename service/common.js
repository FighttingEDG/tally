// 获取openid
export const getOpenid = async function () {
  try {
    // 先从本地存储获取
    const storageOpenid = wx.getStorageSync('openid');
    if (storageOpenid) {
      return storageOpenid;
    }

    // 本地没有则重新获取
    const loginRes = await wx.login();
    if (loginRes.code) {
      wx.request({
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        method: 'GET',
        data: {
          appid: 'wx5ab2c4deb0853e2f',
          secret: 'fe3dca94d1fa72b5f74a893781320e93',
          js_code: loginRes.code,
          grant_type: 'authorization_code'
        },
        success(res) {
          if (res?.data?.openid) {
            // 存储到本地
            wx.setStorageSync('openid', res.data.openid);
            return res.data.openid;
          }
        }
      });
    }
    return null;
  } catch (error) {
    console.error('获取openid失败：', error);
    return null;
  }
}
export const openid = async function () {
  // 封装成方法，直接返回openid就可以了
  const loginRes = await new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    });
  });
  console.log(loginRes)
  // loginRes登陆状态及code
  if (loginRes?.code) {
    // openid及其他
    const openidRes = await getOpenid(loginRes.code);
    if (openidRes?.data?.openid) {
      return openidRes.data.openid;
    }
  }
}


// 请求记账列表
export const getAccessToken = function (code) {
  return wx.request({
    url: 'https://api.weixin.qq.com/cgi-bin/token',
    data: {
      code
    }
  })
}