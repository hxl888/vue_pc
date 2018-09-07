<template lang="html">
    <div class="m-router-con">
        <!--采购单-->
        <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="searchType">
                    <el-select size="small" class="xe-input-w110" v-model="formData.searchType" placeholder="查询条件">
                        <el-option
                            v-for="item in procureQueryFlagFnList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchText">
                    <el-input size="small" v-model="formData.searchText" placeholder="请输入查询内容"></el-input>
                </el-form-item>
                <el-form-item prop="searchTimeType">
                    <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.searchTimeType" placeholder="查询条件">
                        <el-option
                            v-for="item in procureTimeQueryFlagList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        ref="searchTimeStart"
                        v-model="value1"
                        type="date"
                        size="small"
                        @change="searchTimeStartFn"
                        :picker-options="pickerOptionStart"
                        placeholder="开始日期"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                    <el-date-picker
                        ref="searchTimeEnd"
                        v-model="value2"
                        type="date"
                        size="small"
                        @change="searchTimeEndFn"
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
                            <el-form-item prop="searchType">
                                <el-select size="small" class="xe-input-w110" v-model="formData.searchType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in procureQueryFlagFnList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="searchText">
                                <el-input size="small" style="width:330px" v-model="formData.searchText" placeholder="请输入查询内容"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="searchTimeType">
                                <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.searchTimeType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in procureTimeQueryFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    ref="searchTimeStart"
                                    style="width:160px"
                                    v-model="value1"
                                    type="date"
                                    size="small"
                                    @change="searchTimeStartFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始日期"
                                >
                                </el-date-picker>
                                &nbsp;
                                <el-date-picker
                                    ref="searchTimeEnd"
                                    style="width:160px"
                                    v-model="value2"
                                    type="date"
                                    size="small"
                                    @change="searchTimeEndFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                           <el-form-item label="采购类型" prop="purchType">
                                <el-select size="small" style="width: 148px;" v-model="formData.purchType" placeholder="采购类型">
                                    <el-option
                                        v-for="item in purchTypeFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="审核状态" prop="checkStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.checkStatus" placeholder="审核状态">
                                    <el-option
                                        v-for="item in checkStatusFlagList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                           <el-form-item label="采购单状态" prop="purchStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.purchStatus" placeholder="采购单状态">
                                    <el-option
                                        v-for="item in purchStatusFlagList"
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
            <el-button class="xe-button-normal" @click="linkToadd"><i class="iconfont icon-xinzeng"></i> 新增</el-button>
            <el-button class="xe-button-normal" @click="checkPass"><i class="iconfont icon-shenhe"></i> 审核通过</el-button>
            <el-button class="xe-button-normal" @click="checkunPass"><i class="iconfont icon-jinyong"></i> 审核不通过</el-button>
            <el-button class="xe-button-normal" @click="deletlot"><i class="iconfont icon-shanchu"></i> 删除</el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i> 导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"><i class="iconfont icon-daochu"></i> 导出明细</el-button>
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-dayin"></i> 打印</el-button> -->
        </div>
        <!-- {{purchList}} -->
        <div class="goodsTable">
            <el-table
                :data="purchList"
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
                        min-width="150"
                        label="采购单号">
                    <template scope="scope">
                        <a class="s-blue" @click="getDetailInfo(scope.row)">{{scope.row.purchOrder}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="supplierName"
                    label="供货商名称"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="仓库"
                    min-width="85">
                </el-table-column>
                <el-table-column
                    prop="frontMoney"
                    label="定金/元"
                    min-width="85">
                    <template scope="prop">
                        <div v-if="prop.row.frontMoney">
                            {{prop.row.frontMoney | priceToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchAmount"
                    label="采购费用／元"
                    min-width="110">
                    <template scope="prop">
                        <div v-if="prop.row.purchAmount">
                            {{prop.row.purchAmount | priceToText}}
                        </div>
                    </template>
                </el-table-column>
                </el-table-column>
                <el-table-column
                    prop="settlementMethod"
                    label="结算方式"
                    min-width="100">
                    <template scope="scope">
                        {{scope.row.settlementMethod | settlementMethodToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="checkStatus"
                    label="审核状态"
                    min-width="105">
                    <template scope="props">
                        <div>
                            {{props.row.checkStatus | cgdCheckStatusToText}}
                        </div>
                        <el-tooltip effect="dark" placement="top" v-if="props.row.checkStatus === 4 || props.row.checkStatus === 5">
                            <div slot="content" class="tips-item">{{props.row.checkStatus === 4 ? props.row.purchExamineRemark : props.row.financeExamineRemark}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchStatus"
                    label="采购单状态"
                    min-width="100">
                    <template scope="scope">
                        {{scope.row.purchStatus | purchStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchType"
                    label="采购类型"
                    min-width="110">
                    <template scope="scope">
                        {{scope.row.purchType | purchTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="signDate"
                    label="制单日期"
                    min-width="120">
                    <template scope="scope">
                        {{scope.row.signDate}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expectedArrivalDate"
                    label="预计到货日期"
                    min-width="120">
                    <template scope="scope">
                        {{scope.row.expectedArrivalDate}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="completeDate"
                    label="完成时间"
                    min-width="160">
                </el-table-column>
                <el-table-column
                    prop="orderStr"
                    label="订单编号"
                    min-width="160">
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作"
                        fixed="right"
                        min-width="210">
                    <template scope="props">
                        <!-- 审核状态 -->
                        <!-- 待提交 -->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 1">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" v-if="props.row.purchStatus !== 6" @click="editBtn(props.row)">编辑</a>
                            <a href="javascript:;" class="s-blue" v-if="props.row.purchType === 2" @click="deletSingle(props.row)">删除</a>
                            <a href="javascript:;" class="s-blue" @click="">打印</a>
                        </div>
                        <!-- 待采购部审核 -->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 2">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" v-if="props.row.purchStatus !== 6" @click="checkoutBtn(props.row)">审核</a>
                            <a href="javascript:;" class="s-blue" @click="">打印</a>
                        </div>
                        <!-- 待财务部审核 -->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 3">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" @click="">打印</a>
                        </div>
                        <!-- 采购部驳回 -->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 4">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" v-if="props.row.purchStatus !== 6" @click="editBtn(props.row)">编辑</a>
                            <a href="javascript:;" class="s-blue" @click="">打印</a>
                        </div>
                        <!-- 财务部驳回 -->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 5">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" v-if="props.row.purchStatus !== 6" @click="editBtn(props.row)">编辑</a>
                            <a href="javascript:;" class="s-blue" @click="">打印</a>
                        </div>
                        <!-- 已审核 -->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 6">
                            <a href="javascript:;" class="s-blue" @click="procureDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" @click="">打印</a>
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
                                        <img :src="picServer + picDir + props.row.picUrl" alt="品牌logo" width="60" height="60">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proSku"
                                    label="SKU编码"
                                    min-width="135">
                            </el-table-column>
                            <el-table-column
                                    prop="proNo"
                                    label="商品货号"
                                    min-width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="proName"
                                    label="商品名称"
                                    min-width="130">
                            </el-table-column>
                            <el-table-column
                                    prop="categoryName"
                                    label="商品分类"
                                    min-width="130">
                            </el-table-column>
                            <el-table-column
                                    prop="priceType"
                                    label="计量方式"
                                    min-width="100">
                                <template scope="scope">
                                    {{scope.row.priceType | pricingTypeToText}}
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
                                    prop="buyPrice"
                                    label="进货价"
                                    min-width="90">
                                <template scope="scope">
                                    <div v-if="scope.row.buyPrice">
                                        {{scope.row.buyPrice}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proNum"
                                    label="计划入库数量"
                                    min-width="130">
                                <template scope="scope">
                                    {{scope.row.proNum}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="arriveNum"
                                label="已入库数量"
                                min-width="130">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.arriveNum | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proAmount"
                                    label="采购费用"
                                    min-width="150">
                                <template scope="scope">
                                    <div v-if="scope.row.proAmount">
                                        {{scope.row.proAmount | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="receivedCharges"
                                    label="已收货费用"
                                    min-width="150">
                                <template scope="scope">
                                    <div v-if="scope.row.receivedCharges">
                                        {{scope.row.receivedCharges | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    min-width="120">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--驳回弹框-->
        <div  class="reset-dialog dialog_wid340 textare_reset300" >
            <el-dialog title="驳回理由" :visible.sync="rejectdailog">
                <textarea class="" :maxlength="200" v-model="rejectext" style="height: 118px; width: 300px;"></textarea>
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
    import {procureTimeQueryFlag, procureQueryFlag, purchTypeFlag, checkStatusFlag, purchStatusFlag} from '@/dataControl.js';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                outerDetailUrl: '',
                outerUrl: '',
                placeholder: '请输入订单号',
                actionList: [],
                multipleSelection: [],
                rejectdailog: false,
                rejectArr: [],
                rejectext: '',
                infoShowFn: false,
                xePageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                picServer: '',
                picDir: 'product/80/80/',
                purchList: [],
                tableData2: [],
                tabCard_val: 'first',
                formData: {
                    checkStatus: '',
                    purchStatus: '',
                    purchType: '',
                    searchText: '',
                    searchType: 1,
                    searchTimeType: 1,
                    searchTimeStart: '',
                    searchTimeEnd: ''
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
            procureTimeQueryFlagList() {
                return procureTimeQueryFlag;
            },
            procureQueryFlagFnList() {
                return procureQueryFlag;
            },
            purchTypeFlagList() {
                return purchTypeFlag;
            },
            checkStatusFlagList() {
                return checkStatusFlag;
            },
            purchStatusFlagList() {
                return purchStatusFlag;
            },
            searchTimeStarts: {
                get() {
                    return this.formData.searchTimeStart;
                },
                set(val) {
                    if (!val) {
                        this.formData.searchTimeStart = '';
                    } else {
                        this.formData.searchTimeStart = val;
                    }
                }
            },
            rejectextNum: function() {
                return this.rejectext.length;
            },
            searchTimeEnds: {
                get() {
                    return this.formData.searchTimeEnd;
                },
                set(val) {
                    if (!val) {
                        this.formData.searchTimeEnd = '';
                    } else {
                        this.formData.searchTimeEnd = val;
                    }
                }
            }
        },
        created() {
            this.creatInf(1, this.formData);
            this.pullDown();
        },
        methods: {
            infoShow() {
                this.infoShowFn = true;
            },
            searchTimeTypeSelec() {
                this.value1 = '';
                this.value2 = '';
            },
            searchTimeStartFn(val) {
                this.searchTimeStarts = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            searchTimeEndFn(val) {
                this.searchTimeEnds = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            deletlot() {
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请选择');
                    return;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection.forEach(function(value) {
                    if (value.checkStatusPre === 1 && value.purchStatusPre === 1 && value.purchType === 2) {
                        checkInfoObj.formSupInfoArr.push({
                            checkStatusPre: value.checkStatusPre,
                            purchOrder: value.purchOrder,
                            purchType: value.purchType,
                            purchStatusPre: value.purchStatusPre,
                            version: value.version
                        });
                    } else {
                        checkInfoObj.disArr.push(value.purchOrder);
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    this.$xeMessage.warning('没有可以删除的采购单,请检查采购单状态');
                    return false;
                }
                if (checkInfoObj.disArr.length > 0) {
                    checkInfoObj.tips = '采购单编码为' + checkInfoObj.disArr.join(',') + '的状态不能删除, 是否继续?';
                } else {
                    checkInfoObj.tips = '确认删除选中的采购单, 是否继续?';
                }
                this.$confirm(checkInfoObj.tips, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.listSubmit(checkInfoObj.formSupInfoArr, 3);
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            checkPass() {
                // const _this = this;
                let checkInfoObj = this.checkInfo(3);
                if (checkInfoObj.nextFlag) {
                    this.$confirm(checkInfoObj.tips, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.listSubmit(checkInfoObj.formSupInfoArr, 1);
                    }).catch((cancel) => {
                        console.log(cancel);
                    });
                }
            },
            checkunPass() {
                // const _this = this;
                let checkInfoObj = this.checkInfo(4);
                if (checkInfoObj.nextFlag) {
                    this.$confirm(checkInfoObj.tips, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.rejectdailog = true;
                        this.rejectArr = checkInfoObj.formSupInfoArr;
                        // this.listSubmit(formSupInfoArr, 2);
                    }).catch((cancel) => {
                        console.log(cancel);
                    });
                }
            },
            checkInfo(checkStatus) {
                let _this = this;
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                checkInfoObj.nextFlag = true;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请选择');
                    checkInfoObj.nextFlag = false;
                    return checkInfoObj;
                }
                _this.multipleSelection.forEach(function(value) {
                    if (value.checkStatusPre === 2 && value.purchStatusPre === 2) {
                        checkInfoObj.formSupInfoArr.push({
                            checkStatusPre: value.checkStatusPre,
                            checkStatus: checkStatus,
                            purchOrder: value.purchOrder,
                            purchStatus: 2,
                            purchStatusPre: value.purchStatusPre,
                            version: value.version
                        });
                    } else {
                        checkInfoObj.disArr.push(value.purchOrder);
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    this.$xeMessage.warning('没有可以提交的可以审核的采购单,请检查采购单状态');
                    checkInfoObj.nextFlag = false;
                    return checkInfoObj;
                }
                if (checkInfoObj.disArr.length > 0) {
                    checkInfoObj.tips = '采购单编码为' + checkInfoObj.disArr.join(',') + '的状态不能提交，共提交' + checkInfoObj.formSupInfoArr.length + '条， 是否继续?';
                } else {
                    checkInfoObj.tips = '确认提交审核选中的采购单, 是否继续?';
                }
                return checkInfoObj;
            },
            rejectSubmit() {
                if (this.rejectext) {
                    if (this.rejectext.length <= 200) {
                        this.rejectArr.forEach(item => { // 选中值中加理由
                            item.purchExamineRemark = this.rejectext;
                        });
                        this.listSubmit(this.rejectArr, 2, () => {
                            this.cancelReject();
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
                this.rejectArr = [];
                this.rejectext = '';
            },
            listSubmit(param, type, fn) {
                var _this = this;
                let ajaxUrl = '';
                if (type === 1) {
                    ajaxUrl = '/xe-route/xe-erp/purch/purchCheckBatch';
                } else if (type === 2) {
                    ajaxUrl = '/xe-route/xe-erp/purch/purchRejectBatch';
                } else {
                    ajaxUrl = '/xe-route/xe-erp/purch/delBatchPurch';
                }
                this.$http({ // 审核采购单
                    method: 'post',
                    url: ajaxUrl,
                    data: {
                        formList: param
                    }
                }).then((res) => {
                    fn && fn();
                    if (res.data.msg) {
                        this.$xeMessage.success(res.data.msg);
                    } else {
                        this.$xeMessage.success(res.msg);
                    }
                    setTimeout(function () {
                        _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch((error) => {
                    this.$xeMessage.warning(error.msg);
                });
            },
            handleSelectionChange(val) {
                console.log('testvals', val);
                this.multipleSelection = val;
            },
            linkToadd() { // 新增
                this.$router.push({name: 'addprocurement'});
            },
            editBtn(row) { // 编辑
                this.$router.push({name: 'editprocurement', query: {purchOrder: row.purchOrder, version: row.version}});
            },
            procureDetails(row) { // 查看
                this.$router.push({name: 'procureDetails', query: {purchOrder: row.purchOrder, version: row.version}});
            },
            checkoutBtn(row) { // 审核
                this.$router.push({name: 'checkoutProcurement', query: {purchOrder: row.purchOrder, version: row.version}});
            },
            deletSingle(row) { // 删除
                let param = {
                    purchOrder: row.purchOrder,                       // 供货商code
                    checkStatusPre: row.checkStatusPre,
                    purchStatusPre: row.purchStatusPre,
                    purchType: row.purchType,
                    version: row.version
                };
                this.$confirm('确认删除该采购单, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var _this = this;
                    this.$http({ // 删除采购单
                        method: 'post',
                        url: '/xe-route/xe-erp/purch/delPurch',
                        data: param
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                        }, 300);
                    }).catch((error) => {
                        this.$xeMessage.warning(error.msg);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            getDetailInfo(row) {
                let params = {};
                params.purchOrder = row.purchOrder;
                params.purchType = row.purchType;
                // params.version = row.version;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/purch/queryPurchProducts',
                    // url: '/xe-route/xe-erp/purch/detailPurch',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.tableData2 = res.data.productList;
                        this.infoShowFn = true;
                        this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            // 仓库下拉列表
            pullDown() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        lcfbFlag: ''
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            onSubmit() {
                console.log(this.formData);
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
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = this.formData;
                if (!this.searchTimeStarts) {
                    if (this.value1) {
                        data.searchTimeStart = millisecondFormat(this.value1.getTime());
                    }
                }
                if (!this.searchTimeEnds) {
                    if (this.value2) {
                        data.searchTimeEnd = millisecondFormat(this.value2.getTime());
                    }
                }
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                this.outerUrl = '/xe-route/xe-erp/purchCenterExport/purchList?checkStatus=' + data.checkStatus + '&purchStatus=' + data.purchStatus + '&purchType=' + data.purchType + '&searchText=' + data.searchText + '&searchTimeEnd=' + data.searchTimeEnd + '&searchTimeStart=' + data.searchTimeStart + '&searchTimeType=' + data.searchTimeType + '&searchType=' + data.searchType;
                this.outerDetailUrl = '/xe-route/xe-erp/purchCenterExport/purchDetailList?checkStatus=' + data.checkStatus + '&purchStatus=' + data.purchStatus + '&purchType=' + data.purchType + '&searchText=' + data.searchText + '&searchTimeEnd=' + data.searchTimeEnd + '&searchTimeStart=' + data.searchTimeStart + '&searchTimeType=' + data.searchTimeType + '&searchType=' + data.searchType;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/purch/queryPurchList',
                    data: data
                }).then((res) => {
                    this.purchList = res.data.purchList;
                    this.xePageInfo = res.data.xePageInfo;
                    if (this.purchList.length) {
                        this.getDetailInfo(this.purchList[0]);
                    } else {
                        this.infoShowFn = false;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        components: {
        }
    };
</script>

<style lang="scss">
    .el-tabs__nav{
        float: left;
    }
    @import "../../../../../assets/styles/views/publicOrderStyle.scss";
</style>
