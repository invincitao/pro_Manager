<template>
  <UploadExcel :on-success="onLoad" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  methods: {
    async onLoad(data) {
      console.log(data.results)
      // 如果是导入员工
      const dict = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName',
        '聘用形式': 'formOfEmployment'
      }
      const userData = data.results.map(user => {
        return this.translate(user, dict)
      })
      // console.log(userData)
      // 发请求
      await importEmployee(userData)
      this.$message.success('导入成功')
      this.$router.back()
    },
    translate(user, dict) {
      const newUser = {}
      for (const key in user) {
        const enKey = dict[key]
        const value = user[key]
        if (enKey === 'timeOfEntry' || enKey === 'correctionTime') {
          newUser[enKey] = new Date(this.formatDate(value, '/'))
        } else {
          newUser[enKey] = value
        }
      }
      return newUser
    },
    // 转化日期
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
