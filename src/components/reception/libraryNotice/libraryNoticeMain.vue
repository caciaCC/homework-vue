<template>
  <div style="margin-top: 40px">
<!--    <side-menu id="side-menu"></side-menu>-->
    <div class="home">
<!--      <div id="header-div">-->
<!--        <div style="height: 150px"></div>-->
<!--&lt;!&ndash;        <carousel></carousel>&ndash;&gt;-->
<!--&lt;!&ndash;        <quick-nav style="float: right;margin-top: -450px;margin-right: 480px"></quick-nav>&ndash;&gt;-->
<!--      </div>-->
      <router-view></router-view>
<!--      <slogan id="slogan"></slogan>-->
<!--      <about id="about"></about>-->
    </div>
  </div>
</template>

<script>
import ReservationInfo from './ReservationInfo'
export default {
  name: 'libraryNoticeMain.vue',
  components: {ReservationInfo}
}
</script>

<style scoped>
.home {
  width: 990px;
  margin-left: auto;
  margin-right: auto;
  margin-top: -20px;
}
</style>
