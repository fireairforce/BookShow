
Component({
  properties: {
    like: {
      type: Boolean,
      default: false
    },
    count: {
      type: Number,
    },
    readOnly: {
      type: Boolean
    }
  },
  data: {
    yesSrc:'./images/like.png',
    noSrc: './images/like@dis.png'
  },
  methods: {
    onLike:function (e) {
       if(this.properties.readOnly) {
         return;
       }
       let { like, count } = this.properties;
       count = like ? count - 1 : count + 1;
       this.setData({
         count,
         like: !like
       }) 
        // 发起一个自定义事件 
        let behavior = this.properties.like ? 'like' : 'cancel'
        // 在这里激活我们的自定义事件like
        this.triggerEvent('like',{
           behavior
        },{})
    }
    
  }
})
