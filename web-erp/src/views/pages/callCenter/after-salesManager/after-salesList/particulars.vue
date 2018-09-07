<template lang="html">
    <div class="m-router-con">
        <!-- 售后单详情页面 -->
        <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline" label-width="72px">
                <div class="row-search clearfix">
                    <el-form-item label="售后单号:">
                        <el-input :disabled="true" v-model="formData.afterSalesCode"></el-input>
                    </el-form-item>
                    <el-form-item label="订单编号:">
                        <el-input  :disabled="true" placeholder="调拨单号自动生成" icon="search" v-model="formData.orderId"></el-input>
                    </el-form-item>
                    <el-form-item label="申请服务:">
                        <el-select v-model="formData.afterSaleType" placeholder="请选择"  :disabled="true">
                            <el-option
                                v-for="item in afterSaleTypeList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="售后原因:">
                        <el-select v-model="formData.afterSaleReason" placeholder="请选择"  :disabled="true">
                            <el-option
                                v-for="item in afterSaleReasonList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row-search clearfix">
                    <el-form-item label="售后说明:">
                        <el-input  v-model="formData.afterSaleRemark" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item  label="退货仓库:">
                        <el-input  v-model="formData.storeName" placeholder="" :disabled="true"></el-input>
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
                </div>
                <div class="row-search clearfix">
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
                    <el-form-item label="客户账号:">
                        <el-input  v-model="formData.loginAccount" :disabled="true" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="收货人:">
                        <el-input  v-model="formData.caConsignee" :disabled="true" placeholder=""></el-input>
                    </el-form-item>
                </div>
                <div class="row-search clearfix">
                    <el-form-item label="收货地址:">
                        <areaselectTag size="small" v-model='formData.areaIds' :width='170' :changeOnSelect="true" disabled></areaselectTag>
                    </el-form-item><el-form-item>
                        <el-input  v-model="formData.caSreet" :disabled="true"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <div class="goodsTable serviceTab">
            <el-table 
                :data="tableData" 
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
                    <el-table-column label="商品货号" prop="proNum" width="85"></el-table-column>
                    <el-table-column label="商品名称" prop="proName" width="85"></el-table-column>
                    <el-table-column label="商品分类" prop="proOrgCodeName" width="85"></el-table-column>
                    <el-table-column label="计量方式" prop="pricingType" width="85">
                        <template scope="prop">
                            {{prop.row.pricingType | pricingTypeToText}}
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" prop="proUnit" width="96"></el-table-column>
                    <el-table-column label="规格" prop="specValue" width="96"></el-table-column>
                    <el-table-column label="商品单价" prop="proPrice" width="110"></el-table-column>
                    <el-table-column label="购买数量" prop="purchaseNum" width="130"></el-table-column>
                    <el-table-column label="实发量" prop="realSendNum" width="130"></el-table-column>
                    <el-table-column label="可退量" prop="" width="110">
                        <template scope="props">
                            {{props.row.realSendNum - props.row.realRejectNum - props.row.rejectNum | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column label="退货量" prop="rejectNum" width="110"></el-table-column>
                    <el-table-column label="订购金额" width=" 85">
                        <template scope="prop">
                            {{prop.row.proPrice * prop.row.purchaseNum | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column label="实发金额" prop="name" width="85">
                        <template scope="prop">
                            {{prop.row.proCostPrice * prop.row.realSendNum | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column label="可退金额" prop="" width="85">
                        <template scope="prop">
                            {{prop.row.realSendNum * prop.row.proCostPrice - prop.row.realRefundAmount - prop.row.rejectAmount | priceToText}}
                        </template>
                    </el-table-column>
                    <el-table-column label="退款金额" prop="rejectAmount" width="85">
                        <template scope="prop">
                            {{prop.row.rejectAmount | priceToText}}
                        </template>
                    </el-table-column>
            </el-table>
            <!-- <p class="opera-man">操作人：daru</p> -->
        </div>
        <div>
            <el-button class="xe-button-normal" @click="backTolist">
                返回
            </el-button>
        </div>
    </div>
</template>

<style lang="scss">
</style>

<script>
import {afterSaleType, afterSaleReason, orderStatus, payTypeList, payStatus} from '@/dataControl.js';
import areaselectTag from '@/components/areaSelect/areaSelect';
export default {
    data() {
        return {
            tableData: [],
            formData: {},
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 20
            }
        };
    },
    created() {
        this.examine();
    },
    computed: {
        afterSaleTypeList() {
            return afterSaleType;
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
        // payStatus
        afterSaleReasonList() {
            return afterSaleReason;
        }
    },
    methods: {
        examine(row) {
            let data = {};
            console.log('test', this.$route.query.afterSaleCode);
            data.afterSalesCode = this.$route.query.afterSalesCode;
            this.$http({        // 售后单详情页面
                method: 'post',
                url: '/xe-route/xe-erp/afterSales/queryAfterSaleInfo',
                data: data
            }).then((res) => {
                console.log(res);
                this.picServer = res.data.picServer;
                this.picDir = res.data.picDir;
                this.formData = res.data.XeVenAfterSaleInfoView;
                this.formData.areaIds = [parseInt(this.formData.caProvinceId), parseInt(this.formData.caCityId), parseInt(this.formData.caAreaId)];
                this.tableData = res.data.XeVenAfterSaleInfoView.detailViewList;
            }).catch((error) => {
                console.log(error);
            });
        },
        backTolist() {
            this.$router.go(-1);
        }
    },
    components: {
        areaselectTag
    }
};
</script>
