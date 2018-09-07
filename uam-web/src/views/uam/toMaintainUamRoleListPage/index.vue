<style>


</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :inline="true" :model="roleForm" ref="roleForm" label-width="100px">
            <div class="xe-page-header">
                <p>
                    筛选条件
                </p>
            </div>
            <div class="xe-adaption">
                <el-form-item label="角色类型"  prop="systemId">
                    <el-select v-model="roleForm.systemId" filterable placeholder="请选择" class="xe-input3-col3">
                    <el-option
                        v-for="item in roleTypeOption"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-select v-model="roleForm.status" filterable placeholder="请选择" class="xe-input3-col3">
                        <el-option
                            v-for="item in statusOption"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色编码" prop="roleCode">
                    <el-input v-model="roleForm.roleCode" class="xe-input3-col3"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="roleForm.roleName" class="xe-input3-col3"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item label=" " class="xe-input-col2">
                    <el-button type="primary" @click="startQuery">筛 选</el-button>
                    <el-button @click="resetBtn('roleForm')">重 置</el-button>
                </el-form-item>
            </div>
            <div class="xe-page-header">
                <p>
                    角色列表
                </p>
            </div>
            <div class="xe-addbtn-panel">
                <el-button type="primary" @click="toAddRoleFn">添 加</el-button>
            </div>
        </el-form>
        <el-table :data="tableData" style="width:100%;" border :empty-text='emptyText'>
            <el-table-column label="序号" min-width="65">
                <template scope="scope">
                    {{scope.$index + 1}}
                </template>
            </el-table-column>
            <el-table-column fixed prop="status" label="状态" min-width="70">
                <template scope="scope">
                    {{scope.row.status | statusToChinese}}
                </template>
            </el-table-column>
            <el-table-column prop="systemId" label="类型" min-width="70">
                <template scope="scope">
                    {{scope.row.systemId | systemIdToChinese}}
                </template>
            </el-table-column>
            <el-table-column prop="roleName" label="角色名称" min-width="200">
                <template scope="scope">
                    <router-link class = "xe-router-link" :to="{ name:'toViewRolePage', query: scope.row}">
                        {{scope.row.roleName}}
                    </router-link>
                </template>
            </el-table-column>
            <el-table-column prop="roleCode" label="角色编码" min-width="150"></el-table-column>
            <el-table-column prop="remark" label="角色说明" min-width="150"></el-table-column>
            <el-table-column prop="createdTime" label="创建时间" min-width="160"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" min-width="160"></el-table-column>
            <el-table-column label="操作" fixed="right" min-width="320">
                <template scope="scope">
                    <div v-if="scope.row.roleCode!=='N01'">
                        <el-button type="text" v-if="scope.row.status === 'ENABLE'" class="xe-textBtn xe-textbtn-danger" @click="toDisabledFn(scope)">禁用</el-button>
                        <el-button type="text" v-if="scope.row.status === 'DISABLE'" class="xe-textBtn" @click="toEnableFn(scope) ">启用</el-button>
                        <el-button type="text" class="xe-textBtn" @click="toBindRoleFn(scope.row)">绑定用户</el-button>
                        <el-button type="text" class="xe-textBtn" @click="toManagerRoleFn(scope.row)">分配权限</el-button>
                        <el-button type="text" class="xe-textBtn" @click="toEditRoleNameFn(scope.row)">修改</el-button>
                        <el-button type="text" class="xe-textbtn-danger" @click="toDeleteFn(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="roleForm.pageNum"
                :page-sizes="xePageSizes"
                :page-size="roleForm.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="roleForm.total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                roleForm: {
                    systemId: '',
                    status: '',
                    roleCode: '',
                    roleName: '',
                    total: 0,
                    pageNum: 1,
                    pageSize: 10
                },
                roleTypeOption: [{
                    value: '2000',
                    label: '伙伴'
                }, {
                    value: '3000',
                    label: '客户'
                }, {
                    value: '1000',
                    label: '运营'
                }],
                statusOption: [{
                    value: 'ENABLE',
                    label: '启用'
                }, {
                    value: 'DISABLE',
                    label: '禁用'
                }],
                tableData: [],
                emptyText: '',
                currentPage: 5,
                disabledDialog: false,
                enableDialog: false,
                disabledRoleName: '',
                deleteDialog: false,
                pageUrl: {
                    queryRoleList: '/page/uam/role/main/queryUamRoleListWithPage',
                    addRolePageUrl: 'toAddRolePage',
                    bindRolePageUrl: 'toBindRolePage',
                    editRolePageUrl: 'toEditRolePage',
                    managerRolePageUrl: 'toManagerRolePage'
                }
            };
        },
        created() {
            this.queryDataFn();
        },
        filters: {
            statusToChinese(val) {
                let state = '';
                switch (val) {
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
            systemIdToChinese(val) {
                let source = '';
                switch (val) {
                    case '1000': {
                        source = '运营';
                        break;
                    }
                    case '2000': {
                        source = '伙伴';
                        break;
                    }
                    case '3000': {
                        source = '客户';
                        break;
                    }
                }
                return source;
            }
        },
        methods: {
            queryDataFn() {
                let _this = this;
                let param = {};
                param.param = _this.roleForm;
                param.pageNum = _this.roleForm.pageNum;
                param.pageSize = _this.roleForm.pageSize;
                _this.$http({
                    method: 'POST',
                    url: _this.pageUrl.queryRoleList,
                    data: param
                }).then((res) => {
                    _this.tableData = res.result.list;
                    _this.roleForm.pageNum = res.result.pageNum;
                    _this.roleForm.total = res.result.total;
                    _this.roleForm.pageSize = res.result.pageSize;
                }).catch((err) => {
                    console.log(err);
                });
            },
            startQuery() {
                this.queryDataFn();
            },
            toAddRoleFn() {
                this.$router.push({name: this.pageUrl.addRolePageUrl});
            },
            toBindRoleFn(val) {
                this.$router.push({name: this.pageUrl.bindRolePageUrl, query: val});
            },
            toManagerRoleFn(val) {
                this.$router.push({name: this.pageUrl.managerRolePageUrl, query: val});
            },
            toEditRoleNameFn(val) {
                this.$router.push({name: this.pageUrl.editRolePageUrl, query: val});
            },
            toDisabledFn(scope) {
                this.disableUser(scope.row.roleName, {
                    'status': 'DISABLE',
                    'id': scope.row.id
                }, '/page/uam/role/main/modifyUamRoleStatusById', () => {
                    this.queryDataFn();
                });
            },
            toEnableFn(scope) {
                this.enableUser(scope.row.roleName, {
                    'status': 'ENABLE',
                    'id': scope.row.id
                }, '/page/uam/role/main/modifyUamRoleStatusById', () => {
                    this.queryDataFn();
                });
            },
            toDeleteFn(val) {
                let _this = this;
                this.$confirm(`确定删除角色${val.roleName}吗？删除后将不能使用，确定继续删除吗?`, '删除提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: `/page/uam/role/main/deleteUamRoleById/${val.id}`
                    }).then((res) => {
                        console.log(res);
                        this.queryDataFn();
                    }).catch(() => {
                    });
                }).catch(() => {
                });
            },
            toSureDeleteRoleFn(val) {
                this.deleteDialog = false;
            },
            resetBtn(formName) {
                this.$refs[formName].resetFields();
                this.queryDataFn();
            },
            handleSizeChange(val) {
                this.roleForm.pageSize = val;
                this.queryDataFn();
            },
            handleCurrentChange(val) {
                var _this = this;
                if (_this.roleForm.pageNum !== 0) {
                    _this.roleForm.pageNum = val;
                    _this.queryDataFn();
                }
            }
        }
    };
</script>
