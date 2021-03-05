<template>
  <div>
    <el-dialog
      title="修改用户信息"
      :visible.sync="dialogFormVisible">
      <el-form v-model="selectedUser" style="text-align: left" ref="dataForm">
        <el-form-item label="卡号" label-width="120px" prop="username">
          <el-input v-model="selectedUser.cardNo" autocomplete="off" disabled></el-input>
        </el-form-item>
<!--        <el-form-item label="真实姓名" label-width="120px" prop="name">-->
<!--          <el-input v-model="selectedUser.name" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="手机号" label-width="120px" prop="phone">-->
<!--          <el-input v-model="selectedUser.phone" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="邮箱" label-width="120px" prop="email">-->
<!--          <el-input v-model="selectedUser.email" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item label="密码" label-width="120px" prop="password">
          <el-button type="info" @click="resetPassword(selectedUser.cardNo)">重置密码</el-button>
        </el-form-item>
        <el-form-item label="角色分配" label-width="120px" prop="roles">
          <el-checkbox-group v-model="selectedRolesIds">
            <el-checkbox v-for="(role,i) in roles" :key="i" :label="role.id">{{role.nameCn}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="onSubmit(selectedUser)">确 定</el-button>
      </div>
    </el-dialog>
<!--    <el-row style="margin: 10px 0px 0px 10px " >-->
<!--      <el-breadcrumb separator-class="el-icon-arrow-right" class="title" >-->
<!--        <el-breadcrumb-item :to="{ path: '/admin/dashboard' }" style="margin: 0px 0px 0px 10px ">管理中心</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item ><a>用户管理</a></el-breadcrumb-item>-->
<!--        <el-breadcrumb-item ><a>用户信息</a></el-breadcrumb-item>-->
<!--      </el-breadcrumb>-->
<!--    </el-row>-->
    <user-create @onSubmit="listUsers()"></user-create>
    <el-card style="margin: 18px 2%;width: 95%">
      <el-table
        :data="users"
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
          prop="enabled"
          label="用户状态"
          width="120"
          @click="sortByGBK(sort=4)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>用户状态</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-check"></i>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.enabled"
              active-color="#90EE90"
              inactive-color="#708090"
              @change="(value) => commitStatusChange(value, scope.row)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="lastTime"
          label="最近一次登录时间"
          width="fit"
          @click="sortByGBK(sort=2)" class="el-table-column">
          <template slot="header" slot-scope="scope">
            <span>最近一次登录时间</span>
            <el-tooltip class="item" effect="dark" content="" placement="top">
              <i class="el-icon-time"></i>
            </el-tooltip>
          </template>
        </el-table-column>
<!--        <el-table-column prop="left"-->
<!--                         label="应还时间"-->
<!--                         width="fit" @click="sortByGBK(sort=3)">-->
<!--          <template slot="header" slot-scope="scope">-->
<!--            <span>应还时间</span>-->
<!--            <el-tooltip class="item" effect="dark" content="" placement="top">-->
<!--              <i class="el-icon-time"></i>-->
<!--            </el-tooltip>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          prop="time"-->
<!--          label="超出期限"-->
<!--          width="fit"-->
<!--          @click="sortByGBK(sort=5)">-->
<!--          <template slot="header" slot-scope="scope">-->
<!--            <span>是否超出期限</span>-->
<!--            <el-tooltip class="item" effect="dark" content="" placement="top">-->
<!--              <i class="el-icon-warning"></i>-->
<!--            </el-tooltip>-->
<!--          </template>-->
<!--        </el-table-column>-->
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
              @click.native.prevent="editUser(scope.row)"
              type="success"
              size="mini">
              编辑用户信息
            </el-button>
            <el-button
              @click.native.prevent="deleteUser(scope.row)"
              size="mini"
              type="danger">
              删除用户
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
import UserCreate from './user/UserCreate'
export default {
  name: 'UserProfile',
  components: {UserCreate},
  // components: {BulkRegistration},
  data () {
    return {
      users: [],
      roles: [],
      dialogFormVisible: false,
      selectedUser: [],
      selectedRolesIds: []
    }
  },
  mounted () {
    this.listUsers()
    this.listRoles()
  },
  computed: {
    tableHeight () {
      return window.innerHeight - 320
    }
  },
  methods: {
    // 36
    deleteUser (item) {
      this.$confirm('是否删除用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios
          .post('/back/user/users/delete', {
            id: item.id,
            cardNo: item.cardNo
          }).then(resp => {
            if (resp && resp.data.code === 200) {
              this.listUsers()
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
    // 33
    listUsers () {
      var _this = this
      this.$axios.get('/back/user/users').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.users = resp.data.result
        } else {
          this.$message('更新用户信息失败')
        }
      })
    },
    // 34
    listRoles () {
      var _this = this
      this.$axios.get('/back/user/roles').then(resp => {
        if (resp && resp.data.code === 200) {
          _this.roles = resp.data.result
        }
      })
    },
    commitStatusChange (value, user) {
      if (user.username !== 'admin') {
        this.$axios.put('/admin/user/status', {
          enabled: value,
          username: user.username
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            if (value) {
              this.$message('用户 [' + user.username + '] 已启用')
            } else {
              this.$message('用户 [' + user.username + '] 已禁用')
            }
          }
        })
      } else {
        user.enabled = true
        this.$alert('不能禁用管理员账户')
      }
    },
    // 39
    onSubmit (user) {
      let _this = this
      // 根据视图绑定的角色 id 向后端传送角色信息
      let roles = []
      for (let i = 0; i < _this.selectedRolesIds.length; i++) {
        for (let j = 0; j < _this.roles.length; j++) {
          if (_this.selectedRolesIds[i] === _this.roles[j].id) {
            roles.push(_this.roles[j])
          }
        }
      }
      this.$axios.put('/back/user/users/put', {
        cardNo: user.cardNo,
        password: user.password,
        roles: roles
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('用户信息修改成功')
          this.dialogFormVisible = false
          // 修改角色后重新请求用户信息，实现视图更新
          this.listUsers()
        } else {
          this.$alert(resp.data.message)
        }
      })
    },
    editUser (user) {
      this.dialogFormVisible = true
      this.selectedUser = user
      let roleIds = []
      // 说明传入前端的USERS需要带有ROLES数组
      for (let i = 0; i < user.roles.length; i++) {
        roleIds.push(user.roles[i].id)
      }
      this.selectedRolesIds = roleIds
    },
    resetPassword (username) {
      this.$axios.put('/admin/user/password', {
        username: username
      }).then(resp => {
        if (resp && resp.data.code === 200) {
          this.$alert('密码已重置为 123')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
