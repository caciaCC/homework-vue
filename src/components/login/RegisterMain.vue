<template>
  <body id="paper">
  <el-form class="login-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="login_title">学生注册</h3>
    <el-form-item>
      <el-input type="text" v-model="loginForm.sno" auto-complete="off" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item>
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="对应密码"></el-input>
    </el-form-item>
    <slide-verify :l="42"
                  :r="10"
                  :w=auto
                  :h="155"
                  slider-text="向右滑动"
                  @success="onSuccess"
                  @fail="onFail"
                  @refresh="onRefresh"
                  :imgs="puzzleImgList"
    ></slide-verify>
<!--    <div>-->
<!--      <a style="margin-top:8px;float: left">角色</a>-->
<!--      <el-radio v-model="loginForm.role" label="0" border>管理员</el-radio>-->
<!--      <el-radio v-model="loginForm.role" label="1" border>用户</el-radio>-->
<!--    </div>-->
    <div>{{msg}}</div>
    <el-form-item style="width: 100%">
      <el-button type="primary" style="width: 100%;background: #505458;border: none" v-on:click="register">生成借阅证</el-button>
    </el-form-item>
  </el-form>
  </body>
</template>

<script>
export default {
  name: 'RegisterMain',
  data () {
    return {
      checked: true,
      loginForm: {
        sno: '',
        password: ''
      },
      loading: false,
      msg: '',
      puzzleImgList: [
        // require('https://db-homework.oss-cn-beijing.aliyuncs.com/celeste3.png')
        require('../../assets/0.png'),
        require('../../assets/celeste3.png')
        // {imgSrc: 'https://db-homework.oss-cn-beijing.aliyuncs.com/c1.png'}
        // {id: 2, imgSrc: 'https://db-homework.oss-cn-beijing.aliyuncs.com/c2.png'},
        // {id: 3, imgSrc: 'https://db-homework.oss-cn-beijing.aliyuncs.com/c3.png'},
        // {id: 4, imgSrc: 'https://db-homework.oss-cn-beijing.aliyuncs.com/celeste.png'},
        // {id: 5, imgSrc: 'https://db-homework.oss-cn-beijing.aliyuncs.com/celeste2.png'},
        // {id: 6, imgSrc: 'https://db-homework.oss-cn-beijing.aliyuncs.com/celeste3.png'}
      ]
    }
  },
  methods: {
    // 9
    register () {
      var _this = this
      if (this.msg === '验证成功') {
        this.$axios
          .post('/register', {
            sno: this.loginForm.sno,
            password: this.loginForm.password
          })
          .then(resp => {
            if (resp.data.code === 200) {
              this.$alert('生成借阅证成功' + `借阅证号:` + resp.data.result.cardNo +
                '密码:默认为学号对应密码', '提示', {
                confirmButtonText: '确定'
              })
              _this.$router.replace('/login')
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
          .catch(failResponse => {})
      }
    },
    onSuccess () {
      this.msg = '验证成功'
    },
    onFail () {
      this.msg = '验证失败'
    },
    onRefresh () {
      this.msg = ''
    }
  }
}
</script>

<style scoped>
#paper {
  background: url("../../assets/celeste3.png") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}
body{
  margin: -5px 0px;
}
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
