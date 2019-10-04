## 布局 
迫于生计开始写小程序.

小程序重要的东西有布局:
使用的是`flex`布局,这点很重要的。

`justify-content`和`align-items`一个表示水平轴一个表示交叉轴，但是这两者的话都没有一个绝对的主轴，这点是要根据`flex-direction`的设定来确定的，`flex-direction`为`row`那么水平方向的就为主轴,另外一个为交叉轴，如果为`column`，那么垂直方向的就为主轴,另外一个为交叉轴。

当然如果加了`reverse`之后交叉轴的方向就得换个参照点了。

组件的使用可以参考页面里面的`json`里面的相关配置
```json
 "usingComponents": {}
```

小程序用`px`做单位的话，会直接乘以二去换算，所以一般使用`rpx`来作为单位(`rpx`尺寸是按照`1:1`来进行换算的),同时`rpx`是可以针对不同的机型去进行一个自适应。

字体的大小可能需要使用`px`(可能没必要使用随着机型去进行放大。)

小程序里面做适应的两个神器:
- flex
- rpx

设置全局样式在`app.wxss`里面的`page`里面设置就可以了，不需要自己去设置，现在大部分样式都可以继承下来了。

组件最好不要留有空白间距。

## 数据显示
数据的来源
- WXML
- JS->WXML
- 服务器->JS->WXML

数据绑定 组件内部的数据放在`js`文件里面的`data`里面去,然后`wxml`去调用的时候`{{ name }}`这样表示即可。 

三元表达式这样调用即可:
```js
<text>{{ like ? count1 : count2 }}</text>
```

如果我们想要在一个图片里面这么玩的话，可以把`src`的值封装成变量即可。
```js
<image src="{{ like ? yesSrc : noSrc }}" />
```
```js
data: {
    like: false,
    count1: 99,
    count2: 999,
    yesSrc:'./images/like.png',
    noSrc: './images/like@dis.png'
},
```

这么表示即可。里面`properties`里面可以指定使用一些组件外部能够操作的数据，就如上面`like`和`count`肯定是要外部能够操作的,我们就需要把这些属性发在`properties`里面去就可以了

```js
  properties: {
    like: {
      type: Boolean,
    },
    count: {
      type: Number,
    }
  },
  data: {
    yesSrc:'./images/like.png',
    noSrc: './images/like@dis.png'
  },
```

事件的定义在`methods`里面去拿数据就可了。

然后我们去给里面绑定一个事件(注意学习一波这里取数据的方法是可以使用`es6`的,修改数据使用的是类似于`react`里面的那套`api`):
```js
methods: {
    onLike:function (e) {
       let { like, count } = this.properties;
       count = like ? count - 1 : count + 1;
       this.setData({
         count,
         like: !like
       }) 
       console.log(e);
    }
  }
```

这里注意到小程序里面的一些事件(这里以`like`组件作为例子)，我们都是写在`methods`里面的。如果我们想调用这个绑定这个事件到`wxml`里面去的话，使用小程序相对应的语法即可(`bind:tap="onLike"`):

```js
<!-- image组件是有默认的宽和高的 -->
<view class="container" bind:tap="onLike">
   <image src="{{ like ? yesSrc : noSrc }}" />
   <text>{{ count }}</text>
</view>
```

## 生命周期函数
利用小程序来访问`API`数据,还是和之前的框架(例如`react`,`vue`)一样，我们需要一个生命周期函数.

一般我们创建一个页面里面的`js`文件里面都会帮我们默认写好生命周期函数。

生命周期函数的概念是和`react`,`vue`里面的生命周期函数没有区别的。

一般我们发送请求的数据都会放在`onLoad()`这个生命周期函数之类，这个生命周期函有点类似于`react`里面被移除的一个`API`叫做`componentWillMount`,但是这里我们一般都把请求写在这里(毕竟小程序没有`react`那么多的东西要去拓展。。。)

### onLoad
我们在这个地方进行数据请求的话，我们会使用`wx.request()`这个函数去进行一个`api`的调用。相关文档参考[这里](https://developers.weixin.qq.com/miniprogram/dev/framework/app-service/api.html#API)

使用的话大概是这个样子为:

```js
  onLoad: function (options) {
    wx.request({
      url: 'http://bl.7yue.pro/v1/classic/latest',
      // res是服务器返回给我们的数据,在success这个里面能拿到
      success: function(res){
        console.log(res);
      }
    })
  },
```

对于开发过程中产生的无法校验的`http`接口的情况的话，我们可以在小程序开发者工具里面关闭掉关于`http`校验的相关操作。`wx.request()`这里也和`axios`一样，这里就是个异步函数。所以想拿到值，我们需要自己来操作一下(上面就是一种操作)。

回调函数有个缺陷就是，在回调函数的外面`this`是有值的，比如`success`这个函数的外面是可以抓到值的，但是到`success`里面使用`this.data.xxx`去拿`data`里面的数据是拿不到的。这个时候我们把`this`赋值一下就ok了.`let self = this`(就是之前那种传统的方法)，当然这里我们用箭头函数就OK了

```js
success:(res) => {
    console.log(res);
}
```