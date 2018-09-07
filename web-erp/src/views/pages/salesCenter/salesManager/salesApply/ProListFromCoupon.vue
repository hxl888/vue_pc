<template>
    <div class="couponProChoose">
        <div v-loading="loading">
            <div class="coupon-query">
                <el-input style="width: 180px; margin-right: 10px;" v-model="nameNum" size="small" placeholder="商品名称/商品货号/SKU编码"></el-input>
                <el-checkbox :true-label="1" :false-label="2" v-model="upFlag">在售中商品</el-checkbox>
                <el-button type="primary" size="small" @click="queryFn" style=" margin-left: 10px;">查询</el-button>
            </div>
            <el-table ref="multipleTable" :data="listProType" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                    class-name="td-index"
                    label=""
                    fixed
                    width="35">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    fixed
                    type="selection"
                    width="40">
                </el-table-column>
                <el-table-column label="商品图" width="116">
                    <template scope="scope">
                        <img :src="picServer + scope.row.proMainImg" style="width: 80px; height: 80px; vertical-align: top;" alt="">
                    </template>
                </el-table-column>
                <el-table-column prop="proSku" label="SKU编码" width="140"></el-table-column>
                <el-table-column prop="proNum" label="商品货号" width="120"></el-table-column>
                <el-table-column prop="proName" label="商品名称" width="130"></el-table-column>
                <el-table-column prop="cateName" label="商品分类" width="150"></el-table-column>
                <el-table-column label="计量方式" width="90">
                    <template scope="scope">
                        {{scope.row.pricingType | pricingTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="proUnit" label="单位" width="85"></el-table-column>
                <el-table-column label="规格" width="120">
                    <template scope="scope">
                        {{scope.row.proSpec ? scope.row.proSpec : '无'}}
                    </template>
                </el-table-column>
                <el-table-column prop="costPrice" label="成本价" width="85">
                    <template scope="scope">
                        <template v-if="scope.row.costPrice">
                            {{scope.row.costPrice | numberToFixed2}}
                        </template>
                        <template v-else>无</template>
                    </template>
                </el-table-column>
                <el-table-column label="销售价格" width="85">
                    <template scope="scope">
                        {{scope.row.skuPrice | numberToFixed2}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-showbox">
            <div class="xe-pagination-panel">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageNum"
                    :page-sizes="[5, 10, 20, 50]"
                    :page-size="pageInfo.pageSize"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="pageInfo.total">
                </el-pagination>
            </div>
        </div>
    </div>

</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                loading: false,
                listProType: [],
                nameNum: '',
                upFlag: 1,
                pageInfo: {
                    pageNum: 1,
                    pageSize: 5,
                    total: 0
                },
                picServer: '',
                resultData: []
            };
        },
        created() {
            this.getVenProListFromCoupon();
        },
        methods: {
            getVenProListFromCoupon() {
                this.loading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/coupon/coupTemplet/getVenProListFromCoupon',
                    data: {
                        nameNum: this.nameNum,
                        upFlag: this.upFlag,
                        pageSize: this.pageInfo.pageSize,
                        pageNum: this.pageInfo.pageNum
                    }
                }).then(res => {
                    console.log(res);
                    this.loading = false;
                    this.pageInfo.pageNum = res.data.pageInfo.pageNum;
                    this.pageInfo.total = res.data.pageInfo.total;
                    this.listProType = res.data.list;
                    this.picServer = res.data.picServer;
                }).catch(error => {
                    console.log(error);
                });
            },
            queryFn() {
                this.pageInfo.pageNum = 1;
                this.getVenProListFromCoupon();
            },
            handleSelectionChange(selection) {
                this.resultData = selection;
            },
            clearSelection() {
                this.$refs.multipleTable.clearSelection();
            },
            handleSizeChange(size) {
                this.pageInfo.pageNum = 1;
                this.pageInfo.pageSize = size;
                this.getVenProListFromCoupon();
            },
            handleCurrentChange(currentPage) {
                this.pageInfo.pageNum = currentPage;
                this.getVenProListFromCoupon();
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .couponProChoose {
        .coupon-query {
            margin-bottom: 15px;
        }
        .td-index .cell {
            padding: 5px;
            text-align: center;
        }
        .el-table-column--selection .cell {
            padding: 5px 10px;
        }
        .xe-pagination-panel {
            padding: 10px 0 15px 0;
        }
    }
</style>
