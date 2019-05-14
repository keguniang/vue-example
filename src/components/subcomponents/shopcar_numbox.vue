<template>
  <!-- 问题：不知道什么时候能够拿到maxvalue，但是总归有一刻能拿到 
  可以使用watch属性监听，来监听父组件传递过来的maxvalue值，不管watch会触发几次，最后一次肯定是个合法的maxvalue-->
  <!-- <div class="mui-numbox" data-numbox-min="1" :data-numbox-max="maxvalue"> -->
  <div class="mui-numbox" data-numbox-min="1" style="height:25px">
    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <input
      id="test"
      class="mui-input-numbox"
      type="number"
      :value="count"
      @change="countChanged"
      ref="numbox"
    >
    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from "../../lib/mui/js/mui.js";
export default {
  mounted() {
    // 初始化数字选择框组件
    mui(".mui-numbox").numbox();
    console.log(this.maxvalue); //undefined
    // 因为请求服务的时候promise是异步操作，当DOM节点挂载到页面上的时候，还没有获取到数据
  },
  props: ["maxvalue","count","goodsid"],
  methods: {
    // 原本的想法是给加减按钮和文本框都绑定点击事件，但是这样比较麻烦，加减按钮本质都是文本框中数据的改变，所以直接给文本框添加一个change事件
    countChanged() {
      // 每当数量值改变，则立即把最新的数量同步到购物车的store中
      this.$store.commit('updateGoodsInfo',{
        id: this.goodsid,
        count: parseInt(this.$refs.numbox.value)
      })
      // console.log('类型为'+typeof this.$refs.numbox.value);string
    }
  },
  watch: {
    // 属性监听
    maxvalue: function(newVal, oldVal) {
      // 使用JS的API设置numbox的最大值
      mui(".mui-numbox")
        .numbox()
        .setOption('max', newVal);
        
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
