<template lang="html">
    <div class="pages-con">
        <headerView></headerView>
        <div class="m-contanier">
            <mainMenu></mainMenu>
            <div class="m-router page404">
                <img src="../../assets/images/img-404.jpg" alt="">
                <p>呃(⊙o⊙)… 你访问的网页找不到了...</p>
            </div>
        </div>
    </div>
</template>

<script>
import headerView from '@/components/header/header';
import mainMenu from '@/components/mainMenu/mainMenu';
export default {
    name: 'p404',
    components: {
        headerView,
        mainMenu
    },
    data() {
        return {
            bar: 1
        };
    },
    watch: {
        $route() {
            this.$nextTick(() => {
                $('.m-router').scrollTop(0);
            });
        }
    }
};
</script>

<style lang="scss">
	.page404{
		background: #fff;
		text-align: center;
		padding-top: 62px;
		p{
			line-height: 76px;
			font-size: 18px;
			color: #666;
		}
	}
</style>
