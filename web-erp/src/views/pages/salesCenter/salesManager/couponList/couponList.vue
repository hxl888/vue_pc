<template lang="html">
    <div class="m-router-con">
        <!--优惠券列表-->
        <div class="u-top-search">
            <el-form :inline="true" :model="filterData" ref="filterTable" class="demo-form-inline">
                <el-form-item prop="couName">
                    <el-input size="small" placeholder="请输入优惠券名称／编号" v-model="filterData.couName"></el-input>
                </el-form-item>
                <el-form-item prop="sendType">
                    <el-select size="small" v-model="filterData.sendType" placeholder="发放方式">
                        <el-option v-for="item in sendTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="sendStatus">
                    <el-select size="small" v-model="filterData.sendStatus" placeholder="发放状态">
                        <el-option
                            v-for="item in sendStatusList"
                            :label="item.name"
                            :value="item.value"
                            :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="usePlat" class="z-mr30">
                    <el-select size="small" v-model="filterData.usePlat" placeholder="使用位置">
                        <el-option
                            v-for="item in usePlatList"
                            :label="item.name"
                            :value="item.value"
                            :key="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="listCoupTemplet()">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('filterTable')">重置</el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
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
                                <el-input size="small" class="xe-input-w160" placeholder="请输入优惠券名称／编号" v-model="filterData.couName"></el-input>
                            </el-form-item>
                            <el-form-item prop="sendType" label="发放方式">
                                <el-select size="small" v-model="filterData.sendType" placeholder="发放方式" class="xe-input-w160">
                                    <el-option v-for="item in sendTypeList" :label="item.name" :value="item.value" :key="item.value"></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <!--<el-form-item prop="proNum" label="编号">-->
                                <!--<el-input v-model="filterData.proNum" placeholder="输入编号"></el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item prop="sendStatus" label="发放状态">
                                <el-select size="small" v-model="filterData.sendStatus" placeholder="发放状态" class="xe-input-w160">
                                    <el-option
                                        v-for="item in sendStatusList"
                                        :label="item.name"
                                        :value="item.value"
                                        :key="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="usePlat" label="使用位置">
                                <el-select size="small" v-model="filterData.usePlat" placeholder="使用位置" class="xe-input-w160">
                                    <el-option
                                        v-for="item in usePlatList"
                                        :label="item.name"
                                        :value="item.value"
                                        :key="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
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
                            <el-form-item prop="useRange" label="使用范围">
                                <el-select size="small" v-model="filterData.useRange" placeholder="使用范围" class="xe-input-w160">
                                    <el-option
                                        v-for="item in useRangeList"
                                        :label="item.name"
                                        :value="item.value"
                                        :key="item.value"
                                    ></el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="发放时间">
                                <el-date-picker
                                    size="small"
                                    style="width: 410px;"
                                    v-model="value1"
                                    type="datetimerange"
                                    :picker-options="pickerOptions2"
                                    range-separator=" 至 "
                                    @change="sendTimeChange"
                                    align="right"
                                    placeholder="选择时间范围">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="使用区域" prop="useArea">
                                <areaselectTag v-model='saleAreaIds' :width='410' :changeOnSelect="true"></areaselectTag>
                            </el-form-item>
                        </div>
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
            <!--<el-button @click="listToCreateCoupon">-->
                <!--<span class="iconfont icon-xinzeng"></span> 新建优惠券-->
            <!--</el-button>-->
            <el-button class="xe-button-normal" @click="outData">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button>
        </div>
        <div class="bottable" v-loading="loading">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column fixed='left' width="30" class-name="tableIndex">
                    <template scope="scope">
                        {{scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="couTempId" label="优惠券编号" width="155"></el-table-column>
                <el-table-column prop="couName" label="优惠券名称" width="150"> </el-table-column>
                <el-table-column label="发放方式" width="120">
                    <template scope="scope">
                        {{scope.row.sendType | sendTypeToText}}
                    </template>
                </el-table-column>
                <el-table-column label="发放状态" width="90">
                    <template scope="scope">
                        {{scope.row.sendStatus | sendStatusToText}}
                    </template>
                </el-table-column>
                <!--<el-table-column label="使用状态" width="90">-->
                    <!--<template scope="scope">-->
                        <!--{{scope.row.useStatus | useStatusToText}}-->
                    <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="location" label="使用位置" width="90">
                    <template scope="scope">
                        {{scope.row.usePlat | usePlatToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="scope" label="商品范围" width="90">
                    <template scope="scope">
                        {{scope.row.useRange | useRangeToText}}
                    </template>
                </el-table-column>
                <el-table-column prop="useAreaName" label="使用区域" min-width="120"></el-table-column>
                <el-table-column label="面额(元)" width="90">
                    <template scope="scope">
                        {{scope.row.useDisAmount | numberToFixed2}}
                    </template>
                </el-table-column>
                <el-table-column prop="time" label="发放时间" width="155">
                    <template scope="scope">
                        <template v-if="scope.row.sendTimeStart && scope.row.sendTimeEnd">
                            <p>{{scope.row.sendTimeStart | millisecondFormat('ms')}}</p>
                            <p style="text-align: center;">至</p>
                            <p>{{scope.row.sendTimeEnd | millisecondFormat('ms')}}</p>
                        </template>
                        <template v-else>
                            <template v-if="scope.row.sendType === 3">
                                <p>{{scope.row.createDate | millisecondFormat('ms')}}</p>
                            </template>
                            <template v-else>
                                无
                            </template>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="validTime" label="有效使用时间" width="155">
                    <template scope="scope">
                        <template v-if="scope.row.useTimeType === 1">
                            <p>{{scope.row.activeTimeStart | millisecondFormat('ms')}}</p>
                            <p style="text-align: center;">至</p>
                            <p>{{scope.row.activeTimeEnd | millisecondFormat('ms')}}</p>
                        </template>
                        <template v-else>
                            优惠券到账后 {{scope.row.activeDay}} 天内有效
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="sendLimitNum" label="限领/人"></el-table-column>
                <el-table-column prop="useOrderAmount" label="条件" min-width="100">
                    <template scope="scope">
                        <template v-if="scope.row.useRuleType === 2">
                            无门槛
                        </template>
                        <template v-else>
                            满{{scope.row.useOrderAmount | numberToFixed2}}元
                        </template>
                    </template>
                </el-table-column>
                <el-table-column prop="sendNum" label="发行量"></el-table-column>
                <el-table-column prop="giveOutNum" label="领取量"></el-table-column>
                <el-table-column class-name="table-link"
                        fixed="right"
                        label="操作"
                        width="150">
                    <template scope="scope">
                        <el-button type="text" size="small" @click="couponLook(scope.row.couTempId)">查看</el-button>
                        <el-button v-if="scope.row.sendStatus !== 4" type="text" size="small" @click="couponEditor(scope.row.couTempId)">修改</el-button>
                        <el-button v-if="scope.row.sendStatus !== 4" @click="couponEnd(scope.row.couTempId, scope.row)" type="text" size="small">结束</el-button>
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
    import {sendType, sendStatus, usePlat, useStatus, useRange} from '@/dataControl';
    import areaselectTag from '@/components/areaSelect/areaSelect';
    export default {
        name: 'couponList',
        data() {
            return {
                loading: false,
                value1: '',
                filterData: {
                    'couName': '', // 优惠券名称，规则号
                    'sendType': '', // 1买家领取 2 指定条件发放 3 指定用户发放
                    'sendStatus': '', // 发放状态（1 待发放 2发放中 3已发完 4已结束）
                    'useStatus': '', // 使用状态(1 待领取 2 可使用 3 已过期)
                    'usePlat': '', // 使用位置（ 1全平台 2移动专享）
                    'useRange': '', // 使用范围 1 全部商品 2 指定品类 3 指定商品
                    'sendTimeStart': '', // 发放开始时间
                    'sendTimeEnd': '', // 发放结束时间
                    'useArea': ''// 使用区域
                },
                outerUrl: '',
                saleAreaIds: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
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
                tableData: []
            };
        },
        created() {
            this.loading = true;
            this.listCoupTemplet();
        },
        methods: {
            listToCreateCoupon() {
                this.$router.push({name: 'salesApply'});
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            listCoupTemplet() {
                console.log(this.saleAreaId);
                let pageInfos = {
                    pageNum: this.pageInfo.pageNum,
                    pageSize: this.pageInfo.pageSize
                };
                this.filterData.useArea = this.saleAreaId;
                let params = Object.assign(pageInfos, this.filterData);
                this.outerUrl = '/xe-route/xe-pro/coupon/coupTemplet/listCoupTempletExport?couName=' + params.couName + '&sendStatus=' + params.sendStatus + '&sendTimeEnd=' + params.sendTimeEnd + '&sendTimeStart=' + params.sendTimeStart + '&sendType=' + params.sendType + '&useArea=' + params.useArea + '&usePlat=' + params.usePlat + '&useRange=' + params.useRange + '&useStatus=' + params.useStatus;
                console.log('test', this.outerUrl);
                // 查询优惠券列表
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/coupon/coupTemplet/listCoupTemplet',
                    data: params
                }).then(res => {
                    console.log(res);
                    this.tableData = res.data.listCoupTemplet;
                    this.pageInfo = res.data.pageInfo;
                    this.loading = false;
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            couponLook(couTempId) {
                this.$router.push({name: 'couponDetails', params: {'type': 'details', 'couTempId': couTempId}});
            },
            couponEditor(couTempId) {
                this.$router.push({name: 'couponDetails', params: {'type': 'edit', 'couTempId': couTempId}});
            },
            couponEnd(couTempId, item) {
                // 列表优惠券结束
                let h = this.$createElement;
                this.$xeMessageBox({
                    message: h('div', {class: 'confirm-con'}, [
                        h('div', {class: 'confirm-tips'}, [
                            h('span', {class: 'el-icon el-icon-information'}),
                            h('em', null, '您确认提前结束当前优惠券吗？')
                        ])
                    ]),
                    showCancelButton: true,
                    customClass: 'confirm-style-tip',
                    confirmButtonText: '确定',
                    type: 'warning',
                    beforeClose: (action, instance, done) => {
                        console.log(action);
                        if (action === 'confirm') {
                            instance.confirmButtonLoading = true;
                            instance.confirmButtonText = '执行中...';
                            this.$http({
                                method: 'post',
                                url: '/xe-route/xe-pro/coupon/coupTemplet/updateSendStatus',
                                data: {
                                    couTempId: couTempId
                                }
                            }).then(res => {
                                console.log(res);
                                instance.confirmButtonLoading = false;
                                item.sendStatus = 4;
                                done();
                            }).catch(error => {
                                console.log(error);
                            });
                        } else {
                            done();
                        }
                    }
                }).then(() => {
                    this.$xeMessage.success('优惠券结束成功！');
                }).catch(() => {});
            },
            sendTimeChange(val) {
                this.sendTimeArrs = val;
            },
            handleSizeChange(val) {
                this.pageInfo.pageNum = 1;
                this.pageInfo.pageSize = val;
                this.listCoupTemplet();
            },
            handleCurrentChange(currentPage) {
                this.pageInfo.pageNum = currentPage;
                this.listCoupTemplet();
            },
            highSearchQuery() {
                this.searchFormbut = false;
                this.listCoupTemplet();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.pageInfo.pageNum = 1;
                this.listCoupTemplet();
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
            usePlatList() {
                return usePlat;
            },
            useStatusList() {
                return useStatus;
            },
            useRangeList() {
                return useRange;
            },
            sendTimeArrs: {
                get() {
                    return [this.filterData.sendTimeStart, this.filterData.sendTimeEnd];
                },
                set(val) {
                    let arrs = val.split(' 至 ');
                    this.filterData.sendTimeStart = arrs[0];
                    this.filterData.sendTimeEnd = arrs[1];
                }
            },
            saleAreaId() {
                if (this.saleAreaIds.length > 0) {
                    return this.saleAreaIds[this.saleAreaIds.length - 1];
                } else {
                    return '';
                }
            }
        },
        components: {
            areaselectTag
        }
    };
</script>
