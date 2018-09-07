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
    .xe-input-col2{
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
                    编辑供应商档案
                </p>
            </div>
            <div>
                <el-form-item label="客户名称" required prop="customerCode">
                    <el-select v-model="roleForm.customerCode" filterable placeholder="请选择" class="xe-input-col2">
                        <el-option
                            v-for="item in roleTypeOption"
                            :label="item.customerName"
                            :value="item.customerCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商编码" required prop="supplierCode">
                    <el-input v-model="roleForm.supplierCode" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="供应商名称" required prop="supplierName">
                    <el-input v-model="roleForm.supplierName" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="所属行业" prop="supplierIndustry">
                    <el-input v-model="roleForm.supplierIndustry" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="供应产品" prop="supplierProduct">
                    <el-input v-model="roleForm.supplierProduct" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="supplierRemark">
                    <el-input v-model="roleForm.supplierRemark" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :disabled="forsur" @click="submitForm('roleForm')">保 存</el-button>
                    <el-button @click="returnBefore">返 回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            var checksupplierName = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('角色名称只能为汉字'));
                    } else {
                        this.$http({
                            method: 'POST',
                            url: '/page/csc/supplier/common/checkSupplierName',
                            data: {
                                customerCode: this.roleForm.customerCode,
                                selfName: this.oldsupplierName,
                                supplierName: this.roleForm.supplierName
                            }
                        }).then((res) => {
                            console.log('角色编码res', res);
                            if (res.result === false) {
                                callback(new Error('角色名称已存在'));
                            } else {
                                callback();
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                } else {
                    callback(new Error('请输入角色名称'));
                }
            };
            var checkRoleCode = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('角色编码只能为数字和字母'));
                    } else {
                        this.$http({
                            method: 'POST',
                            url: '/page/csc/supplier/common/checkSupplierCode',
                            data: {
                                customerCode: this.roleForm.customerCode,
                                selfCode: this.oldsupplierCode,
                                supplierCode: this.roleForm.supplierCode
                            }
                        }).then((res) => {
                            console.log('角色编码res', res);
                            if (res.result === false) {
                                callback(new Error('角色编码已存在'));
                            } else {
                                callback();
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                } else {
                    callback(new Error('请输入角色编码'));
                }
            };
            return {
                roleForm: {
                    customerCode: '',
                    supplierCode: '',
                    supplierName: '',
                    supplierRemark: '',
                    supplierIndustry: '',
                    supplierProduct: ''
                },
                forsur: false, // 防止表单多次提交
                serialNo: '', // 流水号
                oldsupplierCode: null,
                oldsupplierName: null,
                roleTypeOption: [],
                rules: {
                    supplierCode: [
                        { min: 0, max: 20, message: '角色编码长度不能大于20', trigger: 'blur' },
                        { validator: checkRoleCode, trigger: 'blur' }
                    ],
                    supplierName: [
                        { min: 0, max: 20, message: '角色名称长度不能大于20', trigger: 'blur' },
                        { validator: checksupplierName, trigger: 'blur' }
                    ],
                    supplierRemark: [
                        { min: 0, max: 150, message: '角色说明长度不能大于150', trigger: 'blur' }
                    ],
                    customerCode: [
                        { message: '请选择客户名称' }
                    ]
                }
            };
        },
        created() {
            this.getcurName();
            this.getlocalquery();
        },
        methods: {
            getlocalquery() {
                let _this = this;
                _this.serialNo = _this.$route.query.serialNo;
                _this.checksupplierlis();
            },
            checksupplierlis() {
                // 根据流水查询供应商信息
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/supplier/common/querySupplierBySerNo/' + _this.serialNo
                }).then((res) => {
                    console.log('流水号-----', res.result);
                    if (res.result) {
                        _this.roleForm = res.result;
                        _this.oldsupplierCode = res.result.supplierCode;
                        _this.oldsupplierName = res.result.supplierName;
                        console.log('_this.roleForm', _this.roleForm);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getcurName() {
                let _this = this;
                _this.getcusSeleArr('/page/csc/cscReceive/common/findAllCustomerInfo', function(res) {
                    console.log('res999====', res);
                    _this.roleTypeOption = res.result;
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log('llll');
                        this.saveRoleFn();
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
                    url: '/page/csc/supplier/oper/modifyOperCscSupplier',
                    data: _this.roleForm
                }).then((res) => {
                    console.log('保存成功', res);
                    _this.forsur = true;
                    if (res.result === 1) {
                        // _this.$xeMessage({
                        //     type: 'success',
                        //     message: '保存成功'
                        // });
                        setTimeout(function () {
                            _this.$router.go(-1);
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            returnBefore() {
                this.$router.go(-1);
            }
        }
    };
</script>
