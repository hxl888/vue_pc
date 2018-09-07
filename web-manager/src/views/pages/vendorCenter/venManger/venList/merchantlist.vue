<template lang="html">
    <div class="m-router-con">
        <!-- 待审核商品 -->
        <div class="u-top-search">
        	<el-form :inline="true" :model="businessListings" ref="businessListings" class="demo-form-inline">
                <el-form-item prop="venSatatus">
                    <el-select size="small" v-model="businessListings.venSatatus" class="xe-input-l40" placeholder="入驻状态">
                        <el-option
                          v-for="item in venSatatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="venName">
                    <el-input size="small" v-model="businessListings.venName" class="xe-input-l40" placeholder="供应商名称/店铺名称"></el-input>
                </el-form-item>
                <el-form-item prop="loginAccount">
                    <el-input size="small" v-model="businessListings.loginAccount" class="xe-input-l40" placeholder="供应商账号"></el-input>
                </el-form-item>
                <el-form-item prop="venFreezeStatus">
                    <el-select size="small" v-model="businessListings.venFreezeStatus" class="xe-input-l40" placeholder="冻结状态">
                        <el-option
                          v-for="item in venFreezeStatuslist"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('businessListings')">重置</el-button>
                    <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" label-width ='73px'  :model="businessListings" ref="businessListings" class="demo-form-inline">
                        <div>
                            <el-form-item label="入驻时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    size="small"
                                    v-model="businessListings.startDate"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="startDateFn"
                                    placeholder="开始日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    size="small"
                                    v-model="businessListings.endDate"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="endDateFn"
                                    placeholder="结束日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="审核时间" prop="startDateStr" class="marR0">
                                <el-date-picker
                                    size="small"
                                    v-model="businessListings.startDateStr"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="startDateStrFn"
                                    placeholder="开始日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDateStr">
                                <el-date-picker
                                    size="small"
                                    v-model="businessListings.endDateStr"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="endDateStrFn"
                                    placeholder="结束日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="venSatatus" label="入驻状态">
                                <el-select size="small" v-model="businessListings.venSatatus" class="xe-input-168" placeholder="入驻状态">
                                    <el-option
                                      v-for="item in venSatatuslist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="venName" label="供应商名称">
                                <el-input size="small" v-model="businessListings.venName" class="xe-input-168" placeholder="供应商名称/店铺名称"></el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="loginAccount" label="供应商账号">
                                <el-input size="small" v-model="businessListings.loginAccount" class="xe-input-168" placeholder="供应商账号"></el-input>
                            </el-form-item>
                            <el-form-item prop="venFreezeStatus" label="冻结状态">
                                <el-select size="small" v-model="businessListings.venFreezeStatus" class="xe-input-168" placeholder="冻结状态">
                                    <el-option
                                      v-for="item in venFreezeStatuslist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="venType" label="商户性质">
                                <el-select size="small" class="xe-input-168" v-model="businessListings.venType" placeholder="商户性质">
                                    <el-option
                                      v-for="item in venTypeDatalist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="settlementCycle" label="结算周期">
                                <el-input size="small" @input.native='timecomputdFn($event)' :maxlength="2" v-model="businessListings.settlementCycle" placeholder="结算周期" class="xe-input-168"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="autoOperationFlag" label="运营模式">
                                <el-select size="small" v-model="businessListings.autoOperationFlag" placeholder="运营模式" class="xe-input-168">
                                    <el-option
                                      v-for="item in autoOperationFlaglist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="auditFlag" label="是否免审">
                                <el-select size="small" v-model="businessListings.auditFlag" placeholder="是否免审" class="xe-input-168">
                                    <el-option
                                      v-for="item in auditFlaglist"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="userCode" label="商户ID">
                                <el-input size="small" v-model="businessListings.userCode" class="xe-input-168" placeholder="商户ID"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="merchantListQuery">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('businessListings')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="frozenGood">
                <span class="iconfont icon-suo-xianxing"></span> 冻结
            </el-button>
            <el-button class="xe-button-normal" @click="thawGood">
                <span class="iconfont icon-jiesuo-xianxing"></span> 解冻
            </el-button>
            <el-button class="xe-button-normal" @click="setUpselfOperation">
                <span class="iconfont icon-yunying"></span> 设为自运营
            </el-button>
            <el-button class="xe-button-normal" @click="setTobeOperational">
                <span class="iconfont icon-yunying1"></span> 设为代运营
            </el-button>
            <el-button class="xe-button-normal" @click="setAsideforTrial">
                <span class="iconfont icon-duihao"></span> 设为免审
            </el-button>
            <el-button class="xe-button-normal" @click="setasAudit">
                <span class="iconfont icon-shenhe1"></span> 设为审核
            </el-button>
            <el-button class="xe-button-normal" @click="exportDataMethod"><i class="iconfont icon-daochu"></i> 导出</el-button>
        </div>
        <div class="goodsTable">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    border
                    v-loading="tableDataLoading"
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" min-width="40" class-name="selectionTd" fixed="left">
                    </el-table-column>
                    <el-table-column label="商户ID" prop="userCode" min-width="170">
                    </el-table-column>
                    <el-table-column prop="" label="账号" width="210">
                        <template scope="scope">
                            {{scope.row.userPhone ? scope.row.userPhone : scope.row.userEmail}}
                        </template>
                    </el-table-column>
                    <el-table-column label="商户名称 / 企业名称" prop="venName" min-width="180">
                    </el-table-column>
                    <el-table-column label="店铺名称" prop="shopName" min-width="120">
                    </el-table-column>
                    <el-table-column label="商户性质" prop="venType" min-width="120">
                        <template scope="scope">
                            {{scope.row.venType | venTypefiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="入驻状态" prop="venSatatus" min-width="130">
                        <template scope="scope">
                            {{scope.row.venSatatus | venSatatusfiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="企业性质" prop="venProperties" min-width="130">
                        <template scope="scope">
                            {{scope.row.venProperties | venPropertiesfiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="结算周期" prop="settlementCycle" min-width="90">
                        <template scope="scope">
                            <div  v-if="scope.row.settlementCycle">
                                T + {{scope.row.settlementCycle}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="冻结状态" prop="venFreezeStatus" min-width="104">
                        <template scope="scope">
                            {{scope.row.venFreezeStatus | venFreezeStatusfiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="运营模式" prop="autoOperationFlag" min-width="104">
                        <template scope="scope">
                            {{scope.row.autoOperationFlag | autoOperationFlagfiter}}
                        </template>
                    </el-table-column>
                    <el-table-column label="是否免审" prop="auditFlag" min-width="104">
                        <template scope="scope">
                            {{scope.row.auditFlag | auditFlagfiter}}
                        </template>
                    </el-table-column>
                    <!-- fixed="right" -->
                    <el-table-column
                        label="操作"
                        fixed="right"
                        min-width="240">
                        <template scope="props">
                            <div class="btn-in-table">
                                <a href="javascript:;" class="s-blue" @click="viewDetails(props.row)">查看</a>
                                <a href="javascript:;" class="s-blue" @click="modifyData(props.row)">
                                    修改
                                </a>
                                <a href="javascript:;" class="s-blue" @click="viewGoods(props.row)">查看商品
                                </a>
                                <!--<a href="javascript:;" class="s-blue" @click="viewOrder(props.row.id)">查看订单-->
                                <!--</a>-->
                                <a href="javascript:;" class="s-blue" @click="editSpu(props.row)">
                                    修改密码
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
                        <el-input size="small" v-model="modifyPassword.Password" :maxlength="12" type="text" class="xe-input-col2" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass"label="确认密码">
                        <el-input size="small" v-model="modifyPassword.checkPass" :maxlength="12" type="text" class="xe-input-col2" placeholder=""></el-input>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button class="xe-button-normal" type="primary" @click="rejectSubmit('modifyPassword')">确定</el-button>
                        <el-button class="xe-button-normal" @click="cancelReject">取 消</el-button>
                    </div>
                </el-form>
            </el-dialog>
            <!--修改店铺名称 \结算周期-->
            <el-dialog title="修改" :visible.sync="datadilog" class="reset-dialog dialog_wid340 error-tishi">
                <el-form ref="shopandTimeform" :model="shopandTimeform" :rules="ruledata"  label-width="80px">
                    <el-form-item prop="shopName"label="店铺名称">
                        <el-input size="small" v-model.trim="shopandTimeform.shopName" class="xe-input-col2" placeholder="请输入店铺名称"></el-input>
                    </el-form-item>
                    <el-form-item prop="settlementCycle"label="结算周期 T+">
                        <el-input size="small" :maxlength="2" v-model.trim.number="shopandTimeform.settlementCycle" class="xe-input-col2" placeholder="请输入1到99的整数数字"></el-input>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button class="xe-button-normal" type="primary" @click="dataSubmit('shopandTimeform')">确定</el-button>
                        <el-button class="xe-button-normal" @click="cancelData">取 消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import permission from 'mixins/permission.js';
import {venSatatus, venFreezeStatus, venTypeData, autoOperationFlag, auditFlag} from '@/dataControl.js';
export default {
    mixins: [permission],
    data() {
        var checkPassword = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('密码不能为空'));
            } else {
//                let reg = /^[\d_a-zA-Z]{6,12}$/;
                let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,12}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    return callback(new Error('密码为6-12位数字和字母组合'));
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
        var validateshop = (rule, value, callback) => {
            if (value === '') {
                callback();
            } else {
                if (value.length <= 30) {
                    callback();
                } else {
                    callback(new Error('店铺名称长度过长!'));
                }
            }
        };
        var validateCycle = (rule, value, callback) => {
            if (value === '') {
                callback();
            } else {
                if (value > 0 && value <= 99) {
                    if (Number.isInteger(value)) {
                        callback();
                    } else {
                        callback(new Error('请输入1到99的整数!'));
                    }
                } else {
                    callback(new Error('请输入1到99的整数字!'));
                }
            }
        };
        return {
            opadialogVisible: true,
            dongjieArray: [], // 冻结解冻信息存储
            datadilog: false, // 修改店铺名称 \结算周期弹框按钮设置
            startDates: '', // 入驻开始时间
            endDates: '', // 入驻结束时间
            startDateStrs: '', // 审核开始时间
            endDateStrs: '', // 审核结束时间
            modifyPassword: {
                Password: '',
                checkPass: ''
            },
            shopandTimeform: {
                shopName: '',
                settlementCycle: ''
            },
            tableDataLoading: false,
            branchdilog: false,
            permissionObj: {},
            businessListings: {
                venSatatus: '',
                venName: '',
                loginAccount: '',
                venFreezeStatus: '',
                venSource: '',
                startDate: '',
                endDate: '',
                venType: '',
                userCode: '',
                auditFlag: '',
                startDateStr: '',
                endDateStr: '',
                settlementCycle: '',
                autoOperationFlag: ''
            },
            exportData: '',
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
            ruledata: {
                shopName: [
                    { validator: validateshop, trigger: 'blur' }
                ],
                settlementCycle: [
                    { validator: validateCycle, trigger: 'blur' }
                ]
            },
            modifyDate: '', // 修改店铺名称信息记录
            selectedCollection: [],
            selectedCollString: '',
            selectversitorCollString: '',
            butopa: false, // 操作项开关
            passwordusercode: '', // 修改密码usercode
//            passwordversions: '', // 修改密码versions
            dongjie: '/xe-route/xe-mis/manager/venmanager/batchFreezeVenInfo', // 冻结状态修改接口
            yunying: '/xe-route/xe-mis/manager/venmanager/batchUpdateOperationFlag', // 运营状态修改接口
            shenheUrl: '/xe-route/xe-mis/manager/venmanager/batchUpdateAuditFlag' // 审核状态接口
        };
    },
    created() {
        this.merchantListQuery();
    },
    methods: {
        startDateFn(val) {
            this.startDates = val;
        },
        endDateFn(val) {
            this.endDates = val;
        },
        startDateStrFn(val) {
            this.startDateStrs = val;
        },
        endDateStrFn(val) {
            this.endDateStrs = val;
        },
        timecomputdFn(event) {
            let value = parseInt(event.target.value);
            if (value > 0) {
                event.target.value = value;
            } else {
                event.target.value = '';
            }
        },
        updateShopNameByCode(row) { // 修改店铺名称
            let params = {};
            params = this.shopandTimeform;
            params.userCode = row.userCode;
            params.version = row.version;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/venmanager/updateShopNameByCode',
                data: params
            }).then((res) => {
                console.log('-修改店铺名称 >', res);
                this.datadilog = false;
                this.modifyDate = '';
                this.$refs.shopandTimeform.resetFields();
                window.$wxeMessage({
                    type: 'success',
                    message: '修改成功!'
                });
                this.merchantListQuery();
            }).catch((error) => {
                console.log(error);
            });
        },
        dataSubmit(formName) { // 修改店铺名称 \结算周期提交--确定按钮（弹框）
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.shopandTimeform.shopName || this.shopandTimeform.settlementCycle) {
                        console.log('提交----》go');
                        this.updateShopNameByCode(this.modifyDate);
                    } else {
                        this.$alert('必须修改其中的一项才能提交', {
                            type: 'info'
                        });
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        cancelData() { // 修改店铺名称 \结算周期提交--取消按钮（弹框）
            this.datadilog = false;
            this.$refs.shopandTimeform.resetFields();
        },
        modifyData(row) { // 修改店铺名称 \结算周期提交 弹框弹出
            this.datadilog = true;
            this.modifyDate = row;
            console.log('row-->', row);
            this.shopandTimeform.shopName = this.modifyDate.shopName;
            this.shopandTimeform.settlementCycle = this.modifyDate.settlementCycle;
        },
        merchantListQuery() {
            let params = {};
            this.tableDataLoading = true;
            params = this.businessListings;
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            params.startDate = this.startDates;
            params.endDate = this.endDates;
            params.startDateStr = this.startDateStrs;
            params.endDateStr = this.endDateStrs;
            this.exportData = '';
            for (let i in params) {
                if (i !== 'pageNum' && i !== 'pageSize') {
                    if (params[i] === '' || params[i] === null) {
                        this.exportData += `${i}=&`;
                    } else {
                        this.exportData += `${i}=${params[i]}&`;
                    }
                }
            }
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/venmanager/queryVenList',
                data: params
            }).then((res) => {
                this.tableData = res.data.xeVenInfoList;
//                console.log('-this.tableData->', this.tableData);
                this.pagelist.total = res.data.pageInfo.total;
                this.tableDataLoading = false;
            }).catch((error) => {
                console.log(error);
                this.tableDataLoading = false;
            });
        },
        onSubmit() {
            this.merchantListQuery();
        },
        resetForm(formName) {
            let _this = this;
            this.$refs[formName].resetFields();
            this.businessListings.startDate = '';
            this.businessListings.endDate = '';
            this.businessListings.startDateStr = '';
            this.businessListings.endDateStr = '';
            setTimeout(() => {
                _this.merchantListQuery();
            }, 10);
        },
        viewDetails(row) {
            this.$router.push({name: 'merchantparticulars', query: {userCode: row.userCode}});
        },
        editSpu(row) {
            this.passwordusercode = row.userCode;
//            this.passwordversions = row.version;
            this.branchdilog = true;
        },
        passwordresert() {
            let params = {};
            params.userCode = this.passwordusercode;
            params.loginPwd = this.modifyPassword.checkPass;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/userinfo/resetPwd',
                data: params
            }).then((res) => {
                console.log('-修改密码->', res);
                if (res.data.remote && res.data.remote.status !== '0000') {
                    window.$wxeMessage({
                        type: 'info',
                        message: '密码修改失败!'
                    });
                } else {
                    window.$wxeMessage({
                        type: 'success',
                        message: '密码修改成功!'
                    });
                    this.branchdilog = false;
                    this.passwordusercode = '';
                    this.passwordversions = '';
                    this.$refs['modifyPassword'].resetFields();
                }
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
        viewGoods(row) {
            this.$router.push({name: 'commlistCommod', query: {userCode: row.userCode}});
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.merchantListQuery();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.currPage = val;
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
//            this.selectversitorCollString = '';
            console.log('selectedCollection', this.selectedCollection.length);
            if (this.selectedCollection.length > 0) {
                this.confimrFun(`确定要对商户进行${tishi}？`, () => {
//                    console.log('确定点击');
                    let list = this.selectedCollection;
                    for (let i in list) {
                        if (list[i][flag] === status) {
                            _this.selectedCollString += list[i].userCode + ',';
                            if (tishi === '冻结' || tishi === '解冻') {
                                this.dongjieArray.push(list[i].userId);
                            }
//                            _this.selectversitorCollString += list[i].version + ',';
                        }
//                        console.log('selectedCollString', _this.selectedCollString);
                    }
                    list.some((item) => {
                        if (item[flag] === status) {
                            _this.butopa = true;
                        }
                    });
                    if (_this.butopa) {
                        call && call();
                    } else {
                        this.$alert('有不符合筛选条件的商户，请仔细筛选', {
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
//            selecArray.push(params.ids);
//            if (tishi !== '冻结' && tishi !== '解冻') {
//                params.versions = this.selectversitorCollString.substr(0, this.selectversitorCollString.length - 1);
//            }
            if (tishi === '冻结' || tishi === '解冻') {
//                params.versions = this.selectversitorCollString.substr(0, this.selectversitorCollString.length - 1);
                params.userIds = this.dongjieArray;
            }
//            let selecArray = [];
            params.ids = this.selectedCollString.substr(0, this.selectedCollString.length - 1);
            params[parameter] = status;
            this.$http({
                method: 'post',
                url: ULR,
                data: params
            }).then((res) => {
//                this.selectedCollection = [];
//                this.selectversitorCollString = '';
                let selecArray = [];
                selecArray.push(params.ids);
                selecArray = selecArray.join(',').split(',');
                for (let i in this.tableData) {
                    for (let j in selecArray) {
                        if (this.tableData[i].userCode === selecArray[j]) {
                            this.tableData[i][parameter] = status;
                        }
                    }
                }
                this.butopa = false;
                this.selectedCollString = '';
                this.dongjieArray = [];
//                this.tableData = [];
//                setTimeout(() => {
//                    this.merchantListQuery();
//                }, 0);
                window.$wxeMessage({
                    type: 'success',
                    message: `${tishi}成功!`
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
                this.remotePublic('venFreezeStatus', this.dongjie, 1, '解冻');
            }, 'venFreezeStatus', 2, '解冻');
        },
        setUpselfOperation() { // 设置自运营
            this.selectforeach(() => {
                this.remotePublic('autoOperationFlag', this.yunying, 1, '设为自运营');
            }, 'autoOperationFlag', 2, '设为自运营');
        },
        setTobeOperational() { // 设置待运营
            this.selectforeach(() => {
                this.remotePublic('autoOperationFlag', this.yunying, 2, '设为代运营');
            }, 'autoOperationFlag', 1, '设为代运营');
        },
        setAsideforTrial() { // 设为免审
            this.selectforeach(() => {
                this.remotePublic('auditFlag', this.shenheUrl, 1, '设为免审');
            }, 'auditFlag', 2, '设为免审');
        },
        setasAudit() { // 设为审核
            this.selectforeach(() => {
                this.remotePublic('auditFlag', this.shenheUrl, 2, '设为审核');
            }, 'auditFlag', 1, '设为审核');
        },
        handleSelectionChange(val) {
            this.selectedCollection = val;
//            console.log('this.selectedCollection', this.selectedCollection);
        },
        exportDataMethod() {
            console.log(this.exportData);
            window.open(`/xe-route/xe-mis/manager/venmanager/exportVenInfo?${this.exportData}`);
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
        venSatatuslist() {
            return venSatatus;
        },
        venFreezeStatuslist() {
            return venFreezeStatus;
        },
        venTypeDatalist() {
            return venTypeData;
        },
        autoOperationFlaglist() {
            return autoOperationFlag;
        },
        auditFlaglist() {
            return auditFlag;
        }
    }
};
</script>
