<style rel="stylesheet/scss" lang="scss">
    .xe-page-content .xe-addbtn-panel {
        margin-top: -4px;
        padding-bottom: 16px;
    }
</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>货品档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                筛选条件
            </p>
        </div>
        <el-form :inline="true"  ref = "filterFrom" :model = "filterModel" :label-width = "xeLabelWidth">
            <div class="xe-adaption">
                <el-form-item label="所属客户" prop="customerCode">
                    <el-select class = "xe-input3-col3" v-model="filterModel.customerCode" filterable placeholder="请选择">
                        <el-option
                            v-for="item in cunstomerCodes"
                            :label="item.customerName"
                            :value="item.customerCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="条形码" prop="barCodeId">
                    <el-input class = "xe-input3-col3" v-model="filterModel.barCodeId" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="货品种类" prop="goodsTypeId">
                    <el-select class = "xe-input3-col3" v-model="filterModel.goodsTypeId" filterable placeholder="请选择" @change="loadGoodsTypeList(filterModel.goodsTypeId)">
                        <el-option
                            v-for="item in type"
                            :label="item.goodsTypeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货品小类" prop="goodsType2">
                    <el-select class = "xe-input3-col3" v-model="filterModel.goodsType2" filterable placeholder="请选择">
                        <el-option
                            v-for="item in goodsTypeList"
                            :label="item.goodsTypeName"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="货品编码" prop="goodsCode">
                    <el-input class = "xe-input3-col3" v-model="filterModel.goodsCode" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="货品名称" prop="goodsName">
                    <el-input class = "xe-input3-col3" v-model="filterModel.goodsName" placeholder="请输入内容"></el-input>
                </el-form-item>
            </div>
            <el-form-item label=" ">
                <el-button type="primary" @click="filterForm('filterFrom')">筛选</el-button>
                <el-button @click="resetForm('filterFrom')">重置</el-button>
            </el-form-item>
        </el-form>
        <div class="xe-page-header">
            <p>
                货品列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click="addGoodsClick">添加</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="序号"
                    fixed='left'
                    min-width="65">
                    <template scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="所属客户"
                    prop="customerName"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="goodsTypeName"
                    label="货品种类"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    prop="smallGoodsTypeName"
                    label="货品小类"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    prop="goodsCode"
                    label="货品编码"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    prop="goodsName"
                    label="货品名称"
                    show-overflow-tooltip
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="specification"
                    label="规格"
                    show-overflow-tooltip
                    min-width="70">
                </el-table-column>
                <el-table-column
                    prop="unit"
                    label="单位"
                    min-width="65">
                </el-table-column>
                <el-table-column
                    prop="barCodeId"
                    label="条形码"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    label="状态"
                    prop="state"
                    min-width="70">
                    <template scope="scope">
                        {{scope.row.state | statusToChinese}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    min-width="120">
                    <template scope="scope">
                        <el-button class="xe-textBtn" type="text" size="small" @click = "editGoodsBtnClick(scope.row)">编辑</el-button><el-button class="red" type="text" size="small"  @click = "disableBtnClick(scope.row)">作废</el-button>
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
                cunstomerCodes: [],
                type: [],
                goodsTypeList: [],
                filterModel: {
                    customerCode: '',
                    barCodeId: '',
                    goodsTypeId: '',
                    goodsType2: '',
                    goodsCode: '',
                    goodsName: ''
                },
                currPage: 1,
                pageSize: 10,
                total: 0,
                tableData: []
            };
        },
        created() {
            this.loadCustomerName();
            this.loadCompanyType();
            this.loadGoodsTypeList(this.filterModel.goodsTypeId);
            this.requestTableData(this.currPage, this.filterModel);
        },
        filters: {
            statusToChinese(val) {
                let state = '';
                if (val === '1') {
                    state = '正常';
                } else {
                    state = '停用';
                }
                return state;
            }
        },
        methods: {
            loadCustomerName() { // 加载所属客户数据
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/common/findAllCustomerInfo'
                }).then((res) => {
                    if (res.code === 200) {
//                        console.log(res.result);
                        for (var i = 0; i < res.result.length; i++) {
                            _this.cunstomerCodes.push({customerCode: res.result[i].customerCode, customerName: res.result[i].customerName});
                        }
                        // console.log(_this.cunstomerCodes);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
//                        console.log('res.message--->', res.message);
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                });
            },
            loadCompanyType() { // 加载货品种类类型
                let _this = this;
                // var tmps = [];
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/goods/common/queryGoodsType'
                }).then((res) => {
                    if (res.code === 200) {
                        for (var i = 0; i < res.result.length; i++) {
                            _this.type.push({id: res.result[i].id, goodsTypeName: res.result[i].goodsTypeName});
                        }
                        // _this.type = tmps;
                        // console.log(_this.goodsTypeId);
                    } else {
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log('====>err', err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                });
            },
            loadGoodsTypeList(pid) { // 加载货品小类类型
                let _this = this;
//                console.log(pid);
                var tmp = [];
                if (pid) {
                    _this.$http({
                        method: 'POST',
                        url: '/page/csc/goods/common/queryCscGoodsTypeList/' + pid
                    }).then((res) => {
//                        console.log('---->', res.result);
                        if (res.result) {
                            for (var i = 0; i < res.result.length; i++) {
                                tmp.push({id: res.result[i].id, goodsTypeName: res.result[i].goodsTypeName});
                            }
                            _this.goodsTypeList = tmp;
                            // 默认选中小类第一条
                            if (tmp) {
                                this.filterModel.goodsType2 = tmp[0].id;
                            }
                            // console.log(_this.goodsTypeId);
                        } else {
                            // _this.$xeMessage({
                            //     type: 'error',
                            //     message: res.message
                            // });
                            _this.$alert(res.message, '错误', {
                                confirmButtonText: '确定',
                                type: 'error'
                            });
                        }
                    }).catch((err) => {
                        console.log('err>>>', err);
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: err.message
                        // });
                        // _this.$alert(err.message, '错误', {
                        //     confirmButtonText: '确定',
                        //     type: 'error'
                        // });
                    });
                } else {
                    _this.goodsTypeList = tmp;
                    this.filterModel.goodsType2 = '';
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.requestTableData(this.currPage, this.filterModel);
            },

            filterForm() {
                this.requestTableData(this.currPage, this.filterModel);
            },

            addGoodsClick() {
                this.$router.push({name: 'toAddGoods'});
            },

            disableBtnClick(scope) {
                this.disableUser(scope.customerName, {
                    'status': 'DISABLE',
                    'userId': scope.id
                }, '/page/csc/goods/delete/deleteCscGoods/' + scope.id, () => {
                    this.requestTableData(this.currPage, this.filterModel);
                }, '作废');
            },

            editGoodsBtnClick(rowData) {
//                console.log(rowData.id);
                this.$router.push({name: 'toAddGoods', query: {id: rowData.id, type: 'edit'}});
            },

            handleSizeChange(page) {
                this.pageSize = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            handleCurrentChange(page) {
                this.currPage = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            requestTableData(postNum, postData) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/customer/main/queryGoodsListWithPage',
                    data: {
                        'pageNum': postNum,
                        'pageSize': _this.pageSize,
                        'param': postData
                    }
                }).then((res) => {
//                    console.log(res);
                    if (res.result.list) {
                        _this.total = res.result.total;
                        _this.tableData = res.result.list;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
</script>
