<style rel="stylesheet/scss" lang="scss">

</style>
<template lang="html">
    <div class="personInof">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item>客户档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="personInBox">
            <div class="passTit">
                查看用户信息
            </div>
            <div class="person_pre">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="用户信息" name="first">
                        <div class="info">
                            <div class="infoImg">
                                <p class="users_pic"></p>
                                <p class="userName">{{userInfoTab.userName}}</p>
                            </div>
                            <div class="infoTab">
                                <p>
                                    <span class="title">登录名</span>
                                    <span class="content">{{userInfoTab.loginName}}</span>
                                </p>
                                <p>
                                    <span class="title">姓名</span>
                                    <span class="content">{{userInfoTab.userName}}</span>
                                </p>
                                <p>
                                    <span class="title">工号</span>
                                    <span class="content">{{userInfoTab.userCode}}</span>
                                </p>
                                <p>
                                    <span class="title">状态</span>
                                    <span class="content">{{userInfoTab.status | statusToChinese}}</span>
                                </p>
                                <p>
                                    <span class="title">所属组织</span>
                                    <span class="content">{{userInfoTab.groupName}}</span>
                                </p>
                                <p>
                                    <span class="title">电话号码</span>
                                    <span class="content">{{userInfoTab.mobileNo}}</span>
                                </p>
                                <p>
                                    <span class="title">最后登陆IP</span>
                                    <span class="content">{{userInfoTab.lastLoginIp}}</span>
                                </p>
                                <p>
                                    <span class="title">最后在线</span>
                                    <span class="content">{{userInfoTab.lastLoginTime}}</span>
                                </p>
                            </div>
                            <div class="userLimit">
                                <div class="xe-jurisdiction-panel-header">
                                    权限信息
                                </div>
                                <div class="xe-jurisdiction-panel-body">
                                    <el-tree
                                        :data="treeData"
                                        :props="defaultProps"
                                        :load="loadNode"
                                        lazy
                                        @check-change="handleCheckChange">
                                    </el-tree>
                                </div>
                            </div>
                        </div>
                        <div class="role" v-if="userInfoTab.status == 'THROUGH'">
                            <div class="xe-page-header">
                                <p>
                                    角色
                                </p>
                            </div>
                            <div id="app">
                                <div class="pricing-span-header">
                                    <div class="widget-box transparent">
                                        <div class="widget-header">
                                            <h5 class="widget-title smaller lighter">拥有的角色</h5>
                                        </div>
                                        <div class="widget-body">
                                            <div>
                                                <ul class="list-striped  pricing-table-header">
                                                    <li>角色名称</li>
                                                    <li>角色编码</li>
                                                    <li>角色状态</li>
                                                    <li>所属工作台</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pricing-span-body">
                                    <div class="pricing-span" v-for="(item,index) in userRole">
                                        <div class="widget-box pricing-box-small widget-color-blue">
                                            <div class="widget-header">
                                                <h5 class="widget-title smaller lighter fontCol">{{item.roleName}}</h5>
                                            </div>
                                            <div class="widget-body">
                                                <div>
                                                    <ul class="list-striped pricing-table">
                                                        <li>{{item.roleName}}</li>
                                                        <li>{{item.roleCode}}</li>
                                                        <li>{{item.status}}</li>
                                                        <li>{{item.systemId}}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </el-tab-pane>
                        <el-tab-pane label="操作日志" name="second">
                            <template>
                                <el-table
                                    :data="initTable"
                                    fixed="left"
                                    border
                                    max-height="450"
                                    style="width: 100%">
                                    <el-table-column
                                        label="序号"
                                        width="70">
                                        <template scope="scope">
                                            {{scope.$index + 1}}
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="serialNo"
                                        label="日志编码"
                                        min-width="150">
                                    </el-table-column>
                                    <el-table-column
                                        prop="logName"
                                        label="日志类型"
                                        min-width="100">
                                    </el-table-column>
                                    <el-table-column
                                        prop="busName"
                                        label="业务类型"
                                        min-width="190">
                                    </el-table-column>
                                    <el-table-column
                                        prop="os"
                                        label="操作系统"
                                        min-width="100">
                                    </el-table-column>
                                    <el-table-column
                                        prop="browser"
                                        label="浏览器"
                                        min-width="120">
                                    </el-table-column>
                                    <el-table-column
                                        prop="ip"
                                        label="IP地址"
                                        min-width="120">
                                    </el-table-column>
                                    <el-table-column
                                        prop="groupName"
                                        label="组织名称"
                                        min-width="120">
                                    </el-table-column>
                                    <el-table-column
                                        prop="creator"
                                        label="操作人"
                                        min-width="100">
                                    </el-table-column>
                                    <el-table-column
                                        fixed="right"
                                        prop="createdTime"
                                        label="操作时间"
                                        min-width="150">
                                    </el-table-column>
                                </el-table>
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                        @size-change="handlsizepage"
                                        @current-change="handlecurChange"
                                        :current-page="currPage"
                                        :page-sizes="[10, 20, 50, 100]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="total">
                                    </el-pagination>
                                </div>
                            </template>
                        </el-tab-pane>
                </el-tabs>
            </div>
        </div>
    </div>
</template>
<script>
    import {getNowCookie} from 'xcms-common-plugins/src/utils/';
    export default {
        data() {
            return {
                activeName: 'first',
                initTable: [],
                userInfo: '',
                userInfoTab: [],
                userRole: [],
                data: '',
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                currPage: 1,
                pageSize: 8,
                total: 0
            };
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
            }
        },

        created() {
            let userInfo = getNowCookie().userInfo;
            let _this = this;
            this.userInfo = userInfo;
            this.data = this.userInfo.userId;
//            console.log('this.userInfo', this.userInfo);
            this.userlogFn();
            _this.findUserInfoByUserFn(function() {
                if (_this.userInfoTab.status === 'THROUGH') {
                    _this.getTreeData('', (items) => {
                        _this.treeData = items;
                        console.log('items=========>', items);
                    });
                }
            });
//            _this.getTreeData();
        },
        methods: {
            handlsizepage(val) {
                this.pageSize = val;
                this.userlogFn();
            },
            handlecurChange(val) {
                this.currPage = val;
                this.userlogFn();
            },
            handleClick(tab, event) {},
            userlogFn() {
                let _this = this;
                let tableData = {};
                tableData.pageNum = _this.currPage;
                tableData.pageSize = _this.pageSize;
                tableData.param = {};
                tableData.param.id = _this.data;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/user/main/queryUserLogListWithPage',
                    data: tableData
                }).then((res) => {
                    console.log('操作日志成功时--', res);
                    if (res.code === 200) {
                        _this.initTable = res.result.list;
                        _this.total = res.result.total;
                    }
                }).catch((err) => {
//                    console.log('操作日志失败时--', err);
                    console.log(err);
                });
            },
            findUserInfoByUserFn(callback) {
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/user/common/findUserInfoByUserId/' + _this.data
                }).then((res) => {
                    if (res.code === 200) {
                        _this.userInfoTab = res.result.user;
                        _this.userRole = res.result.roleList;
                        callback && callback();
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            loadNode(node, resolve) {
                if (node.level !== 0) {
                    this.getTreeData(node.data.id, (items) => {
                        return resolve(items);
                    });
                }
            },
            handleCheckChange() {
            },
            getTreeData(pid, callback) {
                let postData = {
                    userId: this.data,
                    pid: pid
                };
                let _this = this;
                _this.$http({
                    method: 'post',
                    url: '/page/uam/role/common/getMenuTreeViewSync',
                    data: postData
                }).then(function (res) {
                    if (res.code === 200) {
                        console.log('组织树请求成功', res);
                        let items = [];
                        for (let key in res.result) {
                            items.push(res.result[key]);
                        }
                        callback && callback(items);
                    }
                }).catch(err => {
                    console.log('组织树请求失败', err);
                });
            }
        }
    };
</script>
