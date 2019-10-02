//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello,zoomdong!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  // 进入调试日志页面
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindMyViewTap: function() {
    wx.navigateTo({
      url:'/pages/index/helloWorld'
    })
  },
  redclick:function(sender){
    wx.showModal({
      title: '点击红色',
      content: '',
    });
    console.log(sender);
  },
  remove: function(sender){
    console.log(sender);
    console.log(sender.changeTouches[0].pageX);
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  formSubmit: function(e){
    console.log(e.detail.value);
  },
  formReset: function(){
    console.log(`发生了一波重置`);
  }
})


