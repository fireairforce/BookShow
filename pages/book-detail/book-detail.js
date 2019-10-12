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
  // 在这个组件这边数据请求过程中添加一个loading函数
  onLoad: function (options) {
     const { id } = options;
     const detail = bookmodel.getDetail(id);
     const comments = bookmodel.getComment(id);
     const likeStatus = bookmodel.getLikeStatus(id);
      // 把多个promise实例合并起来去进行执行,它会返回一个新的promise,三个promise全部完成之后才会执行then方法的回调
     wx.showLoading();     
      Promise.all([detail, comments, likeStatus]).then(res=>{
       this.setData({
         detail: res[0],
         comments: res[1].comments,
         likeStatus: res[2].like_status,
         likeCount: res[2].fav_nums
       },()=>{
        wx.hideLoading();
       })
     }) 

    //  detail.then(res => {
    //    this.setData({
    //       detail: res
    //    })
    //  })
    //  comments.then(res => {
    //    this.setData({
    //       comments: res.comments
    //    })
    //  })
    //  likeStatus.then(res => {
    //    this.setData({
    //      likeStatus: res.like_status,
    //      likeCount: res.fav_nums
    //    })
    //  })

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
    const comment = e.detail.text ||  e.detail.value;
    // 获取到text输入的value值
    //  设置一个长度检测

    if(!comment) {
      return;
    }

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
        content:comment,
        nums: 1
      })
      this.setData({
        comments: this.data.comments,
        posting: false
      })
    })
  }
})