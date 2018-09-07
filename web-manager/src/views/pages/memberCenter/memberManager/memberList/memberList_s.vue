<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="businessListings" ref="businessListings" class="demo-form-inline">
                <el-form-item prop="namePhoneEmail">
                    <el-input size="small" class="xe-input-l40" v-model="businessListings.namePhoneEmail" placeholder="查询用户名/绑定手机号/绑定邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="verifyFlag">
                    <el-select size="small" class="xe-input-l40" v-model="businessListings.verifyFlag" placeholder="验证状态">
                        <el-option
                          v-for="item in verificationStatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="freezeStatus">
                    <el-select size="small" class="xe-input-l40" v-model="businessListings.freezeStatus" placeholder="会员状态">
                        <el-option
                          v-for="item in freezeStatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="regSource">
                    <el-select size="small" class="xe-input-l40" v-model="businessListings.regSource" placeholder="注册来源">
                        <el-option
                          v-for="item in registeredSourceslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button type="primary" @click="onSubmit">查询</el-button>
                    <el-button  @click="resetForm('businessListings')">重置</el-button>
                    <el-button @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
             <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" :model="businessListings" ref="businessListings" class="demo-form-inline" label-width="73px">
                        <div>
                            <el-form-item prop="" label="注册时间" class='marR0'>
                                <el-date-picker
                                    size="small"
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="datetime"
                                    @change="startDateStrFn"
                                    placeholder="选择日期">
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="">
                                <el-date-picker
                                    size="small"
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="datetime"
                                    @change="endDateStrFn"
                                    placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="namePhoneEmail" label="用户名">
                                <el-input size="small" class="xe-input-168" v-model="businessListings.namePhoneEmail" placeholder="查询用户名/绑定手机号/绑定邮箱"></el-input>
                            </el-form-item>
                            <el-form-item label="验证状态" prop="verifyFlag">
                                <el-select size="small" v-model="businessListings.verifyFlag" class="xe-input-168" placeholder="验证状态">
                                    <el-option
                                        v-for="item in verificationStatuslist"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="会员状态" prop="freezeStatus">
                                <el-select size="small" v-model="businessListings.freezeStatus" class="xe-input-168" placeholder="会员状态">
                                    <el-option
                                        v-for="item in freezeStatuslist"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="注册来源" prop="regSource">
                                <el-select size="small" v-model="businessListings.regSource" class="xe-input-168" placeholder="注册来源">
                                    <el-option
                                        v-for="item in registeredSourceslist"
                                        :key="item.value"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="saleManNameAndPhone" label="业务员">
                                <el-input size="small" v-model="businessListings.saleManNameAndPhone" @blur="saleManNameCk" class="xe-input-168" placeholder="业务员手机号"></el-input>
                            </el-form-item>
                            <el-form-item prop="userTypeId" label="用户类型">
                                <el-select size="small" v-model="businessListings.userTypeId" class="xe-input-168" placeholder="用户类型">
                                    <el-option
                                        v-for="item in userTypelists"
                                        :key="item.typeId"
                                        :label="item.typeName"
                                        :value="item.typeId">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="店铺地址" prop="">
                                <area-select v-model="selecarea" :width="168"></area-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('businessListings')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="setAsideforTrial">
                <span class="iconfont icon-shenhebohui"></span> 验证不通过
            </el-button>
            <el-button class="xe-button-normal" @click="setasAudit">
                <span class="iconfont icon-renzheng"></span> 验证通过
            </el-button>
            <el-button class="xe-button-normal" @click="addNewpro">
                <span class="iconfont icon-xinzeng"></span> 添加会员
            </el-button>
            <el-button class="xe-button-normal" @click="frozenGood">
                <span class="iconfont icon-suo-xianxing"></span> 批量冻结
            </el-button>
            <el-button class="xe-button-normal" @click="thawGood">
                <span class="iconfont icon-jiesuo-xianxing"></span> 批量解冻
            </el-button>
            <el-button class="xe-button-normal" @click="setUpselfOperation">
                <span class="iconfont icon-piliangxiugaiyonghuleixing"></span> 批量修改用户类型
            </el-button>
            <el-button class="xe-button-normal" @click="modifySalesman">
                <span class="iconfont icon-piliangxiugaiyewuyuan"></span> 批量修改业务员
            </el-button>
             <el-button class="xe-button-normal" @click="screenSMS">
                <span class="iconfont icon-jinyong"></span> 屏蔽短信
            </el-button>
            <el-button class="xe-button-normal" @click="receiveSMS">
                <span class="iconfont icon-duanxin"></span> 接收短信
            </el-button>
            <el-button class="dyBtn xe-button-normal" @click="exportUserData">
                <span class="iconfont icon-daochu"></span> 导出
            </el-button>
        </div>
        <!--<div class="u-opera-btnBox" style="padding-top:0">-->
        <!--</div>-->
        <div class="goodsTable">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    v-loading="tableDataLoading"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" min-width="40" class-name="selectionTd" fixed="left">
                    </el-table-column>
                    <el-table-column prop="" label="用户名" width="120">
                        <template scope="scope">
                            {{scope.row.mobile ? scope.row.mobile : scope.row.email}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="mobile" label="绑定手机号" min-width="120">
                    </el-table-column>
                    <el-table-column label="绑定邮箱" prop="email" min-width="180">
                    </el-table-column>
                    <el-table-column label="验证状态" prop="" min-width="100">
                        <template scope="scope">
                            {{scope.row.verifyFlag | verifyFlagfiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="用户类型" prop="userType" min-width="140">
                        <template scope="scope">
                            {{scope.row.userTypeName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="注册来源" prop="regSource" min-width="130">
                        <template scope="scope">
                            {{scope.row.regSource | regSourcefiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="业务员手机号" prop="saleManNameAndPhone" min-width="150">
                    </el-table-column>
                    <el-table-column label="状态" prop="" min-width="90">
                        <template scope="scope">
                            <div  v-if="scope.row.userType === 1">
                                {{scope.row.buyerFreezeStatus | freezeStatusfilter}}
                            </div>
                            <div  v-if="scope.row.userType === 2">
                                {{scope.row.venFreezeStatus | freezeStatusfilter}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="店铺地址" prop="" min-width="180">
                        <template  scope="scope">
                        <span v-if="scope.row.provinceName">
                            <span>{{scope.row.provinceName}}</span>-
                            <span>{{scope.row.cityName}}</span>-
                            <span>{{scope.row.areaName}}</span>
                        </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="注册时间" prop="createDate" min-width="150">
                        <template scope="scope">
                            {{scope.row.createDate, 'ms' | millisecondFormat}}
                        </template>
                    </el-table-column>
                    <!-- fixed="right" -->
                    <el-table-column
                        label="操作"
                        fixed="right"
                        width="300">
                        <template scope="props">
                            <div class="btn-in-table">
                                <a href="javascript:;" class="s-blue" @click="editMember(props.row)">编辑</a>
                                <a href="javascript:;" class="s-blue" @click="viewDetails(props.row)">
                                    查看
                                </a>
                                <a href="javascript:;" class="s-blue" @click="editSpu(props.row)">重置密码
                                </a>
                                <a v-if="props.row.smsFlag === 2" href="javascript:;" class="s-blue" @click="DreceiveSMS(props.row)">
                                    接收短信
                                </a>
                                <a v-if="props.row.smsFlag === 1" href="javascript:;" class="s-blue" @click="DscreenSMS(props.row)">
                                    屏蔽短信
                                </a>
                                <a v-if="props.row.verifyFlag === 2" href="javascript:;" class="s-blue" @click="cancelValidation(props.row)">
                                    取消验证
                                </a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="page-showbox">
                    <div class="xe-pagination-panel">
                        <el-pagination
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                            :current-page="pagelist.currPage"
                            :page-sizes="[10, 20, 50, 100]"
                            :page-size="pagelist.pageSize"
                            layout="total, prev, pager, next, sizes, jumper"
                            :total="pagelist.total">
                        </el-pagination>
                    </div>
                </div>
            <!--修改密码-->
            <el-dialog title="修改密码" :visible.sync="branchdilog" class="reset-dialog dialog_wid340 error-tishi">
                <el-form :model="modifyPassword" :rules="rule"  label-width="70px" ref="modifyPassword">
                    <el-form-item prop="Password"label="新密码">
                        <el-input size="small" v-model.trim="modifyPassword.Password"   class="xe-input-col2" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass"label="确认密码">
                        <el-input size="small" v-model.trim="modifyPassword.checkPass"   class="xe-input-col2" placeholder=""></el-input>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button class="xe-button-normal" type="primary" @click="rejectSubmit('modifyPassword')">确定</el-button>
                        <el-button class="xe-button-normal" @click="cancelReject">取 消</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <!--修改用户类型-->
            <el-dialog title="修改用户类型" :visible.sync="usertypedilog" class="reset-dialog dialog_wid340 error-tishi">
                <el-form ref="usertypeForm" :model="usertypeForm" :rules="typedata"  label-width="80px">
                    <el-form-item label="用户类型" label-width="100px" prop="userTypeId">
                        <el-select size="small" v-model="usertypeForm.userTypeId" placeholder="请选择用户类型">
                            <el-option
                              v-for="item in userTypelists"
                              :key="item.typeId"
                              :label="item.typeName"
                              :value="item.typeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button class="xe-button-normal" type="primary" @click="typeSubmit('usertypeForm')">确定</el-button>
                        <el-button class="xe-button-normal" @click="cancelData">取 消</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <!--修改业务员-->
            <el-dialog title="修改业务员" :visible.sync="salesmandilog" class="reset-dialog dialog_wid340 error-tishi">
                <el-form ref="salesmanForm" :model="salesmanForm" :rules="regsalesman"  label-width="80px">
                    <el-form-item label="业务员" label-width="100px" prop="saleManId">
                        <el-select size="small" :filterable="true" v-model="salesmanForm.saleManId" placeholder="请选择业务员">
                            <el-option
                              v-for="item in salesmanForm.saleManlist"
                              :key="item.salesmanId"
                              :label="item.salesmanName"
                              :value="item.salesmanId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button class="xe-button-normal" type="primary" @click="salemanSubmit('salesmanForm')">确定</el-button>
                        <el-button class="xe-button-normal" @click="cancelDataS">取 消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
        <!--新增弹框-->
        <div class="reset-dialog addMember">
            <el-dialog class="error-tishi" title="新增会员" :visible.sync="dialogVisible">
                <memberListAddnew @selectGo="selectGo" :dialogVisible = 'dialogVisible'></memberListAddnew>
            </el-dialog>
        </div>
        <!--编辑弹框-->
        <div class="reset-dialog addMember">
            <el-dialog class="error-tishi" title="编辑会员" :visible.sync="EdialogVisible">
                <memberListEdotor  @editGo="editGo" :EdialogVisible = 'EdialogVisible' :editdefault = 'editdefault'></memberListEdotor>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaSelect from '@/components/areaSelect/areaSelect';
import memberListAddnew from './memberListAddnew';
import memberListEdotor from './memberListEdotor';
import permission from 'mixins/permission.js';
import { millisecondFormat } from 'utils';
import {userType, verificationStatus, freezeStatus, registeredSources} from '@/dataControl.js';
let maxDate = 90 * 24 * 60 * 60 * 1000;
export default {
    mixins: [permission],
    data() {
        let self = this;
        var checkPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            } else {
//                let reg = /^[\d_a-zA-Z]{6,12}$/;
                let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,20}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('密码为6-20位数字和字母组合'));
                }
            }
        };
        var validatePassck = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.modifyPassword.Password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        var regUserTypeId = (rule, value, callback) => {
            if (value) {
                callback();
            } else {
                return callback(new Error('请选择用户类型'));
            }
        };
        var regsaleManId = (rule, value, callback) => {
            if (value) {
                callback();
            } else {
                return callback(new Error('请选择业务员'));
            }
        };
        return {
            selecareasss: [814, 815, 816],
            opadialogVisible: true,
            dongjieArray: [], // 冻结解冻信息存储
            datadilog: false, // 修改店铺名称 \结算周期弹框按钮设置: [],
            usertypedilog: false,
            dialogVisible: false,
            EdialogVisible: false,
            salesmandilog: false,
            tableDataLoading: false,
            userTypelists: [],
//            value1: new Date(new Date().setHours(0, 0, 0, 0)),
//            value1: new Date(new Date(new Date().toLocaleDateString()).getTime() - 90 * 24 * 60 * 60 * 1000 - 1),
//            value2: new Date(new Date(new Date()).getTime()),
            value1: '',
            value2: '',
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
            modifyPassword: {
                Password: '',
                checkPass: ''
            },
            usertypeForm: {
                userTypeId: '',
                userTypeName: ''
            },
            salesmanForm: {
                saleManId: '',
                salesmanName: '',
                saleManlist: []
            },
            branchdilog: false,
            permissionObj: {},
            selecarea: [],
            businessListings: {
                namePhoneEmail: '',
                verifyFlag: '',
                freezeStatus: '',
                saleManNameAndPhone: '',
                userTypeId: '',
                provinceId: '',
                cityId: '',
                areaId: '',
                startDate: '',
                endDate: '',
                regSource: ''
            },
            editdefault: '',
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            tableData: [],
            rule: {
                Password: [
                    { required: true, validator: checkPassword, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, validator: validatePassck, trigger: 'blur' }
                ]
            },
            typedata: {
                userTypeId: [
                    { required: true, validator: regUserTypeId, trigger: 'change' }
                ]
            },
            regsalesman: {
                saleManId: [
                    { required: true, validator: regsaleManId, trigger: 'change' }
                ]
            },
            exportData: '',
            selectedCollection: [],
            selectedCollString: '',
            selectversitorCollString: '',
            butopa: false, // 操作项开关
            passwordusercode: '', // 修改密码usercode
            passwordversions: '', // 修改密码versions
            jiedong: '/xe-route/xe-mis/manager/userinfo/freezeYesBatch',
            dongjie: '/xe-route/xe-mis/manager/userinfo/freezeNoBatch', // 冻结状态修改接口
            yanzhengUrl: '/xe-route/xe-mis/manager/userinfo/verifyNoBatch', // 验证接口不通过
            yanzhengTUrl: '/xe-route/xe-mis/manager/userinfo/verifyYesBatch', // 通过
            jieshouUrl: '/xe-route/xe-mis/manager/userinfo/smsYesBatch',
            pingbiUrl: '/xe-route/xe-mis/manager/userinfo/smsNoBatch',
            userTypeUrl: '/xe-route/xe-mis/manager/userinfo/updateUserTypeBatch',
            salemanUrl: '/xe-route/xe-mis/manager/userinfo/updateSellerBatch'
        };
    },
    created() {
        this.merchantListQuery();
        this.creatusertype();
    },
    methods: {
        saleManNameCk() {
            if (this.businessListings.saleManNameAndPhone.length < 3) {
                window.$wxeMessage.warning('业务员手机号必须输入3位以上才能进行模糊查询');
            }
        },
        modifySalesman() {
            // 修改业务员
            this.selectedCollString = '';
            this.dongjieArray = [];
            console.log('selectedCollection', this.selectedCollection.length);
            if (this.selectedCollection.length > 0) {
                let list = this.selectedCollection;
                for (let i in list) {
                    var count = 0;
                    for (let j in list) {
                        if (list[i].provinceId !== list[j].provinceId && list[i].cityId !== list[j].cityId && list[i].areaId !== list[j].areaId) {
                            count = count + 1;
                        }
                    };
                    if (count >= 1) {
                        this.$alert('当前已选中客户，不在同一区域内，无法批量操作。 请重新选择！', {
                            type: 'info'
                        });
                        return;
                    } else {
                        if (list[i].areaId) {
                            let params = {};
                            params.province = list[i].provinceId;
                            params.city = list[i].cityId;
                            params.area = list[i].areaId;
                            this.$http({
                                method: 'post',
                                url: '/xe-route/xe-mis/manager/userinfo/sellersByArea',
                                data: params
                            }).then((res) => {
                                this.salesmanForm.saleManlist = res.data.list;
                                this.salesmandilog = true;
                                let list = this.selectedCollection;
                                for (let i in list) {
                                    this.dongjieArray.push(list[i].userId);
                                };
                            }).catch((error) => {
                                console.log(error);
                            });
                        } else {
                            this.$alert('需要修改的用户没有地址', {
                                type: 'info'
                            });
                        }
                        return;
                    }
                };
            } else {
                this.$alert('请勾选需要修改的用户类型的复选框', {
                    type: 'info'
                });
            }
        },
        cancelValidation(row) {
            // 验证取消
            if (row) {
                this.confimrFun(`确定要对选中会员验证取消？`, () => {
//                    console.log('确定点击');
                    this.dongjieArray = [];
                    this.selectedCollection = [];
                    this.selectedCollection.push(row);
                    this.dongjieArray.push(row.userId);
                    this.remotePublic('verifyFlag', this.yanzhengUrl, 3, '验证不通过');
                }, () => {
                    console.log('取消点击');
                });
            }
        },
        queryTabData() {
            // 高级搜索查询
            this.merchantListQuery();
        },
        modifyAjax(url, form) { // 修改用户类型
            let params = {};
            if (form === 'usertypeForm') {
                params.userTypeId = this.usertypeForm.userTypeId;
            } else {
                params.saleManId = this.salesmanForm.saleManId;
            }
            params.userIdArray = this.dongjieArray;
            console.log(params);
            this.$http({
                method: 'post',
                url: url,
                data: params
            }).then((res) => {
                console.log('-修改用户类型 >', res);
                if (form === 'usertypeForm') {
                    for (let j in this.tableData) {
                        for (let i in this.dongjieArray) {
                            if (this.tableData[j].userId === this.dongjieArray[i]) {
                                console.log(this.usertypeForm.userTypeName);
                                this.tableData[j].userTypeName = this.usertypeForm.userTypeName;
                            }
                        }
                    }
                    this.usertypedilog = false;
                    this.$refs.usertypeForm.resetFields();
                } else {
                    for (let j in this.tableData) {
                        for (let i in this.dongjieArray) {
                            if (this.tableData[j].userId === this.dongjieArray[i]) {
                                this.tableData[j].saleManNameAndPhone = this.salesmanForm.salesmanName;
                            }
                        }
                    }
                    this.salesmandilog = false;
                    this.$refs.salesmanForm.resetFields();
                }
                window.$wxeMessage({
                    type: 'success',
                    message: '修改成功!'
                });
                this.selectedCollString = '';
                this.dongjieArray = [];
            }).catch((error) => {
                console.log(error);
            });
        },
        addNewpro() {
            this.dialogVisible = true;
        },
        editMember(row) {
            this.EdialogVisible = true;
            this.editdefault = row;
            console.log('====>', row);
        },
        editGo() {
            let _this = this;
            this.EdialogVisible = false;
            setTimeout(() => {
                _this.merchantListQuery();
            }, 300);
        },
        selectGo() {
            this.dialogVisible = false;
        },
        startDateStrFn(val) {
            this.startCreateDates = val;
        },
        endDateStrFn(val) {
            this.endCreateDates = val;
        },
        merchantListQuery() {
            let params = {};
            this.tableDataLoading = true;
            params = this.businessListings;
            if (this.selecarea) {
                params.provinceId = this.selecarea[0];
                params.cityId = this.selecarea[1];
                params.areaId = this.selecarea[2];
            }
            if (!this.startCreateDates) {
                if (this.value1) {
                    params.startDate = millisecondFormat(this.value1.getTime(), 'ms');
                }
            }
            if (!this.endCreateDates) {
                if (this.value2) {
                    params.endDate = millisecondFormat(this.value2.getTime(), 'ms');
                }
            }
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            this.exportData = '';
            for (let i in params) {
                if (i !== 'pageNum' && i !== 'pageSize') {
                    if (params[i] === '' || params[i] === null || params[i] === undefined) {
                        this.exportData += `${i}=&`;
                    } else {
                        this.exportData += `${i}=${params[i]}&`;
                    }
                }
            }
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/userinfo/listUserInfo',
                data: params
            }).then((res) => {
                this.tableDataLoading = false;
                this.tableData = res.data.list;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        onSubmit() {
            this.merchantListQuery();
        },
        resetForm(formName) {
            this.selecarea = [];
            this.value1 = '';
            this.value2 = '';
            this.$refs[formName].resetFields();
            this.merchantListQuery();
        },
        viewDetails(row) {
            this.$router.push({name: 'memberListDetails', query: {userId: row.userId}});
        },
        editSpu(row) {
            this.passwordusercode = row.userId;
            this.branchdilog = true;
        },
        passwordresert() {
            let params = {};
            params.userId = this.passwordusercode;
            params.loginPwd = this.modifyPassword.checkPass;
            console.log(params);
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/userinfo/resetPwd',
                data: params
            }).then((res) => {
                console.log('-修改密码->', res);
                window.$wxeMessage({
                    type: 'success',
                    message: '修改密码成功!'
                });
                this.branchdilog = false;
                this.passwordusercode = '';
                this.passwordversions = '';
                this.$refs['modifyPassword'].resetFields();
            }).catch((error) => {
                console.log(error);
            });
        },
        rejectSubmit(formName) {  // 修改密码表单提交
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.passwordresert();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.merchantListQuery();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.merchantListQuery();
            }
        },
        cancelReject() {
            this.passwordusercode = '';
            this.passwordversions = '';
            this.$refs['modifyPassword'].resetFields();
            this.branchdilog = false;
        },
        // 操作项公共方法---------------------------
        confimrFun(title, sucesfun, errorfun) {
            this.$confirm(`${title}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                sucesfun && sucesfun();
            }).catch(() => {
                errorfun && errorfun();
            });
        },
        selectforeach(call, flag, status, tishi) { // flag 判断对应得状态值
            let _this = this;
            _this.butopa = false;
            this.selectedCollString = '';
            this.dongjieArray = [];
//            this.selectversitorCollString = '';
            console.log('selectedCollection', this.selectedCollection.length);
            if (this.selectedCollection.length > 0) {
                this.confimrFun(`确定要对选中会员${tishi}？`, () => {
//                    console.log('确定点击');
                    let list = this.selectedCollection;
                    for (let i in list) {
                        if (tishi === '冻结' || tishi === '解冻') {
                            if (list[i].userType === 1) {
                                flag = 'buyerFreezeStatus';
                            }
                        }
                        if (list[i][flag] === status) {
                            _this.selectedCollString += list[i].userCode + ',';
                            this.dongjieArray.push(list[i].userId);
                        }
                        if (flag === 'verifyFlag') {
                            if (list[i][flag] === 1) {
                                this.dongjieArray.push(list[i].userId);
                            }
                        }
                    }
                    list.some((item) => {
                        if (flag === 'verifyFlag') {
                            if (item[flag] === 1) {
                                _this.butopa = true;
                            } else if (item[flag] === status) {
                                _this.butopa = true;
                            }
                        } else {
                            if (item[flag] === status) {
                                _this.butopa = true;
                            }
                        }
                    });
                    if (_this.butopa) {
                        call && call();
                    } else {
                        this.$alert('有不符合筛选条件的选项，请仔细筛选', {
                            type: 'info'
                        });
                        this.selectedCollString = '';
//                        this.selectversitorCollString = '';
                    }
                }, () => {
                    console.log('取消点击');
                });
            } else {
                this.$alert(`请勾选需要${tishi}的复选框`, {
                    type: 'info'
                });
            }
        },
        remotePublic(parameter, ULR, status, tishi) { // 操作项接口调取 status（将要设置成为的按钮标准方式） tishi（返回的接口回调的成功或者失败提示）
            let params = {};
            if (tishi === '验证通过' || tishi === '验证不通过') {
                params.userIdArray = this.dongjieArray;
            }
            params.userIdArray = this.dongjieArray;
            this.$http({
                method: 'post',
                url: ULR,
                data: params
            }).then((res) => {
                let selectedCollection = this.selectedCollection;
                console.log('selectedCollection====>', selectedCollection);
                if (tishi === '冻结' || tishi === '解冻') {
                    for (let j in this.tableData) {
                        for (let i in selectedCollection) {
                            if (this.tableData[j].userId === selectedCollection[i].userId) {
                                console.log('111---->', this.tableData[j]);
                                if (this.selectedCollection[i].userType === 1) {
                                    this.tableData[j].buyerFreezeStatus = status;
                                    console.log('1');
                                } else if (this.selectedCollection[i].userType === 2) {
                                    console.log(status);
                                    this.tableData[j].venFreezeStatus = status;
                                }
                            }
                        }
                    }
                } else {
                    for (let n in this.tableData) {
                        for (let m in selectedCollection) {
                            if (this.tableData[n].userId === selectedCollection[m].userId) {
                                this.tableData[n][parameter] = status;
                            }
                        }
                    }
                }
                this.butopa = false;
                this.selectedCollString = '';
                this.dongjieArray = [];
                window.$wxeMessage({
                    type: 'success',
                    message: `${tishi}操作成功!`
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        // 操作功能设置区域--------------------------------
        frozenGood() { // 冻结商品
            this.selectforeach(() => {
                this.remotePublic('venFreezeStatus', this.dongjie, 2, '冻结');
            }, 'venFreezeStatus', 1, '冻结');
        },
        thawGood() { // 解冻商品
            this.selectforeach(() => {
                this.remotePublic('venFreezeStatus', this.jiedong, 1, '解冻');
            }, 'venFreezeStatus', 2, '解冻');
        },
        creatusertype() {
            let params = {};
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/userinfo/getUserType',
                data: params
            }).then((res) => {
                this.userTypelists = res.data.list;
            }).catch((error) => {
                console.log(error);
            });
        },
        setUpselfOperation() { // 修改用户类型
            this.selectedCollString = '';
            console.log('selectedCollection', this.selectedCollection.length);
            if (this.selectedCollection.length > 0) {
                this.creatusertype();
                this.usertypedilog = true;
                let list = this.selectedCollection;
                for (let i in list) {
                    this.dongjieArray.push(list[i].userId);
                };
            } else {
                this.$alert('请勾选需要修改的用户类型的复选框', {
                    type: 'info'
                });
            }
        },
        cancelData() {
            this.$refs['usertypeForm'].resetFields();
            this.usertypedilog = false;
        },
        cancelDataS() {
            this.$refs['salesmanForm'].resetFields();
            this.salesmandilog = false;
        },
        typeSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.usertypeForm) {
                        console.log('提交----》go');
                        this.modifyAjax(this.userTypeUrl, 'usertypeForm');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        salemanSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.salesmanForm) {
                        console.log('提交----》go');
                        this.modifyAjax(this.salemanUrl, 'salesmanForm');
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        setAsideforTrial() { // 验证不通过
            this.selectforeach(() => {
                this.remotePublic('verifyFlag', this.yanzhengUrl, 3, '验证不通过');
            }, 'verifyFlag', 2, '验证不通过');
        },
        setasAudit() { // 验证通过
            this.selectforeach(() => {
                this.remotePublic('verifyFlag', this.yanzhengTUrl, 2, '验证通过');
            }, 'verifyFlag', 3, '验证通过');
        },
        handleSelectionChange(val) {
            this.selectedCollection = val;
//            console.log('this.selectedCollection', this.selectedCollection);
        },
        // 批量接收和屏蔽短信
        receiveSMS() {
            this.selectforeach(() => {
                this.remotePublic('smsFlag', this.pingbiUrl, 1, '接收短信');
            }, 'smsFlag', 2, '接收短信');
        },
        screenSMS() {
            this.selectforeach(() => {
                this.remotePublic('smsFlag', this.jieshouUrl, 2, '屏蔽短信');
            }, 'smsFlag', 1, '屏蔽短信');
        },
        // 单个接收和屏蔽短信
        DscreenSMS(row) {
            if (row) {
                this.confimrFun(`确定要进行屏蔽短信？`, () => {
//                    console.log('确定点击');
                    this.dongjieArray = [];
                    this.selectedCollection = [];
                    this.selectedCollection.push(row);
                    this.dongjieArray.push(row.userId);
                    this.remotePublic('smsFlag', this.pingbiUrl, 2, '屏蔽短信');
                }, () => {
                    console.log('取消点击');
                });
            }
        },
        DreceiveSMS(row) {
            if (row) {
                this.confimrFun(`确定要进行接收短信？`, () => {
//                    console.log('确定点击');
                    this.dongjieArray = [];
                    this.selectedCollection = [];
                    this.selectedCollection.push(row);
                    this.dongjieArray.push(row.userId);
                    this.remotePublic('smsFlag', this.jieshouUrl, 1, '接收短信');
                }, () => {
                    console.log('取消点击');
                });
            }
        },
        exportUserData() { // 导出
//            let URL = encodeURI(this.exportData);
            window.open(`/xe-route/xe-mis/manager/userinfo/exportUserData?${this.exportData}`);
        }
    },
    computed: {
        permissionFilter: {
            get() {
                return this.permissionDataList;
            },
            set(val) {
                console.log('按钮级别权限keys:' + JSON.stringify(val));
                if (val !== null) {
                    for (var key in val) {
                        this.$set(this.permissionObj, key, val[key].auth);
                    }
                }
            }
        },
        startCreateDates: {
            get() {
                return this.businessListings.startDate;
            },
            set(val) {
                if (!val) {
                    this.businessListings.startDate = '';
                } else {
                    this.businessListings.startDate = val;
                }
            }
        },
        endCreateDates: {
            get() {
                return this.businessListings.endDate;
            },
            set(val) {
                if (!val) {
                    this.businessListings.endDate = '';
                } else {
                    this.businessListings.endDate = val;
                }
            }
        },
        freezeStatuslist() {
            return freezeStatus;
        },
        registeredSourceslist() {
            return registeredSources;
        },
        verificationStatuslist() {
            return verificationStatus;
        },
        userTypelist() {
            return userType;
        }
    },
    components: {
        memberListAddnew,
        memberListEdotor,
        areaSelect
    },
    watch: {
        salesmanForm: {
            handler (newValue, oldValue) {
                for (let i in this.salesmanForm.saleManlist) {
                    if (this.salesmanForm.saleManId === this.salesmanForm.saleManlist[i].salesmanId) {
                        this.salesmanForm.salesmanName = this.salesmanForm.saleManlist[i].salesmanName;
                    }
                }
            },
            deep: true
        },
        usertypeForm: {
            handler (newValue, oldValue) {
                for (let i in this.userTypelists) {
                    if (this.usertypeForm.userTypeId === this.userTypelists[i].typeId) {
                        this.usertypeForm.userTypeName = this.userTypelists[i].typeName;
                    }
                }
            },
            deep: true
        },
        usertypedilog(n) {
            if (n === false) {
                this.$refs['usertypeForm'].resetFields();
            }
        },
        salesmandilog(n) {
            if (n === false) {
                this.$refs['salesmanForm'].resetFields();
            }
        },
        branchdilog(n) {
            if (n === false) {
                this.$refs['modifyPassword'].resetFields();
            }
        }
    }
};
</script>

<style lang="scss">
    .el-button.xe-button-normal{
        padding: 8px 12px;
    }
    .addMember .el-dialog--small{
        max-width:540px;
    }
    .marL60{
        margin-left: 60px;
    }
</style>
