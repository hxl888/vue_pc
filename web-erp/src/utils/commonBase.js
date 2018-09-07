/**
 * Created by zhangwen on 2017/7/8.
 */
import Cookies from 'js-cookie';
import {toObject} from './index';
let NODE_ENVS = process.env.NODE_ENV;

function setLocalStorage(key, value) {
    switch (NODE_ENVS) {
        case 'production':
            window.localStorage.setItem(`${key}`, value);
            break;
        case 'qa':
            window.localStorage.setItem(`${key}_QA`, value);
            break;
        default :
            window.localStorage.setItem(`${key}_DEV`, value);
    }
}
function getLocalStorage(key) {
    let result = null;
    switch (NODE_ENVS) {
        case 'production':
            result = window.localStorage.getItem(`${key}`);
            break;
        case 'qa':
            result = window.localStorage.getItem(`${key}_QA`);
            break;
        default :
            result = window.localStorage.getItem(`${key}_DEV`);
    }
    return result;
}
function removeLocalStorage(key) {
    switch (NODE_ENVS) {
        case 'production':
            window.localStorage.removeItem(`${key}`);
            break;
        case 'qa':
            window.localStorage.removeItem(`${key}_QA`);
            break;
        default :
            window.localStorage.removeItem(`${key}_DEV`);
    }
}
export {setLocalStorage, getLocalStorage, removeLocalStorage};
// 全局取当前环境的cookie
export function getNowCookie() {
    let userInfo = null;
    let rejectMsg = null;
    switch (NODE_ENVS) {
        case 'production':
            userInfo = Cookies.get('USER_INFO');
            rejectMsg = Cookies.get('USER_INFO_REJECT');
            break;
        case 'qa':
            userInfo = Cookies.get('USER_INFO_QA');
            rejectMsg = Cookies.get('USER_INFO_QA_REJECT');
            break;
        default :
            userInfo = Cookies.get('USER_INFO_DEV');
            rejectMsg = Cookies.get('USER_INFO_DEV_REJECT');
    };
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
    }
    return {
        userInfo: userInfo,
        rejectMsg: rejectMsg
    };
}

// 全局退出登录 -- 删除cookie
export function quitLogin() {
    switch (NODE_ENVS) {
        case 'production':
            Cookies.remove('USER_INFO');
            break;
        case 'qa':
            Cookies.remove('USER_INFO_QA');
            break;
        default :
            Cookies.remove('USER_INFO_DEV');
    };
    removeLocalStorage('menuList');
    removeLocalStorage('venUserList');
};

// 全局更新 cookie userInfo
export function resetUserInfoCookie(result = {}) {
    let inTwoHours = new Date(new Date().getTime() + 120 * 60 * 1000);
    let nowCookie = getNowCookie().userInfo;
    let newCookies = toObject([nowCookie, result]);
    console.log('reset-newCookies --->');
    console.log(newCookies);
    console.log('reset-newCookies --->');
    switch (NODE_ENVS) {
        case 'production':
            Cookies.set('USER_INFO', newCookies, {expires: inTwoHours});
            break;
        case 'qa':
            Cookies.set('USER_INFO_QA', newCookies, {expires: inTwoHours});
            break;
        default :
            Cookies.set('USER_INFO_DEV', newCookies, {expires: inTwoHours});
    };
}
