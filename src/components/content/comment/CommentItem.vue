<template>
  <div id="comment-item">
    <div  v-for="(item, index) in commentChild" :key="index">
      <div class="content">
        <div class="head_img">
          <img v-if="item.userinfo && item.userinfo.user_img" :src="item.userinfo.user_img" alt="">
          <img v-else src="@/assets/default_img.jpg" alt="">
        </div>
        <div class="comment-info">
          <p>
            <span v-if="item.userinfo">{{item.userinfo.name}}</span>
            <span v-if="item.comment_date">{{item.comment_date}}</span>
          </p>
          <p v-if="!temp">{{item.comment_content}}<span class="publish" @click="PostItemClick(item.comment_id)">回复</span></p>
          <p v-else><span>回复<span style="color: deepskyblue">{{item.parent_user_info.name}}</span>: {{item.comment_content}}</span><span class="publish" @click="PostItemClick(item.comment_id)">回复</span></p>
        </div>
      </div>
      <comment-item :comment-child="item.child" @PostChild="PostChild" temp="true"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CommentItem",
    components: {Comment},
    props: ['commentChild', 'temp'],
    methods: {
      PostItemClick(id) {
        this.$emit('PostChild', id)
        this.$emit('postPublish', id)
      },
      PostChild(id) {
        this.PostItemClick(id)
        this.$emit('postPublish', id)
      }
    }
  }
</script>

<style scoped lang="less">
  .content {
    padding-bottom: 20px ;
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
    margin-left: 10px;
    flex: 1;
    p:first-child {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #555555;
      span:first-child {
      font-size: 14px;
    }
  }
    p:last-child {
      font-size: 14px;
      display: flex;
      justify-content: space-between;
      .publish {
        white-space: nowrap;
        font-size: 13px;
        color: hotpink;
      }
    }
  }
  }
</style>