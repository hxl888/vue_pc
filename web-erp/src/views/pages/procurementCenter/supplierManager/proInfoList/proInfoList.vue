<template lang="html">
  <div class="m-router-con">
    <div class="u-top-search">
    <!-- {{searchform}} -->
        <el-form ref="searchform" :model="searchform" :inline="true">
            <el-form-item prop="searchType">
                <el-select size="small" class="xe-input-w110" v-model="searchform.searchType" placeholder="查询条件">
                    <el-option
                        v-for="item in queryProductList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="searchText">
                <el-input size="small" v-model="searchform.searchText" placeholder="请输入查询内容"></el-input>
            </el-form-item>
            <!-- <el-form-item prop="proName">
                <el-input size="small" placeholder="输入商品名称" v-model="searchform.proName"></el-input>
            </el-form-item>
            <el-form-item prop="proNum">
                <el-input size="small" placeholder="输入商品货号查询" v-model="searchform.proNum"></el-input>
            </el-form-item> -->
            <el-form-item prop="cateIds">
                <categoryTag v-model='searchform.cateIds' :width='170' :changeOnSelect="true"></categoryTag>
            </el-form-item>
            <el-form-item>
                <el-button class="xe-button-normal" type="primary" @click="onSubmit">查询</el-button>
                <el-button class="xe-button-normal" @click="resetForm('searchform')">重置</el-button>
            </el-form-item>
        </el-form>
     </div>
     <!-- <div class="u-opera-btnBox">
          <el-button class="xe-button-normal">
              <span class="iconfont icon-daochu"></span> 导出
          </el-button>
     </div> -->
     <div class="goodsTable">
          <el-table highlight-current-row style="width: 100%" border :data="productList">
              <el-table-column type="selection" width="34" class-name="selectionTd">
              </el-table-column>
              <!-- <el-table-column label="商品图片" width="100">
                <template scope="props">
                    <div class="z-imgbox">
                        <img :src="picServer + props.row.proMainImg" alt="商品图片" width="60" height="60">
                    </div>
                </template>
              </el-table-column> -->
              <el-table-column label="供货商名称"  min-width="140" prop="supplierName">
              </el-table-column>
              <el-table-column label="商品名称" min-width="140" prop="proName">
              </el-table-column>
              <el-table-column label="商品货号" min-width="140" prop="proNo">
              </el-table-column>
              <el-table-column label="规格" min-width="100" prop="specValue">
              </el-table-column>
              <el-table-column label="单位"  min-width="90" prop="proUnit">
              </el-table-column>
              <el-table-column label="所属类别" min-width="140" prop="categoryName">
              </el-table-column>
              <!-- <el-table-column label="品牌" min-width="140" prop="loginDate">
              </el-table-column> -->
              <el-table-column label="计价方式" min-width="90" prop="priceType">
                <template scope="props">
                    {{props.row.priceType | pricingTypeToText}}
                </template>
              </el-table-column>
              <el-table-column label="进货价"  min-width="100" prop="buyPrice">
                <template scope="props">
                    {{props.row.buyPrice | priceToText}}
                </template>
              </el-table-column>
          </el-table>
     </div>
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
</template>

<script>
import categoryTag from '@/components/category/category';
import {queryProductList} from '@/dataControl.js';
export default {
    data() {
        return {
            searchform: {
                cateIds: [],
                searchType: 1,
                searchText: '',
                supplierName: ''
            },
            picServer: '',
            supplierNameList: [],
            productList: [],
            xePageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            }
        };
    },
    computed: {
        cateId() {
            if (this.searchform.cateIds.length > 0) {
                return this.searchform.cateIds.join('_');
            } else {
                return '';
            }
        },
        queryProductList() {
            return queryProductList;
        }
    },
    components: {
        categoryTag
    },
    created() {
        this.enquiryForm(1, this.searchform);
    },
    methods: {
        onSubmit() {
            this.enquiryForm(1, this.searchform);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.value1 = '';
            this.value2 = '';
            this.enquiryForm(1, this.searchform);
        },
        enquiryForm(pageNum, searchform) {
            let data = {};
            data = searchform;
            data.categoryCode = this.cateId;
            data.pageNum = pageNum;
            data.pageSize = this.xePageInfo.pageSize;
            this.$http({ // 查询用户登录历史记录
                method: 'post',
                url: '/xe-route/xe-erp/supplier/queryProductList',
                data: data
            }).then((res) => {
                this.productList = res.data.productList;
                this.xePageInfo = res.data.xePageInfo;
                this.picServer = res.data.picServer;
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSizeChange(val) {
            this.xePageInfo.pageSize = val;
            this.enquiryForm(this.xePageInfo.pageNum, this.searchform);
        },
        handleCurrentChange(val) {
            this.xePageInfo.pageNum = val;
            this.enquiryForm(this.xePageInfo.pageNum, this.searchform);
        }
    }
};
</script>

<style lang="scss">
</style>
