<template lang="html">
    <div class="recycleBin m-router-con">
        <!--盘点单-->
        <div class="publicorder-serch" v-if="this.ceOn !== 1">
            <div class="u-top-search">
                <el-form ref="formData" :model="formData" :inline="true">
                    <el-form-item prop="storeId">
                        <el-select size="small" v-model="formData.storeId" placeholder="选择仓库" calerable filterable class="xe-input-l40">
                            <el-option
                                    v-for = "item in actionList"
                                    :key="item.storeId"
                                    :label = "item.storeName"
                                    :value = "item.storeId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="cateIds">
                        <categoryTag :filterable="true" v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                    </el-form-item>
                    <el-form-item prop="checkRemark">
                        <el-input v-model="peservationData.checkRemark" size="small" placeholder="盘点备注" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('formData')">重置</el-button>
                        <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索
                        </el-button>
                    </el-form-item>
                </el-form>
                <!--高级搜索样式start-->
                    <div class="advancedSearch" @click.stop>
                        <div class="serch-head clearfix">
                            <span class="title fl">高级搜索</span>
                            <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                        </div>
                        <div class="serch-content">
                            <el-form :inline="true" :model="formData" ref="formData" class="demo-form-inline" label-width="65px">
                                <div>
                                    <el-form-item prop="storeId" label="仓库名称">
                                        <el-select size="small" v-model="formData.storeId" placeholder="选择仓库" calerable filterable class="xe-input-l40">
                                            <el-option
                                                    v-for = "item in actionList"
                                                    :key="item.storeId"
                                                    :label = "item.storeName"
                                                    :value = "item.storeId">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="cateIds" label="商品分类">
                                        <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                                    </el-form-item>
                                </div>
                                <div>
                                    <el-form-item prop="searchType">
                                        <el-select size="small" class="xe-input-w110" v-model="formData.searchType" placeholder="请选择">
                                            <el-option label="商品名称" value='1'></el-option>
                                            <el-option label="商品货号" value='2'></el-option>
                                        </el-select>
                                    </el-form-item>
                                    <el-form-item prop="proName">
                                        <el-input size="small" :placeholder="placeholder" v-model="formData.proName" class="">
                                        </el-input>
                                    </el-form-item>
                                </div>
                            </el-form>
                            <div>
                                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                                <el-button class="xe-button-normal"  @click="resetForm('formData')">重置</el-button>
                            </div>
                        </div>
                    </div>
                <!--高级搜索样式end-->
            </div>
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="Preservation(1)" class="xe-button-normal"><i class="iconfont icon-kaishi"></i>
                保存并退出
            </el-button>
            <!-- <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i>
                导出
            </el-button> -->
            <el-button @click="Preservation(2)" class="xe-button-normal"><i class="iconfont icon-daochu"></i>
                完成盘点
            </el-button>
        </div>
        <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="index" min-width="60" label=" ">
                    </el-table-column>
                    <el-table-column prop="proNum" label="商品货号" min-width="95"></el-table-column>
                    <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
                    <el-table-column prop="proCategoryName" label="商品分类" min-width="180"></el-table-column>
                    <el-table-column  v-if="this.ceOn !== 1" prop="proPricingType" label="计量方式" min-width="95">
                        <template scope="scope">
                            {{scope.row.proPricingType | pricingTypeToText}}
                        </template>
                    </el-table-column>
                    <el-table-column v-if="this.ceOn === 1" prop="pricingType" label="计量方式" min-width="95">
                        <template scope="scope">
                            {{scope.row.pricingType | pricingTypeToText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="proUnit" label="单位" min-width="95"></el-table-column>
                    <el-table-column prop="proSpecValue" label="规格" min-width="95"></el-table-column>
                    <el-table-column prop="proSku" label="商品SKU编号" min-width="150"></el-table-column>
                    <el-table-column v-if="this.ceOn !== 1" prop="actualInv" label="库存数量" min-width="95"></el-table-column>
                    <el-table-column v-if="this.ceOn === 1" prop="stockNum" label="库存数量" min-width="95"></el-table-column>
                    <el-table-column prop="checkStockNum" label="盘点数量" min-width="120">
                        <template scope="scope">
                            <div>
                                <el-input class="xe-input-h24" @input.native='numberParse($event)' :maxlength="9" @blur="calculationDifference(scope.row)" v-model="scope.row.checkStockNum" placeholder="请输入盘点数量">
                                </el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkStockDifference" label="盘点差异" min-width="95">
                        <template scope="scope">
                            <div v-if="scope.row.checkStockDifference === ''">
                                0
                            </div>
                            <div v-else>
                                {{parseFloat(scope.row.checkStockDifference).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkStockStatus" label="盘点状态" min-width="95">
                        <template scope="scope">
                            {{scope.row.checkStockStatus | checkStateToText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="checkStockResult" label="盘点结果" min-width="95">
                        <template scope="scope">
                            {{scope.row.checkStockResult | checkStockresultToText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="createUser" label="盘点人" min-width="120"></el-table-column>
                </el-table>
                <div class="inventTips">
                    （1）盘点时不要做出入库单据，如果做单据请暂时存入草稿；（2）为避免误操作，建议在录入盘点数据前锁定查询；（3）录入盘点数据后系统会自动保存；
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
            </div>
        </div>
    </div>
</template>
<script>
    import categoryTag from '@/components/category/category';
    import {checkStockStatus} from '@/dataControl.js';
    export default {
        data() {
            return {
                pdlength: 7,
                placeholder: '请输入',
                actionList: [],
                diffent: '',
                formData: {
                    cateIds: [],
                    proCategory: '', // 商品分类
                    storeId: '', // 仓库编码 必填
                    searchType: '',
                    proName: ''

                },
                tableData: [],
                pageInfo: {
                    pageNum: 1,
                    pageSize: 10,
                    total: 0
                },
                peservationData: {
                    detailList: [],
                    checkRemark: '',
                    checkStockStatus: '',
                    storeId: '',
                    storeName: ''
                },
                cxUrl: '/xe-route/xe-erp/storeInvtory/queryInvProList',
                ediUrl: '/xe-route/xe-erp/checkManager/queryCheckDetailList',
                xgwcUrl: '/xe-route/xe-erp/checkManager/editFinishCheck',
                xgbcUrl: '/xe-route/xe-erp/checkManager/editStoreCheck',
                ceOn: 0
            };
        },
        created() {
            if (this.$route.query.storetype) {
                this.formData.storeId = this.$route.query.storetype;
                this.creatInf(this.cxUrl);
            } else {
                this.formData.checkCode = this.$route.query.checkCode;
                this.creatInf(this.ediUrl);
                this.ceOn = 1;
            }
            this.pullDown();
        },
        methods: {
            numberParse(ev) {
                let value = ev.target.value;
                if (value < 10000000) {
                    ev.target.value = (value.match(/\d+(\.\d{0,2})?/) || [''])[0];
                } else {
                    window.$wxeMessage.warning('请输入正确范围内的数字');
                }
            },
            addAjax(n) {
                var that = this;
                var msg = '';
                let params = {};
                params = this.peservationData;
                params.checkStockStatus = n;
                let ajaxUrl = '/xe-route/xe-erp/checkManager/saveStoreCheck';
                if (n === 2) {
                    ajaxUrl = '/xe-route/xe-erp/checkManager/saveFinishCheck';
                }
                console.log(params);
                this.$http({
                    method: 'post',
                    url: ajaxUrl,
                    data: params
                }).then((res) => {
                    if (n === 1) {
                        msg = '保存成功';
                    } else {
                        msg = '盘点完成';
                    }
                    window.$wxeMessage({
                        type: 'success',
                        message: msg
                    });
                    setTimeout(function () {
                        that.$router.push({name: 'checkOrderList'});
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
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
            peservationList() {
                this.peservationData.detailList = [];
                for (let i in this.tableData) {
                    this.tableData[i].checkStockDifference = Math.abs(this.tableData[i].checkStockDifference);
                    if (this.tableData[i].checkStockNum !== '') {
                        this.tableData[i].pricingType = this.tableData[i].proPricingType;
                        this.tableData[i].stockNum = this.tableData[i].actualInv;
                        this.peservationData.detailList.push(this.tableData[i]);
                    }
                }
                this.peservationData.storeId = this.formData.storeId;
                this.peservationData.storeName = this.storeName;
            },
            peservaList() {
                this.peservationData.detailList = [];
                for (let i in this.tableData) {
                    this.tableData[i].checkStockDifference = Math.abs(this.tableData[i].checkStockDifference);
                    if (this.tableData[i].checkStockNum !== '') {
                        this.peservationData.detailList.push(this.tableData[i]);
                    }
                }
                this.peservationData.checkCode = this.$route.query.checkCode;
                this.peservationData.checkStockStatus = 2;
            },
            edibAjax(Url, n) {
                console.log(this.peservationData);
                var that = this;
                var msg = '';
                let params = {};
                params = this.peservationData;
                params.checkStockStatus = n;
                console.log(params);
                this.$http({
                    method: 'post',
                    url: Url,
                    data: params
                }).then((res) => {
                    if (n === 1) {
                        msg = '保存成功';
                    } else {
                        msg = '盘点完成';
                    }
                    window.$wxeMessage({
                        type: 'success',
                        message: msg
                    });
                    setTimeout(function () {
                        that.$router.push({name: 'checkOrderList'});
                    }, 300);
                }).catch((error) => {
                    console.log(error);
                });
            },
            Preservation(n) {
                if (this.ceOn === 1) {
                    this.peservaList();
                    if (n === 2) {
                        this.confimrFun(`您确认完成当前盘点单吗？`, () => {
                            this.edibAjax(this.xgwcUrl, n);
                        }, () => {
                            console.log('取消点击');
                        });
                    } else {
                        this.edibAjax(this.xgbcUrl, n);
                    }
                } else {
                    var _this = this;
                    this.peservationList();
                    console.log(this.peservationData.detailList.length);
                    if (this.peservationData.detailList.length === 0) {
                        this.confimrFun(`您未执行任何盘点操作，当前数据不会保存，您确认退出吗？`, () => {
                            setTimeout(function () {
                                _this.$router.push({name: 'checkOrderList'});
                            }, 300);
                        }, () => {
                            console.log('取消点击');
                        });
                    } else {
                        if (n === 2) {
                            this.confimrFun(`您确认完成当前盘点单吗？`, () => {
                                this.addAjax(n);
                            }, () => {
                                console.log('取消点击');
                            });
                        } else {
                            this.addAjax(n);
                        }
                    }
                }
            },
            calculationDifference(row) {
                if (row.checkStockNum) {
                    if (this.ceOn === 1) {
                        row.checkStockStatus = 2;
                        row.checkStockDifference = row.checkStockNum - row.stockNum;
                        if (row.checkStockDifference < 0) {
                            row.checkStockResult = 2;
                        } else if (row.checkStockDifference > 0) {
                            row.checkStockResult = 1;
                        } else {
                            row.checkStockResult = 3;
                        }
                    } else {
                        row.checkStockStatus = 2;
                        row.checkStockDifference = row.checkStockNum - row.actualInv;
                        if (row.checkStockDifference < 0) {
                            row.checkStockResult = 2;
                        } else if (row.checkStockDifference > 0) {
                            row.checkStockResult = 1;
                        } else {
                            row.checkStockResult = 3;
                        }
                    }
                } else {
                    row.checkStockDifference = '';
                    row.checkStockStatus = 1;
                }
            },
            onSubmit() {
                this.creatInf(this.cxUrl);
            },
//            仓库下拉
            pullDown() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/storeManager/queryStoreNameList',
                    data: {
                        lcfbFlag: ''
                    }
                }).then((res) => {
                    this.actionList = res.data.actionList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            creatInf(Url) {
                let data = {};
                data = this.formData;
                data.pageNum = this.pageInfo.pageNum;
                data.pageSize = this.pageInfo.pageSize;
                data.proCategory = this.cateId;
                console.log(data);
                this.$http({ // 查询库存盘点单列表
                    method: 'post',
                    url: Url,
                    data: data
                }).then((res) => {
                    console.log(res);
                    if (res.data) {
                        if (this.ceOn === 1) {
                            this.tableData = res.data.actionList;
                        } else {
                            this.tableData = res.data.actionList;
                            this.tableData.forEach((item) => {
                                this.$set(item, 'checkStockNum', '');
                                this.$set(item, 'checkStockDifference', '');
                                this.$set(item, 'checkStockStatus', '1');
                                this.$set(item, 'checkStockResult', '');
                            });
                        }
                        this.pageInfo = res.data.xePageInfo;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.creatInf(this.cxUrl);
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                if (this.ceOn === 1) {
                    this.creatInf(this.ediUrl);
                } else {
                    this.creatInf(this.cxUrl);
                }
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                if (this.ceOn === 1) {
                    this.creatInf(this.ediUrl);
                } else {
                    this.creatInf(this.cxUrl);
                }
            }
        },
        computed: {
            checkStockStatusList() {
                return checkStockStatus;
            },
            cateId() {
                if (this.formData.cateIds.length > 0) {
                    return this.formData.cateIds[this.formData.cateIds.length - 1];
                } else {
                    return '';
                }
            },
            storeName() {
                for (let i in this.actionList) {
                    if (this.peservationData.storeId === this.actionList[i].storeId) {
                        return this.actionList[i].storeName;
                    }
                }
            }
        },
        components: {
            categoryTag
        },
        watch: {
            'formData.searchType'(n) {
                if (n === '1') {
                    this.placeholder = '请输入商品名称';
                } else {
                    this.placeholder = '请输入商品货号';
                }
            }
        }
    };
</script>

<style lang="scss">
    .pub-toolbar{
        margin: 23px 0 10px;
    }
    .inventTips{
        padding-top: 10px;
        color: #48576a;
    }
</style>
