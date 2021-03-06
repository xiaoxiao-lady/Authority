<template>
  <div class="admin">
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="8">
        <radarChart></radarChart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8">
        <pieChart></pieChart>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8"></el-col>
    </el-row>
  </div>
</template>

<script>
import radarChart from "./components/radarChart";
import pieChart from "./components/pieChart";
export default {
  components: {
    radarChart,
    pieChart,
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
