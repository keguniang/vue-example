<template>
  <div>
    <!-- 轮播图区域 -->
    <mt-swipe :auto="3000">
      <!-- 在组件中，使用v-for循环的话，一定要使用key -->
      <!-- lunbotuList 应该是父组件向子组件传值得到的 -->
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <!-- src是普通属性，普通属性会把 item.img 当成字符串来输出，要实现把item.img当成表达式来计算，要用属性绑定-->
        <img :src="item.img || item.src" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["lunbotuList", "isfull"]
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
  text-align: center;
//   &:nth-child(1) {
//     background-color: red;
//   }
//   &:nth-child(2) {
//     background-color: lightblue;
//   }
//   &:nth-child(3) {
//     background-color: cyan;
//   }
  //   自适应mint-swipe-item
  img {
    // width: 100%;
    height: 100%;
  }
}

.full {
  width: 100%;
}
</style>
