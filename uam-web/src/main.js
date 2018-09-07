// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
// import store from 'src/store/';
import routes from './router';
import filters from './filters';
import axios from 'axios';
// import qs from 'qs';
import 'xcms-common-plugins/dist/styles/xcms-common.min.css';
import Cookies from 'js-cookie';
import Bus from 'src/vueBus.js';
import XeEncrypt from './utils/XeEncrypt';
import CommonClient from './utils/common-client';
import DateUtils from './utils/dateUtils';
import Mixin from './mixins';
// 全局引入
// import xcmsCommonPlugins from 'xcms-common-plugins';
// Vue.use(xcmsCommonPlugins);

// 引入全局xcmsCommonPlugins utils 方法
import {logOut, resetTokenCookie, getNowCookie, getHomeProjectLink} from 'xcms-common-plugins/src/utils/';

Vue.use(VueRouter);
// 按需引入 ElementUI
import {
    Table,
    tableColumn,
    Input,
    Select,
    Option,
    Button,
    Menu,
    Submenu,
    menuItem,
    menuItemGroup,
    Breadcrumb,
    breadcrumbItem,
    Dialog,
    Pagination,
    Form,
    formItem,
    DatePicker,
    MessageBox,
    Message,
    Loading,
    Radio,
    Tree,
    Tabs,
    TabPane
} from 'element-ui';

const components = [
    Table,
    tableColumn,
    Input,
    Select,
    Option,
    Button,
    Menu,
    Submenu,
    menuItem,
    menuItemGroup,
    Breadcrumb,
    breadcrumbItem,
    Dialog,
    Pagination,
    Form,
    formItem,
    Radio,
    DatePicker,
    Tree,
    Tabs,
    TabPane
];

components.map(component => {
    Vue.component(component.name, component);
});

Vue.use(Loading.directive);
Vue.prototype.$xeMessageBox = MessageBox;
Vue.prototype.$xeMessage = Message;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$xeLoading = Loading.service;
Vue.prototype.$xeCookies = Cookies;
Vue.prototype.$xeStore = window.localStorage;
Vue.prototype.$xeBus = Bus;
Vue.prototype.$xeCrypto = new XeEncrypt();
Vue.prototype.$xeCommonClient = new CommonClient();
Vue.prototype.$xeDateUtils = new DateUtils();

import App from './app';

// 实例化Vue的filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));

const router = new VueRouter({
    mode: 'history',
    routes
});

// 获取环境对应链接
let projectLink = getHomeProjectLink();

// ajax
Vue.prototype.$http = axios.create({
    timeout: 10000
});
Vue.prototype.$http.defaults.baseURL = projectLink.apiBaseUrl;
let locationHref = projectLink.locationHref;
let locationUserInit = projectLink.locationUserInit; // 跳转认证初始页链接
let locationReject = projectLink.locationReject; // 跳转认证驳回页链接
let locationTication = projectLink.locationTication; // 跳转认证审核页面信息链接
// POST传参序列化
Vue.prototype.$http.interceptors.request.use((config) => {
    if (config.method === 'POST' || config.method === 'post') {
        config.headers.Authorization = 'Bearer ' + getNowCookie().token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// code状态码200判断
Vue.prototype.$http.interceptors.response.use((res) => {
    // token续租
    if (res.headers.newtoken) {
        resetTokenCookie(res.headers.newtoken);
    }
    if (res.data.code !== 200) {
        if (res.data.code === 100009 || res.data.code === 100010 || res.data.code === 100006) {
            // TOKEN解析失败 || 操作频率过快, 您的帐号已被冻结 || 会话超时,请刷新页面重试
            Message.error(res.data.message);
            logOut();
            window.location.href = locationHref;
            return Promise.reject(res);
        } else {
            Message.error(res.data.message);
            return Promise.reject(res);
        }
    } else {
        return res.data;
    }
}, () => {
    Message.error('接口请求失败或超时！请刷新重试~');
    return Promise.reject({code: 'xe404'});
});
router.beforeEach((to, from, next) => {
    console.log('===router to===');
    console.log(to);
    console.log(from);
    console.log('===router to===');
    function redirectFn(fullPath, menuList) {
        if (to.meta.level === 3) {
            next();
        } else {
            let flag = true;
            let subMenu = null;
            for (let i = 0; i < menuList.length; i++) {
                if (menuList[i].url === '/uam') {
                    if (menuList[i].hasMenu) {
                        for (let s = 0; s < menuList[i].subMenu.length; s++) {
                            subMenu = menuList[i].subMenu;
                            if (menuList[i].subMenu[s].url === fullPath) {
                                flag = false;
                                next();
                                break;
                            }
                        }
                    } else {
                        flag = false;
                        next();
                    }
                    break;
                };
            };
            if (flag) {
                let index = subMenu[0].url.lastIndexOf('/') + 1;
                next({
                    name: subMenu[0].url.substring(index)
                });
            };
        }
    };
    // to 和 from 都是 路由信息对象
    if (to.meta.auth) {
        let nowCookie = getNowCookie();
        let token = nowCookie.token;
        let userInfo = nowCookie.userInfo;
        if (userInfo && token) {
            if (to.meta.noRequestApprove) {
                next();
            } else {
                switch (userInfo.userStatus) {
                    case '100' :
                        // 未认证
                        window.location.href = locationUserInit;
                        break;
                    case '200' :
                        // 认证中
                        window.location.href = locationTication;
                        break;
                    case '300' :
                        // 驳回
                        window.location.href = locationReject;
                        break;
                    case '400' :
                        // 已认证
                        // 已登录无menuList请求
                        if (!window.localStorage.getItem('menuList')) {
                            Vue.prototype.$http({
                                method: 'POST',
                                url: '/page/uam/menu/main/findAllMenuInfoByCurrentUser'
                            }).then(res => {
                                window.localStorage.setItem('menuList', JSON.stringify(res.result));
                                redirectFn(to.fullPath, res.result);
                            });
                        } else {
                            redirectFn(to.fullPath, JSON.parse(window.localStorage.getItem('menuList')));
                        }
                        break;
                    default :
                        next({
                            path: '/'
                        });
                }
            }
        } else {
            // next({
            //     path: '/login',
            //     query: {redirect: to.fullPath}
            // });
            window.location.href = locationHref;
        }
    } else {
        next();
    };
    document.title = to.meta.name;
});

Vue.mixin(Mixin);

/* eslint-disable no-new */
new Vue({
    router,
    // store,
    render: h => h(App)
}).$mount('#app');
