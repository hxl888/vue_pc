<template lang="html">
    <div class="logisticsInformation">
    <!--步骤条样式设置：step_Box_one 、 step_Box_two、 step_Box_three 、step_Box_four 、step_Box_five改变顶层divclass名即可-->
        <div class="stepsBox clearfix step_Box_five">
            <!--订单审核-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_one"></span>
                <span class="step_con step_con_one">订单审核</span>
                <span class="bor_show bor_one"></span>
            </div>
            <!--备货中-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_two"></span>
                <span class="step_con step_con_two">备货中</span>
                <span class="bor_show bor_two"></span>
            </div>
            <!--已发货-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_three"></span>
                <span class="step_con step_con_three">已发货</span>
                <span class="bor_show bor_three"></span>
            </div>
            <!--运输中-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_four"></span>
                <span class="step_con step_con_four">运输中</span>
                <span class="bor_show bor_four"></span>
            </div>
            <!--签收-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_five"></span>
                <span class="step_con step_con_five">签收</span>
            </div>
        </div>
        <!--步骤条物信息展示-->
        <div class="step-conBox">
            <div class="step-conlis">
                <div class="con_tit"><span class="typ_rou"></span><span>您的包裹已经进入【鲜易长葛仓】仓库，准备审核！</span></div>
                <div class="con_time">2017-04-08  22:29:59</div>
            </div>
            <div class="step-conlis">
                <div class="con_tit"><span class="typ_rou"></span><span>您的包裹已经进入【鲜易长葛仓】仓库，准备审核！</span></div>
                <div class="con_time">2017-04-08  22:29:59</div>
            </div>
            <div class="step-conlis">
                <div class="con_tit"><span class="typ_rou"></span><span>您的包裹已经进入【鲜易长葛仓】仓库，准备审核！</span></div>
                <div class="con_time">2017-04-08  22:29:59</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                logisticsInformations: {}
            };
        }
    };
</script>

<style lang="scss">
</style>
