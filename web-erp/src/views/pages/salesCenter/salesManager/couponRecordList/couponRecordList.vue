<template lang="html">
    <div class="m-router-con">
        <!--优惠券记录-->
        <div class="u-top-search">
            <el-form :inline="true" :model="filterData" ref="filterTable" class="demo-form-inline">
                <el-form-item prop="couName">
                    <el-input size="small" placeholder="请输入优惠券名称/规则号/号码/用户账号/订单编号" v-model="filterData.couName"></el-input>
                </el-form-item>
                <el-form-item prop="sendType">
                    <el-select size="small" v-model="filterData.sendType" placeholder="发放方式">
                        <el-option v-for="item in sendTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item prop="useStatus">-->
                    <!--<el-select v-model="filterData.useStatus" placeholder="使用状态">-->
                        <!--<el-option-->
                            <!--v-for="item in useStatusList"-->
                            <!--:label="item.name"-->
                            <!--:value="item.value"-->
                            <!--:key="item.value"-->
                        <!--&gt;</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="listUserCouponCard()">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('filterTable')">重置</el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = true">高级搜索</el-button>
                </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch larger-advanceBox" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" :model="filterData" ref="filterHighTable" label-width="77px">
                        <div>
                            <el-form-item prop="couName" label="优惠券名称">
                                <el-input placeholder="请输入优惠券名称／编号" v-model="filterData.couName" style="width: 160px;"></el-input>
                            </el-form-item>
                            <el-form-item prop="sendType" label="发放方式">
                                <el-select v-model="filterData.sendType" placeholder="发放方式" style="width: 160px;">
                                    <el-option v-for="item in sendTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <!--<div>-->
                            <!--<el-form-item prop="useStatus" label="使用状态">-->
                                <!--<el-select v-model="filterData.useStatus" placeholder="使用状态" style="width: 160px;">-->
                                    <!--<el-option-->
                                        <!--v-for="item in useStatusList"-->
                                        <!--:label="item.name"-->
                                        <!--:value="item.value"-->
                                        <!--:key="item.value"-->
                                    <!--&gt;</el-option>-->
                                <!--</el-select>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
                        <div>
                            <el-form-item prop="dateStrType">
                                <el-select v-model="filterData.dateStrType" style="width: 100px;">
                                    <el-option :value="1" :key="1" label="领取时间"></el-option>
                                    <el-option :value="2" :key="2" label="使用时间"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                    style="width: 374px;"
                                    v-model="value1"
                                    type="datetimerange"
                                    :picker-options="pickerOptions2"
                                    range-separator=" 至 "
                                    @change="sendTimeChange"
                                    align="right"
                                    placeholder="选择时间范围">
                                </el-date-picker>
                            </el-date-picker>
                            </el-form-item>
                        </div>
                        <!--<div>-->
                            <!--<el-form-item label="使用区域" prop="useArea">-->
                                <!--<el-input v-model="filterData.useArea" class="xe-input-col3" style="width: 410px;"></el-input>-->
                            <!--</el-form-item>-->
                        <!--</div>-->
                        <div>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="highSearchQuery()">查询</el-button>
                                <el-button class="xe-button-normal" @click="resetForm('filterHighTable')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
            <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal"  @click="outData">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button>
        </div>
        <div class="bottable">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed='left' width="30" class-name="tableIndex">
                    <template scope="scope">
                        {{scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="cardNum" label="优惠券号码" width="180"></el-table-column>
                <el-table-column prop="couTempId" label="优惠券规则号" width="180"> </el-table-column>
                <el-table-column prop="couName" label="优惠券名称" width="150"></el-table-column>
                <el-table-column label="发放方式" width="120">
                    <template scope="scope">
                        {{scope.row.sendType | sendTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column label="优惠券面额(元)" width="120">
                    <template scope="scope">
                        {{scope.row.useDisAmount | numberToFixed2}}
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="领取时间" width="165">
                    <template scope="scope">
                        {{scope.row.createDate | millisecondFormat('ms')}}
                    </template>
                </el-table-column>
                <el-table-column prop="loginAccount" label="用户账号" width="120"></el-table-column>
                <el-table-column label="使用状态" width="90">
                    <template scope="scope">
                        {{scope.row.useStatus | useStatusToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" width="90"></el-table-column>
                <el-table-column prop="orderUseAreaName" label="下单区域" min-width="90"></el-table-column>
                <el-table-column prop="orderAmount" label="订单金额" width="90"></el-table-column>
                <el-table-column prop="useTime" label="使用时间" width="165">
                    <template scope="scope">
                        {{scope.row.useTime | millisecondFormat('ms')}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page-showbox">
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
</template>
<script>
    import {sendType, sendStatus, useStatus, useRange} from '@/dataControl';
    export default {
        name: 'couponRecordList',
        data() {
            return {
                filterData: {
                    'couName': '', // 优惠券名称 规格号 号码 用户账号 订单编号
                    'sendType': '', // 发放方式  1买家领取 2 指定条件发放 3 指定用户发放
                    'useStatus': '', // 使用状态 1 已使用 2 未使用 3 已过期
                    'dateStrType': 1, // 1:领取时间  2:使用时间
                    'startDateStr': '', // 领取开始时间
                    'endDateStr': '', // 领取结束时间
                    'orderUseArea': '' // 下单区域
                },
                value1: '',
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                outerUrl: '',
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 1
                },
                tableData: []
            };
        },
        created() {
            this.listUserCouponCard();
        },
        methods: {
            listUserCouponCard() {
                let pageInfos = {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                };
                let params = Object.assign(pageInfos, this.filterData);
                this.outerUrl = '/xe-route/xe-pro/card/userCoupon/userCouponCardExport?couName=' + params.couName + '&dateStrType=' + params.dateStrType + '&endDateStr=' + params.endDateStr + '&orderUseArea=' + params.orderUseArea + '&sendType=' + params.sendType + '&startDateStr=' + params.startDateStr + '&useStatus=' + params.useStatus;
                console.log('test', this.outerUrl);
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/card/userCoupon/listUserCouponCard',
                    data: params
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data.listUserCouponCard;
                    this.pageInfo = res.data.pageInfo;
                }).catch(error => {
                    console.log(error);
                });
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            sendTimeChange(val) {
                this.timeArrs = val;
            },
            handleSizeChange(val) {
                this.pageInfo.pageNum = 1;
                this.pageInfo.pageSize = val;
                this.listUserCouponCard();
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.listUserCouponCard();
            },
            highSearchQuery() {
                this.searchFormbut = false;
                this.listUserCouponCard();
            },
            resetForm(formName) {
                this.value1 = '';

                this.$refs[formName].resetFields();
                this.pageInfo.pageNum = 1;
                this.listUserCouponCard();
            }
        },
        computed: {
            sendTypeList() {
                // 发放方式
                return sendType;
            },
            sendStatusList() {
                // 发放状态
                return sendStatus;
            },
            useStatusList() {
                return useStatus;
            },
            useRangeList() {
                return useRange;
            },
            timeArrs: {
                get() {
                    return [this.filterData.startDateStr, this.filterData.endDateStr];
                },
                set(val) {
                    if (!val) {
                        this.filterData.startDateStr = '';
                        this.filterData.endDateStr = '';
                    } else {
                        let arrs = val.split(' 至 ');
                        this.filterData.startDateStr = arrs[0];
                        this.filterData.endDateStr = arrs[1];
                    }
                }
            }
        }
    };
</script>
