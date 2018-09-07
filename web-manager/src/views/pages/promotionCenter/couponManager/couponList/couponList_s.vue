<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" class="" :model="searchform" :inline=true>
                    <el-form-item prop="venName">
                        <el-input size="small" placeholder="优惠券编号/名称/商户名称" v-model="searchform.venName" class="xe-input-l40"></el-input>
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
                    <el-form-item label="" prop="sendStatus">
                            <el-select size="small" class="xe-input-l40" v-model="searchform.sendStatus" placeholder="发放状态">
                                <el-option
                                    v-for="(item, index) in sendStatuslist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <!--<el-form-item label="" prop="useStatus">-->
                            <!--<el-select class="xe-input-l40" v-model="searchform.useStatus" placeholder="使用状态">-->
                                <!--<el-option-->
                                    <!--v-for="(item, index) in useStatuslist"-->
                                    <!--:key="index"-->
                                    <!--:label="item.name"-->
                                    <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item prop="usePlat" label="">
                        <el-select size="small" class="xe-input-l40" v-model="searchform.usePlat" placeholder="使用位置">
                            <el-option
                                v-for="(item, index) in usePlatlist"
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
                            <el-form-item label="发放时间" prop="sendTimeStart" class="marR0">
                                <el-date-picker
                                    v-model="searchform.sendTimeStart"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
                                    @change="sendTimeStartFn"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="sendTimeEnd">
                                <el-date-picker
                                    v-model="searchform.sendTimeEnd"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
                                    @change="sendTimeEndFn"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="有效时间" prop="activeTimeStart"class="marR0">
                                <el-date-picker
                                    v-model="searchform.activeTimeStart"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
                                    @change="activeTimeStartFn"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="activeTimeEnd">
                                <el-date-picker
                                    v-model="searchform.activeTimeEnd"
                                    class="xe-input-168"
                                    type="date"
                                    size="small"
                                    @change="activeTimeEndFn"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="venName" label="优惠券编号">
                                <el-input size="small" placeholder="优惠券编号/名称/商户名称" class="xe-input-168" v-model="searchform.venName"></el-input>
                            </el-form-item>
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
                        <div>
                            <el-form-item label="发放状态" prop="sendStatus">
                                    <el-select size="small" class="xe-input-168" v-model="searchform.sendStatus" placeholder="发放状态">
                                        <el-option
                                            v-for="(item, index) in sendStatuslist"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.value">
                                        </el-option>
                                    </el-select>
                            </el-form-item>
                            <!--<el-form-item label="使用状态" prop="useStatus">-->
                                     <!--<el-select class="xe-input-l90" v-model="searchform.useStatus" placeholder="使用状态">-->
                                        <!--<el-option-->
                                            <!--v-for="(item, index) in useStatuslist"-->
                                            <!--:key="index"-->
                                            <!--:label="item.name"-->
                                            <!--:value="item.value">-->
                                        <!--</el-option>-->
                                    <!--</el-select>-->
                            <!--</el-form-item>-->
                            <el-form-item prop="usePlat" label="使用位置">
                                <el-select size="small" class="xe-input-168" v-model="searchform.usePlat" placeholder="使用位置">
                                    <el-option
                                        v-for="(item, index) in usePlatlist"
                                         :key="index"
                                         :label="item.name"
                                         :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="useRange"label="使用范围">
                                <el-select size="small" class="xe-input-168" v-model="searchform.useRange" placeholder="商品范围">
                                    <el-option
                                        v-for="(item, index) in useRangelist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="有效类型" prop="useTimeType">
                                <el-select size="small" class="xe-input-168" v-model="searchform.useTimeType" placeholder="有效时间类型">
                                    <el-option
                                        v-for="(item, index) in useTimeTypelist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="发放区域" prop="">
                                <area-select v-model="selecarea" :width="168"></area-select>
                            </el-form-item>
                            <!--<el-form-item prop="" class="marL35">-->
                            <!--</el-form-item>-->
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
            <el-table-column prop="couTempId" label="优惠券编号" min-width="150"></el-table-column>
            <el-table-column prop="venName" label="商户名称" min-width="150">
                <!--<template scope="scope">-->
                    <!--<div>-->
                        <!--{{scope.row.mobile ? scope.row.mobile : scope.row.email}}-->
                    <!--</div>-->
                <!--</template>-->
            </el-table-column>
            <el-table-column prop="couName" min-width="150" label="优惠券名称"></el-table-column>
            <el-table-column prop="sendNum"min-width="150" label="已发放总量">
            </el-table-column>
            <el-table-column prop="sendType" min-width="150" label="发放方式">
                <template scope="scope">
                    <div>
                        {{scope.row.sendType | sendTypefilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sendStatus" min-width="150" label="发放状态">
                <template scope="scope">
                    <div>
                        {{scope.row.sendStatus | sendStatusfilter}}
                    </div>
                </template>
            </el-table-column>
            <!--<el-table-column prop="useStatus" min-width="150" label="使用状态">-->
                <!--<template scope="scope">-->
                    <!--<div>-->
                        <!--{{scope.row.useStatus | useStatusfilter}}-->
                    <!--</div>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column prop="usePlat" min-width="150" label="使用位置">
                <template scope="scope">
                    <div>
                        {{scope.row.usePlat | usePlatfilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useRange" min-width="150" label="商品范围">
                <template scope="scope">
                    <div>
                        {{scope.row.useRange | useRangefilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useAreaName" min-width="150" label="使用区域">
                <template scope="scope">
                    <div  v-if="scope.row.useAreaName.length > 36">
                        <el-tooltip effect="dark" placement="top" v-if="scope.row.useAreaName">
                            <div slot="content">{{scope.row.useAreaName.substr(0, 50).split(' ').join(',')}}<br/>{{scope.row.useAreaName.substr(50, 50)}}<br/>{{scope.row.useAreaName.substr(100, 50).split(' ').join(',')}}<br/>{{scope.row.useAreaName.substr(150, 50).split(' ').join(',')}}</div>
                            <div style="height: 80px;position: relative">{{scope.row.useAreaName.split(' ').join(',')}}<span style="position: absolute;bottom: -3px;right: -7px" v-if="scope.row.useAreaName.length > 36">...</span></div>
                        </el-tooltip>
                    </div>
                    <div v-else>
                        {{scope.row.useAreaName}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useDisAmount" min-width="100" label="面额">
                <template scope="scope">
                    <div v-if="scope.row.useDisAmount">
                        ￥{{scope.row.useDisAmount.toFixed(2)}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" min-width="160" label="发放时间段">
                <template scope="scope">
                    <div v-if="scope.row.sendType == 3">
                        {{scope.row.createDate, 'ms' | millisecondFormat}}
                    </div>
                    <div v-else>
                        <span v-if="scope.row.sendTimeStart">{{scope.row.sendTimeStart, 'ms' | millisecondFormat}} - </span> <span v-if="scope.row.sendTimeEnd">{{scope.row.sendTimeEnd, 'ms' | millisecondFormat}}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="useTimeType" min-width="150" label="有效时间类型">
                <template scope="scope">
                    <div>
                        {{scope.row.useTimeType | useTimeTypefilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" min-width="160" label="有效时间段">
                <template scope="scope">
                    <div v-if="scope.row.useTimeType == 1">
                        <div v-if="scope.row.activeTimeStart && scope.row.activeTimeEnd">
                            <span v-if="scope.row.activeTimeStart">{{parseInt(scope.row.activeTimeStart), 'ms' | millisecondFormat}} - </span> <span v-if="scope.row.activeTimeEnd">{{parseInt(scope.row.activeTimeEnd), 'ms' | millisecondFormat}}</span>
                        </div>
                        <div v-else>无</div>
                    </div>
                    <div v-if="scope.row.useTimeType == 2 && scope.row.activeDay">
                        <span>领取后{{scope.row.activeDay}}天</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" min-width="130" label="限领/人">
                <template scope="scope">
                    <div>
                        {{scope.row.sendLimitNum ==0 ? '不限制' : scope.row.sendLimitNum}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="sendOrderAmount" min-width="130" label="条件">
                <template scope="scope">
                    <div v-if="scope.row.useRuleType == 1">
                        满{{scope.row.useOrderAmount.toFixed(2)}}元
                    </div>
                    <div v-if="scope.row.useRuleType == 2">
                        无门槛
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="giveOutNum" min-width="130" label="领取量">
            </el-table-column>
            <el-table-column prop="" label="操作" min-width="65" fixed="right">
                <template scope="scope">
                    <el-button type="text" @click="viewDetails(scope.row)" class="zq-restore">查看</el-button>
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
    import {sendType, sendStatus, useStatus, useTimeType, usePlat, useRange} from '@/dataControl';
    export default {
        data() {
            return {
                tableDatas: [],
                selecarea: [],
                searchform: {
                    venName: '',
                    sendType: '',
                    sendStatus: '',
                    useTimeType: '',
                    usePlat: '',
                    useRange: '',
                    sendTimeStart: '',
                    sendTimeEnd: '',
                    activeTimeStart: '',
                    activeTimeEnd: '',
                    useArea: ''
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
                sendTimeStarts: '',
                sendTimeEnds: '',
                activeTimeStarts: '',
                activeTimeEnds: '',
                productUrl: '/xe-route/xe-mis'
//            productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            sendTimeStartFn(val) {
                this.sendTimeStarts = val;
            },
            sendTimeEndFn(val) {
                this.sendTimeEnds = val;
            },
            activeTimeStartFn(val) {
                this.activeTimeStarts = val;
            },
            activeTimeEndFn(val) {
                this.activeTimeEnds = val;
            },
            viewDetails(row) {
                this.$router.push({name: 'couponList_details', query: {couTempId: row.couTempId}});
            },
            resetForm(formName) {
                let _this = this;
                this.$refs[formName].resetFields();
                this.selecarea = [];
                setTimeout(() => {
                    _this.enquiryForm();
                }, 10);
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
                if (this.sendTimeStarts) {
                    params.sendTimeStart = this.sendTimeStarts;
                }
                if (this.sendTimeEnds) {
                    params.sendTimeEnd = this.sendTimeEnds;
                }
                if (this.activeTimeStarts) {
                    params.activeTimeStart = this.activeTimeStarts;
                }
                if (this.activeTimeEnds) {
                    params.activeTimeEnd = this.activeTimeEnds;
                }
                if (this.selecarea) {
                    params.useArea = this.selecarea.slice(this.selecarea.length - 1, this.selecarea.length).join(',');
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
                    url: `${this.productUrl}/manager/venDisCoupon/queryCouponList`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    if (res.data.pageInfo) {
                        this.pagelist.total = res.data.pageInfo.total;
                    }
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
                window.open(`${this.productUrl}/manager/venDisCoupon/queryCouponExport?${this.exportData}`);
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
            },
            usePlatlist() {
                return usePlat;
            },
            useRangelist() {
                return useRange;
            }
        },
        components: {
            areaSelect
        }
    };
</script>
