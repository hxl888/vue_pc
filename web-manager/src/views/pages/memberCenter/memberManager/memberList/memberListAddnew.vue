<template lang="html">
    <div class="pruduct-add">
        <div class="serch-box">
            <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="100px">
                <div class="for-itemlis">
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input size="small" class="xe-input-col3" :maxlength="11" v-model="filterForm.mobile" placeholder="请输入手机号码"></el-input>
                    </el-form-item>
                    <el-form-item label="登录密码" prop="loginPwd">
                        <el-input size="small" class="xe-input-col3"  v-model.trim="filterForm.loginPwd" placeholder="请输入登录密码"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="userName">
                        <el-input :maxlength='15' size="small" class="xe-input-col3" v-model="filterForm.userName" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="注册来源" prop="regSource">
                            <span>{{filterForm.regSource | regSourcefiter}}</span>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="用户类型" prop="userTypeId">
                            <el-select size="small" class="xe-input-col3" clearable v-model="filterForm.userTypeId" placeholder="请选择用户类型">
                                <el-option
                                  v-for="item in userTypelist"
                                  :key="item.typeId"
                                  :label="item.typeName"
                                  :value="item.typeId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="状态" prop="freezeStatus">
                            <el-radio-group v-model="filterForm.freezeStatus">
                                <el-radio v-for="(item, index) in freezeStatuslist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="验证状态" prop="verifyFlag">
                            <el-radio-group v-model="filterForm.verifyFlag">
                                <el-radio v-for="(item, index) in verificationStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <el-form-item label="店铺名称" prop="shopName">
                        <el-input :maxlength='15' size="small" class="xe-input-col3" v-model="filterForm.shopName" placeholder="请输入店铺名称"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="店铺地址" prop="areaId">
                            <area-select v-model="selecarea" :changeOnSelects="false" :width="390"></area-select>
                        </el-form-item>
                    </div>
                    <el-form-item label="详细地址" prop="address">
                        <el-input :maxlength='50'  type="textarea" class="xe-input-col3" v-model="filterForm.address" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员手机号" prop="">
                        <el-select
                            size="small"
                            class = "xe-input-col3"
                            v-model="filterForm.saleManId"
                            clearable
                            filterable
                            :disabled="disabledbut"
                            :placeholder="placeholder"
                            :loading="loading">
                            <el-option
                              v-for="item in restaurants"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </el-form-item>
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
    import areaSelect from '@/components/areaSelect/areaSelect';
    import {freezeStatus, verificationStatus} from '@/dataControl.js';
    export default {
        props: ['dialogVisible'],
        data() {
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空'));
                } else {
    //                let reg = /^[\d_a-zA-Z]{6,12}$/;
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('密码为6-20位数字和字母组合'));
                    }
                }
            };
            var regMobile = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请填写手机号码'));
                } else {
                    let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                    if (reg.test(value)) {
                        this.validateNameCk(() => {
                            callback();
                        }, (err) => {
                            callback(new Error(err.msg));
                        });
                    } else {
                        return callback(new Error('请输入正确的手机号码'));
                    }
                }
            };
            var regUserTypeId = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择用户类型'));
                }
            };
            var regverifyFlag = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择验证状态'));
                }
            };
            var regfreezeStatus = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择状态'));
                }
            };
            var sourceReg = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择注册来源'));
                }
            };
            var selecareadata = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择店铺地址(必须选择到区级)'));
                }
            };
            return {
                selecarea: [],
                userTypelist: [],
                restaurants: [],
                timeout: null,
                loading: false,
                placeholder: '请先选择店铺地址',
                disabledbut: true,
                filterForm: {
                    userName: '',
                    mobile: '',
                    loginPwd: '',
                    regSource: 9,
                    freezeStatus: 1,
                    userTypeId: '',
                    verifyFlag: 1,
                    shopName: '',
                    address: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    saleManId: ''
                },
                rules: {
                    mobile: [
                        { required: true, validator: regMobile, trigger: 'blur' }
                    ],
                    loginPwd: [
                        { required: true, validator: checkPassword, trigger: 'blur' }
                    ],
                    userTypeId: [
                        { required: true, validator: regUserTypeId, trigger: 'change' }
                    ],
                    verifyFlag: [
                        { required: true, validator: regverifyFlag, trigger: 'change' }
                    ],
                    shopName: [
                        { required: true, message: '请输入店铺名称', trigger: 'blur' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    freezeStatus: [
                        { required: true, validator: regfreezeStatus, trigger: 'change' }
                    ],
                    regSource: [
                        { required: true, validator: sourceReg, trigger: 'change' }
                    ],
                    areaId: [
                        { required: true, validator: selecareadata, trigger: 'change' }
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
                params.mobile = this.filterForm.mobile;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/checkUserMobile',
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
                let _this = this;
                params = this.filterForm;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/addUser',
                    data: params
                }).then(() => {
                    console.log('保存成功');
                    setTimeout(() => {
                        _this.resetForm('filterForm');
                    }, 300);
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
            },
            restaurantsCk() {
                console.log('val');
            },
            creatuserType() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/getUserType',
                    data: params
                }).then((res) => {
                    this.userTypelist = res.data.list;
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        created() {
            this.creatuserType();
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
                    this.disabledbut = false;
                    this.placeholder = '请输入业务员手机号';
                }
            }
        },
        computed: {
            freezeStatuslist() {
                return freezeStatus;
            },
            verificationStatusList() {
                return verificationStatus;
            }
        },
        components: {
            areaSelect
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
