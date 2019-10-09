import { ClassicModel } from './../../models/classic';
import { LikeModel } from './../../models/like';
let classicModel = new ClassicModel();
let likeModel = new LikeModel(); 
Page({
  data: {
     classicData:null,
     latest: true,
     first: false,
     like_status:false,
     fav_nums: 0
  },
  onLoad: function () {
    // 获取到最新的数据
    classicModel.getLatest(res => {
       this.setData({
         classicData:res,
         like_status: res.like_status,
         fav_nums: res.fav_nums
       }) 
    })
    console.log(this.data);
  },

  LikeClick: function (e) {
    const { id, type } = this.data.classicData; 
    const behavior = e.detail.behavior;
    likeModel.like(behavior,id,type);
  },

  naviRight: function() {
    this._updateClassic('previous');
  },

  naviLeft: function() {
    this._updateClassic('next');
  },

  //  通过这个地方来更新每次点击下一页的数据
  _updateClassic: function (nextOrprevious) {
    const { index } = this.data.classicData;
    classicModel.getClassic(index,nextOrprevious,(res) => {
      this._getLikeStatus(res.id,res.type); 
      this.setData({
         classicData:res,
         latest: classicModel.isLatest(res.index),
         first: classicModel.isFirst(res.index)
       })
    })
  },

  _getLikeStatus: function (artID,category) {
    likeModel.getClassicLikeStatus(artID, category, (res) => {
      this.setData({
        like_status: res.like_status,
        fav_nums: res.fav_nums
      })
    })
  }
})