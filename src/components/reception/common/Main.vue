<template>
  <div id="poster">
    <nav-menu></nav-menu>
    <div><router-view/></div>
  </div>
</template>

<script>
import NavMenu from './navMenu'

export default {
  name: 'Main.vue',
  components: {NavMenu}
}
</script>

<style scoped>
#poster{
  background: url("https://db-homework.oss-cn-beijing.aliyuncs.com/celeste2.png") no-repeat center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
  overflow:auto;/* 设置父容器的滚动条*/
}
</style>
