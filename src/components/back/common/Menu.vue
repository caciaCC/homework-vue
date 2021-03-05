<template>
  <div  class="el-menu-admin">
    <el-menu
      :default-active="currentPath"
      router
      mode="vertical"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      height="100%"
      width="100%">
      <div style="height: 80px;"></div>
      <template v-for="(item,i) in backMenus" >
        <!--index 没有用但是必需字段且为 string -->
        <el-submenu :key="i" :index="i + ''" style="text-align: left">
          <span slot="title" style="font-size: 17px;">
            <i :class="item.icon"></i>
            {{item.nameCn}}
          </span>
          <el-menu-item v-for="child in item.children" :key="child.path" :index="child.path">
            <i :class="child.icon"></i>
            {{ child.nameCn}}
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu.vue',
  data () {
    return {
      navList: [
        {name: '/back/home', navItem: '首页'},
        {name: '/back/library', navItem: '图书管理'}
      ]
    }
  },
  computed: {
    backMenus () {
      return this.$store.state.backMenus
    },
    currentPath () {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.el-menu-admin {
  border-radius: 5px;
  /*height: 100%;*/
}
</style>
