<template lang="html">
  <div class="m-router-con">
	  <div class="u-top-search">
    	  <el-form ref="searchform" :model="searchform" :inline="true">
    	        <el-form-item prop="smsNumber">
                    <el-input size="small" v-model="searchform.smsNumber" placeholder="请输入模板编码" class="xe-input-l40"></el-input>
    	        </el-form-item>
    	        <el-form-item prop="smsTitleOrContent">
                     <el-input size="small" v-model="searchform.smsTitleOrContent" placeholder="请输入模板标题/内容" class="xe-input-l40"></el-input>
    	        </el-form-item>
    	        <el-form-item prop="smsSendObj">
                    <el-select size="small" class="xe-input-l40" v-model="searchform.smsSendObj" placeholder="适用对象">
                        <el-option
                          v-for="item in smsSendObjlist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="smsStatus">
                    <el-select size="small" class="xe-input-l40" v-model="searchform.smsStatus" placeholder="使用状态">
                        <el-option
                          v-for="item in smsStatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
    	        <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="queryTabel">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
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
                        <div>
                            <el-form-item prop="startDateStr" label="新增时间" class='marR0'>
                                <el-date-picker
                                    size="small"
                                    v-model="searchform.startDateStr"
                                    class="xe-input-168"
                                    type="datetime"
                                    @change="startDateStrFn"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDateStr">
                                <el-date-picker
                                    size="small"
                                    v-model="searchform.endDateStr"
                                    class="xe-input-168"
                                    type="datetime"
                                    @change="endDateStrFn"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="smsNumber" label="模板编码">
                                <el-input size="small" class="xe-input-168" v-model="searchform.smsNumber" placeholder="请输入模板编码"></el-input>
                            </el-form-item>
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
                        </div>
                        <div>
                            <el-form-item prop="smsTitleOrContent" label="标题/内容">
                                <el-input size="small" v-model="searchform.smsTitleOrContent" class="xe-input-168" placeholder="请输入模板标题/内容"></el-input>
                            </el-form-item>
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
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabel">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
    </div>
    <div class="u-opera-btnBox">
        <el-button class="xe-button-normal" @click="addnewBtn()"><i class="iconfont icon-xinzeng"></i> 新增模板</el-button>
    </div>
    <el-table ref="tableDatas" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" >
        <el-table-column label="编号" type="index" width="62"></el-table-column>
        <el-table-column prop="smsNumber" label="模板编号" min-width="140"></el-table-column>
        <el-table-column prop="smsTitle" label="模板标题" min-width="120"></el-table-column>
        <el-table-column prop="smsContent" label="模板内容" min-width="200"></el-table-column>
        <el-table-column prop="" label="适用对象" min-width="120">
            <template scope="scope">
                {{scope.row.smsSendObj | smsSendObjfilter}}
            </template>
        </el-table-column>
        <el-table-column prop="" label="发送数量限制" min-width="120">
            <template scope="scope">
                <div v-if="scope.row.numType === 1">{{scope.row.numType | numTypefilter}}</div>
                <div v-if="scope.row.numType === 2">每个手机号每天最多{{scope.row.maxNum}}条</div>
            </template>
        </el-table-column>
        <el-table-column prop="" label="新增时间" min-width="150">
            <template scope="scope">
                {{scope.row.createDate, 'ms' | millisecondFormat}}
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
            <a v-if="props.row.smsStatus === 2" href="javascript:;" class="s-blue" @click="editorVar(props.row)">编辑</a>
            <a v-if="props.row.smsStatus === 1" href="javascript:;" class="s-blue" @click="varDisabled(props.row, 2)">禁用</a>
            <a v-if="props.row.smsStatus === 2" href="javascript:;" class="s-blue" @click="varDisabled(props.row, 1)">启用</a>
            <a v-if="props.row.smsStatus === 2" href="javascript:;" class="s-blue" @click="deleteVar(props.row)">删除</a>
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
import {smsSendObj, smsStatus} from '@/dataControl.js';
export default {
    data() {
        return {
            tableDatas: [],
            searchform: {
                smsNumber: '',
                smsTitleOrContent: '',
                smsSendObj: '',
                smsStatus: '',
                startDateStr: '',
                endDateStr: ''
            },
            startDateStrs: '',
            endDateStrs: '',
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        editorVar(row) {
            this.$router.push({name: 'editormTemplateList', query: {smsNumber: row.smsNumber}});
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
        startDateStrFn(val) {
            this.startDateStrs = val;
        },
        endDateStrFn(val) {
            console.log(val);
            this.endDateStrs = val;
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
            this.$router.push({name: 'addnewsmsTemplateList'});
        },
        enquiryForm() {
            let params = {};
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            params.startDateStr = this.startDateStrs;
            params.endDateStr = this.endDateStrs;
            console.log(params);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/smsTemplet/queryTempList',
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.templetList;
            }).catch((error) => {
                console.log(error);
            });
        },
        confimrFun(title, sucesfun, errorfun) {
            this.$confirm(`${title}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sucesfun && sucesfun();
            }).catch(() => {
                errorfun && errorfun();
            });
        },
        varDisabled(row, status) {
            var str = '';
            if (status === 1) {
                str = '确定要对选中的模板进行启用';
            } else {
                str = '确定要对选中的模板进行禁用';
            }
            this.confimrFun(str, () => {
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
            }, () => {
                console.log('取消点击');
            });
        },
        deleteVar(row) {
            this.confimrFun(`确定要删除这条模板？`, () => {
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
            }, () => {
                console.log('取消点击');
            });
        }
    },
    computed: {
        smsSendObjlist() {
            return smsSendObj;
        },
        smsStatuslist() {
            return smsStatus;
        }
    }
};
</script>

<style lang="scss">
</style>
