<template lang="html">
    <div class="">
        <el-table :data="tabalenote" border>
            <el-table-column prop="cardNum" label="优惠券编号" min-width="160"></el-table-column>
            <el-table-column prop="venName" label="商户名称" min-width="150">
            </el-table-column>
            <el-table-column prop="couTempId" min-width="150" label="优惠券号码"></el-table-column>
            <el-table-column prop="couName"min-width="130" label="优惠券名称">
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
            <el-table-column prop="useAreaName" min-width="160" label="使用区域">
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
        </el-table>
    </div>
</template>

<script>
export default {
    props: ['tabalenote']
};
</script>

<style lang="scss">
</style>
