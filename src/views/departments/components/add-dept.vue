<template>
  <!-- 新增部门的弹层 -->
  <el-dialog title="新增部门" :visible="showDialog">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" />
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small">确定</el-button>
        <el-button size="small">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/department'
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
      // 找到同一父部门下的子部门 得到一个数组
      // 只要找到相同名字的就返回true
      const isRepeat = depts
        .filter(item => item.pid === this.treenode.id)
        .some(item => item.name === value)
      // 三元表达式
      isRepeat ? callback(new Error('同部门下不能重名')) : callback()
    }
    // 校验部门编码
    const checkRepeatCode = async(rule, value, callback) => {
      // 获取所有部门
      const { depts } = await getDepartments()
      const isRepeat = depts
        .some(item => item.code === value)
      isRepeat ? callback(new Error('部门编码不能重名')) : callback()
    }
    return {
      formData: {
        code: '',
        introduce: '',
        manager: '',
        name: ''
      },
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
  }
}
</script>

<style>

</style>
