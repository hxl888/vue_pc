<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline">
                 <el-form-item prop="searchType">
                    <el-select size="small" @change="searchTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                        <el-option
                            v-for="item in searchTypeList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="orderId">
                    <el-input size="small" :placeholder="placeholder" v-model.trim="puboderSerData.orderId" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="searchTimeType">
                    <el-select size="small" @change="searchTimeTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                        <el-option
                            v-for="item in searchTimeTypeList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-mr30">
                    <el-date-picker
                        ref="startCreateDate"
                        v-model="value1"
                        type="datetime"
                        size="small"
                        @change="startCreateDateFn"
                        :picker-options="pickerOptionStart"
                        placeholder="开始日期"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                    <el-date-picker
                        ref="endCreateDate"
                        v-model="value2"
                        type="datetime"
                        size="small"
                        @change="endCreateDateFn"
                        :picker-options="pickerOptionEnd"
                        placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="enquiryForm">
                        查询
                    </el-button>
                    <el-button  class="xe-button-normal"  @click="resetForm('puboderSerData')">
                        重置
                    </el-button>
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
                    <el-form :inline="true" :model="puboderSerData" label-width ='73px' ref="puboderSerData1" class="demo-form-inline">
                        <div style="clear:both;">
                            <el-form-item prop="searchType">
                                <el-select size="small" @change="searchTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                                    <el-option
                                        v-for="item in searchTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="orderId">
                                <el-input size="small" :placeholder="placeholder" v-model.trim="puboderSerData.orderId" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                           <el-form-item prop="searchTimeType">
                                <el-select size="small" @change="searchTimeTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                                    <el-option
                                        v-for="item in searchTimeTypeList"
                                        :label="item.name"
                                            :key="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                           </el-form-item>
                            <el-form-item class="z-mr0">
                                <el-date-picker
                                  type="datetime"
                                   size="small"
                                    v-model="value1"
                                  placeholder="开始日期">
                                </el-date-picker>
                                <span class="Cornet">-</span>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                  type="datetime"
                                   size="small"
                                    v-model="value2"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                           <!--<el-form-item label="收货地区">-->
                                <!--<areaselect-tag class="xe-input-w160" v-model='selecarea' :width='160' :changeOnSelect="true"></areaselect-tag>-->
                            <!--</el-form-item>-->
                            <el-form-item prop="orderId" label="商品分类">
                                <categoryTag v-model='cateIdArray' class="xe-input-w160" :width='160' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                            <el-form-item prop="orderSource" label="订单来源">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderSource" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderSourceList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="orderType" label="订单类型">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderType" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="payType" label="支付类型">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.payType" placeholder="请选择">
                                    <el-option
                                        v-for="item in payTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="payStatus" label="支付状态">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.payStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in payStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="orderStoreId" label="仓库名称">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderStoreId" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderStoreIdList"
                                        :label="item.storeName"
                                        :key="item.storeId"
                                        :value="item.storeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="salesmanName" label="客户经理">
                                <el-input size="small" placeholder="请输入客户经理姓名" v-model.trim="puboderSerData.salesmanName" class=""> </el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('puboderSerData1')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
         </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="batchAuditOrder"><i class="iconfont icon-shenhe"></i>&nbsp;取消审核</el-button>
            <el-button class="xe-button-normal" @click="batchCountSummary"><i class="iconfont icon-huizongbeihuo1"></i>&nbsp;汇总采购</el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button>
        </div>
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    :data="pubTabDatacon"
                    border
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                      prop=""
                      label=""
                      width="55"
                      fixed="left"
                      >
                      <template scope="scope">
                            {{scope.$index + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      fixed="left"
                      type="selection"
                      class-name="selectionTd"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="orderMark"
                      min-width="140"
                      label="标记">
                        <template scope="scope">
                            <div class="clearfix" v-if="scope.row.orderMark">
                                <span v-if="scope.row.orderMark.indexOf('1') !== -1" class="lock_sp form_lab fl">锁</span>
                                <span v-if="scope.row.orderMark.indexOf('2') !== -1" class="remove_sp form_lab fl">拆</span>
                                <span v-if="scope.row.orderMark.indexOf('3') !== -1" class="special_sp form_lab fl">特</span>
                                <span v-if="scope.row.orderMark.indexOf('4') !== -1" class="transport_sp form_lab fl">运</span>
                                <span v-if="scope.row.orderMark.indexOf('5') !== -1" class="lack_sp form_lab fl">缺</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="orderId"
                      label="订单编号"
                      min-width="150"
                      >
                        <template scope="scope">
                            <div class="btn-in-table" @click="orderIdSelectclick(scope.$index, scope.row.orderId)">
                                <a href="javascript:;" class="s-blue">{{scope.row.orderId}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="下单时间"
                        min-width="150"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        label="订单状态"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.orderStatus) | orderStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderSource"
                        label="订单来源"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.orderSource) | orderSourceToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="loginAccount"
                        label="客户账号"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caConsignee"
                        label="收货人"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caArea"
                        label="收货地区"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="caStreet"
                        label="收货地址"
                        min-width="200"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="shipType"
                        label="配送方式"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.shipType | shipTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderCodMobile"
                        label="下单业务员"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="salesmanName"
                        label="客户经理"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="storeName"
                        label="仓库名称"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payNumber"
                        label="支付单号"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payType"
                        label="支付类型"
                        min-width="130"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.payType) | payTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="payStatus"
                        label="支付状态"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.payStatus) | payStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="payTime"
                        label="支付时间"
                        min-width="150"
                        sortable
                    >
                    </el-table-column>
                    <el-table-column
                        prop="payAbleAmount"
                        label="订单金额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.payAbleAmount">
                                {{scope.row.payAbleAmount.toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="freAmount"
                        label="运费总额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.freAmount">
                                {{scope.row.freAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="pmtAmount"
                        label="优惠总额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.pmtAmount">
                                {{scope.row.pmtAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="payAbleAmount"
                        label="应收金额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.payType == 4 && !scope.row.epayReceAmt">
                                <div v-if="scope.row.payAbleAmount">
                                    {{parseFloat(scope.row.payAbleAmount).toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 4 && scope.row.epayReceAmt">
                                <div v-if="scope.row.epayReceAmt">
                                    {{parseFloat(scope.row.epayReceAmt).toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 1 && !scope.row.epayReceAmt">
                                <div v-if="scope.row.payAbleAmount">
                                    {{parseFloat(scope.row.payAbleAmount).toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 1 && scope.row.epayReceAmt">
                                <div v-if="scope.row.epayReceAmt">
                                    {{parseFloat(scope.row.epayReceAmt).toFixed(2)}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="实收金额"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.payType == 4">
                                <div v-if="scope.row.payAbleAmount">
                                    {{scope.row.payAbleAmount.toFixed(2)}}
                                </div>
                            </div>
                            <div v-if="scope.row.payType == 1 && !scope.row.epayReceAmt">
                                0
                            </div>
                            <div v-if="scope.row.payType == 1 && scope.row.orderStatus == 1 && scope.row.epayReceAmt">
                                <div v-if="scope.row.epayReceAmt">
                                    {{scope.row.epayReceAmt.toFixed(2)}}
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="refundAmount"
                        label="退款金额"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.refundAmount">
                                {{scope.row.refundAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="153"
                        fixed="right">
                        <template scope="scope">
                            <div class="btn-in-table">
                                <a href="javascript:;" @click="rowAuditOrder(scope.row)" class="s-blue">取消审核</a>
                                <a href="javascript:;" @click="rowCountSummary(scope.row)" class="s-blue">汇总采购</a>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
                    <div class="tab-foot xe-pagination-panel">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pagelist.pageNum"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pagelist.pageSize"
                            layout="total, prev, pager, next, sizes, jumper"
                            :total="pagelist.total">
                        </el-pagination>
                    </div>
            </div>
            <div class="pub-tabDatadetails">
                <el-tabs v-model="tabCard_val" class="noFlot" type="card" @tab-click="handleClick">
                    <!--退款商品-->
                    <el-tab-pane label="商品信息" name="first">
                        <refund-merchandise :refundMer = 'refundMer'></refund-merchandise>
                    </el-tab-pane>
                    <!--配置管理-->
                    <el-tab-pane label="买家信息" name="second">
                        <buyer-information :buyerInfor = "buyerInfor"></buyer-information>
                    </el-tab-pane>
                    <el-tab-pane label="物流信息" name="third">
                        <logistics-information :logisticsInfor = 'logisticsInfor'></logistics-information>
                    </el-tab-pane>
                    <el-tab-pane label="备注信息" name="fourth">
                        <memo-information :memoInfor = 'memoInfor'></memo-information>
                    </el-tab-pane>
                    <el-tab-pane label="订单日志" name="five">
                        <refund-journal :refundJou = 'refundJou'></refund-journal>
                    </el-tab-pane>
                </el-tabs>
            </div>
         </div>
        <!--汇总采购商品-->
        <el-dialog title="汇总采购商品" :visible.sync="countSummarydilog" style="width: auto" class="reset-dialog resetWidauto">
            <div style="padding: 20px 20px 5px">
                <el-table
                    v-if="countSummaryTable"
                    :data="countSummaryTable"
                    v-loading='loadingtable'
                    border
                    style="width: 100%">
                    <el-table-column
                        prop=""
                        label="商品图"
                        min-width="95"
                    >
                        <template scope="scope">
                            <div class="detail_picbox">
                                <img :src="picServer + scope.row.proPicture" alt="" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proNum"
                        label="商品货号"
                        min-width="85"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proName"
                        label="商品名称"
                        min-width="85"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proOrgCodeName"
                        label="商品分类"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="pricingType"
                        label="计量方式"
                        min-width="85"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.pricingType | pricingTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proUnit"
                        label="单位"
                        min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="规格"
                        min-width="65"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.specName}}{{scope.row.specValue}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseNum"
                        label="订购总量"
                        min-width="85"
                    >
                        <template scope="scope">
                            <div  v-if="scope.row.purchaseNum">
                                {{parseFloat(scope.row.purchaseNum).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseNum"
                        label="采购总量"
                        min-width="85"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.purchaseNum">
                                {{parseFloat(scope.row.purchaseNum).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="el-dialog__footer">
                <el-button class="xe-button-normal" @click="savequerySummary" type="primary">生成采购单</el-button>
                <el-button class="xe-button-normal" @click="countSummarydilog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    import {orderSource, orderStatus, orderType, payStatus, searchTypeOne, searchTimeTypeOne, payTypeListOne} from '@/dataControl';
    import refundMerchandise from './refundMerchandise';
    import buyerInformation from './buyerInformation';
    import logisticsInformation from './logisticsInformation';
    import memoInformation from './memoInformation';
    import refundJournal from './refundJournal';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                outerDetailUrl: '',
                outerUrl: '',
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                cateIdArray: null, // 商品分类
                orderStoreIdList: [],
                value1: new Date(new Date().setHours(0, 0, 0, 0)),
                value2: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
                pickerOptionStart: {
                    disabledDate(time) {
                        return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                    }
                },
                pickerOptionEnd: {
                    disabledDate(time) {
                        return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                    }
                },
                placeholder: '请输入订单号',
                selec_input: '',
                selec_selec2: '',
                selecRoworderId: '',
                selecRowArray: [],
                selectedArray: '', // 多选框（批量操作数据存储）
                tabCard_val: 'first',
                refundMer: {}, // 商品信息
                buyerInfor: null, // 买家信息
                logisticsInfor: null, // 物流信息
                memoInfor: null, // 备注信息
                refundJou: null, // 订单日志
                countSummaryTable: [], // 汇总采购table数据
                countSummarydilog: false, // 汇总采购弹框开关
                loadingtable: false,  // 表单加载loading
                picServer: '',
                puboderSerData: {
                    searchType: 1,
                    orderId: '',
                    searchTimeType: 1,
                    startCreateDate: '',
                    endCreateDate: '',
                    caProvinceId: '',                         // 收货省id
                    caCityId: '',                         // 收货市id
                    caAreaId: '',                         // 收货区id
                    proOrgCode: '',                         // 商品分类
                    orderSource: '',                         // 订单来源 4 pc  1：android 2：ios 3：微信5：代客下单 6：其它',
                    orderStatus: 3,                         // 订单状态 ：1 已完成 2 已发货 3待发货 4已取消 5 待分配 6待审核',
                    orderType: '',                         // 订单类型 1一口价 2询报价',
                    payType: '',                         // 支付类型  4: 在线支付1：货到付款2：到店自提3：银行汇款',',
                    payStatus: '',                         // 支付状态 1:已支付,2:未支付,
                    orderStoreId: '',                         // 仓库id
                    orderMark: '',                         // 订单标签 1已锁定 2已拆分 3特批优惠 4修改运费5缺货
                    salesmanName: '',                        // 业务员姓名
                    orderException: 1,                               // 是否异常订单 1：无问题 2：有问题
                    orderByCreateTime: '',          // 下单时间排序  升序1降序2
                    orderBySendTime: '',        // 收货时间排序   升序1降序2
                    storeType: 4
                },
                pubTabDatacon: [],
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
            if (!this.orderStoreIdList.length) {
                this.orderStoreSearch(); // 下拉仓库列表
            }
        },
        methods: {
            batchCountSummary() { // 批量汇总采购
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        let storeId = this.selectedArray[0].storeId;
                        let flag = this.selectedArray.every(item => {
                            return item.storeId === storeId;
                        });
                        if (flag) {
                            let obj = [];
                            this.selectedArray.some(item => {
                                obj.push({
                                    orderId: item.orderId
                                });
                            });
                            this.countSummarypost(obj);
                        } else {
                            this.$xeMessage.warning('请选择相同仓库的订单进行汇总采购');
                        }
                    } else {
                        this.$xeMessage.warning('最多汇总采购 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要汇总采购的订单');
                }
            },
            countSummarypost(obj) { // 汇总采购接口调取
                let params = {};
                this.loadingtable = true;
                params.xeVenOrderForm = obj;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/countSummaryPurch`,
                    data: params
                }).then((res) => {
                    if (res.data.picServer) {
                        this.picServer = res.data.picServer;
                    }
                    console.log(this.picServer);
                    this.countSummarydilog = true;
                    this.loadingtable = false;
                    this.countSummaryTable = res.data.actionList;
                }).catch((error) => {
                    this.loadingtable = false;
                    console.log(error);
                });
            },
            rowCountSummary(row) { // 单条汇总采购商品
                this.toggleSelection();
                this.selecteditorRow = row;
                let obj = [];
                obj.push({
                    orderId: this.selecteditorRow.orderId
                });
                this.countSummarypost(obj);
            },
            batchAuditOrder() { // 批量取消审核
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        this.$confirm('取消审核的订单会变为待审核状态，重新流转至订单处理列表，您确认对选中的订单取消审核吗？', '批量取消审核', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            let obj = [];
                            this.selectedArray.some(item => {
                                obj.push({
                                    orderId: item.orderId,
                                    version: item.version
                                });
                            });
                            this.cancelauditOrder(obj);
                        }).catch(() => {
                        });
                    } else {
                        this.$xeMessage.warning('最多批量取消审核 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要取消审核的订单');
                }
            },
            rowAuditOrder(row) { // 单条取消审核
                this.toggleSelection();
                this.selecteditorRow = row;
                this.$confirm('取消审核的订单会变为待审核状态，重新流转至订单处理列表，您确认对当前订单取消审核吗？', '取消审核', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj = [];
                    obj.push({
                        orderId: this.selecteditorRow.orderId,
                        version: this.selecteditorRow.version
                    });
                    this.cancelauditOrder(obj);
                }).catch(() => {
                });
            },
            cancelauditOrder(obj) { // 取消审核接口调取
                let params = {};
                let _this = this;
                params.xeVenOrderForm = obj;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/cancelAuditSummaryPurch`,
                    data: params
                }).then((res) => {
                    this.$xeMessage.success(`${res.msg}`);
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            savequerySummary() { // 生成采购单
                this.$confirm('您确认对选中订单内的商品进行汇总采购吗？', '生成采购单', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.savequerySummarypost();
                }).catch(() => {
                });
            },
            savequerySummarypost() {
                let _this = this;
                let params = {};
                params.splitOrderDetailList = this.countSummaryTable;
                params.xeVenSplitOrderForm = [];
                if (this.selecteditorRow) {
                    params.xeVenSplitOrderForm.push({
                        orderId: this.selecteditorRow.orderId,
                        orderStatus: this.selecteditorRow.orderStatus,
                        storeId: this.selecteditorRow.storeId
                    });
                } else {
                    this.selectedArray.forEach(item => {
                        params.xeVenSplitOrderForm.push({
                            orderId: item.orderId,
                            orderStatus: item.orderStatus,
                            storeId: item.storeId
                        });
                    });
                }
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/insertSummaryPurch`,
                    data: params
                }).then((res) => {
                    if (res.data.code === '3000') {
                        this.$xeMessage.success(`${res.data.msg}`);
                        this.countSummarydilog = false;
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
                    } else {
                        this.$xeMessage.error(`${res.data.msg}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            searchTypeSelec() {
                this.puboderSerData.orderId = '';
            },
            searchTimeTypeSelec() {
//                this.value1 = '';
//                this.value2 = '';
            },
            startCreateDateFn(val) {
                this.startCreateDates = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            endCreateDateFn(val) {
                this.endCreateDates = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            orderIdSelectclick(index, ids) {
                this.selecRoworderId = ids;
                this.selecRowArray = this.pubTabDatacon[index];
                this.buyerInfor = this.selecRowArray;
                this.memoInfor = this.selecRowArray;
                if (this.tabCard_val === 'first') {
                    this.OrderInfoDetail();
                }
                if (this.tabCard_val === 'third') {
                    this.logisticsInforForm();
                }
                if (this.tabCard_val === 'five') {
                    this.refundJouForm();
                }
            },
            orderStoreSearch() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/storeManager/queryStoreNameList`,
                    data: params
                }).then((res) => {
                    this.orderStoreIdList = res.data.actionList;
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
            enquiryForm() {
                let params = {};
                params = this.puboderSerData;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.cateIdArray) {
                    let cateId = this.cateIdArray;
                    params.proOrgCode = cateId.slice(cateId.length - 1, cateId.length).join(',');
                }
                if (!this.startCreateDates) {
                    if (this.value1) {
                        params.startCreateDate = millisecondFormat(this.value1.getTime(), 'ms');
                    }
                }
                if (!this.endCreateDates) {
                    if (this.value2) {
                        params.endCreateDate = millisecondFormat(this.value2.getTime(), 'ms');
                    }
                }
                this.outerUrl = '/xe-route/xe-erp/orderCenterExport/exportSummaryPurOrderList?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate + '&storeType=' + params.storeType;
                this.outerDetailUrl = '/xe-route/xe-erp/orderCenterExport/exportSummaryPurOrderDetail?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate + '&storeType=' + params.storeType;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/querySummaryPurch`,
                    data: params
                }).then((res) => {
                    this.pagelist.total = res.data.xePageInfo.total;
                    this.pubTabDatacon = res.data.actionList;
                    if (res.data.actionList && res.data.actionList.length > 0) {
                        this.buyerInfor = res.data.actionList[0]; // 买家信息默认显示第一条
                        this.memoInfor = res.data.actionList[0]; // 备注信息默认显示第一条
                        this.selecRoworderId = res.data.actionList[0].orderId; // 默认展示第一条物流单号
                    } else {
                        this.buyerInfor = {}; // 买家信息默认显示第一条
                        this.memoInfor = {}; // 备注信息默认显示第一条
                        if (!res.data.actionList[0]) {
                            this.selecRoworderId = ''; // 默认展示第一条物流单号
                        }
                    }
                    this.OrderInfoDetail(); // 默认展示商品信息第一条数据
                }).catch((error) => {
                    console.log(error);
                });
            },
            OrderInfoDetail() { // 查询订单详情信息(tab卡商品信息)
                if (this.selecRoworderId) {
                    let params = {};
                    params.orderId = this.selecRoworderId;
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/queryOrderInfoDetail`,
                        data: params
                    }).then((res) => {
                        this.refundMer = res.data;
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.refundMer = {};
                }
            },
            logisticsInforForm() { // 物流信息(tab选项卡)
                let params = {};
                params.orderId = this.selecRoworderId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/queryOrderLogistics`,
                    data: params
                }).then((res) => {
                    this.logisticsInfor = res.data.logisticsList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            refundJouForm() { // 订单日志(tab选项卡)
                let params = {};
                params.key = this.selecRoworderId;
                if (params.key) {
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/queryOrderInfoLog`,
                        data: params
                    }).then((res) => {
                        this.refundJou = res.data.logisticsList;
                    }).catch((error) => {
                        console.log(error);
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.cateIdArray = [];
                this.value1 = '';
                this.value2 = '';
                this.enquiryForm();
            },
            onSubmit() {},
            handleSelectionChange(val) {
                this.selectedArray = val;
            },
            toggleSelection(rows) { // 点击左侧单项修改的时候清空多选项
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.enquiryForm();
                }
            },
            handleClick(tab, event) {
                if (tab.name === 'first') {
                    this.OrderInfoDetail();
                } else if (tab.name === 'second') {
                } else if (tab.name === 'third') {
                    this.logisticsInforForm();
                } else if (tab.name === 'fourth') {
                } else if (tab.name === 'five') {
                    this.refundJouForm();
                }
            }
        },
        watch: {
            'puboderSerData.searchType'(n) {
                if (n === 1) {
                    this.placeholder = '请输入订单号';
                } else if (n === 2) {
                    this.placeholder = '请输入支付流水账号';
                } else if (n === 3) {
                    this.placeholder = '请输入商品名称';
                } else if (n === 4) {
                    this.placeholder = '请输入商品货号';
                } else if (n === 5) {
                    this.placeholder = '请输入收货人';
                } else if (n === 6) {
                    this.placeholder = '请输入客户账号';
                }
            }
        },
        computed: {
            startCreateDates: {
                get() {
                    return this.puboderSerData.startCreateDate;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.startCreateDate = '';
                    } else {
                        this.puboderSerData.startCreateDate = val;
                    }
                }
            },
            endCreateDates: {
                get() {
                    return this.puboderSerData.endCreateDate;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.endCreateDate = '';
                    } else {
                        this.puboderSerData.endCreateDate = val;
                    }
                }
            },
            orderSourceList() {
                return orderSource;
            },
            orderStatusList() {
                return orderStatus;
            },
            orderTypeList() {
                return orderType;
            },
            payStatusList() {
                return payStatus;
            },
            searchTypeList() {
                return searchTypeOne;
            },
            searchTimeTypeList() {
                let searchTimeTypeList = [];
                for (let i in searchTimeTypeOne) {
                    if (searchTimeTypeOne[i].value !== 3) {
                        searchTimeTypeList.push(searchTimeTypeOne[i]);
                    }
                }
                return searchTimeTypeList;
            },
            payTypeList() {
                return payTypeListOne;
            }
        },
        components: {
            areaselectTag,
            categoryTag,
            refundMerchandise,
            buyerInformation,
            logisticsInformation,
            memoInformation,
            refundJournal
        }
    };
</script>
