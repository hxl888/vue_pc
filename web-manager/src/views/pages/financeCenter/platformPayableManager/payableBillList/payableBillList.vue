<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
                    <el-form-item prop="pbCode">
                        <el-input size="small" placeholder="应付账单号" v-model="searchform.pbCode" class="">
                          </el-input>
                    </el-form-item>
                    <el-form-item prop="confirmBill">
                        <el-select size="small"  v-model="searchform.confirmBill" placeholder="确认状态">
                                <el-option
                                v-for="item in confirmBillList"
                                :label="item.name"
                                :key="item.value"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item prop="orderId">
                        <el-input size="small" placeholder="订单编号" v-model="searchform.orderId">
                          </el-input>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="listSysFinBkg">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
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
                    <el-form :inline="true"  label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div class="clearfix">
                            <el-form-item label="生成时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                            <el-form-item prop="pbCode" label="应付账单号">
                                <el-input size="small" style="width: 168px" placeholder="应付账单号" v-model="searchform.pbCode" class="">
                                  </el-input>
                            </el-form-item>
                            <el-form-item prop="confirmBill" label="确认状态">
                                <el-select size="small"  style="width: 168px" v-model="searchform.confirmBill" placeholder="确认状态">
                                        <el-option
                                        v-for="item in confirmBillList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="orderId" label="订单编号">
                                <el-input size="small"style="width: 168px"  placeholder="订单编号" v-model="searchform.orderId">
                                  </el-input>
                            </el-form-item>
                             <el-form-item prop="userCode" label="供应商名称">
                                <el-select size="small"style="width: 168px"  v-model="searchform.userCode" :filterable="true" placeholder="供应商名称">
                                        <el-option
                                        v-for="item in venNameList"
                                        :label="item.venName"
                                        :key="item.userCode"
                                        :value="item.userCode">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                         <div  class="clearfix">
                            <el-form-item prop="proName" label="商品查询">
                                <el-input size="small" style="width: 168px" placeholder="商品查询" v-model="searchform.proName" class="">
                                  </el-input>
                            </el-form-item>
                            <el-form-item prop="pbStatus" label="结账状态">
                                <el-select size="small"  style="width: 168px" v-model="searchform.pbStatus" placeholder="结账状态">
                                        <el-option
                                        v-for="item in pbStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="pbMonth" label="月份">
                                <el-select size="small" style="width: 168px"  v-model="searchform.pbMonth" placeholder="月份">
                                        <el-option
                                        v-for="item in monthFloorList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="reviewStatus"  label="复核状态">
                                <el-select size="small" style="width: 168px"  v-model="searchform.reviewStatus" placeholder="复核状态">
                                        <el-option
                                        v-for="item in reviewStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="cancelStatus" label="作废状态">
                                <el-select size="small" style="width: 168px"  v-model="searchform.cancelStatus" placeholder="作废状态">
                                        <el-option
                                        v-for="item in cancelStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="bkgeSettleWay"   label="结算方式">
                                <el-select size="small" style="width: 168px" v-model="searchform.bkgeSettleWay" placeholder="结算方式">
                                        <el-option
                                        v-for="item in settleWayList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="listSysFinBkg">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="exportDataMethod"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <el-button @click="exportPayBillDetail"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button>
            <el-button @click="confirmPbillBatch"><i class="iconfont icon-zhangdanqueren"></i>&nbsp;账单确认</el-button>
            <el-button @click="finishPbillBatch"><i class="iconfont icon-jiezhang"></i>&nbsp;结账</el-button>
            <el-button @click="cancelPbillBatch"><i class="iconfont icon-zuofei"></i>&nbsp;作废</el-button>
        </div>
        <div>
            <el-table ref="xeFinPbillList" :data="xeFinPbillList" border v-loading="dataListloading" @selection-change="handleSelectionChange">
                <el-table-column  min-width="55" fixed="left">
                    <template scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="50" fixed="left"></el-table-column>
                    <el-table-column prop="pbMonth" label="月份" min-width="100">
                        <template scope="scope">
                            <div v-if="scope.row.pbMonth">
                                {{scope.row.pbMonth}}月份
                            </div>
                        </template>
                    </el-table-column>
                <el-table-column prop="pbCode" label="应付账单号" min-width="160">
                    <template scope="scope">
                        <div>
                            <a class="s-blue" @click="listFinPayDetail(scope.row.pbCode, scope.row.pbType, scope.row.userCode, scope.row.confirmBill, scope.row.pbStatus, scope.row.cancelStatus)">{{scope.row.pbCode}}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="生成时间" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.createDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="venName" label="供应商名称" min-width="150">
                </el-table-column>
                <el-table-column prop="shopName" label="店铺名称" min-width="150">
                </el-table-column>
                <el-table-column prop="pbStatus" label="结账状态" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.pbStatus | pbStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="payAmount" label="本期应付合计" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.payAmount && !scope.row.lastPbCode && !scope.row.lastUnPayAmount">
                            ￥{{parseFloat(scope.row.payAmount).toFixed(2)}}
                        </div>
                        <div v-if="scope.row.payAmount && scope.row.lastPbCode && scope.row.lastUnPayAmount">
                           ￥{{parseFloat((scope.row.payAmount * 1000 + scope.row.lastUnPayAmount * 1000)/1000).toFixed(2)}}&nbsp;=&nbsp;￥{{parseFloat(scope.row.payAmount).toFixed(2)}}&nbsp;<a class="s-blue" @click="listUnPayBillDetail(scope.row.lastPbCode, scope.row.userCode)">(+&nbsp;{{parseFloat(scope.row.lastUnPayAmount).toFixed(2)}})</a>
                        </div>
                        <div v-if="!scope.row.payAmount">￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="actPayAmount" label="本期实付合计" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.actPayAmount">
                            ￥{{parseFloat(scope.row.actPayAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="bkgeAmount" label="本期佣金合计" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.bkgeAmount">
                            ￥{{parseFloat(scope.row.bkgeAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="unPayAmount" label="本期未结金额合计" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.unPayAmount">
                            ￥{{parseFloat(scope.row.unPayAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="expenseType" label="支出类型" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.expenseType">
                            {{scope.row.expenseType | expenseTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="reviewStatus" label="复核状态" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.reviewStatus">
                            {{scope.row.reviewStatus | reviewStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="confirmBill" label="账单确认情况" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.confirmBill">
                            {{scope.row.confirmBill | confirmBillfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="bkgeSettleWay" label="结算方式" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.bkgeSettleWay">
                            {{scope.row.bkgeSettleWay | bkgeSettleWayfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="cancelStatus" label="作废状态" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.cancelStatus | cancelStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="settleDate" label="结账时间" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.settleDate">
                            {{scope.row.settleDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="85" fixed="right">
                    <template scope="scope">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="fillScreen(scope.row.pbCode, scope.row.pbType, scope.row.userCode, scope.row.confirmBill, scope.row.pbStatus, scope.row.cancelStatus, scope.row)">全屏对账</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        <div class="pub-tabDatadetails" style="margin-top: 30px;position: relative">
            <span style="color: #ff4949;position: absolute;left: 90px;top: 10px">&nbsp;&nbsp;&nbsp;*若此账单本期内有不需要结账的明细，请单条选中，在明细中去掉勾选状态结账即可</span>
            <el-tabs v-model="tabCard_val" class="noFlot" type="card">
                <el-tab-pane label="单据明细" name="first">
                    <refund-journal :payDetails = 'payDetails' :cancelStatus_s="cancelStatus_s" :paypbStatus="paypbStatus" :seleSure="seleSure" :confirmBillStatus="confirmBillStatus" @seletChangeDetails="seletChangeDetails" @confirmPbillsucess="confirmPbillsucess"></refund-journal>
                </el-tab-pane>
            </el-tabs>
        </div>
        <!--未结算账单-->
        <el-dialog title="未结算账单" :visible.sync="dialogbut" class="reset-dialog reset-dialogWauto">
            <div style="padding-top: 5px">
                <order-alert :lastayDetailRow="lastayDetailRow" :dialogbut="dialogbut"></order-alert>
            </div>
        </el-dialog>
        <!--全屏对账-->
        <el-dialog :title="pbcodeTit" :visible.sync="fillScreendilog" class="reset-dialog reset-dialogScreeen">
            <div style="padding: 20px;">
                <div style="padding-bottom: 18px">生成时间：{{fillSelecRow.createDate, 'ms' | millisecondFormat}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;供应商名称：{{fillSelecRow.venName}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;结账状态：{{fillSelecRow.pbStatus | pbStatusfiter}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;账单确认情况：{{fillSelecRow.confirmBill | confirmBillfiter}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本期应付金额合计：{{fillSelecRow.payAmount ? parseFloat(fillSelecRow.payAmount).toFixed(2) : ''}}</div>
                <refund-journal :payDetails = 'payDetails' :cancelStatus_s="cancelStatus_s" :paypbStatus="paypbStatus" :seleSure="seleSure" :confirmBillStatus="confirmBillStatus" @seletChangeDetails="seletChangeDetails" @confirmPbillsucess="confirmPbillsucess"></refund-journal>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { confirmBill, pbStatus, monthFloor, reviewStatus, cancelStatus, settleWay } from '@/dataControl';
import orderAlert from './orderAlert';
import { millisecondFormat } from 'utils';
import refundJournal from './refundJournal';
export default {
    data() {
        return {
            tabCard_val: 'first',
            searchform: {
                bkgeSettleWay: null,
                cancelStatus: null,
                confirmBill: null,
                orderId: '',
                endDate: '',
                startDate: '',
                pbCode: '',
                pbMonth: null,
                pbStatus: null,
                proName: '',
                reviewStatus: null,
                userCode: ''
            },
            exportData: '',
            detailsData: {}, // 单据明细勾选数据
            confirmBillStatus: '', // 判断明细确认状态
            cancelStatus_s: '', // 判断明细作废状态
            payDetails: [], // 应付款账单明细
            seleSure: true, // 明细勾选框显示与隐藏设置
            venNameList: [],
            fillScreendilog: false, // 全屏展示
            fillSelecRow: '', // 全屏勾选数据储存
            paypbStatus: '', // 判断单条点击结账状态
            pbcodeTit: '',
            lastayDetailRow: {}, // 上个账期未结算的订单插叙信息储存
            dialogbut: false,
            pbCode: '',
            xeFinPbillList: [],
            value1: '',
            value2: '',
            selectedArray: [],
            dataListloading: false,
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.listSysFinBkg();
        this.getVenInfoByVenName();
    },
    methods: {
        confirmPbillsucess() { // 明显修改成功
            this.listSysFinBkg();
            this.fillScreendilog = false;
        },
        listUnPayBillDetail(lastPbCode, userCode) { // 显示对应上个账期未结算的订单明细
            this.dialogbut = true;
            this.lastayDetailRow.userCode = userCode;
            this.lastayDetailRow.lastPbCode = lastPbCode;
        },
        fillScreen(pbCode, pbType, userCode, confirmBill, pbStatus, cancelStatus, row) { // 全屏对账
            this.fillScreendilog = true;
            this.fillSelecRow = row;
            this.pbcodeTit = `应付账单号：${pbCode}`;
            this.listFinPayDetail(pbCode, pbType, userCode, confirmBill, pbStatus, cancelStatus);
        },
        finishPbillBatch() { // 平台应付管理--结账
            if (this.selectedArray.length) {
                let flag = this.selectedArray.some(item => {
                    return item.pbStatus === 1 && item.reviewStatus === 2;
                });
                if (flag) {
                    this.$confirm(`当前选中${this.selectedArray.length}个账单是否真的确认结账？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj = [];
                        this.selectedArray.forEach(item => {
                            if (item.pbStatus === 1 && item.reviewStatus === 2) {
                                obj.push(item.pbCode);
                            }
                        });
                        if (obj && obj.length === 1) {
                            let onlyoneData = '';
                            this.selectedArray.forEach(item => {
                                if (item.pbCode === obj[0]) {
                                    onlyoneData = item;
                                }
                            });
                            if (this.payDetails && this.payDetails[0].pbCode !== onlyoneData.pbCode) {
                                this.listFinPayDetail(onlyoneData.pbCode, onlyoneData.pbType, onlyoneData.userCode, onlyoneData.confirmBill, onlyoneData.pbStatus, onlyoneData.cancelStatus);
                            }
                        }
                        if (flag) {
                            if (obj.length === 1) {
                                let _this = this;
                                setTimeout(() => {
                                    if (_this.detailsData.selectedArray && _this.detailsData.selectedArray.length) { // 单条结账
                                        let onlyoneData = ''; // 单条结账信息
                                        _this.selectedArray.forEach(item => {
                                            if (item.pbCode === obj[0]) {
                                                onlyoneData = item;
                                            }
                                        });
                                        let payBillCode = [onlyoneData.pbCode]; // 应付账单编码
                                        let payBillDetailList = []; // 明细中已勾选的数据存储
                                        _this.detailsData.selectedArray.forEach(item => {
                                            payBillDetailList.push({id: item.id, realPayAmount: item.realPayAmount});
                                        });
                                        let pbFlagNUm = 0;
                                        if (_this.payDetails && _this.payDetails.length) {
                                            _this.payDetails.forEach(item => {
                                                if (item.pbFlag === 1) {
                                                    pbFlagNUm++;
                                                }
                                            });
                                        }
                                        console.log('pbFlagNUm-->', pbFlagNUm);
                                        let selectpbFlagNUm = 0;
                                        if (_this.detailsData.selectedArray && _this.detailsData.selectedArray.length) {
                                            _this.detailsData.selectedArray.forEach(item => {
                                                if (item.pbFlag === 1) {
                                                    selectpbFlagNUm++;
                                                }
                                            });
                                        }
                                        console.log('selectpbFlagNUm-->', selectpbFlagNUm);
//                                    let pbStatus = _this.detailsData.allLen === _this.detailsData.selectedArray.length ? 3 : 2; // 单个结账 全选3 部分选2
                                        let pbStatus = selectpbFlagNUm === pbFlagNUm ? 3 : 2; // 单个结账 全选3 部分选2
                                        let payAmount = parseFloat((onlyoneData.payAmount * 1000 + ((onlyoneData.lastUnPayAmount ? onlyoneData.lastUnPayAmount : 0) * 1000)) / 1000).toFixed(2);
                                        _this.finishPbillPost(false, payBillCode, payBillDetailList, pbStatus, onlyoneData.userCode, payAmount);
//                                        console.log(payBillCode, payBillDetailList, pbStatus, onlyoneData.userCode, onlyoneData.payAmount);
                                    }
                                }, 300);
                            } else if (obj.length > 1) {  // 批量结账
                                this.finishPbillPost(true, obj);
                            }
                        } else {
                            this.$alert('请选择商家“已复核未结账”的应付款单进行操作', {
                                type: 'info'
                            });
                        }
                    }).catch(() => {
                    });
                } else {
                    this.$alert('请选择商家“已复核未结账”的应付款单进行操作', {
                        type: 'info'
                    });
                }
            } else {
                window.$wxeMessage.warning('请先选中应付账单');
            }
        },
        finishPbillPost(status, payBillCode, payBillDetailList, pbStatus, userCode, payAmount) {
            let params = {};
            let _this = this;
            if (status === false) { // 单条结账 、批量结账
                // 单条结账 (status 等于 false 为单条结账；等于true为批量结账)
                params.userCode = userCode;
                params.pbStatus = pbStatus;
                params.payAmount = payAmount;
                params.payBillDetailList = payBillDetailList;
            }
            params.payBillCodeList = payBillCode;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finPbillPlat/finishPbill`,
                data: params
            }).then((res) => {
                if (res.data.code === '3000') {
                    setTimeout(() => {
                        _this.listSysFinBkg();
                    }, 300);
                    window.$wxeMessage.success(res.data.msg);
                } else {
                    window.$wxeMessage.error(res.data.msg);
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        cancelPbillBatch() { // 平台应付管理--作废
            if (this.selectedArray.length) {
                let flag = this.selectedArray.some(item => {
                    return item.confirmBill === 1 && item.cancelStatus === 1;
                });
                if (flag) {
                    this.$confirm(`当前选中${this.selectedArray.length}条账单，真的确认作废吗？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj = [];
                        this.selectedArray.forEach(item => {
                            if (item.confirmBill === 1 && item.cancelStatus === 1) {
                                obj.push(item.pbCode);
                            }
                        });
                        this.cancelPbillPost(obj);
                    }).catch(() => {
                    });
                } else {
                    this.$alert('请选择“未确认、正常”的应付款单进行操作', {
                        type: 'info'
                    });
                }
            } else {
                window.$wxeMessage.warning('请先选中应付账单');
            }
        },
        cancelPbillPost(obj) {
            let params = {};
            let _this = this;
            params.payBillCodeList = obj;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finPbillPlat/cancelPbill`,
                data: params
            }).then((res) => {
                if (res.data.code === '3000') {
                    setTimeout(() => {
                        _this.listSysFinBkg();
                    }, 300);
                    window.$wxeMessage.success(res.data.msg);
                } else {
                    window.$wxeMessage.error(res.data.msg);
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        confirmPbillBatch() { // 账单确认
            if (this.selectedArray.length) {
                let flag = this.selectedArray.some(item => {
                    return item.confirmBill === 1 && item.cancelStatus === 1;
                });
                if (flag) {
                    this.$confirm(`当前选中${this.selectedArray.length}个账单，是否真的确认？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj = [];
                        this.selectedArray.forEach(item => {
                            if (item.confirmBill === 1 && item.cancelStatus === 1) {
                                obj.push(item.pbCode);
                            }
                        });
                        this.confirmPbillPost(obj);
                    }).catch(() => {
                    });
                } else {
                    this.$alert('请选择"未确认正常"的应付款单进行操作', {
                        type: 'info'
                    });
                }
            } else {
                window.$wxeMessage.warning('请先选中应付账单');
            }
        },
        listFinPayDetail(pbCode, pbType, userCode, confirmBillStatus, pbStatus, cancelStatus) { // 平台应付管理--应付款账单明细
            let params = {};
            this.cancelStatus_s = cancelStatus;
            this.confirmBillStatus = confirmBillStatus;
            params.pbCode = pbCode;
            params.pbType = pbType;
            params.userCode = userCode;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finPbillPlat/listFinPayDetail`,
                data: params
            }).then((res) => {
                this.paypbStatus = pbStatus; // 判断结账状态
                this.payDetails = res.data.payDetails;
            }).catch((error) => {
                console.log(error);
            });
        },
        confirmPbillPost(obj) {
            let params = {};
            let _this = this;
            params.confirmBill = 2;
            params.payBillCodeList = obj;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finPbillPlat/confirmPbill`,
                data: params
            }).then((res) => {
                setTimeout(() => {
                    _this.listSysFinBkg();
                }, 300);
                window.$wxeMessage.success(res.msg);
            }).catch((error) => {
                console.log(error);
            });
        },
        getVenInfoByVenName() { // 供应商名称
            let params = {};
            params.venName = '';
            params.venType = 2;
            params.pageFlag = 2;
            params.pageNum = '';
            params.pageSize = '';
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/orderInfo/getVenInfoByVenName`,
                data: params
            }).then((res) => {
                this.venNameList = res.data.venInfoList;
            }).catch((error) => {
                console.log(error);
            });
        },
        listSysFinBkg() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
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
            this.exportData = '';
            for (let i in params) {
                if (i !== 'pageNum' && i !== 'pageSize') {
                    if (!params[i] || params[i] === '' || params[i] === null) {
                        this.exportData += `${i}=&`;
                    } else {
                        this.exportData += `${i}=${params[i]}&`;
                    }
                }
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finPbillPlat/listSysFinBkg`,
                data: params
            }).then((res) => {
                this.dataListloading = false;
                this.pagelist.total = res.data.pageInfo.total;
                this.xeFinPbillList = res.data.xeFinPbillList;
                if (this.xeFinPbillList && this.xeFinPbillList.length) {
                    this.listFinPayDetail(this.xeFinPbillList[0].pbCode, this.xeFinPbillList[0].pbType, this.xeFinPbillList[0].userCode, this.xeFinPbillList[0].confirmBill, this.xeFinPbillList[0].pbStatus, this.xeFinPbillList[0].cancelStatus);
                } else {
                    this.payDetails = [];
                }
            }).catch((error) => {
                console.log(error);
                this.dataListloading = false;
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        seletChangeDetails(val) { // 明细中勾选数据
            this.detailsData = val;
        },
        handleSelectionChange(val) {
            let obj = [];
            this.selectedArray = val;
            this.selectedArray.forEach(item => {
                if (item.pbStatus === 1) {
                    obj.push(item.pbCode);
                }
            });
            if (obj.length > 1) {
                this.seleSure = false;
            } else if (obj.length === 1) {
                this.seleSure = true;
            }
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.listSysFinBkg();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.listSysFinBkg();
            }
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.listSysFinBkg();
            }, 10);
        },
        exportDataMethod() { // 导出
            window.open(`${this.productUrl}/manager/finPbillPlat/exportSysFinBkg?${this.exportData}`);
        },
        exportPayBillDetail() { // 导出明细
            window.open(`${this.productUrl}/manager/finPbillPlat/exportPayBillDetail?${this.exportData}`);
        }
    },
    computed: {
        confirmBillList() {
            return confirmBill;
        },
        pbStatusList() {
            return pbStatus;
        },
        monthFloorList() {
            return monthFloor;
        },
        reviewStatusList() {
            return reviewStatus;
        },
        cancelStatusList() {
            return cancelStatus;
        },
        settleWayList() {
            return settleWay;
        }
    },
    components: {
        orderAlert,
        refundJournal
    }
};
</script>
