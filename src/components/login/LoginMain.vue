<template>
  <body id="poster">
  <el-form class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">图书系统</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.cardNo" auto-complete="off" placeholder="借阅证号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="对应密码"></el-input>
    </el-form-item>
    <el-row :gutter="20">
      <el-col :span="12"><div class="grid-content bg-purple"> <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="login">登录</el-button>
      </el-form-item></div></el-col>
      <el-col :span="12"><div class="grid-content bg-purple"> <el-form-item style="width: 100%">
        <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="toregister">注册</el-button>
      </el-form-item></div></el-col>
    </el-row>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'LoginMain',
  data () {
    return {
      loginForm: {
        cardNo: '',
        password: ''
      },
      responseResult: []
    }
  },
  methods: {
    // 8
    login () {
      var _this = this
      this.$axios
        .post('/login', {
          cardNo: this.loginForm.cardNo,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('login', _this.loginForm)
            this.$router.replace('/libraryShow')
          } else {
            this.$alert('借阅证号或密码错误', '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    toregister () {
      this.$router.replace('/register')
    }
  }
}
</script>

<style scoped>
#poster {
  height: 100%;
  background: wheat;
  background: url("https://db-homework.oss-cn-beijing.aliyuncs.com/celeste3.png") no-repeat center;
  width: 100%;
  background-size: cover;
  position: fixed;
  overflow:auto;/* 设置父容器的滚动条*/
}
.login-container{
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #ffffff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title{
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
body{
  margin: 0px;
}
</style>
