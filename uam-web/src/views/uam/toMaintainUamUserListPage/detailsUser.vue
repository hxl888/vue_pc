<style rel="stylesheet/scss" lang="scss">
    li{
        list-style: none;
    }
    .pricing-span-header{
        width: 110px;
        float: left;
        clear: left;
    }
    .widget-box{
        padding: 0;
        box-shadow: none;
        margin: 5px 0;
        border: 1px solid #CCC;
    }
    .transparent{
        border-width: 0;
    }
    .widget-box.transparent > .widget-header{
        background: none;
        border-width: 0;
        border-bottom: 1px solid #DCE8F1;
        color: #4383B4;
        padding-left: 3px;
    }
    .widget-header{
        box-sizing: content-box;
        position: relative;
        min-height: 38px;
        border-bottom: 1px solid #DDD;
    }
    .widget-header > .widget-title{
        line-height: 36px;
        padding: 0;
        margin: 0;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .fontCol{
        color: white;
    }

    h5.smaller{
        font-size: 14px;
    }
    .lighter{
        font-weight: lighter;
    }
    .widget-box.transparent > .widget-body{
        border-width: 0;
        background-color: transparent;
    }
    .widget-body{
        background-color: #FFF;
    }
    .pricing-table-header{
        padding-top: 0;
        margin-top: 0;
        text-align: left;
        padding-left: 0;
        list-style: none;
        margin-left: 0;
    }
    .list-striped > li:nth-child(odd){
        background-color: #FFF;
    }
    .pricing-table-header > li{
        padding: 11px 0 7px 11px;
        font-size: 13px;
    }
    .list-striped > li:nth-child(even){
        background-color: #EEE;
    }
    .pricing-span-body{
        float: left;width: 900px;
        min-height:200px;
        max-height: 580px;
        overflow: auto;
        padding:0 5px;
    }
    .pricing-span{
        margin: 0;
        width: 145px;
        max-width: 150px !important;
        min-width: 110px !important;
        float: left !important;
    }
    .pricing-box-small{
        box-shadow: none;
        margin-left: -2px;
        background-color: #FFF;
        position: relative;
        z-index: 10;
    }
    .pricing-span:hover .pricing-box-small{
        transform: scale3d(1.02,1.03,1.03);
        z-index: 100;
        -moz-box-shadow:0px 2px 2px #999;
        -webkit-box-shadow:0px 2px 2px #999;
        box-shadow:0px 2px 2px #999;
    }

    .widget-color-blue > .widget-header{
        background: #307ECC;
        border-right: #fff;
        text-align: center;
    }
    .pricing-table{
        margin:0;
        padding:0;
    }
    .pricing-table > li{
        text-align: center;
        padding: 7px 0;
        height: 30px;
        display: block;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-transition: all 0.1s;
        -moz-transition: all 0.1s;
        transition: all 0.1s;
    }
    .pricing-span:hover .pricing-table > li{
        padding: 8px 0;
    }

    .info{
        overflow: hidden;
        min-height: 300px;
    }

    .infoImg{
        display: inline-block;
        width: 220px;
        float: left;
        margin: 0 20px;
    }

    .infoImg .userName{
        width: 100%;
        height: 30px;
        text-align: center;
        color: white;
        line-height: 30px;
        background: url("../../../assets/img/bg.jpg");
        background-size: 100% 100%;
    }

    .infoImg img{
        width: 130px;
        height: 130px;
        margin: 50px 20%;
    }

    .infoTab{
        display: inline-block;
        width: 280px;
        min-height: 300px;
        float: left;
    }

    .userLimit{
        display: inline-block;
        width: 240px;
        height: 320px;
        background: #edf3f4;
        margin: 0 20px;
        border: 1px solid #dcebf7;
        position: relative;
    }

    .infoTab{
        border: 1px solid #dcebf7;
    }

    .infoTab p{
        height: 40px;
        width: 100%;
        border-bottom: 1px dotted #dcebf7;
        box-border: border-size;
    }
    .infoTab :last-child{
        border: none;
    }
    .infoTab p .title{
        display: inline-block;
        float: left;
        width: 35%;
        height: 39px;
        line-height: 40px;
        padding-left: 10px;
        background: #edf3f4;

    }
    .infoTab p .content{
        display: inline-block;
        float: right;
        height: 39px;
        width: 65%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 40px;
        padding-left: 10px;
    }

    .xe-jurisdiction-panel-header {
        height: 36px;
        padding: 0 15px;
        line-height: 36px;
        font-size: 14px !important;
        color: #ffffff;
        background-color: #337ab7;
    }

    .xe-jurisdiction-panel-body {
        height: 284px;
        overflow: auto;
    }

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamUserListPage' }">用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>查看用户</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                查看用户信息
            </p>
        </div>
        <template>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户信息" name="first">
                    <div class="info">
                        <div class="infoImg">
                            <img src="../../../assets/img/userInfo.jpg" alt="" />
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
                    <div class="role" v-if="data.status == 'THROUGH'">
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
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                                :current-page="formInline.pageNum"
                                :page-sizes="xePageSizes"
                                :page-size="formInline.pageSize"
                                layout="total, sizes, prev, pager, next, jumper"
                                :total="formInline.total">
                            </el-pagination>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </template>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                formInline: {
                    currPage: 1,
                    pageSize: 10,
                    pageNum: 1,
                    total: 0
                },
                activeName: 'first',
                initTable: [],
                userInfoTab: [],
                userRole: [],
                data: this.$route.query,
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                }
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
            this.userlogFn();
            this.findUserInfoByUserFn();
            this.getTreeData('', (items) => {
                this.treeData = items;
            });
        },

        methods: {
            handleClick(tab, event) {
            },

            userlogFn() {
                let _this = this;
                let tableData = {};
                tableData.pageNum = _this.formInline.pageNum;
                tableData.pageSize = _this.formInline.pageSize;
                let param = _this.formInline;
                param.id = _this.data.id;
                tableData.param = param;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/user/main/queryUserLogListWithPage',
                    data: tableData
                }).then((res) => {
                    _this.initTable = res.result.list;
                    _this.formInline.total = res.result.total;
//                    _this.formInline.pageNum = res.result.pageNum;
//                    _this.formInline.pageSize = res.result.pageSize;
                }).catch((err) => {
                    console.log(err);
                });
            },

            handleSizeChange(val) {
                this.formInline.pageSize = val;
                this.userlogFn();
            },

            handleCurrentChange(val) {
                this.formInline.pageNum = val;
                this.userlogFn();
            },

            findUserInfoByUserFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/user/common/findUserInfoByUserId/' + _this.$route.query.id
                }).then((res) => {
                    _this.userInfoTab = res.result.user;
                    _this.userRole = res.result.roleList;
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
                    userId: this.data.id,
                    pid: pid
                };
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/role/common/getMenuTreeViewSync',
                    data: postData
                }).then((res) => {
                    let items = [];
                    for (let key in res.result) {
                        items.push(res.result[key]);
                    }
                    callback && callback(items);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }
    };

</script>
