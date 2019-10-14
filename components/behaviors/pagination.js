const paginationBev = Behavior({
    data: {
        // 管理一个页面里面的所有数据
        dataArray: [],
        total: 0
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
          })
        },
        
        hasMore() {
           if(this.data.dataArray.length >= this.data.total) {
               return false;
           } else {
               return true;
           }
        }
    }
})

export { paginationBev }