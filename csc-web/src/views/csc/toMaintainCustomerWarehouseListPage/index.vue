
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>客户创建仓库</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                客户仓库筛选
            </p>
        </div>
        <el-form :inline="true"   :model = "filterModel" ref = "filterModel" :label-width = "xeLabelWidth">
            <div>
        	    <el-form-item label="客户名称" prop="customerpre">
        	        <el-select class = "xe-input3-col3"  v-model="filterModel.customerpre" filterable placeholder="请选择">
        	            <el-option
        	                v-for="item in customerlist"
        	                :label="item.customerName"
        	                :value="item.customerCode">
        	            </el-option>
        	        </el-select>
                    <!-- <select-two :url="selectTowUrl" v-model="filterModel.customerpre" class="xe-input-col2" placeholder="请选择"></select-two> -->
        	    </el-form-item>
        	    <el-form-item label="仓库名称" prop="warehouseCode">
                    <el-select class = "xe-input3-col3"   v-model="filterModel.warehouseCode" filterable placeholder="请选择">
                        <el-option
                            v-for="item in userTypes"
                            :label="item.display"
                            :value="item.value">
                        </el-option>
                    </el-select>
        	    </el-form-item>
        	    <el-form-item>
        	        <el-button type="primary" @click.prevent="filterForm">筛选</el-button>
        	        <el-button @click.prevent="resetForm('filterModel')">重置</el-button>
        	    </el-form-item>
        	</div>
        </el-form>
        <div class="xe-page-header">
            <p>
                客户仓库开通列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click="addStorehouseClick">添加</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="序号"
                    fixed="left"
                    min-width="65">
                    <template scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="客户编码"
                    prop="customerCode"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    prop="customerName"
                    label="客户名称"
                    min-width="230">
                    <template scope="scope">
                        {{scope.row.customerName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="storeHouseCode"
                    label="仓库编码"
                    min-width="90">
                    <template scope="scope">
                        {{scope.row.warehouseCode}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="storeHouseName"
                    label="仓库名称"
                    min-width="170">
                    <template scope="scope">
                        {{scope.row.warehouseName}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="storeHouseType"
                    label="类型"
                    min-width="160">
                    <template scope="scope">
                        {{scope.row.warehouseType}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="storeHouseAdress"
                    label="地址"
                    min-width="170">
                    <template scope="scope">
                        {{scope.row.warehouseAddress}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    min-width="80">
                    <template scope="scope">
                        <el-button
                        size="small"
                        type="text"
                        class="red"
                        @click="disableBtnClicks(scope)">作废</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handlpage"
                @current-change="handleSizeChange"
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
    import SelectTwo from '../../../components/selectTwo';
    export default {
        data() {
            return {
                customerlist: [], // 客户名称数据
                userTypes: [], // 仓库名称数据
                tableData: null, // 表格数据储存
                filterModel: {
                    customerpre: '',
                    warehouseCode: ''
                },
                selectTowUrl: '/page/csc/cscReceive/common/findAllCustomerInfo',
                currPage: 1,
                pageSize: 10,
                total: 0
            };
        },
        created() {
            this.getcusSelepre();
            this.requestTableData();
            this.getWarehouseName();
        },
        methods: {
            getWarehouseName() {
                let _this = this;
                _this.getcusSeleArr('/page/csc/custwarehouse/main/queryWarehouseNameList', function(res) {
                    _this.userTypes = res.result.result;
                    console.log('下拉仓库', _this.userTypes);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                // this.requestTableData();
            },
            getcusSelepre() {
                let _this = this;
                _this.getcusSeleArr('/page/csc/cscReceive/common/findAllCustomerInfo', function(res) {
                    _this.customerlist = res.result;
                });
            },
            filterForm() {
                this.requestTableData();
            },
            addStorehouseClick() {
                this.$router.push({name: 'toAddStorehouse'});
            },
            handleSizeChange(val) {
                this.requestTableData();
            },
            handlpage(val) {
                this.pageSize = val;
                this.requestTableData();
            },
            disableBtnClicks(scope) {
                let _this = this;
                this.disableUser(scope.row.customerName, {
                }, '/page/csc/custwarehouse/main/deleteCustomerWarehouseById/' + scope.row.id, () => {
                    if (_this.tableData.length === 1) {
                        _this.tableData = null;
                    }
                    this.requestTableData();
                }, '作废');
            },
            requestTableData() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/custwarehouse/main/queryCustomerWarehouseListWithPage',
                    data: {
                        'pageNum': _this.currPage,
                        'pageSize': _this.pageSize,
                        param: {
                            customerCode: _this.filterModel.customerpre,
                            warehouseCode: _this.filterModel.warehouseCode
                        }
                    }
                }).then((res) => {
                    console.log('====>6666>>>', res);
                    if (res.result.list) {
                        _this.total = res.result.total;
                        _this.tableData = res.result.list;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        components: {
            SelectTwo
        }
    };
</script>
