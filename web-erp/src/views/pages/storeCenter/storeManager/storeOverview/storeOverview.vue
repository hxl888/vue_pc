<template lang="html">
    <div class="m-router-con zqq-store-router" v-if="renderFlag">
        <div class="backgroung">
            <div class="top-compile clearfix">
                <div class="left-portrait fl">
                    <img src="http://img1.gtimg.com/news/pics/hv1/42/122/2223/144581727.jpg" alt="头像" >
                    <!-- <span>编辑头像</span> -->
                </div>
                <div class="right-cont fl">
                    <p class="companyName">{{venInfoShop.venName}}</p>
                    <p class="license">
                        <span><i class="iconfont icon-renzheng icon-modification zq-icon"></i>实名认证</span>
                        <span><i class="iconfont icon-renzheng icon-modification zq-icon"></i>营业执照认证</span>
                        <!--<span><i class="iconfont icon-renzheng icon-modification zq-icon"></i>担保交易</span>-->
                        <!--<span><i class="iconfont icon-renzheng icon-modification zq-icon"></i>邮箱认证</span>-->
                        <span><i class="iconfont icon-renzheng icon-modification zq-icon"></i>手机认证</span>
                    </p>
                </div>
            </div>
            <div class="top-bottom clearfix">
                <ul class="across fl">
                    <router-link :to="{name: 'orderProcessingList'}" tag="li" class="figure c-point">{{venInfoShop.waitCheckOrderNum}}</router-link>
                    <!-- <li class="figure"></li> -->
                    <li><i class="iconfont icon-daishenhe icon-indent icon-nape"></i>待审核订单</li>
                </ul>
                <ul class="across fl">
                    <router-link :to="{name: 'orderPrintList'}" tag="li" class="figure c-point">{{venInfoShop.waitSendOrderNum}}</router-link>
                    <!-- <li class="figure">{{venInfoShop.waitSendOrderNum}}</li> -->
                    <li><i class="iconfont icon-daifahuo icon-deliver icon-nape"></i>待发货订单</li>
                </ul>
                <ul class="across fl">
                    <router-link :to="{name: 'orderQueryList'}" tag="li" class="figure c-point">{{venInfoShop.yesterdayTradeUsersNum}}</router-link>
                    <!-- <li class="figure">{{venInfoShop.yesterdayTradeUsersNum}}</li> -->
                    <li><i class="iconfont icon-jujuejieshou icon-refuse icon-nape"></i>昨日交易用户数</li>
                </ul>
                <ul class="across fl">
                    <router-link :to="{name: 'orderQueryList'}" tag="li" class="figure c-point">{{venInfoShop.yesterdayOrderNum}}</router-link>
                    <!-- <li class="figure">{{venInfoShop.yesterdayOrderNum}}</li> -->
                    <li><i class="iconfont icon-daifahuo icon-leijidingdanshu icon-nape"></i>昨日订单数</li>
                </ul>
                <ul class="across fl">
                    <router-link :to="{name: 'orderQueryList'}" tag="li" class="figure c-point">{{venInfoShop.yesterdayTradeAmount | priceToText(true)}}</router-link>
                    <!-- <li class="figure">{{venInfoShop.yesterdayTradeAmount | priceToText(true)}}</li> -->
                    <li><i class="iconfont icon-jiaoyijine icon-deal icon-nape"></i>昨日交易额</li>
                </ul>
                <ul class="across fl">
                    <li class="figure">{{venInfoShop.salePro}}</li>
                    <li><i class="iconfont icon-shangpin icon-onsale icon-nape"></i>在售商品</li>
                </ul>
                <ul class="across fl">
                    <li class="figure">{{venInfoShop.pullOfPro}}</li>
                    <li><i class="iconfont icon-shenhebohui icon-noton icon-nape"></i>未上架商品 </li>
                </ul>
            </div>
        </div>
        <div class="bottom-map right-tabs__nav z-posra">
            <!--<div class="bottom-smmap clearfix">-->
                <div class="left-flow fl">
                    流量趋势
                </div>
                <!--<div class="right-cat fr">-->
                <el-tabs v-model="activeName">
                    <el-tab-pane label="标签一" name="first">标签一</el-tab-pane>
                    <el-tab-pane label="标签二" name="second" style="text-align: center;">
                        <img src="../../../../../assets/images/store-m01.jpg" alt="优质店铺" width="1040">
                    </el-tab-pane>
                    <el-tab-pane label="标签三" name="third">标签三</el-tab-pane>
                </el-tabs>
                <div class="coverWord">
                    <div class="wordcontent">
                        <p class="firsthea">敬请期待！</p>
                        <p class="seconhea">Coming soon!Please expecting!</p>
                    </div>
                </div>
                <!--</div>-->
            <!-- </div> -->
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: 'second',
            renderFlag: false,
            venInfoShop: {
                waitCheckOrderNum: 0,
                waitSendOrderNum: 0,
                yesterdayTradeUsersNum: 0,
                yesterdayOrderNum: 0,
                yesterdayTradeAmount: 0,
                venName: '',
                salePro: 0,
                pullOfPro: 0
            },
            picServer: ''
        };
    },
    created() {
        this.shopOverview();
    },
    methods: {
        shopOverview() {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/shop/page',
                data: {}
            }).then(res => {
                this.venInfoShop.waitCheckOrderNum = res.data.waitCheckOrderNum;
                this.venInfoShop.waitSendOrderNum = res.data.waitSendOrderNum;
                this.venInfoShop.yesterdayTradeUsersNum = res.data.yesterdayTradeUsersNum;
                this.venInfoShop.yesterdayOrderNum = res.data.yesterdayOrderNum;
                this.venInfoShop.yesterdayTradeAmount = res.data.yesterdayTradeAmount;
            }).catch(error => {
                console.log(error);
            });
            this.$http({
                method: 'post',
                url: '/xe-route/xe-erp/xeveninfoshop/shopOverview',
                data: {}
            }).then(res => {
                this.venInfoShop.venName = res.data.venInfoShop.venName;
                this.venInfoShop.salePro = res.data.venInfoShop.salePro;
                this.venInfoShop.pullOfPro = res.data.venInfoShop.pullOfPro;
            }).catch(error => {
                console.log(error);
            });
            this.renderFlag = true;
        },
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
<style lang="scss">
    .bottom-map{
        .coverWord {
            position: absolute;
            left:0;
            top:0;
            right:0;
            bottom:0;
            z-index: 666;
            background: rgba(255,255,255,0.8);
        }
        .wordcontent {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            color: #363d67;
            .firsthea {
                text-align: center;
                font-size: 24px;
                line-height: 36px;
            }
            .seconhea {
                font-size: 13px;
                line-height: 16px;
            }
        }
    }
</style>
