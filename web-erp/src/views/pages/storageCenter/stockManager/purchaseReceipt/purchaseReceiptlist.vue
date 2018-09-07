<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="searchType">
                    <el-select size="small" class="xe-input-w110" @change="searchTypeSelec" v-model="formData.searchType" placeholder="查询条件">
                        <el-option label="采购单编码" value="1"></el-option>
                        <el-option label="供货商名称" value="2"></el-option>
                        <el-option label="仓库名" value="4"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="searchText">
                    <el-input size="small" v-model="formData.searchText" :placeholder="placeholder"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="">
                    <el-select size="small" v-model="formData.purchStatus" placeholder="采购单状态" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in purchStatusList"
                                :key="item.value"
                                :label = "item.name"
                                :value = "item.value">
                        </el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" :model="formData" label-width ='73px' ref="formData" class="demo-form-inline">
                        <div style="clear:both;">
                            <el-form-item prop="queryFlagFn">
                                <el-select size="small" class="xe-input-w110" @change="searchTypeSelec" v-model="formData.searchType" placeholder="查询条件">
                                    <el-option label="采购单编码" value="1"></el-option>
                                    <el-option label="供货商名称" value="2"></el-option>
                                    <el-option label="仓库名" value="4"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="searchText">
                                <el-input size="small" v-model="formData.searchText" :placeholder="placeholder"></el-input>
                            </el-form-item>
                        </div>
                        <div style="clear:both;">
                            <el-form-item prop="searchType">
                                <el-select size="small" class="xe-input-w110" v-model="formData.searchTimeType" placeholder="查询条件">
                                    <el-option label="下单时间" value="1"></el-option>
                                    <el-option label="预计到货时间" value="2"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" prop="searchTimeStart" class="z-mr0">
                                <el-date-picker
                                        v-model="formData.searchTimeStart"
                                        class="xe-input-168"
                                        type="date"
                                        @change="startDateStrFn"
                                        placeholder="开始时间"
                                >
                                </el-date-picker>
                                <span class="Cornet">-</span>
                            </el-form-item>
                            <el-form-item prop="searchTimeEnd">
                                <el-date-picker
                                        v-model="formData.searchTimeEnd"
                                        class="xe-input-168"
                                        type="date"
                                        @change="endDateStrFn"
                                        placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <!-- <div style="clear:both;">
                            <el-form-item prop="purchStatus" label="采购单状态">
                                <el-select size="small" v-model="formData.purchStatus" placeholder="采购单状态" calerable filterable class="xe-input-l40">
                                    <el-option
                                            v-for = "item in purchStatusList"
                                            :key="item.value"
                                            :label = "item.name"
                                            :value = "item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="purchType" label="采购类型">
                                <el-select size="small" v-model="formData.purchType" placeholder="采购类型" class="xe-input-l40">
                                    <el-option
                                            v-for="item in purchTypeRuFlagList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div> -->
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="u-opera-btnBox">
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button> -->
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button> -->
            <el-button class="xe-button-normal"><i class="iconfont icon-dayin"></i>&nbsp;打印</el-button>
        </div>
        <div class="goodsTable">
            <el-table
                :data="tableData"
                border
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    prop=""
                    label=""
                    width="60"
                    >
                    <template scope="scope">
                        {{scope.$index + 1}}
                    </template>
                </el-table-column>
                <el-table-column
                    fixed="left"
                    prop=""
                    label=""
                    width="34"
                    class-name="selectionTd"
                    type="selection"
                >
                </el-table-column>
                <el-table-column
                        min-width="150"
                        label="采购单号">
                    <template scope="scope">
                        <a class="s-blue" ref="sd" @click="detail(scope.row)">{{scope.row.purchOrder}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="supplierName"
                    label="供货商名称"
                    min-width="170"
                >
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="仓库"
                    min-width="140"
                >
                </el-table-column>
                <el-table-column
                    prop="frontMoney"
                    label="定金"
                    min-width="100"
                >
                    <template scope="scope">
                        <div>
                            {{scope.row.frontMoney.toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchAmount"
                    label="采购费用"
                    min-width="150"
                >
                    <template scope="scope">
                        <div>
                            {{scope.row.purchAmount.toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="settlementMethod"
                    label="结算方式"
                    min-width="100"
                >
                    <template scope="scope">
                        <div>
                            {{scope.row.settlementMethod | settlementMethodToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchStatus"
                    label="采购单状态"
                    min-width="100"
                >
                    <template scope="scope">
                        <div>
                            {{scope.row.purchStatus | purchStatusToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purchType"
                    label="采购类型"
                    min-width="150"
                >
                    <template scope="scope">
                        <div>
                            {{scope.row.purchType | purchTypeToText}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="expectedArrivalDate"
                    label="预计到货日期"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="signDate"
                    label="下单时间"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                        prop=""
                        label="操作"
                        fixed="right"
                        min-width="90"
                >
                    <template scope="scope">
                        <div>
                            <a href="javascript:;" class="alinkblu" @click="warehousing(scope.row)">确认入库</a>
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
        <div class="pub-tabDatadetails" v-if="pubTableShow">
            <el-tabs v-model="tabCard_val" type="card" @tab-click="handleClick">
                <el-tab-pane label="商品明细" name="first">
                    <refundMerchandise :detailCode="detailCode" appropriationNote="true"></refundMerchandise>
                </el-tab-pane>
                <el-tab-pane label="采购单明细" name="second">
                    <purchaser :detailCode="detailCode" appropriationNote="true"></purchaser>
                </el-tab-pane>
                <el-tab-pane label="供货商明细" name="third">
                    <supplier :detailCode="detailCode" appropriationNote="true"></supplier>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {purchStatusFlag, purchTypeRuFlag} from '@/dataControl.js';
    import refundMerchandise from './refundMerchandise';
    import purchaser from './purchaser';
    import supplier from './supplier';
    export default {
        data() {
            return {
                pubTableShow: false,
                nextFlag: true,
                detailCode: {
                    purch: {
                        purchProductList: []
                    }
                },
                warehousingBut: false, // 确认入库开关
                placeholder: '请输入',
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                tableData2: [],
                tabCard_val: 'first',
                formData: {
                    purchStatus: '',
                    purchType: '',
                    checkStatus: '',
                    searchTimeEnd: '',
                    searchTimeStart: '',
                    searchText: '',
                    searchType: '',
                    searchTimeType: ''
                }
            };
        },
        created() {
            this.creatInf(1, this.formData);
        },
        methods: {
            searchTypeSelec() {
                this.formData.searchText = '';
            },
            warehousing(row) {
                // console.log('test', row);
                var arr = [];
//                let arrNum = 0;
                if (row.purchOrder === this.detailCode.purch.purchOrder) {
                    let flag = this.detailCode.products.some(item => {
                        return item.curArriveNum !== '';
                    });
                    for (let i in this.detailCode.products) {
                        if (this.detailCode.products[i].curArriveNum) {
                            arr.push({'curArriveNum': this.detailCode.products[i].curArriveNum, 'proSku': this.detailCode.products[i].proSku});
                        }
                    }
                    if (!flag) {
                        this.$alert('请先在底部修改处填入入库数量，才能进行确认入库', {
                            type: 'info'
                        });
                    } else {
                        let params = {};
                        params.purchStatusPre = row.purchStatus;
                        params.purchOrder = row.purchOrder;
                        params.purchType = row.purchType;
                        params.version = row.version;
                        params.purchProductList = arr;
                        this.$confirm('您确认按照当前填入的“本次入库量”进行入库操作吗？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.$http({
                                method: 'post',
                                url: '/xe-route/xe-erp/purch/goodsReceipt',
                                data: params
                            }).then((res) => {
                                this.pubTableShow = false;
                                this.creatInf(1, this.formData);
                                this.$xeMessage.success(res.msg);
                            }).catch((error) => {
                                console.log(error);
                            });
                        }).catch((cancel) => {
                            console.log(cancel);
                        });
                    }
                } else {
                    if (row.purchOrder) {
                        this.detail(row); // 点击确认入库切换到对应的明细中去
                    }
                    this.$alert('请先在底部修改处填入入库数量，才能进行“确认入库', {
                        type: 'info'
                    });
                }
            },
            detail(row) {
                this.pubTableShow = true;
                let params = {};
                params.purchOrder = row.purchOrder;
                params.version = row.version;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/purch/queryReceiptDetail',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.detailCode = res.data;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            startDateStrFn(val) {
                this.formData.searchTimeStart = val;
            },
            endDateStrFn(val) {
                this.formData.searchTimeEnd = val;
            },
            onSubmit() {
                console.log(this.formData);
                this.creatInf(1, this.formData);
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.creatInf(1, this.formData);
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.creatInf(this.pageInfo.pageNum, this.formData);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.creatInf(this.pageInfo.pageNum, this.formData);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = this.formData;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({ // 查询出库单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/purch/queryReceiptList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.tableData = res.data.purchList;
                        this.pageInfo = res.data.xePageInfo;
                        if (this.tableData && this.tableData.length && this.tableData[0].purchOrder) {
                            this.detail(this.tableData[0]);
                        } else {
                            this.detailCode.products = [];
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        watch: {
            'formData.searchType'(n) {
                console.log(n);
                if (n === '1') {
                    this.placeholder = '请输入采购单编码';
                } else if (n === '2') {
                    this.placeholder = '请输入供货商名称';
                } else if (n === '3') {
                    this.placeholder = '请输入仓库名';
                }
            }
        },
        computed: {
            purchStatusList() {
                return purchStatusFlag;
            },
            purchTypeRuFlagList() {
                return purchTypeRuFlag;
            }
        },
        components: {
            refundMerchandise,
            purchaser,
            supplier
        }
    };
</script>

<style lang="scss">
    .el-tabs__nav{
        float: left;
    }
    .advancedSearch{
        width: 530px;
    }
    @import "../../../../../assets/styles/views/publicOrderStyle.scss";
</style>
