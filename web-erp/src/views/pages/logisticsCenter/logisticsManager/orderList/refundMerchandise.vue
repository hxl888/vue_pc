<template lang="html">
    <div>
        <el-table
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
                prop="purchaseNum"
                label="购买数量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="realSendNum"
                label="实发量"
                min-width="120"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        props: ['refundMer'],
        data() {
            return {};
        }
    };
</script>
