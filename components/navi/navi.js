Component({
  data: {
    disLeftSrc:'images/triangle.dis@left.png',
    leftSrc:'images/triangle@left.png',
    disRightSrc:'images/triangle.dis@right.png',
    rightSrc:'images/triangle@right.png',
  },
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean
  },
  methods: {
    onLeft: function(e) {
      // 如果这个属性不是最新的话
       if(!this.properties.latest){
        this.triggerEvent('left',{},{})  
       }
    },

    onRight: function (e) {
      if(!this.properties.first){
        this.triggerEvent('right',{},{})        
      }
    }
  }
})