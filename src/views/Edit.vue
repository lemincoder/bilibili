<template>
  <div>
    <nav-bar class="nav-bar"/>

    <div class="uploadfile">
      <van-uploader preview-size="100vw" class="van-uploader" :after-read="afterRead"/>
      <edit-banner class="head-img" left="头像">
        <div class="img" slot="right">
          <img :src="model.user_img" alt="" v-if="model.user_img">
          <img src="@/assets/default_img.jpg" slot="right" alt="" v-else>
        </div>
      </edit-banner>
    </div>
    <edit-banner left="昵称" @itemClick="show = true">
      <span slot="right">{{model.username}}</span>
    </edit-banner>
    <edit-banner left="UID">
      <span slot="right">{{model.id}}</span>
    </edit-banner>
    <edit-banner left="性别" @itemClick="gendershow = true">
      <span slot="right">{{model.gender == 1 ? '男' : '女'}}</span>
    </edit-banner>
    <edit-banner left="个性签名" @itemClick="textshow = true">
      <span slot="right">{{model.user_desc}}</span>
    </edit-banner>

    <van-dialog v-model="show"
                title="昵称"
                show-cancel-button
                @confirm="userNameConfire"
                @cancel="content=''">
      <van-field v-model="content" autofocus/>
    </van-dialog>
    <van-dialog v-model="textshow"
                title="个性签名"
                show-cancel-button
                @confirm="userDescConfire"
                @cancel="content=''">
      <van-field v-model="content" autofocus/>
    </van-dialog>
    <van-action-sheet v-model="gendershow" cancel-text="取消" :actions="actions" @select="onSelect" />

    <div class="back" @click="$router.push('/userinfo')">返回个人中心</div>
  </div>
</template>

<script>
  import NavBar from "../components/common/NavBar";
  import EditBanner from "../components/content/EditBanner";

  export default {
    name: "Edit",
    components: {
      NavBar,
      EditBanner
    },
    data() {
      return {
        model:{},
        show: false,
        textshow: false,
        gendershow: false,
        content: '',
        actions: [{ name: '男',value: 1 },
          { name: '女', value: 0}]
      }
    },
    methods: {
      async selectUser() {
        const res = await this.$http.get('/user/' + localStorage.getItem('id'))
        this.model = res.data[0]
      },
      async afterRead(file) {
        const formdata = new FormData()
        formdata.append('file', file.file)
        const res = await this.$http.post('upload', formdata)
        this.model.user_img = res.data.url
        this.UserUpdate()
      },
      async UserUpdate() {
        const res = await this.$http.post('/update/' + localStorage.getItem('id'), this.model)
        if (res.data.code == 200) {
          this.$msg.fail('修改成功')
        }
      },
      userNameConfire() {
        this.model.username = this.content
        this.UserUpdate()
        this.content = ''
      },
      userDescConfire() {
        this.model.user_desc = this.content
        this.UserUpdate()
        this.content = ''
      },
      onSelect(item) {
        // 默认情况下点击选项时不会自动收起
        // 可以通过 close-on-click-action 属性开启自动收起
        this.model.gender = item.value
        this.UserUpdate()
        this.gendershow = false
      }
    },
    created() {
      this.selectUser()
    }
  }
</script>

<style scoped lang="less">
  .nav-bar {
    margin-bottom: 10px;
  }
  .uploadfile {
    position: relative;
    overflow: hidden;
    .head-img {
      .img {
        width: 46px;
        height: 46px;
        overflow: hidden;
        border-radius: 50%;
        >img {
          width: 100%;
          height: 100%;
          object-fit: cover
        }
      }
      padding: 0;
    }
    .van-uploader {
      position: absolute;
      opacity: 0;
    }
  }
  .back {
    margin-top: 15px;
    background-color: #fff;
    height: 45px;
    line-height: 45px;
    font-size: 15px;
    color: #aaaaaa;
    text-align: center;
  }

</style>