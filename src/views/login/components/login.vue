<template>
  <div class="login-component">
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      formData: {
        username: "",
        password: "",
      },
    };
  },
  watch: {},
  mounted() {},
  methods: {
    login() {
      this.$emit("login", this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.login-component {
  width: 400px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 24px;
  padding-bottom: 0;
  padding-right: 48px;
  box-sizing: border-box;
}
</style>
