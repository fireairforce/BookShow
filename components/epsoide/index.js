Component({
  properties: {
     index:{
       type: String,
       observer: function(newVal,oldVal,changePath){
         let val = newVal < 10 ? '0' + newVal : newVal;
         this.setData({
           _index: val 
         })
       }
     }
  },
  data: {
      year:0,
      month: '', 
      _index: '0'
  },
  methods: {

  },
  attached: function(){
   
  }
})
