<template>
  <el-menu
    :default-active="currentPath"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="green"
    style="min-width: 1300px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{item.navItem}}
    </el-menu-item>
    <i class="el-icon-s-platform" v-on:click="toBack" style="margin-right:10px;float:right;font-size: 25px;color: #222;padding: 20px"></i>
    <a style="color:#222;float: right;margin-right:-25px;padding: 20px;">转到后台</a>
    <span style="position: absolute;padding-top: 20px;right: 33%;font-size: 20px;font-weight: bold"></span>
  </el-menu>
</template>

<script>
// import store from '../../../save'

export default {
  name: 'NavMenu',
  data () {
    return {
      navList: [
        {name: '/libraryReservation', navItem: '图书预约'},
        {name: '/libraryShow', navItem: '书架展示'},
        {name: '/libraryNotice', navItem: '个人消息'},
        {name: '/logout', navItem: '退出登录'}
      ]
    }
  },
  // cha
  methods: {
    toBack () {
      // this.$axios
      //   .post('/back/access', {
      //     username: store.state.user.username
      //   })
      //   .then(successResponse => {
      //     if (successResponse.data.code === 200) {
      //       this.$router.replace('/back')
      //     } else {
      //       this.$alert('没有对应的权限', '提示', {
      //         confirmButtonText: '确定'
      //       })
      //     }
      //   })
      //   .catch(failResponse => {
      //   })
      this.$router.replace('/back')
    }
  },
  computed: {
    currentPath () {
      if (this.$route.path.startsWith('/libraryReservation')) return '/libraryReservation'
      if (this.$route.path.startsWith('/libraryNotice')) return '/libraryNotice'
      return this.$route.path
    }
  }
}
</script>

<style scoped>
a{
  text-decoration: none;
}
span{
  pointer-events: none;
}
.el-icon-s-platform {
  cursor: pointer;
  outline:0;
}
</style>
