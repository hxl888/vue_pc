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
                    新增供应商联系人档案
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
                    <el-button type="primary" :disabled="frmsuce" @click="submitForm('roleForm')">保 存</el-button>
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
                    address: '',
                    supplierSerialNo: '' // 流水信息
                },
                currentGroupData: {},
                customerNameList: [],
                editGroupForm: {
                    address: ''
                },
                frmsuce: false, // 表单提交成功保存置灰
                defaultData: {},
                isEdit: false,
                cityPickerUrl: '/page/uam/citypicker/get/getCitypicker',
                rules: {
                    contactName: [
                        { validator: checkcontactName, trigger: 'blur' }
                    ],
                    contactPhone: [
                        { validator: checkcontactPhone, trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.getUrlquery();
        },
        methods: {
            getUrlquery() {
                let _this = this;
                _this.roleForm.supplierName = _this.$route.query.supplierName;
                _this.roleForm.supplierSerialNo = _this.$route.query.supplierSerialNo;
                console.log('_this.supplierName', _this.supplierName);
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
                            // this.$xeMessageBox('请选择地址');
                            this.$alert('请选择地址', '提示', {
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
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/supplier/main/addCscSupplierContact',
                    data: _this.roleForm
                }).then((res) => {
                    console.log('保存成功--->', res);
                    // this.$xeMessage('保存成功');
                    setTimeout(function () {
                        _this.frmsuce = true;
                        _this.returnBefore();
                    }, 1000);
                }).catch((err) => {
                    console.log(err);
                    console.log('err.code', err);
                });
            },
            returnBefore() {
                this.$router.go(-1);
            },
            cityPickerEditSuccessCallback(arr) {
                let _this = this;
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
        },
        components: {
            'city-picker': CityPicker
        }
    };
</script>
