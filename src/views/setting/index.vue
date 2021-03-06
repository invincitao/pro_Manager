<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <!-- 放置页签 -->
          <el-tab-pane label="角色管理">
            <!-- 新增角色按钮 -->
            <el-row style="height:60px">
              <el-button
                icon="el-icon-plus"
                size="small"
                type="primary"
                @click="showDialog = true"
              >新增角色</el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="roleList">
              <el-table-column label="序号" width="120" type="index" />
              <el-table-column label="角色名称" width="240" prop="name" />
              <el-table-column label="描述" prop="description" />
              <el-table-column label="操作">
                <template #default="{row}">
                  <el-button size="small" type="success" @click="assignPerm(row.id)">分配权限</el-button>
                  <el-button size="small" type="primary" @click="editRole(row.id)">编辑</el-button>
                  <el-button size="small" type="danger" @click="delRole(row.id)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <el-pagination
                layout="prev,pager,next"
                :page-size="page.pagesize"
                :total="page.total"
                :current-page="page.page"
                @current-change="changePage"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <el-alert
              title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
              type="info"
              show-icon
              :closable="false"
            />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="formData.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="formData.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="formData.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>

        </el-tabs>
      </el-card>
      <!-- 弹出框 -->
      <el-dialog :title="titleText" :visible="showDialog" @close="btnCancel">
        <el-form v-if="showDialog" ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="roleForm.name" />
          </el-form-item>
          <el-form-item label="角色描述">
            <el-input v-model="roleForm.description" />
          </el-form-item>
        </el-form>
        <!-- 底部 -->
        <el-row slot="footer" type="flex" justify="center">
          <el-col :span="6">
            <el-button size="small" @click="btnCancel">取消</el-button>
            <el-button size="small" type="primary" @click="btnOK">确定</el-button>
          </el-col>
        </el-row>
      </el-dialog>
    </div>

    <el-dialog title="分配权限" :visible="showPermDialog" @close="btnPermCancel">
      <!-- 权限是一颗树 -->
      <!-- 将数据绑定到组件上 -->
      <!-- check-strictly 如果为true 那表示父子勾选时  不互相关联 如果为false就互相关联 -->
      <!-- id作为唯一标识 -->
      <el-tree
        ref="permTree"
        :data="permData"
        :props="{label:'name'}"
        :show-checkbox="true"
        :check-strictly="true"
        :default-expand-all="true"
        node-key="id"
      />
      <!-- 确定 取消 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnPermOK">确定</el-button>
          <el-button size="small" @click="btnPermCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { getCompanyInfo, getRoleList, delRole, getRoleDetail, editRole, addRole, assignPerm } from '@/api/setting'
import { getPermList } from '@/api/permission'
import { treeDatadepart } from '@/utils/index'
export default {
  data() {
    return {
      userId: '',
      showPermDialog: false,
      permData: [],
      // 公司信息
      formData: {
        name: '',
        companyAddress: '',
        mailbox: 'mailbox',
        remarks: ''
      },
      // 员工信息列表
      roleList: [],
      page: {
        page: 1,
        pagesize: 10,
        total: 0
      },
      // 控制弹出框
      showDialog: false,
      roleForm: {
        name: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该项不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    titleText() {
      return this.roleForm.id ? '编辑角色' : '新增角色'
    }
  },
  created() {
    this.getCompanyInfo()
    this.getRoleList()
  },
  methods: {
    // 分配权限
    async assignPerm(id) {
      this.userId = id
      this.permData = treeDatadepart(await getPermList(), '0')
      const { permIds } = await getRoleDetail(id)
      this.showPermDialog = true
      this.$nextTick(() => {
        // 设置id
        this.$refs.permTree.setCheckedKeys(permIds)
      })
    },
    btnPermCancel() {
      this.$refs.permTree.getCheckedKeys([])
      this.showPermDialog = false
    },
    async btnPermOK() {
      const id = this.userId
      const permIds = this.$refs.permTree.getCheckedKeys()
      await assignPerm({ id, permIds })
      this.showPermDialog = false
      this.$message.success('操作成功')
    },
    // 公司信息
    async getCompanyInfo() {
      this.formData = await getCompanyInfo(this.$store.getters.companyId)
    },
    // 角色
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page)
      this.roleList = rows
      this.page.total = total
    },
    changePage(newPage) {
      this.page.page = newPage
      this.getRoleList()
    },
    // 删除
    async delRole(id) {
      try {
        // 二次校验
        await this.$confirm('确定删除？')
        // 发请求
        await delRole(id)
        // 优化
        if (this.roleList.length === 1 && this.page.page > 1) this.page.page--
        // 提示用户
        this.$message.success('删除成功')
        // 刷新页面
        this.getRoleList()
      } catch (error) {
        console.log(error)
      }
    },
    // 编辑和修改
    async editRole(id) {
      // 回显数据
      this.roleForm = await getRoleDetail(id)
      // 控制弹窗
      this.showDialog = true
    },
    // 取消
    btnCancel() {
      // 恢复表单数据
      this.roleForm = {
        name: '',
        description: ''
      }
      // 清除校验
      this.$refs.roleForm.resetFields()
      this.showDialog = false
    },
    // 确定
    async btnOK() {
      // 没有数据阻止发请求
      await this.$refs.roleForm.validate()
      // 发请求
      if (this.roleForm.id) {
        // 编辑
        await editRole(this.roleForm)
      } else {
        // 添加
        await addRole(this.roleForm)
      }
      // 提示用户
      this.$message.success('操作成功')
      // 关闭弹窗
      this.showDialog = false
      // 刷新页面
      this.getRoleList()
    }
  }
}
</script>

<style>

</style>
