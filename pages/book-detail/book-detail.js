import { BookModel } from '../../models/book';
import { LikeModel } from '../../models/like';
const bookmodel = new BookModel();
const likeModel = new LikeModel();
Page({
  data: {
    comments: [],
    detail: null,
    likeStatus: false,
    likeCount: 0
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
  }
})