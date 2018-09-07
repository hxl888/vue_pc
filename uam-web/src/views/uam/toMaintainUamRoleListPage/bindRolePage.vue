<style rel="stylesheet/scss" lang="scss">
    .roleBind{
        margin-bottom: 15px;
    }

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamRoleListPage' }">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>绑定角色</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="roleForm" ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    角色绑定用户
                </p>
            </div>
            <role-bind :option-data="roleBindData" class="roleBind" :success-callback="successCallback"></role-bind>
            <el-form-item label="">
                <el-button type="primary" @click="submitForm('roleForm')">保 存</el-button>
                <el-button @click="returnBefore">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import RoleUserBind from '../../../components/roleUserBind';
    export default {
        data() {
            return {
                id: this.$route.query.id,
                roleForm: this.$route.query,
                roleBindData: {},
                groupBindStr: ''
            };
        },
        created() {
            this.queryDataFn();
        },
        components: {
            'role-bind': RoleUserBind
        },
        methods: {
            queryDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/role/bind/roleBindUserPageInfo/${this.id}`
                }).then((res) => {
                    _this.roleBindData = {
                        leftData: res.result.notBindUserSet ? res.result.notBindUserSet : [],
                        rightData: res.result.alreadyBindUserSet ? res.result.alreadyBindUserSet : []
                    };
                    _this.formatBindId(_this.roleBindData.rightData);
                }).catch((err) => {
                    console.log(err);
                });
            },
            successCallback(unBindArr, bindArr) {
                console.log(bindArr);
                this.formatBindId(bindArr);
            },
            formatBindId(bindArr) {
                this.groupBindStr = '';
                bindArr.forEach((item, index) => {
                    this.groupBindStr += item.id;
                    if (index !== bindArr.length - 1) {
                        this.groupBindStr += ',';
                    }
                });
            },
            submitForm() {
                let _this = this;
                this.$confirm('确定保存该角色所绑定用户吗？', '提示', {
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
                    url: '/page/uam/role/bind/bindUamUser4Role',
                    data: {
                        roleId: _this.id,
                        userIds: _this.groupBindStr
                    }
                }).then((res) => {
                    _this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },
            returnBefore() {
                this.$router.go(-1);
            }
        }
    };

</script>
