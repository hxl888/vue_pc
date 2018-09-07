<template lang="html">
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>供应商档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                筛选条件
            </p>
        </div>
        <el-form :inline="true" :model="supplierForm" ref="supplierForm" label-width="100px">
            <div class="xe-adaption">
                <el-form-item label="客户名称" prop="customerCode">
                    <el-select v-model="supplierForm.customerCode" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in customerNameList"
                            :label="item.customerName"
                            :value="item.customerCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="供应商编码" prop="supplierCode">
                    <el-input v-model="supplierForm.supplierCode" class="xe-input3-col3"></el-input>
                </el-form-item>
                <el-form-item label="供应商名称" prop="supplierName">
                    <el-input v-model="supplierForm.supplierName" class="xe-input3-col3"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="startQuery">筛 选</el-button>
                    <el-button @click="resert('supplierForm')">重 置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="xe-page-header">
            <p>
                供应商列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click="addSupplier">添 加</el-button>
        </div>
        <el-table :data="tableData" style="width:100%;" border>
            <el-table-column fixed='left' type="index" label="序号" width="65">
            </el-table-column>
            <el-table-column  prop="customerName" label="客户名称" min-width="200">
                <template scope="scope">
                    {{scope.row.customerName}}
                </template>
            </el-table-column>
            <el-table-column prop="supplierCode" label="供应商编码" min-width="120">
                <template scope="scope">
                    <router-link class = "xe-router-link" :to="{ name:'curNamelist', query: {serialNo: scope.row.serialNo}}">
                        {{scope.row.supplierCode}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="supplierName" label="供应商名称" min-width="210">
                <template scope="scope">
                    <router-link class = "xe-router-link" :to="{ name:'curNamelist', query: {serialNo: scope.row.serialNo}}">
                        {{scope.row.supplierName}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="supplierIndustry" label="所属行业" min-width="150">
                <template scope="scope">
                    {{scope.row.supplierIndustry}}
                </template>
            </el-table-column>
            <el-table-column prop="supplierProduct" label="供应产品" min-width="120">
                <template scope="scope">
                    {{scope.row.supplierProduct}}
                </template>
            </el-table-column>
            <el-table-column prop="supplierRemark" label="备注" min-width="120">
                <template scope="scope">
                    {{scope.row.supplierRemark}}
                </template>
            </el-table-column>
            <el-table-column label="操作" min-width="120" fixed='right'>
                <template scope="scope">
                    <el-button
                        class="xe-textBtn"
                        size="small"
                        type="text"
                        @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="text"
                        class="red"
                        @click="handleDelete(scope)">作废</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                customerNameList: [], // 客户名称下拉菜单
                supplierForm: {
                    customerCode: '',
                    supplierCode: '',
                    supplierName: ''
                },
                tableData: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                customerNameLists: [{
                    customerName: '6',
                    customerCode: '888'
                },
                {
                    customerName: '8',
                    customerCode: '898'
                }]
            };
        },
        created() {
            this.getcusSeleprelis();
            this.userFomrget();
        },
        methods: {
            startQuery() {
                this.userFomrget();
            },
            userFomrget() {
                let _this = this;
                let param = {};
                param.pageNum = _this.pageInfo.pageNum;
                param.pageSize = _this.pageInfo.pageSize;
                param.param = _this.supplierForm;
                // 表单信息调取接口
                _this.getRequestTableData('/page/csc/supplier/oper/queryOperSupplierListWithPage', param, function(res) {
                    console.log(res);
                    if (res.result.list) {
                        _this.tableData = res.result.list;
                        _this.pageInfo.total = res.result.total;
                    } else {
                        // _this.$xeMessage('未查到供应商信息');
                        _this.$alert('未查到供应商信息', '提示', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                });
            },
            resert(formName) {
                this.$refs[formName].resetFields();
            },
            handleEdit(val) {
                this.$router.push({name: 'toEditSupplier', query: {serialNo: val.serialNo}});
            },
            addSupplier() {
                this.$router.push({name: 'addSupplierlist'});
            },
            handleDelete(scope) {
                let _this = this;
                this.disableUser(scope.row.customerName, {
                }, '/page/csc/supplier/main/deleteCscSupplierById/' + scope.row.id, () => {
                    if (_this.tableData.length === 1) {
                        _this.tableData = null;
                    }
                    this.userFomrget();
                }, '作废');
            },
            getcusSeleprelis() {
                let _this = this;
                _this.getcusSeleArr('/page/csc/cscReceive/common/findAllCustomerInfo', function(res) {
//                    console.log('res===>>>', res);
                    _this.customerNameList = res.result;
                });
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.userFomrget();
            },
            handleCurrentChange(val) {
                var _this = this;
                if (_this.pageInfo.pageNum !== 0) {
                    _this.pageInfo.pageNum = val;
                    _this.userFomrget();
                }
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
