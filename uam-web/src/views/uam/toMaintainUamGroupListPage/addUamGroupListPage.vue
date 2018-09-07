<style rel="stylesheet/scss" lang="scss">

</style>

<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamGroupListPage' }">组织管理</el-breadcrumb-item>
                <el-breadcrumb-item>新增组织</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                新增组织
            </p>
        </div>
        <el-form :model="groupForm" :rules="rules" ref="groupForm" label-width="100px">
            <el-form-item label="父组织">
                <el-input v-model="groupForm.parentGroupName" :disabled="true" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="组织编码" required prop="groupCode">
                <el-input v-model="groupForm.groupCode" placeholder="编码唯一" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="组织名称" required prop="groupName">
                <el-input v-model="groupForm.groupName" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="联系人" required prop="contact">
                <el-input v-model="groupForm.contact" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" required prop="contactPhone">
                <el-input v-model="groupForm.contactPhone" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="组织类型" required prop="type">
                <el-select v-model="groupForm.type" filterable  placeholder="请选择" class="xe-input-col3">
                    <el-option
                        v-for="item in groupTypeOption"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="组织地址" required prop="groupAddress">
                <!--<el-input v-model="groupForm.groupAddress" class="xe-input-col3"></el-input>-->
                <city-picker class="xe-input-col3" :url="cityPickerUrl" :success-callback="successCallback"></city-picker>
            </el-form-item>
            <el-form-item label="详细地址" prop="detailAddress">
                <el-input v-model="groupForm.detailAddress" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="remark">
                <el-input type="textarea" v-model="groupForm.remark" class="xe-input-col3"></el-input>
            </el-form-item>
            <el-form-item label=" ">
                <el-button type="primary" @click="submitForm('groupForm')">保 存</el-button>
                <el-button @click="returnBefore">返 回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script type="text/ecmascript-6">
    import CityPicker from '../../../components/cityPicker';
    export default {
        data() {
            var checkGroupCode = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入字母或者数字'));
                    } else {
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/group/common/checkUamGroupCodeWithAdd',
                            data: value
                        }).then((res) => {
                            if (res === false) {
                                callback(new Error('组织编码已存在'));
                            } else {
                                callback();
                            }
                        });
                    }
                } else {
                    callback(new Error('请输入组织编码'));
                }
            };
            var checkGroupName = (rule, value, callback) => {
                if (value !== '') {
                    this.$http({
                        method: 'POST',
                        url: '/page/uam/group/common/checkUamGroupName',
                        data: value
                    }).then((res) => {
                        console.log(res);
                        if (res === false) {
                            callback(new Error('组织名称已存在'));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback(new Error('请输入组织名称'));
                }
            };
            var checkPhone = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /(^1\d{10}$|^(0\d{2,3}-?|0\d2,3)?[1-9]\d{4,7}(-\d{1,8})?$)/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写您的联系电话'));
                    } else {
                        callback();
                    }
                } else {
                    callback(new Error('请输入电话号码'));
                }
            };
            return {
                cityPickerUrl: '/page/uam/citypicker/get/getCitypicker',
                groupForm: {
                    pid: this.$route.query.data.id,
                    parentGroupName: this.$route.query.data.groupName,
                    groupCode: '',
                    groupName: '',
                    contact: '',
                    contactPhone: '',
                    type: '',
                    groupAddress: '',
                    detailAddress: '',
                    remark: ''
                },
                groupTypeOption: [{
                    value: '1',
                    label: '大区'
                }, {
                    value: '2',
                    label: '仓库'
                }, {
                    value: '3',
                    label: '基地'
                }, {
                    value: '4',
                    label: '其他'
                }],
                rules: {
                    groupCode: [
                        { min: 0, max: 10, message: '组织编码长度不能大于10', trigger: 'blur' },
                        { validator: checkGroupCode, trigger: 'blur' }
                    ],
                    groupName: [
                        { min: 0, max: 10, message: '组织名称长度不能大于10', trigger: 'blur' },
                        { validator: checkGroupName, trigger: 'blur' }
                    ],
                    type: [
                        {required: true, message: '请选择组织类型', trigger: 'change'}
                    ],
                    contact: [
                        {required: true, message: '请输入联系人姓名', trigger: 'blur'},
                        { min: 0, max: 10, message: '联系人姓名长度不能大于10', trigger: 'blur' }
                    ],
                    contactPhone: [
                        {required: true, message: '请输入电话号码', trigger: 'blur'},
                        { min: 0, max: 20, message: '联系电话长度不能大于20', trigger: 'blur' },
                        { validator: checkPhone, trigger: 'blur' }
                    ],
                    remark: [
                        { min: 0, max: 500, message: '备注不能超过500个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {
            'city-picker': CityPicker
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.saveMenuFn();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveMenuFn() {
                let _this = this;
                let param = {};
                param = _this.groupForm;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/group/add/addUamGroup',
                    data: param
                }).then((res) => {
                    console.log(res);
                    if (res.code === 200) {
                        console.log(res);
                        _this.$router.push({name: 'toMaintainUamGroupListPage'});
                    } else {
                        alert(res.message);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            returnBefore() {
                this.$router.go(-1);
            },
            successCallback(val) {
                let title = '';
                let code = '';
                val.forEach((item) => {
                    title += `${item.title}/`;
                    code += `${item.code},`;
                });
                title = title.slice(0, -1);
                code = code.slice(0, -1);
                let address = title + '~' + code;
                this.groupForm.groupAddress = address;
            }
        }
    };

</script>
