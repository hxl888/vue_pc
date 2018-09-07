<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="formIdType">
                    <el-select size="small" class="xe-input-w110" v-model="formData.formIdType" placeholder="售后单号">
                        <el-option
                            v-for="item in formIdTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="formIdValue">
                    <el-input size="small" v-model="formData.formIdValue" :placeholder="placeholder"></el-input>
                </el-form-item>
                <el-form-item label="" prop="createStartDate" class="z-mr0">
                    <el-date-picker
                        v-model="formData.createStartDate"
                        class="xe-input-168"
                        type="date"
                        size="small"
                        @change="createStartDateFn"
                        placeholder="入库开始时间"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                </el-form-item>
                <el-form-item prop="createEndDate">
                    <el-date-picker
                        v-model="formData.createEndDate"
                        class="xe-input-168"
                        size="small"
                        type="date"
                        @change="createEndDateFn"
                        placeholder="入库结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="afterSaleStatus">
                    <el-select size="small" class="xe-input-w110" v-model="formData.afterSaleStatus" placeholder="待审核">
                        <el-option
                                v-for="item in afterSaleStatusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
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
                    <el-form :inline="true" :model="formData" label-width ='73px' ref="puboderSerData1" class="demo-form-inline">
                        <div style="clear:both;">
                            <el-form-item prop="formIdType">
                                <el-select size="small" class="xe-input-w110" v-model="formData.formIdType" placeholder="售后单号">
                                    <el-option
                                            v-for="item in formIdTypeList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="formIdValue">
                                <el-input size="small" v-model="formData.formIdValue" :placeholder="placeholder"></el-input>
                            </el-form-item>
                            <el-form-item prop="afterSaleStatus">
                                <el-select size="small" class="xe-input-w110" v-model="formData.afterSaleStatus" placeholder="待审核">
                                    <el-option
                                            v-for="item in afterSaleStatusList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item label="" prop="createStartDate" class="z-mr0">
                                <el-date-picker
                                        v-model="formData.createStartDate"
                                        class="xe-input-168"
                                        type="date"
                                        @change="createStartDateFn"
                                        placeholder="入库开始时间"
                                >
                                </el-date-picker>
                                <span class="Cornet">-</span>
                            </el-form-item>
                            <el-form-item prop="createEndDate">
                                <el-date-picker
                                        v-model="formData.createEndDate"
                                        class="xe-input-168"
                                        type="date"
                                        @change="createEndDateFn"
                                        placeholder="入库结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="storeIdReject">
                                <el-select size="small" class="xe-input-w110" v-model="formData.storeIdReject" placeholder="退货仓库">
                                    <el-option
                                        v-for="item in storeIdRejectList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="storeIdReject">
                                <el-input size="small" v-model="formData.storeIdReject" :placeholder="placeholder"></el-input>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="storeIdSend">
                                <el-select size="small" class="xe-input-w110" v-model="formData.storeIdSend" placeholder="发货仓库">
                                    <el-option
                                            v-for="item in storeIdSendList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="storeIdSend">
                                <el-input size="small" v-model="formData.storeIdSend" :placeholder="placeholder"></el-input>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="serviceCheckStatus" label="客户审核">
                                <el-select size="small" class="xe-input-w160" v-model="formData.serviceCheckStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in serviceCheckStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="收货地区">
                                <areaselect-tag class="xe-input-w160" v-model='selecarea' :width='160' :changeOnSelect="true"></areaselect-tag>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="purchaseCheckStatus" label="采购审核">
                                <el-select size="small" class="xe-input-w160" v-model="formData.purchaseCheckStatus" placeholder="请选择">
                                    <el-option
                                            v-for="item in purchaseCheckStatusList"
                                            :label="item.name"
                                            :key="item.value"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="orderId" label="商品分类">
                                <categoryTag v-model='cateIdArray' class="xe-input-w160" :width='160' :changeOnSelect="true"></categoryTag>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="financeCheckStatus" label="财务审核">
                                <el-select size="small" class="xe-input-w160" v-model="formData.financeCheckStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in financeCheckStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('puboderSerData1')">重置</el-button>
                    </div>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="newSale"><i class="iconfont icon-xinjianshouhoudan"></i>&nbsp;新建售后单</el-button>
            <el-button class="xe-button-normal" @click="cancellation"><i class="iconfont icon-zuofei"></i>&nbsp;作废</el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button>
        </div>
        <!--<div class="pub-dataContent">-->
            <div class="pub-tabDatacon">
                <el-table
                    :data="tableData"
                    highlight-current-row
                    border
                    @selection-change="handleSelChange"
                    style="width: 100%">
                    <el-table-column
                        fixed="left"
                        prop=""
                        label=""
                        width="55">
                        <template scope="scope">
                            {{scope.$index + 1}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        fixed="left"
                        prop=""
                        label=""
                        width="34"
                        type="selection"
                        class-name="selectionTd"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="afterSalesCode"
                            label="售后单号"
                            min-width="160"
                    >
                        <template scope="scope">
                            <a class="s-blue" @click="detail(scope.row)">{{scope.row.afterSalesCode}}</a>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="afterSaleSource"
                            label="售后来源"
                            min-width="120"
                    >
                        <template scope="scope">
                            {{scope.row.afterSaleSource | afterSaleSourceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="createDate"
                            label="创建时间"
                            min-width="160"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="afterSaleType"
                            label="售后类型"
                            min-width="130"
                    >
                        <template scope="scope">
                            {{scope.row.afterSaleType | afterSaleTypeToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="afterSaleReason"
                            label="售后原因"
                            min-width="130"
                    >
                        <template scope="scope">
                            {{scope.row.afterSaleReason | afterSaleReasonToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="afterSaleRemark"
                        label="售后说明"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                            prop="storeName"
                            label="退货仓库"
                            min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="afterSaleStatus"
                        label="售后单状态"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.afterSaleStatus | afterSaleStatusToText}}
                            </div>
                            <el-tooltip effect="dark" placement="top" v-if="scope.row.afterSaleStatus === 4">
                                <div slot="content" class="tips-item">{{scope.row.refusReason}}</div>
                                <a href="javascript:;" class="s-blue">驳回原因</a>
                            </el-tooltip>
                            <el-tooltip effect="dark" placement="top" v-if="scope.row.afterSaleStatus === 5">
                                <div slot="content" class="tips-item">{{scope.row.cancelReason}}</div>
                                <a href="javascript:;" class="s-blue">作废原因</a>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="serviceCheckStatus"
                        label="客服审核状态"
                        min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.serviceCheckStatus | serviceCheckStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchaseCheckStatus"
                        label="采购审核状态"
                        min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.purchaseCheckStatus | purchaseCheckStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                            prop="financeCheckStatus"
                            label="财务审核状态"
                            min-width="150"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.financeCheckStatus | financeCheckStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderId"
                        label="订单编号"
                        min-width="140"
                    >
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
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="订单实发金额"
                        min-width="120"
                    >
                        <template scope="props">
                            {{props.row.payAmount - props.row.differenceAmountDetail - props.row.freAmount | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="实发运费总额"
                        min-width="150"
                    >
                        <template scope="props">
                            {{props.row.epayReceAmt + props.row.differenceAmountDetail + props.row.freAmount - props.row.payAmount | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="epayReceAmt"
                        label="订单应收金额"
                        min-width="150"
                    >
                        <template scope="props">
                            {{props.row.epayReceAmt | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="refundAmount"
                        label="售后退款金额"
                        min-width="150"
                    >
                        <template scope="props">
                            {{props.row.refundAmount | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="操作"
                        fixed="right"
                        min-width="200"
                    >
                        <template scope="scope">
                            <div>
                                <a href="javascript:;" class="alinkblu" @click="particulars(scope.row)">查看</a>
                                <a v-if="scope.row.afterSaleStatus ===1 || scope.row.afterSaleStatus ===4" href="javascript:;" class="alinkblu" @click="compileIng(scope.row)">编辑</a>
                                <a v-if="(scope.row.afterSaleStatus === 1) || (scope.row.afterSaleStatus === 3 && scope.row.serviceCheckStatus === 1)" href="javascript:;" class="alinkblu" @click="audit(scope.row)">审核</a>
                                <a v-if="scope.row.afterSaleStatus ===1" href="javascript:;" class="alinkblu" @click="rowTovoid(scope.row)">作废</a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="xe-pagination-panel">
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="pageInfo.pageNum"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pageInfo.pageSize"
                            layout="total, prev, pager, next, sizes, jumper"
                            :total="pageInfo.total">
                    </el-pagination>
                </div>
            </div>
        <!--售后单信息-->
            <div class="pub-tabDatadetails">
                <el-tabs v-model="tabCard_val" type="card" @tab-click="handleClick">
                    <!--退款商品-->
                    <el-tab-pane label="商品信息" name="first">
                        <!--<refund-merchandise></refund-merchandise>-->
                        <div>
                            <el-table
                                :data="tableData2"
                                border
                                style="width: 100%">
                                <el-table-column
                                    prop=""
                                    label=""
                                    min-width="70"
                                >
                                    <template scope="scope">
                                        {{scope.$index + 1}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="proPicture"
                                        label="商品图"
                                        min-width="95"
                                >
                                    <template scope="props">
                                        <div class="z-imgbox">
                                            <img :src="picServer + picDir + props.row.proPicture" alt="品牌logo" width="60" height="60">
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="proSku"
                                        label="SKU编码"
                                        min-width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="proNum"
                                        label="商品货号"
                                        min-width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="proName"
                                        label="商品名称"
                                        min-width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="proOrgCodeName"
                                        label="商品分类"
                                        min-width="150"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="pricingType"
                                    label="计量方式"
                                    min-width="100"
                                >
                                    <template scope="props">
                                        {{props.row.pricingType | pricingTypeToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="proUnit"
                                        label="单位"
                                        min-width="90"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="specValue"
                                    label="规格"
                                    min-width="90"
                                >
                                    <template scope="props">
                                        {{props.row.specValue | noneToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="proPrice"
                                    label="商品单价"
                                    min-width="90"
                                >
                                    <template scope="props">
                                        {{props.row.proPrice | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="purchaseNum"
                                        label="购买数量"
                                        min-width="120"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop="realSendNum"
                                    label="实发量"
                                    min-width="120"
                                >
                                </el-table-column>
                                </el-table-column>
                                <el-table-column
                                    prop="rejectNum"
                                    label="退货量"
                                    min-width="120"
                                >
                                </el-table-column>
                                <el-table-column
                                    prop=""
                                    label="订购金额"
                                    min-width="120"
                                >
                                    <template scope="props">
                                        {{props.row.proPrice * props.row.purchaseNum | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="pmtAmount"
                                    label="优惠金额"
                                    min-width="120"
                                >
                                    <template scope="props">
                                        {{props.row.pmtAmount | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="specialDisamount"
                                    label="特批优惠金额"
                                    min-width="150"
                                >
                                    <template scope="props">
                                        {{props.row.specialDisamount | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    prop="rejectAmount"
                                    label="退款金额"
                                    min-width="120"
                                >
                                    <template scope="props">
                                        {{props.row.rejectAmount | priceToText}}
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <!--配置管理-->
                    <el-tab-pane label="备注信息" name="fourth">
                        <div class="buyerInformation resetForm">
                             <el-form :model="memoInformations" ref="memoInformations" label-width="75px">
                                    <el-form-item label="驳回人" prop="">
                                        <el-input disabled placeholder="操作审核的用户名" v-model="memoInformations.refusUser" class="xe-input-smal300_hei30"></el-input>
                                    </el-form-item>
                                    <el-form-item label="驳回原因" prop="">
                                        <el-input disabled placeholder="显示驳回原因" v-model="memoInformations.refusReason" class="xe-input-smal300_hei30"></el-input>
                                    </el-form-item>
                                    <el-form-item label="作废操作人" prop="">
                                        <el-input disabled placeholder="操作作废的用户名" v-model="memoInformations.cancelUser" class="xe-input-smal300_hei30"></el-input>
                                    </el-form-item>
                                    <el-form-item label="作废原因" prop="" class="no-marbot">
                                        <el-input disabled placeholder="显示当前售后单的作废原因" v-model="memoInformations.cancelReason" class="xe-input-smal300_hei30"></el-input>
                                    </el-form-item>
                             </el-form>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        <!--作废原因-->
        <el-dialog title="作废" :visible.sync="rejectdailog"   class="reset-dialog dialog_wid340 textare_reset300" >
            <div style="padding-bottom: 10px;color:#687281">作废后订单将被取消，您确认将选中的订单作废吗？</div>
            <textarea v-model="refusReason" placeholder="请填写售后单的作废原因50字以内" :maxlength="50"></textarea>
            <!--<span class="last-num">{{rejectextNum}}/200</span>-->
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="rejectSubmit">确定</el-button>
                <el-button  class="xe-button-normal" @click="rejectdailog = false">取 消</el-button>
            </div>
        </el-dialog>
        <!--审核弹框-->
        <el-dialog title="审核" :visible.sync="rejectdailogA"   class="reset-dialog dialog_wid340 textare_reset300" >
            <div style="padding-bottom: 10px;color:#687281">您确认通过当前售后单的客服审核吗？</div>
            <textarea v-model="rejectreson" placeholder="请填写售后单的驳回原因50字以内" :maxlength="50"></textarea>
            <!--<span class="last-num">{{rejectextNum}}/200</span>-->
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="pass(2)">通过</el-button>
                <el-button  class="xe-button-normal" type="primary" @click="reject(4)">驳回</el-button>
                <el-button  class="xe-button-normal" @click="rejectdailogA = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {storeIdSend, formIdType, afterSaleStatus, searchTimeType, serviceCheckStatus, purchaseCheckStatus, salesmanId, financeCheckStatus, storeIdReject} from '@/dataControl.js';
    import refundMerchandise from './refundMerchandise';
    import buyerInformation from './buyerInformation';
    import logisticsInformation from './logisticsInformation';
    import refundJournal from './refundJournal';
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    export default {
        name: 'after-salesList',
        data() {
            return {
                outerDetailUrl: '',
                outerUrl: '',
                rejectdailogA: false,  // 审核弹窗开关
                rejectdailog: false,  // 作废弹框开关
                SlectAllRowIndex: [], // 判断多选操作下标
                selecteditorRow: {}, // 单条信息选中
                placeholder: '请输入售后单号',
                selChangarr: [],
                selecarea: [],
                cateIdArray: [],
                pickerOptions0: {
                    disabledDate(time) {
                    }
                },
                tabCard_val: 'first',
                rejectreson: '',
                formData: {
                    formIdType: 1,                 // 售后单号
                    formIdValue: '',
                    createStartDate: '',           // 入库时间
                    createEndDate: '',             // 出库时间
                    serviceCheckStatus: '',       // 客服审核状态
                    purchaseCheckStatus: '',      // 采购审核状态
                    salesmanId: '',                // 业务员姓名
                    financeCheckStatus: '',       // 财务审核状态
                    storeIdSend: '',              // 发货仓库
                    storeIdReject: '',          // 退货仓库
                    afterSaleStatus: ''        // 售后审核
                },
                tableData: [],
                tableData2: [],
                picServer: '',
                picDir: '',
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                pubTabDatacon: [
                    {}
                ],
                afterSalesCodeArr: '',
                refundMerchandises: [], // 商品信息tab列表
                buyerInformations: [], // 买家信息tab列表
                logisticsInformations: [], // 物流信息tab列表
                memoInformations: {
                    refusUser: '',
                    refusReason: '',
                    cancelUser: '',
                    cancelReason: ''
                }, // 备注信息tab列表
                refundJournals: [], // 订单日志tab列表
                formCode: '',
                refusReason: '', // 作废原因
                cancelLotFlag: '' // 作废批量标志
            };
        },
        methods: {
            particulars(row) {
                this.$router.push({name: 'particulars', query: {afterSalesCode: row.afterSalesCode}});
            },
            compileIng(row) {
                this.$router.push({name: 'compile', query: {afterSalesCode: row.afterSalesCode}});
            },
            detail(row) {        // 商品明细 信息
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/queryDetailList',
                    data: {
                        afterSalesCode: row.afterSalesCode
                    }
                }).then((res) => {
                    this.tableData2 = res.data.orderDetailList;
                    this.picServer = res.data.picServer;
                    this.picDir = res.data.picDir;
                    this.memoInformations = row;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSelChange(val) {
                this.selChangarr = val;
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
                data = formData;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.outerUrl = '/xe-route/xe-erp/afterSaleCenterExport/afterSaleList?afterSaleStatus=' + data.afterSaleStatus + '&createEndDate=' + data.createEndDate + '&createStartDate=' + data.createStartDate + '&financeCheckStatus=' + data.financeCheckStatus + '&formIdType=' + data.formIdType + '&formIdValue=' + data.formIdValue + '&purchaseCheckStatus=' + data.purchaseCheckStatus + '&salesmanId=' + data.salesmanId + '&serviceCheckStatus=' + data.serviceCheckStatus + '&storeIdReject=' + data.storeIdReject + '&storeIdSend=' + data.storeIdSend;
                this.outerDetailUrl = '/xe-route/xe-erp/afterSaleCenterExport/afterSaleExportDetail?afterSaleStatus=' + data.afterSaleStatus + '&createEndDate=' + data.createEndDate + '&createStartDate=' + data.createStartDate + '&financeCheckStatus=' + data.financeCheckStatus + '&formIdType=' + data.formIdType + '&formIdValue=' + data.formIdValue + '&purchaseCheckStatus=' + data.purchaseCheckStatus + '&salesmanId=' + data.salesmanId + '&serviceCheckStatus=' + data.serviceCheckStatus + '&storeIdReject=' + data.storeIdReject + '&storeIdSend=' + data.storeIdSend;
                this.$http({ // 查询入库单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/queryAfterSaleList',
                    data: data
                }).then((res) => {
                    this.tableData = res.data.afterSaleViewList;
                    this.pageInfo = res.data.xePageInfo;
                    this.picServer = res.data.picServer;
                    if (this.tableData.length > 0) {
                        this.detail(this.tableData[0]);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            pass(n) {
                this.rAjax(n);
            },
            reject(n) {
                if (this.rejectreson === '') {
                    this.$xeMessage.warning('原因不能为空');
                } else {
                    this.rAjax(n);
                }
            },
            rAjax(n) {
                let params = {};
                params.formCode = this.formCode;
                params.checkStatus = n;
                if (n === 4) {
                    params.refusReason = this.rejectreson;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/batchAfterSaleByService',
                    data: params
                }).then((res) => {
                    let _this = this;
                    this.$xeMessage.success(res.msg);
                    setTimeout(() => {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                    this.rejectdailogA = false;
                }).catch((error) => {
                    console.log(error);
                });
            },
            audit(row) {           // 售后单客服审核
                this.rejectdailogA = true;
                this.formCode = row.afterSalesCode;
            },
            onSubmit() {
                console.log(this.formData);
                this.creatInf(1, this.formData);
            },
            newSale() {
                this.$router.push({name: 'newservication'});
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.creatInf(1, this.formData);
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.creatInf(this.pageInfo.pageNum, this.formData);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.creatInf(this.pageInfo.pageNum, this.formData);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            createStartDateFn(val) {
                this.formData.createStartDate = val;
            },
            createEndDateFn(val) {
                this.formData.createEndDate = val;
            },
            cancellation() {
                let _this = this;
                if (this.selChangarr.length === 0) {
                    this.$xeMessage.warning('请先选择需要作废的售后单。');
                    return;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.selChangarr.forEach(function(value) {
                    if (value.afterSaleStatus === 1) {
                        checkInfoObj.formSupInfoArr.push(value.afterSalesCode);
                    } else {
                        checkInfoObj.disArr.push(value.afterSalesCode);
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    this.$xeMessage.warning('没有可以作废的售后单,请检查售后单状态');
                    return false;
                }
                checkInfoObj.tips = '仅接收售后单状态为“待审核”的角色，其他状态将会自动过滤';
                this.$confirm(checkInfoObj.tips, '作废', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.cancelLotFlag = true;
                    this.rejectdailog = true;
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            rejectSubmit(row) {
                if ($.trim(this.refusReason).length) {
                    if ($.trim(this.refusReason).length > 50) {
                        this.$xeMessage.warning('请填写售后单的作废原因50字以内');
                        return;
                    }
                } else {
                    this.$xeMessage.warning('请填写售后单的作废原因');
                    return;
                };
                let param = {};
                if (this.cancelLotFlag) { // 批量作废
                    param.data = {
                        afterSaleFormCodes: this.afterSalesCode(),
                        refusReason: this.refusReason
                    };
                    param.url = '/xe-route/xe-erp/afterSales/cancelAfterSaleList';
                } else {
                    param.data = {
                        afterSalesCode: this.selecteditorRow.afterSalesCode,
                        refusReason: this.refusReason
                    };
                    param.url = '/xe-route/xe-erp/afterSales/cancelAfterSale';
                }
                this.$http({
                    method: 'post',
                    url: param.url,
                    data: param.data
                }).then((res) => {
                    let _this = this;
                    this.$xeMessage.success(res.msg);
                    this.clearReject();
                    setTimeout(() => {
                        _this.creatInf(_this.pageInfo.pageNum, _this.formData);
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            afterSalesCode(row) { // 多选框code集合
                let param = [];
                for (let i in this.selChangarr) {
                    param.push(this.selChangarr[i].afterSalesCode);
                }
                return param;
            },
            clearReject() { // 关闭作废
                this.rejectdailog = false;
                this.selecteditorRow = {};
                this.refusReason = '';
            },
            rowTovoid(row) { // 单条数据作废
                this.cancelLotFlag = false;
                this.rejectdailog = true;
                this.selecteditorRow = row;
                // this.toggleSelection();
            }
        },
        watch: {
            'formData.formIdType'(n) {
                if (n === 1) {
                    this.placeholder = '请输入售后单号';
                } else if (n === 2) {
                    this.placeholder = '请输入订单编号';
                } else if (n === 3) {
                    this.placeholder = '请输入商品名称';
                } else if (n === 4) {
                    this.placeholder = '请输入商品货号';
                } else if (n === 5) {
                    this.placeholder = '请输入客户账号';
                } else if (n === 6) {
                    this.placeholder = '请输入收货人名称';
                }
            }
        },
        computed: {
            formIdTypeList() {
                return formIdType;
            },
            afterSaleStatusList() {
                return afterSaleStatus;
            },
            serviceCheckStatusList() {
                return serviceCheckStatus;
            },
            salesmanIdList() {
                return salesmanId;
            },
            financeCheckStatusList() {
                return financeCheckStatus;
            },
            storeIdRejectList() {
                return storeIdReject;
            },
            purchaseCheckStatusList() {
                return purchaseCheckStatus;
            },
            searchTimeTypeList() {
                return searchTimeType;
            },
            storeIdSendList() {
                return storeIdSend;
            }
        },
        components: {
            refundMerchandise,
            buyerInformation,
            logisticsInformation,
            refundJournal,
            areaselectTag,
            categoryTag
        },
        created() {
            this.creatInf(1, this.formData);
        }
    };
</script>

<style lang="scss">
    .el-tabs__nav{
        float: left;
    }
</style>
