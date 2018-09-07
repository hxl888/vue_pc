<template lang="html">
    <div class="m-router-con">
        <!--采购单-->
        <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <!-- <el-form-item prop="formIdType">
                    <el-select size="small" class="xe-input-w110" v-model="formData.formIdType" placeholder="查询条件">
                        <el-option
                            v-for="item in formIdTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item prop="orderId">
                    <el-input size="small" v-model="formData.orderId" placeholder="请输入订单编号"></el-input>
                </el-form-item>
                <el-form-item prop="timeType">
                    <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.timeType" placeholder="查询条件">
                        <el-option
                            v-for="item in payTimeQueryFlagList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        ref="startTime"
                        v-model="value1"
                        type="datetime"
                        size="small"
                        :picker-options="pickerOptionStart"
                        placeholder="创建开始时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="z-mr30">
                    <el-date-picker
                        ref="endTime"
                        v-model="value2"
                        type="datetime"
                        size="small"
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
                    <el-form :inline="true" :model="formData" label-width ='73px' ref="formData">
                        <div class="clearfix">
                            <el-form-item prop="timeType">
                                <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.timeType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in payTimeQueryFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    ref="startTime"
                                    v-model="value1"
                                    style="width:160px"
                                    type="datetime"
                                    size="small"
                                    :picker-options="pickerOptionStart"
                                    placeholder="创建开始时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item class="z-mr30">
                                <el-date-picker
                                    ref="endTime"
                                    v-model="value2"
                                    style="width:160px"
                                    type="datetime"
                                    size="small"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="创建结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="orderId" label="订单编号">
                                <el-input size="small" class="xe-input-w160" v-model="formData.orderId" placeholder="请输入订单编号"></el-input>
                            </el-form-item>
                            <el-form-item label="供应商名称" prop="supplierName">
                                <el-select size="small" filterable class="xe-input-w160" v-model="formData.supplierName" placeholder="供应商名称">
                                    <el-option
                                        v-for="item in supNameList"
                                        :key="item.supplierName"
                                        :label="item.supplierName"
                                        :value="item.supplierName">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                           <el-form-item label="采购类型" prop="purchType">
                                <el-select size="small" class="xe-input-w160"v-model="formData.purchType" placeholder="采购类型">
                                    <el-option
                                        v-for="item in purchTypeFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="采购单状态" prop="purchStatus">
                                <el-select size="small" class="xe-input-w160"v-model="formData.purchStatus" placeholder="采购单状态">
                                    <el-option
                                        v-for="item in purchStatusPayList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                           <el-form-item label="采购货款" prop="psettleStatus">
                                <el-select size="small" class="xe-input-w160" v-model="formData.psettleStatus" placeholder="采购货款">
                                    <el-option
                                        v-for="item in psettleStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="驳回状态" prop="rejectStatus">
                                <el-select size="small" class="xe-input-w160" v-model="formData.rejectStatus" placeholder="驳回状态">
                                    <el-option
                                        v-for="item in rejectStatusPayList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i> 导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"><i class="iconfont icon-daochu"></i> 导出明细</el-button>
            <el-button class="xe-button-normal" @click="launchSettlement"><i class="iconfont icon-dayin"></i> 结算账单</el-button>
        </div>
        <!-- {{finPurchPayList}} -->
        <div class="goodsTable">
            <el-table
                :data="finPurchPayList"
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
                    prop="purchId"
                    label="付款单号"
                    min-width="150">
                    <template scope="scope">
                        <a class="s-blue" @click="getDetailInfo(scope.row)">{{scope.row.psettleCode}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchId"
                    label="采购单号"
                    min-width="150">
                    <!-- <template scope="scope">
                        <a class="s-blue" @click="getDetailInfo(scope.row)">{{scope.row.purchId}}</a>
                    </template> -->
                </el-table-column>
                <el-table-column
                    prop="supplierName"
                    label="供应商名称"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="供应商账号"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="startSettleDate"
                    label="发起结算时间"
                    min-width="150">
                    <template scope="props">
                        {{props.row.startSettleDate | millisecondFormat('ms')}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchStatus"
                    label="采购单状态"
                    min-width="120">
                    <template scope="props">
                        {{props.row.purchStatus | purchType02ToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="采购入库仓库"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="psettleStatus"
                    label="采购货款"
                    min-width="100">
                    <template scope="props">
                        {{props.row.psettleStatus | psettleStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="rejectStatus"
                    label="驳回状态"
                    min-width="100">
                    <template scope="props">
                        {{props.row.rejectStatus | rejectPayListStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="frontMoney"
                    label="订金"
                    min-width="120">
                    <template scope="props">
                        {{props.row.frontMoney | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    prop="orderStatus"
                    label="订单状态"
                    min-width="100">
                    <template scope="props">
                        {{props.row.orderStatus | orderStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sendTime"
                    label="发货时间"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="sendStoreName"
                    label="发货仓库"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    label="应付金额"
                    min-width="130">
                    <template scope="props">
                        <span v-if="props.row.receiptPurAmount">
                            {{props.row.receiptPurAmount | priceToText}}
                        </span>
                        <span v-else>
                            {{props.row.purchAmount | priceToText}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="settleAccountAmount"
                    label="结账金额"
                    min-width="130">
                    <template scope="props">
                     <!-- | priceToText -->
                        {{props.row.settleAccountAmount | priceToText}}
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="settleDate"
                    label="结账时间"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="settlementMethod"
                    label="结算方式"
                    min-width="130">
                    <template scope="props">
                        {{props.row.settlementMethod | settlementMethodToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="结算周期"
                    min-width="130">
                    <template scope="props">
                        {{props.row.settlementCycle}}{{props.row.settlementTimeUnit}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchType"
                    label="采购类型"
                    min-width="130">
                    <template scope="props">
                        {{props.row.purchType | purchTypeToText}}
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
            <el-tabs v-model="tabCard_val" class="noFlot" type="card" @tab-click="handleClick">
                <!--商品信息-->
                <el-tab-pane label="商品信息" name="first">
                    <div>
                        <el-table
                            :data="finPurchPayDetail"
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
                                prop="proName"
                                label="商品名称"
                                min-width="130">
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
                                prop="proNum"
                                label="商品货号"
                                min-width="120">
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
                                prop="purchNum"
                                label="计划采购数量"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="buyPrice"
                                    label="进货价"
                                    min-width="90">
                                <template scope="scope">
                                    <div v-if="scope.row.buyPrice">
                                        {{scope.row.buyPrice | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchPrice"
                                label="计划采购金额"
                                min-width="125">
                                <template scope="scope">
                                    {{scope.row.purchNum * scope.row.buyPrice | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purInNum"
                                label="入库数量"
                                min-width="90">
                                <template scope="scope">
                                    {{scope.row.purInNum | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="maxbatchprice"
                                label="入库金额"
                                min-width="90">
                                <template scope="scope">
                                    {{scope.row.buyPrice * 100 * scope.row.purInNum / 100 | priceToText}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {payTimeQueryFlag, purchStatusPay, purchTypeFlag, psettleStatus, rejectStatusPay} from '@/dataControl.js';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                outerUrl: '',
                outerDetailUrl: '',
                multipleSelection: [],
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
                finPurchPayList: [],
                finPurchPayDetail: [],
                tabCard_val: 'first',
                supNameList: [],
                formData: {
                    psettleStatus: '',
                    timeType: 1,
                    endTime: '',
                    startTime: '',
                    rejectStatus: '',
                    purchType: '',
                    supplierName: '',
                    purchStatus: '',
                    orderId: ''
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
        created() {
            this.creatInf(1, this.formData);
            this.loadSupplier();
        },
        methods: {
            infoShow() {
                this.infoShowFn = true;
            },
            searchTimeTypeSelec() {
                this.value1 = '';
                this.value2 = '';
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            getDetailInfo(row) {
                let params = {};
                params.psettleCode = row.psettleCode;
                params.purchId = row.purchId;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/finPurchPay/queryFinPurchPayDetail',
                    data: params
                }).then((res) => {
                    this.finPurchPayDetail = res.data.finPurchPayDetail;
                    this.infoShowFn = true;
                    console.log(this.finPurchPayDetail);
                }).catch((error) => {
                    console.log(error);
                });
            },
            launchSettlement() {
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请先选择需要结算的订单');
                    return false;
                }
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    if (i !== 0) {
                        if (this.multipleSelection[i].supplierName !== this.multipleSelection[0].supplierName) {
                            this.$xeMessage.warning('请选择相同的供应商');
                            return false;
                        }
                    }
                };
                console.log('test', _this.multipleSelection);
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection.forEach(function(value) {
                    if (value.purchType === 1 && (value.purchStatus === 4 || value.purchStatus === 5) && (value.orderStatus === 2 || value.orderStatus === 1) && value.venType === '1' && value.psettleStatus === 1) { // 提交条件 零采／完成／已完成或发货／自营／未付款
                        checkInfoObj.formSupInfoArr.push(value.psettleCode);
                    } else {
                        checkInfoObj.disArr.push(value.psettleCode);
                    };
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    this.$xeMessage.warning('没有可以提交的结算账单,请检查结算账单状态及类型');
                    return false;
                };
                checkInfoObj.tips = '仅结算采购单为成功，采购单类型是零采，订单状态是已发货的账单。';
                console.log('test', checkInfoObj.psettleCodeArr);
                this.$confirm(checkInfoObj.tips, '结算账单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let params = {};
                    params.psettleCodeArr = checkInfoObj.formSupInfoArr;
                    params.supplierName = this.multipleSelection[0].supplierName;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/finPurchPay/launchSettlement',
                        data: params
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                    });
                    console.log('test');
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            onSubmit() {
                this.creatInf(1, this.formData);
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            resetForm(formName) {
                this.value1 = '';
                this.value2 = '';
                this.$refs[formName].resetFields();
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
            loadSupplier() {
                let param = {};
                this.$http({ // 查询供应商名称
                    method: 'post',
                    url: '/xe-route/xe-erp/finPurchPay/querySupNameList',
                    data: param
                }).then((res) => {
                    this.supNameList = res.data.supNameList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            loadqueryStoreReject() {
                let param = {};
                param.delFlag = 1;
                param.storeType = 5;
                param.storeStatus = 1;
                this.$http({ // 查询仓库名称列表
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
            creatInf(pageNum, formData) {
                console.log('test');
                let data = {};
                data = this.formData;
                if (!this.startTimes) {
                    if (this.value1) {
                        data.startTime = millisecondFormat(this.value1.getTime(), 'ms');
                    } else {
                        data.startTime = '';
                    }
                }
                if (!this.endTimes) {
                    if (this.value2) {
                        data.endTime = millisecondFormat(this.value2.getTime(), 'ms');
                    } else {
                        data.endTime = '';
                    }
                }
                data.proCategory = this.cateId;
                data.areaId = this.saleAreaId;
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                this.outerUrl = '/xe-route/xe-erp/finance/exFinPurchPayList?endTime=' + data.endTime + '&orderId=' + data.orderId + '&psettleStatus=' + data.psettleStatus + '&purchStatus=' + data.purchStatus + '&purchType=' + data.purchType + '&rejectStatus=' + data.rejectStatus + '&startTime=' + data.startTime + '&supplierName=' + data.supplierName + '&timeType=' + data.timeType;
                // mingxi
                this.outerDetailUrl = '/xe-route/xe-erp/finance/exFinPurchPayDetail?endTime=' + data.endTime + '&orderId=' + data.orderId + '&psettleStatus=' + data.psettleStatus + '&purchStatus=' + data.purchStatus + '&purchType=' + data.purchType + '&rejectStatus=' + data.rejectStatus + '&startTime=' + data.startTime + '&supplierName=' + data.supplierName + '&timeType=' + data.timeType;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/finPurchPay/queryFinPurchPayList',
                    data: data
                }).then((res) => {
                    this.finPurchPayList = res.data.finPurchPayList;
                    this.xePageInfo.pageNum = res.data.xePageInfo.pageNum;
                    this.xePageInfo.total = res.data.xePageInfo.total;
                    if (this.finPurchPayList.length) {
                        this.getDetailInfo(res.data.finPurchPayList[0]);
                    } else {
                        this.infoShowFn = false;
                    }
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        computed: {
            payTimeQueryFlagList() {
                return payTimeQueryFlag;
            },
            purchStatusPayList() {
                return purchStatusPay;
            },
            psettleStatusList() {
                return psettleStatus;
            },
            rejectStatusPayList() {
                return rejectStatusPay;
            },
            purchTypeFlagList() {
                return purchTypeFlag;
            }
        }
    };
</script>
