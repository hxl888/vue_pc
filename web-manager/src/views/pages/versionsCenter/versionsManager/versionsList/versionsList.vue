<template lang="html">
  <div class="m-router-con">
    <!-- <div class="u-top-search">
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
                <div class="form_seachBut">
                  <el-form-item>
                      <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                      <el-button @click="resetForm('searchform')">重置</el-button>
                  </el-form-item>
                </div>
        </el-form>
    </div> -->
     <div class="u-opera-btnBox">
          <el-button class="xe-button-normal" @click="addUser">
              <span class="iconfont icon-xinzeng"></span> 添加版本
          </el-button>
          <!-- <el-button class="xe-button-normal" @click="statusChange(0)">
              <span class="iconfont icon-qiyong"></span> 启用
          </el-button>
          <el-button class="xe-button-normal" @click="statusChange(1)">
              <span class="iconfont icon-jinyong"></span> 禁用
          </el-button>
          <el-button class="xe-button-normal">
              <span class="iconfont icon-daochu"></span> 导出
          </el-button>
          <el-button class="xe-button-normal" @click="statusChange(2)">
              <span class="iconfont icon-shanchu"></span> 删除
          </el-button> -->
     </div>
     <div class="goodsTable">
          <el-table highlight-current-row style="width: 100%" border :data="roleList" @selection-change="handleSelectionChange">
              <!-- <el-table-column type="selection" min-width="40" class-name="selectionTd">
              </el-table-column> -->
              <el-table-column
                label=""
                class-name="td-index"
                width="50">
                <template scope="props">
                    <span>{{props.$index + 1}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="versionId" label="版本ID"  min-width="124">
              </el-table-column>
              <el-table-column prop="versionName" label="版本名称" min-width="134">
              </el-table-column>
              <el-table-column prop="feeFlag" label="是否收费" min-width="134">
                <template scope="props">
                    {{props.row.feeFlag | feeFlagToText}}
                </template>
              </el-table-column>
              <el-table-column prop="feeStandard" label="收费标准/年" min-width="134">
                <template scope="props">
                    {{props.row.feeStandard | priceToText}}
                </template>
              </el-table-column>
              <el-table-column label="操作" min-width="170">
                  <template scope="props">
                    <div class="btn-in-table">
                      <a href="javascript:;" class="s-blue" @click="editUser2(props.row)">
                          修改
                      </a>
                      <a href="javascript:;" class="s-blue" @click="editUser1(props.row)">
                          配置
                      </a>
                      <a href="javascript:;" v-if="props.row.defaultFlag === 1" class="s-blue" @click="editUser(props.row)">
                          设为默认版
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
          <el-dialog class="error-tishi" title="添加版本" :visible.sync="dialogVisible">
              <versionListAddnew @selectGo="selectGo" :dialogVisible = 'dialogVisible'></versionListAddnew>
          </el-dialog>
      </div>
      <!--用户修改弹框-->
      <el-dialog :title="alertTit" :visible.sync="dilogbut" class="reset-dialog dialog_wid340 error-tishi" @close="cancelReject(0)">
        <el-form ref="editForm" label-width="70px" :model=" editForm" :rules="editRules">
          <el-form-item label="版本id" style="margin-bottom: 10px!important">
            <div>{{editForm.versionId}}</div>
          </el-form-item>
          <el-form-item label="版本名称" prop="versionName" required>
                <el-input size="small" class="xe-input-col2" v-model="editForm.versionName" placeholder="请输入版本名称"></el-input>
            </el-form-item>
            <el-form-item label="收费标准" prop="feeStandard">
                <el-input size="small" style="width: 170px;" class="xe-input-col2" :maxlength="7" @blur="numberFix($event, 2)" placeholder="请输入收费标准" v-model="editForm.feeStandard"></el-input> ／年
            </el-form-item>
            <div>
                <el-form-item label="是否收费" prop="feeFlag">
                    <el-radio-group v-model="editForm.feeFlag" @change="feeChange">
                        <el-radio v-for="(item, index) in feeFlagList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                    </el-radio-group>
                </el-form-item>
            </div>
          <div class="el-dialog__footer">
            <el-button type="primary"  @click="saveModify('editForm')">保存</el-button>
            <el-button @click.stop="cancelReject(0)">取 消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <!--角色分配权限-->
      <el-dialog title="分配权限" :visible.sync="dialogTableVisible" class="zw-resetDialog-w850">
          <div v-loading="authDisFlag">
              <authDistCon :itemData="authData"></authDistCon>
              <div class="dialog__footers">
                  <el-button type="primary"  @click="authDispach">保存</el-button>
                  <el-button @click.stop="dialogTableVisible = false">取 消</el-button>
              </div>
          </div>
      </el-dialog>
  </div>
</template>

<script>
    import authDistCon from './authDistCon';
    import versionListAddnew from './versionListAddnew';
    import {feeFlag} from '@/dataControl.js';
    export default {
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
                if (this.editForm.feeFlag === 2) {
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
                editRules: {
                    versionName: [
                        {required: true, validator: regName, trigger: 'blur'}
                    ],
                    feeStandard: [
                        { validator: feeStandard, trigger: 'blur' }
                    ]
                },
                searchform: {
                    // roleName: '',
                    // roleId: '',
                    // startDate: '',
                    // endDate: '',
                    // lockStatus: ''
                },
                value1: '',
                value2: '',
                alertTit: '修改版本',
                dilogbut: false,
                roleList: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tpmroleId: '',
                editForm: {
                    versionId: '',
                    versionName: '',
                    feeFlag: '',
                    feeStandard: ''
                },
                multipleSelection: [],
                dialogVisible: false,
                dialogTableVisible: false,
                authData: [],
                productUrl: '/xe-route/xe-mis',
                authDisFlag: false
            };
        },
        created() {
            this.enquiryForm(1, this.searchform);
        },
        methods: {
            // onSubmit() {
            //     this.enquiryForm(1, this.searchform);
            // },
            // resetForm(formName) {
            //     this.$refs[formName].resetFields();
            //     this.enquiryForm(1, this.searchform);
            // },
            numberFix(event, number, type) {
                let val = parseFloat(event.target.value);
                if (!(val > 0)) {
                    val = '';
                } else {
                    val = val.toFixed(number);
                }
                event.target.value = val;
                this.editForm.feeStandard = val;
            },
            feeChange() {
                this.$refs.editForm.validateField('feeStandard');
            },
            enquiryForm(pageNum, searchform) {
                let data = {};
                data = searchform;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-rms/erp/version/queryList',
                    data: data
                }).then((res) => {
                    this.roleList = res.data.versionList;
                    this.pageInfo = res.data.pageInfo;
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            },
            editUser2(row) {
                this.editForm.versionId = row.versionId;
                this.editForm.versionName = row.versionName;
                this.editForm.feeFlag = row.feeFlag;
                this.editForm.feeStandard = row.feeStandard;
                this.dilogbut = true;
            },
            saveModify(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = this.editForm;
                        if (param.feeFlag === 1) {
                            param.feeStandard = 0;
                        }
                        this.$http({ // 查询可用角色列表
                            method: 'post',
                            url: '/xe-route/xe-rms/erp/version/modify',
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
            editUser(row) {
                this.$confirm('确定要把当前版本设为默认版？', '确认设为默认版', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({ // 查询菜单树
                        method: 'post',
                        url: '/xe-route/xe-rms/erp/version/setVerDef',
                        data: {
                            versionId: row.versionId
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
                    this.editForm.versionId = '';
                    this.editForm.versionName = '';
                    this.editForm.feeFlag = '';
                    this.editForm.feeStandard = '';
                } else {
                    this.dilogbut1 = false;
                }
            },
            editUser1(row) {
                console.log('rows', row.versionId + '分配权限');
                this.tpmversionId = row.versionId; // 存下当前rowId
                this.$http({ // 查询菜单树
                    method: 'post',
                    url: '/xe-route/xe-rms/erp/version/queryDeployList',
                    data: {
                        versionId: row.versionId
                    }
                }).then((res) => {
                    this.authData = res.data.versionList;
                    this.dialogTableVisible = true;
                }).catch((error) => {
                    console.log(error);
                });
                this.dilogbut1 = true;
            },
            authDispach() {
                // 确定分配权限
                this.authDisFlag = true;
                let acIdList = this.getAuthCheckedIds();
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/erp/version/modifyAction',
                    data: {
                        versionId: this.tpmversionId,
                        acIdList: acIdList
                    }
                }).then(res => {
                    console.log(res);
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
            feeFlagList() {
                return feeFlag;
            }
        },
        components: {
            versionListAddnew,
            authDistCon
        }
    };
</script>

<style lang="scss">
</style>
