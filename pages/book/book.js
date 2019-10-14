import { BookModel } from '../../models/book';
import { random } from '../../utils/randomString';
const bookmodel = new BookModel();
Page({
  data: {
   searching: false, 
   books:[],
   more: ''
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
  onSearch() {
    this.setData({
      searching: true
    })
  },
  onCancel() {
    this.setData({
      searching:false
    })
  },
  onReachBottom() {
    this.setData({
      more: random(16)
    })
  }
})