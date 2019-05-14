<template>
  <div class="app-container">
    <!-- 顶部Header区域 -->
    <mt-header fixed title="Vue项目">
      <!-- slot位置  左边/右边显示元素 -->
      <router-link to slot="left" v-show="flag">
        <mt-button icon="back" @click="back">返回</mt-button>
      </router-link>

      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- 中间的路由 router-view区域 -->

    <!-- 这里用mode:"out-in"  先出再进，会有一个空白区，会让用户感觉需要等待，体验不好，所以不采用 -->
    <transition>
      <router-view></router-view>
    </transition>

    <!-- 底部Tabbar区域 -->
    <nav class="mui-bar mui-bar-tab">
      <router-link class="mui-tab-item-ck" to="/home">
        <span class="mui-icon mui-icon-home"></span>
        <span class="mui-tab-label">首页</span>
      </router-link>

      <router-link class="mui-tab-item-ck" to="/member">
        <span class="mui-icon mui-icon-contact"></span>
        <span class="mui-tab-label">会员</span>
      </router-link>

      <router-link class="mui-tab-item-ck" to="/shopcar">
        <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
          <span class="mui-badge" id="badge">{{ $store.getters.getAllCount}}</span>
        </span>
        <span class="mui-tab-label">购物车</span>
      </router-link>

      <router-link class="mui-tab-item-ck" to="/search">
        <span class="mui-icon mui-icon-search"></span>
        <span class="mui-tab-label">搜索</span>
      </router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    };
  },
  created() {
    this.flag = this.$route.path === '/home' ?  false : true
  },
  methods: {
    back() {
      // 编程式导航
      this.$router.go(-1);
    }
  },
  watch: {
    "$route.path": function(newVal) {
      if (newVal === "/home") {
        this.flag = false;
      } else {
        this.flag = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  padding-top: 41px;
  padding-bottom: 50px;
  overflow-x: hidden;
}
.v-enter {
  opacity: 0;
  transform: translateX(100%); //从右边进来
}
.v-leave-to {
  opacity: 0;
  transform: translateX(-100%); //从左边出去
  position: absolute;
}
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}
// 改类名，解决 tabbar 点击无法切换的问题
.mui-bar-tab .mui-tab-item-ck.mui-active {
  color: #007aff;
}

.mui-bar-tab .mui-tab-item-ck {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: #929292;
}

.mui-bar-tab .mui-tab-item-ck .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-ck .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mint-header {
  z-index: 2;
}
</style>

