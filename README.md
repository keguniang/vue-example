# 一个网络商城

## [主流开源协议之间有何异同？](https://www.zhihu.com/question/19568896)

git init 创建本地仓储

## 用传统方式把修改过后的代码上传到git?
1. git add .
2. git commit -m "提交信息"
3. git push

### 现在可以使用vs默认集成的git工具进行添加，提交和推送，直接鼠标点点点就可以了

## 制作首页App组件
1. 完成Header区域，使用的是Mint-UI中的Header组件
2. 只做底部的Tabbar区域，使用的是MUI中的Tabbar.html
 + 在制作购物车小图标的时候，操作会相对多一些
 + 先把扩展图表的css样式，拷贝到项目中
 + 拷贝 扩展字体库的 ttf 文件拷贝到项目中
 + 为购物车小图标添加如下样式  `mui-icon mui-icon-extra mui-icon-extra-cart`
3. 要在中间区域放置组件router-view 来展示路由匹配到的组件

## 改造tabbar 为 router-link 并修改router-link的 to 属性

## 设置路由高亮
+ 在路由对象中修改vue自动高亮的类名 `linkActiveClass: 'mui-active'`//覆盖默认的路由高亮的类router-link-active

## 点击tabbar中的路由链接，展示对应的路由组件
 + 创建4个组件，并在router中引入组件并配置路由规则，最后在app.vue中放置router-view

## 制作首页轮播图布局 
 + 采用Mint-UI的轮播图，放在HomeCantainer.vue中，需要自己设置轮播图的宽高才可显示，再设置每个轮播图mint-swipe-item的背景颜色

 ## 加载首页轮播图数据
 1. 加载数据，使用vue-resource
 2. 使用vue-resource的this.$http.get获取数据,获取回来的数据保存在response.body上
 3. 获取到的数据，保存到data的this.lunbotuList上
 4. 使用v-for 循环渲染每个item

 ## 改造 九宫格 区域的样式
更改背景颜色，边框，把图标改成图片，图片大小

## 改造 新闻资讯 路由链接
1. 把a链接改为router-link
2. 添加新闻列表组件

## 新闻资讯 页面 制作
1. 绘制界面，使用MUI中的media list(图文列表)
2. 使用 vue-resource 获取数据
3. 渲染真实数据

## 实现 新闻资讯列表 点击跳转到新闻详情
1.把列表中的每一项改造为 router-link ，同时在跳转的时候应该提供唯一的ID标识符  <router-link :to="'/home/newsinfo/' + item.id" >
2.创建新闻详情的组件页面
3.在路由模块中，将新闻详情的路由地址和组件页面对应起来

## 实现 新闻详情 的页面布局和 数据渲染

## 单独封装一个 comment.vue 评论子组件
1. 先创建一个单独的 comment.vue 组件模板
2. 在需要使用 comment组件的页面中，先动手导入 comment 组件   
 + ` import comment from './comment.vue'`
3. 在父组件中，使用 `coponents`属性，将刚才导入的 comment组件，注册为自己的子组件
4. 将注册子组件时候的注册名称以标签的形式在页面中引用即可

## 获取所有的评论数据并循环渲染到页面中去
getcommentinfo()

## 实现点击加载更多的功能
1. 为加载更多按钮绑定点击事件，在事件中让页数加1
2. 加1后重新调用this.getcommentinfo()方法获取最新一页的数据
3. 为了防止上一页数据被下一页数据覆盖的情况，我们再点击加载更多的时候，应该上老数据拼接上新一页的数据，数组的拼接方法是concat()

## 发表评论
1. 把文本框做双向数据绑定
2. 为发表按钮绑定点击事件
3. 校验评论内容是否为空，如果为空则Toast提示内容为空
4. 通过vue-resource 发送一个请求，把评论内容提交给服务器
5. 当发表评论成功后，重新刷新列表，以查看最新的评论
 + 如果调用 getcommentinfo 方法重新刷新评论列表的话，可能只能得到最后当前页的评论，获取不到最新的评论
 + 换一种思路，当评论成功后，在客户端手动拼接出一个新的评论对象，然后利用数组的unshift方法，把最新的评论追加到 data 中的commentinfoList的开头，这样就能实现刷新列表的需求

 ## 改造图片分析 按钮为 路由的链接并显示为对应的组件页面

## 绘制 图片列表 组件页面结构并美化样式
1. 制作顶部的滑动条
2. 制作底部的图片列表

### 制作顶部滑动条的坑们
1. 需要借助于 MUI 中的 tab-top-webview-main.html
2. 需要把 slide 区域的 mui-fullscreen 类去掉
3. 滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化一下
 + 导入 mui.js
 + 调用官方提供的方式去初始化
    ```
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    ```
4. 我们在初始化滑动条的时候，导入的mui.js但是在控制台报错：Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
 + 原因是 mui.js中用到了'caller', 'callee', and 'arguments'这些东西，但是webpack打包好的bundle.js中，默认使用严格模式，所以二者是冲突的
 + 解决方案：
 1. 把mui.js中的非严格模式的代码改掉，但是明显不现实
 2. 把webpack打包的严格模式禁用掉(可行)
  + 使用 `babel-plugin-transform-remove-strict-mode` 这个插件[babel-plugin-transform-remove-strict-mode](https://github.com/genify/babel-plugin-transform-remove-strict-mode)

5. 滑动的时候报错误：`Unable to preventDefault inside passive event listener due to target being treated as passive. See https://www.chromestatus.com/features/5093566007214080`
```
解决方法，可以加上* { touch-action: pan-y; } 这句样式去掉。
```
原因：（是chrome为了提高页面的滑动流畅度而新折腾出来的一个东西） http://www.cnblogs.com/pearl07/p/6589114.html
https://developer.mozilla.org/zh-CN/docs/Web/CSS/touch-action  
6. 如果要初始化滑动条必须要等 DOM 元素加载完毕，所以我们需要把初始化滑动条的代码放在mounted生命周期函数中
7. 当滑动条调试成功后，tabbar无法正常工作了，这是因为mui.js与mui-tab-item这个类名冲突了，所以我们需要把tabbar样式中`mui-tab-item` 重新改一下名字

## 获取所有照片分类并渲染数据
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI提供的组件  `lazy-load`

### 实现了图片列表的懒加载改造和样式美化

## 实现点击图片跳转到图片详情页面
1.在改造li 成router-link的时候，需要使用tag属性指定要渲染为li标签  或者直接用router-link 标签包起来

## 实现图片详情页面的布局和美化，数据渲染页面

## 实现图片详情中 缩略图的功能
1. 一个Vue集成PhotoSwipe图片预览插件[vue-preview](https://github.com/LS1231/vue-preview)
2. `npm i vue-preview -S`  `import VuePreview from 'vue-preview'`   `Vue.use(VuePreview)`
3. 注意：每个图片对象中，必须有w,h和msrc 属性，所以获取到所有的图片列表后，使用 foreach 指令补全图片的宽和高和msrc
4. 实现布局还需要设置一下 figure 的样式

## 绘制 商品列表 页面基本结构并美化

## 尝试在手机上去进行项目的预览和测试
1. 要保证手机 和 开发项目的电脑 处于同一个wifi环境中(同一个局域网)，也就是说手机可以访问到电脑的IP
2. 打开项目中的 package,json 文件，在dev脚本中添加一个 --host指令，把当前电脑的wifi ip地址，设置为 --host的指令值
    // "dev": "webpack-dev-server --open --port 3000 --hot --host 192.168.124.2",
 + 如何查看自己电脑所处 wifi 的IP呢？在cmd终端中运行  `config`，查看无线网的ip地址

## 使用编程式导航为app.vue设置返回按钮
`this.$router.go(-1);`

## 把轮播图组件剥离出来成为子组件
1. swiper.vue
2. 解决商品评论中图片宽度100% 还是自适应的问题
    + 首页中的图片，宽为100%
    + 但是在商品详情页面中，宽为100%不好看
    + 商品详情页面中期望是：宽度为自适应，高度为100%
    + 经过分析得到问题的原因：首页中的轮播图和详情中的轮播图的分歧点是：宽度到底是自适应还是100%
    + 解决办法：定义一个属性，让使用轮播图的父组件，手动指定是否为100%的宽度

## 把子组件中的数据传递给父组件
1. 通过事件调用机制
2. 使用JS的API设置numbox的最大值

## 购物车上徽标的数字怎么得来的？
利用ref属性得到文本框中的数字，并把这个数字传给父组件，保存到localStorage中的count属性，
购物车上的徽标是读取的localStorage中的count属性的总和得出来的

## 将项目托管到Apache上并启用Gzip压缩

## 使用ngrok将本机映射为一个外网的Web服务器