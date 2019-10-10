import { BookModel } from '../../models/book';
const bookmodel = new BookModel();
Page({
  data: {
   books:[]
  },
  onLoad: function (options) {
    bookmodel.getHotList().then(res => {
      this.setData({
        books:res
      })
    })
  },
  onTap (e) {
    const { id } = e.detail;
    wx.navigateTo({
        url: `/pages/book-detail/book-detail?id=${id}`,
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