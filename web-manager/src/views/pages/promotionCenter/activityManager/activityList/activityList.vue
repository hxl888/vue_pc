<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" :model="searchform" :inline=true>
                    <el-form-item prop="pageName">
                        <el-input placeholder="请输入页面编码/页面名称" v-model="searchform.pageName"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="pagePlat">
                            <el-select v-model="searchform.pagePlat" placeholder="展示终端">
                                <el-option
                                    v-for="(item, index) in pagePlatlist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="xe-button-normal" type="primary" @click="enquiryForm">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                    </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="addnewtemplate"><i class="iconfont icon-xinzeng"></i> 添加页面</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableDatas" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  min-width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <!--<el-table-column type="selection" width="50"></el-table-column>-->
            <el-table-column prop="pageCode" label="页面编码" min-width="150"></el-table-column>
            <el-table-column prop="pageName" label="页面名称" min-width="160">
            </el-table-column>
            <el-table-column prop="pageUrl" min-width="150" label="页面路径"></el-table-column>
            <el-table-column prop="pagePlat" width="100" label="展示终端">
                <template scope="scope">
                    <div>
                        {{scope.row.pagePlat | pagePlatfilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="venCreateDate" width="190" label="操作" fixed="right">
                <template scope="scope">
                    <div class="btn-in-table">
                        <a href="javascript:;" class="s-blue" @click="previewPageHtml(scope.row)">预览</a>
                        <a href="javascript:;" class="s-blue" @click="editor(scope.row)">编辑</a>
                        <a href="javascript:;" class="s-blue" @click="releasePageHtml(scope.row)">发布</a>
                        <a href="javascript:;" class="s-blue" @click="deleteFn(scope.row)">删除</a>
                    </div>
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
    import {pagePlat} from '@/dataControl';
    export default {
        data() {
            return {
                tableDatas: [],
                searchform: {
                    pageName: '',
                    pagePlat: ''
                },
                selecArray: null,
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
            editor(row) {
                this.$router.push({name: 'activityList_editor', query: {pageCode: row.pageCode}});
            },
            addnewtemplate() {
                this.$router.push({name: 'activityList_addnew'});
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.enquiryForm();
            },
            handleSelectionChange() {},
            enquiryForm() {
                let params = {};
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/sysCmsPage/queryPageList`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.list;
                }).catch((error) => {
                    console.log(error);
                });
            },
            deleteFn(row) {
                this.$confirm(`确定要删除${row.pageName}么？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deletePage(row);
                }).catch(() => {
                });
            },
            deletePage(row) { // 删除页面
                let params = {};
                let _this = this;
                params.pageCode = row.pageCode;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/sysCmsPage/deletePage`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    window.$wxeMessage({
                        type: 'success',
                        message: `删除成功!`
                    });
                    setTimeout(function() {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            releasePageHtml(row) { // 发布页面
                let params = {};
                params.pageCode = row.pageCode;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/sysCmsPage/releasePageHtml`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    window.open(res.data.url);
                }).catch((error) => {
                    console.log(error);
                });
            },
            previewPageHtml(row) { // 预览页面
                let params = {};
                params.pageCode = row.pageCode;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/sysCmsPage/previewPageHtml`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    window.open(res.data.url);
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageNum = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.currPage = val;
                    this.enquiryForm();
                }
            }
        },
        computed: {
            pagePlatlist() {
                return pagePlat;
            }
        }
    };
</script>
