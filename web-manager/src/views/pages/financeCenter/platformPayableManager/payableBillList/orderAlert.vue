<template lang="html">
    <div class="editor_body">
        <el-form :inline="true" :model="formsearch" ref="formsearch">
            <el-form-item prop="orderId">
                <el-input size="small" placeholder="订单编号" @keyup.enter.native="purchPayList" class="" v-model="formsearch.orderId">
                </el-input>
            </el-form-item>
             <el-form-item prop="proName">
                <el-input size="small" placeholder="商品名称" @keyup.enter.native="purchPayList" class="" v-model="formsearch.proName">
                </el-input>
            </el-form-item>
             <el-form-item prop="proNum">
                <el-input size="small" placeholder="商品货号" @keyup.enter.native="purchPayList" class="" v-model="formsearch.proNum">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button  class="xe-button-normal" @click="purchPayList" type="primary">
                    查询
                </el-button>
                <el-button class="xe-button-normal"  @click="resetForm('formsearch')">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table ref="payDetails" :data="payDetails" border v-loading ="loading">
                <el-table-column prop="orderId" label="订单编号" min-width="150"></el-table-column>
                <el-table-column prop="sendTime" label="发货时间" min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.sendTime">{{scope.row.sendTime | millisecondFormat('ms')}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
                <el-table-column prop="specValue" label="规格" min-width="120">
                    <template scope="scope">
                        <div>{{scope.row.specValue ? scope.row.specValue : '无'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="proNum" label="货号" min-width="100">
                </el-table-column>
                <el-table-column prop="pricingType" label="计量方式" min-width="100">
                    <template scope="scope">
                        <div>{{scope.row.pricingType | pricingTypefiter}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="proPrice"
                    label="商品单价"
                    min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.proPrice">{{parseFloat(scope.row.proPrice).toFixed(2)}}</div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="purchaseNum" label="订购量" min-width="100">
                </el-table-column>
                <el-table-column prop="proUnit" label="单位" min-width="80">
                </el-table-column>
                <el-table-column prop="proTotalPrice" label="订购金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.proTotalPrice">
                            {{parseFloat(scope.row.proTotalPrice).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="realSendNum" label="发货量" min-width="100">
                </el-table-column>
                <el-table-column prop="realPayAmount" label="发货金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.proPayAmount">{{parseFloat((scope.row.proPayAmount*1000 - (scope.row.refundAmount ? scope.row.refundAmount*1000 : 0))/1000).toFixed(2)}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="bkgeRate" label="佣金比例" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.bkgeRate">
                            {{scope.row.bkgeRate}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="bkgeAmount" label="佣金" min-width="80">
                    <template scope="scope">
                        <div v-if="scope.row.bkgeAmount">
                            {{parseFloat(scope.row.bkgeAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <!--<el-table-column prop="purchPrice" label="采购单价" min-width="100">-->
                    <!--<template scope="scope">-->
                        <!--<div v-if="scope.row.purchPrice">-->
                            <!--{{parseFloat(scope.row.purchPrice).toFixed(2)}}-->
                        <!--</div>-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="realPayAmount" label="实际付款金额" min-width="120">
                    <template scope="scope">
                        <div v-if="scope.row.realPayAmount">
                            {{parseFloat(scope.row.realPayAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="cutPayAmount" label="其他扣款" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.cutPayAmount">
                            {{parseFloat(scope.row.cutPayAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="cutReason" label="扣款原因" min-width="150">
                </el-table-column>
                <el-table-column prop="refundAmount" label="退款金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.refundAmount">
                            {{parseFloat(scope.row.refundAmount).toFixed(2)}}
                        </div>
                        <div v-else>0</div>
                    </template>
                </el-table-column>
                <el-table-column prop="purchAdress" label="采购商地址" min-width="150">
                </el-table-column>
                <el-table-column
                    prop="purchPayStatus"
                    label="采购货款"
                    min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.purchPayStatus | purchPayStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="remark" label="备注" min-width="150">
                </el-table-column>
            </el-table>
            <div class="xe-pagination-panel">
                <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="pagelist.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pagelist.pageSize"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="pagelist.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['lastayDetailRow', 'dialogbut'],
    data() {
        return {
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            payDetails: [],
            formsearch: {
                orderId: '',
                proName: '',
                proNum: ''
            },
            loading: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.purchPayList();
    },
    methods: {
        purchPayList() { // 分页显示对应上个账期未结算的订单明细
            let params = {};
            this.loading = true;
            params = this.formsearch;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            params.userCode = this.lastayDetailRow.userCode;
            params.lastPbCode = this.lastayDetailRow.lastPbCode;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finPbillPlat/listUnPayBillDetail`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.payDetails = res.data.payDetails;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch(() => {
                this.loading = false;
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.purchPayList();
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.purchPayList();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.purchPayList();
            }
        }
    },
    watch: {
        dialogbut(n) {
            if (n === false) {
                this.$refs.formsearch.resetFields();
            }
            if (n === true) {
                this.purchPayList();
            }
        }
    }
};
</script>
