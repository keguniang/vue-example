<template>
  <div class="goods-list">
    <!-- 在网页中，有两种跳转方式 
      方式1、使用a标签的形式   叫做标签跳转
    方式2、使用window.location.href的形式,叫做  编程式导航-->

    <!-- <div class="goods-item" v-for="item in goodsList" :key="item.id">
        <router-link :to="'/home/goodsInfo/' + item.id">
        <img :src="item.img_url">

        <h1 class="title">{{item.title }}</h1>

        <div class="info">
          <p class="price">
            <span class="now">￥{{item.sell_price}}</span>
            <span class="old">￥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
        </router-link>
    </div>-->
    <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="goDetail(item.id)">
      <img :src="item.img_url">

      <h1 class="title">{{item.title }}</h1>

      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>剩{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button size="large" type="danger" plain @click="getMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      pageindex: 1, //默认是第一页商品列表
      goodsList: [],
      goodsNumber: ""
    };
  },
  created() {
    this.getgoodsList();
  },
  methods: {
    getgoodsList() {
      this.$http
        .get("api/getgoods?pageindex=" + this.pageindex)
        .then(response => {
          if (response.body.status === 0) {
            this.goodsList = this.goodsList.concat(response.body.message);
            this.goodsNumber = response.body.message.length;
            console.log(this.goodsList);
          } else {
            // 失败了
            Toast({
              message: "加载商品列表失败",
              duration: 3000
            });
          }
        });
    },
    getMore() {
      this.pageindex++;
      this.getgoodsList();
    },
    goDetail(id) {
      // 使用JS的形式进行路由导航
      /**注意：一定要区分 this.$route 和this.$router这两个对象
       *  其中：this.$route是路由【参数对象】，所有路由中的参数，params,query都属于它
       *  其中：this.$router是一个路由【导航对象】，可以通过 $router 访问路由实例，用它可以方便的使用JS代码，实现路由的前进后退，跳转到新的URL地址
       *
       */
      // 1、最简单的  字符串
      // this.$router.push('/home/goodsInfo/'+id);
      // 2、对象
      // this.$router.push({ path: '/home/goodsInfo/' + id });
      // 3、命名的路由
      this.$router.push({ name: "goodsInfo", params: { id } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods-list {
  display: flex;
  flex-wrap: wrap; //让其超过内容区域换行
  //   justify-content: space-around;
  padding: 7px;
  justify-content: space-between;

  .goods-item {
    width: 49%;
    min-height: 293px;
    border: 1px solid #ccc;
    box-shadow: 0 0 9px #ccc;
    margin: 4px 0;
    padding: 3px;
    display: flex;
    flex-direction: column; //更换主轴的方向
    justify-content: space-between; //两端对齐

    img {
      width: 100%;
    }

    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }

      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          margin-left: 10px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between; //两端对齐
        font-size: 13px;
      }
    }
  }
}
</style>
