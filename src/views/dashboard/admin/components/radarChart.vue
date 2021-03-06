<template>
  <div class="radarChart" style="height:300px;width:100%"></div>
</template>

<script>
import * as echarts from "echarts"; //引入 echarts
require("echarts/theme/macarons"); //主题配置

export default {
  components: {},
  data() {
    return {
      chart: null,
      animationDuration: 3000,
    };
  },
  watch: {},
  mounted() {
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
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        radar: {
          radius: "66%",
          center: ["50%", "42%"],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: "rgba(127,95,132,.3)",
              opacity: 1,
              shadowBlur: 45,
              shadowColor: "rgba(0,0,0,.5)",
              shadowOffsetX: 0,
              shadowOffsetY: 15,
            },
          },
          indicator: [
            { name: "KDA", max: 10000 },
            { name: "补刀", max: 20000 },
            { name: "参团", max: 20000 },
            { name: "金钱", max: 20000 },
            { name: "伤害", max: 20000 },
            { name: "击杀", max: 20000 },
          ],
        },
        legend: {
          left: "center",
          bottom: "10",
          data: ["出场次数", "总击杀", "总助攻"],
        },
        series: [
          {
            type: "radar",
            symbolSize: 0,
            areaStyle: {
              normal: {
                shadowBlur: 13,
                shadowColor: "rgba(0,0,0,.2)",
                shadowOffsetX: 0,
                shadowOffsetY: 10,
                opacity: 1,
              },
            },
            data: [
              {
                value: [5000, 7000, 12000, 11000, 15000, 14000],
                name: "出场次数",
              },
              {
                value: [4000, 9000, 15000, 15000, 13000, 11000],
                name: "总击杀",
              },
              {
                value: [5500, 11000, 12000, 15000, 12000, 12000],
                name: "总助攻",
              },
            ],
            animationDuration: this.animationDuration,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
