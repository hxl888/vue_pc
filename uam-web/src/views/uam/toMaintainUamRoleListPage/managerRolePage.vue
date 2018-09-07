<style rel="stylesheet/scss" lang="scss">
.xe-page-content .el-tree{
    max-height: 450px;
    overflow-y: scroll;
    margin-bottom:15px;
}
</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamRoleListPage' }">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                角色授权
            </p>
        </div>
        <el-form :inline="true" :model="roleForm" ref="roleForm" label-width="100px">
            <el-form-item label="角色名称">
                <el-input v-model="roleForm.roleName" class="xe-input-readonly-color xe-input-col3" :readonly=true></el-input>
            </el-form-item>
            <el-form-item label="角色编码">
                <el-input v-model="roleForm.roleCode" class="xe-input-readonly-color xe-input-col3" :readonly=true></el-input>
            </el-form-item>
            <el-tree ref="tree" :data="treeData" show-checkbox node-key="id"
                     :default-expanded-keys="defaultExpandedKeys"
                     :default-checked-keys="defaultCheckedKeys"
                     :props="defaultProps"></el-tree>
            <el-form-item label=" ">
                <el-button type="primary" @click="save">保 存</el-button>
                <el-button @click="returnBefore">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                roleForm: this.$route.query,
                treeData: [],
                defaultExpandedKeys: [],
                defaultCheckedKeys: [],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                treeDataObj: {}
            };
        },
        created() {
            this.queryDataFn();
        },
        methods: {
            queryDataFn() {
                let _this = this;
                let param = {};
                param.param = _this.roleForm;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/role/common/getAuthTreeByRoleId/${this.roleForm.id}`,
                    data: param
                }).then((res) => {
                    _this.treeData = this.formatTreeData(res.result);
                    res.result.forEach((item) => {
                        _this.treeDataObj[item.id] = item;
                    });
                }).catch((err) => {
                    console.log(err);
                });
            },
            save() {
                let _this = this;
                this.$confirm('确定保存该角色的权限吗？', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    _this.savaBtn();
                }).catch(() => {
                });
            },
            formatCheckedId(checkeds) {
                let _this = this;
                let ids = '';
                let deDuplication = {};
                function eachData(item) {
                    ids += item.id + ',';
                    let parent = _this.treeDataObj[item.pId];
                    if (parent) {
                        if (!deDuplication[parent.id]) {
                            deDuplication[parent.id] = parent;
                            eachData(parent);
                        }
                    }
                }
                checkeds.forEach((item) => {
                    eachData(item);
                });
                return ids.substring(0, ids.length - 1);
            },
            savaBtn() {
                let _this = this;
                let param = {};
                param.roleId = this.roleForm.id;
                let checkeds = this.$refs.tree.getCheckedNodes(true);
                param.menuListString = _this.formatCheckedId(checkeds);
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/role/grant/grantAuth4UamRole',
                    data: param
                }).then((res) => {
                    _this.treeData = res['result'];
                    _this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },
            returnBefore() {
                this.$router.go(-1);
            },
            formatTreeData(treeData) {
                var _this = this;
                var newTreeData = [];
                function eachData(treeData, newTreeData, id) {
                    treeData.forEach((item, index) => {
                        if (item.pId === id) {
                            item.label = item.name;
                            newTreeData.push(item);
                            if (item.open === true) {
                                _this.defaultExpandedKeys.push(item.id);
                            }
                            item.children = [];
                            eachData(treeData, item.children, item.id);
                        }
                    });
                }
                eachData(treeData, newTreeData, '');
                function eachNewTreeData(data) {
                    data.forEach((item) => {
                        if (item.children.length === 0) {
                            if (item.checked) {
                                _this.defaultCheckedKeys.push(item.id);
                            }
                        } else {
                            eachNewTreeData(item.children);
                        }
                    });
                }
                eachNewTreeData(newTreeData);
                return newTreeData;
            }
        }
    };

</script>
