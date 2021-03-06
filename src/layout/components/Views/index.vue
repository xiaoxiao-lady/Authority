<template>
  <div class="views">
    <transition name="appFade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
export default {
  name: "mainContainer",
  components: {},
  computed: {
    cachedViews() {
      return this.$store.getters.cachedViews;
    },
    key() {
      return this.$route.path;
    },
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
