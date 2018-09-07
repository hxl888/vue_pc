<template lang="html">
    <div class="m-router-con con-salesApply">
    <!-- formData:{{formData}} -->
        <el-form class="resetForm" ref = "formData" :model = "formData" label-width = "90px">
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
                <!-- {{formData.contractList}} -->
                <div v-if="formData.checkStatus === 7">
                    <h4 class="tit-salesApply tit-ruleTickets">合同文件</h4>
                    <div class="item-uploadImg_box item-uploadImg_box02 clearfix">
                        <el-form-item prop="uploadImg2Computed" label="合同文件">
                            <ul>
                                <li v-for="item in formData.contractList">
                                    <a target="_blank" :href="picServer + item.contractUrl">
                                        <img :src="picServer + item.contractUrl" alt="合同文件" width="58" height="58">
                                    </a>
                                </li>
                            </ul>
                        </el-form-item>
                    </div>
                    <div>
                    <!-- {{contractForm}} -->
                        <el-form-item label="合同有效期">
                            {{formData.contractList[0].startTime}} 至 {{formData.contractList[0].endTime}}
                        </el-form-item>  
                    </div>   
                </div>
                <!-- {{formData.contractList}} -->
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button @click="signHistory" class="xe-button-normal" type="primary" v-if="formData.checkStatus === 7">查看签订历史</el-button>
                        <el-button class="xe-button-normal" @click="linkTolist">返回</el-button>
                    </div>
                </div>
            </div>
        </el-form>
        <!-- 图片 -->
        <el-dialog
            class="el-pic-dialog"
            :visible.sync="idcardPic"
            @close="closeDialog"
        >
            <el-carousel indicator-position="outside">
                <el-carousel-item v-for="item in Pics" :key="item">
                    <img :src="picServer + item" alt="签订图片">
                </el-carousel-item>
            </el-carousel>
        </el-dialog>
        <!-- 选择签订历史 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="签订历史" :visible.sync="dialogVisible" size="small">
                <div class="clearfix supplier-userList">
                    <div class="clearfix">
                        <!-- {{shopInfo}} -->
                        <div class="">
                            <el-table
                                :data="contracList"
                                border
                                style="width: 100%"
                                ref = "proListCoupon">
                                <el-table-column prop="signTime" label="签订时间" min-width="110"></el-table-column>
                                <el-table-column label="商品图片" width="100">
                                    <!-- 商品图片{{props.row.img}} -->
                                    <template scope="props">
                                        <!-- 商品图片{{props.row.img}} -->
                                        <div class="z-imgbox">
                                            <img @click="showImg(props.row)" :src='picServer + props.row.contractUrl' alt="商品图片" width="60" height="60">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column label="合同有效期" min-width="110">
                                    <template scope="props">
                                        {{props.row.startTime}} 至 {{props.row.endTime}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" @click="dialogVisible = false">关 闭</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {Carousel, CarouselItem} from 'element-ui';
export default {
    data() {
        return {
            disRecord: false,
            disNegative: false,
            nextDisabled: false,
            dialogVisible: false,
            idcardPic: false,
            formData: {},
            Pics: [],
            contractForm: [],
            userList: [],
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            contracList: [],
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
            this.$router.push({name: 'supplierListIndex'});
        },
        signHistory() {
            console.log('test');
            this.dialogVisible = true;
            this.creatInf();
        },
        creatInf() {
            this.$http({ // 查询运营签订历史列表
                method: 'post',
                url: '/xe-route/xe-erp/supplier/queryContractList',
                data: {
                    supplierCode: this.formData.supplierCode
                }
            }).then((res) => {
                if (res.data) {
                    this.contracList = res.data.contracList;
                    this.xePageInfo = res.data.xePageInfo;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        showImg(row) {
            this.Pics = row.fileList;
            this.idcardPic = true;
        },
        closeDialog() {
            this.Pics = [];
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
                    this.$set(this.formData, 'contractForm', this.formData.bank.bankAccCard);
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
    },
    components: {
        'el-carousel': Carousel,
        'el-carousel-item': CarouselItem
    }
};
</script>
<style lang="scss">
@import "../../../../../assets/styles/views/releaseGoods.scss";
.for-itemlis .item-uploadImg_box02{
    padding-left: 0;
}
</style>
