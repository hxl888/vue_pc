<template lang="html">
    <div class="m-router-con m-router-con-top0">
        <div class="u-getInfor">
            <div class="tit-content">
                商户信息
            </div>
            <ul class="Ul-infor">
                <li class="clearfix">
                    <span class="txt-infor">商户/企业名称：</span>{{merchantInformation.venName}}
                </li>
                <li class="clearfix">
                    <span class="txt-infor">企业类型：</span>{{merchantInformation.comType | comTypefiter}}
                </li>
                <li class="clearfix">
                    <span class="txt-infor">企业性质：</span>{{merchantInformation.venProperties | venPropertiesfiter}}
                </li>
                <li class="clearfix">
                    <span class="txt-infor">主营类型：</span>{{merchantInformation.businessTypeName}}
                </li>
            </ul>
            <div class="u-next">
                <el-button type="primary" @click="perfectQualification">完善资质</el-button>
            </div>
        </div>
        <div class="u-getInfor">
            <div class="tit-content" style="margin-bottom: 20px;">
                资质信息
            </div>
            <el-table
                :data="tableDatas"
                style="width: 100%"
                border
                 ref="multipleTable"
                @selection-change="handleSelectionChange">
                <el-table-column type="selection" min-width="55" fixed="left"></el-table-column>
                <el-table-column label="资质名称" prop="apName" min-width="120">
                </el-table-column>
                <el-table-column label="资质图片" min-width="60">
                    <!-- 商品图片{{props.row.img}} -->
                    <template scope="scope">
                        <!-- 商品图片{{props.row.img}} -->
                        <div v-if="scope.row.apName === '身份证'">
                            <a :href="picServer + scope.row.apUrl" target="_blank">
                                <img :src="picServer + scope.row.apUrl"  alt="" width="60" height="30">
                            </a>
                            <a :href="picServer + scope.row.idcardBack" target="_blank">
                                <img :src="picServer + scope.row.idcardBack"  alt="" width="60" height="30">
                            </a>
                        </div>
                        <div v-else class="z-imgbox">
                            <a :href="picServer + scope.row.apUrl" target="_blank">
                                <img :src="picServer + scope.row.apUrl"  alt="" width="60" height="60">
                            </a>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="证件号码"  prop="apNum" min-width="120">
                </el-table-column>
                <el-table-column label="证件到期时间" prop="endDate" min-width="120">
                    <template scope="scope">
                        <div>
                            {{scope.row.endDate == '1' ? '长期有效' :  scope.row.endDate}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="审核状态" prop="apStatus" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.apStatus | venSatatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作用户" prop="modifyUser" min-width="120">
                </el-table-column>
                <el-table-column label="操作" width="110" fixed="right">
                    <template scope="scope">
                        <div class="btn-in-table">
                            <a href="javascript:;"  class="s-blue" @click="editBtn(scope.row)">修改</a>
                            <a href="javascript:;" v-if="scope.row.apStatus == 1" class="s-blue" @click="AuditeMethodGo(scope.row, '审核')">审核</a>
                            <a href="javascript:;" v-if="scope.row.apStatus == 2" class="s-blue" @click="AuditeMethodGo(scope.row, '驳回')">驳回</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="options">
            <el-button type="primary" @click="toExamine">审核</el-button>
            <el-button  @click="goBack">返回</el-button>
        </div>
        <!--批量设置弹框-->
        <div class="reset-dialog">
            <div  class="reset-dialog dialog_wid340 textare_reset300" >
                <el-dialog title="审核资质" :visible.sync="dialogVisible">
                    <div class="prompt" v-if="submitbut">确定要审核？</div>
                    <div class="prompt">若驳回，请填写原因</div>
                    <textarea v-model="rejectext" :maxlength="200"  placeholder="请输入驳回理由"></textarea>
                    <span class="last-num">{{rejectextNum}}/200</span>
                    <div slot="footer" class="dialog-footer">
                        <el-button type="primary" v-if="submitbut" :loading="sucesLoading" @click="AuditedMethodsubmit">通过</el-button>
                        <el-button @click="rejectAudited" :loading="errLoading">驳回</el-button>
                        <el-button @click="dialogVisible = false">取 消</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            submitbut: true,
            dialogImageUrl: '',
            picServer: '',
            rejectext: '',
            dialogVisible: false,
            tableDatas: [],
            seletRow: null,
            sucesLoading: false,
            errLoading: false,
            selectedArray: '', // 审核勾选数据记录
            merchantInformation: [],
            productRul: '/xe-route/xe-mis'
//            productRul: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        perfectQualification() {
            this.$router.push({name: 'fullofqualification', query: {userCode: this.$route.query.userCode}});
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file;
            this.dialogVisible = true;
        },
        editBtn(row) {
            this.$router.push({name: 'editofqualification', query: {apId: row.apId, userCode: row.userCode}});
        },
        enquiryForm() {
            let userCode = this.$route.query.userCode;
            if (userCode) {
                let params = {};
                params.userCode = userCode;
                this.$http({
                    method: 'post',
                    url: `${this.productRul}/manager/aptitudemanager/queryAptitudeDetail`,
                    data: params
                }).then((res) => {
                    console.log('--66--!!>', res);
                    if (res.data.infoAptitudeList.length > 0) {
                        this.picServer = res.data.picServer;
                        this.tableDatas = res.data.infoAptitudeList;
                        this.merchantInformation = res.data.venInfo;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$router.go(-1);
            }
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
            console.log('val--', val);
        },
        AuditeMethodGo(id, tishi) {
//            this.$confirm(`确定要对证件号码${id.apNum}进行审核么？`, '提示', {
//                confirmButtonText: '确定',
//                cancelButtonText: '取消',
//                type: 'warning'
//            }).then(() => {
//            }).catch(() => {
//                this.dialogVisible = false;
//            });
//            this.selectedArray = '';
            this.dialogVisible = true;
            this.toggleSelection();
            this.seletRow = id;
            if (tishi === '驳回' && id.apStatus === 2) {
                this.submitbut = false;
            }
            if (tishi === '审核') {
                this.submitbut = true;
            }
            console.log('this.seletRow', this.seletRow);
        },
        toExamine() {
            this.submitbut = true;
            if (this.selectedArray.length > 0) {
                this.dialogVisible = true;
            } else {
                this.$alert('请勾选需要审核的信息', {
                    type: 'info'
                });
            }
        },
        AuditedMethodsubmit() {
            if (this.selectedArray.length > 0) {
                this.selectedArray.some((item) => {
                    if (item.apStatus !== 2) {
                        this.AuditedMethod(2);
                    } else {
                        this.$alert('您勾选的商户已经通过审核，请重新选择', {
                            type: 'info',
                            callback: action => {
                                this.dialogVisible = false;
                            }
                        });
                    }
                });
            }
            if (this.seletRow && this.seletRow !== 2) {
                this.AuditedMethod(2);
            }
        },
        AuditedMethod(status) {
            let params = {};
            let seletArray = this.selectedArray;
            if (status === 2) {
                this.sucesLoading = true;
                if (this.seletRow) {
                    let arr = [];
                    arr.push(this.seletRow.apId);
                    params.apIds = arr;
                } else {
                    if (seletArray.length) {
                        let apIds = [];
                        for (let i in seletArray) {
                            if (seletArray[i].apStatus !== 3) {
                                apIds.push(seletArray[i].apId);
                            }
                        }
                        params.apIds = apIds;
                    }
                }
                params.apStatus = 2;
            } else if (status === 3) {
                let apIds = [];
                this.errLoading = true;
                if (this.seletRow) {
                    params.apIds = [this.seletRow.apId];
                }
                if (seletArray.length) {
                    for (let i in seletArray) {
                        if (seletArray[i].apStatus !== 3) {
                            apIds.push(seletArray[i].apId);
                        }
                    }
                    params.apIds = apIds;
                }
                params.apRejectReason = this.rejectext;
                params.apStatus = 3;
            }
            params.userCode = this.$route.query.userCode;
            console.log('params---》', params);
            this.$http({
                method: 'post',
                url: `${this.productRul}/manager/aptitudemanager/updateApStatusByIds`,
                data: params
            }).then((res) => {
                console.log('--66--!!>', res);
                this.dialogVisible = false;
                this.rejectext = '';
                if (status === 2) {
                    window.$wxeMessage({
                        type: 'success',
                        message: `审核通过`
                    });
                    this.sucesLoading = false;
                } else if (status === 3) {
                    window.$wxeMessage({
                        type: 'success',
                        message: `驳回通过`
                    });
                    this.errLoading = false;
                }
                if (this.selectedArray) {
                    for (let i in this.selectedArray) {
                        for (let j in this.tableDatas) {
                            if (this.selectedArray[i].apId === this.tableDatas[j].apId) {
                                console.log('this.merchantInformation[j].apId', this.tableDatas[j].apId);
                                this.tableDatas[j].apStatus = status;
                                this.selectedArray[i].apStatus = status;
                            }
                        }
                    }
                }
                if (this.seletRow) {
                    for (let o in this.tableDatas) {
                        if (this.tableDatas[o].apId === this.seletRow.apId) {
                            this.tableDatas[o].apStatus = status;
                        }
                    }
                }
                this.seletRow = null;
            }).catch((error) => {
                console.log(error);
                if (this.sucesLoading === true) {
                    this.sucesLoading = false;
                }
                if (this.errLoading === true) {
                    this.errLoading = false;
                }
            });
        },
        rejectAudited() {
            if (this.seletRow) {
                if (this.seletRow.apStatus !== 3) {
                    if (this.rejectext) {
                        this.AuditedMethod(3);
                    } else {
                        this.$alert('请填写驳回原因', {
                            type: 'info'
                        });
                    }
                } else {
                    this.$alert('您勾选的商户已经属于驳回状态，请您重新勾选', {
                        type: 'info',
                        callback: action => {
                            this.dialogVisible = false;
                        }
                    });
                }
            }
            if (this.selectedArray.length > 0) {
                let flag = this.selectedArray.some((item) => {
                    return item.apStatus !== 3;
                });
                if (flag) {
                    if (this.rejectext) {
                        this.AuditedMethod(3);
                    } else {
                        this.$alert('请填写驳回原因', {
                            type: 'info'
                        });
                    }
                } else {
                    this.$alert('您勾选的商户已经属于驳回状态，请您重新勾选', {
                        type: 'info',
                        callback: action => {
                            this.dialogVisible = false;
                        }
                    });
                }
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    },
    computed: {
        rejectextNum: function() {
            return this.rejectext.length;
        }
    }
};
</script>

<style lang="scss" scoped>
    .u-next{
        margin-top: 5px;
    }
    .el-form-item__error {
        padding-top: 2px;
    }
    .el-form-item {
        margin-bottom: 16px;
    }
</style>
