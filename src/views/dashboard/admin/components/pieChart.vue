<template>
  <div class="pieChart" style="height:300px;width:100%"></div>
</template>

<script>
import * as echarts from "echarts"; //引入 echarts
require("echarts/theme/macarons"); //主题配置
export default {
  components: {},
  data() {
    return {
      chart: null,
    };
  },
  watch: {},
  mounted() {
    /**
     * @description:要确保dom元素已经挂载到页面中
     * 一：在mounted生命周期函数中实例化echarts对象
     */
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["Industries", "Technology", "Forex", "Gold", "Forecasts"],
        },
        series: [
          {
            name: "WEEKLY WRITE ARTICLES",
            type: "pie",
            roseType: "radius",
            radius: [15, 95],
            center: ["50%", "38%"],
            data: [
              { value: 320, name: "Industries" },
              { value: 240, name: "Technology" },
              { value: 149, name: "Forex" },
              { value: 100, name: "Gold" },
              { value: 59, name: "Forecasts" },
            ],
            animationEasing: "cubicInOut",
            animationDuration: 2600,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
