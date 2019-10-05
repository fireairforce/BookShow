import { HTTP } from './../utils/http';

class ClassicModel extends HTTP {
    getLatest (callBack) {
        this.request({
            url:`v1/classic/latest`,
            success: (res) => {
                callBack(res);
            }
        })
    }
}

export { ClassicModel }