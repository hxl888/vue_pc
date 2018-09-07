<template lang="html">
  <div class="m-router-con">
    <div class="u-top-search">
        <el-form ref="searchform" :model="searchform" :inline="true">
              <el-form-item prop="loginName">
                <el-input placeholder="用户名" class="xe-input-l40" v-model="searchform.loginName"></el-input>
              </el-form-item>
              <el-form-item prop="userId">
                <el-input placeholder="用户id" class="xe-input-l40" v-model="searchform.userId"></el-input>
              </el-form-item>
              <el-form-item label="" class="marR0">
                  <el-date-picker
                      ref="startDate"
                      v-model="value1"
                      type="datetime"
                      size="small"
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
                      @change="endDateFn"
                      :picker-options="pickerOptionEnd"
                      placeholder="创建结束时间"
                  >
                  </el-date-picker>
              </el-form-item>
              <div class="form_seachBut">
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
              </div>
        </el-form>
     </div>
     <!--<div class="u-opera-btnBox">-->
          <!--<el-button class="xe-button-normal">-->
              <!--<span class="iconfont icon-daochu"></span> 导出-->
          <!--</el-button>-->
     <!--</div>-->
     <div class="goodsTable">
          <el-table highlight-current-row style="width: 100%" border :data="logList">
              <el-table-column type="selection" width="34" class-name="selectionTd">
              </el-table-column>
              <el-table-column label="用户ID"  min-width="100" prop="userId">
              </el-table-column>
              <el-table-column label="用户名" min-width="140" prop="loginName">
              </el-table-column>
              <el-table-column label="登录时间" min-width="140" prop="loginDate">
              </el-table-column>
              <el-table-column label="登录IP" min-width="140" prop="loginIp">
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
                loginName: '',
                userId: '',
                startDate: '',
                endDate: ''
            },
            logList: [],
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
                    data.startDate = millisecondFormat(this.value1.getTime());
                }
            }
            if (!this.endDates) {
                if (this.value2) {
                    data.endDate = millisecondFormat(this.value2.getTime());
                }
            }
            data.pageNum = pageNum;
            data.pageSize = this.pageInfo.pageSize;
            this.$http({ // 查询用户登录历史记录
                method: 'post',
                url: '/xe-route/xe-rms/user/sys/queryUserLoginLogList',
                data: data
            }).then((res) => {
                this.logList = res.data.logList;
                this.pageInfo = res.data.pageInfo;
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
