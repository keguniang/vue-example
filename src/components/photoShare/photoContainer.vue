<template>
  <div class="photo-container">
    <!-- 顶部的滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item',item.id == 0 ?  'mui-active' : '']"
            href="#item1mobile"
            data-wid="tab-top-subpage-1.html"
            v-for="item in photoCategoryList "
            :key="item.id"
            @click="getphotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul>
      <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/'+ item.id" tag="li">
        
          <img v-lazy="item.img_url">
          <div class="info">
            <h1 class="info-title">{{ item.title }}</h1>
            <div class="info-body">{{ item.zhaiyao}}</div>
          </div>
        </router-link>

    </ul>
  </div>
</template>

<script>
// 1.导入mui.js
import mui from "../../lib/mui/js/mui.js";
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      photoCategoryList: [],
      photoList: []
    };
  },
  // 当组件中的DOM结构被渲染好并放到页面中后，会执行这个钩子函数
  mounted() {
    // 2.初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  created() {
    this.getPhotoCategory();
    // 默认进页面就主动请求所有图片的数据
    this.getphotoList(0);
  },
  methods: {
    getPhotoCategory() {
      this.$http.get("api/getimgcategory").then(response => {
        if (response.body.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          response.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.photoCategoryList = response.body.message;
        }
      });
    },
    getphotoList(id) {
      this.$http.get("api/getimages/" + id).then(response => {
        if (response.body.status === 0) {
          this.photoList = response.body.message;
          console.log(this.photoList);
        } else {
          // 失败了
          Toast({
            message: "加载照片列表失败",
            duration: 3000
          });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}
ul {
  margin: 0;
  padding: 10px;
  padding-bottom: 0; //这是因为padding: 10px;和li中的margin-bottom: 10px;会造成最下边多10px
  li {
    list-style: none;
    text-align: center;
    background-color: #ccc;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
