<template>
  <div>
    <edit-form @onSubmit="loadBooks()" ref="edit"></edit-form>
    <el-tooltip content="清理缓存" placement="top" effect="light">
      <el-button icon="el-icon-refresh-left" @click="clearcache()" style="float: right"  type="primary" circle></el-button>
    </el-tooltip>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="books"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
        ref="multipleTable"
        @selection-change="handleSelectionChange" @header-click="headerChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="introduce" type="expand" label="查看简介"  width="120px" @click="sortByGBK(sort=0)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>查看简介</span>
            <el-tooltip class="item" effect="dark" content="点击下方向右箭头查看简介" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
          <template slot-scope="props">
            <el-form label-position="top" inline>
              <el-form-item>
                <span>{{ props.row.abs }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="书名"
          width="160"
          @click="sortByGBK(sort=1)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>书名</span>
            <el-tooltip class="item" effect="dark" content="点击按书名排序" placement="top">
              <i class="el-icon-reading"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="category.name"
          label="分类"
          width="120"
          @click="sortByGBK(sort=5)">
          <template slot="header" slot-scope="scope">
            <span>分类</span>
            <el-tooltip class="item" effect="dark" content="点击按分类排序" placement="top">
              <i class="el-icon-collection-tag"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="author"
          label="作者"
          width="120"
          @click="sortByGBK(sort=2)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>作者</span>
            <el-tooltip class="item" effect="dark" content="点击按作者排序" placement="top">
              <i class="el-icon-edit"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="date"
                         label="出版日期"
                         width="120" @click="sortByGBK(sort=3)">
          <template slot="header" slot-scope="scope">
            <span>出版日期</span>
            <el-tooltip class="item" effect="dark" content="点击按出版日期排序" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="press"
          label="出版社"
          fit
          @click="sortByGBK(sort=4)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>出版社</span>
            <el-tooltip class="item" effect="dark" content="点击按出版社排序" placement="top">
              <i class="el-icon-position"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="图书标识ID"
          width="110"
          @click="sortByGBK(sort=4)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>标识ID</span>
            <el-tooltip class="item" effect="dark" content="点击按ID排序" placement="top">
              <i class="el-icon-c-scale-to-original"></i>
            </el-tooltip>
          </template>
          <template slot-scope="props">
              <div >{{ props.row.id }}</div>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="160">
          <template slot="header" slot-scope="scope">
            <span>操作</span>
            <el-tooltip class="item" effect="dark" content="点击按最后操作时间排序" placement="top">
              <i class="el-icon-thumb"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="editBook(scope.row)"
              type="success"
              size="mini">
               编辑
            </el-button>
            <el-button
              @click.native.prevent="deleteBook(scope.row.id)"
              size="mini"
              type="danger">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin: 20px 0 20px 0;float: left">
        <el-button type="info" @click="toggleSelection()">>取消选择</el-button>
        <el-button type="danger" @click="deleteBooks(multipleSelection)">批量删除</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import EditForm from './librarymanage/editform/EditForm'
export default {
  name: 'LibraryManagement',
  components: {EditForm},
  data () {
    return {
      books: [],
      multipleSelection: [],
      sort: 0
    }
  },
  mounted () {
    this.loadBooks()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    // 52
    clearcache () {
      this.$axios.get('/back/library/book/cache').then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('清除成功', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    // 5
    deleteBook (id) {
      this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/back/books/delete', {id: id}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.loadBooks()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 6
    deleteBooks (rows) {
      this.$confirm('此操作将永久删除所有选中书籍, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        rows.forEach((item) => {
          let id = item.id
          this.$axios
            .post('/back/books/delete', {id: id}).then(resp => {
              if (resp && resp.data.code === 200) {
                this.loadBooks()
              }
            })
        })
        this.loadBooks()
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editBook (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        cover: item.cover,
        title: item.title,
        author: item.author,
        date: item.date,
        press: item.press,
        abs: item.abs,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        }
      }
    },
    // 46
    loadBooks () {
      var _this = this
      this.$axios.get('/back/library/books').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.books = resp.data.result
        }
      })
    },
    // 7.
    headerChange (column, event) {
      if (column.property === 'introduce') this.sort = 0
      else if (column.property === 'title') this.sort = 1
      else if (column.property === 'author') this.sort = 2
      else if (column.property === 'date') this.sort = 3
      else if (column.property === 'press') this.sort = 4
      else if (column.property === 'category.name') this.sort = 5
      this.sortByGBK(this.sort)
    },
    // 7.
    sortByGBK (val) {
      console.log(val)
      this.sort = val
      var url = 'books/' + val + '/sort'
      this.$axios.get(url).then(resp => {
      }).then(() => {
        this.loadBooks()
      })
    },
    toggleSelection (rows) {
      if (rows) {
        rows.forEach(row => {
          // this.deleteBooks(rows)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style scoped>
.el-table-column {
  cursor: pointer;
  outline:0;
}

/*.table-text-blue{*/
/*  color: #00BFFF;*/
/*  cursor:pointer;*/
/*}*/
/*.table-text-gray{*/
/*  color: #B3C0D1;*/
/*}*/
/*.el-table th.is-leaf{*/
/*  background:#F9F9F9;*/
/*  border-bottom: none*/
/*}*/
/*.el-table--border th{*/
/*  border-color:#FFF;*/
/*  font-weight: normal*/
/*}*/
/*.el-table--border{*/
/*  border:none*/
/*}*/
/*.el-table,.el-table thead{*/
/*  color: #606266;*/
/*}*/
/*.el-table--border::after, .el-table--group::after{*/
/*  background-color: #fff*/
/*}*/
/*.el-table--border td{*/
/*  border-right: 1px solid $tableBc*/
/*}*/
</style>
