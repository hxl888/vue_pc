<template lang="html">
    <div class="main-contanier">
        <xcmsTopNav></xcmsTopNav>
        <transition name='slide-fade'>
            <div class='showsubmenu' v-show='!isActive' @click='showMenu'>
                <span class='el-icon-arrow-right' title="展开子菜单"></span>
            </div>
        </transition>
        <div class='page-con' :class="{'page-con-active': isActive}">
            <submenu @hide-submenu='hideMenu'></submenu>
            <div class="main-01-router">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import xcmsTopNav from 'components/xcmsTopNav/sideNav';
    // 中心子菜单
    import submenu from 'components/submenu';
    export default {
        data() {
            return {
                isActive: true
            };
        },
        components: {
            xcmsTopNav,
            submenu
        },
        computed() {},
        methods: {
            hideMenu() {
                this.isActive = false;
            },
            showMenu() {
                this.isActive = true;
            }
        }
    };
</script>

<style lang="scss">
    .slide-fade-enter-active,.slide-fade-leave-active {
      transition: all .3s ease-in-out;
    }
    .slide-fade-enter, .slide-fade-leave-active {
      transform: scale(1.5);
      opacity: 0;
    }
    .showsubmenu {
        width: 10px;
        height: 20px;
        background: #c1c1c1;
        position: absolute;
        left: 120px;
        top: 50%;
        margin-top: -10px;
        z-index: 50;
        color: #fff;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
    }
    .body-mainmenu-sort {
        .showsubmenu {
            left: 50px;
        }
    }
</style>
