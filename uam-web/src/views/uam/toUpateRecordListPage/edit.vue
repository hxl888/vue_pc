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
                <el-breadcrumb-item>编辑记录</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                编辑记录
            </p>
        </div>
        <el-form :label-width="xeLabelWidth" :model="dynamicValidateForm" ref="dynamicValidateForm">
            <div v-for=" (item,index) in dynamicValidateForm.domains">
                <div class="xe-input-col2">
                    <el-form-item label="主题" :prop="'domains.' + index + '.name'" :rules="[{ required: true, message: '主题不能为空',trigger: 'blur'}]">
                        <el-input type="text" v-model="item.name" auto-complete="off" class="xe-input-col3"></el-input>
                    </el-form-item>
                </div>
                <div class="" style="overflow:hidden">
                    <el-form-item label="内容" style="float:left" :prop="'domains.' + index + '.child'" :rules="[{ required: true, message: '内容不能为空',trigger: 'blur'}]">
                        <el-input type="textarea" v-model='item.child' auto-complete="off" resize="none" class="xe-input-col3">
                        </el-input>
                    </el-form-item>
                    <div style="float:left;margin-left:15px" v-if='dynamicValidateForm.domains.length > 1'>
                        <el-button @click.prevent="removSelec(index)">删除</el-button>
                    </div>
                </div>
                <div class="xe-page-headers" v-if='dynamicValidateForm.domains.length > 1'></div>
            </div>
            <el-form-item label=" ">
                <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
                <el-button type="" @click.prevent="addValidateForm">新增</el-button>
                <el-button type="" @click="returnMain">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                idValue: this.$route.query.id,
                dynamicValidateForm: {
                    domains: []
                },
                domain: [],
                data: ''
            };
        },
        created() {
        },
        mounted: function() {
            let _this = this;
            _this.$http({
                method: 'POST',
                url: '/page/uam/record/modify/findUamRecodById/' + _this.idValue
            }).then(res => {
                _this.data = res.result;
                if (_this.data === undefined || _this.data === null) {
                    console.log('对不起没有数据');
                }
                _this.dynamicValidateForm.domains = JSON.parse(_this.data.content);
                let kData = '';
                for (var i = 0; i < _this.dynamicValidateForm.domains.length; i++) {
                    kData = '';
                    for (var j = 0; j < _this.dynamicValidateForm.domains[i].child.length; j++) {
                        kData += _this.dynamicValidateForm.domains[i].child[j].content;
                    }
                    _this.dynamicValidateForm.domains[i].child = kData;
                }
            }).catch(error => {
                console.log(error);
            });
        },
        directives: {
            formatModel: {
                inserted: function (el, modelObj, vNode) {
                    console.log(vNode.data.directives[0].value);
                    var str = '';
                    modelObj.value.forEach(function (item) {
                        str += item.content + '\n';
                    });
                    vNode.data.directives[0].value = str;
                }
            }
        },
        methods: {
            domainJons() {
                let _this = this;
                let dominLIs = _this.dynamicValidateForm.domains;
                console.log(dominLIs);
                let param = [];
                for (let i in dominLIs) {
                    let obj = {};
                    obj.name = dominLIs[i].name;
                    obj.content = dominLIs[i].child;
                    param.push(obj);
                };
                _this.domain = param;
                console.log('_this.domain', _this.domain);
            },
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
                _this.domainJons();
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/record/modify/editUamRecordById/' + _this.idValue,
                    data: _this.domain
                }).then(res => {
                    this.$router.go(-1);
                }).catch(error => {
                    console.log(error);
                });
            },
            returnMain() {
                this.$router.push({name: 'toUpateRecordListPage'});
            }
        }
    };
</script>
