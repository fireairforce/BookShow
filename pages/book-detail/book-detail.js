import { BookModel } from '../../models/book';
import { LikeModel } from '../../models/like';
const bookmodel = new BookModel();
const likeModel = new LikeModel();
Page({
  data: {
    comments: [],
    detail: null,
    likeStatus: false,
    likeCount: 0,
    posting: false
  },
  onLoad: function (options) {
     const { id } = options;
     const detail = bookmodel.getDetail(id);
     const comments = bookmodel.getComment(id);
     const likeStatus = bookmodel.getLikeStatus(id);
     
     detail.then(res => {
       this.setData({
          detail: res
       })
     })

     comments.then(res => {
       this.setData({
          comments: res.comments
       })
     })

     likeStatus.then(res => {
       this.setData({
         likeStatus: res.like_status,
         likeCount: res.fav_nums
       })
     })
  },

  onLike (e) {
    const like_or_cancel = e.detail.behavior;
    likeModel.like(like_or_cancel, this.data.detail.id, 400)
  },

  onFakePost() {
     this.setData({
       posting: true
     })
  },

  onCancel() {
    this.setData({
      posting: false
    })
  },

  onPost(e) {
    const comment = e.detail.text;
    //  设置一个长度检测
    if(comment.length > 12) {
      wx.showToast({
        title: '短评最多12个字',
        icon: 'none'
      })
      return
    }

    bookmodel.postComment(this.data.detail.id,comment).then(res => {
      wx.showToast({
        title: '+1',
        icon: 'none'
      })
      // 把评论往数组的前面插入
      this.data.comments.unshift({
        comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments
      })
    })
  }
})