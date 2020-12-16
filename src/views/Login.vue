<template>
  <div id="Login">
    <login-top middleTop="登录bilibili">
      <div slot="right" style="font-size: 13px" @click="$router.replace('/register')">切换到注册</div>
    </login-top>
    <login-text label="账号"
                placeholder="请输入账号"
                rule="^.{6,16}$"
                @inputChange="res => model.username = res"
                style="margin: 10px 0"/>
    <login-text label="密码"
                placeholder="请输入密码"
                type="password"
                rule="^.{6,16}$"
                @inputChange="res => model.password = res"/>
    <login-button btn-text="登录"
                  @click=""
                 @registerSubmit="registerSubmit"/>
  </div>
</template>

<script>
  import LoginTop from "components/common/LoginTop";
  import LoginText from "components/common/LoginText";
  import LoginButton from "components/common/LoginButton";

  export default {
    name: "Login",
    components: {
      LoginButton,
      LoginTop,
      LoginText
    },
    data() {
      return {
        model: {}
      };
    },
    methods: {
      async registerSubmit() {
        let rulg = /^.{6,16}/
        if (rulg.test(this.model.username) && rulg.test(this.model.password)) {
          const res = await this.$http.post('/login', this.model)
          this.$msg.fail(res.data.msg)
          if(res.data.code == 301 || res.data.code == 302){
            return
          }
          localStorage.setItem('token',res.data.token)
          localStorage.setItem('id',res.data.id)
          setTimeout(() => {
            this.$router.push('/userinfo')
          },1000)
        }else {
          this.$msg.fail('用户名格式错误')
        }
      }
    }
  }
</script>

<style scoped>

</style>