<template>
  <div class="shop-container">
    <!-- 商品列表项区域 -->
    <div class="goods-list" v-for="(item,index) in goodsList" :key="item.id">
      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch
              v-model="selected[item.id]"
              @change="selectedChange(item.id,selected[item.id])"
            ></mt-switch>
            <img :src="item.thumb_path">
            <div class="info">
              <h1>{{ item.title}}</h1>
              <p>
                <span class="price">￥{{ item.sell_price}}</span>
                <numbox
                  :count="$store.getters.getGoodsCount[item.id]"
                  :goodsid="item.id"
                  :maxvalue="$store.getters.getMaxValue1"
                ></numbox>
                <!-- 问题：如何从购物车获取商品的数量？
                1. 可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环这条商品的is,作为对象的属性名，count值作为对象的属性值，这样当把所有的商品循环一遍，就会得到一个对象:{88:2}
                在循环中，可以得到item.id,自然可以得到id对应的count,把count值传递给子组件-->
                <a href="#" @click.prevent="remove(item.id,index)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner amount">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>
              已勾选商品
              <span class="red">{{ $store.getters.getGoodsNum}}</span>件，总价
              <span class="red">￥{{ $store.getters.getGoodsMoney}}</span>
            </p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import numbox from "../subcomponents/shopcar_numbox.vue";

export default {
  components: {
    numbox
  },
  data() {
    return {
      goodsList: [], //购物车所有商品的数据
      selected: this.$store.getters.getGoodsSelected //商品选中的状态
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1. 获取到store中所有商品的id,然后拼接出一个 逗号分隔 的字符串
      var idArr = []; //购物车列表id
      this.$store.state.car.forEach(element => idArr.push(element.id));
      // 如果购物车没有商品，则直接返回，不需要请求数据接口，否则会报错
      if (idArr.length === 0) {
        return;
      }
      // 获取购物车商品列表
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(response => {
          if (response.body.status === 0) {
            this.goodsList = response.body.message;
            console.log(this.goodsList);
          }
        });
    },
    remove(id, index) {
      this.goodsList.splice(index, 1);
      this.$store.commit("removeCar", id);
    },
    selectedChange(id,status) {
      // 每当点击开关，把最新的开关状态同步到 store 中
      console.log(id + '----' + status);
      var info = {'id': id,'status': status}
      this.$store.commit('updateGoodsSelected',info);
    }
  }
};
</script>

<style lang="scss" scoped>
.shop-container {
  background-color: #eee;
  overflow: hidden;

  .mui-card-content-inner {
    display: flex;
    align-items: center; //垂直居中
    // justify-content: space-between; //左右对齐
    img {
      width: 60px;
      height: 60px;
    }

    .info {
      margin-left: 20px;
      h1 {
        font-size: 13px;
      }
      p {
        margin-top: 10px;
        margin-bottom: 0;
        .price {
          color: red;
          font-weight: bold;
        }
      }
    }
  }
  .amount {
    justify-content: space-between;
    .red {
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>
