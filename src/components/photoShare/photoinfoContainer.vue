<template>
  <div class="photoinfo-container">
    <!-- 大标题 -->
    <h3 class="title">{{ photoInfo.title }}</h3>

    <!-- 子标题 -->
    <p class="subtitle">
      <span>发表时间: {{ photoInfo.add_time }}</span>
      <span>点击:{{ photoInfo.click }}次</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->
    <vue-preview :slides="thumbList" @close="handleClose"></vue-preview>

    <!--内容区域  -->
    <div class="content" v-html="photoInfo.content"></div>

    <!-- 评论区域  父组件把id传递给子组件-->
    <comment-box :id="this.id"></comment-box>
  </div>
</template>

<script>
import comment from "../subcomponents/comment.vue";

export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: {}, //点击图片进去后的详细信息
      thumbList: [] //缩略图的数组
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumb();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("api/getimageInfo/" + this.id).then(response => {
        if (response.body.status === 0) {
          this.photoInfo = response.body.message[0];
        }
      });
    },
    // 获取缩略图
    getThumb() {
      this.$http.get("api/getthumimages/" + this.id).then(response => {
        if (response.body.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          response.body.message.forEach(element => {
            // 这两行是设置缩略图预览时候的宽高
            element.w = 365;
            element.h = 275;
            element.msrc = element.src;
          });
          // 把完整的数据保存到imagesList中
          this.thumbList = response.body.message;
          console.log(this.imagesList);
        }
      });
    },
    handleClose() {
      console.log("close event");
    }
  },
  components: {
    "comment-box": comment
  }
};
</script>

<style lang="scss" >
.photoinfo-container {
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
  }
  .my-gallery {
    figure {
      margin: 1em 5px;
      display: inline;
      box-shadow: 0 0 9px #999;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>
