<template lang="html">
    <div class="m-router-con">
    <div class="u-top-search">
        <el-form ref="searchform" :model="searchform" :inline='true'>
            <el-form-item prop="venName">
                <el-input size="small" placeholder="请输入供应商名称" v-model="searchform.venName" class="xe-input-l40"></el-input>
            </el-form-item>
            <el-form-item prop="loginAccount">
                <el-input size="small" placeholder="请输入供应商账号" v-model="searchform.loginAccount" class="xe-input-l40"></el-input>
            </el-form-item>
            <!--<el-form-item class="timeLength clearfix" prop="startDateStr">-->
                <!--<el-date-picker-->
                    <!--size="small"-->
                    <!--class="fl xe-input-l40"-->
                    <!--v-model="searchform.startDateStr"-->
                    <!--@change="startDateStrFn"-->
                    <!--type="date"-->
                    <!--placeholder="审核开始日期"-->
                    <!--:picker-options="pickerOptions0">-->
                <!--</el-date-picker>-->
                <!--<span class="pictim_bor fl">-</span>-->
                <!--<el-form-item class="timeLength clearfix" prop="endDateStr">-->
                    <!--<el-date-picker-->
                    <!--size="small"-->
                    <!--class="fl"-->
                    <!--v-model="searchform.endDateStr"-->
                    <!--@change="endDateStrFn"-->
                    <!--type="date"-->
                    <!--placeholder="审核结束日期"-->
                    <!--:picker-options="pickerOptions0">-->
                <!--</el-date-picker>-->
                <!--</el-form-item>-->
            <!--</el-form-item>-->
            <el-form-item class="z-marL20">
                <el-button class="xe-button-normal" type="primary" @click="queryTabel">查询</el-button>
                <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
            </el-form-item>
        </el-form>
        <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" label-width ='73px'  :model="searchform" ref="searchform" class="demo-form-inline">
                        <div>
                           <el-form-item class="timeLength clearfix" prop="startDateStr" label="审核日期">
                                <el-date-picker
                                    size="small"
                                    class="fl xe-input-l40"
                                    v-model="searchform.startDateStr"
                                    @change="startDateStrFn"
                                    type="date"
                                    placeholder="审核开始日期"
                                    :picker-options="pickerOptions0">
                                </el-date-picker>
                                <span class="pictim_bor fl">-</span>
                                <el-form-item class="timeLength clearfix" prop="endDateStr">
                                    <el-date-picker
                                    size="small"
                                    class="fl"
                                    v-model="searchform.endDateStr"
                                    @change="endDateStrFn"
                                    type="date"
                                    placeholder="审核结束日期"
                                    :picker-options="pickerOptions0">
                                </el-date-picker>
                                </el-form-item>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="venName" label="供应商名称">
                                <el-input size="small" placeholder="请输入供应商名称" v-model="searchform.venName" class="xe-input-l68"></el-input>
                            </el-form-item>
                            <el-form-item prop="loginAccount" label="供应商账号">
                                <el-input size="small" placeholder="请输入供应商账号" v-model="searchform.loginAccount" class="xe-input-l68"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="userCode" label="商户ID">
                                <el-input size="small" v-model="searchform.userCode" class="xe-input-168" placeholder="商户ID"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabel">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
    </div>
    <!--<div class="u-opera-btnBox">-->
        <!--<el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出</el-button>-->
    <!--</div>-->
        <el-table ref="multipleTable" :data="tableDatas" v-loading="tableDataLoading" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" min-width="35"></el-table-column>
            <el-table-column prop="userCode" label="供应商ID" width="150"></el-table-column>
            <el-table-column prop="" label="账号" min-width="80">
                <template scope="scope">
                    {{scope.row.mobile ? scope.row.mobile : scope.row.email}}
                </template>
            </el-table-column>
            <el-table-column prop="venName" label="供应商名称" min-width="150"></el-table-column>
            <el-table-column prop="apStatus" label="资质状态" min-width="65">
                <template scope="scope">
                    <div>
                        {{scope.row.apStatus | venSatatusfiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="venCreateDate" label="入驻时间" min-width="110">
                <template scope="scope">
                    <div>
                        {{scope.row.venCreateDate, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="auditDate" label="审核时间" min-width="110">
                <template scope="scope">
                    <div>
                        {{scope.row.auditDate, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="90" fixed="right">
                <template scope="scope">
                    <el-button type="text" @click="perfectView(scope.row.userCode)" class="zq-restore">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagelist.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
        <div class="cancel-adito">
            <el-dialog
                title=""
                :visible.sync="dialogVisible"
                size="tiny"
                :before-close="handleClose">
                <div>
                    <p class="cancal-tit">确定取消审核？</p>
                    <p class="cancal-pre">确定要对商户取消审核？</p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button class="xe-button-normal" @click="dialogVisible = false">取 消</el-button>
                    <el-button class="xe-button-normal" type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import permission from 'mixins/permission.js';
    export default {
        mixins: [permission],
        data() {
            return {
                permissionObj: {},
                pickerOptions0: '',
                dialogVisible: false,
                tableDatas: [],
                tableDataLoading: false,
                startDateStrs: '',
                endDateStrs: '',
                searchform: {
                    loginAccount: '',
                    venName: '',
                    userCode: '',
                    startDateStr: '',
                    endDateStr: ''
                },
                pagelist: {
                    currPage: 1,
                    pageSize: 10,
                    total: 0
                }
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            startDateStrFn(val) {
                this.startDateStrs = val;
            },
            endDateStrFn(val) {
                console.log(val);
                this.endDateStrs = val;
            },
            queryTabel() {
                this.enquiryForm();
            },
            perfectView(code) {
                this.$router.push({name: 'detailsofqualification', query: {userCode: code}});
            },
            resetForm(formName) {
                let _this = this;
                this.searchform.startDateStr = null;
                this.searchform.endDateStr = null;
                this.$refs[formName].resetFields();
                setTimeout(function() {
                    _this.enquiryForm();
                }, 100);
            },
            handleSelectionChange() {},
            handleClose() {},
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                params = this.searchform;
                params.pageNum = this.pagelist.currPage;
                params.pageSize = this.pagelist.pageSize;
                params.startDateStr = this.startDateStrs;
                params.endDateStr = this.endDateStrs;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/aptitudemanager/queryVenInfoAptitudeList',
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.aptitudeList;
                    this.tableDataLoading = false;
                }).catch((error) => {
                    console.log(error);
                    this.tableDataLoading = false;
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.currPage = val;
                    this.enquiryForm();
                }
            }
        },
        computed: {
            permissionFilter: {
                get() {
                    return this.permissionDataList;
                },
                set(val) {
                    console.log('按钮级别权限keys:' + JSON.stringify(val));
                    if (val !== null) {
                        for (var key in val) {
                            this.$set(this.permissionObj, key, val[key].auth);
                        }
                    }
                }
            }
        }
    };
</script>
