<template>
  <div id="comment">
    <div v-for="(commentitem,index) in comment" :key="index">
      <div class="content" >
        <div class="head_img">
          <img v-if="commentitem.userinfo && commentitem.userinfo.user_img" :src="commentitem.userinfo.user_img" alt="">
          <img v-else src="@/assets/default_img.jpg" alt="">
        </div>
        <div class="comment-info">
          <p>
            <span v-if="commentitem.userinfo">{{commentitem.userinfo.name}}</span>
            <span v-if="commentitem.comment_date">{{commentitem.comment_date}}</span>
          </p>
          <p v-if="commentitem.comment_content">
            <span>{{commentitem.comment_content}}</span>
            <span @click="publishClick(commentitem.comment_id)" class="publish">回复</span>
          </p>
        </div>
      </div>
      <div style="padding-left: 30px" ><div><comment-item @postPublish="postPublish" :comment-child="commentitem.child"/></div></div>
    </div>
  </div>
</template>

<script>
  import CommentItem from "./CommentItem";

  export default {
    name: "Comment",
    components: {
      CommentItem
    },
    data() {
      return {
        comment: null
      }
    },
    methods: {
       async commentData() {
         const res = await this.$http.get('/comment/' + this.$route.params.id)
         if(res.data) {
           this.$emit('commentlength', res.data.length)
         }
         this.comment = this.changeCommentData(res.data)
       },
      changeCommentData(data) {
         function fn(temp) {
           let arr1 = []
           for (let i = 0; i < data.length; i++) {
             if (data[i].parent_id == temp) {
               arr1.push(data[i])
               data[i].child = fn(data[i].comment_id)
             }
           }
           return arr1
         }
        return fn(null)
      },
      publishClick(id) {
        this.$emit('publishClick', id)
      },
      postPublish(id) {
        this.$emit('itemPublic', id)
      }
    },
    created() {
      this.commentData()
    }
  }
</script>

<style scoped lang="less">
#comment {
  padding: 10px 5px;
  >div {
    border-bottom: #f4f4f4 1px solid;
    .content {
      padding: 10px 0 20px 0;
      display: flex;
      .head_img {
        width: 35px;
        height: 35px;
        flex-shrink: 0;
        overflow: hidden;
        border-radius: 50%;
        >img {
          width: 100%;
          height: 100%;
          object-fit: cover
        }
      }
      .comment-info {
        flex: 1;
        margin-left: 10px;
        p:first-child {
          font-size: 14px;
          color: #555555;
          display: flex;
          justify-content: space-between;
          span:last-child {
            font-size: 12px;
          }
        }
        p:last-child {
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          .publish {
            font-size: 13px;
            color: hotpink;
          }
        }
      }
    }
  }
}
</style>