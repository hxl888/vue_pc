<template lang="html">
    <div class="m-router-con">
        <!-- 新建售后单 -->
        <!--基础信息-->
        <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline" label-width="72px">
                <div class="row-search clearfix">
                    <!-- <el-form-item label="售后单号:">
                        <el-input :disabled="true" placeholder="12245675875"></el-input>
                    </el-form-item> -->
                    <el-form-item label="订单编号">
                        <el-input v-model="formData.orderId" readonly icon="search" @click.native="queryOrder()"></el-input>
                    </el-form-item>
                    <el-form-item prop="afterSaleType" label="申请服务">
                        <el-select size="small"  class="xe-input-l40" v-model="formData.afterSaleType" placeholder="申请服务">
                            <el-option
                                    v-for="item in applyList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="afterSaleReason" label="售后原因">
                        <el-select size="small"  class="xe-input-l40" v-model="formData.afterSaleReason" placeholder="售后原因">
                            <el-option
                                    v-for="item in afterSaleReasonList"
                                    :label="item.name"
                                    :key="item.value"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="售后说明" prop="afterSaleRemark">
                        <el-input v-model="formData.afterSaleRemark" placeholder="售后说明"></el-input>
                    </el-form-item>
                </div>
                <div class="row-search clearfix">
                    <el-form-item prop="storeId" label="退货仓库">
                        <el-select size="small" v-model="formData.storeId" placeholder="退货仓库" calerable filterable class="xe-input-l40" id="getStore">
                            <el-option
                                    v-for = "item in actionList"
                                    :key="item.storeId"
                                    :label = "item.storeName"
                                    :value = "item.storeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态:">
                        <el-select v-model="formData.orderStatus" placeholder="请选择"  :disabled="true">
                            <el-option
                                v-for="item in orderStatusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付类型:">
                        <el-select v-model="formData.payType" placeholder="请选择"  :disabled="true">
                            <el-option
                                v-for="item in payTypeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="支付状态:">
                        <el-select v-model="formData.payStatus" placeholder="请选择"  :disabled="true">
                            <el-option
                                v-for="item in payStatusList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row-search clearfix">
                    <el-form-item prop="loginAccount" label="客户账号">
                        <el-input v-model="formData.loginAccount" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="caConsignee" label="收货人">
                        <el-input v-model="formData.caConsignee" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item prop="areaIds" label="收货地址">
                        <areaselectTag size="small" v-model='formData.areaIds' :width='170' :changeOnSelect="true" disabled></areaselectTag>
                    </el-form-item>
                    <el-form-item prop="caSreet">
                        <el-input v-model="formData.caSreet" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <!--新建售后单列表-->
        <!--{{tableData}}-->
        <div class="goodsTable serviceTab">
            <el-table
                :data="receiptDetailList"
                style="width: 100%"
                border>
                <el-table-column
                        label=""
                        class-name="td-index"
                        width="30">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="商品图" width="100">
                    <!-- 商品图片{{props.row.img}} -->
                    <template scope="props">
                        <!-- 商品图片{{props.row.img}} -->
                        <div class="z-imgbox">
                            <!--{{props.row}}-->
                            <img :src="picServer + picDir + props.row.proPicture" alt="商品图片" width="60" height="60">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="商品货号" prop="proNum" min-width="85"></el-table-column>
                <el-table-column label="商品名称" prop="proName" min-width="85"></el-table-column>
                <el-table-column label="商品分类" prop="proOrgCodeName" min-width="85"></el-table-column>
                <el-table-column label="计量方式" prop="pricingType" min-width="85">
                    <template scope="props">
                        {{props.row.pricingType | pricingTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column label="单位" prop="proUnit" min-width="96"></el-table-column>
                <el-table-column label="规格" prop="specValue" min-width="96"></el-table-column>
                <el-table-column label="商品单价" prop="proPrice" min-width="110">
                    <template scope="props">
                        {{props.row.proPrice | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column label="购买数量" prop="purchaseNum" min-width="130"></el-table-column>
                <el-table-column label="实发量" prop="realSendNum" min-width="130"></el-table-column>
                <el-table-column label="可退量" prop="" min-width="110">
                    <template scope="props">
                        {{props.row.realSendNum - props.row.realRejectNum}}
                    </template>
                </el-table-column>
                <el-table-column label="退货量" min-width="110">
                    <template scope="props">
                        <div v-if="formData.afterSaleType === 2">
                            {{props.row.rejectNum}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="订购金额" prop="" min-width=" 85">
                    <template scope="props">
                        {{props.row.proPrice * props.row.purchaseNum | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column label="实发金额" prop="" min-width="85">
                    <template scope="props">
                        {{props.row.proCostPrice * props.row.realSendNum | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column label="可退金额" prop="" min-width="85">
                    <template scope="props">
                        {{props.row.proCostPrice * props.row.realSendNum - props.row.realRefundAmount | priceToText}}
                    </template>
                </el-table-column>
                <el-table-column label="退款金额" prop="rejectAmount" min-width="85">
                    <template scope="props">
                        <div v-if="formData.afterSaleType < 3 && props.row.rejectAmount">
                            {{props.row.rejectAmount | priceToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  min-width="110" fixed="right">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" v-if="formData.afterSaleType === 2" class="s-blue" @click="editPro(props.row, 2)">设置退货退款</a>
                            <a href="javascript:;" v-if="formData.afterSaleType === 1" class="s-blue" @click="editPro(props.row, 1)">设置退款</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <p class="opera-man">操作人：daru</p> -->
        </div>
        <div>
            <el-button type="primary" class="xe-button-normal" @click="insertAfterSale">
                保存
            </el-button><el-button class="xe-button-normal" @click="toList">
                取 消
            </el-button>
        </div>
        <!--新增订单-->
        <div class="reset-dialog set-editrequise">
            <el-dialog
                title="订单选择框（仅可查询状态为已发货和已完成的订单）"
                :visible.sync="dialogVisible"
                @close="cancelProList()"
                size="large">
                    <div class="tab-editrequise">
                        <!-- {{formDataPro}} -->
                        <el-form :inline="true" :model="formDataPro" ref="formDataPro">
                            <el-form-item prop="formIdType">
                                <el-select size="small" class="xe-input-w110" v-model="formDataPro.formIdType" placeholder="订单编号">
                                    <el-option
                                            v-for="item in formIdTypeList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="formIdValue">
                                <el-input size="small" v-model="formDataPro.formIdValue" placeholder="请输入查询内容"></el-input>
                            </el-form-item>
                            <el-form-item prop="formTimeType">
                                <el-select size="small" class="xe-input-w110" v-model="formDataPro.formTimeType" placeholder="下单时间">
                                    <el-option
                                            v-for="item in formTimeTypeList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" class="z-mr0">
                                <el-date-picker
                                    ref="startDate"
                                    v-model="value1"
                                    type="date"
                                    size="small"
                                    @change="startDateFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始日期"
                                >
                                </el-date-picker>
                                <span class="Cornet">-</span>
                                <el-date-picker
                                    ref="endDate"
                                    v-model="value2"
                                    type="date"
                                    size="small"
                                    @change="endDateFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束日期"
                                >
                                </el-date-picker>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal" @click="resetForm('formDataPro')">重置</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="clearfix">
                            <!-- {{afterSaleInfo}} -->
                            <div>
                                <el-radio-group v-model="afterSaleInfo">
                                    <el-table
                                        :data="afterSaleOrderList"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange"
                                        border>
                                        <el-table-column
                                        label=""
                                        class-name="td-index"
                                        width="30">
                                            <template scope="props">
                                                <span>{{props.$index + 1}}</span>
                                            </template>
                                        </el-table-column>
                                        <el-table-column
                                            width="34"
                                            class-name="selectionTd fontSizeHide">
                                            <template scope="props">
                                                <el-radio class="radio" :label='props.row'></el-radio>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="订单编号" prop="orderId" min-width="150"></el-table-column>
                                        <el-table-column label="下单时间" prop="createDate" min-width="160"></el-table-column>
                                        <el-table-column label="订单状态" prop="orderStatus" min-width="85">
                                            <template scope="props">
                                                {{props.row.orderStatus | orderStatusToText}}
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="仓库名称" prop="storeName" min-width="120"></el-table-column>
                                        <el-table-column label="客户账号" prop="loginAccount" min-width="140"></el-table-column>
                                        <el-table-column label="收货人" prop="caConsignee" min-width=""></el-table-column>
                                        <el-table-column label="收货人手机" prop="caPhone" min-width="120"></el-table-column>
                                        <el-table-column label="收货地区" prop="caSreet" min-width="100"></el-table-column>
                                        <el-table-column label="订单金额" prop="payAmount" min-width="85"></el-table-column>
                                    </el-table>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="page-showbox">
                            <div class="xe-pagination-panel">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="xePageInfo.pageNum"
                                    :page-sizes="[10, 20]"
                                    :page-size="xePageInfo.pageSize"
                                    layout="total, prev, pager, next, sizes, jumper"
                                    :total="xePageInfo.total">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="saveChoosed()">确定</el-button>
                    </span>
            </el-dialog>
        </div>
        <!-- 设置退款 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="设置退款" :visible.sync="dialogVisible02" size="" @close="closeVisible02(2)">
                <div class="clearfix changeCate" style="padding: 20px;">
                    <div class="clearfix">
                        <!-- {{receiptDetailListTpm}} -->
                        <div class="">
                            <el-table
                                :data="receiptDetailListTpm"
                                border
                                style="width: 100%"
                                ref = "proListCoupon"
                                @selection-change="handleSelectionChange">
                                <el-table-column prop="proNum" label="商品货号" min-width="110"></el-table-column>
                                <el-table-column prop="proName" label="商品名称" min-width="110"></el-table-column>
                                <el-table-column label="实发金额" prop="" min-width="110">
                                    <template scope="props">
                                        {{props.row.proCostPrice * props.row.realSendNum | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="可退金额" prop="" min-width="110">
                                    <template scope="props">
                                        {{(props.row.proCostPrice * 100 * props.row.realSendNum - props.row.realRefundAmount * 100) / 100 | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="退货金额" min-width="110">
                                    <template scope="props">
                                        <el-input size="small" style="width: 100%;" v-model.number="props.row.rejectAmount"></el-input>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="savechange()">保 存</el-button>
                    <el-button class="xe-button-normal" @click="closeVisible02(2)">取 消</el-button>
                </div>
            </el-dialog>
        </div>
        <!-- 设置退款tuihuo -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="设置退货退款" :visible.sync="dialogVisible03" size="" @close="closeVisible02(3)">
                <div class="clearfix changeCate" style="padding: 20px;">
                    <div class="clearfix">
                        <!-- {{receiptDetailListTpm}} -->
                        <div class="">
                            <el-table
                                :data="receiptDetailListTpm"
                                border
                                style="width: 100%"
                                ref = "proListCoupon"
                                @selection-change="handleSelectionChange">
                                <el-table-column prop="proNum" label="商品货号" min-width="110"></el-table-column>
                                <el-table-column prop="proName" label="商品名称" min-width="110"></el-table-column>
                                <el-table-column prop="realSendNum" label="实发量" min-width="110"></el-table-column>
                                <el-table-column label="实发金额" prop="" min-width="110">
                                    <template scope="props">
                                        {{props.row.proCostPrice * props.row.realSendNum | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="可退量" prop="" min-width="110">
                                    <template scope="props">
                                        {{props.row.realSendNum - props.row.realRejectNum | priceToText}}
                                        <!-- {{props.row.purchaseNum - props.row.realRejectNum}} -->
                                    </template>
                                </el-table-column>
                                <el-table-column label="可退金额" prop="" min-width="110">
                                    <template scope="props">
                                        {{props.row.proCostPrice * props.row.realSendNum - props.row.realRefundAmount | priceToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="退货量" min-width="110">
                                    <template scope="props">
                                        <el-input size="small" @blur="props.row.rejectNum = parseFloat($event.target.value) > 0 ? props.row.rejectNum = parseFloat($event.target.value).toFixed(2) : 0" style="width: 100%;" v-model.number="props.row.rejectNum"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="" label="退货退款金额" min-width="110">
                                    <template scope="props">
                                        <div v-if="props.row.rejectNum">
                                            {{props.row.proCostPrice * props.row.rejectNum | priceToText}}
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" type="primary" @click="savechange">保 存</el-button>
                    <el-button class="xe-button-normal" @click="closeVisible02(3)">取 消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<style lang="scss">
</style>
<script>
    import {apply, afterSaleReason, formIdType05, searchTimeTypeOne, orderStatus, payTypeList, payStatus} from '@/dataControl.js';
    import {deepCopy, millisecondFormat, formatFloat} from 'utils';
    import areaselectTag from '@/components/areaSelect/areaSelect';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                actionList: [],             // 选择仓库
                formTimeType: 1,       // 下单时间
                dialogVisible: false,       // 订单选择框
                dialogVisible02: false,
                dialogVisible03: false,
                picServer: '',
                picDir: '',
                formIdType: '',             // 订单编号
                tpmChoose: [], // 提交选中商品
                formData: {
                    orderId: '',
                    afterSaleType: 1,
                    afterSaleReason: 1,
                    afterSaleRemark: '',
                    storeId: '',
                    orderStatus: '',
                    payType: '',
                    payStatus: '',
                    loginAccount: '',
                    caConsignee: '',
                    caSreet: ''
                },
                formDataPro: {
                    formTimeType: 1,
                    formIdType: 1,          // 订单编号
                    formIdValue: '',
                    startDate: '',
                    endDate: ''
                },
                afterSaleInfo: {}, // 订单选中项
                xePageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
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
                afterSaleOrderList: [], // 查询商品的基本信息list
                receiptDetailList: [],   // 商品的基本信息
                receiptDetailListTpm: []   // 商品的基本信息tmp
            };
        },
        created() {
            this.pullDown();
        },
        methods: {
            creatInf(pageNum, formData) {
                let data = {};
                data = this.formDataPro;
                if (!this.startDates) {
                    if (this.value1) {
                        data.startDate = millisecondFormat(this.value1.getTime());
                    } else {
                        data.startDate = '';
                    }
                }
                if (!this.endDates) {
                    if (this.value2) {
                        data.endDate = millisecondFormat(this.value2.getTime());
                    } else {
                        data.endDate = '';
                    }
                }
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/queryOrderListForAfterSale',
                    data: data
                }).then((res) => {
                    console.log(res);
                    this.afterSaleOrderList = res.data.afterSaleOrderList;
                    this.xePageInfo = res.data.xePageInfo;
                    this.picDir = res.data.picDir;
                }).catch((error) => {
                    console.log(error);
                });
            },
            savechange() {
                if (this.formData.afterSaleType === 1) {
                    let checkNum = 0;
                    for (var i = 0; i < this.receiptDetailListTpm.length; i++) {
                        // this.receiptDetailListTpm[i]
                        if (!(this.receiptDetailListTpm[i].rejectAmount >= 0)) {
                            this.$xeMessage.warning('退货金额输入有误，请核对后提交');
                            return false;
                        } else {
                            if (this.receiptDetailListTpm[i].rejectAmount > formatFloat((this.receiptDetailListTpm[i].proCostPrice * this.receiptDetailListTpm[i].realSendNum - this.receiptDetailListTpm[i].realRefundAmount), 2)) {
                                this.$xeMessage.warning('退货金额不能大于可退金额');
                                return false;
                            }
                            if (!this.receiptDetailListTpm[i].rejectAmount) {
                                this.receiptDetailListTpm[i].rejectAmount = 0;
                            }
                            console.log('test', this.receiptDetailListTpm[i].rejectAmount);
                            checkNum += this.receiptDetailListTpm[i].rejectAmount;
                        }
                    };
                    if (!(checkNum > 0)) {
                        this.$xeMessage.warning('请修改一个退货金额');
                        return false;
                    }
                } else {
                    let checkNum = 0;
                    for (var k = 0; k < this.receiptDetailListTpm.length; k++) {
                        var item = this.receiptDetailListTpm[k];
                        if (!(item.rejectNum >= 0)) {
                            this.$xeMessage.warning('退货量输入有误，请核对后提交');
                            return false;
                        } else {
                            // {{props.row.realSendNum - props.row.realRejectNum}}
                            if (item.rejectNum > formatFloat((item.realSendNum - item.realRejectNum), 2)) {
                                this.$xeMessage.warning('退货量不能大于可退量,请重新输入!');
                                return false;
                            }
                            item.rejectAmount = parseFloat(((item.proCostPrice * 100 * item.rejectNum) / 100).toFixed(2));
                            if (item.rejectAmount > formatFloat((item.proCostPrice * item.realSendNum - item.realRefundAmount), 2)) {
                                this.$xeMessage.warning('退货退款金额不能大于可退金额,请重新输入!');
                                return false;
                            }
                            if (!item.rejectNum) {
                                item.rejectNum = 0;
                            }
                            checkNum += parseFloat(item.rejectNum);
                        }
                    };
                    if (!(checkNum > 0)) {
                        this.$xeMessage.warning('请修改一个退货量');
                        return false;
                    }
                }
                this.receiptDetailList = deepCopy(this.receiptDetailListTpm);
                this.closeVisible02();
            },
            closeVisible02(num) {
                this.dialogVisible02 = false;
                this.dialogVisible03 = false;
                this.receiptDetailListTpm.forEach((item) => {
                    item.rejectAmount = '';
                    item.rejectNum = '';
                });
            },
            insertAfterSale() {
                if (this.formData.orderId === '') {
                    this.$xeMessage.warning('请填写订单编号');
                    return false;
                }
                let checkNum = 0;
                if (this.formData.afterSaleType === 1) {
                    this.receiptDetailList.forEach((item) => {
                        checkNum += item.rejectAmount;
                    });
                } else {
                    if (this.formData.storeId === '') {
                        this.$xeMessage.warning('请选择退货仓库');
                        return false;
                    };
                    this.receiptDetailList.forEach((item) => {
                        checkNum += parseFloat(item.rejectNum);
                    });
                }
                if (checkNum === 0) {
                    this.$xeMessage.warning('退款信息未做修改，请确认后提交');
                    return false;
                };
                this.comfirmInsert();
            },
            comfirmInsert() {
                let param = {};
                param = this.formData;
                param.storeName = $('#getStore .el-input__inner').val();
                if (this.formData.afterSaleType === 1) {
                    param.list = [];
                    this.receiptDetailList.forEach((item) => {
                        param.list.push({
                            proSku: item.proSku,
                            rejectAmount: item.rejectAmount
                        });
                    });
                } else if (this.formData.afterSaleType === 2) {
                    param.list = [];
                    this.receiptDetailList.forEach((item) => {
                        param.list.push({
                            proSku: item.proSku,
                            rejectNum: item.rejectNum
                        });
                    });
                }
                console.log('param', param);
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/insertAfterSale',
                    data: param
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    this.toList();
                }).catch((error) => {
                    console.log(error);
                });
            },
            toList() {
                this.$router.push({name: 'after-salesIndex'});
            },
            queryOrder() { // 订单编号查询
                this.creatInf(1, this.formData);
                this.dialogVisible = true;
            },
            onSubmit() {     // 点击弹窗查询
                this.creatInf(1, this.formData);
                console.log('submit!');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.creatInf(1, this.formData);
            },
            startDateFn(val) {
                this.startDates = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            endDateFn(val) {
                this.endDates = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            cancelProList() {
                this.dialogVisible = false;
            },
            editPro(row, type) {
                if (type === 1) { // tuihuo
                    this.dialogVisible02 = true;
                } else { // tuihuotuikuang
                    this.dialogVisible03 = true;
                }
                this.receiptDetailListTpm = deepCopy(this.receiptDetailList);
            },
            pullDown() {     // 仓库下拉调接口
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        storeType: 5,
                        storeStatus: 2,
                        delFlag: 1
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSelectionChange(val) {
                this.tpmChoose = deepCopy(val);
            },
            // 选中要勾选的商品
            saveChoosed(type) {
                let saveChoose = deepCopy(this.afterSaleInfo);
                // console.log(saveChoose.length);
                if (!saveChoose.orderId) {
                    this.$xeMessage.warning('请先勾选需要关联的订单');
                    return;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/afterSales/queryOrderDetailList',
                    data: {
                        orderId: saveChoose.orderId
                    }
                }).then((res) => {
                    this.receiptDetailList = res.data.XeVenAfterSaleInfoList;
                    this.picServer = res.data.picServer;
                    this.picDir = res.data.picDir;
                    this.formData.areaIds = [parseInt(saveChoose.caProvinceId), parseInt(saveChoose.caCityId), parseInt(saveChoose.caAreaId)];
                    console.log('test', saveChoose.orderStatus + '' + saveChoose.payType);
                    this.formData.orderId = saveChoose.orderId;
                    this.formData.orderStatus = saveChoose.orderStatus;
                    this.formData.payType = saveChoose.payType;
                    this.formData.payStatus = saveChoose.payStatus;
                    this.formData.loginAccount = saveChoose.loginAccount;
                    this.formData.caConsignee = saveChoose.caConsignee;
                    this.formData.caSreet = saveChoose.caSreet;
                    console.log('testformData', this.formData);
                    this.cancelProList();
                }).catch((error) => {
                    console.log(error);
                });
            },
            // startDateFn(val) {
            //     this.formData.startDate = val;
            // },
            // endDateFn(val) {
            //     this.formData.endDate = val;
            // },
            handleSizeChange(val) {
                this.xePageInfo.pageSize = val;
                this.creatInf(this.xePageInfo.pageNum, this.formData);
            },
            handleCurrentChange(val) {
                this.xePageInfo.pageNum = val;
                this.creatInf(this.xePageInfo.pageNum, this.formData);
            }
        },
        computed: {
            formIdTypeList() {
                return formIdType05;
            },
            applyList() {
                return apply;
            },
            afterSaleReasonList() {
                return afterSaleReason;
            },
            orderStatusList() {
                return orderStatus;
            },
            payTypeList() {
                return payTypeList;
            },
            payStatusList() {
                return payStatus;
            },
            startDates: {
                get() {
                    return this.formData.startDate;
                },
                set(val) {
                    if (!val) {
                        this.formData.startDate = '';
                    } else {
                        this.formData.startDate = val;
                    }
                }
            },
            endDates: {
                get() {
                    return this.formData.endDate;
                },
                set(val) {
                    if (!val) {
                        this.formData.endDate = '';
                    } else {
                        this.formData.endDate = val;
                    }
                }
            },
            formTimeTypeList() {
                return searchTimeTypeOne;
            }
        },
        components: {
            areaselectTag
        }
};
</script>
