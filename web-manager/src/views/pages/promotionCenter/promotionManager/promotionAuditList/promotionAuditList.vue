<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" class="" :model="searchform" :inline=true>
                    <el-form-item label="" prop="disSatatus">
                        <el-select class="xe-input-l40" v-model="searchform.disSatatus" placeholder="审核状态">
                            <el-option
                                v-for="(item, index) in proStatuslist"
                                :key="index"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="loginAccount">
                        <el-input placeholder="商户名称/账号/ID" v-model="searchform.loginAccount" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item class="timeLength marR0" prop="startDateStr">
                        <el-date-picker
                            v-model="searchform.startDateStr"
                            type="date"
                            placeholder="选择日期"
                            @change="startDateStrFn"
                            :picker-options="pickerOptions0">
                        </el-date-picker>
                        <span class="pictim_bor">-</span>
                    </el-form-item>
                     <el-form-item  class="timeLength" prop="endDateStr">
                         <el-date-picker
                        v-model="searchform.endDateStr"
                        type="date"
                        placeholder="选择日期"
                        @change="endDateStrFn"
                        :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button type="primary" @click="queryVenDisList">查询</el-button>
                        <el-button @click="resetForm('searchform')">重置</el-button>
                        <el-button  @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                    </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div>
                            <el-form-item label="申请时间" prop="startDateStr" class="marR0">
                                <el-date-picker
                                    v-model="searchform.startDateStr"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDateStr">
                                <el-date-picker
                                    v-model="searchform.endDateStr"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="loginAccount" label="供应商名称">
                                <el-input placeholder="商户名称/账号/ID" v-model="searchform.loginAccount" class="xe-input-168"></el-input>
                            </el-form-item>
                             <el-form-item label="审核状态" prop="disSatatus">
                                <el-select class="xe-input-168" v-model="searchform.disSatatus" placeholder="审核状态">
                                    <el-option
                                        v-for="(item, index) in proStatuslist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="活动类型" prop="disType">
                                <el-select class="xe-input-168" v-model="searchform.disType" placeholder="活动类型">
                                     <el-option
                                        v-for="(item, index) in disTypelist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item>
                                <el-button type="primary" @click="queryVenDisList">查询</el-button>
                                <el-button  @click="resetForm('searchform')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="allAuditedMethod"><i class="iconfont icon-shenhe"></i> 审核</el-button>
            <!--<el-button><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        </div>
        <el-table ref="multipleTable" :data="tableDatas" v-loading="tableDataLoading" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" min-width="55" fixed="left"></el-table-column>
            <el-table-column prop="userCode" label="商户ID" min-width="150"></el-table-column>
            <el-table-column prop="" label="账号" min-width="130">
                <template scope="scope">
                    <div>
                        {{scope.row.mobile ? scope.row.mobile : scope.row.email}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="venName" min-width="130" label="商户名称"></el-table-column>
            <el-table-column prop="disSatatus"min-width="130" label="审核状态">
                <template scope="scope">
                    <div>
                        {{scope.row.disSatatus | venSatatusfiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="disType" min-width="150" label="活动类型">
                <template scope="scope">
                    <div>
                        {{scope.row.disType | disTypefilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" min-width="150" label="申请提交时间">
                <template scope="scope">
                    <div>
                        {{scope.row.createDate, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="disRejectReason" min-width="150" label="驳回原因">
                <template scope="scope">
                    <div style="max-height: 66px;overflow: hidden" v-if="scope.row.disSatatus == 3">
                        <div v-if="scope.row.disRejectReason.length > 28">
                            <el-tooltip effect="dark"  placement="top" v-if="scope.row.disRejectReason">
                                <!--<div slot="content">{{scope.row.disRejectReason.substr(0, 50)}} <span v-if="scope.row.disRejectReason.substr(50, 50)"><br/>{{scope.row.disRejectReason.substr(50, 50)}}</span><span v-if="scope.row.disRejectReason.substr(100, 50)"><br/>{{scope.row.disRejectReason.substr(100, 50)}}</span><span v-if="scope.row.disRejectReason.substr(150, 50)"><br/>{{scope.row.disRejectReason.substr(150, 50)}}</span></div>-->
                                <div slot="content">{{scope.row.disRejectReason.substr(0, 50)}}<span v-if="scope.row.disRejectReason.substr(50, 50)"><br/>{{scope.row.disRejectReason.substr(50, 50)}}</span><span v-if="scope.row.disRejectReason.substr(100, 50)"><br/>{{scope.row.disRejectReason.substr(100, 50)}}</span> <span v-if="scope.row.disRejectReason.substr(150, 50)"><br/>{{scope.row.disRejectReason.substr(150, 50)}}</span></div>
                                <div>{{scope.row.disRejectReason}}</div>
                            </el-tooltip>
                        </div>
                        <div v-else>
                            <div>{{scope.row.disRejectReason}}</div>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="auditDate" min-width="150" label="驳回时间">
                <template scope="scope">
                    <div v-if="scope.row.disSatatus == 3">
                        {{scope.row.auditDate, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="modifyUser" min-width="130" label="驳回操作人">
                <template scope="scope">
                    <div v-if="scope.row.disSatatus == 3">
                        {{scope.row.modifyUser}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" label="操作" min-width="125" fixed="right">
                <template scope="scope">
                    <el-button type="text" v-if="scope.row.disSatatus == 1" @click="auditeMethodGo(scope.row)" class="zq-restore">审核</el-button>
                    <el-button type="text" v-if="scope.row.disSatatus == 2" @click="cancelAuditedMethod(scope.row)" class="zq-restore">取消审核</el-button>
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
        <!--批量设置弹框-->
        <div class="reset-dialog">
            <div  class="reset-dialog dialog_wid340 textare_reset300" >
                <el-dialog title="审核" :visible.sync="dialogVisible">
                    <div class="prompt">确定要批量审核,共{{selectedArray && selectedArray.length ? selectedArray.length : (seletRow ? 1 : 0)}}个促销申请？</div>
                    <div class="prompt">若驳回，请填写原因</div>
                    <textarea v-model="rejectext" :maxlength="200" placeholder="请输入驳回理由"></textarea>
                    <span class="last-num">{{rejectextNum}}/200</span>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="auditedMethodsubmit">通过</el-button>
                        <el-button @click="cancelTheaudit">驳回</el-button>
                        <el-button @click="cancelerror">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
        <!--单条操作项-->
        <div class="reset-dialog">
            <div  class="reset-dialog dialog_wid340 textare_reset300" >
                <el-dialog title="审核" :visible.sync="dialogVisible2">
                    <div class="prompt">确定要取消审核？</div>
                    <textarea v-model="rejectext"  :maxlength="200" placeholder="请输入驳回理由"></textarea>
                    <span class="last-num">{{rejectextNum}}/200</span>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="cancelTheaudit">确定</el-button>
                        <el-button @click="cancelerror">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>
<script>
    import permission from 'mixins/permission';
    import { proStatus, disType } from '@/dataControl';
    export default {
        mixins: [permission],
        data() {
            return {
                permissionObj: {},
                pickerOptions0: '',
                dialogVisible: false,
                dialogVisible2: false,
                rejectext: '',
                startDateStrs: '',
                endDateStrs: '',
                selectedArray: [], // 多选操作勾选数据存储
                seletRow: null,
                tableDatas: [],
                tableDataLoading: false,
                searchform: {
                    'disSatatus': '',
                    'loginAccount': '',
                    'disType': '',
                    'startDateStr': '',
                    'endDateStr': ''
                },
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                productRul: '/xe-route/xe-mis'
//            productRul: ''
            };
        },
        created() {
            this.queryVenDisList();
        },
        methods: {
            startDateStrFn(val) {
                this.startDateStrs = val;
            },
            endDateStrFn(val) {
                this.endDateStrs = val;
                console.log(val);
            },
            cancelTheaudit() { // 取消审核
                if (this.seletRow) {
                    if (this.seletRow.disSatatus !== 3) {
                        if (this.rejectext) {
                            this.auditedMethod(3);
                        } else {
                            this.$alert('请填写驳回原因', {
                                type: 'info'
                            });
                        }
                    } else {
                        this.$alert('您勾选的商户已经属于驳回状态，请您重新勾选', {
                            type: 'info',
                            callback: action => {
                                this.dialogVisible = false;
                            }
                        });
                    }
                }
                if (this.selectedArray.length > 0) {
                    this.selectedArray.some((item) => {
                        if (item.disSatatus !== 3) {
                            if (this.rejectext) {
                                this.auditedMethod(3);
                            } else {
                                this.$alert('请填写驳回原因', {
                                    type: 'info'
                                });
                            }
                        } else {
                            this.$alert('您勾选的商户已经属于驳回状态，请您重新勾选', {
                                type: 'info',
                                callback: action => {
                                    this.dialogVisible = false;
                                }
                            });
                        }
                    });
                }
            },
            allAuditedMethod() { // 批量审核通过
                if (this.selectedArray.length > 0) {
                    this.dialogVisible = true;
                } else {
                    this.$alert('请勾选需要批量审核的商户', {
                        type: 'info'
                    });
                }
            },
            auditedMethodsubmit() {
                if (this.selectedArray.length > 0) {
                    let flag = this.selectedArray.some((item) => {
                        return item.disSatatus !== 2 && item.disSatatus !== 3;
                    });
                    if (flag) {
                        this.$confirm(`确定要对商户审核通过么？`, '审核', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.auditedMethod(2);
                        }).catch(() => {
                        });
                    } else {
                        this.$alert('您勾选的商户属于驳回、已审核通过状态不能进行审核通过，请重新选择', {
                            type: 'info',
                            callback: action => {
                                this.dialogVisible = false;
                            }
                        });
                    }
                } else if (this.seletRow && !this.selectedArray.length) {
                    this.$confirm(`确定要对商户审核通过么？`, '审核', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.auditedMethod(2);
                    }).catch(() => {
                    });
                }
            },
            auditeMethodGo(row) {
                this.seletRow = row;
                this.toggleSelection();
                this.dialogVisible = true;
//                this.$confirm(`确定要对商户${row.venName}审核通过么？`, '审核', {
//                    confirmButtonText: '确定',
//                    cancelButtonText: '取消',
//                    type: 'warning'
//                }).then(() => {
//                }).catch(() => {
//                });
            },
            cancelAuditedMethod(row) {
                this.seletRow = row;
                this.toggleSelection();
                this.dialogVisible2 = true;
            },
            cancelerror() {
                if (this.dialogVisible2) {
                    this.dialogVisible2 = false;
                }
                if (this.dialogVisible) {
                    this.dialogVisible = false;
                }
                this.rejectext = '';
            },
            auditedMethod(status) {
                let params = {};
                let seletArray = this.selectedArray;
                if (status === 2) {
                    if (this.seletRow) {
                        let arr = [];
                        arr.push(this.seletRow.disId);
                        params.disIds = arr;
                    } else {
                        let disId = [];
                        for (let i in seletArray) {
                            if (seletArray[i].disSatatus !== 2 && seletArray[i].disSatatus !== 3) {
                                disId.push(seletArray[i].disId);
                            }
                        }
                        params.disIds = disId;
                    }
                    params.disSatatus = 2;
                } else if (status === 3) {
                    let disId = [];
                    let userCodes = [];
                    if (this.seletRow) {
                        let arr = [];
                        arr.push(this.seletRow.disId);
                        params.disIds = arr;
                        userCodes.push(this.seletRow.userCode);
                    } else {
                    }
                    for (let i in seletArray) {
                        params.disIds = disId;
                        disId.push(seletArray[i].disId);
                        userCodes.push(seletArray[i].userCode);
                    }
                    params.disRejectReason = this.rejectext;
                    params.disSatatus = 3;
                    params.userCode = userCodes;
                }
//                console.log('params-->', params);
                this.$http({
                    method: 'post',
                    url: `${this.productRul}/manager/venDisInfo/batchApply`,
                    data: params
                }).then((res) => {
                    console.log('--审核数据返回值--!!>', res);
                    if (this.dialogVisible2) {
                        this.dialogVisible2 = false;
                    }
                    if (this.dialogVisible) {
                        this.dialogVisible = false;
                    }
                    if (status === 2) {
                        window.$wxeMessage({
                            type: 'success',
                            message: `审核通过`
                        });
                    } else if (status === 3) {
                        window.$wxeMessage({
                            type: 'success',
                            message: `取消审核成功`
                        });
                    }
                    console.log('this.seletArray', seletArray);
                    for (let i in this.tableDatas) {
                        for (let j in seletArray) {
                            if (this.tableDatas[i].disId === seletArray[j].disId) {
                                this.tableDatas[i].disSatatus = status;
                                if (status === 3) {
                                    this.tableDatas[i].disRejectReason = this.rejectext;
                                }
                            }
                        }
                    }
                    if (this.seletRow) {
                        for (let o in this.tableDatas) {
                            if (this.tableDatas[o].disId === this.seletRow.disId) {
                                this.tableDatas[o].disSatatus = status;
                                if (status === 3) {
                                    this.tableDatas[o].disRejectReason = this.rejectext;
                                }
                            }
                        }
                    }
                    this.seletRow = null;
                    this.rejectext = '';
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                let _this = this;
                this.$refs[formName].resetFields();
                setTimeout(() => {
                    _this.queryVenDisList();
                }, 10);
            },
            queryVenDisList() {
                let params = {};
                this.tableDataLoading = true;
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                params.startDateStr = this.startDateStrs;
                params.endDateStr = this.endDateStrs;
                this.$http({
                    method: 'post',
                    url: `${this.productRul}/manager/venDisInfo/queryVenDisList`,
                    data: params
                }).then(res => {
                    console.log(res);
                    this.tableDatas = res.data.xeVenDisInfoList;
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDataLoading = false;
                }).catch(error => {
                    console.log(error);
                    this.tableDataLoading = false;
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.queryVenDisList();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.queryVenDisList();
                }
            },
            handleSelectionChange(val) {
                this.selectedArray = val;
                console.log('val--', val);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
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
            rejectextNum: function() {
                return this.rejectext.length;
            },
            proStatuslist() {
                return proStatus;
            },
            disTypelist() {
                return disType;
            }
        },
        watch: {
            dialogVisible(n) {
                if (n === false) {
                    this.rejectext = '';
                }
            }
        }
    };
</script>
