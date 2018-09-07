<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>客户档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="roleForm" :rules="rules" ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    新增客户档案
                </p>
            </div>
            <div>
                <el-form-item label="类型">
                    <el-radio-group v-model="roleForm.type">
                        <el-radio :label="1">企业公司</el-radio>
                        <el-radio :label="2">个人</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="公司名称" required prop="customerName">
                    <el-input v-model="roleForm.customerName" class="xe-input-col3"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="所属集团" prop="cliquesSerialNo">
                    <el-select v-model="roleForm.cliquesSerialNo" filterable placeholder="请选择" class="xe-input-col3">
                        <el-option
                                v-for="item in cliqueOption"
                                :label="item.name"
                                :value="item.serialNo">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="基本情况" prop="customerSynopsis">
                    <el-input type="textarea" v-model="roleForm.customerSynopsis" class="xe-input-col3"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="渠道" prop="channel">
                    <el-select v-model="roleForm.channel" filterable placeholder="请选择" class="xe-input-col3">
                        <el-option
                            v-for="item in statusOption"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="产品类别" prop="productType">
                    <el-checkbox-group v-model="roleForm.productType">
                        <el-checkbox v-for="typeItem in productTypeList" :label="typeItem.key">{{typeItem.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="产品" prop="product">
                    <el-input v-model="roleForm.product" class="xe-input-col3"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="温度需求" prop="temperature">
                    <el-checkbox-group v-model="roleForm.temperature">
                        <el-checkbox v-for="demandTemp in temperatureList" :label="demandTemp.key">{{demandTemp.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="车辆需求" prop="models">
                    <el-checkbox-group v-model="roleForm.models">
                        <el-checkbox v-for="demandCar in modelsList" :label="demandCar.key">{{demandCar.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="发货区域" prop="deliveryArea">
                    <el-input v-model="roleForm.deliveryArea" class="xe-input-col3"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="合作业务" prop="business">
                    <el-checkbox-group v-model="roleForm.business">
                        <el-checkbox v-for="businessTeamwork in businessList" :label="businessTeamwork.key">{{businessTeamwork.value}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="税务登记证">
                    <el-upload
                            name="img_1"
                            id="img_1"
                            class="upload-demo"
                            drag
                            :headers="headers"
                            action="/page/csc/customer/common/uploadImg"
                            :on-preview="handlePreview"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove1"
                            :on-success="handleSuccess1"
                            :file-list="fileList" list-type="picture"
                            mutiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="其他资料">
                    <el-upload
                            name="img_2"
                            id="img_2"
                            class="upload-demo"
                            drag
                            :headers="headers"
                            action="/page/csc/customer/common/uploadImg"
                            :on-preview="handlePreview"
                            :before-upload="beforeAvatarUpload"
                            :on-remove="handleRemove2"
                            :on-success="handleSuccess2"
                            :file-list="fileList" list-type="picture"
                            mutiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text" >将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
            </div>
            <div class="xe-page-header">
                <p>
                    开票信息
                </p>
            </div>
            <div>
                <el-form-item label="开户银行" prop="accountBank">
                    <el-input v-model="roleForm.accountBank" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="账号" prop="bankAccount">
                    <el-input v-model="roleForm.bankAccount" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="开户名称" prop="accountName">
                    <el-input v-model="roleForm.accountName" class="xe-input-col2"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label="纳税人识别号" prop="taxpayerIdentityNum">
                    <el-input v-model="roleForm.taxpayerIdentityNum" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="billingAddress">
                    <el-input v-model="roleForm.billingAddress" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="电话" prop="billingPhone">
                    <el-input v-model="roleForm.billingPhone" class="xe-input-col2"></el-input>
                </el-form-item>
            </div>
            <div class="xe-page-header">
                <p>
                    联系人信息
                </p>
            </div>
            <div>
                <el-form-item label="联系人" prop="contact">
                    <el-input v-model="roleForm.contact" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="contactPhone">
                    <el-input v-model="roleForm.contactPhone" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="部门职务" prop="departmentJob">
                    <el-input v-model="roleForm.departmentJob" class="xe-input-col2"></el-input>
                </el-form-item>
            </div>
            <div class="depositBank">
                <el-form-item label="通讯地址" prop="phoneAddress">
                    <el-input v-model="roleForm.phoneAddress" class="xe-input-col2"></el-input>
                </el-form-item>
            </div>
            <div class="depositBank zq-bank" >
                <el-form-item label="客户经理" prop="customerManager">
                    <el-input v-model="roleForm.customerManager" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="managerPhone">
                    <el-input v-model="roleForm.managerPhone" class="xe-input-col2"></el-input>
                </el-form-item>
            </div>
            <div class="zq-rutn">
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitForm('roleForm')">保存</el-button>
                    <el-button @click="backBtnClick()">返回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<style>
    .depositBank{
        border-bottom: 1px solid #dddddd;
    }
    .zq-bank{
        margin-top:20px;
    }
    .zq-rutn{
        margin-top:25px;
    }
    .el-upload-dragger .el-icon-upload{
        font-size:67px!important;
    }
</style>
<script>
import { getNowCookie } from 'xcms-common-plugins/src/utils/';
export default {
    data() {
        var checkCompanyPhone = (rule, value, callback) => {
            if (value !== '' && value !== null) {
                var reg = /(^1\d{10}$|^(0\d{2,3}-?|0\d2,3)?[1-9]\d{4,7}(-\d{1,8})?$)/;
                var val = reg.test(value);
                if (val !== true) {
                    callback(new Error('请正确填写您的联系电话'));
                } else {
                    callback();
                }
            } else {
                callback();
            }
        };
        return {
            roleForm: {
                type: 2,
                clique: '',
                accountBank: '',
                accountName: '',
                bankAccount: '',
                billingPhone: '',
                contactPhone: '',
                managerPhone: '',
                taxpayerIdentityNum: '',
                departmentJob: '',
                billingAddress: '',
                phoneAddress: '',
                contact: '',
                name: '',
                desc: '',
                channel: '',
                productType: [],
                product: '',
                need: [],
                vehicle: [],
                deliver: [],
                cooperation: [],
                customerName: '',
                temperature: [],
                models: [],
                business: [],
                cliquesSerialNo: ''
            },
            picerr: false,
            cliqueOption: [],
            fileList: [],
            rules: {
                customerName: [
                    { required: true, message: '请输入公司名称', trigger: 'blur' },
                    { max: 100, message: '长度在 100个字符以内', trigger: 'blur' }
                ],
                channel: [
                    { required: true, message: '请选择渠道', trigger: 'change' }
                ],
                productType: [
                    { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                ],
                managerPhone: [
                    { validator: checkCompanyPhone, trigger: 'blur' }
                ],
                billingPhone: [
                    { validator: checkCompanyPhone, trigger: 'blur' }
                ],
                contactPhone: [
                    { validator: checkCompanyPhone, trigger: 'blur' }
                ]
            },
            headers: {
                Authorization: 'Bearer ' + getNowCookie().token
            },
            productTypeList: [],
            statusOption: [],
            temperatureList: [],
            modelsList: [],
            businessList: []
        };
    },
    created() {
        this.queryAllClique();
        this.queryProductType();
        this.queryChannel();
        this.queryTemperatureList();
        this.queryVoitureList();
        this.querybusinessList();
    },
    methods: {
        handlePreview(val) {
            console.log(val);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg' || 'png';
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isJPG) {
                this.$alert('上传图片只能是 JPG、png 格式!', '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
                this.picerr = true;
            }
            if (!isLt2M) {
                this.$alert('上传图片大小不能超过 5MB!', '错误', {
                    confirmButtonText: '确定',
                    type: 'error'
                });
                this.picerr = true;
            }
            return isJPG && isLt2M;
        },
        handleRemove1() {
            if (!this.picerr) {
                this.delePic(this.roleForm.imgSerialNo, 1, () => {
                    this.roleForm.imgSerialNo = '';
                    this.roleForm.img = '';
                    this.roleForm.imgName = '';
                });
            }
        },
        handleSuccess1(response, file, fileList) {
            let _this = this;
            let id = response.result;
            file.id = id;
            _this.roleForm.imgSerialNo = id;
            if (fileList.length > 1) {
                fileList.splice(0, 1);
            }
        },
        handleRemove2() {
            if (!this.picerr) {
                this.delePic(this.roleForm.imgOatherSerialNo, 2, () => {
                    this.roleForm.imgOatherSerialNo = '';
                    this.roleForm.imgOather = '';
                    this.roleForm.imgOatherName = '';
                });
            }
        },
        handleSuccess2(response, file, fileList) {
            let _this = this;
            let id = response.result;
            file.id = id;
            _this.roleForm.imgOatherSerialNo = id;
            if (fileList.length > 1) {
                fileList.splice(0, 1);
            }
        },
        delePic(id, indexs, cb) {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: `/page/csc/customer/common/deleteImg/${id}/${this.custoId}/${indexs}`
            }).then((res) => {
                if (res.success === true) {
                    console.log('删除图片成功');
                    cb & cb();
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        queryTemperatureList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/findCsTemperature'
            }).then((res) => {
                console.log(res);
                _this.temperatureList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        queryVoitureList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/findCsModelsType'
            }).then((res) => {
                console.log(res);
                _this.modelsList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        querybusinessList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/findCsBusinessType'
            }).then((res) => {
                console.log(res);
                _this.businessList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        queryProductType() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/findCsProductType'
            }).then((res) => {
                _this.productTypeList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        queryChannel() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/findCsChannelType'
            }).then((res) => {
                _this.statusOption = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        queryAllClique() {
            let _this = this;
            let param = {};
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/queryAllClique',
                data: param
            }).then((res) => {
                _this.cliqueOption = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        submitForm(formName) {
            let _this = this;
            console.log(_this.roleForm.productType);
            let productTypeStr = '';
            let temperatureStr = '';
            let cooperationStr = '';
            let vehicleStr = '';
            var param = {};
            for (let key in _this.roleForm) {
                param[key] = _this.roleForm[key];
            }
            let arr = Array.prototype.slice.call(param.productType);
            let arrTemperature = Array.prototype.slice.call(param.temperature);
            let arrVehicle = Array.prototype.slice.call(param.models);
            let arrCooperation = Array.prototype.slice.call(param.business);
            cooperationStr = arrCooperation.join(',');
            productTypeStr = arr.join(',');
            temperatureStr = arrTemperature.join(',');
            vehicleStr = arrVehicle.join(',');
            param.productType = productTypeStr;
            param.temperature = temperatureStr;
            param.models = vehicleStr;
            param.business = cooperationStr;
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let _this = this;
                    _this.$http({
                        method: 'POST',
                        url: '/page/csc/customer/add/saveCscCustomer',
                        data: param
                    }).then((res) => {
                        this.$router.go(-1);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        backBtnClick() {
            this.$router.go(-1);
        }
    }
};
</script>
