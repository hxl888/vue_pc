<style rel="stylesheet/scss" lang="scss">



</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamUserListPage' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>编辑用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                编辑用户
            </p>
        </div>
        <div>
            <el-form :model="editForm" :rules="rules"  ref="ruleForm" :label-width="xeLabelWidth">

                <el-form-item label="登录名" prop="loginName">
                    <el-input class = "xe-input-col3 xe-input-readonly-color" :readonly=true v-model="editForm.loginName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobileNo" required>
                    <el-input class = "xe-input-col3" v-model="editForm.mobileNo" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName" required>
                    <el-input class = "xe-input-col3" v-model="editForm.userName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="userCode">
                    <el-input class = "xe-input-col3" v-model="editForm.userCode" placeholder="6-16位数字字母"></el-input>
                </el-form-item>
                <el-form-item label="所属组织" prop="groupName" required>
                    <input-tree class = "xe-input-col3 xe-input-readonly-color" v-model="editForm.groupName" :default-data-id="editForm.groupId" :readonly=true :tree-data="treeData" :success-callback = "successCallback"></input-tree>
                </el-form-item>
                <el-form-item label="用户类型" prop="typeDesc">
                    <el-input class = "xe-input-col3 xe-input-readonly-color" :readonly=true v-model="editForm.typeDesc" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-input class = "xe-input-col3 xe-input-readonly-color" :readonly=true v-model="editForm.status" placeholder="请输入内容"></el-input>
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
//    import FormatTree from '../../../utils/formatTree';
    export default {
        data() {
            var checkMobileNo = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^1\d{10}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入正确的手机号格式'));
                    } else {
                        let param = {};
                        param.mobileNo = value;
                        param.userId = this.editForm.id;
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
                        param.userId = this.editForm.id;
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
            return {
                editForm: this.$route.query,
                rules: {
                    mobileNo: [
                        { validator: checkMobileNo, trigger: 'blur' }
                    ],
                    userName: [
                        { validator: checkUserName, trigger: 'blur' }
                    ],
                    userCode: [
                        { validator: checkUserCode, trigger: 'blur' }
                    ],
                    groupName: [
                        {required: true, message: '请选择组织', trigger: 'blur'}
                    ]
                },
                treeData: []
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
                    url: '/page/uam/user/modify/editUamUser',
                    data: this.editForm
                }).then((res) => {
                    this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },

            backBtnClick() {
                this.$router.go(-1);
            },
            successCallback(arr) {
                this.editForm.groupId = arr[arr.length - 1].id;
            },
            handleIconClick() {

            }
        }
    };

</script>
