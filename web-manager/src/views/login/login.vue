<template lang="html">
    <div class="login-contanier">
        <loginHeader>
            <template slot="destext">用户登录</template>
        </loginHeader>
        <div class="login-cons clearfix">
            <div class="login-cons-sub">
                <div class="login-item">
                    <div class="login-cons-banner">
                        <img src="../../assets/images/loginbanner.jpg" alt="">
                    </div>
                    <div class="login-forms">
                        <div class="login-errors" v-show="errorMsg">
                            <span class="el-icon-information"></span> {{errorMsg}}
                        </div>
                        <el-form :model="ruleForm2" ref="ruleForm2" label-width="100px">
                            <div class="login-input-item">
                                <label class="iconfont icon-piliangxiugaiyewuyuan" for="loginName"></label>
                                <input v-model="ruleForm2.loginName" @keyup.enter="submitForm('ruleForm2')" class="login-input1" name="loginName" id="loginName" type="text" placeholder="用户名/邮箱/手机号">
                            </div>
                            <div class="login-input-item">
                                <label class="iconfont icon-suo1"></label>
                                <input v-model="ruleForm2.pwd" @keyup.enter="submitForm('ruleForm2')" class="login-input1" type="password" id="pwd" name="pwd" placeholder="密码">
                            </div>
                            <!--<div class="login-input-yzm clearfix">-->
                                <!--<input class="login-input2 fl" type="text"> <img class="fl" src=""> <span class="fl">看不清楚？换一张</span>-->
                            <!--</div>-->
                            <div class="login-input-btn">
                                <el-button type="primary" :loading="btnloading" :disabled="!(ruleForm2.loginName.length && ruleForm2.pwd.length)" @click="submitForm('ruleForm2')">登录</el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import loginHeader from 'components/loginHeader/loginHeader';
    export default {
        name: 'login',
        data() {
            return {
                ruleForm2: {
                    loginName: '',
                    pwd: ''
                },
                errorMsg: '',
                btnloading: false
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.loginErp();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            loginErp() {
                this.btnloading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/login/sys/login',
                    data: {
                        'loginName': this.ruleForm2.loginName,
                        'pwd': this.ruleForm2.pwd
                    }
                }).then(res => {
                    this.btnloading = false;
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        this.errorMsg = res.data.remote.msg;
                    } else {
                        window.localStorage.setItem('menuList_man', JSON.stringify(res.data.menuList));
                        // 登录信息Cookies时长2个小时
                        let inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
                        let cookies = {
                            'loginName': this.ruleForm2.loginName,
                            'userName': res.data.userName
                        };
                        if (process.env.NODE_ENV === 'production') {
                            this.$xeCookies.set('USER_INFO_MAN', cookies, {expires: inTwoHours});
                        } else if (process.env.NODE_ENV === 'qa') {
                            this.$xeCookies.set('USER_INFO_QA_MAN', cookies, {expires: inTwoHours});
                        } else {
                            this.$xeCookies.set('USER_INFO_DEV_MAN', cookies, {expires: inTwoHours});
                        }
                        this.$router.push({
                            name: 'index'
                        });
                    }
                }).catch(error => {
                    console.log(error);
                    this.btnloading = false;
                });
            }
        },
        components: {
            loginHeader
        }
    };
</script>
