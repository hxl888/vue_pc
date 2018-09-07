<template lang="html">
    <div class="m-router page404">
        <img src="../../assets/images/img-404.jpg" width="479" height="299" alt="">
        <p>呃(⊙o⊙)… 你访问的网页找不到了...</p>
        <div class="button">
            <el-button type="primary" @click.prevent="linkToIndex">返回首页</el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'p404',
    methods: {
        linkToIndex() {
            this.$router.replace({name: 'index'});
        }
    }
};
</script>

<style lang="scss">
	.page404{
		background: #fff;
		text-align: center;
        padding: 60px 0;
        &.m-router {
            left: 0;
        }
		p{
			line-height: 76px;
			font-size: 18px;
			color: #666;
		}
	}
</style>
