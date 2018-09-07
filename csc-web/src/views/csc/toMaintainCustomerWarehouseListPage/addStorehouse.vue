
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainCustomerWarehouseListPage' }">客户创建仓库</el-breadcrumb-item>
                <el-breadcrumb-item>添加</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                客户仓库筛选
            </p>
        </div>
        <el-form :inline="true"  ref = "filterModel" :model = "filterModel" :label-width = "xeLabelWidth">
            <div>
        	    <el-form-item label="客户名称" prop="customerpre">
        	        <el-select class = "xe-input-col2" v-model="filterModel.customerpre" filterable placeholder="请选择">
        	            <el-option
        	                v-for="item in customerlist"
        	                :label="item.customerName"
        	                :value="item.customerCode">
        	            </el-option>
        	        </el-select>
        	    </el-form-item>
        	    <el-form-item label="客户编码" prop="customerpre">
        	        <el-input class = "xe-input-col2" disabled v-model="filterModel.customerpre" placeholder="请输入内容"></el-input>
        	    </el-form-item>
        	    <el-form-item>
        	        <el-button type="primary" @click="filterForm">筛选</el-button>
        	        <el-button @click="resetForm('filterModel')">重置</el-button>
        	    </el-form-item>
        	</div>
        </el-form>
        <div class="xe-page-header">
            <p>
                未开通仓库列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click="saveBtnClick">保存</el-button>
            <el-button type="primary" @click="backBtnClick">返回</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="选择"
                    min-width="100">
                    <template scope="scope">
                        <el-radio-group v-model="storeHouseRadio">
                            <!-- &nbsp; 无内容显示value值 暂时用空格代替-->
                            <el-radio :label="scope.$index">&nbsp;</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
                <el-table-column
                    label="仓库编码"
                    prop="warehouseCode"
                    min-width="170">
                    <template scope="scope">
                        {{scope.row.warehouseCode}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="warehouseName"
                    label="仓库名称"
                    min-width="170">
                    <template scope="scope">
                        {{scope.row.warehouseName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="warehouseType"
                    label="类型"
                    min-width="170">
                    <template scope="scope">
                        {{scope.row.warehouseType}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="warehouseAddress"
                    label="地址"
                    min-width="220">
                    <template scope="scope">
                        {{scope.row.warehouseAddress}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                customerlist: [],
                filterModel: {
                    customerpre: null
                },
                currPage: 1,
                pageSize: 10,
                total: 0,
                storeHouseRadio: '',
                tableData: []
            };
        },
        created() {
            this.getcusSelepre();
        },
        methods: {
            backBtnClick() {
                this.$router.go(-1);
            },
            getcusSelepre() {
                let _this = this;
                _this.getcusSeleArr('/page/csc/cscReceive/common/findAllCustomerInfo', function(res) {
                    _this.customerlist = res.result;
                });
            },
            saveBtnClick() {
                let _this = this;
                if (typeof _this.storeHouseRadio === 'number') {
                    let params = {};
                    params.customerCode = _this.filterModel.customerpre;
                    params.warehouseCode = _this.tableData[_this.storeHouseRadio].warehouseCode;
                    _this.$http({
                        method: 'POST',
                        url: '/page/csc/custwarehouse/main/addCustomerWarehouse',
                        data: params
                    }).then((res) => {
                        if (res.code === 200) {
                            // _this.$xeMessage('保存成功');
                        }
                        console.log('保存成功', res);
                    }).catch((err) => {
                        console.log(err);
                    });
                } else {
                    // _this.$xeMessage('请勾选要保存的客户资料');
                    _this.$alert('请勾选要保存的客户资料', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            filterForm() {
                let _this = this;
                if (_this.filterModel.customerpre) {
                    _this.requestTableData();
                } else {
                    // _this.$xeMessage('请选择客户名称');
                    _this.$alert('请选择客户名称', '提示', {
                        confirmButtonText: '确定',
                        type: 'error'
                    });
                }
            },
            handleSizeChange(page) {
                this.pageSize = page;
                this.requestTableData();
            },
            handleCurrentChange(page) {
                this.currPage = page;
                this.requestTableData();
            },
            requestTableData() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/custwarehouse/main/queryNotWarehouseListWithPage',
                    data: {
                        customerCode: _this.filterModel.customerpre,
                        pageNum: _this.currPage,
                        pageSize: _this.pageSize
                    }
                }).then((res) => {
                    if (res.result.list) {
                        console.log('表单获取数据', res);
                        _this.tableData = res.result.list;
                        _this.total = res.result.total;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
</script>
