<template lang="html">
    <div class="refundJournal">
       <el-table
        :data="payDetails"
        border
         :max-height="400"
        ref="payDetails"
        @selection-change="handleSelectionChange"
        style="width: 100%">
            <el-table-column  min-width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" width="50" v-if="seleSure && paypbStatus == 1" fixed="left"></el-table-column>
            <el-table-column
                prop="orderId"
                label="订单编号"
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="sendTime"
                label="发货时间"
                min-width="150">
                <template scope="scope">
                    <div>
                        {{scope.row.sendTime, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proName"
                label="商品名称"
                min-width="120">
            </el-table-column>
            <el-table-column
                prop="specValue"
                label="规格"
                min-width="100">
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
                    <div>{{scope.row.pricingType | pricingTypefiter}}</div>
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
            <el-table-column
                prop="proTotalPrice"
                label="订购金额"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.proTotalPrice">{{parseFloat(scope.row.proTotalPrice).toFixed(2)}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="realSendNum"
                label="发货量"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="proPayAmount"
                label="发货金额"
                min-width="100">
                <template scope="scope">
                    <!--<div v-if="scope.row.proPayAmount">{{parseFloat(scope.row.proPayAmount).toFixed(2)}}</div>-->
                    <div v-if="scope.row.proPayAmount">{{parseFloat((scope.row.proPayAmount*1000 - (scope.row.refundAmount ? scope.row.refundAmount*1000 : 0))/1000).toFixed(2)}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="profitAmount"
                label="毛利"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.profitAmount">{{parseFloat(scope.row.profitAmount).toFixed(2)}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="purchPrice"
                label="采购单价"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.purchPrice">{{parseFloat(scope.row.purchPrice).toFixed(2)}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="realPayAmount"
                label="实际付款金额"
                min-width="150">
                <template scope="scope">
                    <div v-if="scope.row.realPayAmount">{{parseFloat(scope.row.realPayAmount).toFixed(2)}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="cutPayAmount"
                label="其他扣款"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.cutPayAmount">{{parseFloat(scope.row.cutPayAmount).toFixed(2)}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="cutReason"
                label="扣款原因"
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="purchAdress"
                label="采购商地址"
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="purchPayStatus"
                label="采购货款"
                min-width="100">
                <template scope="scope">
                    <div>{{scope.row.purchPayStatus | purchPayStatusfiter}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                min-width="150">
            </el-table-column>
            <el-table-column label="操作" width="70" fixed="right" v-if="payDetails && payDetails.length && confirmBillStatus == 1 && cancelStatus_s == 1">
                <template scope="props">
                    <div class="btn-in-table">
                        <a href="javascript:;" class="s-blue" @click="editor(props.row)">编辑</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--修改-->
        <div>
            <el-dialog title="修改(编辑其他扣款金额保存后实际付款金额会发生变更，也可直接编辑实际付款金额)" :visible.sync="editordilog" class="reset-dialog">
                <div style="padding: 20px 20px 5px">
                    <el-table
                        v-if="editorpayDetail && editorpayDetail.length > 0"
                        :data="editorpayDetail"
                        border
                        class="tableLineheightNor"
                        style="width: 100%">
                        <el-table-column
                            prop="orderId"
                            label="订单编号"
                            min-width="85"
                        >
                        </el-table-column>
                        <el-table-column
                            :render-header='renderHeader'
                            prop="realPayAmount"
                            label="实际付款金额"
                            min-width="110"
                        >
                            <template scope="scope">
                                <div>
                                    <el-input size="small"  @input.native="scope.row.realPayAmount = parseFloat($event.target.value) > 0 ? scope.row.realPayAmount : ''" @blur="scope.row.realPayAmount = scope.row.realPayAmount ? parseFloat(scope.row.realPayAmount).toFixed(2) : ''" v-model="scope.row.realPayAmount" style="width: 60px"  type="text" class="xe-input-smal90" placeholder=""></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="cutPayAmount"
                            label="其他扣款"
                            min-width="100"
                        >
                            <template scope="scope">
                                <div>
                                    <el-input size="small"  @input.native="scope.row.cutPayAmount = parseFloat($event.target.value) >= 0 ? scope.row.cutPayAmount : ''" @blur="scope.row.cutPayAmount = scope.row.cutPayAmount ? parseFloat(scope.row.cutPayAmount).toFixed(2) : ''" v-model="scope.row.cutPayAmount" style="width: 60px"  type="text" class="xe-input-smal90" placeholder=""></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="cutReason"
                            label="扣款原因"
                            min-width="100"
                        >
                            <template scope="scope">
                                <div>
                                    <el-input size="small" style="width: 60px"  type="text" v-model="scope.row.cutReason" :maxlength="30" class="xe-input-smal90" placeholder=""></el-input>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="refundAmount"
                            label="退款金额"
                            min-width="100"
                        >
                            <!--<template scope="scope">-->
                                <!--<div>-->
                                    <!--<el-input size="small"  @input.native="scope.row.refundAmount = parseFloat($event.target.value) >= 0 ? scope.row.refundAmount : ''" @blur="scope.row.refundAmount = scope.row.refundAmount ? parseFloat(scope.row.refundAmount).toFixed(2) : ''" v-model="scope.row.refundAmount" style="width: 60px"  type="text" class="xe-input-smal90" placeholder=""></el-input>-->
                                <!--</div>-->
                            <!--</template>-->
                            <template scope="scope">
                                <div v-if="scope.row.refundAmount">
                                    {{parseFloat(scope.row.refundAmount).toFixed(2)}}
                                </div>
                                <div v-else>0</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="remark"
                            label="备注"
                            min-width="100"
                        >
                            <template scope="scope">
                                <div>
                                    <el-input size="small" style="width: 60px"  type="text" v-model="scope.row.remark" :maxlength="30" class="xe-input-smal90" placeholder=""></el-input>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="el-dialog__footer" style="padding: 10px 20px">
                    <el-button class="xe-button-normal" :loading="confirmPbillLoading" type="primary" @click="submit">确定</el-button>
                    <el-button class="xe-button-normal" @click="editordilog = false">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['payDetails', 'confirmBillStatus', 'seleSure', 'paypbStatus', 'cancelStatus_s'],
        data() {
            return {
                editordilog: false,
                confirmPbillLoading: false,
                editorpayDetail: [],
                selectedArray: [],
                productUrl: '/xe-route/xe-mis'
//                productUrl: ''
            };
        },
        methods: {
            editor() {
                this.editordilog = true;
            },
            confirmPbillpost() { // 平台应付-账单明细账单确认
                let params = {};
                this.confirmPbillLoading = true;
                params.userCode = this.payDetails[0].userCode;
                params.payBillDetailList = this.editorpayDetail;
                params.payBillCodeList = [this.payDetails[0].pbCode];
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/finPbillSelf/confirmPbill`,
                    data: params
                }).then((res) => {
                    this.$emit('confirmPbillsucess');
                    this.editordilog = false;
                    this.confirmPbillLoading = false;
                    window.$wxeMessage.success(res.msg);
                }).catch((error) => {
                    console.log(error);
                    this.confirmPbillLoading = false;
                });
            },
            renderHeader(h, {column, $index}) {
                return (<div><span style={{color: 'red'}}>*</span> {column.label}</div>);
            },
            editorpayrepeat() {
                let detail = [];
                this.payDetails.forEach((item, index) => {
                    detail[index] = {
                        id: item.id,
                        remark: item.remark,
                        orderId: item.orderId,
                        cutReason: item.cutReason,
                        cutPayAmount: (item.cutPayAmount ? parseFloat(item.cutPayAmount).toFixed(2) : ''),
                        refundAmount: (item.refundAmount ? parseFloat(item.refundAmount).toFixed(2) : ''),
                        realPayAmount: (item.realPayAmount ? parseFloat(item.realPayAmount).toFixed(2) : '')
                    };
                });
                return detail;
            },
            handleSelectionChange(val) {
                let params = {};
                this.selectedArray = val;
                params.allLen = this.payDetails.length;
                params.selectedArray = this.selectedArray;
                this.$emit('seletChangeDetails', params);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.payDetails.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.payDetails.clearSelection();
                }
            },
            submit() {
                let flag = this.editorpayDetail.every(item => {
                    return item.realPayAmount > 0;
                });
                if (flag) {
                    this.confirmPbillpost();
                } else {
                    this.$alert('实际付款金额不能为空必须填写', {
                        type: 'info'
                    });
                }
            }
        },
        watch: {
            editordilog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.editorpayDetail = this.editorpayrepeat();
                    }, 300);
                } else {
                    _this.editorpayDetail = this.editorpayrepeat();
                }
            },
            payDetails(n) {
                this.$nextTick(() => {
                    let pbflagData = [];
                    n.forEach(item => {
                        if (item.pbFlag === 1) {
                            pbflagData.push(item);
                        }
                    });
                    this.toggleSelection(pbflagData);
                });
            }
        }
    };
</script>
