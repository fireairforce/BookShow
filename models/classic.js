import { HTTP } from './../utils/http';

class ClassicModel extends HTTP {
    getLatest (callBack) {
        this.request({
            url:`classic/latest`,
            success: (res) => {
                callBack(res);
                // 把最新的期刊号存进去
                this._setLatestIndex(res.index);
            }
        })
    }

    getClassic(index, nextOrprevious, callBack) {
        this.request({
            url: `classic/${index}/${nextOrprevious}`,
            success: (res) => {
                callBack(res)
            }
        })
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

    // 把最新的index数据写入到缓存里面去
    _setLatestIndex (index) {
        // 这个是同步写入缓存
        wx.setStorageSync('latest', index)
    }

    _getLatestIndex () {
        return wx.getStorageSync('latest');
    }
}

export { ClassicModel }