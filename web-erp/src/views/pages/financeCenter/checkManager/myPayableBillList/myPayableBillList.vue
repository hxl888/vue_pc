<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData1" class="demo-form-inline">
                <el-form-item prop="pbCode">
                    <el-input size="small" v-model="formData.pbCode" placeholder="请输入应付账单号"></el-input>
                </el-form-item>
                <el-form-item prop="remark">
                    <el-input size="small" v-model="formData.remark" placeholder="供应商名称"></el-input>
                </el-form-item>
                 <!--<el-form-item label="" prop="reviewStatus" class="z-mr30">-->
                     <!--<el-select size="small" v-model="formData.reviewStatus" placeholder="复核状态">-->
                        <!--<el-option-->
                            <!--v-for="item in reviewStatusList"-->
                            <!--:key="item.value"-->
                            <!--:label="item.name"-->
                            <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item label="" prop="pbStatus">
                    <el-select size="small" v-model="formData.pbStatus" placeholder="结账状态">
                        <el-option
                            v-for="item in pbStatusList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="xeFinPbillListMethod">查询</el-button>
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
                            <el-form-item label="生成时间" style="margin-right:0">
                                <el-date-picker
                                    v-model="value1"
                                    type="datetime"
                                    size="small"
                                    @change="startTimeFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始时间"
                                >
                                </el-date-picker>
                                <span style="padding: 0 5px">-</span>
                            </el-form-item>
                            <el-form-item class="z-mr30">
                                <el-date-picker
                                    v-model="value2"
                                    type="datetime"
                                    size="small"
                                    @change="endTimeFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="pbCode" label="应付账单号">
                                <el-input size="small" class="xe-input-w160"  v-model="formData.pbCode" placeholder="请输入应付账单号"></el-input>
                            </el-form-item>
                             <el-form-item prop="remark" label="供应商名称">
                                <el-input size="small"  class="xe-input-w160"  v-model="formData.remark" placeholder="请输入供应商名称"></el-input>
                            </el-form-item>
                           <!--<el-form-item label="供应商名称" prop="userCode">-->
                                <!--<el-select size="small" class="xe-input-w160"  filterable v-model="formData.userCode" placeholder="供应商名称">-->
                                    <!--<el-option-->
                                        <!--v-for="item in supNameList"-->
                                        <!--:key="item.userCode"-->
                                        <!--:label="item.supplierName"-->
                                        <!--:value="item.userCode">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        </div>
                        <div class="clearfix">
                             <!--<el-form-item label="复核状态"  prop="reviewStatus">-->
                                 <!--<el-select size="small" class="xe-input-w160" v-model="formData.reviewStatus" placeholder="复核状态">-->
                                    <!--<el-option-->
                                        <!--v-for="item in reviewStatusList"-->
                                        <!--:key="item.value"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.value">-->
                                    <!--</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item label="结账状态" prop="pbStatus">
                                <el-select size="small" class="xe-input-w160"  v-model="formData.pbStatus" placeholder="结账状态">
                                    <el-option
                                        v-for="item in pbStatusList"
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
                            <el-form-item label="月份" prop="pbMonth">
                                <el-select size="small" class="xe-input-w160"  v-model="formData.pbMonth" placeholder="月份">
                                    <el-option
                                        v-for="item in monthFloorList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                             <el-form-item prop="proName" label="商品查询">
                                <el-input size="small" class="xe-input-w160"  v-model="formData.proName" placeholder="商品查询"></el-input>
                            </el-form-item>
                        </div>
                         <div class="clearfix">
                            <el-form-item label="结算方式" prop="purchSettleWay">
                                <el-select size="small" class="xe-input-w160"  v-model="formData.purchSettleWay" placeholder="结算方式">
                                    <el-option
                                        v-for="item in purchSettleWayList"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="xeFinPbillListMethod">查询</el-button>
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
            <el-button class="xe-button-normal" @click="toreviewMethod(1)"><i class="iconfont icon-duihao"></i> 复核成功</el-button>
            <el-button class="xe-button-normal" @click="toreviewMethod(2)"><i class="iconfont icon-jinyong"></i> 复核异常</el-button>
        </div>
        <div>
            <el-table
                :data="xeFinPbillList"
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
                    prop="reviewStatus"
                    label="复核状态"
                    min-width="100">
                    <template scope="scope">
                        <div>{{scope.row.reviewStatus | reviewStatusToText}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="pbMonth" label="月份" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.pbMonth">{{scope.row.pbMonth}}月份</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="pbCode"
                    label="应付账单号"
                    min-width="160">
                     <template scope="scope">
                        <a class="s-blue" @click="purchPayDetail(scope.row.pbCode)">{{scope.row.pbCode}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="生成时间"
                    min-width="150">
                    <template scope="props">
                        <div>
                            {{props.row.createDate | millisecondFormat('ms')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="供应商名称"
                    min-width="150">
                </el-table-column>
                <el-table-column
                    prop="pbStatus"
                    label="结账状态"
                    min-width="100">
                    <template scope="props">
                        <div>
                            {{props.row.pbStatus | pbStatusToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="payAmount"
                    label="本期应付合计"
                    min-width="130">
                    <template scope="scope">
                        <div v-if="scope.row.payAmount && !scope.row.lastPbCode && !scope.row.lastUnPayAmount">
                            ￥{{parseFloat(scope.row.payAmount).toFixed(2)}}
                        </div>
                        <div v-if="scope.row.payAmount && scope.row.lastPbCode && scope.row.lastUnPayAmount">
                            ￥{{parseFloat((scope.row.payAmount * 1000 + scope.row.lastUnPayAmount * 1000)/1000).toFixed(2)}}&nbsp;=&nbsp;￥{{parseFloat(scope.row.payAmount).toFixed(2)}}&nbsp;<a class="s-blue" @click="listUnPayBillDetail(scope.row.lastPbCode, scope.row.userCode)">(+&nbsp;{{parseFloat(scope.row.lastUnPayAmount).toFixed(2)}})</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="actPayAmount"
                    label="本期实付合计"
                    min-width="130">
                    <template scope="props">
                        <div v-if="props.row.actPayAmount">
                            ￥{{parseFloat(props.row.actPayAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="profitAmount"
                    label="本期毛利合计"
                    min-width="130">
                    <template scope="props">
                        <div v-if="props.row.profitAmount">
                            ￥{{parseFloat(props.row.profitAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="unPayAmount"
                    label="本期未结金额合计"
                    min-width="150">
                    <template scope="props">
                        <div v-if="props.row.unPayAmount">
                            ￥{{parseFloat(props.row.unPayAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expenseType"
                    label="支出类型"
                    min-width="120">
                    <template scope="props">
                        <div>
                            {{props.row.expenseType | expenseTypeToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchSettleWay"
                    label="结算方式"
                    min-width="120">
                    <template scope="props">
                        <div>
                            {{props.row.purchSettleWay | purchSettleWayToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="settleDate"
                    label="结账时间"
                    min-width="150">
                    <template scope="props">
                        <div>
                            {{props.row.settleDate | millisecondFormat('ms')}}
                        </div>
                    </template>
                </el-table-column>
                <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--fixed="right"-->
                    <!--width="70">-->
                    <!--<template scope="props">-->
                        <!--<div class="btn-in-table">-->
                            <!--<a href="javascript:;" class="s-blue" @click="editBtn(props.row, props.$index)">修改</a>-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
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
                <el-tab-pane label="单据明细" name="first">
                    <div>
                        <el-table
                            :data="payDetails"
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
                                prop="orderId"
                                label="订单编号"
                                min-width="150">
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
                                prop="proName"
                                label="商品名称"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                prop="specValue"
                                label="规格"
                                min-width="80">
                            </el-table-column>
                            <el-table-column
                                prop="proNum"
                                label="货号"
                                min-width="150">
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
                                    <div v-if="scope.row.proPrice">{{parseFloat(scope.row.proPrice).toFixed(2)}}</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchaseNum"
                                label="订购量"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                prop="proUnit"
                                label="单位"
                                min-width="80">
                            </el-table-column>
                            <el-table-column prop="proTotalPrice" label="订购金额" min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.proTotalPrice">
                                        {{parseFloat(scope.row.proTotalPrice).toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="realSendNum"
                                label="发货量"
                                min-width="100">
                            </el-table-column>
                            <el-table-column
                                prop="realPayAmount"
                                label="发货金额"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.proPayAmount">{{parseFloat((scope.row.proPayAmount*1000 - (scope.row.refundAmount ? scope.row.refundAmount*1000 : 0))/1000).toFixed(2)}}</div>
                                    <div v-else>0</div>
                                    <!--<div v-if="scope.row.realPayAmount">-->
                                        <!--{{parseFloat(scope.row.realPayAmount).toFixed(2)}}-->
                                    <!--</div>-->
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="profitAmount"
                                label="毛利"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.profitAmount">
                                        {{parseFloat(scope.row.profitAmount).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="purchPrice"
                                label="采购单价"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.purchPrice">
                                        {{parseFloat(scope.row.purchPrice).toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="realPayAmount"
                                label="实际付款金额"
                                min-width="130">
                                <template scope="scope">
                                    <div v-if="scope.row.realPayAmount">
                                        {{parseFloat(scope.row.realPayAmount).toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="cutPayAmount"
                                label="其他扣款"
                                min-width="100">
                                <template scope="scope">
                                    <div v-if="scope.row.cutPayAmount">
                                        {{parseFloat(scope.row.cutPayAmount).toFixed(2)}}
                                    </div>
                                    <div v-else>0</div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="cutReason"
                                label="扣款原因"
                                min-width="170">
                            </el-table-column>
                            <el-table-column
                                prop="purchAdress"
                                label="采购商地址"
                                min-width="200">
                            </el-table-column>
                            <el-table-column
                                prop="purchPayStatus"
                                label="采购货款"
                                min-width="100">
                                <template scope="scope">
                                    <div>
                                        {{scope.row.purchPayStatus | purchPayStatusToText}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="remark"
                                label="备注"
                                min-width="150">
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--未结算账单-->
        <el-dialog title="未结算账单" :visible.sync="dialogbut" class="reset-dialog reset-dialogWauto">
            <div style="padding: 15px 20px 20px">
                <order-alert :lastayDetailRow="lastayDetailRow" :dialogbut="dialogbut"></order-alert>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import orderAlert from './orderAlert';
    import { millisecondFormat } from 'utils';
    import {monthFloor, reviewStatus, pbStatus, purchSettleWay} from '@/dataControl.js';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                outerUrl: '',
                outerDetailUrl: '',
                xeFinPbillList: [], // 收款单列表
                arraySelection: [], // 多选
                payDetails: [], // 商品明细列表
                tabCard_val: 'first', // tab切换
                editordialog: false, // 弹框开关
                sbillCodeSelec: '', // 记录点击的收款单
                selectRow: '', // 单条修改信息储存
                selectIndex: '', // 单条修改下标信息储存
                dialogbut: false,
                editorRule: {
                    realSbillAmount: [
                        { required: true, message: '实收金额不能为空', trigger: 'blur' }
                    ],
                    sbillRemark: [
                        { required: true, message: '备注不能为空', trigger: 'blur' }
                    ]
                },
                supNameList: [], // 供应商名称
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                pbCode: '', // 选中的账单编码
                lastayDetailRow: {}, // 上个账期未结算的订单插叙信息储存
                formData: {
                    purchSettleWay: '',
                    cancelStatus: '',
                    confirmBill: '',
                    orderId: '',
                    endDate: '',
                    startDate: '',
                    pbCode: '',
                    pbMonth: '',
                    pbStatus: '',
                    proName: '',
                    reviewStatus: '',
                    remark: ''
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
                },
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        created() {
            this.loadSupplier();
            this.xeFinPbillListMethod();
        },
        methods: {
            listUnPayBillDetail(lastPbCode, userCode) { // 显示对应上个账期未结算的订单明细
                this.dialogbut = true;
                this.lastayDetailRow.userCode = userCode;
                this.lastayDetailRow.lastPbCode = lastPbCode;
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            toreviewMethod(status) {
                let tishi = '';
                if (status === 1) {
                    tishi = '是否真的通过复核';
                } else if (status === 2) {
                    tishi = '确认复核异常吗';
                }
                if (this.arraySelection.length) {
                    this.$confirm(`您当前选择${this.arraySelection.length}个应付账单,${tishi}?`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj = [];
                        let flag = this.arraySelection.some(item => {
                            return item.reviewStatus === 1;
                        });
                        this.arraySelection.forEach(item => {
                            if (item.reviewStatus === 1) {
                                obj.push(item.pbCode);
                            }
                        });
                        if (flag) {
                            this.toreviewPost(status, obj);
                        } else {
                            this.$xeMessage.warning(`勾选的账单"已复核或者已复核异常",请重新勾选`);
                        }
                    }).catch(() => {
                        console.log('取消提交');
                    });
                } else {
                    this.$xeMessage.warning(`请选勾选需要批量复合的账单`);
                }
            },
            toreviewPost(status, obj) { // 复核
                let URL = '';
                let params = {};
                let _this = this;
                if (status === 1) { // 复核成功
                    URL = '/finPurchPay/finPurchPayCheckSuccess';
                } else if (status === 2) { // 复核失败
                    URL = '/finPurchPay/finPurchPayCheckFail';
                }
                params.pbCodeArr = obj;
                this.$http({ // 复核接口
                    method: 'post',
                    url: `${this.productUrl}${URL}`,
                    data: params
                }).then((res) => {
                    setTimeout(() => {
                        _this.xeFinPbillListMethod();
                    }, 300);
                    this.$xeMessage.success(`${res.msg}`);
                }).catch((error) => {
                    console.log(error);
                });
            },
            loadSupplier() {
                let param = {};
                this.$http({ // 查询供应商名称
                    method: 'post',
                    url: `${this.productUrl}/finPurchPay/querySupNameList`,
                    data: param
                }).then((res) => {
                    this.supNameList = res.data.supNameList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            searchTimeTypeSelec() {
                this.value1 = '';
                this.value2 = '';
            },
            parseFloatNum(event) {
                let value = event.target.value;
                if (parseFloat(value) >= 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            startTimeFn(val) {
                this.startTimes = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            endTimeFn(val) {
                this.endTimes = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            handleSelectionChange(val) {
                this.arraySelection = val;
            },
            xeFinPbillListMethod() { // 我的应付账单列表
                let params = {};
                params = this.formData;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.value1) {
                    params.startDate = millisecondFormat(this.value1.getTime(), 'ms');
                } else {
                    params.startDate = '';
                }
                if (this.value2) {
                    params.endDate = millisecondFormat(this.value2.getTime(), 'ms');
                } else {
                    params.endDate = '';
                }
                this.outerUrl = '/xe-route/xe-erp/finance/queryMineFinPurchPayExportList?cancelStatus=' + params.cancelStatus + '&confirmBill=' + params.confirmBill + '&endDate=' + params.endDate + '&orderId=' + params.orderId + '&pbCode=' + params.pbCode + '&pbMonth=' + params.pbMonth + '&pbStatus=' + params.pbStatus + '&proName=' + params.proName + '&purchSettleWay=' + params.purchSettleWay + '&remark=' + params.remark + '&reviewStatus=' + params.reviewStatus + '&startDate=' + params.startDate;
                // mingxi
                this.outerDetailUrl = '/xe-route/xe-erp/finance/queryMineFinPurchPayExportDetail?cancelStatus=' + params.cancelStatus + '&confirmBill=' + params.confirmBill + '&endDate=' + params.endDate + '&orderId=' + params.orderId + '&pbCode=' + params.pbCode + '&pbMonth=' + params.pbMonth + '&pbStatus=' + params.pbStatus + '&proName=' + params.proName + '&purchSettleWay=' + params.purchSettleWay + '&remark=' + params.remark + '&reviewStatus=' + params.reviewStatus + '&startDate=' + params.startDate;
                this.$http({ // 我的应付账单列表
                    method: 'post',
                    url: `${this.productUrl}/finPurchPay/queryMineFinPurchPayList`,
                    data: params
                }).then((res) => {
                    if (res.data.dataList && res.data.dataList.length) {
                        if (res.data.dataList[0].pbCode) {
                            this.sbillCodeSelec = res.data.dataList[0].pbCode;
                            this.purchPayDetail(this.sbillCodeSelec); // 默认显示第一条商品信息
                        }
                    }
                    this.xeFinPbillList = res.data.dataList;
                    this.pagelist.total = res.data.xePageInfo.total;
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.xeFinPbillListMethod();
            },
            purchPayDetail(sbillCode) {
                let param = {};
                param.pbCode = sbillCode;
                this.$http({ // 我的应付款账单明细
                    method: 'post',
                    url: `${this.productUrl}/finPurchPay/queryMineFinPurchPayDetail`,
                    data: param
                }).then((res) => {
                    this.payDetails = res.data.dataList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.xeFinPbillListMethod();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.xeFinPbillListMethod();
                }
            }
        },
        watch: {
//            editordialog(n) { // 编辑清空
//                let _this = this;
//                if (n === false) {
//                    setTimeout(() => {
//                        _this.$refs.editorForm.resetFields();
//                    }, 300);
//                }
//            }
        },
        computed: {
            monthFloorList() {
                return monthFloor;
            },
            reviewStatusList() {
                return reviewStatus;
            },
            pbStatusList() {
                return pbStatus;
            },
            purchSettleWayList() {
                return purchSettleWay;
            }
        },
        components: {
            orderAlert
        }
    };
</script>
