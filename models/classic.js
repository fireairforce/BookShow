import { HTTP } from './../utils/http';

class ClassicModel extends HTTP {
    getLatest (callBack) {
        this.request({
            url:`classic/latest`,
            success: (res) => {
                callBack(res);
            }
        })
    }
}

export { ClassicModel }