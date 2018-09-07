<template>
    <div class="m-authDist-con">
        <autDist v-if="itemData.length" :itemData="itemData"></autDist>
    </div>
</template>
<script type="text/ecmascript-6">
    import autDist from './authDist';
    export default {
        props: {
            itemData: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                tmpSelected: []
            };
        },
        methods: {
            updateResult (result) {
                this.tmpSelected = result;
            }
        },
        components: {
            autDist
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .m-authDist-con {
        font-size: 0;
        margin-bottom: 20px;
        span {
            font-size: 0;
            margin:0 5px;
        }
    }
</style>
