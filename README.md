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

小程序里面也有和`vue`一样的插槽`slot`概念:

比如说我们在一个组件(`v-tag`组件)里面使用插槽:

```js
<view class="container">
    <text>{{ text }}</text>
    <!-- <text>{{ num }}</text> -->
    <!-- 从组件外部传递进来，类似于react的props.children -->
    <slot name="after"></slot>
</view>
```
同样在组件的`js`文件里面添加一些相关的配置:
```js
options: {
  multipleSlots: true
},
```


然后我们去调用这个组件的时候
```js
<view>
 <v-tag>
   <text slot="after">这个插槽会放到after那里去</text>
 </v-tag>
</view>
```
这样就修改成功了。

通过在父组件里面使用选择器`css`样式来设定对应列表组件的样式(在组件是列表组件的情况下):
```css
/* 使用子元素选择器来使选择更加精准从而使得避免安全问题 */
.comment-container > v-tag:nth-child(1) > view{
    background-color: #fffbdd;
}

.comment-container > v-tag:nth-child(2) > view{
    background-color: #eefbff;
}
```