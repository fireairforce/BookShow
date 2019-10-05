// 封装一波请求函数
import { config } from './../config';

const tips = {
    1: '抱歉，出现错误了',
   1005: 'appKey无效，请重新获取',
   3000: '期刊不存在'
}
export class HTTP {
    request (params) {
       if(!params.method){
           params.method = 'GET';
       }
       wx.request({
           url: `${config.baseURL}/${params.url}`,
           method: params.method,
           data: params.data,
           header: {
               'content-type':'application/json',
               'appKey': config.appKey
           },
          //    请求成功了
          success: (res) => {
            let code = res.statusCode.toString();
            if(code.startsWith(`2`)){
                // 把参数返回到res函数里面去
                params.success && params.success(res.data);
            } else {
               let error_code = res.data.error_code;
               this._show_error(error_code);
            }
          },
          //   请求失败在这里处理(api调用失败在这里处理)
          fail: (err) => {
            //   请求失败直接用默认的错误处理即可
            this._show_error(1);
          }
        })
    }
    // 这里定义一个私有的方法
    _show_error(error_code = 1){
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}
