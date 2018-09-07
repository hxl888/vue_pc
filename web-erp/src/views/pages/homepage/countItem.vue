<template lang="html">
    <div class="m-home-item countitem">
        <ul>
            <li>
                <div class="item"> 
                    <router-link :to="{name: 'orderProcessingList'}" tag="div" class="count-num c-point">{{homePage.waitCheckOrderNum}}</router-link>
                    <div class="count-text">待审核订单</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('waitCheckOrderNum')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                <!-- </div> -->
                </div>
            </li>
            <li>
                <div class="item"> 
                    <router-link :to="{name: 'exceptionOrderList'}" tag="div" class="count-num c-point">
                    {{homePage.exceptionOrderNum}}</router-link>
                    <div class="count-text">异常订单</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('exceptionOrderNum')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
            <li>
                <div class="item">
                    <router-link :to="{name: 'orderPrintList'}" tag="div" class="count-num c-point">
                    {{homePage.waitSendOrderNum}}</router-link>
                    <div class="count-text">待发货订单</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('waitSendOrderNum')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
            <li>
                <div class="item">
                    <router-link :to="{name: 'procurementListIndex'}" tag="div" class="count-num c-point">
                    {{homePage.waitDealPurchOrderNum}}</router-link>
                    <div class="count-text">待处理采购单</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('waitDealPurchOrderNum')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
            <li>
                <div class="item">
                    <router-link :to="{name: 'stockMonitoring'}" tag="div" class="count-num c-point" 
                    :class="stockCostFlag">{{homePage.stockCost | priceToText(true)}}</router-link>
                    <div class="count-text">库存成本</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('stockCost')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
            <li>
                <div class="item">
                    <router-link :to="{name: 'orderQueryList'}" tag="div" class="count-num c-point"
                    :class="monthTotalAmountFlag">{{homePage.monthTotalAmount | priceToText(true)}}</router-link>
                    <div class="count-text">本月销售总额</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('monthTotalAmount')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
            <li>
                <div class="item">
                    <router-link :to="{name: 'orderQueryList'}" tag="div" class="count-num c-point">
                    {{homePage.monthTradeUserNum}}</router-link>
                    <div class="count-text">本月交易用户数</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('monthTradeUserNum')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
            <li>
                <div class="item">
                    <router-link :to="{name: 'procurementListIndex'}" tag="div" class="count-num c-point">
                    {{homePage.monthPurchAmount | priceToText(true)}}</router-link>
                    <div class="count-text">本月采购总额</div>
                    <div class="count-reload iconfont icon-shouyeshuaxin" @click="loadDetails('monthPurchAmount')"></div>
                    <!-- <div class="count-remove el-icon-circle-close"></div> -->
                    <!-- </router-link> -->
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'countitem',
    data() {
        return {
            homePage: {
                monthTotalAmount: 0, // 本月销售总额
                waitSendOrderNum: 0, // 待发货订单
                monthTradeUserNum: 0, // 本月交易用户数
                monthPurchAmount: 0, // 本月采购总额
                waitDealPurchOrderNum: 0, // 待处理采购单
                waitCheckOrderNum: 0, // 待审核订单
                exceptionOrderNum: 0, // 异常订单
                stockCost: 0 // 库存成本
            }
        };
    },
    methods: {
        loadInf() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/home/homeView',
                data: {}
            }).then((res) => {
                this.homePage = res.data;
            }).catch((error) => {
                console.log(error);
            });
        },
        loadDetails(type) {
            let urlObj = {
                monthTotalAmount: '/xe-route/xe-erp/home/monthTotalAmount',
                waitSendOrderNum: '/xe-route/xe-erp/home/waitSendOrderNum',
                monthTradeUserNum: '/xe-route/xe-erp/home/monthTradeUserNum',
                monthPurchAmount: '/xe-route/xe-erp/home/monthPurchAmount',
                waitDealPurchOrderNum: '/xe-route/xe-erp/home/waitDealPurchOrderNum',
                waitCheckOrderNum: '/xe-route/xe-erp/home/waitCheckOrderNum',
                exceptionOrderNum: '/xe-route/xe-erp/home/exceptionOrderNum',
                stockCost: '/xe-route/xe-erp/home/stockCost'
            };
            this.$http({
                method: 'post',
                url: urlObj[type],
                data: {}
            }).then((res) => {
                this.homePage[type] = res.data[type];
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    computed: {
        stockCostFlag() {
            return this.homePage.stockCost >= 10000000 ? 'bigNumber' : '';
        },
        monthTotalAmountFlag() {
            return this.homePage.monthTotalAmount >= 10000000 ? 'bigNumber' : '';
        }
    },
    created() {
        this.loadInf();
    }
};
</script>
<style lang="scss">
    .homepage .countitem li .count-num.bigNumber{
        font-size: 40px;
        line-height: 50px;
    }
</style>
