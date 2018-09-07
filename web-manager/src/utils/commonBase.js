/**
 * Created by zhangwen on 2017/7/8.
 */
import Cookies from 'js-cookie';
let NODE_ENVS = process.env.NODE_ENV;
// 全局取当前环境的cookie
export function getNowCookie() {
    let userInfo = null;
    switch (NODE_ENVS) {
        case 'production':
            userInfo = Cookies.get('USER_INFO_MAN');
            break;
        case 'qa':
            userInfo = Cookies.get('USER_INFO_QA_MAN');
            break;
        default :
            userInfo = Cookies.get('USER_INFO_DEV_MAN');
    };
    if (userInfo) {
        userInfo = JSON.parse(userInfo);
    }
    return {
        userInfo: userInfo
    };
}

// 全局退出登录 -- 删除cookie
export function quitLogin() {
    switch (NODE_ENVS) {
        case 'production':
            Cookies.remove('USER_INFO_MAN');
            break;
        case 'qa':
            Cookies.remove('USER_INFO_QA_MAN');
            break;
        default :
            Cookies.remove('USER_INFO_DEV_MAN');
    };
    window.localStorage.removeItem('menuList_man');
};
