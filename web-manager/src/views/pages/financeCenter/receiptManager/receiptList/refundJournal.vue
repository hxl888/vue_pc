<template lang="html">
    <div class="refundJournal">
       <el-table
        :data="payDetails"
        border
        style="width: 100%">
            <el-table-column
                prop="proNum"
                label="商品货号"
                min-width="120">
                <template scope="scope">
                    <div>{{scope.row.proNum}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proName"
                label="商品名称"
                min-width="150">
            </el-table-column>
            <el-table-column
                prop="specValue"
                label="规格"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="proUnit"
                label="单位"
                min-width="80">
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
                prop="proCostPrice"
                label="成交单价"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.proCostPrice">
                        {{parseFloat(scope.row.proCostPrice).toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="purchaseNum"
                label="订购量"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="proPrice"
                label="订购金额"
                min-width="100">
                <template scope="scope">
                    <div>
                        {{parseFloat(((scope.row.purchaseNum ? scope.row.purchaseNum : 0) * (scope.row.proPrice ? scope.row.proPrice *1000 : 0))/1000).toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="realSendNum"
                label="实发量"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="proPayAmount"
                label="实发金额"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.proPayAmount">{{parseFloat((scope.row.realSendNum ? scope.row.realSendNum : 0)*(scope.row.proCostPrice ? scope.row.proCostPrice : 0)).toFixed(2)}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="differNum"
                label="差异量"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="differAmount"
                label="差异金额"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.differAmount">{{parseFloat(scope.row.differAmount).toFixed(2)}}</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['payDetails'],
        data() {
            return {
            };
        }
    };
</script>
