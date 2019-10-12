import { KeyWordModel } from '../../models/keyword';

const keywordModel = new KeyWordModel();

Component({
  properties: {

  },
  data: {
    historyWords: [],
    hotWords: []
  },
  attached() {
    const historyWords = keywordModel.getHistory();
    const hotwords = keywordModel.getHot();
    this.setData({
      historyWords
    })
    hotwords.then(res=>{
      // 获取到热评的数据
      this.setData({
         hotWords: res.hot  
      })
    })
  },
  methods: {
    onCancel(){
      this.triggerEvent('cancelSearch',{},{})
    },
    onConfirm(e) {
      // console.log(e.detail.value);
      const word = e.detail.value;
      keywordModel.addToHistory(word);
    }
  }
})
