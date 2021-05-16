<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" @close="btnCancel">
    <!-- el-checkbox-group选中的是 当前用户所拥有的角色  需要绑定 当前用户拥有的角色-->
    <el-checkbox-group>
      <!-- 选项 -->
      <!-- 分配角色 -->
      <el-checkbox-group v-model="roleIds">
        <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
          {{
            item.name
          }}
        </el-checkbox>
      </el-checkbox-group>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      roleIds: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const { rows } = await getRoleList()
      this.list = rows
    },
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds
    },
    btnCancel() {
      this.roleIds = []
      this.$emit('update:showRoleDialog', false)
    },
    async btnOK() {
      const id = this.userId
      const roleIds = this.roleIds
      await assignRoles({ id, roleIds })
      this.$message.success('修改成功')
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
