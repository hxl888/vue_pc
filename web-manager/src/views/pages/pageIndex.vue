<template lang="html">
    <div class="m-router-con index-content">
        <div class="prepageIndex">
            <!-- <h2 class='menuSub_cons_h2'>{{menuData.acName}}</h2> -->
            <div class="prepageIndex-item" v-for="(secItem, secIndex) in menuData.subList" :key='secItem.acId'>
                <h3>{{secItem.acName}}</h3>
                <ul class="clearfix">
                    <router-link tag="li" class='prepageItemLi' v-for='(thirdItem, thirdIndex) in secItem.subList' :key='thirdItem.acId' :to="{path: '/pages' + thirdItem.url}">{{thirdItem.acName}}</router-link>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
// import 'static/js/lib/jquery.menu-aim.js';
export default {
    data() {
        return {
            menuData: {}
        };
    },
    created() {
        let menuObj = {
            proCenter: 'proCenter',
            vendorCenter: 'vendorCenter',
            promotionCenter: 'promotionCenter',
            cmsCenter: 'cmsCenter',
            memberCenter: 'memberCenter',
            infoCenter: 'infoCenter',
            systemCenter: 'systemCenter',
            mobileCenter: 'mobileCenter',
            orderCenter: 'orderCenter',
            versionsCenter: 'versionsCenter',
            financeCenter: 'financeCenter'
        };
        this.getMenuData(menuObj[this.$route.meta.acKey]);
    },
    methods: {
        getMenuData(menuCenter) {
            let menuList = window.localStorage.getItem('menuList_man');
            if (menuList) {
                menuList = JSON.parse(menuList);
            };
            for (var i = 0; i < menuList.length; i++) {
                let item = menuList[i];
                if (item.acKey === menuCenter) {
                    this.menuData = item;
                }
            }
        }
    }
};
</script>

<style lang="scss">
    .index-content{
        padding-top: 15px;
        .prepageIndex-item{
            ul{
                padding-bottom: 20px;
            }
            h3{
                line-height: 40px;
                font-size: 12px;
                color: #48576a;
                border-bottom: 1px solid #e4e4e4;
            }
            .prepageItemLi{
                line-height: 40px;
                width: 120px;
                background: #fff;
                border: 1px solid #d6dde3;
                float: left;
                margin: 20px 20px 20px 0;
                text-align: center;
                color: #9198a2;
                cursor: pointer;
                &:hover{
                    background: #f5f6fa;
                }
            }
        }
    }
</style>
