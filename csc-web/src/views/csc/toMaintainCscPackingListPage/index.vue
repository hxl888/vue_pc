<template lang="html">
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>包装档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                筛选条件
            </p>
        </div>
        <el-form :inline="true" label-width="100px" :model="packForm"  ref="packForm">
            <el-form-item label="包装代码" prop="packid">
                <el-input v-model="packForm.packid" class="xe-input3-col3"></el-input>
            </el-form-item>
            <el-form-item label="包装描述" prop="descr">
                <el-input v-model="packForm.descr" class="xe-input3-col3"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doSearch">筛选</el-button>
                <el-button type="primary" @click="resetForm('packForm')">重置</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="tableData" border style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column type="index" fixed='left'  label="序号" width='65'></el-table-column>
            <el-table-column property="packid" label="包装代码" min-width="150"></el-table-column>
            <el-table-column property="descr" label="包装描述" min-width="100"></el-table-column>
            <el-table-column property="packuom1" label="主单位" min-width=""></el-table-column>
            <el-table-column property="packuom2" label="内包装" min-width=""></el-table-column>
            <el-table-column property="qty2" label="内包装规格" min-width="100"></el-table-column>
            <el-table-column property="packuom3" label="箱" min-width=""></el-table-column>
            <el-table-column property="qty3" label="箱规格" min-width=""></el-table-column>
            <el-table-column property="packuom4" label="栈板" min-width=""></el-table-column>
            <el-table-column property="packuom5" label="其他" min-width=""></el-table-column>
            <el-table-column property="descr5" label="其他规格" min-width="100"></el-table-column>
            <el-table-column property="addwho" label="创建人" min-width=""></el-table-column>
            <el-table-column property="addtime" label="创建时间" min-width="170"></el-table-column>
            <el-table-column property="editwho" label="编辑人" min-width=""></el-table-column>
            <el-table-column property="edittime" label="编辑时间" min-width="170"></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template scope="scope">
                    <el-button type="text" size="small" @click.native.prevent="showDetails(scope.row)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentPage"
                :current-page="pagesect.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagesect.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="pagesect.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                packForm: {
                    packid: '',
                    descr: ''
                },
                pagesect: {
                    total: 0,
                    pageNum: 1,
                    pageSize: 20
                },
                tableData: [],
                multipleSelection: [],
                queryUrl: '',
                showUrl: ''
            };
        },
        created() {
            this.doSearch();
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.doSearch();
            },
            handleSizeChange() {},
            doSearch() {
                let _this = this;
                let params = {
                    pageNum: _this.pagesect.pageNum,
                    pageSize: _this.pagesect.pageSize,
                    param: _this.packForm
                };
                _this.getRequestTableData('/page/csc/packing/queryCscPackingListWithPage', params, function(res) {
                    console.log('res===>>>', res);
                    if (res.result.list) {
                        _this.tableData = res.result.list;
                    }
                });
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleCurrentPage(val) {
                if (val !== 0) {
                    this.packForm.pageNum = val;
                    // this.doSearch();
                }
            },
            showDetails(Id) {
                this.$router.push({name: 'viewPackingList', query: {Id: Id.id}});
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .forlis {
        width:400px;
    }
</style>
