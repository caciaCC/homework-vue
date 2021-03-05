<template>
  <div style="text-align: left" >
<!--    <el-button class="add-button" type="success" @click="dialogFormVisible = true">添加图书</el-button>-->
    <el-dialog
      title="添加馆存"
      :visible.sync="dialogFormVisible"
      @close="clear">
      <el-form v-model="form" style="text-align: left" ref="dataForm">
        <el-form-item label="书名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="书ID" :label-width="formLabelWidth" prop="bid">
          <el-input v-model="form.bid" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="图书当前馆存" :label-width="formLabelWidth" prop="total" >
          <el-input v-model="form.total" autocomplete="off" placeholder="" disabled></el-input>
        </el-form-item>
        <el-form-item label="新书入馆量" :label-width="formLabelWidth" prop="change">
          <el-input v-model="form.change" autocomplete="off"></el-input>
        </el-form-item>
<!--        <el-form-item label="该图书所处分类" :label-width="formLabelWidth" prop="cid">-->
<!--          <el-select v-model="form.category.id" placeholder="" disabled>-->
<!--            <el-option label="文学" value="1"></el-option>-->
<!--            <el-option label="小说" value="2"></el-option>-->
<!--            <el-option label="社科" value="3"></el-option>-->
<!--            <el-option label="经管" value="4"></el-option>-->
<!--            <el-option label="网络小说" value="5"></el-option>-->
<!--            <el-option label="科技" value="6"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="罚款金额" :label-width="formLabelWidth" prop="change">-->
<!--          <el-input v-model="form.change" autocomplete="off" placeholder="请根据图书分类和超出时间填写罚款金额"></el-input>-->
<!--        </el-form-item>-->
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
  name: 'AddStore',
  components: {},
  data () {
    return {
      dialogFormVisible: false,
      form: {
        id: '',
        name: '',
        bid: '',
        total: '',
        change: ''
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
        name: '',
        bid: '',
        total: '',
        change: ''
      }
    },
    // 27
    onSubmit () {
      this.dialogFormVisible = false
      this.$axios
        .post('/back/stores/add', {
          id: this.form.id,
          change: this.form.change
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
