<template lang="html">
    <div class='m-applyStep clearfix'>
        <span class="c-applyTit" v-if="baseFlag">基本信息</span>
        <div class="c-applyStep">
            <!--<步骤条样式设置：step_Box_one 、 step_Box_two、 step_Box_three 改变-->
            <div :class="stepCls" class="stepsBox clearfix stepsBox02">
                <!--确认账户-->
                <div class="fl step_lis">
                    <span class="step_ty iconfont step_one step_one02"></span>
                    <span class="step_con step_con_one">确认账户</span>
                    <span class="bor_show bor_one"></span>
                </div>
                <!--填写申请资料-->
                <div class="fl step_lis">
                    <span class="step_ty iconfont step_two"></span>
                    <span class="step_con step_con_two">填写申请资料</span>
                    <span class="bor_show bor_two"></span>
                </div>
                <!--鲜易网批准-->
                <div class="fl step_lis">
                    <span class="step_ty iconfont step_three"></span>
                    <span class="step_con step_con_three">鲜易网批准</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            routerName: '',
            stepCls: ''
        };
    },
    methods: {
        routerChange() {
            if (this.$route.name === 'applyData') {
                this.baseFlag = true;
                this.stepCls = 'step_Box_two';
            } else if (this.$route.name === 'applyAccount') {
                this.baseFlag = false;
                this.stepCls = 'step_Box_one';
            } else if (this.$route.name === 'applyResult') {
                this.baseFlag = false;
                this.stepCls = 'step_Box_three';
            }
        }
    },
    created() {
        this.routerName = this.$route.name;
        this.routerChange();
    },
    watch: {
        '$route': 'routerChange'
    }
};
</script>

<style lang="scss">
    .m-applyStep{
        border-bottom: 1px solid #e9e9e9;
        line-height: 70px;
        .c-applyTit{
            float: left;
            font-size: 14px;
            color: #464c5b;
        }
        .c-applyStep{
            float: right;
        }
        .chunk{
            height: 20px;
            line-height: 20px;
            /*position: relative;*/
        }
        .chunk .wire{
            width: 120px;
            height: 2px;
            border: 1px solid #bcc0c7;
            /*position: absolute;*/
            /*right: 20px*/
            margin-top: 10px;
            margin-left: 10px;
        }
        .chunk p{
            display: inline-block;
            height: 20px;
            font-size: 20px;
            padding-left: 10px;

        }
        .chunk .character{
            font-size: 12px;
            vertical-align: middle;
            color: #687281;
        }
        .stepsBox02{
            margin-top: 25px;
            margin-bottom: 28px;
        }
        .stepsBox.step_Box_two .step_ty.step_two{
            border:none;
        }
        .stepsBox.step_Box_one .step_ty.step_one02{
            border-color: #237fff;
        }
        .stepsBox .step_one02{
            // border:none;
        }
    }
</style>
