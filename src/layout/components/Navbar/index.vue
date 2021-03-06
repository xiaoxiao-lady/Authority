<template>
  <div class="navbar">
    <Hamburger
      :sidebarOpened="sidebar.opened"
      @toggleChange="toggleChange"
    ></Hamburger>
    <Breadcrumb></Breadcrumb>
    <div class="menu">
      <Search></Search>
      <Avatar></Avatar>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Hamburger from "./Hamburger";
import Breadcrumb from "./Breadcrumb";
import Search from "./Search";
import Avatar from "./Avatar";
export default {
  components: {
    Hamburger,
    Breadcrumb,
    Search,
    Avatar,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
  },
  data() {
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    toggleChange() {
      this.$store.dispatch("app/toggleSidebar");
    },
  },
};
</script>

<style lang="scss" scoped></style>
