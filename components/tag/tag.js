// components/tag/tag.js
Component({
  // 启动插槽slot的配置
  options: {
    multipleSlots: true
  },
  // 用来设定外部样式的，小程序的专有api
  externalClasses: ['tag-class'],
  properties: {
    text: String,
  },
  data: {

  },
  methods: {
    onTap(e) {
       this.triggerEvent('tapping',{
         text: this.properties.text
       })
    }
  }
})
