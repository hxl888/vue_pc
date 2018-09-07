<template lang="html">
  <div class="m-router-con">
     <div class="u-top-search">
          <el-form ref="searchform" :model="searchform" :inline="true">
                <el-form-item prop="lockStatus">
                    <el-select size="small" style="width: 140px" class="xe-input-l40" placeholder="用户状态" v-model="searchform.lockStatus">
                        <el-option v-for="item in lockStatussList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="loginName">
                  <el-input placeholder="用户名" style="width: 140px" class="xe-input-l40" v-model="searchform.loginName"></el-input>
                </el-form-item>
                <el-form-item prop="userName">
                  <el-input placeholder="用户姓名" style="width: 140px" class="xe-input-l40" v-model="searchform.userName"></el-input>
                </el-form-item>
                <el-form-item label="" class="marR0">
                    <el-date-picker
                        ref="startDate"
                        v-model="value1"
                        type="datetime"
                         style="width: 165px"
                        size="small"
                        @change="startDateFn"
                        :picker-options="pickerOptionStart"
                        placeholder="创建开始时间"
                    >
                    </el-date-picker>
                    <span class="data-bor">-</span>
                </el-form-item>
                <el-form-item>
                    <el-date-picker
                        ref="endDate"
                        v-model="value2"
                         style="width: 165px"
                        type="datetime"
                        size="small"
                        @change="endDateFn"
                        :picker-options="pickerOptionEnd"
                        placeholder="创建结束时间"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                  <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                  <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
          </el-form>
     </div>
     <div class="u-opera-btnBox">
          <el-button class="xe-button-normal" @click="addUser">
              <span class="iconfont icon-xinzeng"></span> 添加用户
          </el-button>
          <el-button class="xe-button-normal" @click="statusChange(0)">
              <span class="iconfont icon-qiyong"></span> 启用
          </el-button>
          <el-button class="xe-button-normal" @click="statusChange(1)">
              <span class="iconfont icon-jinyong"></span> 禁用
          </el-button>
          <!-- <el-button class="xe-button-normal">
              <span class="iconfont icon-daochu"></span> 导出
          </el-button> -->
          <el-button class="xe-button-normal" @click="statusChange(2)">
              <span class="iconfont icon-shanchu"></span> 删除
          </el-button>
     </div>
     <div class="goodsTable">
          <!-- {{multipleSelection00}} -->
          <!-- {{multipleSelection}} -->
          <el-table highlight-current-row style="width: 100%" border :data="userList" @selection-change="handleSelectionChange00">
              <el-table-column type="selection" min-width="40" class-name="selectionTd" fixed="left">
              </el-table-column>
              <el-table-column prop="userId" label="用户编号"  min-width="124">
              </el-table-column>
              <el-table-column prop="loginName" label="用户名"  min-width="124">
              </el-table-column>
              <el-table-column prop="userName" label="用户姓名"  min-width="124">
              </el-table-column>
              <el-table-column prop="phone" label="联系电话" min-width="118">
              </el-table-column>
              <el-table-column prop="userType" label="用户类型" min-width="172">
              </el-table-column>
              <el-table-column prop="lockStatus" label="用户状态" min-width="90">
                    <template scope="props">
                        {{props.row.lockStatus | lockStatusToText}}
                    </template>
              </el-table-column>
              <el-table-column prop="createDate" label="注册时间" min-width="162">
                    <template scope="props">
                        {{props.row.createDate}}
                    </template>
              </el-table-column>
              <el-table-column prop="modifyDate" label="修改时间" min-width="162">
                    <template scope="props">
                        {{props.row.modifyDate}}
                    </template>
              </el-table-column>
              <el-table-column prop="loginLastDate" label="最后登录时间" min-width="162">
                    <template scope="props">
                        {{props.row.loginLastDate}}
                    </template>
              </el-table-column>
              <el-table-column prop="userDesc" label="备注" min-width="130">
              </el-table-column>
              <el-table-column label="操作" fixed="right" min-width="130">
                <template scope="props">
                <div class="btn-in-table">
                    <a href="javascript:;" class="s-blue" @click="editUser(props.row)">
                        修改
                    </a>
                    <a href="javascript:;" class="s-blue" @click="editUser1(props.row)">
                        分配角色
                    </a>
                    <a v-if="props.row.superFlag == 2" href="javascript:;" class="s-blue" @click="editUser2(props.row)" style="margin-left: 0;">
                        设置关联用户
                    </a>
                </div>
                </template>
              </el-table-column>
          </el-table>
     </div>
    <div class="xe-pagination-panel">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNum"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageInfo.pageSize"
            layout="total, prev, pager, next, sizes, jumper"
            :total="pageInfo.total">
        </el-pagination>
    </div>
      <!--新增弹框-->
      <div class="reset-dialog addMember">
          <el-dialog class="error-tishi" :title="alertTit" :visible.sync="dialogVisible">
              <sysUserListAddnew @selectGo="selectGo" :userType="userType" :dialogVisible = 'dialogVisible' :filterForm="filterForm"></sysUserListAddnew>
          </el-dialog>
      </div>
      <!--用户修改弹框-->
      <!-- <el-dialog :title="alertTit" :visible.sync="dilogbut" class="reset-dialog dialog_wid340 error-tishi" @close="cancelReject(0)">
        <el-form ref="editForm" label-width="70px" :model=" editForm" :rules="editRules">
            <el-dialog class="error-tishi" title="新增用户" :visible.sync="dialogVisible">
              <sysUserListAddnew @selectGo="selectGo" :dialogVisible = 'dialogVisible' :filterForm="filterForm"></sysUserListAddnew>
          </el-dialog>
        </el-form>
      </el-dialog> -->
      <!--分配角色弹框-->
      <el-dialog :title="alertTit1" :visible.sync="dilogbut1" class="reset-dialog dialog_wid700 error-tishi" @close="cancelReject(1)">
        <div>
            <!-- {{multipleSelection}} -->
        </div>
        <el-table highlight-current-row style="width: 100%" ref="roleList" border @selection-change="handleSelectionChange" :data="roleList">
            <el-table-column type="selection" min-width="40" class-name="selectionTd">
            </el-table-column>
            <el-table-column label="角色名称"  min-width="124" prop="roleName">
            </el-table-column>
            <el-table-column label="角色描述" min-width="172" prop="roleDesc">
                <template scope="props">
                    {{props.row.roleDesc}}
                </template>
            </el-table-column>
        </el-table>
        <div class="el-dialog__footer">
            <el-button type="primary"  @click="saveAllotRole">保存</el-button>
            <el-button @click.stop="cancelReject(1)">取 消</el-button>
        </div>
        </el-form>
      </el-dialog>
      <!--设置关联用户弹窗-->
      <el-dialog :visible.sync="dialogTableVisible" title="设置关联用户" ref="dialogTableVisible" class="zw-resetDialog-w500 rolePaneBox">
          <userDistCon :itemData="userListArr"></userDistCon>
          <div class="dialog__footers">
              <el-button type="primary"  @click="userDispach">保存</el-button>
              <el-button @click.stop="dialogTableVisible = false">取 消</el-button>
          </div>
      </el-dialog>
  </div>
</template>

<script>
    import {lockStatus00} from '@/dataControl.js';
    import sysUserListAddnew from './sysUserListAddnew';
    import userDistCon from './userDistCon';
    import { millisecondFormat } from 'utils';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            var regName = (rule, value, callback) => {
                if (value) {
                    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('用户姓名只能输入汉字，数字，字母'));
                    }
                } else {
                    return callback(new Error('用户姓名不能为空'));
                }
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    callback();
                } else {
                    let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{5,20}$/;
                    if (reg.test(value)) {
                        callback();
                    } else {
                        return callback(new Error('密码为5-20位数字和字母组合'));
                    }
                }
            };
            var checkPasswordAgain = (rule, value, callback) => {
                if (this.editForm.pwd) {
                    if (value !== this.editForm.pwd) {
                        callback(new Error('密码与新密码不一致'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
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
            let self = this;
            return {
                editRules: {
                    userName: [
                        {required: true, validator: regName, trigger: 'blur'}
                    ],
                    pwd: [
                        { validator: checkPassword, trigger: 'blur' }
                    ],
                    pwdconfirm: [
                        { validator: checkPasswordAgain, trigger: 'blur' }
                    ],
                    userDesc: [
                        { validator: userDescFn, trigger: 'blur' }
                    ]
                },
                userType: 'new',
                filterForm: {
                    loginName: '',
                    userName: '',
                    phone: '',
                    pwd: '',
                    email: '',
                    gender: 1,
                    userType: '',
                    lockStatus: 1,
                    userDesc: '',
                    provinceName: '',
                    cityName: '',
                    areaName: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    saleAreaIds: []
                },
                searchform: {
                    lockStatus: '',
                    loginName: '',
                    userName: '',
                    startDate: '',
                    endDate: ''
                },
                editForm: {
                    userId: '',
                    userName: '',
                    pwd: '',
                    pwdconfirm: '',
                    userDesc: ''
                },
                value1: '',
                value2: '',
                userList: [],
                alertTit: '用户新增',
                alertTit1: '分配角色',
                dilogbut: false,
                dilogbut1: false,
                roleList: [],
                multipleSelection00: [],
                multipleSelection: [],
                tpmuserId: '',
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                dialogVisible: false,
                pickerOptionStart: {
                    disabledDate(time) {
                        return self.value2 ? time.getTime() < self.value2.getTime() - maxDate || time.getTime() > self.value2.getTime() : false;
                    }
                },
                pickerOptionEnd: {
                    disabledDate(time) {
                        return self.value1 ? time.getTime() > self.value1.getTime() + maxDate || time.getTime() < self.value1.getTime() : false;
                    }
                },
                dialogTableVisible: false,
                userListArr: [],
                tmpuserId: ''
            };
        },
        created() {
            this.enquiryForm(1, this.searchform);
        },
        methods: {
            editUser2(row) {
                this.dialogTableVisible = true;
                this.tmpuserId = row.userId;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/user/erp/queryRelationUserList',
                    data: {
                        userId: row.userId
                    }
                }).then(res => {
                    console.log(res);
                    this.userListArr = res.data.userList;
                }).catch(error => {
                    console.log(error);
                });
            },
            userDispach() {
                let userFormList = [];
                this.userListArr.forEach(item => {
                    item.userList.forEach(uitem => {
                        if (uitem.selected === 1) {
                            let obj = {
                                userCode: item.userCode,
                                userId: uitem.userId
                            };
                            userFormList.push(obj);
                        }
                    });
                });
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/user/erp/modifyRelationUser',
                    data: {
                        userId: this.tmpuserId,
                        userFormList: userFormList
                    }
                }).then(res => {
                    console.log(res);
                    this.dialogTableVisible = false;
                    this.$xeMessage.success('设置成功');
                }).catch(error => {
                    console.log(error);
                });
            },
            onSubmit() {
                this.enquiryForm(1, this.searchform);
            },
            startDateFn(val) {
                this.startDates = val;
                this.value2 = this.value1;
                if (!this.value2) {
                    this.value2 = this.value1;
                }
            },
            endDateFn(val) {
                this.endDates = val;
                if (!this.value1) {
                    this.value1 = this.value2;
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.value1 = '';
                this.value2 = '';
                this.enquiryForm(1, this.searchform);
            },
            enquiryForm(pageNum, searchform) {
                let data = {};
                data = searchform;
                if (!this.startDates) {
                    if (this.value1) {
                        data.startDate = millisecondFormat(this.value1.getTime(), 'ms');
                    } else {
                        data.startDate = '';
                    }
                }
                if (!this.endDates) {
                    if (this.value2) {
                        data.endDate = millisecondFormat(this.value2.getTime(), 'ms');
                    } else {
                        data.endDate = '';
                    }
                }
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-rms/user/erp/queryUserList',
                    data: data
                }).then((res) => {
                    this.userList = res.data.userList;
                    this.pageInfo = res.data.pageInfo;
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            },
            editUser(row) {
                this.userType = 'edit';
                this.alertTit = '用户修改';
                let param = {
                    userId: row.userId
                };
                this.$http({ // 查询可用角色列表
                    method: 'post',
                    url: '/xe-route/xe-rms/user/erp/querySingleUser',
                    data: param
                }).then((res) => {
                    this.filterForm = res.data.user;
                    this.filterForm.saleAreaIds = [];
                    if (this.filterForm.provinceId) {
                        this.filterForm.saleAreaIds = [this.filterForm.provinceId, this.filterForm.cityId, this.filterForm.areaId];
                    };
                    this.dialogVisible = true;
                }).catch((error) => {
                    console.log(error);
                });
                // this.editForm.loginName = row.loginName;
                // this.editForm.userId = row.userId;
                // this.editForm.userName = row.userName;
                // this.editForm.userDesc = row.userDesc;
                // this.editForm.pwd = '';
                // this.editForm.pwdconfirm = '';
                // this.dilogbut = true;
            },
            saveModify(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = this.editForm;
                        this.$http({ // 查询可用角色列表
                            method: 'post',
                            url: '/xe-route/xe-rms/user/erp/modify',
                            data: param
                        }).then((res) => {
                            this.cancelReject(0);
                            this.$xeMessage.success(res.msg);
                            this.enquiryForm(this.pageInfo.pageNum, this.searchform);
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            handleSelectionChange00(val) {
                console.log('testvals', val);
                this.multipleSelection00 = val;
            },
            statusChange(type) {
                // 0 去启用
                let _this = this;
                if (this.multipleSelection00.length === 0) {
                    if (type === 0) {
                        this.$xeMessage.warning('请先选择需要启用的用户');
                    } else if (type === 1) {
                        this.$xeMessage.warning('请先选择需要禁用的用户');
                    } else {
                        this.$xeMessage.warning('请先选择需要删除的用户');
                    }
                    return false;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection00.forEach(function(value) {
                    if (type !== 1) { // 去启用去删除
                        if (value.lockStatus === 2) {
                            checkInfoObj.formSupInfoArr.push(value.userId);
                        } else {
                            checkInfoObj.disArr.push(value.userId);
                        };
                    } else {
                        if (value.lockStatus === 1) {
                            checkInfoObj.formSupInfoArr.push(value.userId);
                        } else {
                            checkInfoObj.disArr.push(value.userId);
                        };
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    if (type === 0) {
                        this.$xeMessage.warning('没有可以提交的可以启用的用户,请检查启用的用户状态');
                    } else if (type === 1) {
                        this.$xeMessage.warning('没有可以提交的可以禁用的用户,请检查启用的用户状态');
                    } else {
                        this.$xeMessage.warning('没有可以提交的可以删除的用户,请检查启用的用户状态');
                    }
                    return false;
                }
                if (type === 0) {
                    checkInfoObj.tips = '仅接收用户状态为“禁用”的用户，其他状态将会自动过滤';
                    checkInfoObj.url = '/xe-route/xe-rms/user/erp/enabled';
                } else if (type === 1) {
                    checkInfoObj.tips = '仅接收用户状态为“启用”的用户，其他状态将会自动过滤';
                    checkInfoObj.url = '/xe-route/xe-rms/user/erp/disable';
                } else {
                    checkInfoObj.tips = '仅接收用户状态为“禁用”的用户，其他状态将会自动过滤';
                    checkInfoObj.url = '/xe-route/xe-rms/user/erp/del';
                }
                checkInfoObj.title = {
                    0: '启用',
                    1: '禁用',
                    2: '删除'
                };
                this.$confirm(checkInfoObj.tips, checkInfoObj.title[type], {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({ // 查询可用角色列表
                        method: 'post',
                        url: checkInfoObj.url,
                        data: {
                            userIdList: checkInfoObj.formSupInfoArr
                        }
                    }).then((res) => {
                        this.$xeMessage.success(res.msg);
                        this.enquiryForm(this.pageInfo.pageNum, this.searchform);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            editUser1(row) {
                this.tpmuserId = row.userId;
                this.$http({ // 查询可用角色列表
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/queryUsableRoleList',
                    data: {}
                }).then((res) => {
                    this.roleList = res.data.roleList;
                    let uniqObj = {};
                    row.roleIds.split(',').forEach(item => {
                        uniqObj[item] = 1;
                    });
                    this.$nextTick(() => {
                        for (let i = 0; i < this.roleList.length; i++) {
                            if (uniqObj[this.roleList[i].roleId]) {
                                this.multipleSelection.push(this.roleList[i]);
                                this.$refs.roleList.toggleRowSelection(this.roleList[i], true);
                            }
                        };
                    });
                }).catch((error) => {
                    console.log(error);
                });
                this.dilogbut1 = true;
            },
            handleSelectionChange(val) {
                console.log('testvals', val);
                this.multipleSelection = val;
            },
            saveAllotRole() {
                let param = {};
                param.userId = this.tpmuserId;
                param.roleIdList = [];
                this.multipleSelection.forEach(item => {
                    param.roleIdList.push(item.roleId);
                });
                this.$http({ // 用户分配角色
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/allotRole',
                    data: param
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    this.enquiryForm(this.pageInfo.pageNum, this.searchform);
                    this.cancelReject(1);
                }).catch((error) => {
                    console.log(error);
                });
            },
            cancelReject(type) { // close dialog
                if (type === 0) {
                    this.dilogbut = false;
                    this.editForm.loginName = '';
                    this.editForm.userId = '';
                    this.editForm.userName = '';
                    this.editForm.userDesc = '';
                    this.editForm.pwd = '';
                    this.editForm.pwdconfirm = '';
                } else {
                    this.dilogbut1 = false;
                }
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            },
            addUser() {
                this.userType = 'new';
                this.alertTit = '用户新增';
                this.filterForm = {
                    loginName: '',
                    userName: '',
                    phone: '',
                    pwd: '',
                    email: '',
                    gender: 1,
                    userType: '',
                    lockStatus: 1,
                    userDesc: '',
                    provinceName: '',
                    cityName: '',
                    areaName: '',
                    provinceId: '',
                    cityId: '',
                    areaId: '',
                    saleAreaIds: []
                };
                this.dialogVisible = true;
            },
            selectGo() {
                this.dialogVisible = false;
                this.enquiryForm(1, this.searchform);
            }
        },
        computed: {
            lockStatussList() {
                return lockStatus00;
            },
            startDates: {
                get() {
                    return this.searchform.startDate;
                },
                set(val) {
                    if (!val) {
                        this.searchform.startDate = '';
                    } else {
                        this.searchform.startDate = val;
                    }
                }
            },
            endDates: {
                get() {
                    return this.searchform.endDate;
                },
                set(val) {
                    if (!val) {
                        this.searchform.endDate = '';
                    } else {
                        this.searchform.endDate = val;
                    }
                }
            }
        },
        components: {
            sysUserListAddnew,
            userDistCon
        }
    };
</script>

<style lang="scss">
    .addMember .el-dialog--small{
        max-width:540px;
    }
    .dialog_wid700 .el-dialog--small{
        max-width:700px;
        padding:0 20px 30px;
    }
    .data-bor {
        padding: 0 5px;
    }
</style>
