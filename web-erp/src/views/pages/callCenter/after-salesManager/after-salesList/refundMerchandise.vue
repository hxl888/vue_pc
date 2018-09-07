<template lang="html">
    <div>
        <el-table
            :data="refundMerchandise"
            border
            show-summary
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
                        <img :src="Imgurl" alt="">
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop=""
                label="SKU编码"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="商品货号"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="商品名称"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="商品分类"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="计量方式"
                min-width="100"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="单位"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="规格"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="成交价"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="购买数量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="标准重量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="实发量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="差异量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="退货量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="订购金额"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="运费金额"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                    prop=""
                    label="优惠金额"
                    min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="特批优惠金额"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop=""
                label="退款金额"
                min-width="120"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                Imgurl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
                refundMerchandise: [
                    {
                        typ: ''
                    }
                ]
            };
        }
    };
</script>

<style lang="scss">
</style>
