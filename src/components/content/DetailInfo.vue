<template>
  <div id="detailinfo">
    <div class="top">
      <div class="user_img"><img :src="model.user_img" alt=""></div>
      <div class="user_edit">
        <div class="user_detail">
          <p>
            <span>42</span>
            <span>粉丝</span>
          </p>
          <span></span>
          <p>
            <span>20</span>
            <span>关注</span>
          </p>
          <span></span>
          <p>
            <span>9</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="edit_info" @click="$router.push('edit')">编辑资料</div>
      </div>
    </div>
    <div class="bottom">
      <h3>{{model.username}}</h3>
      <p>{{model.user_desc}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailInfo",
    data() {
      return {
        model: {}
      }
    },
    async mounted() {
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
      this.model = res.data[0]
    }
  }
</script>

<style scoped lang="less">
  * {
    padding: 0;
    margin: 0;
  }
  #detailinfo {
    background-color: white;
    padding: 0 12px;
    .top {
      display: flex;
    .user_img {
      overflow: hidden;
      height: 85px;
      width: 85px;
      border-radius: 50%;
      img {
        width: 85px;
      }
    }
      .user_edit {
        flex: 1;
        margin-left: 30px;

        .user_detail {
          display: flex;
          font-size: 12px;
          margin: 10px 0px 15px;

          > p {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            > span:nth-child(2) {
              color: gray;
            }
          }

          > span:before {
            content: "";
            width: 2px;
            height: 1.2em;
            background-color: lightgray;
            margin-top: 7px;
            display: block;
          }
        }

        .edit_info {
          text-align: center;
          border: 1px solid hotpink;
          line-height: 25px;
          font-size: 14px;
          color: hotpink;
          border-radius: 3px;
        }
      }
    }
    .bottom {
      margin-top: 15px;
      >h3 {
        font-weight: 400;
      }
      >p {
        padding: 10px 0 15px 0;
        font-size: 13px;
        color: #555;
      }
    }
  }

</style>