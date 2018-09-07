<template lang="html">
    <div class="recycleBin m-router-con">
        <!--盘点单-->
        <div class="publicorder-serch">
            <div class="u-top-search">
                <!-- <el-form ref="formData" :model="formData" :inline="true">
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
                        <categoryTag v-model='formData.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
                    </el-form-item>
                    <el-form-item>
                        <el-select size="small" class="xe-input-w110" v-model="selecCondition" placeholder="请选择">
                            <el-option label="商品名称" value='1'></el-option>
                            <el-option label="商品货号" value='2'></el-option>
                            <el-option label="商品SKU编码" value='3'></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input size="small" :placeholder="placeholder" v-model="selecInput" class="">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="checkRemark">
                        <el-input v-model="peservationData.checkRemark" size="small" placeholder="盘点备注" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="xe-button-normal" type="primary" @click="">查询</el-button>
                        <el-button class="xe-button-normal" @click="">重置</el-button>
                    </el-form-item>
                </el-form> -->
            </div>
        </div>
        <!-- <div class="u-opera-btnBox"> -->
            <!-- <el-button @click="" class="xe-button-normal"><i class="iconfont icon-kaishi"></i> 
                保存并退出
            </el-button>
            <el-button class="xe-button-normal"><i class="iconfont icon-daochu"></i> 
                导出
            </el-button>
            <el-button @click="" class="xe-button-normal"><i class="iconfont icon-daochu"></i> 
                完成盘点
            </el-button> -->
        <!-- </div> -->
        <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table ref="multipleTable" :data="tableData" border tooltip-effect="dark" style="width: 100%">
                    <el-table-column type="index" min-width="50" label=" ">
                    </el-table-column>
                    <el-table-column prop="proNum" label="商品货号" min-width="95"></el-table-column>
                    <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
                    <el-table-column prop="proCategoryName" label="商品分类" min-width="180"></el-table-column>
                    <el-table-column prop="pricingType" label="计量方式" min-width="95">
                        <template scope="scope">
                            {{scope.row.pricingType | pricingTypeToText}}
                        </template>
                    </el-table-column>
                    <el-table-column prop="proUnit" label="单位" min-width="95"></el-table-column>
                    <el-table-column prop="proSpecValue" label="规格" min-width="95"></el-table-column>
                    <el-table-column prop="proSku" label="商品SKU编号" min-width="150"></el-table-column>
                    <el-table-column prop="stockNum" label="库存数量" min-width="95"></el-table-column>
                    <el-table-column prop="checkStockNum" label="盘点数量" min-width="95">
                    </el-table-column>
                    <el-table-column prop="checkStockDifference" label="盘点差异" min-width="95">
                        <template scope="scope">
                            {{Math.abs(scope.row.checkStockDifference)}}
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
                    <el-table-column prop="createUser" label="盘点人" min-width="95"></el-table-column>
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
            </div>
        </div>
    </div>
</template>
<script>
    import categoryTag from '@/components/category/category';
    export default {
        data() {
            return {
                placeholder: '请输入',
                selecCondition: '',
                selecInput: '',
                actionList: [],
                diffent: '',
                formData: {
                    cateIds: [],
                    proName: '', // 商品名称
                    proNum: '', // 商品货号
                    proCategory: '', // 商品分类
                    storeId: '' // 仓库编码 必填
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
                }
            };
        },
        created() {
            this.formData.checkCode = this.$route.query.checkCode;
            this.creatInf();
        },
        methods: {
            creatInf() {
                let data = {};
                data = this.formData;
                data.pageNum = this.pageInfo.pageNum;
                data.pageSize = this.pageInfo.pageSize;
                data.proCategory = this.cateId;
                this.$http({ // 查询库存盘点单列表
                    method: 'post',
                    url: '/xe-route/xe-erp/checkManager/queryCheckDetailList',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        this.tableData = res.data.actionList;
                        this.pageInfo = res.data.xePageInfo;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pageInfo.pageSize = val;
                this.creatInf();
            },
            handleCurrentChange(val) {
                this.pageInfo.pageNum = val;
                this.creatInf();
            }
        },
        components: {
            categoryTag
        }
    };
</script>

<style lang="scss">
    .pub-toolbar{
        margin: 23px 0 10px;
    }
</style>
