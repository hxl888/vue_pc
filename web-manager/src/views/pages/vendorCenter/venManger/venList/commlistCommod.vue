<template lang="html">
    <div class="m-router-con recycleBin">
        <div class="u-top-search">
            <el-form ref="searchform" :model="searchform" :inline=true>
                    <el-form-item prop="upFlag">
                        <el-select size="small" v-model="searchform.upFlag" placeholder="上下架状态" class="xe-input-l40">
                            <el-option
                              v-for="item in upFlagStatuslist"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="nameNum">
                        <el-input size="small" placeholder="商品货号及名称" v-model="searchform.nameNum" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item prop="proName">
                        <el-input size="small" placeholder="供应商账号" v-model="searchform.proName" class="xe-input-l40"></el-input>
                    </el-form-item>
                    <el-form-item prop="proStatus">
                        <el-select size="small" v-model="searchform.proStatus" placeholder="商品状态" class="xe-input-l40">
                            <el-option
                              v-for="item in proStatuslist"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
            <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
            <el-button class="xe-button-normal">高级搜索</el-button>
        </div>
        <el-table class="zq-table" ref="multipleTable" :data="merchantGoods" border tooltip-effect="dark">
            <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
            <el-table-column label="商品主图" min-width="95">
                <template scope="scope" class="imgs">
                    <div class="q-img">
                        <img :src="picServer + scope.row.proMainImg" alt="" width="60" height="60" class="imgs">
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="proNum" label="商品货号" min-width="120"></el-table-column>
            <el-table-column prop="specValue" label="商品规格" min-width="120"></el-table-column>
            <el-table-column prop="skuPrice" label="商品价格" min-width="120"></el-table-column>
            <el-table-column prop="saleQuantity" label="商品库存" min-width="120"></el-table-column>
            <el-table-column prop="categoryName" label="所属类目" min-width="200"></el-table-column>
            <el-table-column prop="upFlag" label="上下架状态" min-width="120">
                <template scope="scope">
                    <div>{{scope.row.upFlag | upFlagfiter}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="upTime" label="上架时间"  min-width="160">
                <template scope="scope">
                    <div>{{scope.row.upTime, 'ms' | millisecondFormat}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="proSku" label="sku编码" min-width="160"></el-table-column>
            <el-table-column prop="proStatus" label="商品状态" min-width="120">
                <template scope="scope">
                    <div>{{scope.row.proStatus | venSatatusfiter}}</div>
                </template>
            </el-table-column>
        </el-table>
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
</template>
<script>
import permission from 'mixins/permission.js';
import {upFlagStatus, proStatus} from '@/dataControl.js';
export default {
    mixins: [permission],
    data() {
        return {
            picServer: '',
            permissionObj: {},
            merchantGoods: [],
            searchform: {
                nameNum: '',
                upFlag: '',
                proStatus: '',
                cateId: '',
                proSpu: '',
                startDateStr: '',
                endDateStr: ''
            },
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 10
            }
        };
    },
    created() {
        this.viewMerchantgoods();
    },
    methods: {
        viewMerchantgoods() {
            let userCode = this.$route.query.userCode;
            if (userCode) {
                let params = {};
                params = this.searchform;
                params.pageNum = this.pagelist.currPage;
                params.pageSize = this.pagelist.pageSize;
                params.userCode = userCode;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/proList/listVenProSpuData',
                    data: params
                }).then((res) => {
                    console.log('-res--->', res);
                    this.picServer = res.data.picServer;
                    this.merchantGoods = res.data.list;
                    this.pagelist.total = res.data.pageInfo.total;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$router.go(-1);
            }
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.viewMerchantgoods();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.currPage = val;
                this.viewMerchantgoods();
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.viewMerchantgoods();
        },
        onSubmit() {
            console.log('查询!');
            this.viewMerchantgoods();
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
        upFlagStatuslist() {
            return upFlagStatus;
        },
        proStatuslist() {
            return proStatus;
        }
    }
};
</script>
