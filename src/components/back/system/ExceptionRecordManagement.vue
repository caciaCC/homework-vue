<template>
  <div>
    <el-dialog
      title="异常信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedLog" style="text-align: left" ref="dataForm">
<!--        <el-form-item label="异常信息" label-width="120px" prop="username">-->
<!--          <el-input rows="15" v-model="selectedLog.message" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="角色描述" label-width="120px" prop="name">-->
<!--          <el-input v-model="selectedLog.name_zh" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="功能配置" label-width="120px" prop="perms">-->
<!--          <el-checkbox-group v-model="selectedPermsIds">-->
<!--            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc_}}</el-checkbox>-->
<!--          </el-checkbox-group>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="菜单配置" label-width="120px" prop="menus">-->
<!--          <el-tree-->
<!--            :data="menus"-->
<!--            :props="props"-->
<!--            show-checkbox-->
<!--            :default-checked-keys="selectedMenusIds"-->
<!--            node-key="id"-->
<!--            ref="tree">-->
<!--          </el-tree>-->
<!--        </el-form-item>-->
        <div class="divcss555">
          {{selectedLog.message}}
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
<!--        <el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <el-button type="success" @click="dialogFormVisible=false">确 定</el-button>
      </div>
    </el-dialog>
    <!--    <el-row style="margin: 10px 0px 0px 10px ">-->
    <!--      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">-->
    <!--        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }" style="margin: 0px 0px 0px 10px ">管理中心</el-breadcrumb-item>-->
    <!--        <el-breadcrumb-item><a>用户管理</a></el-breadcrumb-item>-->
    <!--        <el-breadcrumb-item><a>角色配置</a></el-breadcrumb-item>-->
    <!--      </el-breadcrumb>-->
    <!--    </el-row>-->
<!--    <record-create @onSubmit="listRoles()"></record-create>-->
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="logs"
        stripe
        style="width: 100%"
        :max-height="tableHeight"
        ref="multipleTable"
        @selection-change="handleSelectionChange" @header-click="headerChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column prop="id"  label="标识ID"  width="fit" @click="sortByGBK(sort=0)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>标识ID</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-question"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="异常名"
          width="fit"
          @click="sortByGBK(sort=1)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>异常名</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-bank-card"></i>
            </el-tooltip>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="message"-->
<!--          label="异常信息"-->
<!--          width="fit"-->
<!--          @click="sortByGBK(sort=4)" class="el-table-column">-->
<!--          <template slot="header" slot-scope="scope">-->
<!--            <span>异常信息</span>-->
<!--            <el-tooltip class="item" effect="dark" content="" placement="top">-->
<!--              <i class="el-icon-success"></i>-->
<!--            </el-tooltip>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          prop="method"
          label="方法"
          width="fit"
          @click="sortByGBK(sort=2)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>方法</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-check"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="uri"
                         label="URI"
                         width="fit" @click="sortByGBK(sort=3)">
          <template slot="header" slot-scope="scope">
            <span>URI</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-s-custom"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="ip"
          label="IP"
          width="fit"
          @click="sortByGBK(sort=5)">
          <template slot="header" slot-scope="scope">
            <span>IP</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="time"
          label="操作时间"
          width="fit"
          @click="sortByGBK(sort=5)">
          <template slot="header" slot-scope="scope">
            <span>时间</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
<!--        <el-table-column-->
<!--          prop="time"-->
<!--          label="操作时间"-->
<!--          width="fit"-->
<!--          @click="sortByGBK(sort=5)">-->
<!--          <template slot="header" slot-scope="scope">-->
<!--            <span>操作时间</span>-->
<!--            <el-tooltip class="item" effect="dark" content="" placement="top">-->
<!--              <i class="el-icon-time"></i>-->
<!--            </el-tooltip>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
              @click.native.prevent="viewDetail(scope.row)"
              type="success"
              size="mini">
              查看异常信息
            </el-button>
<!--            <el-button-->
<!--              @click.native.prevent="noAllow(scope.row.id)"-->
<!--              size="mini"-->
<!--              type="danger">-->
<!--              不通过-->
<!--            </el-button>-->
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
// import RecordCreate from './record/RecordCreate'
import ViewExceptionRecordDetail from './exceptionrecord/ViewExceptionRecordDetail'
export default {
  name: 'ExceptionRecordManagement',
  components: {
    // RecordCreate
    ViewExceptionRecordDetail
  },
  data () {
    return {
      dialogFormVisible: false,
      logs: [],
      perms: [], // 许可
      menus: [],
      selectedLog: [],
      selectedPermsIds: [],
      selectedMenusIds: [],
      props: {
        id: 'id',
        label: 'name_zh',
        children: 'children'
      }
    }
  },
  mounted () {
    this.listLogs()
    // this.listPerms()
    // this.listMenus()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    // 41
    viewDetail (log) {
      this.dialogFormVisible = true
      this.selectedLog = log
    },
    // 48
    listLogs () {
      var _this = this
      this.$axios.get('/back/system/exceptionLogs').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.logs = resp.data.result
        }
      })
    },
    // √
    listPerms () {
      var _this = this
      this.$axios.get('/admin/role/perm').then(resp => {
        if (resp && resp.data.code === 200) {
          // _this.$alert('OK')
          _this.perms = resp.data.result
        }
      })
    },
    // √
    listMenus () {
      var _this = this
      this.$axios.get('/admin/role/menu').then(resp => {
        if (resp && resp.data.code === 200) {
          // _this.$alert('GOOD')
          _this.menus = resp.data.result
        }
      })
    },
    // √
    commitStatusChange (value, role) {
      if (role.id !== 1) {
        this.$confirm('是否更改角色状态？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.put('/admin/role/status', {
            enabled: value,
            id: role.id
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              if (value) {
                this.$message('角色 [' + role.name_zh + '] 已启用')
              } else {
                this.$message('角色 [' + role.name_zh + '] 已禁用')
              }
            }
          })
        }).catch(() => {
          role.enabled = !role.enabled
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      } else {
        role.enabled = true
        this.$alert('无法禁用系统管理员！')
      }
    },
    // √
    editRole (role) {
      this.dialogFormVisible = true
      this.selectedRole = role
      // 说明传到前端的ROLE需要带有对应perms
      let permIds = []
      for (let i = 0; i < role.perms.length; i++) {
        permIds.push(role.perms[i].id)
      }
      this.selectedPermsIds = permIds
      // 说明传到前端的ROLE需要带有对应menus
      let menuIds = []
      for (let i = 0; i < role.menus.length; i++) {
        if (role.menus[i]) {
          menuIds.push(role.menus[i].id)
          for (let j = 0; j < role.menus[i].children.length; j++) {
            if (role.menus[i].children[j])menuIds.push(role.menus[i].children[j].id) // 原来是children未初始化报错了
          }
        }
      }
      this.selectedMenusIds = menuIds
      // 判断树是否已经加载，第一次打开对话框前树不存在，会报错。所以需要设置 default-checked
      // ???
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedKeys(menuIds)
      }
    },
    // √ ？
    onSubmit (role) {
      let _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      let perms = []
      for (let i = 0; i < _this.selectedPermsIds.length; i++) {
        for (let j = 0; j < _this.perms.length; j++) {
          if (_this.selectedPermsIds[i] === _this.perms[j].id) {
            perms.push(_this.perms[j])
          }
        }
      }
      this.$axios.put('/admin/role', {
        id: role.id,
        name: role.name,
        name_zh: role.name_zh,
        enabled: role.enabled,
        perms: perms
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert(resp.data.result)
          this.dialogFormVisible = false
          this.listRoles()
        }
      })
      // 大概是和RP差不多的弄法
      this.$axios.put('/admin/role/menu?rid=' + role.id, {
        menusIds: this.$refs.tree.getCheckedKeys() // 应该要补全树？
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          console.log(resp.data.result)
        }
      })
    }
  }
}
</script>

<style scoped>
.add-button {
  float: left;
  margin: 18px 0 18px 10px;
}
.title{
  color:white;
  font-weight:bolder;
  font-size:20px;
  background-color:lightblue;
  border-radius:20px;
  box-shadow: rgba(0,0,0,0.3) 2px 3px 2px;
}
.divcss555 {
  border: 1px solid #F00;
  width: 700px;
  height: auto;
  word-break: break-all;
}
</style>
