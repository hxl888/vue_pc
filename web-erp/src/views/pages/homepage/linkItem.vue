<template lang="html">
    <div class="m-home-item linkitem">
        <router-link :to="{name: 'procurementListIndex'}" tag="a">
            <span class="linkitem-01"></span>
            采购单列表
        </router-link>
        <router-link :to="{name: 'orderQueryList'}" tag="a">
            <span class="linkitem-02"></span>
            订单查询
        </router-link>
        <router-link :to="{name: 'orderProcessingList'}" tag="a">
            <span class="linkitem-03"></span>
            订单处理
        </router-link>
        <router-link :to="{name: 'orderSendList'}" tag="a">
            <span class="linkitem-04"></span>
            订单汇总采购
        </router-link>
        <router-link :to="{name: 'orderPrintList'}" tag="a">
            <span class="linkitem-05"></span>
            订单打印发货
        </router-link>
        <router-link :to="{name: 'stockMonitoring'}" tag="a">
            <span class="linkitem-06"></span>
            库存监控
        </router-link>
        <router-link :to="{name: 'refundConfirmList'}" tag="a">
            <span class="linkitem-07"></span>
            退款单列表
        </router-link>
        <router-link :to="{name: 'receiptList'}" tag="a">
            <span class="linkitem-08"></span>
            收款单列表
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'linkitem'
};
</script>
