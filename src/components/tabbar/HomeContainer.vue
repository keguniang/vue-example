<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="3000">
      <!-- 在组件中，使用v-for循环的话，一定要使用key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!-- src是普通属性，普通属性会把 item.img 当成字符串来输出，要实现把item.img当成表达式来计算，要用属性绑定-->
        <img :src="item.img" >
      </mt-swipe-item>
    </mt-swipe>

    <!-- 9宫格到6宫格的改造 -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
          <div class="mui-media-body">新闻资讯</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu2.png" alt="">
          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu3.png" alt="">
          <div class="mui-media-body">商品购买</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu4.png" alt="">
          <div class="mui-media-body">留言反馈</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu5.png" alt="">
          <div class="mui-media-body">视频专区</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/menu6.png" alt="">
          <div class="mui-media-body">联系我们</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-gear"></span>
          <div class="mui-media-body">Setting</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-info"></span>
          <div class="mui-media-body">about</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <span class="mui-icon mui-icon-more"></span>
          <div class="mui-media-body">more</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      lunbotuList: [] //保存轮播图的数组
    };
  },
  created() {
    this.getLunbotu();
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http
        .get("api/getlunbo")
        .then(response => {
          console.log(response.body);
          if (response.body.status === 0) {
            // 成功了
            this.lunbotuList = response.body.message;
          } else {
            // 失败的
            Toast({
              message: "加载轮播图失败",
              duration: 3000
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
// 设置轮播图的高度，原本为0
.mint-swipe {
  height: 200px;
}
// .mint-swipe-item:nth-child(1){
//     background-color: #f00;
// }

// 用&表示交集的关系，不写&则表示后代的关系
.mint-swipe-item {
  &:nth-child(1) {
    background-color: red;
  }
  &:nth-child(2) {
    background-color: lightblue;
  }
  &:nth-child(3) {
    background-color: cyan;
  }
  //   自适应mint-swipe-item
  img {
    width: 100%;
    height: 100%;
  }
}

// 可以自己写样式，加到ul标签中，但是可能涉及到样式权限的问题，自己写的样式不起作用，所以采用本来的样式名称
// 把ul的背景色改为白色，并且去掉边框，改变图片和字体的大小
.mui-grid-view.mui-grid-9{
    background-color: #fff;
    border: none;
    img{
        width: 60px;
        height: 60px;
    }
    .mui-media-body{
        font-size: 13px;
    }
}
// 去掉每个li的边框
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border-right: none;
    border-bottom: none;
}

</style>
