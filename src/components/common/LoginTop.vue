<template>
  <div>
    <div class="LoginTop">
      <div></div>
      <div>{{middleTop}}</div>
      <div><slot name="right"></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginTop",
    props: {
      middleTop: {
        type: String
      },
    }
  }
</script>

<style scoped>
.LoginTop {
  height: 45px;
  display: flex;
  line-height: 45px;
  background-color: #fff;

}
  .LoginTop>div {
    flex: 1;
    text-align: center;
    font-size: 4.44vw;
  }

</style>