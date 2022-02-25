<template>
  <div class="dashboard-editor-container">
    <el-row style="background: #fff;padding: 24px 24px 0;margin-bottom: 32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="32">
      <el-col  :xs="24" :sm="24" :lg="8">
        <div class="chart-wrapper">
          <div>学生情况</div>
          <pie-chart />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="16">
        <div class="chart-wrapper">
          <div>辅导员配备</div>
          <bar-chart />
        </div>
      </el-col>

    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import LineChart from "./LineChart"
  import BarChart from "./BarChart"
  import PieChart from "./PieChart"
  import {lineChart} from "@/api/chart";

  const lineChartData = {
    apps:{
      expectedData:[2,5,9,11,17,19,26],
      actualData:[1,3,6,8,14,17,22],
      xData:[1,2,3,4,5,6,7]
    }
  }

  export default {
    name: "index",
    components:{
      LineChart,
      BarChart,PieChart
    },
    data(){
      return{
        lineChartData: lineChartData.apps,
        useArray: [
          {
            "name":"学生管理",
            "url":"Enoch_Eastwood8658@twipet.com"
          },
          {
            "name":"疫情打卡",
            "url":"Doris_Wade7948@bulaffy.com"
          },
          {
            "name":"数据导出",
            "url":"Ilona_Vallory9282@corti.com"
          },
          {
            "name":"统计分析",
            "url":"Jenna_Kennedy5321@bretoux.com"
          },
          {
            "name":"离校申请",
            "url":"Anabelle_Addison3322@nickia.com"
          },
          {
            "name":"日志管理",
            "url":"Chelsea_Jones2342@bretoux.com"
          },
          {
            "name":"权限管理",
            "url":"Roger_Khan5716@naiker.biz"
          },
          {
            "name":"其他用户",
            "url":"Hayden_Ellery25@gembat.biz"
          },
          {
            "name":"通知管理",
            "url":"Josh_Cobb1642@yahoo.com"
          }
        ],
        height: 0
      }
    },
    mounted() {
      this.$nextTick(() => {
        lineChart().then(res=>{
          lineChartData.apps.expectedData = res.data.outcome
          lineChartData.apps.actualData = res.data.income
          lineChartData.apps.xData = res.data.x

          console.log(res.data)
        })
      })
    },
    methods:{
      handleSetLineChartData(type){
        this.lineChartData = lineChartData[type]
      }
    }
  }
</script>

<style lang="scss" scoped>
.dashboard-editor-container{
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
    text-align: center;
  }
}
</style>
