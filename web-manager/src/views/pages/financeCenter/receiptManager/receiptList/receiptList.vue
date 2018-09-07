<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                    <el-form-item prop="orderId">
                        <el-input size="small" placeholder="订单编号" v-model="searchform.orderId" class="">
                          </el-input>
                    </el-form-item>
                    <el-form-item prop="sbillStatus">
                        <el-select size="small"  v-model="searchform.sbillStatus" placeholder="收款状态">
                                <el-option
                                v-for="item in sbillStatusList"
                                :label="item.name"
                                :key="item.value"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item prop="venName">
                        <el-input size="small" placeholder="商户名称" v-model="searchform.venName" class="">
                          </el-input>
                    </el-form-item>
                     <!--<el-form-item prop="keyWords">-->
                        <!--<el-input size="small" placeholder="收款单号" v-model="searchform.keyWords" class="">-->
                          <!--</el-input>-->
                    <!--</el-form-item>-->
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="listFinSalesBill">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform1')">重置</el-button>
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
                    <el-form :inline="true"  label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div class="clearfix">
                            <el-form-item prop="searchTimeType">
                                <el-select size="small" style="width: 131px" v-model="searchform.searchTimeType" placeholder="请选择">
                                        <el-option
                                        v-for="item in finaCenterSalesBillTimeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                            <el-form-item prop="orderId" label="订单编号">
                                <el-input size="small" placeholder="订单编号" v-model="searchform.orderId" class="">
                                  </el-input>
                            </el-form-item>
                            <el-form-item prop="sbillStatus" label="收款状态">
                                <el-select size="small"  v-model="searchform.sbillStatus" placeholder="收款状态">
                                        <el-option
                                        v-for="item in sbillStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="venName" label="商户名称">
                                <el-input size="small" placeholder="商户名称" v-model="searchform.venName" class="">
                                  </el-input>
                            </el-form-item>
                             <el-form-item prop="sbillCode" label="收款单号">
                                <el-input size="small" placeholder="收款单号" v-model="searchform.sbillCode" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                         <div  class="clearfix">
                            <!--<el-form-item prop="venName" label="店铺名称">-->
                                <!--<el-input size="small" placeholder="店铺名称" v-model="searchform.keyWords" class="">-->
                                  <!--</el-input>-->
                            <!--</el-form-item>-->
                            <el-form-item prop="operMode" label="商户性质">
                                <el-select size="small" v-model="searchform.operMode" placeholder="商户性质">
                                        <el-option
                                        v-for="item in venTypeDataList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                             <el-form-item prop="sbillPayType" label="收款方式">
                                <el-select size="small" v-model="searchform.sbillPayType" placeholder="收款方式">
                                        <el-option
                                        v-for="item in sbillPayTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                            <el-form-item prop="month" label="月份">
                                <el-select size="small" v-model="searchform.month" placeholder="月份">
                                        <el-option
                                        v-for="item in monthFloorList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="listFinSalesBill">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
             <el-button @click="exportDataMethod"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
            <el-button @click="exportPayBillDetail"><i class="iconfont icon-daochu"></i>&nbsp;导出明细</el-button>
        </div>
        <div>
            <el-table ref="billDto" :data="billDto" border v-loading="dataListloading" @selection-change="handleSelectionChange">
                <el-table-column  min-width="55" fixed="left">
                    <template scope="scope">
                        {{scope.$index+1}}
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="50" fixed="left"></el-table-column>
                    <el-table-column prop="months" label="月份" min-width="100">
                        <template scope="scope">
                            <div v-if="scope.row.months">
                                {{scope.row.months}}月份
                            </div>
                        </template>
                    </el-table-column>
                <el-table-column prop="operMode" label="商户性质" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.operMode | venTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sbillCode" label="收款单号" min-width="150">
                    <template scope="scope">
                        <div>
                            <a class="s-blue" @click="listFinPayDetail(scope.row.sbillCode)">{{scope.row.sbillCode}}</a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sendTime" label="发货时间" min-width="160">
                    <template scope="scope">
                        <div>
                            {{scope.row.sendTime | millisecondFormat('ms')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="venName" label="商户信息" min-width="100">
                </el-table-column>
                <el-table-column prop="orderId" label="订单编号" min-width="150"></el-table-column>
                <el-table-column prop="goodsAmount" label="商品总额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.goodsAmount">
                            ￥{{parseFloat(scope.row.goodsAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="payAmount" label="订单金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.payAmount">
                            ￥{{parseFloat(scope.row.payAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sfAmount" label="应收金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.sfAmount">
                            ￥{{parseFloat(scope.row.sfAmount).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="differAmount" label="退款金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.differAmount">
                            ￥{{parseFloat(scope.row.differAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="realSbillAmount" label="实收金额" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.realSbillAmount">
                            ￥{{parseFloat(scope.row.realSbillAmount).toFixed(2)}}
                        </div>
                        <div v-else>￥0.00</div>
                    </template>
                </el-table-column>
                <el-table-column prop="sbillStatus" label="收款状态" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.sbillStatus | sbillStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="receiveTime" label="收款日期" min-width="160">
                    <template scope="scope">
                        <div v-if="scope.row.receiveTime">
                            {{scope.row.receiveTime | millisecondFormat('ms')}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="sbillPayType" label="收款方式" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.sbillPayType | sbillPayTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="payType" label="支付类型" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.payType | payTypeOrderfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="orderRemark" label="订单备注" min-width="150">
                </el-table-column>
                <el-table-column prop="orderStatus" label="订单状态" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.orderStatus | orderStatusfilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="caStreet" label="收货地址" min-width="180">
                </el-table-column>
                <el-table-column prop="caAreaId" label="收货区域" min-width="180">
                </el-table-column>
                <el-table-column prop="sbillRemark" label="备注" min-width="150">
                </el-table-column>
            </el-table>
        </div>
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
        <div class="pub-tabDatadetails" style="margin-top: 30px">
            <el-tabs v-model="tabCard_val" class="noFlot" type="card">
                <el-tab-pane label="商品信息" name="first">
                    <refund-journal :payDetails = 'payDetails'></refund-journal>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { finaCenterSalesBillTime, sbillStatus, venTypeData, sbillPayType, monthFloor } from '@/dataControl';
import { millisecondFormat } from 'utils';
import refundJournal from './refundJournal';
export default {
    data() {
        return {
            tabCard_val: 'first',
            searchform: {
                sbillStatus: '',
                sbillCode: '',
                searchTimeType: '',
                startSendTime: '',
                endSendTime: '',
                orderId: '',
                month: '',
                sbillPayType: '',
                operMode: '',
                venName: ''
            },
            exportData: '',
            payDetails: [],
            billDto: [],
            value1: '',
            value2: '',
            dataListloading: false,
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.listFinSalesBill();
    },
    methods: {
        listFinPayDetail(sbillCode) { // 应收管理--收款单明细
            let params = {};
            params.sbillCode = sbillCode;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/finSalesBill/listFinSalesBillDetail`,
                data: params
            }).then((res) => {
                this.payDetails = res.data.billDto;
            }).catch((error) => {
                console.log(error);
            });
        },
        getVenInfoByVenName() { // 查询商户
            let params = {};
            params.venName = '';
            params.pageFlag = 2;
            params.pageNum = '';
            params.pageSize = '';
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/orderInfo/getVenInfoByVenName`,
                data: params
            }).then((res) => {
                this.venInfoList = res.data.venInfoList;
            }).catch((error) => {
                console.log(error);
            });
        },
        listFinSalesBill() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.startSendTime = millisecondFormat(this.value1.getTime(), 'ms');
            } else {
                params.startSendTime = '';
            }
            if (this.value2) {
                params.endSendTime = millisecondFormat(this.value2.getTime(), 'ms');
            } else {
                params.endSendTime = '';
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
                url: `${this.productUrl}/manager/finSalesBill/listFinSalesBill`,
                data: params
            }).then((res) => {
                this.dataListloading = false;
                this.billDto = res.data.billDto;
                if (this.billDto && this.billDto.length) {
                    this.listFinPayDetail(this.billDto[0].sbillCode);
                } else {
                    this.payDetails = [];
                }
                this.pagelist.total = res.data.page.total;
            }).catch((error) => {
                console.log(error);
                this.dataListloading = false;
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.listFinSalesBill();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.listFinSalesBill();
            }
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.listFinSalesBill();
            }, 10);
        },
        exportDataMethod() { // 导出
            window.open(`${this.productUrl}/manager/finSalesBill/exportFinSalesBill?${this.exportData}`);
        },
        exportPayBillDetail() { // 导出明细
            window.open(`${this.productUrl}/manager/finSalesBill/exportFinSalesBillDetail?${this.exportData}`);
        }
    },
    computed: {
        sbillStatusList() {
            return sbillStatus;
        },
        finaCenterSalesBillTimeList() {
            return finaCenterSalesBillTime;
        },
        venTypeDataList() {
            return venTypeData;
        },
        sbillPayTypeList() {
            return sbillPayType;
        },
        monthFloorList() {
            return monthFloor;
        }
    },
    components: {
        refundJournal
    }
};
</script>
