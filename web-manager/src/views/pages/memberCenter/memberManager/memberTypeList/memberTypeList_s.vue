<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form ref="searchform" :model="searchform" :inline=true>
                    <el-form-item prop="typeName">
                        <el-input placeholder="查询平台用户类型名称" v-model="searchform.typeName"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="typeStatus">
                            <el-select v-model="searchform.typeStatus" placeholder="类型状态">
                                <el-option
                                    v-for="(item, index) in userTypeStatuslist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="frozenFlag">
                            <el-select v-model="searchform.frozenFlag" placeholder="采购业务类型">
                                <el-option
                                    v-for="(item, index) in frozenFlaglist"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button type="primary" @click="enquiryForm">查询</el-button>
                        <el-button @click="resetForm('searchform')">重置</el-button>
                        <el-button  @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                    </el-form-item>
            </el-form>
            <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true" label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div>
                            <el-form-item label="创建时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="searchform.startDate"
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
                                    v-model="searchform.endDate"
                                    class="xe-input-l68"
                                    type="date"
                                    @change="endDateFn"
                                    placeholder="结束日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="类型名称" prop="typeName">
                                <el-input class="xe-input-168" placeholder="查询平台用户类型名称" v-model="searchform.typeName"></el-input>
                            </el-form-item>
                             <el-form-item label="类型状态" prop="typeStatus">
                                <el-select class="xe-input-168"  v-model="searchform.typeStatus" placeholder="类型状态">
                                    <el-option
                                        v-for="(item, index) in userTypeStatuslist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item label="业务类型" prop="frozenFlag">
                                <el-select class="xe-input-168"   v-model="searchform.frozenFlag" placeholder="采购业务类型">
                                    <el-option
                                        v-for="(item, index) in frozenFlaglist"
                                        :key="index"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button type="primary" @click="enquiryForm">查询</el-button>
                        <el-button  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
                <el-button @click="addnewtype"><i class="iconfont icon-xinzeng"></i> 添加类型</el-button>
                <el-button @click="deleteFn"><i class="iconfont icon-shanchu"></i> 删除</el-button>
                <!--<el-button @click=""><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        </div>
        <el-table ref="tableDatas" :data="tableDatas" border v-loading="tableDataLoading" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="typeName" label="类型名称" min-width="120"></el-table-column>
            <el-table-column prop="typeStatus" label="状态" min-width="120">
                <template scope="scope">
                    <div v-if="scope.row.typeStatus">
                        {{scope.row.typeStatus | userTypeStatusfilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="frozenFlag" min-width="150" label="采购业务类型">
                <template scope="scope">
                    <div v-if="scope.row.frozenFlag">
                        {{scope.row.frozenFlag | frozenFlagtypeofiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="typeDesc" min-width="150" label="描述">
            </el-table-column>
            <el-table-column prop="createDate" min-width="150" label="创建时间">
                <template scope="scope">
                    <div v-if="scope.row.createDate">
                        {{scope.row.createDate}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" width="105" label="操作" fixed="right">
                <template scope="scope">
                    <div class="btn-in-table">
                        <a href="javascript:;" class="s-blue" @click="checkView(scope.row)">查看</a>
                        <a href="javascript:;" class="s-blue" @click="editor(scope.row)">编辑</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagelist.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
        <!--弹框(编辑新增)-->
        <div class="reset-dialog  addNew-box">
            <el-dialog class="error-tishi reset-dialog03" :title="alerTit" :visible.sync="edialogVisible">
                <el-form ref="formArray" :rules="rules" :model="formArray" label-width="120px">
                    <el-form-item label="类型名称：" prop="typeName">
                        <el-input class = "xe-input-col3" :maxlength="10" v-model="formArray.typeName" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="状态：" prop="typeStatus" class="pad0">
                        <el-radio-group v-model="formArray.typeStatus">
                            <el-radio :label="item.value" :value="item.value" :key="item.value"   v-for="item in userTypeStatuslist">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="采购业务类型：" prop="frozenFlag"  class="pad0">
                        <el-radio-group v-model="formArray.frozenFlag" @change="test">
                            <el-radio :label="item.value" :value="item.value" :key="item.value"   v-for="item in frozenFlaglist">{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="描述：" prop="typeDesc" style="padding-bottom: 20px">
                        <el-input class = "xe-input-col3" :maxlength="30" v-model="formArray.typeDesc" placeholder="请输入描述"></el-input>
                    </el-form-item>
                    <div class="dialog-footer-bor">
                        <el-button type="primary" :loading="loading" @click="preservation('formArray')">保存</el-button>
                        <el-button @click="cancel">取消</el-button>
                    </div>
                </el-form>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import {userTypeStatus, frozenFlag} from '@/dataControl';
    export default {
        data() {
            var validateName = (rule, value, callback) => {
                if (value) {
                    this.validateNameCk(value, () => {
                        callback();
                    }, (err) => {
                        callback(new Error(err.msg));
                    });
                } else {
                    callback(new Error('类型名称不能为空'));
                }
            };
            return {
                tableDatas: [],
                searchform: {
                    endDate: '',
                    frozenFlag: '',
                    startDate: '',
                    typeName: '',
                    typeStatus: ''
                },
                alerTit: '新增类型',
                formArray: {
                    typeName: '',
                    typeStatus: 1,
                    frozenFlag: 1,
                    typeDesc: '',
                    typeId: ''
                },
                loading: false,
                edialogVisible: false,
                startDateStrs: '',
                endDateStrs: '',
                selectedArray: [], // 多选操作勾选数据存储
                edotor: false, // 判断是否为编辑类型
                selectRow: '',
                pagelist: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                tableDataLoading: false,
                rules: {
                    typeName: [
                        { required: true, validator: validateName, trigger: 'blur' }
                    ],
                    typeStatus: [
                        { required: true }
                    ],
                    frozenFlag: [
                        { required: true }
                    ],
                    typeDesc: [
                        { required: true, message: '状态不能为空', trigger: 'blur' }
                    ]
                },
                productUrl: '/xe-route/xe-mis'
//                productUrl: ''
            };
        },
        created() {
            this.enquiryForm();
        },
        methods: {
            test() {
                console.log('this.formArray.frozenFlag', this.formArray.frozenFlag);
            },
            addnewtype() {
                this.alerTit = '新增类型';
                this.edialogVisible = true;
                this.edotor = false;
                this.formArray.typeId = '';
                this.formArray.frozenFlag = 1;
                this.formArray.typeDesc = '';
                this.formArray.typeName = '';
                this.formArray.typeStatus = 1;
            },
            validateNameCk(val, suc, err) { // 校验品牌名称是否重复
                let params = {};
                if (this.edotor) {
                    params.typeId = this.selectRow.typeId;
                }
                params.typeName = val;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/userType/checkUserTypeName`,
                    data: params
                }).then((res) => {
                    if (res.data.remote && res.data.remote.status !== '0000') {
                        err && err(res.data.remote);
                    } else {
                        suc && suc();
                    }
                }).catch((error) => {
                    console.log('--->', error);
                });
            },
            startDateFn(val) {
                this.startDateStrs = val;
            },
            endDateFn(val) {
                console.log(val);
                this.endDateStrs = val;
            },
            insertUserType() {
                let params = {};
                this.loading = true;
                params = this.formArray;
                if (this.edotor) {
                    this.insertUserTypemethod(params, 1); // 编辑
                } else {
                    this.insertUserTypemethod(params, 2); // 新增
                }
            },
            insertUserTypemethod(params, flag) {
                let _this = this;
                let URL = '';
                if (flag === 1) {
                    URL = '/manager/userType/updateByTypeId';
                } else if (flag === 2) {
                    URL = '/manager/userType/insertUserType';
                }
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}${URL}`,
                    data: params
                }).then((res) => {
                    if (res.data.remote.status !== '0000') {
                        window.$wxeMessage.error(res.data.remote.msg);
                    } else {
                        window.$wxeMessage.success('操作成功');
                        setTimeout(function() {
                            _this.cancel();
                            _this.enquiryForm();
                        }, 300);
                        this.loading = false;
                        this.edialogVisible = false;
                    }
                }).catch((error) => {
                    this.loading = false;
                    console.log(error);
                });
            },
            preservation(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.insertUserType();
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            cancel() {
                this.edialogVisible = false;
                this.$refs.formArray.resetFields();
            },
            checkView(row) {
                this.$router.push({name: 'memberTypeListDetails', query: {typeId: row.typeId}});
            },
            editor(row) {
                this.alerTit = '编辑类型';
                this.edotor = true;
                this.edialogVisible = true;
                this.selectRow = row;
//                this.formArray = row;
                this.formArray.typeId = row.typeId;
                this.formArray.typeName = row.typeName;
                this.formArray.typeStatus = row.typeStatus;
                this.formArray.frozenFlag = row.frozenFlag;
                this.formArray.typeDesc = row.typeDesc;
            },
            addnewtemplate() {
                this.$router.push({name: 'activityList_addnew'});
            },
            deleteFn() { // 批量删除
                if (this.selectedArray.length > 0) {
                    this.$confirm(`确定要批量删除么？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.deletePage();
                    }).catch(() => {
                    });
                } else {
                    this.$alert('请勾选需要批量删除的用户类型', {
                        type: 'info'
                    });
                }
            },
            resetForm(formName) {
                let _this = this;
                this.$refs[formName].resetFields();
                this.searchform.startDate = '';
                this.searchform.endDate = '';
                setTimeout(() => {
                    _this.enquiryForm();
                }, 10);
            },
            handleSelectionChange(val) {
                this.selectedArray = val;
            },
            enquiryForm() {
                let params = {};
                this.tableDataLoading = true;
                params = this.searchform;
                params.pageNum = this.pagelist.pageNum;
                params.pageSize = this.pagelist.pageSize;
                params.startDate = this.startDateStrs;
                params.endDate = this.endDateStrs;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/userType/selectUserTypeList`,
                    data: params
                }).then((res) => {
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableDatas = res.data.userTypeList;
                    this.tableDataLoading = false;
                }).catch((error) => {
                    console.log(error);
                    this.tableDataLoading = false;
                });
            },
            deletePage() { // 删除
                let params = {};
                let _this = this;
                let select = this.selectedArray;
                let typeIds = [];
                for (let i in select) {
                    typeIds.push(select[i].typeId);
                }
                params.typeIds = typeIds;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/userType/deleteByTypeIds`,
                    data: params
                }).then((res) => {
                    console.log('----!!>', res);
                    window.$wxeMessage({
                        type: 'success',
                        message: `删除成功!`
                    });
                    setTimeout(function() {
                        _this.enquiryForm();
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                console.log('val--->', val);
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.pageNum = val;
                    this.enquiryForm();
                }
            }
        },
        computed: {
            frozenFlaglist() {
                return frozenFlag;
            },
            userTypeStatuslist() {
                return userTypeStatus;
            }
        },
        watch: {
            edialogVisible: function (n) {
                if (n === false) {
                    this.cancel();
                }
            }
        }
    };
</script>
<style scoped>
    .error-tishi .el-form-item {
        margin-bottom: 0!important;
        padding-bottom: 12px;
    }
    .pad0 {
        padding:0!important;
    }
</style>
