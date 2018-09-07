<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <!--入库单-->
        <div class="u-top-search">
            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline">
                <el-form-item prop="queryFlag">
                    <el-select size="small" class="xe-input-w110" @change="searchTypeSelec" v-model="formData.queryFlag" placeholder="queryFlag">
                        <el-option
                                v-for="item in queryFlagList"
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
                            placeholder="入库开始时间"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>hen
                </el-form-item>
                <el-form-item prop="createDateEnd">
                    <el-date-picker
                            v-model="formData.createDateEnd"
                            class="xe-input-168"
                            type="date"
                            @change="endDateStrFn"
                            placeholder="入库结束时间"
                    >
                    </el-date-picker>
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
                    <el-form :inline="true" :model="formData" label-width ='73px' ref="formData" class="demo-form-inline">
                        <div style="clear:both;">
                            <el-form-item label="" prop="createDateStart" class="z-mr0">
                                <el-date-picker
                                        v-model="formData.createDateStart"
                                        class="xe-input-168"
                                        type="date"
                                        @change="startDateStrFn"
                                        placeholder="入库开始时间"
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
                                        placeholder="入库结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear:both;">
                            <el-form-item prop="queryFlag">
                                <el-select size="small" class="xe-input-w110" @change="searchTypeSelec" v-model="formData.queryFlag" placeholder="查询条件">
                                    <el-option
                                            v-for="item in queryFlagList"
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
                            <el-form-item prop="receiptType">
                                <el-select size="small" v-model="formData.receiptType" placeholder="入库类型">
                                    <el-option
                                            v-for="item in receiptTypeList"
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
            <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <!-- <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button> -->
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
                  width="55"
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
                  >
                </el-table-column>
                <el-table-column
                    min-width="150"
                    label="入库单号">
                    <template scope="scope">
                        <a class="s-blue" @click="detail(scope.row.receiptOrder)">{{scope.row.receiptOrder}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                  prop="relationOrder"
                  label="关联单号"
                  min-width="120"
                  >
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="操作人"
                    min-width="130"
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
                    label="入库时间"
                    min-width="150"
                >
                </el-table-column>
                <el-table-column
                    prop="receiptType"
                    label="入库类型"
                    min-width="100"
                >
                    <template scope="scope">
                        {{scope.row.receiptType | checkstate}}
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
                    min-width="100"
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
                                        prop="proSepcValue"
                                        label="规格"
                                        min-width="90"
                                >
                                </el-table-column>
                                <el-table-column
                                        prop="batchPrice"
                                        label="成本价"
                                        min-width="90"
                                >
                                    <template scope="scope">
                                        <div v-if="scope.row.batchPrice">
                                            {{scope.row.batchPrice.toFixed(2)}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="currentInNum"
                                        label="本次入库数量"
                                        min-width="150"
                                >
                                    <template scope="scope">
                                        {{scope.row.currentInNum}}
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        prop="sumpaney"
                                        label="本次入库金额"
                                        min-width="150"
                                >
                                    <template scope="scope">
                                        <div>
                                            {{parseFloat((scope.row.batchPrice ? scope.row.batchPrice * 1000 : 0) * (scope.row.currentInNum ? scope.row.currentInNum : 0)/1000).toFixed(2)}}
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
    </div>
</template>

<script>
    import {receiptType, queryFlag} from '@/dataControl.js';
    export default {
        data() {
            return {
                // outerUrl: '',
                actionList: [],
                infoShowFn: false,
                placeholder: '请输入入库单号',
                formData: {
                    receiptOrder: '',
                    receiptType: '',
                    queryFlag: 1,
                    storeId: '',
                    queryCondition: '',
                    createDateStart: '',
                    createDateEnd: ''
                },
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableData: [],
                tableData2: [],
                tabCard_val: 'first',
//                时间
                picServer: ''
            };
        },
        created() {
            this.creatInf(1, this.formData);
            this.pullDown();
//            this.detail(1, this.formData);
        },
        methods: {
            searchTypeSelec() {
                this.formData.queryCondition = '';
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            infoShow() {
                this.infoShowFn = true;
            },
            detail(code) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/receiptManager/queryReceiptDetailList',
                    data: {
                        receiptOrder: code
                    }
                }).then((res) => {
                    if (res.data) {
                        console.log(res);
                        this.tableData2 = res.data.actionList;
                        this.infoShowFn = true;
                        this.picServer = res.data.picServer;
                        this.tableData2.forEach((item) => {
                            this.$set(item, 'sumpaney', parseFloat(item.batchPrice) * parseInt(item.currentInNum));
                        });
                    }
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
           // 仓库下拉接口
            pullDown(formData) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = formData;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                // this.outerUrl = '/xe-route/xe-erp/card/userCoupon/userCouponCardExport?couName=' + params.couName + '&dateStrType=' + params.dateStrType + '&endDateStr=' + params.endDateStr + '&orderUseArea=' + params.orderUseArea + '&sendType=' + params.sendType + '&startDateStr=' + params.startDateStr + '&useStatus=' + params.useStatus;
                this.$http({ // 查询入库单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/receiptManager/queryReceiptList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.tableData = res.data.actionList;
                        this.pageInfo = res.data.xePageInfo;
                        if (this.tableData && this.tableData.length && this.tableData[0].receiptOrder) {
                            this.detail(this.tableData[0].receiptOrder);
                        } else {
                            this.tableData2 = [];
                        }
//                         this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        watch: {
            'formData.queryFlag'(n) {
                if (n === 1) {
                    this.placeholder = '请输入入库单号';
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
                        state = ' 采购入库';
                        break;
                    }
                    case 2: {
                        state = '调拨入库';
                        break;
                    }
                    case 3: {
                        state = '销售退货入库';
                        break;
                    }
                    case 4: {
                        state = '盘盈入库';
                        break;
                    }
                    case 5: {
                        state = '初始化入库';
                        break;
                    }
                    case 6: {
                        state = '其他入库';
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
            }
        },
        computed: {
            receiptTypeList() {
                return receiptType;
            },
            queryFlagList() {
                return queryFlag;
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
