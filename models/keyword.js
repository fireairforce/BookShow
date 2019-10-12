class KeyWordModel {
    key = 'q';
    maxLength = 10;
    getHistory() {
       const words = wx.getStorageSync(this.key);
       if(!words) {
           return [];
       } 
       return words;
    }

    getHot() {
       
    }

    addToHistory(keyword) {
        let words = this.getHistory();
        const has = words.includes(keyword);
        // 队列
        if(!has){
            // 超过10了把数组末尾删了，再把这次的添加进去
            const length = { words };
            if(length >= this.maxLength) {
                words.pop();
            }
            words.unshift(keyword);
            wx.setStorageSync(this.key, words)
        }
    }
}

export { KeyWordModel }
