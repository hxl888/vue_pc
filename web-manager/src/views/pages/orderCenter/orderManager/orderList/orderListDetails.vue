<template lang="html">
    <div class="m-router-con">
        <div>
            <div class="pub-tabDatadetails">
                <el-tabs v-model="tabCard_val" class="noFlot" type="card" @tab-click="handleClick">
                    <el-tab-pane label="订单详情" name="first">
                        <refund-merchandise :refundMer = 'refundMer'></refund-merchandise>
                    </el-tab-pane>
                    <el-tab-pane label="商品信息" name="second">
                         <refund-journal :refundJou = 'refundJou' :picServer="picServer"></refund-journal>
                    </el-tab-pane>
                    <el-tab-pane label="卖家信息" name="third">
                        <buyer-information :buyerInfor = "buyerInfor"></buyer-information>
                    </el-tab-pane>
                    <el-tab-pane label="物流信息" name="four">
                        <logistics-information :logisticsInfor = 'logisticsInfor'></logistics-information>
                    </el-tab-pane>
                    <el-tab-pane label="备注信息" name="five">
                        <memo-information :memoInfor = 'memoInfor'></memo-information>
                    </el-tab-pane>
                </el-tabs>
            </div>
             <div style="margin-top:20px">
                <el-button type="primary" @click="goBack">返回</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import refundMerchandise from './refundMerchandise';
import buyerInformation from './buyerInformation';
import logisticsInformation from './logisticsInformation';
import memoInformation from './memoInformation';
import refundJournal from './refundJournal';
export default {
    data() {
        return {
            tabCard_val: 'first',
            picServer: '',
            refundMer: {}, // 订单详情
            refundJou: [], // 商品信息
            buyerInfor: {}, // 卖家信息
            logisticsInfor: {}, // 物流信息
            memoInfor: {}, // 备注信息
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getOrderInfoByOrderId();
    },
    methods: {
        getOrderInfoByOrderId() {
            let orderId = this.$route.query.orderId;
            if (orderId) {
                let params = {};
                params.orderId = orderId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/orderInfo/getOrderInfoByOrderId`,
                    data: params
                }).then((res) => {
                    this.refundMer = res.data.orderInfo;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$router.go(-1);
            }
        },
        getOrderInfoDetailByOrderId() {
            let orderId = this.$route.query.orderId;
            if (orderId) {
                let params = {};
                params.orderId = orderId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/orderInfo/getOrderInfoDetailByOrderId`,
                    data: params
                }).then((res) => {
                    this.picServer = res.data.picServer;
                    this.refundJou = res.data.orderInfoDetailList;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
//                this.$router.go(-1);
            }
        },
        getVenInfoByUserCode() {
            let userCode = this.$route.query.userCode;
            if (userCode) {
                let params = {};
                params.userCode = userCode;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/orderInfo/getVenInfoByUserCode`,
                    data: params
                }).then((res) => {
                    this.buyerInfor = res.data.orderVenInfo;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
//                this.$router.go(-1);
            }
        },
        getOrderLogisticsInfo() {
            let orderId = this.$route.query.orderId;
            if (orderId) {
                let params = {};
                params.orderId = orderId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/orderInfo/getOrderLogisticsInfo`,
                    data: params
                }).then((res) => {
                    this.logisticsInfor = res.data.orderLogisticsInfo;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
//                this.$router.go(-1);
            }
        },
        getOrderRemark() { // 查询订单相关备注信息
            let orderId = this.$route.query.orderId;
            if (orderId) {
                let params = {};
                params.orderId = orderId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/orderInfo/getOrderRemark`,
                    data: params
                }).then((res) => {
                    this.memoInfor = res.data.remark;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
//                this.$router.go(-1);
            }
        },
        handleClick(tab) {
            if (tab.name === 'first') {
            } else if (tab.name === 'second') {
                if (!this.refundJou.length) {
                    this.getOrderInfoDetailByOrderId();
                }
            } else if (tab.name === 'third') {
                this.getVenInfoByUserCode();
            } else if (tab.name === 'four') {
                this.getOrderLogisticsInfo();
            } else if (tab.name === 'five') {
                this.getOrderRemark();
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    components: {
        refundMerchandise,
        buyerInformation,
        logisticsInformation,
        memoInformation,
        refundJournal
    }
};
</script>
