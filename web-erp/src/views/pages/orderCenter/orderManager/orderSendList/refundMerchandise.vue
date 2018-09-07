<template lang="html">
    <div>
        <el-table
             v-if="refundMer.orderInfoDetail && refundMer.orderInfoDetail.length > 0"
            :data="refundMer.orderInfoDetail"
            border
            style="width: 100%">
            <el-table-column
                prop=""
                label=""
                min-width="65"
            >
                <template scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="商品图"
                min-width="95"
            >
                <template scope="scope">
                    <div class="detail_picbox">
                        <img :src="picServer + scope.row.proPicture" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proSku"
                label="SKU编码"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop="proNum"
                label="商品货号"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop="proName"
                label="商品名称"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="proOrgCodeName"
                label="商品分类"
                min-width="180"
            >
            </el-table-column>
            <el-table-column
                prop="pricingType"
                label="计量方式"
                min-width="120"
            >
                <template scope="scope">
                    <div>
                        {{scope.row.pricingType | pricingTypeToText}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proUnit"
                label="单位"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="规格"
                min-width="120"
            >
                <template scope="scope">
                    <div>
                        {{scope.row.specName}}{{scope.row.specValue}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proPrice"
                label="商品单价"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.proPrice">
                        {{scope.row.proPrice.toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="purchaseNum"
                label="购买数量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="normWeight"
                label="标准重量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="realSendNum"
                label="实发量"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.realSendNum">{{scope.row.realSendNum}}</div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="差异量"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.purchaseNum">
                        {{parseFloat(scope.row.purchaseNum) - parseFloat(scope.row.realSendNum ? scope.row.realSendNum : 0)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proPayAmount"
                label="订购金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.proTotalPrice">
                        {{scope.row.proTotalPrice.toFixed(2)}}
                    </div>
                    <!--<div v-if="scope.row.proCostPrice && scope.row.purchaseNum">-->
                        <!--{{parseFloat((scope.row.proCostPrice*100)*(scope.row.purchaseNum*100)/10000).toFixed(2)}}-->
                    <!--</div>-->
                </template>
            </el-table-column>
            <!--<el-table-column-->
                <!--prop="freAmount"-->
                <!--label="运费金额"-->
                <!--min-width="120"-->
            <!--&gt;-->
                <!--<template scope="scope">-->
                    <!--<div v-if="scope.row.freAmount">-->
                        <!--{{scope.row.freAmount.toFixed(2)}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
                prop="pmtAmount"
                label="优惠金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.pmtAmount">
                        {{scope.row.pmtAmount.toFixed(2)}}
                    </div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="specialDisamount"
                label="特批优惠金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.specialDisamount">
                        {{scope.row.specialDisamount.toFixed(2)}}
                    </div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="refundAmount"
                label="退款金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.refundAmount">
                        {{scope.row.refundAmount.toFixed(2)}}
                    </div>
                    <div v-else>0</div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['refundMer'],
        data() {
            return {
            };
        },
        computed: {
            picServer() {
                return this.refundMer.picServer;
            }
        }
    };
</script>

<style lang="scss">
</style>
