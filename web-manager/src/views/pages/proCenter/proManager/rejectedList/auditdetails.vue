<template lang="html">
    <div class="m-router-con">
            <!--商户信息-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">商户信息</div>
                </div>
                <div class="item-main-box item-main-box1">
                    <ul class="clearfix">
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商户名称：{{datacontent.venName}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商户账号：{{datacontent.venAccount}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺名称：{{datacontent.shopName}}</p></li>
                    </ul>
                </div>
            </div>
            <!--基础信息-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">基础信息</div>
                </div>
                <div class="item-main-box item-main-box1">
                    <ul class="clearfix">
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品名称：{{datacontent.proName}}</p></li>
                        <el-tooltip class="item" effect="dark"  placement="top" v-if="datacontent.cateName">
                             <div slot="content">{{datacontent.cateName}}</div>
                            <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品类目：{{datacontent.cateName}}</p></li>
                        </el-tooltip>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品品牌：{{datacontent.brandName}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">是否冻品：{{datacontent.frozenFlag | frozenFlagfiter}}</p></li>
                        <el-tooltip class="item" effect="dark"  placement="top" v-if="datacontent.proIntro">
                             <div slot="content">{{datacontent.proIntro}}</div>
                            <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商品简介：{{datacontent.proIntro}}</p></li>
                         </el-tooltip>
                    </ul>
                </div>
            </div>
            <!--基本属性-->
             <div class="for-itemlis">
                  <div class="item-head clearfix">
                      <div class="fl item-tit">基本属性</div>
                  </div>
                  <div class="item-main-box item-main-box1">
                    <ul class="clearfix">
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">计价方式：{{datacontent.pricingType | pricingTypefiter}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">计量单位：{{datacontent.proUnit}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">贮存条件：{{datacontent.reserveCondition}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">售卖方式：{{datacontent.sellType | sellTypefiter}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">保质期：{{datacontent.shelfLife}}{{datacontent.shelfLifeUnit}}</p></li>
                        <li class="list-show list-show1 fl" v-if="datacontent.madeDate !== null"><p class="lis_p ellipsis">生产日期：{{datacontent.madeDate, 'ms'  | millisecondFormat}}</p></li>
                        <li class="list-show list-show1 fl" v-if="datacontent.madeDate == null"><p class="lis_p ellipsis">生产日期：请见商品包装</p></li>
                        <li class="list-show list-show1 fl" v-if="datacontent.madeinCountry"><p class="lis_p ellipsis">产地：{{datacontent.madeinCountryName}}/{{datacontent.madeinProvinceName}}/{{datacontent.madeinCityName}}</p></li>
                        <!--<li class="list-show list-show1 fl" v-if="datacontent.venName"><p class="lis_p ellipsis">供货商：{{datacontent.supplierName}}</p></li>-->
                    </ul>
                </div>
             </div>
             <!--扩展属性-->
             <div class="for-itemlis" v-if="datacontent.propertyList">
                  <div class="item-head clearfix">
                      <div class="fl item-tit">扩展属性</div>
                  </div>
                  <div class="item-main-box item-main-box1">
                    <ul class="clearfix">
                        <li class="list-show list-show1 fl" v-for="item in datacontent.propertyList">
                            <p class="lis_p ellipsis" v-if="item.propertyName">{{item.propertyName}}：{{item.propertyValue}}</p>
                        </li>
                    </ul>
                </div>
             </div>
              <!--商品规格-->
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">商品规格</div>
                </div>
                <div class="item-tabbox">
                    <el-table
                    :data="tableData"
                    border>
                    <el-table-column
                        label=""
                        prop=""
                        fixed='left'
                        min-width="50">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop=""
                        label="主图"
                        min-width="95">
                      <template scope="scope">
                          <div>
                              <img class="spec_pic" :src="scope.row.proMainImg" alt="">
                          </div>
                      </template>
                    </el-table-column>
                    <el-table-column min-width="120" v-if='formThead.length' v-for='(spec, sIndex) in formThead' :key='sIndex' :label="spec.specName">
                        <template scope="scope">
                            {{scope.row.proSkuSpecList[sIndex] && scope.row.proSkuSpecList[sIndex].specValue ? scope.row.proSkuSpecList[sIndex].specValue : '无'}}
                        </template>
                    </el-table-column>
                    <el-table-column min-width="120" v-if="!formThead.length" label="规格">
                        <template scope="scope">
                            无
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="proNum"
                        label="货号"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="grossWeight"
                        label="重量"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        prop="costPrice"
                        label="预计成本价(元)"
                        min-width="120">
                        <template scope="scope">
                            <div v-if="scope.row.costPrice">
                                {{scope.row.costPrice.toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="skuPrice"
                        label="建议销售价(元)"
                        min-width="120">
                        <template scope="scope">
                            <div v-if="scope.row.skuPrice">
                                {{scope.row.skuPrice.toFixed(2)}}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="实际库存"
                        prop="realQuantity"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        label="销售库存"
                        prop="saleQuantity"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        label="起订量"
                        prop="minQuantity"
                        min-width="120">
                    </el-table-column>
                    <el-table-column
                        label="条形码"
                        prop="barCode"
                        min-width="120">
                    </el-table-column>
                  </el-table>
                </div>
            </div>
            <!--商品图片-->
            <div class="for-itemlis" v-if="datacontent.imgList">
                <div class="item-head">
                    <div class="item-tit">商品图片</div>
                </div>
                <div class="item-uploadImg_box clearfix">
                    <ul class="clearfix">
                        <li class="fl" v-for="item in datacontent.imgList">
                            <a :href="item.proImg" target="_blank">
                                <img :src=item.proImg alt="">
                            </a>
                        </li>
                    </ul>
                    <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                </div>
            </div>
            <!--商品描述-->
            <div class="for-itemlis" v-if="datacontent.descEntity">
                <div class="item-head">
                    <div class="item-tit">商品描述</div>
                </div>
                <div class="text-editor-box">
                    <!--<img v-if="datacontent.descEntity.appDesc" :src="picServer + datacontent.descEntity.appDesc" alt="" width="60" height="60">-->
                    <!--<img v-if="datacontent.descEntity.pcDesc" :src="picServer + datacontent.descEntity.pcDesc" alt=""  width="60" height="60">-->
                    <p v-if="datacontent.descEntity.appDesc" v-html="datacontent.descEntity.appDesc">{{datacontent.descEntity.appDesc}}</p>
                    <p v-if="datacontent.descEntity.pcDesc" v-html="datacontent.descEntity.pcDesc">{{datacontent.descEntity.pcDesc}}</p>
                </div>
            </div>
            <!--定价方式-->
            <div class="for-itemlis">
                  <div class="item-head">
                    <div class="item-tit">定价方式</div>
                  </div>
                  <div class="pricing-method">
                    <ul class="clearfix">
                      <li class="pricelist fl ellipsis">
                          <div class="clearfix section-flr">
                              <p class="fl">定价方式：{{datacontent.priceMethod | priceMethodfiter}}</p>
                              <!--<p class="fl">-->
                                  <!--<el-radio-group v-model="serchFrom.rad1">-->
                                    <!--<el-radio class="" label="1">配送价</el-radio>-->
                                    <!--<el-radio class="" label="2">自提价</el-radio>-->
                                  <!--</el-radio-group>-->
                              <!--</p>-->
                          </div>
                          <div class="clearfix"  v-if="datacontent.priceMethod !== 2">
                              <p class="fl" v-if="datacontent.failureTime">报价过期时间：{{datacontent.failureTime}}小时</p>
                          </div>
                      </li>
                    </ul>
                  </div>
            </div>
            <div class="for-itemlis">
                <!--button提交按钮-->
                <div class="form_sub_btn addmargin">
                    <el-button @click="goBack" type="primary">返回</el-button>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            serchFrom: {
                rad1: '',
                rad2: ''
            },
            picServer: '',
            tableData: [],
            maxcolumnNum: 0, // 获取商品规格中各个table中规格最长的数值
            formThead: {},
            datacontent: {},
            dialogImageUrl: '',
            dialogVisible: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        enquiryForm() {
            let proSpu = this.$route.query.proSpu;
            if (proSpu) {
                let params = {};
                params.proSpu = proSpu;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/proAudit/listVenProAuditDetail`,
                    data: params
                }).then((res) => {
                    console.log('---data-!!>', res);
                    this.tableData = res.data.list[0].skuList;
                    this.datacontent = res.data.list[0];
                    let lenArray = [];
                    this.picServer = res.data.picServer;
                    let picServer = res.data.picServer;
                    for (let j in this.datacontent.imgList) {
                        this.datacontent.imgList[j].proImg = picServer + this.datacontent.imgList[j].proImg;
                    }
                    for (let i in this.tableData) {
                        if (this.tableData[i].proSkuSpecList) {
                            lenArray.push(this.tableData[i].proSkuSpecList.length);
                        }
                    }
                    for (let o in this.tableData) {
                        this.tableData[o].proMainImg = picServer + this.tableData[o].proMainImg;
                    }
                    for (let i in this.tableData) {
                        if (this.tableData[i].proSkuSpecList) {
                            lenArray.push(this.tableData[i].proSkuSpecList.length);
                        }
                    }
                    if (lenArray.length > 0) {
                        let maxNum = Math.max.apply(null, lenArray); // 获取table数据中每个proSkuSpecList 里面的最长的json组
                        this.maxcolumnNum = lenArray.indexOf(maxNum);
                        this.formThead = this.tableData[this.maxcolumnNum].proSkuSpecList;
//                        console.log('proSkuSpecList.length-->', this.tableData[this.maxcolumnNum].proSkuSpecList);
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
