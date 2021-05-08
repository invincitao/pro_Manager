<template>
  <!-- 用了一个行列布局 -->
  <el-row type="flex" justify="space-between" align="middle" style="height: 40px; width: 100%">
    <el-col>

      <strong v-if="isroot">
        <i class="el-icon-s-platform" style="font-size:20px" />{{ treenode.name }}
      </strong>
      <span>{{ treenode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treenode.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown>
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="addDepart">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isroot" @click.native="editDepart">编辑子部门</el-dropdown-item>
              <el-dropdown-item v-if="!isroot" @click.native="delDepart">删除子部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from '@/api/department'
export default {
  props: {
    treenode: {
      type: Object,
      required: true
    },
    isroot: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    // 删除
    async delDepart() {
      await this.$confirm('是否确认删除')
      // 核心就是发请求
      await delDepartments(this.treenode.id)
      // 提示用户
      this.$message.success('删除成功')
      // 更新页面
      this.$emit('delDepart')
    },
    // 新增
    addDepart() {
      this.$emit('addDepart', this.treenode)
    },
    // 编辑
    editDepart() {
      this.$emit('editDepart', this.treenode)
    }
  }

}
</script>

<style>

</style>
