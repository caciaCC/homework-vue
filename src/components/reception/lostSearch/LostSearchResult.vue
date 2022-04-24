<template>
<!--  <el-container >-->
<!--    <el-aside width="240px">Aside</el-aside>-->
<!--    <el-container>-->
<!--      <el-header>-->
<!--     &lt;!&ndash;   <div class="box">&ndash;&gt;-->
<!--        <div class="searchBox">-->
<!--          <input type="text"  @keyup.enter.native="searchClick"  placeholder="请输入你想预约的书籍相关信息进行搜索" class="searchInput" style="padding-left: 10px;">-->
<!--          <input type="button" @click="searchClick" value="搜索" class="searchButton">-->
<!--        </div>-->
<!--        &lt;!&ndash;</div> &ndash;&gt;-->
<!--      </el-header>-->
<!--      <el-main>Main</el-main>-->
<!--      <el-footer>-->
<!--        <el-pagination style="margin-top: 20px"-->
<!--        background-->
<!--        layout="total, prev, pager, next, jumper"-->
<!--        @current-change="handleCurrentChange"-->
<!--        :page-size="pageSize"-->
<!--        :total="total">-->
<!--      </el-pagination>-->
<!--      </el-footer>-->
<!--    </el-container>-->
<!--  </el-container>-->
  <div style="margin-top: 40px">
<!--    <el-button size="mini" @click="addArticle()" style="float: right;margin-right: 200px">重新搜索</el-button>-->
    <el-tooltip content="重新搜索" placement="bottom" effect="light">
    <el-button icon="el-icon-search" @click="toLostSearch()" style="float: right;margin-right: 200px"  type="primary" circle></el-button>
    </el-tooltip>
    <div class="articles-area">
      <el-card style="text-align: left">
        <div v-for="item in losts.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item.id">
          <div style="float:left;width:85%;height: 200px;">
<!--            <router-link class="article-link" :to="{path:'blog/article',query:{id: article.id}}">-->
<!--              <span style="font-size: 20px" class="clearfix">-->
<!--&lt;!&ndash;                <strong>{{article.article_title}}</strong>&ndash;&gt;-->
<!--&lt;!&ndash;                <strong>三体-刘慈欣</strong>&ndash;&gt;-->
<!--              </span>-->
<!--            </router-link>-->
            <div slot="header" class="clearfix">
              <span><i class="el-icon-reading"></i>{{item.title}}</span>
<!--              <el-button @click="cancelBook(item)" type="danger" size="mini" style="float: right;" round :disabled="item.canReserve" >取消</el-button>-->
<!--              <el-button @click="reserveBook(item)" type="success" size="mini" style="float: right;" round :disabled="!item.canReserve">预约</el-button>-->
            </div>
<!--            <el-divider content-position="left">借出时间:{{article.article_date}}</el-divider>-->
<!--            <router-link class="article-link" :to="{path:'blog/article',query:{id: article.id}}"><p>{{article.article_abstract}}</p></router-link>-->
            <div>
            <p class="text item"><i class="el-icon-edit"></i>丢失地点:{{item.lostPosition}}</p>
              <p class="text item"><i class="el-icon-edit"></i>丢失时间:{{item.lostTime}}</p>
              <p class="text item"><i class="el-icon-edit"></i>联系方式:{{item.lostContract}}</p>
              <p class="text item"><i class="el-icon-edit"></i>丢失详情:{{item.lostDetail}}</p>
<!--              <p class="text item"><i class="el-icon-edit"></i>丢失时间:{{item.lostPosition}}</p>-->
<!--              <span><el-button type="success" size="mini" style="float: right;" round>预约</el-button></span>-->
            </div>

<!--            <p class="text item"><i class="el-icon-coin"></i>丢失时间<el-input-number v-model="item.total" :disabled="true" size="mini" controls-position="right"></el-input-number></p>-->
<!--            <p class="text item"><i class="el-icon-view"></i>已借数量<el-input-number v-model="item.borrowed" :disabled="true" size="mini" controls-position="right"></el-input-number></p>-->
          </div>
          <el-image
            style="margin:18px 0 0 30px;width:100px;height: 140px"
            :src="item.picture"
            fit="cover">
          </el-image>
          <el-divider><i class="el-icon-collection-tag"></i><span class="text item"></span></el-divider>
        </div>
      </el-card>
<!--      <el-card class="box-card">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span>卡片名称</span>-->
<!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--        </div>-->
<!--        <div v-for="o in 4" :key="o" class="text item">-->
<!--          {{'列表内容 ' + o }}-->
<!--        </div>-->
<!--      </el-card>-->
<!--      <el-card class="box-card">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span>卡片名称</span>-->
<!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--        </div>-->
<!--        <div v-for="o in 4" :key="o" class="text item">-->
<!--          {{'列表内容 ' + o }}-->
<!--        </div>-->
<!--      </el-card>-->
<!--      <el-card class="box-card">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span>卡片名称</span>-->
<!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--        </div>-->
<!--        <div v-for="o in 4" :key="o" class="text item">-->
<!--          {{'列表内容 ' + o }}-->
<!--        </div>-->
<!--      </el-card>-->
<!--      <el-card class="box-card">-->
<!--        <div slot="header" class="clearfix">-->
<!--          <span>卡片名称</span>-->
<!--          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
<!--        </div>-->
<!--        <div v-for="o in 6" :key="o" class="text item">-->
<!--          {{'当前库存' + o }}-->
<!--        </div>-->
<!--      </el-card>-->
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="losts.length">
    </el-pagination>
  </div>
</template>

<script>
import store from '../../../save'
export default {
  name: 'LostSearchResult',
  data () {
    return {
      losts: [],
      pageSize: 4,
      total: '',
      num: 5,
      keywords: '',
      currentPage: 1,
      canReserve: false,
      canCancel: true
    }
  },
  // 12
  mounted () {
    this.loadLosts()
  },
  // 12
  methods: {
    loadLosts () {
      this.keywords = store.state.key
      var _this = this
      this.$axios
        .get('/publish/v1/search/lost', {params: {
          // cardNo: store.state.user.cardNo,
          title: this.keywords
        }}).then(resp => {
          console.log(resp)
          if (resp && resp.data.code === 200) {
            _this.currentPage = 1
            _this.losts = resp.data.data.list
          }
        })
    },
    // offset = -1？
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    toLostSearch () {
      this.$router.replace('search')
    },
    // TODO ？ 联系对方
    reserveBook (item) {
      this.$axios
        .post('/books/reserve', {
          cardNo: store.state.user.cardNo,
          bid: item.id
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$alert('预约成功', '提示', {
              confirmButtonText: '确定'
            })
            item.canReserve = false
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    // 14
    cancelBook (item) {
      this.$axios
        .post('/books/cancel', {
          cardNo: store.state.user.cardNo,
          bid: item.id
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$alert('取消预约成功', '信息', {
              confirmButtonText: '确定'
            })
            item.canReserve = true
          } else {
            this.$alert(successResponse.data.message, '信息', {
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
.el-header{
<!--  background-color: #B3C0D1; -->
<!--  color: #333; -->
  text-align: center;
  line-height: 60px;
}
.el-footer {
<!--  background-color: #B3C0D1; -->
<!--  color: #333; -->
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 900px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 760px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.box{
  margin: 0 auto;
  padding-top: 80px;
  height: 50px;
  width: 100%;
}
.searchBox{
  margin: 10px auto;
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

.articles-area {
  width: 990px;
  height: 850px;
  margin-left: auto;
  margin-right: auto;
}

.article-link {
  text-decoration: none;
  color: #606266;
}

.article-link:hover {
  color: #409EFF;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
