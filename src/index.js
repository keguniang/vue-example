// 入口文件

import Vue from 'vue'

import app from './app.vue'

// 按需导入Mint-UI中的组件
import {Header,Button } from 'mint-ui'
// 注册Header组件
Vue.component(Header.name,Header);
Vue.component(Button.name, Button);

// 导入MUI的样式
import './lib/mui/css/mui.css'

var vue = new Vue({
    el: '#app',
    render: c => c(app)
})