<style rel="stylesheet/scss" lang="scss">

    .xe-page-content {

        padding: 8px 16px 24px;
    }

    .xe-page-content .xe-addbtn-panel {

        padding-bottom: 15px;
    }
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }

    .title{
        line-height: 26px;
        font-size: 14px !important;;
    }

    .content{
        line-height: 26px;
    }
</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>更新记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                筛选条件
            </p>
        </div>
        <el-form :model="updateForm" :inline="true" :label-width = "xeLabelWidth" ref="updateForm">
            <div>
                <!--日期-->
                <template>
                    <el-form-item label="操作时间" prop="createTime">
                        <el-date-picker class = "xe-input3-col3"
                                        v-model="updateForm.createTime"
                                        type="datetimerange"
                                        :editable="false"
                                        :picker-options="pickerOptions2"
                                        placeholder="选择日期范围"
                                        align="right">
                        </el-date-picker>
                    </el-form-item>
                </template>
                <!--操作人-->
                <el-form-item label="添加人" prop="creator">
                    <el-input placeholder="" v-model="updateForm.creator" class = "xe-input3-col3"
                              type="daterange"></el-input>
                </el-form-item>
                <!--按钮-->
                <el-form-item label=" ">
                    <el-button type="primary" @click.prevent="screen">筛选</el-button>
                    <el-button @click.prevent="resetForm('updateForm')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>

        <div class="xe-page-header">
            <p>
                更新日志
            </p>
        </div>
        <el-form :inline="true" :label-width = "xeLabelWidth" >
            <el-form-item>
                <el-button type="primary" @click.prevent="addPageList">添加</el-button>
            </el-form-item>
        </el-form>
        <div>
            <!--日志列表-->
            <template>
                <el-table
                    :data="uamRecord"
                    @current-change="handleCurrentChange"
                    style="width: 100%">
                    <el-table-column type="expand">
                        <template scope="props">
                            <div v-for="(content,index) in formatContent(props.row.content)">
                                <h3 class="title">{{ content.name }}</h3>
                                <p v-for="(content,index) in content.child" class="content">{{index+1}}、{{ content.content }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="操作时间"
                        prop="createdTime">
                    </el-table-column>
                    <el-table-column
                        label="添加人"
                        prop="creator">
                    </el-table-column>
                    <el-table-column
                        label="操作"
                        prop="desc">
                        <template scope="scope">
                            <el-button type="text" class="xe-textBtn" @click.prevent="edit(scope.row)" v-if="uamRecord.length > 1">编辑</el-button>
                            <!--<el-button type="text" @click="remove(uamRecord[scope.$index].id)">移除</el-button>-->
                            <el-button type="text" class="xe-textbtn-danger" @click="open2(uamRecord[scope.$index].id)" v-if="uamRecord.length > 1">移除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                updateForm: {
                    createTime: '',
                    creator: ''
                },
                uamRecord: [{
                    content: '',
                    endTime: '',
                    id: '',
                    startTime: '',
                    title: '',
                    desc: '',
                    endDate: '',
                    startDate: ''
                }],
                pageUrl: {
                    loadDataUrl: '/page/uam/record/main/queryUamRecordListWithPage'
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    },
                    {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                data: ''
            };
        },
        created() {
            this.loadInfo();
        },
        methods: {
            addPageList(index) {
                this.$router.push({name: 'toAddPageList'});
            },
            edit(row) {
                this.$router.push({name: 'toEdit', query: row});
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            screen: function() {
                this.queryFn();
            },
            remove: function(ids) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/record/delete/deleteUamRecodById/' + ids
                }).then((res) => {
                    this.loadInfo();
                }).catch(error => {
                    console.log(error);
                    _this.$xeMessage({
                        type: 'success',
                        message: '删除失败!'
                    });
                });
            },
            handleCurrentChange(val) {
            },
            loadInfo: function() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: _this.pageUrl.loadDataUrl,
                    data: {
                        pageNum: 1,
                        pageSize: 20,
                        param: _this.updateForm
                    }
                }).then((res) => {
                    _this.uamRecord = res.result.list;
                }).catch((err) => {
                    console.log(err);
                });
            },
            queryFn() {
                this.loadInfo();
                let _this = this;
                let dateArray = this.updateForm.createTime;
                console.log(dateArray);
                if (dateArray[0] !== undefined && dateArray[0] !== null) {
                    let date = new Date(dateArray[0]);
                    _this.updateForm.startTime = this.dateFormat(date) + ' 00:00:00';
                    date = new Date(dateArray[1]);
                    _this.updateForm.endTime = this.dateFormat(date) + ' 23:59:59';
                };
            },
            dateFormat (date) {
                let result = date.getFullYear() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate().toString();
                return result;
            },
            formatContent(content, type) {
                let json = JSON.parse(content);
                return json;
            },
            open2(id) {
                this.$confirm('确定要删除吗?', '删除提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.remove(id);
                }).catch(() => {
                });
            }
        }
    };
</script>
