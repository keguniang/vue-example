<template>
  <div class="goods-info">
    <!-- 轮播图区域 -->
    <mt-swipe :auto="3000">
      <!-- 在组件中，使用v-for循环的话，一定要使用key -->
      <mt-swipe-item v-for="item in goodsImageList" :key="item.src">
        <!-- src是普通属性，普通属性会把 item.img 当成字符串来输出，要实现把item.img当成表达式来计算，要用属性绑定-->
        <img :src="item.src">
      </mt-swipe-item>
    </mt-swipe>

    <div class="info">
      <h3>{{goodsInfo.title}}</h3>
      <hr>
      <div class="info-price">
        <p>
          <span class="market">市场价:{{ goodsInfo.market_price}}</span>
          <span class="sell">销售价:{{ goodsInfo.sell_price}}</span>
        </p>
        <p>购买数量:111</p>
        <div class="button">
          <mt-button type="primary" >立即购买</mt-button>
          <mt-button type="danger" >加入购物车</mt-button>
        </div>
      </div>
    </div>

    <div class="parameter">
      <h3>商品参数</h3>
      <hr>
      <p>商品货号:{{ goodsInfo.goods_no}}</p>
      <p>库存情况:{{ goodsInfo.stock_quantity}}件</p>
      <p>上架时间:{{ goodsInfo.add_time}}</p>
      <hr>
      <div class="button">
        <mt-button type="primary" plain size="large" class="intro">图文介绍</mt-button>
        <br>
        <mt-button type="danger" plain size="large" class="comment">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      id: this.$route.params.id,
      goodsInfo: {},
      goodsImageList: []
    };
  },
  created() {
    this.getGoodsInfo();
    this.getGoodsImage();
  },
  methods: {
    getGoodsInfo() {
      this.$http.get("api/goods/getinfo/" + this.id).then(response => {
        if (response.body.status === 0) {
          this.goodsInfo = response.body.message[0];
          console.log(this.goodsInfo);
        } else {
          // 失败了
          Toast({
            message: "加载商品详情失败",
            duration: 3000
          });
        }
      });
    },
    getGoodsImage() {
      this.$http.get("api/getthumimages/" + this.id).then(response => {
        if (response.body.status === 0) {
          this.goodsImageList = response.body.message;
          console.log(this.goodsImageList);
        } else {
          // 失败了
          Toast({
            message: "加载商品详情图片失败",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-info {
  padding: 10px;
  background-color: #eee;

  .mint-swipe {
    height: 300px;
    .mint-swipe-item {
      //   自适应mint-swipe-item
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .info {
    border: 1px solid #ddd;
    background-color: #fff;
    box-shadow: 0 0 9px #ccc;
    margin-top: 8px;
    h3 {
      font-size: 16px;
      padding: 8px;
    }
    hr {
      color: red;
    }
    .info-price {
      font-size: 14px;
      margin: 20px 5px;
      padding: 5px;
      .market {
        text-decoration: line-through;
      }
      .sell {
        color: red;
        margin-left: 15px;
      }
    }
  }

  .parameter {
    border: 1px solid #ddd;
    background-color: #fff;
    box-shadow: 0 0 9px #ccc;
    margin-top: 8px;
    h3 {
      font-size: 16px;
      padding: 8px;
    }
    p {
      margin-left: 10px;
      color: #999;
      font-size: 14px;
    }
    .button {
      padding: 20px 10px;
    }
  }
}
</style>

// 这里边是自己写的样式