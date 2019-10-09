import { BookModel } from '../../models/book';
const bookmodel = new BookModel();
Page({
  data: {
    //  多个异步等待合并

  },
  onLoad: function (options) {
    bookmodel.getHotList().then(res => {
      console.log(res);
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