<template lang="html">
    <div class="editor_body">
        <el-form :inline="true" :model="formsearch" ref="formsearch" class="smallHei">
             <el-form-item prop="proName">
                <el-input size="small" placeholder="商品查询" class="" @keyup.enter.native="purchPayList" v-model="formsearch.proName">
                </el-input>
                <input type="text" style="font-size: 0">
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
                <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
                <el-table-column prop="specValue" label="规格" min-width="80">
                    <template scope="scope">
                        <div>{{scope.row.specValue ? scope.row.specValue : '无'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="proNum" label="货号" min-width="100">
                </el-table-column>
                <el-table-column prop="sumAmount" label="金额（毛利）" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.sumAmount">
                            {{parseFloat(scope.row.sumAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="不含税金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.sumAmount">
                            {{parseFloat((scope.row.sumAmount*1000)/1060).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="税额" min-width="80">
                    <template scope="scope">
                        <div v-if="scope.row.sumAmount">
                            {{parseFloat((scope.row.sumAmount*1000 - ((scope.row.sumAmount*1000)/1060)*1000)/1000).toFixed(2)}}
                        </div>
                    </template>
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
    props: ['orgCode', 'dialogbut', 'userCode'],
    data() {
        return {
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            payDetails: [],
            formsearch: {
                proName: ''
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
        purchPayList() {
            let params = {};
            this.loading = true;
            params = this.formsearch;
            params.proOrgCode = this.orgCode;
            params.userCode = this.userCode;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/payBillRecord/listSysPayBillRecorDetail`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.pagelist.total = res.data.pageInfo.total;
                this.payDetails = res.data.xeFinPayRecordDetailList;
            }).catch((error) => {
                this.loading = false;
                console.log(error);
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
        userCode(n) {
            this.formsearch.userCode = n;
        },
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
<style lang="scss">
    .el-form {
        &.smallHei {
            .el-form-item {
                margin-bottom: 0;
            }
            .el-form-item__content {
                line-height: 16px!important;
            }
        }
    }
</style>
