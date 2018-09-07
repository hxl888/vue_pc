<style rel="stylesheet/scss" lang="scss">

    .xe-page-content .xe-role-tree-panel .el-form-item, .xe-page-content .xe-role-tree-panel .el-form-item__content{
        display: block !important;
    }

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamUserListPage' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>绑定用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                用户角色绑定
            </p>
        </div>
        <div>
            <el-form :inline="true" :model="bindForm"  ref="ruleForm" :label-width="xeLabelWidth">
                <el-form-item label="登陆名" prop="loginName">
                    <el-input class = "xe-input3-col3 xe-input-readonly-color" :readonly=true v-model="bindForm.loginName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobileNo">
                    <el-input class = "xe-input3-col3 xe-input-readonly-color" :readonly=true v-model="bindForm.mobileNo" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                    <el-input class = "xe-input3-col3 xe-input-readonly-color" :readonly=true v-model="bindForm.userName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <div class="xe-role-tree-panel">
                    <el-form-item>
                        <el-tree
                            :data="treeData"
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            :default-checked-keys="checkedDefault"
                            :props="defaultProps">
                        </el-tree>
                    </el-form-item>
                </div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="saveBtnClick()">保存</el-button>
                    <el-button @click="backBtnClick()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                bindForm: this.$route.query,
                treeData: [],
                checkedDefault: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            };
        },
        created() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: `/page/uam/role/common/queryRoleZTreeList/${this.bindForm.id}`,
                data: {
                }
            }).then((res) => {
                _this.treeData = _this.formatTreeData(res['result']);
                res['result'].forEach((item) => {
                    if (item.checked) {
                        _this.checkedDefault.push(item.id);
                    }
                });
            }).catch((err) => {
                console.log(err);
            });
        },
        methods: {
            saveBtnClick() {
                let _this = this;
                this.$confirm('确定保存该用户角色所绑定角色吗？', '提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    _this.save();
                }).catch(() => {
                });
            },
            save() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/user/main/bindUserRoles',
                    data: {
                        userId: _this.bindForm.id,
                        roleId: _this.getUserIds()
                    }
                }).then((res) => {
                    this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },

            getUserIds() {
                var userIdStr = '';
                var checkedArr = this.$refs.tree.getCheckedNodes();
                checkedArr.forEach((item, index) => {
                    userIdStr += item.id;
                    if (index !== checkedArr.length - 1) {
                        userIdStr += ',';
                    }
                });
                return userIdStr;
            },

            backBtnClick() {
                this.$router.go(-1);
            },
            formatTreeData(treeData) {
                var newTreeData = [];
                function eachData(treeData, newTreeData, id) {
                    treeData.forEach((item, index) => {
                        if (item.pId === id) {
                            newTreeData.push(item);
                            item.children = [];
                            eachData(treeData, item.children, item.id);
                        }
                    });
                }
                eachData(treeData, newTreeData, null);
                return newTreeData;
            }
        }
    };

</script>
