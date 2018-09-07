<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline">
                 <el-form-item prop="searchType">
                    <el-select size="small" @change="searchTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                        <el-option
                            v-for="item in inquirySheetList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="inquirysheetCode">
                    <el-input size="small" :placeholder="placeholder" v-model.trim="puboderSerData.inquirysheetCode" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="searchTimeType">
                    <el-select size="small" class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                        <el-option
                            v-for="item in inquirySheetTimeList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-mr30">
                    <el-date-picker
                        ref="startCreateDate"
                        v-model="value1"
                        type="datetime"
                        size="small"
                        @change="startCreateDateFn"
                        :picker-options="pickerOptionStart"
                        placeholder="开始日期"
                    >
                    </el-date-picker>
                    <span class="Cornet">-</span>
                    <el-date-picker
                        ref="endCreateDate"
                        v-model="value2"
                        type="datetime"
                        size="small"
                        @change="endCreateDateFn"
                        :picker-options="pickerOptionEnd"
                        placeholder="结束日期"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="enquiryForm">
                        查询
                    </el-button>
                    <el-button  class="xe-button-normal"  @click="resetForm('puboderSerData')">
                        重置
                    </el-button>
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
                    <el-form :inline="true" :model="puboderSerData" label-width ='73px' ref="puboderSerData1" class="demo-form-inline">
                        <div style="clear:both;">
                            <el-form-item prop="searchType">
                                <el-select size="small" @change="searchTypeSelec" class="xe-input-w110" v-model="puboderSerData.searchType" placeholder="请选择">
                                    <el-option
                                        v-for="item in inquirySheetList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="inquirysheetCode">
                                <el-input size="small" :placeholder="placeholder" v-model.trim="puboderSerData.inquirysheetCode" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                           <el-form-item prop="searchTimeType">
                                <el-select size="small"  class="xe-input-w110" v-model="puboderSerData.searchTimeType" placeholder="请选择">
                                    <el-option
                                        v-for="item in inquirySheetTimeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                           </el-form-item>
                            <el-form-item class="z-mr0">
                                <el-date-picker
                                  type="datetime"
                                   size="small"
                                    v-model="value1"
                                  placeholder="开始日期">
                                </el-date-picker>
                                <span class="Cornet">-</span>
                            </el-form-item>
                            <el-form-item>
                                <el-date-picker
                                  type="datetime"
                                   size="small"
                                    v-model="value2"
                                  placeholder="结束日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="inquiryStatus" label="询价单状态">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.inquiryStatus" placeholder="请选择">
                                     <el-option
                                        v-for="item in inquiryStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="收货地区">
                                <areaselect-tag class="xe-input-w160" v-model='selecarea' :width='160' :changeOnSelect="true"></areaselect-tag>
                            </el-form-item>
                        </div>
                        <div style="clear: both">
                            <el-form-item prop="quirySource" label="询价单来源">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.quirySource" placeholder="请选择">
                                     <el-option
                                        v-for="item in quirySourceList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="inquiryType" label="询价类型">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.inquiryType" placeholder="请选择">
                                    <el-option
                                        v-for="item in inquiryTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('puboderSerData1')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
         </div>
        <!-- <div class="u-opera-btnBox">
            <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
        </div> -->
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    :data="inquirySheetListDatas"
                    border
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                      prop=""
                      label=""
                      width="55"
                      fixed="left"
                      >
                      <template scope="scope">
                            {{scope.$index + 1}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      fixed="left"
                      type="selection"
                      class-name="selectionTd"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="inquirysheetCode"
                      min-width="150"
                      label="询价单编号">
                    </el-table-column>
                    <el-table-column
                      prop="createDate"
                      label="询单时间"
                      sortable
                      min-width="150"
                      >
                        <template scope="scope">
                            <div>
                                {{scope.row.createDate | millisecondFormat('ms')}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="inquiryStatus"
                        label="询价单状态"
                        min-width="130"
                    >
                        <template scope="scope">
                            <div>
                                <div>{{scope.row.inquiryStatus | inquiryStatusToText}}</div>
                                <div v-if="scope.row.inquiryStatus == 7" class="btn-in-table">
                                     <el-tooltip effect="dark"  placement="top" v-if="scope.row.remark">
                                        <div slot="content">{{scope.row.remark}}</div>
                                        <a href="javascript:void(0)" class="s-blue">驳回原因</a>
                                    </el-tooltip>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="quirySource"
                        label="询价单来源"
                        min-width="130"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.quirySource | quirySourceToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purchName"
                        label="采购商名"
                        min-width="130"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="productName"
                        label="商品名"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="productSpecifications"
                        label="规格"
                        min-width="80"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="productCount"
                        label="数量"
                        min-width="80"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.productCount">
                                {{parseFloat(scope.row.productCount).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proUnit"
                        label="单位"
                        min-width="80"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proPrice"
                        label="询单价"
                        min-width="100"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.proPrice">
                                {{parseFloat(scope.row.proPrice).toFixed(2)}}
                            </div>
                            <div v-else>0</div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="inquiryType"
                        label="询价类型"
                        min-width="130"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.inquiryType | inquiryTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="agreePrice"
                        label="商品单价"
                        min-width="130"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.agreePrice">
                                {{parseFloat(scope.row.agreePrice).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="agreePrice"
                        label="商品总价"
                        min-width="130"
                    >
                        <template scope="scope">
                            <div v-if="scope.row.agreePrice">
                                {{parseFloat(scope.row.agreePrice * scope.row.productCount).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="conName"
                        label="收货人"
                        min-width="130"
                    >
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="收货地址"
                        min-width="150"
                    >
                        <template scope="scope">
                            <div>
                                {{scope.row.deliveryAddress}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        width="105"
                        fixed="right">
                        <template scope="scope">
                            <div class="btn-in-table">
                                <a href="javascript:;" v-if="scope.row.inquiryStatus === 3" @click="offerRoweditor(scope.row, scope.$index)" class="s-blue">报价</a>
                                <a href="javascript:;" v-if="scope.row.inquiryStatus === 3" @click="rejecteditor(scope.row, scope.$index)" class="s-blue">驳回</a>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
                    <div class="tab-foot xe-pagination-panel">
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
         </div>
        <!--报价-->
        <el-dialog title="报价" :visible.sync="offerdilog" class="reset-dialog dialog_wid340 error-tishi">
            <el-form :model="offerForm" :rules="rule" label-width="70px" ref="offerForm">
                <el-form-item prop="agreePrice"label="报价">
                    <el-input size="small"  @blur="offerForm.agreePrice = parseFloat(offerForm.agreePrice) ? Math.abs(parseFloat(offerForm.agreePrice)).toFixed(2) : ''" type="text" v-model.trim="offerForm.agreePrice" :maxlength="7" class="xe-input-col2" placeholder=""></el-input>
                </el-form-item>
                <div style="text-align: center">
                    <el-button class="xe-button-normal" type="primary" @click="offerSubmit('offerForm')">确定</el-button>
                    <el-button class="xe-button-normal" @click="offerdilog = false">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
        <!--驳回-->
        <el-dialog title="驳回" :visible.sync="rejectdailog"   class="reset-dialog dialog_wid340 textare_reset300" >
            <textarea class="" placeholder="请填写订单的驳回原因50字以内" :maxlength="50" v-model="rejectext"></textarea>
            <!--<span class="last-num">{{rejectextNum}}/200</span>-->
            <div slot="footer" class="dialog-footer">
                <el-button  class="xe-button-normal" type="primary" @click="rejectSubmit">确定</el-button>
                <el-button  class="xe-button-normal" @click="rejectdailog = false">取 消</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    import { inquirySheet, inquirySheetTime, inquiryStatus, quirySource, inquiryType } from '@/dataControl';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                value1: new Date(new Date().setHours(0, 0, 0, 0)),
                value2: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
//                value1: '',
//                value2: '',
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
                selecarea: [],
                placeholder: '请输入询价单编号',
                selecRowArray: '', // 单条信息操作信息存储
                selectIndex: '', // 单条操作下标获取
                selectedArray: '', // 多选框（批量操作数据存储）
                rejectext: '',  // 驳回原因
                puboderSerData: {
                    searchType: 1,
                    inquirysheetCode: '',
                    searchTimeType: 1,
                    createDateStart: '',
                    createDateEnd: '',
                    inquiryStatus: '',
                    inquiryType: '',
                    quirySource: ''
                },
                offerdilog: false, // 报价弹框开关
                rejectdailog: false, // 驳回弹框开关
                offerForm: {
                    agreePrice: ''
                },
                rule: {
                    agreePrice: [
                        { required: true, message: '报价不能为空', trigger: 'blur' }
                    ]
                },
                inquirySheetListDatas: [],
                productUrl: '/xe-route/xe-erp'
//                productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            searchTypeSelec() {
                this.puboderSerData.orderId = '';
            },
            offerRoweditor(row, index) { // 报价单条操作
                this.toggleSelection();
                this.offerdilog = true;
                this.selecRowArray = row;
                if (this.selecRowArray.agreePrice) {
                    this.offerForm.agreePrice = this.selecRowArray.agreePrice.toString();
                }
                this.selectIndex = index;
            },
            offerRoweditorpost() {  // 报价接口调取
                let params = {};
                let _this = this;
                params.inquirysheetCode = this.selecRowArray.inquirysheetCode;
                params.agreePrice = this.offerForm.agreePrice;
                params.version = this.selecRowArray.version;
                params.conPhone = this.selecRowArray.conPhone;
                params.operUser = this.selecRowArray.operUser;
                params.deadDate = this.selecRowArray.deadDate;
                params.productCount = this.selecRowArray.productCount;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/xeVenInquirySheet/updateInquirySheetDeal`,
                    data: params
                }).then((res) => {
                    this.offerdilog = false;
//                    this.inquirySheetListDatas[this.selectIndex].agreePrice = this.offerForm.agreePrice;
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
                    this.$xeMessage.success(`${res.msg}`);
                }).catch((error) => {
                    console.log(error);
                });
            },
            offerSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.offerRoweditorpost();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            rejectSubmit() {
                if (this.rejectext) {
                    this.cancelOrder();
                } else {
                    this.$xeMessage.warning('请填写驳回原因');
                }
            },
            rejecteditor(row, index) {
                this.toggleSelection();
                this.selecRowArray = row;
                this.selectIndex = index;
                this.rejectdailog = true;
            },
            cancelOrder() { // 询价驳回接口调取
                let params = {};
                let _this = this;
                params.inquirysheetCode = this.selecRowArray.inquirysheetCode;
                params.remark = this.rejectext;
                params.version = this.selecRowArray.version;
                params.conPhone = this.selecRowArray.conPhone;
                params.operUser = this.selecRowArray.operUser;
                params.deadDate = this.selecRowArray.deadDate;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/xeVenInquirySheet/updateInquirySheetCancel`,
                    data: params
                }).then((res) => {
                    this.rejectdailog = false;
                    this.$xeMessage.success(`${res.msg}`);
                    setTimeout(() => {
                        _this.enquiryForm();
                    }, 300);
//                    this.inquirySheetListDatas[this.selectIndex].inquiryStatus = 7;
//                    this.inquirySheetListDatas[this.selectIndex].remark = this.rejectext;
                }).catch((error) => {
                    console.log(error);
                });
            },
            startCreateDateFn(val) {
                this.startCreateDates = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            endCreateDateFn(val) {
                this.endCreateDates = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            enquiryForm() {
                let params = {};
                params = this.puboderSerData;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.selecarea.length) {
                    if (this.selecarea.length > 0 && this.selecarea[0]) {
                        params.caProvince = this.selecarea[0];
                    }
                    if (this.selecarea.length > 1 && this.selecarea[1]) {
                        params.caCity = this.selecarea[1];
                    }
                    if (this.selecarea.length > 2 && this.selecarea[2]) {
                        params.caArea = this.selecarea[2];
                    }
                } else {
                    params.caProvince = '';
                    params.caCity = '';
                    params.caArea = '';
                }
                if (!this.startCreateDates) {
                    if (this.value1) {
                        params.createDateStart = millisecondFormat(this.value1.getTime(), 'ms');
                    }
                }
                if (!this.endCreateDates) {
                    if (this.value2) {
                        params.createDateEnd = millisecondFormat(this.value2.getTime(), 'ms');
                    }
                }
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/xeVenInquirySheet/queryXeVenInquirySheetList`,
                    data: params
                }).then((res) => {
                    this.pagelist.total = res.data.xePageInfo.total;
                    this.inquirySheetListDatas = res.data.inquirySheetList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            parseFloatNum(event) {
                let value = event.target.value;
                console.log(value);
                if (/^\d+\.?\d{0,2}$/.test(value)) {
                    event.target.value = value;
                } else {
                    event.target.value = value.substring(0, value.length - 1);
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.selecarea = [];
                this.value1 = '';
                this.value2 = '';
                this.enquiryForm();
            },
            handleSelectionChange(val) {
                this.selectedArray = val;
            },
            formatter() {},
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            toggleSelection(rows) { // 点击左侧单项修改的时候清空多选项
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.enquiryForm();
                }
            }
        },
        watch: {
            'puboderSerData.searchType'(n) {
                if (n === 1) {
                    this.placeholder = '请输入询价单编号';
                } else if (n === 2) {
                    this.placeholder = '商品名称';
                } else if (n === 3) {
                    this.placeholder = '商品货号';
                } else if (n === 4) {
                    this.placeholder = '客户账号';
                } else if (n === 5) {
                    this.placeholder = '收货人姓名';
                }
            },
            offerdilog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.$refs.offerForm.resetFields();
                    }, 300);
                }
            },
            rejectdailog(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.rejectext = '';
                    }, 300);
                }
            }
        },
        computed: {
            startCreateDates: {
                get() {
                    return this.puboderSerData.createDateStart;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.createDateStart = '';
                    } else {
                        this.puboderSerData.createDateStart = val;
                    }
                }
            },
            endCreateDates: {
                get() {
                    return this.puboderSerData.createDateEnd;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.createDateEnd = '';
                    } else {
                        this.puboderSerData.createDateEnd = val;
                    }
                }
            },
            inquirySheetList() {
                return inquirySheet;
            },
            inquirySheetTimeList() {
                return inquirySheetTime;
            },
            inquiryStatusList() {
                return inquiryStatus;
            },
            quirySourceList() {
                return quirySource;
            },
            inquiryTypeList() {
                return inquiryType;
            }
        },
        components: {
            areaselectTag,
            categoryTag
        }
    };
</script>
