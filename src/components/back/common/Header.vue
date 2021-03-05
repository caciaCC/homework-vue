<template>
  <el-card class="admin-header">
    <a href="/">
      <img src="../../../assets/Celeste001.png" alt="" width="25px" style="float: left ;margin-top: -5px;">
    </a>
    <span style="font-size: 15px;font-weight: bold;position:absolute;left: 50px;margin-top: -10px;">后 台</span>
    <i style="margin-top: -500px">Welcome to the library system.</i>
    <i class="el-icon-s-home" v-on:click="toFront" style="margin-right:-6px;margin-top:-23px;float:right;font-size: 25px;color: #222;padding: 20px"></i>
    <a style="color:#222;float: right;margin-right:-25px;margin-top:-30px;padding: 20px;">转到前台</a>
  </el-card>
</template>

<script>

export default {
  name: 'Header',
  methods: {
    toFront () {
      var _this = this
      _this.$router.replace('/')
    }
  }
}
</script>

<style scoped>
.admin-header {
  height: 60px;
  opacity: 1.0;
  line-height: 40px;
  min-width: 900px;
}
.el-icon-s-home {
  cursor: pointer;
  outline:0;
}
</style>
