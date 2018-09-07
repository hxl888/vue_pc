<style>
    .xe-pageHeader{
        height:34px;
        font-size:14px;
        margin:10px 0;
        border-bottom:1px solid #cacaca;
    }
    .xe-col-2{
        width:300px;
    }
    .xe-input-col3{
        width:252px;
    }
</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>供应商档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    编辑供应商联系人档案
                </p>
            </div>
            <div>
                <el-form-item label="供应商名称" prop="supplierName">
                    <el-input :disabled="true" v-model="roleForm.supplierName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="联系人" required prop="contactName">
                    <el-input v-model="roleForm.contactName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" required prop="contactPhone">
                    <el-input v-model="roleForm.contactPhone" type="tel" :maxlength="11" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="部门职务" prop="departmentPosition">
                    <el-input v-model="roleForm.departmentPosition" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="传真" prop="fax">
                    <el-input v-model="roleForm.fax" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input v-model="roleForm.email" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="postCode">
                    <el-input v-model="roleForm.postCode" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="地址" required prop="citypicker">
                    <city-picker :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']"
                                 :default-data="defaultData"
                                 :url="cityPickerUrl"
                                 :readonly="isEdit"
                                 :success-callback="cityPickerEditSuccessCallback">
                    </city-picker>
                </el-form-item>
                <el-form-item label="" prop="address">
                    <el-input v-model="roleForm.address" class="xe-input-col3"></el-input>
                </el-form-item>
                <div class="xe-page-header"></div>
                <el-form-item >
                    <el-button type="primary" :disabled="frmsuce"  @click="submitForm('roleForm')">保 存</el-button>
                    <el-button @click="returnBefore">返 回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    import CityPicker from '../../../components/cityPicker';
    export default {
        data() {
            var checkcontactName = (rule, value, callback) => {
                if (value !== '') {
                    callback();
                } else {
                    callback(new Error('请输入联系人姓名'));
                }
            };
            var checkcontactPhone = (rule, value, callback) => {
                if (value !== '') {
                    let regx = /((\d{11})|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/;
                    if (regx.test(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入正确的联系电话'));
                    }
                } else {
                    callback(new Error('请输入联系电话'));
                }
            };
            return {
                roleForm: {
                    supplierName: '',
                    contactName: '',
                    contactPhone: '',
                    departmentPosition: '',
                    fax: '',
                    email: '',
                    postCode: '',
                    citypicker: '',
                    address: ''
                },
                frmsuce: false, // 表单提交成功保存置灰
                editGroupForm: {
                    address: ''
                },
                defaultData: {},
                isEdit: false,
                cityPickerUrl: '/page/uam/citypicker/get/getCitypicker',
                currentGroupData: {},
                userId: '', // 流水信息
                customerNameList: [],
                rules: {
                    contactName: [
                        { validator: checkcontactName, trigger: 'blur' }
                    ],
                    contactPhone: [
                        { validator: checkcontactPhone, trigger: 'blur' }
                    ],
                    address: [
                        { min: 0, max: 150, message: '角色说明长度不能大于150', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {
            'city-picker': CityPicker
        },
        created() {
            this.getUrlquery();
        },
        methods: {
            getUrlquery() {
                let _this = this;
                _this.userId = _this.$route.query.userId;
                _this.getuserform(_this.userId);
                console.log('_this.userId', _this.userId);
            },
            getuserform(id) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/csc/supplier/common/querySupplierContactById/${id}`
                }).then((res) => {
                    console.log('userllll--->', res);
                    if (res.result) {
                        _this.roleForm = res.result;
                        console.log('666');
                        _this.queryEditDataFn();
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.editGroupForm.address.length > 1) {
                            this.saveRoleFn();
                        } else {
                            // this.$xeMessageBox('请重新选择地址');
                            this.$alert('请重新选择地址', '提示', {
                                confirmButtonText: '确定',
                                type: 'error'
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveRoleFn() {
                let _this = this;
                let param = {};
                param = _this.roleForm;
                console.log('_this.editGroup保存', param);
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/supplier/main/modifyCscSupplierContact',
                    data: param
                }).then((res) => {
                    console.log('保存成功--->', res);
                    // this.$xeMessage('修改成功');
                    setTimeout(function () {
                        _this.frmsuce = true;
                        _this.returnBefore();
                    }, 1000);
                }).catch((err) => {
                    console.log(err);
                });
            },
            returnBefore() {
                this.$router.go(-1);
            },
            queryEditDataFn() {  // 四级联动地址
                let _this = this;
                let param = {};
                _this.roleForm.province ? param.province = {
                    code: _this.roleForm.province,
                    keyword: 'province',
                    title: _this.roleForm.provinceName
                } : null;
                _this.roleForm.city ? param.city = {
                    code: _this.roleForm.city,
                    keyword: 'city',
                    title: _this.roleForm.cityName
                } : null;
                _this.roleForm.area ? param.district = {
                    code: _this.roleForm.area,
                    keyword: 'area',
                    title: _this.roleForm.areaName
                } : null;
                _this.roleForm.street ? param.street = {
                    code: _this.roleForm.street,
                    keyword: 'street',
                    title: _this.roleForm.streetName
                } : null;
                _this.defaultData = param;
                _this.addresparam();
            },
            addresparam() {
                let _this = this;
                var addresArr = [];
                if (_this.defaultData.province) {
                    addresArr.push({
                        code: _this.defaultData.province.code,
                        title: _this.defaultData.province.title
                    });
                }
                if (_this.defaultData.city) {
                    addresArr.push({
                        code: _this.defaultData.city.code,
                        title: _this.defaultData.city.title
                    });
                }
                if (_this.defaultData.district) {
                    addresArr.push({
                        code: _this.defaultData.district.code,
                        title: _this.defaultData.district.title
                    });
                }
                if (_this.defaultData.street) {
                    addresArr.push({
                        code: _this.defaultData.street.code,
                        title: _this.defaultData.street.title
                    });
                }
                _this.editGroupForm.groupAddress = _this.formatGroupAddres(addresArr);
                console.log('_this.editGroupForm', _this.editGroupForm);
            },
            cityPickerEditSuccessCallback(arr) {
                let _this = this;
                console.log('arr-->', arr);
                _this.editGroupForm.address = _this.formatGroupAddres(arr);
                _this.roleForm.citypicker = _this.formatGroupAddres(arr);
                console.log('this.editGroupForm.address', this.editGroupForm.address);
            },
            formatGroupAddres(val) {
                let title = '';
                let code = '';
                val.forEach((item) => {
                    title += `${item.title}/`;
                    code += `${item.code},`;
                });
                title = title.slice(0, -1);
                code = code.slice(0, -1);
                return title + '~' + code;
            }
        }
    };
</script>
