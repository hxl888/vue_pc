<template lang="html">
    <div class="m-router-con con-salesApply">
    <!-- formData:{{formData}} -->
        <el-form class="resetForm" ref = "formData" :model = "formData" label-width = "90px" :inline="true">
            <div class="for-itemlis">
                <h4 class="tit-salesApply">基本信息<span class="tips-right fr">
                    供货商编码：<span class="s-blue">{{formData.supplierCode}}</span>
                </span></h4>
                <ul class="clearfix list-supplierInfo">
                    <li>
                        <p class="ellipsis">供货商名称：{{formData.supplierName}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">供货商类型：{{formData.supplierType | supplierTypeFn}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">账期：{{formData.paymentDays}}天</p>
                    </li>
                    <li>
                        <p class="ellipsis">支付方式：{{formData.payType | payTypeFn}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">发票类型：{{formData.invoiceType | invoiceTypeFn}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">发票费率：{{formData.invoiceRate}} %</p>
                    </li>
                    <li>
                        <p class="ellipsis">结算周期：{{formData.settlementCycle}}{{formData.settlementTimeUnit | settlementTimeUnitFn}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">结算方式：{{formData.settlementWay | settlementWayFn}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">开户银行：{{formData.accBank}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">银行账号：{{formData.bankAccCard}}</p>
                    </li>
                    <li>
                        <p class="ellipsis">账户名称：{{formData.bankAccName}}</p>
                    </li>
                </ul>
                <h4 class="tit-salesApply tit-ruleTickets">联系人信息<span>（最多可添加10个联系人）</span></h4>
                <div class="sup-connector">
                <!-- {{formData.linkmanList}} -->
                    <ul>
                        <li v-for="(item, $index) in formData.linkmanList">
                            <span class="con-name">{{item.linkName}}</span><span class="sup-areaName ellipsis">{{item.provinceName}}{{item.cityName}}{{item.areaName}}{{item.street}}</span><span class="sup-phone">{{item.linkPhone}}</span><span class="sup-phone">{{item.linkMobile}}</span><span class="tips-importantName">首要联系人</span>
                        </li>
                    </ul>
                </div>
                <h4 class="tit-salesApply tit-ruleTickets">供货商资质</h4>
                <div class="item-uploadImg_box2 clearfix supplier-imgUpdata">
                    <ol class="fl up-active" v-if="formData.businessPic">
                        <li class="up-imgLI">
                            <a target="_blank" :href="picServer + formData.businessPic"><img :src="picServer + formData.businessPic" alt="营业执照"></a>
                        </li>
                        <li class="up-slotTips"><span class="s-red">*</span> 营业执照副本</li>
                    </ol>
                    <ol class="fl up-active" v-if="formData.idcardPic">
                        <li class="up-imgLI">
                            <a target="_blank" :href="picServer + formData.idcardPic"><img :src="picServer + formData.idcardPic" alt="法人身份证正面"></a>
                        </li>
                        <li class="up-slotTips">身份证（正面）</li>
                    </ol>
                    <ol class="fl up-active" v-if="formData.idcardBackPic">
                        <li class="up-imgLI">
                            <a target="_blank" :href="picServer + formData.idcardBackPic"><img :src="picServer + formData.idcardBackPic" alt="法人身份证反面"></a>
                        </li>
                        <li class="up-slotTips">身份证（反面）</li>
                    </ol>
                    <ol class="fl up-active" v-if="formData.foodLicensePic">
                        <li class="up-imgLI">
                            <a target="_blank" :href="picServer + formData.foodLicensePic"><img :src="picServer + formData.foodLicensePic" alt="食品流通证"></a>
                        </li>
                        <li class="up-slotTips">食品许可证</li>
                    </ol>
                    <ol class="fl up-active" v-if="formData.productLicensePic">
                        <li class="up-imgLI">
                            <a target="_blank" :href="picServer + formData.productLicensePic"><img :src="picServer + formData.productLicensePic" alt="生产许可证"></a>
                        </li>
                        <li class="up-slotTips">生产许可证</li>
                    </ol>
                </div>
                <h4 class="tit-salesApply tit-ruleTickets">合同文件</h4>
                <!-- {{uploadImg2Computed}} -->
                <div class="item-uploadImg_box item-uploadImg_box02 clearfix" v-loading='loadingUploadImg'>
                    <el-form-item prop="uploadImg2Computed" label="合同文件">
                        <ul v-if='uploadImg2.length'>
                            <li v-for='(item, index) in uploadImg2Computed' :key='item' @mouseover.prevent="picindex = index"  @mouseout.prevent="picindex = ''">
                                <img v-if='picServer' :src="picServer + item.imgName" alt="">
                                <p v-show="picindex === index" @click="picRemove(index)"><span class="iconfont icon-shanchu"></span></p>
                            </li>
                        </ul>
                        <div class="uploadImg-btn" v-if='uploadBtnFlag'>
                            <span class="iconfont icon-xinzeng"></span>
                            <form name='form2' id='formFile2'>
                                <input title="请编辑或者上传图片" type="file" multiple name='imgFiles' class='inputFile2' @change='inputFile2Fn' accept="image/gif,image/jpeg,image/jpg,image/png">
                            </form>
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <!-- {{contractForms}} -->
                    <el-form-item label="合同有效期">
                        <el-date-picker
                            size="small"
                            v-model="contractForm"
                            type="daterange"
                            :picker-options="timeOptions"
                            @change="activeTimeChange"
                            range-separator=" 至 "
                            placeholder="选择合同有效期有效时间范围">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button class="xe-button-normal" type="primary" @click="submitForm" :disabled="nextDisabled">签订</el-button>
                        <el-button class="xe-button-normal" @click="linkTolist">取消</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            disRecord: false,
            rejectdailog: false,
            rejectext: '',
            disNegative: false,
            provinceList: [],
            nextDisabled: false,
            dialogVisible: false,
            dialogVisible02: true,
            formData: {},
            loadingUploadImg: false,
            uploadImg2: [],
            picindex: '',
            uploadBtnFlag: true,
            dialogData: {
                proName: ''
            },
            timeOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            areaIds: [],
            contractForm: '',
            contractForms: [],
            coverFlag: true
        };
    },
    created() {
        this.loadInfo();
    },
    methods: {
        submitForm() {
            this.AuditedMethod(7);
        },
        linkTolist() {
            this.$router.push({name: 'supplierListIndex'});
        },
        picRemove(index) {
            this.uploadImg2.splice(index, 1);
            this.picindex = '';
            $('.inputFile2').val('');
        },
        inputFile2Fn() {
            this.loadingUploadImg = true;
            var formData = new FormData(document.getElementById('formFile2'));
            formData.append('fileType', 3);
            this.$http({
                method: 'post',
                url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                data: formData
            }).then(res => {
                console.log(res);
                this.loadingUploadImg = false;
                this.uploadImg2.push(...res.data.imgInfoList);
            }).catch(error => {
                this.loadingUploadImg = false;
                console.log(error);
            });
        },
        AuditedMethod(checkStatus, call) { // 审核通过
            if (this.uploadImg2Computed.length === 0) {
                this.$xeMessage.warning('请上传合同文件');
                return;
            }
            if (this.contractForm.length === 0) {
                this.$xeMessage.warning('请选择合同有效期');
                return;
            }
            let _this = this;
            let params = {};
            params.checkStatus = checkStatus;
            // params.supplierStatus = this.formData.supplierStatus;
            params.supplierStatus = 3;
            params.checkStatusPre = this.formData.checkStatusPre;
            params.supplierStatusPre = this.formData.supplierStatusPre;
            params.supplierCode = this.$route.query.supplierCode;
            params.version = this.$route.query.version;
            params.contractForm = {
                endTimeStr: this.contractForms[1],              // 开始时间
                startTimeStr: this.contractForms[0]
            };
            params.fileList = [];
            for (var i = 0; i < this.uploadImg2Computed.length; i++) {
                params.fileList.push(this.uploadImg2Computed[i].imgName);
            };
            let ajaxUrl = '/xe-route/xe-erp/supplier/signSupplier';
            this.nextDisabled = true;
            this.$http({
                method: 'post',
                url: ajaxUrl,
                data: params
            }).then((res) => {
                call && call();
                this.$xeMessage.success(res.msg);
                setTimeout(function () {
                    this.nextDisabled = true;
                    _this.$router.push({name: 'supplierListIndex'});
                }, 300);
            }).catch((error) => {
                this.nextDisabled = false;
                console.log(error);
            });
        },
        handleSizeChange(val) {
            this.xePageInfo.pageSize = val;
            this.creatInf(this.xePageInfo.pageNum, this.dialogData);
        },
        handleCurrentChange(val) {
            this.xePageInfo.pageNum = val;
            this.creatInf(this.xePageInfo.pageNum, this.dialogData);
        },
        activeTimeChange(value) {
            console.log(value);
            this.contractForms = value.split(' 至 ');
        },
        loadInfo() {
            console.log('this.$route.query.supplierCode', this.$route.query.supplierCode);
            this.$http({ // 查询运营平台商户列表
                method: 'post',
                url: '/xe-route/xe-erp/supplier/querySupplierDetail',
                data: {
                    supplierCode: this.$route.query.supplierCode,
                    version: this.$route.query.version
                }
            }).then((res) => {
                if (res.data) {
                    this.formData = res.data.supInfo;
                    this.picServer = res.data.picServer;
                    this.$set(this.formData, 'idcardBackPic', '');
                    this.$set(this.formData, 'idcardPic', '');
                    this.$set(this.formData, 'businessPic', '');
                    this.$set(this.formData, 'foodLicensePic', '');
                    this.$set(this.formData, 'productLicensePic', '');
                    this.$set(this.formData, 'bankAccName', this.formData.bank.bankAccName);
                    this.$set(this.formData, 'bankAccCard', this.formData.bank.bankAccCard);
                    this.$set(this.formData, 'accBank', this.formData.bank.accBank);
                    this.formData.aptitudeList.some(item => {
                        console.log('item.apFlag', item.apFlag);
                        if (item.apFlag === 3) {
                            if (item.idcardBack) {
                                this.$set(this.formData, 'idcardBackPic', item.idcardBack);
                                // this.formData.idcardBackPic = item.apUrl;
                            }
                            this.$set(this.formData, 'idcardPic', item.apUrl);
                        } else if (item.apFlag === 22) {
                            this.$set(this.formData, 'businessPic', item.apUrl);
                            // this.formData.businessPic = item.apUrl;
                        } else if (item.apFlag === 7) {
                            this.$set(this.formData, 'foodLicensePic', item.apUrl);
                            // this.formData.foodLicensePic = item.apUrl;
                        } else if (item.apFlag === 5) {
                            this.$set(this.formData, 'productLicensePic', item.apUrl);
                            // this.formData.productLicensePic = item.apUrl;
                        }
                    });
                    this.formData.linkmanList.forEach(item => {
                        item.saleAreaIds = [item.provinceId, item.cityId, item.areaId];
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        uploadImg2Computed() {
            return this.uploadImg2.slice(0, 10);
        },
        imgNames() {
            let result = [];
            if (this.uploadImg2Computed.length > 0) {
                this.uploadImg2Computed.forEach(item => {
                    result.push(item.imgName);
                });
                return result.join(',');
            } else {
                result = '';
            }
            return result;
        }
    },
    filters: {
        settlementTimeUnitFn(val) {
            let settlementTimeUnitsource = '';
            switch (val) {
                case 1: {
                    settlementTimeUnitsource = '天';
                    break;
                }
                case 2: {
                    settlementTimeUnitsource = '周';
                    break;
                }
                case 3: {
                    settlementTimeUnitsource = '月';
                    break;
                }
            }
            return settlementTimeUnitsource;
        },
        supplierTypeFn(val) {
            let supplierTypesource = '';
            switch (val) {
                case 1: {
                    supplierTypesource = '厂家';
                    break;
                }
                case 2: {
                    supplierTypesource = '贸易商';
                    break;
                }
                case 3: {
                    supplierTypesource = '一批';
                    break;
                }
                case 4: {
                    supplierTypesource = '二批';
                    break;
                }
                case 5: {
                    supplierTypesource = '其他';
                    break;
                }
            }
            return supplierTypesource;
        },
        payTypeFn(val) {
            let payTypesource = '';
            switch (val) {
                case 1: {
                    payTypesource = '网银';
                    break;
                }
                case 2: {
                    payTypesource = '转账支票';
                    break;
                }
                case 3: {
                    payTypesource = '电汇';
                    break;
                }
                case 4: {
                    payTypesource = '支付宝';
                    break;
                }
                case 5: {
                    payTypesource = '其他';
                    break;
                }
            }
            return payTypesource;
        },
        invoiceTypeFn(val) {
            let invoiceTypesource = '';
            switch (val) {
                case 1: {
                    invoiceTypesource = '无发票';
                    break;
                }
                case 2: {
                    invoiceTypesource = '普通发票';
                    break;
                }
                case 3: {
                    invoiceTypesource = '增值税发票';
                    break;
                }
            }
            return invoiceTypesource;
        },
        settlementWayFn(val) {
            let settlementWaysource = '';
            switch (val) {
                case 1: {
                    settlementWaysource = '账期结算';
                    break;
                }
                case 2: {
                    settlementWaysource = '预付款';
                    break;
                }
                case 3: {
                    settlementWaysource = '现结';
                    break;
                }
            }
            return settlementWaysource;
        }
    }
};
</script>
<style lang="scss">
    @import "../../../../../assets/styles/views/releaseGoods.scss";
    .for-itemlis .item-uploadImg_box02{
        padding-left: 0;
    }
</style>
