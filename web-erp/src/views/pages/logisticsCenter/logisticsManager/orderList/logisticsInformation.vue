<template lang="html">
    <div class="logisticsInformation">
    <!--步骤条样式设置：step_Box_one 、 step_Box_two、 step_Box_three 、step_Box_four 、step_Box_five、step_Box_sex、step_Box_seven 改变顶层divclass名即可-->
        <div class="stepsBox clearfix" :class="stepNum" v-if="logisticsInfor">
            <!--仓库接单-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_one"></span>
                <span class="step_con step_con_one">仓库接单</span>
                <span class="bor_show bor_one"></span>
            </div>
            <!--订单审核-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_two"></span>
                <span class="step_con step_con_two">订单审核</span>
                <span class="bor_show bor_two"></span>
            </div>
            <!--备货中-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_three"></span>
                <span class="step_con step_con_three">备货中</span>
                <span class="bor_show bor_three"></span>
            </div>
            <!--待发货-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_four"></span>
                <span class="step_con step_con_four">待发货</span>
                <span class="bor_show bor_four"></span>
            </div>
            <!--运输中-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_five"></span>
                <span class="step_con step_con_five">运输中</span>
                <span class="bor_show bor_five"></span>
            </div>
            <!--签收-->
            <div class="fl step_lis">
                <span class="step_ty iconfont step_sex"></span>
                <span class="step_con step_con_sex">签收</span>
            </div>
        </div>
        <!--步骤条物信息展示-->
        <div class="step-conBox" v-if="logisticsInfor">
            <div class="step-conlis" v-for="item in logisticsInfor">
                <div class="con_tit"><span class="typ_rou"></span><span>{{item.logtsDesc}}</span></div>
                <div class="con_time">{{item.createDate | millisecondFormat('ms')}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['logisticsInfor'],
        data() {
            return {
            };
        },
        computed: {
            stepNum() {
                if (this.logisticsInfor && this.logisticsInfor.length > 0) {
                    let logtsStatus = this.logisticsInfor[0].logtsStatus;
                    let classIndex = '';
                    if (logtsStatus === 1) {
                        classIndex = 'step_Box_one';
                    } else if (logtsStatus === 2) {
                        classIndex = 'step_Box_two';
                    } else if (logtsStatus === 3) {
                        classIndex = 'step_Box_three';
                    } else if (logtsStatus === 4) {
                        classIndex = 'step_Box_four';
                    } else if (logtsStatus === 5) {
                        classIndex = 'step_Box_five';
                    } else if (logtsStatus === 6) {
                        classIndex = 'step_Box_sex';
                    }
                    console.log('n-logisticsInfor-->', typeof this.logisticsInfor[0].logtsStatus);
                    return classIndex;
                }
            }
        }
    };
</script>
