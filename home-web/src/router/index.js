export default [
    {
        name: 'Index',
        path: '/',
        redirect: 'home'
    },
    {
        meta: {
            name: '首页',
            requestAuth: true
        },
        path: '/home',
        redirect: {name: 'toIndexContent'},
        component: resolve => require(['views/index'], resolve),
        children: [
            {
                meta: {
                    name: '系统-主页面',
                    id: '1-1',
                    requestAuth: true,
                    noRequestApprove: true
                },
                name: 'toIndexContent',
                path: 'toIndexContent',
                component: resolve => require(['views/indexcontent/indexContentPage'], resolve)
            },
            {
                name: 'userinitial',
                path: 'userinitial',
                meta: {
                    name: '认证初始页',
                    requestAuth: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/user-approve/userinitial'], resolve)
            },
            {
                name: 'perfectMessage',
                path: 'perfectMessage',
                meta: {
                    name: '完善个人信息',
                    requestAuth: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/user-approve/perfectMessage'], resolve)
            },
            {
                name: 'reject',
                path: 'reject',
                meta: {
                    name: '认证显示状态页面',
                    requestAuth: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/user-approve/reject'], resolve)
            },
            {
                name: 'userauthentication',
                path: 'userauthentication',
                meta: {
                    name: '认证审核页面',
                    requestAuth: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/user-approve/userauthentication'], resolve)
            },
            {
                name: 'userForgetpass',
                path: 'userForgetpass',
                meta: {
                    name: '修改密码',
                    requestAuth: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/useroperate/userForgetpass'], resolve)
            },
            {
                name: 'PersonInfor',
                path: 'PersonInfor',
                meta: {
                    name: '个人信息',
                    requestAuth: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/useroperate/PersonInfor'], resolve)
            }
        ]
    },
    {
        name: 'UserAuth',
        path: '/userauth',
        redirect: {
            name: 'Login'
        },
        component: resolve => require(['views/userAuth/index'], resolve),
        children: [
            {
                name: 'Login',
                path: 'login',
                meta: {
                    name: '供应链平台-登录',
                    hideMainheader: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/userAuth/login/Login'], resolve)
            },
            {
                name: 'register',
                path: 'register',
                meta: {
                    name: '注册',
                    hideMainheader: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/userAuth/register/Register'], resolve)
            },
            {
                name: 'forgetpass',
                path: 'forgetpass',
                meta: {
                    name: '忘记密码',
                    hideMainheader: true,
                    noRequestApprove: true
                },
                component: resolve => require(['views/userAuth/forgetpass/Forgetpass'], resolve)
            }
        ]
    },
    {
        path: '*',
        meta: {
            noRequestApprove: true
        },
        component: resolve => require(['views/error/404'], resolve)
    }
];
