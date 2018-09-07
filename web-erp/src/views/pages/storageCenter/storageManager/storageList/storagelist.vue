<template lang="html">
    <div class="m-router-con">
        <!-- {{formData}} -->
        <div class="u-top-search">
            <el-form
                :inline="true"
                :model="formData"
                ref="formData"
                class="demo-form-inline">
                <el-form-item prop="storeId">
                    <el-select size="small" v-model="formData.storeId" placeholder="仓库名称">
                        <el-option label="仓库名称" value=""></el-option>
                        <template v-for="item in actionList">
                            <el-option :label="item.storeName" :value="item.storeId" :key="item.storeId"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item prop="storeType" class="z-mr30">
                    <el-select size="small" v-model="formData.storeType" placeholder="仓库类型">
                        <el-option label="仓库类型" value=""></el-option>
                        <template v-for="item in storeTypeList">
                            <el-option :label="item.name" :value="item.value" :key="item.value"></el-option>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item prop="areaIds" class="z-mr30" v-show="false">
                    <areaselectTag size="small" v-model='formData.areaIds' :width='170' :changeOnSelect="true"></areaselectTag>
                </el-form-item>
                <el-form-item>
                    <el-button class="xe-button-normal" type="primary" @click="onSubmit">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal"  @click="resetForm('formData')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="linktoAdd"><i class="iconfont icon-xinzeng"></i>
                新增仓库
            </el-button>
            <el-button class="xe-button-normal" @click="outData"><i class="iconfont icon-daochu"></i>
                导出
            </el-button>
        </div>
        <!-- @sort-change="changePhone" -->
        <!-- {{multipleSelection}} -->
        <el-table
            ref="multipleTable"
            :data="list"
            border
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="34" class-name="selectionTd" fixed></el-table-column>
            <!-- :filters="[{ text: '未启用', value: 1 }, { text: '启用', value: 2 }]"
            :filter-method="filterStatus" -->
            <el-table-column
                prop="storeStatus"
                label="仓库状态"
                width="115">
                <template scope="props">
                    {{props.row.storeStatus | storeStatusToText}}
                </template>
            </el-table-column>
            <el-table-column prop="storeName" label="仓库名称" width="105"></el-table-column>
            <!-- <el-table-column prop="storeId" label="仓库代码" width="95"></el-table-column> -->
            <el-table-column prop="storeId" label="仓库编码" min-width="95"></el-table-column>
            <el-table-column prop="area" label="所在地" min-width="95"></el-table-column>
            <el-table-column prop="storeType" label="仓库类型" min-width="95">
                <template scope="props">
                    {{props.row.storeType | storeTypeToText}}
                </template>
            </el-table-column>
            <el-table-column prop="negativeFlag" label="负库存" min-width="95">
                <template scope="props">
                    {{props.row.negativeFlag | negativeFlagToText}}
                </template>
            </el-table-column>
            <el-table-column prop="recordInventoryFlag" label="记录库存" min-width="95">
                <template scope="props">
                    {{props.row.recordInventoryFlag | recordInventoryFlagToText}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="storeUse" label="仓库用途" min-width="95"></el-table-column> -->
            <!-- <el-table-column prop="storeAcreage" label="使用面积" min-width="95"></el-table-column> -->
            <!-- <el-table-column prop="storeWarm" label="库温" min-width="95"></el-table-column> -->
            <el-table-column prop="contactPerson" label="仓库联系人" min-width="105"></el-table-column>
            <el-table-column prop="storeTel" label="联系电话" min-width="115"></el-table-column>
            <el-table-column prop="storeAddress" label="详细地址" min-width="145"></el-table-column>
            <!-- <el-table-column prop="wms" label="WMS接入状态" min-width="115"></el-table-column> -->
            <el-table-column prop="tmsStatus" label="TMS接入状态" min-width="115">
                <template scope="props">
                    {{props.row.tmsStatus | tmsStatusToText}}
                </template>
            </el-table-column>
            <el-table-column label="操作"  width="110" fixed="right">
                <template scope="props">
                    <div class="btn-in-table">
                        <a href="javascript:;" class="s-blue f-edit" @click="linktoEdit(props.row)">编辑</a>
                        <a href="javascript:;" class="s-blue" @click="updataStorage(props, 1)" v-if="props.row.storeStatus === 1">启用</a>
                        <a href="javascript:;" class="s-blue" @click="updataStorage(props, 2)" v-if="props.row.storeStatus === 2">禁用</a>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <!--分页=======start-->
        <div class="page-showbox">
            <div class="xe-pagination-panel">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="xePageInfo.currPage"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="xePageInfo.pageSize"
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="xePageInfo.total">
                </el-pagination>
            </div>
        </div>
        <!--分页=======end-->
    </div>
</template>
<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    import {storeType} from '@/dataControl.js';
    export default {
        data() {
            return {
                outerUrl: '',
                dialogVisible: false,
                value1: '',
                value2: '',
                formData: {
                    areaOrgCode: '',
                    storeType: '',
                    areaIds: [],
                    storeStatus: '',
                    storeId: ''
                },
                xePageInfo: {
                    currPage: 1,
                    pageSize: 10,
                    total: 0
                },
                list: [],
                actionList: [],
                multipleSelection: []
            };
        },
        created() {
            this.loadqueryStore();
            this.creatInf(1, this.formData);
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                this.creatInf(1, this.formData);
            },
            outData() {
                console.log('test', this.outerUrl);
                window.open(this.outerUrl, '_blank');
            },
            filterStatus(value, row) {
                console.log('testfiltervalue', value);
                this.formData.storeStatus = value;
                return row.storeStatus === value;
            },
            handleSizeChange(val) {
                this.xePageInfo.pageSize = val;
                this.creatInf(this.xePageInfo.pageNum, this.formData);
            },
            handleCurrentChange(val) {
                this.xePageInfo.pageNum = val;
                this.creatInf(this.xePageInfo.pageNum, this.formData);
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            updataStorage(prop, type) {
                // type 1 qu启用 2 qu禁用
                this.$confirm('确定改变仓库的状态吗？是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ajaxurl = '';
                    let param = {};
                    if (type === 1) {
                        ajaxurl = '/xe-route/xe-erp/storeManager/enableStore';
                        param = {
                            storeId: prop.row.storeId,
                            storeStatus: 2,
                            storeType: prop.row.storeType
                        };
                    } else {
                        ajaxurl = '/xe-route/xe-erp/storeManager/disableStore';
                        param = {
                            storeId: prop.row.storeId,
                            storeStatus: 1,
                            storeType: prop.row.storeType
                        };
                    }
                    this.$http({ // 查询仓库名称列表
                        method: 'post',
                        url: ajaxurl,
                        data: param
                    }).then((res) => {
                        if (type === 1) {
                            prop.row.storeStatus = 2;
                        } else {
                            prop.row.storeStatus = 1;
                        }
                        this.$xeMessage.success(res.msg);
                    }).catch((error) => {
                        console.log(error);
                    });
                }).catch((cancel) => {
                    console.log(cancel);
                });
            },
            linktoAdd() {
                this.$router.push({name: 'addstorage'});
            },
            linktoEdit(row) {
                console.log('testrow', row);
                this.$router.push({name: 'editorstorage', query: {'storeId': row.storeId}});
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            loadqueryStore() {
                this.$http({ // 查询仓库名称列表
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        // 'lcfbFlag': ''
                    }
                }).then((res) => {
                    this.$set(this, 'actionList', res.data.actionList);
                    // this.actionList = res.data.actionList;
                    console.log('actionList', this.actionList);
                }).catch((error) => {
                    console.log(error);
                });
            },
            creatInf(pageNum, formData) {
                let data = {};
                data = formData;
                data.areaOrgCode = this.areaOrgCode;
                data.pageNum = pageNum;
                data.pageSize = this.xePageInfo.pageSize;
                console.log(data);
                this.outerUrl = '/xe-route/xe-erp/storeCenterExport/storeList?areaOrgCode=' + data.areaOrgCode + '&storeId=' + data.storeId + '&storeStatus=' + data.storeStatus + '&storeType=' + data.storeType;
                this.$http({ // 查询仓库列表
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreInfoList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.list = res.data.actionList;
                        this.xePageInfo = res.data.xePageInfo;
                        this.picServer = res.data.picServer;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            }
        },
        computed: {
            areaOrgCode() {
                if (this.formData.areaIds.length > 0) {
                    return this.formData.areaIds[this.formData.areaIds.length - 1];
                } else {
                    return '';
                }
            },
            storeTypeList() {
                return storeType;
            }
        },
        components: {
            areaselectTag
        }
    };
</script>

<style lang="scss">
</style>
