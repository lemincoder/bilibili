<template>
  <div id="userinfo">
    <nav-bar/>
    <img src="@/assets/bannerTop_new.png" alt="">
    <detail-info/>
  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import DetailInfo from "../components/content/DetailInfo";

  export default {
    name: "UserInfo",
    components: {
      NavBar,
      DetailInfo
    },
    data() {
      return {}
    },
    methods: {
      async UserinfoData() {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      }
    },
    created() {
      this.UserinfoData()
    }
  }
</script>

<style scoped lang="less">

  #userinfo{
    >img {
      height: 100px;
      width: 100%;
    }
  }
</style>