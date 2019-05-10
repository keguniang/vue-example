<template>
  <div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入要发表的内容(最多吐槽120个字)" maxlength="120" v-model="content"></textarea>

    <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

    <div class="cmt-list">
      <div class="cmt-item" v-for="(item,index) in commentinfoList" :key="item.add_time">
        <div
          class="cmt-title"
        >第{{ index+1 }}楼&nbsp;&nbsp;用户:{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat}}</div>
        <div
          class="cmt-body"
        >{{ item.content === 'undefined'  ? '该用户很懒，什么都没有说' : item.content}}</div>
      </div>
    </div>
    <br>
    <mt-button type="danger" size="large" plain @click="moreComment">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data() {
    return {
      pageIndex: 1, //默认展示第一页
      // id: this.$route.params.id,这种方法是通过路由得到id,也可以通过父组件给子组件传值
      commentinfoList: [],
      content: "" //评论的内容
    };
  },
  props: ["id"], //接受父组件传递过来的id
  created() {
    this.getcommentinfo();
  },
  methods: {
    getcommentinfo() {
      this.$http
        .get("api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(response => {
          if (response.body.status === 0) {
            //   数组的拼接用concat,字符串的拼接用+
            // 每当获取新一页数据的时候，不要把上一页的数据清空，而是拼接上下一页的数据
            this.commentinfoList = this.commentinfoList.concat(
              response.body.message
            );
          } else {
            Toast("加载评论列表失败");
          }
        });
    },
    moreComment() {
      this.pageIndex++;
      console.log(this.pageIndex);
      this.getcommentinfo();
    },
    postComment() {
      if (this.content.trim().length === 0) {
        return Toast("评论内容不能为空,请重新输入");
      }
      console.log ('内容是'+this.content == "" );
      // 第三个参数：{emulateJSON:true}已经在index.js中全局设置过了，所以可以省略
      this.$http
        .post("api/postcomment/" + this.id, { content: this.content.trim() })
        .then(response => {
          if (response.body.status === 0) {
            // this.getcommentinfo();
            // 1.拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              // add_time: new Date(),//这是一个对象，:key主键错误
              add_time: Date.now(), //是一个时间戳
              content: this.content.trim()
            };
            this.commentinfoList.unshift(cmt);
            console.log(this.commentinfoList);
            // console.log("数据类型:" + typeof cmt.add_time); //number

            Toast(response.body.message);
            this.content = "";
          } else {
            Toast("评论失败，请重新发表");
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }
  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 14px;
      .cmt-title {
        background-color: pink;
        line-height: 35px;
      }
      .cmt-body {
        text-indent: 2em;
      }
    }
  }
}
</style>
