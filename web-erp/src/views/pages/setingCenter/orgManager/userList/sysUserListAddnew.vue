<template lang="html">
    <div class="pruduct-add">
        <div class="serch-box">
            <!-- {{filterForm}} -->
            <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="100px">
                <div class="for-itemlis">
                    <el-form-item label="用户编号" prop="userId" v-if="!pswFlag">
                        <el-input size="small" class="xe-input-col3" disabled v-model="filterForm.userId" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="用户名" prop="loginName">
                        <el-input size="small" class="xe-input-col3" :disabled="!pswFlag" v-model="filterForm.loginName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input size="small" class="xe-input-col3" :maxlength="11" v-model="filterForm.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <template v-if="pswFlag">
                        <el-form-item label="登录密码" prop="pwd" required>
                            <el-input size="small" class="xe-input-col3" type="password" :maxlength="20" v-model="filterForm.pwd" placeholder="请输入登录密码"></el-input>
                        </el-form-item>
                    </template>
                    <template v-else>
                        <el-form-item label="登录密码" prop="pwd">
                            <el-input size="small" class="xe-input-col3" type="password" :maxlength="20" v-model="filterForm.pwd" placeholder="请输入登录密码"></el-input>
                        </el-form-item>
                    </template>
                    <el-form-item label="用户姓名"  prop="userName">
                        <el-input size="small" class="xe-input-col3" v-model="filterForm.userName" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="性别" prop="gender" required>
                            <el-radio-group v-model="filterForm.gender">
                                <el-radio v-for="(item, index) in genderlist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <el-form-item label="用户类型" prop="userType">
                        <el-input size="small" class="xe-input-col3" placeholder="客服／运营／订单员等等" v-model="filterForm.userType"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input size="small" class="xe-input-col3" placeholder="请输入用户邮箱" v-model="filterForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" prop="saleAreaIds">
                        <areaselectTag v-model='filterForm.saleAreaIds' @areaName="loadName" :getName="true" :width='400' :changeOnSelects="false"></areaselectTag>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="address">
                        <el-input size="small" class="xe-input-col3" v-model="filterForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="用户描述" prop="userDesc">
                        <el-input size="small" class="xe-input-col3" :maxlength="30" v-model="filterForm.userDesc" placeholder="请输入用户描述"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="用户状态" prop="lockStatus">
                            <el-radio-group v-model="filterForm.lockStatus">
                                <el-radio v-for="(item, index) in lockStatuslist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="member-btnBox" style="padding-bottom: 0">
                    <el-button class="xe-button-normal" type="primary" @click="addProAll('filterForm')">
                        保存
                    </el-button>
                    <el-button class="xe-button-normal" @click="resetForm('filterForm')">
                        返回
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import {lockStatus01, verificationStatus, gender} from '@/dataControl.js';
    export default {
        props: {
            dialogVisible: Boolean,
            userType: String,
            filterForm: {}
        },
        data() {
            var regloginName = (rule, value, callback) => {
                if (this.pswFlag) { // 新增
                    if (value) {
                        let reg = /^[A-Za-z0-9]+$/;
                        if (reg.test(value)) {
                            this.validateNameCk(() => {
                                callback();
                            }, (err) => {
                                callback(new Error(err.msg));
                            });
                        } else {
                            return callback(new Error('用户名只能输入数字，字母'));
                        }
                    } else {
                        return callback(new Error('用户名不能为空'));
                    }
                } else {
                    callback();
                }
            };
            var regName = (rule, value, callback) => {
                if (value) {
                    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('用户姓名只能输入汉字，数字，字母'));
                    }
                } else {
                    return callback(new Error('用户姓名不能为空'));
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (this.pswFlag) { // 新增
                    if (!value) {
                        return callback(new Error('密码不能为空'));
                    } else {
                        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{5,20}$/;
                        if (reg.test(value)) {
                            callback();
                        } else {
                            return callback(new Error('密码为5-20位数字和字母组合'));
                        }
                    }
                } else {
                    if (!value) {
                        callback();
                    } else {
                        let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{5,20}$/;
                        if (reg.test(value)) {
                            callback();
                        } else {
                            return callback(new Error('密码为5-20位数字和字母组合'));
                        }
                    }
                }
            };
            var reglockStatus = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择状态'));
                }
            };
            var regMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请填写手机号码'));
                } else {
                    let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('请输入正确的手机号码'));
                    }
                }
            };
            var userDescFn = (rule, value, callback) => {
                if (value) {
                    if (value.length > 30) {
                        callback(new Error('用户描述不能超过100字'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                userTypelist: [],
                restaurants: [],
                timeout: null,
                loading: false,
                pswFlag: true,
                rules: {
                    loginName: [
                        {required: true, validator: regloginName, trigger: 'blur'}
                    ],
                    userName: [
                        {required: true, validator: regName, trigger: 'blur'}
                    ],
                    phone: [
                        { required: true, validator: regMobile, trigger: 'blur' }
                    ],
                    email: [
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
                    ],
                    pwd: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    lockStatus: [
                        { validator: reglockStatus, trigger: 'change' }
                    ],
                    userDesc: [
                        { validator: userDescFn, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit('selectGo');
            },
            loadName(name) {
                this.filterForm.provinceName = name[0];
                this.filterForm.cityName = name[1];
                this.filterForm.areaName = name[2];
            },
            addProAll(formName) { // 添加
                console.log(this.filterForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        // if (this.filterForm) {
                        console.log('提交----》go');
                        this.Preservation();
                        // }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            validateNameCk(suc, err) {
                let params = {};
                params.loginName = this.filterForm.loginName;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/user/erp/checkUser',
                    data: params
                }).then((res) => {
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        err && err(res.data.remote);
                    } else {
                        suc && suc();
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            Preservation() {
                let params = {};
                params = this.filterForm;
                params.provinceId = this.filterForm.saleAreaIds[0];
                params.cityId = this.filterForm.saleAreaIds[1];
                params.areaId = this.filterForm.saleAreaIds[2];
                if (this.userType === 'new') {
                    params.ajaxUrl = '/xe-route/xe-rms/user/erp/add';
                } else {
                    params.ajaxUrl = '/xe-route/xe-rms/user/erp/modify';
                }
                this.$http({
                    method: 'post',
                    url: params.ajaxUrl,
                    data: params
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    this.resetForm('filterForm');
                    this.$emit('selectGo');
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        created() {
            if (this.userType === 'new') {
                this.pswFlag = true;
            } else {
                this.pswFlag = false;
            }
        },
        watch: {
            dialogVisible(n) {
                var _this = this;
                if (n === false) {
                    setTimeout(function () {
                        _this.resetForm('filterForm');
                    }, 300);
                }
            },
            userType(val) {
                if (val === 'new') {
                    this.pswFlag = true;
                } else {
                    this.pswFlag = false;
                }
            }
        },
        computed: {
            lockStatuslist() {
                return lockStatus01;
            },
            genderlist() {
                return gender;
            },
            saleAreaId() {
                return this.filterForm.saleAreaIds;
            },
            verificationStatusList() {
                return verificationStatus;
            }
        },
        components: {
            areaselectTag
        }
    };
</script>
<style scoped>
    .member-btnBox{
        padding: 10px 0 10px;
        text-align: center;
    }
    .xe-input-col3{
        width: 390px;
    }
    .pruduct-add .serch-box {
        padding: 20px 20px 0;
        margin-bottom: 12px;
    }
</style>
