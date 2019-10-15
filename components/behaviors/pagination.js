const paginationBev = Behavior({
    data: {
        // 管理一个页面里面的所有数据
        dataArray: [],
        total: null,
        noneResult: false,
        loading: false
    },
    methods: {
        //  用来加载更多的数据
        setMoreData (dataArray) {
           const tempArray = this.data.dataArray.concat(dataArray);
           this.setData({
               dataArray: tempArray
           })
        },

        getCurrentStart () {
            return this.data.dataArray.length;
        },

        setTotal (total) {
          this.setData({
              total
          },()=>{
              if(total ===0) {
                  this.setData({
                      noneResult: true,
                  })
              }
          })
        },
        
        hasMore() {
           if(this.data.dataArray.length >= this.data.total) {
               return false;
           } else {
               return true;
           }
        },

        initialize () {
            this.setData({
                dataArray: [],
                noneResult: false,
                loading: false
            })
            this.data.total = null;
        },

        _isLocked () {
          return this.data.loading ? true : false;
        },
        _locked () {
            this.setData({
                loading: true,
            })
        },
        _unlocked () {
            this.setData({
                loading: false
            })
        },
    }
})

export { paginationBev }