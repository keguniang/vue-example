<template>
  <div class="newsinfo-container">
    <!-- 因为$route.params.id比较长，所以将URL中的id挂载到data上的id，方便以后调用 -->
    <!-- <h3>新闻详情页面---{{ $route.params.id}}</h3> -->
    <!-- <h3>新闻详情页面---{{ id}}</h3> -->

    <!-- 大标题 -->
    <h3 class="title">{{ newsinfo.title }}</h3>

    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间: {{ newsinfo.add_time }}</span>
      <span>点击:{{ newsinfo.click }}次</span>
    </p>
    <hr>

    <!--内容区域  -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论区域  父组件把id传递给子组件-->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import comment from '../subcomponents/comment.vue'

export default {
  //   created() {
  //     console.log(this.$route);
  //   }
  data() {
    return {
      id: this.$route.params.id,
      newsinfo: {}
    };
  },
  created() {
    this.getNewsInfo();
  },
  methods: {
    //   获取新闻详情
    getNewsInfo() {
      this.$http.get("api/getnew/" + this.id).then(
        response => {
          if (response.body.status === 0) {
            this.newsinfo = response.body.message[0];
          } else {
            // 失败了
            Toast({
              message: "加载新闻详情失败",
              duration: 3000
            });
          }
        },
        err => {
          console.log("失败了");
        }
      );
    }
  },
  components:{
      'comment-box' :comment
  }
};
</script>

// 这里图片太大，加上width: 100%;还是大，把scoped去掉就可以了，但也不会造成全局污染，因为所有的样式都写在了.newsinfo-container中
<style lang="scss" scoped>
.newsinfo-container {
  padding: 0 4px;
  .title {
    color: red;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    font-size: 12px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    margin-top: 15px;
    img {
      width: 100%;
    }
  }
}
</style>
