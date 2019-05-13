<template>
  <div class="goods-info">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <!-- 轮播图区域 -->

    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <!-- 第一个lunbotuList是在子组件中使用的名字，第二个是data中的数据 -->
          <swiper :lunbotuList="goodsImageList" :isfull="false"></swiper>
        </div>
      </div>
    </div>

    <!-- 商品购买区域 -->
    <div class="mui-card">
      <div class="mui-card-header">{{goodsInfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <div class="price">
            <p>
              <span class="market">
                市场价 :
                <del>￥{{ goodsInfo.market_price}}</del>
              </span>
              <span class="sell">销售价 : ￥{{ goodsInfo.sell_price}}</span>
            </p>
            <p>
              购买数量 :
              <numbox :maxvalue="goodsInfo.stock_quantity" @getCount="getSelectedCount"></numbox>
            </p>
            <p>
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
              <!-- 分析：如何实现加入购物车的时候，拿到选择的数量
              1. 加入购物车按钮属于 goodsinfo页面，数字属于 numberbox 组件
              2. 由于涉及到了父子组件的嵌套了，所以无法直接在goodsinfo页面中获取到选中的商品数量值
              3. 涉及到了子组件向父组件传值（事件调用机制）
              4. 事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当做参数传递给这个方法  -->
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品参数区域 -->
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号 : {{ goodsInfo.goods_no}}</p>
          <p>库存情况 : {{ goodsInfo.stock_quantity}}件</p>
          <p>上架时间 : {{ goodsInfo.add_time | dateFormat}}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button type="primary" plain size="large" class="intro" @click="goDesc(id)">图文介绍</mt-button>
        <!-- 使用br之后仍然不生效，说明父元素启用了flex布局,把父元素的类中的display换成block即可 -->
        <!-- <br> -->
        <mt-button type="danger" plain size="large" class="comment" @click="goComment(id)">商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入轮播图组件
import swiper from "../subcomponents/swiper.vue";
// 导入数字选择框组件
import numbox from "../subcomponents/goodsinfo_numbox.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, //把路由中的参数对象中的id挂载到data上，方便以后调用
      goodsInfo: {},
      goodsImageList: [],
      ballFlag: false, //控制小球隐藏与显示
      selectedCount: 1//保存用户选中的商品数量,默认认为用户买一个
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
          //   response.body.message.forEach(element => {
          //     element.img = element.src;
          //   });
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
    },
    // 点击使用编程式导航跳转到  图文介绍页面
    goDesc(id) {
      this.$router.push({ name: "goodsDesc", params: { id } });
      // router.push({ name: 'user', params: { userId: '123' }})
    },
    // 跳转到评论页面
    goComment(id) {
      this.$router.push({ name: "goodsComment", params: { id } });
    },
    addToShopCar() {
      this.ballFlag = true;
    },
    beforeEnter(el) {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;

      /**
       * 小球动画优化思路：
       *  1.先分析导致动画不准确的本质原因：把小球最终位移到的位置，已经写死了，即局限在了某一分辨率的滚动条未滚动的情况下；
       * 2. 只要分辨率和测试的时候不一样，或者滚动条有一定的移动距离之后，问题就出现了
       * 3. 因此，得出结论：不能把位置的横纵距离直接写死，而是应该根据不同情况，动态计算这个坐标值
       * 4. 经过分析得出解决思路：先得到徽标的横纵坐标，再得到小球的横纵坐标，y值求差，x也求差，就是横纵坐标要移动的距离
       * 5. 如何获取徽标和小球的距离？？domObject.getBoundingClientRect()
       */

      // el.style.transform = "translate(92px,215px)";
      // el.style.transition = 'all 1s cubic-bezier(.42,-0.37,.8,.68)';

      // 获取小球在页面中的位置
      const ballPos = this.$refs.ball.getBoundingClientRect();
      // 获取徽标在页面中的位置
      const badgePos = document.getElementById('badge').getBoundingClientRect();

      var xDist = badgePos.left - ballPos.left;
      var yDist = badgePos.top - ballPos.top;

      el.style.transform = `translate(${xDist}px,${yDist}px)`;
      el.style.transition = 'all 0.5s cubic-bezier(.42,-0.37,.8,.68)';
      done();
    },
    afterEnter(el) {
        this.ballFlag = false;
    },
    getSelectedCount(count){
      // 当子组件把选中的数量传递给父组件的时候，把选中得值保存到data上
      this.selectedCount = count;
      console.log('父组件拿到的值为:' + this.selectedCount);
      
    }
  },
  components: {
    swiper,
    numbox
  }
};
</script>

<style lang="scss" scoped>
.goods-info {
  overflow: hidden;
  background-color: #eee;

  .price {
    font-size: 14px;
    p {
      color: black;
    }
    // .market {
    //   text-decoration: line-through;
    // }
    .sell {
      color: red;
      margin-left: 15px;
    }
  }

  .mui-card-footer {
    display: block;
  }

  button {
    margin: 15px 0;
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: #f00;
    position: absolute;
    z-index: 99;
    top: 407px;
    left: 145px;
    // transform: translate(93px,215px);
  }
}
</style>

// 这里边是用MUI中的卡片写的