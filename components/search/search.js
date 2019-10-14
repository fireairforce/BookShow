import { KeyWordModel } from '../../models/keyword';
import { BookModel } from '../../models/book';

const keywordModel = new KeyWordModel();
const bookModel = new BookModel();

Component({
  properties: {
    more:{
      type: String,
      // 在more这个值发生改变的时候会执行这个监听
      observer: '_load_more'
    },
  },
  data: {
    historyWords: [],
    hotWords: [],
    dataArray: [],
    searching: false,
    searchText: '',
    loading: false,
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
    _load_more() {
       if(!this.data.searchText) {
         return;
       }
      //  同时发送两个请求,一次只发送一个请求，形成一个锁
      if(this.data.loading) {
        return;
      }
       const { length } = this.data.dataArray;
       this.data.loading = true;
       bookModel.search(length, this.data.searchText).then(res=> {
          const tempArray = this.data.dataArray.concat(res.books);
          this.setData({
            dataArray: tempArray,
            loading: false
          })
       })
    },
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
      this.setData({
        searching: false
      })
    }
  }
})
