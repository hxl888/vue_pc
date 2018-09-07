<template lang="html">
    <div class="header-con clearfix">
        <div class="logo fl">
            <router-link :to="{name: 'index'}" class="iconfont icon-logo1">
                <img src="../../assets/images/manager-logo.png" width="193" height="30" alt="">
            </router-link>
        </div>
        <div class="header-item-con fr">
            <div class="header-item-col1 fl">
                <div class="header-item fl orderCount">
                    <!--<el-badge :value="12" :max="99" class="item">-->
                        <!--<div class="orderCounticon iconfont icon-renwu"></div>-->
                    <!--</el-badge>-->
                    <!-- <el-dropdown>
                        <el-badge :value="12" :max="99" class="item">
                            <div class="orderCounticon iconfont icon-renwu"></div>
                        </el-badge>
                        <el-dropdown-menu class='header-dropmenu' slot="dropdown">
                            <div class='h-drop-col'>
                                <div class="item-col">
                                    <h3>订单处理</h3>
                                    <p>
                                        <a href='#'>未关联商品订单(10)</a>
                                        <a href='#'>待审核订单(10)</a>
                                        <a href='#'>缺货订单(10)</a>
                                        <a href='#'>待合并订单(10)</a>
                                        <a href='#'>待审核退货单(10)</a>
                                    </p>
                                </div>
                                <div class="item-col">
                                    <h3>采购管理</h3>
                                    <p>
                                        <a href='#'>待采购审核采购单(10)</a>
                                        <a href='#'>待财务审核采购单(10)</a>
                                    </p>
                                </div>
                            </div>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </div>
                <div class="header-item fl orderNotice">
                    <!--<el-badge :value="12" :max="99" class="item">-->
                        <!--<div class="orderCounticon iconfont icon-xiaoxi"></div>-->
                    <!--</el-badge>-->
                    <!-- <el-dropdown>
                        <el-badge :value="12" :max="99" class="item">
                            <div class="orderCounticon iconfont icon-xiaoxi"></div>
                        </el-badge>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>黄金糕</el-dropdown-item>
                            <el-dropdown-item>狮子头</el-dropdown-item>
                            <el-dropdown-item>螺蛳粉</el-dropdown-item>
                            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
                            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown> -->
                </div>
            </div>
            <div class="header-item-col2 fl userName">
                <el-dropdown  @command="UserHandleCommand">
                   <span class="el-dropdown-link">
                       <em><img src="../../assets/images/user-pic.png" width="34" height="34"></em><b>{{userName}}</b><i class="el-icon-arrow-down el-icon--right"></i>
                   </span>
                   <el-dropdown-menu slot="dropdown">
                       <el-dropdown-item command="a"><span class="el-icon-setting"></span> 修改密码</el-dropdown-item>
                       <el-dropdown-item command="q" divided><span class="el-icon-setting"></span> 退出登录</el-dropdown-item>
                   </el-dropdown-menu>
               </el-dropdown>
            </div>
            <div class="header-item-col3 fl">
                <!-- <div class="header-item userQa fl">
                    <div class="orderCounticon iconfont icon-bangzhu"></div>
                </div> -->
                <div class="header-item userService fl">
                    <div class="orderCounticon iconfont icon-kefu"></div>
                </div>
            </div>
            <div class="add-fromKu reset-dialog">
                <el-dialog title="修改登录密码" :visible.sync="pswVisible">
                    <el-form :model="pswDataDiolog" ref="pswDataDiolog" :rules="pswrules" label-width="85px">
                        <el-form-item label="原登录密码" prop="oldPwd">
                            <el-input size="small" class="zy-input-normal" type="" :maxlength="20" v-model="pswDataDiolog.oldPwd"></el-input>
                        </el-form-item>
                        <el-form-item label="新登录密码" prop="pwd">
                            <el-input size="small" class="zy-input-normal" type="" :maxlength="20" v-model="pswDataDiolog.pwd"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="againPsw">
                            <el-input size="small" class="zy-input-normal" type="" :maxlength="20" v-model="pswDataDiolog.againPsw"></el-input>
                        </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button class="xe-button-normal" type="primary" @click="saveChangepsw">保存</el-button>
                        <el-button class="xe-button-normal" @click="pswVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import {quitLogin, getNowCookie} from 'utils/commonBase';
    export default {
        data() {
            var checkoldPwd = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请输入旧密码'));
                } else {
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{5,16}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('密码为5-12位数字和字母组合'));
                    }
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码为5-12位数字和字母组合'));
                } else {
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{5,16}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('密码为5-12位数字和字母组合'));
                    }
                }
            };
            var checkPasswordAgain = (rule, value, callback) => {
                if (!this.pswDataDiolog.pwd) {
                    callback(new Error('请输入新登录密码'));
                } else {
                    if (value !== this.pswDataDiolog.pwd) {
                        callback(new Error('密码与新密码不一致'));
                    } else {
                        callback();
                    }
                }
            };
            return {
                pswrules: {
                    oldPwd: [
                        { required: true, validator: checkoldPwd, trigger: 'blur' }
                    ],
                    pwd: [
                        { required: true, validator: checkPassword, trigger: 'blur' }
                    ],
                    againPsw: [
                        { required: true, validator: checkPasswordAgain, trigger: 'blur' }
                    ]
                },
                pswDataDiolog: {
                    oldPwd: '',
                    pwd: '',
                    againPsw: ''
                },
                userName: '',
                pswVisible: false
            };
        },
        created() {
            let nowCookie = getNowCookie().userInfo;
            this.userName = nowCookie.userName;
        },
        methods: {
            UserHandleCommand(command) {
                if (command === 'q') {
                    // 点击退出
                    quitLogin();
                    this.$router.replace({
                        name: 'login'
                    });
                }
                if (command === 'a') {
                    // 个人信息修改
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-rms/user/sys/queryLoginUser',
                        data: {}
                    }).then((res) => {
                        this.userId = res.data.user.userId;
                    }).catch((error) => {
                        console.log(error);
                    });
                    this.pswVisible = true;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            saveChangepsw(pswDataDiolog) {
                this.$refs.pswDataDiolog.validate((valid) => {
                    if (valid) {
                        let params = {};
                        params = this.pswDataDiolog;
                        params.userId = this.userId;
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-rms/user/sys/modifyLoginUser',
                            data: params
                        }).then((res) => {
                            this.$xeMessage.success(res.msg);
                            this.resetForm('pswDataDiolog');
                            this.pswVisible = false;
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        watch: {
            pswVisible(n) {
                if (n === false) {
                    this.resetForm('pswDataDiolog');
                }
            }
        }
    };
</script>
