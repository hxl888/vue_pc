<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <!--出库单-->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="queryFlagFn">
                    <el-select size="small" class="xe-input-w110" @change="searchTypeSelec" v-model="formData.queryFlagFn" placeholder="查询条件">
                        <el-option
                                v-for="item in queryFlagFnList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="queryCondition">
                    <el-input size="small" v-model="formData.queryCondition" :placeholder="placeholder"></el-input>
                </el-form-item>
                <el-form-item label="" prop="createDateStart" class="z-mr0">
                    <el-date-picker
                            v-model="formData.createDateStart"
                            class="xe-input-168"
                            type="date"
                            @change="startDateStrFn"
                            placeholder="出库开始时间"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                </el-form-item>
                <el-form-item prop="createDateEnd">
                    <el-date-picker
                            v-model="formData.createDateEnd"
                            class="xe-input-168"
                            type="date"
                            @change="endDateStrFn"
                            placeholder="出库结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
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
                            <el-form-item label="" prop="createDateStart" class="z-mr0">
                                <el-date-picker
                                        v-model="formData.createDateStart"
                                        class="xe-input-168"
                                        type="date"
                                        @change="startDateStrFn"
                                        placeholder="出库开始时间"
                                >
                                </el-date-picker>
                                <span class="Cornet">-</span>
                            </el-form-item>
                            <el-form-item prop="createDateEnd">
                                <el-date-picker
                                        v-model="formData.createDateEnd"
                                        class="xe-input-168"
                                        type="date"
                                        @change="endDateStrFn"
                                        placeholder="出库结束时间"
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear:both;">
                            <el-form-item prop="queryFlagFn">
                                <el-select size="small" class="xe-input-w110" @change="searchTypeSelec" v-model="formData.queryFlagFn" placeholder="查询条件">
                                    <el-option
                                            v-for="item in queryFlagFnList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="queryCondition">
                                <el-input size="small" v-model="formData.queryCondition" :placeholder="placeholder"></el-input>
                            </el-form-item>
                        </div>
                        <div style="clear:both;">
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
                        </div>
                        <div style="clear:both;">
                            <el-form-item prop="deliveryType">
                                <el-select size="small" v-model="formData.deliveryType" placeholder="出库类型">
                                    <el-option
                                            v-for="item in deliveryTypeList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
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
                style="width: 100%">
                <el-table-column
                    prop=""
                    label=""
                    width="45"
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
                        label="出库单号">
                    <template scope="scope">
                        <a class="s-blue" @click="detail(scope.row.deliveryOrder)">{{scope.row.deliveryOrder}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="relationOrder"
                    label="关联单号"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="制单人"
                    min-width="80"
                >
                </el-table-column>
                <el-table-column
                    prop="storeName"
                    label="仓库名称"
                    min-width="100"
                >
                </el-table-column>
                <el-table-column
                    prop="createDate"
                    label="出库时间"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="deliveryType"
                    label="出库类型"
                    min-width="100"
                >
                    <template scope="scope">
                        {{scope.row.deliveryType | checkstate}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="printStatus"
                    label="打印状态"
                    min-width="90"
                >
                    <template scope="scope">
                        {{scope.row.printStatus | print}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="remark"
                    label="备注"
                    min-width="120"
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
                            <a href="javascript:;" class="alinkblu" @click="">打印</a>
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
        <div class="pub-tabDatadetails" v-if="infoShowFn">
            <el-tabs v-model="tabCard_val" type="card" @tab-click="handleClick">
                <!--退款商品-->
                <el-tab-pane label="商品信息" name="first">
                    <div>
                        <el-table
                                :data="tableData2"
                                border
                                style="width: 100%">
                            <el-table-column
                                    prop=""
                                    label=""
                                    min-width="70"
                            >
                                <template scope="scope">
                                    {{scope.$index + 1}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    label="商品图"
                                    min-width="95"
                            >
                                <template scope="props">
                                    <div class="z-imgbox">
                                        <!--{{props.row}}-->
                                        <img :src="picServer + props.row.proMainImg" alt="品牌logo" width="60" height="60">
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proSku"
                                    label="SKU编码"
                                    min-width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="proNum"
                                    label="商品货号"
                                    min-width="120"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="proName"
                                    label="商品名称"
                                    min-width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="proCategoryName"
                                    label="商品分类"
                                    min-width="130"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="proPricingType"
                                    label="计量方式"
                                    min-width="100"
                            >
                                <template scope="scope">
                                    {{scope.row.proPricingType | measure}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proUnit"
                                    label="单位"
                                    min-width="90"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="proSpecValue"
                                    label="规格"
                                    min-width="90"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="delivBatchPrice"
                                    label="成本价"
                                    min-width="90"
                            >
                                <template scope="scope">
                                    <div v-if="scope.row.delivBatchPrice">
                                        {{scope.row.delivBatchPrice.toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="proOutNum"
                                    label="本次出库数量"
                                    min-width="150"
                            >
                                <template scope="scope">
                                    {{scope.row.proOutNum}}
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="sumpaney"
                                    label="本次出库金额"
                                    min-width="150"
                            >
                                <template scope="scope">
                                    <div v-if="scope.row.sumpaney">
                                        {{scope.row.sumpaney.toFixed(2)}}
                                    </div>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="remark"
                                    label="备注"
                                    min-width="120"
                            >
                            </el-table-column>
                        </el-table>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
    import {deliveryType, queryFlagFn} from '@/dataControl.js';
    export default {
        data() {
            return {
                placeholder: '请输入出库单号',
                actionList: [],
                infoShowFn: false,
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                tableData2: [],
                tabCard_val: 'first',
                formData: {
                    deliveryType: '',
                    queryFlagFn: 1,
                    storeId: '',
                    endDateStr: '',
                    queryCondition: '',
                    createDateStart: '',
                    createDateEnd: ''
                }
            };
        },
        watch: {
            'formData.queryFlagFn'(n) {
                if (n === 1) {
                    this.placeholder = '请输入出库单号';
                } else if (n === 2) {
                    this.placeholder = '请输入关联单号';
                } else if (n === 3) {
                    this.placeholder = '请输入商品名称';
                } else if (n === 4) {
                    this.placeholder = '请输入商品货号';
                }
            }
        },
        filters: {
            checkstate(val) {
                let state = '';
                switch (val) {
                    case 1: {
                        state = ' 销售出库';
                        break;
                    }
                    case 2: {
                        state = '采购退货出库';
                        break;
                    }
                    case 3: {
                        state = '调拨出库';
                        break;
                    }
                    case 4: {
                        state = '盘亏出库';
                        break;
                    }
                    case 5: {
                        state = '其他出库';
                        break;
                    }
                }
                return state;
            },
            measure(val) {
                let state = '';
                switch (val) {
                    case 1: {
                        state = '重量';
                        break;
                    }
                    case 2: {
                        state = '数量';
                        break;
                    }
                }
                return state;
            },
            print(val) {
                let state = '';
                switch (val) {
                    case 1: {
                        state = ' 未打印';
                        break;
                    }
                    case 2: {
                        state = '已打印';
                        break;
                    }
                }
                return state;
            }
        },
        computed: {
            deliveryTypeList() {
                return deliveryType;
            },
            queryFlagFnList() {
                return queryFlagFn;
            }
        },
        created() {
            this.creatInf(1, this.formData);
            this.pullDown();
        },
        methods: {
            infoShow() {
                this.infoShowFn = true;
            },
            detail(code) {
                let params = {};
                params.deliveryOrder = code;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/delivManager/queryDelivDetailList',
                    data: params
                }).then((res) => {
                    if (res.data) {
                        this.tableData2 = res.data.actionList;
                        this.infoShowFn = true;
                        this.picServer = res.data.picServer;
                        this.tableData2.forEach((item) => {
                            this.$set(item, 'sumpaney', parseFloat(item.delivBatchPrice) * parseInt(item.proOutNum));
                        });
                        console.log(this.tableData2);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            searchTypeSelec() {
                this.formData.queryCondition = '';
            },
            createDateStartFn(val) {
                this.formData.createDateStart = val;
            },
            createDateEndFn(val) {
                this.formData.createDateEnd = val;
            },
//            仓库下拉列表
            pullDown() {
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
            onSubmit() {
                console.log(this.formData);
                this.creatInf(1, this.formData);
            },
            startDateStrFn(val) {
                this.formData.createDateStart = val;
            },
            endDateStrFn(val) {
                this.formData.createDateEnd = val;
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
                data.queryFlag = this.formData.queryFlagFn;
                this.$http({ // 查询出库单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/delivManager/queryDelivList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.tableData = res.data.actionList;
                        this.pageInfo = res.data.xePageInfo;
                        if (this.tableData.length) {
                            this.detail(this.tableData[0].deliveryOrder);
                        } else {
                            this.infoShowFn = false;
                        }
                        // this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    };
</script>
<style lang="scss">
    .el-tabs__nav{
        float: left;
    }
    @import "../../../../../assets/styles/views/publicOrderStyle.scss";
</style>
