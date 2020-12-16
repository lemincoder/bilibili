<template>
  <div id="navbar">
    <div class="logo" @click="changeRouter('/home')">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div>
      <p>请输入内容
        <van-icon class="van-icon" name="search" />
      </p>
    </div>
    <div class="head_img">
      <div class="img">
        <img :src="imgURL" alt="" @click="changeRouter('/edit')" v-if="imgURL">
        <img src="@/assets/default_img.jpg" @click="$router.push('/login')" alt="" v-else>
      </div>
      <p>下载App</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar",
    data() {
      return {
        imgURL:''
      }
    },
    async created() {
      if (localStorage.getItem('token')) {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.imgURL = res.data[0].user_img
      }
    },
    methods: {
      changeRouter(url) {
        if (this.$route.path != url)
          this.$router.push(url)
      }
    }
  }
</script>

<style scoped lang="less">
 #navbar {
   height: 45px;
   background-color: #ffffff;
   display: flex;
   .logo {
     height: 100%;
     width: 90px;
     display: flex;
     justify-content: center;
     align-items: center;
     >img {
       height: 80%;
     }
   }
   div:nth-child(2) {
     flex: 1;
     display: flex;
     align-items: center;
     >p{
       background-color: #f4f4f4;
       width: 90%;
       padding:3px 0px 3px 20px;
       border-radius: 12px;
       position: relative;
       color: gray;
       font-size: 13px;
     }
     >.van-icon {
       position: absolute;
       left: 5px;
       top: 6px;
     }
   }
   div:nth-child(3) {
     display: flex;
     justify-content: center;
     align-items: center;
     margin-left: 10px;
     >.img {
       width: 24px;
       height: 24px;
       border-radius: 50%;
       overflow: hidden;
       >img {
         width: 100%;
         height: 100%;
         object-fit: cover
       }
     }
     >p {
       padding: 5px 10px;
       background-color: hotpink;
       color: white;
       font-size: 12px;
       border-radius: 3px;
       margin: 0 8px;
     }
   }
 }


</style>