<template lang="html">
    <div class="apply-cons">
        <!-- {{formData}} -->
        <el-form :model="formData" :rules="rules" ref="formData" label-width="100px" :inline="true" class="apply-formData">
            <div class="infor-baseApply">
                <div class="floor-apply">
                    <el-form-item label="企业性质" prop="venProperties" required>
                        <el-radio-group v-model="formData.venProperties">
                            <el-radio :label="1">公司企业</el-radio>
                            <el-radio :label="3">个体工商户</el-radio>
                            <el-radio :label="4">个人</el-radio>
                            <!-- <el-radio :label="9">其他</el-radio> -->
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="企业名称" prop="venName">
                        <el-input v-model="formData.venName" class="inp-apply" :maxlength="40"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply" v-if="formData.venProperties != 4">
                    <el-form-item label="营业执照号码" prop="businessNum">
                        <el-input v-model="formData.businessNum" class="inp-apply" :maxlength="18"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply" v-if="formData.venProperties != 4">
                    <el-form-item label="过期日期" prop="endDate" required>
                        <!-- :picker-options="pickerOptions0" -->
                        <el-date-picker
                            v-model="formData.endDate"
                            type="date"
                            :style="{width: '400px'}"
                            @change="datachangeFn"
                            :picker-options="pickerOptions"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="法定代表人" prop="legalPerson">
                        <el-input v-model="formData.legalPerson" class="inp-apply" :maxlength="15"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="法人身份证号" prop="legalPersonNum">
                        <el-input v-model="formData.legalPersonNum" class="inp-apply" :maxlength="18"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply for-itemlis">
                    <el-form-item label=" ">
                        <div class="item-uploadImg_box2 clearfix" v-loading='loadingUploadImg'>
                            <ol class="fl up-active" v-if="formData.venProperties != 4">
                                <li class="up-imgLI">
                                    <img v-if="formData.businessPic" :src="picServer + formData.businessPic" alt="营业执照副本">
                                </li>
                                <li class="up-slotTips">营业执照副本</li>
                                <li class="uploadImg-btn">
                                    <div :class="['tipsCover', {'opacity0': uploadBtnFlag1}]">
                                        <span class="iconfont icon-upload2"></span>
                                        <p>上传文件</p>
                                    </div>
                                    <form name='form1' id='formFile1'>
                                        <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile1", 1)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </li>
                            </ol>
                            <ol class="fl up-active">
                                <li class="up-imgLI">
                                    <img v-if="formData.idcardPic" :src="picServer + formData.idcardPic" alt="身份证（正面）">
                                </li>
                                <li class="up-slotTips">身份证（正面）</li>
                                <li class="uploadImg-btn">
                                    <div :class="['tipsCover', {'opacity0': uploadBtnFlag2}]">
                                        <span class="iconfont icon-upload2"></span>
                                        <p>上传文件</p>
                                    </div>
                                    <form name='form2' id='formFile2'>
                                        <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile2", 2)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </li>
                            </ol>
                            <ol class="fl up-active">
                                <!-- {{formData.idcardBackPic}} -->
                                <li class="up-imgLI">
                                    <img v-if="formData.idcardBackPic" :src="picServer + formData.idcardBackPic" alt="身份证（反面）">
                                </li>
                                <li class="up-slotTips">身份证（反面）</li>
                                <li class="uploadImg-btn">
                                    <div :class="['tipsCover', {'opacity0': uploadBtnFlag3}]">
                                        <span class="iconfont icon-upload2"></span>
                                        <p>上传文件</p>
                                    </div>
                                    <form name='form3' id='formFile3'>
                                        <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile3", 3)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </li>
                            </ol>
                            <ol class="fl up-active">
                                <li class="up-imgLI">
                                    <img v-if="formData.foodLicensePic" :src="picServer + formData.foodLicensePic" alt="食品许可证">
                                </li>
                                <li class="up-slotTips">食品许可证</li>
                                <li class="uploadImg-btn">
                                    <div :class="['tipsCover', {'opacity0': uploadBtnFlag4}]">
                                        <span class="iconfont icon-upload2"></span>
                                        <p>上传文件</p>
                                    </div>
                                    <form name='form4' id='formFile4'>
                                        <input type="file" title="点击添加或修改图片" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn("formFile4", 4)' accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </li>
                            </ol>
                        </div>
                    </el-form-item>
                </div>
                <!-- {{formData.comType}} -->
                <div class="floor-apply">
                    <el-form-item label="企业类型" prop="comType" required>
                        <!-- 3：生产加工厂4：代理商 5：品牌商6：经销商7：进出口贸易8：协会合作社 -->
                        <el-radio-group v-model="formData.comType">
                            <el-radio :label="3">生产加工厂</el-radio>
                            <el-radio :label="4">代理商</el-radio>
                            <el-radio :label="5">品牌商</el-radio>
                            <el-radio :label="6">经销商</el-radio>
                            <el-radio :label="7">进出口贸易</el-radio>
                            <el-radio :label="8">协会合作社</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <!-- {{businessTypes}} -->
                <!-- {{formData.businessTypeNames}} -->
                <div class="floor-apply">
                    <el-form-item label="主营类型" prop="businessTypeNames">
                        <el-checkbox-group v-model="formData.businessTypeNames" @change="handleCateNameChange">
                            <template v-for="item in categoryList">
                                <el-checkbox :label="item.cateName" name="businessType" :value="item.cateId" :key="item.cateId">{{item.cateName}}</el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <!-- {{formData.formProCitys}} -->
                <div class="floor-apply">
                    <el-form-item prop="formProCitys" label="企业所在地">
                        <el-cascader
                            class="xe-input-col1 fl"
                            :options="provinceList2"
                            v-model='formData.formProCitys'
                            @active-item-change="areaItemchange"
                            @change="valChange"
                            :style="{'width': '400px'}"
                            :props="{label: 'areaName', value: 'areaId', children: 'cities'}">
                        </el-cascader>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="详细地址" prop="venAddr">
                        <el-input v-model="formData.venAddr" class="inp-apply"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply floor-areaSelect">
                    <!-- {{formData.areaId}} -->
                    <el-form-item label="商品销售区域" prop="areaId" required>
                        <el-select v-model="formData.areaId" multiple placeholder="请选择销售区域" class="multip-select" :disabled="formData.areaFlag">
                            <el-option
                                v-for="item in provinceList"
                                :label="item.areaName"
                                :key="item.areaId"
                                :value="item.areaId">
                            </el-option>
                        </el-select>
                        &nbsp;
                        <el-checkbox :label="true" @change="changeFlag" name="areaId" v-model="formData.areaFlag" style="line-height: 36px;">全国</el-checkbox>
                    </el-form-item>
                </div>
                <!-- formData.payTypes: {{formData.payTypes}} -->
                <div class="floor-apply">
                    <el-form-item label="支持付款方式" prop="payTypes">
                        <el-checkbox-group v-model="formData.payTypes">
                            <el-checkbox :label="1" name="payTypes">在线支付</el-checkbox>
                            <el-checkbox :label="2" name="payTypes">货到付款</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="店铺名称" prop="shopName" required>
                        <el-input v-model="formData.shopName" class="inp-apply" :maxlength="30"></el-input>
                    </el-form-item>
                </div>
            </div>
            <div class="inf-Merchant">
                <h5>商户联系人信息</h5>
                <div class="floor-apply">
                    <el-form-item label="联系人姓名" prop="userName">
                        <el-input v-model="formData.userName" class="inp-apply"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="联系人手机" prop="userPhone">
                        <el-input v-model="formData.userPhone" class="inp-apply" :maxlength="11"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="验证码" prop="verifyCode">
                        <el-input v-model="formData.verifyCode" :style="{'width': '280px', 'vertical-align': 'middle'}" :maxlength="6">
                        </el-input><el-button class="btn-apply btn-gray" :disabled="disabled" @click="getMsg" id="msgBtn">
                            获取验证码
                        </el-button>
                    </el-form-item>
                </div>
                <div class="floor-apply">
                    <el-form-item label="联系人邮箱" prop="userEmail">
                        <el-input v-model="formData.userEmail" class="inp-apply"></el-input>
                    </el-form-item>
                </div>
                <div class="floor-apply c-next">
                    <el-form-item label=" ">
                        <el-button type="primary" @click="formSubmit('formData')" :disabled="nextDisabled">
                            提交申请
                        </el-button><el-button @click="cancle()">
                            取消
                        </el-button>
                    </el-form-item>
                </div>
            </div>
		</el-form>
    </div>
</template>

<script>
import {getNowCookie, resetUserInfoCookie} from 'utils/commonBase';
export default {
    name: 'applyData',
    beforeRouteEnter(to, from, next) {
        let nowCookie = getNowCookie();
        let userInfo = nowCookie.userInfo;
        console.log('userInfo', userInfo);
        switch (userInfo.code) {
            case 1 :
                // 待审核
                next({
                    name: 'applyResult',
                    params: {
                        typeId: 1
                    }
                });
                break;
            case 2 :
                // 审核通过
                next({
                    name: 'applyResult',
                    params: {
                        typeId: 2
                    }
                });
                break;
            case 3 :
                // 驳回
                next();
                break;
            case 4 :
                // 已签订
                next({
                    name: 'index'
                });
                break;
            case 6 :
                // 已同意网络食品安全建议承诺书
                next();
                break;
            default :
                // 未入住
                next();
        }
    },
    data() {
        let checkCertificates = (rule, value, callback) => {
            // if (value.length !== 18) {
            //     callback(new Error('请输入18位有效证件号码'));
            //     return false;
            // } else {
            var reg = /^[0-9A-Za-z]{18}\d*$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('请输入18位有效证件号码'));
            } else {
                callback();
            }
            // }
        };
        let checkId = (rule, value, callback) => {
            var reg = /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('请输入正确的身份证号码'));
            } else {
                callback();
            }
        };
        let checkChinese = (rule, value, callback) => {
            var reg = /^[\u4e00-\u9fa5]{0,}$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('该选项只能填写汉字，请核对信息后填写'));
            } else {
                callback();
            }
        };
        let checkBoxlength = (rule, value, callback) => {
            if (value.length > 3) {
                callback(new Error('主营类型最多选择3项'));
            } else {
                callback();
            }
        };
        let checkPhone = (rule, value, callback) => {
            var reg = /^1[3,4,5,7,8]\d{9}$/;
            var res = reg.test(value);
            if (!res) {
                callback(new Error('请输入正确的手机号码'));
                this.phoneFlag = false;
            } else {
                this.phoneFlag = true;
                callback();
            }
        };
        let checkareaId = (rule, value, callback) => {
            console.log('test', this.formData.areaId);
            if (!this.formData.areaId.length && !this.formData.areaFlag) {
                callback(new Error('请选择商品销售区域'));
            } else {
                callback();
            }
        };
        let validateName = (rule, value, callback) => { // 校验仓库名已存在
            if (value === '') {
                callback(new Error('请输入店铺名称'));
                return;
            };
            let params = {};
            params.shopName = value;
            // params.storeId = this.$route.query.storeId;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/xeveninfo/shopNameCheck',
                data: params
            }).then((res) => {
                if (res.data.remote && res.data.remote.status !== '0000') {
                    callback(new Error(res.data.remote.msg));
                } else {
                    callback();
                }
            }).catch((error) => {
                console.log(error);
            });
        };
        return {
            nextDisabled: false,
            disabled: false,
            phoneFlag: false,
            picServer: '',
            userInfo: '',
            commitUrl: '/xe-route/xe-erp/xeveninfo/merchantsSettled',
            formData: {
                venProperties: 1, // 企业性质 1：公司企业 3：个体工商户 4:个人 9：其他性质
                venName: '', // 企业名称
                businessNum: '', // 营业执照号
                endDate: '', // 营业执照过期日期
                legalPerson: '', // 法人代表
                legalPersonNum: '', // 法人身份证号
                businessPic: '', // 营业执照图片url
                idcardPic: '', // 身份证正面图片url
                idcardBackPic: '', // 身份证反面图片url
                foodLicensePic: '', // 食品许可证图片url
                comType: 3, // 企业类型 3：生产加工厂4：代理商 5：品牌商6：经销商7：进出口贸易8：协会合作社
                businessType: '', // 主营类型（用逗号分割存储） 1肉禽蛋类 2海鲜水产 一级分类
                businessTypes: [],
                businessTypeName: '', // 主营类型（用逗号分割存储） 为平台一级分类name
                businessTypeNames: [],
                provinceId: 1, // 企业所在地省id
                cityId: 2, // 企业所在地市id
                venAddr: '', // 企业所在地详细地址
                areaId: [], // 商品销售区域id 多个id 用，分割
                payType: 3, // 支付方式 1 在线支付 2 货到付款 3 都支持
                payTypes: [1, 2],
                shopName: '', // 店铺名称
                userName: '', // 联系人名称
                userPhone: '', // 联系人手机号
                userEmail: '', // 联系人邮箱
                formProCitys: [],
                areaFlag: false,
                verifyCode: ''
                // resource: '',
                // desc: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            provinceList: [],
            provinceList2: [],
            loadingUploadImg: false,
            categoryList: [],
            rules: {
                venName: [
                    {required: true, message: '请输入企业名称', trigger: 'blur'}
                ],
                businessNum: [
                    {required: true, message: '该证件不能为空', trigger: 'blur'},
                    {validator: checkCertificates, trigger: 'blur'}
                ],
                endDate: [
                    {required: true, message: '请选择过期日期', trigger: 'change'}
                ],
                legalPerson: [
                    {required: true, message: '法定代表人不能为空', trigger: 'blur'},
                    {validator: checkChinese, trigger: 'blur'}
                ],
                legalPersonNum: [
                    {required: true, message: '该证件不能为空', trigger: 'blur'},
                    {validator: checkId, trigger: 'blur'}
                ],
                businessTypeNames: [
                    {type: 'array', required: true, message: '请至少选择一个主营类型', trigger: 'change'},
                    {validator: checkBoxlength, trigger: 'change'}
                ],
                formProCitys: [
                    {type: 'array', required: true, message: '请选择企业所在地', trigger: 'change'}
                ],
                venAddr: [
                    {required: true, message: '请选择详细地址', trigger: 'change'}
                ],
                areaId: [
                    {validator: checkareaId, trigger: 'change'}
                ],
                areaFlag: [
                    {validator: checkareaId, trigger: 'change'}
                ],
                payTypes: [
                    {type: 'array', required: true, message: '请选择支持付款方式', trigger: 'change'}
                ],
                shopName: [
                    {validator: validateName, trigger: 'blur'}
                    // {required: true, message: '请输入店铺名称', trigger: 'blur'}
                ],
                userName: [
                    {required: true, message: '请输入联系人姓名', trigger: 'blur'}
                ],
                userPhone: [
                    {required: true, message: '请输入手机号码', trigger: 'blur'},
                    {validator: checkPhone, trigger: 'blur'}
                ],
                userEmail: [
                    {type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                ],
                verifyCode: [
                    {required: true, message: '请输入手机验证码', trigger: 'blur'}
                ]
            }
        };
    },
    created() {
        this.loadClassfy();
        this.loadArea(0);
        let nowCookie = getNowCookie();
        this.userInfo = nowCookie.userInfo.code;
        console.log('test', nowCookie.userInfo.code);
        if (this.userInfo === 3) {
            this.loadInf();
            this.commitUrl = '/xe-route/xe-erp/xeveninfo/updateMerchants';
        }
    },
    methods: {
        formSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.formData.venProperties === 4) {
                        if (!this.formData.idcardPic || !this.formData.idcardBackPic || !this.formData.foodLicensePic) {
                            this.$xeMessage.warning('请上传图片');
                            return false;
                        }
                        this.$set(this.formData, 'businessNum', '');
                        this.$set(this.formData, 'endDate', '');
                        this.$set(this.formData, 'businessPic', '');
                    } else {
                        if (!this.formData.businessPic || !this.formData.idcardPic || !this.formData.idcardBackPic || !this.formData.foodLicensePic) {
                            this.$xeMessage.warning('请上传图片');
                            return false;
                        }
                    }
                    if (this.formData.areaFlag) {
                        this.formData.areaId = [0];
                    }
                    this.nextDisabled = true;
                    this.$http({ // submit
                        method: 'post',
                        url: this.commitUrl,
                        data: this.formData
                    }).then((res) => {
                        console.log('success');
                        this.nextDisabled = false;
                        this.$xeMessage.success(res.msg);
                        resetUserInfoCookie({code: 1});
                        this.$router.push({name: 'applyResult'});
                    }).catch((error) => {
                        this.nextDisabled = false;
                        this.$xeMessage.error(error.msg);
                    });
                } else {
                    return false;
                }
            });
        },
        cancle() {
            if (this.userInfo === 3) {
                this.$router.push({name: 'applyResult'});
            } else {
                this.$router.go(-1);
            }
        },
        datachangeFn(val) {
            console.log(val);
            this.formData.endDate = val;
        },
        inputFile2Fn(id, imgType) {
            this.loadingUploadImg = true;
            var formDatas = new FormData(document.getElementById(id));
            formDatas.append('fileType', 3);
            this.$http({
                method: 'post',
                url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                data: formDatas
            }).then(res => {
                console.log(res);
                this.loadingUploadImg = false;
                this.picServer = res.data.picServer;
                switch (imgType) {
                    case 1: {
                        this.formData.businessPic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 2: {
                        this.formData.idcardPic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 3: {
                        this.formData.idcardBackPic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                    case 4: {
                        this.formData.foodLicensePic = res.data.imgInfoList[0].imgName;
                        break;
                    }
                }
            }).catch(error => {
                this.loadingUploadImg = false;
                console.log(error);
            });
        },
        getMsg() {
            var _this = this;
            this.$refs.formData.validateField('userPhone');
            if (this.phoneFlag) {
                this.disabled = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeveninfo/sendSms',
                    data: {
                        userPhone: this.formData.userPhone
                    }
                }).then(res => {
                    console.log('test');
                    this.$xeMessage.success(res.data.msg);
                    let count = 120;
                    $('#msgBtn span').html('120s');
                    let msgTimer = setInterval(() => {
                        count--;
                        $('#msgBtn span').html(count + 's');
                        if (count === 0) {
                            clearInterval(msgTimer);
                            _this.disabled = false;
                            $('#msgBtn span').html('获取验证码');
                            console.log('test');
                        }
                    }, 1000);
                }).catch(error => {
                    console.log(error);
                    this.disabled = false;
                });
            }
        },
        handleCateNameChange(val) {
            this.formData.businessTypeNames = val;
            let businessTypeArr = [];
            if (val.length > 3) {
                val = val.slice(0, 3);
                this.formData.businessTypeNames = val.slice(0, 3);
                this.$xeMessage.warning('主营类型最多选择3项');
            }
            if (val.length) {
                for (var i = 0; i < val.length; i++) {
                    this.categoryList.some(item => {
                        if (item.cateName === val[i]) {
                            businessTypeArr.push(item.cateId);
                            return true;
                        }
                    });
                }
            };
            this.formData.businessTypes = businessTypeArr;
        },
        areaItemchange(val) {
            console.log('active item:', val);
            let flag = false;
            this.provinceList.some(item => {
                if (item.areaId === val[0] && !item.cities.length) {
                    flag = true;
                    return true;
                }
            });
            if (flag) {
                this.queryAreaListByParent(val[0], (dataList) => {
                    this.provinceList.some(item => {
                        if (item.areaId === val[0]) {
                            item.cities = dataList;
                            return true;
                        }
                    });
                });
            }
        },
        valChange(val) {
            this.formData.provinceId = val[0];
            this.formData.cityId = val[1];
        },
        queryAreaListByParent(id, fn) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/xeveninfo/getArea',
                data: {
                    areaId: id
                }
            }).then(res => {
                fn && fn(res.data.areaList);
            }).catch(error => {
                console.log(error);
            });
        },
        loadArea(id) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/xeveninfo/getArea',
                data: {
                    areaId: id
                }
            }).then(res => {
                console.log(res);
                this.provinceList = res.data.areaList;
                this.provinceList2 = res.data.areaList;
                // console.log('provinceList2', this.provinceList2);
                this.provinceList2.forEach(item => {
                    this.$set(item, 'cities', []);
                });
            }).catch(error => {
                console.log(error);
            });
        },
        loadClassfy() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/xeveninfo/getCategory'
            }).then(res => {
                // console.log(res.data.xeVenInfo);
                this.$set(this, 'categoryList', res.data.categoryList);
            }).catch(error => {
                console.log(error);
            });
        },
        loadpayTypes(val) {
            let outPut = [];
            if (val === 3) {
                outPut = [1, 2];
            } else if (val === 0) {
                outPut = [];
            } else {
                outPut = [val];
            }
            // console.log('outPut', outPut);
            return outPut;
        },
        changeFlag() {
            this.$refs.formData.validateField('areaId');
        },
        loadInf() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/xeveninfo/getMerchantsInfo'
            }).then(res => {
                console.log(res.data.xeVenInfo);
                this.formData = res.data.xeVenInfo;
                this.$set(this.formData, 'businessTypeNames', this.formData.businessTypeName.split(','));
                // console.log('testareaid', this.formData.areaId[0] === 0);
                if (this.formData.areaId[0] === 0) {
                    this.$set(this.formData, 'areaId', []);
                    this.$set(this.formData, 'areaFlag', true);
                } else {
                    this.$set(this.formData, 'areaFlag', false);
                }
                this.$set(this.formData, 'businessTypes', this.formData.businessType.split(','));
                console.log('businessTypes', this.formData.businessTypes);
                let uniqueObj = {};
                this.categoryList.forEach(item => {
                    // statements
                    uniqueObj[item.cateId] = 1;
                });
                console.log('uniqueObj', uniqueObj);
                for (var i = 0; i < this.formData.businessTypes.length; i++) {
                    console.log('this.formData.businessTypes[i]', this.formData.businessTypes[i]);
                    if (!uniqueObj[this.formData.businessTypes[i]]) {
                        this.formData.businessTypes.splice(i, 1);
                        this.formData.businessTypeNames.splice(i, 1);
                        i--;
                    }
                }
                console.log('this.formData.businessTypes', this.formData.businessTypes);
                // 回显企业所在地
                this.provinceList2.some(item => {
                    if (item.areaId === this.formData.provinceId) {
                        this.queryAreaListByParent(item.areaId, (dataList) => {
                            item.cities = dataList;
                            return true;
                        });
                    }
                });
                this.picServer = res.data.picServer;
                if (this.formData.venProperties === 4) {
                    this.$set(this.formData, 'businessPic', '');
                };
                this.$set(this.formData, 'payTypes', this.loadpayTypes(this.formData.payType));
                this.formData.formProCitys = [this.formData.provinceId, this.formData.cityId];
            }).catch(error => {
                console.log(error);
            });
        }
    },
    watch: {
        'formData.businessTypes'(val) {
            // console.log('businessTypes', val);
            this.formData.businessType = val.join(',');
        },
        'formData.businessTypeNames'(val) {
            this.formData.businessTypeName = val.join(',');
        },
        'formData.payTypes'(val) {
            console.log('payTypes', val);
            if (val === null || val === 'undefined' || val.length === 0) {
                this.formData.payType = 0;
            } else if (val.length === 2) {
                this.formData.payType = 3;
            } else {
                this.formData.payType = val[0];
            }
            // }
        },
        'formData.payType'(val) {
            // console.log('payType', val);
            if (val === 3) {
                this.formData.payTypes = [1, 2];
            } else if (val === 0) {
                this.formData.payTypes = [];
            } else {
                this.formData.payTypes = [val];
            }
        }
    },
    computed: {
        uploadBtnFlag1() {
            let businessPicFlag = true;
            if (this.formData.businessPic !== '') {
                businessPicFlag = true;
            } else {
                businessPicFlag = false;
            }
            return businessPicFlag;
        },
        uploadBtnFlag2() {
            let idcardFlag = true;
            if (this.formData.idcardPic !== '') {
                idcardFlag = true;
            } else {
                idcardFlag = false;
            }
            // console.log(idcardFlag);
            return idcardFlag;
        },
        uploadBtnFlag3() {
            let dcardBackPicFlag = true;
            if (this.formData.idcardBackPic !== '') {
                dcardBackPicFlag = true;
            } else {
                dcardBackPicFlag = false;
            }
            // console.log(dcardBackPicFlag);
            return dcardBackPicFlag;
        },
        uploadBtnFlag4() {
            let foodLicensePicFlag = true;
            if (this.formData.foodLicensePic !== '') {
                foodLicensePicFlag = true;
            } else {
                foodLicensePicFlag = false;
            }
            // console.log(foodLicensePicFlag);
            return foodLicensePicFlag;
        }
    }
};
</script>

<style lang="scss">
</style>
