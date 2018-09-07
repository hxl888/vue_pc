<template lang="html">
  <div class="m-router-con">
    <div class="u-top-search">
        <el-form ref="searchform" :model="searchform" :inline="true">
                <el-form-item prop="lockStatus">
                    <el-select size="small" class="xe-input-l40" placeholder="角色状态" v-model="searchform.lockStatus">
                        <el-option v-for="item in lockStatussList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="roleName">
                  <el-input placeholder="角色名称" class="xe-input-l40" v-model="searchform.roleName"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="roleId">
                  <el-input placeholder="角色ID" class="xe-input-l40" v-model="searchform.roleId"></el-input>
                </el-form-item> -->
                <el-form-item label="" class="marR0">
                    <el-date-picker
                        ref="startDate"
                        v-model="value1"
                        type="datetime"
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
              <span class="iconfont icon-xinzeng"></span> 添加角色
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
          <el-table highlight-current-row style="width: 100%" border :data="roleList" @selection-change="handleSelectionChange">
              <el-table-column type="selection" min-width="40" class-name="selectionTd" fixed="left">
              </el-table-column>
              <el-table-column prop="roleId" label="角色ID"  min-width="124">
              </el-table-column>
              <el-table-column prop="roleName" label="角色名" min-width="134">
              </el-table-column>
              <el-table-column prop="lockStatus" label="角色状态" min-width="90">
                <template scope="props">
                    {{props.row.lockStatus | lockStatusToText}}
                </template>
              </el-table-column>
              <el-table-column prop="createDate" label="创建时间" min-width="162">
                  <template scope="props">
                      {{props.row.createDate | millisecondFormat('ms')}}
                  </template>
              </el-table-column>
              <el-table-column prop="userCount" label="分配用户总数" min-width="118">
                <template scope="props">
                    <div>
                        {{props.row.userCount | noneToText}}
                    </div>
                </template>
              </el-table-column>
              <el-table-column prop="roleDesc" label="角色描述" min-width="360">
              </el-table-column>
              <el-table-column label="操作" fixed="right" min-width="170">
                  <template scope="props">
                    <div class="btn-in-table">
                      <a href="javascript:;" class="s-blue" @click="editUser(props.row)">
                          修改
                      </a>
                      <a href="javascript:;" class="s-blue" @click="editUser1(props.row)">
                          分配权限
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
          <el-dialog class="error-tishi" title="新增角色" :visible.sync="dialogVisible">
              <roleListAddnew @selectGo="selectGo" :dialogVisible = 'dialogVisible'></roleListAddnew>
          </el-dialog>
      </div>
      <!--角色修改弹框-->
      <el-dialog :title="alertTit" :visible.sync="dilogbut" class="reset-dialog dialog_wid340 error-tishi" @close="cancelReject(0)">
        <el-form ref="editForm" label-width="70px" :model="editForm" :rules="editRules">
          <el-form-item label="角色ID">
            <div>{{editForm.roleId}}</div>
          </el-form-item>
          <el-form-item prop="roleName" label="角色名称">
            <el-input class="xe-input-col2" v-model="editForm.roleName" :maxlength="30" placeholder=""></el-input>
          </el-form-item>
          <el-form-item prop="roleDesc" label="角色描述">
            <el-input class="xe-input-col2" v-model="editForm.roleDesc" :maxlength="30" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="lockStatus">
              <el-radio-group v-model="editForm.lockStatus">
                  <el-radio v-for="(item, index) in lockStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
              </el-radio-group>
          </el-form-item>
          <div class="dialog__footers" style="text-align: center">
            <el-button type="primary"  @click="saveModify('editForm')">保存</el-button>
            <el-button @click.stop="cancelReject(0)">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!--角色分配权限-->
      <el-dialog :visible.sync="dialogTableVisible" ref="dialogTableVisible" class="zw-resetDialog-w850 rolePaneBox">
        <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="功能权限" name="first">
                <div v-loading="authDisFlag">
                    <authDistCon :itemData="authData"></authDistCon>
                    <div class="dialog__footers">
                        <el-button type="primary"  @click="authDispach">保存</el-button>
                        <el-button @click.stop="dialogTableVisible = false">取 消</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="区域权限" name="second">
                <div>
                    <useAreaList ref="useAreaList"
                        :defaultData="roleAreaList"
                        @on-result-change="resultChanges">
                    </useAreaList>
                    <h4 class="areaSelectTit">已选区域</h4>
                    <!-- {{areaTags}} -->
                    <!-- useArea: {{useArea}} -->
                    <div class="areaSelectedBox">
                        <el-tag
                            :key="tag.areaId"
                            v-for="(tag, index) in areaTags"
                            :closable="true"
                            :close-transition="true"
                            @close="tagHandleClose(tag, index)"
                        >
                            {{tag.areaName}}
                        </el-tag>
                    </div>
                    <div style="margin-top: 20px; text-align: center;">
                        <el-button @click="roleSureBtn" type="primary">确定</el-button>
                        <el-button @click="dialogTableVisible = false">取消</el-button>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="仓库权限" name="third">
                <div>
                    <el-checkbox-group v-model="checkList">
                        <!-- {{checkList}} -->
                        <ul class="clearfix checkStorage" v-if="storeList.length" style="padding-bottom: 10px;">
                            <!-- {{storeList}} -->
                            <li v-for="item in storeList" :key="item.storeId">
                                <el-checkbox :label="item.storeId">{{item.storeName}}</el-checkbox>
                            </li>
                        </ul>
                        <ul v-else>
                            <li style="text-align: center;padding: 10px 0 20px">
                                暂无仓库数据
                            </li>
                         </ul>
                    </el-checkbox-group>
                    <div class="dialog__footers">
                        <el-button type="primary"  @click="storeSave"  v-show="storeList.length">保存</el-button>
                        <el-button @click.stop="dialogTableVisible = false">取 消</el-button>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
      </el-dialog>
  </div>
</template>

<script>
    import authDistCon from './authDistCon';
    import useAreaList from 'components/useAreaList/useAreaList';
    import {lockStatus02, lockStatus01} from '@/dataControl.js';
    import { millisecondFormat } from 'utils';
    import roleListAddnew from './roleListAddnew';
    let maxDate = 90 * 24 * 60 * 60 * 1000;
    export default {
        data() {
            let self = this;
            var regName = (rule, value, callback) => {
                if (value) {
                    let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+$/;
                    if (reg.test(value)) {
                        this.validateNameCk(() => {
                            callback();
                        }, (err) => {
                            callback(new Error(err.msg));
                        });
                    } else {
                        return callback(new Error('角色名称只能输入汉字，数字，字母'));
                    }
                } else {
                    return callback(new Error('角色名称不能为空'));
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
                editRules: {
                    roleName: [
                        {required: true, validator: regName, trigger: 'blur'}
                    ],
                    userDesc: [
                        { validator: userDescFn, trigger: 'blur' }
                    ]
                },
                areaTags: [],
                userCodeTmp: '',
                useArea: [],
                activeName2: 'first',
                roleAreaList: [],
                searchform: {
                    roleName: '',
                    // roleId: '',
                    startDate: '',
                    endDate: '',
                    lockStatus: ''
                },
                value1: '',
                value2: '',
                alertTit: '角色修改',
                dilogbut: false,
                roleList: [],
                checkList: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tpmroleId: '',
                storeList: [],
                editForm: {
                    roleId: '',
                    roleName: '',
                    roleDesc: '',
                    lockStatus: ''
                },
                multipleSelection: [],
                dialogVisible: false,
                dialogTableVisible: false,
                authData: [],
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
                authDisFlag: false
            };
        },
        created() {
            this.enquiryForm(1, this.searchform);
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.dialogTableVisible.$data.rendered = true;
            });
        },
        methods: {
            onSubmit() {
                this.enquiryForm(1, this.searchform);
            },
            handleClick(tab) {
                this.loadPane(tab.name);
            },
            resultChanges(data) {
                console.log('testdataresultChanges', data);
                this.areaTags = data.resultTexts;
                this.useArea = data.resultIds;
            },
            tagHandleClose(tag, index) {
                console.log(tag);
                this.$refs.useAreaList.removeData(tag.areaId, () => {
                    this.areaTags.splice(index, 1);
                });
            },
            roleSureBtn() {
                let resultData = this.$refs.useAreaList.getDataResult();
                console.log(resultData);
                this.areaTags = resultData.resultTexts;
                this.useArea = resultData.resultIds;
                let data = {
                    areaIdArr: this.useArea,
                    roleId: this.tpmroleId
                };
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/venSys/editRoleArea',
                    data: data
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    this.dialogTableVisible = false;
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
                this.dialogTableVisible = false;
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
                        data.startDate = millisecondFormat(this.value1.getTime());
                    }
                }
                if (!this.endDates) {
                    if (this.value2) {
                        data.endDate = millisecondFormat(this.value2.getTime());
                    }
                }
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/queryRoleList',
                    data: data
                }).then((res) => {
                    this.roleList = res.data.roleList;
                    this.pageInfo = res.data.pageInfo;
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            },
            editUser(row) {
                this.editForm.roleId = row.roleId;
                this.editForm.roleDesc = row.roleDesc;
                this.editForm.lockStatus = row.lockStatus;
                this.editForm.roleName = row.roleName;
                this.dilogbut = true;
            },
            saveModify(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = this.editForm;
                        this.$http({ // 查询可用角色列表
                            method: 'post',
                            url: '/xe-route/xe-rms/oauth/erp/modifyRole',
                            data: param
                        }).then((res) => {
                            let _this = this;
                            this.cancelReject(0);
                            this.$xeMessage.success(res.msg);
                            setTimeout(function () {
                                _this.enquiryForm(_this.pageInfo.pageNum, _this.searchform);
                            }, 300);
                        }).catch((error) => {
                            console.log(error);
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            statusChange(type) {
                // 0 去启用
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    if (type === 0) {
                        this.$xeMessage.warning('请先选择需要启用的角色');
                    } else if (type === 1) {
                        this.$xeMessage.warning('请先选择需要禁用的角色');
                    } else {
                        this.$xeMessage.warning('请先选择需要删除的角色');
                    }
                    return false;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection.forEach(function(value) {
                    if (type !== 1) { // 去启用去删除
                        if (value.lockStatus === 2) {
                            checkInfoObj.formSupInfoArr.push(value.roleId);
                        } else {
                            checkInfoObj.disArr.push(value.roleId);
                        };
                    } else {
                        if (value.lockStatus === 1) {
                            checkInfoObj.formSupInfoArr.push(value.roleId);
                        } else {
                            checkInfoObj.disArr.push(value.roleId);
                        };
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    if (type === 0) {
                        this.$xeMessage.warning('没有可以提交的可以启用的角色,请检查启用的角色状态');
                    } else if (type === 1) {
                        this.$xeMessage.warning('没有可以提交的可以禁用的角色,请检查禁用的角色状态');
                    } else {
                        this.$xeMessage.warning('没有可以提交的可以删除的角色,请检查删除的角色状态');
                    }
                    return false;
                };
                if (type === 0) {
                    checkInfoObj.tips = '是否确认启用';
                    checkInfoObj.url = '/xe-route/xe-rms/oauth/erp/enabledRole';
                } else if (type === 1) {
                    checkInfoObj.tips = '是否确认禁用';
                    checkInfoObj.url = '/xe-route/xe-rms/oauth/erp/disableRole';
                } else {
                    checkInfoObj.tips = '是否确认删除';
                    checkInfoObj.url = '/xe-route/xe-rms/oauth/erp/delRole';
                };
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
                            roleIdList: checkInfoObj.formSupInfoArr
                        }
                    }).then((res) => {
                        let _this = this;
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.enquiryForm(_this.pageInfo.pageNum, _this.searchform);
                        }, 300);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            cancelReject(type) { // close dialog
                if (type === 0) {
                    this.dilogbut = false;
                    this.editForm.roleId = '';
                    this.editForm.roleDesc = '';
                    this.editForm.lockStatus = '';
                    this.editForm.userDesc = '';
                    this.editForm.roleName = '';
                } else {
                    this.dilogbut1 = false;
                }
            },
            editUser1(row) {
                console.log('rows', row.roleId + '分配权限');
                // this.$refs.useAreaList.initData2();
                this.tpmroleId = row.roleId; // 存下当前rowId
                this.activeName2 = 'first';
                this.loadPane('first');
                this.dialogTableVisible = true;
            },
            loadPane(val) {
                if (val === 'first') {
                    // 1
                    this.$http({ // 查询菜单树
                        method: 'post',
                        url: '/xe-route/xe-rms/oauth/erp/queryRoleActionList',
                        data: {
                            roleId: this.tpmroleId
                        }
                    }).then((res) => {
                        this.authData = res.data.actionTreeList;
                    }).catch((error) => {
                        console.log(error);
                    });
                };
                if (val === 'second') {
                    // 2
                    console.log('testthis.$refs.useAreaList', this.$refs.useAreaList);
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/venSys/queryRoleArea',
                        data: {
                            roleId: this.tpmroleId
                        }
                    }).then((res) => {
                        // this.authData = res.data.areaList;
                        let roleAreaList = res.data.roleAreaData.areaList;
                        if (roleAreaList !== '' && roleAreaList.length > 0) {
                            // 覆盖区域选择组件回显
                            let result = {
                                resultIds: [],
                                resultTexts: []
                            };
                            roleAreaList.forEach(item => {
                                if (item.areaCheckBoxFlag === 1) {
                                    result.resultIds.push(item.areaId);
                                    let obj = {
                                        areaId: `${item.areaId}`,
                                        areaName: `${item.areaName}`
                                    };
                                    result.resultTexts.push(obj);
                                } else {
                                    item.areaList.forEach(citem => {
                                        if (citem.areaCheckBoxFlag === 1) {
                                            result.resultIds.push(citem.areaId);
                                            let obj = {
                                                areaId: `${item.areaId}-${citem.areaId}`,
                                                areaName: `${item.areaName}-${citem.areaName}`
                                            };
                                            result.resultTexts.push(obj);
                                        } else {
                                            if (citem.areaCheckBoxFlag === 2 && citem.areaList && citem.areaList.length > 0) {
                                                citem.areaList.forEach(aitem => {
                                                    if (aitem.areaCheckBoxFlag === 1) {
                                                        result.resultIds.push(aitem.areaId);
                                                        let obj = {
                                                            areaId: `${item.areaId}-${citem.areaId}-${aitem.areaId}`,
                                                            areaName: `${item.areaName}-${citem.areaName}-${aitem.areaName}`
                                                        };
                                                        result.resultTexts.push(obj);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                }
                            });
                            this.areaTags = result.resultTexts;
                            this.useArea = result.resultIds;
                            console.log(roleAreaList);
                        } else {
                            this.areaTags = [];
                            this.useArea = [];
                        }
                        this.roleAreaList = res.data.roleAreaData.areaList;
                        // this.$refs.useAreaList.resetData(this.areaTags);
                    }).catch((error) => {
                        console.log(error);
                    });
                };
                if (val === 'third') {
                    // 3
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-erp/venSys/queryRoleStore',
                        data: {
                            roleId: this.tpmroleId
                        }
                    }).then((res) => {
                        this.storeList = res.data.roleStoreData;
                        let storeIdArr = [];
                        this.storeList.forEach((item) => {
                            if (item.checkedFlag) {
                                storeIdArr.push(item.storeId);
                            }
                        });
                        this.checkList = storeIdArr;
                    });
                };
            },
            storeSave() {
                let param = {};
                param.roleId = this.tpmroleId;
                param.storeIdArr = this.checkList;
                this.authDisFlag = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/venSys/saveRS',
                    data: param
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                    this.authDisFlag = false;
                    this.dialogTableVisible = false;
                });
            },
            authDispach() {
                // 确定分配权限
                this.authDisFlag = true;
                let acIdList = this.getAuthCheckedIds();
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/allotAction',
                    data: {
                        roleId: this.tpmroleId,
                        acIdList: acIdList
                    }
                }).then(res => {
                    console.log(res);
                    this.$xeMessage.success(res.msg);
                    this.authDisFlag = false;
                    this.dialogTableVisible = false;
                }).catch(error => {
                    console.log(error);
                    this.authDisFlag = false;
                });
            },
            getAuthCheckedIds() {
                let temResult = [];
                this.authData.forEach(item => {
                    if (item.actionList.length) {
                        item.actionList.forEach(secondItem => {
                            if (secondItem.actionList.length) {
                                secondItem.actionList.forEach(thirdItem => {
                                    if (thirdItem.oauthFlag === 1) {
                                        temResult.push(thirdItem.acId);
                                        if (thirdItem.actionList && thirdItem.actionList.length) {
                                            thirdItem.actionList.forEach(fourItem => {
                                                if (fourItem.oauthFlag === 1) {
                                                    temResult.push(fourItem.acId);
                                                }
                                            });
                                        }
                                    }
                                });
                            }
                        });
                    }
                });
                return temResult;
            },
            validateNameCk(suc, err) {
                let params = {};
                params.roleName = this.editForm.roleName;
                params.roleId = this.editForm.roleId;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/sys/checkRole',
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
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            },
            handleSelectionChange(val) {
                console.log('testvals', val);
                this.multipleSelection = val;
            },
            addUser() {
                this.dialogVisible = true;
            },
            selectGo() {
                this.dialogVisible = false;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            }
        },
        computed: {
            lockStatussList() { // 下拉
                return lockStatus02;
            },
            lockStatusList() { // 单选
                return lockStatus01;
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
            useAreaList,
            roleListAddnew,
            authDistCon
        }
    };
</script>

<style lang="scss">
.rolePaneBox{
    h4{
        line-height: 36px;
        margin-top: 5px;
        font-size: 14px;
    }
    .el-tabs__nav {
        float: left;
        position: relative;
        transition: transform 0.3s ease 0s;
    }
    .el-tag{
        margin: 0 4px 4px 0;
    }
}
.checkStorage li{
    padding: 5px 0 7px 20px;
}
</style>
