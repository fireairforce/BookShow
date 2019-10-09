Page({
  data: {
    //  多个异步等待合并

  },
  onLoad: function (options) {
     // 使用promise来完成全部的作用
     const promise = new Promise((resolve, reject) => {
        // 用来返回异步信息  
       wx.getSystemInfo({
           success: (res) => {
              resolve(res);
           },
           fail: (err) => {
              reject(err);
           }
         })
     })
     promise.then(res=>{
       console.log(res); 
     }, (err) => {
       console.log(err);
     })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})