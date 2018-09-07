<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData" ref="puboderSerData" class="demo-form-inline">
                <el-form-item prop="typeFlagOrder">
                    <el-select size="small" @change="typeFlagSelec(1)" class="xe-input-w110" v-model="puboderSerData.typeFlagOrder" placeholder="请选择">
                        <el-option
                            v-for="item in typeFlagList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="seacherOrder">
                    <el-input size="small" placeholder="请输入查询条件" v-model="puboderSerData.seacherOrder" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="typeFlagCar">
                    <el-select size="small" @change="typeFlagSelec(2)" class="xe-input-w110" v-model="puboderSerData.typeFlagCar" placeholder="请选择">
                        <el-option
                            v-for="item in typeFlagList02"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="seacherCar">
                    <el-input size="small" placeholder="请输入查询条件" v-model="puboderSerData.seacherCar" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="loginAccount">
                    <el-input size="small" placeholder="请输入客户账号" v-model="puboderSerData.loginAccount" class="">
                      </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button>
                    <el-button   class="xe-button-normal"  @click="resetForm('puboderSerData')">
                        重置
                    </el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" :model="puboderSerData" label-width ='73px' ref="puboderSerData">
                        <div class="clearfix">
                            <el-form-item prop="typeFlagOrder">
                                <el-select size="small" @change="typeFlagSelec(1)" class="xe-input-w110" v-model="puboderSerData.typeFlagOrder" placeholder="请选择">
                                    <el-option
                                        v-for="item in typeFlagList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="seacherOrder">
                                <el-input size="small" placeholder="请输入查询条件" style="width: 355px;" v-model="puboderSerData.seacherOrder" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="typeFlagCar">
                                <el-select size="small" @change="typeFlagSelec(2)" class="xe-input-w110" v-model="puboderSerData.typeFlagCar" placeholder="请选择">
                                    <el-option
                                        v-for="item in typeFlagList02"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="seacherCar">
                                <el-input size="small" placeholder="请输入查询条件" style="width: 355px;" v-model="puboderSerData.seacherCar" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="loginAccount" label="客户账号">
                                <el-input size="small" placeholder="请输入客户账号" class="xe-input-w160" v-model="puboderSerData.loginAccount">
                                  </el-input>
                            </el-form-item>
                            <el-form-item prop="shipType" label="配送方式">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.shipType" placeholder="请选择">
                                    <el-option
                                        v-for="item in shipTypeList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="saleAreaIds" label="收货地区">
                                <areaselectTag v-model='puboderSerData.saleAreaIds' :width='160' :changeOnSelect="true"></areaselectTag>
                            </el-form-item>
                            <el-form-item prop="storeId" label="仓库名称">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.storeId" placeholder="请选择">
                                    <el-option
                                        v-for="item in orderStoreIdList"
                                        :label="item.storeName"
                                        :key="item.storeId"
                                        :value="item.storeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="storageAreaIds" label="仓库所在地">
                                <areaselectTag v-model='puboderSerData.storageAreaIds' :width='160' :changeOnSelect="true"></areaselectTag>
                            </el-form-item>
                            <el-form-item prop="carSendStatus" label="派车状态">
                                <el-select size="small" class="xe-input-w160" v-model="puboderSerData.carSendStatus" placeholder="请选择">
                                    <el-option
                                        v-for="item in carSendStatusList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="下单时间">
                                <el-date-picker
                                    ref="startCreateDate"
                                    v-model="value1"
                                    type="datetime"
                                    size="small"
                                    @change="startCreateDateFn"
                                    :picker-options="pickerOptionStart"
                                    placeholder="开始时间"
                                >
                                </el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-date-picker
                                    ref="endCreateDate"
                                    v-model="value2"
                                    type="datetime"
                                    size="small"
                                    @change="endCreateDateFn"
                                    :picker-options="pickerOptionEnd"
                                    placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="发货时间">
                                <el-date-picker
                                    ref="startSendTime"
                                    v-model="value3"
                                    type="datetime"
                                    size="small"
                                    @change="startSendTimeFn"
                                    :picker-options="pickerOptionStart2"
                                    placeholder="开始时间"
                                >
                                </el-date-picker>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <el-date-picker
                                    ref="endSendTime"
                                    v-model="value4"
                                    type="datetime"
                                    size="small"
                                    @change="endSendTimeFn"
                                    :picker-options="pickerOptionEnd2"
                                    placeholder="结束时间"
                                >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-button  class="xe-button-normal" type="primary" @click="onSubmit">
                                查询
                            </el-button>
                            <el-button   class="xe-button-normal"  @click="resetForm('puboderSerData')">
                                重置
                            </el-button>
                        </div>
                    </el-form>
                </div>
            </div>
         </div>
         <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="BathSend"><i class="iconfont icon-tiaobodan"></i>&nbsp;批量派车</el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i>&nbsp;导出</el-button>
        </div>
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    highlight-current-row
                    :data="pubTabDatacon"
                    border
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
                    style="width: 100%">
                    <el-table-column
                        label=""
                        fixed="left"
                        class-name="td-index"
                        width="30">
                        <template scope="props">
                            <span>{{props.$index + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      type="selection"
                      fixed="left"
                      class-name="selectionTd"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="logtsCode"
                      label="物流单号"
                      min-width="150"
                      >
                        <template scope="scope">
                            <div class="btn-in-table" @click="orderIdSelectclick(scope.$index, scope.row)">
                                <a href="javascript:;" class="s-blue">{{scope.row.logtsCode}}</a>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="orderId"
                      label="订单编号"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="carSendStatus"
                      label="派车状态"
                      min-width="85"
                      >
                      <template scope="props">
                          {{props.row.carSendStatus | carSendStatusToText}}
                      </template>
                    </el-table-column>
                    <el-table-column
                        prop="orderStatus"
                        label="订单状态"
                        min-width="100">
                        <template scope="scope">
                            <div>
                                {{parseFloat(scope.row.orderStatus) | orderStatusToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="storeName"
                      label="发货仓库"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="storeArea"
                      label="仓库所在地区"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="loginAccount"
                      label="客户账号"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="receiptArea"
                      label="收货地区"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="shipType"
                      label="配送方式"
                      min-width="150"
                      >
                      <template scope="props">
                          {{props.row.shipType | shipTypeToText}}
                      </template>
                    </el-table-column>
                    <!-- <el-table-column
                      prop="tmsStatus"
                      label="TMS"
                      min-width="150"
                      >
                      <template scope="props">
                          {{props.row.tmsStatus | tmsStatusToText}}
                      </template>
                    </el-table-column> -->
                    <!-- <el-table-column
                      prop="logtsCompany"
                      label="物流公司"
                      min-width="150"
                      >
                    </el-table-column> -->
                    <!-- <el-table-column
                      prop="logtsNumber"
                      label="运单号"
                      min-width="150"
                      >
                    </el-table-column> -->
                    <el-table-column
                      prop="carPlateNum"
                      label="承运车辆"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="contactPerson"
                      label="联系人"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="mobilePhone"
                      label="手机号"
                      min-width="150"
                      >
                    </el-table-column>
                    <el-table-column
                      prop="createDate"
                      label="下单时间"
                      min-width="150"
                      >
                      <template scope="props">
                          {{props.row.createDate}}
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="sendTime"
                      label="发货时间"
                      min-width="150"
                      >
                      <template scope="props">
                          {{props.row.sendTime}}
                      </template>
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        fixed="right"
                        min-width="100"
                        >
                        <template scope="props">
                            <div class="btn-in-table">
                                <a v-if="props.row.carSendStatus === 1" href="javascript:;" class="s-blue" @click="carSend(props.row)">派车</a>
                                <a v-if="props.row.carSendStatus === 2" href="javascript:;" class="s-blue" @click="carSendEdit(props.row)">修改派车</a>
                            </div>
                        </template>
                    </el-table-column>
                  </el-table>
                    <div class="tab-foot xe-pagination-panel">
                        <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="xePageInfo.pageNum"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="xePageInfo.pageSize"
                            layout="total, prev, pager, next, sizes, jumper"
                            :total="xePageInfo.total">
                        </el-pagination>
                    </div>
            </div>
            <div class="pub-tabDatadetails" v-if="tabVisble">
                <el-tabs v-model="tabCard_val" class="noFlot" type="card" @tab-click="handleClick">
                    <el-tab-pane label="物流信息" name="third">
                        <logistics-information :logisticsInfor = 'logisticsInfor'></logistics-information>
                    </el-tab-pane>
                    <el-tab-pane label="客户信息" name="second">
                        <buyer-information :buyerInfor = "buyerInfor"></buyer-information>
                    </el-tab-pane>
                    <el-tab-pane label="商品信息" name="first">
                        <refund-merchandise :refundMer = 'refundMer'></refund-merchandise>
                    </el-tab-pane>
                    <el-tab-pane label="备注信息" name="fourth">
                        <memo-information :memoInfor = 'memoInfor'></memo-information>
                    </el-tab-pane>
                    <!-- <el-tab-pane label="订单日志" name="five">
                        <refund-journal :refundJou = 'refundJou'></refund-journal>
                    </el-tab-pane> -->
                </el-tabs>
            </div>
         </div>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import categoryTag from '@/components/category/category';
    import {typeFlag, typeFlag02, orderStatus, shipType, carSendStatus} from '@/dataControl';
    import refundMerchandise from './refundMerchandise';
    import buyerInformation from './buyerInformation';
    import logisticsInformation from './logisticsInformation';
    import memoInformation from './memoInformation';
    // import refundJournal from './refundJournal';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                xePageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tabVisble: false,
                orderStoreIdList: [], // 高级搜索的数据
                orderStoreIdListother: [], // 修改仓库（不通于高级搜索的数据）
                value1: '',
                value2: '',
                value3: '',
                value4: '',
                outerUrl: '',
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
                pickerOptionStart2: {
                    disabledDate(time) {
                        return self.value4 ? time.getTime() < self.value4.getTime() - maxDate || time.getTime() > self.value4.getTime() : false;
                    }
                },
                pickerOptionEnd2: {
                    disabledDate(time) {
                        return self.value3 ? time.getTime() > self.value3.getTime() + maxDate || time.getTime() < self.value3.getTime() : false;
                    }
                },
                selecRow: '',
                multipleSelection: [],
                tabCard_val: 'third',
                refundMer: {}, // 商品信息
                buyerInfor: null, // 买家信息
                logisticsInfor: null, // 物流信息
                memoInfor: null, // 备注信息
                refundJou: null, // 订单日志
                puboderSerData: {
                    typeFlagOrder: 1,
                    seacherOrder: '',
                    typeFlagCar: 1,
                    seacherCar: '',
                    orderStatus: '',
                    loginAccount: '',
                    shipType: '',
                    carSendStatus: '',
                    saleAreaIds: [],
                    storageAreaIds: [],
                    storeId: '',
                    startCreateDate: '',
                    endCreateDate: '',
                    startSendTime: '',
                    endSendTime: ''
                },
                pubTabDatacon: []
            };
        },
        created() {
            this.enquiryForm(1, this.puboderSerData);
            this.orderStoreSearch(); // 仓库查询
        },
        methods: {
            carSendEdit(row) {
                this.$router.push({name: 'carSendEdit', query: {logtsCode: row.logtsCode}});
            },
            carSend(row) {
                this.$router.push({name: 'carSend', query: {logtsCode: row.logtsCode}});
            },
            carLotEdit(logtsCodeArr) {
                this.$router.push({name: 'carLotEdit', query: {logtsCodeArr: logtsCodeArr}});
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            BathSend() {
                if (this.multipleSelection.length === 0) {
                    this.$xeMessage.warning('请选择物流单');
                    return;
                }
                if (this.multipleSelection.length > 10) {
                    this.$xeMessage.warning('每次最多批量处理10张物流单');
                    return;
                }
                for (var i = 0; i < this.multipleSelection.length; i++) {
                    // receiptArea"storeArea
                    if (this.multipleSelection[i].receiptArea !== this.multipleSelection[0].receiptArea) {
                        this.$xeMessage.warning('选中物流单收货地区不一致，请重新选择');
                        return false;
                    }
                    if (this.multipleSelection[i].storeArea !== this.multipleSelection[0].storeArea) {
                        this.$xeMessage.warning('选中物流单发货地不一致，请重新选择');
                        return false;
                    }
                    if (this.multipleSelection[i].orderStatus === 1 || this.multipleSelection[i].orderStatus === 2) {
                        this.$xeMessage.warning('选中物流单关联订单已发货，不可派车');
                        return false;
                    }
                    if (this.multipleSelection[i].orderStatus === 4) {
                        this.$xeMessage.warning('选中物流单关联订单已取消，不可派车');
                        return false;
                    }
                };
                let logtsCodeArr = [];
                this.multipleSelection.forEach(item => {
                    logtsCodeArr.push(item.logtsCode);
                });
                this.$confirm('批量派车选中的物流单', '批量派车', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.carLotEdit(logtsCodeArr.join(','));
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            typeFlagSelec(type) {
                if (type === 1) {
                    this.puboderSerData.seacherOrder = '';
                } else {
                    this.puboderSerData.seacherCar = '';
                }
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
            startSendTimeFn(val) {
                this.startSendTimes = val;
                this.value4 = this.value3;
                if (!this.value4) {
                    this.value4 = this.value3;
                }
            },
            endSendTimeFn(val) {
                this.endSendTimes = val;
                if (!this.value3) {
                    this.value3 = this.value4;
                }
            },
            orderStoreSearch(editor) {
                let params = {};
                if (editor) {
                    params.storeStatus = editor;
                }
                this.$http({
                    method: 'post',
                    url: `/xe-route/xe-erp/storeManager/queryStoreNameList`,
                    data: params
                }).then((res) => {
                    this.orderStoreIdList = res.data.actionList;
                    if (editor) {
                        this.orderStoreIdListother = res.data.actionList;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            orderIdSelectclick(index, row) {
                this.selecRow = row;
                if (this.tabCard_val === 'first') {
                    this.OrderInfoDetail(row, 1);
                }
                if (this.tabCard_val === 'second') {
                    this.logisticsDetail(row, 2);
                }
                if (this.tabCard_val === 'third') {
                    this.OrderInfoDetail(row, 3);
                }
                if (this.tabCard_val === 'fourth') {
                    this.logisticsDetail(row, 4);
                }
            },
            onSubmit() {
                this.enquiryForm(1, this.puboderSerData);
            },
            enquiryForm(pageNum, formData) {
                let params = {};
                params = formData;
                params.pageNum = pageNum;
                params.pageSize = this.xePageInfo.pageSize;
                if (this.saleAreaId.length) {
                    if (this.saleAreaId.length > 0 && this.saleAreaId[0]) {
                        params.caProvinceId = this.saleAreaId[0];
                    }
                    if (this.saleAreaId.length > 1 && this.saleAreaId[1]) {
                        params.caCityId = this.saleAreaId[1];
                    }
                    if (this.saleAreaId.length > 2 && this.saleAreaId[2]) {
                        params.caAreaId = this.saleAreaId[2];
                    }
                } else {
                    params.caProvinceId = '';
                    params.caCityId = '';
                    params.caAreaId = '';
                }
                if (this.storageAreaId.length) {
                    if (this.storageAreaId.length > 0 && this.storageAreaId[0]) {
                        params.provinceId = this.storageAreaId[0];
                    }
                    if (this.storageAreaId.length > 1 && this.storageAreaId[1]) {
                        params.cityId = this.storageAreaId[1];
                    }
                    if (this.storageAreaId.length > 2 && this.storageAreaId[2]) {
                        params.areaId = this.storageAreaId[2];
                    }
                } else {
                    params.provinceId = '';
                    params.cityId = '';
                    params.areaId = '';
                }
                this.outerUrl = '/xe-route/xe-erp/logistics/exSendCarList?areaId=' + params.areaId + '&caAreaId=' + params.caAreaId + '&caCityId=' + params.caCityId + '&caProvinceId=' + params.caProvinceId + '&carSendStatus=' + params.carSendStatus + '&cityId=' + params.cityId + '&endCreateDate=' + params.endCreateDate + '&endSendTime=' + params.endSendTime + '&loginAccount=' + params.loginAccount + '&orderStatus=' + params.orderStatus + '&provinceId=' + params.provinceId + '&seacherCar=' + params.seacherCar + '&seacherOrder=' + params.seacherOrder + '&shipType=' + params.shipType + '&startCreateDate=' + params.startCreateDate + '&startSendTime=' + params.startSendTime + '&storeId=' + params.storeId + '&typeFlagCar=' + params.typeFlagCar + '&typeFlagOrder=' + params.typeFlagOrder;
                this.$http({
                    method: 'post',
                    url: `/xe-route/xe-erp/logistics/querySendCarList`,
                    data: params
                }).then((res) => {
                    this.xePageInfo.total = res.data.xePageInfo.total;
                    this.pubTabDatacon = res.data.sendCarList;
                    if (this.xePageInfo.total) {
                        this.OrderInfoDetail(this.pubTabDatacon[0], 3);
                        this.selecRow = this.pubTabDatacon[0];
                        this.tabVisble = true;
                    } else {
                        this.tabVisble = false;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            logisticsDetail(row, types) { // 物流单号详情
                let params = {};
                if (types === 2) {
                    params.ajaxUrl = '/xe-route/xe-erp/logistics/queryCustomerLogisticsDetail';
                } else if (types === 4) {
                    params.ajaxUrl = '/xe-route/xe-erp/logistics/queryRemarkLogisticsDetail';
                };
                params.logtsCode = row.logtsCode;
                this.$http({
                    method: 'post',
                    url: params.ajaxUrl,
                    data: {
                        logtsCode: params.logtsCode
                    }
                }).then((res) => {
                    switch (types) {
                        case 2: {
                            this.buyerInfor = res.data.customerLogisticsDetail;
                            break;
                        }
                        case 4: {
                            this.memoInfor = res.data.remarkLogistics;
                            break;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            OrderInfoDetail(row, types) { // 查询订单详情信息(tab卡商品信息)
                let params = {};
                if (types === 3) { // 物流
                    params.ajaxUrl = '/xe-route/xe-erp/logistics/queryOrderLogisticsDetail';
                } else if (types === 1) { // 商品
                    params.ajaxUrl = '/xe-route/xe-erp/logistics/queryGoodsLogisticsDetail';
                };
                params.orderId = row.orderId;
                this.$http({
                    method: 'post',
                    url: params.ajaxUrl,
                    data: {
                        orderId: params.orderId
                    }
                }).then((res) => {
                    switch (types) {
                        case 3: {
                            this.logisticsInfor = res.data.orderLogisticsDetail;
                            break;
                        }
                        case 1: {
                            this.refundMer = res.data.goodsLogisticsDetail;
                            break;
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            logisticsInforForm() { // 物流信息(tab选项卡)
            },
            refundJouForm() { // 订单日志(tab选项卡)
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.value3 = '';
                this.value3 = '';
                this.enquiryForm(this.xePageInfo.pageNum, this.puboderSerData);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.xePageInfo.pageSize = val;
                this.enquiryForm(this.xePageInfo.pageNum, this.puboderSerData);
            },
            handleCurrentChange(val) {
                this.xePageInfo.pageNum = val;
                this.enquiryForm(this.xePageInfo.pageNum, this.puboderSerData);
            },
            handleClick(tab, event) {
                // this.selecRow = row;
                if (this.tabCard_val === 'first') {
                    this.OrderInfoDetail(this.selecRow, 1);
                }
                if (this.tabCard_val === 'second') {
                    this.logisticsDetail(this.selecRow, 2);
                }
                if (this.tabCard_val === 'third') {
                    this.OrderInfoDetail(this.selecRow, 3);
                }
                if (this.tabCard_val === 'fourth') {
                    this.logisticsDetail(this.selecRow, 4);
                }
                // if (tab.name === 'first') {
                //     this.OrderInfoDetail();
                // } else if (tab.name === 'second') {
                // } else if (tab.name === 'third') {
                //     this.logisticsInforForm();
                // } else if (tab.name === 'fourth') {
                // }
            }
        },
        computed: {
            saleAreaId() {
                return this.puboderSerData.saleAreaIds;
            },
            storageAreaId() {
                return this.puboderSerData.storageAreaIds;
            },
            startCreateDates: {
                get() {
                    return this.puboderSerData.startCreateDate;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.startCreateDate = '';
                    } else {
                        this.puboderSerData.startCreateDate = val;
                    }
                }
            },
            endCreateDates: {
                get() {
                    return this.puboderSerData.endCreateDate;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.endCreateDate = '';
                    } else {
                        this.puboderSerData.endCreateDate = val;
                    }
                }
            },
            startSendTimes: {
                get() {
                    return this.puboderSerData.startSendTime;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.startSendTime = '';
                    } else {
                        this.puboderSerData.startSendTime = val;
                    }
                }
            },
            endSendTimes: {
                get() {
                    return this.puboderSerData.endSendTime;
                },
                set(val) {
                    if (!val) {
                        this.puboderSerData.endSendTime = '';
                    } else {
                        this.puboderSerData.endSendTime = val;
                    }
                }
            },
            typeFlagList() { // 物流单查询列表
                return typeFlag;
            },
            orderStatusList() {
                return orderStatus;
            },
            shipTypeList() {
                return shipType;
            },
            carSendStatusList() {
                return carSendStatus;
            },
            typeFlagList02() { // 物流单查询列表
                return typeFlag02;
            }
        },
        components: {
            areaselectTag,
            categoryTag,
            refundMerchandise,
            buyerInformation,
            logisticsInformation,
            memoInformation
        }
    };
</script>
