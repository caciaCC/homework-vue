<template>
  <el-card class="box-card">

    <div slot="header" class="clearfix">
      <el-tooltip content="转到借阅消息" placement="top" effect="light">
        <el-button icon="el-icon-right" @click="toLoanInfo()" style="float: right;"  type="success" circle></el-button>
      </el-tooltip>
      <span style="font-weight: bold;font-size: 20px">预约消息</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
<!--    <div class="block">-->
<!--      <el-timeline>-->
<!--        <el-timeline-item timestamp="2019/4/13" placement="top">-->
<!--          <el-card>-->
<!--            <h4>实现上传至服务器和输入 URL 两种方式添加封面</h4>-->
<!--            <p>Evan 提交于 2019/4/13 21:32</p>-->
<!--          </el-card>-->
<!--        </el-timeline-item>-->
<!--        <el-timeline-item timestamp="2019/4/11" placement="top">-->
<!--          <el-card>-->
<!--            <h4>实现图书分类功能</h4>-->
<!--            <p>Evan 提交于 2019/4/11 09:02</p>-->
<!--          </el-card>-->
<!--        </el-timeline-item>-->
<!--        <el-timeline-item timestamp="2019/4/8" placement="top">-->
<!--          <el-card>-->
<!--            <h4>实现图书分页，修复图书添加的 BUG</h4>-->
<!--            <p>Evan 提交于 2019/4/8 22:10</p>-->
<!--          </el-card>-->
<!--        </el-timeline-item>-->
<!--        <el-timeline-item timestamp="2019/4/6" placement="top">-->
<!--          <el-card>-->
<!--            <h4>实现搜索框模糊查询</h4>-->
<!--            <p>Evan 提交于 2019/4/6 19:51</p>-->
<!--          </el-card>-->
<!--        </el-timeline-item>-->
<!--        <el-timeline-item timestamp="2019/4/5" placement="top">-->
<!--          <el-card>-->
<!--            <h4>实现图书修改功能</h4>-->
<!--            <p>Evan 提交于 2019/4/5 22:52</p>-->
<!--          </el-card>-->
<!--        </el-timeline-item>-->
<!--      </el-timeline>-->
<!--    </div>-->
    <div class="articles-area">
      <div style="text-align: left">
        <div v-for="item in books.slice((currentPage-1)*pageSize,currentPage*pageSize)" :key="item.id">
          <div style="float:left;width:85%;height: 120px;">
            <!--            <router-link class="article-link" :to="{path:'blog/article',query:{id: article.id}}">-->
            <!--              <span style="font-size: 20px" class="clearfix">-->
            <!--&lt;!&ndash;                <strong>{{article.article_title}}</strong>&ndash;&gt;-->
            <!--&lt;!&ndash;                <strong>三体-刘慈欣</strong>&ndash;&gt;-->
            <!--              </span>-->
            <!--            </router-link>-->
            <div slot="header" class="clearfix">
              <span><i class="el-icon-reading"></i>{{item.book.title}}</span>
<!--              <el-button @click="cancelBook(item)" type="danger" size="mini" style="float: right;" round :disabled="item.canReserve" >取消</el-button>-->
<!--              <el-button @click="reserveBook(item)" type="success" size="mini" style="float: right;" round :disabled="!item.canReserve">预约</el-button>-->
            </div>
            <!--            <el-divider content-position="left">借出时间:{{article.article_date}}</el-divider>-->
            <!--            <router-link class="article-link" :to="{path:'blog/article',query:{id: article.id}}"><p>{{article.article_abstract}}</p></router-link>-->
            <div>
              <p class="text item"><i class="el-icon-edit"></i>作者:{{item.book.author}}</p>
              <!--              <span><el-button type="success" size="mini" style="float: right;" round>预约</el-button></span>-->
            </div>
            <p class="text item"><i class="el-icon-question"></i>预约状态:{{item.ok}}</p>
            <p class="text item"><i class="el-icon-s-help"></i>预约时间:{{item.reserveTime}}</p>
            <p class="text item"><i class="el-icon-info"></i>原因:{{item.reason}}</p>
          </div>
          <el-image
            style="margin:18px 0 0 30px;width:100px;height: 140px"
            :src="item.book.cover"
            fit="cover">
          </el-image>
          <el-divider>{{item.optTime}}</el-divider>
        </div>
      </div>
    </div>
    <el-pagination
      background
      layout="total, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      :page-size="pageSize"
      :total="books.length">
    </el-pagination>
  </el-card>
</template>

<script>
import store from '../../../save'

export default {
  name: 'ReservationInfo',
  data () {
    return {
      books: [],
      pageSize: 4,
      total: '',
      num: 5,
      keywords: '',
      currentPage: 1,
      canReserve: false,
      canCancel: true
    }
  }, // 12
  mounted () {
    this.loadReservationInfos()
  },
  // 50
  methods: {
    loadReservationInfos () {
      // this.keywords = store.state.key
      var _this = this
      this.$axios
        .post('/reservationInfo', {
          cardNo: store.state.user.cardNo
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            _this.currentPage = 1
            _this.books = resp.data.result
          }
        })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    toLoanInfo () {
      this.$router.replace('loanInfo')
    },
    // 13
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
.box-card {
  margin-top: 5px;
  width: 988px;
  height: auto;
  text-align: left;
}
</style>
