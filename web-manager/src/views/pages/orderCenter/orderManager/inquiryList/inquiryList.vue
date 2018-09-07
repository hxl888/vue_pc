<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                    <el-form-item prop="searchType">
                        <el-select size="small" @change="searchTypeSelec" style="width: 131px" v-model="searchform.searchType" placeholder="请选择">
                                <el-option
                                v-for="item in ordercenterInquirySelecList"
                                :label="item.name"
                                :key="item.value"
                                :value="item.value">
                                </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="keyWords">
                        <el-input size="small" style="width: 180px" :placeholder="placeholder" v-model="searchform.keyWords" class="">
                          </el-input>
                    </el-form-item>
                     <el-form-item prop="sysType" label="">
                        <area-select v-model="selecarea" placeholder="收货地区" :width="180"></area-select>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
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
                        <div  class="clearfix">
                            <el-form-item prop="searchType">
                                <el-select size="small" @change="searchTypeSelec" style="width: 131px" v-model="searchform.searchType" placeholder="请选择">
                                        <el-option
                                        v-for="item in ordercenterInquirySelecList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="keyWords">
                                <el-input size="small" style="width: 145px" :placeholder="placeholder" v-model="searchform.keyWords" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="dateSearchType">
                                <el-select size="small" style="width: 131px" v-model="searchform.dateSearchType" placeholder="请选择">
                                        <el-option
                                        v-for="item in ordercenterdateSearchTypeList"
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
                                     :picker-options="pickerOptionStart"
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
                                     :picker-options="pickerOptionEnd"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="sysType" label="收货地区">
                                <area-select v-model="selecarea" placeholder="收货地区" :width="168"></area-select>
                            </el-form-item>
                             <el-form-item prop="inquiryStatus" label="询价状态">
                                <el-select size="small" style="width: 168px" v-model="searchform.inquiryStatus" placeholder="询价状态">
                                        <el-option
                                        v-for="item in inquiryStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                         <div  class="clearfix">
                            <el-form-item prop="venuserCode" label="商户名称">
                                 <el-input size="small" @focus="venNamedilog = true" style="width: 168px" placeholder="商户名称" v-model="searchform.venuserCode" class="">
                                  </el-input>
                            </el-form-item>
                            <el-form-item prop="inquiryType" label="询价类型">
                                <el-select size="small" style="width: 168px" v-model="searchform.inquiryType" placeholder="询价类型">
                                        <el-option
                                        v-for="item in inquiryTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                             <el-form-item prop="zpOrder" label="是否众品">
                                <el-select size="small" style="width: 168px" v-model="searchform.zpOrder" placeholder="是否众品">
                                        <el-option
                                        v-for="item in zpOrderList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="autoOperationFlag" label="运营模式">
                                <el-select size="small" style="width: 168px" v-model="searchform.autoOperationFlag" placeholder="运营模式">
                                        <el-option
                                        v-for="item in autoOperationFlagList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div  class="clearfix">
                            <el-form-item prop="venType" label="商户性质">
                                <el-select size="small" style="width: 168px" v-model="searchform.venType" placeholder="商户性质">
                                        <el-option
                                        v-for="item in venTypeDataList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                        </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="inquirysheetExport"><i class="iconfont icon-daochu"></i> 导出</el-button>
            <!--<el-button><i class="iconfont icon-daochu"></i> 导出明细</el-button>-->
        </div>
        <div>
            <el-table ref="inquirysheetList" :data="inquirysheetList" border v-loading="dataListloading" @selection-change="handleSelectionChange">
                <el-table-column
                        label="序号"
                        fixed='left'
                        width="65">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                </el-table-column>
                <el-table-column prop="inquirysheetCode" label="询价单号" min-width="150"></el-table-column>
                <el-table-column prop="suborderId" label="订单编号" min-width="150"></el-table-column>
                <el-table-column prop="inquiryStatus" label="询价状态" min-width="130">
                    <template scope="scope">
                        <div>
                            {{scope.row.inquiryStatus | inquiryStatusfilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="inquiryType" label="询价类型" min-width="130">
                    <template scope="scope">
                        <div>
                            {{scope.row.inquiryType | inquiryTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="quirySource" label="询价单来源" min-width="130">
                    <template scope="scope">
                        <div>
                            {{scope.row.quirySource | orderSourcefilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="account" label="客户帐号" min-width="130"></el-table-column>
                <el-table-column prop="productName" label="商品名" min-width="150">
                </el-table-column>
                <el-table-column prop="productSpecifications" label="规格" min-width="80">
                </el-table-column>
                <el-table-column prop="productCount" label="数量" min-width="80"></el-table-column>
                <el-table-column prop="proUnit" label="单位" min-width="80"></el-table-column>
                <el-table-column prop="agreePrice" label="询单价" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.agreePrice">
                            {{parseFloat(scope.row.agreePrice).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="proPrice" label="成交价" min-width="100">
                    <template scope="scope">
                        <div v-if="scope.row.proPrice">
                            {{parseFloat(scope.row.proPrice).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="totalPrice" label="商品总价" min-width="130">
                    <template scope="scope">
                        <div v-if="scope.row.totalPrice">
                            {{parseFloat(scope.row.totalPrice).toFixed(2)}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="venName" label="商户名称" min-width="150">
                </el-table-column>
                <el-table-column prop="autoOperationFlag" label="运营模式" min-width="130">
                    <template scope="scope">
                        <div>
                            {{scope.row.autoOperationFlag | autoOperationFlagfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="venType" label="商户性质" min-width="130">
                    <template scope="scope">
                        <div>
                            {{scope.row.venType | venTypefiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="收货地址" min-width="200">
                    <template scope="scope">
                        <div>
                            {{scope.row.caProvince}}{{scope.row.caCity}}{{scope.row.caArea}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="priceDate" label="报价时间" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.priceDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="询价时间" min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.createDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
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
        <!--商户名称弹框展示-->
        <div class="reset-dialog">
            <div  class="reset-dialog dialog_wid360" @click.stop>
                <el-dialog title="商户名称" :visible.sync="venNamedilog">
                    <div>
                        <el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline">
                            <el-form-item prop="userCodes" label="商户名称">
                                <el-select
                                    v-model="searchform.userCodes" multiple size="small" style="width: 250px" class="samll_hei24"   filterable remote  placeholder="请输入关键词"
                                    :remote-method="remoteMethod"
                                    :loading="venInfoloading">
                                    <el-option
                                        v-for="item in venInfoList"
                                        :key="item.userCode"
                                        :label="item.venName"
                                        :value="item.userCode">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="venNameSuce">确定</el-button>
                        <el-button @click="venNamedilog = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
import areaSelect from '@/components/areaSelect/areaSelect';
import { ordercenterInquirySelec, ordercenterdateSearchType, zpOrder, autoOperationFlag, venTypeData, inquiryStatus, inquiryType } from '@/dataControl';
import { millisecondFormat } from 'utils';
let maxDate = 90 * 24 * 60 * 60 * 1000;
export default {
    data() {
        let self = this;
        return {
            searchform: {
                searchType: 1,      // 询价单号，订单编号，客户账户查选项  1.询价单号  2.订单编号   3.客户账户
                keyWords: '',          // 查询项内容
                dateSearchType: 1,          //   时间查询项  1. 报价时间  2.询价时间
                startDate: '',        // 查询项内容 开始时间
                endDate: '',        // 查询项内容 结束时间
                caProvince: '',                 // 收货地区省
                caCity: '',                         // 收货地区市
                caArea: '',                      // 收货地区 区
                userCodes: [],            // 商户名称
                inquiryStatus: '',                 // 询价状态   0.待询价 1.已报价  2.已失效 3.询价中4.已完成 5.已取消 6.已过期 7.已驳回
                inquiryType: '',                 // 询价类型（0 自提价 1 配送价 ）
                zpOrder: 1,                    // 是否是众品   1不是  2是
                autoOperationFlag: '',           // 运营模式  1 自运营 2代运营
                venType: '',                   // 商户性质 1 自营 2 三方
                venuserCode: ''
            },
            exportData: '',
            venNamedilog: false,
            venInfoloading: false,
            edialogVisible: false,
            inquirysheetList: [],
            appverdialog: false,
            selecarea: [],
            picServer: '',
            value1: '',
            value2: '',
            pickerOptionStart: {
                disabledDate(time) {
                    return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                }
            },
            pickerOptionEnd: {
                disabledDate(time) {
                    return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                }
            },
            placeholder: '请输入询价单号',
            dataListloading: false,
            venInfoList: [], // 查询商户
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            selectedArray: '', // 批量勾选数据记录
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.queryTabData();
        this.getVenInfoByVenName();
    },
    methods: {
        venNameSuce() {
            let tags = $('.el-select__tags .el-select__tags-text');
            if (tags) {
                let split = [];
                for (let i = 0, len = tags.length; i < len; i++) {
                    split.push(tags[i].innerText);
                }
                this.searchform.venuserCode = split.join();
            }
            this.venNamedilog = false;
        },
        searchTypeSelec() {
            this.searchform.keyWords = '';
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
        queryTabData() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.startDate = millisecondFormat(this.value1.getTime(), 'ms');
            }
            if (this.value2) {
                params.endDate = millisecondFormat(this.value2.getTime(), 'ms');
            }
            if (this.selecarea[0]) {
                params.caProvince = this.selecarea[0];
            } else {
                params.caProvince = '';
            }
            if (this.selecarea[1]) {
                params.caCity = this.selecarea[1];
            } else {
                params.caCity = '';
            }
            if (this.selecarea[2]) {
                params.caArea = this.selecarea[2];
            } else {
                params.caArea = '';
            }
            this.exportData = '';
            for (let i in params) {
                if (i !== 'pageNum' && i !== 'pageSize') {
                    if (params[i] === '' || params[i] === null) {
                        this.exportData += `${i}=&`;
                    } else if (i === 'userCodes') {
                        if (this.searchform.userCodes.length) {
                            this.exportData += `userCodeStr=${params[i]}&`;
                        } else {
                            this.exportData += `userCodeStr=&`;
                        }
                    } else {
                        this.exportData += `${i}=${params[i]}&`;
                    }
                }
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/orderInfo/getInquirysheetList`,
                data: params
            }).then((res) => {
                this.dataListloading = false;
                this.inquirysheetList = res.data.inquirysheetList;
                this.pagelist.total = res.data.pageInfo.total;
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
            this.queryTabData();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.queryTabData();
            }
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.selecarea = [];
            this.searchform.userCodes = [];
            this.searchform.venuserCode = '';
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.queryTabData();
            }, 10);
        },
        remoteMethod(query) {
            if (query !== '') {
                let params = {};
                params.venName = query;
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
            }
        },
        inquirysheetExport() { // 导出
            let URL = encodeURI(this.exportData);
            console.log(this.exportData);
            window.open(`${this.productUrl}/manager/orderInfo/inquirysheetExport?${URL}`);
        }
    },
    watch: {
        'searchform.searchType'(n) {
            if (n === 1) {
                this.placeholder = '请输入询价单号';
            } else if (n === 2) {
                this.placeholder = '请输入订单编号';
            } else if (n === 3) {
                this.placeholder = '请输入客户账户';
            }
        }
    },
    computed: {
        ordercenterdateSearchTypeList() {
            return ordercenterdateSearchType;
        },
        zpOrderList() {
            return zpOrder;
        },
        autoOperationFlagList() {
            return autoOperationFlag;
        },
        venTypeDataList() {
            return venTypeData;
        },
        ordercenterInquirySelecList() {
            return ordercenterInquirySelec;
        },
        inquiryStatusList() {
            return inquiryStatus;
        },
        inquiryTypeList() {
            return inquiryType;
        }
    },
    components: {
        areaSelect
    }
};
</script>

<style lang="scss">
    .el-select {
        &.samll_hei24 {
            input {
                height: 24px;
            }
            .el-tag {
                width: 74px;
            }
            .el-select__tags {
                padding: 6px 0 0 2px;
                max-width: 250px!important;
            }
            .el-select__tags-text {
                width: 80%;
                display: inline-block;
                overflow-wrap: break-word;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .el-tag__close {
                top:-8px;
                right: 3px;
            }
        }
    }
</style>
