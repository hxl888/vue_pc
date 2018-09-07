<template lang="html">
    <div class="pruduct-add">
        <div class="serch-box">
            <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="100px">
                <!-- {{filterForm}} -->
                <div class="for-itemlis">
                    <!-- <el-form-item label="角色ID">
                        <div>444444</div>
                    </el-form-item> -->
                    <el-form-item label="角色名" prop="roleName">
                        <el-input size="small" class="xe-input-col3" v-model="filterForm.roleName" placeholder="请输入角色名"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述" prop="roleDesc">
                        <el-input size="small" class="xe-input-col3" placeholder="请输入角色描述" v-model="filterForm.roleDesc"></el-input>
                    </el-form-item>
                    <div>
                        <el-form-item label="角色状态" prop="lockStatus">
                            <el-radio-group v-model="filterForm.lockStatus">
                                <el-radio v-for="(item, index) in lockStatuslist" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
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
    import {lockStatus01} from '@/dataControl.js';
    export default {
        props: ['dialogVisible'],
        data() {
            var regName = (rule, value, callback) => {
                if (value) {
                    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                    if (reg.test(value)) {
                        this.validateNameCk(() => {
                            callback();
                        }, (err) => {
                            callback(new Error(err.msg));
                        });
                        callback();
                    } else {
                        return callback(new Error('用户姓名只能输入汉字，数字，字母'));
                    }
                } else {
                    return callback(new Error('用户姓名不能为空'));
                }
            };
            var userDescFn = (rule, value, callback) => {
                if (value) {
                    if (value.length > 30) {
                        callback(new Error('用户描述不能超过100字'));
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
                    roleName: '',
                    roleDesc: '',
                    lockStatus: 1
                },
                rules: {
                    roleName: [
                        {required: true, validator: regName, trigger: 'blur'}
                    ],
                    userDesc: [
                        { required: true, validator: userDescFn, trigger: 'blur' }
                    ]
                }
            };
        },
        methods: {
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.$emit('selectGo');
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
            validateNameCk(suc, err) {
                let params = {};
                params.roleName = this.filterForm.roleName;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/checkRole',
                    data: params
                }).then((res) => {
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        err && err(res.data.remote);
                    } else {
                        suc && suc();
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            Preservation() {
                let params = {};
                params = this.filterForm;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/addRole',
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
            lockStatuslist() {
                return lockStatus01;
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
