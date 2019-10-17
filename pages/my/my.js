import { BookModel } from "../../models/book";

const bookModel = new BookModel();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0
  },
  onLoad: function (options) {
    this.userAuthorized();
    this.getBookCount();
    // 弹窗
    // 询问是否授权
    // API
    // button 组件 UI 让用户主动点击button
  },
  getBookCount(){
    bookModel.getMyBookCount().then(res=> {
      this.setData({
        bookCount: res.count
      })
    })
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
  },
  onJumpToAbout (e) {
    wx.navigateTo({
      url: '/pages/about/about',
    })
  },
  onStudy (e) {
    wx.navigateTo({
      url: '/pages/course/course',
    })
  }
})