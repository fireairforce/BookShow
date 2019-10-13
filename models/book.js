import { HTTP } from '../utils/http-p';

class BookModel extends HTTP {
    // 获得书籍的列表装填
    getHotList() {
        return this.request({
            url:`book/hot_list`,
            method:'GET'
        })
    }
    // 获得每个书籍的阅读人数
    getMyBookCount() {
        return this.request({
            url: `/book/favor/count`
        })
    }

    getDetail(id) {
        return this.request({
            url: `book/${id}/detail`
        })
    }
   
    // 获得喜欢的状态
    getLikeStatus(id) {
        return this.request({
            url: `book/${id}/favor`
        })
    }

    // 获得某个书籍的评论
    getComment(id) {
        return this.request({
            url: `book/${id}/short_comment`
        })
    }

    // 提交短评
    postComment(id, comment) {
        return this.request({
            url: `book/add/short_comment`,
            method: 'POST',
            data: {
                book_id: id,
                content: comment
            }
        })
    }

    search(start, q) {
        return this.request({
            url: `book/search?summary=1`,
            data:{
                q,
                start
            }
        })
    }
}

export { BookModel }