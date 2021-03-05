<template>
  <div>
    <el-tooltip content="清理缓存" placement="top" effect="light">
      <el-button icon="el-icon-refresh-left" @click="clearcache()" style="float: right"  type="primary" circle></el-button>
    </el-tooltip>
    <el-dialog
      title="理由说明"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请说明理由"
        v-model="unAllowForm.reason"
      size="large">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogFormVisible = false" size="mini">取 消</el-button>
        <el-button type="success" @click="noAllowSend" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  <el-card style="margin: 18px 2%;width: 95%">
    <el-table
      :data="reservations"
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
        prop="cardNo"
        label="卡号"
        width="160"
        @click="sortByGBK(sort=1)" class="el-table-column">
        <template slot="header" slot-scope="scope">
          <span>卡号</span>
          <el-tooltip class="item" effect="dark" content="" placement="top">
            <i class="el-icon-bank-card"></i>
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
        width="120"
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
                       width="120" @click="sortByGBK(sort=3)">
        <template slot="header" slot-scope="scope">
          <span>剩余量</span>
          <el-tooltip class="item" effect="dark" content="" placement="top">
            <i class="el-icon-menu"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        prop="time"
        label="预约时间"
        width="fit"
        @click="sortByGBK(sort=5)">
        <template slot="header" slot-scope="scope">
          <span>预约时间</span>
          <el-tooltip class="item" effect="dark" content="" placement="top">
            <i class="el-icon-time"></i>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="160">
        <template slot="header" slot-scope="scope">
          <span>操作</span>
          <el-tooltip class="item" effect="dark" content="" placement="top">
            <i class="el-icon-thumb"></i>
          </el-tooltip>
        </template>
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="doAllow(scope.row)"
            type="success"
            size="mini">
            通过
          </el-button>
          <el-button
            @click.native.prevent="noAllow(scope.row)"
            size="mini"
            type="danger">
            不通过
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
  name: 'ReservationManagement',
  components: {EditForm},
  data () {
    return {
      reservations: [],
      multipleSelection: [],
      sort: 0,
      dialogFormVisible: false,
      unAllowForm: {
        id: 0,
        reason: ''
      }
    }
  },
  mounted () {
    this.loadReservations()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    // 55
    clearcache () {
      this.$axios.get('/back/library/reservation/cache').then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('清除成功', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    // 21
    noAllow (item) {
      this.dialogFormVisible = true
      this.unAllowForm.id = item.id
      // this.$confirm('此操作将永久删除该书籍, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      //   this.$axios
      //     .post('/back/books/delete', {id: id}).then(resp => {
      //       if (resp && resp.data.code === 200) {
      //         this.loadBooks()
      //       }
      //     })
      // }
      // ).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '已取消删除'
      //   })
      // })
    },
    // 6
    clear () {
      this.unAllowForm = {
        id: 0,
        reason: ''
      }
    },
    // 21
    noAllowSend () {
      this.dialogFormVisible = false
      this.$axios
        .post('/back/reservations/notAllow', {
          id: this.unAllowForm.id,
          reason: this.unAllowForm.reason
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定'
            })
            this.loadReservations()
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    // 20
    doAllow (item) {
      this.$axios
        .post('/back/reservations/allow', {
          id: item.id
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定'
            })
            this.loadReservations()
          } else {
            this.$alert(successResponse.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {
        })
    },
    // 19.
    loadReservations () {
      var _this = this
      this.$axios.get('/back/reservations').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.reservations = resp.data.result
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

</style>
