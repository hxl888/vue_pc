<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                    <el-form-item prop="appVersion">
                        <el-input size="small" placeholder="查询版本号" class="xe-input-l40" v-model="searchform.appVersion"></el-input>
                    </el-form-item>
                    <el-form-item prop="appNameId">
                        <el-select size="small" v-model="searchform.appNameId"  class="xe-input-l40" placeholder="请选择终端">
                            <el-option
                              v-for="item in appNameIdList"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="sysType">
                        <el-select size="small" v-model="searchform.sysType"  class="xe-input-l40" placeholder="请选择系统">
                            <el-option
                              v-for="item in sysTypeList"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform1')">重置</el-button>
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
                    <el-form :inline="true"  label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div>
                            <el-form-item label="更新时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div>
                            <el-form-item prop="proName" label="查询版本号">
                                <el-input size="small" placeholder="查询版本号" class="xe-input-168" v-model="searchform.appVersion"></el-input>
                            </el-form-item>
                            <el-form-item prop="appNameId" label="选择终端">
                                <el-select size="small" v-model="searchform.appNameId" class="xe-input-168"  placeholder="请选择终端">
                                    <el-option
                                      v-for="item in appNameIdList"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div>
                             <el-form-item prop="sysType" label="选择系统">
                                <el-select size="small" v-model="searchform.sysType"  class="xe-input-168" placeholder="请选择系统">
                                    <el-option
                                      v-for="item in sysTypeList"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="adddNewappver"><i class="iconfont icon-banben1"></i> 发新版</el-button>
        </div>
        <div>
            <el-table ref="dataList" :data="dataList" border v-loading="dataListloading" @selection-change="handleSelectionChange">
                <el-table-column
                        label=""
                        fixed='left'
                        width="55">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                    </el-table-column>
                <!--<el-table-column type="selection" width="45" fixed="left"></el-table-column>-->
                <el-table-column prop="" label="终端" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.appNameId | appNameIdfilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="系统"  min-width="80">
                    <template scope="scope">
                        <div>
                            {{scope.row.sysType | sysTypefilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="appVersion" label="版本号"  min-width="100"></el-table-column>
                <el-table-column prop="" label="更新时间"  min-width="150">
                    <template scope="scope">
                        <div>
                            {{scope.row.createDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="packUrl" label="安装包路径"  min-width="150"></el-table-column>
                <el-table-column prop="updateContent" label="更新内容"  min-width="150"></el-table-column>
                <el-table-column prop="forceUpdateFlag" label="强制更新"  min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.forceUpdateFlag | forceUpdateFlagfilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="modifyUser" label="操作人"  min-width="100"></el-table-column>
                <el-table-column prop="status" label="状态"  min-width="80">
                    <template scope="scope">
                        <div>
                            {{scope.row.status | statusfilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="100" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="editorRow(scope.row)">编辑</el-button>
                            <el-button type="text" v-if="scope.row.status === 2" class="zq-restore" @click="enable(scope.$index, scope.row)">启用</el-button>
                            <el-button type="text" v-if="scope.row.status === 1" class="zq-restore" @click="disenable(scope.$index, scope.row)">禁用</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
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
        <!--选择商品弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog05"  :title="dalogTit" :visible.sync="appverdialog">
                <el-form :rules="rules" :model="editorForm" ref="editorForm" labelWidth="80px" style="padding-top: 17px">
                    <el-form-item prop="appNameId" label="终端">
                        <el-select size="small" v-model="editorForm.appNameId" style="width: 260px" placeholder="请选择终端">
                            <el-option
                                v-for="item in appNameIdList"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="sysType" label="系统">
                        <el-radio-group v-model="editorForm.sysType">
                            <el-radio v-for="(item, index) in sysTypeList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item prop="appVersion" label="版本号">
                        <el-input v-model="editorForm.appVersion" size="small" :maxlength="8" style="width: 260px" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="安装包" v-if="editorForm.sysType === 1" prop="packUrl" required>
                        <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                            <div class="uploadImg-btn h-uploadImgBox">
                                <span @click="hasClick = true">选择文件</span><i class="upload-des" style="padding-left: 20px"></i>
                                <div class="el-form-item__error"  style="width: 100%;top: 70%;" v-if="packUrlError">请先上传安装包</div>
                                <div style="line-height: 15px;padding: 10px 20px 0 0;word-break: break-all">{{editorForm.packUrl}}</div>
                                <form name='form' id='formFile'>
                                    <input type="hidden" name="data" v-model="fileType">
                                    <input type="file" name='file'  class='inputFile2' @change="inputFile2Fn('formFile')" accept="aplication/apk">
                                </form>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item prop="updateContent" label="更新内容">
                        <el-input v-model="editorForm.updateContent" class="other_textHei" size="small" type="textarea" :maxlength="200" style="width: 260px;" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item prop="sysType" label="强制更新">
                        <el-radio-group v-model="editorForm.forceUpdateFlag">
                            <el-radio v-for="(item, index) in forceUpdateFlagList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>
                <div class="dialog-footer-bor">
                    <el-button type="primary" :loading="updateLoading" @click="updateappver('editorForm')">确定</el-button>
                    <el-button @click="appverdialog = false">关闭</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { appNameId, sysType, forceUpdateFlag } from '@/dataControl';
import { millisecondFormat } from 'utils';
export default {
    data() {
        var volidappVersion = (rule, value, callback) => {
            if (value) {
                let reg = /^\d+\.\d+\.\d+$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error('版本号格式不正确(例:1.1.2)'));
                }
            } else {
                callback(new Error('版本号不能为空'));
            }
        };
        return {
            searchform: {
                appNameId: '',
                sysType: '',
                appVersion: '',
                startDate: '',
                endDate: '',
                appId: ''
            },
            hasClick: false,
            packUrlError: false,
            editorForm: {
                appId: '',
                appNameId: '',
                sysType: 1,
                appVersion: '',
                updateContent: '',
                forceUpdateFlag: 2,
                packUrl: ''
            },
            dalogTit: '',
            rules: {
                appNameId: [
                    { required: true, type: 'number', message: '终端名称不能为空', trigger: 'change' }
                ],
                sysType: [
                    { required: true, message: '系统必须勾选一项' }
                ],
                appVersion: [
                    { required: true, validator: volidappVersion, trigger: 'blur' }
                ],
                updateContent: [
                    { required: true, message: '更新内容不能为空', trigger: 'blur' }
                ],
                forceUpdateFlag: [
                    { required: true, message: '是否强制更新必须选择' }
                ]
            },
            loadingUploadImg: false,
            fileType: "{dataType: 'cyMangerFile'}",
            uploadImg: [],
            picServer: '',
            value1: '',
            value2: '',
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            updateLoading: false,
            dataList: [],
            appNameAndroid: [], // Android
            appNameIos: [], // ios
            dataListloading: false,
            selecRowIndex: '', // 编辑点击获取对应下标
            appverdialog: false, // 选择商品弹框开关
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            selectedArray: '', // 批量勾选数据记录
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.queryTabData();
    },
    methods: {
        queryTabData() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.startDate = millisecondFormat(this.value1.getTime(), 'ms');
            }
            if (this.value2) {
                params.endDate = millisecondFormat(this.value2.getTime(), 'ms');
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/appversion/listappversion`,
                data: params
            }).then((res) => {
                this.dataList = res.data.list;
                this.dataListloading = false;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        saveAllForm() { // 保存
            if (this.listHot.length) {
            } else {
                window.$wxeMessage.warning('请先添加商品');
            }
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.queryTabData();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.queryTabData();
            }
        },
        enable(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.$confirm(`确定对选中版本启用(若启用当前版本会对其他启用版本自动禁用)？`, '确认启用', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.enablepost(1);
            }).catch(() => {
            });
        },
        disenable(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.$confirm(`确定要对选中版本禁用？`, '确认禁用', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.enablepost(2);
            }).catch(() => {
            });
        },
        enablepost(status) { // 启用(禁用)模块接口
            let params = {};
            params.status = status;
            params.appId = this.selecRowArray.appId;
            params.sysType = this.selecRowArray.sysType;
            params.appNameId = this.selecRowArray.appNameId;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/appversion/openOrDown`,
                data: params
            }).then((res) => {
                window.$wxeMessage.success(res.msg);
                if (status === 1) {
                    this.dataList[this.selecRowIndex].status = 1;
                    if (this.selecRowArray.sysType === 1) {
                        for (let i = 0, len = this.dataList.length; i < len; i++) {
                            if (i !== this.selecRowIndex && this.dataList[i].sysType === 1) {
                                this.dataList[i].status = 2;
                            }
                        }
                    } else if (this.selecRowArray.sysType === 2) {
                        for (let i = 0, len = this.dataList.length; i < len; i++) {
                            if (i !== this.selecRowIndex && this.dataList[i].sysType === 2) {
                                this.dataList[i].status = 2;
                            }
                        }
                    }
                } else if (status === 2) {
                    this.dataList[this.selecRowIndex].status = 2;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        adddNewappver() {
            this.dalogTit = '发新版';
            this.appverdialog = true;
        },
        editorRow(row) {
            this.dalogTit = '编辑';
            this.appverdialog = true;
            this.selecRowArray = row;
            this.editorForm.appId = this.selecRowArray.appId;
            this.editorForm.sysType = this.selecRowArray.sysType;
            this.editorForm.packUrl = this.selecRowArray.packUrl;
            this.editorForm.appNameId = this.selecRowArray.appNameId;
            this.editorForm.appVersion = this.selecRowArray.appVersion;
            this.editorForm.updateContent = this.selecRowArray.updateContent;
            this.editorForm.forceUpdateFlag = this.selecRowArray.forceUpdateFlag;
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.queryTabData();
            }, 10);
        },
        updateappver(formName) {
            this.$refs[formName].validate((valid) => {
                if (this.editorForm.packUrl) {
                    this.packUrlError = false;
                } else {
                    this.packUrlError = true;
                }
                if (valid) {
                    if (this.editorForm.sysType === 1) {
                        if (!this.packUrlError) {
                            if (this.editorForm.packUrl.indexOf('apk') !== -1) {
                                this.updateappverpost();
                            } else {
                                this.$alert('必须上传apk格式的安装包,请重新上传', '提示', {
                                    confirmButtonText: '确定',
                                    type: 'info'
                                });
                            }
                        }
                    } else if (this.editorForm.sysType === 2) {
                        this.updateappverpost();
                    }
                } else {
                    return false;
                }
            });
        },
        inputFile2Fn(id) {
            this.loadingUploadImg = true;
            var formData = new FormData(document.getElementById(id));
            this.$http({
                method: 'post',
                url: `/xe-zuul${this.productUrl}/manager/appversion/appUpload`,
                data: formData
            }).then(res => {
                this.packUrlError = false;
                this.loadingUploadImg = false;
                this.editorForm.packUrl = JSON.parse(res.data.returnStr).reUrl[0];
                console.log(this.editorForm.packUrl);
//                let imgInfoList = res.data.imgInfoList;
//                this.picServer = res.data.picServer;
//                this.uploadImg = imgInfoList;
//                this.editorForm.imgUrl = imgInfoList[0].imgName;
            }).catch(error => {
                this.loadingUploadImg = false;
                console.log(error);
            });
        },
        removeImg() {
            this.uploadImg = '';
            this.editorForm.imgUrl = '';
        },
        updateappverpost() {
            let params = {};
            let URL = '';
            this.updateLoading = true;
            let _this = this;
            if (this.dalogTit === '编辑') {
                URL = '/manager/appversion/updateappver';
            } else if (this.dalogTit === '发新版') {
                URL = '/manager/appversion/insertappver';
            }
            params = this.editorForm;
            this.$http({
                method: 'post',
                url: `${this.productUrl}${URL}`,
                data: params
            }).then((res) => {
                this.appverdialog = false;
                this.updateLoading = false;
                window.$wxeMessage.success(res.msg);
                setTimeout(() => {
                    _this.queryTabData();
                });
            }).catch((error) => {
                console.log(error);
                this.updateLoading = false;
            });
        }
    },
    watch: {
        appverdialog(n) {
            let _this = this;
            if (n === false) {
                setTimeout(() => {
                    _this.hasClick = false;
                    _this.$refs.editorForm.resetFields();
                }, 300);
            }
        }
    },
    computed: {
        appNameIdList() {
            return appNameId;
        },
        sysTypeList() {
            return sysType;
        },
        forceUpdateFlagList() {
            return forceUpdateFlag;
        }
    }
};
</script>
<style lang="scss">
    .el-textarea {
        &.other_textHei {
            textarea {
                height: 100px;
            }
        }
    }
</style>
