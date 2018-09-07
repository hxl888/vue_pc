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
                <el-form-item prop="formIdValue">
                    <el-input size="small" v-model="formData.formIdValue" placeholder="请输入查询内容"></el-input>
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
                        ref="formTimeStart"
                        v-model="value1"
                        type="date"
                        size="small"
                        @change="formTimeStartFn"
                        :picker-options="pickerOptionStart"
                        placeholder="开始日期"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                    <el-date-picker
                        ref="formTimeEnd"
                        v-model="value2"
                        type="date"
                        size="small"
                        @change="formTimeEndFn"
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
                            <el-form-item prop="formIdValue">
                                <el-input size="small" style="width:330px" v-model="formData.formIdValue" placeholder="请输入查询内容"></el-input>
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
                                    ref="formTimeStart"
                                    style="width:160px" 
                                    v-model="value1"
                                    type="date"
                                    size="small"
                                    @change="formTimeStartFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始日期"
                                >
                                </el-date-picker>
                                &nbsp;
                                <el-date-picker
                                    ref="formTimeEnd"
                                    style="width:160px" 
                                    v-model="value2"
                                    type="date"
                                    size="small"
                                    @change="formTimeEndFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                           <el-form-item label="退款状态" prop="refundStatus">
                                <el-select size="small" style="width: 148px;" v-model="formData.refundStatus" placeholder="退款状态">
                                    <el-option
                                        v-for="item in refundStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="退款类型" prop="refundType">
                                <el-select size="small" style="width: 148px;" v-model="formData.refundType" placeholder="退款类型">
                                    <el-option
                                        v-for="item in refundTypeList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
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
                           <el-form-item label="支付类型" prop="payChannel">
                                <el-select size="small" style="width: 148px;" v-model="formData.payChannel" placeholder="支付类型">
                                    <el-option
                                        v-for="item in payChannelList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="支付渠道" prop="payType">
                                <el-select size="small" style="width: 148px;" v-model="formData.payType" placeholder="支付渠道">
                                    <el-option
                                        v-for="item in payTypeList"
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
            <el-button class="xe-button-normal" @click="passAlot"><i class="iconfont icon-querenjieshou"></i> 接受退款申请</el-button>
            <el-button class="xe-button-normal" @click="rejectAlot"><i class="iconfont icon-jinyong"></i> 拒绝退款</el-button>
            <!-- <el-button class="xe-button-normal" @click="agreeAlot"><i class="iconfont icon-tuikuan"></i> 同意退款</el-button> -->
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-dayin"></i> 打印</el-button> -->
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i> 导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"><i class="iconfont icon-daochu"></i> 导出明细</el-button>
            <p class="fl" style="color: #ea5147;line-height: 30px;margin-left: 10px;">注：通过售后创建的退款单，系统不做资金流处理，需要财务在线下自主转账退款。</p>
        </div>
        <!-- {{orderRefundViewList}} -->
        <!-- {{afterSaleViewList}} -->
        <div class="goodsTable">
            <el-table
                :data="orderRefundViewList"
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
                    label="退款单号">
                    <template scope="scope">
                        <a class="s-blue" @click="getDetailInfo(scope.row)">{{scope.row.refundCode}}</a>
                    </template>
                </el-table-column>
                <!-- 创建时间 -->
                <el-table-column
                    prop="createDate"
                    sortable
                    label="创建时间"
                    min-width="160">
                </el-table-column>
                <!-- 退款类型 -->
                <el-table-column
                    label="退款类型"
                    min-width="160">
                    <template scope="prop">
                        {{prop.row.refundType | refundTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="退款状态"
                    min-width="160">
                    <template scope="prop">
                        <div>
                            {{prop.row.refundStatus | refundStatusToText}}
                        </div>
                        <el-tooltip effect="dark" placement="top" v-if="prop.row.refundStatus === 5">
                            <div slot="content" class="tips-item">{{prop.row.refusReason}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="afterSalesCode"
                    min-width="160"
                    label="售后单号">
                </el-table-column>
                <!-- 订单编号 -->
                <el-table-column
                    prop="orderId"
                    min-width="150"
                    label="订单编号">
                </el-table-column>
                <el-table-column
                    min-width="150"
                    label="支付类型">
                    <template scope="prop">
                        {{prop.row.payType | payTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="150"
                    label="支付渠道">
                    <template scope="prop">
                        {{prop.row.payChannel | payChannelToText}}
                    </template>
                </el-table-column>
                <!-- 退款时间 -->
                <el-table-column
                    prop="refundDate"
                    label="退款时间"
                    min-width="175">
                </el-table-column>
                <el-table-column
                    label="退款金额"
                    min-width="175">
                    <template scope="prop">
                        {{prop.row.realRefundedAmount + prop.row.freAmount | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    min-width="155">
                    <!-- 1：待确认退款 2：已确认退款 3：退款失败 4：退款处理中  5:拒绝退款 7:退款成功 -->
                    <template scope="props">
                        <div class="btn-in-table" v-if="props.row.refundStatus === 1">
                            <a href="javascript:;" class="s-blue" @click="passCheck(props.row)">接受申请</a>
                            <a href="javascript:;"  v-if="props.row.refundType > 2" class="s-blue" @click="rejectBtn(props.row)">拒绝退款</a>
                        </div>
                        <div class="btn-in-table" v-if="props.row.refundStatus === 2">
                            <a href="javascript:;" class="s-blue" @click="passOrderRefund(props.row)">同意退款</a>
                            <a href="javascript:;"  v-if="props.row.refundType > 2" class="s-blue" @click="rejectBtn(props.row)">拒绝退款</a>
                        </div>
                        <div class="btn-in-table" v-if="props.row.refundStatus === 3">
                            <a href="javascript:;" class="s-blue" @click="passOrderRefund(props.row)">重新退款</a>
                            <a href="javascript:;"  v-if="props.row.refundType > 2" class="s-blue" @click="rejectBtn(props.row)">拒绝退款</a>
                        </div>
                        <div class="btn-in-table" v-if="props.row.refundStatus === 4 && (props.row.refundType ===1 || props.row.refundType === 2)">
                            <a href="javascript:;" class="s-blue" @click="queryRefund(props.row)">手动同步状态</a>
                        </div>
                        <div class="btn-in-table" v-if="props.row.refundStatus === 5">
                            <span>已拒绝</span>
                        </div>
                        <div class="btn-in-table" v-if="props.row.refundStatus === 7">
                            <span>退款成功</span>
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
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{scope.row.proPrice | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchaseNum"
                                label="购买数量"
                                min-width="120">
                            </el-table-column>
                            <el-table-column
                                prop="proPrice"
                                label="订购金额"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{scope.row.proPrice * scope.row.purchaseNum | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="pmtAmount"
                                label="优惠金额"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.pmtAmount">
                                        {{scope.row.pmtAmount | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="specialDisamount"
                                label="特批优惠金额"
                                min-width="120">
                                <template scope="scope">
                                    <div v-if="scope.row.specialDisamount">
                                        {{scope.row.specialDisamount | priceToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="realSendNum"
                                label="实发量"
                                min-width="90">
                            </el-table-column>
                            <el-table-column
                                label="实发金额"
                                min-width="90">
                                <template scope="prop">
                                    {{prop.row.realSendNum * prop.row.proCostPrice | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop=""
                                label="可退金额"
                                min-width="120">
                                <template scope="prop">
                                    {{(prop.row.realSendNum * prop.row.proCostPrice * 100 - prop.row.realRefundAmount * 100) / 100 | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                label="退货量"
                                fixed="right"
                                min-width="120">
                                <template scope="prop">
                                    {{prop.row.rejectNum | priceToText}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="rejectAmount"
                                label="本次退款金额"
                                fixed="right"
                                min-width="120">
                                <template scope="prop">
                                    {{prop.row.rejectAmount | priceToText}}
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--审核弹框-->
        <el-dialog title="拒绝退款" :visible.sync="rejectdailog" :before-close="cancelReject" class="reset-dialog dialog_wid340 textare_reset300" >
            <div style="padding-bottom: 10px;color:#687281">您确认拒绝所选中退款单吗？</div>
            <textarea v-model="rejectreson" placeholder="请说明拒绝原因50字以内" :maxlength="50"></textarea>
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="rejectCheck()">确认</el-button>
                <el-button  class="xe-button-normal" @click="cancelReject">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    import {formIdType03, formTimeType02, refundStatus, refundType, payType02, payChannel} from '@/dataControl.js';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                outerDetailUrl: '',
                outerUrl: '',
                picDir: '',
                picServer: '',
                actionList: [],
                rejectreson: '',
                rejectdailog: false,
                refundCode: '',
                refundCodeArr: '',
                multipleSelection: [],
                infoShowFn: false,
                xePageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                orderRefundViewList: [],
                tableData2: [],
                tabCard_val: 'first',
                formData: {
                    formIdType: 1,
                    formIdValue: '',
                    formTimeType: 1,
                    formTimeStart: '',
                    formTimeEnd: '',
                    refundStatus: '',
                    refundType: '',
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
                return formIdType03;
            },
            refundStatusList() {
                return refundStatus;
            },
            refundTypeList() {
                return refundType;
            },
            payTypeList() {
                return payType02;
            },
            payChannelList() {
                return payChannel;
            },
            formTimeTypeList() {
                return formTimeType02;
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
            formTimeStarts: {
                get() {
                    return this.formData.formTimeStart;
                },
                set(val) {
                    if (!val) {
                        this.formData.formTimeStart = '';
                    } else {
                        this.formData.formTimeStart = val;
                    }
                }
            },
            formTimeEnds: {
                get() {
                    return this.formData.formTimeEnd;
                },
                set(val) {
                    if (!val) {
                        this.formData.formTimeEnd = '';
                    } else {
                        this.formData.formTimeEnd = val;
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
            searchTimeTypeSelec() {
                this.value1 = '';
                this.value2 = '';
            },
            formTimeStartFn(val) {
                this.formTimeStarts = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            formTimeEndFn(val) {
                this.formTimeEnds = val;
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
                params.refundCode = row.refundCode;
                // params.version = row.version;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/orderRefund/queryRefundDetail',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.tableData2 = res.data.refundDetailList;
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
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            passAlot() {
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请先选择需要接受退款申请的退款单');
                    return false;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection.forEach(function(value) {
                    if (value.refundStatus === 1) {
                        checkInfoObj.formSupInfoArr.push(value.refundCode);
                    } else {
                        checkInfoObj.disArr.push(value.refundCode);
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    this.$xeMessage.warning('没有可接收申请的退款单，请选择“待确认退款”状态的退款单。');
                    return false;
                }
                checkInfoObj.tips = '仅接收退款状态为“待确认退款”的退款单，其他状态将会自动过滤';
                this.$confirm(checkInfoObj.tips, '接受退款申请', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.batchOrderRefundList(checkInfoObj.formSupInfoArr, 2);
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            rejectAlot() {
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请先选择需要拒绝退款的退款单。');
                    return false;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection.forEach(function(value) {
                    if (value.refundStatus === 1 || value.refundStatus === 2 || value.refundStatus === 3) {
                        checkInfoObj.formSupInfoArr.push(value.refundCode);
                    } else {
                        checkInfoObj.disArr.push(value.refundCode);
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    this.$xeMessage.warning('没有可以提交的可以拒绝退款的退款单,请检查退款单状态');
                    return false;
                }
                checkInfoObj.tips = '仅支持状态为“待确认退款”、“已确认退款”和“退款失败”的退款单，其他状态将会自动过滤。';
                this.$confirm(checkInfoObj.tips, '拒绝退款', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.rejectBtn(checkInfoObj.formSupInfoArr, true);
                    // this.batchOrderRefundList(checkInfoObj.formSupInfoArr, 5);
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            // agreeAlot() {
            //     // 1
            //     let _this = this;
            //     if (this.multipleSelection.length === 0) {
            //         this.$xeMessage.warning('请先选择需要进行退款的退款单。');
            //         return false;
            //     }
            //     let checkInfoObj = {};
            //     checkInfoObj.formSupInfoArr = [];
            //     checkInfoObj.disArr = [];
            //     checkInfoObj.tips = '';
            //     _this.multipleSelection.forEach(function(value) {
            //         if (value.refundStatus === 2) {
            //             checkInfoObj.formSupInfoArr.push(value.refundCode);
            //         } else {
            //             checkInfoObj.disArr.push(value.refundCode);
            //         }
            //     });
            //     if (checkInfoObj.formSupInfoArr.length === 0) {
            //         this.$xeMessage.warning('没有可以提交的可以进行退款的退款单,请检查退款单状态');
            //         return false;
            //     }
            //     checkInfoObj.tips = '仅支持状态为“已确认退款”和“退款失败”的退款单，其他状态将会自动过滤。';
            //     this.$confirm(checkInfoObj.tips, '确认退款', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'warning'
            //     }).then(() => {
            //         let _this = this;
            //         let param = {};
            //         param.refundCode = row.refundCode;
            //         let ajaxUrl = '';
            //         if (row.payChannel !== 2) {
            //             ajaxUrl = '/xe-route/xe-erp/orderRefund/refundAllByOnlinePay'
            //             // ajaxUrl = '/xe-route/xe-erp/orderRefund/refundByOnlinePay';
            //         } else {
            //             ajaxUrl = '/xe-route/xe-erp/orderRefund/refundAllByWxPay';
            //             // ajaxUrl = '/xe-route/xe-erp/orderRefund/refundByWxPay';
            //         }
            //         this.$http({ // 退款单接受申请/拒绝退款
            //             method: 'post',
            //             url: ajaxUrl,
            //             data: param
            //         }).then((res) => {
            //             this.$xeMessage.success(res.msg);
            //             setTimeout(function () {
            //                 _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
            //             }, 300);
            //         }).catch((error) => {
            //             console.log(error);
            //         });
            //         // this.rejectBtn(checkInfoObj.formSupInfoArr, true);
            //         // this.batchOrderRefundList(checkInfoObj.formSupInfoArr, 5);
            //     }).catch((cancel) => {
            //         console.log(cancel);
            //     });
            // },
            passCheck(row) {
                this.refundCode = row.refundCode;
                this.$confirm('您确认接受所选中退款单的退款申请吗?', '接受退款申请', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.batchOrderRefund(2);
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            rejectCheck() {
                if (this.rejectreson === '') {
                    this.$xeMessage.warning('原因不能为空');
                } else {
                    if (this.refundCodeArr.length > 0) { // 批量提交数据
                        this.batchOrderRefundList(this.refundCodeArr, 5);
                    } else {
                        this.batchOrderRefund(5);
                    }
                }
            },
            batchOrderRefund(type) {
                let _this = this;
                let param = {};
                param.formCode = this.refundCode;
                param.checkStatus = 2;
                if (type === 5) {
                    param.checkStatus = 5;
                    param.refusReason = this.rejectreson;
                }
                this.$http({ // 退款单接受申请/拒绝退款
                    method: 'post',
                    url: '/xe-route/xe-erp/orderRefund/batchOrderRefund',
                    data: param
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.cancelReject();
                        _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            batchOrderRefundList(codes, type) {
                let _this = this;
                let param = {};
                param.formCodes = codes;
                param.checkStatus = 2;
                if (type === 5) {
                    param.checkStatus = 5;
                    param.refusReason = this.rejectreson;
                }
                this.$http({ // 退款单接受申请/拒绝退款
                    method: 'post',
                    url: '/xe-route/xe-erp/orderRefund/batchOrderRefundList',
                    data: param
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.cancelReject();
                        _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            rejectBtn(row, lot) {           // 售后单审核
                this.rejectdailog = true;
                if (lot) {
                    this.refundCodeArr = row;
                } else {
                    this.refundCode = row.refundCode;
                }
            },
            cancelReject() {
                this.rejectdailog = false;
                this.refundCodeArr = [];
                this.refundCode = '';
                this.rejectreson = '';
            },
            passOrderRefund(row) { // 同意退款 重新退款
                this.$confirm('您确认对所选中的退款单进行退款吗?', '确认退款', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let _this = this;
                    let param = {};
                    param.refundCode = row.refundCode;
                    let ajaxUrl = '';
                    if (row.payChannel !== 2) {
                        // ajaxUrl = '/xe-route/xe-erp/orderRefund/refundAllByOnlinePay'
                        ajaxUrl = '/xe-route/xe-erp/orderRefund/refundByOnlinePay';
                    } else {
                        // ajaxUrl = '/xe-route/xe-erp/orderRefund/refundAllByWxPay';
                        ajaxUrl = '/xe-route/xe-erp/orderRefund/refundByWxPay';
                    }
                    if (row.refundType === 3 || row.refundType === 4) {
                        ajaxUrl = '/xe-route/xe-erp/orderRefund/refundByAfterSale';
                    }
                    this.$http({ // 退款单接受申请/拒绝退款
                        method: 'post',
                        url: ajaxUrl,
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
            },
            queryRefund(row) { // 支付手动同步状态
                let _this = this;
                let param = {};
                param.refundCode = row.refundCode;
                let ajaxUrl = '';
                if (row.payChannel !== 2) { // 非微信
                    ajaxUrl = '/xe-route/xe-erp/orderRefund/queryRefundMoneyDetailByOnlinePay';
                } else {
                    ajaxUrl = '/xe-route/xe-erp/orderRefund/queryRefundMoneyDetailByWxPay';
                }
                this.$http({ // 支付手动同步状态
                    method: 'post',
                    url: ajaxUrl,
                    data: param
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    setTimeout(function () {
                        _this.creatInf(_this.xePageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
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
                if (!this.formTimeStarts) {
                    if (this.value1) {
                        data.formTimeStart = millisecondFormat(this.value1.getTime());
                    }
                }
                if (!this.formTimeEnds) {
                    if (this.value2) {
                        data.formTimeEnd = millisecondFormat(this.value2.getTime());
                    }
                }
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                data.areaId = this.saleAreaId;
                data.proCategory = this.cateId;
                this.outerUrl = '/xe-route/xe-erp/finance/exRefundOrderList?areaId=' + data.areaId + '&formIdType=' + data.formIdType + '&formIdValue=' + data.formIdValue + '&formTimeEnd=' + data.formTimeEnd + '&formTimeStart=' + data.formTimeStart + '&formTimeType=' + data.formTimeType + '&proCategory=' + data.proCategory + '&refundStatus=' + data.refundStatus + '&refundType=' + data.refundType + '&storeIdReject=' + data.storeIdReject;
                this.outerDetailUrl = '/xe-route/xe-erp/finance/exRefundOrderDetail?areaId=' + data.areaId + '&formIdType=' + data.formIdType + '&formIdValue=' + data.formIdValue + '&formTimeEnd=' + data.formTimeEnd + '&formTimeStart=' + data.formTimeStart + '&formTimeType=' + data.formTimeType + '&proCategory=' + data.proCategory + '&refundStatus=' + data.refundStatus + '&refundType=' + data.refundType + '&storeIdReject=' + data.storeIdReject;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/orderRefund/queryOrderRefundList',
                    data: data
                }).then((res) => {
                    this.orderRefundViewList = res.data.orderRefundViewList;
                    this.xePageInfo = res.data.xePageInfo;
                    if (this.orderRefundViewList.length > 0) {
                        this.getDetailInfo(this.orderRefundViewList[0]);
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
