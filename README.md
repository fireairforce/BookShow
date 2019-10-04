## Notes 
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

### 数据显示
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

这么表示即可。