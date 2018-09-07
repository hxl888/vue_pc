
export default [
    {
        name: 'Index',
        path: '/',
        redirect: {name: 'CustomerListPage'}
    },
    {
        meta: {
            name: '用户中心',
            auth: true
        },
        name: 'CustomerListPage',
        path: '/uam',
        redirect: {name: 'toMaintainUamRoleListPage'},
        component: resolve => require(['views/uam/index'], resolve),
        children: [
            {
                meta: {
                    name: '用户中心-角色管理',
                    auth: true
                },
                name: 'toMaintainUamRoleListPage',
                path: 'role/toMaintainUamRoleListPage',
                component: resolve => require(['views/uam/toMaintainUamRoleListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-新增角色',
                    auth: true,
                    level: 3
                },
                name: 'toAddRolePage',
                path: 'role/toMaintainUamRoleListPage/toAddRolePage',
                component: resolve => require(['views/uam/toMaintainUamRoleListPage/addRolePage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-查看角色',
                    auth: true,
                    level: 3
                },
                name: 'toViewRolePage',
                path: 'role/toMaintainUamRoleListPage/toViewRolePage',
                component: resolve => require(['views/uam/toMaintainUamRoleListPage/viewRolePage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-绑定用户',
                    auth: true,
                    level: 3
                },
                name: 'toBindRolePage',
                path: 'role/toMaintainUamRoleListPage/toBindRolePage',
                component: resolve => require(['views/uam/toMaintainUamRoleListPage/bindRolePage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-分配权限',
                    auth: true,
                    level: 3
                },
                name: 'toManagerRolePage',
                path: 'role/toMaintainUamRoleListPage/toManagerRolePage',
                component: resolve => require(['views/uam/toMaintainUamRoleListPage/managerRolePage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-修改角色',
                    auth: true,
                    level: 3
                },
                name: 'toEditRolePage',
                path: 'role/toMaintainUamRoleListPage/toEditRolePage',
                component: resolve => require(['views/uam/toMaintainUamRoleListPage/editRolePage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-用户管理',
                    auth: true
                },
                name: 'toMaintainUamUserListPage',
                path: 'user/toMaintainUamUserListPage',
                component: resolve => require(['views/uam/toMaintainUamUserListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-用户管理-编辑用户',
                    auth: true,
                    level: 3
                },
                name: 'toEditUser',
                path: 'user/toMaintainUamUserListPage/toEditUser',
                component: resolve => require(['views/uam/toMaintainUamUserListPage/editUser'], resolve)
            },
            {
                meta: {
                    name: '用户中心-用户管理-添加用户',
                    auth: true,
                    level: 3
                },
                name: 'toAddUser',
                path: 'user/toMaintainUamUserListPage/toAddUser',
                component: resolve => require(['views/uam/toMaintainUamUserListPage/addUser'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-用户详情',
                    auth: true,
                    level: 3
                },
                name: 'toDetailsUser',
                path: 'user/toMaintainUamUserListPage/toDetailsUser',
                component: resolve => require(['views/uam/toMaintainUamUserListPage/detailsUser'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-修改密码',
                    auth: true,
                    level: 3
                },
                name: 'toModifyPassword',
                path: 'user/toMaintainUamUserListPage/toModifyPassword',
                component: resolve => require(['views/uam/toMaintainUamUserListPage/modifyPassword'], resolve)
            },
            {
                meta: {
                    name: '用户中心-角色管理-绑定角色',
                    auth: true,
                    level: 3
                },
                name: 'toBindRole',
                path: 'user/toMaintainUamUserListPage/toBindRole',
                component: resolve => require(['views/uam/toMaintainUamUserListPage/bindRole'], resolve)
            },
            {
                meta: {
                    name: '用户中心-菜单管理',
                    auth: true
                },
                name: 'toMaintainUamMenuListPage',
                path: 'menu/toMaintainUamMenuListPage',
                component: resolve => require(['views/uam/toMaintainUamMenuListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-菜单管理-新增菜单',
                    auth: true,
                    level: 3
                },
                name: 'toAddUamMenuListPage',
                path: 'menu/toMaintainUamMenuListPage/toAddUamMenuListPage',
                component: resolve => require(['views/uam/toMaintainUamMenuListPage/addUamMenuPage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-菜单管理-修改菜单',
                    auth: true,
                    level: 3
                },
                name: 'toEditUamMenuListPage',
                path: 'menu/toMaintainUamMenuListPage/toAddUamMenuListPage',
                component: resolve => require(['views/uam/toMaintainUamMenuListPage/editUamMenuPage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-日志中心',
                    auth: true
                },
                name: 'queryLogListWithPage',
                path: 'log/queryLogListWithPage',
                component: resolve => require(['views/uam/queryLogListWithPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-组织管理',
                    auth: true
                },
                name: 'toMaintainUamGroupListPage',
                path: 'group/toMaintainUamGroupListPage',
                component: resolve => require(['views/uam/toMaintainUamGroupListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-组织管理-新增组织',
                    auth: true,
                    level: 3
                },
                name: 'toAddUamGroupListPage',
                path: 'group/toMaintainUamGroupListPage/toAddUamGroupListPage',
                component: resolve => require(['views/uam/toMaintainUamGroupListPage/addUamGroupListPage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-组织管理-修改组织',
                    auth: true,
                    level: 3
                },
                name: 'toEditUamGroupListPage',
                path: 'group/toMaintainUamGroupListPage/toEditUamGroupListPage',
                component: resolve => require(['views/uam/toMaintainUamGroupListPage/editUamGroupListPage'], resolve)
            },
            {
                meta: {
                    name: '用户中心-日志管理',
                    auth: true
                },
                name: 'toMaintainUamLogListPage',
                path: 'log/toMaintainUamLogListPage',
                component: resolve => require(['views/uam/toMaintainUamLogListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-运营认证',
                    auth: true
                },
                name: 'toMaintainOperateUserAuthListPage',
                path: 'operate/toMaintainOperateUserAuthListPage',
                component: resolve => require(['views/uam/toMaintainOperateUserAuthListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-运营认证-审核',
                    auth: true,
                    level: 3
                },
                name: 'toAuthenticate',
                path: 'operate/toMaintainOperateUserAuthListPage/authenticate',
                component: resolve => require(['views/uam/toMaintainOperateUserAuthListPage/authenticate'], resolve)
            },
            {
                meta: {
                    name: '用户中心-更新记录',
                    auth: true
                },
                name: 'toUpateRecordListPage',
                path: 'record/toUpateRecordListPage',
                component: resolve => require(['views/uam/toUpateRecordListPage/'], resolve)
            },
            {
                meta: {
                    name: '用户中心-更新记录-添加',
                    auth: true,
                    level: 3
                },
                name: 'toAddPageList',
                path: 'record/toUpateRecordListPage/addPageList',
                component: resolve => require(['views/uam/toUpateRecordListPage/addPageList'], resolve)
            },
            {
                meta: {
                    name: '用户中心-更新记录-编辑',
                    auth: true,
                    level: 3
                },
                name: 'toEdit',
                path: 'record/toUpateRecordListPage/edit',
                component: resolve => require(['views/uam/toUpateRecordListPage/edit'], resolve)
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
