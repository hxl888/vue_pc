<template lang="html">
    <div class="m-router-con con-salesApply">
    <!-- formData:{{formData}} -->
        <el-form class="resetForm" ref = "formData" :model = "formData" label-width = "90px">
            <!--基础信息-->
            <!-- <div class="supplier-title">
                <h4>基本信息</h4>
                <span class="tips-right">
                    供货商编码：<span class="s-blue">11111</span>
                </span>
            </div> -->
            
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
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button class="xe-button-normal" @click="linkTolist">返回</el-button>
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
            dialogData: {
                proName: ''
            },
            radio2: 1,
            userList: [],
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            areaIds: [],
            coverFlag: true
        };
    },
    created() {
        this.loadInfo();
    },
    methods: {
        submitForm(formName) {
            this.AuditedMethod(4);
        },
        linkTolist() {
            this.$router.push({name: 'supplierCheckListIndex'});
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
                            }
                            this.$set(this.formData, 'idcardPic', item.apUrl);
                        } else if (item.apFlag === 22) {
                            this.$set(this.formData, 'businessPic', item.apUrl);
                        } else if (item.apFlag === 7) {
                            this.$set(this.formData, 'foodLicensePic', item.apUrl);
                        } else if (item.apFlag === 5) {
                            this.$set(this.formData, 'productLicensePic', item.apUrl);
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
        rejectextNum: function() {
            return this.rejectext.length;
        }
    },
    filters: {
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
</style>
