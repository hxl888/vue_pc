<template lang="html">
    <div class="refundJournal">
       <el-table
        :data="bkgeDetails"
        border
        style="width: 100%">
            <el-table-column
                prop="catName"
                label="商品分类"
                min-width="">
            </el-table-column>
            <el-table-column
                prop="proName"
                label="商品名称"
                v-if="bkgeDetails.length && bkgeDetails[0].proName"
                min-width="">
            </el-table-column>
            <el-table-column
                prop="specValue"
                label="规格"
                v-if="bkgeDetails.length && bkgeDetails[0].specValue"
                min-width="">
                 <template scope="scope">
                    <div>
                        <span v-if="scope.row.specName">{{scope.row.specName}}</span><span v-if="scope.row.specValue">{{scope.row.specValue}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proNum"
                label="货号"
                v-if="bkgeDetails.length && bkgeDetails[0].proNum"
                min-width="">
            </el-table-column>
            <el-table-column
                prop="proUnit"
                label="单位"
                v-if="bkgeDetails.length && bkgeDetails[0].proUnit"
                min-width="">
            </el-table-column>
            <el-table-column
                prop="pricingType"
                label="计量方式"
                v-if="bkgeDetails.length && bkgeDetails[0].pricingType"
                min-width="">
                <template scope="scope">
                    <div>{{scope.row.pricingType | pricingTypefiter}}</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="bkgeRate"
                label="佣金比例"
                min-width="">
                 <template scope="scope">
                    <div v-if="scope.row.bkgeRate">{{parseFloat(scope.row.bkgeRate).toFixed(2)}}
                        <span v-if="scope.row.proUnit && unitType == 'bkgeProList'">/{{scope.row.proUnit}}</span>
                        <span v-if="unitType == 'bkgeCatList'"><i v-if="unitpro == 1">%</i><i v-if="unitpro == 2">/元吨</i></span>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['bkgeDetails', 'unitpro', 'unitType'],
        data() {
            return {
            };
        }
    };
</script>
