<template lang="html">
    <div class="wrap">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/" class="zq-smallnav">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>完善信息</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- <div class="zq-warp" v-if='rejected'>
            <p>尊敬的用户 <span>{{loginName}}</span></p>
            <p style="width: 456px;margin:0 auto;">对不起，您的认证因: <span></span>{{messaglis}}</p>
        </div> -->
        <div v-if="!formbtn">
            <div class="zq-content">
                <div class="xe-page-header">
                    <p>完善个人信息</p>
                </div>
            </div>
            <div class="formWid">
                <el-form  :model="ruleForm" :rules="rules"  ref="ruleForm" :inline='true' label-width="110px">
                    <div>
                        <el-form-item label="手机号" prop="mobileNo">
                            <el-input  v-model="ruleForm.mobileNo"  :disabled="true" class="xe-input-col2"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="真实姓名" prop="userName">
                            <el-input v-model="ruleForm.userName" class="xe-input-col2"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="工号"  prop="userCode">
                            <el-input v-model="ruleForm.userCode" class="xe-input-col2"></el-input>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="所属组织" prop="groupname" required>
                            <input-tree class="xe-input-col2" v-model="ruleForm.groupname" :readonly=true :tree-data="treeData" :defaultDataId="ruleForm.groupId" :success-callback="successCallback"></input-tree>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label=" ">
                            <el-button type="primary" :disabled="formbtn" @click="submitForm('ruleForm')">下一步</el-button>
                            <el-button @click="returnBefore">返 回</el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
        <!--提交完成页面-->
        <div class="zq-contern" v-if="formbtn">
            <p>{{ruleForm.userName}}</p>
            <p>您的加入申请已提交，通过后您将受到短信通知。</p>
            <p>请及时关注短信提醒</p>
            <p>{{lasTime}}s.....</p>
            <button class="zq-once" @click="goHome">返回首页</button>
        </div>
    </div>
</template>
<script>
    import approve from 'mixins/approve';
    import InputTree from '../../components/groupTree';
    import {getNowCookie, toObject, resetUserInfoCookie} from 'xcms-common-plugins/src/utils/';
    export default {
        mixins: [approve],
        data() {
            let validateUserCode = (rule, value, callback) => {
                if (value !== null && value.length > 0) {
                    let reg = /^([a-zA-Z]{6,14}|\d{6,14}|(?![a-zA-Z]+$)[0-9A-Za-z]{6,14})$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请正确填写工号,支持6-12位数字字母'));
                    }
                } else {
                    callback();
                }
            };
            return {
                ruleForm: {
                    mobileNo: null,
                    userName: null,
                    userCode: null,
                    groupname: null,
                    groupId: null
                },
                loginName: null,
                formbtn: false,
                userState: null, // 获取用户认证状态
                userInfos: '',
                treeData: [],
                lasTime: 5, // 倒计时设置
                messaglis: '',
                rejected: false,
                rules: {
                    userName: [
                        { required: true, message: '请输入姓名', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' }
                    ],
                    groupname: [
                        { required: true, message: '所属于组织不能为空', trigger: 'blur' }
                    ],
                    userCode: [
                        { validator: validateUserCode, trigger: 'blur' }
                    ]
                }
            };
        },
        components: {
            'input-tree': InputTree
        },
        created() {
            let _this = this;
            // let nowCookie = getNowCookie();
            _this.userInfos = getNowCookie().userInfo;
            _this.loginName = _this.userInfos.loginName;
            console.log('_this.userState', _this.userInfos);
            // if (nowCookie.userInfo.userStatus === '300') {
            //     _this.rejected = true;
            // }
            _this.checkstatus();
            _this.$http({
                method: 'post',
                url: '/page/uam/group/common/getGroupTree/GD1625000003'
            }).then((res) => {
                if (res.code === 200) {
                    console.log(res);
                    _this.treeData = res.result;
                } else {
                    _this.$message.error(res.message);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        methods: {
            checkstatus() {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/approve/queryUamUserStatus'
                }).then(function (res) {
                    console.log('999', res);
                    if (res.code === 200) {
                        _this.messaglis = res.result.remark;
                        _this.ruleForm.mobileNo = res.result.mobileNo;
                        _this.ruleForm.userName = res.result.userName;
                        _this.ruleForm.userCode = res.result.userCode;
                        _this.ruleForm.groupId = res.result.groupId;
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            formfirsajax() {
                // 用户首次申请认证 接口调取
                let _this = this;
                let param = {};
                param.mobileNo = _this.ruleForm.mobileNo;
                param.userName = _this.ruleForm.userName;
                param.userCode = _this.ruleForm.userCode;
                param.groupId = _this.ruleForm.groupId;
                param.statusCode = '200';
                _this.$http({
                    method: 'post',
                    url: '/page/uam/approve/addUamUserStatus',
                    data: param
                }).then(function (res) {
                    console.log('第一次提交表单start', res);
                    // 提交完之后改变status状态值为200
                    _this.setSessStatus();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            formconsajax() {
                // 用户再次提交认证请求
                let _this = this;
                let param = {};
                param.mobileNo = _this.ruleForm.mobileNo;
                param.userName = _this.ruleForm.userName;
                param.userCode = _this.ruleForm.userCode;
                param.groupId = _this.ruleForm.groupId;
                param.statusCode = '200';
                console.log('_this.ruleForm----->', _this.ruleForm);
                _this.$http({
                    method: 'post',
                    url: '/page/uam/approve/updateUamUserStatus',
                    data: param
                }).then(function (res) {
                    console.log('驳回后提交表单start', res);
                    // 提交完之后改变status状态值为200
                    _this.setSessStatus();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            setSessStatus() {
                let _this = this;
                let nowStatus = { userStatus: '200', username: _this.ruleForm.userName };
                let reNowC = toObject([_this.userInfos, nowStatus]);
                let inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
                resetUserInfoCookie(reNowC, {expires: inTwoHours});
                _this.formbtn = true;
            },
            successCallback(arr) {
                this.ruleForm.groupId = arr[arr.length - 1].id;
            },
            returnBefore() {
                this.$router.push({name: 'toIndexContent'});
            },
            goHome() {
                window.location.href = 'http://www.xianyiscm.com/';
            },
            submitForm(formName) {
                let _this = this;
                _this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (_this.userInfos.userStatus === '100') {
                            _this.formfirsajax();
                        } else if (_this.userInfos.userStatus === '300') {
                            _this.formconsajax();
                        }
                    } else {
                        console.log('error submit!!', _this.ruleForm);
                        return false;
                    };
                });
            }
        },
        watch: {
            formbtn: function (n, o) {
                if (n === true) {
                    let _this = this;
                    let times = null;
                    clearInterval(times);
                    times = setInterval(function () {
                        _this.lasTime --;
                        if (_this.lasTime <= 1) {
                            window.location.href = 'http://www.xianyiscm.com/';
                            clearInterval(times);
                        }
                    }, 1000);
                }
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss" >
    .wrap{
        .xe-page-header {
            margin: 20px 0;
            padding-bottom: 10px;
            border-bottom: 1px solid #c2c2c2;
        }

        .xe-page-header p {
            font-size: 14px !important;
            color: #383838;
        }
        .zq-content{
            background-color: #FFF;
            position: relative;
            margin: 0;
            padding: 8px 16px 24px;
        }
    }
    .divWid {
        .el-form-item__content{
            width: 217px;
        }
        /* .el-icon-loading {
            display:none;
        } */
    }
    .zq-warp{
        text-align:center;
        margin-top:20px;
        p{
            line-height:30px;
        }
    }
    .zq-contern{
        margin: 10% 0;
        p{
            width: 100%;
            line-height: 50px;
            font-size: 16px;
            text-align: center;
            display:block;
        }
    }
    .zq-once {
        background-color: #dddddd;
        font-size: 16px;
        display: block;
        width: 300px;
        height: 50px;
        line-height: 30px;
        text-align: center;
        margin: 0 auto;
        border: 0;
        cursor: pointer;
    }
</style>
