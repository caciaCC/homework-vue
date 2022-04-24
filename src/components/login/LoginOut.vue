<template>
<p></p>
</template>

<script>
import store from '../../save'
// import {createRouter} from '../../router'

export default {
  name: 'LoginOut',
  mounted: function () {
    this.loginOut()
  },
  methods: {
    // 10
    loginOut () {
      var _this = this
      this.$axios
        .post('/logout', {
          phoneNumber: store.state.user.phoneNumber
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            _this.$store.commit('logout')
            // 清空路由,防止路由重新加载
            _this.$router.replace('/')
            // const newRouter = createRouter()
            // _this.$router.matcher = newRouter.matcher
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>

</style>
