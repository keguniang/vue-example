<template>
  <div>
    <h3>HomeContainer</h3>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="3000">
        <!-- 在组件中，使用v-for循环的话，一定要使用key -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
          <!-- src是普通属性，普通属性会把 item.img 当成字符串来输出，要实现把item.img当成表达式来计算，要用属性绑定-->
          <img :src="item.img" alt="">
      </mt-swipe-item>
    </mt-swipe>
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
      this.$http.get("http://www.liulongbin.top:3005/api/getlunbo").then(response => {
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
  img{
      width: 100%;
      height: 100%;
  }
}
</style>
