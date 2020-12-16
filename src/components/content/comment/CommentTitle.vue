<template>
  <div id="comment">
    <p>
      <span>评论</span>
      <span>({{length}})</span>
    </p>
    <div class="user_info">
      <div class="head_img">
        <img :src="myuser.user_img" alt="" v-if="myuser">
        <img src="@/assets/default_img.jpg" v-else>
      </div>
      <input type="text" v-model="content" ref="Postipt" placeholder="说点什么吧">
      <button @click="commentPublish">发表</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment",
    props: ['length'],
    data() {
      return {
        myuser: null,
        content: ''
      }
    },
    methods: {
      async myUserData() {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.myuser = res.data[0]
      },
      commentPublish() {
        if (!this.myuser && !localStorage.getItem('token') && !localStorage.getItem('id')) {
          this.$msg.fail('请先登录')
          return
        }
        if (this.content != ''){
          this.$emit('mainpublish', this.content)
        }
      },
      focusIpt() {
        this.$refs.Postipt.focus()
      },
      clearContent() {
        this.content = ''
      }
    },
    created() {
      if (localStorage.getItem('token')) {
        this.myUserData()
      }
    }
  }
</script>

<style scoped lang="less">
#comment {
  padding: 0px 10px;
  margin-top: 10px;
  p {
    margin: 15px 0px;
    font-size: 14px;
    span:nth-child(2) {
      color: #aaaaaa;
      margin-left: 5px;
    }
  }
  .user_info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head_img {
      width: 24px;
      height: 24px;
      overflow: hidden;
      border-radius: 50%;
      >img {
        width: 100%;
      }
    }
    >input {
      width: 60%;
      height: 20px;
      font-size: 12px;
      line-height: 20px;
      background-color: #f4f4f4;
      border-style: none ;
      border-radius: 12px;
      padding-left: 10px;
    }
    >button {
      border-style: none;
      height: 20px;
      background-color: hotpink;
      color: white;
      font-size: 12px;
      padding: 0 10px;
      border-radius: 10px;
    }
  }
}

</style>