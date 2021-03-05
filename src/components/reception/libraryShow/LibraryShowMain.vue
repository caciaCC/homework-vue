<template>
  <el-container>
    <el-aside style="width: 250px;margin-top: 20px">
      <switch></switch>
      <SideMenu @indexSelect="listByCategory" ref="sideMenu"></SideMenu>
    </el-aside>
    <el-main>
      <book-show class="books-area" ref="booksArea"></book-show>
    </el-main>
  </el-container>
</template>

<script>
import SideMenu from './menu/SideMenu'
import BookShow from './book/BookShow'
import store from '../../../save'
export default {
  name: 'LibraryShowMain',
  components: {SideMenu, BookShow},
  methods: {
    // 3    16
    listByCategory () {
      var _this = this
      var cid = this.$refs.sideMenu.cid
      var url
      // 16
      console.log(this.$refs.sideMenu.cid)
      if (this.$refs.booksArea.choosebtn === 2) {
        url = 'category/' + cid + '/personBooks'
        this.$axios
          .post(url, {
            cardNo: store.state.user.cardNo
          })
          .then(resp => {
            if (resp.data.code === 200) {
              _this.$refs.booksArea.currentPage = 1
              _this.$refs.booksArea.books = resp.data.result
            }
          })
          .catch(failResponse => {
          })
      } else if (this.$refs.booksArea.choosebtn === 1) {
        // 3
        url = 'category/' + cid + '/books'
        this.$axios.get(url).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.$refs.booksArea.currentPage = 1
            _this.$refs.booksArea.books = resp.data.result
          }
        })
      } else if (this.$refs.booksArea.choosebtn === 0) {
        // 17
        url = 'category/' + cid + '/search?key=' + this.$refs.booksArea.$refs.searchBar.keywords
        console.log(this.$refs.booksArea.$refs.searchBar.keywords)
        this.$axios
          .get(url).then(resp => {
            if (resp && resp.data.code === 200) {
              _this.$refs.booksArea.currentPage = 1
              _this.$refs.booksArea.books = resp.data.result
            }
          })
          .catch(failResponse => {
          })
      } else {
        url = 'category/' + cid + '/reserveBooks'
        this.$axios
          .post(url, {
            cardNo: store.state.user.cardNo
          })
          .then(resp => {
            if (resp.data.code === 200) {
              _this.$refs.booksArea.currentPage = 1
              _this.$refs.booksArea.books = resp.data.result
            }
          })
          .catch(failResponse => {
          })
      }
    }

  }
}
</script>

<style scoped>
.books-area {
  width: 1060px;
  margin-left: auto;
  margin-right: auto;
}
</style>
