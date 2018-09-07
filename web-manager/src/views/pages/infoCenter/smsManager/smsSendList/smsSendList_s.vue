<template lang="html">
    <div class="m-router-con">
         <div class="u-top-search">
            <el-form ref="searchform" :model="searchform" :inline="true">
                <el-form-item prop="smsTitleOrContent">
                    <el-input placeholder="短信标题/内容" class="xe-input-l40" v-model="searchform.smsTitleOrContent"></el-input>
                </el-form-item>
                <el-form-item prop="sendMobile">
                    <el-input placeholder="手机号" class="xe-input-l40" v-model="searchform.sendMobile"></el-input>
                </el-form-item>
                <el-form-item prop="smsSendStatus">
                    <el-select class="xe-input-l40" v-model="searchform.smsSendStatus" placeholder="发放状态">
                        <el-option
                        v-for="(item, index) in smsSendStatuslist"
                        :key="index"
                        :label="item.name"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="enquiryForm">查询</el-button>
                    <el-button @click="resetForm('searchform')">重置</el-button>
                    <el-button @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
                <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" labelWidth="73px" :model="searchform" ref="searchform" class="demo-form-inline">
                        <div class="clearfix">
                            <el-form-item label="发送时间" prop="startDateStr" class="marR0">
                                <el-date-picker
                                    v-model="searchform.startDateStr"
                                    class="xe-input-168"
                                    type="datetime"
                                    @change="startDateStrFn"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDateStr">
                                <el-date-picker
                                    v-model="searchform.endDateStr"
                                    class="xe-input-168"
                                    type="datetime"
                                    @change="endDateStrFn"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="标题/内容" prop="smsTitleOrContent">
                                <el-input placeholder="短信标题/内容" class="xe-input-168" v-model="searchform.smsTitleOrContent"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号码" prop="sendMobile">
                                <el-input placeholder="手机号" class="xe-input-168" v-model="searchform.sendMobile"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item label="发送状态" prop="smsSendStatus">
                                <el-select class="xe-input-168" v-model="searchform.smsSendStatus" placeholder="发送状态">
                                    <el-option
                                    v-for="(item, index) in smsSendStatuslist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item>
                                <el-button type="primary" @click="enquiryForm">查询</el-button>
                                <el-button  @click="resetForm('searchform')">重置</el-button>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <el-table ref="tableDatas" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" >
            <el-table-column prop="recordId" label="编号" min-width="30"></el-table-column>
            <el-table-column prop="sendMobile" label="手机号" min-width="30"></el-table-column>
            <el-table-column prop="smsTitle" label="短信标题" min-width="30"></el-table-column>
            <el-table-column prop="smsContent" label="短信内容" min-width="30"></el-table-column>
            <el-table-column prop="createDate" label="发送时间" min-width="30">
                <template scope="scope">
                    {{scope.row.createDate, 'ms' | millisecondFormat}}
                </template>
            </el-table-column>
            <el-table-column prop="smsSendStatus" label="发送状态" min-width="30">
                <template scope="scope">
                    <div>{{scope.row.smsSendStatus | smsSendStatusfilter}}</div>
                </template>
            </el-table-column>
        </el-table>
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
    </div>
</template>

<script>
import {smsSendStatus} from '@/dataControl.js';
export default {
    data() {
        return {
            tableDatas: [],
            searchform: {
                sendMobile: '',
                smsSendStatus: '',
                smsTitleOrContent: '',
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
        startDateStrFn(val) {
            this.startDateStrs = val;
        },
        endDateStrFn(val) {
            console.log(val);
            this.endDateStrs = val;
        },
        querylist() {
            this.enquiryForm();
        },
        resetForm(formName) {
            let _this = this;
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.enquiryForm();
            }, 10);
        },
        enquiryForm() {
            let params = {};
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            params.startDateStr = this.startDateStrs;
            params.endDateStr = this.endDateStrs;
            this.$http({
                method: 'post',
                url: `/xe-route/xe-mis/manager/smsSendRecord/queryRecordList`,
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.recordList;
            }).catch((error) => {
                console.log(error);
            });
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
        handleSelectionChange(val) {
            this.selectedArray = val;
        }
    },
    computed: {
        smsSendStatuslist() {
            return smsSendStatus;
        }
    }
};
</script>

<style lang="scss">
</style>
