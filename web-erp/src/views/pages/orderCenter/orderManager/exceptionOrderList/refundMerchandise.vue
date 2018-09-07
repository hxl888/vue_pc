<template lang="html">
    <div>
        <el-table
             v-if="refundMer.orderInfoDetail && refundMer.orderInfoDetail.length > 0"
            :data="refundMer.orderInfoDetail"
            border
            style="width: 100%">
            <el-table-column
                prop=""
                label=""
                min-width="65"
            >
                <template scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                prop="orderMark"
                min-width="80"
                label="标记">
                <template scope="scope">
                    <div class="clearfix pub-tabDatacon">
                        <span v-if="scope.row.inventoryFlag == 2" class="lack_sp form_lab fl">缺</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="商品图"
                min-width="95"
            >
                <template scope="scope">
                    <div class="detail_picbox">
                        <img :src="picServer + scope.row.proPicture" alt="">
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
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="proOrgCodeName"
                label="商品分类"
                min-width="200"
            >
            </el-table-column>
            <el-table-column
                prop="pricingType"
                label="计量方式"
                min-width="120"
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
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="规格"
                min-width="120"
            >
                <template scope="scope">
                    <div>
                        {{scope.row.specName}}{{scope.row.specValue}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proCostPrice"
                label="商品单价"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.proCostPrice">
                        {{scope.row.proCostPrice.toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="purchaseNum"
                label="购买数量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="normWeight"
                label="标准重量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="realSendNum"
                label="实发量"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.realSendNum">{{scope.row.realSendNum}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="差异量"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.purchaseNum">
                        {{parseFloat(scope.row.purchaseNum) - parseFloat(scope.row.realSendNum ? scope.row.realSendNum : 0)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proPayAmount"
                label="订购金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.proTotalPrice">
                        {{scope.row.proTotalPrice.toFixed(2)}}
                    </div>
                    <!--&lt;!&ndash;<div v-if="scope.row.proCostPrice && scope.row.purchaseNum">&ndash;&gt;-->
                        <!--&lt;!&ndash;{{parseFloat((scope.row.proCostPrice*100)*(scope.row.purchaseNum*100)/10000).toFixed(2)}}&ndash;&gt;-->
                    <!--</div>-->
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--prop="freAmount"-->
                <!--label="运费金额"-->
                <!--min-width="120"-->
            <!--&gt;-->
                <!--<template scope="scope">-->
                    <!--<div v-if="scope.row.freAmount">-->
                        <!--{{parseFloat(scope.row.freAmount).toFixed(2)}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                prop="pmtAmount"
                label="优惠金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.pmtAmount">
                        {{scope.row.pmtAmount.toFixed(2)}}
                    </div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="specialDisamount"
                label="特批优惠金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.specialDisamount">
                        {{scope.row.specialDisamount}}
                    </div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="refundAmount"
                label="退款金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.refundAmount">
                        {{scope.row.refundAmount.toFixed(2)}}
                    </div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                width="85"
                v-if="refundMer.orderInfoDetail.length > 0 && refundMer.orderInfoDetail[0].orderType == 1 && refundMer.orderInfoDetail[0].payStatus == 2"
                fixed="right">
                <template scope="scope">
                    <div class="btn-in-table" v-if="scope.row.payStatus == 2">
                        <a href="javascript:;" class="s-blue" @click="editSpu(scope.row)">修改价格</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div>
            <!--修改-->
            <el-dialog title="修改特批优惠" :visible.sync="editordilog" class="reset-dialog error-tishi">
                <div style="padding: 20px 20px 5px">
                    <el-table
                        v-if="refundMer.orderInfoDetail && refundMer.orderInfoDetail.length > 0"
                        :data="refundMer.orderInfoDetail"
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
                            min-width="85"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="proCostPrice"
                            label="商品单价"
                            min-width="85"
                        >
                            <template scope="scope">
                                <div v-if="scope.row.proCostPrice">
                                    {{scope.row.proCostPrice.toFixed(2)}}
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
                            prop="proPayAmount"
                            label="订购金额"
                            min-width="85"
                        >
                            <template scope="scope">
                                <!--<div v-if="scope.row.proPayAmount">-->
                                    <!--{{scope.row.proPayAmount.toFixed(2)}}-->
                                <!--</div>-->
                                <div v-if="scope.row.proTotalPrice">
                                    {{scope.row.proTotalPrice.toFixed(2)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="pmtAmount"
                            label="优惠金额"
                            min-width="85"
                        >
                            <template scope="scope">
                                <div v-if="scope.row.pmtAmount">
                                    {{scope.row.pmtAmount.toFixed(2)}}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop=""
                            label="特批优惠金额"
                            min-width="110"
                        >
                            <template scope="scope">
                                <div>
                                    <el-input size="small"  @blur="checkNum(scope.row.proPayAmount, $event)" @input.native="parseFloatNum($event)" v-model="scope.row.specialDisamounts"  type="text" class="xe-input-h24" placeholder=""></el-input>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="submit">确定</el-button>
                    <el-button class="xe-button-normal" @click="cancelReject">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['refundMer', 'selecRowArray'],
        data() {
            return {
                editordilog: false,
                numCkgo: true, // 检查input框中输入的每条数据都不能大于对应的订购金额 （开关）
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        methods: {
            editSpu(val) { // 修改特批优惠金额
                this.editordilog = true;
            },
            updateSpecialDisamount() { // 修改特批优惠金额
                let params = {};
                let obj = [];
                this.refundMer.orderInfoDetail.forEach((item, index) => {
                    obj.push({itemId: item.itemId, orderId: this.selecRowArray.orderId, userId: this.selecRowArray.userId, lockStatus: this.selecRowArray.lockStatus, proSku: item.proSku, specDisamount: item.specialDisamounts ? item.specialDisamounts : null, oldSpecDisamount: this.orderAmountList[index] ? this.orderAmountList[index] : null, payType: this.selecRowArray.payType, payStatus: this.selecRowArray.payStatus, orderMark: this.selecRowArray.orderMark});
                });
                params.xeVenOrderForm = obj;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/order/updateSpecialDisamount`,
                    data: params
                }).then((res) => {
                    if (res.data.code === '3000') {
                        this.editordilog = false;
                        this.$xeMessage.success(`${res.data.msg}`);
                        this.refundMer.orderInfoDetail.forEach((item) => {
                            if (item.specialDisamounts) {
                                item.specialDisamount = item.specialDisamounts;
                            }
                        });
                        this.$emit('updateSpecialSuc');
                    } else {
                        this.$xeMessage.error(`${res.data.msg}`);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            submit() {
                if (this.numCkgo) {
                    let orderAmountList = [];
                    let flag = false;
                    if (this.refundMer.orderInfoDetail) {
                        JSON.parse(JSON.stringify(this.refundMer.orderInfoDetail)).forEach(item => {
                            orderAmountList.push(item.specialDisamounts);
                        });
                    }
                    for (let i = 0, len = orderAmountList.length; i < len; i++) {
                        if (orderAmountList[i] === this.orderAmountList[i]) {
                            flag = false;
                        } else {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        this.updateSpecialDisamount();
                    } else {
                        this.$xeMessage.error('特批优惠金额没有进行修改，请修改后提交!');
                    }
                } else {
                    this.$xeMessage.error('特批优惠金额不能大于对应的订购金额,请重新填写!');
                }
            },
            cancelReject() {
                this.editordilog = false;
            },
            parseFloatNum(event) {
                let value = event.target.value;
//                let value = parseFloat(event.target.value).toFixed(2);
                if (value >= 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            checkNum(orderAmount, event) {
                let value = event.target.value;
                if (orderAmount) {
                    if (Number(orderAmount) <= value) {
                        this.numCkgo = false;
                        this.$xeMessage.error('特批优惠金额不能大于对应的订购金额!');
                    } else {
                        this.numCkgo = true;
                        if (value > 0) {
                            event.target.value = parseFloat(event.target.value).toFixed(2);
                        } else if (parseFloat(value) === 0) {
                            event.target.value = 0;
                        } else {
                            event.target.value = '';
                        }
                    }
                }
            }
        },
        computed: {
            picServer() {
                return this.refundMer.picServer;
            },
            orderAmountList() {
                let orderList = [];
                if (this.refundMer.orderInfoDetail) {
                    JSON.parse(JSON.stringify(this.refundMer.orderInfoDetail)).forEach(item => {
                        orderList.push(item.specialDisamount);
                    });
                }
                return orderList;
            }
        },
        watch: {
            editordilog(n) {
                if (n === false) {
                    let _this = this;
                    setTimeout(() => {
                        _this.refundMer.orderInfoDetail.forEach((item) => {
                            if (item.specialDisamount) {
                                item.specialDisamount = parseFloat(item.specialDisamount).toFixed(2);
                                _this.$set(item, 'specialDisamounts', item.specialDisamount);
                            }
                        });
                    }, 300);
                }
            }
        }
    };
</script>
