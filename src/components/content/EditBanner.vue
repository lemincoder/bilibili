<template>
  <div id="edit-banner" @click="itemClick">
    <div class="left">{{left}}</div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "EditBanner",
    props:['left'],
    methods: {
      itemClick() {
        this.$emit('itemClick')
      }
    }
  }
</script>

<style scoped lang="less">
#edit-banner {
  padding: 13px 12px;
  background-color: #fff;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
  .left {
    color: #555555;
  }
  .right {
    color: lightgray;
  }
}
</style>