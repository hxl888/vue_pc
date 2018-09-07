<template lang="html">
    <div class="refundJournal">
       <el-table
        :data="refundJou"
        border
        style="width: 100%">
            <el-table-column
                prop=""
                label="序号"
                width="65">
                  <template scope="scope">
                        {{scope.$index + 1}}
                  </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="商品图"
                min-width="115">
                <template scope="scope">
                    <div>
                        <img :src="picServer + scope.row.proPicture" width="80" height="80">
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="SKU编码"
                min-width="150">
                <template scope="scope">
                    <div>{{scope.row.proSku}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
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
                prop="proOrgCodeName"
                label="商品分类"
                min-width="200">
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
                prop="proUnit"
                label="单位"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="specValue"
                label="规格"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="proCostPrice"
                label="成交价"
                min-width="80">
                <template scope="scope">
                    <div v-if="scope.row.proCostPrice">{{parseFloat(scope.row.proCostPrice).toFixed(2)}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="purchaseNum"
                label="购买数量"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="normWeight"
                label="标准重量"
                min-width="100">
            </el-table-column>
            <el-table-column
                prop="realSendNum"
                label="实发量"
                min-width="80">
            </el-table-column>
            <el-table-column
                prop="difQuantity"
                label="差异量"
                min-width="80">
                <template scope="scope">
                    <div v-if="scope.row.difQuantity">{{scope.row.difQuantity}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="bkgeRate"
                label="佣金比例"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.bkgeRate">{{scope.row.bkgeRate*100}}%</div>
                    <div v-else>0%</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="bkgeAmount"
                label="佣金金额"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.bkgeAmount">{{parseFloat(scope.row.bkgeAmount).toFixed(2)}}</div>
                    <div v-else>0.00</div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="订购金额"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.proTotalPrice">{{parseFloat(scope.row.proTotalPrice).toFixed(2)}}</div>
                    <div v-else>0.00</div>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--prop=""-->
                <!--label="运费金额"-->
                <!--min-width="100">-->
                <!--<template scope="scope">-->
                    <!--<div v-if="scope.row.proTotalPrice">{{parseFloat(scope.row.proTotalPrice).toFixed(2)}}</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                prop=""
                label="优惠金额"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.pmtAmount">{{parseFloat(scope.row.pmtAmount).toFixed(2)}}</div>
                    <div v-else>0.00</div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="特批优惠"
                min-width="100">
                <template scope="scope">
                    <div v-if="scope.row.specialDisamount">{{parseFloat(scope.row.specialDisamount).toFixed(2)}}</div>
                    <div v-else>0.00</div>
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--prop=""-->
                <!--label="实收金额"-->
                <!--min-width="100">-->
                <!--<template scope="scope">-->
                    <!--<div v-if="scope.row.proPayAmount">{{parseFloat(scope.row.proPayAmount).toFixed(2)}}</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['refundJou', 'picServer'],
        data() {
            return {
            };
        }
    };
</script>
