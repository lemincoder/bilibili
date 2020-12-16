<template>
  <div id="register">
    <login-top middleTop="注册bilibili">
      <div slot="right" style="font-size: 13px" @click="$router.replace('/login')">切换到登录</div>
    </login-top>
    <login-text label="姓名"
                placeholder="请输入姓名"
                type="text"
                style="margin: 10px 0"
                rule="^.{6,16}$"
                @inputChange="res => model.name = res"/>
    <login-text label="账号"
                placeholder="请输入账号"
                rule="^.{6,16}$"
                @inputChange="res => model.username = res"/>
    <login-text label="密码"
                placeholder="请输入密码"
                type="password"
                rule="^.{6,16}$"
                @inputChange="res => model.password = res"/>
    <login-button btn-text="注册"
                  @registerSubmit="registerSubmit"/>
  </div>
</template>

<script>
  import LoginTop from "components/common/LoginTop";
  import LoginText from "components/common/LoginText";
  import LoginButton from "components/common/LoginButton";

  export default {
    name: "Register",
    components: {
      LoginTop,
      LoginText,
      LoginButton
    },
    data() {
      return {
        model: {}
      };
    },
    methods: {
      async registerSubmit() {
        let rulg = /^.{6,16}/
        if (rulg.test(this.model.name) && rulg.test(this.model.username) && rulg.test(this.model.password)) {
          const res = await this.$http.post('/register', this.model)
          this.$msg.fail(res.data.msg)
          localStorage.setItem('id',res.data.id)
          localStorage.setItem('token',res.data.objtoken)
          setTimeout(() => {
            this.$router.replace('/userinfo')
          }, 500)
        }else {
          this.$msg.fail('用户名格式错误')
        }
      }
    }
  }
</script>

<style scoped>

</style>