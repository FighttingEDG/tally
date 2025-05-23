// 服务器错误提示
// 画个饼后期改成更好看的ui动画...
export const failBack = (info = '服务器错误') => {
  wx.showToast({
    title: info,
    icon: 'error',
  })
}