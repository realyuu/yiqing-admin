<template>
  <div class="dashboard-editor-container">
    <panel-group :v1="users" :v2="logs" :v3="three" :v4="four"/>

    <el-row style="background: #fff;padding: 24px 24px 0;margin-bottom: 32px;">
      <line-chart :chart-data="lineChartData"/>
    </el-row>

    <el-row :gutter="8">
      <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 12}" :xl="{span: 12}" style="padding-right:8px;margin-bottom:30px;">
        <transaction-table />
      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">

      </el-col>
      <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}" style="margin-bottom:30px;">

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import PanelGroup from "../admin/components/PanelGroup"
  import LineChart from "../admin/components/LineChart"
  import TransactionTable from '../admin/components/TransactionTable'
  import {loginChart, panelGroup} from "@/api/chart";

  const lineChartData = {
    apps:{
      expectedData:[2,5,9,11,17,19,26],
      // actualData:[1,3,6,8,14,17,22],
      xData:['20-4-1', '20-4-30', '20-6-30', '20-8-31', '20-10-31', '20-12-31', 'today']
    }
  }

  export default {
    name: "index",
    components:{PanelGroup, LineChart, TransactionTable},
    data(){
      return{
        lineChartData: lineChartData.apps,
        height: 0,
        users: 0,
        logs: 0,
        three: 0,   //PanelGroup 第三个数字
        four: 0     //第四个数字
      }
    },
    mounted(){
      // panelGroup 面板统计功能
      panelGroup().then(res=>{
        this.users = res.data.users
        this.logs = res.data.logs
        this.three = res.data.three
        this.four = res.data.four
      }).catch(error=>{
        console.log(error)
      })
      loginChart().then(res=>{
        console.log('loginChartData',res);
        this.lineChartData = res.data
      }).catch(error=>{
        console.log(error)
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
