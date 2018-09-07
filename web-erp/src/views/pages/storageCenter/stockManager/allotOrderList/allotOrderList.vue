<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline">
                <el-form-item prop="searchType">
                    <el-select size="small" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                        <el-option label="调拨单号" value="1"></el-option>
                        <el-option label="出库单号" value="2"></el-option>
                        <el-option label="入库单号" value="3"></el-option>
                        <el-option label="商品名称" value="4"></el-option>
                        <el-option label="商品货号" value="5"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchCondition">
                    <el-input v-model="puboderSerData.searchCondition" size="small" :placeholder="placeholder" class="xe-input-l40"></el-input>
                </el-form-item>
                <el-form-item prop="sendStoreId">
                    <el-select size="small" v-model="puboderSerData.sendStoreId" placeholder="调出仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiptStoreId">
                    <el-select size="small" v-model="puboderSerData.receiptStoreId" placeholder="调入仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal" @click="resetForm('puboderSerData')">
                        重置
                    </el-button>
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
                            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline" label-width="65px">
                                <div class="clearfix">
                                    <el-form-item prop="searchType">
                                        <el-select size="small" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                                            <el-option label="调拨单号" value="1"></el-option>
                                            <el-option label="出库单号" value="2"></el-option>
                                            <el-option label="入库单号" value="3"></el-option>
                                            <el-option label="商品名称" value="4"></el-option>
                                            <el-option label="商品货号" value="5"></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="searchCondition">
                                        <el-input v-model="puboderSerData.searchCondition" size="small" :placeholder="placeholder" class="xe-input-l40"></el-input>
                                    </el-form-item>
                                </div>
                                <div class="clearfix">
                                    <el-form-item prop="searchTimeType">
                                        <el-select size="small" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                                            <el-option label="盘点时间" value='1'></el-option>
                                            <el-option label="完成时间" value='2'></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="searchTimeStart" label="" class='z-mr0'>
                                        <el-date-picker
                                            size="small"
                                            v-model="puboderSerData.searchTimeStart"
                                            class="xe-input-l40 dateInput"
                                            type="date"
                                            @change="startDateStrFn"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                        <span class="Cornet">-</span>
                                    </el-form-item>
                                    <el-form-item prop="searchTimeEnd">
                                        <el-date-picker
                                            size="small"
                                            v-model="puboderSerData.searchTimeEnd"
                                            class="xe-input-l40 dateInput"
                                            type="date"
                                            @change="endDateStrFn"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item prop="sendStoreId" label="调出仓库">
                                        <el-select size="small" v-model="puboderSerData.sendStoreId" placeholder="调出仓库" calerable filterable class="xe-input-l40">
                                            <el-option
                                                    v-for = "item in actionList"
                                                    :key="item.storeId"
                                                    :label = "item.storeName"
                                                    :value = "item.storeId">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="receiptStoreId" label="调入仓库">
                                        <el-select size="small" v-model="puboderSerData.receiptStoreId" placeholder="调入仓库" calerable filterable class="xe-input-l40">
                                            <el-option
                                                    v-for = "item in actionList"
                                                    :key="item.storeId"
                                                    :label = "item.storeName"
                                                    :value = "item.storeId">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item label="调拨状态" prop="allotStatus">
                                        <el-select size="small" class="xe-input-l40" v-model="puboderSerData.allotStatus" placeholder="调拨状态">
                                            <el-option
                                                    v-for = "item in allotStatusList"
                                                    :key="item.value"
                                                    :label = "item.name"
                                                    :value = "item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <div>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal"  @click="resetForm('puboderSerData')">重置</el-button>
                            </div>
                        </div>
                    </div>
                <!--高级搜索样式end-->
         </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="addAllocation"><i class="iconfont icon-xinzeng"></i>&nbsp;新建调拨</el-button>
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button> -->
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button> -->
            <el-button @click="AllAbandoned" class="xe-button-normal"><i class="iconfont icon-zuofei"></i>&nbsp;废弃</el-button>
        </div>
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    :data="pubTabDatacon"
                    border
                    style="width: 100%"
                    @selection-change="handleSelChange"
                    @sort-change="timeSort"
                    >
                    <el-table-column
                      prop=""
                      label=""
                      width="62"
                      fixed
                      >
                      <template scope="scope">
                            {{scope.$index + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      class-name="selectionTd"
                      type="selection"
                      fixed
                      >
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label="调拨单号"
                      min-width="150"
                      >
                      <template scope="scope">
                          <a href="javascript:;" class="alinkblu" @click="showShop(scope.row)">
                            {{scope.row.allotCode}}
                          </a>
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="createDate"
                        label="创建时间"
                        min-width="150"
                        sortable="custom"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="createUser"
                        label="创建人"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="sendStoreName"
                        label="调出仓库"
                        min-width="140"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="receiptStoreName"
                        label="调入仓库"
                        min-width="140"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotAmount"
                        label="调拨商品总额"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotOutOrder"
                        label="调拨出库单号"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotOutTime"
                        label="调拨出库时间"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotInOrder"
                        label="调拨入库单号"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotInTime"
                        label="调拨入库时间"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotStatus"
                        label="调拨状态"
                        min-width="120"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.allotStatus | allotStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        min-width="200"
                        fixed="right"
                        label="操作">
                        <template scope="scope">
                            <div>
                                <a href="javascript:;" class="alinkblu" @click="allotDatils(scope.row)">查看</a>
                                <a v-if="scope.row.allotStatus === 1 || scope.row.allotStatus === 2" href="javascript:;" class="alinkblu" @click="editorAll(scope.row)">编辑</a>
                                <a v-if="scope.row.allotStatus === 1" href="javascript:;" class="alinkblu" @click="Abandoned(scope.row)">废弃</a>
                                <a v-if="scope.row.allotStatus === 1" href="javascript:;" class="alinkblu" @click="examine(scope.row)">审核</a>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
                    <div class="tab-foot xe-pagination-panel">
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
            </div>
            <div class="pub-tabDatadetails">
                <el-tabs v-model="tabCard_val" type="card" @tab-click="handleClick">
                    <el-tab-pane label="商品信息" name="first">
                        <refund-merchandise appropriationNote="true" :refundMerch="refundMerch"></refund-merchandise>
                    </el-tab-pane>
                </el-tabs>
            </div>
         </div>
        <div>
            <el-dialog
                title="审核"
                :visible.sync="dialogFormVisible"
                size="mini"
                class="reset-dialog dialog_wid340 textare_reset300"
                >
                    <div class="tab-editrequise">
                        审核通过后，系统会根据调拨数量进行库存调整。您确认审核通过吗？
                    </div>
                    <el-form :model="examineSon" ref="examineSon" :rules="rules">
                        <el-form-item prop="examinestr">
                            <el-input type="textarea" placeholder="请填写调拨单驳回原因50字以内" :maxlength="50" v-model="examineSon.examinestr"></el-input>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                        <el-button class="xe-button-normal" type="primary" @click="examineT(4)">通过</el-button>
                        <el-button class="xe-button-normal" @click="examineT(2)">驳回</el-button>
                        <el-button class="xe-button-normal" @click="examineC">取消</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import refundMerchandise from './refundMerchandise';
    import {allotStatus} from '@/dataControl.js';
    export default {
        data() {
            return {
                placeholder: '请输入',
                rejectext: '',
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 20
                },
                dialogFormVisible: false,
                actionList: [],
                tabCard_val: 'first',
                puboderSerData: {
                    searchCondition: '',
                    searchType: '',
                    searchTimeType: '',
                    searchTimeStart: '',
                    searchTimeEnd: '',
                    sendStoreId: '',
                    receiptStoreId: '',
                    allotStatus: '',
                    fieldArr: ''
                },
                pubTabDatacon: [],
                refundMerch: {},
                Abandonedarr: [],
                seleCollection: [],
                examineArr: {},
                examineSon: {
                    examinestr: '',
                    resetFields: ''
                },
                rules: {
                    examinestr: [
                        { required: true, message: '请填写驳回原因', trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.Warehouse();
            this.onSubmit();
        },
        methods: {
            timeSort(n) {
                if (n.order === 'ascending') {
                    this.puboderSerData.fieldArr = 1;
                } else {
                    this.puboderSerData.fieldArr = 2;
                }
                this.onSubmit();
            },
            examineC() {
                this.dialogFormVisible = false;
            },
            examineAjax(n) {
                var _this = this;
                let data = {};
                data.allotCode = this.examineArr.allotCode;
                data.allotStatus = n;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/allotManager/checkStoreAllot',
                    data: data
                }).then((res) => {
                    console.log('成功');
                    this.dialogFormVisible = false;
                    window.$wxeMessage({
                        type: 'success',
                        message: '完成审核!'
                    });
                    setTimeout(function () {
                        _this.onSubmit();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            examineT(n) {
                if (n === 2) {
                    this.$refs['examineSon'].validate((valid) => {
                        if (valid) {
                            this.examineAjax(n);
                        } else {
                            console.log('error submit!!');
                            return false;
                        }
                    });
                } else {
                    // this.
                    this.examineAjax(n);
                }
            },
            examine(row) {
                this.dialogFormVisible = true;
                this.examineArr = row;
            },
            Warehouse() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        lcfbFlag: ''
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            showShop(row) {
                let data = {};
                data.allotCode = row.allotCode;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/allotManager/queryAllotDetailList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.refundMerch = res.data;
                        console.log(this.refundMerch);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.onSubmit();
            },
            onSubmit() {
                let data = {};
                data = this.puboderSerData;
                data.pageNum = this.pagelist.pageNum;
                data.pageSize = this.pagelist.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/allotManager/queryStoreAllotList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.pubTabDatacon = res.data.actionList;
                        this.pagelist = res.data.xePageInfo;
                        if (this.pubTabDatacon && this.pubTabDatacon.length && this.pubTabDatacon[0].allotCode) {
                            this.showShop(this.pubTabDatacon[0]);
                        } else {
                            this.refundMerch = {};
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageNum = val;
                this.onSubmit();
            },
            handleCurrentChange(val) {
                this.pagelist.pageNum = val;
                this.onSubmit();
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSelChange(val) {
                this.seleCollection = val;
            },
            startDateStrFn(val) {
                this.puboderSerData.searchTimeStart = val;
            },
            endDateStrFn(val) {
                this.puboderSerData.searchTimeEnd = val;
            },
            addAllocation() {
                this.$router.push({name: 'addallotOrder'});
            },
            editorAll(row) {
                this.$router.push({name: 'editorallotOrder', query: {allotCode: row.allotCode}});
            },
            allotDatils(row) {
                this.$router.push({name: 'seeallotOrder', query: {allotCode: row.allotCode}});
            },
            abandoned() {
                var _this = this;
                this.$confirm('您确认废弃选中的调拨单吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let data = {};
                    data.allotCodeS = this.Abandonedarr;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/allotManager/batchDiscardAllot',
                        data: data
                    }).then((res) => {
                        if (res.data) {
                            window.$wxeMessage({
                                type: 'success',
                                message: '完成废弃!'
                            });
                        }
                        setTimeout(function () {
                            _this.onSubmit();
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch(_ => {
                    console.log('取消');
                });
            },
            Abandoned(row) {
                this.Abandonedarr = [];
                this.Abandonedarr.push(row.allotCode);
                this.abandoned();
            },
            AllAbandoned() {
                this.Abandonedarr = [];
                var nuM = 0;
                if (this.seleCollection.length > 0) {
                    if (this.seleCollection.length > 10) {
                        this.$alert('最多批量废弃10条调拨单，请重新选择。', {
                            type: 'info'
                        });
                    } else {
                        for (let i in this.seleCollection) {
                            if (this.seleCollection[i].allotStatus !== 1) {
                                nuM++;
                            }
                            if (nuM === 0) {
                                this.Abandonedarr.push(this.seleCollection[i].allotCode);
                            }
                        }
                        if (nuM === 0) {
                            this.abandoned();
                        } else {
                            this.$alert('请勾选状态为待审核的调拨单', {
                                type: 'info'
                            });
                        }
                    }
                } else {
                    this.$alert('请先勾选需要废弃的调拨单。', {
                        type: 'info'
                    });
                }
            }
        },
        components: {
            refundMerchandise
        },
        computed: {
            allotStatusList() {
                return allotStatus;
            }
        },
        watch: {
            dialogFormVisible(n) {
                if (n === false) {
                    this.$refs['examineSon'].resetFields();
                }
            },
            'puboderSerData.searchType'(n) {
                if (n === '1') {
                    this.placeholder = '请输入调拨单号';
                } else if (n === '2') {
                    this.placeholder = '请输入出库单号';
                } else if (n === '3') {
                    this.placeholder = '请输入入库单号';
                } else if (n === '4') {
                    this.placeholder = '请输入商品名称';
                } else if (n === '5') {
                    this.placeholder = '请输入商品货号';
                }
            }
        }
    };
</script>

<style lang="scss">
    .el-tabs__nav{
        float: left;
    }
    .textare_reset300 textarea{
        margin-top: 20px;
        width: 380px;
        height: 80px;
    }
</style>
