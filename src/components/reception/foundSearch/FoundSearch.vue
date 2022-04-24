<template>
  <el-container>
<!--    <div style="margin-bottom: 30px;height:400px;display: flex;justify-content: center;align-items: center">-->
<!--      <el-input-->
<!--        @keyup.enter.native="searchClick"-->
<!--        placeholder="通过书名或作者搜索..."-->
<!--        prefix-icon="el-icon-search"-->
<!--        size="large"-->
<!--        style="width: 400px;margin-right: 10px"-->
<!--        v-model="keywords">-->
<!--      </el-input>-->
<!--      <el-button size="small" type="primary" icon="el-icon-search" @click="searchClick">搜索</el-button>-->
<!--    </div>-->
    <div class="box">
      <div class="searchBox">
        <input type="text"  v-model="keywords" @keyup.enter="searchClick"  placeholder="请输入你想查找的拾物标题进行搜索" class="searchInput" style="padding-left: 10px;">
        <input type="button" @click="searchClick" value="搜索" class="searchButton">
      </div>
    </div>
  </el-container>
</template>

<script>
import store from '../../../save'
export default {
  name: 'FoundSearch',
  store,
  data () {
    return {
      keywords: '',
      books: [],
      cardLoading: []
    }
  },
  // 12
  methods: {
    searchClick () {
      store.commit('setKey', this.keywords)
      this.$router.replace('result')
    }
  }
}
</script>

<style scoped>
.box{
  margin: 0 auto;
  padding-top: 80px;
  height: 50px;
  width: 100%;
}
.searchBox{
  margin: 0 auto;
  width: 60%;
  position: relative;
}
.searchInput{
  display: inline-block;
  width: 85%;
  height: 38px;
  border: 1px solid #cccccc;
  float: left;
  box-sizing: border-box;
  -moz-box-sizing:border-box; /* Firefox */
  -webkit-box-sizing:border-box; /* Safari */
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
}
.searchButton{
  display: inline-block;
  width: 15%;
  height: 38px;
  line-height: 40px;
  float: left;
  background-color: #00BFFF;
  font-size: 16px;
  cursor: pointer;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border: none;
  color: #fff;
}
</style>
