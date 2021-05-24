<template>
  <div>
    <el-row justify="end" type="flex">
      <el-select v-model="currentYear" size="small" style="width: 120px" @change="changeDate">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item">{{ item }}</el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width: 120px;margin-left:10px" @change="changeDate">
        <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item">{{ item }}</el-option>
      </el-select>
    </el-row>
    <el-calendar v-model="currentDate">
      <template #dateCell="{date,data}">
        <div class="date-content">
          <!-- <span class="text">{{ data.day }}</span> -->
          <span class="text">{{ data.day | getDay }}</span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(oldVal) {
      const newVal = oldVal.split('-')[2]
      return newVal
    }
  },
  data() {
    return {
      currentDate: new Date(),
      currentYear: '',
      currentMonth: '',
      yearList: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.currentMonth = this.currentDate.getMonth() + 1
      this.currentYear = this.currentDate.getFullYear()
      for (let index = 0; index < 11; index++) {
        // console.log(index + this.currentYear - 5)
        this.yearList.push(index + this.currentYear - 5)
      }
    },
    changeDate() {
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    },
    isWeek(value) {
      return value.getDay() === 0 || value.getDay() === 6
    }
  }
}
</script>

<style  scoped>
 ::v-deep .el-calendar-day {
  height:  auto;
 }
 ::v-deep .el-calendar-table__row td,::v-deep .el-calendar-table tr td:first-child,  ::v-deep .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 ::v-deep .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 ::v-deep .el-calendar__header {
   display: none
 }
</style>

