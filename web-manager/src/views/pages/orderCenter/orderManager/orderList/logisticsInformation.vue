<template lang="html">
    <div class="logisticsInformation">
        <div class="for-itemlis">
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">物流单号：{{logisticsInfor.logtsCode}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">物流公司：{{logisticsInfor.logtsCompany}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis" style="background: #fff">物流车辆：{{logisticsInfor.driverCarNumber}}</p></li>
                </ul>
            </div>
        </div>
    <!--步骤条样式设置：step_Box_one 、 step_Box_two、 step_Box_three 、step_Box_four 、step_Box_five、step_Box_sex、step_Box_seven 改变顶层divclass名即可-->
        <div class="stepsBox clearfix" :class="stepNum">
            <div class="fl step_lis">
                <span class="step_ty iconfont step_one"></span>
                <span class="step_con step_con_one">仓库接单</span>
                <span class="bor_show bor_one"></span>
            </div>
            <div class="fl step_lis">
                <span class="step_ty iconfont step_two"></span>
                <span class="step_con step_con_two">订单审核</span>
                <span class="bor_show bor_two"></span>
            </div>
            <div class="fl step_lis">
                <span class="step_ty iconfont step_three"></span>
                <span class="step_con step_con_three">备货中</span>
                <span class="bor_show bor_three"></span>
            </div>
            <div class="fl step_lis">
                <span class="step_ty iconfont step_four"></span>
                <span class="step_con step_con_four">代发货</span>
                <span class="bor_show bor_four"></span>
            </div>
            <div class="fl step_lis">
                <span class="step_ty iconfont step_five"></span>
                <span class="step_con step_con_five">运输中</span>
                <span class="bor_show bor_five"></span>
            </div>
             <div class="fl step_lis">
                <span class="step_ty iconfont step_sex"></span>
                <span class="step_con step_con_sex">签收</span>
            </div>
        </div>
        <!--步骤条物信息展示-->
        <div class="step-conBox" v-if="logisticsInfor.logisticDetail">
            <div class="step-conlis" v-for="item in logisticsInfor.logisticDetail">
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
                if (this.logisticsInfor) {
                    let logtsStatus = this.logisticsInfor.logtsStatus;
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
                    } else if (logtsStatus === 7) {
                        classIndex = 'step_Box_seven';
                    }
                    return classIndex;
                }
            }
        }
    };
</script>

<style lang="scss">
</style>
