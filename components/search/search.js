import { KeyWordModel } from '../../models/keyword';
import { BookModel } from '../../models/book';

const keywordModel = new KeyWordModel();
const bookModel = new BookModel();

Component({
  properties: {

  },
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    searchText: ''
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
      this.setData({
        searching: true
      })
      // 在这里想服务器请求相关书籍的数据,text是标签
      const q = e.detail.value || e.detail.text;
      if(!e.detail.value){
        this.setData({
          searchText: q
        })
      }
      bookModel.search(0, q).then(res=>{
        this.setData({
          dataArray: res.books
        })
        keywordModel.addToHistory(q);
      })
    },
    onDelete(e) {
      console.log(`hhh`);
      this.setData({
        searching: false
      })
    }
  }
})
