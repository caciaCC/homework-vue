<template>
  <div>
<!--    <el-dialog-->
<!--      title="理由说明"-->
<!--      :visible.sync="dialogFormVisible"-->
<!--      @close="clear"-->
<!--      width="25%">-->
<!--      <el-form style="text-align: left" ref="dataForm">-->
<!--&lt;!&ndash;          <el-form-item label="书名" :label-width="formLabelWidth" prop="title">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="form.title" autocomplete="off" placeholder="不加《》"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="作者" :label-width="formLabelWidth" prop="author">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="form.author" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="出版日期" :label-width="formLabelWidth" prop="date">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="form.date" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="出版社" :label-width="formLabelWidth" prop="press">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="form.press" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item label="分类" :label-width="formLabelWidth" prop="cid">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-select v-model="form.category.id" placeholder="请选择分类">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option label="文学" value="1"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option label="流行" value="2"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option label="文化" value="3"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option label="生活" value="4"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option label="经管" value="5"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;              <el-option label="科技" value="6"></el-option>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-select>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;          <el-form-item prop="id" style="height: 0">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->
<!--      </el-form>-->
<!--      <el-input-->
<!--        type="textarea"-->
<!--        :autosize="{ minRows: 2, maxRows: 4}"-->
<!--        placeholder="请说明理由"-->
<!--        size="large">-->
<!--      </el-input>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="info" @click="dialogFormVisible = false" size="mini">取 消</el-button>-->
<!--        <el-button type="success"  size="mini">确 定</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
    <FineForm @onSubmit="loadLoans()" ref="edit"></FineForm>
    <OverDueForm @onSubmit="loadLoans" ref="edits"></OverDueForm>
    <el-tooltip content="清理缓存" placement="top" effect="light">
      <el-button icon="el-icon-refresh-left" @click="clearcache()" style="float: right"  type="primary" circle></el-button>
    </el-tooltip>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="loans"
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
          width="120"
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
          width="100"
          @click="sortByGBK(sort=4)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>图书ID</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-c-scale-to-original"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="loanDate"
          label="借出时间"
          width="fit"
          @click="sortByGBK(sort=2)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>借出时间</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="dueDate"
                         label="应还时间"
                         width="fit" @click="sortByGBK(sort=3)">
          <template slot="header" slot-scope="scope">
            <span>应还时间</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="backDate"
                         label="实还时间"
                         width="fit" @click="sortByGBK(sort=3)">
          <template slot="header" slot-scope="scope">
            <span>实还时间</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="overDue"
          label="超出期限"
          width="fit"
          @click="sortByGBK(sort=5)">
          <template slot="header" slot-scope="scope">
            <span>超出期限</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-warning"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="290">
          <template slot="header" slot-scope="scope">
            <span>操作</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-thumb"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              :disabled="!(scope.row.status === 0 && scope.row.overDue === '是')"
              @click.native.prevent="solveOverDue(scope.row)"
              type="danger"
              size="mini">
              处理超期
            </el-button>
            <el-button
              :disabled="!(scope.row.status === 1)"
              @click.native.prevent="solveFine(scope.row)"
              size="mini"
              type="info">
              处理罚款
            </el-button>
            <el-button
              :disabled="!(scope.row.status === 2)"
              @click.native.prevent="confirmBack(scope.row)"
              type="success"
              size="mini">
              确认归还
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
import FineForm from './loanmanagement/FineForm'
import OverDueForm from './loanmanagement/OverDueForm'
export default {
  name: 'LoanManagement',
  components: {FineForm, OverDueForm},
  data () {
    return {
      loans: [],
      multipleSelection: [],
      sort: 0,
      dialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  mounted () {
    this.loadLoans()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    clearcache () {
      this.$axios.get('/back/library/loan/cache').then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('清除成功', '提示', {
            confirmButtonText: '确定'
          })
        }
      })
    },
    clear () {
      this.unAllowForm = {
        id: 0,
        reason: ''
      }
    },
    // 25
    solveOverDue (item) {
      this.$refs.edits.dialogFormVisible = true
      this.$refs.edits.form = {
        id: item.id,
        loanDate: item.loanDate,
        dueDate: item.dueDate,
        nowOverDue: item.nowOverDue,
        phone: item.phone,
        style: ''
      }
    },
    // 23
    solveFine (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        loanDate: item.loanDate,
        dueDate: item.dueDate,
        backDate: item.backDate,
        overDate: item.overDate,
        category: {
          id: item.category.id.toString(),
          name: item.category.name
        },
        fine: item.fine
      }
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
    // 22
    loadLoans () {
      var _this = this
      this.$axios.get('/back/loans').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.loans = resp.data.result
        }
      })
    },
    // 24
    confirmBack (item) {
      this.$confirm('是否确认该图书归还', '图书归还', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        this.$axios
          .post('/back/loans/confirm', {id: item.id}).then(resp => {
            if (resp && resp.data.code === 200) {
              this.$alert('操作成功', '提示', {
                confirmButtonText: '确定'
              })
              this.loadLoans()
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
