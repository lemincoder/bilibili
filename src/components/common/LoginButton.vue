<template>
  <div class="LoginButton" @click="registerSubmit">
    <div class="button">{{btnText}}</div>
  </div>
</template>

<script>
  export default {
    name: "LoginButton",
    props:['btnText'],
    methods: {
      registerSubmit() {
        this.$emit('registerSubmit')
      }
    }
  }
</script>

<style scoped>
  .LoginButton {
    margin-top: 10px;
  }
  .button {
    width: 94vw;
    height: 40px;
    margin: 0 auto;
    text-align: center;
    line-height: 40px;
    background-color: lightpink;
    color: #ffffff;
    border-radius: 20px;
  }
</style>