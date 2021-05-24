<template>
  <div>
    <div id="chartWrapper" ref="myechart" />
  </div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  mounted() {
    const myChart = echarts.init(this.$refs.myechart)
    myChart.setOption({
      textStyle: {
        fontSize: 18
      },
      color: ['#ff0000', '#00ff00', '#0000ff', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '加班天数（ot）', max: 6500 },
          { name: '管理（Administration）', max: 16000 },
          { name: '信息技术（Information Technology）', max: 30000 },
          { name: '客服（Customer Support）', max: 38000 },
          { name: '研发（Development）', max: 52000 },
          { name: '市场（Marketing）', max: 25000 }
        ]
      },
      series: [{
        name: '预算 vs 开销（Budget vs spending）',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: '预算分配（Allocated Budget）'
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: '实际开销（Actual Spending）'
          },
          {
            value: [3800, 10000, 21500, 30000, 32000, 1000],
            name: '测试数据（Actual Spending）'
          }
        ]
      }]
    })
  }
}
</script>

<style lang="scss" scoped>
#chartWrapper {
  width: 600px;
  height: 400px;
}
</style>

