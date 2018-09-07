<template lang="html">
    <div>
         <el-table
            :data="refundMerch.actionList"
            border
            style="width: 100%">
            <el-table-column
                prop=""
                label=""
                min-width="70"
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
                        <img :src="picServer + scope.row.proMainImg" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proSku"
                label="SKU编码"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="proNum"
                label="商品货号"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="proName"
                label="商品名称"
                min-width="130"
            >
            </el-table-column>
            <el-table-column
                prop="proCategoryName"
                label="商品分类"
                min-width="130"
            >
            </el-table-column>
            <el-table-column
                prop="pricingType"
                label="计量方式"
                min-width="90"
            >
                <template scope="scope">
                    {{scope.row.pricingType | pricingTypeToText}}
                </template>
            </el-table-column>
            <el-table-column
                prop="proUnit"
                label="单位"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop="proSpecValue"
                label="规格"
                min-width="90"
            >
                <template scope="scope">
                    <div v-if="scope.row.proSpecValue">{{scope.row.proSpecValue}}</div>
                    <div v-else>无</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="actualInv"
                label="实际库存"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                prop="usableInv"
                label="可用库存"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                prop="allotNums"
                label="调出数量"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                prop="allotNums"
                label="调入数量"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                prop="proPrice"
                label="成本价"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop="allotAmount"
                label="调拨金额"
                min-width="90"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['refundMerch'],
        data() {
            return {
            };
        },
        computed: {
            picServer() {
                return this.refundMerch.picServer;
            }
        }
    };
</script>

<style lang="scss">
</style>
