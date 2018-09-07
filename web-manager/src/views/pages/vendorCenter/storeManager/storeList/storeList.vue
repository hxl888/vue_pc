<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" class="" :model="searchform" :inline=true>
                <el-form-item prop="loginAccount">
                    <el-input size="small" placeholder="供应商名称/ID/账号/店铺名称" class="xe-input-l40" v-model="searchform.loginAccount"></el-input>
                </el-form-item>
                <el-form-item label="" prop="startDateStr" class="marR0 timeLength">
                    <el-date-picker
                        size="small"
                        v-model="searchform.startDateStr"
                        type="date"
                        placeholder="选择入驻开始日期"
                        @change="startDateStrFn"
                        >
                    </el-date-picker>
                    <span class="data-bor">-</span>
                </el-form-item>
                <el-form-item prop="endDateStr"   class="timeLength">
                    <el-date-picker
                        size="small"
                        v-model="searchform.endDateStr"
                        type="date"
                        placeholder="选择入驻结束日期"
                        @change="endDateStrFn"
                        >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<div class="u-opera-btnBox">-->
            <!--<el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        <!--</div>-->
        <el-table ref="tableDatas" :data="tableDatas" v-loading="tableDataLoading" border tooltip-effect="dark" style="width: 100%">
            <el-table-column  min-width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column prop="userCode" label="供应商ID" min-width="150"></el-table-column>
            <el-table-column prop="mobile" label="账号" min-width="150">
                <template scope="scope">
                    <div>
                        {{scope.row.mobile ? scope.row.mobile : scope.row.email}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="venName" min-width="160" label="商户名称"></el-table-column>
            <el-table-column prop="shopName" min-width="160" label="店铺名称">
            </el-table-column>
            <el-table-column prop="comType" min-width="120" label="商户类型">
                <template scope="scope">
                    <div>
                        {{scope.row.comType | comTypefiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="venFreezeStatus" min-width="120" label="冻结状态">
                <template scope="scope">
                    <div>
                        {{scope.row.venFreezeStatus | venFreezeStatusfiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="venFreezeStatus" min-width="150" label="入驻时间">
                <template scope="scope">
                    <div>
                        {{scope.row.venCreateDate, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" width="65" label="操作">
                <template scope="scope">
                    <div>
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="goDetails(scope.row)">查看</a>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagelist.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableDatas: [],
                searchform: {
                    loginAccount: '',
                    startDateStr: '',
                    endDateStr: ''
                },
                tableDataLoading: false,
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                startDateStrs: '',
                endDateStrs: '',
                productUrl: '/xe-route/xe-mis'
//            productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            startDateStrFn(val) {
                this.startDateStrs = val;
            },
            endDateStrFn(val) {
                this.endDateStrs = val;
            },
            resetForm(formName) {
                let _this = this;
                this.$refs[formName].resetFields();
                this.searchform.startDateStr = '';
                this.searchform.endDateStr = '';
                setTimeout(() => {
                    _this.enquiryForm();
                }, 10);
            },
            goDetails(row) {
                this.$router.push({name: 'storeList_details', query: {userCode: row.userCode}});
            },
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                params.startDateStr = this.startDateStrs;
                params.endDateStr = this.endDateStrs;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/shopmanager/queryVenInfoShopList`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.shopList;
                    this.tableDataLoading = false;
                }).catch((error) => {
                    console.log(error);
                    this.tableDataLoading = false;
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.enquiryForm();
                }
            }
        }
    };
</script>
