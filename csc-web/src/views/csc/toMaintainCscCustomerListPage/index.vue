<style>
</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>客户档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                筛选条件
            </p>
        </div>
        <el-form :inline="true" :model="roleForm" ref="roleForm" label-width="100px">
            <div class="xe-adaption">
                <el-form-item label="公司名称" prop="customerName">
                    <el-input v-model="roleForm.customerName" class="xe-input3-col3"></el-input>
                </el-form-item>
                <el-form-item label="类型"  prop="companyType">
                    <el-select v-model="roleForm.companyType" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in companyTypeList"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="渠道"  prop="channel">
                    <el-select v-model="roleForm.channel" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in channelTypeList"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="产品类别" prop="productType">
                    <el-select v-model="roleForm.productType" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in productTypeList"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="客户经理" prop="customerManager">
                    <el-input v-model="roleForm.customerManager" class="xe-input3-col3"></el-input>
                </el-form-item>
                <el-form-item label="申请认证名称" prop="authCreateUserName">
                    <el-input v-model="roleForm.authCreateUserName" class="xe-input3-col3"></el-input>
                </el-form-item>
                <el-form-item label="认证状态" prop="authState">
                    <el-select v-model="roleForm.authState" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in authStateList"
                            :label="item.value"
                            :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属集团" prop="cliquesSerialNo">
                    <el-select v-model="roleForm.cliquesSerialNo" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in cliquesSerialNoList"
                            :label="item.name"
                            :value="item.serialNo">
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div>
                <el-form-item label=" ">
                    <el-button type="primary" @click="startQuery">筛 选</el-button>
                    <el-button @click="resetBtn('roleForm')">重 置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="xe-page-header">
            <p>
                客户档案列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click="toAddCustomerFn">添 加</el-button>
        </div>
        <el-table :data="tableData" style="width:100%;" border :empty-text='emptyText'>
            <el-table-column fixed="left" label="序号" type="index" min-width="80"></el-table-column>
            <el-table-column prop="type" label="类型" min-width="70"></el-table-column>
            <el-table-column prop="customerCode" label="客户编码" min-width="100"></el-table-column>
            <el-table-column prop="customerName" label="公司名称" min-width="200"></el-table-column>
            <el-table-column prop="cliquesName" label="所属集团" min-width="200"></el-table-column>
            <el-table-column prop="channel" label="渠道" min-width="150">
                <template scope="scope">
                    {{scope.row.channel | statusToChinese}}
                </template>
            </el-table-column>
            <el-table-column prop="authState" label="认证状态" min-width="150">
                <template scope="scope">
                    {{scope.row.authState | authStateToChinese}}
                </template>
            </el-table-column>
            <el-table-column prop="productType" label="产品类别" min-width="160">
                <template scope="scope">
                    {{scope.row.productType | productTypeToChinese}}
                </template>
            </el-table-column>
            <el-table-column prop="product" label="产品" min-width="160"></el-table-column>
            <el-table-column prop="customerManager" label="客户经理" min-width="150"></el-table-column>
            <el-table-column prop="authCreateUserName" label="申请认证名称" min-width="160"></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="70">
                <template scope="scope">
                    <el-button
                            size="small"
                            type="text"
                            @click="handleEdit(scope.row)">编辑</el-button>
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
            roleForm: {
                customerName: '',
                productType: '',
                companyType: '',
                channel: '',
                authState: '',
                customerManager: '',
                authCreateUserName: '',
                membershipGroup: '',
                cliquesSerialNo: ''
            },
            pageInfo: {
                total: 0,
                pageNum: 1,
                pageSize: 10
            },
            channelTypeList: [],
            productTypeList: [],
            companyTypeList: [],
            authStateList: [],
            tableData: [],
            emptyText: '',
            currentPage: 5,
            pageUrl: {
                queryCustomerPageList: '/page/csc/customer/main/queryCustomerPageList',
                queryChannerTypePageUrl: '/page/csc/customer/auth/toAuth',
                deleteFileUrl: '/page/csc/customer/common/deleteImg'
            },
            cliquesSerialNoList: []
        };
    },
    created() {
        this.getCompanyTypeList();
        this.getRequestTypeList();
        this.getCertificationList();
        this.getGroupList();
        this.queryDataFn();
    },
    filters: {
        productTypeToChinese(val) {
            let state = '';
            switch (val) {
                case 'RESTAURANT': {
                    state = '畜禽类';
                    break;
                }
                case 'DEEPFREEZE': {
                    state = '速冻类';
                    break;
                }
                case 'AGRICULTURE': {
                    state = '农产品';
                    break;
                }
                case 'MILK': {
                    state = '乳制品';
                    break;
                }
                case 'WATER': {
                    state = '水产品';
                    break;
                }
                case 'MEDICINE': {
                    state = '医药';
                    break;
                }
                case 'ELECTRONICS': {
                    state = '电子';
                    break;
                }
                case 'OTHER': {
                    state = '其他';
                    break;
                }
            }
            return state;
        },
        authStateToChinese(val) {
            let state = '';
            switch (val) {
                case '0': {
                    state = '未认证';
                    break;
                }
                case '1': {
                    state = '认证中';
                    break;
                }
                case '2': {
                    state = '认证失败';
                    break;
                }
                case '3': {
                    state = '认证成功';
                    break;
                }
            }
            return state;
        },
        statusToChinese(val) {
            let state = '';
            switch (val) {
                case 'INDUSTRY': {
                    state = '工业渠道';
                    break;
                }
                case 'FARMERS': {
                    state = '商贸批发';
                    break;
                }
                case 'RESTAURANT': {
                    state = '餐饮团膳';
                    break;
                }
                case 'KA': {
                    state = 'KA商超';
                    break;
                }
                case 'BUSINESS_ELECTRON': {
                    state = '进口贸易商';
                    break;
                }
                case 'OTHER': {
                    state = '其他渠道';
                    break;
                }
            }
            return state;
        }
    },
    methods: {
        handleEdit(val) {
            console.log(val);
            this.$router.push({name: 'editRecord', query: {id: val.id}});
        },
        queryDataFn() {
            let _this = this;
            let param = {};
            param.param = _this.roleForm;
            param.pageNum = _this.pageInfo.pageNum;
            param.pageSize = _this.pageInfo.pageSize;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/main/queryCustomerPageList',
                data: param
            }).then((res) => {
                console.log('====>>>>', res);
                _this.tableData = res.result.list;
                _this.pageInfo.total = res.result.total;
                _this.pageInfo.pageNum = res.result.pageNum;
                _this.pageInfo.pageSize = res.result.pageSize;
            }).catch((err) => {
                console.log(err);
            });
        },
        toAddCustomerFn() {
            this.$router.push({name: 'toClient'});
        },
        startQuery() {
            this.queryDataFn();
        },
        getCompanyTypeList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/main/toCscCustomerListPage'
            }).then((res) => {
                console.log(res);
                this.channelTypeList = res.result.channelType;
                this.productTypeList = res.result.productType;
            }).catch((err) => {
                console.log(err);
            });
        },
        getRequestTypeList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/cscReceive/common/findCscContactCompanyType'
            }).then((res) => {
                console.log(res);
                this.companyTypeList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        getCertificationList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/findCscCusAuthStatus'
            }).then((res) => {
                console.log(res);
                this.authStateList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
//        所属集团
        getGroupList() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/csc/customer/common/queryAllClique'
            }).then((res) => {
                console.log(res);
                this.cliquesSerialNoList = res.result;
            }).catch((err) => {
                console.log(err);
            });
        },
        getProductTypeList() {
            let _this = this;
            this.$http({
                method: 'post',
                url: _this.pageUrl.queryChannerTypePageUrl
            }).then(function (res) {
                _this.isDisabled = false;
                _this.loading = false;
                if (!res.result.length) {
                    _this.emptyText = '暂无数据';
                }
                _this.productType = res.result;
                _this.channelType = res.result;
            }).catch(function () {
                _this.loading = false;
                _this.emptyText = '请求失败,请重新刷新页面...';
            });
        },
        getAuthStateList() {
            let _this = this;
            this.$http({
                method: 'post',
                url: _this.pageUrl.queryChannerTypePageUrl
            }).then(function (res) {
                _this.isDisabled = false;
                _this.loading = false;
                if (!res.result.length) {
                    _this.emptyText = '暂无数据';
                }
                _this.companyTyep = res.result;
            }).catch(function () {
                _this.loading = false;
                _this.emptyText = '请求失败,请重新刷新页面...';
            });
        },
        resetBtn(formName) {
            console.log(formName);
            this.$refs[formName].resetFields();
            this.queryDataFn();
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.queryDataFn();
        },
        handleCurrentChange(val) {
            var _this = this;
            if (_this.pageInfo.pageNum !== 0) {
                _this.pageInfo.pageNum = val;
                _this.queryDataFn();
            }
        }
    }
};
</script>
