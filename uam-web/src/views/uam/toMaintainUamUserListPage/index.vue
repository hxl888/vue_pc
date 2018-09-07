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
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                筛选条件
            </p>
        </div>
        <el-form :inline="true"  ref = "filterFrom" :model = "filterModel" :label-width = "xeLabelWidth">
            <div class="xe-adaption">
                <el-form-item label="用户类型" prop="type">
                    <el-select class = "xe-input3-col3" v-model="filterModel.type" filterable placeholder="请选择">
                        <el-option
                            v-for="item in userTypes"
                            :label="item.value"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="用户状态" prop="status">
                    <el-select class = "xe-input3-col3" v-model="filterModel.status" filterable placeholder="请选择">
                        <el-option
                            v-for="item in userState"
                            :label="item.value"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="登录名" prop="loginName">
                    <el-input class = "xe-input3-col3" v-model="filterModel.loginName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName">
                    <el-input class = "xe-input3-col3" v-model="filterModel.userName" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobileNo">
                    <el-input class = "xe-input3-col3" v-model="filterModel.mobileNo" placeholder="请输入内容"></el-input>
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
                用户列表
            </p>
        </div>
        <div class="xe-addbtn-panel">
            <el-button type="primary" @click="addUserClick">添加</el-button>
        </div>
        <div>
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                    fixed
                    prop="loginName"
                    label="登录名"
                    min-width="120">
                    <template scope="scope">
                        <router-link class = "xe-router-link" :to="{ name:'toDetailsUser', query: scope.row}">
                            {{scope.row.loginName}}
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                    label="序号"
                    min-width="80">
                    <template scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态"
                    min-width="80">
                    <template scope="scope">
                        {{scope.row.status | statusToChinese}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="userSource"
                    label="入口"
                    min-width="120">
                    <template scope="scope">
                        {{scope.row.userSource | userSourceToChinese}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="typeDesc"
                    label="用户类型"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="mobileNo"
                    label="联系电话"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="userCode"
                    label="工号"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="userName"
                    label="姓名"
                    min-width="120">
                </el-table-column>
                <el-table-column
                    prop="createdTime"
                    label="注册时间"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="updateTime"
                    label="修改时间"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    prop="lastLoginTime"
                    label="上次登录时间"
                    min-width="200">
                </el-table-column>
                <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="270">
                    <template scope="scope">
                        <el-button class="xe-textBtn xe-textbtn-danger" type="text" size="small" v-if = "scope.row.disableBtn" @click = "disableBtnClick(scope.row)">禁用</el-button>
                        <el-button class="xe-textBtn" type="text" size="small" v-if = "scope.row.enableBtn" @click = "enableBtnClick(scope.row)">启用</el-button>
                        <el-button class="xe-textBtn" type="text" size="small" v-if = "scope.row.modifyBtn" @click = "editUserBtnClick(scope.row)">修改</el-button>
                        <el-button class="xe-textBtn" type="text" size="small" v-if = "scope.row.bindBtn && scope.row.id !== userInfo.userId" @click = "bindBtnClick(scope.row)">角色绑定</el-button>
                        <el-button type="text" size="small" v-if = "scope.row.passwordBtn" @click = "passwordBtnClick(scope.row)">修改密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currPage"
                :page-sizes="xePageSizes"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {getNowCookie} from 'xcms-common-plugins/src/utils/';
    export default {
        data() {
            return {
                dialogVisible: true,
                userTypes: [
                    {
                        code: '1000',
                        value: '运营'
                    },
                    {
                        code: '2000',
                        value: '伙伴'
                    },
                    {
                        code: '3000',
                        value: '客户'
                    }
                ],
                userState: [
                    {
                        code: 'THROUGH',
                        value: '通过'
                    },
                    {
                        code: 'NOT_THROUGH',
                        value: '未通过'
                    },
                    {
                        code: 'DISABLE',
                        value: '禁用'
                    }
                ],
                filterModel: {
                    type: '',
                    status: '',
                    loginName: '',
                    userName: '',
                    mobileNo: ''
                },
                currPage: 1,
                pageSize: 10,
                total: 0,
                tableData: [],
                userInfo: getNowCookie().userInfo
            };
        },
        created() {
            this.requestTableData(this.currPage, this.filterModel);
        },
        filters: {
            statusToChinese(val) {
                let state = '';
                switch (val) {
                    case 'THROUGH': {
                        state = '通过';
                        break;
                    }
                    case 'NOT_THROUGH': {
                        state = '未通过';
                        break;
                    }
                    case 'ENABLE': {
                        state = '启用';
                        break;
                    }
                    case 'DISABLE': {
                        state = '禁用';
                        break;
                    }
                }
                return state;
            },
            userSourceToChinese(val) {
                let source = '';
                switch (val) {
                    case 'INSERT': {
                        source = '后台新增';
                        break;
                    }
                    case 'REGISTER': {
                        source = '注册';
                        break;
                    }
                    case 'APP': {
                        source = '手机';
                        break;
                    }
                    case 'PC': {
                        source = '电脑';
                        break;
                    }
                }
                return source;
            }
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.requestTableData(this.currPage, this.filterModel);
            },

            filterForm() {
                this.requestTableData(this.currPage, this.filterModel);
            },

            addUserClick() {
                this.$router.push({name: 'toAddUser'});
            },

            disableBtnClick(scope) {
                this.disableUser(scope.loginName, {
                    'status': 'DISABLE',
                    'userId': scope.id
                }, '/page/uam/user/main/modifyUserStatusById', () => {
                    this.requestTableData(this.currPage, this.filterModel);
                });
            },

            enableBtnClick(scope) {
                this.enableUser(scope.loginName, {
                    'status': 'THROUGH',
                    'userId': scope.id
                }, '/page/uam/user/main/modifyUserStatusById', () => {
                    this.requestTableData(this.currPage, this.filterModel);
                });
            },

            editUserBtnClick(rowData) {
                this.$router.push({name: 'toEditUser', query: rowData});
            },

            bindBtnClick(rowData) {
                this.$router.push({name: 'toBindRole', query: rowData});
            },

            passwordBtnClick(rowData) {
                this.$router.push({name: 'toModifyPassword', query: rowData});
            },

            handleSizeChange(page) {
                this.pageSize = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            handleCurrentChange(page) {
                this.currPage = page;
                this.requestTableData(this.currPage, this.filterModel);
            },
            rowCallBack(row, index) {
//                暂时这么写以后找时间优化
                if (row.loginName === 'admin') {
                    row.disableBtn = false;
                    row.enableBtn = false;
                    row.modifyBtn = false;
                    row.bindBtn = false;
                    row.passwordBtn = false;
                } else if (row.status === 'NOT_THROUGH') {
                    row.disableBtn = false;
                    row.enableBtn = false;
                    row.modifyBtn = false;
                    row.bindBtn = false;
                    row.passwordBtn = true;
                } else if (row.status === 'THROUGH') {
                    row.disableBtn = true;
                    row.enableBtn = false;
                    row.modifyBtn = true;
                    row.bindBtn = true;
                    row.passwordBtn = true;
                } else if (row.status === 'DISABLE') {
                    row.disableBtn = false;
                    row.enableBtn = true;
                    row.bindBtn = true;
                    row.passwordBtn = true;
                }
            },
            requestTableData(postNum, postData) {
                console.log(postData);
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/user/main/queryUserListWithPage',
                    data: {
                        'pageNum': postNum,
                        'pageSize': _this.pageSize,
                        'param': postData
                    }
                }).then((res) => {
                    _this.total = res.result.list.total;
                    for (var key in res.result.list.list) {
                        _this.rowCallBack(res.result.list.list[key]);
                    }
                    _this.tableData = res.result.list.list;
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };
</script>
