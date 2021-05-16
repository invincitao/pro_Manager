<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:after>
          <el-button type="primary" size="small" @click="addPerm(1,'0')">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- 必须加上row-key不然树状不会出来 -->
      <el-card>
        <el-table border :data="list" row-key="id" :default-expand-all="true">
          <el-table-column align="center" label="名称" prop="name" />
          <el-table-column align="center" label="标识" prop="code" />
          <el-table-column align="center" label="描述" prop="description" />
          <el-table-column align="center" label="操作">
            <template #default="{row}">
              <el-button v-if="row.type===1" type="text" @click="addPerm(2,row.id)">添加</el-button>
              <el-button type="text" @click="updatePerm(row.id)">编辑</el-button>
              <el-button type="text" @click="delPerm(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

      <!-- 放置一个弹层 用来编辑新增节点 -->
      <el-dialog :title="`${showText}权限点`" :visible="showDialog" @close="btnCancel">
        <!-- 表单 -->
        <el-form ref="perForm" :model="formData" :rules="rules" label-width="120px">
          <el-form-item label="权限名称" prop="name">
            <el-input v-model="formData.name" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限标识" prop="code">
            <el-input v-model="formData.code" style="width:90%" />
          </el-form-item>
          <el-form-item label="权限描述">
            <el-input v-model="formData.description" style="width:90%" />
          </el-form-item>
          <el-form-item label="开启">
            <el-switch
              v-model="formData.enVisible"
              active-value="1"
              inactive-value="0"
            />
          </el-form-item>
        </el-form>
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
            <el-button size="small" @click="btnCancel">取消</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getPermList, delPerm, getPermById, updatePerm, addPerm } from '@/api/permission'
import { treeDatadepart } from '@/utils/index'
export default {
  data() {
    return {
      showDialog: false,
      list: [],
      formData: {
        name: '',
        code: '',
        description: '',
        pid: '',
        type: '',
        enVisible: ''
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    showText() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  created() {
    this.getPermList()
  },
  methods: {
    async getPermList() {
      this.list = treeDatadepart(await getPermList(), '0')
    },
    // 删除
    async  delPerm(id) {
      try {
        await this.$confirm('确认删除嘛?')
        await delPerm(id)
        this.$message.success('操作成功')
        this.getPermList()
      } catch (error) {
        console.log(error)
      }
    },
    addPerm(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
      this.showDialog = true
    },
    async  updatePerm(id) {
      this.formData = await getPermById(id)
      this.showDialog = true
    },
    async btnOK() {
      this.$refs.perForm.validate()
      if (this.formData.id) {
        await updatePerm(this.formData)
      } else {
        await addPerm(this.formData)
      }
      this.$message.success('操作成功')
      this.showDialog = false
      this.getPermList()
    },
    btnCancel() {
      this.formData = {
        name: '',
        code: '',
        description: '',
        pid: '',
        type: '',
        enVisible: ''
      }
      this.$refs.perForm.resetFields()
      this.showDialog = false
    }
  }
}
</script>

<style>

</style>
