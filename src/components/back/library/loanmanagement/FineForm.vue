<template>
  <div style="text-align: left" >
<!--    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加图书</el-button>-->
    <el-dialog
      title="处理罚款"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="图书借出时间" :label-width="formLabelWidth" prop="loanDate" >
          <el-input v-model="form.loanDate" autocomplete="off" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="图书应还时间" :label-width="formLabelWidth" prop="dueDate">
          <el-input v-model="form.dueDate" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="图书实还时间" :label-width="formLabelWidth" prop="backDate">
          <el-input v-model="form.backDate" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="归还超出时间" :label-width="formLabelWidth" prop="overDate">
          <el-input v-model="form.overDate" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="该图书所处分类" :label-width="formLabelWidth" prop="cid">
          <el-select v-model="form.category.id" placeholder="" disabled>
            <el-option label="文学" value="1"></el-option>
            <el-option label="小说" value="2"></el-option>
            <el-option label="社科" value="3"></el-option>
            <el-option label="经管" value="4"></el-option>
            <el-option label="网络小说" value="5"></el-option>
            <el-option label="科技" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="罚款金额" :label-width="formLabelWidth" prop="press">
          <el-input v-model="form.fine" autocomplete="off" placeholder="请根据图书分类和超出时间填写罚款金额"></el-input>
        </el-form-item>
<!--        <el-form-item label="封面" :label-width="formLabelWidth" prop="cover">-->
<!--          <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="简介" :label-width="formLabelWidth" prop="abs">-->
<!--          <el-input type="textarea" v-model="form.abs" autocomplete="off"></el-input>-->
<!--        </el-form-item>-->
        <el-form-item prop="id" style="height: 0">
          <el-input type="hidden" v-model="form.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="success" @click="onSubmit">执行</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'FineForm',
  components: {},
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        loanDate: '',
        dueDate: '',
        overDate: '',
        category: {
          id: '',
          name: ''
        },
        fine: ''
      },
      formLabelWidth: '120px',
      loading: true
    }
  },
  methods: {
    clear () {
      this.dialogFormVisible = false
      this.form = {
        id: '',
        loanDate: '',
        dueDate: '',
        overDate: '',
        category: {
          id: '',
          name: ''
        },
        fine: ''
      }
    },
    // 23
    onSubmit () {
      this.dialogFormVisible = false
      this.$axios
        .post('/back/loans/fine', {
          id: this.form.id,
          fine: this.form.fine
        }).then(resp => {
          this.dialogFormVisible = false
          if (resp && resp.data.code === 200) {
            this.$emit('onSubmit')
            this.$alert('操作成功', '提示', {
              confirmButtonText: '确定'
            })
          } else {
            this.$alert(resp.data.message, '提示', {
              confirmButtonText: '确定'
            })
          }
        })
    }
  }
}
</script>

<style scoped>
.add-button {
  margin: 18px 0 0 10px;
}
</style>
