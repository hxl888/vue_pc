<template lang="html">
    <div class="m-router-con">
        <div class="addNew-box reset-dialog reset-dialog02">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" id="brandRuleForm">
                <el-form-item label="短信模板标题" prop='smsTitle'>
                  <el-input size="small" :maxlength="50" name='brandName' v-model="ruleForm.smsTitle" class="xe-input-col3" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="短信模板内容" prop="smsContent" class="text_area">
                    <el-input
                        @click.native='getLocation($event)'
                        name='smsContent'
                        class="xe-input-col3"
                        type="textarea"
                        autosize
                        :maxlength="200"
                        placeholder="每条短信建议不超过67字符，否则将分条发送"
                        v-model="ruleForm.smsContent">
                    </el-input>
                    <span class="last-num" :class="{'error': isError}">{{descTextLength}}/400</span>
                </el-form-item>
                <el-form-item label="短信变量选择" prop="freezeStatus">
                    <div>（点击后自动插入模板内容）</div>
                    <div>
                        <div class="u-opera-btnBox">
                            <div class="btnWarp">
                                <div class="btnsWrap">
                                    <el-tooltip v-for="item in SmsTypeList" class="item" effect="dark" :key="item.id" placement="top" :disabled="item.smsVar.length <= 9">
                                        <div slot="content">{{item.smsVar}}</div>
                                        <a class="lis_p ellipsis" @click="appendContent(item.smsVar)">{{item.smsVar}}</a>
                                    </el-tooltip>
                                </div>
                                <div class="addbtnwrap">
                                    <a href="javascript:;" class="zd-c" @click="addquantity" v-if="btnOn">
                                    <i class="iconfont icon-xinzeng"></i>新增变量</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="短信适用对象" prop="smsSendObj">
                    <el-radio-group v-model="ruleForm.smsSendObj">
                        <el-radio v-for="(item, index) in smsSendObjlist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="发送数量限制" prop="numType">
                    <el-radio-group class="zd-radio" v-model="ruleForm.numType">
                        <el-radio v-for="(item, index) in numTypelist" :label="item.value" :key='item.value'>
                            <span v-if="index === 0">{{item.name}}</span>
                            <span v-if="index === 1">每个手机每天最多
                                <el-input size="small" @input.native='numberParse($event)' name='brandName' :maxlength='3' v-model="ruleForm.maxNum" class="xe-input-l40 my-mr" auto-complete="off" :disabled="ruleForm.numType === 1"></el-input>条
                            </span>
                        </el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="" class="text_area">
                    <div class="dialog-footer">
                        <el-button class="xe-button-normal" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button class="xe-button-normal" @click.preven='cancel'>取 消</el-button>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <!--新增短信模板变量-->
        <el-dialog title="新增短信模板变量" :visible.sync="branchdilog" class="reset-dialog dialog_wid340 error-tishi">
            <el-form :model="addQuantity" :rules="rule"  label-width="70px" ref="addQuantity">
                <el-form-item prop="smsVar"label="新变量">
                    <el-input size="small" v-model="addQuantity.smsVar" :maxlength='30' type="text" class="xe-input-col2" placeholder=""></el-input>
                </el-form-item>
                <div class="el-dialog__footer">
                    <el-button class="xe-button-normal" type="primary" @click="addquantityName('addQuantity')">确定</el-button>
                    <el-button class="xe-button-normal" @click="resetQuan('addQuantity')">取 消</el-button>
                </div>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import {getTextLength} from 'utils';
    import {smsSendObj, numType} from '@/dataControl.js';
    export default {
        data() {
            let validateBrandDesc = (rule, value, callback) => {
                if (value) {
                    if (this.descTextLength > 500) {
                        callback(new Error('输入长度超出500限制'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入短信模板内容'));
                }
            };
            let smsSendObjFlag = (rule, value, callback) => {
                if (value) {
                    callback();
                } else {
                    return callback(new Error('请选择验证状态'));
                }
            };
            let numTypeFlag = (rule, value, callback) => {
                if (value) {
                    if (value === 1) {
                        callback();
                    } else {
                        if (this.ruleForm.maxNum === '') {
                            return callback(new Error('请输入1~999之间的整数'));
                        } else {
                            callback();
                        }
                    }
                } else {
                    return callback(new Error('请选择验证状态'));
                }
            };
            return {
                addQuantity: {
                    smsVar: ''
                },
                IEposition: 0,
                FFposition: 0,
                btnOn: true,
                branchdilog: false,
                SmsTypeList: [],
                ruleForm: {
                    smsTitle: '',
                    smsContent: '',
                    smsSendObj: 1,
                    numType: 1,
                    maxNum: ''
                },
                rule: {
                    smsVar: [
                        { required: true, message: '请输入新变量名', trigger: 'blur' }
                    ]
                },
                rules: {
                    smsTitle: [
                        { required: true, message: '请输入模板标题', trigger: 'blur' },
                        { min: 1, max: 100, message: '请输入100个字符以内的模板标题', trigger: 'blur' }
                    ],
                    smsContent: [
                        {
                            required: true, validator: validateBrandDesc, trigger: 'blur'
                        }
                    ],
                    smsSendObj: [
                        {
                            required: true, validator: smsSendObjFlag, trigger: 'change'
                        }
                    ],
                    numType: [
                        {
                            required: true, validator: numTypeFlag, trigger: 'change'
                        }
                    ]
                },
                isError: false
//                productUrl: ''
            };
        },
        created() {
            this.querySmsTypeList();
        },
        methods: {
            resetQuan(formName) {
                this.$refs[formName].resetFields();
                this.branchdilog = false;
            },
            numberParse(event) {
                let value = parseInt(event.target.value);
                if (value > 0) {
                    event.target.value = value;
                } else {
                    event.target.value = '';
                }
            },
            querySmsTypeList() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/smsTemplet/querySmsTypeList',
                    data: params
                }).then((res) => {
                    this.SmsTypeList = res.data.smsTypeList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            addquantity() {
                this.branchdilog = true;
            },
            addquantityName(formName) {
                var _this = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {};
                        params = this.addQuantity;
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-mis/manager/smsTemplet/insertSmsVar',
                            data: params
                        }).then((res) => {
                            console.log('----!!>', res);
                            this.branchdilog = false;
                            window.$wxeMessage({
                                type: 'success',
                                message: `新增短信变量成功`
                            });
                            setTimeout(function () {
                                console.log('新增');
                                _this.querySmsTypeList();
                            }, 300);
                            this.$refs.addQuantity.resetFields();
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getLocation(elm) {
                if (elm.target.createTextRange) { // IE
                    var range = document.selection.createRange();
                    range.setEndPoint('StartToStart', elm.target.createTextRange());
                    this.IEposition = range.text.length;
                } else if (typeof elm.target.selectionStart === 'number') { // Firefox
                    this.FFposition = elm.target.selectionStart;
                }
            },
            appendContent(val) {
                if (this.ruleForm.smsContent === '') {
                    this.ruleForm.smsContent = val;
                } else {
                    var s1, s2;
                    s1 = this.ruleForm.smsContent.substring(0, this.FFposition);
                    s2 = this.ruleForm.smsContent.substring(this.FFposition, this.ruleForm.smsContent.length);
                    this.ruleForm.smsContent = s1 + val + s2;
                }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {};
                        params = this.ruleForm;
                        this.$http({
                            method: 'post',
                            url: '/xe-route/xe-mis/manager/smsTemplet/insertSmsTemplet',
                            data: params
                        }).then((res) => {
                            console.log('----!!>', res);
                            window.$wxeMessage({
                                type: 'success',
                                message: '模板添加成功'
                            });
                            this.$router.push({name: 'smsTemplateList_s'});
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel() {
                this.$router.go(-1);
            }
        },
        computed: {
            descTextLength() {
                return getTextLength(this.ruleForm.smsContent);
            },
            smsSendObjlist() {
                return smsSendObj;
            },
            numTypelist() {
                return numType;
            }
        },
        watch: {
            SmsTypeList(n) {
                if (n.length >= 30) {
                    this.btnOn = false;
                }
            }
        }
    };
</script>

<style lang="scss">
    .addbtnwrap{
        heigth: 30px;
        line-height: 30px;
        display: inline-block;
        vertical-align: top;
        margin-top: 10px;
        .zd-c{
            display: inline-block;
            color: #525d6e;
            i{
                margin: 0 5px 0 8px;
            }
        }
    }
    .zd-radio{
        width: 500px;
        label{
            width: auto;
        }
    }
    .my-mr{
        margin-right:5px;
    }
    .btnWarp{
        line-height: 1px;
        width: 490px;
        .btnsWrap{
            display: inline-block;
            a{
                width: 150px;
                display: inline-block;
                padding: 8px 15px;
                line-height: 1;
                cursor: pointer;
                color: #687281;
                background: #f5f5f5;
                border: 1px solid #d1d8e0;
                text-align: center;
                margin-top: 10px;
                margin-right: 10px;
                border-radius: 4px;
            }
        }
        .el-button+.el-button{
            margin-left: 0px;
        }
    }
</style>
