<template lang="html">
    <div class="m-router-con">
         <div class="u-top-search">
              <el-form ref="searchform" :model="searchform" :inline="true">
                    <el-form-item prop="type">
                        <el-select size="small" class="xe-input-l40" placeholder="车牌号" v-model="searchform.type">
                            <el-option v-for="item in carTypeList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="typeValue">
                      <el-input placeholder="请输入查询内容" class="xe-input-l40" v-model="searchform.typeValue"></el-input>
                    </el-form-item>
                    <el-form-item prop="areaIds">
                        <areaselectTag placeholder="始发地/目的地" v-model='searchform.areaIds' :width='170' :changeOnSelect="true"></areaselectTag>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                    </el-form-item>
              </el-form>
         </div>
         <div class="goodsTable">
              <el-table highlight-current-row style="width: 100%" border :data="list">
                  <el-table-column
                      label=""
                      class-name="td-index"
                      width="30">
                      <template scope="props">
                          <span>{{props.$index + 1}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="carPlateNum" label="车牌号"  min-width="124">
                  </el-table-column>
                  <el-table-column prop="carLength" label="车辆长度（米）" min-width="172">
                    <template scope="props">
                        {{props.row.carLength | priceToText}}
                    </template>
                  </el-table-column>
                  <el-table-column prop="contactPerson" label="联系人" min-width="90">
                  </el-table-column>
                  <el-table-column prop="mobilePhone" label="手机号" min-width="118">
                  </el-table-column>
                  <el-table-column prop="listLine" label="承运线路" min-width="240">
                        <template scope="props">
                            <div v-for="item in props.row.listLine">
                                {{item.startProvinceName + item.startCityName + item.startAreaName}} - {{item.endProvinceName + item.endCityName + item.endAreaName}} 
                            </div>
                        </template>
                  </el-table-column>
                  <!-- <el-table-column prop="carSource" label="信息来源" min-width="162">
                        <template scope="props">
                            {{props.row.carSource | carSourceToText}}
                        </template>
                  </el-table-column>
                  <el-table-column prop="createDate" label="新增时间" min-width="162">
                        <template scope="props">
                            {{props.row.createDate | millisecondFormat('ms')}}
                        </template>
                  </el-table-column> -->
                  <el-table-column label="操作" min-width="70">
                      <template scope="props">
                    <!-- {{props}} -->
                        <div class="btn-in-table">
                            <a href="javascript:;" v-if="props.row.isVenSelf === 1" class="s-blue" @click="editorCar(props.row, props.$index)">
                                编辑
                            </a>
                        </div>
                      </template>
                  </el-table-column>
              </el-table>
         </div>
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
        <!-- 编辑车辆 -->
        <div class="reset-dialog reset-dialog02">
            <el-dialog title="编辑车辆" :visible.sync="dialogClosesAdd" size="small" @close="dialogClosesAddDio">
                <div class="clearfix supplier-userList">
                    <!-- {{formAddCar}} -->
                    <div class="clearfix">
                        <el-form :inline="true" :model="formAddCar" :rules="rules" ref="formAddCar" class="demo-form-inline" label-width="94px">
                            <div class="clearfix">
                                <el-form-item prop="carPlateNum" label="车牌号">
                                    <el-input style="width: 380px;" disabled :maxlength="7" size="small" v-model="formAddCar.carPlateNum"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item prop="carLength" label="车辆长度(米)">
                                    <el-input style="width: 380px;" @blur="numberFix($event, 2, 1)" :maxlength="5"  size="small" v-model.number="formAddCar.carLength"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item prop="contactPerson" label="联系人">
                                    <el-input :maxlength="10" style="width: 380px;" size="small" v-model="formAddCar.contactPerson"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item prop="mobilePhone" label="手机号" required>
                                    <el-input :maxlength="11" style="width: 380px;" size="small" v-model="formAddCar.mobilePhone"></el-input>
                                </el-form-item>
                            </div>
                            <div class="clearfix">
                                <el-form-item label=" ">
                                    <el-button class="xe-button-normal" type="primary" @click="saveNewCar">保存</el-button>
                                    <el-button class="xe-button-normal" @click="dialogClosesAddDio">取 消</el-button>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    import {carType} from '@/dataControl.js';
    import areaselectTag from '@/components/areaSelect/areaSelect';
    // import { millisecondFormat } from 'utils';
    // let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            // let self = this;
            let checkPhone = (rule, value, callback) => {
                var reg = /^1[3,4,5,7,8]\d{9}$/;
                var res = reg.test(value);
                if (!res) {
                    callback(new Error('请输入正确的手机号码'));
                } else {
                    callback();
                }
            };
            let checkCarLength = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    if (!(value >= 100) && !(value <= 0)) {
                        callback();
                    } else {
                        callback(new Error('请输入正确的车辆长度'));
                    }
                }
            };
            return {
                rules: {
                    carLength: [
                        {validator: checkCarLength, trigger: 'blur'}
                    ],
                    mobilePhone: [
                        {validator: checkPhone, trigger: 'blur'}
                    ]
                },
                formAddCar: {
                    carPlateNum: '',
                    carLength: '',
                    mobilePhone: '',
                    contactPerson: '',
                    carId: '',
                    index: ''
                },
                dialogClosesAdd: false,
                searchform: {
                    type: 1,
                    typeValue: '',
                    areaIds: [],
                    startDate: '',
                    endDate: ''
                },
                // value1: '',
                // value2: '',
                list: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                }
                // pickerOptionStart: {
                //     disabledDate(time) {
                //         return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                //     }
                // },
                // pickerOptionEnd: {
                //     disabledDate(time) {
                //         return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                //     }
                // }
            };
        },
        created() {
            this.enquiryForm(1, this.searchform);
        },
        methods: {
            onSubmit() {
                this.enquiryForm(1, this.searchform);
            },
            editorCar(row, index) {
                console.log('testrow', row);
                this.formAddCar = {
                    carPlateNum: row.carPlateNum,
                    carLength: row.carLength,
                    mobilePhone: row.mobilePhone,
                    contactPerson: row.contactPerson,
                    carId: row.carId,
                    index: index
                };
                this.dialogClosesAdd = true;
            },
            numberFix(event, number, type) {
                let val = 0;
                if (!(event.target.value > 0)) {
                    val = '';
                } else {
                    val = parseFloat(event.target.value).toFixed(number);
                }
                event.target.value = val;
                if (type === 1) { // type是blur是event 钱没加上双向绑定的bug修复
                    this.formAddCar.carLength = val ? parseFloat(val) : '';
                    console.log('test', this.formAddCar.carLength);
                }
            },
            dialogClosesAddDio() {
                this.dialogClosesAdd = false;
                this.formAddCar = {
                    carPlateNum: '',
                    carLength: '',
                    mobilePhone: '',
                    contactPerson: '',
                    carId: '',
                    index: ''
                };
            },
            saveNewCar() {
                this.$refs.formAddCar.validate((valid) => {
                    if (valid) {
                        let param = this.formAddCar;
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-erp/erp/logisticsCar/updateLogisticsCar',
                            data: param
                        }).then((res) => {
                            this.$xeMessage.success(res.msg);
                            this.list[this.formAddCar.index].carLength = this.formAddCar.carLength;
                            this.list[this.formAddCar.index].mobilePhone = this.formAddCar.mobilePhone;
                            this.list[this.formAddCar.index].contactPerson = this.formAddCar.contactPerson;
                            this.dialogClosesAdd = false;
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        return false;
                    }
                });
            },
            // startDateFn(val) {
            //     this.startDates = val;
            //     this.value2 = this.value1;
            //     if (!this.value2) {
            //         this.value2 = this.value1;
            //     }
            // },
            // endDateFn(val) {
            //     this.endDates = val;
            //     if (!this.value1) {
            //         this.value1 = this.value2;
            //     }
            // },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                // this.value1 = '';
                // this.value2 = '';
                this.enquiryForm(1, this.searchform);
            },
            enquiryForm(pageNum, searchform) {
                let data = {};
                data = searchform;
                // if (!this.startDates) {
                //     if (this.value1) {
                //         data.startDate = millisecondFormat(this.value1.getTime(), 'ms');
                //     }
                // }
                // if (!this.endDates) {
                //     if (this.value2) {
                //         data.endDate = millisecondFormat(this.value2.getTime(), 'ms');
                //     }
                // }
                data.provinceId = this.areaId[0];
                data.cityId = this.areaId[1];
                data.areaId = this.areaId[2];
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/erp/logisticsCar/queryLogisticsCarList',
                    data: data
                }).then((res) => {
                    this.list = res.data.list;
                    this.pageInfo.pageNum = res.data.pageInfo.pageNum;
                    this.pageInfo.total = res.data.pageInfo.total;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            }
        },
        computed: {
            carTypeList() {
                return carType;
            },
            areaId() {
                if (this.searchform.areaIds.length > 0) {
                    return this.searchform.areaIds;
                } else {
                    return [];
                }
            }
            // startDates: {
            //     get() {
            //         return this.searchform.startDate;
            //     },
            //     set(val) {
            //         if (!val) {
            //             this.searchform.startDate = '';
            //         } else {
            //             this.searchform.startDate = val;
            //         }
            //     }
            // },
            // endDates: {
            //     get() {
            //         return this.searchform.endDate;
            //     },
            //     set(val) {
            //         if (!val) {
            //             this.searchform.endDate = '';
            //         } else {
            //             this.searchform.endDate = val;
            //         }
            //     }
            // }
        },
        components: {
            areaselectTag
        }
    };
</script>

<style lang="scss">
    .addMember .el-dialog--small{
        max-width:540px;
    }
    .dialog_wid700 .el-dialog--small{
        max-width:700px;
        padding:0 20px 30px;
    }
</style>
