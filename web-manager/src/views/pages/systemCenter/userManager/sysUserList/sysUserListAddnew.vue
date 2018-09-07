<template lang="html">
    <div class="pruduct-add">
        <div class="serch-box">
        <!-- {{filterForm}} -->
            <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="100px">
                <div class="for-itemlis">
                    <el-form-item label="用户名" prop="loginName">
                        <el-input size="small" class="xe-input-col3" v-model="filterForm.loginName" placeholder="请输入用户名"></el-input>
                    </el-form-item>
                    <el-form-item label="用户姓名" prop="userName">
                        <el-input size="small" class="xe-input-col3" v-model="filterForm.userName" placeholder="请输入用户姓名"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="pwd">
                        <el-input size="small" class="xe-input-col3" type="password" v-model="filterForm.pwd" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="phone">
                        <el-input size="small" class="xe-input-col3" :maxlength="11" v-model="filterForm.phone" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="邮箱" prop="email">
                        <el-input size="small" class="xe-input-col3" placeholder="请输入用户邮箱" v-model="filterForm.email"></el-input>
                    </el-form-item> -->
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
                        确认添加 
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
    import {lockStatus01, verificationStatus} from '@/dataControl.js';
    export default {
        props: ['dialogVisible'],
        data() {
            var regloginName = (rule, value, callback) => {
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
                if (!value) {
                    return callback(new Error('密码不能为空'));
                } else {
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{5,16}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('密码为5-12位数字和字母组合'));
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
                selecarea: [],
                userTypelist: [],
                restaurants: [],
                timeout: null,
                loading: false,
                filterForm: {
                    loginName: '',
                    userName: '',
                    phone: '',
                    pwd: '',
                    lockStatus: 1,
                    userDesc: ''
                },
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
                    pwd: [
                        { required: true, validator: checkPassword, trigger: 'blur' }
                    ],
                    lockStatus: [
                        { required: true, validator: reglockStatus, trigger: 'change' }
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
            addProAll(formName) { // 添加
                console.log(this.filterForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.filterForm) {
                            console.log('提交----》go');
                            this.Preservation();
                        }
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
                    url: '/xe-route/xe-rms/user/sys/checkUser',
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
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/user/sys/add',
                    data: params
                }).then((res) => {
                    console.log('保存成功');
                    this.resetForm('filterForm');
                    this.$emit('selectGo');
                }).catch((error) => {
                    console.log(error);
                });
            },
            craetedData() {
                let params = {};
                params.province = this.filterForm.provinceId;
                params.city = this.filterForm.cityId;
                params.area = this.filterForm.areaId;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/sellersByArea',
                    data: params
                }).then((res) => {
                    this.restaurants = res.data.list.map(item => {
                        return { value: item.salesmanId, label: item.salesmanName };
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        created() {
            // this.creatuserType();
        },
        watch: {
            dialogVisible(n) {
                var _this = this;
                if (n === false) {
                    setTimeout(function () {
                        _this.resetForm('filterForm');
                        _this.selecarea = [];
                    }, 300);
                }
            },
            selecarea() {
                this.filterForm.provinceId = this.selecarea[0];
                this.filterForm.cityId = this.selecarea[1];
                this.filterForm.areaId = this.selecarea[2];
                if (this.filterForm.areaId) {
                    this.filterForm.saleManId = '';
                    this.craetedData();
                }
            }
        },
        computed: {
            lockStatuslist() {
                return lockStatus01;
            },
            verificationStatusList() {
                return verificationStatus;
            }
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
</style>
