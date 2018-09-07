<template lang="html">
  <div class="m-router-con">
    <div class="u-top-search">
        <el-form ref="searchform" :model="searchform" :inline="true">
              <el-form-item prop="operator">
                <el-input placeholder="操作人" class="xe-input-l40" v-model="searchform.operator"></el-input>
              </el-form-item>
              <el-form-item prop="operatorContent">
                <el-input placeholder="操作内容" class="xe-input-l40" v-model="searchform.operatorContent"></el-input>
              </el-form-item>
              <el-form-item label="" class="marR0">
                  <el-date-picker
                      ref="startTime"
                      v-model="value1"
                      type="datetime"
                      size="small"
                      @change="startTimeFn"
                      :picker-options="pickerOptionStart"
                      placeholder="创建开始时间"
                  >
                  </el-date-picker>
                  <span class="data-bor">-</span>
              </el-form-item>
              <el-form-item>
                  <el-date-picker
                      ref="endTime"
                      v-model="value2"
                      type="datetime"
                      size="small"
                      @change="endTimeFn"
                      :picker-options="pickerOptionEnd"
                      placeholder="创建结束时间"
                  >
                  </el-date-picker>
              </el-form-item>
              <!-- <div class="form_seachBut"> -->
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
              <!-- </div> -->
        </el-form>
     </div>
     <div class="u-opera-btnBox">
          <el-button class="xe-button-normal">
              <span class="iconfont icon-daochu"></span> 导出
          </el-button>
     </div>
     <div class="goodsTable">
          <el-table highlight-current-row style="width: 100%" border :data="operatorLogList">
              <el-table-column type="selection" width="34" class-name="selectionTd">
              </el-table-column>
              <el-table-column label="操作人"  min-width="100" prop="operator">
              </el-table-column>
              <el-table-column label="修改内容" min-width="140" prop="operatorContent">
              </el-table-column>
              <el-table-column label="登录时间" min-width="140" prop="operatorTime">
                <template scope="props">
                    {{props.row.operatorTime | millisecondFormat('ms')}}
                </template>
              </el-table-column>
              <el-table-column label="登录IP" min-width="140" prop="ipAddress">
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
  </div>
</template>

<script>

import { millisecondFormat } from 'utils';
let maxDate = 90 * 24 * 60 * 60 * 1000;
export default {
    data() {
        let self = this;
        return {
            searchform: {
                operatorContent: '',
                logType: '',
                operator: '',
                startTime: '',
                endTime: ''
            },
            operatorLogList: [],
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
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
            }
        };
    },
    computed: {
        startTimes: {
            get() {
                return this.searchform.startTime;
            },
            set(val) {
                if (!val) {
                    this.searchform.startTime = '';
                } else {
                    this.searchform.startTime = val;
                }
            }
        },
        endTimes: {
            get() {
                return this.searchform.endTime;
            },
            set(val) {
                if (!val) {
                    this.searchform.endTime = '';
                } else {
                    this.searchform.endTime = val;
                }
            }
        }
    },
    created() {
        console.log('test');
        let logType = {
            proCenterLogList: 'erpPro', // 商品中心
            storeCenterLogList: 'erpShop', // 店铺中心
            freightLogList: 'erpLogi', // 物流中心
            salesCenterLogList: 'erpSale' // 促销中心
        };
        this.searchform.logType = logType[this.$route.name];
        this.enquiryForm(1, this.searchform);
    },
    methods: {
        onSubmit() {
            this.enquiryForm(1, this.searchform);
        },
        startTimeFn(val) {
            this.startTimes = val;
            this.value2 = this.value1;
            if (!this.value2) {
                this.value2 = this.value1;
            }
        },
        endTimeFn(val) {
            this.endTimes = val;
            if (!this.value1) {
                this.value1 = this.value2;
            }
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
            if (!this.startTimes) {
                if (this.value1) {
                    data.startTime = millisecondFormat(this.value1.getTime());
                }
            }
            if (!this.endTimes) {
                if (this.value2) {
                    data.endTime = millisecondFormat(this.value2.getTime());
                }
            }
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            console.log('testdata', data);
            this.$http({ // 查询历史记录
                method: 'post',
                url: '/xe-route/xe-pro/product/operatorLog/queryOperatorLog',
                data: data
            }).then((res) => {
                this.operatorLogList = res.data.operatorLogList;
                this.pageInfo.total = res.data.pageInfo.total;
                this.pageInfo.pageNum = res.data.pageInfo.pageNum;
                // this.picServer = res.data.picServer;
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
    }
};
</script>

<style lang="scss">
</style>
