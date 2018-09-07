<template lang="html">
    <div class="m-router-con">
        <!-- {{formData}} -->
        <div class="u-top-search">
        	<el-form 
                :inline="true" 
                :model="formData" 
                ref="formData" 
                class="demo-form-inline">
                <el-form-item prop="searchText">
                    <el-input placeholder="供货商编码/名称" v-model="formData.searchText" size="small"></el-input>
                </el-form-item><el-form-item prop="supplierType">
                    <el-select v-model="formData.supplierType" filterable placeholder="请选择供货商类型" size="small">
                        <el-option
                            v-for="item in supplierTypeList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><el-form-item prop="checkStatus">
                    <el-select v-model="formData.checkStatus" filterable placeholder="审核状态" size="small">
                        <el-option
                            v-for="item in checkStatusList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><el-form-item prop="supplierStatus">
                    <el-select v-model="formData.supplierStatus" filterable placeholder="供货商状态" size="small">
                        <el-option
                            v-for="item in supplierStatusList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item><el-form-item>
                    <el-button  class="xe-button-normal" type="primary" @click="search">
                        查询
                    </el-button><el-button  class="xe-button-normal"  @click="resetForm('formData')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal">
                <i class="iconfont icon-daochu"></i>导出
            </el-button>
        </div>
        <!-- {{supplierList}} -->
        <div>
            <el-table
                :data="supplierList"
                border
                style="width: 100%">
                <el-table-column
                    label=""
                    fixed="left"
                    class-name="td-index"
                    width="30">
                    <template scope="props">
                        <span>{{props.$index + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="34" class-name="selectionTd" fixed="left"></el-table-column>
                <el-table-column
                    prop="supplierCode"
                    label="供货商编码"
                    min-width="156">
                </el-table-column>
                <el-table-column
                    prop="supplierName"
                    label="供货商名称"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    label="审核状态"
                    min-width="140">
                    <template scope="props">
                        <div>
                            {{props.row.checkStatus | checkStatusFn}}
                        </div>
                        <el-tooltip effect="dark" placement="top" v-if="props.row.checkStatus === 5">
                            <div slot="content" class="tips-item">{{props.row.financeRejectReason}}</div>
                            <a href="javascript:;" class="s-blue">驳回原因</a>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="supplierStatus"
                    label="供货商状态"
                    min-width="140">
                    <template scope="props">
                        {{props.row.supplierStatus | supplierStatusFn}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="linkName"
                    label="联系人"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    prop="createUser"
                    label="创建人"
                    min-width="140">
                </el-table-column>
                <el-table-column
                    label="操作"
                    fixed="right"
                    width="152">
                    <template scope="props">
                        <!-- 待财务部审核 驳回-->
                        <div class="btn-in-table" v-if="props.row.checkStatus === 4">
                            <a href="javascript:;" class="s-blue" @click="supplierDetails(props.row)">查看</a>
                            <a href="javascript:;" class="s-blue" @click="checkoutBtn(props.row)">审核</a>
                        </div>
                        <div class="btn-in-table" v-if="props.row.checkStatus === 5">
                            <a href="javascript:;" class="s-blue" @click="supplierDetails(props.row)">查看</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="page-showbox">
                <div class="xe-pagination-panel">
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="xePageInfo.pageNum"
                        :page-sizes="[10, 20, 50, 100]"
                        :page-size="xePageInfo.pageSize"
                        layout="total, prev, pager, next, sizes, jumper"
                        :total="xePageInfo.total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {checkStatus2, supplierType, supplierStatus2} from '@/dataControl.js';
export default {
    name: 'importofgoods',
    data() {
        return {
            formData: {
                supplierType: '',
                searchText: '',
                checkStatus: '',
                supplierStatus: ''
            },
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            supplierList: []
        };
    },
    created() {
        this.creatInf(1, this.formData);
    },
    methods: {
        search() {
            this.creatInf(1, this.formData);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        supplierDetails(row) { // 查看
            this.$router.push({name: 'finalsupplierDetails', query: {supplierCode: row.supplierCode, version: row.version}});
        },
        deletSingle(row) {
            if (row.supplierStatusPre !== 1 || row.checkStatusPre !== 1) {
                this.$xeMessage.warning('只有审核状态和采购状态是待提交状态可删除');
                return false;
            }
            let param = {
                supplierCode: row.supplierCode,                       // 供货商code
                checkStatusPre: 1,
                supplierStatusPre: 1,                                       // 采购状态(1: 待提交 只有待提交状态可删除 )
                version: row.version
            };
            this.$confirm('确认删除该供货商, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var _this = this;
                this.$http({ // 删除供货商
                    method: 'post',
                    url: '/xe-route/xe-erp/supplier/delSupplier',
                    data: param
                }).then((res) => {
                    if (res.status === '0000') {
                        this.$xeMessage.success(res.msg);
                        setTimeout(function () {
                            _this.creatInf(this.xePageInfo.pageNum, this.formData);
                        }, 500);
                    }
                }).catch((error) => {
                    if (error.status === '0001') {
                        this.$xeMessage.warning(error.msg);
                    }
                });
            }).catch((cancel) => {
                console.log(cancel);
            });
        },
        checkoutBtn(row) { // 审核
            this.$router.push({name: 'checkSuppliers', query: {supplierCode: row.supplierCode, version: row.version}});
        },
        handleSizeChange(val) {
            this.xePageInfo.pageSize = val;
            this.creatInf(this.xePageInfo.pageNum, this.formData);
        },
        handleCurrentChange(val) {
            this.xePageInfo.pageNum = val;
            this.creatInf(this.xePageInfo.pageNum, this.formData);
        },
        changemodifyDate(val) {
            this.formData.modifyDate = val;
        },
        changecreateDate(val) {
            this.formData.createDate = val;
        },
        creatInf(pageNum, formData) {
            let data = {};
            data = formData;
            data.pageNum = pageNum;
            data.pageSize = this.xePageInfo.pageSize;
            this.$http({ // 查询区域商品导入
                method: 'post',
                url: '/xe-route/xe-erp/supplier/querySupplierCheckList',
                data: data
            }).then((res) => {
                this.supplierList = res.data.supplierList;
                this.xePageInfo = res.data.xePageInfo;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    filters: {
        checkStatusFn(val) {
            let checkStatussource = '';
            switch (val) {
                case 1: {
                    checkStatussource = '待提交';
                    break;
                }
                case 2: {
                    checkStatussource = '待商品部审核';
                    break;
                }
                case 3: {
                    checkStatussource = '商品部驳回';
                    break;
                }
                case 4: {
                    checkStatussource = '待财务部审核';
                    break;
                }
                case 5: {
                    checkStatussource = '财务部驳回';
                    break;
                }
                case 6: {
                    checkStatussource = '已审核待签订';
                    break;
                }
                case 7: {
                    checkStatussource = '已签订';
                    break;
                }
            }
            return checkStatussource;
        },
        supplierStatusFn(val) {
            let supplierStatussource = '';
            switch (val) {
                case 1: {
                    supplierStatussource = '待提交';
                    break;
                }
                case 2: {
                    supplierStatussource = '审核中';
                    break;
                }
                case 3: {
                    supplierStatussource = '正常';
                    break;
                }
                case 4: {
                    supplierStatussource = '冻结';
                    break;
                }
            }
            return supplierStatussource;
        }
    },
    computed: {
        checkStatusList() {
            return checkStatus2;
        },
        supplierTypeList() {
            return supplierType;
        },
        supplierStatusList() {
            return supplierStatus2;
        }
    }
};
</script>

<style lang="scss">
</style>
