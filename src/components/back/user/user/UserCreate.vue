<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加用户</el-button>
    <el-dialog
      title="添加用户"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-form :model="UserForm" :rules="rules" label-position="left"
               label-width="0px" v-loading="loading">
        <el-form-item prop="cardNo">
          <el-input type="text" v-model="UserForm.cardNo"
                    auto-complete="off" placeholder="卡号"></el-input>
        </el-form-item>
        <el-form-item prop="nameZh">
          <el-input type="text" v-model="UserForm.password"
                    auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button type="success" style="width: 40%;border: none" v-on:click="createUser">添加</el-button>
        </el-form-item>
<!--        <el-form-item prop="username">-->
<!--          <el-tag>初始权限：无</el-tag>-->
<!--        </el-form-item>-->
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UserCreate',
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        cardNo: [{required: true, message: '卡号不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      checked: true,
      UserForm: {
        cardNo: '',
        password: ''
      },
      loading: false
    }
  },
  methods: {
    clear () {
      this.UserForm = {
        cardNo: '',
        password: ''
      }
    },
    // 35
    createUser () {
      this.$axios
        .post('/back/user/users/add', {
          cardNo: this.UserForm.cardNo,
          password: this.UserForm.password
        })
        .then(resp => {
          if (resp.data.code === 200) {
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定'
            })
            this.clear()
            this.$emit('onSubmit')
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
        .catch(failResponse => {})
      this.dialogFormVisible = false
    }
  }
}
</script>

<style scoped>
.add-button {
  margin: 18px 0 0 10px;
}
</style>
