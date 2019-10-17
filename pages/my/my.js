import { BookModel } from "../../models/book";
import { ClassicModel } from "../../models/classic";

const bookModel = new BookModel();
const classicModel = new ClassicModel();

Page({
  data: {
    authorized: false,
    userInfo: null,
    bookCount: 0,
    classics: null
  },
  onLoad: function (options) {
    this.userAuthorized();
    this.getBookCount();
    this.getMyFavor();
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
  getMyFavor() {
    classicModel.getMyFavor(res => {
      this.setData({
        classics: res
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