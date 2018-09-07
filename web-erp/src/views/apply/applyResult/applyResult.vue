<template lang="html">
    <div style="padding: 30px 0 50px 0;">
        <div class="contentSubmit" v-if="flag1">
            <h3>
                <i class="iconfont icon-shenhezhong characterBlue"></i>
                <span class="bigTitle">入驻申请已提交</span>
            </h3>
            <p class="zqTime">鲜易网将会在1个工作日内完成审核，审核结果将以短信形式通知您。</p>
            <div class="zq-conten">
                <p>
                    <span>等待审核期间，您可以：</span>
                    <a href="http://www.xebest.com/" target="_blank" class="continue">继续浏览鲜易网</a>
                    <router-link class="continue" style="padding-left: 18px" :to="{name: 'login'}" replace>返回至供应商登录</router-link>
                </p>
            </div>
        </div>
        <div class="contentSubmit contentPass" v-if="flag2">
            <h3>
                <i class="iconfont icon-duihao1 characterWin"></i>
                <span class="bigTitle">您的入驻申请已审核通过，请与平台签订相关合同</span>
            </h3>
            <p class="zqTime">鲜易网工作人员将在3个工作日内与您联系，您也可以拨打客服热线（400-662-6366）进行咨询。</p>
            <div class="zq-conten">
                <p>
                    <span>等待签订时间，您可以：</span>
                    <a href="http://www.xebest.com/" target="_blank" class="continue">继续浏览鲜易网</a>
                    <router-link class="continue" style="padding-left: 18px" :to="{name: 'login'}" replace>返回至供应商登录</router-link>
                </p>
            </div>
        </div>
        <div class="contentSubmit contentTurndown" v-if="flag3">
            <h3>
                <i class="iconfont icon-shenhebohui characterRed"></i>
                <span class="bigTitle">入驻申请已被驳回！</span>
            </h3>
            <p class="zqTime">驳回原因：{{rejectMsg}}</p>
            <div class="zq-conten">
                <p>
                    <span>您可以重新填入驻信息，您可以：</span>
                    <router-link class="continue" :to="{name: 'applyData'}" replace>供应商重新入驻</router-link>
                    <router-link class="continue" style="padding-left: 18px" :to="{name: 'login'}" replace>返回至供应商登录</router-link>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import {getNowCookie} from 'utils/commonBase';
    export default {
        name: 'applyResult',
        beforeRouteEnter(to, from, next) {
            let nowCookie = getNowCookie();
            let userInfo = nowCookie.userInfo;
            switch (userInfo.code) {
                case 1 :
                    // 待审核
                    next();
                    break;
                case 2 :
                    // 审核通过
                    next();
                    break;
                case 3 :
                    // 驳回
                    next();
                    break;
                case 4 :
                    // 已签订
                    next({
                        name: 'index'
                    });
                    break;
                default :
                    // 未入住
                    next({
                        name: 'applyAccount'
                    });
            }
        },
        data() {
            return {
                flag1: false,
                flag2: false,
                flag3: false,
                rejectMsg: '审核不通过！'
            };
        },
        created() {
            let nowCookies = getNowCookie().userInfo;
            if (nowCookies.code === 1) {
                this.flag1 = true;
            } else if (nowCookies.code === 2) {
                this.flag2 = true;
            } else if (nowCookies.code === 3) {
                this.flag3 = true;
                this.rejectMsg = getNowCookie().rejectMsg;
            }
        }
    };
</script>
