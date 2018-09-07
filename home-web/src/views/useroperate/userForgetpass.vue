<style rel="stylesheet/scss" lang="scss">
    .forgetPass *{
        font-size: 12px;
    }
    .forgetPass {
        .passBox{
            background-color: #FFF;
            padding: 8px 16px 24px;
            .passTit {
                padding: 10px 0 20px;
                font-size: 14px;
                border-bottom: 1px solid #c2c2c2;
            }
            .formPass {
                margin-top: 20px;
                width: 360px;
            }
        }
    }
</style>
<template lang="html">
    <div class="forgetPass">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/" class="zq-smallnav">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="passBox">
            <div class="passTit">
                修改密码
            </div>
            <div class="formPass">
                <el-form :label-position="labelPosition" ref="ruleForm" :rules="rules" label-width="100px" :model="ruleForm">
                    <el-form-item label="原始密码" prop='oldPassword'>
                        <el-input v-model="ruleForm.oldPassword" type="password"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="新密码" prop='newPassword'>
                        <el-input v-model="ruleForm.newPassword" type="password"  placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop='confirmPwd'>
                        <el-input v-model="ruleForm.confirmPwd" type="password"  placeholder=""></el-input>
                    </el-form-item>
                    <div class="subform">
                        <el-form-item>
                            <el-button type="primary" size='' :disabled="forhassub"  @click.prevert="submitForm('ruleForm')">保存</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
    import {getNowCookie} from 'xcms-common-plugins/src/utils/';
    export default {
        data() {
            let checkoldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原始密码'));
                } else {
                    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('必须输入数字与英文字母组合,长度在6-14位之间'));
                    }
                }
            };
            let checknewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
                    if (reg.test(value)) {
                        if (value === this.ruleForm.oldPassword) {
                            callback(new Error('新密码与原始密码不能相同'));
                        } else {
                            callback();
                        }
                    } else {
                        callback(new Error('必须输入数字与英文字母组合,长度在6-14位之间'));
                    }
                }
            };
            let checkconfirmPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else {
                    if (value === this.ruleForm.newPassword) {
                        callback();
                    } else {
                        callback(new Error('确认密码与新密码不一致'));
                    }
                }
            };
            return {
                ruleForm: {
                    oldPassword: '',
                    newPassword: '',
                    confirmPwd: '',
                    loginName: ''
                },
                labelPosition: 'right',
                rules: {
                    oldPassword: [
                        { required: true, validator: checkoldPass, trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, validator: checknewPass, trigger: 'blur' }
                    ],
                    confirmPwd: [
                        { required: true, validator: checkconfirmPass, trigger: 'blur' }
                    ]
                },
                forhassub: false // 防止表单多次提交开关
            };
        },
        created() {
            let userInfo = getNowCookie();
            this.ruleForm.loginName = userInfo.userInfo.loginName;
            console.log('userInfo', userInfo);
        },
        methods: {
            submitForm(formName) {
                var _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.formajax();
                    } else {
                        console.log('error submit!!');
                        return false;
                    };
                });
            },
            formajax() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/setup/modifyUserPwd',
                    data: _this.ruleForm
                }).then(res => {
                    console.log(res);
                    if (res.code === 200) {
                        _this.forhassub = true;
                        _this.$xeMessage.success('密码修改成功');
                        setTimeout(function () {
                            _this.$router.push({name: 'Login'});
                        }, 1000);
                    }
                }).catch(error => {
                    console.log('密码修改失败');
                    console.log(error);
                });
            }
        }
    };
</script>
