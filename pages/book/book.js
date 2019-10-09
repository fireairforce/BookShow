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