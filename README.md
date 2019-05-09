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

## 实现点击加载更多的功能
1. 为加载更多按钮绑定点击事件，在事件中让页数加1
2. 加1后重新调用this.getcommentinfo()方法获取最新一页的数据
3. 为了防止上一页数据被下一页数据覆盖的情况，我们再点击加载更多的时候，应该上老数据拼接上新一页的数据，数组的拼接方法是concat()