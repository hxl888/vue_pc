<template lang="html">
    <div class="pruduct-add">
        <div class="serch-box">
            <el-form ref="filterForm" :model="filterForm" :rules="rules" :label-width="xeLabelWidth">
                <div class="for-itemlis">
                    <div>
                        <el-form-item label="用户名" label-width="100px" prop="">
                            <span>{{filterForm.mobile ? filterForm.mobile : filterForm.email}}</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="绑定手机号" label-width="100px" prop="proName">
                        <span>{{filterForm.mobile}}</span>
                    </el-form-item>
                    <div>
                        <el-form-item label="注册来源" label-width="100px" prop="regSource">
                            <span>{{filterForm.regSource | regSourcefiter}}</span>
                        </el-form-item>
                    </div>
                    <el-form-item label="店铺名称" label-width="100px" prop="shopName">
                        <span>{{filterForm.shopName}}</span>
                    </el-form-item>
                    <div>
                        <el-form-item label="状态" label-width="100px" prop="buyerFreezeStatus">
                            <el-radio-group v-model="filterForm.buyerFreezeStatus">
                                <el-radio v-for="(item, index) in freezeStatuslist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="验证状态" label-width="100px" prop="verifyFlag">
                            <el-radio-group v-model="filterForm.verifyFlag">
                                <el-radio v-for="(item, index) in verificationStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div>
                        <el-form-item label="用户类型" label-width="100px" prop="userTypeId">
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
                    <el-form-item label="真实姓名" label-width="100px" prop="userName">
                        <el-input :maxlength='15' size="small" class = "xe-input-col3" v-model="filterForm.userName" placeholder="请输入真实姓名"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="店铺地址" label-width="100px" prop="areaId">
                            <area-select v-model="selecarea" :filterable='true' :width="390"></area-select>
                        </el-form-item>
                    </div>
                    <el-form-item label="详细地址" label-width="100px" prop="address">
                        <el-input :maxlength='50' type="textarea"  class="xe-input-col3" v-model="filterForm.address" placeholder="请输入详细地址"></el-input>
                    </el-form-item>
                    <el-form-item label="业务员手机号" label-width="100px" prop="saleManNameAndPhone">
                        <el-select
                            size="small"
                            class = "xe-input-col3"
                            v-model="filterForm.saleManNameAndPhone"
                            clearable
                            :filterable="true"
                            placeholder="业务员手机号"
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
                    <el-button class="xe-button-normal" type="primary" :loading="editorLoading" @click="addProAll('filterForm')">
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
        props: ['EdialogVisible', 'editdefault'],
        data() {
            var regUserTypeId = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择用户类型'));
                }
            };
            var regverifyFlag = (rule, value, callback) => {
                if (value) {
                    console.log(value);
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
            var selecareadata = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择店铺地址(必须选择到区级)'));
                }
            };
            return {
                selecarea: [],
                restaurants: [],
                loading: false,
                userTypelist: [],
                filterForm: {
                    email: '',
                    mobile: '',
                    userId: '',
                    regSource: '',
                    buyerFreezeStatus: '',
                    userTypeId: '',
                    verifyFlag: '',
                    address: '',
                    saleManId: '',
                    saleManNameAndPhone: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    userName: '',
                    shopName: ''
                },
                editorLoading: false,
                rules: {
                    userTypeId: [
                        { required: true, validator: regUserTypeId, trigger: 'change' }
                    ],
                    verifyFlag: [
                        { required: true, validator: regverifyFlag, trigger: 'change' }
                    ],
                    address: [
                        { required: true, message: '请输入详细地址', trigger: 'blur' }
                    ],
                    buyerFreezeStatus: [
                        { required: true, validator: regfreezeStatus, trigger: 'change' }
                    ],
                    areaId: [
                        { required: true, validator: selecareadata, trigger: 'change' }
                    ]
                }
            };
        },
        created() {
            console.log(this.editdefault);
            this.$nextTick(() => {
                this.creatList();
            });
        },
        methods: {
            creatList() {
                console.log('this.editdefault', this.editdefault);
                this.filterForm.shopName = this.editdefault.shopName;
                this.filterForm.email = this.editdefault.email;
                this.filterForm.mobile = this.editdefault.mobile;
                this.filterForm.userId = this.editdefault.userId;
                this.filterForm.regSource = this.editdefault.regSource;
                this.filterForm.buyerFreezeStatus = this.editdefault.buyerFreezeStatus;
                this.filterForm.userTypeId = this.editdefault.userTypeId;
                this.filterForm.verifyFlag = this.editdefault.verifyFlag;
                this.filterForm.address = this.editdefault.address;
                this.filterForm.provinceId = this.editdefault.provinceId;
                this.filterForm.cityId = this.editdefault.cityId;
                this.filterForm.areaId = this.editdefault.areaId;
                this.filterForm.userName = this.editdefault.userName;
                this.selecarea = [this.filterForm.provinceId, this.filterForm.cityId, this.filterForm.areaId];
                this.creatuserType();
                var _this = this;
                setTimeout(function () {
                    _this.filterForm.saleManNameAndPhone = _this.editdefault.saleManNameAndPhone;
                    _this.filterForm.saleManId = _this.editdefault.saleManId;
                }, 300);
            },
            creatuserType() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/getUserType',
                    data: params
                }).then((res) => {
                    console.log(res.data);
                    this.userTypelist = res.data.list;
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
                        return { value: item.salesmanId, label: item.salesmanName, key: item.salesmanId };
                    });
                    console.log(this.restaurants);
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit('editGo');
            },
            addProAll(formName) { // 添加
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
            Preservation() {
                var _this = this;
                let params = {};
                this.editorLoading = true;
                params.userId = this.filterForm.userId;
                params.regSource = this.filterForm.regSource;
                params.freezeStatus = this.filterForm.buyerFreezeStatus;
                params.userTypeId = this.filterForm.userTypeId;
                params.verifyFlag = this.filterForm.verifyFlag;
                params.address = this.filterForm.address;
                params.provinceId = this.filterForm.provinceId;
                params.cityId = this.filterForm.cityId;
                params.areaId = this.filterForm.areaId;
                params.userName = this.filterForm.userName;
                if (this.filterForm.saleManNameAndPhone) {
                    if (this.filterForm.saleManNameAndPhone === this.editdefault.saleManNameAndPhone) {
                        params.saleManId = this.filterForm.saleManId;
                    } else {
                        params.saleManId = this.filterForm.saleManNameAndPhone;
                    }
                }
                console.log(params);
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/userinfo/updateUserInfo',
                    data: params
                }).then((res) => {
                    console.log('保存成功');
                    this.$emit('editGo');
                    this.editorLoading = false;
                    setTimeout(function () {
                        _this.$emit('refreshList');
                        _this.resetForm('filterForm');
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                    this.editorLoading = false;
                });
            }
        },
        watch: {
            EdialogVisible(n) {
                var _this = this;
                if (n === false) {
                    // this.resetForm('filterForm');
                    this.$nextTick(() => {
                        setTimeout(function () {
                            _this.creatList();
                        }, 300);
                    });
                    // this.selecarea = [this.filterForm.provinceId, this.filterForm.cityId, this.filterForm.areaId];
                }
            },
            selecarea() {
                if (this.selecarea[0]) {
                    this.filterForm.provinceId = this.selecarea[0];
                }
                if (this.selecarea[1]) {
                    this.filterForm.cityId = this.selecarea[1];
                }
                if (this.selecarea[2]) {
                    this.filterForm.areaId = this.selecarea[2];
                }
                if (this.filterForm.areaId) {
                    this.filterForm.saleManNameAndPhone = '';
                    this.craetedData();
                }
            },
            editdefault(n) {
                this.$nextTick(() => {
                    this.creatList();
                });
                this.selecarea = [this.filterForm.provinceId, this.filterForm.cityId, this.filterForm.areaId];
                this.craetedData();
            }
        },
        computed: {
            freezeStatuslist() {
                return freezeStatus;
            },
            verificationStatusList() {
                return verificationStatus;
            },
            'this.filterForm'() {
                return this.editdefault;
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
