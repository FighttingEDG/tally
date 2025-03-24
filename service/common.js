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
        url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + 'wx5ab2c4deb0853e2f' + '&secret=' + 'fe3dca94d1fa72b5f74a893781320e93' + '&js_code=' + loginRes.code + '&grant_type=authorization_code',
        method: 'GET',
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
    wx.showToast({
      title: '登录失败',
      icon: 'error'
    });
    return null;
  }
}