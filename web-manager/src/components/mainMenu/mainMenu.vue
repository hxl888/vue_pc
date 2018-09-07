<template lang="html">
    <div class="m-menu-con">
        <div class="m-menu-btn">
            <p @click.prevent='menuCtrbtn'>
                <em class="iconfont icon-zhankai"></em><span class="sort-text">收起</span>
            </p>
        </div>
        <div class="m-menu-itemcon">
            <div class="m-menu-ulcon">
                <el-menu :router="true" v-if='menuData.length' mode="vertical" :default-active="defaultActiveId" class="el-menu-vertical-demo">
                    <el-menu-item v-for="(item, index) in menuData" :index="item.acKey" :key='item.acId' :route="{path: '/pages' + item.url}">
                        <i class="iconfont" :class="'icon-' + item.acKey"></i><span class="sort-text">{{item.acName}}</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="menuSub_cons" id='menuSub_cons'>
                <div class="menuSub" v-if='menuData.length' v-for="(item, index) in menuData" :key='item.acId'>
                    <h2 class='menuSub_cons_h2'>{{item.acName}}</h2>
                    <div class="menuSub-item" v-for="(secItem, secIndex) in item.subList" :key='secItem.acId'>
                        <h3>{{secItem.acName}}</h3>
                        <ul class="clearfix">
                            <router-link tag="li" class='thirdItemLi' v-for='(thirdItem, thirdIndex) in secItem.subList' :key='thirdItem.acId' :to="{path: '/pages' + thirdItem.url}">{{thirdItem.acName}}</router-link>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import 'static/js/lib/jquery.menu-aim.js';
import {mulist} from '@/dataControl.js';
export default {
    name: 'mainMenu',
    data() {
        return {
            menuData: [],
            wheight: 0
        };
    },
    created() {
        this.getMenuData();
//        this.menuData = this.mulists;
    },
    mounted() {
        this.$nextTick(() => {
            $('body').on('click', '.thirdItemLi', function() {
                $('#menuSub_cons').hide();
            });
        });
    },
    computed: {
        defaultActiveId() {
            // 根据路由匹配选中项 --- 会筛选子菜单
            var activeId = '';
            this.menuData.forEach((item) => {
                if (item.acKey === this.$route.meta.acKey) {
                    activeId = item.acKey;
                    return true;
                }
            });
            return activeId;
        },
        mulists() {
            return mulist;
        }
    },
    methods: {
        getMenuData() {
            let menuList = window.localStorage.getItem('menuList_man');
            if (menuList) {
                this.menuData = JSON.parse(menuList);
                this.$nextTick(() => {
                    var _that = this;
                    var obj = $('.m-menu-itemcon');
                    var listUl = obj.find('.el-menu-vertical-demo');
                    var subMenu = obj.find('#menuSub_cons');
                    var timer = null;
                    _that.wheight = $(window).height();
                    listUl.menuAim({
                        activate: function(obj) {
                            clearTimeout(timer);
                            var _this = $(obj);
                            var _index = $(obj).index();
                            var _thisel = subMenu.children().eq(_index);
                            subMenu.css({left: $('.m-menu-con').width()}).show();
                            _thisel.show().siblings().hide();
                            listUl.find('li').removeClass('active');
                            _this.addClass('active');
                            var st = $('.m-menu-ulcon').scrollTop();
                            var xeMenuSt = $(obj).position().top;
                            subMenu.stop(true, true).animate({'top': xeMenuSt - st}, 100, function() {
                                if ((subMenu.offset().top + _thisel.outerHeight()) > _that.wheight - 10) {
                                    subMenu.stop(true, true).animate({'top': ((_this.position().top - st) + _this.height()) - _thisel.height() + 28}, 100);
                                }
                            });
                        },
                        exitMenu: function() {
                            return true;
                        }
                    });
                    listUl.mouseleave(function(event) {
                        timer = setTimeout(function() {
                            subMenu.stop(true, true).animate({
                                left: 180
                            }, 100, function() {
                                subMenu.hide();
                            });
                        }, 100);
                    });
                    obj.mouseleave(function(event) {
                        subMenu.hide();
                    });
                    subMenu.mouseover(function() {
                        clearTimeout(timer);
                        subMenu.show();
                    });
                    subMenu.mouseleave(function() {
                        timer = setTimeout(function() {
                            subMenu.hide();
                        }, 100);
                    });

                    $(window).on('resize', () => {
                        _that.wheight = $(window).height();
                    });
                });
            }
        },
        menuCtrbtn() {
            if ($('body').hasClass('body-menu-sort')) {
                $('body').removeClass('body-menu-sort');
            } else {
                $('body').addClass('body-menu-sort');
            }
        }
    }
};
</script>
