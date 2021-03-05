<template>
  <div style="text-align: left">
    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加学生</el-button>
    <el-dialog
      title="注册学生"
      :visible.sync="dialogFormVisible"
      @close="clear"
      width="25%">
      <el-form :model="studentForm" :rules="rules" label-position="left"
               label-width="0px" v-loading="loading">
        <el-form-item prop="sno">
          <el-input type="text" v-model="studentForm.sno"
                    auto-complete="off" placeholder="学号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="text" v-model="studentForm.password"
                    auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="name">
          <el-input type="text" v-model="studentForm.name"
                    auto-complete="off" placeholder="学生名"></el-input>
        </el-form-item>
        <el-form-item prop="department">
          <el-input type="text" v-model="studentForm.department"
                    auto-complete="off" placeholder="宿舍"></el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input type="text" v-model="studentForm.phone"
                    auto-complete="off" placeholder="手机号码"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%">
          <el-button  type="success" style="width: 40%;border: none" v-on:click="createStudent">添加</el-button>
        </el-form-item>
        <el-form-item prop="username">
          <el-tag>绑定卡号:无</el-tag>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentCreate',
  data () {
    return {
      dialogFormVisible: false,
      rules: {
        name: [{required: true, message: '学生名不能为空', trigger: 'blur'}]
      },
      checked: true,
      studentForm: {
        sno: '',
        password: '',
        name: '',
        department: '',
        phone: ''
      },
      loading: false
    }
  },
  methods: {
    clear () {
      this.studentForm = {
        sno: '',
        password: '',
        name: '',
        department: '',
        phone: ''
      }
    },
    // 32
    createStudent () {
      this.$axios
        .post('/back/user/students/addStudent', {
          sno: this.studentForm.sno,
          password: this.studentForm.password,
          name: this.studentForm.name,
          department: this.studentForm.department,
          phone: this.studentForm.phone
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
