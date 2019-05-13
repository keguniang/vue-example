// 入口文件

import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)




// 按需导入Mint-UI中的组件
// import {Header,Button,Swipe, SwipeItem,Lazyload  } from 'mint-ui'
// // 注册Header组件
// Vue.component(Header.name,Header);
// // 注册按钮组件
// Vue.component(Button.name, Button);
// // 注册轮播图组件
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);

// Vue.use(Lazyload);

// 全部导入
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// 导入MUI的样式
import './lib/mui/css/mui.css'
import './lib/mui/css/icons-extra.css'

// 导入缩略图预览
import VuePreview from 'vue-preview'

Vue.use(VuePreview)


// 1.3 导入自己的router.js路由模块
import router from './router.js'

// 2.1 导入vue-resource
import VueResource from 'vue-resource'
// 2.2 安装vue-resource
Vue.use(VueResource);
// 设置全局根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 设置表单提交时候中的数据格式 application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 导入格式化时间的插件
import moment from 'moment'

// 定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern = 'YYYY-MM-DD HH:mm:ss'){
    return moment(dataStr).format(pattern);
})

// 导入App根组件
import app from './app.vue'

var vue = new Vue({
    el: '#app',
    render: c => c(app),
    router //1.4 挂载路由对象到vm实例
})