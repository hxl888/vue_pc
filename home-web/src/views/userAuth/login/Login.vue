<template lang="html">
    <div class="login_main">
        <div class="login-main-box">
            <h3 class="hea-tit">{{selecLogintit}}</h3>
            <div class="login-main clearfix">
                <!--客户登录动态图设置-->
                <div class="fl_imganime fl" v-if="!selecLogin" >
                    <!--  左侧图片区域start-->
                    <!--<div cla  ss="dttkehud"></div>-->
                    <div class="qlimiandetu">
                          <span class="qlimiandatu1"></span>
                          <span class="qlimiandatu2"></span>
                          <span class="qlimiandatu3"></span>
                          <span class="qlimiandatu4"></span>
                    </div>
                    <div class="kehutu1"></div>
                    <div class="kehutu3"></div>
                    <div class="kehutu2"></div>
                    <!--  左侧图片区域end-->
                </div>
                <!--运营登录动态图设置-->
                <div class="fl_imganime fl_yunying fl" v-if="selecLogin" >
                    <div class="yunyingbeijing"></div>
                    <div class="yunyingwenzi"></div>
                    <div class="yueyingyuan">
                        <span class="spans1"></span>
                        <span class="spans2"></span>
                        <span class="spans3"></span>
                        <div class="yuanzhuan"></div>
                    </div>
                    <div class="yueyingzhongjian"></div>
                </div>
                <div class="fr_formsub fr">
                    <!-- 表单区域 -->
                    <el-form :label-position="labelPosition" :model="loginInfo" :rules="loginRules"  ref="loginInfo" label-width="80px" class="demo-ruleForm">
                        <el-form-item label="用户名" prop="loginName">
                            <el-input placeholder="请输入您的手机号 / 用户名" type="text" v-model="loginInfo.loginName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="loginPwd">
                            <el-input
                                placeholder="请输入您的密码"
                                type="password"
                                v-model="loginInfo.loginPwd"
                                auto-complete="off"
                                @keyup.enter="submitForm('loginInfo')"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button
                                type="primary"
                                native-type="submit"
                                @click.prevent="submitForm('loginInfo')"
                                :loading="btnloading"
                                style='width: 100%;'>
                                登 录
                            </el-button>
                        </el-form-item>
                        <div class="forgetOrserge">
                            <a href="javascript:void(0)" @click.prevent="goRister">立即注册</a>&nbsp;|
                            <a href="javascript:void(0)" @click.prevent="goForget">忘记密码?</a>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
        <div id="mask" v-if='logbord'>
            <div class="mask"></div>
            <!-- 登录用隐藏面板start -->
            <div class="chosen djdl clearfix">
                  <p class="tit_show">请选择对应系统登录</p>
                  <ol class="hynol">
                        <li class="hynolli" style="display:block">
                          <div class="donghuadiv">
                            <div class="divleft animated bounceInLeft">
                            </div>
                            <div class="divright">
                            </div>
                          </div>
                        </li>
                        <li class="hynolli">
                          <div class="donghuadiv">
                            <div class="divleft1">
                            </div>
                            <div class="divright1 animated flash infinite">
                            </div>
                          </div>
                        </li>
                        <li class="hynolli">
                          <div class="donghuadiv">
                            <div class="divleft2 animated bounceInLeft">
                            </div>
                            <div class="divright2 animated bounceInRight">
                            </div>
                          </div>
                        </li>
                        <li class="hynolli">
                          <div class="donghuadiv">
                            <div class="divleft3 animated bounceInDown">
                            </div>
                            <div class="divright3 animated bounceInUp">
                            </div>
                          </div>
                        </li>
                        <li class="hynolli">
                          <div class="donghuadiv">
                            <div class="divleft4 animated bounceInDown">
                            </div>
                            <div class="divright4 animated bounce">
                            </div>
                          </div>
                        </li>
                        <li class="hynolli">
                          <div class="donghuadiv">
                            <div class="divleft5 animated flash infinite">
                            </div>
                            <div class="divright5">
                            </div>
                          </div>
                        </li>
                  </ol>
                  <ul class="hynul">
                       <li class="hynulli"><a  @click.prevent="goMLogin">客户登录</a></li>
                       <li class="hynulli"><a href="" target="_blank">TMS登录</a></li>
                       <li class="hynulli" style="background:#8A8A8D;"><a href="#" style="cursor:default">伙伴登录</a></li>
                       <li class="hynulli"><a href="" target="_blank">DMS登录</a></li>
                       <li class="hynulli"><a @click.prevent="gologinyx">运营登录</a></li>
                       <li class="hynulli"><a href="">协同办公</a></li>
                  </ul>
             <!-- 登录用隐藏面板end -->
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            let validateUserName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入用户名'));
                } else {
                    callback();
                }
            };
            let validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return {
                labelPosition: 'right',
                secToken: '',
                loading: '',
                btnloading: false,
                contentShow: false,
                selecValue: '1000', // 页面登录跳转获取的对应传值
                selecLogin: true, // 根据selecValue的值切换对应的 登录左侧的动画图
                selecLogintit: '运营登录',
                loginInfo: {
                    systemId: '',
                    loginName: '',
                    loginPwd: ''
                },
                headHeis: 70, // 获取头部的高度
                footHeis: 343, // 获取底部的高度
                offseHei: null,  // 动态页面高度
                loginRules: {
                    loginName: [
                        {required: true, validator: validateUserName, trigger: 'blur'}
                    ],
                    loginPwd: [
                        {required: true, validator: validatePass, trigger: 'blur'}
                    ]
                },
                logbord: true
            };
        },
        created() {
            // 获取头部登录区域的id值
            this.getLogId();
            this.$xeBus.$on('logIdChange', () => {
                this.getLogId();
            });
            // 动态修改登录页面的高度
            this.setLohei();
        },
        mounted() {
            this.contentShow = true;
            var _this = this;
            _this.$http({
                method: 'post',
                url: '/page/token/getSecToken'
            }).then(function (res) {
                if (!res.result) {
                    _this.emptyText = '请求失败,请重新刷新页面...';
                }
                _this.secToken = res.result;
            }).catch(function () {
                _this.loading = false;
                _this.emptyText = '请求失败,请重新刷新页面...';
            });
            // 登陆初始状态模态窗口显示设置
            let userInfoList = _this.$xeStore.getItem('userInfo');
            if (userInfoList) {
                _this.logbord = false;
                document.body.style.overflow = 'auto';
            } else {
                _this.logbord = true;
                document.body.style.overflow = 'hidden';
            }
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
                    }
                });
            },
            getLogId() {
                let _this = this;
                let sessLoginId = _this.$xeStore.getItem('userlogId');
                if (sessLoginId) {
                    _this.selecValue = JSON.parse(sessLoginId).logId;
                }
            },
            submitForm(formName) {
                let _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        _this.loginFn();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            loginFn() {
                let _this = this;
                _this.btnloading = true;
                let loginName = _this.loginInfo.loginName;
                let loginPwd = _this.loginInfo.loginPwd;
                let loginParam = {};
                loginParam.loginName = this.$xeCrypto.aesEncrypt(loginName, _this.secToken, _this.secToken);
                loginParam.loginPwd = this.$xeCrypto.aesEncrypt(loginPwd, _this.secToken, _this.secToken);
                loginParam.systemId = this.selecValue;
                console.log(loginParam);
                _this.$http({
                    method: 'post',
                    url: '/page/login/login',
                    data: loginParam
                }).then(function (res) {
                    _this.btnloading = false;
                    let authResDto = res.result.authResDto;
                    let menuStr = JSON.stringify(res.result.menuList);
                    // 登录信息Cookies时长2个小时
//                    let inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
//                    let inTwoHours = DateTime.MaxValue;
                    if (process.env.NODE_ENV === 'development') {
                        _this.$xeCookies.set('USER_INFO_DEV', {
                            'username': authResDto.userName,
                            'loginName': authResDto.loginName,
                            'userId': authResDto.userId,
                            'userStatus': res.result.userStatus
                        });
                        _this.$xeCookies.set('PASS_TOKEN_DEV', res.result.token);
                    } else if (process.env.NODE_ENV === 'devend') {
                        _this.$xeCookies.set('USER_INFO_DEV', {
                            username: authResDto.userName,
                            loginName: authResDto.loginName,
                            userId: authResDto.userId,
                            userStatus: res.result.userStatus
                        }, {domain: '.xianyiscm.com'});
                        _this.$xeCookies.set('PASS_TOKEN_DEV', res.result.token, {domain: '.xianyiscm.com'});
                    } else if (process.env.NODE_ENV === 'test') {
                        _this.$xeCookies.set('USER_INFO_TEST', {
                            username: authResDto.userName,
                            loginName: authResDto.loginName,
                            userId: authResDto.userId,
                            userStatus: res.result.userStatus
                        }, {domain: '.xianyiscm.com'});
                        _this.$xeCookies.set('PASS_TOKEN_TEST', res.result.token, {domain: '.xianyiscm.com'});
                    } else if (process.env.NODE_ENV === 'beta') {
                        _this.$xeCookies.set('USER_INFO_BETA', {
                            username: authResDto.userName,
                            loginName: authResDto.loginName,
                            userId: authResDto.userId,
                            userStatus: res.result.userStatus
                        }, {domain: '.xianyiscm.com'});
                        _this.$xeCookies.set('PASS_TOKEN_BETA', res.result.token, {domain: '.xianyiscm.com'});
                    } else {
                        _this.$xeCookies.set('USER_INFO', {
                            username: authResDto.userName,
                            loginName: authResDto.loginName,
                            userId: authResDto.userId,
                            userStatus: res.result.userStatus
                        }, {domain: '.xianyiscm.com'});
                        _this.$xeCookies.set('PASS_TOKEN', res.result.token, {domain: '.xianyiscm.com'});
                    }
                    _this.$xeStore.setItem('menuList', menuStr);
                    let redirect = decodeURIComponent(_this.$route.query.redirect || '/');
                    _this.$router.push({
                        path: redirect
                    });
                    _this.$xeBus.$emit('logined');
                })
                .catch(function (e) {
                    _this.btnloading = false;
                });
            },
            goForget() {
                this.$router.push({name: 'forgetpass'});
            },
            goRister() {
                this.$router.push({name: 'register'});
            },
            goMLogin() {
            //  客户登录跳转路由设置
                this.logMousout();
                this.$xeStore.setItem('userlogId', JSON.stringify({logId: '3000'}));
                this.$xeBus.$emit('logIdChange');
                // this.$router.push({name: 'Login'});
            },
            gologinyx() {
            //  运营登录跳转路由设置
                this.logMousout();
                this.$xeStore.setItem('userlogId', JSON.stringify({logId: '1000'}));
                this.$xeBus.$emit('logIdChange');
                // this.$router.push({name: 'Login'});
            },
            logMousout() {
                this.logbord = false;
                document.body.style.overflow = 'auto';
            }
        },
        watch: {
            'selecValue': function(n, o) {
                if (n === '1000') {
                    this.selecLogin = true;
                    this.selecLogintit = '运营登录';
                } else if (n === '3000') {
                    this.selecLogin = false;
                    this.selecLogintit = '客户登录';
                }
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
