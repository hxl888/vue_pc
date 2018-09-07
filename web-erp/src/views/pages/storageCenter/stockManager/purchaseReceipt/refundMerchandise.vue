<template lang="html">
    <div class="goodsTable">
        <el-table
            :data="detailCode.products"
            border
            style="width: 100%">
            <el-table-column
                    min-width="95"
                    label="商品图">
                <template scope="scope">
                    <div class="detail_picbox">
                        <img :src="picServer + picDir + scope.row.picUrl">
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
                prop="proNo"
                label="商品货号"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop="proName"
                label="商品名称"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="categoryName"
                label="商品分类"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop="priceType"
                label="计价方式"
                min-width="100"
            >
                <template scope="scope">
                    <div>
                        {{scope.row.priceType | pricingTypeToText}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proUnit"
                label="单位"
                min-width="90"
            >
            </el-table-column>
            <el-table-column
                prop="specValue"
                label="规格"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop="buyPrice"
                label="进货价"
                min-width="150"
            >
                <template scope="scope">
                    <div>
                        {{scope.row.buyPrice.toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="proNum"
                label="计划入库数量"
                min-width="150"
            >
            </el-table-column>
            <el-table-column
                prop="arriveNum"
                label="已入库数量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="curArriveNum"
                label="本次入库数量"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="proAmount"
                label="采购费用"
                min-width="120"
            >
                <template scope="scope">
                    {{scope.row.proAmount.toFixed(2)}}
                </template>
            </el-table-column>
            <el-table-column
                prop="arriveAmount"
                label="已收货费用"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                prop="curArrivePric"
                label="本次收货金额"
                min-width="120"
            >
                <template scope="scope">
                    <div v-if="scope.row.curArriveNum && scope.row.buyPrice">
                        {{(parseFloat(scope.row.curArriveNum ? scope.row.curArriveNum : 0) * parseFloat(scope.row.buyPrice ? scope.row.buyPrice : 0)).toFixed(2)}}
                    </div>
                    <div v-if="!scope.row.curArriveNum || scope.row.curArriveNum ==0 || !scope.row.buyPrice || scope.row.buyPrice == 0">0</div>
                </template>
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注"
                min-width="120"
            >
            </el-table-column>
            <el-table-column
                    prop=""
                    label="操作"
                    fixed="right"
                    min-width="90"
            >
                <template scope="scope">
                    <div>
                        <a href="javascript:;" class="alinkblu" @click="modifyShops">修改</a>
                    </div>
                </template>
            </el-table-column>
          </el-table>
          <div class="reset-dialog set-editrequise">
            <el-dialog
                title="选择调拨商品"
                :visible.sync="modifyShopsDialog"
                size="small"
                :before-close="handleClose">
                    <div class="tab-editrequise">
                        <div class="clearfix">
                            <div class="table-editrequise">
                                <el-table
                                    :data="detailCode.products"
                                    style="width: 100%"
                                    border
                                    >
                                    <el-table-column label="商品名称" prop="proName" min-width="110">
                                    </el-table-column>
                                    <el-table-column label="商品货号" prop="proNo" min-width="85">
                                    </el-table-column>
                                    <el-table-column label="计划入库数量" prop="proNum" min-width="85">
                                    </el-table-column>
                                    <el-table-column label="已入库数量" prop="arriveNum" min-width="85">
                                    </el-table-column>
                                    <el-table-column label="本次入库数量" prop="curArriveNum" min-width="85">
                                        <template scope="props">
                                            <el-input type="input" class="xe-input-h24" v-model="props.row.curArriveNum"></el-input>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="xe-button-normal" type="primary" @click="diaModify">确定</el-button>
                        <el-button class="xe-button-normal" @click="diaModifyC">取消</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['detailCode'],
        data() {
            return {
                modifyShopsDialog: false,
                // picDir: 'product/80/80/',
                curArriveNumData: []
            };
        },
        computed: {
            picServer() {
                return this.detailCode.picServer;
            },
            picDir() {
                return this.detailCode.picDir;
            }
        },
        methods: {
            modifyShops() {
                this.modifyShopsDialog = true;
                this.curArriveNumData = [];
                for (let i in this.detailCode.products) {
                    this.curArriveNumData.push({'curArriveNum': this.detailCode.products[i].curArriveNum});
                }
            },
            handleClose() {
                this.modifyShopsDialog = false;
                for (let i in this.detailCode.products) {
                    this.detailCode.products[i].curArriveNum = this.curArriveNumData[i].curArriveNum;
                }
            },
            diaModify() {
                this.modifyShopsDialog = false;
            },
            diaModifyC() {
                this.modifyShopsDialog = false;
                for (let i in this.detailCode.products) {
                    this.detailCode.products[i].curArriveNum = this.curArriveNumData[i].curArriveNum;
                }
            }
        },
        watch: {
            detailCode(n) {
                if (n) {
                    this.detailCode.products.forEach((item) => {
                        this.$set(item, 'curArriveNum', '');
                        this.$set(item, 'curArrivePric', '');
                    });
                }
            }
        }
    };
</script>

<style lang="scss">
</style>
