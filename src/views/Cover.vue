<template>
  <div @click="$router.push(`/article/${detailitem.id}`)">
    <div class="detailitem">
      <div class="imgparent">
        <img src="@/assets/default.jpeg" alt="" style="width: 100%;">
        <div class="bottom">
          <div class="icon-play2"><span class="video ">777</span></div>
          <div class="icon-file-text"><span class="comment ">233</span></div>
        </div>
      </div>
      <p>{{detailitem.name}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Cover",
    props:['detailitem'],
    data() {
      return {
        errorImg01: 'this.src="' + require('@/assets/default.jpeg') + '"'
      }
    }
  }
</script>

<style scoped lang="less">
.detailitem {
  p {
    font-size: 12px;
  }
  .imgparent {
    font-size: 12px;
    color: #fff;
    position: relative;
    .bottom {
      position: absolute;
      bottom: 0px;
      left: 0;
      right: 0;
      padding: 5px 5px;
      background: linear-gradient(0deg,rgba(0,0,0,0.85),transparent);
      display: flex;
      justify-content: space-between;
    }

  }
}
</style>