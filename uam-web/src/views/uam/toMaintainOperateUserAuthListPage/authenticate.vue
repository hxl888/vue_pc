<style rel="stylesheet/scss" lang="scss">

    .xe-page-content {

        padding: 8px 16px 24px;
    }

    .xe-page-content .xe-addbtn-panel {

        padding-bottom: 15px;
    }

    .el-textarea__inner{
        height: 150px;
        border-radius: 0;
        resize:none;
    }

    .hidden{
        dispaly: none;
    }
    .borNone{
        border: none;
    }

</style>
<template>
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">用户中心</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'toMaintainOperateUserAuthListPage' }">运营认证</el-breadcrumb-item>
                <el-breadcrumb-item>用户审核</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-form :model="authenticateForm" :rules="rules" ref="authenticateForm" :label-width="xeLabelWidth">
            <div class="xe-page-header">
                <p>
                    用户审核
                </p>
            </div>
            <div>
                <el-form-item label="状态ID" v-if="show">
                    <el-input :disabled = true v-model="authenticateForm.id" class="xe-input-col3"></el-input>
                </el-form-item>

                <el-form-item label="ID" v-if="show">
                    <el-input :disabled = true v-model="authenticateForm.userStatusId" class="xe-input-col3"></el-input>
                </el-form-item>

                <el-form-item label="用户ID" v-if="show">
                    <el-input :disabled = true v-model="authenticateForm.userId" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="用户类型">
                    <el-input :disabled = true v-model="authenticateForm.systemName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="用户名">
                    <el-input :disabled = true v-model="authenticateForm.loginName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="手机号">
                    <el-input :disabled = true v-model="authenticateForm.mobileNo" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                    <el-input  :disabled = true v-model="authenticateForm.userName" class="xe-input-col3"></el-input>
                </el-form-item>
                <el-form-item label="工号" prop="userCode">
                    <el-input v-model="authenticateForm.userCode" class="xe-input-col3" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="所属组织" prop="groupName">
                    <input-tree class = "xe-input-col3 xe-input-readonly-color" v-model = "authenticateForm.groupName" :default-data-id="authenticateForm.groupId" :readonly=true :tree-data="groupTreeData" :success-callback = "treeSuccessCallback"></input-tree>
                </el-form-item>
                <el-form-item label="分配角色" class="borNone" prop="assignRoles">
                    <el-form-item>
                        <el-tree
                            :plain="true"
                            class="xe-input-col3"
                            :data="roleTreeData"
                            show-checkbox
                            node-key="id"
                            ref="roleTree"
                            :default-checked-keys="checkedDefault"
                            :props="defaultProps">
                        </el-tree>
                    </el-form-item>
                </el-form-item>
            </div>
        </el-form>
        <el-form :model="remarkForm" :rules="remarkRules" ref="remarkForm" :label-width="xeLabelWidth">
            <div class="xe-page-header">
                <p>
                    审核备注
                </p>
            </div>
            <div>
                <el-form-item prop="remark">
                    <el-input class="xe-input-col3" type="textarea" v-model="remarkForm.remark" placeholder="审核通过或驳回的原因"></el-input>
                </el-form-item>
            </div>
            <div>
                <el-form-item>
                    <el-button type="primary" @click="passRequest('authenticateForm')">审核通过</el-button>
                    <el-button type="danger" @click="rejectRequest('remarkForm')">驳回</el-button>
                    <el-button @click="returnBefore">返回</el-button>
                </el-form-item>
            </div>
        </el-form>
    </div>
</template>
<style>

</style>
<script>

    import InputTree from '../../../components/groupTree';

    export default {
        data() {
            var checkUserCode = (rule, value, callback) => {
                if (value !== '' && value !== undefined && value !== null) {
                    var reg = /^[A-Za-z0-9]{6,16}$/;
                    var val = reg.test(value);
                    if (val !== true) {
                        callback(new Error('请正确填写资料,6-16位数字字母'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            var checkAssignRoles = (rule, value, callback) => {
                let _this = this;
                let checkeds = _this.$refs['roleTree'].getCheckedNodes(true);
                if (checkeds.length === 0) {
                    _this.$xeMessage({
                        showClose: true,
                        message: '请至少选择一个角色',
                        type: 'warning'
                    });
                } else {
                    callback();
                }
            };
            return {
                show: false,
                roleTreeData: [],
                groupTreeData: [],
                checkedDefault: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                authenticateForm: {
                    userCode: '',
                    groupName: '',
                    assignRoles: ''
                },
                remarkForm: {
                    remark: ''
                },
                rules: {
                    userCode: [
                        { validator: checkUserCode, trigger: 'blur' }
                    ],
                    groupName: [
                        {required: true, message: '请选择组织', trigger: 'blur'}
                    ],
                    assignRoles: [
                        { validator: checkAssignRoles, trigger: 'blur' }
                    ],
                    remark: [
                        { min: 10, max: 100, message: '请输入10 到 100 个字符', trigger: 'blur' }
                    ]
                },
                remarkRules: {
                    remark: [
                        { required: true, message: '备注不能为空', trigger: 'change' },
                        { min: 10, max: 100, message: '请输入10 到 100 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        components: {
            'input-tree': InputTree
        },
        created() {
            this.initModelData();
            this.groupTreeFn();
            this.roleTreeFn();
        },

        methods: {
            initModelData() {
                this.authenticateForm = this.$route.query;
                this.authenticateForm.id = this.$route.query.userStatusId;
            },

            authenticatePassFn() {
                let _this = this;
                let roles = this.$refs['roleTree'].getCheckedNodes();
                _this.authenticateForm.roleIds = '';
                roles.forEach((item, index) => {
                    if (item.pId !== null) {
                        _this.authenticateForm.roleIds += item.id;
                        if (roles.length - 1 !== index) {
                            _this.authenticateForm.roleIds += ',';
                        }
                    }
                });
                let data = {
                    id: _this.authenticateForm.id,
                    userId: _this.authenticateForm.userId,
                    roleIds: _this.authenticateForm.roleIds,
                    statusCode: _this.authenticateForm.statusCode,
                    userCode: _this.authenticateForm.userCode,
                    groupId: _this.authenticateForm.groupId,
                    loginName: _this.authenticateForm.loginName,
                    userName: _this.authenticateForm.userName,
                    mobileNo: _this.authenticateForm.mobileNo
                };
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/approve/passUamUserStatus',
                    data: data
                }).then((res) => {
                    _this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },

            authenticateRejectFn() {
                let _this = this;
                delete _this.authenticateForm['groupSerialNo'];
                delete _this.authenticateForm['loginName'];
                delete _this.authenticateForm['userStatusId'];
                delete _this.authenticateForm['mobileNo'];
                delete _this.authenticateForm['operateTime'];
                delete _this.authenticateForm['registTime'];
                delete _this.authenticateForm['approvalTime'];
                _this.authenticateForm.remark = _this.remarkForm.remark;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/approve/rejectUamUserStatus',
                    data: _this.authenticateForm
                }).then((res) => {
                    _this.$router.go(-1);
                }).catch((err) => {
                    console.log(err);
                });
            },

            groupTreeFn() {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: '/page/uam/group/common/getGroupTree',
                    data: {
                    }
                }).then((res) => {
                    _this.groupTreeData = res['result'];
                }).catch((err) => {
                    console.log(err);
                });
            },

            roleTreeFn() {
                console.log(this.$route.query.data);
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/uam/role/common/queryAllRoleZTreeList`,
                    data: {
                    }
                }).then((res) => {
                    _this.roleTreeData = _this.formatTreeData(res['result']);
                    res['result'].forEach((item) => {
                        if (item.checked) {
                            _this.checkedDefault.push(item.id);
                        }
                    });
                }).catch((err) => {
                    console.log(err);
                });
            },

            handleIconClick() {
                console.log('icon');
            },
            passRequest(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.authenticatePassFn(formName);
                    } else {
                        return false;
                    }
                });
            },

            rejectRequest(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.authenticateRejectFn(formName);
                    } else {
                        return false;
                    }
                });
            },

            formatTreeData(treeData) {
                var newTreeData = [];
                function eachData(treeData, newTreeData, id) {
                    treeData.forEach((item, index) => {
                        if (item.pId === id) {
                            newTreeData.push(item);
                            item.children = [];
                            eachData(treeData, item.children, item.id);
                        }
                    });
                }
                eachData(treeData, newTreeData, null);
                return newTreeData;
            },

            returnBefore() {
                this.$router.go(-1);
            },
            treeSuccessCallback(arr) {
                this.authenticateForm.groupId = arr[arr.length - 1].groupSerialNo;
            }
        }
    };
</script>
