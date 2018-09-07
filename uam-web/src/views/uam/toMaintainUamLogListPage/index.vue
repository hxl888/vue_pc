<style rel="stylesheet/scss" lang="scss">

    .xe-page-content {

        padding: 8px 16px 24px;
    }

    .xe-page-content .xe-addbtn-panel {

        padding-bottom: 15px;
    }

    .xe-page-content .xe-log-tree-item {
        z-index: 100;
    }

    .xe-page-content .xe-log-tree-item .xe-tree {
        border: 1px solid #d1dbe5 !important;
    }

</style>


<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
            <div class="xe-page-header">
                <p>
                    筛选条件
                </p>
            </div>
        <el-form :inline="true"  ref = "pageInfo" :model = "pageInfo" :label-width = "xeLabelWidth" >
                <div class="xe-adaption">
                    <!--操作人-->
                    <el-form-item label="操作人" prop="creator">
                        <el-input v-model="pageInfo.creator" placeholder="请输入操作人名称" class = "xe-input3-col3"></el-input>
                    </el-form-item>
                    <!--所属组织-->
                    <el-form-item label="所属组织" prop="groupSerialNo" class = "xe-log-tree-item">
                        <input-tree class = "xe-input3-col3 xe-input-readonly-color" v-model="pageInfo.groupName" :readonly=true :tree-data="treeData" :success-callback = "successCallback"></input-tree>
                        <!--<el-select v-model="pageInfo.groupSerialNo" placeholder="请选择" class = "xe-input-col2">-->
                            <!--<el-option-->
                                <!--v-for="item in groupList"-->
                                <!--:label="item.value"-->
                                <!--:value="item.key">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    </el-form-item>
                    <!--业务类型-->
                    <el-form-item label="业务类型" prop="busType">
                        <el-select v-model="pageInfo.busType" placeholder="请选择" class = "xe-input3-col3">
                            <el-option
                                v-for="item in busTypeList"
                                :label="item.value"
                                :value="item.key">
                            </el-option>
                        </el-select>
                    </el-form-item><!--
                    上报时间
                    <!--&ndash;&gt;<el-form-item label="操作时间" prop="createTime">-->
                            <!--<el-date-picker class = "xe-input-col2"-->
                                <!--v-model="pageInfo.createTime"-->
                                <!--type="daterange"-->
                                <!--:editable="false"-->
                                <!--align="right"-->
                                <!--placeholder="选择日期范围"-->
                                <!--:picker-options="pickerOptions2">-->
                            <!--</el-date-picker>-->
                    <!--</el-form-item>-->
                    <el-form-item label="操作时间" prop="createTime">
                            <el-date-picker class = "xe-input3-col3"
                                v-model="pageInfo.createTime"
                                type="datetimerange"
                                :editable="false"
                                :picker-options="pickerOptions2"
                                placeholder="选择日期范围"
                                align="right">
                            </el-date-picker>
                    </el-form-item>
                </div>
            <div>
                <!--按钮-->
                <el-form-item label=" ">
                    <el-button type="primary" @click="screen">筛选</el-button>
                    <el-button @click="resetForm('pageInfo')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
            <div class="xe-page-header">
                <p>
                    日志列表
                </p>
            </div>
            <div>
                <!--日志列表-->
                <template>
                    <el-table
                        :data="tableData"
                        border
                        highlight-current-row
                        :emptyText = "emptyText"
                        style="width: 100%">
                        <el-table-column
                            min-width="70"
                            label="序号">
                            <template scope="scope">
                                {{scope.$index + 1}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="serialNo"
                            min-width="140"
                            fixed="left"
                            label="日志编码">
                        </el-table-column>
                        <el-table-column
                            prop="logType"
                            min-width="90"
                            label="日志类型">
                            <template scope="scope">
                                {{scope.row.logType | statusToChinese}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="busType"
                            min-width="120"
                            label="业务类型">
                            <template scope="scope">
                                {{scope.row.busType | statusToChineses}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="os"
                            min-width="100"
                            label="操作系统">
                        </el-table-column>
                        <el-table-column
                            prop="browser"
                            min-width="90"
                            label="浏览器">
                        </el-table-column>
                        <el-table-column
                            prop="ip"
                            min-width="130"
                            label="IP地址">
                        </el-table-column>
                        <el-table-column
                            prop="groupName"
                            min-width="100"
                            label="组织名称">
                        </el-table-column>
                        <el-table-column
                            prop="creator"
                            min-width="110"
                            label="操作人">
                        </el-table-column>
                        <el-table-column
                            prop="createdTime"
                            min-width="160"
                            label="操作时间">
                        </el-table-column>
                    </el-table>
                </template>
            </div>
            <!--分页-->
            <div class="xe-pagination-panel">
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageNum"
                    :page-sizes="xePageSizes"
                    :page-size="pageInfo.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageInfo.total">
                </el-pagination>
            </div>
    </div>
</template>
<script>
    import InputTree from '../../../components/groupTree';
    export default {
        data() {
            return {
                tableData: [],
                treeData: [],
                emptyText: '',
                currentRow: null,
                pageUrl: {
                    loadDataUrl: '/page/uam/log/main/toMaintainUamLogListPage',
                    queryDataUrl: '/page/uam/log/main/queryLogListWithPage'
                },
                busTypeList: [],
                groupList: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0,
                    busType: '',
                    creator: '',
                    endTime: '',
                    groupSerialNo: '',
                    startTime: '',
                    endQueryTime: '',
                    startQueryTime: '',
                    createTime: [],
                    createTimes: [],
                    groupName: ''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            };
        },
        components: {
            'input-tree': InputTree
        },
        created() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/uam/group/common/getGroupTree',
                data: {
                }
            }).then((res) => {
                _this.treeData = res['result'];
            }).catch((err) => {
                console.log(err);
            });
            this.initPage(this.currPage);
        },
        filters: {
            statusToChinese(val) {
                let logType = '';
                switch (val) {
                    case '10': {
                        logType = '操作日志';
                        break;
                    }
                    case '20': {
                        logType = '登录日志';
                        break;
                    }
                    case '30': {
                        logType = '异常日志';
                        break;
                    }
                }
                return logType;
            },
            statusToChineses(val) {
                let busType = '';
                switch (val) {
                    case '1002': {
                        busType = '创建用户';
                        break;
                    }
                    case '1003': {
                        busType = '修改用户';
                        break;
                    }
                    case '1004': {
                        busType = '用户登录';
                        break;
                    }
                    case '1005': {
                        busType = '角色启用/禁用';
                        break;
                    }
                    case '1006': {
                        busType = '用户删除';
                        break;
                    }
                    case '2001': {
                        busType = '角色创建';
                        break;
                    }
                    case '2002': {
                        busType = '角色修改';
                        break;
                    }
                    case '2003': {
                        busType = '角色删除';
                        break;
                    }
                    case '2004': {
                        busType = '角色启用/禁用';
                        break;
                    }
                    case '2005': {
                        busType = '角色授权';
                        break;
                    }
                    case '2006': {
                        busType = '角色绑定用户';
                        break;
                    }
                    case '3001': {
                        busType = '创建菜单';
                        break;
                    }
                    case '3003': {
                        busType = '修改菜单状态';
                        break;
                    }
                    case '3005': {
                        busType = '根据id删除菜单';
                        break;
                    }
                    case '5001': {
                        busType = '新增组织';
                        break;
                    }
                    case '5002': {
                        busType = '修改组织';
                        break;
                    }
                    case '5003': {
                        busType = '逻辑删除组织';
                        break;
                    }
                    case '5004': {
                        busType = '修改组织状态';
                        break;
                    }
                    case '5005': {
                        busType = '组织绑定用户';
                        break;
                    }
                    case '6001': {
                        busType = '审核通过运营用户的认证申请';
                        break;
                    }
                    case '6002': {
                        busType = '审核驳回运营用户的认证申请';
                        break;
                    }
                    case '6003': {
                        busType = '用户提交运营认证申请';
                        break;
                    }
                }
                return busType;
            }
        },
        methods: {
            successCallback(arr) {
                let _this = this;
                let id = arr[arr.length - 1].id;
                _this.pageInfo.groupSerialNo = id;
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.queryFn();
            },
            screen: function() {
                this.queryFn();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.pageInfo.startQueryTime = '';
                this.pageInfo.endQueryTime = '';
                this.pageInfo.groupName = '';
            },
            initPage: function() {
                this.loadInfo();
                this.queryFn();
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.queryFn();
            },
            queryFn: function() {
                let _this = this;
                let dateArray = this.pageInfo.createTime;
                if (dateArray[0] !== undefined && dateArray[0] !== null) {
                    let date = new Date(dateArray[0]);
                    _this.pageInfo.startQueryTime = this.dateFormat(date) + ' 00:00:00';
                    date = new Date(dateArray[1]);
                    _this.pageInfo.endQueryTime = this.dateFormat(date) + ' 23:59:59';
                }
                let pageData = {};
                pageData.pageNum = _this.pageInfo.pageNum;
                pageData.pageSize = _this.pageInfo.pageSize;
                pageData.param = _this.pageInfo;
                _this.$http({
                    method: 'POST',
                    url: _this.pageUrl.queryDataUrl,
                    data: pageData
                }).then(function (res) {
                    if (!res.result.list.length) {
                        _this.emptyText = '暂无数据';
                    }
                    _this.tableData = res.result.list;
                    _this.pageInfo.pageNum = res.result.pageNum;
                    _this.pageInfo.total = res.result.total;
                    _this.pageInfo.pageSize = res.result.pageSize;
                }).catch(error => {
                    console.log(error);
                });
            },
            loadInfo: function() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: _this.pageUrl.loadDataUrl
                }).then((res) => {
                    _this.busTypeList = res.result.operationLogTypeList;
                }).catch((err) => {
                    console.log(err);
                });
            },
            dateFormat (date) {
                let result = date.getFullYear() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
                return result;
            }
        }
    };

</script>
