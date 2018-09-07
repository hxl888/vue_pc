<template lang="html">
    <div class="recycleBin m-router-con">
        <div class="u-top-search">
            <el-form :model="nonessentialParameter" ref="nonessentialParameter" :inline='true' class="el-form--inline">
                <el-form-item prop="venSatatus">
                    <el-select size="small" v-model="nonessentialParameter.venSatatus" placeholder="入驻状态"  class="xe-input-l40">
                        <el-option
                          v-for="item in venSatatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="venName">
                    <el-input size="small" v-model="nonessentialParameter.venName" placeholder="供应商名称/店铺名称" class="xe-input-l40"></el-input>
                </el-form-item>
                <el-form-item prop="loginAccount">
                    <el-input size="small" v-model="nonessentialParameter.loginAccount" placeholder="请输入供应商账号" class="xe-input-l40"></el-input>
                </el-form-item>
                <el-form-item prop="venSource">
                    <el-select size="small" v-model="nonessentialParameter.venSource" placeholder="入驻来源" class="xe-input-l40">
                        <el-option
                          v-for="item in venSourcelist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="queryTableData">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('nonessentialParameter')">重置</el-button>
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
                    <el-form :inline="true" label-width ='73px'  :model="nonessentialParameter" ref="nonessentialParameter">
                        <div>
                            <el-form-item label="入驻时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    size="small"
                                    v-model="nonessentialParameter.startDate"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="startDateFn"
                                    placeholder="开始日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    size="small"
                                    v-model="nonessentialParameter.endDate"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="endDateFn"
                                    placeholder="结束日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="venSatatus" label="入驻状态">
                                <el-select size="small" class="xe-input-l68" v-model="nonessentialParameter.venSatatus" placeholder="入驻状态">
                                    <el-option
                                      v-for="item in venSatatuslist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="venName" label="供应商名称">
                                <el-input size="small" v-model="nonessentialParameter.venName" placeholder="供应商名称/店铺名称" class="xe-input-l68"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="loginAccount" label="供应商账号">
                                <el-input size="small" v-model="nonessentialParameter.loginAccount" placeholder="请输入供应商账号" class="xe-input-l68"></el-input>
                            </el-form-item>
                            <el-form-item prop="venSource" label="入驻来源">
                                <el-select size="small" v-model="nonessentialParameter.venSource" placeholder="入驻来源" class="xe-input-l68">
                                    <el-option
                                      v-for="item in venSourcelist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="userCode" label="商户ID">
                                <el-input size="small" v-model="nonessentialParameter.userCode" placeholder="请输入商户ID" class="xe-input-l68"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('nonessentialParameter')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <!--<div class="u-opera-btnBox">-->
            <!--<el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        <!--</div>-->
        <el-table ref="tableDatas" v-loading="tableDataLoading" :data="tableDatas" border tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection" min-width="55"></el-table-column>
            <el-table-column prop="userCode" label="商户ID" width="136"></el-table-column>
            <el-table-column prop="" label="账号" width="120">
                <template scope="scope">
                    {{scope.row.userPhone ? scope.row.userPhone : scope.row.userEmail}}
                </template>
            </el-table-column>
            <el-table-column prop="venName" label="商户名称/企业名称" min-width="150"></el-table-column>
            <el-table-column prop="venType" label="商户性质" min-width="130">
                <template scope="scope">
                    {{scope.row.venType | venTypefiter}}
                </template>
            </el-table-column>
            <el-table-column prop="venSatatus" label="入驻状态" min-width="180">
                <template scope="scope">
                    {{scope.row.venSatatus | venSatatusfiter}}
                </template>
            </el-table-column>
            <el-table-column prop="venProperties" label="企业性质" min-width="130">
                <template scope="scope">
                    {{scope.row.venProperties | venPropertiesfiter}}
                </template>
            </el-table-column>
            <el-table-column prop="createDate" label="入驻申请时间" min-width="150">
                <template scope="scope">
                    {{scope.row.createDate, 'ms' | millisecondFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="settlementCycle" label="结算周期" min-width="100">
                <template scope="scope">
                    <div  v-if="scope.row.settlementCycle">
                        T + {{scope.row.settlementCycle}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="operation" label="操作" width="160" fixed="right">
                <template scope="scope">
                    <el-button type="text" class="zq-restore"v-if="tableDatas" @click="viewDetails(scope.row)">查看</el-button>
                    <el-button type="text" class="zq-restore" v-if="scope.row.venSatatus == 1" @click="toExamine(scope.row)">审核</el-button>
                    <el-button type="text" class="zq-restore" v-if="scope.row.venSatatus == 2" @click="signGo(scope.row)">签订</el-button>
                    <el-button type="text" class="zq-restore" v-if="scope.row.venSatatus == 2 || scope.row.venSatatus == 4" @click="cancelshenhe(scope.row)">取消审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="pageInfo.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pageInfo.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="total">
            </el-pagination>
        </div>
        <!--批量设置弹框-->
        <div class="reset-dialog">
            <div  class="reset-dialog dialog_wid340 textare_reset300" >
                <el-dialog title="审核" :visible.sync="dialogVisible">
                    <div class="prompt">确定要对商户取消审核？</div>
                    <textarea v-model="rejectext" :maxlength="200"  placeholder="请输入取消审核理由"></textarea>
                    <span class="last-num">{{rejectextNum}}/200</span>
                    <div slot="footer" class="dialog-footer">
                        <el-button class="xe-button-normal" type="primary" @click="submitheAudit">确 定</el-button>
                        <el-button class="xe-button-normal" @click="canceltheAudit">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import permission from 'mixins/permission.js';
    import {venSatatus, venSource} from '@/dataControl.js';
    export default {
        mixins: [permission],
        data() {
            return {
                permissionObj: {},
                dialogVisible: false,
                nonessentialParameter: {
                    venSatatus: '',
                    venName: '',
                    loginAccount: '',
                    venSource: '',
                    startDate: '',
                    userCode: '',
                    endDate: ''
                }, // 表格搜索非必须要参数
                rejectext: '',
                tableDatas: [],
                tableDataLoading: false,
                startDates: '',
                endDates: '',
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10
                },
                total: 0,
                deleteRow: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            startDateFn(val) {
                this.startDates = val;
            },
            endDateFn(val) {
                this.endDates = val;
            },
            queryTableData() {
                this.enquiryForm();
            },
            viewDetails(row) {
                if (row.venSatatus !== 4) {
                    this.$router.push({name: 'viewmerchantauditdetails', query: {userCode: row.userCode}});
                } else { // 审核状态为（签订）
                    this.$router.push({name: 'viewmerchantdetails', query: {userCode: row.userCode}});
                }
            },
            signGo(row) {
              // 签订页面跳转
                this.$router.push({name: 'merchantsigning', query: {userCode: row.userCode}});
            },
            toExamine(row) {
              // 审核页面跳转
                this.$router.push({name: 'merchantauditdetails', query: {userCode: row.userCode}});
            },
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                Object.assign(params, this.pageInfo, this.nonessentialParameter);
                params.startDate = this.startDates;
                params.endDate = this.endDates;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/queryVenList',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.total = res.data.pageInfo.total;
                        this.tableDatas = res.data.xeVenInfoList;
                    }
                    this.tableDataLoading = false;
                }).catch((error) => {
                    console.log(error);
                    this.tableDataLoading = false;
                });
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val !== 0) {
                    this.pageInfo.pageNum = val;
                    this.enquiryForm();
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.enquiryForm();
            },
            canceltheAudit() {
                this.dialogVisible = false;
                this.rejectext = '';
            },
            cancelshenhe(row) {
                this.dialogVisible = true;
                this.deleteRow = row;
            },
            submitheAudit() {
                if (this.rejectext) {
                    let params = {};
                    params.version = this.deleteRow.version;
                    params.venSatatus = 3;
                    params.type = 1;
                    params.userCode = this.deleteRow.userCode;
                    params.venRejectReason = this.rejectext;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-mis/manager/venmanager/updateVenApproval',
                        data: params
                    }).then((res) => {
                        if (res.data.remote && res.data.remote.status !== '0000') {
                        } else {
                            this.enquiryForm();
                            this.dialogVisible = false;
                            console.log(res);
                            window.$wxeMessage({
                                type: 'success',
                                message: `取消审核成功`
                            });
                            this.rejectext = '';
                        }
                    }).catch((error) => {
                        console.log(error);
                    });
                } else {
                    this.$alert('请填写取消审核理由', {
                        confirmButtonText: '确定',
                        type: 'info'
                    });
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
            },
            venSatatuslist() {
                return venSatatus;
            },
            venSourcelist() {
                return venSource;
            },
            rejectextNum: function() {
                return this.rejectext.length;
            }
        }
    };
</script>
