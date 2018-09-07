<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" class="" :model="searchform" :inline=true>
                    <el-form-item prop="couName">
                            <el-input size="small" placeholder="优惠券编号/号码/名称/商户名称" v-model="searchform.couName" class="xe-input-l40"></el-input>
                    </el-form-item>
                     <el-form-item prop="orderId">
                        <el-input size="small" placeholder="用户账号/订单号" v-model="searchform.orderId" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="sendType">
                            <el-select size="small" class="xe-input-l40" v-model="searchform.sendType" placeholder="发放方式">
                                <el-option
                                    v-for="(item, index) in sendTypelist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="useStatus">
                            <el-select size="small" class="xe-input-l40" v-model="searchform.useStatus" placeholder="使用状态">
                                <el-option
                                    v-for="(item, index) in useStatuslist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
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
                    <el-form :inline="true" :model="searchform" label-width ='73px' ref="searchform" class="demo-form-inline">
                        <div>
                            <el-form-item label="领取时间" prop="startDateStr" class="marR0">
                                <el-date-picker
                                    v-model="searchform.startDateStr"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
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
                                    size="small"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="使用时间" prop="useStartDateStr"class="marR0">
                                <el-date-picker
                                    v-model="searchform.useStartDateStr"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="useEndDateStr">
                                <el-date-picker
                                    v-model="searchform.useEndDateStr"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="couName" label="详细查询">
                                <el-input size="small" placeholder="优惠券编号/号码/名称/商户名称" class="xe-input-168" v-model="searchform.couName"></el-input>
                            </el-form-item>
                            <el-form-item prop="orderId" label="用户账号">
                                <el-input size="small" placeholder="用户账号/订单号" v-model="searchform.orderId" class="xe-input-168"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="使用状态" prop="useStatus">
                                <el-select size="small" class="xe-input-168" v-model="searchform.useStatus" placeholder="使用状态">
                                    <el-option
                                        v-for="(item, index) in useStatuslist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="下单区域" prop="">
                                <area-select v-model="selecarea" :width="168"></area-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="发放方式" prop="sendType">
                                <el-select size="small" class="xe-input-168" v-model="searchform.sendType" placeholder="发放方式">
                                    <el-option
                                        v-for="(item, index) in sendTypelist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="exportDataMethod"><i class="iconfont icon-daochu"></i> 导出</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableDatas" v-loading="tableDataLoading" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  min-width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" min-width="55"></el-table-column>
            <el-table-column prop="cardNum" label="优惠券编号" min-width="160"></el-table-column>
            <el-table-column prop="venName" label="商户名称" min-width="150">
            </el-table-column>
            <el-table-column prop="couTempId" min-width="160" label="优惠券号码"></el-table-column>
            <el-table-column prop="couName" min-width="150" label="优惠券名称"></el-table-column>
            <el-table-column prop="sendType" min-width="150" label="发放方式">
                <template scope="scope">
                    <div>
                        {{scope.row.sendType | sendTypefilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="loginAccount" min-width="150" label="用户账号">
            </el-table-column>
            <el-table-column prop="orderId" min-width="150" label="订单号">
            </el-table-column>
            <el-table-column prop="orderUseAreaName" min-width="150" label="下单区域">
            </el-table-column>
            <el-table-column prop="orderAmount" min-width="100" label="订单金额">
                <template scope="scope">
                    <div v-if="scope.row.orderAmount">
                        ￥{{scope.row.orderAmount.toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useDisAmount" min-width="100" label="优惠金额">
                <template scope="scope">
                    <div v-if="scope.row.useDisAmount">
                        ￥{{scope.row.useDisAmount.toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createDate" min-width="155" label="领取时间">
                <template scope="scope">
                    <!--<div v-if="scope.row.sendType == 3">-->
                        <!--{{scope.row.startDateStr, 'ms' | millisecondFormat}}-->
                    <!--</div>-->
                    <!--<div v-else>-->
                        <!--{{scope.row.createDate, 'ms' | millisecondFormat}}-->
                    <!--</div>-->
                    <div>
                        {{scope.row.createDate, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useTime" min-width="150" label="使用时间">
                <template scope="scope">
                    <div>
                        {{scope.row.useTime, 'ms' | millisecondFormat}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useStatus" min-width="155" label="使用状态">
                <template scope="scope">
                    <div>
                        {{scope.row.useStatus | useStatusfilter}}
                    </div>
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
    </div>
</template>
<script>
    import areaSelect from '@/components/areaSelect/areaSelect';
    import {sendType, sendStatus, useStatus, useTimeType} from '@/dataControl';
    import {timeReset} from 'utils';
    export default {
        data() {
            return {
                date: '',
                brandIdList: [],
                tableDatas: [],
                selecarea: [],
                searchform: {
                    couName: '',
                    orderId: '',
                    sendType: '',
                    useStatus: '',
                    startDateStr: '',
                    endDateStr: '',
                    useStartDateStr: '',
                    useEndDateStr: '',
                    orderUseArea: ''
                },
                exportData: '',
                tableDataLoading: false,
                searchform1: {}, // 高级搜form
                selectedArray: [], // 多选操作勾选数据存储（作为到处数据使用）
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                productUrl: '/xe-route/xe-mis'
//            productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            viewDetails(row) {
                this.$router.push({name: 'couponList_details', query: {couTempId: row.couTempId}});
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.selecarea = [];
                this.enquiryForm();
            },
            handleSelectionChange(val) {
                this.selectedArray = val;
            },
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.searchform.startDateStr) {
                    params.startDateStr = timeReset(this.searchform.startDateStr);
                }
                if (this.searchform.endDateStr) {
                    params.endDateStr = timeReset(this.searchform.endDateStr);
                }
                if (this.searchform.useStartDateStr) {
                    params.useStartDateStr = timeReset(this.searchform.useStartDateStr);
                }
                if (this.searchform.useEndDateStr) {
                    params.useEndDateStr = timeReset(this.searchform.useEndDateStr);
                }
                if (this.selecarea) {
                    params.orderUseArea = this.selecarea.slice(this.selecarea.length - 1, this.selecarea.length).join(',');
                }
                this.exportData = '';
                for (let i in params) {
                    if (i !== 'pageNum' && i !== 'pageSize') {
                        if (!params[i] || params[i] === '') {
                            this.exportData += `${i}=&`;
                        } else {
                            this.exportData += `${i}=${params[i]}&`;
                        }
                    }
                }
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/userCoupon/listUserCouponCard`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.list;
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
                    this.pagelist.pageNum = val;
                    this.enquiryForm();
                }
            },
            exportDataMethod() { // 导出
                window.open(`${this.productUrl}/manager/userCoupon/userCouponListExport?${this.exportData}`);
            }
        },
        computed: {
            sendTypelist() {
                return sendType;
            },
            sendStatuslist() {
                return sendStatus;
            },
            useStatuslist() {
                return useStatus;
            },
            useTimeTypelist() {
                return useTimeType;
            }
        },
        components: {
            areaSelect
        }
    };
</script>
