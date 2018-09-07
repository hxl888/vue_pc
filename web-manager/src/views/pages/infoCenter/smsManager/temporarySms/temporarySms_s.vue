<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" :model="searchform" :inline=true>
                    <el-form-item prop="smsTitleOrContent">
                        <el-input placeholder="标题/内容" class="xe-input-168" v-model="searchform.smsTitleOrContent"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="startDateStr" class="marR0">
                        <el-date-picker
                            v-model="searchform.startDateStr"
                            class="xe-input-l68"
                            type="datetime"
                            @change="startDateStrFn"
                            placeholder="发送开始时间"
                            >
                        </el-date-picker>
                        <span class="data-bor">-</span>
                    </el-form-item>
                    <el-form-item prop="endDateStr">
                        <el-date-picker
                            v-model="searchform.endDateStr"
                            class="xe-input-l68"
                            type="datetime"
                            @change="endDateStrFn"
                            placeholder="发送结束时间"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="enquiryForm">查询</el-button>
                        <el-button @click="resetForm('searchform')">重置</el-button>
                    </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="addnewmsg"><i class="iconfont icon-xinzeng"></i> 新增临时短信</el-button>
        </div>
        <div>
            <el-table ref="tableDatas" :data="tableDatas" border tooltip-effect="dark" style="width: 100%">
                <el-table-column  fixed="left" prop="smsNumber" width="150" label="编号">
                </el-table-column>
                <el-table-column prop="smsTitle" label="短信标题" width="150"></el-table-column>
                <el-table-column prop="smsContent" label="短信内容">
                </el-table-column>
                <el-table-column prop="createDate" width="160" label="发送时间">
                    <template scope="scope">
                        <div v-if="scope.row.createDate">
                            {{scope.row.createDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" width="65" label="操作" fixed="right">
                    <template scope="scope">
                        <div class="btn-in-table">
                            <a href="javascript:;" class="s-blue" @click="checkView(scope.row)">查看</a>
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
        <!--弹框(编辑新增)-->
        <div class="reset-dialog reset-dialog03 addNew-box">
            <el-dialog class="" title="新增临时短信" :visible.sync="edialogVisible">
                <el-form ref="formArray" :rules="rules" :model="formArray" label-width="115px">
                    <el-form-item label=" 临时短信标题" prop="smsTitle">
                        <el-input class = "xe-input-col3" :maxlength="100" v-model="formArray.smsTitle" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="临时短信内容" class="text_area textare_resethei_90" prop="smsContent">
                        <el-input type="textarea" class = "xe-input-col3" :maxlength="200" v-model="formArray.smsContent" placeholder="每条短信建议不超过67个字符，否则将会分条发送(最多输入400字符)"></el-input>
                        <span class="last-num" style="left:367px">{{descTextLength}}/400</span>
                    </el-form-item>
                    <el-form-item label="短信发送对象" class="textare_resethei_90" prop="sendObj" style="padding-bottom: 20px">
                        <el-input  type="textarea" :maxlength="200" class = "xe-input-col3" v-model="formArray.sendObj" placeholder="请输入手机号，多个手机号请用“,”分隔，最多输入5000个手机号"></el-input>
                    </el-form-item>
                    <div class="dialog-footer-bor">
                        <el-button type="primary" :loading="loading" @click="preservation('formArray')">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import {getTextLength} from 'utils';
export default {
    data() {
        let validatesendObj = (rule, value, callback) => {
            if (value) {
                let reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
                let flag = false;
                if (value.indexOf(',') !== -1 || value.indexOf('，') !== -1) {
                    let arr = null;
                    if (value.indexOf(',') !== -1) {
                        arr = value.split(',');
                    } else if (value.indexOf('，') !== -1) {
                        arr = value.split('，');
                    }
                    let objectArr = {};
                    let flag2 = false; // 去重
                    arr.some((item) => {
                        if (objectArr[item]) {
                            console.log('重复了');
                            flag2 = false;
                            return true;
                        } else {
                            objectArr[item] = 1;
                            flag2 = true;
                        }
                    });
                    arr.some((item) => {
                        if (reg.test(item)) {
                            flag = true;
                        } else {
                            flag = false;
                        }
                    });
                    if (flag) {
                        if (flag2) {
                            callback();
                        } else {
                            callback(new Error('您输入的手机号重复了,请重新输入'));
                        }
                    } else {
                        callback(new Error('手机号格式错误'));
                    }
                    console.log('arr', arr);
                } else {
                    if (reg.test(value)) {
                        callback();
                    } else {
                        callback(new Error('手机号格式错误'));
                    }
                }
            } else {
                callback(new Error('短信发送对象不能为空'));
            }
        };
        return {
            searchform: {
                smsTitleOrContent: '',
                startDateStr: '',
                endDateStr: ''
            },
            formArray: {
                smsTitle: '',
                smsContent: '',
                sendObj: ''
            },
            edialogVisible: false,
            rules: {
                smsTitle: [
                    { required: true, message: '临时短信标题不能为空', trigger: 'blur' }
                ],
                smsContent: [
                    { required: true, message: '临时短信内容不能为空', trigger: 'blur' }
                ],
                sendObj: [
                    { required: true, validator: validatesendObj, trigger: 'blur' }
                ]
            },
            loading: false,
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            tableDatas: [],
            startDateStrs: '',
            endDateStrs: '',
            productUrl: '/xe-route/xe-mis'
//                productUrl: ''
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
            this.endDateStrs = val;
        },
        addnewmsg() {
            this.edialogVisible = true;
        },
        checkView(row) {
            this.$router.push({name: 'temporarySmsDetails', query: {smsNumber: row.smsNumber}});
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
                url: `${this.productUrl}/manager/smsSendRecord/queryTempSmsList`,
                data: params
            }).then((res) => {
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDatas = res.data.tempList;
            }).catch((error) => {
                console.log(error);
            });
        },
        temSmsaddnew() {
            let params = {};
            let _this = this;
            params = this.formArray;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/smsSendRecord/insertSmsRecord`,
                data: params
            }).then((res) => {
                window.$wxeMessage({
                    type: 'success',
                    message: `发送成功`
                });
                this.loading = false;
                this.cancel();
                setTimeout(() => {
                    _this.enquiryForm();
                }, 300);
            }).catch((error) => {
                this.loading = false;
                console.log(error);
            });
        },
        preservation(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.temSmsaddnew();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancel() {
            this.edialogVisible = false;
        },
        resetForm(formName) {
            let _this = this;
            setTimeout(() => {
                _this.enquiryForm();
            }, 10);
        },
        handleSizeChange(val) {
            console.log('val--->', val);
            this.pagelist.pageSize = val;
            this.enquiryForm();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.enquiryForm();
            }
        }
    },
    computed: {
        descTextLength() {
            return getTextLength(this.formArray.smsContent);
        }
    },
    watch: {
        edialogVisible(n) {
            if (n === false) {
                let _this = this;
                setTimeout(() => {
                    _this.$refs.formArray.resetFields();
                }, 300);
            }
        }
    }
};
</script>

<style scoped>
    .error-tishi .el-form-item {
        margin-bottom: 0!important;
        padding-bottom: 5px;
    }
    .pad0 {
        padding:0!important;
    }
</style>
