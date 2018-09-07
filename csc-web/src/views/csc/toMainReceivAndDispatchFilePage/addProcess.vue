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
                <el-breadcrumb-item :to="{ name: 'toMainReceivAndDispatchFilePage' }">收发货方档案</el-breadcrumb-item>
                <el-breadcrumb-item>{{typeOprea}}档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                {{typeOprea}}收发货方档案
            </p>
        </div>
        <div>
            <el-form :model="addForm" :rules="rules"  ref="ruleForm" :label-width="xeLabelWidth">
                <el-form-item label="联系人编码" prop="companySerialNo" v-if="editShow">
                    <el-input class = "xe-input-col3" :disabled="editShow" v-model="addForm.companySerialNo" placeholder="联系人编码"></el-input>
                </el-form-item>
                <el-form-item label="所属客户" required prop="customerCode">
                    <el-select v-model="addForm.customerCode" filterable placeholder="请选择" class = "xe-input-col3" :disabled="editShow">
                        <el-option v-for="item in optionss"
                              :label="item.label"
                              :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型">
                    <el-radio-group v-model="addForm.type">
                        <el-radio class="radio" label="1">企业公司</el-radio>
                        <el-radio class="radio" label="2">个人</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="contactCompanyName" required>
                    <el-input class = "xe-input-col3" v-model="addForm.contactCompanyName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="门店编码" prop="storeCode">
                    <el-input class = "xe-input-col3" v-model="addForm.storeCode" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contactName" required>
                    <el-input class = "xe-input-col3" v-model="addForm.contactName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone" required>
                    <el-input class = "xe-input-col3" v-model="addForm.phone" :maxlength="11" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="部门职务" prop="contactJob">
                    <el-input class = "xe-input-col3" v-model="addForm.contactJob" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="传真" prop="fax">
                    <el-input class = "xe-input-col3" v-model="addForm.fax" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input class = "xe-input-col3" v-model="addForm.email" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="邮编" prop="postCode">
                    <el-input class = "xe-input-col3" v-model="addForm.postCode" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="detailAddress" required>
                    <!--<el-input class = "xe-input-col3" v-model="addForm.detailAddress" placeholder="请输入内容"></el-input>-->
                    <city-picker :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']"
                                 :default-data="defaultData"
                                 :url="cityPickerUrl"
                                 :readonly="isEdit"
                                 :success-callback="cityPickerEditSuccessCallback">
                    </city-picker>
                </el-form-item>
                <el-form-item prop="address">
                <!--  xe-input-readonly-color -->
                    <el-input class = "xe-input-col3" :disabled="loadAdress" v-model="addForm.address"></el-input>
                </el-form-item>
                <el-form-item label="用途">
                    <el-checkbox-group v-model="addForm.resetPurpose">
                        <el-checkbox class="checkbox" name="resetPurpose" label="1">收货方</el-checkbox>
                        <el-checkbox class="checkbox" name="resetPurpose" label="2">发货方</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="">
                    <el-button type="primary" :disabled="formSure" @click="submitForm('ruleForm')">保存</el-button>
                    <el-button @click="backBtnClick()">返回</el-button>
                </el-form-item>

            </el-form>
        </div>
    </div>
</template>

<script>
    import CityPicker from '../../../components/cityPicker';
    export default {
        data() {
            var checkPhone = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^1\d{10}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入正确的手机号格式'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入手机号'));
                }
            };
            var checkContactName = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('姓名只能为汉字'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入联系人'));
                }
            };
            var checkFax = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^((0\d{2,3}-)?\d{7,8})$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写传真号'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var checkEmail = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写email'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var checkPostcode = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[1-9]\d{5}(?!\d)$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写邮政编码'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var checkCompanyName = (rule, value, callback) => { // 名称规则
                if (value !== '') {
                    var data = {};
                    var url = '/page/csc/cscReceive/common/checkCompanyNameWithAdd';
                    data.contactCompanyName = value;
                    if (this.$route.query.type === 'edit') {
                        data.serialNo = this.addForm.companySerialNo;
                        url = '/page/csc/cscReceive/common/checkCompanyNameWithEdit';
                    }
                    this.$http({
                        method: 'POST',
                        url: url,
                        data: data
                    }).then((res) => {
                        if (res.result === false) {
                            callback(new Error('该名称已存在'));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback(new Error('请输入名称'));
                }
            };
            return {
                typeOprea: '新增',
                editShow: false,
                cityPickerUrl: '/page/uam/citypicker/get/getCitypicker',
                defaultData: {},
                isEdit: false,
                editGroupForm: {
                    address: ''
                },
                options: {
                    province: true,
                    city: true,
                    district: true,
                    street: true
                },
                addForm: {
                    customerName: '',
                    customerCode: '',
                    type: '1',
                    contactCompanyName: '',
                    storeCode: '',
                    contactName: '',
                    phone: '',
                    contactJob: '',
                    fax: '',
                    email: '',
                    postCode: '',
                    address: '',
                    purpose: null,
                    selectAdress: '',
                    resetPurpose: [],
                    detailAddress: ''
                },
                formSure: false, // 表单提交保存置灰
                loadAdress: false,
                recordId: '',
                optionss: [],
                rules: {
                    customerCode: [
                        { required: true, message: '请选择所属客户', trigger: 'change' }
                    ],
                    contactCompanyName: [
                        { validator: checkCompanyName, trigger: 'blur' }
                        // { required: true, message: '请填写名称', trigger: 'blur' }
                    ],
                    phone: [
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    contactName: [
                        { min: 2, max: 20, message: '请正确填写姓名,支持2-20个汉字', trigger: 'blur' },
                        { validator: checkContactName, trigger: 'blur' }
                    ],
                    fax: [
                        { validator: checkFax, trigger: 'blur' }
                    ],
                    email: [
                        { validator: checkEmail, trigger: 'blur' }
                    ],
                    postCode: [
                        { validator: checkPostcode, trigger: 'blur' }
                    ],
                    selectAdress: [
                        { required: true, message: '请填写地址', trigger: 'blur' }
                    ]
                }

            };
        },
        created() {
            this.loadCustomerName();
            this.editsucess();
        },
        methods: {
            editsucess() {
                let _this = this;
                if (this.$route.query.type === 'edit') { // 编辑回显示
                    this.editShow = true;
                    this.typeOprea = '编辑';
                    this.recordId = this.$route.query.id;
                    this.$http({
                        method: 'POST',
                        url: `/page/csc/cscReceive/main/findReceiveInfoById/${_this.recordId}`
                    }).then((res) => {
                        // console.log(res.result);
                        // for (var i in res.result) {
                        //     console.log(i + '==' + res.result[i]);
                        // }
                        if (res.result) {
                            _this.addForm = res.result;
                            _this.queryEditDataFn(res.result);
                            console.log('res-result-->', res.result);
                            // Object.assign(_this.addForm, res.result);
                            this.$set(_this.addForm, 'resetPurpose', []);
                            console.log(_this.addForm.purpose === '3');
                            if (_this.addForm.purpose === '3') { // 3 收发
                                _this.addForm.resetPurpose = ['1', '2'];
                            } else {
                                _this.addForm.resetPurpose = [_this.addForm.purpose];
                            }
                        }
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    this.addForm.resetPurpose = ['1', '2'];
                }
            },
            loadCustomerName() {
                let _this = this;
//                console.log(_this.addForm);
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/common/findAllCustomerInfo'
                }).then((res) => {
                    if (res.code === 200) {
                        for (var i = 0; i < res.result.length; i++) {
                            _this.optionss.push({value: res.result[i].customerCode, label: res.result[i].customerName});
                        }
//                        console.log(_this.optionss);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
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
                if (this.$route.query.type === 'edit') {
                    if (this.editGroupForm.address.length > 1) {
                        this.editType();
                    } else {
                        // this.$xeMessageBox('请重新选择地址');
                        this.$alert('请重新选择地址', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                } else {
                    if (this.editGroupForm.address.length > 1) {
                        this.addType();
                    } else {
                        // this.$xeMessageBox('请选择地址');
                        this.$alert('请选择地址', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }
            },
            editType() { // 名称 type发生变化  会新增一列  编辑时传id addType不用
                let _this = this;
                _this.addForm.contactId = this.recordId;
                _this.addForm.detailAddress = _this.editGroupForm.address;
                console.log('_this.defaultData---->>', _this.addForm);
                _this.addForm.purpose = _this.addForm.resetPurpose.sort().join(',');
                _this.$http({
                    method: 'POST',
                    url: `/page/csc/cscReceive/main/updateReceivById/${this.recordId}`,
                    data: _this.addForm
                }).then((res) => {
                    if (res.result) {
                        // this.$xeMessage('修改成功');
                        this.formSure = true;
                        setTimeout(function () {
                            _this.$router.go(-1);
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            addType() {
                let _this = this;
                let dataobj = JSON.parse(JSON.stringify(_this.addForm));
                dataobj.purpose = _this.addForm.resetPurpose.sort().join(',');
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/Add/addReceive',
                    data: dataobj
                }).then((res) => {
                    if (res.result) {
                        // this.$xeMessage('添加成功');
                        this.formSure = true;
                        setTimeout(function () {
                            _this.$router.go(-1);
                        }, 1000);
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$alert('服务器异常', '错误', {
                    //     confirmButtonText: '确定',
                    //     type: 'error'
                    // });
                });
            },
            backBtnClick() {
                this.$router.go(-1);
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
            queryEditDataFn(datas) {  // 四级联动地址
                let _this = this;
                let param = {};
                datas.province ? param.province = {
                    code: datas.province,
                    keyword: 'province',
                    title: datas.provinceName
                } : null;
                datas.city ? param.city = {
                    code: datas.city,
                    keyword: 'city',
                    title: datas.cityName
                } : null;
                datas.area ? param.district = {
                    code: datas.area,
                    keyword: 'area',
                    title: datas.areaName
                } : null;
                datas.street ? param.street = {
                    code: datas.street,
                    keyword: 'street',
                    title: datas.streetName
                } : null;
                _this.defaultData = param;
                _this.addresparam();
                console.log('_this.defaultData', _this.defaultData);
            },
            cityPickerEditSuccessCallback(val) {
                let _this = this;
                _this.editGroupForm.address = _this.formatGroupAddres(val);
                if (_this.editGroupForm.address.length > 1) {
                    _this.addForm.detailAddress = _this.editGroupForm.address;
                }
                console.log('this.editGroupForm.address', this.editGroupForm.address);
            }
        },
        components: {
            'city-picker': CityPicker
        }
    };

</script>
