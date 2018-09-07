<template lang="html">
    <div class="m-router-con">
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
                <el-form-item prop="formIdVlaue">
                    <el-input size="small" v-model="formData.formIdVlaue" placeholder="请输入查询内容"></el-input>
                </el-form-item>
                <el-form-item prop="formTimeType">
                    <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.formTimeType" placeholder="查询条件">
                        <el-option
                            v-for="item in formTimeTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        ref="formTimeStartValue"
                        v-model="value1"
                        type="date"
                        size="small"
                        @change="formTimeStartValueFn"
                        :picker-options="pickerOptionStart"
                        placeholder="开始日期"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                    <el-date-picker
                        ref="formTimeEndValue"
                        v-model="value2"
                        type="date"
                        size="small"
                        @change="formTimeEndValueFn"
                        :picker-options="pickerOptionEnd"
                        placeholder="结束日期"
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
                            <el-form-item prop="formIdVlaue">
                                <el-input size="small" style="width:330px" v-model="formData.formIdVlaue" placeholder="请输入查询内容"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="formTimeType">
                                <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.formTimeType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in formTimeTypeList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    ref="formTimeStartValue"
                                    style="width:160px" 
                                    v-model="value1"
                                    type="date"
                                    size="small"
                                    @change="formTimeStartValueFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始日期"
                                >
                                </el-date-picker>
                                &nbsp;
                                <el-date-picker
                                    ref="formTimeEndValue"
                                    style="width:160px" 
                                    v-model="value2"
                                    type="date"
                                    size="small"
                                    @change="formTimeEndValueFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
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
                            <el-form-item label="退货单状态" prop="rejectStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.rejectStatus" placeholder="退货单状态">
                                    <el-option
                                        v-for="item in rejectStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
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
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="saveGoodsReject"><i class="iconfont icon-wancheng"></i> 完成入库</el-button>
            <el-button class="xe-button-normal"><i class="iconfont icon-dayin"></i> 打印</el-button>
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出</el-button> -->
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出明细</el-button> -->
        </div>
        <!-- {{rejectViewList}} -->
        <!-- {{afterSaleViewList}} -->
        <div class="goodsTable">
            <el-table
                :data="rejectViewList"
                border
                highlight-current-row 
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
                    label="退货单号">
                    <template scope="scope">
                        <a class="s-blue" @click="getDetailInfo(scope.row)">{{scope.row.rejectCode}}</a>
                    </template>
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column
                    prop="createDate"
                    sortable
                    label="创建时间"
                    min-width="160">
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="退货仓库"
                    min-width="160">
                </el-table-column>
                <el-table-column
                    prop="rejectReason"
                    label="退货原因"
                    min-width="160">
                    <template scope="scope">
                        {{scope.row.rejectReason | afterSaleReasonToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="rejectStatus"
                    label="退货单状态"
                    min-width="125">
                    <template scope="props">
                        <div>
                            {{props.row.rejectStatus | rejectStatusToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="afterSalesCode"
                    min-width="160"
                    label="售后单号">
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    min-width="150"
                    label="订单编号">
                </el-table-column>
                    prop="loginAccount"
                    label="客户账号"
                    min-width="125">
                </el-table-column>
                <el-table-column
                    prop="modifyDate"
                    label="计划退货退款金额"
                    min-width="175">
                </el-table-column>
                <el-table-column
                    prop=""
                    label="操作"
                    fixed="right"
                    min-width="85">
                    <template scope="props">
                        <div class="btn-in-table" v-if="props.row.rejectStatus === 1">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">确认入库</a>
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
                <!-- {{tableData2}} -->
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
                                    label="销售成交价"
                                    min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{scope.row.proPrice | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="averagePrice"
                                    label="平均成本价"
                                    min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.averagePrice">
                                        {{scope.row.averagePrice | priceToText}}
                                    </div>
                                    <div v-else>
                                        0
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rejectNum"
                                label="计划退货量"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                label="计划退货金额"
                                min-width="120">
                                <template scope="prop">
                                    {{prop.row.averagePrice * prop.row.rejectNum | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="finishNum"
                                label="已入库量"
                                min-width="120">
                                <template scope="prop">
                                    {{prop.row.finishNum | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="currentInNum"
                                label="本次入库量"
                                min-width="120">
                                <template scope="prop">
                                    {{prop.row.currentInNum | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="已入库金额"
                                min-width="120">
                                <template scope="prop">
                                    <div v-if="prop.row.averagePrice">
                                        {{prop.row.finishNum * prop.row.averagePrice | priceToText}}
                                    </div>
                                    <div v-else>
                                        0
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="本次入库金额"
                                min-width="120">
                                <template scope="prop">
                                    <div v-if="prop.row.currentInNum">
                                        {{prop.row.finishNum * prop.row.averagePrice | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rejectAmount"
                                label="退货退款金额"
                                min-width="120">
                                <template scope="prop">
                                    {{prop.row.rejectAmount | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="操作"
                                fixed="right"
                                min-width="65">
                                <template scope="props">
                                    <div class="btn-in-table" v-if="rejectStatus === 1">
                                        <a href="javascript:;" class="s-blue" @click="editRefundGoods(tableData2)">修改</a>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!-- 确认入库数量 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="确认入库数量" :visible.sync="dialogVisible" size="small" @close="dialogClosesup">
                <div class="clearfix supplier-userList">
                    <!-- {{supplierList}} -->
                    <div class="clearfix">
                        <div class="">
                            <el-table
                                :data="supplierList"
                                border
                                style="width: 100%"
                                ref = "supplierList">
                                <el-table-column prop="proNum" label="商品货号" min-width="110"></el-table-column>
                                <el-table-column prop="proName" label="商品名称" min-width="110"></el-table-column>
                                <el-table-column prop="rejectNum" label="计划退货量" min-width="110"></el-table-column>
                                <el-table-column
                                    prop="finishNum"
                                    label="已入库量"
                                    min-width="120">
                                </el-table-column>
                                <el-table-column label="本次入库量" min-width="110">
                                    <template scope="props">
                                        <!-- {{props.row.currentInNum}} -->
                                        <el-input size="small" style="width: 100%;" v-model.number="props.row.currentInNum" placeholder="本次入库量" :maxlength="8" @blur="props.row.currentInNum = parseFloat($event.target.value) > 0 ? props.row.currentInNum = parseFloat($event.target.value).toFixed(2) : 0"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="saveSupplierName">确定</el-button>
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    import {formIdType02, formTimeType03, rejectStatus} from '@/dataControl.js';
    import { millisecondFormat, deepCopy } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                picDir: '',
                picServer: '',
                actionList: [],
                multipleSelection: [],
                infoShowFn: false,
                dialogVisible: false,
                supplierList: [],
                shopInfo: {},
                rejectStatus: '',
                rejectCode: '',
                xePageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                rejectViewList: [],
                tableData2: [],
                tabCard_val: 'first',
                formData: {
                    formIdType: 1,
                    formIdVlaue: '',
                    formTimeType: 1,
                    formTimeStartValue: '',
                    formTimeEndValue: '',
                    rejectStatus: '',
                    saleAreaIds: [],
                    cateIds: [],
                    storeIdReject: ''
                },
                storeIdRejectList: [],
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
                return formIdType02;
            },
            rejectStatusList() {
                return rejectStatus;
            },
            formTimeTypeList() {
                return formTimeType03;
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
            formTimeStartValues: {
                get() {
                    return this.formData.formTimeStartValue;
                },
                set(val) {
                    if (!val) {
                        this.formData.formTimeStartValue = '';
                    } else {
                        this.formData.formTimeStartValue = val;
                    }
                }
            },
            formTimeEndValues: {
                get() {
                    return this.formData.formTimeEndValue;
                },
                set(val) {
                    if (!val) {
                        this.formData.formTimeEndValue = '';
                    } else {
                        this.formData.formTimeEndValue = val;
                    }
                }
            }
        },
        created() {
            this.loadqueryStoreReject();
            this.creatInf(1, this.formData);
        },
        methods: {
            infoShow() {
                this.infoShowFn = true;
            },
            dialogClosesup() {
                this.shopInfo = {};
            },
            editRefundGoods(list) {
                console.log('testList', list);
                this.dialogVisible = true;
                this.supplierList = deepCopy(list);
                for (var i = 0; i < this.supplierList.length; i++) {
                    this.$set(this.supplierList[i], 'currentInNum', 0);
                };
            },
            saveGoodsReject() {
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请先选择需要完成入库的退货单。');
                    return;
                }
                if (this.multipleSelection.length > 1) {
                    this.$xeMessage.warning('请选择单条退货单进行完成入库操作。');
                    return;
                }
                let formCodes = [];
                this.multipleSelection.forEach(item => {
                    if (item.rejectStatus === 1) {
                        formCodes.push(item.rejectCode);
                    } else {
                        this.$xeMessage.warning('仅支持状态为“退货中”的退货单，其他状态将会自动过滤。');
                        return false;
                    }
                });
                if (formCodes.length > 0) {
                    this.$confirm('您确认完成选中退货单的退货入库吗？', '退货入库', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let params = {};
                        params.formCodes = formCodes;
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-erp/goodsReject/receiveGoodsRejectList',
                            data: params
                        }).then((res) => {
                            this.$xeMessage.success(res.msg);
                            setTimeout(function () {
                                _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                            }, 300);
                        }).catch((error) => {
                            console.log(error);
                        });
                        // this.listSubmit(checkInfoObj.formSupInfoArr, 3);
                    }).catch((cancel) => {
                        console.log(cancel);
                    });
                }
            },
            saveSupplierName() {
                console.log('testsupplierList', deepCopy(this.supplierList));
                let countNum = 0;
                for (var i = 0; i < this.supplierList.length; i++) {
                    countNum += parseFloat(this.supplierList[i].currentInNum);
                    if (this.supplierList[i].currentInNum > this.supplierList[i].rejectNum - this.supplierList[i].finishNum) {
                        this.$xeMessage.warning('已入库量与本次入库量之和不能大于计划退货量。');
                        return false;
                    }
                };
                if (countNum === 0) {
                    this.$xeMessage.warning('本次入库量未做修改，请确认后保存或取消。');
                    return false;
                }
                this.tableData2 = deepCopy(this.supplierList);
                this.dialogVisible = false;
            },
            searchTimeTypeSelec() {
                this.value1 = '';
                this.value2 = '';
            },
            formTimeStartValueFn(val) {
                this.formTimeStartValues = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            formTimeEndValueFn(val) {
                this.formTimeEndValues = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            handleSelectionChange(val) {
                console.log('testvals', val);
                this.multipleSelection = val;
            },
            getDetailInfo(row) {
                let params = {};
                params.rejectCode = row.rejectCode;
                this.rejectStatus = row.rejectStatus;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/goodsReject/queryRejectDetail',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.tableData2 = res.data.rejectDetailList;
                        this.rejectCode = row.rejectCode; // 保存当前商品对应的退货单号
                        this.infoShowFn = true;
                        this.picServer = res.data.picServer;
                        this.picDir = res.data.picDir;
                        console.log(this.tableData2);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            onSubmit() {
                this.creatInf(1, this.formData);
            },
            procureDetails(row) {
                if (row.rejectCode === this.rejectCode) { // 保存当前商品对应的退货单号
                    let param = {
                        rejectCode: row.rejectCode,
                        storeName: row.storeName,
                        storeId: row.storeId,
                        list: []
                    };
                    let proList = [];
                    let currentInNum = 0;
                    for (var i = 0; i < this.tableData2.length; i++) {
                        currentInNum += this.tableData2[i].currentInNum;
                        proList.push({
                            proSku: this.tableData2[i].proSku,
                            currentInNum: this.tableData2[i].currentInNum,
                            batchPrice: this.tableData2[i].averagePrice,
                            proMainImg: this.tableData2[i].proPicture,
                            proNum: this.tableData2[i].proNum,
                            proCategoryId: this.tableData2[i].proOrgCode,
                            proCategoryName: this.tableData2[i].proOrgCodeName,
                            proName: this.tableData2[i].proName,
                            proUnit: this.tableData2[i].proUnit,
                            proSepcValue: this.tableData2[i].specValue,
                            proSpecName: this.tableData2[i].specName,
                            proPricingType: this.tableData2[i].pricingType
                        });
                    }
                    console.log('test', currentInNum);
                    if (!currentInNum) {
                        this.$xeMessage.warning('请先在底部修改出填入入库数量，才能进行“确认入库”操作。');
                        return false;
                    }
                    param.list = proList;
                    let _this = this;
                    console.log('test', param);
                    this.$confirm('您确认按照当前填入的“本次入库量”进行入库操作吗？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.$http({ // 查询退货仓库名称列表
                            method: 'post',
                            url: '/xe-route/xe-erp/goodsReject/receiveGoodsReject',
                            data: param
                        }).then((res) => {
                            this.$xeMessage.success(res.msg);
                            setTimeout(function () {
                                _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                            }, 300);
                        }).catch((error) => {
                            console.log(error);
                        });
                    }).catch((cancel) => {
                        console.log(cancel);
                    });
                } else {
                    this.$xeMessage.warning('底部修改信息和该条退货单信息不符。');
                }
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
            creatInf(pageNum, formData) {
                let data = {};
                data = this.formData;
                if (!this.formTimeStartValues) {
                    if (this.value1) {
                        data.formTimeStartValue = millisecondFormat(this.value1.getTime());
                    }
                }
                if (!this.formTimeEndValues) {
                    if (this.value2) {
                        data.formTimeEndValue = millisecondFormat(this.value2.getTime());
                    }
                }
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                data.areaId = this.saleAreaId;
                data.proCategory = this.cateId;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/goodsReject/queryRejectList',
                    data: data
                }).then((res) => {
                    this.rejectViewList = res.data.rejectViewList;
                    this.xePageInfo = res.data.xePageInfo;
                    if (this.rejectViewList.length > 0) {
                        this.getDetailInfo(this.rejectViewList[0]);
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
