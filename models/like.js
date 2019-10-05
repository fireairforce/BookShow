import { HTTP } from './../utils/http';

class LikeModel extends HTTP {
    like (behavior,artId,type) {
        let url = behavior === 'like' ? 'like' : 'like/cancel'
        this.request({
           url,
           method: 'POST',
           data: {
               art_id:artId,
               type
           }
        })
    }
}

export { LikeModel }