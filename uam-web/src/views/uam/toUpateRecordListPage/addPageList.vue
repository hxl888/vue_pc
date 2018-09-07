<style rel="stylesheet/scss" lang="scss">

    .xe-page-content {

        padding: 8px 16px 24px;
    }
    .areaFixed{
        resize: none;
        height: 150px;
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
    .xe-page-headers {
        margin:0 0 20px 0;
        padding-bottom: 10px;
        border-bottom: 1px solid #c2c2c2;
    }
</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toUpateRecordListPage' }">更新记录</el-breadcrumb-item>
                <el-breadcrumb-item>新增记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                编辑记录
            </p>
        </div>
        <el-form :model="dynamicValidateForm"  ref="dynamicValidateForm" :label-width="xeLabelWidth">
            <div v-for="(domain,index) in dynamicValidateForm.domains">
                <div class="xe-input-col2">
                    <el-form-item label="主题" :prop="'domains.' + index + '.title'" :rules="[{ required: true, message: '主题不能为空',trigger: 'blur'}]">
                        <el-input type="text" v-model="domain.title" auto-complete="off" class="xe-input-col3"></el-input>
                    </el-form-item>
                </div>
                <div class="" style="overflow:hidden">
                    <el-form-item label="内容" :prop="'domains.' + index + '.content'" style="float:left" :rules="[{ required: true, message: '内容不能为空',trigger: 'blur'}]">
                        <el-input type="textarea" v-model="domain.content" auto-complete="off" class="xe-input-col3" resize="none"></el-input>
                    </el-form-item>
                    <div style="float:left;margin-left:15px" v-if='dynamicValidateForm.domains.length > 1'>
                        <el-button @click.prevent='removSelec(index)'>删除</el-button>
                    </div>
                </div>
                <div class="xe-page-headers" v-if='dynamicValidateForm.domains.length > 1'></div>
            </div>
            <el-form-item label=" ">
                <el-button type="primary" @click.prevent="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button type="" @click.prevent="addValidateForm">新增</el-button>
                <el-button type="" @click.prevent= 'returnMain'>返回</el-button>
            </el-form-item>
        </el-form>

    </div>
</template>

<script>

    export default {
        data() {
            return {
                dynamicValidateForm: {
                    domains: [{
                        title: '',
                        content: ''
                    }]
                }
            };
        },
        methods: {
            addValidateForm() {
                this.dynamicValidateForm.domains.push({
                    title: '',
                    content: ''
                });
            },
            removSelec(index) {
                this.dynamicValidateForm.domains.splice(index, 1);
            },
            submitForm(validateList) {
                let _this = this;
                this.$refs[validateList].validate(function(valid) {
                    if (valid) {
                        _this.interactive();
                    } else {
                        return;
                    }
                });
            },
            interactive() {
                let _this = this;
                let datas = _this.dynamicValidateForm.domains;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/record/add/addUamRecord',
                    data: datas
                }).then(res => {
                    this.$router.go(-1);
                }).catch(error => {
                    console.log(error);
                });
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item);
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1);
                }
            },
            returnMain() {
                this.$router.push({name: 'toUpateRecordListPage'});
            }
        }
    };
</script>
