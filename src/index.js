// 入口文件

import Vue from 'vue'
// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)
// 导入共享数据vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 每次刚进入网站，肯定会调用index.js,在刚调用的时候，先从本地存储中，把购物车的数据读出来放到store中
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
    state: { // this.$store.state.***
        car: car, //将购物车中商品的数据，用一个数组存储起来，在car数组中，存储一些商品的对象，咱们可以暂时将这个商品对象，
        //设计成：{id: 商品的id,count: 要购买的数量,price: 商品的单价,selected:false}
        maxValue: ''
    },
    mutations: { // this.$store.commit('方法的名称','按需传递的唯一参数')
        addToCar(state, goodsinfo) {
            /**
             * 分析：
             * 1. 如果购物车中，之前就已经有了这个对应的商品，那么需要更新数量
             * 2. 如果没有，则直接把商品数据puch到car中
             */

            //假设在购物车中，没有找到对应的商品
            var flag = false;

            state.car.some(item => {
                if (item.id === goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            });
            if (!flag) {
                state.car.push(goodsinfo);
            }
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值保存到store中
            state.car.some(item => {
                // {id: this.goodsid,count: this.$refs.numbox.value}
                if (item.id === goodsinfo.id) {
                    item.count = goodsinfo.count;

                    return;
                }
            })

            // 当修改完商品的数量，把最新的数量保存到本地
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        getMaxValue(state, maxValue) {
            state.maxValue = maxValue;
            // console.log('最大值'+state.maxValue);

        },
        removeCar(state, id) {

            state.car.some((item, index) => {
                if (item.id == id) {
                    console.log('item.id' + item.id);
                    state.car.splice(index, 1);
                    flag = true;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
            state.car.some(item => {
                if (item.id === info.id) {
                    item.selected = info.status;
                    return;
                }
            })
            localStorage.setItem('car', JSON.stringify(state.car));
        },

    },
    // 对外提供数据
    getters: { // this.$store.getters.***
        // 相当于计算属性，也相当于filters
        getAllCount(state) {
            var sum = 0;
            state.car.forEach(item => {
                sum += item.count;
            })
            return sum;
        },
        getGoodsCount(state) {
            var o = {};
            state.car.forEach(ele => {
                o[ele.id] = ele.count;
            })
            return o;
        },
        getMaxValue1(state) {
            console.log('最大值' + state.maxValue);
            return state.maxValue;

        },
        getGoodsSelected(state) {
            var o = {};
            state.car.forEach(item => {
                o[item.id] = item.selected;
            })
            return o;
        },
        getGoodsNum(state) {
            var num = 0;
            state.car.forEach(item => {
                if (item.selected) {
                    num += item.count;
                }
            })
            return num;
        },
        getGoodsMoney(state) {
            var money = 0;
            state.car.forEach(item => {
                if (item.selected) {
                    money += item.price * item.count;
                }
            })
            return money;
        }


    }
})


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
Vue.filter('dateFormat', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern);
})

// 导入App根组件
import app from './app.vue'

var vue = new Vue({
    el: '#app',
    render: c => c(app),
    router, //1.4 挂载路由对象到vm实例
    store //挂载store状态管理对象
})

console.log('-------' + this)                                                                                                                                                        