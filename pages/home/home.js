import { ClassicModel } from './../../models/classic';
import { LikeModel } from './../../models/like';
let classicModel = new ClassicModel();
let likeModel = new LikeModel(); 
Page({
  data: {
     classicData:null,
     latest: true,
     first: false
  },
  onLoad: function () {
    // 获取到最新的数据
    classicModel.getLatest(res => {
       this.setData({
         classicData:res
       }) 
    })
  },

  LikeClick: function (e) {
    const { id, type } = this.data.classicData; 
    let behavior = e.detail.behavior;
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
    let { index } = this.data.classicData;
    classicModel.getClassic(index,nextOrprevious,(res) => {
       this.setData({
         classicData:res,
         latest: classicModel.isLatest(res.index),
         first: classicModel.isFirst(res.index)
       })
    })
  }
})