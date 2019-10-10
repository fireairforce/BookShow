// components/book/book.js
Component({
  properties: {
    book:{
      type:Object
    }
  },
  data: {

  },
  methods: {
    onTap (e) {
      const { id } = this.properties.book;
      this.triggerEvent('navigateBook',{
        id
      })
      // wx.navigateTo({
      //   url: `/pages/book-detail/book-detail?id=${id}`,
      // })   
    }
    // 路由跳转写在组件里面会降低组件的通用性
    // 但是非常方便
    // 我们可以使用父组件来监听这个子组件的事件,这里我是抽离了
  }
})
