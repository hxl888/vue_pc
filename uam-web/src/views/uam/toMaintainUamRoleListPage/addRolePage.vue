<style>
    .xe-pageHeader{
        height:34px;
        font-size:14px;
        margin:10px 0;
        border-bottom:1px solid #cacaca;
    }
    .xe-col-2{
        width:300px;
    }
    .xe-input-col2{
        width:252px;
    }
</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamRoleListPage' }">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增角色</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    新增角色
                </p>
            </div>
            <div>
                <el-form-item label="类型">
                    <el-radio v-model="roleForm.systemId" :label="2000">伙伴</el-radio>
                    <el-radio v-model="roleForm.systemId" :label="3000">客户</el-radio>
                    <el-radio v-model="roleForm.systemId" :label="1000">运营</el-radio>
                </el-form-item>
                <el-form-item label="角色编码" required prop="roleCode">
                    <el-input v-model="roleForm.roleCode" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" required prop="roleName">
                    <el-input v-model="roleForm.roleName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="角色说明" prop="remark">
                    <el-input v-model="roleForm.remark" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="状态" class="xe-input-col3">
                    <el-radio v-model="roleForm.status" label="ENABLE">启用</el-radio>
                    <el-radio v-model="roleForm.status" label="DISABLE">禁用</el-radio>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('roleForm')">保 存</el-button>
                    <el-button @click="returnBefore">返 回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            var checkRoleName = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('角色名称只能为汉字'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入角色名称'));
                }
            };
            var checkRoleCode = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('角色编码只能为数字和字母'));
                    } else {
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/role/common/checkUamRoleCode',
                            data: value
                        }).then((res) => {
                            if (res.result === false) {
                                callback(new Error('角色编码已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入角色编码'));
                }
            };
            return {
                roleForm: {
                    systemId: 2000,
                    roleCode: '',
                    roleName: '',
                    remark: '',
                    status: 'ENABLE'
                },
                rules: {
                    roleCode: [
                        { min: 0, max: 20, message: '角色编码长度不能大于20', trigger: 'blur' },
                        { validator: checkRoleCode, trigger: 'blur' }
                    ],
                    roleName: [
                        { min: 0, max: 20, message: '角色名称长度不能大于20', trigger: 'blur' },
                        { validator: checkRoleName, trigger: 'blur' }
                    ],
                    remark: [
                        { min: 0, max: 150, message: '角色说明长度不能大于150', trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('llll');
                        this.saveRoleFn();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveRoleFn() {
                let _this = this;
                let param = {};
                param = _this.roleForm;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/role/add/addUamRole',
                    data: param
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
