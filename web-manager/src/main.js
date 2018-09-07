import 'babel-polyfill';
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import axios from 'axios';
// import Qs from 'qs';
import router from './router';
import filters from './filters';
import Cookies from 'js-cookie';
import Bus from './vueBus.js';
import Mixin from './mixins';

import {
    Loading,
    Button,
    Input,
    Menu,
    Submenu,
    menuItem,
    menuItemGroup,
    DatePicker,
    TimeSelect,
    TimePicker,
    Table,
    tableColumn,
    Select,
    Option,
    Dialog,
    Pagination,
    Form,
    formItem,
    MessageBox,
    Message,
    Checkbox,
    checkboxGroup,
    radio,
    Tree,
    Tabs,
    TabPane,
    Tooltip,
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    RadioGroup,
    Tag,
    Cascader,
    Breadcrumb,
    BreadcrumbItem,
    Autocomplete,
    Carousel,
    CarouselItem
} from 'element-ui';

const components = [
    Button,
    Input,
    Menu,
    Submenu,
    menuItem,
    menuItemGroup,
    DatePicker,
    TimeSelect,
    TimePicker,
    Table,
    tableColumn,
    Select,
    Option,
    Dialog,
    Pagination,
    Form,
    formItem,
    MessageBox,
    Message,
    Checkbox,
    checkboxGroup,
    radio,
    Tree,
    Tabs,
    TabPane,
    Tooltip,
    Badge,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    RadioGroup,
    Tag,
    Cascader,
    Breadcrumb,
    BreadcrumbItem,
    Autocomplete,
    Carousel,
    CarouselItem
];

// 实例化Vue的filters
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
Vue.use(Loading.directive);

components.map(component => {
    Vue.component(component.name, component);
});
Vue.prototype.$xeMessageBox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$alert = MessageBox.alert;
window.$wxeMessage = Vue.prototype.$xeMessage = Message;
Vue.prototype.$xeStore = window.localStorage;
Vue.prototype.$xeCookies = Vue.$xeCookies = Cookies;
Vue.prototype.$xeBus = Bus;
Vue.config.productionTip = false;
window.$axios = Vue.$http = Vue.prototype.$http = axios.create({
    timeout: 50000
});

if (process.env.NODE_ENV === 'test') {
    Vue.prototype.$http.defaults.baseURL = 'http://qa-yunmis.xebest.com/';
};

// // POST传参序列化
Vue.prototype.$http.interceptors.request.use((config) => {
    // config.headers.nonestr = '123';
    // if (config.method === 'POST' || config.method === 'post') {
    //     config.data = Qs.stringify(config.data);
    // }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// code状态码200判断
Vue.prototype.$http.interceptors.response.use((res) => {
    if (res.data.status === '0000') {
        return res.data;
    } else {
        if (res.data.status === '0001' || res.data.status === '0002' || res.data.status === '0003') {
            // 0001 操作失败 0002 无权限 0003 缺少必要参数
            Message.error(res.data.msg);
            return Promise.reject(res);
        } else if (res.data.status === '0004') {
            // 0004 未登录
            Message.error(res.data.msg);
            router.replace({name: 'login'});
            return Promise.reject(res);
        }
    }
}, () => {
    Message.error('接口请求失败或超时！请刷新重试~');
    /* eslint-disable prefer-promise-reject-errors */
    return Promise.reject({status: 'xe404'});
});

Vue.mixin(Mixin);

// 点击body隐藏高级搜索框
$(function() {
    $('body').on('click', function (event) {
        if ($('.advancedSearch').is(':visible')) {
            $('.advancedSearch').animate({right: '-10%', opacity: 0}, 100, () => {
                $('.advancedSearch').hide();
                Bus.$emit('on-advancedSearch-hide', false);
            });
        };
    });
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});
