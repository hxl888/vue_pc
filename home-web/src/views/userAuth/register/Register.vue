<style rel="stylesheet/scss" lang="scss">
</style>
<template lang="html">
    <div class="main-wrap">
        <div class="login-main-box">
            <h3 class="hea-tit">{{forSur ? '注册成功' : '填写用户信息'}}</h3>
            <!--未注册成功页面-->
            <div class="reger-box clearfix" v-if="!forSur">
                <!-- 左侧表单区域 -->
                <div class="regForm-box fl">
                    <el-form :label-position="labelPosition" ref="ruleForm" :rules="rules" label-width="120px" :model="ruleForm">
                      <el-form-item label="登录名" prop="user">
                        <el-input v-model="ruleForm.user" type="text"></el-input>
                      </el-form-item>
                      <el-form-item label="手机号码" prop='phone'>
                        <el-input v-model="ruleForm.phone"  type="tel" :maxlength="11"></el-input>
                      </el-form-item>
                      <div class="form_yzm">
                          <div class="yzm_tex fl">
                              <el-form-item label="验证码"  prop='yzm'>
                                <el-input v-model="ruleForm.yzm"  type="tel" :maxlength="4"></el-input>
                              </el-form-item>
                          </div>
                          <div class="yam_tim">
                              <el-button :plain="true" v-if="showTime" :class="{phone_cod: pho_sur}" @click.prevent.stop="getCode">获取验证码</el-button>
                               <el-button type="primary"  v-else :disabled="true">{{timeTex}}</el-button>
                          </div>
                      </div>
                      <el-form-item label="密码"  prop='pass'>
                        <el-input v-model="ruleForm.pass" type="password"></el-input>
                      </el-form-item>
                      <el-form-item label="确认密码"  prop='checkpass'>
                        <el-input v-model="ruleForm.checkpass" type="password"></el-input>
                      </el-form-item>
                        <div class="chekobox clearfix">
                            <div class="fl">
                                <!--<el-radio class="radio"  v-model="radio" label='1'>我已同意&nbsp;&nbsp;<a href="">平台协议</a></el-radio>-->
                                <el-checkbox class="radio"  v-model="checked">我已同意&nbsp;&nbsp;<a @click.prenvent="pingtaixieyi">平台协议</a></el-checkbox>
                            </div>
                            <div class="fr">
                                <a @click.prenvent="yijianfankui">意见反馈</a>
                            </div>
                        </div>
                        <el-form-item>
                            <el-button style="width: 100% " type="primary" :disabled="forSur"  @click.prevert="submitForm('ruleForm')">立即注册</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- 右侧动态图区域 -->
                <div class="animImg-box fr">
                    <div class="hzhbbjt"></div>
                    <div class="zhuanqq zhuanqqs"></div>
                    <div class="hzhbdh">
                        <div class="hzhbdhOne Tranlts"></div>
                        <div class="hzhbdhTwo Tranltss"></div>
                    </div>
                </div>
            </div>
            <!--注册成功页面-->
            <div class="regis_succes" v-if="forSur">
                <div class="cg">
                    <!--<div class="img_div"><img src="" alt=""></div>-->
                    <h4>恭喜您,您已成功注册鲜易供应链平台</h4>
                    <p><span class="Timedown">{{Timedown}}</span> s&nbsp;&nbsp;&nbsp;&nbsp;后自动跳转...</p>
                    <!--<button class="btn1">开启企业认证心旅程</button>-->
                    <el-button class="btn2" @click.prenvent='goBackLogin' type="primary" size='large'>返回</el-button>
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
                    if (that.ruleForm.phone !== '' && /^1\d{10}$/gi.test(that.ruleForm.phone)) {
                        that.pho_sur = false;
                        callback();
                    } else {
                        callback(new Error('手机号输入错误'));
                    };
                };
            };
            let validateYzm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入验证码'));
                } else {
                    if (that.ruleForm.yzm !== '' && /^[0-9]*$/gi.test(that.ruleForm.yzm)) {
                        callback();
                    } else {
                        callback(new Error('请您输入数字'));
                    };
                };
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (that.ruleForm.pass !== '' && /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/gi.test(that.ruleForm.pass)) {
                        callback();
                    } else {
                        callback(new Error('密码为数字加字母4到12位'));
                    };
                };
            };
            let validateCkpass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入确认密码'));
                } else {
                    if (that.ruleForm.checkpass !== '' && that.ruleForm.checkpass === that.ruleForm.pass) {
                        callback();
                    } else {
                        callback(new Error('密码不一致'));
                    };
                };
            };
            return {
                labelPosition: 'right',
                forSur: false,
                checked: true,
                countNum: 60,
                timeTex: '获取验证码',
                showTime: true,
                pho_sur: true,
                hrefUrlList: '',
                Timedown: 5, // 成功页面倒计时秒速设置
                ruleForm: {
                    user: '',
                    phone: '',
                    yzm: '',
                    pass: '',
                    checkpass: ''
                },
                rules: {
                    user: [
                        { required: true, message: '请输入登录名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, validator: validatePhone, trigger: 'blur' }
                    ],
                    yzm: [
                        { required: true, validator: validateYzm, trigger: 'blur' }
                    ],
                    pass: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    checkpass: [
                        { required: true, validator: validateCkpass, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            //  获取动态url链接地址
            this.hrefsUrlserch();
        },
        methods: {
            hrefsUrlserch() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/constant/get/getDomin'
                }).then(res => {
                    _this.hrefUrlList = res.result;
                    console.log('resrul---->', res.result);
                }).catch(error => {
                    console.log(error);
                });
            },
            submitForm(formName) {
                var that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('that.checked', that.checked);
                        if (that.checked) {
                            that.form_sub();
                        } else {
                            that.$xeMessage.error('请勾选平台协议');
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    };
                });
            },
            form_sub() {
                let _this = this;
                let datas = _this.ruleForm;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/setup/registerUser',
                    data: {
                        userName: datas.user,
                        mobileNo: datas.phone,
                        msgCode: datas.yzm,
                        password: datas.pass,
                        confirmPwd: datas.checkpass
                    }
                }).then(res => {
                    let codId = res.code;
                    console.log(res);
                    if (codId === 500) {
                    } else if (codId === 200) {
                        _this.$xeMessage.success('注册成功');
                        _this.forSur = true;
                    }
                }).catch(error => {
                    console.log('注册失败', error);
//                            that.$xeMessage.error('6666');
                });
            },
            getCode() {
                let that = this;
                if (!that.pho_sur && /^1\d{10}$/gi.test(that.ruleForm.phone)) {
                    that.$http({
                        method: 'post',
                        url: '/page/uam/message/sendRegistMsgValidateCode',
                        data: {
                            mobile: that.ruleForm.phone
                        }
                    }).then(res => {
                        if (res.code === 200) {
                            that.remainingTime();
                        } else {
//                            that.$xeMessage.error(res.message);
                        };
                        console.log(res);
                    }).catch(error => {
                        console.log(error);
//                        that.$xeMessage.error(error.message);
                        that.pho_sur = true;
                        that.countNum = 60;
                        that.timeTex = '获取验证码';
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
                        that.timeTex = '获取验证码';
                    }
                }, 1000);
            },
            sutisdown() {
                let _this = this;
                let TimedowIn = setInterval(function() {
                    _this.Timedown -= 1;
                    if (_this.Timedown === 0) {
                        clearInterval(TimedowIn);
                        // 倒计时结束要跳转的页面
                        _this.$router.push({name: 'Login'});
                    }
                }, 1000);
            },
            goBackLogin() {
                this.$router.push({name: 'Login'});
            },
            pingtaixieyi() {
                window.location = this.hrefUrlList.XIANYISCM + 'html/API.html#control';
            },
            yijianfankui() {
                window.location = this.hrefUrlList.XIANYISCM + 'html/API.html#control3';
            }
        },
        watch: {
            'forSur': function(n, o) {
                let _this = this;
                if (n === true) {
                    console.log('6666ti');
                    _this.sutisdown();
                }
            }
        }
    };
</script>
