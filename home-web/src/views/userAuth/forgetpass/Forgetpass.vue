<template lang="html">
    <div class="main-wrap">
        <div class="login-main-box">
            <h3 class="hea-tit">忘记密码</h3>
            <div class="reger-box clearfix">
                <!-- 左侧表单区域 -->
                <!--忘记密码 获取验证码页-->
                <div class="regForm-box fl" v-if="form1Sur">
                    <el-form :label-position="labelPosition" ref="ruleForm1" :rules="rules1" label-width="120px" :model="ruleForm1">
                      <el-form-item label="手机号" prop='phone'>
                        <el-input v-model="ruleForm1.phone" type="tel" :maxlength="11" placeholder="请输入手机号"></el-input>
                      </el-form-item>
                      <div class="form_yzm">
                          <div class="yzm_tex fl">
                              <el-form-item label="验证码"  prop='msgCode'>
                                <el-input v-model="ruleForm1.msgCode"  placeholder="请输入验证码" type="tel" :maxlength="4"></el-input>
                              </el-form-item>
                          </div>
                          <div class="yam_tim">
                              <el-button :plain="true" v-if="showTime" :class="{phone_cod: pho_sur}" @click.prevent.stop="getCode">获取验证码</el-button>
                               <el-button type="primary"  v-else :disabled="true">{{timeTex}}</el-button>
                          </div>
                      </div>
                    </el-form>
                    <div class="sub_btn fr">
                        <el-button type="primary" :disabled="subSur1" size='large' @click.prevert="submitForm1('ruleForm1')">下一步</el-button>
                    </div>
                </div>
                <!--忘记密码 修改新密码页面-->
                <div class="regForm-box fl" v-if="!form1Sur">
                    <el-form :label-position="labelPosition" ref="ruleForm2" :rules="rules2" label-width="120px" :model="ruleForm2">
                      <el-form-item label="新密码" prop='confirmPwd'>
                        <el-input v-model="ruleForm2.confirmPwd" type="password" placeholder=""></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码" prop='newPassword'>
                        <el-input v-model="ruleForm2.newPassword" type="password" placeholder=""></el-input>
                      </el-form-item>
                    </el-form>
                    <div class="sub_btn fr">
                        <el-button type="primary" size='large' :disabled="subSur2" @click.prevert="submitForm2('ruleForm2')">完成</el-button>
                    </div>
                </div>
                <!-- 右侧动态图区域 -->
                <div class="animImg-box animImg-box-foget fr">
                    <div class="hzhbbjt"></div>
                    <div class="zhuanqq zhuanqqs"></div>
                    <div class="hzhbdh">
                        <div class="hzhbdhOne Tranlts"></div>
                        <div class="hzhbdhTwo Tranltss"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            let that = this;
            let validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入手机号'));
                } else {
                    if (that.ruleForm1.phone !== '' && /^1\d{10}$/gi.test(that.ruleForm1.phone)) {
                        that.pho_sur = false;
                        callback();
                    } else {
                        callback(new Error('手机号输入错误'));
                    };
                };
            };
//            let validateYzm = (rule, value, callback) => {
//                if (value === '') {
//                    callback(new Error('请输入验证码'));
//                } else {
//                    if (that.ruleForm1.msgCode !== '' && /^\d{4}$/gi.test(that.ruleForm1.msgCode)) {
//                        that.pho_sur = false;
//                        callback();
//                    } else {
//                        callback(new Error('验证码错误'));
//                    };
//                };
//            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (that.ruleForm2.confirmPwd !== '' && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/gi.test(that.ruleForm2.confirmPwd)) {
                        callback();
                    } else {
                        callback(new Error('密码为数字加字母4到12位'));
                    };
                };
            };
            let validateCkpass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (that.ruleForm2.newPassword !== '' && that.ruleForm2.newPassword === that.ruleForm2.confirmPwd) {
                        callback();
                    } else {
                        callback(new Error('密码不一致'));
                    };
                };
            };
            return {
                labelPosition: 'right',
                ruleForm1: {
                    phone: '',
                    msgCode: ''
                },
                ruleForm2: {
                    confirmPwd: '',
                    newPassword: ''
                },
                form1Sur: true, //  校验验证码成功之后 进入充值密码页开关
                showTime: true,
                countNum: 60,
                subSur1: false, //  校验验证码防止多次提 交
                subSur2: false,
                timeTex: '获取验证码',
                pho_sur: true,
                headHeis: 70, // 获取头部的高度
                footHeis: 343, // 获取底部的高度
                offseHei: null,  // 动态页面高度
                rules1: {
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    msgCode: [
                        { required: true, message: '请输入验证码', trigger: 'blur' }
                    ]
                },
                rules2: {
                    confirmPwd: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    newPassword: [
                        { required: true, validator: validateCkpass, trigger: 'blur' }
                    ]
                }
            };
        },
        mounted() {
            // 动态修改登录页面的高度
            this.setLohei();
        },
        methods: {
            setLohei() {
                let _this = this;
                this.$nextTick(() => {
                    let loginHei = document.querySelector('.login-main-box');
                    let widowHei = document.body.clientHeight;
                    let offseHei = widowHei - _this.headHeis - _this.footHeis;
                    if (loginHei.offsetHeight <= offseHei) {
                        loginHei.style.height = offseHei + 'px';
                        console.log('jingle-----');
                    }
                });
            },
            submitForm1(formName) {
                //  校验验证码
                let that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = {};
                        param.phone = that.ruleForm1.phone;
                        param.msgCode = that.ruleForm1.msgCode;
                        this.$http({
                            method: 'post',
                            url: '/page/uam/message/checkResetSmsCode',
                            data: param
                        }).then(res => {
                            console.log('66===res>', res);
                            if (res.code === 200) {
                                if (res.result) {
                                    that.form1Sur = false;
                                    that.subSur1 = true;
                                    console.log('成功');
                                } else {
                                    that.$xeMessage.error('验证码错误');
                                }
                            } else {
                                that.$xeMessage.error(res.message);
                            }
                        }).catch(error => {
                            console.log(error);
                            that.$xeMessage.error('验证码错误');
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    };
                });
            },
            submitForm2(formName) {
                //  重置密码
                let that = this;
                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        that.$http({
                            method: 'post',
                            url: '/page/uam/setup/userResetPwd',
                            data: {
                                confirmPwd: that.ruleForm2.confirmPwd,
                                mobileNo: that.ruleForm1.phone,
                                msgCode: that.ruleForm1.msgCode,
                                newPassword: that.ruleForm2.newPassword
                            }
                        }).then(res => {
                            if (res.code === 200) {
                                console.log(res);
                                that.subSur2 = true;
                                console.log('密码修改成功');
                                setTimeout(function () {
                                    that.$router.push({name: 'Login'});
                                }, 2000);
                            }
                            that.$xeMessage.success('密码修改成功');
                        }).catch(error => {
                            console.log(error);
//                            that.$xeMessage.error(error.message);
                        });
                    } else {
                        console.log('eroor');
                    };
                });
            },
            getCode() {
                //  验证码发送
                let that = this;
                if (!that.pho_sur && /^1\d{10}$/gi.test(that.ruleForm1.phone)) {
                    that.$http({
                        method: 'post',
                        url: '/page/uam/message/sendResetPassMsgValidateCode',
                        data: {
                            mobile: that.ruleForm1.phone
                        }
                    }).then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            that.remainingTime();
                        } else {
//                            that.$xeMessage.error(res.message);
                        };
                    }).catch(error => {
                        console.log(error);
//                        that.$xeMessage.error(error.message);
                    });
                }
            },
            remainingTime() {
                let that = this;
                clearInterval(that.timer);
                that.timer = setInterval(() => {
                    that.countNum --;
                    that.showTime = false;
                    that.timeTex = that.countNum + 's';
                    if (that.countNum === 0) {
                        clearInterval(that.timer);
                        that.showTime = true;
                        that.countNum = 60;
                        that.timeTex = '获取验证码';
                    }
                }, 1000);
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .main-wrap {
        background:#f5f5f5;
    }
    .login-main-box {
        .reger-box {
            padding:60px 20px  0;
            .regForm-box {
                padding-top:50px;
                width:390px;
                .form_yzm {
                    height:36px;
                    .yzm_tex {
                        width:288px;
                        padding-right:20px;
                    }
                    .yam_tim {
                        button{
                            width:102px;
                            &.phone_cod {
                                background: #eef1f6;
                                color: #1f2d3d;
                                border: none;
                            }
                        }
                    }
                }
                .sub_btn {
                    width:270px;
                    button {
                        width:100%;
                    }
                }
            }
            .animImg-box {
                &.animImg-box-foget {
                }
            }
        }
    }
</style>
