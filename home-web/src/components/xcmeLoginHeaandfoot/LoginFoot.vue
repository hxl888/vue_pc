<template lang="html">
    <div class="login-footbox">
        <div class="fot-top">
            <ul class="fot_top_hea clearfix">
              <li class="hea_lis hea_lis01 fl">
              </li>
              <li class="hea_lis hea_lis02 fl">
              </li>
              <li class="hea_lis hea_lis03 fl">
              </li>
              <li class="hea_lis hea_lis04 fl">
              </li>
              <li class="hea_lis hea_lis05 fl">
              </li>
            </ul>
        </div>
        <div class="fot-bot">
            <div class="ft_div clearfix">
                <div class="ft_div1 fl">
                  <h3>快速入门</h3>
                  <ul>
                    <li><a :href="getFooterUrl('zhucelc')">注册流程</a></li>
                    <li><a :href="getFooterUrl('storage')">认证流程</a></li>
                    <li><a :href="getFooterUrl('logistics')">货物托运</a></li>
                    <li><a :href="getFooterUrl('settlement')">货物入仓</a></li>
                    <li><a :href="getFooterUrl('materiel')">账单结算</a></li>
                  </ul>
                </div>
                <div class="ft_div1 fl">
                  <h3>关于平台</h3>
                  <ul>
                    <li><a :href="getFooterUrl('transaction')">平台简介</a></li>
                    <li><a :href="getFooterUrl('control')">平台服务协议</a></li>
                    <li><a :href="getFooterUrl('control1')">加入我们</a></li>
                    <li><a :href="getFooterUrl('control2')">联系我们</a></li>
                  </ul>
                </div>
                <div class="ft_div1 fl">
                  <h3>快速通道</h3>
                  <ul>
                    <li><a :href="hnxianyiUrl" target="_Blank">鲜易供应链</a></li>
                    <li><a :href="xebestUrl" target="_Blank">鲜易网</a></li>
                    <li><a :href="lenglianmajiaUrl" target="_Blank">冷链马甲</a></li>
                    <li><a :href="zhongpinUrl" target="_Blank">众品食业</a></li>
                  </ul>
                </div>
                <div class="ft_div1 fl">
                  <h3>关注我们</h3>
                  <ul>
                        <li class="ewm">
                            <small class="h_weixin"></small>
                             <a href="javascript:" style="cursor: default;color: #696969">官方微信</a>
                             <div class="ewm1"></div>
                        </li>
                        <li>
                            <small class="h_weibo"></small>
                            <a :href="weiboUrl" target="_Blank">新浪微博</a></li>

                        <li>
                            <small class="h_tieba"></small>
                            <a :href="tiebaUrl" target="_Blank">官方贴吧</a>
                        </li>

                  </ul>
                </div>
            </div>
            <div class="tel_play">
                <ul>
                    <li style="font-size:24px">
                        <small></small>
                        400-816-0366
                    </li>
                    <li>
                        <small></small>
                        周一至周日 8:00-18:00
                    </li>
                </ul>
            </div>
        </div>
        <div class="copy">
          ©2014-2020 河南鲜易供应链有限公司版权所有  豫ICP备16033710号-1  服务热线:400-693-7978
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                footerUrl: 'http://www.xianyiscm.com/html/API.html',
                hnxianyiUrl: 'http://www.hnxianyi.com',
                xebestUrl: 'http://www.xebest.com',
                lenglianmajiaUrl: 'http://www.lenglianmajia.com/',
                zhongpinUrl: 'http://www.zhongpin.com/',
                tiebaUrl: 'https://tieba.baidu.com/f?ie=utf-8&kw=%E9%B2%9C%E6%98%93%E4%BE%9B%E5%BA%94%E9%93%BE&fr=search',
                weiboUrl: 'http://weibo.com/u/5135258609?refer_flag=1001030101_&is_hot=1',
                goyx: false
            };
        },
        methods: {
            getFooterUrl(anchor) {
                return this.footerUrl + '#' + anchor;
            }
        }

    };
</script>
