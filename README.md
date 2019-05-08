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