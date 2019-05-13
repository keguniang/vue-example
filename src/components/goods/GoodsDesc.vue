<template>
  <div class="goodsdesc-container">
    <h3>{{ goodsDesc.title}}</h3>
    <hr>
    <div class="content" v-html="goodsDesc.content"></div>
  </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data() {
        return {
            id: this.$route.params.id,
            goodsDesc: {}
        }
    },
    created() {
        this.getGoodsDesc();
    },
  methods: {
    getGoodsDesc() {
      this.$http.get("api/goods/getdesc/" + this.id).then(response => {
        if (response.body.status === 0) {
          this.goodsDesc = response.body.message[0];
        } else {
          // 失败了
          Toast({
            message: "加载商品详情失败",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" >
.goodsdesc-container {
    padding: 5px;
  h3 {
    color: #226aff;
    text-align: center;
    font-size: 16px;
    margin: 15px 0;
  }
  .content{
    //   让图片自适应：width: 100%;   scoped去掉
      img{
          width: 100%;
      }
  }
}
</style>
