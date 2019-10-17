import { HTTP } from './../utils/http';

class ClassicModel extends HTTP {
    getLatest (callBack) {
        this.request({
            url:`classic/latest`,
            success: (res) => {
                callBack(res);
                // 把最新的期刊号存进去
                this._setLatestIndex(res.index);
                let key = this._getKey(res.index);
                wx.setStorageSync(key, res);
            }
        })
    }

    getClassic(index, nextOrprevious, callBack) {
        // 所有的页面数据获取都会在这里，所以这里可以写个缓存
        let key = nextOrprevious === 'next' ? this._getKey(index + 1 ) : this._getKey(index - 1 );
        let classic = wx.getStorageSync(key);
        if(!classic){
            this.request({
                url: `classic/${index}/${nextOrprevious}`,
                success: (res) => {
                    // 将缓存存取进去
                    wx.setStorageSync(this._getKey(res.index),res);
                    callBack(res)
                }
            })
        } else {
            callBack(classic);
        }
    }

    // 判断是否是第一期期刊
    isFirst(index) {
        return index === 1 ? true : false;
    }
    //   判断是否为最新一期的期刊,这里的逻辑可能会有点复杂
    isLatest(index) {
      let latest = this._getLatestIndex();
      return latest === index ? true : false;
    }

    getMyFavor(success) {
        const params = {
            url: `classic/favor`,
            success:success,
        }
        this.request(params);
    }
     
    // 把最新的index数据写入到缓存里面去
    _setLatestIndex (index) {
        // 这个是同步写入缓存
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex () {
        return wx.getStorageSync('latest');
    }

    _getKey (index) {
        let key = `classic-${index}`;
        return key;
    }
}

export { ClassicModel }