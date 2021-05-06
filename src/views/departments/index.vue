<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">

        <treeTools :treenode="company" :isroot="true" />

        <el-tree :data="departs" :props="{lable:'name'}" :default-expand-all="true">
          <template #default="scpoed">
            <treeTools :treenode="scpoed.data" :isroot="false" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import treeTools from './components/tree-tool'
export default {
  components: {
    treeTools
  },
  data() {
    return {
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }]

    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  70px;
  font-size:14px;
}
</style>
