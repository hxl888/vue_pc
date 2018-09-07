<template lang="html">
  <div class="m-router-con">
      <div class="u-top-search">
          <el-form ref="searchform" :model="searchform" :inline="true">
                <el-form-item prop="searchType">
                    <el-select size="small" @change="searchTypeSelec" style="width: 85px" v-model="searchform.searchType" placeholder="请选择">
                        <el-option
                            v-for="item in smsTemSelecList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="keyWords">
                    <el-input size="small" :placeholder="placeholder" v-model="searchform.keyWords" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="smsSendObj">
                    <el-select size="small" v-model="searchform.smsSendObj" placeholder="适用对象">
                        <el-option
                          v-for="item in smsSendObjlist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!--<el-form-item prop="smsStatus">-->
                    <!--<el-select size="small" class="xe-input-l40" v-model="searchform.smsStatus" placeholder="使用状态">-->
                        <!--<el-option-->
                          <!--v-for="item in smsStatuslist"-->
                          <!--:key="item.value"-->
                          <!--:label="item.name"-->
                          <!--:value="item.value">-->
                        <!--</el-option>-->
                    <!--</el-select>-->
                <!--</el-form-item>-->
                <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="queryTabel">查询</el-button>
                    <el-button @click="resetForm('searchform')">重置</el-button>
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
                    <el-form :inline="true" :model="searchform" ref="searchform" class="demo-form-inline" label-width="73px">
                        <div class="clearfix">
                            <el-form-item prop="searchType" label="查询项">
                                <el-select size="small" @change="searchTypeSelec" style="width: 110px" v-model="searchform.searchType" placeholder="请选择">
                                    <el-option
                                        v-for="item in smsTemSelecList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="keyWords">
                                <el-input size="small" style="width: 229px" :placeholder="placeholder" v-model="searchform.keyWords" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="startDateStr" label="创建时间" class='marR0'>
                                <el-date-picker
                                    size="small"
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="datetime"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDateStr">
                                <el-date-picker
                                    size="small"
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="datetime"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="适用对象" prop="smsSendObj">
                                <el-select size="small" v-model="searchform.smsSendObj" class="xe-input-168" placeholder="适用对象">
                                    <el-option
                                        v-for="item in smsSendObjlist"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="smsStatus" label="发送类型">
                                <el-select size="small" v-model="searchform.smsStatus" class="xe-input-168" placeholder="发送类型">
                                    <el-option
                                        v-for="item in smsStatuslist"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="smsStatus" label="使用状态">
                                <el-select size="small" v-model="searchform.smsStatus" class="xe-input-168" placeholder="使用状态">
                                    <el-option
                                        v-for="item in smsStatuslist"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item>
                                <el-button class="xe-button-normal" type="primary" @click="queryTabel">查询</el-button>
                                <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        <!--高级搜索样式end-->
    </div>
    <div class="u-opera-btnBox">
        <el-button @click="addnewBtn()"><i class="iconfont icon-xinzeng"></i> 新增模板</el-button>
    </div>
    <el-table ref="tableDatas" :data="tableDatas" border style="width: 100%" >
        <el-table-column prop="smsNumber" label="模板编号" min-width="160"></el-table-column>
        <el-table-column prop="smsTitle" label="模板标题" min-width="120"></el-table-column>
        <el-table-column prop="smsContent" label="模板内容" min-width="200"></el-table-column>
        <el-table-column prop="" label="适用对象" min-width="120">
            <template scope="scope">
                {{scope.row.smsSendObj | smsSendObjfilter}}
            </template>
        </el-table-column>
        <el-table-column prop="" label="发送类型" min-width="120">
            <template scope="scope">
                <div v-if="scope.row.numType === 1">{{scope.row.numType | numTypefilter}}</div>
                <div v-if="scope.row.numType === 2">每个手机号每天最多{{scope.row.maxNum}}条</div>
            </template>
        </el-table-column>
        <el-table-column prop="" label="是否跳转" min-width="150">
            <template scope="scope">
                {{scope.row.createDate, 'ms' | millisecondFormat}}
            </template>
        </el-table-column>
        <el-table-column prop="" label="适用类型" min-width="90">
            <template scope="scope">
                {{scope.row.smsStatus | smsStatusfilter}}
            </template>
        </el-table-column>
        <el-table-column prop="" label="创建时间" min-width="90">
            <template scope="scope">
                {{scope.row.smsStatus | smsStatusfilter}}
            </template>
        </el-table-column>
        <el-table-column prop="" label="使用状态" min-width="90">
            <template scope="scope">
                {{scope.row.smsStatus | smsStatusfilter}}
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150" fixed="right">
        <template scope="props">
          <div class="btn-in-table">
            <a href="javascript:;" class="s-blue" @click="editorVar(props.row)">编辑</a>
            <a v-if="props.row.smsStatus === 1" href="javascript:;" class="s-blue" @click="varDisabled(props.row, 2)">禁用</a>
            <a v-if="props.row.smsStatus === 2" href="javascript:;" class="s-blue" @click="varDisabled(props.row, 1)">启用</a>
            <a href="javascript:;" class="s-blue" @click="deleteVar(props.row)">删除</a>
          </div>
        </template>
        </el-table-column>
    </el-table>
    <div class="xe-pagination-panel">
      <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
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
import {smsSendObj, smsStatus, smsTemSelec} from '@/dataControl.js';
import { millisecondFormat } from 'utils';
export default {
    data() {
        return {
            tableDatas: [],
            searchform: {
                smsTitleOrContent: '',
                smsSendObj: '',
                smsStatus: '',
                searchType: '',
                startDateStr: '',
                endDateStr: ''
            },
            placeholder: '请输入',
            value1: '',
            value2: '',
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        searchTypeSelec() {
            this.searchform.keyWords = '';
        },
        editorVar(row) {
            this.$router.push({name: 'msgTemplateList_editro', query: {smsNumber: row.smsNumber}});
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
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.enquiryForm();
        },
        queryTabel() {
            // 查询
            this.enquiryForm();
        },
        addnewBtn() {
            this.$router.push({name: 'msgTemplateList_addnew'});
        },
        enquiryForm() {
            let params = {};
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.startDateStr = millisecondFormat(this.value1.getTime(), 'ms');
            } else {
                params.startDateStr = '';
            }
            if (this.value2) {
                params.endDateStr = millisecondFormat(this.value2.getTime(), 'ms');
            } else {
                params.endDateStr = '';
            }
            console.log(params);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/smsTemplet/queryTempList',
                data: params
            }).then((res) => {
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.templetList;
            }).catch((error) => {
                console.log(error);
            });
        },
        varDisabled(row, status) {
            let params = {};
            params.smsNumber = row.smsNumber;
            params.smsStatus = status;
            console.log(params);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/smsTemplet/updateSmsStatus',
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                row.smsStatus = status;
                if (status === 1) {
                    window.$wxeMessage({
                        type: 'success',
                        message: `启用成功`
                    });
                } else {
                    window.$wxeMessage({
                        type: 'success',
                        message: `禁用成功`
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        deleteVar(row) {
            var _this = this;
            let params = {};
            params.smsNumber = row.smsNumber;
            console.log(params);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/smsTemplet/updateTempDel',
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                window.$wxeMessage({
                    type: 'success',
                    message: `已删除`
                });
                setTimeout(function () {
                    _this.enquiryForm();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    watch: {
        'searchform.searchType'(n) {
            if (n === 1) {
                this.placeholder = '请输入标题';
            } else if (n === 2) {
                this.placeholder = '请输入内容';
            }
        }
    },
    computed: {
        smsSendObjlist() {
            return smsSendObj;
        },
        smsStatuslist() {
            return smsStatus;
        },
        smsTemSelecList() {
            return smsTemSelec;
        }
    }
};
</script>

<style lang="scss">
</style>
