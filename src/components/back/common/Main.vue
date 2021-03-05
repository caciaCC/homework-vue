<template>
  <el-container id="admin-body" >
    <el-header style="z-index: 1;height: 80px;margin-left: -20px">
      <Header style="position: absolute;width: 100%;"></Header>
    </el-header>
    <el-container style="height: 100%;" >
      <el-aside style="height: 113%;margin-top: -80px;width: 250px;background-color:#545c64">
        <Menu></Menu>
      </el-aside>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './Header'
import Menu from './Menu'
export default {
  name: 'Main.vue',
  components: {Header, Menu}
}
</script>

<style scoped>
#admin-body {
  height: 100%;
  background: wheat;
  background: url("https://db-homework.oss-cn-beijing.aliyuncs.com/celeste.png") no-repeat center;
  width: 100%;
  background-size: cover;
  position: fixed;
  overflow:auto;/* 设置父容器的滚动条*/
}

</style>
