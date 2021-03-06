/** * @description: 面包屑按钮 */
<template>
  <div class="hamburger" @click="toggleChange">
    <svg-icon
      :class-name="sidebarOpened ? 'hamburger-icon opened' : 'hamburger-icon'"
      icon-class="hamburger"
    ></svg-icon>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    sidebarOpened: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    toggleChange() {
      this.$emit("toggleChange");
    },
  },
};
</script>

<style lang="scss" scoped>
.hamburger-icon {
  font-size: 20px;
}
.opened {
  transform: rotate(180deg);
}
</style>
