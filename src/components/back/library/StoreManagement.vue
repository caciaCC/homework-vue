<template>
  <div>
    <AddStore @onSubmit="loadStores" ref="edit"></AddStore>
    <SubStore @onSubmit="loadStores" ref="edits"></SubStore>
    <el-tooltip content="清理缓存" placement="top" effect="light">
      <el-button icon="el-icon-refresh-left" @click="clearcache()" style="float: right"  type="primary" circle></el-button>
    </el-tooltip>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="stores"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
        ref="multipleTable"
        @selection-change="handleSelectionChange" @header-click="headerChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="id"  label="标识ID"  width="120px" @click="sortByGBK(sort=0)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>标识ID</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="书名"
          width="160"
          @click="sortByGBK(sort=1)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>书名</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-reading"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="bid"
          label="图书ID"
          width="120"
          @click="sortByGBK(sort=4)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>图书ID</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-c-scale-to-original"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="total"
          label="馆存总量"
          width="100"
          @click="sortByGBK(sort=2)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>馆存总量</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-s-grid"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="left"
                         label="剩余量"
                         width="fit" @click="sortByGBK(sort=3)">
          <template slot="header" slot-scope="scope">
            <span>剩余量</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-menu"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastTime"
          label="最后一次改变馆存时间"
          width="250"
          @click="sortByGBK(sort=5)">
          <template slot="header" slot-scope="scope">
            <span>最后一次改变馆存时间</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200">
          <template slot="header" slot-scope="scope">
            <span>操作</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-thumb"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="addStore(scope.row)"
              type="success"
              size="mini">
              添加馆存
            </el-button>
            <el-button
              @click.native.prevent="subStore(scope.row)"
              size="mini"
              type="danger">
              减少馆存
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
import AddStore from './storemanagement/AddStore'
import SubStore from './storemanagement/SubStore'
export default {
  name: 'StoreManagement',
  components: {SubStore, AddStore},
  data () {
    return {
      stores: [],
      multipleSelection: [],
      sort: 0
    }
  },
  mounted () {
    this.loadStores()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    // 54
    clearcache () {
      this.$axios.get('/back/library/store/cache').then(resp => {
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
    // 27
    addStore (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        name: item.name,
        bid: item.bid,
        total: item.total,
        change: ''
      }
    },
    // 28
    subStore (item) {
      this.$refs.edits.dialogFormVisible = true
      this.$refs.edits.form = {
        id: item.id,
        name: item.name,
        bid: item.bid,
        total: item.total,
        change: '',
        borrowedChange: ''
      }
    },
    // 26.
    loadStores () {
      var _this = this
      this.$axios.get('/back/stores').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.stores = resp.data.result
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
