import { HTTP } from './../../utils/http-p';

class BookModel extends HTTP {
    getHotList() {
        return this.request({
            url:`classic/hot_list`,
            method:'GET'
        })
    }
}

export { BookModel }