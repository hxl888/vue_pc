<style rel="stylesheet/scss" lang="scss">



</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamUserListPage' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>修改密码</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                修改密码
            </p>
        </div>
        <div>
            <el-form :model="modifyForm" :rules="rules"  ref="ruleForm" :label-width="xeLabelWidth">
                <el-form-item label="原始密码" prop="oldPassword" required>
                    <el-input  type="password" class = "xe-input-col3" v-model="modifyForm.oldPassword" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" required>
                    <el-input  type="password" class = "xe-input-col3" v-model="modifyForm.newPassword" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPwd" required>
                    <el-input type="password" class = "xe-input-col3" v-model="modifyForm.confirmPwd" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="saveBtnClick('ruleForm')">保存</el-button>
                    <el-button @click="backBtnClick()">返回</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
//    import {getNowCookie} from 'xcms-common-plugins/src/utils/';
    export default {
        data() {
            var checkNewPwd = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('必须输入数字与英文字母组合,长度在6-14位之间'));
                    } else {
                        let param = {};
                        param.newPassword = value;
                        param.loginName = this.formData.loginName;
                        console.log(param);
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/user/common/checkNewPassword',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
                                callback(new Error('新密码与原始密码不能相同'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入新密码'));
                }
            };

            var checkConfirmPwd = (rule, value, callback) => {
                let _this = this;
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('必须输入数字与英文字母组合,长度在6-14位之间'));
                    } else {
                        if (value !== _this.modifyForm.newPassword) {
                            callback(new Error('两次输入密码不一致'));
                        } else {
                            callback();
                        }
                    }
                } else {
                    callback(new Error('请确认密码'));
                }
            };
            return {
                formData: this.$route.query,
                modifyForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPwd: ''
                },
                rules: {
                    oldPassword: [
                        {required: true, message: '请输入原始密码', trigger: 'blur'},
                        { min: 6, max: 14, message: '长度必须在6-14位之间', trigger: 'blur' }
                    ],
                    newPassword: [
                        { validator: checkNewPwd, trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { validator: checkConfirmPwd, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {

        },
        methods: {
            saveBtnClick(formName) {
                let _this = this;
                this.$confirm(`您将要修改 ${_this.formData.loginName} 的密码, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$refs[formName].validate((valid) => {
                        if (valid) {
                            let param = {};
                            param.oldPassword = _this.modifyForm.oldPassword;
                            param.newPassword = _this.modifyForm.newPassword;
                            param.confirmPwd = _this.modifyForm.confirmPwd;
                            param.loginName = _this.formData.loginName;
                            this.$http({
                                method: 'POST',
                                url: '/page/uam/setup/modifyUserPwd',
                                data: param
                            }).then((res) => {
                                this.$xeMessage({
                                    type: 'info',
                                    message: '修改成功'
                                });
                                this.$router.go(-1);
                            });
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                }).catch(() => {
                    this.$xeMessage({
                        type: 'info',
                        message: '已取消修改'
                    });
                });
            },
            backBtnClick() {
                this.$router.go(-1);
            }
        }
    };

</script>
