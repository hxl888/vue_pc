<template lang="html">
    <div class="m-router-con rseGds-content">
        <!--基本信息-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">基本信息</div>
            </div>
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <el-tooltip class="item" effect="dark"   placement="top">
                        <div slot="content">{{auditetailsData.venInfo.venName}}</div>
                        <li class="list-show list-show1 fl" ><p class="lis_p ellipsisp">商户/企业名称：{{auditetailsData.venInfo.venName}}</p></li>
                    </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业类型：{{auditetailsData.venInfo.comType | comTypefiter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业性质：{{auditetailsData.venInfo.venProperties | venPropertiesfiter}}</p></li>
                     <li class="list-show list-show1 fl"><p class="lis_p ellipsis">主营类型：{{auditetailsData.venInfo.businessTypeName}}</p></li>
                     <el-tooltip class="item" effect="dark"  placement="top">
                        <div slot="content">{{auditetailsData.venInfo.detailAddr}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">企业注册地：{{auditetailsData.venInfo.detailAddr}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">入驻状态：{{auditetailsData.venInfo.venSatatus | venSatatusfiter}}</p></li>
                     <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">{{auditetailsData.venInfo.shopName}}</div>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺名称：{{auditetailsData.venInfo.shopName}}</p></li>
                     </el-tooltip>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">入驻时间：{{auditetailsData.venInfo.createDate, 'ms' | millisecondFormat}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺简码：&nbsp;&nbsp;{{auditetailsData.venInfo.venSimpleCode}}</p></li>
                    <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSatatus == 2"><p class="lis_p ellipsis">审核时间：{{auditetailsData.venInfo.auditDate, 'ms' | millisecondFormat}}</p></li>
                     <el-tooltip class="item" effect="dark" placement="top">
                         <div slot="content">{{auditetailsData.areaInfo}}</div>
                         <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品销售区域：{{auditetailsData.areaInfo}}</p></li>
                     </el-tooltip>
                     <li class="list-show list-show1 fl" v-if="auditetailsData.venInfo.venSatatus == 3"><p class="lis_p ellipsis">驳回时间：{{auditetailsData.venInfo.auditDate, 'ms' | millisecondFormat}}</p></li>
                     <el-tooltip class="item" effect="dark" placement="top" v-if="auditetailsData.venInfo.venSatatus == 3">
                        <div slot="content">{{auditetailsData.venInfo.venRejectReason.substr(0, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(50, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(100, 50)}}<br/>{{auditetailsData.venInfo.venRejectReason.substr(150, 50)}}</div>
                        <li class="list-show list-show1 fl" ><p class="lis_p ellipsis">驳回理由：{{auditetailsData.venInfo.venRejectReason}}</p></li>
                     </el-tooltip>
                </ul>
            </div>
        </div>
        <!--资质信息-->
        <div class="for-itemlis">
            <div class="item-head clearfix">
                <div class="fl item-tit">资质信息</div>
            </div>
            <div class="item-main-box martop10 clearfix">
                <div class="ulBox">
                    <div class="list-show infor-list fl clearfix" v-for="(item, index) in auditetailsData.infoAptitudeList">
                        <div class="fl infor-picshow" v-if="!item.idcardBack">
                            <a :href="picServer + item.apUrl" target="_blank">
                                <img :src="picServer + item.apUrl"  alt="" >
                            </a>
                        </div>
                        <div class="fl infor-picshow" v-else>
                            <a :href="picServer + item.apUrl" target="_blank">
                                <img :src="picServer + item.apUrl"  alt="" style="height: 50px">
                            </a>
                            <a v-if="item.idcardBack" :href="picServer + item.idcardBack" target="_blank">
                                <img :src="picServer + item.idcardBack"  alt=""  style="height: 50px">
                            </a>
                        </div>
                        <div class="fl infor-content">
                            <p class="ellipsis" v-if="item.apName">证件名称：{{item.apName}}</p>
                            <p class="ellipsis" v-if="item.apNum">证件号码：{{item.apNum}}</p>
                            <p class="ellipsis" v-if="item.endDate">过期日期：{{item.endDate == 1 ? '长期有效' : item.endDate }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <el-form :inline="true" class="resetForm02" :rules="rules" ref = "publicInformation" :model = "publicInformation" label-width = "93px">
            <!--对公账信息-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">对公账信息</div>
                </div>
                <div class="item-main-box martop10">
                    <div>
                        <el-form-item label="银行账户名" prop="bankAccName">
                            <el-input class = "xe-input-col3" :maxlength="50" v-model.trim="publicInformation.bankAccName" placeholder="请输入商银行账户名"></el-input>
                        </el-form-item>
                     </div>
                     <div>
                        <el-form-item label="银行账号" prop="bankAccCard">
                            <el-input  class = "xe-input-col3" :maxlength="30" @input.native="shelfLifeFn($event)"  v-model="publicInformation.bankAccCard" placeholder="请输入银行账号"></el-input>
                        </el-form-item>
                     </div>
                     <div>
                        <el-form-item label="开户行" prop="accBankCode">
                            <el-select v-model="publicInformation.accBankCode" placeholder="请输入开户行名称" class = "xe-input-col3" @change="accBankCodeSec">
                                <el-option
                                  v-for="(item, index) in inquiryBankData"
                                  :key="index"
                                  :label="item"
                                  :value="index">
                                </el-option>
                          </el-select>
                        </el-form-item>
                     </div>
                     <div>
                        <el-form-item label="开户支行名称" prop="subAccBank">
                            <el-input class = "xe-input-col3" @focus="bankBrancheck" v-model="publicInformation.subAccBank" placeholder="请输入商户开户支行名称"></el-input>
                        </el-form-item>
                     </div>
                </div>
            </div>
              <!--商户性质-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">商户性质 <span class="detal"> (审核需要对商户性质做出选择）</span></div>
                </div>
                <div class="item-main-box">
                    <div class="detial-lis">
                        {{auditetailsData.venInfo.venType | venTypefiter}}
                    </div>
                </div>
            </div>
            <!--联系人信息-->
            <div class="for-itemlis">
                 <div class="item-head clearfix">
                    <div class="fl item-tit">联系人信息</div>
                 </div>
                 <div class="item-main-box">
                        <div class="detial-lis"><span class="labels"> 名称：</span>{{auditetailsData.venInfo.userName}}</div>
                        <div class="detial-lis"><span class="labels">手机号：</span>{{auditetailsData.venInfo.userPhone}}</div>
                        <div class="detial-lis"><span class="labels">联系人邮箱：</span>{{auditetailsData.venInfo.userEmail}}</div>
                 </div>
            </div>
            <!--支付方式-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">支付方式 <span class="detal"> (审核时可对商户支付方式做修改维护）</span></div>
                </div>
                <div class="item-main-box">
                    <div class="detial-lis">
                        {{auditetailsData.venInfo.payType | payTypefiter}}
                    </div>
                </div>
            </div>
         <!--配送方式-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">配送方式 <span class="detal"></span></div>
                </div>
                <div class="item-main-box">
                    <ul class="detial-lis clearfix">
                        <li v-for="item in shipType" class="fl" style="margin-right: 10px">{{item.name}}</li>
                    </ul>
                </div>
            </div>
            <!--合同管理-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">合同管理</div>
                </div>
                <div class="item-main-box">
                    <div class="detial-lis clearfix">
                        <p class="labels fl">类型：</p>
                        <p class="fl">
                            <el-radio-group v-model="publicInformation.contractType">
                                <el-radio :label="1" >PDF</el-radio>
                                <el-radio :label="2">图片（JPG，PNG，JPEG）</el-radio>
                            </el-radio-group>
                        </p>
                    </div>
                    <div class="detial-lis admar10 clearfix">
                        <div class="labels fl">合同文件：</div>
                        <div class="fl" style="width: auto">
                            <!--上传PDF-->
                            <div class="item-uploadImg_box clearfix" v-loading='loadingUploadImg' v-if="publicInformation.contractType == 1">
                                <!--<span @click="hasClick = true">选择文件</span><i class="upload-des" style="padding-left: 20px"></i>-->
                                <!--<div class="el-form-item__error"  style="width: 100%;top: 70%;" v-if="packUrlError">请先上传安装包</div>-->
                                <!--<div style="word-break: break-all">{{publicInformation.contractUrls.length ? publicInformation.contractUrls.join(',') : ''}}</div>-->
                               <a style="color: #20a0ff;margin: 13px 0 0 15px;display: inline-block"  target="_blank" :href="publicInformation.contractUrls.length ? publicInformation.contractUrls.join(',') : ''">{{publicInformation.contractUrls.length ? publicInformation.contractUrls.join(',') : ''}}</a>
                                <div class="uploadImg-btn fl" v-if='uploadBtnFlag'>
                                    <span class="iconfont icon-xinzeng"></span>
                                     <form name='form' id='formFile'>
                                        <input type="hidden" name="data" v-model="fileTypepdf">
                                        <input type="file" name='file'  class='inputFile2' @change="inputFilePdf('formFile')" accept="application/pdf">
                                    </form>
                                </div>
                             </div>
                            <!--上传图片-->
                            <div class="item-uploadImg_box clearfix" v-loading='loadingUploadImg' v-if="publicInformation.contractType == 2">
                                <ul v-if='uploadImg2.length' class="fl" style="width: auto">
                                    <li v-for='(item, index) in uploadImg2Computed' :key='item' class="h-brand-img">
                                        <img :src="picServer + item.imgName" alt="">
                                        <span style="width: 100%" @click.prevent='removeImg(index)'>删除</span>
                                    </li>
                                </ul>
                                <div class="uploadImg-btn fl" v-if='uploadBtnFlag'>
                                    <span class="iconfont icon-xinzeng"></span>
                                    <form name='form2' id='formFile2'>
                                    <!--accept="image/gif,image/jpeg,image/jpg,image/png"-->
                                        <input type="hidden" name="fileType" v-model="fileType">
                                        <input type="file" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn' accept="image/gif,image/jpeg,image/jpg,image/png">
                                        <!--<input type="file" multiple name='imgFiles' v-else class='inputFile2' @change='inputFile2Fn' accept="application/pdf">-->
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                <!--button提交按钮-->
            <div class="form_sub_btn1">
                <el-button type="primary" :loading="loadingSub"  @click="submitForm('publicInformation')">签订</el-button>
                <el-button @click="goBack">返回</el-button>
            </div>
        </el-form>
        <!--分行弹框展示-->
        <el-dialog title="选择支行" :visible.sync="branchdilog" class="reset-dialog reset-dialog02">
            <bank-branch :accBankCode="publicInformation.accBankCode" :branchdilog.sync="branchdilog" @branchBankMsg="branchBankMsgshow" ></bank-branch>
        </el-dialog>
    </div>
</template>

<script>
import bankBranch from './bankBranch';
import permission from 'mixins/permission.js';
import filterIndex from 'mixins/index.js';
import allmethods from '@/filters';
export default {
    mixins: [permission, filterIndex],
    data() {
        return {
            loadingSub: false, // 提交button开关
            permissionObj: {},
            branchdilog: false,
            contract_type: '1',
            fileList: [],
            fileType: '3',
            fileTypepdf: "{dataType: 'cyMangerFile'}",
            picServer: '',
            publicInformation: {
                userCode: null,
                bankAccName: null,
                bankAccCard: null,
                accBank: null,
                branchCode: '',
                subAccBank: '',
                accBankCode: null,
                contractType: 2,
                contractUrls: [],
                version: null
            },
            shipType: [],
            inquiryBankData: [],
            loadingUploadImg: false,
            uploadBtnFlag: true,
            uploadImg2: [],
            auditetailsData: {
                areaInfo: '',
                contractList: {},
                infoAptitudeList: {},
                venInfo: {}
            },
            rules: {
                bankAccName: [
                    { required: true, message: '银行账户名不能为空' }
                ],
                bankAccCard: [
                    { required: true, message: '银行账号不能为空' }
                ],
                accBankCode: [
                    { required: true, message: '开户行名称不能为空', trigger: 'change' }
                ],
                subAccBank: [
                    { required: true, message: '开户支行名称不能为空', trigger: 'change' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.auditDetailsCk();
        this.inquiryBank();
    },
    methods: {
        shelfLifeFn(event) {
            event.target.value = event.target.value.replace(/[^\d]/g, '');
        },
        branchBankMsgshow(item) {
            this.publicInformation.subAccBank = item.branchName;
            this.publicInformation.branchCode = item.branchCode;
            this.branchdilog = false;
        },
        accBankCodeSec() {
            this.publicInformation.accBank = this.inquiryBankData[this.publicInformation.accBankCode];
//            this.banckBranSeach();
        },
        handlePreview(file) {
            console.log('file', file);
        },
        handleRemove() {},
        bankBrancheck() {
            if (this.publicInformation.accBank) {
                this.branchdilog = true;
            } else {
                this.$alert('请先选择开户行', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        handleSizeChange() {},
        handleCurrentChange() {},
        inquiryBank() {
            let _this = this;
            _this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/venmanager/queryVenBankInfo'
            }).then((res) => {
                if (res.data.remote && res.data.remote.status !== '0000') {
                } else {
                    let datas = res.data.bankMap;
                    if (datas) {
                        this.inquiryBankData = datas;
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        auditDetailsCk() {
            let userCode = this.$route.query.userCode;
            if (userCode) {
                this.publicInformation.userCode = userCode;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/queryVenDetail',
                    data: {
                        userCode: userCode
                    }
                }).then((res) => {
                    this.auditetailsData = res.data;
                    this.picServer = res.data.picServer;
                    if (this.auditetailsData.venInfo.bankAccCard) {
                        this.publicInformation.bankAccCard = parseInt(this.auditetailsData.venInfo.bankAccCard);
                    }
                    if (this.auditetailsData.venInfo.bankAccName) {
                        this.publicInformation.bankAccName = this.auditetailsData.venInfo.bankAccName;
                    }
                    if (this.auditetailsData.venInfo.branchCode) {
                        this.publicInformation.branchCode = this.auditetailsData.venInfo.branchCode;
                    }
                    if (this.auditetailsData.venInfo.subAccBank) {
                        this.publicInformation.subAccBank = this.auditetailsData.venInfo.subAccBank;
                    }
                    if (this.auditetailsData.venInfo.accBankCode) {
                        this.publicInformation.accBankCode = this.auditetailsData.venInfo.accBankCode;
                    }
                    if (this.auditetailsData.venInfo.shipType) {
                        if (this.auditetailsData.venInfo.shipType.indexOf(1) !== -1) {
                            if (this.auditetailsData.venInfo.appointCarFlag) {
                                this.shipType.push({name: `配送 ( ${allmethods.appointCarFlagfilter(this.auditetailsData.venInfo.appointCarFlag)} )`});
                            }
                        }
                        if (this.auditetailsData.venInfo.shipType.indexOf(2) !== -1) {
                            this.shipType.push({name: '委托自提'});
                        }
                        if (this.auditetailsData.venInfo.shipType.indexOf(3) !== -1) {
                            this.shipType.push({name: '到店自提'});
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$router.go(-1);
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.checkcontractType() && this.checkcontractlist()) {
                        this.MerchantSigning();
                    }
                } else {
                    return false;
                }
            });
        },
        checkcontractType() {
            if (!this.publicInformation.contractType) {
                this.$alert('没有勾选类型，请先勾选合同类型', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                return true;
            }
        },
        checkcontractlist() {
            let flag = false;
            if (this.publicInformation.contractType === 1) { // pdf
                if (this.publicInformation.contractUrls.length) {
                    flag = true;
                } else {
                    flag = false;
                }
            } else if (this.publicInformation.contractType === 2) { // 图片
                if (this.proImgs.length <= 0) {
                    flag = false;
                } else {
                    flag = true;
                }
            }
            if (!flag) {
                this.$alert('合同没有上传', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
                return false;
            } else {
                return true;
            }
//            if (this.proImgs.length <= 0) {
//                this.$alert('合同没有上传', '提示', {
//                    confirmButtonText: '确定',
//                    type: 'info'
//                });
//                return false;
//            } else {
//                return true;
//            }
        },
        MerchantSigning() { // 签订---
            let _this = this;
            let params = {};
            let flag = false;
            this.publicInformation.version = this.auditetailsData.venInfo.version;
            Object.assign(params, _this.publicInformation);
            if (this.publicInformation.contractType === 1) {
                params.contractUrls = this.publicInformation.contractUrls;
                if (this.publicInformation.contractUrls[0].indexOf('pdf') !== -1) {
                    flag = true;
                } else {
                    flag = false;
                }
            } else if (this.publicInformation.contractType === 2) {
                flag = true;
                params.contractUrls = this.proImgs;
            }
            if (flag) {
                this.loadingSub = true;
                _this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/updateVenSigned',
                    data: params
                }).then((res) => {
                    console.log(res);
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        this.loadingSub = false;
                        if (res.data.remote.msg) {
                            window.$wxeMessage({
                                type: 'error',
                                message: `${res.data.remote.msg}`
                            });
                        }
                    } else {
                        window.$wxeMessage({
                            type: 'success',
                            message: `签订成功`
                        });
                        this.goBack();
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$alert('合同不是pdf格式的，请重新上传', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        inputFile2Fn() {
            if (this.checkcontractType()) {
                this.loadingUploadImg = true;
                this.publicInformation.contractUrls = [];
                var formData = new FormData(document.getElementById('formFile2'));
                this.$http({
                    method: 'post',
                    url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                    data: formData
                }).then(res => {
                    console.log(res);
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        this.loadingUploadImg = false;
                        window.$wxeMessage({
                            type: 'error',
                            message: `${res.data.remote.msg}`
                        });
                    } else {
                        let imgInfoList = res.data.imgInfoList;
                        this.loadingUploadImg = false;
                        this.uploadImg2.push(...imgInfoList);
                    }
                }).catch(error => {
                    console.log(error);
                });
            }
        },
        inputFilePdf(id) {
            this.uploadImg2 = [];
            this.loadingUploadImg = true;
            this.publicInformation.contractUrls = [];
            var formData = new FormData(document.getElementById(id));
            this.$http({
                method: 'post',
                url: `/xe-zuul${this.productUrl}/manager/appversion/appUpload`,
                data: formData
            }).then(res => {
                this.loadingUploadImg = false;
                this.publicInformation.contractUrls[0] = JSON.parse(res.data.returnStr).reUrl[0];
            }).catch(error => {
                this.loadingUploadImg = false;
                console.log(error);
            });
        },
        removeImg(index) {
            this.uploadImg2Computed.splice(index, 1);
            this.uploadImg2.splice(index, 1);
        }
    },
    computed: {
        permissionFilter: {
            get() {
                return this.permissionDataList;
            },
            set(val) {
                console.log('按钮级别权限keys:' + JSON.stringify(val));
                if (val !== null) {
                    for (var key in val) {
                        this.$set(this.permissionObj, key, val[key].auth);
                    }
                }
            }
        },
        uploadImg2Computed() {
            return this.uploadImg2.slice(0, 10);
        },
        proImgs() {
            let result = [];
            if (this.uploadImg2Computed.length > 0) {
                this.uploadImg2Computed.forEach(item => {
                    result.push(item.imgName);
                });
                return result;
            } else {
                result = '';
            }
            return result;
        }
    },
    watch: {
        uploadImg2(val) {
            if (val.length >= 10) {
                this.uploadBtnFlag = false;
            } else {
                this.uploadBtnFlag = true;
            }
        }
    },
    components: {
        bankBranch
    }
};
</script>
