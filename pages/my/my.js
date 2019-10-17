Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null
  },
  onLoad: function (options) {
    this.userAuthorized();
    // 弹窗
    // 询问是否授权
    // API
    // button 组件 UI 让用户主动点击button
  },
  userAuthorized () {
    wx.getSetting({
      success : res => {
       if(res.authSetting['scope.userInfo']) {
         wx.getUserInfo({
          success: (res) => {
            this.setData({
              authorized: true,
              userInfo: res.userInfo
            })
          }
         })
       } else {
         console.log(`用户暂时还未授权`);
       }
      }
    })
  },
  // bindGetUserInfo (e) {
    // console.log(e.detail.userInfo)
  // },
  onGetUserInfo (e) {
    const { userInfo } = e.detail;
    
    if(userInfo){
      console.log(userInfo);
      this.setData({
        userInfo,
        authorized: true
      })
    }
  }
})