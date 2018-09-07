<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamMenuListPage' }">菜单管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增菜单</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                新增菜单
            </p>
        </div>
        <el-form :model="menuForm" :rules="rules" ref="menuForm" label-width="100px">
            <el-form-item label="父级菜单">
                <el-input v-model="menuForm.pName" :disabled="true" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="菜单编码" required prop="actionCode">
                <el-input v-model="menuForm.actionCode" placeholder="编码唯一" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="Icon编码" v-if="this.menuForm.icon" prop="icon">
                <el-input v-model="menuForm.iconCode" icon="search" :readonly="true"
                          :on-icon-click="handleIconClick" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="菜单名称" required prop="menuName">
                <el-input v-model="menuForm.menuName" placeholder="请输入中文汉字" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="菜单排序" required prop="number">
                <el-input v-model="menuForm.number" placeholder="请输入整数" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="菜单地址" required prop="url">
                <el-input v-model="menuForm.url" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="备注说明" prop="remark">
                <el-input type="textarea" v-model="menuForm.remark" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="submitForm('menuForm')">保 存</el-button>
                <el-button @click="returnBefore">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        data() {
            var checkMenuCode = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入字母或者数字'));
                    } else {
                        let param = {};
                        param.actionCode = value;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuActionCode',
                            data: param
                        }).then((res) => {
                            if (res === false) {
                                callback(new Error('菜单编码已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入菜单编码'));
                }
            };
            var checkMenuName = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('菜单名称只能为汉字'));
                    } else {
                        let param = {};
                        param.menuName = value;
                        param.pid = this.menuForm.pid;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuName',
                            data: param
                        }).then((res) => {
                            if (res === false) {
                                callback(new Error('菜单名称已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入菜单名称'));
                }
            };
            var checkNumber = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[0-9]*$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('只能输入整数'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入菜单序号'));
                }
            };
            var checkUrl = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[/]/ || /^[a-zA-Z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('URL请以/开头'));
                    } else {
                        let param = {};
                        param.menuName = value;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuUrl',
                            data: param
                        }).then((res) => {
                            if (res === false) {
                                callback(new Error('菜单地址已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入菜单地址'));
                }
            };
            return {
                menuForm: {
                    id: this.$route.query.data.id,
                    pid: this.$route.query.data.pid,
                    icon: true,
                    pName: '',
                    actionCode: '',
                    iconCode: '',
                    menuName: '',
                    number: '',
                    url: '',
                    remark: ''
                },
                rules: {
                    actionCode: [
                        { min: 0, max: 10, message: '菜单编码长度不能大于11', trigger: 'blur' },
                        { validator: checkMenuCode, trigger: 'blur' }
                    ],
                    icon: [
                        {required: true, message: '请输入Icon编码', trigger: 'change'}

                    ],
                    menuName: [
                        { min: 0, max: 10, message: '菜单名称长度不能大于11', trigger: 'blur' },
                        { validator: checkMenuName, trigger: 'blur' }
                    ],
                    number: [
                        { min: 0, max: 2, message: '菜单序号长度不能大于2个字符', trigger: 'blur' },
                        { validator: checkNumber, trigger: 'blur' }
                    ],
                    url: [
                        { min: 0, max: 100, message: '菜单地址长度不能大于100个字符', trigger: 'blur' },
                        { validator: checkUrl, trigger: 'blur' }
                    ],
                    remark: [
                        { min: 0, max: 200, message: '备注不能超过200个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        created() {
            this.queryDataFn();
        },
        methods: {
            queryDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/menu/add/toAddMenuPage/${this.menuForm.id}`
                }).then((res) => {
                    if (res.code === 200) {
                        _this.menuForm.icon = res.result.hasIcon;
                        _this.menuForm.pName = res.result.pname;
                    } else {
                        alert(res.message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveMenuFn();
                    } else {
                        return false;
                    }
                });
            },
            saveMenuFn() {
                let _this = this;
                let param = {};
                param = _this.menuForm;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/menu/add/addUamMenu',
                    data: param
                }).then((res) => {
                    if (res.code === 200) {
                        _this.$router.push({name: 'toMaintainUamMenuListPage'});
                    } else {
                        alert(res.message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            returnBefore() {
                this.$router.go(-1);
            }
        }
    };

</script>
