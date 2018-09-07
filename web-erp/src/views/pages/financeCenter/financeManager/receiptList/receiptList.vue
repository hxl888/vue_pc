<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData1" class="demo-form-inline">
                 <el-form-item prop="sbillStatus">
                    <el-select size="small" v-model="formData.sbillStatus" placeholder="收款状态">
                        <el-option
                            v-for="item in sbillStatusList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="timeType">
                    <el-select size="small" class="xe-input-w95"  @change="searchTimeTypeSelec" v-model="formData.searchTimeType" placeholder="查询条件">
                        <el-option
                            v-for="item in finaceCenterDataSearList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        v-model="value1"
                        type="datetime"
                        size="small"
                        :picker-options="pickerOptionStart"
                        placeholder="开始时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        v-model="value2"
                        type="datetime"
                        size="small"
                        :picker-options="pickerOptionEnd"
                        placeholder="结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                 <!--<el-form-item prop="orderId">-->
                    <!--<el-input size="small" v-model="formData.orderId" placeholder="请输入订单编号"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="finSalesBillList">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData1')">重置</el-button>
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
                                <el-select size="small" class="xe-input-w110" @change="searchTimeTypeSelec" v-model="formData.searchTimeType" placeholder="查询条件">
                                    <el-option
                                        v-for="item in finaceCenterDataSearList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    v-model="value1"
                                    style="width:160px"
                                    type="datetime"
                                    size="small"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    v-model="value2"
                                    style="width:160px"
                                    type="datetime"
                                    size="small"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="收款状态" prop="sbillStatus">
                                <el-select size="small" class="xe-input-w160"  v-model="formData.sbillStatus" placeholder="收款状态">
                                    <el-option
                                        v-for="item in sbillStatusList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="orderId" label="订单编号">
                                <el-input size="small" class="xe-input-w160"  v-model="formData.orderId" placeholder="订单编号"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="收款方式" prop="sbillPayType">
                                <el-select size="small" class="xe-input-w160"  v-model="formData.sbillPayType" placeholder="收款方式">
                                    <el-option
                                        v-for="item in sbillPayTypeList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="月份" prop="month">
                                <el-select size="small" class="xe-input-w160"  v-model="formData.month" placeholder="月份">
                                    <el-option
                                        v-for="item in monthFloorList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                             <el-form-item prop="sbillCode" label="收款单号">
                                <el-input size="small" class="xe-input-w160"  v-model="formData.sbillCode" placeholder="收款单号"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="finSalesBillList">查询</el-button>
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
            <el-button class="xe-button-normal" ><i class="iconfont icon-daoru"></i> 导入</el-button>
        </div>
        <div>
            <el-table
                :data="salesBillList"
                border
                @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column
                    label=""
                    fixed="left"
                    class-name="td-index"
                    width="55">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="34" class-name="selectionTd" fixed="left"></el-table-column>
                <el-table-column
                    prop="months"
                    label="月份"
                    min-width="80">
                    <template scope="scope">
                        <div v-if="scope.row.months">{{scope.row.months}}月份</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sbillCode"
                    label="收款单号"
                    min-width="150">
                     <template scope="scope">
                        <a class="s-blue" @click="salesBillDetail(scope.row.sbillCode, scope.row.payType)">{{scope.row.sbillCode}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sendTime"
                    label="发货时间"
                    min-width="150">
                    <template scope="props">
                        <div>
                            {{props.row.sendTime | millisecondFormat('ms')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderId"
                    label="订单编号"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="goodsAmount"
                    label="商品总额"
                    min-width="100">
                    <template scope="props">
                        <div v-if="props.row.goodsAmount">
                            {{parseFloat(props.row.goodsAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="payAmount"
                    label="订单金额"
                    min-width="100">
                    <template scope="props">
                        <div v-if="props.row.payAmount">
                            {{parseFloat(props.row.payAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="epayReceAmt"
                    label="应收金额"
                    min-width="100">
                    <template scope="props">
                        <div v-if="props.row.epayReceAmt">
                            {{parseFloat(props.row.epayReceAmt).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="differAmount"
                    label="退款金额"
                    min-width="100">
                    <template scope="props">
                        <div v-if="props.row.payType == 4 && props.row.differAmount">
                            {{parseFloat(props.row.differAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="realSbillAmount"
                    label="实收金额"
                    min-width="100">
                    <template scope="props">
                        <div v-if="props.row.realSbillAmount">
                            {{parseFloat(props.row.realSbillAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="sbillStatus"
                    label="收款状态"
                    min-width="120">
                    <template scope="props">
                        {{props.row.sbillStatus | sbillStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop=""
                    label="收款日期"
                    min-width="150">
                    <div>
                        <!--{{props.row.sendTime | millisecondFormat('ms')}}-->
                    </div>
                </el-table-column>
                <el-table-column
                    prop="sbillPayType"
                    label="收款方式"
                    min-width="100">
                    <template scope="props">
                        {{props.row.sbillPayType | sbillPayTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="payType"
                    label="支付类型"
                    min-width="150">
                    <template scope="props">
                        {{props.row.payType | payTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="orderRemark"
                    label="订单备注"
                    min-width="170">
                </el-table-column>
                <el-table-column
                    prop="orderStatus"
                    label="订单状态"
                    min-width="130">
                    <template scope="props">
                        <div>
                            {{props.row.orderStatus | orderStatusToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="caAreaId"
                    label="收货地址"
                    min-width="170">
                </el-table-column>
                <el-table-column
                    prop="caStreet"
                    label="收货区域"
                    min-width="170">
                </el-table-column>
                <el-table-column
                    prop="sbillRemark"
                    label="备注"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="70">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editBtn(props.row, props.$index)">修改</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="xe-pagination-panel">
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
            <el-tabs v-model="tabCard_val" class="noFlot" type="card">
                <!--商品信息-->
                <el-tab-pane label="商品信息" name="first">
                    <div>
                        <el-table
                            :data="salesBillDetailList"
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
                                prop="proNum"
                                label="商品货号"
                                min-width="150">
                            </el-table-column>
                            <el-table-column
                                prop="proName"
                                label="商品名称"
                                min-width="130">
                            </el-table-column>
                            <el-table-column
                                prop="specValue"
                                label="规格"
                                min-width="80">
                            </el-table-column>
                            <el-table-column
                                prop="proUnit"
                                label="单位"
                                min-width="80">
                            </el-table-column>
                            <el-table-column
                                prop="pricingType"
                                label="计量方式"
                                min-width="100">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.pricingType | pricingTypeToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proPrice"
                                    label="商品单价"
                                    min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{parseFloat(scope.row.proPrice).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchaseNum"
                                label="订购量"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.purchaseNum">
                                        {{parseFloat(scope.row.purchaseNum).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="proPrice"
                                label="订购金额"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.proPrice">
                                        {{parseFloat((scope.row.proPrice ? scope.row.proPrice : 0) * (scope.row.purchaseNum ? scope.row.purchaseNum : 0)).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="realSendNum"
                                label="实发量"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.realSendNum">
                                        {{parseFloat(scope.row.realSendNum).toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="sfAmount"
                                label="实发金额"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.sfAmount">
                                        {{parseFloat(scope.row.sfAmount).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="differNum"
                                label="差异量"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.differNum">
                                        {{parseFloat(scope.row.differNum).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="differAmount"
                                label="差异金额"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="orderpayType == 4 && scope.row.differAmount">
                                        {{parseFloat(scope.row.differAmount).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--编辑-->
        <el-dialog title="编辑" :visible.sync="editordialog" class="reset-dialog dialog_wid340 error-tishi">
            <el-form :model="editorForm" :rules="editorRule" label-width="70px" ref="editorForm">
                <el-form-item prop="realSbillAmount" label="实收金额">
                    <el-input size="small" @input.native="parseFloatNum($event)" v-model="editorForm.realSbillAmount" @blur="editorForm.realSbillAmount = parseFloat(editorForm.realSbillAmount) ? parseFloat(editorForm.realSbillAmount).toFixed(2) : ''" :maxlength="10" type="text" class="" placeholder="请输入实收金额"></el-input>
                </el-form-item>
                <el-form-item prop="sbillRemark" label="备注">
                    <el-input size="small" v-model="editorForm.sbillRemark" :maxlength="20" type="textarea" class="" placeholder="请输入备注20字以内"></el-input>
                </el-form-item>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="editorsubmit('editorForm')">确定</el-button>
                    <el-button class="xe-button-normal" @click="editordialog = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {sbillStatus, finaceCenterDataSear, sbillPayType, monthFloor} from '@/dataControl.js';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                outerUrl: '',
                outerDetailUrl: '',
                salesBillList: [], // 收款单列表
                multipleSelection: [], // 多选
                salesBillDetailList: [], // 商品明细列表
                tabCard_val: 'first', // tab切换
                editordialog: false, // 弹框开关
                sbillCodeSelec: '', // 记录点击的收款单
                selectRow: '', // 单条修改信息储存
                selectIndex: '', // 单条修改下标信息储存
                editorRule: {
                    realSbillAmount: [
                        { required: true, message: '实收金额不能为空', trigger: 'blur' }
                    ],
                    sbillRemark: [
                        { required: true, message: '备注不能为空', trigger: 'blur' }
                    ]
                },
                editorForm: {
                    sbillCode: '',
                    sbillRemark: '',
                    realSbillAmount: ''
                },
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                formData: {
                    sbillStatus: '',
                    sbillPayType: '',
                    orderId: '',
                    sbillCode: '',
                    month: '',
                    searchTimeType: 1,
                    startSendTime: '',
                    endSendTime: ''
                },
                orderpayType: '',
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
                },
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        created() {
            this.finSalesBillList();
        },
        methods: {
            searchTimeTypeSelec() {
//                this.value1 = '';
//                this.value2 = '';
            },
            parseFloatNum(event) {
                let value = event.target.value;
                if (parseFloat(value) >= 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            editorsubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateFinSalesBil();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            editBtn(row, index) { // 修改
                this.selectRow = row;
                this.selectIndex = index;
                this.editordialog = true;
                this.editorForm.sbillCode = this.selectRow.sbillCode;
                this.editorForm.sbillRemark = this.selectRow.sbillRemark;
                this.editorForm.epayReceAmt = this.selectRow.epayReceAmt;
                if (this.selectRow.realSbillAmount) {
                    this.editorForm.realSbillAmount = this.selectRow.realSbillAmount.toString();
                }
            },
            updateFinSalesBil() {
                let param = {};
                param = this.editorForm;
                this.$http({ // 收款单信息修改
                    method: 'post',
                    url: `${this.productUrl}/xeVenFinSalesBill/updateFinSalesBil`,
                    data: param
                }).then((res) => {
                    this.editordialog = false;
                    this.$xeMessage.success(`${res.msg}`);
                    this.salesBillList[this.selectIndex].sbillRemark = this.editorForm.sbillRemark;
                    this.salesBillList[this.selectIndex].realSbillAmount = this.editorForm.realSbillAmount;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            finSalesBillList() {
                let params = {};
                params = this.formData;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.value1) {
                    params.startSendTime = millisecondFormat(this.value1.getTime(), 'ms');
                } else {
                    params.startSendTime = '';
                }
                if (this.value2) {
                    params.endSendTime = millisecondFormat(this.value2.getTime(), 'ms');
                } else {
                    params.endSendTime = '';
                }
                this.outerUrl = '/xe-route/xe-erp/finance/exFinSalesBillList?endSendTime=' + params.endSendTime + '&month=' + params.month + '&orderId=' + params.orderId + '&sbillCode=' + params.sbillCode + '&sbillPayType=' + params.sbillPayType + '&sbillStatus=' + params.sbillStatus + '&searchTimeType=' + params.searchTimeType + '&startSendTime=' + params.startSendTime;
                // mingxi
                this.outerDetailUrl = '/xe-route/xe-erp/finance/exFinSalesBillDetail??endSendTime=' + params.endSendTime + '&month=' + params.month + '&orderId=' + params.orderId + '&sbillCode=' + params.sbillCode + '&sbillPayType=' + params.sbillPayType + '&sbillStatus=' + params.sbillStatus + '&searchTimeType=' + params.searchTimeType + '&startSendTime=' + params.startSendTime;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: `${this.productUrl}/xeVenFinSalesBill/queryXeVenFinSalesBillList`,
                    data: params
                }).then((res) => {
                    console.log(res.data.salesBillList[0]);
                    if (res.data.salesBillList.length) {
                        if (res.data.salesBillList[0].sbillCode) {
                            this.sbillCodeSelec = res.data.salesBillList[0].sbillCode;
                            this.orderpayType = res.data.salesBillList[0].payType;
                            this.salesBillDetail(this.sbillCodeSelec, this.orderpayType); // 默认显示第一条商品信息
                        }
                    }
                    this.salesBillList = res.data.salesBillList;
                    this.pagelist.total = res.data.xePageInfo.total;
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.finSalesBillList();
            },
            salesBillDetail(sbillCode, payType) {
                let param = {};
                this.orderpayType = payType;
                param.sbillCode = sbillCode;
                this.$http({ // 收款单商品明细列表
                    method: 'post',
                    url: `${this.productUrl}/xeVenFinSalesBillDetail/queryXeVenFinSalesBillDetailList`,
                    data: param
                }).then((res) => {
                    this.salesBillDetailList = res.data.salesBillDetailList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.finSalesBillList();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.finSalesBillList();
                }
            }
        },
        watch: {
            editordialog(n) { // 编辑清空
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.$refs.editorForm.resetFields();
                    }, 300);
                }
            }
        },
        computed: {
            sbillStatusList() {
                return sbillStatus;
            },
            finaceCenterDataSearList() {
                return finaceCenterDataSear;
            },
            sbillPayTypeList() {
                return sbillPayType;
            },
            monthFloorList() {
                return monthFloor;
            }
        }
    };
</script>
