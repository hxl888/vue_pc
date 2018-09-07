<template lang="html">
    <div class="">
        <el-table :data="tabalealre" border>
            <el-table-column prop="cardNum" label="优惠券编号" min-width="160"></el-table-column>
            <el-table-column prop="venName" label="商户名称" min-width="150">
            </el-table-column>
            <el-table-column prop="couTempId" min-width="150" label="优惠券号码"></el-table-column>
            <el-table-column prop="couName" min-width="130" label="优惠券名称">
            </el-table-column>
            <el-table-column prop="sendType" min-width="130" label="发放方式">
                <template scope="scope">
                    <div>{{scope.row.sendType | sendTypefilter}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="loginAccount" min-width="150" label="用户账号">
            </el-table-column>
            <el-table-column prop="orderId" min-width="150" label="订单号">
            </el-table-column>
            <el-table-column prop="orderUseAreaName" min-width="150" label="下单区域">
            </el-table-column>
            <el-table-column prop="orderAmount" min-width="130" label="订单金额">
                <template scope="scope">
                    <div v-if="scope.row.orderAmount">￥{{scope.row.orderAmount.toFixed(2)}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="" min-width="130" label="优惠金额">
                <template scope="scope">
                    <div v-if="scope.row.useDisAmount">￥{{scope.row.useDisAmount.toFixed(2)}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" min-width="150" label="领取时间">
                <template scope="scope">
                    <div>{{scope.row.createDate, 'ms' | millisecondFormat}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="useTime" min-width="150" label="使用时间">
                <template scope="scope">
                    <div>{{scope.row.useTime, 'ms' | millisecondFormat}}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['tabalealre']
};
</script>

<style lang="scss">
</style>
