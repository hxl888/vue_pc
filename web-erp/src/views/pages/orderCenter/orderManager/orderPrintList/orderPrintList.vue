<template lang="html">
    <div class="m-router-con" v-loading="pageLoading" element-loading-text="生成打印单中">
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
                    <el-select size="small" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
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
                                <el-select size="small" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
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
                           <el-form-item label="收货地区">
                                <areaselect-tag class="xe-input-w160" v-model='selecarea' :width='160' :changeOnSelect="true"></areaselect-tag>
                            </el-form-item>
                            <el-form-item prop="orderId" label="商品分类">
                                <categoryTag v-model='cateIdArray' class="xe-input-w160" :width='160' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
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
                            <!--<el-form-item prop="orderStatus" label="订单状态">-->
                                <!--<el-select size="small" class="xe-input-w160" v-model="puboderSerData.orderStatus" placeholder="请选择">-->
                                    <!--<el-option-->
                                        <!--v-for="item in orderStatusList"-->
                                        <!--:label="item.name"-->
                                        <!--:key="item.value"-->
                                        <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
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
                        </div>
                        <div style="clear: both">
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
                        </div>
                        <div style="clear: both">
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
                            <el-form-item prop="salesmanName" label="客户经理">
                                <!--<el-select size="small" class="xe-input-w160" v-model="puboderSerData.salesmanName" placeholder="请选择">-->
                                    <!--<el-option-->
                                        <!--v-for="item in payStatusList"-->
                                        <!--:label="item.name"-->
                                        <!--:key="item.value"-->
                                        <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                               <el-input size="small" class="xe-input-w160" placeholder="请输入客户经理姓名"  v-model.trim="puboderSerData.salesmanName"></el-input>
                            </el-form-item>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                             <el-form-item prop="printStatus" label="打印状态">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.printStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in printStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
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
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-huizongbeihuo1"></i>&nbsp;汇总备货</el-button>
            <el-button class="xe-button-normal" @click="batchOrderRealSendNum"><i class="iconfont icon-querenshifa"></i>&nbsp;确认实发量</el-button>
            <el-button class="xe-button-normal" @click.prevent="goPrint"><i class="iconfont icon-dayin"></i>&nbsp;打印发货单</el-button>
            <el-button class="xe-button-normal" @click="batchSendproduct"><i class="iconfont icon-piliangfahuo1"></i>&nbsp;批量发货</el-button>
            <el-button class="xe-button-normal"  @click="outData1"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
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
                      type="selection"
                      fixed="left"
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
                      min-width="160"
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
                        prop="confirmSendNum"
                        label="确认实发状态"
                        min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.confirmSendNum) | confirmSendNumToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="printStatus"
                        label="打印状态"
                        min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.printStatus) | printStatusToText}}
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
                        prop="sendTime"
                        label="发货时间"
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
                        prop="sfRefundAmount"
                        label="差异金额"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.sfRefundAmount">
                                {{scope.row.sfRefundAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="freRefundAmount"
                        label="差异运费金额"
                        min-width="120"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.freRefundAmount">
                                {{scope.row.freRefundAmount.toFixed(2)}}
                            </div>
                            <div v-else>
                                0
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
                        width="250"
                        fixed="right">
                        <template scope="scope">
                            <div class="btn-in-table">
                                <a href="javascript:;" @click="rowAuditOrder(scope.row)" v-if="scope.row.confirmSendNum == 1" class="s-blue">取消审核</a>
                                <a href="javascript:;" @click="rowOrderRealSendNum(scope.row)" class="s-blue">确认实发量</a>
                                <a href="javascript:;" class="s-blue" @click.prevent="singlePrint(scope.row)">打印</a>
                                <a href="javascript:;" @click="rowSendproduct(scope.row)" v-if="scope.row.confirmSendNum == 2" class="s-blue">发货</a>
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
        <!--单条确认实发量-->
        <el-dialog title="确认实发量" :visible.sync="realSendNumdilog" class="reset-dialog error-tishi">
            <div style="padding: 20px 20px 5px">
                <el-table
                    v-if="realSendNumData"
                    :data="realSendNumData"
                    v-loading='loadingtable'
                    border
                    class="tableLineheightNor"
                    style="width: 100%">
                    <el-table-column
                        prop="proNum"
                        label="商品货号"
                        min-width="85"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proName"
                        label="商品名称"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="pricingType"
                        label="计量方式"
                        min-width="90"
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
                        min-width="70"
                    >
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="规格"
                        min-width="70"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.specName}}{{scope.row.specValue}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseNum"
                        label="购买数量"
                        min-width="85"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="realSendNum"
                        label="实发量"
                        min-width="110"
                        fixed="right"
                    >
                        <template scope="scope">
                            <div style="line-height: inherit">
                                <el-input size="small"  @blur="parseFloatNum(scope.$index, scope.row.pricingType)"  @input.native="parseIntNum($event, scope.$index,scope.row.purchaseNum, scope.row.pricingType)" v-model.trim="scope.row.realSendNum" :maxlength="scope.row.purchaseNum.toString().length + 3" class="xe-input-h24" placeholder=""></el-input>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="el-dialog__footer">
                <el-button class="xe-button-normal" @click="saveupdateOrderReal" :loading="saveupdateLoading" type="primary">确定</el-button>
                <el-button class="xe-button-normal" @click="realSendNumdilog = false">取 消</el-button>
            </div>
        </el-dialog>

        <!--打印预览弹窗-->
        <el-dialog title="打印预览" :visible.sync="printVisible" class="reset-dialog dialog-print">
            <div class="printwrap">
                <template v-for="item in orderInfoList">
                    <div class="printDiv" style="width: 100%; page-break-after: always">
                        <div class="printTab01" style="display: flex;justify-content: space-between;padding-bottom: 5px;border-bottom: 1px solid #000;">
                            <div class="div1">
                                <div class="logo-msg" style="display: flex;align-items: center;height: 60px;">
                                    <div class="logo"><img src="../../../../../assets/images/print_logo.png" width="150" alt=""></div>
                                    <div class="sologan" style="line-height: 1.4;text-align: center; font-weight: 600">
                                        <p style="line-height: 20px; margin: 0; padding: 0; font-size: 12px;">买冻品 上鲜易</p>
                                        <p style="line-height: 20px; margin: 0; padding: 0; font-size: 12px;">省钱省事 安全放心</p>
                                    </div>
                                </div>
                                <div class="phone" style="text-align: center;font-weight: 600; font-size: 12px;">全国统一客服热钱：400-662-6366</div>
                            </div>
                            <div class="div2" style="display: flex">
                                <div class="text" style="margin: 0 3pt;width: 100px;text-align: center;">
                                    <div><img src="../../../../../assets/images/app.png" width="60" height="60" alt=""></div>
                                    <div class="mt5" style="font-size: 12px;line-height: 20px;">鲜易商城APP</div>
                                </div>
                                <div class="text">
                                    <div><img src="../../../../../assets/images/wx.png" width="60" height="60" alt=""></div>
                                    <div class="mt5" style="font-size: 12px;line-height: 20px;">微信公众号</div>
                                </div>
                            </div>
                            <div class="div3">
                                <div><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAA8CAIAAAD+Gl+NAAABSElEQVR42u3YWwrDIBAAwNz/0im0UCTq+oAW1Nkva81GM5hsct1ir7hcAqJiZdHrHZ9G2pP+zBvfdtofJKz9lQ54pM0zpMPyOdQWEkw+X8Ujea1dnHNxdXmGYM75FSBKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJEiVKlChRokSJriUqlguiRAVRsZtoXKo8Ko6gBCtWPcWqLcgz3VMsnabzLCxarBiDSrh2VLN47swz11Msqqfz7CYa88QZmhduQjSeQO09rfluc5xocPMcGtNDPnqH+PVeP2WP1tbcHDMkGnyFiM+bR49f7dm//3O0R2WCfO7s8ZY6fY/214Q9R83dBkYr7aCuvusfRE+pdcWf4wV+0mKEq0KoPwAAAABJRU5ErkJggg==" alt=""></div>
                            </div>
                        </div>
                        <div class="printTab02">
                            <div class="title" style="font-size: 13px;font-weight: bold;padding: 3px 0;">商品清单</div>
                            <table style="width: 100%; table-layout: fixed" align="center" class="protable" border="0" cellpadding="0" cellspacing="0" >
                                <thead>
                                    <tr>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px; width: 160px;">商品名称</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">规格</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">货号</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">单位</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">购买量</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">实发量</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">商品单价</th>
                                        <th style="padding: 5px 10px;border-bottom: 1px solid #000;font-weight: bold;font-size: 13px;">商品金额</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="proitem in item.orderDetailList" :key="item.itemId">
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px; width: 160px;">{{proitem.proName}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">{{proitem.specValue}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">{{proitem.proNum}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">{{proitem.proUnit}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">{{proitem.purchaseNum}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">{{proitem.realSendNum}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">&yen;{{proitem.proCostPrice | numberToFixed2}}</td>
                                        <td style="padding: 5px 10px; text-align: center; font-size: 12px;">&yen;{{proitem.proTotalPrice | numberToFixed2}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="printTab03">
                            <table style="width: 100%;" align="center" class="protable" border="0" cellpadding="0" cellspacing="0">
                                <thead>
                                    <tr>
                                        <th style="padding: 5px 10px; border-top: 1px solid #000;font-weight: bold;font-size: 13px;">订单金额</th>
                                        <th style="padding: 5px 10px; border-top: 1px solid #000;font-weight: bold;font-size: 13px;">优惠金额</th>
                                        <th style="padding: 5px 10px; border-top: 1px solid #000;font-weight: bold;font-size: 13px;">运费金额</th>
                                        <th style="padding: 5px 10px; border-top: 1px solid #000;font-weight: bold;font-size: 13px;">实发差异</th>
                                        <th style="padding: 5px 10px; border-top: 1px solid #000;font-weight: bold;font-size: 13px;">应收金额</th>
                                        <th style="padding: 5px 10px; border-top: 1px solid #000;font-weight: bold;font-size: 13px;">实收金额</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td style="padding: 0px 10px 5px 10px; text-align: center; border-bottom: 1px solid #000; font-size: 12px;">&yen;{{item.totalAmount | numberToFixed2}}</td>
                                        <td style="padding: 0px 10px 5px 10px; text-align: center; border-bottom: 1px solid #000; font-size: 12px;">&yen;{{item.pmtAmount | numberToFixed2}}</td>
                                        <td style="padding: 0px 10px 5px 10px; text-align: center; border-bottom: 1px solid #000; font-size: 12px;">&yen;{{item.freAmount | numberToFixed2}}</td>
                                        <td style="padding: 0px 10px 5px 10px; text-align: center; border-bottom: 1px solid #000; font-size: 12px;">&yen;{{item.diffAmount | numberToFixed2}}</td>
                                        <td style="padding: 0px 10px 5px 10px; text-align: center; border-bottom: 1px solid #000; font-size: 12px;">&yen;{{item.purchaseAmount | numberToFixed2}}</td>
                                        <td style="padding: 0px 10px 5px 10px; text-align: center; border-bottom: 1px solid #000; font-size: 12px;">&yen;{{item.realSendAmount | numberToFixed2}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="printTab04">
                            <div class="title" style="font-size: 13px;font-weight: bold;padding: 3px 0;">收货人信息</div>
                            <table style="width: 100%; table-layout: fixed" align="center" class="protable" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="padding: 2px 10px; font-size: 12px; width: 170px;">收货人：{{item.caConsignee}}</td>
                                        <td style="padding: 2px 10px; font-size: 12px; width: 170px;">联系方式：{{item.caPhone}}</td>
                                        <td style="padding: 2px 10px; font-size: 12px;">支付情况：{{item.payType | payTypeToText}}</td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 2px 10px 4px 10px; border-bottom: 1px solid #000; font-size: 12px;" colspan="2">收货地址：{{item.caStreet}}</td>
                                        <td style="padding: 2px 10px 4px 10px; border-bottom: 1px solid #000; font-size: 12px;">订单备注：{{item.orderRemark ? orderRemark : '无'}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="printTab05">
                            <div class="title" style="font-size: 13px;font-weight: bold;padding: 3px 0;">客户信息</div>
                            <table style="width: 100%;" align="center" class="protable" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="padding: 2px 10px 4px 10px; border-bottom: 1px solid #000; font-size: 12px;">客户账号：{{item.loginAccount}}</td>
                                        <td style="padding: 2px 10px 4px 10px; border-bottom: 1px solid #000; font-size: 12px;">店铺名称：{{item.storeName}}</td>
                                        <td style="padding: 2px 10px 4px 10px; border-bottom: 1px solid #000; font-size: 12px;">业务员姓名：{{item.salesmanName}}</td>
                                        <td style="padding: 2px 10px 4px 10px; border-bottom: 1px solid #000; font-size: 12px;">业务员电话：{{item.orderCodMobile}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="printTab06">
                            <div class="title" style="font-size: 13px;font-weight: bold;padding: 3px 0;">物流信息</div>
                            <table style="width: 100%;" align="center" class="protable" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="padding: 2px 10px 4px 10px; font-size: 12px;">承运车辆：</td>
                                        <td style="padding: 2px 10px 4px 10px; font-size: 12px;">司机姓名：</td>
                                        <td style="padding: 2px 10px 4px 10px; font-size: 12px;">司机电话：</td>
                                        <td style="padding: 2px 10px 4px 10px; font-size: 12px;">配送方式：{{item.shipType | shipTypeToText}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="printTab07">
                            <table style="width: 100%;" align="center" class="protable" border="0" cellpadding="0" cellspacing="0">
                                <tbody>
                                    <tr>
                                        <td style="padding: 12px 10px; border-top: 1px solid #000; font-size: 12px;">分拣员：<span style="width: 80px;border-bottom: 1px solid #000;display: inline-block;"></span></td>
                                        <td style="padding: 12px 10px; border-top: 1px solid #000; font-size: 12px;">出库人：<span style="width: 80px;border-bottom: 1px solid #000;display: inline-block;"></span></td>
                                        <td style="padding: 12px 10px; border-top: 1px solid #000; font-size: 12px;">收货人：<span style="width: 80px;border-bottom: 1px solid #000;display: inline-block;"></span></td>
                                        <td style="padding: 12px 10px; border-top: 1px solid #000; font-size: 12px;">打印时间：{{item.printTime.split(' ')[0]}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </template>
            </div>
            <div class="printDiv-btn">
                <el-button type="primary" @click.prevent="PrintFn()">立即打印</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    import {orderSource, orderStatus, orderType, payStatus, searchTypeOne, searchTimeTypeOne, payTypeListOne, printStatus} from '@/dataControl';
    import refundMerchandise from './refundMerchandise';
    import buyerInformation from './buyerInformation';
    import logisticsInformation from './logisticsInformation';
    import memoInformation from './memoInformation';
    import refundJournal from './refundJournal';
    import { millisecondFormat } from 'utils';
//    import Print from 'utils/print';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                pageLoading: false,
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
                selecarea: [],
                placeholder: '请输入订单号',
                selec_input: '',
                saveupdateLoading: false, // 防止多次提交
                selec_selec2: '',
                selecRoworderId: '',
                selecRowArray: [],
                tabCard_val: 'first',
                refundMer: {}, // 商品信息
                logisticsInfor: null, // 物流信息
                memoInfor: null, // 备注信息
                buyerInfor: null, // 买家信息
                refundJou: null, // 订单日志
                selecteditorRow: '', // 单条勾选信息储存
                selectedArray: '', // 多选框（批量操作数据存储）
                auditOrderdialog: false, // 批量取消审核弹框开关
                realSendNumdilog: false, // 单条修改实发量弹框开关
                auditOrderTit: '批量取消审核',
                realSendNumData: [], // 单条修改实发量表单信息
                loadingtable: false, // table loading
                outerUrl: '',
                outerDetailUrl: '',
                outerUrl1: '',
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
                    printStatus: ''
                },
                pubTabDatacon: [],
                productUrl: '/xe-route/xe-erp',
                printVisible: false,
                orderInfoList: []
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
            singlePrint(item) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/print/querySendOrderPrintList',
                    data: {
                        orderArr: [item.orderId]
                    }
                }).then(res => {
                    console.log(res);
                    this.pageLoading = false;
                    this.printVisible = true;
                    this.orderInfoList = res.data.orderInfoList;
                }).catch(error => {
                    console.log(error);
                    this.pageLoading = false;
                });
            },
            goPrint() {
                console.log(this.selectedArray);
                if (this.selectedArray && this.selectedArray.length) {
                    this.pageLoading = true;
                    let orderArrs = [];
                    this.selectedArray.forEach(item => {
                        orderArrs.push(item.orderId);
                    });
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/print/querySendOrderPrintList',
                        data: {
                            orderArr: orderArrs
                        }
                    }).then(res => {
                        console.log(res);
                        this.pageLoading = false;
                        this.printVisible = true;
                        this.orderInfoList = res.data.orderInfoList;
                    }).catch(error => {
                        console.log(error);
                        this.pageLoading = false;
                    });
                } else {
                    this.$xeMessage.warning('请选择要打印的订单');
                }
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            outData1() {
                console.log('test', this.outerUrl1);
                window.open(this.outerUrl1, '_blank');
            },
            PrintFn(dom) {
                $('.printwrap').printThis();
            },
            batchSendproduct() { // 批量发货
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        let flag = this.selectedArray.some(item => {
                            let status = item.confirmSendNum === 2;
                            return status;
                        });
                        if (flag) {
                            this.$confirm('您确认对选中的订单进行批量发货吗？(确认实发状态为“未确认”的订单不能进行发货操作，会被自动过滤)', '批量发货', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let obj = [];
                                this.selectedArray.some(item => {
                                    if (item.confirmSendNum === 2) {
                                        obj.push({
                                            orderId: item.orderId
                                        });
                                    }
                                });
                                this.sendproductpost(obj);
                            }).catch(() => {
                            });
                        } else {
                            this.$xeMessage.warning('请先确认订单的实发量，再执行发货操作');
                        }
                    } else {
                        this.$xeMessage.warning('最多批量发货 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('“请先选择需要发货的订单');
                }
            },
            rowSendproduct(row) { // 单条发货
                this.toggleSelection();
                this.selecteditorRow = row;
                this.$confirm('您确认对选中的订单进行发货吗？', '发货', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj = [];
                    obj.push({
                        orderId: this.selecteditorRow.orderId
                    });
                    this.sendproductpost(obj);
                }).catch(() => {
                });
            },
            sendproductpost(obj) { // 发货接口调取
                let _this = this;
                let params = {};
                params.xeVenOrderForm = obj;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/send/batchSend`,
                    data: params
                }).then((res) => {
//                    console.log('发货-->', res);
                    if (res.data.code === '3000') {
                        this.$xeMessage.success(`${res.data.msg}`);
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            saveupdateOrderReal() { // 单条修改实发保存
                let flag = this.realSendNumData.every(item => {
                    return item.realSendNum !== '';
                });
                if (flag) {
                    this.rowUpdateOrderRealpost();
                } else {
                    this.$xeMessage.warning('实发量不能为空');
                }
            },
            rowUpdateOrderRealpost() { // 单条修改实发接口调取
                let _this = this;
                let params = {};
                params.orderId = this.selecteditorRow.orderId;
                params.storeId = this.selecteditorRow.storeId;
                params.payType = this.selecteditorRow.payType;
                params.confirmSendNum = this.selecteditorRow.confirmSendNum;
                params.splitOrderDetailList = [];
                this.realSendNumData.forEach(item => {
                    params.splitOrderDetailList.push({
                        proSku: item.proSku,
                        itemId: item.itemId,
                        realSendNum: item.realSendNum,
                        purchaseNum: item.purchaseNum
                    });
                });
                this.saveupdateLoading = true;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/updateOrderRealSendNum`,
                    data: params
                }).then((res) => {
//                    console.log('res-审核接口-->', res);
                    this.$xeMessage.success(`${res.data.msg}`);
                    this.realSendNumdilog = false;
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                    this.saveupdateLoading = false;
                }).catch((error) => {
                    console.log(error);
                    this.saveupdateLoading = false;
                });
            },
            batchAuditOrder() { // 批量取消审核
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        let flag = this.selectedArray.some(item => {
                            let status = item.confirmSendNum === 1;
                            return status;
                        });
                        if (flag) {
//                            this.auditOrderdialog = true;
//                            this.auditOrderTit = '批量取消审核';
                            this.$confirm('取消审核的订单会变为待审核状态，重新流转至订单处理列表，您确认对选中的订单取消审核吗？(确认实发状态为“已确认”的订单不能取消审核，会被自动过滤)', '批量取消审核', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let obj = [];
                                this.selectedArray.some(item => {
                                    if (item.confirmSendNum === 1) {
                                        obj.push({
                                            lockStatus: item.lockStatus,
                                            orderId: item.orderId,
                                            storeId: item.storeId,
                                            version: item.version
                                        });
                                    }
                                });
                                this.auditOrder(obj, true);
                            }).catch(() => {
                            });
                        } else {
                            this.$xeMessage.warning('实发状态为“已确认”的订单不能取消审核');
                        }
                    } else {
                        this.$xeMessage.warning('最多批量取消审核 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要取消审核的订单');
                }
            },
            batchOrderRealSendNum() { // 批量修改实发
                if (this.selectedArray.length > 0) {
                    if (this.selectedArray.length <= 10) {
                        this.selecteditorRow = '';
                        let flag = this.selectedArray.some(item => {
                            let status = item.confirmSendNum === 1;
                            return status;
                        });
                        if (flag) {
                            this.$confirm('批量确认实发默认实发量=购买量，您确认对选中的订单确认实发量吗？(确认实发状态为“已确认”的订单不能批量确认实发，会被自动过滤)', '确认实发量', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                let obj = [];
                                this.selectedArray.some(item => {
                                    if (item.confirmSendNum === 1) {
                                        obj.push({
                                            orderId: item.orderId,
                                            payType: item.payType,
                                            storeId: item.storeId
                                        });
                                    }
                                });
                                this.batchOrderRealSendNumpost(obj);
                            }).catch(() => {
                            });
                        } else {
                            this.$xeMessage.warning('实发状态为“已确认”的订单不能确认实发');
                        }
                    } else {
                        this.$xeMessage.warning('最多批量确认实发 10 条订单，请重新选择');
                    }
                } else {
                    this.$xeMessage.warning('请先选择需要确认实发量的订单');
                }
            },
            rowOrderRealSendNum(row) { // 单条确认实发
                this.toggleSelection();
                this.loadingtable = true;
                this.selecRoworderId = row.orderId;
                this.selecteditorRow = row;
                this.orderInfoDetail(true);
                this.realSendNumdilog = true;
                console.log('this.selecteditorRow', this.selecteditorRow);
            },
            batchOrderRealSendNumpost(obj) {  // 批量修改实发接口调取
                let _this = this;
                let params = {};
                params.xeVenSplitOrderForm = obj;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/batchOrderRealSendNum`,
                    data: params
                }).then((res) => {
                    if (res.data.code === '3000') {
                        this.$xeMessage.success(`${res.data.msg}`);
                        setTimeout(() => {
                            _this.enquiryForm();
                        }, 300);
                    } else {
                        this.$xeMessage.warning(`${res.data.msg}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            rowAuditOrder(row) {  // 单条取消审核
                this.toggleSelection();
//                this.auditOrderdialog = true;
//                this.auditOrderTit = '取消审核';
                this.selecteditorRow = row;
                this.$confirm('取消审核的订单会变为待审核状态，重新流转至订单处理列表，您确认对当前订单取消审核吗？', '取消审核', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj = [];
                    obj.push({
                        lockStatus: this.selecteditorRow.lockStatus,
                        orderId: this.selecteditorRow.orderId,
                        storeId: this.selecteditorRow.storeId,
                        version: this.selecteditorRow.version
                    });
                    this.auditOrder(obj);
                }).catch(() => {
                });
            },
            auditOrder(obj, batch) { // 取消审核接口调取
                let _this = this;
                let params = {};
                let URL = '';
                if (batch === true) { // 批量取消审核接口
                    URL = '/order/unBatchAuditOrder';
                } else { // 单条取消审核接口
                    URL = '/order/unAuditOrder';
                }
                params.xeVenOrderForm = obj;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}${URL}`,
                    data: params
                }).then((res) => {
//                    console.log('res-审核接口-->', res);
//                    this.auditOrderdialog = false;
                    this.$xeMessage.success(`${res.msg}`);
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            searchTypeSelec() {
                this.puboderSerData.orderId = '';
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
                    this.orderInfoDetail();
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
            enquiryForm() {
                let params = {};
                params = this.puboderSerData;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.cateIdArray) {
                    let cateId = this.cateIdArray;
                    params.proOrgCode = cateId.slice(cateId.length - 1, cateId.length).join(',');
                }
                if (this.selecarea.length) {
                    if (this.selecarea.length > 0 && this.selecarea[0]) {
                        params.caProvinceId = this.selecarea[0];
                    }
                    if (this.selecarea.length > 1 && this.selecarea[1]) {
                        params.caCityId = this.selecarea[1];
                    }
                    if (this.selecarea.length > 2 && this.selecarea[2]) {
                        params.caAreaId = this.selecarea[2];
                    }
                } else {
                    params.caProvinceId = '';
                    params.caCityId = '';
                    params.caAreaId = '';
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
                this.outerUrl = '/xe-route/xe-erp/orderCenterExport/exportStockUp?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&printStatus=' + params.printStatus + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate;
                this.outerUrl1 = '/xe-route/xe-erp/orderCenterExport/exportPrintShipmentOrderList?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&printStatus=' + params.printStatus + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate;
                this.outerDetailUrl = '/xe-route/xe-erp/orderCenterExport/exportPrintShipmentOrderDetail?caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&endCreateDate=' + params.endCreateDate + '&orderByCreateTime=' + params.orderByCreateTime + '&orderBySendTime=' + params.orderBySendTime + '&orderException=' + params.orderException + '&orderId=' + params.orderId + '&orderMark=' + params.orderMark + '&orderSource=' + params.orderSource + '&orderStatus=' + params.orderStatus + '&orderStoreId=' + params.orderStoreId + '&orderType=' + params.orderType + '&payStatus=' + params.payStatus + '&payType=' + params.payType + '&printStatus=' + params.printStatus + '&proOrgCode=' + params.proOrgCode + '&salesmanName=' + params.salesmanName + '&searchTimeType=' + params.searchTimeType + '&searchType=' + params.searchType + '&startCreateDate=' + params.startCreateDate;
                console.log('test', this.outerUrl);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/querySendOrder`,
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
                    this.orderInfoDetail(); // 默认展示商品信息第一条数据
                }).catch((error) => {
                    console.log(error);
                });
            },
            orderInfoDetail(RealSendNum) { // 查询订单详情信息(tab卡商品信息)
                if (this.selecRoworderId) {
                    let params = {};
                    params.orderId = this.selecRoworderId;
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/order/queryOrderInfoDetail`,
                        data: params
                    }).then((res) => {
                        if (RealSendNum === true) {
                            this.loadingtable = false;
                            this.realSendNumData = res.data.orderInfoDetail;
                            for (let i in this.realSendNumData) {
                                if (!this.realSendNumData[i].realSendNum) {
                                    this.realSendNumData[i].realSendNum = this.realSendNumData[i].purchaseNum;
                                }
                            }
                        } else {
                            this.refundMer = res.data;
                        }
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
                this.selecarea = [];
                this.cateIdArray = [];
                this.value1 = '';
                this.value2 = '';
                this.enquiryForm();
            },
            handleSelectionChange(val) {
                this.selectedArray = val;
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
                    this.orderInfoDetail();
                } else if (tab.name === 'second') {
                } else if (tab.name === 'third') {
                    this.logisticsInforForm();
                } else if (tab.name === 'fourth') {
                } else if (tab.name === 'five') {
                    this.refundJouForm();
                }
            },
            parseFloatNum(index, pricingType) {
                if (pricingType === 1) {
                    console.log(index);
                    if (this.realSendNumData[index].realSendNum) {
                        this.realSendNumData[index].realSendNum = parseFloat(this.realSendNumData[index].realSendNum).toFixed(2);
                    } else {
                        this.realSendNumData[index].realSendNum = '';
                    }
                }
            },
            parseIntNum(event, index, purchaseNum, pricingType) {
                let value = '';
                if (pricingType === 1) { // 重量 -》商品计量方式为“重量”时，实发量(支持)填写小数
                    value = event.target.value;
                    if (value >= 0) {
                        if (purchaseNum) {
                            if (value <= purchaseNum) {
                                event.target.value = value;
                                this.flagInput = true;
                            } else {
                                this.$xeMessage.warning('实发量不能大于购买数量');
                                event.target.value = '';
                                this.realSendNumData[index].realSendNum = '';
                                this.flagInput = false;
                            }
                        }
                    } else {
                        event.target.value = '';
                    }
                } else if (pricingType === 2) { // 数量=》商品计量方式为“数量”时，实发量(不支持)为小数
                    value = event.target.value;
                    if (value >= 0) {
                        if (purchaseNum) {
                            if (!value.toString().split('.')[1]) {
                                if (value <= purchaseNum) {
                                    event.target.value = value;
                                    this.flagInput = true;
                                } else {
                                    this.$xeMessage.warning('实发量不能大于购买数量');
                                    event.target.value = '';
                                    this.realSendNumData[index].realSendNum = '';
                                    this.flagInput = false;
                                }
                            } else {
                                this.$xeMessage.warning('计量方式为数量的商品实发量不能为小数');
                                event.target.value = '';
                                this.realSendNumData[index].realSendNum = '';
                                this.flagInput = false;
                            }
                        }
                    } else {
                        event.target.value = '';
                    }
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
            },
            realSendNumdilog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        for (let i in this.realSendNumData) {
                            _this.realSendNumData[i].realSendNum = _this.realSendNumData[i].purchaseNum;
                        }
                    }, 10);
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
                return searchTimeTypeOne;
            },
            payTypeList() {
                return payTypeListOne;
            },
            printStatusList() {
                return printStatus;
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

<style lang="scss">
    @media print {
        nav, aside {
            display: none;
        }
        body, article {
            width: 100%;
            margin: 0;
            padding: 0;
            font-size:14pt;
            color:#000;
            background:#fff;
        }
        h1 {
            color: #000;
            background: none;
            font-size:16pt;
        }
        @page {
            margin: 1pt 0;
        }
        img {
            max-width: 100% !important;
        }
    }
    .printDiv {
        padding: 30px;
    }
    .printDiv-btn {
        text-align: center;
        padding: 20px;
        border-top: 1px solid #000;
    }
</style>
