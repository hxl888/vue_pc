<template lang="html">
    <div class="m-router-con">
        <el-form ref="searchform" :model="searchform" :inline='true'>
            <div class="u-top-search">
                <el-form-item prop="codCheckMsgFlag">
                    <el-select size="small" class="xe-input-l40" placeholder="验证状态" v-model="searchform.codCheckMsgFlag">
                        <el-option v-for="item in userTypeStatuslist"
                            :key="item.name"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="venName">
                  <el-input placeholder="供应商名称" class="xe-input-l40" v-model="searchform.venName"></el-input>
                </el-form-item>
                <el-form-item prop="loginAccount">
                  <el-input placeholder="供应商账号" class="xe-input-l40" v-model="searchform.loginAccount"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 20px">
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                    <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
                </el-form-item>
            </div>
        </el-form>
        <div class="u-opera-btnBox">
                <el-button class="xe-button-normal" @click="statusChangeList(1)"><i class="iconfont icon-qiyong"></i> 开启</el-button>
                <el-button class="xe-button-normal" @click="statusChangeList(2)"><i class="iconfont icon-jinyong"></i> 关闭</el-button>
        </div>
        <el-table highlight-current-row ref="multipleTable" :data="xeVenInfoList" border tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column  min-width="55" fixed="left">
                <template scope="scope">
                    {{scope.$index+1}}
                </template>
            </el-table-column>
            <el-table-column type="selection" width="50"></el-table-column>
            <el-table-column prop="userCode" label="商户ID" min-width="150"></el-table-column>
            <el-table-column prop="userPhone" label="账号" min-width="150">
            </el-table-column>
            <el-table-column prop="venName" min-width="150" label="商户/企业名称"></el-table-column>
            <el-table-column prop="" min-width="100" label="验证状态">
                <template scope="scope">
                    <div>
                        {{scope.row.codCheckMsgFlag | userTypeStatusfilter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column min-width="100" label="商户性质">
                <template scope="scope">
                    <div>
                        {{scope.row.venType | venTypefiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" min-width="100" label="运营模式">
                <template scope="scope">
                    <div>
                        {{scope.row.autoOperationFlag | autoOperationFlagfiter}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="createUser" min-width="120" label="操作人"></el-table-column>
            <el-table-column prop="" min-width="150" label="操作时间">
                <template scope="scope">
                    <div>
                        {{scope.row.createDate | millisecondFormat('ms')}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="" width="170" label="操作" fixed="right">
                <template scope="scope">
                    <div class="btn-in-table">
                        <a href="javascript:;" v-if="scope.row.codCheckMsgFlag === 2" class="s-blue" @click="statusChange(scope.row)">开启</a>
                        <a href="javascript:;" v-if="scope.row.codCheckMsgFlag === 1" class="s-blue" @click="statusChange(scope.row)">关闭</a>
                        <a href="javascript:;" v-if="scope.row.codCheckMsgFlag === 1" class="s-blue" @click="setAreaCell(scope.row)">设置区域</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
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
        <!--使用区域选择-->
        <el-dialog class="el-tree-dialog" title="选择配送区域" :visible.sync="dialogTableVisible" ref="useAreaDialog">
            <useAreaList
                ref="useAreaList"
                :defaultData="areaSendList"
                :userCodeTmp="userCodeTmp"
                :propKeys="{
                    id: 'areaId',
                    name: 'areaName',
                    ajaxParams: 'areaId', // 接口入参字符串
                    responseStr: 'saleAreaList' // 接口response字符串
                }"
                ajaxUrl="/xe-route/xe-mis/manager/venmanager/querySaleAreaListByUser"
                @on-result-change="resultChanges"
            ></useAreaList>
            <!-- {{userCodeTmp}} -->
            <h4 class="areaSelectTit">已选区域</h4>
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
                <el-button @click="treeSureBtn" type="primary">确定</el-button>
                <el-button @click="dialogTableVisible = false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {userTypeStatus} from '@/dataControl';
    import useAreaList from 'components/useAreaList/useAreaList';
    export default {
        data() {
            return {
                // areaTags: [],
                userCodeTmp: '',
                provinceData: [],
                proList: [],
                cityData: [],
                cityList: [],
                areaData: [],
                areaList: [],
                xeVenInfoList: [],
                searchform: {
                    venName: '',
                    codCheckMsgFlag: '',
                    loginAccount: ''
                },
                multipleSelection: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                dialogTableVisible: false,
                // orderAddresData: [{
                areaTags: [],
                useArea: [],
                areaSendList: [],
                    // total: 0
                // }],
                productUrl: '/xe-route/xe-mis'
            };
        },
        created() {
            this.enquiryForm(1, this.searchform);
        },
        mounted() {
            this.$nextTick(() => {
                this.$refs.useAreaDialog.$data.rendered = true;
            });
        },
        methods: {
            resultChanges(data) {
                this.areaTags = data.resultTexts;
            },
            tagHandleClose(tag, index) {
                console.log(tag);
                this.$refs.useAreaList.removeData(tag.areaId, () => {
                    this.areaTags.splice(index, 1);
                });
            },
            onSubmit() {
                this.enquiryForm(1, this.searchform);
            },
            enquiryForm(pageNum, searchform) {
                let data = {};
                data = searchform;
                data.venSatatus = 4;
                data.pageNum = pageNum;
                data.pageSize = this.pageInfo.pageSize;
                this.$http({ // 查询采购单列表
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/queryVenList',
                    data: data
                }).then((res) => {
                    this.xeVenInfoList = res.data.xeVenInfoList;
                    this.pageInfo = res.data.pageInfo;
                    // this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.enquiryForm(1, this.searchform);
            },
            setAreaCell(row) {
                this.userCodeTmp = row.userCode;
                this.dialogTableVisible = true;
                this.$refs.useAreaList.initData2();
                this.$http({ // 回显供应商设置的区域货到付款验证地区
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/getVerifyArea',
                    data: {
                        userCode: row.userCode
                    }
                }).then((res) => {
                    // console.log('testres', res.data);
                    this.areaSendList = res.data.list;
                    let areaSendList = res.data.list;
                    if (areaSendList !== '' && areaSendList.length > 0) {
                        // 覆盖区域选择组件回显
                        let result = {
                            resultIds: [],
                            resultTexts: []
                        };
                        areaSendList.forEach(item => {
                            if (item.areaCheckBoxFlag === 1) {
                                result.resultIds.push(item.areaId);
                                let obj = {
                                    areaId: `${item.areaId}`,
                                    areaName: `${item.areaName}`
                                };
                                result.resultTexts.push(obj);
                            } else {
                                if (item.areaList.length) {
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
                            }
                        });
                        this.areaTags = result.resultTexts;
                        this.useArea = result.resultIds;
                        console.log(areaSendList);
                    } else {
                        this.areaTags = [];
                        this.useArea = [];
                    }
                    console.log('testres.data.list', res.data.list.length);
                    // this.areaSendList = res.data.list;
                    // this.areaTags = res.data.list;
                    // if (this.areaTags.length) {
                    //     this.areaTags.forEach(item => {
                    //         item.areaId = item.areaOrgCode.slice(1, -1).split('_').join('-');
                    //     });
                    // }
                    // this.$refs.useAreaList.resetData(this.areaTags);
                }).catch((error) => {
                    console.log(error);
                });
            },
            treeSureBtn() {
                let resultData = this.$refs.useAreaList.getDataResult();
                this.useArea = resultData.resultIds;
                this.areaTags = resultData.resultTexts;
                if (!this.useArea.length) {
                    this.$xeMessage.warning('请选择一个你要开通的货到付款区域');
                    return false;
                }
                this.$http({ // 供应商设置区域货到付款验证
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/venmanager/setCodMsgArea',
                    data: {
                        userCode: this.userCodeTmp,
                        areaArray: this.useArea
                    }
                }).then((res) => {
                    this.$xeMessage.success(res.msg);
                }).catch((error) => {
                    console.log(error);
                });
                this.dialogTableVisible = false;
            },
            areaTagsClose(areaId, index) {
                this.$refs.useAreaList.removeData(areaId, () => {
                    this.areaTags.splice(index, 1);
                    let areaIds = areaId.split('-');
                    let sindex = this.useArea.indexOf(areaIds[areaIds.length - 1]);
                    this.useArea.splice(sindex, 1);
                    if (this.areaTags.length <= 0) {
                        this.useArea = '';
                    }
                });
            },
            statusChangeList(type) {
                // 1 去启用
                let _this = this;
                if (this.multipleSelection.length === 0) {
                    if (type === 1) {
                        this.$xeMessage.warning('请先选择需要开启货到付款验证的商户');
                    } else if (type === 2) {
                        this.$xeMessage.warning('请先选择需要关闭货到付款验证的商户');
                    }
                    return false;
                }
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [];
                checkInfoObj.disArr = [];
                checkInfoObj.tips = '';
                _this.multipleSelection.forEach(function(value) {
                    if (type === 1) { // 去开启
                        if (value.codCheckMsgFlag === 2) {
                            checkInfoObj.formSupInfoArr.push(value.userCode);
                        } else {
                            checkInfoObj.disArr.push(value.userCode);
                        };
                    } else {
                        if (value.codCheckMsgFlag === 1) {
                            checkInfoObj.formSupInfoArr.push(value.userCode);
                        } else {
                            checkInfoObj.disArr.push(value.userCode);
                        };
                    }
                });
                if (checkInfoObj.formSupInfoArr.length === 0) {
                    if (type === 1) {
                        this.$xeMessage.warning('当前状态都已为开启。');
                    } else if (type === 2) {
                        this.$xeMessage.warning('当前状态都已为关闭。');
                    }
                    return false;
                }
                if (type === 1) {
                    checkInfoObj.tips = '仅启用禁用状态的用户数据。';
                } else if (type === 2) {
                    checkInfoObj.tips = '仅启用开启状态的用户数据。';
                }
                checkInfoObj.url = '/xe-route/xe-mis/manager/venmanager/setMsgOpenOrClose';
                checkInfoObj.title = {
                    1: '开启',
                    2: '关闭'
                };
                this.$confirm(checkInfoObj.tips, checkInfoObj.title[type], {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({ // 开启关闭货到付款验证
                        method: 'post',
                        url: checkInfoObj.url,
                        data: {
                            userCode: checkInfoObj.formSupInfoArr,
                            flag: type
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
            statusChange(row) {
                let checkInfoObj = {};
                checkInfoObj.formSupInfoArr = [row.userCode];
                checkInfoObj.tips = '';
                if (row.codCheckMsgFlag === 1) {
                    checkInfoObj.tips = '确定对选中商户关闭货到付款验证？';
                    checkInfoObj.flag = 2;
                } else if (row.codCheckMsgFlag === 2) {
                    checkInfoObj.tips = '确定对选中商户开通货到付款验证？';
                    checkInfoObj.flag = 1;
                }
                checkInfoObj.url = '/xe-route/xe-mis/manager/venmanager/setMsgOpenOrClose';
                checkInfoObj.title = {
                    1: '确认关闭',
                    2: '确认开启'
                };
                this.$confirm(checkInfoObj.tips, checkInfoObj.title[row.codCheckMsgFlag], {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$http({ // 开启关闭货到付款验证
                        method: 'post',
                        url: checkInfoObj.url,
                        data: {
                            userCode: checkInfoObj.formSupInfoArr,
                            flag: checkInfoObj.flag
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
            handleSelectionChange(val) {
                console.log('testvals', val);
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.enquiryForm(this.pageInfo.pageNum, this.searchform);
            }
        },
        components: {
            useAreaList
        },
        computed: {
            userTypeStatuslist() {
                return userTypeStatus;
            }
        }
    };
</script>
