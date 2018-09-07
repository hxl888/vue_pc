<template lang="html">
    <div class="recycleBin m-router-con">
        <!--盘点单-->
        <div class="publicorder-serch">
            <div class="u-top-search">
                <el-form ref="formData" :model="formData" :inline="true">
                    <el-form-item prop="storeId">
                        <el-select size="small" v-model="formData.storeId" placeholder="选择仓库" calerable filterable class="xe-input-l40">
                            <el-option
                                    v-for = "item in actionList"
                                    :key="item.storeId"
                                    :label = "item.storeName"
                                    :value = "item.storeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  prop="checkStockStatus">
                        <el-select size="small" v-model="formData.checkStockStatus" placeholder="盘点状态" class="xe-input-l40">
                            <el-option
                                    v-for="item in checkStockStatusList"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="checkCode">
                        <el-input v-model="formData.checkCode" size="small" placeholder="盘点单号" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
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
                            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline" label-width="65px">
                                <div>
                                    <el-form-item prop="searchTimeType">
                                        <el-select size="small" class="xe-input-w110" v-model="formData.searchTimeType" placeholder="请选择">
                                            <el-option label="盘点时间" value='1'></el-option>
                                            <el-option label="完成时间" value='2'></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="searchTimeStart" label="" class='z-mr0'>
                                        <el-date-picker
                                            size="small"
                                            v-model="formData.searchTimeStart"
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
                                            v-model="formData.searchTimeEnd"
                                            class="xe-input-l40 dateInput"
                                            type="date"
                                            @change="endDateStrFn"
                                            placeholder="选择日期">
                                        </el-date-picker>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item label="盘点单号" prop="checkCode">
                                        <el-input v-model="formData.checkCode" size="small" placeholder="盘点单号" class="xe-input-l40"></el-input>
                                    </el-form-item>
                                    <el-form-item  prop="checkStockStatus" label="盘点状态">
                                        <el-select size="small" v-model="formData.checkStockStatus" placeholder="盘点状态" class="xe-input-l40">
                                            <el-option
                                                    v-for="item in checkStockStatusList"
                                                    :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item prop="storeId" label="选择仓库">
                                        <el-select size="small" v-model="formData.storeId" placeholder="选择仓库" calerable filterable class="xe-input-l40">
                                            <el-option
                                                    v-for = "item in actionList"
                                                    :key="item.storeId"
                                                    :label = "item.storeName"
                                                    :value = "item.storeId">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <div>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal"  @click="resetForm('formData')">重置</el-button>
                            </div>
                        </div>
                    </div>
                <!--高级搜索样式end-->
            </div>
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="starInventory" class="xe-button-normal"><i class="iconfont icon-kaishi"></i> 开始新盘点</el-button>
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daoru"></i> Excel导入</el-button> -->
            <el-button @click="completeInvents" class="xe-button-normal"><i class="iconfont icon-wancheng"></i> 完成盘点</el-button>
            <el-button @click="abandoneds" class="xe-button-normal"><i class="iconfont icon-zuofei"></i> 废弃</el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i> 导出</el-button>
            <el-button class="xe-button-normal" @click="outDataDetail"><i class="iconfont icon-daochu"></i> 导出明细</el-button>
            </div>
        <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table @sort-change="timeSort" ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                    <el-table-column fixed="left" type="selection" min-width="34" class-name="selectionTd"></el-table-column>
                    <el-table-column prop="storeId" label="仓库编码" min-width="95"></el-table-column>
                    <el-table-column prop="storeName" label="仓库名称" min-width="150"></el-table-column>
                    <el-table-column prop="checkCode" label="盘点编号" min-width="180"></el-table-column>
                    <el-table-column prop="checkStockStatus" label="盘点状态" min-width="95">
                        <template scope="scope">
                            {{scope.row.checkStockStatus | checkstateToText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createDate" sortable="custom" label="盘点时间" min-width="150"></el-table-column>
                    <el-table-column prop="durationDate" label="盘点历时" min-width="95">
                        <template scope="prop">
                            {{prop.row.durationDate | MSFormat}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="finishDate" sortable="custom" label="完成时间" min-width="150"></el-table-column>
                    <el-table-column prop="createUser" label="盘点人" min-width="120"></el-table-column>
                    <el-table-column prop="checkRemark" label="备注" min-width="95"></el-table-column>
                    <el-table-column
                            prop=""
                            label="操作"
                            fixed="right"
                            min-width="200"
                    >
                        <template scope="scope">
                            <div>
                                <a v-if="scope.row.checkStockStatus === 1" href="javascript:;" class="alinkblu" @click="continueInvent(scope.row)">继续盘点</a>
                                <a v-if="scope.row.checkStockStatus === 1" href="javascript:;" class="alinkblu" @click="completeInvent(scope.row)">完成盘点</a>
                                <a v-if="scope.row.checkStockStatus === 1" href="javascript:;" class="alinkblu" @click="abandoned(scope.row)">废弃</a>
                                <a v-if="scope.row.checkStockStatus !== 1" href="javascript:;" class="alinkblu" @click="lookDetail(scope.row)">查看盘点历史</a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
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
            </div>
        </div>
        <!--修改用户类型-->
            <el-dialog title="选择仓库" :visible.sync="storetypedilog" class="reset-dialog dialog_wid340 error-tishi">
                <el-form ref="storeform" :model="storeform" :rules="storetypereg" label-width="80px">
                    <el-form-item label="选择仓库" prop="storetype">
                        <el-select size="small" v-model="storeform.storetype" placeholder="请选择仓库">
                            <el-option
                              v-for="item in actionListOpen"
                              :key="item.storeId"
                              :label="item.storeName"
                              :value="item.storeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button class="xe-button-normal" type="primary" @click="storeYse('storeform')">确定</el-button>
                        <el-button class="xe-button-normal" @click="">取 消</el-button>
                    </div>
                </el-form>
            </el-dialog>
    </div>
</template>
<script>
    import {checkStockStatus} from '@/dataControl.js';
    export default {
        data() {
            var regstoretype = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择仓库'));
                }
            };
            return {
                storetypereg: {
                    storetype: [
                        { required: true, validator: regstoretype, trigger: 'change' }
                    ]
                },
                storetypedilog: false,
                storeform: {
                    storetype: ''
                },
                actionList: [],
                actionListOpen: [], // 已启用仓库查询
                multipleSelection: [],
                formData: {
                    storeId: '',
                    checkCode: '',
                    checkRemark: '',
                    checkStockStatus: '',
                    searchTimeStart: '',
                    searchTimeEnd: '',
                    dateSort: '',
                    searchTimeType: ''
                },
                outerUrl: '',
                outerDetailUrl: '',
                tableData: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                selectedCollection: [],
                abOn: 0
            };
        },
        created() {
            this.creatInf();
            this.pullDown();
        },
        methods: {
            timeSort(n) {
                if (n.prop === 'createDate') {
                    if (n.order === 'ascending') {
                        this.formData.dateSort = 1;
                    } else {
                        this.formData.dateSort = 2;
                    }
                } else {
                    if (n.order === 'ascending') {
                        this.formData.dateSort = 3;
                    } else {
                        this.formData.dateSort = 4;
                    }
                }
                this.creatInf();
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            continueInvent(row) {
                this.$router.push({name: 'inventoryCheck', query: {checkCode: row.checkCode}});
            },
            completeInvents() { // 批量完成
                this.selectInvr('完成', 2);
            },
            completeInvent(row) {
                let checkCodeS = [];
                checkCodeS.push(row.checkCode);
                this.abandAjax(checkCodeS, 1, row, 2, '完成');
            },
            abandAjax(data, status, flag, tip, str) {
                let Url = '';
                this.confimrFun('您确认' + str + '当前盘点单吗？', () => {
                    if (str === '废弃') {
                        Url = '/xe-route/xe-erp/checkManager/batchDiscardStoreCheck';
                    } else {
                        if (status === 1) {
                            Url = '/xe-route/xe-erp/checkManager/finishStoreCheck';
                        } else {
                            Url = '/xe-route/xe-erp/checkManager/batchFinishStoreCheck';
                        }
                    }
                    let params = {};
                    params.checkCodeS = data;
                    this.$http({
                        method: 'post',
                        url: Url,
                        data: params
                    }).then((res) => {
                        if (status === 1) {
                            flag.checkStockStatus = tip;
                        } else {
                            for (let i in this.tableData) {
                                for (let j in flag) {
                                    if (this.tableData[i].checkCode === flag[j].checkCode) {
                                        this.tableData[i].checkStockStatus = tip;
                                    }
                                }
                            }
                        }
                        window.$wxeMessage({
                            type: 'success',
                            message: '已' + str + '!'
                        });
                    }).catch((error) => {
                        console.log(error);
                    });
                }, () => {
                    console.log('取消点击');
                });
            },
            selectInvr(str, tips) {
                var _this = this;
                _this.abOn = 0;
                if (this.selectedCollection.length > 0) {
                    let checkCodeS = [];
                    this.selectedCollection.some((item) => {
                        if (item.checkStockStatus !== 1) {
                            _this.abOn ++;
                        }
                    });
                    if (_this.abOn === 0) {
                        if (this.selectedCollection.length > 10) {
                            this.$alert('最多批量' + str + '10条盘点单，请重新选择。', {
                                type: 'info'
                            });
                        } else {
                            for (let i in this.selectedCollection) {
                                checkCodeS.push(this.selectedCollection[i].checkCode);
                            }
                            this.abandAjax(checkCodeS, 2, this.selectedCollection, tips, str);
                        }
                    } else {
                        this.$alert('请勾选需要' + str + '的盘点单', {
                            type: 'info'
                        });
                    }
                    // this.abandAjax(checkCodeS);
                } else {
                    this.$alert('请勾选需要' + str + '的盘点单', {
                        type: 'info'
                    });
                }
            },
            abandoned(row) {
                let checkCodeS = [];
                checkCodeS.push(row.checkCode);
                this.abandAjax(checkCodeS, 1, row, 3, '废弃');
            },
            abandoneds() {
                this.selectInvr('废弃', 3);
            },
            // 操作项公共方法---------------------------
            confimrFun(title, sucesfun, errorfun) {
                this.$confirm(`${title}`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    sucesfun && sucesfun();
                }).catch(() => {
                    errorfun && errorfun();
                });
            },
            lookDetail(row) {
                this.$router.push({name: 'stockTaking', query: {checkCode: row.checkCode}});
            },
            storeYse(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$router.push({name: 'inventoryCheck', query: {storetype: this.storeform.storetype}});
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            starInventory(row) {
                this.storetypedilog = true;
                this.pullDown(true);
                console.log(this.storetype);
            },
            onSubmit() {
                console.log(this.formData);
                this.creatInf();
            },
            startDateStrFn(val) {
                this.formData.searchTimeStart = val;
            },
            endDateStrFn(val) {
                this.formData.searchTimeEnd = val;
            },
//            仓库下拉
            pullDown(status) {
                let params = {};
                params.lcfbFlag = '';
                if (status) {
                    params.storeStatus = 2;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: params
                }).then((res) => {
                    if (status) {
                        this.actionListOpen = res.data.actionList;
                    }
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            outDataDetail() {
                console.log('test', this.outerDetailUrl);
                window.open(this.outerDetailUrl, '_blank');
            },
            creatInf() {
                let data = {};
                data = this.formData;
                data.pageNum = this.pageInfo.pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.outerUrl = '/xe-route/xe-erp/storeCenterExport/storeCheckList?checkCode=' + data.checkCode + '&checkRemark=' + data.checkRemark + '&checkStockStatus=' + data.checkStockStatus + '&dateSort=' + data.dateSort + '&searchTimeEnd=' + data.searchTimeEnd + '&searchTimeStart=' + data.searchTimeStart + '&searchTimeType=' + data.searchTimeType + '&storeId=' + data.storeId;
                this.outerDetailUrl = '/xe-route/xe-erp/storeCenterExport/storeCheckDetailList?checkCode=' + data.checkCode + '&checkRemark=' + data.checkRemark + '&checkStockStatus=' + data.checkStockStatus + '&dateSort=' + data.dateSort + '&searchTimeEnd=' + data.searchTimeEnd + '&searchTimeStart=' + data.searchTimeStart + '&searchTimeType=' + data.searchTimeType + '&storeId=' + data.storeId;
                this.$http({ // 查询盘点单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/checkManager/queryCheckList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        console.log(res);
                        this.tableData = res.data.actionList;
                        this.pageInfo = res.data.xePageInfo;
                        // this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.creatInf();
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.creatInf();
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.creatInf();
            },
            handleSelectionChange(val) {
                this.selectedCollection = val;
            }
        },
        computed: {
            checkStockStatusList() {
                return checkStockStatus;
            }
        }
    };
</script>

<style lang="scss">
    .pub-toolbar{
        margin: 23px 0 10px;
    }
</style>
