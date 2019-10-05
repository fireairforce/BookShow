import { ClassicModel } from './../../models/classic';
import { LikeModel } from './../../models/like';
let classicModel = new ClassicModel();
let likeModel = new LikeModel(); 
Page({
  data: {
     test: 1,
     classicData:null,
     latest: true,
     first: false
  },
  onLoad: function (options) {
    // 获取到最新的数据
    classicModel.getLatest(res => {
      console.log(res);
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

  naviLeft: function() {

  },

  naviRight: function() {

  },

  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})