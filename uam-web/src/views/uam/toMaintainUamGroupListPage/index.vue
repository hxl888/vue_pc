<style rel="stylesheet/scss" lang="scss">
    .xe-group-admi {
        display: inline-block;
    }
    .xe-page-content .xe-group-admi .el-tree {
        display: inline-block;

    }

    .xe-page-content .xe-group-admi .el-tree-node__content {

        padding-right: 20px;
    }

    .xe-operation-group-panel {
        margin-bottom: 20px;
    }

    .xe-group-edit-panel, .xe-group-add-panel, .xe-group-bind-panel {
        display: inline-block;
        vertical-align: top;
    }

    /*.xe-group-add-panel {*/
    /*display: inline-block;*/
    /*vertical-align: top;*/
    /*}*/

    .xe-group-header {
        margin: 0px 0px 20px 30px;
    }

    .xe-group-bind {
        margin-left: 40px;
    }

    .xe-group-bind-btn {

        margin-left: 40px;
        margin-top: 20px;
    }

</style>

<template>
    <div class="xe-page-content" v-loading="loading" element-loading-text="拼命加载中">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item>组织管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>组织列表</p>
        </div>

        <div class="xe-operation-group-panel">
            <el-button type="text" :disabled="!isOperationBtnDisabled" @click="disableBtnClick" v-if="isDsiableShow">禁用</el-button>
            <el-button type="text" :disabled="!isOperationBtnDisabled" @click="enableBtnClick" v-if="!isDsiableShow">启用</el-button>
            <el-button type="text" @click="addBtnClick">添加子节点</el-button>
            <el-button type="text" :disabled="!isOperationBtnDisabled" @click="editBtnClick">修改</el-button>
            <el-button type="text" :disabled="!isOperationBtnDisabled" @click="todeleteNode">删除</el-button>
            <el-button type="text" @click="bindBtnClick">绑定用户</el-button>

        </div>

        <div class="xe-group-admi">
            <el-tree :data="treeData"
                     v-show="isTreeShow"
                     node-key="id"
                     accordion
                     :default-expanded-keys = "defaultExpandedKeys"
                     :props="defaultProps"
                     :highlight-current=true
                     :expand-on-click-node = false
                     @node-click="handleNodeClick">

            </el-tree>
        </div>
        <div class="xe-group-edit-panel" v-show="isEditShow">
            <div class="xe-page-header xe-group-header">
                <p>
                    编辑菜单
                </p>
            </div>
            <el-form :model="editGroupForm" :rules="editRules" ref="editGroupForm" :label-width="xeLabelWidth">
                <el-form-item label="父组织">
                    <el-input v-model="editGroupForm.parentGroupName"
                              :readonly=true
                              class="xe-input-readonly-color xe-input-col3">
                    </el-input>
                </el-form-item>
                <el-form-item label="组织编码" required prop="groupCode">
                    <el-input v-model="editGroupForm.groupCode"
                              placeholder="编码唯一"
                              :readonly="isEdit"
                              :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                    </el-input>
                </el-form-item>
                <el-form-item label="组织名称" required prop="groupName">
                    <el-input v-model="editGroupForm.groupName"
                              :readonly="isEdit"
                              :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系人" required prop="contact">
                    <el-input v-model="editGroupForm.contact"
                              :readonly="isEdit"
                              :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                    </el-input>
                </el-form-item>
                <el-form-item label="联系电话" required prop="contactPhone">
                    <el-input v-model="editGroupForm.contactPhone"
                              :readonly="isEdit"
                              :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                    </el-input>
                </el-form-item>
                <el-form-item label="组织类型" required prop="type">
                    <el-select v-model="editGroupForm.type"
                               filterable
                               placeholder="请选择"
                               :disabled="isEdit"
                               :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        <el-option
                            v-for="item in groupTypeOption"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组织地址" required prop="groupAddress">
                    <city-picker :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']"
                                 :default-data="defaultData"
                                 :url="cityPickerUrl"
                                 :readonly="isEdit"
                                 :success-callback="cityPickerEditSuccessCallback">
                    </city-picker>
                </el-form-item>
                <el-form-item label="详细地址" prop="detailAddress">
                    <el-input v-model="editGroupForm.detailAddress"
                              :readonly="isEdit"
                              :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                    </el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea"
                              v-model="editGroupForm.remark"
                              :readonly="isEdit"
                              :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                    </el-input>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" :disabled="isEdit" @click="submitEditForm('editGroupForm')">保 存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="xe-group-add-panel" v-show="isAddShow">
            <div class="xe-page-header xe-group-header">
                <p>
                    新增菜单
                </p>
            </div>
            <el-form :model="addGroupForm" :rules="addRules" ref="addGroupForm" :label-width="xeLabelWidth">
                <el-form-item label="父组织">
                    <el-input v-model="addGroupForm.parentGroupName" :disabled="true" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="组织编码" required prop="groupCode">
                    <el-input v-model="addGroupForm.groupCode" placeholder="编码唯一" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="组织名称" required prop="groupName">
                    <el-input v-model="addGroupForm.groupName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="联系人" required prop="contact">
                    <el-input v-model="addGroupForm.contact" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" required prop="contactPhone">
                    <el-input v-model="addGroupForm.contactPhone" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="组织类型" required prop="type">
                    <el-select v-model="addGroupForm.type" filterable  placeholder="请选择" class="xe-input-col3">
                        <el-option
                            v-for="item in groupTypeOption"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组织地址" required prop="groupAddress">
                    <city-picker class="xe-input-col3" :url="cityPickerUrl" :success-callback="cityPickerAddSuccessCallback"></city-picker>
                </el-form-item>
                <el-form-item label="详细地址" prop="detailAddress">
                    <el-input v-model="addGroupForm.detailAddress" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="remark">
                    <el-input type="textarea" v-model="addGroupForm.remark" class="xe-input-col3"></el-input>
                </el-form-item>
                </el-form-item>
                <el-form-item label=" ">
                    <el-button type="primary" @click="submitAddForm('addGroupForm')">保 存</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="xe-group-bind-panel" v-show="isBindShow">
            <div class="xe-page-header xe-group-header">
                <p>
                    组织绑定用户
                </p>
            </div>

            <el-form :inline="true" :label-width="xeLabelWidth">
                <el-form-item label="组织编码">
                    <el-input v-model="currentGroupData.groupCode" :readonly=true class="xe-input-col2 xe-input-readonly-color"></el-input>
                </el-form-item>
                <el-form-item label="组织名称">
                    <el-input v-model="currentGroupData.groupName" :readonly=true class="xe-input-col2 xe-input-readonly-color"></el-input>
                </el-form-item>
                <role-bind :option-data="groupBindData" class="xe-group-bind" :success-callback="bindSuccessCallback"></role-bind>
                <el-form-item>
                    <el-button class="xe-group-bind-btn" type="primary" @click="submitBindForm('addGroupForm')">保 存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import FormatTreeData from '../../../utils/formatTree';
    import CityPicker from '../../../components/cityPicker';
    import RoleUserBind from '../../../components/roleUserBind';
    export default {
        data() {
            var checkAddGroupCode = (rule, value, callback) => {
                if (value !== '' && value !== undefined) {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入字母或者数字'));
                    } else {
                        this.$http({
                            method: 'POST',
                            url: `/page/uam/group/common/checkUamGroupCodeWithAdd/${value}`
                        }).then((res) => {
                            if (res.result === false) {
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
            var checkAddGroupName = (rule, value, callback) => {
                console.log(value);
                if (value !== '' && value !== undefined) {
                    callback();
//                    this.$http({
//                        method: 'POST',
//                        url: '/page/uam/group/common/checkUamGroupName',
//                        data: {
//                            groupName: value
//                        }
//                    }).then((res) => {
//                        if (res.result === false) {
//                            callback(new Error('组织名称已存在'));
//                        } else {
//                            callback();
//                        }
//                    });
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
            var checkEditGroupCode = (rule, value, callback) => {
                if (value !== '') {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入字母或者数字'));
                    } else {
                        var param = {};
                        param.groupCode = value;
                        param.id = this.currentGroupData.id;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/group/common/checkUamGroupCodeWithEdit',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
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
            var checkEditGroupName = (rule, value, callback) => {
                if (value !== '') {
                    var param = {};
                    param.groupName = value;
                    param.groupId = this.currentGroupData.id;
                    this.$http({
                        method: 'POST',
                        url: '/page/uam/group/common/checkUamGroupNameWithEdit',
                        data: param
                    }).then((res) => {
                        if (res.result === false) {
                            callback(new Error('组织名称已存在'));
                        } else {
                            callback();
                        }
                    });
                } else {
                    callback(new Error('请输入组织名称'));
                }
            };
            return {
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'groupName'
                },
                isTreeShow: false,
                isEditShow: false,
                isEdit: true,
                isAddShow: false,
                isBindShow: false,
                isOperationBtnDisabled: true,
                isDsiableShow: true,
                defaultExpandedKeys: [],
                currentGroupData: {},
                addGroupForm: {
                    groupAddress: '',
                    type: ''
                },
                editGroupForm: {
                    groupAddress: ''
                },
                cityPickerUrl: '/page/uam/citypicker/get/getCitypicker',
                defaultData: {},
                groupBindData: {},
                groupBindStr: '',
                loading: true,
                addRules: {
                    groupCode: [
                        { min: 0, max: 10, message: '组织编码长度不能大于10', trigger: 'blur' },
                        { validator: checkAddGroupCode, trigger: 'blur' }
                    ],
                    groupName: [
                        { min: 0, max: 10, message: '组织名称长度不能大于10', trigger: 'blur' },
                        { validator: checkAddGroupName, trigger: 'blur' }
                    ],
                    type: [
                        {required: true, message: '请选择组织类型', trigger: 'blur'}
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
                },
                editRules: {
                    groupCode: [
                        { min: 0, max: 10, message: '组织编码长度不能大于10', trigger: 'blur' },
                        { validator: checkEditGroupCode, trigger: 'blur' }
                    ],
                    groupName: [
                        { min: 0, max: 10, message: '组织名称长度不能大于10', trigger: 'blur' },
                        { validator: checkEditGroupName, trigger: 'blur' }
                    ],
                    type: [
                        {required: true, message: '请选择组织类型', trigger: 'blur'}
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
                    value: '5',
                    label: '加盟商'
                }, {
                    value: '4',
                    label: '其他'
                }]
            };
        },
        components: {
            'city-picker': CityPicker,
            'role-bind': RoleUserBind
        },
        created() {
            this.queryDataFn();
        },
        methods: {
            queryDataFn() {
                let _this = this;
                _this.loading = true;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/group/main/getMaintainUamGroupListPage'
                }).then((res) => {
                    setTimeout(() => {
                        _this.loading = false;
                    }, 800);
                    _this.isTreeShow = true;
                    _this.treeData = FormatTreeData(res.result).treeData;
                    _this.defaultExpandedKeys.push(_this.treeData[0].id);
                    _this.handleNodeClick(_this.treeData[0]);
                }).catch((err) => {
                    console.log(err);
                    _this.loading = false;
                });
            },
            queryEditDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/group/modify/getEditGroupPageInfo/${this.currentGroupData.id}`
                }).then((res) => {
                    this.editGroupForm = res.result.group;
                    this.editGroupForm.parentGroupName = res.result.parentGroup.groupName;
                    this.initCityPickerDefaultData(res.result);
                }).catch((err) => {
                    console.log(err);
                });
            },
            initCityPickerDefaultData(datas) {
                let param = {};
                datas.group.province ? param.province = {
                    code: datas.group.province,
                    keyword: 'province',
                    title: datas.group.provinceName
                } : null;
                datas.group.city ? param.city = {
                    code: datas.group.city,
                    keyword: 'city',
                    title: datas.group.cityName
                } : null;
                datas.group.area ? param.district = {
                    code: datas.group.area,
                    keyword: 'area',
                    title: datas.group.areaName
                } : null;
                datas.group.street ? param.street = {
                    code: datas.group.street,
                    keyword: 'street',
                    title: datas.group.streetName
                } : null;
                this.defaultData = param;
                this.addresParam(param);
            },
            addresParam(parm) {
                var addresArr = [];
                if (parm.province) {
                    addresArr.push({
                        code: parm.province.code,
                        title: parm.province.title
                    });
                }
                if (parm.city) {
                    addresArr.push({
                        code: parm.city.code,
                        title: parm.city.title
                    });
                }
                if (parm.district) {
                    addresArr.push({
                        code: parm.district.code,
                        title: parm.district.title
                    });
                }
                if (parm.street) {
                    addresArr.push({
                        code: parm.street.code,
                        title: parm.street.title
                    });
                }
                this.editGroupForm.groupAddress = this.formatGroupAddres(addresArr);
            },
            queryAddDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/group/add/getAddGroupPageInfo/${this.currentGroupData.id}`
                }).then((res) => {
                    _this.$set(this.addGroupForm, 'parentGroupName', res.result.groupName);
                    _this.addGroupForm.pid = res.result.id;
                }).catch((err) => {
                    console.log(err);
                });
            },
            queryBindDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/group/bind/getGroupBindUserPageInfo/${this.currentGroupData.id}`
                }).then((res) => {
                    var bindData = {
                        leftData: res.result.notBindUserList ? res.result.notBindUserList : [],
                        rightData: res.result.alreadyBindUserList ? res.result.alreadyBindUserList : []
                    };
                    _this.groupBindData = bindData;
                    _this.formatBindId(_this.groupBindData.rightData);
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitEditForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('您将要编修改辑组织, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.saveEditGroupFn();
                        }).catch(() => {
                            this.$xeMessage({
                                type: 'info',
                                message: '已取消修改'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveEditGroupFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/group/modify/editUamGroup',
                    data: _this.editGroupForm
                }).then((res) => {
                    this.$xeMessage({
                        type: 'info',
                        message: '修改成功'
                    });
                    this.queryDataFn();
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitAddForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('您将要添加新组织, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.saveAddGroupFn();
                        }).catch(() => {
                            this.$xeMessage({
                                type: 'info',
                                message: '已取消添加'
                            });
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            saveAddGroupFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/group/add/addUamGroup',
                    data: _this.addGroupForm
                }).then((res) => {
                    this.$xeMessage({
                        type: 'success',
                        message: '添加成功!'
                    });
                    _this.queryDataFn();
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitBindForm() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/group/bind/bindUamUser4Group',
                    data: {
                        groupId: _this.currentGroupData.id,
                        userIds: _this.groupBindStr
                    }
                }).then((res) => {
                    _this.queryDataFn();
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleNodeClick(data) {
                this.currentGroupData = data;
                this.isEdit = true;
                if (data.id !== 'GD1625000003') {
                    this.isOperationBtnDisabled = true;
                    this.isEditShow = true;
                    this.isAddShow = false;
                    this.isBindShow = false;
                    this.isDsiableShow = this.currentGroupData.status !== 'DISABLE';
                    this.queryEditDataFn();
                } else {
                    this.isOperationBtnDisabled = false;
                    this.isEditShow = false;
                    this.isAddShow = false;
                    this.isBindShow = false;
                }
            },
            addBtnClick() {
                this.isAddShow = true;
                this.isEditShow = false;
                this.queryAddDataFn();
            },
            editBtnClick() {
                if (this.isEditShow === false) {
                    this.isEditShow = true;
                    this.isAddShow = false;
                    this.isBindShow = false;
                } else {
                    this.isEdit = !this.isEdit;
                }
            },
            disableBtnClick() {
                this.disableUser(this.currentGroupData.groupName,
                    {id: this.currentGroupData.id, status: '0'},
                    '/page/uam/group/main/updateUamGroupStatusById',
                    () => {
                        this.queryDataFn();
                    });
            },
            enableBtnClick() {
                this.enableUser(this.currentGroupData.groupName,
                    {id: this.currentGroupData.id, status: '1'},
                    '/page/uam/group/main/updateUamGroupStatusById',
                    () => {
                        this.queryDataFn();
                    });
            },
            bindBtnClick() {
                this.isEditShow = false;
                this.isAddShow = false;
                this.isBindShow = true;
                this.queryBindDataFn();
            },
            bindSuccessCallback(unBindArr, bindArr) {
                this.formatBindId(bindArr);
            },
            cityPickerAddSuccessCallback(val) {
                this.addGroupForm.groupAddress = this.formatGroupAddres(val);
            },
            cityPickerEditSuccessCallback(val) {
                this.editGroupForm.groupAddress = this.formatGroupAddres(val);
            },
            formatGroupAddres(val) {
                console.log(val);
                let title = '';
                let code = '';
                val.forEach((item) => {
                    title += `${item.title}/`;
                    code += `${item.code},`;
                });
                title = title.slice(0, -1);
                code = code.slice(0, -1);
                return title + '~' + code;
            },
            formatBindId(bindArr) {
                this.groupBindStr = '';
                bindArr.forEach((item, index) => {
                    this.groupBindStr += item.id;
                    if (index !== bindArr.length - 1) {
                        this.groupBindStr += ',';
                    }
                });
            },
            todeleteNode(val) {
                console.log(this.currentGroupData.id);
                let _this = this;
                this.$confirm(`确定删除 ${_this.currentGroupData.groupName} 吗？删除后将不能使用，确定继续删除吗?`, '删除提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: `/page/uam/group/main/deleteUamGroupById/${_this.currentGroupData.id}`
                    }).then((res) => {
                        this.$xeMessage({
                            type: 'info',
                            message: '成功删除'
                        });
                        this.queryDataFn();
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch(() => {
                    this.$xeMessage({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }
        }
    };
</script>
