<template lang="html">
    <div class="m-router-con publicOrderStyle">
        <div class="u-top-search">
            <el-form :inline="true" :model="puboderSerData.actionList" ref="puboderSerData" class="demo-form-inline">
                <el-form-item prop="sendStoreId">
                    <el-input v-model="puboderSerData.actionList.allotCode" size="small" placeholder="调拨单号自动生成" :disabled="true" class="xe-input-l40"></el-input>
                </el-form-item>
                <el-form-item prop="sendStoreId">
                    <el-select size="small" disabled v-model="puboderSerData.actionList.sendStoreId" placeholder="调出仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="receiptStoreId">
                    <el-select size="small" disabled v-model="puboderSerData.actionList.receiptStoreId" placeholder="调入仓库" calerable filterable class="xe-input-l40">
                        <el-option
                                v-for = "item in actionList"
                                :key="item.storeId"
                                :label = "item.storeName"
                                :value = "item.storeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="allotRemark">
                    <el-input disabled v-model="puboderSerData.actionList.allotRemark" size="small" placeholder="调拨备注" class="xe-input-l40"></el-input>
                </el-form-item>
            </el-form>
         </div>
        <!-- <div class="u-opera-btnBox">
            <el-button disabled class="xe-button-normal" @click=""><i class="iconfont icon-xinzeng"></i>&nbsp;选中调拨商品</el-button>
        </div> -->
         <div class="pub-dataContent">
            <div class="pub-tabDatacon">
                <el-table
                    :data="puboderSerData.actionList.allotDetailList"
                    border
                    style="width: 100%"
                    >
                    <el-table-column
                      type="index"
                      width="62"
                      label=" "
                      fixed
                      >
                    </el-table-column>
                    <el-table-column
                      prop=""
                      label=""
                      width="34"
                      class-name="selectionTd"
                      type="selection"
                      fixed
                      >
                    </el-table-column>
                    <el-table-column
                      prop="allotCode"
                      label="商品图"
                      min-width="150"
                      >
                        <template scope="props">
                        <!-- 商品图片{{props.row.img}} -->
                            <div class="z-imgbox">
                                <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proName"
                        label="商品名称"
                        min-width="150"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proNum"
                        label="商品货号"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proCategoryName"
                        label="商品分类"
                        min-width="140"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="pricingType"
                        label="计量方式"
                        min-width="90"
                    >
                        <template scope="props">
                            <div>
                                {{props.row.pricingType | pricingTypeToText}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proUnit"
                        label="单位"
                        min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proSpecValue"
                        label="规格"
                        min-width="65"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="proPrice"
                        label="成本价"
                        min-width="80"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="actualInv"
                        label="实际库存"
                        min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="usableInv"
                        label="可用库存"
                        min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotNums"
                        label="调拨数量"
                        min-width="90"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotAmount"
                        label="调拨金额"
                        min-width="90"
                    >
                        <template scope="scope">
                            <div>
                                {{parseFloat((scope.row.proPrice ? scope.row.proPrice : 0) * (scope.row.allotNums ? scope.row.allotNums : 0)).toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="allotNums"
                        label="实际出库量"
                        min-width="100"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="allotNums"
                        label="实际入库量"
                        min-width="100"
                    >
                    </el-table-column>
                  </el-table>
            </div>
         </div>
         <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" @click="cancelS">返回</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                actionList: [],
                puboderSerData: {
                    actionList: {}
                }
            };
        },
        created() {
            this.Warehouse();
            this.Initialization();
        },
        methods: {
            Initialization() {
                let data = {};
                data.allotCode = this.$route.query.allotCode;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/allotManager/queryStoreAllot',
                    data: data
                }).then((res) => {
                    if (res.data) {
                        console.log(res);
                        this.puboderSerData = res.data;
                    }
                }).catch((error) => {
                    console.log(error);
                });
            },
            Warehouse() {
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
            cancelS() {
                this.$router.push({name: 'allotOrderList'});
            }
        },
        computed: {
            picServer() {
                return this.puboderSerData.picServer;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../../../assets/styles/views/publicOrderStyle.scss";
</style>
