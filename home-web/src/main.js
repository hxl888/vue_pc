// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from 'src/store/';
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
    MessageBox,
    Message,
    Loading,
    Checkbox,
    checkboxGroup,
    radio,
    Upload,
    Tree,
    Tabs,
    TabPane,
    Tooltip
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
    Checkbox,
    checkboxGroup,
    radio,
    Upload,
    Tree,
    Tabs,
    TabPane,
    Tooltip
];

components.map(component => {
    Vue.component(component.name, component);
});

Vue.use(Loading.directive);
Vue.prototype.$xeMessageBox = MessageBox;
Vue.prototype.$xeMessage = Message;
Vue.prototype.$xeLoading = Loading.service;
Vue.prototype.$xeCookies = Vue.$xeCookies = Cookies;
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
Vue.$http = Vue.prototype.$http = axios.create({
    timeout: 50000
});
Vue.prototype.$http.defaults.baseURL = projectLink.apiBaseUrl;

// POST传参序列化
Vue.prototype.$http.interceptors.request.use((config) => {
    config.headers.Authorization = 'Bearer ' + getNowCookie().token;
    // if (config.method === 'get' || config.method === 'GET') {
    //     config.data = qs.stringify(config.data);
    //     console.log(config.data);
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});
// code状态码200判断
Vue.prototype.$http.interceptors.response.use((res) => {
    // token续租
    if (res.headers.newtoken) {
        console.info(res.headers.newtoken);
        resetTokenCookie(res.headers.newtoken);
    }
    if (res.data.code !== 200) {
        if (res.data.code === 100009 || res.data.code === 100010 || res.data.code === 100006) {
            // TOKEN解析失败 || 操作频率过快, 您的帐号已被冻结 || 会话超时,请刷新页面重试
            Message.error(res.data.message);
            logOut();
            router.replace({path: '/userauth/login'});
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
    // to 和 from 都是 路由信息对象
    if (to.meta.requestAuth) {
        let nowCookie = getNowCookie();
        let token = nowCookie.token;
        let userInfo = nowCookie.userInfo;
        if (userInfo && token) {
            var toNextfn = function () {
                if (to.meta.noRequestApprove) {
                    next();
                } else {
                    switch (userInfo.userStatus) {
                        case '100' :
                        case '300' :
                            // 未认证
                            next({
                                path: '/home/userinitial'
                            });
                            break;
                        case '200' :
                            // 认证中
                            next({
                                path: '/home/userauthentication'
                            });
                            break;
                        case '400' :
                            // 已认证
                            break;
                        default :
                            next({
                                path: '/'
                            });
                    }
                }
            };
            // 已登录无menuList请求
            if (!window.localStorage.getItem('menuList')) {
                Vue.prototype.$http({
                    method: 'POST',
                    url: '/page/uam/menu/main/findAllMenuInfoByCurrentUser'
                }).then(res => {
                    console.log(res);
                    window.localStorage.setItem('menuList', JSON.stringify(res.result));
                    toNextfn();
                });
            } else {
                toNextfn();
            }
        } else {
            next({
                path: '/userAuth/login',
                query: {redirect: to.fullPath}
            });
        }
    } else {
        next();
    };
    document.title = to.meta.name;
});

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
