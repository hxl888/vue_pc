<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" class="" :model="searchform" :inline=true>
                <el-form-item prop="loginAccount">
                    <el-input placeholder="请输入用户名/绑定手机号" class="xe-input-col2" v-model="searchform.loginAccount"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="enquiryForm">查询</el-button>
                    <el-button @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!--<div class="u-opera-btnBox">-->
            <!--<el-button><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        <!--</div>-->
        <el-table ref="tableDatas" :data="tableDatas" border v-loading="tableDataLoading" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  min-width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" min-width="55"></el-table-column>
            <el-table-column prop="loginAccount" label="用户名" min-width="150"></el-table-column>
            <el-table-column prop="mobile" label="绑定手机号" min-width="150">
            </el-table-column>
            <el-table-column prop="cardUnUsed" min-width="120" label="未使用"></el-table-column>
            <el-table-column prop="cardUsed" min-width="120" label="已使用">
            </el-table-column>
            <el-table-column prop="cardExpired" min-width="120" label="已过期">
            </el-table-column>
            <el-table-column prop="cardDel" min-width="120" label="已删除">
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
                tableDataLoading: false,
                searchform: {
                    loginAccount: ''
                },
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                productUrl: '/xe-route/xe-mis'
//            productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.enquiryForm();
            },
            goDetails(row) {
                this.$router.push({name: 'couponUserList_details', query: {loginAccount: row.loginAccount, mobile: row.mobile}});
            },
            handleSelectionChange() { // 导出数据
            },
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/userCoupon/listUserCard`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.listUserCard;
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
