<template>

  <el-dialog title="新增员工" :visible="showDialog" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="addEmployee" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:75%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:75%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:75%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:75%" placeholder="请选择">
          <el-option
            v-for="item in EmployeeEnum.hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:75%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <el-input :value="formData.departmentName" style="width:75%" placeholder="请选择部门" @focus="getDepartments" />
        <el-tree
          v-if="showTree"
          class="treeDepts"
          :data="treeData"
          :default-expand-all="true"
          :props="{label:'name'}"
          @node-click="selectNode"
        />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:75%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/department'
import { treeDatadepart } from '@/utils/index'
import EmployeeEnum from '@/api/constant/employees'
import { addEmployee } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      EmployeeEnum,
      treeData: [],
      showTree: false,
      formData: {
        username: '',
        mobile: '',
        timeOfEntry: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        correctionTime: ''
      },
      rules: {
        username: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { min: 1, max: 4, message: '用户姓名为1-4位', trigger: 'blur' }
        ],
        mobile: [
          { required: true, message: '该项不能为空', trigger: 'blur' },
          { pattern: /^1[35789]\d{9}$/, message: '请输入正规的手机号', trigger: 'blur' }
        ],
        timeOfEntry: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        formOfEmployment: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        workNumber: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        departmentName: [
          { required: true, message: '该项不能为空', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    async getDepartments() {
      this.showTree = true
      const { depts } = await getDepartments()
      this.treeData = treeDatadepart(depts, '')
    },
    selectNode(data) {
      this.formData.departmentName = data.name
      this.showTree = false
    },
    // btnCancel() {
    //   this.formData = {
    //     username: '',
    //     mobile: '',
    //     timeOfEntry: '',
    //     formOfEmployment: '',
    //     workNumber: '',
    //     departmentName: '',
    //     correctionTime: ''
    //   }
    //   this.$refs.addEmployee.resetFileds()
    //   this.$emit('update:showDialog', false)
    // },
    // 取消
    btnCancel() {
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
      this.$refs.addEmployee.resetFields()
      this.$emit('update:showDialog', false)
    },
    async btnOK() {
      try {
        // 不能随便发请求
        this.$refs.addEmployee.validate()
        // 发请求
        await addEmployee(this.formData)
        // 提示用户
        this.$message.success('添加成功')
        // 关闭弹窗
        // 刷新
        // 😡尽量少用可以用父组件的方法及控制弹窗的Dialog--容易出bug
        // this.$parent.showDialog = false
        // this.$parent.getEmployeeList()
        this.$emit('update:showDialog', false)
        this.$emit('addEmployee')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.treeDepts{
  position: absolute;
  z-index: 9;
  height: 200px;
  border: 1px solid #666;
  overflow: auto;
  width: 75%;
}
</style>
