<style rel="stylesheet/scss" lang="scss">
    .xe-menu-admi {
        display: inline-block;
    }
    .xe-page-content .xe-menu-admi .el-tree {
        display: inline-block;

    }

    .xe-page-content .xe-menu-admi .el-tree-node__content {

        padding-right: 20px;
    }

    .xe-operation-menu-panel {
        height: 56px;
        line-height: 56px;
        border-radius: 2px;
        background-color: #eef1f6;
        margin-bottom: 20px;
        padding-left: 24px;

    }

    .xe-operation-menu-panel-fixed {
        width: 100%;
        position: fixed;
        z-index: 100;
        top: 45px;
    }

    .xe-menu-edit-panel, .xe-menu-add-panel {
        display: inline-block;
        vertical-align: top;
    }

    /*.xe-menu-add-panel {*/
        /*display: inline-block;*/
        /*vertical-align: top;*/
    /*}*/

    .xe-menu-header {
        margin: 0px 0px 20px 30px;
    }

    .xe-menu-seize-panel {
        height: 56px;
        margin-bottom: 20px;
    }

</style>

<template>
    <div class="xe-page-content" v-loading="loading" element-loading-text="拼命加载中">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainUamMenuListPage' }">菜单管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p>
                菜单列表
            </p>
        </div>
        <div>
            <div class="xe-operation-menu-panel" :class="[isFixed ? 'xe-operation-menu-panel-fixed' : '']" ref="menuPanel">
                <el-button type="text" :disabled="!isOperationBtnDisabled" @click="disableBtnClick" v-if="isDsiableShow">禁用</el-button>
                <el-button type="text" :disabled="!isOperationBtnDisabled" @click="enableBtnClick" v-if="!isDsiableShow">启用</el-button>
                <el-button type="text" @click="addBtnClick">添加子节点</el-button>
                <el-button type="text" :disabled="!isOperationBtnDisabled" @click="editBtnClick">修改</el-button>
                <el-button type="text" :disabled="!isOperationBtnDisabled" @click="todeleteNode">删除</el-button>
            </div>
            <div :class = "[isFixed ? 'xe-menu-seize-panel' : '']"></div>
            <div class="xe-menu-admi">
                <el-tree :data="treeData"
                         v-show="isTreeShow"
                         accordion
                         node-key="id"
                         :default-expanded-keys = "defaultExpandedKeys"
                         :props="defaultProps"
                         :highlight-current=true
                         :expand-on-click-node = false
                         @node-click="handleNodeClick">

                </el-tree>
            </div>
            <div class="xe-menu-edit-panel" v-show="isEditShow">
                <div class="xe-page-header xe-menu-header">
                    <p>
                        编辑菜单
                    </p>
                </div>
                <el-form :model="editForm.uamMenu" :rules="editRules" ref="editForm" label-width="100px">
                    <el-form-item label="父级菜单">
                        <el-input v-model="editForm.pname"
                                  :readonly="true"
                                  class="xe-input-readonly-color xe-input-col3">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="菜单编码" required prop="actionCode">
                        <el-input v-model="editForm.uamMenu.actionCode"
                                  :readonly="isEdit" placeholder="编码唯一"
                                  :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="Icon编码" v-if="hasIcon" prop="icon">
                        <icon-input v-model="editForm.uamMenu.icon"
                                    icon="plus"
                                    :readonly = true
                                    :disabled = "isEdit"
                                    :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        </icon-input>
                    </el-form-item>
                    <el-form-item label="菜单名称" required prop="menuName">
                        <el-input v-model="editForm.uamMenu.menuName"
                                  :readonly="isEdit" placeholder="请输入中文汉字"
                                  :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="菜单排序" required prop="number">
                        <el-input v-model="editForm.uamMenu.number"
                                  :readonly="isEdit"
                                  placeholder="请输入整数"
                                  :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="菜单地址" required prop="url">
                        <el-input v-model="editForm.uamMenu.url"
                                  :readonly="isEdit"
                                  :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="视频URL" prop="videoId">
                        <el-input v-model="editForm.uamMenu.videoId"
                                  :readonly="isEdit"
                                  :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']"></el-input>
                    </el-form-item>
                    <el-form-item label="备注说明" prop="remark">
                        <el-input type="textarea" v-model="editForm.uamMenu.remark"
                                  :readonly="isEdit"
                                  :class="[isEdit ? 'xe-input-readonly-color' : '', 'xe-input-col3']">
                        </el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="primary" :disabled="isEdit" @click="submitEditForm('editForm')">保 存</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="xe-menu-add-panel" v-show="isAddShow">
                <div class="xe-page-header xe-menu-header">
                    <p>
                        新增菜单
                    </p>
                </div>
                <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="100px">
                    <el-form-item label="父级菜单">
                        <el-input v-model="addForm.pName" :disabled="true" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单编码" required prop="actionCode">
                        <el-input v-model="addForm.actionCode" placeholder="编码唯一" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label="Icon编码" v-if="addForm.hasIcon" prop="icon">
                        <icon-input v-model="addForm.icon" icon="plus" :readonly = true class="xe-input-col3"></icon-input>
                    </el-form-item>
                    <el-form-item label="菜单名称" required prop="menuName">
                        <el-input v-model="addForm.menuName" placeholder="请输入中文汉字" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单排序" required prop="number">
                        <el-input v-model="addForm.number" placeholder="请输入整数" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单地址" required prop="url">
                        <el-input v-model="addForm.url" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label="视频URL" prop="videoId">
                        <el-input v-model="addForm.videoId" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label="备注说明" prop="remark">
                        <el-input type="textarea" v-model="addForm.remark" class="xe-input-col3"></el-input>
                    </el-form-item>
                    <el-form-item label=" ">
                        <el-button type="primary" @click="submitAddForm('addForm')">保 存</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>

    import FormatTreeData from '../../../utils/formatTree';
    import IconInput from '../../../components/iconInput';
    export default {
        data() {
            var checkEditMenuCode = (rule, value, callback) => {
                if (this.isEdit) {
                    callback();
                }
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入字母或者数字'));
                    } else {
                        let param = {};
                        param.actionCode = value;
                        param.id = this.currentMenuData.id;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuActionCode',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
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
            var checkEditMenuName = (rule, value, callback) => {
                if (this.isEdit) {
                    callback();
                }
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('菜单名称只能为汉字'));
                    } else {
                        let param = {};
                        param.menuName = value;
                        param.id = this.currentMenuData.id;
                        param.pid = this.currentMenuData.pid;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuName',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
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
                if (this.isEdit && this.isEditShow) {
                    callback();
                }
                if (value !== '' && value !== undefined && value !== null) {
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
            var checkEditUrl = (rule, value, callback) => {
                if (this.isEdit) {
                    callback();
                }
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[/]/ || /^[a-zA-Z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('URL请以/开头'));
                    } else {
                        let param = {};
                        param.url = value;
                        param.id = this.currentMenuData.id;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuUrl',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
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
            var checkAddMenuCode = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[A-Za-z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请输入字母或者数字'));
                    } else {
                        let param = {};
                        param.actionCode = value;
                        param.pid = this.currentMenuData.pid;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuActionCode',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
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
            var checkAddMenuName = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[\u4e00-\u9faf]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('菜单名称只能为汉字'));
                    } else {
                        let param = {};
                        param.menuName = value;
                        param.pid = this.currentMenuData.id;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuName',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
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
            var checkAddUrl = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[/]/ || /^[a-zA-Z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('URL请以/开头'));
                    } else {
                        let param = {};
                        param.url = value;
                        param.id = this.currentMenuData.id;
                        this.$http({
                            method: 'POST',
                            url: '/page/uam/menu/common/checkUamMenuUrl',
                            data: param
                        }).then((res) => {
                            if (res.result === false) {
                                callback(new Error('菜单地址已存在'));
                            } else {
                                callback();
                            }
                        }).catch(() => {
//                            callback(new Error('菜单地址已存在'));
                        });
                    }
                } else {
                    callback(new Error('请输入菜单地址'));
                }
            };
            var checkUrl = (rule, value, callback) => {
                debugger;
                if (this.isEdit) {
                    callback();
                }
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[/]/ || /^[a-zA-Z0-9]+$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('URL请以/开头'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var checkEdit = {
                actionCode: [
                    { min: 0, max: 10, message: '菜单编码长度不能大于11', trigger: 'blur' },
                    { validator: checkEditMenuCode, trigger: 'blur' }
                ],
                iconCode: [
                    {required: true, message: '请输入Icon编码', trigger: 'change'}
                ],
                menuName: [
                    { min: 0, max: 10, message: '菜单名称长度不能大于11', trigger: 'blur' },
                    { validator: checkEditMenuName, trigger: 'blur' }
                ],
                number: [
                    { min: 0, max: 2, message: '菜单序号长度不能大于2个字符', trigger: 'blur' },
                    { validator: checkNumber, trigger: 'blur' }
                ],
                url: [
                    { min: 0, max: 100, message: '菜单地址长度不能大于100个字符', trigger: 'blur' },
                    { validator: checkEditUrl, trigger: 'blur' }
                ],
                videoId: [
                    { validator: checkUrl, trigger: 'blur' }
                ],
                remark: [
                    { min: 0, max: 200, message: '备注不能超过200个字符', trigger: 'blur' }
                ]
            };
            var addEdit = {
                actionCode: [
                    { min: 0, max: 10, message: '菜单编码长度不能大于11', trigger: 'blur' },
                    { validator: checkAddMenuCode, trigger: 'blur' }
                ],
                iconCode: [
                    {required: true, message: '请输入Icon编码', trigger: 'change'}

                ],
                menuName: [
                    { min: 0, max: 10, message: '菜单名称长度不能大于11', trigger: 'blur' },
                    { validator: checkAddMenuName, trigger: 'blur' }
                ],
                number: [
                    { min: 0, max: 2, message: '菜单序号长度不能大于2个字符', trigger: 'blur' },
                    { validator: checkNumber, trigger: 'blur' }
                ],
                url: [
                    { min: 0, max: 100, message: '菜单地址长度不能大于100个字符', trigger: 'blur' },
                    { validator: checkAddUrl, trigger: 'blur' }
                ],
                videoId: [
                    { validator: checkUrl, trigger: 'blur' }
                ],
                remark: [
                    { min: 0, max: 200, message: '备注不能超过200个字符', trigger: 'blur' }
                ]
            };
            return {
                treeData: [],
                currentMenuData: {},
                defaultProps: {
                    children: 'children',
                    label: 'menuName'
                },
                isTreeShow: false,
                isEditShow: false,
                isEdit: true,
                isAddShow: false,
                isOperationBtnDisabled: true,
                isDsiableShow: true,
                defaultExpandedKeys: [],
                hasIcon: true,
                isFixed: false,
                loading: true,
                editForm: {
                    uamMenu: {}
                },
                addForm: {
                    icon: ''
                },
                editRules: checkEdit,
                addRules: addEdit
            };
        },
        components: {
            'icon-input': IconInput
        },
        created() {
            this.queryMenuDataFn();
        },
        mounted() {
            let scrollPage = document.querySelector('.main-01-router');
            let menuPanel = this.$refs['menuPanel'];
            scrollPage.addEventListener('scroll', (event) => {
                if (scrollPage.scrollTop >= menuPanel.offsetTop && !this.isFixed) {
                    this.isFixed = true;
                } else if (scrollPage.scrollTop <= menuPanel.offsetTop && this.isFixed) {
                    this.isFixed = false;
                }
            });
        },
        methods: {
            queryMenuDataFn() {
                let _this = this;
                _this.loading = true;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/menu/main/queryUamMenuTreeList'
                }).then((res) => {
                    setTimeout(() => {
                        _this.loading = false;
                    }, 800);
                    _this.isTreeShow = true;
                    _this.treeData = FormatTreeData(res.result).treeData;
                    _this.defaultExpandedKeys.push(_this.treeData[0].id);
                    _this.handleNodeClick(_this.treeData[0]);
                    window.localStorage.setItem('menuList', '');
                }).catch((err) => {
                    console.log(err);
                    _this.loading = false;
                });
            },
            queryEditDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/menu/modify/toEditMenuPage/${this.currentMenuData.id}`
                }).then((res) => {
                    _this.editForm = res.result;
                }).catch((err) => {
                    console.log(err);
                });
            },
            queryAddDataFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/menu/add/toAddMenuPage/${this.currentMenuData.id}`
                }).then((res) => {
                    _this.$set(_this.addForm, 'hasIcon', res.result.hasIcon);
                    _this.$set(_this.addForm, 'pName', res.result.pname);
                }).catch((err) => {
                    console.log(err);
                });
            },
            saveAddMenuFn() {
                let _this = this;
                _this.addForm.pid = _this.currentMenuData.id;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/menu/add/addUamMenu',
                    data: _this.addForm
                }).then((res) => {
                    this.$xeMessage({
                        type: 'success',
                        message: '添加成功!'
                    });
                    _this.queryMenuDataFn();
                }).catch((err) => {
                    console.log(err);
                });
            },
            submitAddForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$confirm('您将要添加新菜单, 是否继续?', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.saveAddMenuFn();
                        }).catch(() => {
                            this.$xeMessage({
                                type: 'info',
                                message: '已取消添加'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            submitEditForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.$confirm('您将要修改菜单, 是否继续?', '提示', {
                                    confirmButtonText: '确定',
                                    cancelButtonText: '取消',
                                    type: 'warning'
                                }).then(() => {
                                    this.saveEditMenuFn();
                                }).catch(() => {
                                    this.$xeMessage({
                                        type: 'info',
                                        message: '已取消修改'
                                    });
                                });
                            } else {
                                return false;
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
            saveEditMenuFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/menu/modify/editUamMenu',
                    data: _this.editForm.uamMenu
                }).then((res) => {
                    this.$xeMessage({
                        type: 'info',
                        message: '修改成功'
                    });
                    _this.queryMenuDataFn();
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleNodeClick(data) {
                this.currentMenuData = data;
                this.isEdit = true;
                if (!/root$/.test(data.id)) {
                    this.isOperationBtnDisabled = true;
                    this.isEditShow = true;
                    this.isAddShow = false;
                    this.isDsiableShow = this.currentMenuData.status !== 'DISABLE';
                    this.queryEditDataFn();
                } else {
                    this.isOperationBtnDisabled = false;
                    this.isEditShow = false;
                    this.isAddShow = false;
                }
            },
            handleIconClick(ev) {
                console.log(ev);
            },
            returnBefore() {
                this.$router.go(-1);
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
                } else {
                    this.isEdit = !this.isEdit;
                }
            },
            disableBtnClick() {
                this.disableUser(this.currentMenuData.menuName,
                    {id: this.currentMenuData.id, flag: 'DISABLE'},
                    '/page/uam/menu/status/updateUamMenuStatusById',
                    () => {
                        this.queryMenuDataFn();
                    });
            },
            enableBtnClick() {
                this.enableUser(this.currentMenuData.menuName,
                    {id: this.currentMenuData.id, flag: 'ENSABLE'},
                    '/page/uam/menu/status/updateUamMenuStatusById',
                    () => {
                        this.queryMenuDataFn();
                    });
            },
            todeleteNode(val) {
                let _this = this;
                this.$confirm(`确定删除 ${_this.currentMenuData.menuName} 吗？删除后将不能使用，确定继续删除吗?`, '删除提示', {
                    cancelButtonText: '取消',
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    _this.$http({
                        method: 'POST',
                        url: `/page/uam/menu/delete/deleteUamMenuById/${_this.currentMenuData.id}`
                    }).then((res) => {
                        this.$xeMessage({
                            type: 'info',
                            message: '删除成功'
                        });
                        this.queryMenuDataFn();
                    }).catch((err) => {
                        console.log(err);
                    });
                }).catch(() => {
                    this.$xeMessage({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            contentScroll() {
                console.log('xxxxx');
            }
        }
    };
</script>
