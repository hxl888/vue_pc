<template lang="html">
    <div class="m-router-con">
    <!-- {{formData}} -->
        <el-form class="resetForm"  ref = "formData" :model = "formData" label-width = "92px" :inline="true">
            <!--基础信息-->
            <div class="for-itemlis">
                <h4 class="tit-salesApply"><span class="tips-right">
                    单据编号：<span class="s-blue">{{formData.purchOrder}}</span>
                </span></h4>
                <div>
                    <el-form-item label="供货商" prop="supplierName" >
                        <el-input size="small" style="width: 210px;" disabled readonly v-model="formData.supplierName" placeholder="供货商" :maxlength="50" icon="search"></el-input>
                    </el-form-item>
                    <el-form-item prop="storeId" label="仓库">
                        <el-select size="small" disabled style="width: 210px;" v-model="formData.storeId" placeholder="选择仓库" :filterable="true">
                            <template v-for="item in actionStoreList">
                                <el-option :label="item.storeName" :value="item.storeId"></el-option>
                            </template>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="定金" prop="frontMoney" >
                        <el-input size="small" style="width: 210px;" v-model.number="formData.frontMoney" placeholder="0.00" :maxlength="8" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="单据日期" prop="signDate" >
                        <el-date-picker
                            id="signDate"
                            disabled
                            size="small"
                            style="width: 210px;"
                            v-model="formData.signDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="预计到货日期" prop="expectedArrivalDate" >
                        <el-date-picker
                            id="expectedArrivalDate"
                            size="small"
                            disabled
                            style="width: 210px;"
                            v-model="formData.expectedArrivalDate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="供货商电话" prop="supplierPhone" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.supplierPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="供货商手机" prop="supplierMobile" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.supplierMobile" :maxlength="11"></el-input>
                    </el-form-item>
                    <el-form-item label="结算方式" prop="settlementMethod" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.settlementMethodName"></el-input>
                    </el-form-item>
                    <el-form-item label="采购类型" prop="purchType" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.purchTypeName"></el-input>
                    </el-form-item>
                    <el-form-item label="创建人" prop="createUser" >
                        <el-input size="small" disabled style="width: 210px;" v-model="formData.createUser"></el-input>
                    </el-form-item>
                </div>
                <!-- {{receiptDetailList}} -->
                <div class="goodsTable">
                    <!-- receiptDetailList: {{receiptDetailList}} -->
                    <!-- @selection-change="handleUpdataSelectionChange" -->
                    <el-table
                        :data="receiptDetailList"
                        border
                        style="width: 100%">
                        <el-table-column
                            label=""
                            class-name="td-index"
                            width="50">
                            <template scope="props">
                                <span>{{props.$index + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="商品图片" width="100">
                            <template scope="props">
                                <div class="z-imgbox">
                                    <img :src="picServer + picDir + props.row.picUrl" alt="商品图片" width="60" height="60">
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="proName" label="商品名称" min-width="135"></el-table-column>
                        <el-table-column prop="proSku" label="SKU编码" min-width="135"></el-table-column>
                        <el-table-column prop="specValue" label="规格" min-width="95"></el-table-column>
                        <el-table-column prop="proUnit" label="单位" width="65"></el-table-column>
                        <!-- (1:按重量计算2:按数量计算)   -->
                        <el-table-column prop="priceType" label="计量方式" width="85">
                            <template scope="props">
                                {{props.row.priceType | pricingTypeToText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="proNum" label="采购数量" min-width="85"></el-table-column>
                        <el-table-column prop="buyPrice" label="进货价" min-width="95">
                            <template scope="props">
                                {{props.row.buyPrice | priceToText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="proAmount" label="采购费用" min-width="95">
                            <template scope="props">
                                {{props.row.proAmount | priceToText}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="remark" label="商品备注" min-width="95"></el-table-column>
                    </el-table>
                    <div class="table-below-tips">
                        <el-form-item label="" prop="remark" label-width="50px">
                            &nbsp;&nbsp;&nbsp;&nbsp;需要采购费用总额：¥ {{formData.purchAmount | priceToText}}
                        </el-form-item>
                    </div>
                    <div class="table-below-tips" v-if="formData.actualAmount">
                        <el-form-item label="" prop="actualAmount" label-width="50px">
                            &nbsp;&nbsp;&nbsp;&nbsp;已收货采购费用总额：{{formData.actualAmount | priceToText}}
                        </el-form-item>
                    </div>
                    <div class="table-below-tips">
                        <el-form-item label="" prop="remark" label-width="50px">
                            &nbsp;&nbsp;&nbsp;&nbsp;备注：{{formData.remark | remarkFn}}
                        </el-form-item>
                    </div>
                </div>
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button class="xe-button-normal" type="primary" @click="submitForm">审核通过</el-button>
                        <el-button class="xe-button-normal" type="primary" @click="rejectBtn('formData')">驳回</el-button>
                        <el-button class="xe-button-normal" @click="linkTolist">返回</el-button>
                    </div>
                </div>
            </div>
        </el-form>
        <!--驳回弹框-->
        <div  class="reset-dialog dialog_wid340 textare_reset300" >
            <el-dialog title="驳回理由" :visible.sync="rejectdailog">
                <textarea class="" :maxlength="200" v-model="rejectext"></textarea>
                <span class="last-num">{{rejectextNum}}/200</span>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="rejectSubmit">确定</el-button>
                    <el-button class="xe-button-normal" @click="cancelReject">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {supplierType, payType, invoiceType, settlementTimeUnit, settlementWay, searchSupplier} from '@/dataControl.js';
export default {
    data() {
        return {
            nextDisabled: false,
            lcBtnDisable: false,
            lcShowFlag: true,
            actionStoreList: [], // 仓库的基本信息
            rejectdailog: false,
            rejectext: '',
            dialogType: '',
            picServer: '',
            picDir: 'product/80/80/',
            receiptDetailList: [],
            formData: {
                supplierName: '',
                supplierCode: '',
                storeId: '',
                frontMoney: 0.00,
                signDate: '',
                expectedArrivalDate: '',
                supplierPhone: '',
                supplierMobile: '',
                settlementMethodName: '',
                settlementMethod: '',
                purchTypeName: '',
                purchType: '',
                createUser: '',
                remark: '',
                purchProductList: [],
                purchAmount: 0 // 总价
            },
            coverFlag: true
        };
    },
    created() {
        // this.loadqueryStore();
        this.loadInf();
    },
    methods: {
        settlementMethodToText(type) {
            let obj = {
                1: '账期结算',
                2: '预付款',
                3: '现结'
            };
            return obj[type];
        },
        purchTypeToText(type) {
            let obj = {
                1: '零采',
                2: '集采'
            };
            return obj[type];
        },
        linkTolist() {
            this.$router.push({name: 'procurementCheckListIndex'});
        },
        submitForm() {
            this.AuditedMethod(6);
        },
        rejectBtn() {
            this.rejectdailog = true;
        },
        AuditedMethod(checkStatus, call) { // 审核通过
            let _this = this;
            let params = {};
            params.checkStatus = checkStatus;
            // params.purchStatus = this.formData.purchStatus;
            params.purchStatus = 3;
            params.checkStatusPre = this.formData.checkStatusPre;
            params.purchStatusPre = this.formData.purchStatusPre;
            params.purchOrder = this.formData.purchOrder;
            params.version = this.formData.version;
            let ajaxUrl = '';
            if (checkStatus === 5) {
                params.financeExamineRemark = this.rejectext;
                params.purchStatus = 2;
                ajaxUrl = '/xe-route/xe-erp/purch/financeReject';
            } else {
                ajaxUrl = '/xe-route/xe-erp/purch/financeCheck';
            }
            this.$http({
                method: 'post',
                url: ajaxUrl,
                data: params
            }).then((res) => {
                call && call();
                this.$xeMessage.success(res.msg);
                setTimeout(function () {
                    _this.$router.push({name: 'procurementCheckListIndex'});
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        rejectSubmit() {
            if (this.rejectext) {
                if (this.rejectext.length <= 200) {
                    this.AuditedMethod(5, () => {
                        this.rejectdailog = false;
                        this.rejectext = '';
                    });
                } else {
                    this.$xeMessage.warning('驳回原因过长200字以内');
                    return false;
                }
            } else {
                this.$xeMessage.warning('请填写驳回原因');
                return false;
            }
        },
        cancelReject() {
            this.rejectdailog = false;
            this.rejectext = '';
        },
        loadqueryStore(type) {
            let params = {};
            if (type) {
                params.lcfbFlag = 1;
            }
            this.$http({ // 查询仓库名称列表
                method: 'post',
                url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                data: params
            }).then((res) => {
                this.actionStoreList = res.data.actionList;
                console.log('actionStoreList', this.actionStoreList);
            }).catch((error) => {
                console.log(error);
            });
        },
        loadInf() { // 查询运营平台供货商列表
            let data = {
                purchOrder: this.$route.query.purchOrder,
                version: this.$route.query.version
            };
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/purch/queryPurchDetail',
                data: data
            }).then((res) => {
                this.picServer = res.data.picServer;
                this.formData = res.data.purch;
                this.receiptDetailList = res.data.purch.purchProductList;
                this.formData.purchTypeName = this.purchTypeToText(this.formData.purchType);
                console.log('test', this.formData.settlementMethod);
                this.$set(this.formData, 'settlementMethodName', this.settlementMethodToText(this.formData.settlementMethod));
                if (this.formData.purchType === 2) { // 集采
                    this.loadqueryStore(true);
                } else { // 集采显示和可操作
                    this.lcShowFlag = false;
                    this.lcBtnDisable = true;
                    this.loadqueryStore();
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        rejectextNum: function() {
            return this.rejectext.length;
        },
        searchSupplierList() {
            return searchSupplier;
        },
        supplierTypeList() {
            return supplierType;
        },
        proAmount() {
            return this.formDataNum.buyPrice * this.formDataNum.proNum;
        },
        payTypeList() {
            return payType;
        },
        invoiceTypeList() {
            return invoiceType;
        },
        settlementTimeUnitList() {
            return settlementTimeUnit;
        },
        settlementWayList() {
            return settlementWay;
        }
    },
    filters: {
        remarkFn(val) {
            if (val === '' || val === null) {
                val = '暂无备注信息';
            }
            return val;
        }
    }
};
</script>
<style lang="scss">
.changeCate{
    padding: 0 20px;
    margin: 20px 0;
}
.table-below-tips{
    border: 1px solid #ced5de;
    padding: 5px 0;
    margin-top: -1px;
    .el-form-item{
        margin-bottom: 0;
        .el-input__inner{
            border: none;
            padding-left: 0;
        }
    }
}
</style>
