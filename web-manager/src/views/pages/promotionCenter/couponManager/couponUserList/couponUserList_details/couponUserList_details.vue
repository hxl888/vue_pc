<template lang="html">
    <div class="m-router-con">
        <div class="contentDetails-Box">
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">基本信息</div>
                </div>
                <div class="details-content clearfix">
                    <div class="fl flr_line">用户名：<span v-if="userHoldingDetails">{{$route.query.loginAccount}}</span></div>
                    <div class="fl flr_line">绑定手机号：<span v-if="userHoldingDetails">{{$route.query.mobile}}</span></div>
                </div>
            </div>
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">优惠券明细</div>
                </div>
                   <div class="pub-tabDatadetails marTop20">
                        <el-tabs v-model="tabCard_val" type="card">
                            <el-tab-pane :label="'未使用(' + userStatusCount.cardUnUsed + ')'" name="first">
                                <tabs-notused :tabalenote="tabalenote"></tabs-notused>
                            </el-tab-pane>
                            <el-tab-pane :label="'已使用(' + userStatusCount.cardUsed + ')'" name="second">
                                <tabs-alreadyinuse :tabalealre="tabalealre"></tabs-alreadyinuse>
                            </el-tab-pane>
                            <el-tab-pane :label="'已过期(' + userStatusCount.cardExpired + ')'" name="third">
                                <tabs-expired  :tabaleexpir="tabaleexpir"></tabs-expired>
                            </el-tab-pane>
                            <el-tab-pane :label="'已删除(' + userStatusCount.cardDel + ')'"  name="fourth">
                                <tabs-deleted  :tabaledele="tabaledele"></tabs-deleted>
                            </el-tab-pane>
                        </el-tabs>
                </div>
            </div>
            <footer>
                    <el-button type="primary"  @click="goBack" >返回</el-button>
            </footer>
        </div>
    </div>
</template>

<script>
    import tabsNotused from './tabsNotused';
    import tabsAlreadyinuse from './tabsAlreadyinuse';
    import tabsExpired from './tabsExpired';
    import tabsDeleted from './tabsDeleted';
    export default {
        data() {
            return {
                tabCard_val: 'first',
                tableDatas: [{}],
                userStatusCount: {
                    cardUnUsed: 0,
                    cardUsed: 0,
                    cardExpired: 0,
                    cardDel: 0
                },
                loading: false,
                userHoldingDetails: {},
                tabalenote: [], // 未使用数据
                tabalealre: [], // 已使用数据
                tabaleexpir: [], // 已过期数据
                tabaledele: [], // 已删除数据
                productUrl: '/xe-route/xe-mis'
//            productUrl: ''
            };
        },
        created() {
            if (!this.tabalenote.length) {
                this.enquiryForm(2);
            }
        },
        methods: {
            enquiryForm(status) {
                this.loading = true;
                let routerquery = this.$route.query;
//                this.userHoldingDetails.loginAccount = routerquery.loginAccount;
                if (routerquery) {
                    let params = {};
                    params.loginAccount = routerquery.loginAccount;
                    if (status !== 4) {
                        params.useStatus = status;
                    }
                    if (status === 4) {
                        params.useStatus = '';
                        params.delFlag = 2;
                    }
                    console.log('this.routerquery', routerquery.cardNum);
                    this.$http({
                        method: 'post',
                        url: `${this.productUrl}/manager/userCoupon/userCardDetail`,
                        data: params
                    }).then((res) => {
                        console.log('--666--!!>', res);
                        this.loading = false;
                        if (res.data.userStatusCount) {
                            this.userStatusCount = res.data.userStatusCount;
//                            if (!this.userStatusCount.cardUsed) {
//                                this.userStatusCount.cardUsed = this.userStatusCount.cardUsed;
//                            }
//                            if (!this.userStatusCount.cardUnUsed) {
//                                this.userStatusCount.cardUnUsed = this.userStatusCount.cardUnUsed;
//                            }
//                            if (!this.userStatusCount.cardExpired) {
//                                this.userStatusCount.cardExpired = this.userStatusCount.cardUnUsed;
//                            }
//                            if (!this.userStatusCount.cardDel) {
//                                this.userStatusCount.cardDel = this.userStatusCount.cardUnUsed;
//                            }
                        }
                        if (res.data.userHoldingDetails) {
                            this.userHoldingDetails = res.data.userHoldingDetails;
                            if (status === 1) {
                                this.tabalealre = res.data.userHoldingDetails;
                            } else if (status === 2) {
                                this.tabalenote = res.data.userHoldingDetails;
                            } else if (status === 3) {
                                this.tabaleexpir = res.data.userHoldingDetails;
                            } else if (status === 4) {
                                this.tabaledele = res.data.userHoldingDetails;
                            }
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
        },
        watch: {
            'tabCard_val': function(n) {
                if (n === 'second') {
                    if (!this.tabalealre.length) {
                        this.enquiryForm(1);
                    }
                } else if (n === 'third') {
                    if (!this.tabaleexpir.length) {
                        this.enquiryForm(3);
                    }
                } else if (n === 'fourth') {
                    if (!this.tabaledele.length) {
                        this.enquiryForm(4);
                    }
                }
            }
        },
        components: {
            tabsNotused,
            tabsAlreadyinuse,
            tabsExpired,
            tabsDeleted
        }
    };
</script>
<style lang="scss">
</style>
