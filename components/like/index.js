// components/like/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    like: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
    }
  },
  data: {
    yesSrc:'./images/like.png',
    noSrc: './images/like@dis.png'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLike:function (e) {
       let { like, count } = this.properties;
       count = like ? count - 1 : count + 1;
       this.setData({
         count,
         like: !like
       }) 
    }
  }
})
