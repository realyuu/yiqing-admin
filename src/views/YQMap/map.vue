<template>
    <div class="hello">
      <!-- echarts 初始化 -->
      <div class="content" ref="mapbox"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
import 'echarts/map/js/china.js'
import jsonp from 'jsonp'

const option = {
  title: {
    text: "中国疫情地图",
    link: 'https://www.baidu.com',
    subtext: "shinuia",
    sublink: "https://www.baidu.com"
  },
  series: [{
    name: '确诊人数',
    type: 'map',
    map: 'china',
    label: {
      show: true,
      color: '#ffffff',
      fontSize: 8
    },
    itemStyle: {
      areaColor: '#eee'
    },
    roam: true,
    zoom: 1.2,
    emphasis: {
      label: {
        color: '#fff',
        fontSize: 12,
      },
      itemStyle: {
        areaColor: '#83b5e7'
      }
    },
    data: []
  }],
  // {name: xxx, value: xxx}
  visualMap: [{
    type: 'piecewise',
    show: true,
    pieces: [
      { min: 10000 },
      { min: 1000, max: 9999 },
      { min: 100, max: 999},
      { min: 10, max: 99 },
      { min: 1, max: 9 }
    ],
    // align: 'right'
    // showLabel: false
    inRange: {
      symbol: 'rect',
      color: [
        '#ffc0b1',
        '#9c0505',
      ]
    },
    itemWidth: 20
  }],
  tooltip: {
    trigger: 'item'
  },
  toolbox: {
    show: true,
    orient: 'vertical',
    left: 'right',
    top: 'center',
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {}
    }
  }
}

export default {
  name: 'HelloWorld',
  mounted () {
    this.getData()
    this.mapcharts = echarts.init(this.$refs.mapbox);
    this.mapcharts.setOption(option)
  },
  methods: {
    getData () {
      jsonp('https://interface.sina.cn/news/wap/fymap2020_data.d.json?_=1580892522427', {}, (err, data) => {
        if (!err) {
          // eslint-disable-next-line no-console
          console.log(data)
          let list = data.data.list.map(item => (
            // eslint-disable-next-line no-console
            // console.log(item),
            {
            name: item.name,
            value: item.value,
            susNum: item.susNum
          }))
          option.series[0].data = list
          this.mapcharts.setOption(option)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  width: 1500px;
  height: 638px;
  background-color: rgba(0, 0, 0, 0.3);
}
</style>

