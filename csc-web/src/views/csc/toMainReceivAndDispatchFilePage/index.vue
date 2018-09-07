<style rel="stylesheet/scss" lang="scss">

    .xe-page-content .xe-addbtn-panel {
        margin-top: -4px;
        padding-bottom: 16px;
    }
    .processList {
        .xe-input-col2{
            width: 200px !important
        }
    }

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>收发货方筛选</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                收发货方筛选
            </p>
        </div>
        <el-form :inline="true" class="processList"  ref = "filterFrom" :model = "filterModel" :label-width = "xeLabelWidth">
            <div>
                <el-form-item label="所属客户" prop="customerCode">
                    <el-select class = "xe-input3-col3" v-model="filterModel.customerCode" filterable placeholder="请选择">
                        <el-option
                            v-for="item in optionss"
                            :label="item.customerName"
                            :value="item.customerCode">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="类型" prop="type">
                    <el-select class = "xe-input3-col3" v-model="filterModel.type" filterable placeholder="请选择">
                        <el-option
                            v-for="item in type"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="contactCompanyName">
                    <el-input class = "xe-input3-col3" v-model="filterModel.contactCompanyName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="contactName">
                    <el-input class = "xe-input3-col3" v-model="filterModel.contactName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="联系人电话" prop="phone">
                    <el-input class = "xe-input3-col3" v-model="filterModel.phone" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="用途" prop="purpose">
                    <el-select class = "xe-input3-col3" v-model="filterModel.purpose" filterable placeholder="请选择">
                        <el-option
                            v-for="item in purpose"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="门店编码" prop="storeCode">
                    <el-input class = "xe-input3-col3" v-model="filterModel.storeCode" placeholder="请输入内容"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="filterForm('filterFrom')">筛选</el-button>
                    <el-button @click="resetForm('filterFrom')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="xe-page-header">
            <p>
                收发货方档案列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click.native="addProClick">添加</el-button>
        </div>
        <div>
            <!-- prop tableData的属性 -->
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    label="所属客户"
                    prop="customerName"
                    fixed='left'
                    min-width="140">
                </el-table-column>
                <el-table-column
                    prop="storeCode"
                    label="门店编码"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    prop="type"
                    label="类型"
                    class="typecell"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    prop="contactCompanyName"
                    label="名称"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="contactName"
                    label="联系人"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="联系电话"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="email"
                    label="Email"
                    min-width="90">
                </el-table-column>
                <el-table-column
                    prop="detailAddress"
                    label="地址"
                    show-overflow-tooltip
                    min-width="140">
                </el-table-column>
                <el-table-column
                    label="用途"
                    prop="purpose"
                    min-width="90">
                    <template scope="scope">
                        {{scope.row.purpose | purposeType}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="部门职务"
                    prop="contactJob"
                    min-width="70">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    min-width="120">
                    <template scope="scope">
                        <el-button class="xe-textBtn" type="text" size="small"  @click = "editProBtnClick(scope.row)">编辑</el-button><el-button class="red" type="text" size="small"  @click = "disableBtnClick(scope.row)">作废</el-button>
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
                dialogVisible: true,
                optionss: [],
                type: [],
                purpose: [],
                filterModel: {
                    customerCode: '',
                    type: '',
                    contactCompanyName: '',
                    contactName: '',
                    phone: '',
                    purpose: '',
                    storeCode: ''
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
            this.loadPurpose();
            this.requestTableData(this.currPage, this.filterModel);
        },
        filters: {
            purposeType(val) {
                let source = '';
                switch (val) {
                    case '1': {
                        source = '收货方';
                        break;
                    }
                    case '2': {
                        source = '发货方';
                        break;
                    }
                    case '3': {
                        source = '收发货方';
                        break;
                    }
                    case '4': {
                        source = '其他';
                        break;
                    }
                }
                return source;
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
                            _this.optionss.push({customerCode: res.result[i].customerCode, customerName: res.result[i].customerName});
                        }
                        // console.log(_this.optionss);
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
                    console.log(err);
                    // _this.$xeMessage({
                    //     type: 'error',
                    //     message: '服务器异常'
                    // });
                    // _this.$alert('服务器异常', '错误', {
                    //     confirmButtonText: '确定',
                    //     type: 'error'
                    // });
                });
            },
            loadCompanyType() { // 加载所属类型
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/common/findCscContactCompanyType'
                }).then((res) => {
                    if (res.code === 200) {
                        for (var i = 0; i < res.result.length; i++) {
                            _this.type.push({value: res.result[i].value, key: res.result[i].key});
                        }
                        // console.log(_this.type);
                    } else {
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$alert('服务器异常', '错误', {
                    //     confirmButtonText: '确定',
                    //     type: 'error'
                    // });
                });
            },
            loadPurpose() { // 加载所属用途
                let _this = this;
//                console.log(_this.addForm);
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/common/findCcsContactPurpose'
                }).then((res) => {
                    if (res.code === 200) {
                        for (var i = 0; i < res.result.length; i++) {
                            _this.purpose.push({value: res.result[i].value, key: res.result[i].key});
                        }
                        // console.log(_this.purpose);
                    } else {
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                    // _this.$alert('服务器异常', '错误', {
                    //     confirmButtonText: '确定',
                    //     type: 'error'
                    // });
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.requestTableData(this.currPage, this.filterModel);
            },

            filterForm() {
                this.requestTableData(this.currPage, this.filterModel);
            },

            addProClick() {
                this.$router.push({name: 'toAddprocess'});
            },

            disableBtnClick(scope) {
                this.disableUser(scope.customerName, {
                    'userId': scope.id
                }, '/page/csc/cscReceive/main/deleteReceiveById/' + scope.id, () => {
                    this.requestTableData(this.currPage, this.filterModel);
                }, '作废');
            },
            editProBtnClick(rowData) {
                this.$router.push({name: 'toAddprocess', query: {id: rowData.id, type: 'edit'}});
            },

            handleSizeChange(page) {
                this.pageSize = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            handleCurrentChange(page) {
                console.log(`当前页: ${page}`);
                this.currPage = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            requestTableData(postNum, postData) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/csc/cscReceive/main/queryReceiveListWithPage',
                    data: {
                        'pageNum': postNum,
                        'pageSize': _this.pageSize,
                        'param': postData
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.code === 200) {
                        _this.total = res.result.list.total;
                        _this.tableData = res.result.list;
                    } else {
                        console.log(res.message);
                        // _this.$xeMessage({
                        //     type: 'error',
                        //     message: res.message
                        // });
                        _this.$alert(res.message, '错误', {
                            confirmButtonText: '确定',
                            type: 'error'
                        });
                        // _this.filterModel = {
                        //     customerCode: '',
                        //     type: '',
                        //     contactCompanyName: '',
                        //     contactName: '',
                        //     phone: '',
                        //     purpose: '',
                        //     storeCode: ''
                        // };
                    }
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
</script>
