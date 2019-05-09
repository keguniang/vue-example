<template>
  <div class="app-container">
    <!-- 顶部Header区域 -->
    <mt-header fixed title="固定在顶部">
      <!-- slot位置  左边/右边显示元素 -->
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>

      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 中间的路由 router-view区域 -->
    
<!-- 这里用mode:"out-in"  先出再进，会有一个空白区，会让用户感觉需要等待，体验不好，所以不采用 -->
    <transition >
      <router-view></router-view>
    </transition>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>

      <router-link class="mui-tab-item" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>

      <router-link class="mui-tab-item" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge">0</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>

      <router-link class="mui-tab-item" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 41px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter{
  opacity: 0;
  transform: translateX(100%)//从右边进来
}
.v-leave-to{
  opacity: 0;
  transform: translateX(-100%);//从左边出去
  position: absolute;
}
.v-enter-active,.v-leave-active{
  transition: all 0.5s ease;
}
</style>

