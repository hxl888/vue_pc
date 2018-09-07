<template lang="html">
    <div class="m-router-con">
        <!--优惠券基本信息-->
        <div class="contentDetails-Box" v-if="htmlloading">
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">优惠券基本信息</div>
                </div>
                <div class="details-content">
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">优惠券编号：</div>
                        <div class="fl detai_list ellipsis">{{templet.couTempId}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">优惠券名称：</div>
                        <div class="fl detai_list ellipsis">{{templet.couName}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">使用位置：</div>
                        <div class="fl detai_list ellipsis">{{templet.usePlat | usePlatfilter}}</div>
                    </div>
                    <div class="detalls_flr clearfix detalls_flr_spec">
                        <div class="fl detai_label">使用区域：</div>
                        <ul class="fl addres_lis" v-if="templet.useAreaName">
                            <li class="lis_flr" v-if="templet.useAreaName.length" v-for="item in templet.useAreaName.split(' ')">{{item}}</li>
                        </ul>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">商品范围：</div>
                        <div class="fl detai_list ellipsis">{{templet.useRange | useRangefilter}}</div>
                    </div>
                     <div class="detalls_flr clearfix detalls_flr_spec"  v-if="templet.useRange == 2">
                        <div class="fl detai_label" style="opacity: 0">商品范围：</div>
                        <ul class="fl addres_lis">
                            <li class="lis_flr" v-if="templet.useAreaName.length" v-for="item in templet.userCateName.split(' ')">{{item}}</li>
                        </ul>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.useRange == 3">
                        <div class="fl detai_label">选择商品：</div>
                        <div class="fl">
                            <el-table :data="tableDatas" border>
                                <el-table-column  min-width="55">
                                    <template scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="proName" min-width="120" label="商品名称"></el-table-column>
                                <el-table-column prop="proNum" min-width="120" label="商品货号"></el-table-column>
                                <el-table-column prop="proSpec" min-width="120" label="商品规格">
                                </el-table-column>
                                <el-table-column prop="cateName" min-width="160" label="商品分类"></el-table-column>
                                <el-table-column prop="pricingType" min-width="120" label="计量方式">
                                    <template scope="scope">
                                        <div>
                                            {{scope.row.pricingType | pricingTypefiter}}
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="proUnit" min-width="120" label="单位"></el-table-column>
                                <el-table-column prop="skuPrice" min-width="130" label="销售价格">
                                    <template scope="scope">
                                        <div v-if="scope.row.skuPrice">
                                            {{scope.row.skuPrice.toFixed(2)}}
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">有效时间：</div>
                        <div class="fl detai_list ellipsis" v-if="templet.useTimeType == 2">优惠券到账{{templet.activeDay}}天内有效</div>
                        <div class="fl detai_list ellipsis" v-else> <span v-if="templet.activeTimeStart">{{templet.activeTimeStart}} - </span><span v-if="templet.activeTimeEnd">{{templet.activeTimeEnd}}</span> </div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">优惠规则：</div>
                        <div class="fl detai_list ellipsis" v-if="templet.useRuleType == 2">无门槛优惠减免 <span v-if="templet.useDisAmount">{{templet.useDisAmount.toFixed(2)}}</span>元</div>
                        <div class="fl detai_list ellipsis" v-else>订单满 <span v-if="templet.useOrderAmount">{{templet.useOrderAmount.toFixed(2)}}</span> 减 <span v-if="templet.useDisAmount">{{templet.useDisAmount.toFixed(2)}}</span>元</div>
                    </div>
                </div>
            </div>
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">优惠券发放规则</div>
                </div>
                <!--买家领取-->
                <div class="details-content" v-if="templet.sendType == 1">
                    <div class="detalls_flr clearfix" v-if="templet.sendType">
                        <div class="fl detai_label">发放方式：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendType | sendTypefilter}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendTimeStart">
                        <div class="fl detai_label">发放时间：</div>
                        <div class="fl detai_list ellipsis"> <span v-if="templet.sendTimeStart">{{templet.sendTimeStart}} - </span><span v-if="templet.sendTimeEnd">{{templet.sendTimeEnd}}</span> </div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendNum">
                        <div class="fl detai_label">发行数量：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendNum}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType == 3">
                        <div class="fl detai_label">每人限领：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendLimitNum == 0 ? '不限制' : templet.sendLimitNum}}</div>
                    </div>
                </div>
                <!--指定条件发放-->
                <div class="details-content"  v-if="templet.sendType == 2">
                    <div class="detalls_flr clearfix" v-if="templet.sendType">
                        <div class="fl detai_label">发放方式：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendType | sendTypefilter}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendTimeStart">
                        <div class="fl detai_label">发放时间：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendTimeStart}}-{{templet.sendTimeEnd}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendNum">
                        <div class="fl detai_label">发行数量：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendNum}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="templet.sendType == 2">
                        <div class="fl detai_label">发放条件：</div>
                        <div class="fl detai_list ellipsis">客户在店铺内购物满￥{{templet.sendOrderAmount}}元发放优惠券</div>
                    </div>
                </div>
                <!--指定用户发放-->
                <div class="details-content"  v-if="templet.sendType == 3">
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">发放方式：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendType | sendTypefilter}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_label">向每位用户发放：</div>
                        <div class="fl detai_list ellipsis">{{templet.sendEveryNum}}</div>
                    </div>
                    <div class="detalls_flr clearfix" v-if="tableDataUser">
                        <div class="fl detai_label">发放用户：</div>
                        <div class="fl detai_list">
                            <el-table :data="tableDataUser" border>
                                <el-table-column  min-width="55">
                                    <template scope="scope">
                                        {{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column prop="userccount" min-width="120" label="注册用户名"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <el-button type="primary"  @click="goBack" >返回</el-button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableDatas: [],
            tableDataUser: [],
            htmlloading: false,
            templet: {},
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        enquiryForm() {
            if (this.$route.query.couTempId) {
                let params = {};
                params.couTempId = this.$route.query.couTempId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/venDisCoupon/getCoupTempletById`,
                    data: params
                }).then((res) => {
                    console.log('--666--!!>', res);
                    this.templet = res.data.templet;
                    this.htmlloading = true;
                    let loginAccountList = this.templet.loginAccountList;
                    let tableDataUser = [];
                    this.tableDatas = res.data.templet.couponProList;
                    console.log('this.tableDatas', this.tableDatas);
                    for (let i in loginAccountList) {
                        tableDataUser.push({userccount: loginAccountList[i]});
                    }
                    this.tableDataUser = tableDataUser;
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

<style lang="scss">
</style>
