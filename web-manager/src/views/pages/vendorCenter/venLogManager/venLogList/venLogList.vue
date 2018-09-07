<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" :model="searchform" :inline=true>
                    <el-form-item prop="operator">
                        <el-input placeholder="操作人" v-model="searchform.operator"></el-input>
                    </el-form-item>
                     <el-form-item prop="operatorContent">
                        <el-input placeholder="操作内容" v-model="searchform.operatorContent"></el-input>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button type="primary" @click="enquiryData">查询</el-button>
                        <el-button @click="resetForm('searchform')">重置</el-button>
                        <el-button  @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                    </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div>
                            <el-form-item label="操作时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-l68"
                                    type="datetime"
                                    placeholder="开始日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-l68"
                                    type="datetime"
                                    placeholder="结束日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                             <el-form-item prop="operator" label="操作人">
                                <el-input placeholder="操作人" class="xe-input-168"  v-model="searchform.operator"></el-input>
                            </el-form-item>
                             <el-form-item prop="operatorContent" label="操作内容">
                                <el-input placeholder="操作内容" class="xe-input-168" v-model="searchform.operatorContent"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button type="primary" @click="enquiryData">查询</el-button>
                        <el-button  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <!--<div class="u-opera-btnBox">-->
                <!--<el-button @click=""><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        <!--</div>-->
        <el-table ref="tableDatas" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
            <el-table-column prop="operatorContent" label="操作内容">
            </el-table-column>
            <el-table-column prop="operatorTime" label="操作时间">
                <template scope="scope">
                    <div v-if="scope.row.operatorTime">
                        {{scope.row.operatorTime | millisecondFormat('ms')}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="ipAddress" label="IP">
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
    import { millisecondFormat } from 'utils';
    export default {
        data() {
            return {
                tableDatas: [],
                searchform: {
                    logType: 'manVen',
                    operator: '',
                    operatorContent: ''
                },
                value1: '',
                value2: '',
                selectRow: '',
                selectedArray: '',
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                productUrl: '/xe-route/xe-mis'
//                productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            handleSelectionChange(val) {
                this.selectedArray = val;
            },
            enquiryData() {
                this.pagelist.pageNum = 1;
                this.pagelist.pageSize = 10;
                this.enquiryForm();
            },
            enquiryForm() {
                let params = {};
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                if (this.value1) {
                    params.startTime = millisecondFormat(this.value1.getTime(), 'ms');
                } else {
                    params.startTime = '';
                }
                if (this.value2) {
                    params.endTime = millisecondFormat(this.value2.getTime(), 'ms');
                } else {
                    params.endTime = '';
                }
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/operatorLog/queryOperatorLog`,
                    data: params
                }).then((res) => {
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.operatorLogList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
            }
        }
    };
</script>
