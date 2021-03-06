<template>
  <div class="roleForm">
    <el-form ref="form" :model="roleForm" label-width="80px">
      <el-form-item label="角色名称">
        <el-input
          v-model="roleForm.roleName"
          placeholder="请输入角色名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input
          v-model="roleForm.roleDescription"
          type="textarea"
          placeholder="请输入角色描述"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色权限">
        <!-- 树形控件
          *data:展示数据
          *props:配置选项
          *check-strictly:在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
          *show-checkbox:节点是否可被选择
          *node-key:树节点唯一标识的属性
          *render-after-expand:是否在第一次展开某个树节点后才渲染其子节点
          *default-checked-keys:默认勾选的节点的 key 的数组
         -->
        <el-tree
          class="tree"
          ref="tree"
          :data="permissionList"
          :props="defaultProps"
          :check-strictly="checkStrictly"
          show-checkbox
          node-key="path"
          render-after-expand
          :default-checked-keys="defaultCheckedKeys"
        >
        </el-tree>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    roleForm: {},
    permissionList: {},
  },
  data() {
    return {
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
      defaultCheckedKeys: [],
    };
  },
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
