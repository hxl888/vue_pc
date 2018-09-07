/**
 * Created by zhangwen on 2017/4/13.
 */
import {getNowCookie} from 'xcms-common-plugins/src/utils/';
export default {
    beforeRouteEnter (to, from, next) {
        let nowCookie = getNowCookie();
        switch (nowCookie.userInfo.userStatus) {
            case '100' :
            case '300' :
                // 未认证
                next();
                break;
            case '200' :
                // 认证中
                next({
                    path: '/home/userauthentication'
                });
                break;
            case '400' :
                // 已认证
                next({
                    path: '/'
                });
                break;
            default :
                next({
                    path: '/'
                });
        }
    }
};
