<template>
  <div class="roleManage">
    <el-button type="primary" @click="handleAdd">新建角色</el-button>
    <el-table :data="roleList" style="width: 100%" border>
      <el-table-column label="角色ID" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleKey }}
        </template>
      </el-table-column>
      <el-table-column label="角色名称" width="220" align="center">
        <template slot-scope="scope"> {{ scope.row.roleName }} </template>
      </el-table-column>
      <el-table-column label="角色描述" width="220" align="center">
        <template slot-scope="scope">
          {{ scope.row.roleDescription }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="primary" @click="handleEdit(scope)" size="small"
            >编辑</el-button
          >
          <el-button type="danger" @click="handleDelete(scope)" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      :visible.sync="dialogVisible"
      v-if="dialogVisible"
      :title="dialogType == 'add' ? '新增角色' : '编辑角色'"
      :before-close="handleDialogClose"
    >
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
            node-key="id"
            render-after-expand
          >
          </el-tree>
        </el-form-item>
      </el-form>
      <div style="text-align:right">
        <el-button type="danger" @click="handleCacel">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  gerPermissionList,
  getRolePermissionRoleId,
} from "api/user";

export default {
  components: {},
  data() {
    return {
      roleList: [],
      permissionList: [],
      roleForm: {
        roleName: "",
        roleDescription: "",
        rolePermission: [],
      },
      dialogVisible: false,
      dialogType: "add",
      checkStrictly: false,
      defaultProps: {
        children: "children",
        label: "name",
      },
    };
  },
  watch: {},
  created() {
    this.getRoleList();
    this.getPermissionList();
  },

  mounted() {},
  methods: {
    getRoleList() {
      getRoleList().then((res) => {
        this.roleList = res.data;
      });
    },
    getPermissionList() {
      gerPermissionList().then((res) => {
        this.permissionList = res.data;
      });
    },
    getRolePermissionRoleId(roleId) {
      return new Promise((resolve) => {
        let params = {
          roleId,
        };
        getRolePermissionRoleId(params).then((res) => {
          this.roleForm.rolePermission = res.data.map((item) => {
            return { id: item.id };
          });
          resolve();
        });
      });
    },
    handleAdd() {
      this.dialogType = "add";
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([]);
      }
      this.dialogVisible = true;
    },
    /**
     * @description: 编辑表单
     * 细节：防止表单修改原数据：在弹窗打开之前拷贝原数据
     */
    async handleEdit({ row }) {
      this.dialogType = "edit";
      this.dialogVisible = true;
      this.checkStrictly = true;
      //拷贝数组，防止弹框消失时修改原数据 (以下三种方法都可以，但是 JSON.parse(JSON.string()) 在有数组属性时也可以)
      this.roleForm = { ...row };
      // this.roleForm = Object.assign({}, row);
      // this.roleForm = JSON.parse(JSON.stringify(row));
      await this.getRolePermissionRoleId(row.roleKey);
      this.$nextTick(() => {
        //设置默认勾选节点，数据中只需要有 节点key 即可
        this.$refs.tree.setCheckedNodes(this.roleForm.rolePermission);
        this.checkStrictly = false;
      });
    },
    handleDelete({ row }) {},
    handleDialogClose(done) {
      done();
    },
    handleCacel() {
      this.dialogVisible = false;
    },
    handleConfirm() {
      console.log(this.$refs.tree.getCheckedKeys());
      this.dialogVisible = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
