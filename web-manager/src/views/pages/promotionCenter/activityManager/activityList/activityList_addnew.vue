<template lang="html">
    <div class="m-router-con">
        <div class="activity-edtor">
            <el-form  ref = "addnewFrom" :rules="rules" :model = "addnewFrom" label-width = "70px">
                <!--<el-form-item prop="" label="页面编号" class="edotr-list">-->
                  <!--<el-input  v-model="addnewFrom.apName"  class="xe-input-col3"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item prop="pageName" label="页面名称">
                    <el-input  v-model="addnewFrom.pageName" :maxlength="15" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item prop="pageUrl" label="页面路径">
                    <el-input  v-model="addnewFrom.pageUrl"  class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="展示终端" prop="pagePlat">
                        <el-select v-model="addnewFrom.pagePlat" class="xe-input-col3" placeholder="展示终端">
                            <el-option
                                v-for="(item, index) in pagePlatlist"
                                :key="index"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                </el-form-item>
                 <el-form-item prop="startDateStr" label="开始时间" class="edotr-list">
                    <el-date-picker
                        v-model="addnewFrom.startDateStr"
                        type="datetime"
                        @change="startDateStrFn"
                        placeholder="选择开始日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endDateStr" label="结束时间" class="edotr-list">
                    <el-date-picker
                        v-model="addnewFrom.endDateStr"
                        type="datetime"
                        @change="endDateStrFn"
                        :picker-options="pickerOptions"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="templateContent" label="页面模版" class="item-area">
                    <el-input  v-model="addnewFrom.templateContent" type="textarea"  class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <div class="dialog-footer" style="margin-top: 20px">
                        <el-button type="primary" :loading="loading" @click="submitForm('addnewFrom')">保存</el-button>
                        <el-button @click='goBack'>取 消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {pagePlat} from '@/dataControl';
export default {
    data() {
        var pageUrlvolid = (rule, value, callback) => {
            if (value) {
                let reg = /^https:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('不是合法路径'));
                }
            } else {
                callback(new Error('页面路径不能为空'));
            }
        };
        return {
            addnewFrom: {
                pageName: '',
                pagePlat: '',
                pageUrl: '',
                startDateStr: '',
                endDateStr: '',
                templateContent: ''
            },
            pickerOptions: {
            },
            startDateStrs: '',
            endDateStrs: '',
            loading: false, // 提交按钮防止多次提交
            rules: {
                pageName: [
                    { required: true, message: '页面名称不能为空', trigger: 'blur' }
                ],
                pagePlat: [
                    { required: true, type: 'number', message: '展示终端不能为空', trigger: 'change' }
                ],
                pageUrl: [
                    { required: true, validator: pageUrlvolid, trigger: 'blur' }
                ],
                startDateStr: [
                    { type: 'date', required: true, message: '开始时间不能为空', trigger: 'change' }
                ],
                endDateStr: [
                    { type: 'date', required: true, message: '开始时间不能为空', trigger: 'change' }
                ],
                templateContent: [
                    { required: true, message: '页面模版不能为空', trigger: 'blur' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    methods: {
        startDateStrFn(val) {
            this.startDateStrs = val;
            console.log(val);
        },
        endDateStrFn(val) {
            console.log(val);
            this.endDateStrs = val;
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.enquiryForm();
                } else {
                    return false;
                }
            });
        },
        enquiryForm() {
            let params = {};
            this.loading = true;
            params = this.addnewFrom;
            params.startDateStr = this.startDateStrs;
            params.endDateStr = this.endDateStrs;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/sysCmsPage/addCmsPage`,
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                window.$wxeMessage({
                    type: 'success',
                    message: `新增成功`
                });
                this.goBack();
            }).catch((error) => {
                this.loading = false;
                console.log(error);
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        pagePlatlist() {
            return pagePlat;
        }
    }
};
</script>

<style lang="scss">
    .activity-edtor {
        .el-form-item {
            margin-bottom: 18px!important;
        }
    }
    .activity-edtor {
        color: #687281;
        font-size: 12px;
        padding: 15px 20px;
        .edotr-list {
            /*height: 45px;*/
            /*line-height: 45px;*/
            margin: 0;
            .el-form-item__content {
                vertical-align: middle;
            }
            .el-date-editor.el-input {
                width: 400px;
            }
        }
    }
    .item-area {
        .el-textarea__inner {
            height: 350px!important;
        }
    }
</style>
