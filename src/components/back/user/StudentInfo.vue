<template>
  <div>
    <el-dialog
      title="修改角色信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedRole" style="text-align: left" ref="dataForm">
        <el-form-item label="角色名" label-width="120px" prop="username">
          <el-input v-model="selectedRole.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" label-width="120px" prop="name">
          <el-input v-model="selectedRole.name_zh" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="功能配置" label-width="120px" prop="perms">
          <el-checkbox-group v-model="selectedPermsIds">
            <el-checkbox v-for="(perm,i) in perms" :key="i" :label="perm.id">{{perm.desc_}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="菜单配置" label-width="120px" prop="menus">
          <el-tree
            :data="menus"
            :props="props"
            show-checkbox
            :default-checked-keys="selectedMenusIds"
            node-key="id"
            ref="tree">
          </el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit(selectedRole)">确 定</el-button>
      </div>
    </el-dialog>
<!--    <el-row style="margin: 10px 0px 0px 10px ">-->
<!--      <el-breadcrumb separator-class="el-icon-arrow-right" class="title">-->
<!--        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }" style="margin: 0px 0px 0px 10px ">管理中心</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item><a>用户管理</a></el-breadcrumb-item>-->
<!--        <el-breadcrumb-item><a>角色配置</a></el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </el-row>-->
    <student-create @onSubmit="listStudents()"></student-create>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="students"
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
          prop="sno"
          label="学号"
          width="160"
          @click="sortByGBK(sort=1)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>学号</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-bank-card"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120"
          @click="sortByGBK(sort=4)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>姓名</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-postcard"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          prop="department"
          label="宿舍"
          width="120"
          @click="sortByGBK(sort=2)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>宿舍</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-place"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="cardNo"
                         label="借阅证号"
                         width="fit" @click="sortByGBK(sort=3)">
          <template slot="header" slot-scope="scope">
            <span>借阅证号</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-s-check"></i>
            </el-tooltip>
          </template>
        </el-table-column>
                <el-table-column
                  prop="phone"
                  label="手机号码"
                  width="fit"
                  @click="sortByGBK(sort=5)">
                  <template slot="header" slot-scope="scope">
                    <span>手机号码</span>
                    <el-tooltip class="item" effect="dark" content="" placement="top">
                      <i class="el-icon-mobile-phone"></i>
                    </el-tooltip>
                  </template>
                </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="250">
          <template slot="header" slot-scope="scope">
            <span>操作</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-thumb"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="createCardNo(scope.row)"
              type="success"
              size="mini" :disabled = "scope.row.cardNo !== '未生成'">
              生成借阅证
            </el-button>
            <el-button
              @click.native.prevent="deleteCardNo(scope.row)"
              size="mini"
              type="danger" :disabled = "scope.row.cardNo === '未生成'">
              删除借阅证
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
import StudentCreate from './student/StudentCreate'
export default {
  name: 'StudentInfo',
  components: {StudentCreate},
  data () {
    return {
      dialogFormVisible: false,
      students: [],
      perms: [], // 许可
      menus: [],
      selectedRole: [],
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
    this.listStudents()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    // 29
    listStudents () {
      var _this = this
      this.$axios.get('/back/user/students').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.students = resp.data.result
        }
      })
    },
    // 30
    createCardNo (item) {
      this.$confirm('是否生成借阅证?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/back/user/students/add',
            {
              id: item.id
            }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.listStudents()
            }
          })
      }
      ).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
        })
      })
    },
    // 31
    deleteCardNo (item) {
      this.$confirm('是否删除借阅证?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/back/user/students/delete', {
            id: item.id,
            cardNo: item.cardNo
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.listStudents()
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

</style>
