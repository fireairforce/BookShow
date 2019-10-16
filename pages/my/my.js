Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  onLoad: function (options) {
    wx.getUserInfo({
      // 只有用户授权之后才能获取到数据
      success: res => {
        console.log(res);
      }
    });
    // 弹窗
    // 询问是否授权
    // API
    // button 组件 UI 让用户主动点击button
  },
  bindGetUserInfo (e) {
    // console.log(e.detail.userInfo)
  }
})