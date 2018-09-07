<style>

</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamRoleListPage' }">角色管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改角色</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    修改角色
                </p>
            </div>
            <div>
                <el-form-item label="角色编码">
                    <el-input v-model="roleForm.roleCode" class="xe-input-col3" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" required prop="roleName">
                    <el-input v-model="roleForm.roleName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="角色说明" prop="remark">
                    <el-input v-model="roleForm.remark" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('roleForm')">提 交</el-button>
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
            return {
                roleForm: this.$route.query,
                rules: {
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
                        this.modifyRoleFn();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            modifyRoleFn() {
                let _this = this;
                let param = {};
                param = _this.roleForm;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/role/modify/editUamRole',
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
