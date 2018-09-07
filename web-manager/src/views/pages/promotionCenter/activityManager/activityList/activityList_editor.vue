<template lang="html">
    <div class="m-router-con">
        <div class="activity-edtor">
            <el-form  ref = "editorFrom" :rules="rules" :model = "editorFrom" label-width = "70px">
                <el-form-item prop="" label="页面编号" class="edotr-list">
                   <div>
                        {{editorFrom.pageCode}}
                    </div>
                </el-form-item>
                <el-form-item prop="pageName" label="页面名称" class="edotr-list">
                    <el-input  v-model="editorFrom.pageName"  class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item prop="pageUrl" label="页面路径" class="edotr-list">
                    <el-input  v-model="editorFrom.pageUrl"  class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item prop="" label="展示终端" class="edotr-list">
                   <div v-if="editorFrom.pagePlat">
                        {{editorFrom.pagePlat | pagePlatfilter}}
                    </div>
                </el-form-item>
                 <el-form-item prop="" label="开始时间" class="edotr-list">
                   <div v-if="editorFrom.startDate">
                        {{editorFrom.startDate, 'ms' | millisecondFormat}}
                    </div>
                </el-form-item>
                <el-form-item prop="endDateStr" label="结束时间" class="edotr-list">
                    <el-date-picker
                        v-model="editorFrom.endDateStr"
                        type="datetime"
                        @change="endDateStrFn"
                        :picker-options="pickerOptions"
                        placeholder="选择结束时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="templateContent" label="页面模版" class="item-area">
                    <el-input  v-model="editorFrom.templateContent" type="textarea"  class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <div class="dialog-footer" style="margin-top: 20px">
                        <el-button type="primary" @click="submitForm('editorFrom')">保存</el-button>
                        <el-button @click='goBack'>取 消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import {millisecondFormat} from '@/utils';
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
            editorFrom: {
                pageCode: '',
                pageName: '',
                pagePlat: '',
                pageUrl: '',
                startDateStr: '',
                endDateStr: '',
                templateContent: ''
            },
            defaultvalue: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            endDateStrs: '',
            loading: false, // 提交按钮防止多次提交
            rules: {
                pageName: [
                    { required: true, message: '页面名称不能为空', trigger: 'blur' }
                ],
                pageUrl: [
                    { required: true, validator: pageUrlvolid, trigger: 'blur' }
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
    created() {
        this.historylis();
    },
    methods: {
        endDateStrFn(val) {
            this.endDateStrs = val;
            console.log(val);
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
        historylis() { // 回显
            if (this.$route.query.pageCode) {
                let params = {};
                let pageCode = this.$route.query.pageCode;
                params.pageCode = pageCode;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/sysCmsPage/queryPage`,
                    data: params
                }).then((res) => {
                    console.log('---99-!!>', res);
//                    alert(this.getDate(res.data.cmsPagemanage.endDate));
                    if (res.data.cmsPage) {
                        this.editorFrom = res.data.cmsPage;
                        if (!this.editorFrom.endDateStr) {
                            this.$set(this.editorFrom, 'endDateStr');
                        }
                        if (!this.editorFrom.startDateStr) {
                            this.$set(this.editorFrom, 'startDateStr');
                        }
                        if (res.data.cmsPage.startDate) {
                            this.editorFrom.startDateStr = millisecondFormat(res.data.cmsPage.startDate, 'ms');
                        }
                        if (res.data.cmsPage.endDate) {
                            this.editorFrom.endDateStr = millisecondFormat(res.data.cmsPage.endDate, 'ms');
                            this.editorFrom.endDateStr = this.getDate(this.editorFrom.endDateStr);
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
        getDate(strDate) { // 时间转换成date类型
            var st = strDate;
            var a = st.split(' ');
            var b = a[0].split('-');
            var c = a[1].split(':');
            var date = new Date(b[0], b[1], b[2], c[0], c[1], c[2]);
            return date;
        },
        enquiryForm() { // 保存
            let params = {};
            let pageCode = this.$route.query.pageCode;
            params = this.editorFrom;
            params.pageCode = pageCode;
            params.endDateStr = this.endDateStrs;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/sysCmsPage/updatePage`,
                data: params
            }).then((res) => {
                console.log('----!!>', res);
                window.$wxeMessage({
                    type: 'success',
                    message: `保存成功`
                });
                this.goBack();
            }).catch((error) => {
                console.log(error);
            });
        },
        goBack() {
            this.$router.go(-1);
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
