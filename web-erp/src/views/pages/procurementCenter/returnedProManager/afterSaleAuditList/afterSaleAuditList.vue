<template lang="html">
    <div class="m-router-con">
        <!--采购单-->
        <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="formIdType">
                    <el-select size="small" class="xe-input-w110" v-model="formData.formIdType" placeholder="查询条件">
                        <el-option
                            v-for="item in formIdTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="formIdValue">
                    <el-input size="small" v-model="formData.formIdValue" placeholder="请输入查询内容"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        ref="createStartDate"
                        v-model="value1"
                        type="date"
                        size="small"
                        @change="createStartDateFn"
                        :picker-options="pickerOptionStart"
                        placeholder="创建开始时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="z-mr30">
                    <el-date-picker
                        ref="createEndDate"
                        v-model="value2"
                        type="date"
                        size="small"
                        @change="createEndDateFn"
                        :picker-options="pickerOptionEnd"
                        placeholder="创建结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" :model="formData" ref="formData" label-width ='73px'>
                        <div class="clearfix">
                            <el-form-item prop="formIdType">
                                <el-select size="small" class="xe-input-w110" v-model="formData.formIdType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in formIdTypeList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="formIdValue">
                                <el-input style="width:330px" size="small" v-model="formData.formIdValue" placeholder="请输入查询内容"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="searchTimeType">
                                <el-select size="small" class="xe-input-w110" v-model.number="formData.searchTimeType" placeholder="创建时间">
                                    <el-option
                                        v-for="item in searchTimeTypeFn"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    ref="createStartDate"
                                    v-model="value1"
                                    type="date"
                                    style="width:160px" 
                                    size="small"
                                    @change="createStartDateFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="创建开始时间"
                                >
                                </el-date-picker>
                                &nbsp;
                                <el-date-picker
                                    ref="createEndDate"
                                    v-model="value2"
                                    type="date"
                                    style="width:160px" 
                                    size="small"
                                    @change="createEndDateFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="创建结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                           <el-form-item label="售后单状态" prop="afterSaleStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.afterSaleStatus" placeholder="售后单状态">
                                    <el-option
                                        v-for="item in afterSaleStatusFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="售后单类型" prop="afterSaleType">
                                <el-select size="small" style="width: 148px;" v-model="formData.afterSaleType" placeholder="售后单类型">
                                    <el-option
                                        v-for="item in afterSaleTypeFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                           <el-form-item label="客服审核" prop="serviceCheckStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.serviceCheckStatus" placeholder="客服审核状态">
                                    <el-option
                                        v-for="item in serviceCheckStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购审核" prop="purchaseCheckStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.purchaseCheckStatus" placeholder="采购审核状态">
                                    <el-option
                                        v-for="item in purchaseCheckStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="财务审核" prop="financeCheckStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.financeCheckStatus" placeholder="财务审核状态">
                                    <el-option
                                        v-for="item in financeCheckStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="发货仓库" prop="storeIdSend">
                                <el-select size="small" style="width: 148px;" v-model="formData.storeIdSend" placeholder="发货仓库">
                                    <el-option
                                        v-for="item in storeIdSendList"
                                        :key="item.storeId"
                                        :label="item.storeName"
                                        :value="item.storeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="saleAreaIds" label="选择区域">
                                <areaselectTag v-model='formData.saleAreaIds' :width='150' :changeOnSelect="true"></areaselectTag>
                            </el-form-item>
                            <el-form-item prop="cateIds" label="商品分类">
                                <categoryTag v-model='formData.cateIds' :width='150' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="退货仓库" prop="storeIdReject">
                                <el-select size="small" style="width: 148px;" v-model="formData.storeIdReject" placeholder="退货仓库">
                                    <el-option
                                        v-for="item in storeIdRejectList"
                                        :key="item.storeId"
                                        :label="item.storeName"
                                        :value="item.storeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('formData')">重置</el-button>
                    </div>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <!-- <div class="u-opera-btnBox">
            <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出</el-button>
            <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出明细</el-button>
        </div> -->
        <!-- {{afterSaleViewList}} -->
        <div class="goodsTable">
            <el-table
                :data="afterSaleViewList"
                border
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    label=""
                    fixed="left"
                    class-name="td-index"
                    width="30">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="34" class-name="selectionTd" fixed="left"></el-table-column>
                <el-table-column
                    min-width="160"
                    label="售后单号">
                    <template scope="scope">
                        <a class="s-blue" @click="getDetailInfo(scope.row)">{{scope.row.afterSalesCode}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="85"
                    prop="afterSaleSource"
                    label="售后来源">
                    <template scope="scope">
                        {{scope.row.afterSaleSource | afterSaleSourceToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    min-width="150"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    sortable
                    label="创建时间"
                    min-width="160">
                </el-table-column>
                <el-table-column
                    prop="afterSaleType"
                    label="售后类型"
                    min-width="100">
                    <template scope="scope">
                        {{scope.row.afterSaleType | afterSaleTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="afterSaleReason"
                    label="售后原因"
                    min-width="160">
                    <template scope="scope">
                        {{scope.row.afterSaleReason | afterSaleReasonToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="afterSaleRemark"
                    label="售后说明"
                    min-width="160">
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="退货仓库"
                    min-width="85">
                </el-table-column>
                <el-table-column
                    prop="afterSaleStatus"
                    label="售后单状态"
                    min-width="125">
                    <template scope="props">
                        <div>
                            {{props.row.afterSaleStatus | afterSaleStatusToText}}
                        </div>
                        <el-tooltip effect="dark" placement="top" v-if="props.row.afterSaleStatus === 4">
                            <div slot="content" class="tips-item">{{props.row.refusReason}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="serviceCheckStatus"
                    label="客服审核状态"
                    min-width="125">
                    <template scope="props">
                        <div>
                            {{props.row.serviceCheckStatus | serviceCheckStatusToText}}
                        </div>
                        <!-- <el-tooltip effect="dark" placement="top" v-if="props.row.serviceCheckStatus === 3">
                            <div slot="content" class="tips-item">{{props.row.serviceRefusReason}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip> -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchaseCheckStatus"
                    label="采购审核状态"
                    min-width="125">
                    <template scope="props">
                        <div>
                            {{props.row.purchaseCheckStatus | purchaseCheckStatusToText}}
                        </div>
                        <!-- <el-tooltip effect="dark" placement="top" v-if="props.row.purchaseCheckStatus === 3">
                            <div slot="content" class="tips-item">{{props.row.purchaseRefusReason}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip> -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="financeCheckStatus"
                    label="财务审核状态"
                    min-width="125">
                    <template scope="props">
                        <div>
                            {{props.row.financeCheckStatus | financeCheckStatusToText}}
                        </div>
                        <!-- <el-tooltip effect="dark" placement="top" v-if="props.row.financeCheckStatus === 3">
                            <div slot="content" class="tips-item">{{props.row.purchExamineRemark}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip> -->
                    </template>
                </el-table-column>
                <el-table-column
                    prop="loginAccount"
                    label="客户账号"
                    min-width="125">
                </el-table-column>
                <el-table-column
                    prop="caConsignee"
                    label="收货人"
                    min-width="85">
                </el-table-column>
                
                <el-table-column
                    label="订单实发金额"
                    min-width="145">
                    <template scope="props">
                        {{props.row.payAmount - props.row.differenceAmountDetail - props.row.freAmount | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="实发运费总额"
                    min-width="110">
                    <template scope="props">
                        {{props.row.epayReceAmt + props.row.differenceAmountDetail + props.row.freAmount - props.row.payAmount | priceToText}}
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="epayReceAmt"
                    label="订单应收金额"
                    min-width="110">
                    <template scope="props">
                        {{props.row.epayReceAmt | priceToText}}
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="refundAmount"
                    label="售后退款金额"
                    min-width="145">
                    <template scope="scope">
                        {{scope.row.refundAmount | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作"
                    fixed="right"
                    min-width="140">
                    <template scope="props">
                        <!-- 待采购部审核 -->
                        <div class="btn-in-table" v-if="props.row.purchaseCheckStatus === 1">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;"  v-if="props.row.afterSaleStatus !== 5" class="s-blue" @click="checkoutBtn(props.row)">审核</a>
                        </div>
                        <!-- 待财务部审核 采购部驳回-->
                        <div class="btn-in-table" v-else>
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                        </div>
                    </template>
                </el-table-column>
              </el-table>
            <div class="xe-pagination-panel">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="xePageInfo.pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="xePageInfo.pageSize"
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="xePageInfo.total">
                </el-pagination>
            </div>
        </div>
        <div class="pub-tabDatadetails" v-if="infoShowFn">
            <el-tabs v-model="tabCard_val" type="card" @tab-click="handleClick">
                <!--商品信息-->
                <el-tab-pane label="商品信息" name="first">
                    <div>
                        <el-table
                            :data="tableData2"
                            border
                            style="width: 100%">
                            <el-table-column
                                prop=""
                                label=""
                                min-width="70">
                                <template scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="商品图"
                                    min-width="95">
                                <template scope="props">
                                    <div class="z-imgbox">
                                        <!--{{props.row}}-->
                                        <img :src="picServer + picDir + props.row.proPicture" alt="品牌logo" width="60" height="60">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="proSku"
                                label="SKU编码"
                                min-width="135">
                            </el-table-column>
                            <el-table-column
                                prop="proNum"
                                label="商品货号"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                prop="proName"
                                label="商品名称"
                                min-width="130">
                            </el-table-column>
                            <el-table-column
                                prop="proOrgCodeName"
                                label="商品分类"
                                min-width="130">
                            </el-table-column>
                            <el-table-column
                                prop="priceType"
                                label="计量方式"
                                min-width="100">
                                <template scope="scope">
                                    {{scope.row.pricingType | pricingTypeToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="proUnit"
                                label="单位"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                prop="specValue"
                                label="规格"
                                min-width="90">
                                <template scope="scope">
                                    {{scope.row.specValue | noneToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proPrice"
                                    label="商品单价"
                                    min-width="90">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{scope.row.proPrice | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchaseNum"
                                label="购买数量"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                label="订购金额"
                                min-width="90">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.proPrice * scope.row.purchaseNum | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="pmtAmount"
                                label="优惠金额"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                prop="specialDisamount"
                                label="特批优惠金额"
                                min-width="130">
                            </el-table-column>
                            <el-table-column
                                prop="realSendNum"
                                label="实发量"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                label="实发金额"
                                min-width="90">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.proCostPrice * scope.row.realSendNum | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rejectNum"
                                label="退货量"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                label="退款金额"
                                prop="rejectAmount"
                                min-width="90">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.rejectAmount | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--审核弹框-->
        <el-dialog title="审核" :visible.sync="rejectdailog"   class="reset-dialog dialog_wid340 textare_reset300" >
            <div style="padding-bottom: 10px;color:#687281">您确认通过当前售后单的客服审核吗？</div>
            <textarea v-model="rejectreson" placeholder="请填写售后单的驳回原因50字以内" :maxlength="50"></textarea>
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="passCheck(2)">通过</el-button>
                <el-button  class="xe-button-normal" type="primary" @click="rejectCheck(4)">驳回</el-button>
                <el-button  class="xe-button-normal" @click="rejectdailog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {formIdType, serviceCheckStatus, purchaseCheckStatus, financeCheckStatus, afterSaleStatus, afterSaleType, checkStatusFlag} from '@/dataControl.js';
    import { millisecondFormat } from 'utils';
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                multipleSelection: [],
                storeIdSendList: [],
                storeIdRejectList: [],
                picDir: '',
                rejectdailog: false,
                rejectreson: '',
                rejectCode: '',
                rejectArr: [],
                rejectext: '',
                infoShowFn: false,
                xePageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                searchTimeTypeFn: [{
                    value: 1,
                    label: '创建时间'
                }],
                afterSaleViewList: [],
                tableData2: [],
                tabCard_val: 'first',
                formData: {
                    formIdType: 1,
                    formIdValue: '',
                    searchTimeType: 1,
                    afterSaleStatus: '',
                    afterSaleType: '',
                    createStartDate: '',
                    createEndDate: '',
                    proCategory: '',
                    serviceCheckStatus: '',
                    purchaseCheckStatus: '',
                    financeCheckStatus: '',
                    saleAreaIds: [],
                    cateIds: [],
                    storeIdSend: '',
                    storeIdReject: '',
                    salesmanId: ''
                },
                value1: '',
                value2: '',
                pickerOptionStart: {
                    disabledDate(time) {
                        return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                    }
                },
                pickerOptionEnd: {
                    disabledDate(time) {
                        return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                    }
                }
            };
        },
        computed: {
            formIdTypeList() {
                return formIdType;
            },
            cateId() {
                if (this.formData.cateIds.length > 0) {
                    return this.formData.cateIds[this.formData.cateIds.length - 1];
                } else {
                    return '';
                }
            },
            saleAreaId() {
                if (this.formData.saleAreaIds.length > 0) {
                    return this.formData.saleAreaIds[this.formData.saleAreaIds.length - 1];
                } else {
                    return '';
                }
            },
            serviceCheckStatusList() {
                return serviceCheckStatus;
            },
            purchaseCheckStatusList() {
                return purchaseCheckStatus;
            },
            financeCheckStatusList() {
                return financeCheckStatus;
            },
            afterSaleStatusFlagList() {
                return afterSaleStatus;
            },
            checkStatusFlagList() {
                return checkStatusFlag;
            },
            afterSaleTypeFlagList() {
                return afterSaleType;
            },
            createStartDates: {
                get() {
                    return this.formData.createStartDate;
                },
                set(val) {
                    if (!val) {
                        this.formData.createStartDate = '';
                    } else {
                        this.formData.createStartDate = val;
                    }
                }
            },
            createEndDates: {
                get() {
                    return this.formData.createEndDate;
                },
                set(val) {
                    if (!val) {
                        this.formData.createEndDate = '';
                    } else {
                        this.formData.createEndDate = val;
                    }
                }
            }
        },
        created() {
            this.loadqueryStoreReject();
            this.loadqueryStore();
            this.creatInf(1, this.formData);
        },
        methods: {
            infoShow() {
                this.infoShowFn = true;
            },
            createStartDateFn(val) {
                this.createStartDates = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            createEndDateFn(val) {
                this.createEndDates = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            passCheck(n) {
                this.rAjax(n);
            },
            rejectCheck(n) {
                if (this.rejectreson === '') {
                    this.$xeMessage.warning('原因不能为空');
                } else {
                    this.rAjax(n);
                }
            },
            rAjax(n) {
                let _this = this;
                let params = {};
                params.formCode = this.rejectCode;
                params.checkStatus = n;
                if (n === 4) {
                    params.refusReason = this.rejectreson;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/batchAfterSaleByPurchase',
                    data: params
                }).then((res) => {
                    console.log(res);
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                    }, 300);
                    this.rejectdailog = false;
                }).catch((error) => {
                    console.log(error);
                });
            },
            checkoutBtn(row) {           // 售后单审核
                this.rejectdailog = true;
                this.rejectCode = row.afterSalesCode;
            },
            cancelReject() {
                this.rejectdailog = false;
                this.rejectArr = [];
                this.rejectext = '';
            },
            procureDetails(row) { // 查看
                this.$router.push({name: 'procurereturnedDetails', query: {afterSalesCode: row.afterSalesCode}});
            },
            handleSelectionChange(val) {
                console.log('testvals', val);
                this.multipleSelection = val;
            },
            getDetailInfo(row) {
                let params = {};
                params.afterSalesCode = row.afterSalesCode;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/queryDetailList',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.tableData2 = res.data.orderDetailList;
                        this.infoShowFn = true;
                        this.picDir = res.data.picDir;
                        this.picServer = res.data.picServer;
                        console.log(this.tableData2);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            onSubmit() {
                this.creatInf(1, this.formData);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.creatInf(1, this.formData);
            },
            handleSizeChange(val) {
                this.xePageInfo.pageSize = val;
                this.creatInf(this.xePageInfo.pageNum, this.formData);
            },
            handleCurrentChange(val) {
                this.xePageInfo.pageNum = val;
                this.creatInf(this.xePageInfo.pageNum, this.formData);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            loadqueryStoreReject() {
                let param = {};
                param.delFlag = 1;
                param.storeType = 5;
                param.storeStatus = 1;
                this.$http({ // 查询退货仓库名称列表
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: param
                }).then((res) => {
                    console.log('actionList', res.data.actionList);
                    this.storeIdRejectList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            loadqueryStore(type) {
                let param = {};
                param.delFlag = 1;
                param.storeStatus = 1;
                param.storeType = '';
                this.$http({ // 查询仓库名称列表
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: param
                }).then((res) => {
                    console.log('actionList', res.data.actionList);
                    this.storeIdSendList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = this.formData;
                if (!this.createStartDates) {
                    if (this.value1) {
                        data.createStartDate = millisecondFormat(this.value1.getTime());
                    }
                }
                if (!this.createEndDates) {
                    if (this.value2) {
                        data.createEndDate = millisecondFormat(this.value2.getTime());
                    }
                }
                data.proCategory = this.cateId;
                data.areaId = this.saleAreaId;
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/queryAfterSaleList',
                    data: data
                }).then((res) => {
                    this.afterSaleViewList = res.data.afterSaleViewList;
                    this.xePageInfo = res.data.xePageInfo;
                    if (this.afterSaleViewList.length) {
                        this.getDetailInfo(this.afterSaleViewList[0]);
                    } else {
                        this.infoShowFn = false;
                    }
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        components: {
            categoryTag,
            areaselectTag
        }
    };
</script>

<style lang="scss">
    .el-tabs__nav{
        float: left;
    }
    @import "../../../../../assets/styles/views/publicOrderStyle.scss";
</style>
