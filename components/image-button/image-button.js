// components/image-button/image-button.js
Component({
  // 允许使用插槽的操作
  options: {
    multipleSlots: true
  },
  properties: {
    openType: {
      type: String
    }
  },
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onGetUserInfo(e) {
      this.triggerEvent('getuserinfo',e.detail,{})
    }
  }
})
