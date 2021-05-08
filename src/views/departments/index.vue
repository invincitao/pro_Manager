<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="tree-card">

        <treeTools
          :treenode="company"
          :isroot="true"
          @addDepart="addDepart"
        />

        <el-tree :data="departs" :props="{lable:'name'}" :default-expand-all="true">
          <template #default="scpoed">
            <treeTools
              :treenode="scpoed.data"
              :isroot="false"
              @delDepart="getDepartments"
              @addDepart="addDepart"
            />
          </template>
        </el-tree>
      </el-card>

      <addDept
        :show-dialog="showDialog"
        :treenode="treenode"
      />
    </div>
  </div>
</template>

<script>
import { getDepartments } from '@/api/department'
import { treeDatadepart } from '@/utils/index'
import treeTools from './components/tree-tool'
import addDept from './components/add-dept'
export default {
  components: {
    treeTools,
    addDept
  },
  data() {
    return {
      company: {
        name: '江苏传智播客教育科技股份有限公司',
        manager: '负责人'
      },
      departs: [],
      showDialog: false,
      treenode: {}
    }
  },
  async created() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments()
      // this.departs = res.depts
      this.departs = treeDatadepart(res.depts, '')
    },
    addDepart(treenode) {
      this.showDialog = true
      this.treenode = treenode
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
