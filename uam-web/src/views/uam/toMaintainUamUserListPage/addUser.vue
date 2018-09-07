<style rel="stylesheet/scss" lang="scss">

    .xe-page-content .xe-adduser-radio-item {
        padding-left: 100px;
        margin-bottom: 22px;
    }

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamUserListPage' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                添加用户
            </p>
        </div>
        <div>
            <el-form :model="addForm" :rules="rules"  ref="ruleForm" :label-width="xeLabelWidth">

                <el-form-item label="登录名" prop="loginName" required>
                    <el-input class = "xe-input-col3" v-model="addForm.loginName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobileNo" required>
                    <el-input class = "xe-input-col3" v-model="addForm.mobileNo" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName" required>
                    <el-input class = "xe-input-col3" v-model="addForm.userName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="userCode">
                    <el-input class = "xe-input-col3" v-model="addForm.userCode" placeholder="6-16位数字字母"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="loginPwd">
                    <el-input type="password" class = "xe-input-col3" v-model="addForm.loginPwd" placeholder="请输入数文字母组合"></el-input>
                </el-form-item>
                <el-form-item label="所属组织" prop="groupName" required>
                    <input-tree class = "xe-input-col3 xe-input-readonly-color" v-model="addForm.groupName" :readonly=true :tree-data="treeData" :success-callback = "successCallback"></input-tree>
                    <!--<el-input class = "xe-input-col3" :disabled = true v-model="editForm.typeDesc" placeholder="请输入内容" icon="view" :on-icon-click="handleIconClick"></el-input>-->
                </el-form-item>
                <el-form-item label="用户类型" prop="typeDesc">
                    <el-input class = "xe-input-col3 xe-input-readonly-color" :readonly=true value = "运营" placeholder="请输入内容"></el-input>
                </el-form-item>
                 <!--</el-form-item>-->
                    <!--<div class="xe-adduser-radio-item">-->
                        <!--<el-radio class="radio" v-model="addForm.status" label="THROUGH">启用</el-radio>-->
                        <!--<el-radio class="radio" v-model="addForm.status" label="DISABLE">禁用</el-radio>-->
                    <!--</div>-->
                <!--</el-form-item>-->
                <el-form-item label="状态">
                    <el-radio class="radio" v-model="addForm.status" label="THROUGH">启用</el-radio>
                    <el-radio class="radio" v-model="addForm.status" label="DISABLE">禁用</el-radio>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="backBtnClick()">返回</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import InputTree from '../../../components/groupTree';

    export default {
        data() {
            var checkLoginName = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[A-Za-z0-9]{6,16}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写登录名,支持6-12位数字字母'));
                    } else {
                        this.$http({
                            method: 'POST',
                            url: `/page/uam/user/common/checkLoginName/${this.addForm.loginName}`
                        }).then((res) => {
                            if (res.result === false) {
                                callback(new Error('登录名称已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入登录名'));
                }
            };
            var checkMobileNo = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^1\d{10}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入正确的手机号格式'));
                    } else {
                        let param = {};
                        param.mobileNo = value;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/user/common/checkUserPhone',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
                                callback(new Error('手机号已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入手机号'));
                }
            };
            var checkUserName = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('姓名只能为汉字'));
                    } else {
                        let param = {};
                        param.userName = value;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/user/common/checkUserName',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
                                callback(new Error('该姓名已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入姓名'));
                }
            };
            var checkUserCode = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[A-Za-z0-9]{6,16}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写资料,6-16位数字字母'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var checkLoginPwd = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,14}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('必须输入数字与英文字母组合'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                addForm: {
                    groupName: '',
                    status: 'THROUGH'
                },
                treeData: [],
                rules: {
                    loginName: [
                        { validator: checkLoginName, trigger: 'blur' }
                    ],
                    mobileNo: [
                        { validator: checkMobileNo, trigger: 'blur' }
                    ],
                    userName: [
                        { min: 2, max: 20, message: '请正确填写姓名,支持2-20个汉字', trigger: 'blur' },
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    userCode: [
                        { validator: checkUserCode, trigger: 'blur' }
                    ],
                    loginPwd: [
                        { min: 6, max: 14, message: '长度必须在6-14位之间', trigger: 'blur' },
                        { validator: checkLoginPwd, trigger: 'blur' }
                    ],
                    groupName: [
                        {required: true, message: '请选择组织', trigger: 'change'}
                    ]
                }

            };
        },
        components: {
            'input-tree': InputTree
        },
        created() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/uam/group/common/getGroupTree',
                data: {
                }
            }).then((res) => {
                _this.treeData = res['result'];
            }).catch((err) => {
                console.log(err);
            });
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveBtnClick();
                    } else {
                        return false;
                    }
                });
            },
            saveBtnClick() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/user/add/addUamUser',
                    data: _this.addForm
                }).then((res) => {
                    _this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },

            backBtnClick() {
                this.$router.go(-1);
            },
            successCallback(arr) {
                this.addForm.groupId = arr[arr.length - 1].id;
            },
            handleIconClick() {

            }
        }
    };

</script>
