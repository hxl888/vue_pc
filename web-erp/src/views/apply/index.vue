<template lang="html">
    <div class="apply-con login-contanier">
        <loginHeader>
            <template slot="destext">供应商入驻申请</template>
        </loginHeader>
        <div class="m-applyCon">
            <div class="m-applyRouter">
                <applySteps></applySteps>
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import loginHeader from 'components/loginHeader/loginHeader';
    import applySteps from '@/components/applySteps/applySteps';
    export default {
        name: 'applyIndex',
        components: {
            applySteps,
            loginHeader
        },
        data() {
            return {};
        },
        watch: {
            $route() {
                this.$nextTick(() => {
                    $('.m-applyCon').scrollTop(0);
                });
            }
        }
    };
</script>
