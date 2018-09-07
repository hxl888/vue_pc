<template lang="html">
    <div class="">
        <el-table :data="tabaledele" border>
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
            <el-table-column prop="usePlat" min-width="130" label="使用位置">
                <template scope="scope">
                    <div>{{scope.row.usePlat | usePlatfilter}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="useRange" min-width="130" label="商品范围">
                <template scope="scope">
                    <div>{{scope.row.useRange | useRangefilter}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="loginAccount" min-width="150" label="下单账号">
            </el-table-column>
            <el-table-column prop="orderId" min-width="150" label="订单编号">
            </el-table-column>
            <el-table-column prop="orderUseAreaName" min-width="150" label="下单区域">
            </el-table-column>
            <el-table-column prop="useDisAmount" min-width="130" label="面额">
                <template scope="scope">
                    <div v-if="scope.row.useDisAmount">￥{{scope.row.useDisAmount.toFixed(2)}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" min-width="150" label="领取时间">
                <template scope="scope">
                    <div>{{scope.row.createDate, 'ms' | millisecondFormat}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="delTime" min-width="150" label="删除时间">
                <template scope="scope">
                    <div>{{scope.row.delTime, 'ms' | millisecondFormat}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="" min-width="155" label="有效时间段">
                <template scope="scope">
                    <div>{{scope.row.activeTimeStart, 'ms' | millisecondFormat}} - {{scope.row.activeTimeEnd, 'ms' | millisecondFormat}}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['tabaledele']
};
</script>

<style lang="scss">
</style>
