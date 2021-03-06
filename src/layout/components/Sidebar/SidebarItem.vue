<template>
  <div v-if="!item.hidden">
    <!--不嵌套子级菜单-->
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
          (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
          !item.alwaysShow
      "
    >
      <AppLink v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenuNoNest': !isNest }"
        >
          <MenuItem
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          ></MenuItem>
        </el-menu-item>
      </AppLink>
    </template>
    <!--嵌套子菜单-->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <MenuItem
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        ></MenuItem>
      </template>
      <sidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="submenuNest"
      ></sidebarItem>
    </el-submenu>
  </div>
</template>

<script>
import { isExternal } from "utils/validate";
import path from "path";
import MenuItem from ".//MenuItem";
import AppLink from "./AppLink";

export default {
  name: "SidebarItem",
  components: {
    AppLink,
    MenuItem,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    //是否嵌套子级（默认不嵌套）
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    /**
     * @description:
     */
    this.onlyOneChild = null;
    return {};
  },
  watch: {},
  mounted() {},
  methods: {
    /**
     * @description:
     */
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    /**
     * @description:
     */
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        return routePath;
      }
      if (isExternal(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>

<style lang="scss" scoped></style>
