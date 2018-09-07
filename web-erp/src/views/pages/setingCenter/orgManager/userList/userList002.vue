<template lang="html">
    <div class="m-router-con">
        <!--<strong>用户列表</strong>-->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="inquireEnd">
                    <el-select size="small" class="xe-input-w110" v-model="formData.inquireEnd" placeholder="用户编号">
                        <el-option
                                v-for="item in inquireEndList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="queryCondition">
                    <el-input size="small" v-model="formData.queryCondition" placeholder="请输入查询内容"></el-input>
                </el-form-item>
                <el-form-item prop="frozenFlag">
                    <el-select size="small" class="xe-input-w110" v-model="formData.frozenFlag" placeholder="用户状态">
                        <el-option label="用户状态" value="-1"></el-option>
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="proStatus">
                    <el-select size="small" class="xe-input-w110" v-model="formData.proStatus" placeholder="注册来源">
                        <el-option label="注册来源" value="-1"></el-option>
                        <el-option label="自主注册" value="1"></el-option>
                        <el-option label="后台添加" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="">
                <span class="iconfont icon-xinzeng"></span> 添加用户
            </el-button>
            <el-button class="xe-button-normal" @click="">
                <span class="iconfont icon-daoru"></span> 导入用户
            </el-button>
            <el-button class="xe-button-normal">
                <span class="iconfont icon-daochu"></span> 导出用户
            </el-button>
        </div>
        <div class="goodsTable">
            <el-table highlight-current-row style="width: 100%" border :data="userList" @selection-change="">
                <el-table-column type="selection" min-width="40" class-name="selectionTd" fixed="left">
                </el-table-column>
                <el-table-column prop="loginName" label="用户编号"  min-width="124">
                </el-table-column>
                <el-table-column prop="loginName" label="用户名"  min-width="124">
                </el-table-column>
                <el-table-column prop="userName" label="用户姓名" min-width="90">
                </el-table-column>
                <el-table-column prop="phone" label="联系电话" min-width="118">
                </el-table-column>
                <el-table-column prop="phone" label="所属组织" min-width="118">
                </el-table-column>
                <el-table-column prop="phone" label="用户类型" min-width="118">
                </el-table-column>
                <el-table-column prop="lockStatus" label="用户状态" min-width="90">
                    <template scope="props">
                        {{props.row.lockStatus | lockStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="lockStatus" label="注册来源" min-width="90">
                    <template scope="props">
                        {{props.row.lockStatus | lockStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="注册时间" min-width="162">
                    <template scope="props">
                        {{props.row.createDate | millisecondFormat('ms')}}
                    </template>
                </el-table-column>
                <el-table-column prop="loginLastDate" label="修改时间" min-width="162">
                    <template scope="props">
                        {{props.row.loginLastDate | millisecondFormat('ms')}}
                    </template>
                </el-table-column>
                <el-table-column prop="loginLastDate" label="最后登录时间" min-width="162">
                    <template scope="props">
                        {{props.row.loginLastDate | millisecondFormat('ms')}}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="备注" min-width="118">
                </el-table-column>
                <el-table-column label="操作" fixed="right" min-width="130">
                    <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="editUser(props.row)">
                                禁用
                            </a>
                            <a href="javascript:;" class="s-blue" @click="editUser(props.row)">
                                启用
                            </a>
                            <a href="javascript:;" class="s-blue" @click="editUser(props.row)">
                                编辑
                            </a>
                            <a href="javascript:;" class="s-blue" @click="editUser1(props.row)">
                                分配角色
                            </a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageInfo.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pageInfo.pageSize"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="pageInfo.total">
            </el-pagination>
        </div>
        <!--添加用户弹窗-->
        <div class="reset-dialog addMember">
            <el-dialog class="error-tishi" title="新增用户" :visible.sync="dialogVisible">
                <!--<sysUserListAddnew @selectGo="selectGo" :dialogVisible = 'dialogVisible'></sysUserListAddnew>-->
                <div class="pruduct-add">
                    <div class="serch-box">
                        <!-- {{filterForm}} -->
                        <el-form ref="filterForm" :model="filterForm" label-width="100px">
                            <div class="for-itemlis">
                                <el-form-item label="用户编号" prop="loginName">
                                    <el-input size="small" class="xe-input-col3" v-model="filterForm.loginName" placeholder="请输入用户编号"></el-input>
                                </el-form-item>
                                <el-form-item label="用户名" prop="userName">
                                    <el-input size="small" class="xe-input-col3" v-model="filterForm.userName" placeholder="请输入用户名"></el-input>
                                </el-form-item>
                                <el-form-item label="用户手机号" prop="phone">
                                    <el-input size="small" class="xe-input-col3" :maxlength="11" v-model="filterForm.phone" placeholder="请输入用户手机号"></el-input>
                                </el-form-item>
                                <el-form-item label="密码" prop="pwd">
                                    <el-input size="small" class="xe-input-col3" type="password" v-model="filterForm.pwd" placeholder="请输入密码"></el-input>
                                </el-form-item>
                                <el-form-item label="用户姓名" prop="userDesc">
                                    <el-input size="small" class="xe-input-col3" :maxlength="30" v-model="filterForm.userDesc" placeholder="请输入用户描述"></el-input>
                                </el-form-item>
                                <div>
                                    <!--<el-form-item label="用户状态" prop="lockStatus">-->
                                        <!--<el-radio-group v-model="filterForm.lockStatus">-->
                                            <!--<el-radio v-for="(item, index) in lockStatuslist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>-->
                                        <!--</el-radio-group>-->
                                    <!--</el-form-item>-->
                                    <el-form-item label="性别" prop="lockStatus">
                                        <el-radio class="radio" v-model="radio" label="1">男</el-radio>
                                        <el-radio class="radio" v-model="radio" label="2">女</el-radio>
                                    </el-form-item>
                                </div>
                                <el-form-item label="所属组织">
                                    <el-select v-model="formData.region" placeholder="请选择" class="xe-input-col3">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="用户类型" prop="userDesc">
                                    <el-input size="small" class="xe-input-col3" :maxlength="30" v-model="filterForm.userDesc" placeholder="请输入客服/运营/订单员等"></el-input>
                                </el-form-item>
                                <el-form-item label="用户邮箱" prop="userDesc">
                                    <el-input size="small" class="xe-input-col3" :maxlength="30" v-model="filterForm.userDesc" placeholder="请输入"></el-input>
                                </el-form-item>
                                <el-form-item label="所在地区">
                                    <el-select v-model="formData.region" placeholder="请选择" class="xe-input-col3">
                                        <el-option label="区域一" value="shanghai"></el-option>
                                        <el-option label="区域二" value="beijing"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label="详细地址" prop="userDesc">
                                    <el-input size="small" class="xe-input-col3" :maxlength="30" v-model="filterForm.userDesc" placeholder="街道小区门牌号等，不少于5个字"></el-input>
                                </el-form-item>
                                <el-form-item label="备注" prop="userDesc">
                                    <el-input size="small" class="xe-input-col3" :maxlength="30" v-model="filterForm.userDesc" placeholder="请输入"></el-input>
                                </el-form-item>
                                <div>
                                    <el-form-item label="用户状态" prop="lockStatus">
                                        <el-radio class="radio" v-model="radio" label="1">启用</el-radio>
                                        <el-radio class="radio" v-model="radio" label="2">禁用</el-radio>
                                    </el-form-item>
                                </div>
                            </div>
                            <div class="member-btnBox" style="padding-bottom: 0">
                                <el-button class="xe-button-normal" type="primary" @click="">
                                    确认添加
                                </el-button>
                                <el-button class="xe-button-normal" @click="">
                                    返回
                                </el-button>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--添加用户弹窗-->
        <!--分配角色-->
        <div class="reset-dialog addMember">
            <el-dialog class="error-tishi" title="分配角色" :visible.sync="assignRole">
                <div class="pruduct-add">
                    <div class="serch-box">
                        <!-- {{filterForm}} -->
                        <el-form ref="assignForm" :model="assignForm">
                            <div>
                                <el-form-item>
                                    <el-select v-model="assignForm.region" placeholder="请选择">
                                        <el-option label="使用" value="shanghai"></el-option>
                                        <el-option label="未使用" value="beijing"></el-option>
                                    </el-select>
                                    <el-button type="primary" @click="" class="xe-button-normal xe-button-normal01">查询</el-button>
                                </el-form-item>
                            </div>
                            <div class="u-opera-btnBox clearfix">
                                <p class="fl">用户名：<span>zhang123</span></p>
                                <p class="fl">已分配角色：进销存经理</p>
                            </div>
                        </el-form>
                    </div>
                    <div class="q-oper">
                        <div class="goodsTable serch-box q-opera-table">
                            <el-table highlight-current-row style="width: 100%" border :data="userList" @selection-change="">
                                <el-table-column type="selection" min-width="40" class-name="selectionTd" fixed="left">
                                </el-table-column>
                                <el-table-column prop="loginName" label="用户编号"  min-width="124">
                                </el-table-column>
                                <el-table-column prop="loginName" label="角色名称"  min-width="124">
                                </el-table-column>
                                <el-table-column prop="lockStatus" label="用户状态" min-width="90">
                                    <template scope="props">
                                        {{props.row.lockStatus | lockStatusToText}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="userName" label="角色说明" min-width="90">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div class="member-btnBox" style="padding-bottom: 0">
                            <el-button class="xe-button-normal" type="primary" @click="">
                                分配角色
                            </el-button>
                            <el-button class="xe-button-normal" @click="">
                                取消
                            </el-button>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!--分配角色-->
    </div>
</template>

<script>
import {inquireEnd, lockStatus01} from '@/dataControl.js';
export default {
    data() {
        return {
            dialogVisible: false,                   // 添加用户弹窗
            assignRole: false,                       // 分配角色
            formData: {
                inquireEnd: 1,                     // 查询维度
                placeholder: '请输入内容',     // 默认查询时输入用户编号
                frozenFlag: '',                     // 用户状态
                proStatus: '',                     // 注册来源
                region: ''                         // 所属组织
            },
            filterForm: {
                loginName: '',                      // 用户名
                userName: '',                       // 用户姓名
                pwd: '',                            // 密码
                phone: '',                           // 手机号
                userDesc: '',                          // 用户描述
                lockStatus: ''
            },
            assignForm: {                            // 分配角色
                region: ''
            },
            radio: '2',                               // 单选按钮
            userList: [],                            // 列表
            pageInfo: {                              // 分页
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        };
    },
    methods: {
        handleSelectionChange00(val) {
            console.log('testvals', val);
            this.multipleSelection00 = val;
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
        }
    },
    computed: {
        inquireEndList() {
            return inquireEnd;
        },
        lockStatuslist() {
            return lockStatus01;
        }
    }
};
</script>

<style lang="scss">
    .pruduct-add .serch-box {
        padding: 20px 20px 0;
        margin-bottom: 12px;
    }
    .member-btnBox{
        padding: 10px 0 10px;
        text-align: center;
    }
    .xe-input-col3{
        width: 390px;
    }
    .xe-button-normal01{
        margin-left: 24px;
    }
    .u-opera-btnBox p{
        margin-right: 30px;
    }
    .q-oper .q-opera-table{
        padding-top: 0;
    }
</style>
