<template lang='html'>
    <div class='m-submenu' v-if='subMenuData.length'>
        <div class="m-submenu-con">
            <el-menu class="el-menu-vertical-demo" :default-active='activeId' :router="true" :default-openeds="openedsArr" :unique-opened="true">
                <template v-for='(item, pindex) in subMenuData'>
                    <template v-if='item.subMenu.length'>
                        <el-submenu :index="item.id + ''">
                            <template slot="title">{{item.menuName}}</template>
                            <el-menu-item
                            v-for='(subItem, cindex) in item.subMenu'
                            :route='{path: subItem.url}'
                            :index="subItem.id + ''">{{subItem.menuName}}</el-menu-item>
                        </el-submenu>
                    </template>
                    <el-menu-item :route='{path: item.url}' :index="item.id + ''" v-else>{{item.menuName}}</el-menu-item>
                </template>
            </el-menu>
        </div>
        <div class='showBtn' @click.prevent='hideSubMenu'>
            <span class='xcms-iconfont icon-zhankaishouhui'></span>
        </div>
    </div>
</template>

<script>
import {addClass} from 'xcms-common-plugins/src/utils/';
export default {
    data() {
        return {
            subMenuData: []
        };
    },
    created() {
        // 获取对应子菜单
        var storeMenu = this.$xeStore.getItem('menuList');
        var allMenuData = storeMenu ? JSON.parse(storeMenu) : '';
        var dataFlag = '/csc';
        if (allMenuData) {
            allMenuData.some((subitem) => {
                if (subitem.url === dataFlag) {
                    if (subitem.hasMenu) {
                        this.subMenuData = subitem.subMenu;
                    } else {
                        this.subMenuData = [];
                        this.$nextTick(() => {
                            addClass(document.querySelector('.page-con'), 'page-no-submenu');
                        });
                    }
                    return true;
                }
            });
//            console.log(this.subMenuData);
        }
    },
    computed: {
        activeId() {
            // 根据路由匹配选中项 --- 会筛选子菜单
            var activeId = null;
            this.subMenuData.forEach((item) => {
                if (item.hasMenu) {
                    item.subMenu.some((subitem) => {
                        if (subitem.url === this.$route.path) {
                            activeId = subitem.id;
                            return true;
                        }
                    });
                } else {
                    if (item.url === this.$route.path) {
                        activeId = item.id;
                    }
                }
            });
            return activeId;
        },
        openedsArr() {
            // 遍历菜单数据展开所有有子菜单的项
            var arr = [];
            this.subMenuData.forEach((item) => {
                if (item.hasMenu) {
                    item.subMenu.some((subitem) => {
                        if (subitem.url === this.$route.path) {
                            arr.push(item.id);
                            return true;
                        }
                    });
                }
            });
            return arr;
        }
    },
    methods: {
        hideSubMenu() {
            this.$emit('hide-submenu');
        }
    }
};
</script>

<style lang='scss'>
</style>
