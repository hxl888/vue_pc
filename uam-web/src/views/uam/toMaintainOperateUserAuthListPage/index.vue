<style rel="stylesheet/scss" lang="scss">

    .xe-page-content {

        padding: 8px 16px 24px;
    }

    .xe-page-content .xe-addbtn-panel {

        padding-bottom: 15px;
    }

</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>运营认证</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>筛选条件</p>
        </div>
        <el-form :inline="true" ref = "formInline"  :model="formInline" :label-width="xeLabelWidth">
            <div class="xe-adaption">
                <el-form-item label="用户状态" prop="statusCode">
                    <el-select class="xe-input3-col3" v-model="formInline.statusCode" placeholder="请选择" clearable>
                        <el-option
                            v-for="item in userStateOption"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" prop="userName">
                    <el-input class="xe-input3-col3" v-model="formInline.userName" placeholder="姓名"></el-input>
                </el-form-item>
                <el-form-item label="登录名" prop="loginName">
                    <el-input class = "xe-input3-col3" v-model="formInline.loginName" placeholder="登录名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="mobileNo">
                    <el-input class = "xe-input3-col3" v-model="formInline.mobileNo" placeholder="手机号"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="onSearchSubmit">筛选</el-button>
                    <el-button @click="resetForm('formInline')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div  class="xe-page-header">
            <p>用户审核列表</p>
        </div>
        <template>
            <el-table
                    :data="tableData"
                    border
                    :emptyText = "emptyText"
                    style="width: 100%">
                <el-table-column
                        label="序号"
                        width="70">
                    <template scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="statusCode"
                        label="认证状态"
                        min-width="85">
                    <template scope="scope">
                        {{scope.row.statusCode | statusToChinese}}
                    </template>
                </el-table-column>
                <el-table-column
                        prop="systemName"
                        label="用户类型"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        fixed
                        prop="loginName"
                        label="登录名"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="userName"
                        label="姓名"
                        min-width="100">
                </el-table-column>
                <el-table-column
                        prop="mobileNo"
                        label="手机号"
                        min-width="120">
                </el-table-column>
                <el-table-column
                        prop="groupName"
                        label="所属组织"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="registTime"
                        label="注册时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="operateTime"
                        label="认证时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        prop="approvalTime"
                        label="审核时间"
                        min-width="150">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="70">
                    <template scope="scope">
                        <el-button
                                size="small"
                                type="text"
                                @click="handleVerify(scope.row)"
                                v-if="scope.row.statusCode == 200"
                        >审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="xe-pagination-panel">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="formInline.pageNum"
                    :page-sizes="xePageSizes"
                    :page-size="formInline.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="formInline.total">
                </el-pagination>
            </div>
        </template>
    </div>
</template>
<style>

</style>
<script>
    export default {
        data() {
            return {
                formInline: {
                    statusCode: '',
                    userName: '',
                    loginName: '',
                    mobileNo: '',
                    currPage: 1,
                    pageSize: 10,
                    total: 0
                },
                emptyText: '',
                userStateOption: [{
                    value: '100',
                    label: '未认证'
                },
                {
                    value: '200',
                    label: '认证中'
                },
                {
                    value: '300',
                    label: '驳回'
                }],
                show: true,
                tableData: [],
                pageUrl: {
                    toAuthenticateUrl: 'toAuthenticate'
                }
            };
        },

        created() {
            this.requestTableData();
        },

        filters: {
            statusToChinese(val) {
                let statusCode = '';
                switch (val) {
                    case '100': {
                        statusCode = '未认证';
                        break;
                    }
                    case '200': {
                        statusCode = '认证中';
                        break;
                    }
                    case '300': {
                        statusCode = '驳回';
                        break;
                    }
                    case '400': {
                        statusCode = '已认证';
                        break;
                    }
                }
                return statusCode;
            }
        },

        methods: {
            onSearchSubmit() {
                this.requestTableData();
            },

            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.requestTableData();
            },

            handleVerify(rowData) {
                this.$router.push({name: 'toAuthenticate', query: rowData});
            },

            requestTableData() {
                let _this = this;
                let dataList = {};
                dataList.pageNum = _this.formInline.pageNum;
                dataList.pageSize = _this.formInline.pageSize;
                dataList.param = _this.formInline;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/approve/queryOperateUserAuthListWithPage',
                    data: dataList
                }).then((res) => {
                    _this.tableData = res.result.list;
                    _this.formInline.total = res.result.total;
                    _this.formInline.pageNum = res.result.pageNum;
                    _this.formInline.pageSize = res.result.pageSize;
                }).catch((err) => {
                    console.log(err);
                });
            },

            handleSizeChange(val) {
                this.formInline.pageSize = val;
                this.requestTableData();
            },

            handleCurrentChange(val) {
                this.formInline.pageNum = val;
                this.requestTableData();
            }
        }
    };
</script>
