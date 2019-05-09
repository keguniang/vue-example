<template>
  <div>
    <ul class="mui-table-view" v-for="item in newslist" :key="item.id">
      <li class="mui-table-view-cell mui-media">
        <router-link :to="'/home/newsinfo/' + item.id" >
          <img class="mui-media-object mui-pull-left" :src="item.img_url" >
          <div class="mui-media-body">
            {{ item.title }}
            <p class="mui-ellipsis">
              <span>发表时间：{{ item.add_time | dateFormat}}</span>
              <span>点击：{{ item.click }}次</span>
            </p>
          </div>
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
      newslist: []
    };
  },
  created() {
    this.getNewsList();
  },
  methods: {
    getNewsList() {
      this.$http
        .get("api/getnewslist")
        .then(function(res) {
          console.log(res.body);
          if (res.body.status === 0) {
            this.newslist = res.body.message;
          } else {
            // 失败的
            Toast({
              message: "加载新闻列表失败",
              duration: 3000
            });
          }
        });
    }
  }
};
</script>

// 手机端，12px是正常的
<style lang="scss" scoped>
.mui-media-body {
  font-size: 14px;
  .mui-ellipsis {
    font-size: 12px;
    color: #226aff;
    // 采用flex布局，让发表时间与点击次数两端对齐
    display: flex;
    justify-content: space-between;
  }
}
ul{
    overflow: auto;
}
</style>
