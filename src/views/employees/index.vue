<template>
  <div class="dashboard-container">
    <div class="app-container">
      <page-tools :show-before="true">
        <span slot="before">共{{ page.total }}条记录</span>
        <template slot="after">
          <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
          <el-button size="small" type="danger" @click="exportEmployees">导出</el-button>
          <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
        </template>
      </page-tools>
      <!-- 放置表格和分页 -->
      <el-card>
        <el-table border :data="employeeList">
          <el-table-column label="序号" sortable="">
            <template slot-scope="scope">
              {{ ((page.page - 1) * page.size) + (scope.$index +1) }}
            </template>
          </el-table-column>
          <el-table-column label="头像" sortable="" prop="username">
            <template #default="{row}">
              <img
                v-imgerr="require('@/assets/common/head.jpg')"
                :src="row.staffPhoto"
                alt=""
                class="userAvater"
                @click="showQRcode(row.staffPhoto)"
              >
            </template>
          </el-table-column>
          <el-table-column label="姓名" sortable="" prop="username" />
          <el-table-column label="工号" sortable="" prop="workNumber" />
          <el-table-column label="聘用形式" sortable="" prop="formOfEmployment" :formatter="formOfEmployment" />
          <el-table-column label="部门" sortable="" prop="departmentName" />
          <el-table-column label="入职时间" sortable="">
            <template slot-scope="scope">
              {{ scope.row.timeOfEntry | formatDate }}
            </template>
          </el-table-column>
          <el-table-column label="账户状态" sortable="">
            <template slot-scope="scope">
              <el-switch :value="scope.row.enableState===1" />
            </template>
          </el-table-column>
          <el-table-column label="操作" sortable="" fixed="right" width="280">
            <template #default="{row}">
              <el-button type="text" size="small" @click="$router.push('/employees/detail/'+ row.id)">查看</el-button>
              <el-button type="text" size="small">转正</el-button>
              <el-button type="text" size="small">调岗</el-button>
              <el-button type="text" size="small">离职</el-button>
              <el-button type="text" size="small" @click="assignRole(row.id)">角色</el-button>
              <el-button type="text" size="small" @click="delEmployee(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-row type="flex" justify="center" align="middle" style="height: 60px">
          <el-pagination
            layout="prev, pager, next"
            :page-size="page.size"
            :current-page="page.page"
            :total="page.total"
            @current-change="changePage"
          />
        </el-row>
      </el-card>
      <addEmployee :show-dialog.sync="showDialog" />
      <!-- 头像 -->
      <el-dialog title="头像预览" :visible="showAvater" @close="showAvater = false">
        <el-row type="flex" justify="center">
          <canvas ref="myCanvas" />
        </el-row>
      </el-dialog>
    </div>

    <assignRole ref="assignRole" :user-id="userId" :show-role-dialog.sync="showRoleDialog" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import employeeEnum from '@/api/constant/employees'
import { formatDate } from '@/filters'
import addEmployee from './components/add-employee'
import QRCode from 'qrcode'
import assignRole from './components/assign-role'
export default {
  // filters: {
  //   formatDate(oldValue) {
  //     return oldValue.split('T')[0]
  //   }
  // },
  components: {
    addEmployee,
    assignRole
  },
  data() {
    return {
      userId: '',
      showRoleDialog: false,
      showAvater: false,
      showDialog: false,
      // 员工列表
      employeeList: [],
      page: {
        page: 1,
        size: 6,
        total: 0
      }
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
    // 权限
    assignRole(id) {
      this.userId = id
      this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    },
    // 显示头像
    showQRcode(url) {
      if (url) {
        this.showAvater = true
        this.$nextTick(() => {
          QRCode.toCanvas(this.$refs.myCanvas, url, {
            with: 300,
            color: {
              dark: '#4a7afb'
            }
          })
        })
      }
    },
    // 获取员工简单列表
    async getEmployeeList() {
      const { rows, total } = await getEmployeeList(this.page)
      this.employeeList = rows
      this.page.total = total
    },
    // 换页
    changePage(newPage) {
      this.page.page = newPage
      this.getEmployeeList()
    },
    // 用枚举方法实现格式化聘用形式
    formOfEmployment(row, column, cellValue) {
      const obj = employeeEnum.hireType.find(item => item.id === Number(cellValue))
      return obj ? obj.value : '未知'
    },
    // 导出
    async exportEmployees() {
      const { export_json_to_excel } = await import('@/vendor/Export2Excel')
      // 获取员工列表
      const { rows } = await getEmployeeList({ page: 1, size: this.page.total })
      console.log(rows)
      // 创建翻译列表
      const dict = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const userData = rows.map(user => {
        return this.ObjArr(user, dict)
      })
      export_json_to_excel({
        header: Object.keys(dict),
        data: userData
      })
    },
    // 导出逻辑
    ObjArr(user, dict) {
      const newArr = []
      for (const key in dict) {
        const enKey = dict[key]
        const value = user[enKey]
        if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          newArr.push(new Date(formatDate(value)))
        } else if (enKey === 'formOfEmployment') {
          const obj = employeeEnum.hireType.find(item => item.id === value)
          newArr.push(obj ? obj.value : '未知')
        } else {
          newArr.push(value)
        }
      }
      return newArr
    },
    // 删除员工
    async delEmployee(id) {
      try {
        // 二次校验
        await this.$confirm('确认删除该员工？')
        // 发请求
        await delEmployee(id)
        // 优化
        if (this.employeeList.length === 1 && this.page.page > 1) this.page.page--
        // 提示用户
        this.$message.success('删除成功')
        // 刷新页面
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep.userAvater{
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
</style>
