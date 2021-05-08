<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="formData.id?'编辑部门':'新增部门'" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="addDept" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width:80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in employeeList"
            :key="item.id"
            :value="item.username"
            :label="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments, addDepartments, getDepartDetail, editDepartDetail } from '@/api/department'
import { getEmployeeSimple } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    treenode: {
      type: Object,
      required: true
    }
  },
  data() {
    // 校验部门名
    const checkRepeatName = async(rule, value, callback) => {
      // 获取所有部门
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 当前的 treeNode.pid 才是父部门
        isRepeat = depts
          .filter(item => item.pid === this.treenode.pid && item.id !== this.treenode.id)
          .some(item => item.name === value)
        // 三元表达式
        isRepeat ? callback(new Error('同部门下不能重名')) : callback()
      } else {
        // 找到同一父部门下的子部门 得到一个数组
        // 只要找到相同名字的就返回true
        isRepeat = depts
          .filter(item => item.pid === this.treenode.id)
          .some(item => item.name === value)
        // 三元表达式
        isRepeat ? callback(new Error('同部门下不能重名')) : callback()
      }
    }
    // 校验部门编码
    const checkRepeatCode = async(rule, value, callback) => {
      // 获取所有部门
      const { depts } = await getDepartments()
      let isRepeat = false
      if (this.formData.id) {
        // 编辑 的时候必须把自己排除在外
        isRepeat = depts
          .some(item => item.code === value && item.id !== this.treenode.id)
      } else {
        isRepeat = depts
          .some(item => item.code === value)
      }
      isRepeat ? callback(new Error('部门编码不能重名')) : callback()
    }
    return {
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
      employeeList: [],
      rules: {
        code: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkRepeatCode }
        ],
        introduce: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 300, message: '不能超过300个字符', trigger: 'blur' }
        ],
        manager: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { max: 50, message: '不能超过50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkRepeatName }
        ]
      }
    }
  },
  // 取消
  methods: {
    btnCancel() {
      this.formData = {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      }
      this.$refs.addDept.resetFields()
      this.$emit('update:showDialog', false)
    },
    // 确定按钮
    async btnOk() {
      // 没输入就不发送请求
      await this.$refs.addDept.validate()
      // 发送请求--判断this.formData是否有id
      // 如果有，就说明是编辑，如果没有就说明是添加
      if (this.formData.id) {
        await editDepartDetail(this.formData)
      } else {
        await addDepartments({ ...this.formData, pid: this.treenode.id })
      }
      // 提示用户添加成功
      this.$message.success('添加成功')
      // 关闭弹窗
      // this.showDialog = false
      this.$emit('update:showDialog', false)
      // 刷新页面
      this.$emit('addDepart')
    },
    async getEmployeeSimple() {
      this.employeeList = await getEmployeeSimple()
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>
