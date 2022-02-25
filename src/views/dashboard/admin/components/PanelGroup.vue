<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('apps')">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="user" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">用户数</div>
          <count-to :start-val="0" :end-val="v1" :duration="1000" class="card-panel-num"/>个
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('services')">
        <div class="card-panel-icon-wrapper icon-example">
          <svg-icon icon-class="logs" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">日志数</div>
          <count-to :start-val="0" :end-val="v2" :duration="2000" class="card-panel-num"/>条
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('services')">
        <div class="card-panel-icon-wrapper icon-list">
          <svg-icon icon-class="news" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">资讯数</div>
          <count-to :start-val="0" :end-val="v3" :duration="3000" class="card-panel-num"/>条
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('services')">
        <div class="card-panel-icon-wrapper icon-component">
          <svg-icon icon-class="department" class-name="card-panel-icon"/>
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">院系数</div>
          <count-to :start-val="0" :end-val="v4" :duration="4000" class="card-panel-num"/>个
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import CountTo from 'vue-count-to'

  export default {
    name: "PanelGroup",
    components:{CountTo},
    props: {
      v1: {
        type: Number,
        default: 13
      },
      v2: {
        type: Number,
        default: 60
      },
      v3: {
        type: Number,
        default: 120
      },
      v4: {
        type: Number,
        default: 34
      },
    },
    methods:{
      handleSetLineChartData(type) {
        this.$emit('handleSetLineChartData', type)
      }
    }
  }
</script>

<style lang="scss" scoped>
.panel-group{
  margin-top: 18px;

  .card-panel-col{
    margin-bottom: 32px;
  }

  .card-panel{
    height: 108px;
    cursosr: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);


  .card-panel-icon-wrapper{
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px
  }

  .card-panel-icon{
    float: left;
    font-size: 48px;
  }

  .card-panel-description{
    float: right;
    font-weight: bold;
    margin: 26px;
    margin-left: 0px;

    .card-panel-text{
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 16px;
      margin-bottom: 12px;
    }

    .card-panel-num{
      font-size: 20px;
    }
  }

  &:hover{
    .card-panel-icon-wrapper{color: #fff}

    .icon-people{background: #13ce66}

    .icon-example{background: #13b2ce}

    .icon-list{background: #1354ce}

    .icon-component{background: #6113ce}

  }
  .icon-people{color: #13ce66}

  .icon-example{color: #13b2ce}

    .icon-list{color: #1354ce}

    .icon-component{color: #6113ce}
  }
}


</style>
