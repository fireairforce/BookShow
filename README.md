## Notes
A application for mini-program

小程序爬坑日志.

## Introduction
+ components: 一些常用的组件的封装
+ pages: 一些页面文件
+ util:里面封装了`wx.request`请求函数
+ models:数据的请求都是写在这里

## Support
小程序里面不能使用`async/await`。

`wx.navigateTo()`可以帮助我们进行页面跳转

## tips
小程序的调试技巧有我们可以通过自定义编译条件来设定每次小程序启动时候指定的默认页面从而来方便我们每次刷新进行的调试。对于特定的页面还可以设置页面的参数传递。
