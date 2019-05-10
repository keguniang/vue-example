// 1、导入vue-router包
import VueRouter from 'vue-router';

// 导入对应的路由组件
import homeContainer from './components/tabbar/HomeContainer.vue'
import memberContainer from './components/tabbar/MemberContainer.vue'
import shopcarContainer from './components/tabbar/ShopcarContainer.vue'
import searchContainer from './components/tabbar/SearchContainer.vue'

import newsListContainer from './components/news/NewsListContainer.vue'
import newsInfoContainer from './components/news/NewsInfoContainer.vue'
import photoShareContainer from './components/photoShare/photoContainer.vue'
import photoinfoContainer from './components/photoShare/photoinfoContainer.vue'

// 3、创建路由对象
var router = new VueRouter({
    routes: [ //配置路由规则
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            component: homeContainer,
        },
        {
            path: '/member',
            component: memberContainer
        },
        {
            path: '/shopcar',
            component: shopcarContainer
        },
        {
            path: '/search',
            component: searchContainer
        },

        {
            path: '/home/newslist',
            component: newsListContainer
        },
        // 注意home前边别忘了加/
        {
            path: '/home/newsinfo/:id',
            component: newsInfoContainer
        },
        {
            path : '/home/photoShare',
            component : photoShareContainer
        },
        {
            path: '/home/photoinfo/:id',
            component : photoinfoContainer
        }


    ],
    linkActiveClass: 'mui-active' //覆盖默认的路由高亮的类router-link-active
})

// 把路由对象router暴露出去
export default router;