// 入口文件

import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)




// 按需导入Mint-UI中的组件
import {Header,Button,Swipe, SwipeItem } from 'mint-ui'
// 注册Header组件
Vue.component(Header.name,Header);
// 注册按钮组件
Vue.component(Button.name, Button);
// 注册轮播图组件
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

// 导入MUI的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

import './css/animate.css'

// 1.3 导入自己的router.js路由模块
import router from './router.js'

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource)


// 导入App根组件
import app from './app.vue'

var vue = new Vue({
    el: '#app',
    render: c => c(app),
    router //1.4 挂载路由对象到vm实例
})