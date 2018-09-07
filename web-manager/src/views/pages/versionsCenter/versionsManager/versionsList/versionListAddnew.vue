<template lang="html">
    <div class="pruduct-add">
        <div class="serch-box">
            <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="100px">
                <!-- {{filterForm}} -->
                <div class="for-itemlis">
                    <!-- <el-form-item label="角色ID">
                        <div>444444</div>
                    </el-form-item> -->
                    <el-form-item label="版本名称" prop="versionName" required>
                        <el-input size="small" class="xe-input-col3" v-model="filterForm.versionName" placeholder="请输入版本名称"></el-input>
                    </el-form-item>
                    <el-form-item label="收费标准" prop="feeStandard">
                        <el-input size="small" class="xe-input-col2" :maxlength="7" @blur="numberFix($event, 2)" placeholder="请输入收费标准" v-model="filterForm.feeStandard"></el-input> ／年
                    </el-form-item>
                    <div>
                        <el-form-item label="是否收费" prop="feeFlag">
                            <el-radio-group v-model="filterForm.feeFlag" @change="feeChange">
                                <el-radio v-for="(item, index) in feeFlagList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                </div>
                <div class="member-btnBox" style="padding-bottom: 0">
                    <el-button class="xe-button-normal" type="primary" @click="addProAll('filterForm')">
                        确认添加 
                    </el-button>
                    <el-button class="xe-button-normal" @click="resetForm('filterForm')">
                        取消
                    </el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {feeFlag} from '@/dataControl.js';
    export default {
        props: ['dialogVisible'],
        data() {
            var regName = (rule, value, callback) => {
                if (value) {
                    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                    if (reg.test(value)) {
                        // this.validateNameCk(() => {
                        //     callback();
                        // }, (err) => {
                        //     callback(new Error(err.msg));
                        // });
                        callback();
                    } else {
                        return callback(new Error('版本名称只能输入汉字，数字，字母'));
                    }
                } else {
                    return callback(new Error('版本名称不能为空'));
                }
            };
            var feeStandard = (rule, value, callback) => {
                if (this.filterForm.feeFlag === 2) {
                    if (!value) {
                        return callback(new Error('收费标准不能为空'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                selecarea: [],
                userTypelist: [],
                restaurants: [],
                timeout: null,
                loading: false,
                filterForm: {
                    versionName: '',
                    feeStandard: '',
                    feeFlag: 1
                },
                rules: {
                    versionName: [
                        {required: true, validator: regName, trigger: 'blur'}
                    ],
                    feeStandard: [
                        { validator: feeStandard, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit('selectGo');
            },
            feeChange() {
                this.$refs.filterForm.validateField('feeStandard');
            },
            numberFix(event, number, type) {
                let val = parseFloat(event.target.value);
                if (!(val > 0)) {
                    val = '';
                } else {
                    val = val.toFixed(number);
                }
                event.target.value = val;
                this.filterForm.feeStandard = val;
            },
            addProAll(formName) { // 添加
                console.log(this.filterForm);
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.filterForm) {
                            console.log('提交----》go');
                            this.Preservation();
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            Preservation() {
                let params = {};
                params = this.filterForm;
                if (params.feeFlag === 1) {
                    params.feeStandard = 0;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/erp/version/add',
                    data: params
                }).then((res) => {
                    console.log('保存成功');
                    this.resetForm('filterForm');
                    this.$emit('selectGo');
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        watch: {
            dialogVisible(n) {
                var _this = this;
                if (n === false) {
                    setTimeout(function () {
                        _this.resetForm('filterForm');
                    }, 300);
                }
            }
        },
        computed: {
            feeFlagList() {
                return feeFlag;
            }
        }
    };
</script>
<style scoped>
    .member-btnBox{
        padding: 10px 0 10px;
        text-align: center;
    }
    .xe-input-col3{
        width: 390px;
    }
</style>
