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
                        <areaselectTag placeholder="始发地/目的地" v-model='searchform.areaIds' :width='140' :changeOnSelect="true"></areaselectTag>
                    </el-form-item>
                    <!--<el-form-item prop="carSource">-->
                        <!--<el-select size="small" class="xe-input-l40" placeholder="信息来源" v-model="searchform.carSource">-->
                            <!--<el-option v-for="item in carSourceList"-->
                                <!--:key="item.name"-->
                                <!--:label="item.name"-->
                                <!--:value="item.value">-->
                            <!--</el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                      <el-form-item class="z-marL20">
                          <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                          <el-button @click="resetForm('searchform')">重置</el-button>
                          <el-button class="xe-button-normal" @click.stop="searchFormbut = true">
                             高级搜索
                          </el-button>
                      </el-form-item>
              </el-form>
              <!--高级搜索样式start-->
         </div>
        <div class="advancedSearch" @click.stop>
            <div class="serch-head clearfix">
                <span class="title fl">高级搜索</span>
                <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
            </div>
            <div class="serch-content">
                <el-form ref="searchform" :model="searchform" :inline="true" labelWidth="65px">
                    <div class="clearfix">
                        <el-form-item prop="type" label="筛选项">
                            <el-select size="small" style="width: 110px"  placeholder="车牌号" v-model="searchform.type">
                                <el-option v-for="item in carTypeList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="typeValue">
                          <el-input placeholder="请输入查询内容" style="width: 232px;" v-model="searchform.typeValue"></el-input>
                        </el-form-item>
                    </div>
                    <div class="clearfix">
                        <el-form-item label="新增时间" class="marR0">
                            <el-date-picker
                                ref="startDate"
                                v-model="value1"
                                type="datetime"
                                size="small"
                                class="xe-input-168"
                                @change="startDateFn"
                                :picker-options="pickerOptionStart"
                                placeholder="创建开始时间"
                            >
                            </el-date-picker>
                            <span class="data-bor">-</span>
                        </el-form-item>
                        <el-form-item>
                            <el-date-picker
                                ref="endDate"
                                v-model="value2"
                                type="datetime"
                                size="small"
                                class="xe-input-168"
                                @change="endDateFn"
                                :picker-options="pickerOptionEnd"
                                placeholder="创建结束时间"
                            >
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class="clearfix">
                        <el-form-item prop="areaIds" label="承运线路">
                            <areaselectTag placeholder="始发地/目的地" v-model='searchform.areaIds' :width='168' :changeOnSelect="true"></areaselectTag>
                        </el-form-item>
                        <el-form-item prop="carSource" label="信息来源">
                            <el-select size="small" class="xe-input-l68" placeholder="信息来源" v-model="searchform.carSource">
                                <el-option v-for="item in carSourceList"
                                    :key="item.name"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="clearfix">
                          <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                          <el-button @click="resetForm('searchform')">重置</el-button>
                    </div>
                </el-form>
            </div>
        </div>
         <div class="u-opera-btnBox">
              <el-button class="xe-button-normal" @click="addItem">
                  <span class="iconfont icon-xinzeng"></span> 新增
              </el-button>
         </div>
         <div class="goodsTable">
              <el-table highlight-current-row style="width: 100%" border :data="venCarList">
                  <el-table-column
                      label=""
                      fixed="left"
                      class-name="td-index"
                      width="30">
                      <template scope="props">
                          <span>{{props.$index + 1}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column prop="carPlateNum" label="车牌号"  min-width="124">
                  </el-table-column>
                  <el-table-column prop="carLength" label="车辆长度（米）" min-width="172">
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
                            <!-- {{props.row.lockStatus | lockStatusToText}} -->
                        </template>
                  </el-table-column>
                  <el-table-column prop="carSource" label="信息来源" min-width="162">
                        <template scope="props">
                            {{props.row.carSource | carSourceToText}}
                        </template>
                  </el-table-column>
                  <el-table-column prop="modifyDate" label="新增时间" min-width="162">
                        <template scope="props">
                            {{props.row.modifyDate | millisecondFormat('ms')}}
                        </template>
                  </el-table-column>
                  <el-table-column label="操作" fixed="right" min-width="170">
                      <template scope="props">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="getDetails(props.row)">
                                查看
                            </a>
                            <a href="javascript:;" class="s-blue" @click="editItem(props.row)">
                                编辑
                            </a>
                            <a href="javascript:;" class="s-blue" @click="deletItem(props.row)">
                                删除
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
                :current-page="xePageInfoDto.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="xePageInfoDto.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="xePageInfoDto.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {carType, carSource} from '@/dataControl.js';
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            return {
                searchform: {
                    carSource: '',
                    type: 1,
                    typeValue: '',
                    // loginName: '',
                    // userName: '',
                    areaIds: [],
                    startDate: '',
                    endDate: ''
                },
                value1: '',
                value2: '',
                venCarList: [],
                xePageInfoDto: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                pickerOptionStart: {
                    disabledDate(time) {
                        return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                    }
                },
                pickerOptionEnd: {
                    disabledDate(time) {
                        return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                    }
                }
            };
        },
        created() {
            this.enquiryForm(1, this.searchform);
        },
        methods: {
            onSubmit() {
                this.enquiryForm(1, this.searchform);
            },
            startDateFn(val) {
                this.startDates = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            endDateFn(val) {
                this.endDates = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            addItem() {
                this.$router.push({name: 'addCar'});
            },
            editItem(row) {
                this.$router.push({name: 'editCar', query: {carId: row.carId}});
            },
            getDetails(row) {
                this.$router.push({name: 'detailsCar', query: {carId: row.carId}});
            },
            deletItem(row) {
                this.$confirm('确认删除该条车辆信息？', '删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let param = {};
                    let _this = this;
                    param.carId = row.carId;
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-mis/manager/logisticsCar/delLogisticsCar',
                        data: param
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.enquiryForm(_this.xePageInfoDto.pageNum, _this.searchform);
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.enquiryForm(1, this.searchform);
            },
            enquiryForm(pageNum, searchform) {
                let data = {};
                data = searchform;
                if (!this.startDates) {
                    if (this.value1) {
                        data.startDate = millisecondFormat(this.value1.getTime(), 'ms');
                    }
                }
                if (!this.endDates) {
                    if (this.value2) {
                        data.endDate = millisecondFormat(this.value2.getTime(), 'ms');
                    }
                }
                data.provinceId = this.areaId[0];
                data.cityId = this.areaId[1];
                data.areaId = this.areaId[2];
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfoDto.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/logisticsCar/queryLogisticsCarList',
                    data: data
                }).then((res) => {
                    this.venCarList = res.data.responseDto.venCarList;
                    this.xePageInfoDto = res.data.responseDto.xePageInfoDto;
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.xePageInfoDto.pageSize = val;
                this.enquiryForm(this.xePageInfoDto.pageNum, this.searchform);
            },
            handleCurrentChange(val) {
                this.xePageInfoDto.pageNum = val;
                this.enquiryForm(this.xePageInfoDto.pageNum, this.searchform);
            }
        },
        computed: {
            carTypeList() {
                return carType;
            },
            carSourceList() {
                return carSource;
            },
            areaId() {
                if (this.searchform.areaIds.length > 0) {
                    return this.searchform.areaIds;
                } else {
                    return [];
                }
            },
            startDates: {
                get() {
                    return this.searchform.startDate;
                },
                set(val) {
                    if (!val) {
                        this.searchform.startDate = '';
                    } else {
                        this.searchform.startDate = val;
                    }
                }
            },
            endDates: {
                get() {
                    return this.searchform.endDate;
                },
                set(val) {
                    if (!val) {
                        this.searchform.endDate = '';
                    } else {
                        this.searchform.endDate = val;
                    }
                }
            }
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
