import { KeyWordModel } from '../../models/keyword';
import { BookModel } from '../../models/book';
import { paginationBev } from '../behaviors/pagination';

const keywordModel = new KeyWordModel();
const bookModel = new BookModel();

Component({

  behaviors: [ paginationBev ],
  properties: {
    more:{
      type: String,
      // 在more这个值发生改变的时候会执行这个监听
      observer: 'loadMore'
    },
  },
  data: {
    historyWords: [],
    hotWords: [],
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
    loadMore() {
       if(!this.data.searchText) {
         return;
       }
      //  同时发送两个请求,一次只发送一个请求，形成一个锁
      if(this._isLocked()) {
        return;
      }
       if(this.hasMore()){
         this._locked();
         bookModel.search(this.getCurrentStart(), this.data.searchText)
          .then(res=> {
            // const tempArray = this.data.dataArray.concat(res.books);
            this.setMoreData(res.books); 
            this._unlocked();
            // this.setData({
            //   dataArray: tempArray,
            //   loading: false
            // })
          })
       }
    },
    onCancel(){
      this.triggerEvent('cancelSearch',{},{})
    },
    onConfirm(e) {
      this._showResult();
      this.initialize();
      // 在这里想服务器请求相关书籍的数据,text是标签
      const q = e.detail.value || e.detail.text;
      if(!e.detail.value){
        this.setData({
          searchText: q
        })
      }
      bookModel.search(0, q).then(res=>{
        // 将获取数据的行为交到behaviors里面去进行管理
        this.setMoreData(res.books);
        this.setTotal(res.total);
        keywordModel.addToHistory(q);
      })
    },
    onDelete() {
      this._closeResult();
    },
    _showResult () {
      this.setData({
        searching: true
      })
    },
    _closeResult () {
      this.setData({
        searching: false
      })
    },
    _isLocked () {
      return this.data.loading ? true : false;
    },
    _locked () {
      this.data.loading = true;
    },
    _unlocked () {
      this.data.loading = false;
    },
  }
})
