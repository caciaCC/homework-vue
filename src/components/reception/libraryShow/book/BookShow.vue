<template>
  <div>
    <el-row style="height: 840px; ">

      <search-bar @onSearch="searchResult" ref="searchBar"></search-bar>
      <div >
        <el-tooltip content="搜索书架" placement="top">
          <el-button  size="medium" @click="searchResult" style="float: right" :type="btn0" circle icon="el-icon-search"></el-button>
        </el-tooltip>
      </div>
      <div >
        <el-tooltip content="图书馆书架" placement="top">
          <el-button   size="medium" @click="loadBooks" style="float: right" :type="btn1" circle icon="el-icon-s-grid"></el-button>
        </el-tooltip>
      </div>
      <div >
        <el-tooltip content="个人书架" placement="top">
        <el-button    size="medium" @click="loadPersonBooks" style="float: right" :type="btn2" circle icon="el-icon-s-custom"></el-button>
        </el-tooltip>
      </div>
      <div >
        <el-tooltip content="预约书架" placement="top">
          <el-button    size="medium" @click="loadRserveBooks" style="float: right" :type="btn3" circle icon="el-icon-s-flag"></el-button>
        </el-tooltip>
      </div>
      <el-tooltip effect="dark" placement="right"
                  v-for="item in books.slice((currentPage-1)*pagesize,currentPage*pagesize)"
                  :key="item.id"
                  open-delay="100" >
        <p slot="content" style="font-size: 14px;margin-bottom: 6px;" >{{item.title}}</p>
        <p slot="content" style="font-size: 13px;margin-bottom: 6px">
          <span>{{item.author}}</span> /
          <span>{{item.date}}</span> /
          <span>{{item.press}}</span>
        </p>
        <p slot="content" style="width: 300px" class="abstract">{{item.abs}}</p>
        <el-card style="width: 135px;margin-bottom: 15px;height: 243px;float: left;margin-right: 15px" class="book"
                 bodyStyle="padding:10px" shadow="hover">
          <div class="cover" @click="choosebtn === 2 && backBook(item)">
            <img :src="item.cover" alt="封面">
          </div>
          <div class="info">
            <div class="title">
              <a href="">{{item.title}}</a>
            </div>
          </div>
          <div class="author">{{item.author}}</div>
        </el-card>
      </el-tooltip>
    </el-row>
    <el-row>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="books.length">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
import SearchBar from './SearchBar'
import store from '../../../../save'
export default {
  name: 'BookShow',
  components: {SearchBar},
  data () {
    return {
      books: [],
      currentPage: 1,
      pagesize: 18,
      choosebtn: 2,
      btn0: 'info',
      btn1: 'info',
      btn2: 'success',
      btn3: 'info'
    }
  },
  mounted: function () {
    this.loadPersonBooks()
  },
  methods: {
    // 56
    backBook (item) {
      this.$confirm('是否确认归还该图书', '图书归还', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios
          .post('/book/back', {
            bid: item.id,
            cardNo: store.state.user.cardNo
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$alert('操作成功', '提示', {
                confirmButtonText: '确定'
              })
              this.loadPersonBooks()
            } else {
              this.$alert(resp.data.message, '提示', {
                confirmButtonText: '确定'
              })
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '操作已取消'
        })
      })
    },
    // 3
    loadBooks () {
      var _this = this
      var url
      if (store.state.cid === '') store.state.cid = 0
      url = 'category/' + store.state.cid + '/books'
      this.$axios.get(url).then(resp => {
        if (resp && resp.data.code === 200) {
          _this.currentPage = 1
          _this.books = resp.data.result
          _this.btn0 = 'info'
          _this.btn1 = 'success'
          _this.btn2 = 'info'
          _this.btn3 = 'info'
          _this.choosebtn = 1
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    // 2  17
    searchResult () {
      var _this = this
      if (store.state.cid === '') store.state.cid = 0
      this.$axios
        .get('category/' + store.state.cid + '/search?key=' + this.$refs.searchBar.keywords, {
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.currentPage = 1
            _this.books = resp.data.result
            _this.btn0 = 'primary'
            _this.btn1 = 'info'
            _this.btn2 = 'info'
            _this.btn3 = 'info'
            _this.choosebtn = 0
          }
        })
    },
    // 16
    loadPersonBooks () {
      var _this = this
      var url
      if (store.state.cid === '') store.state.cid = 0
      url = 'category/' + store.state.cid + '/personBooks'
      this.$axios
        .post(url, {
          cardNo: store.state.user.cardNo
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.currentPage = 1
            _this.books = resp.data.result
            _this.btn0 = 'info'
            _this.btn1 = 'info'
            _this.btn2 = 'danger'
            _this.btn3 = 'info'
            _this.choosebtn = 2
          }
        })
        .catch(failResponse => {
        })
    },
    // 44
    loadRserveBooks () {
      var _this = this
      var url
      if (store.state.cid === '') store.state.cid = 0
      url = 'category/' + store.state.cid + '/reserveBooks'
      this.$axios
        .post(url, {
          cardNo: store.state.user.cardNo
        })
        .then(resp => {
          if (resp.data.code === 200) {
            _this.currentPage = 1
            _this.books = resp.data.result
            _this.btn0 = 'info'
            _this.btn1 = 'info'
            _this.btn2 = 'info'
            _this.btn3 = 'warning'
            _this.choosebtn = 3
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style scoped>
.cover {
  width: 115px;
  height: 172px;
  margin-bottom: 7px;
  overflow: hidden;
  cursor: pointer;
}

img {
  width: 115px;
  height: 172px;
}

.title {
  font-size: 14px;
  text-align: left;
}

.author {
  color: #333;
  width: 102px;
  font-size: 13px;
  margin-bottom: 6px;
  text-align: left;
}

.abstract {
  display: block;
  line-height: 17px;
}

.el-icon-delete {
  cursor: pointer;
  float: right;
}

.switch {
  display: flex;
  position: absolute;
  left: 780px;
  top: 25px;
}

a {
  text-decoration: none;
}

a:link, a:visited, a:focus {
  color: #3377aa;
}

</style>
