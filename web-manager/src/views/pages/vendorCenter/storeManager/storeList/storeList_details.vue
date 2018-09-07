<template lang="html">
    <div class="m-router-con">
        <div style="margin-top: -20px" class="rseGds-content contentDetails-Box">
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">基本信息</div>
                </div>
                <div class="item-main-box martop10">
                    <ul class="clearfix">
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">商户名称：{{shopInfo.venName}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺名称：{{shopInfo.shopName}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">登录账号：{{shopInfo.mobile ? shopInfo.mobile : shopInfo.email}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">店铺域名：{{shopInfo.shopDomain}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">成立日期：{{shopInfo.comEstabDate, 'ms' | millisecondFormat}}</p></li>
                        <li class="list-show list-show1 fl"><p class="lis_p ellipsis">注册资本：<span v-if="shopInfo.registCapital">{{shopInfo.registCapital}}万元</span></p></li>
                    </ul>
                </div>
            </div>
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">图片信息</div>
                </div>
                <div class="details-content">
                    <ul class="clearfix">
                        <li class="fl imgBox">
                            <div>
                                <div>
                                    <a :href="picServer + shopInfo.shopLogo">
                                        <img :src="picServer + shopInfo.shopLogo" alt="">
                                    </a>
                                </div>
                                <div class="imgTit">店铺LOGO</div>
                            </div>
                        </li>
                        <li class="fl imgBox">
                            <div>
                                <div>
                                    <a :href="picServer + shopInfo.shopSigns">
                                        <img :src="picServer + shopInfo.shopSigns" alt="">
                                    </a>
                                </div>
                                <div class="imgTit">店铺店招</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">公司简介</div>
                </div>
                <div class="details-content">
                    <div class="details-decri">
                        {{shopInfo.comDesc}}
                    </div>
                </div>
            </div>
            <div class="for-itemlis">
                <div class="item-head clearfix">
                    <div class="fl item-tit">企业服务信息</div>
                </div>
                <div class="details-content">
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">企业类型：{{shopInfo.comType | comTypefiter}}</div>
                        <div class="fl detai_list ellipsis"></div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">企业性质：{{shopInfo.venProperties | venPropertiesfiter}}</div>
                        <div class="fl detai_list ellipsis"></div>
                    </div>
                </div>
            </div>
            <!--店铺负责人-->
            <div class="for-itemlis" v-if="shopContactsList" v-for="item in shopContactsList">
                <div class="item-head clearfix">
                    <div class="fl item-tit">{{item.contactType | contactTypefilter}}</div>
                </div>
                <div class="details-content">
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">姓名：</div>
                        <div class="fl detai_list ellipsis">{{item.contName}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">手机号码：</div>
                        <div class="fl detai_list ellipsis">{{item.contPhone}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">电子邮件：</div>
                        <div class="fl detai_list ellipsis">{{item.contEmail}}</div>
                    </div>
                    <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">QQ号码：</div>
                        <div class="fl detai_list ellipsis">{{item.contQq}}</div>
                    </div>
                     <div class="detalls_flr clearfix">
                        <div class="fl detai_labeL">座机：</div>
                        <div class="fl detai_list ellipsis">{{item.landline}}</div>
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
            htmlloading: false,
            shopInfo: {},
            picServer: '',
            shopContactsList: [],
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        enquiryForm() {
            if (this.$route.query.userCode) {
                let params = {};
                params.userCode = this.$route.query.userCode;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/shopmanager/queryShopDetail`,
                    data: params
                }).then((res) => {
                    console.log('--666--!!>', res);
                    this.htmlloading = true;
                    if (res.data.picServer) {
                        this.picServer = res.data.picServer;
                    }
                    this.shopInfo = res.data.shopInfo;
                    this.shopContactsList = res.data.shopContactsList;
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
