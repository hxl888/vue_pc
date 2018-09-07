import Vue from 'vue';
import Router from 'vue-router';

import {getNowCookie} from 'utils/commonBase';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式

Vue.use(Router);
const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: {
                name: 'index'
            }
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                name: '登录'
            },
            component: resolve => require(['views/login/login'], resolve)
        },
        {
            path: '/pages',
            name: 'index',
            meta: {
                name: '首页',
                requestAuth: true
            },
            component: resolve => require(['views/pages/pages'], resolve),
            redirect: {
                name: 'homepage'
            },
            children: [
                {
                    path: 'homepage',
                    name: 'homepage',
                    meta: {
                        name: '主页',
                        requestAuth: true
                    },
                    component: resolve => require(['views/pages/homepage/homepage'], resolve)
                },
                {
                    path: 'proCenter',
                    name: 'proCenter',
                    meta: {
                        name: '商品中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'proCenterIndex'
                    },
                    component: resolve => require(['views/pages/proCenter/index'], resolve),
                    children: [
                        {
                            path: 'proCenterIndex',
                            name: 'proCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'proCenter',
                                pageFlag: 1 // 判断是不是对应中心的首页
                            },
                            // component: resolve => require(['views/pages/proCenter/proCenterIndex/proCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'base',
                            name: 'base',
                            meta: {
                                name: '基础设置',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'proCenterIndex'
                            },
                            component: resolve => require(['views/pages/proCenter/base/index'], resolve),
                            children: [
                                {
                                    path: 'categoryList',
                                    name: 'categoryList',
                                    meta: {
                                        name: '商品分类',
                                        requestAuth: true,
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/base/categoryList/categoryList'], resolve)
                                },
                                {
                                    path: 'brandList',
                                    name: 'brandList',
                                    meta: {
                                        requestAuth: true,
                                        name: '商品品牌'
                                    },
                                    redirect: {
                                        name: 'brandLists'
                                    },
                                    component: resolve => require(['views/pages/proCenter/base/brandList/index'], resolve),
                                    children: [
                                        {
                                            path: 'brandLists',
                                            name: 'brandLists',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/base/brandList/brandList'], resolve)
                                        },
                                        {
                                            path: 'addNewbrand',
                                            name: 'addNewbrand',
                                            meta: {
                                                name: '新增品牌',
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/base/brandList/addNewbrand'], resolve)
                                        },
                                        {
                                            path: 'modifybrand',
                                            name: 'modifybrand',
                                            meta: {
                                                name: '修改品牌',
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/base/brandList/modifybrand'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'proPropertyList',
                                    name: 'proPropertyList',
                                    meta: {
                                        requestAuth: true,
                                        name: '商品属性'
                                    },
                                    redirect: {
                                        name: 'basisExtends'
                                    },
                                    component: resolve => require(['views/pages/proCenter/base/proPropertyList/index'], resolve),
                                    children: [
                                        {
                                            path: 'basisExtend',
                                            name: 'basisExtend',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            redirect: {
                                                name: 'basisExtends'
                                            },
                                            component: resolve => require(['views/pages/proCenter/base/proPropertyList/basisExtend/index'], resolve),
                                            children: [
                                                {
                                                    path: 'basisExtends',
                                                    name: 'basisExtends',
                                                    meta: {
                                                        requestAuth: true,
                                                        acKey: 'proCenter',
                                                        level: 3
                                                    },
                                                    component: resolve => require(['views/pages/proCenter/base/proPropertyList/basisExtend/basisExtends'], resolve)
                                                },
                                                {
                                                    path: 'addnewAttribute',
                                                    name: 'addnewAttribute',
                                                    meta: {
                                                        name: '新增属性',
                                                        requestAuth: true,
                                                        acKey: 'proCenter',
                                                        level: 3
                                                    },
                                                    component: resolve => require(['views/pages/proCenter/base/proPropertyList/basisExtend/addnewAttribute'], resolve)
                                                },
                                                {
                                                    path: 'modifyAttribute',
                                                    name: 'modifyAttribute',
                                                    meta: {
                                                        name: '修改属性',
                                                        requestAuth: true,
                                                        acKey: 'proCenter',
                                                        level: 3
                                                    },
                                                    component: resolve => require(['views/pages/proCenter/base/proPropertyList/basisExtend/modifyAttribute'], resolve)
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'proManager',
                            name: 'proManager',
                            meta: {
                                name: '商品管理',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'proCenterIndex'
                            },
                            component: resolve => require(['views/pages/proCenter/proManager/index'], resolve),
                            children: [
                                {
                                    path: 'table-look-up',
                                    name: 'table-look-up',
                                    meta: {
                                        name: '商品一览表',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'table-look-ups'
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/table-look-up/index'], resolve),
                                    children: [
                                        {
                                            path: 'table-look-ups',
                                            name: 'table-look-ups',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/table-look-up/table-look-up'], resolve)
                                        },
                                        {
                                            path: 'tableupsauditeddetai',
                                            name: 'tableupsauditeddetai',
                                            meta: {
                                                name: '审核详情',
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/table-look-up/auditdetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'sysProList',
                                    name: 'sysProList',
                                    meta: {
                                        name: '系统商品',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'sysProLists'
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/sysProList/index'], resolve),
                                    children: [
                                        {
                                            path: 'sysProLists',
                                            name: 'sysProLists',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/sysProList/sysProList'], resolve)
                                        },
                                        {
                                            path: 'editorsys/:type/:proSpu',
                                            name: 'editorsys',
                                            meta: {
                                                name: '系统商品编辑',
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/sysProList/editorsys'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'checkPendingList',
                                    name: 'checkPendingList',
                                    meta: {
                                        requestAuth: true,
                                        name: '待审核商品'
                                    },
                                    redirect: {
                                        name: 'checkPendingLists'
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/checkPendingList/index'], resolve),
                                    children: [
                                        {
                                            path: 'checkPendingLists',
                                            name: 'checkPendingLists',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/checkPendingList/checkPendingList'], resolve)
                                        },
                                        {
                                            path: 'checkpenddetail',
                                            name: 'checkpenddetail',
                                            meta: {
                                                name: '审核详情',
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/checkPendingList/auditdetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'auditedList',
                                    name: 'auditedList',
                                    meta: {
                                        name: '已审核商品',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'auditedLists'
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/auditedList/index'], resolve),
                                    children: [
                                        {
                                            path: 'auditedLists',
                                            name: 'auditedLists',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/auditedList/auditedList'], resolve)
                                        },
                                        {
                                            path: 'auditeddetai',
                                            name: 'auditeddetai',
                                            meta: {
                                                name: '审核详情',
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/auditedList/auditdetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'rejectedList',
                                    name: 'rejectedList',
                                    meta: {
                                        name: '已驳回商品',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'rejectedLists'
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/rejectedList/index'], resolve),
                                    children: [
                                        {
                                            path: 'rejectedLists',
                                            name: 'rejectedLists',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/rejectedList/rejectedList'], resolve)
                                        },
                                        {
                                            path: 'rejectuditdetails',
                                            name: 'rejectuditdetails',
                                            meta: {
                                                name: '审核详情',
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/rejectedList/auditdetails'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'proLog',
                            name: 'proLog',
                            meta: {
                                name: '商品日志',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'proCenterIndex'
                            },
                            component: resolve => require(['views/pages/proCenter/proLog/index'], resolve),
                            children: [
                                {
                                    path: 'proLogList',
                                    name: 'proLogList',
                                    meta: {
                                        name: '商品日志列表',
                                        requestAuth: true,
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proLog/proLogList/proLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'vendorCenter',
                    name: 'vendorCenter',
                    meta: {
                        name: '商户中心',
                        requestAuth: true,
                        acKey: 'vendorCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'vendorCenterIndex'
                    },
                    component: resolve => require(['views/pages/vendorCenter/index'], resolve),
                    children: [
                        {
                            path: 'vendorCenterIndex',
                            name: 'vendorCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'vendorCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/vendorCenter/vendorCenterIndex/vendorCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'venManger',
                            name: 'venManger',
                            meta: {
                                requestAuth: true,
                                name: '商户管理'
                            },
                            redirect: {
                                name: 'vendorCenterIndex'
                            },
                            component: resolve => require(['views/pages/vendorCenter/venManger/index'], resolve),
                            children: [
                                {
                                    path: 'venList', // 商户列表
                                    name: 'venList',
                                    meta: {
                                        requestAuth: true,
                                        name: '商户列表'
                                    },
                                    redirect: {
                                        name: 'merchantlist'
                                    },
                                    component: resolve => require(['views/pages/vendorCenter/venManger/venList/index'], resolve),
                                    children: [
                                        {
                                            path: 'merchantlist',
                                            name: 'merchantlist',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venList/merchantlist'], resolve)
                                        },
                                        {
                                            path: 'merchantparticulars',
                                            name: 'merchantparticulars',
                                            meta: {
                                                name: '商户详情',
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venList/merchantparticulars'], resolve)
                                        },
                                        {
                                            path: 'commlistCommod',
                                            name: 'commlistCommod',
                                            meta: {
                                                name: '查看商户商品',
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venList/commlistCommod'], resolve)
                                        },
                                        {
                                            path: 'commOrder',
                                            name: 'commOrder',
                                            meta: {
                                                name: '查看商户订单',
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venList/commOrder'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'venAuditList', // 商户审核
                                    name: 'venAuditList',
                                    meta: {
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'merchantaudit'
                                    },
                                    component: resolve => require(['views/pages/vendorCenter/venManger/venAuditList/index'], resolve),
                                    children: [
                                        {
                                            path: 'merchantaudit',
                                            name: 'merchantaudit',
                                            meta: {
                                                name: '商户审核', // 9商户审核
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venAuditList/merchantaudit'], resolve)
                                        },
                                        {
                                            path: 'merchantauditdetails',
                                            name: 'merchantauditdetails',
                                            meta: {
                                                name: '商户审核详情', // 10商户审核详情
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venAuditList/merchantauditdetails'], resolve)
                                        },
                                        {
                                            path: 'viewmerchantauditdetails',
                                            name: 'viewmerchantauditdetails',
                                            meta: {
                                                name: '商户审核详情', // 11查看商户审核详情
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venAuditList/viewmerchantauditdetails'], resolve)
                                        },
                                        {
                                            path: 'merchantsigning',
                                            name: 'merchantsigning',
                                            meta: {
                                                name: '商户签订', // 12商户签订
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venAuditList/merchantsigning/merchantsigning'], resolve)
                                        },
                                        {
                                            path: 'viewmerchantdetails',
                                            name: 'viewmerchantdetails',
                                            meta: {
                                                name: '查看已签订商户详情', // 13查看已签订商户详情
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/venManger/venAuditList/viewmerchantdetails'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'qualificationManager',
                            name: 'qualificationManager',
                            meta: {
                                requestAuth: true,
                                name: '资质管理'
                            },
                            redirect: {
                                name: 'vendorCenterIndex'
                            },
                            component: resolve => require(['views/pages/vendorCenter/qualificationManager/index'], resolve),
                            children: [
                                {
                                    path: 'qualificationList',
                                    name: 'qualificationList',
                                    meta: {
                                        requestAuth: true,
                                        name: '资质列表'
                                    },
                                    redirect: {
                                        name: 'qualificationmanagements'
                                    },
                                    component: resolve => require(['views/pages/vendorCenter/qualificationManager/qualificationList/index'], resolve),
                                    children: [
                                        {
                                            path: 'qualificationmanagements',
                                            name: 'qualificationmanagements',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/qualificationManager/qualificationList/qualificationmanagements'], resolve)
                                        },
                                        {
                                            path: 'detailsofqualification',
                                            name: 'detailsofqualification',
                                            meta: {
                                                name: '资质管理详情',
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/qualificationManager/qualificationList/detailsofqualification'], resolve)
                                        }, {
                                            path: 'editofqualification',
                                            name: 'editofqualification',
                                            meta: {
                                                name: '资质修改',
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/qualificationManager/qualificationList/editofqualification'], resolve)
                                        }, {
                                            path: 'fullofqualification',
                                            name: 'fullofqualification',
                                            meta: {
                                                name: '资质完善',
                                                requestAuth: true,
                                                acKey: 'vendorCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/vendorCenter/qualificationManager/qualificationList/fullofqualification'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'storeManager',
                            name: 'storeManager',
                            meta: {
                                requestAuth: true,
                                name: '店铺管理'
                            },
                            redirect: {
                                name: 'vendorCenterIndex'
                            },
                            component: resolve => require(['views/pages/vendorCenter/storeManager/index'], resolve),
                            children: [
                                {
                                    path: 'storeList',
                                    name: 'storeList',
                                    meta: {
                                        requestAuth: true,
                                        name: '店铺列表',
                                        acKey: 'vendorCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/vendorCenter/storeManager/storeList/storeList'], resolve)
                                },
                                {
                                    path: 'storeList_details',
                                    name: 'storeList_details',
                                    meta: {
                                        requestAuth: true,
                                        name: '店铺详情',
                                        acKey: 'vendorCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/vendorCenter/storeManager/storeList/storeList_details'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'venLogManager',
                            name: 'venLogManager',
                            meta: {
                                requestAuth: true,
                                name: '商户日志'
                            },
                            redirect: {
                                name: 'vendorCenterIndex'
                            },
                            component: resolve => require(['views/pages/vendorCenter/venLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'venLogList',
                                    name: 'venLogList',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'vendorCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/vendorCenter/venLogManager/venLogList/venLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'promotionCenter',
                    name: 'promotionCenter',
                    meta: {
                        name: '促销中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'promotionCenterIndex'
                    },
                    component: resolve => require(['views/pages/promotionCenter/index'], resolve),
                    children: [
                        {
                            path: 'promotionCenterIndex',
                            name: 'promotionCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'promotionCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/promotionCenter/promotionCenterIndex/promotionCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'promotionManager',
                            name: 'promotionManager',
                            meta: {
                                name: '商户促销管理',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'promotionCenterIndex'
                            },
                            component: resolve => require(['views/pages/promotionCenter/promotionManager/index'], resolve),
                            children: [
                                {
                                    path: 'promotionAuditList',
                                    name: 'promotionAuditList',
                                    meta: {
                                        name: '促销审核列表',
                                        requestAuth: true,
                                        acKey: 'promotionCenter',
                                        pageFlag: 3
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/promotionManager/promotionAuditList/promotionAuditList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'couponManager',
                            name: 'couponManager',
                            meta: {
                                name: '优惠券管理',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'promotionCenterIndex'
                            },
                            component: resolve => require(['views/pages/promotionCenter/couponManager/index'], resolve),
                            children: [
                                {
                                    path: 'couponList',
                                    name: 'couponList',
                                    meta: {
                                        name: '优惠券列表',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'couponList_s'
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/couponManager/couponList/index'], resolve),
                                    children: [
                                        {
                                            path: 'couponList_s',
                                            name: 'couponList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'promotionCenter',
                                                pageFlag: 3
                                            },
                                            component: resolve => require(['views/pages/promotionCenter/couponManager/couponList/couponList_s'], resolve)
                                        },
                                        {
                                            path: 'couponList_details',
                                            name: 'couponList_details',
                                            meta: {
                                                name: '优惠券详情',
                                                requestAuth: true,
                                                acKey: 'promotionCenter'
                                            },
                                            component: resolve => require(['views/pages/promotionCenter/couponManager/couponList/couponList_details'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'couponSendList',
                                    name: 'couponSendList',
                                    meta: {
                                        name: '优惠券记录',
                                        requestAuth: true,
                                        acKey: 'promotionCenter',
                                        pageFlag: 3
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/couponManager/couponSendList/couponSendList'], resolve)
                                },
                                {
                                    path: 'couponUserList',
                                    name: 'couponUserList',
                                    meta: {
                                        requestAuth: true,
                                        name: '用户持有优惠券'
                                    },
                                    redirect: {
                                        name: 'couponUserList_s'
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/couponManager/couponUserList/index'], resolve),
                                    children: [
                                        {
                                            path: 'couponUserList_s',
                                            name: 'couponUserList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'promotionCenter',
                                                pageFlag: 3
                                            },
                                            component: resolve => require(['views/pages/promotionCenter/couponManager/couponUserList/couponUserList_s'], resolve)
                                        },
                                        {
                                            path: 'couponUserList_details',
                                            name: 'couponUserList_details',
                                            meta: {
                                                name: '详情',
                                                requestAuth: true,
                                                acKey: 'promotionCenter'
                                            },
                                            component: resolve => require(['views/pages/promotionCenter/couponManager/couponUserList/couponUserList_details/couponUserList_details'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'activityManager',
                            name: 'activityManager',
                            meta: {
                                name: '专题活动管理',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'promotionCenterIndex'
                            },
                            component: resolve => require(['views/pages/promotionCenter/activityManager/index'], resolve),
                            children: [
                                {
                                    path: 'activityList',
                                    name: 'activityList',
                                    meta: {
                                        name: '页面列表',
                                        requestAuth: true,
                                        acKey: 'promotionCenter',
                                        pageFlag: 3
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/activityManager/activityList/activityList'], resolve)
                                },
                                {
                                    path: 'activityList_editor',
                                    name: 'activityList_editor',
                                    meta: {
                                        name: '页面编辑',
                                        requestAuth: true,
                                        acKey: 'promotionCenter',
                                        pageFlag: 3
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/activityManager/activityList/activityList_editor'], resolve)
                                },
                                {
                                    path: 'activityList_addnew',
                                    name: 'activityList_addnew',
                                    meta: {
                                        name: '新增页面',
                                        requestAuth: true,
                                        acKey: 'promotionCenter',
                                        pageFlag: 3
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/activityManager/activityList/activityList_addnew'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'promotionLogManager',
                            name: 'promotionLogManager',
                            meta: {
                                name: '日志管理',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'promotionCenterIndex'
                            },
                            component: resolve => require(['views/pages/promotionCenter/promotionLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'promotionLogList',
                                    name: 'promotionLogList',
                                    meta: {
                                        name: '促销日志',
                                        requestAuth: true,
                                        acKey: 'promotionCenter',
                                        pageFlag: 3
                                    },
                                    component: resolve => require(['views/pages/promotionCenter/promotionLogManager/promotionLogList/promotionLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'cmsCenter',
                    name: 'cmsCenter',
                    meta: {
                        name: 'CMS中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'cmsCenterIndex'
                    },
                    component: resolve => require(['views/pages/cmsCenter/index'], resolve),
                    children: [
                        {
                            path: 'cmsCenterIndex',
                            name: 'cmsCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'cmsCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/cmsCenter/cmsCenterIndex/cmsCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'cmsManager',
                            name: 'cmsManager',
                            meta: {
                                name: '官网页面管理',
                                requestAuth: true,
                                acKey: 'cmsCenter'
                            },
                            redirect: {
                                name: 'cmsCenterIndex'
                            },
                            component: resolve => require(['views/pages/cmsCenter/cmsManager/index'], resolve),
                            children: [
                                {
                                    path: 'cmsIndexManage',
                                    name: 'cmsIndexManage',
                                    meta: {
                                        name: '首页管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'cmsIndex'
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsManager/cmsIndexManage/index'], resolve),
                                    children: [
                                        {
                                            path: 'cmsIndex',
                                            name: 'cmsIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/cmsIndexManage/cmsIndex/cmsIndex'], resolve)
                                        },
                                        {
                                            path: 'cmsIndexFocusMapEditor',
                                            name: 'cmsIndexFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/cmsIndexManage/cmsIndexFocusMap/cmsIndexFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'cmsIndexFocusMapDetails',
                                            name: 'cmsIndexFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/cmsIndexManage/cmsIndexFocusMap/cmsIndexFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'cmsIndexXyInformationEditor',
                                            name: 'cmsIndexXyInformationEditor',
                                            meta: {
                                                name: '鲜易新闻资讯编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/cmsIndexManage/cmsIndexXyInformation/cmsIndexXyInformationEditor'], resolve)
                                        },
                                        {
                                            path: 'cmsIndexXyInformationDetails',
                                            name: 'cmsIndexXyInformationDetails',
                                            meta: {
                                                name: '鲜易新闻资讯详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/cmsIndexManage/cmsIndexXyInformation/cmsIndexXyInformationDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'xyMallManage',
                                    name: 'xyMallManage',
                                    meta: {
                                        name: '鲜易商城管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'xyMallIndex'
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsManager/xyMallManage/index'], resolve),
                                    children: [
                                        {
                                            path: 'xyMallIndex',
                                            name: 'xyMallIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/xyMallManage/xyMallIndex/xyMallIndex'], resolve)
                                        },
                                        {
                                            path: 'xyMallFocusMapEditor',
                                            name: 'xyMallFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/xyMallManage/xyMallFocusMap/xyMallFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'xyMallFocusMapDetails',
                                            name: 'xyMallFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/xyMallManage/xyMallFocusMap/xyMallFocusMapDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'platCooperManage',
                                    name: 'platCooperManage',
                                    meta: {
                                        name: '平台合作管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'platCoopIndex'
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsManager/platCooperManage/index'], resolve),
                                    children: [
                                        {
                                            path: 'platCoopIndex',
                                            name: 'platCoopIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/platCooperManage/platCoopIndex/platCoopIndex'], resolve)
                                        },
                                        {
                                            path: 'platCoopFocusMapEditor',
                                            name: 'platCoopFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/platCooperManage/platCoopFocusMap/platCoopFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'platCoopFocusMapDetails',
                                            name: 'platCoopFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/platCooperManage/platCoopFocusMap/platCoopFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'platCoopMerchantCaseEditor',
                                            name: 'platCoopMerchantCaseEditor',
                                            meta: {
                                                name: '商家案例编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/platCooperManage/platCoopMerchantCase/platCoopMerchantCaseEditor'], resolve)
                                        },
                                        {
                                            path: 'platCoopMerchantCaseDetails',
                                            name: 'platCoopMerchantCaseDetails',
                                            meta: {
                                                name: '商家案例详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/platCooperManage/platCoopMerchantCase/platCoopMerchantCaseDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'inteSoluManage',
                                    name: 'inteSoluManage',
                                    meta: {
                                        name: '一体化解决方案管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'inteSoluIndex'
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsManager/inteSoluManage/index'], resolve),
                                    children: [
                                        {
                                            path: 'inteSoluIndex',
                                            name: 'inteSoluIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/inteSoluManage/inteSoluIndex/inteSoluIndex'], resolve)
                                        },
                                        {
                                            path: 'inteSoluFocusMapEditor',
                                            name: 'inteSoluFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/inteSoluManage/inteSoluFocusMap/inteSoluFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'inteSoluFocusMapDetails',
                                            name: 'inteSoluFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/inteSoluManage/inteSoluFocusMap/inteSoluFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'inteSoluPlatMerchantEditor',
                                            name: 'inteSoluPlatMerchantEditor',
                                            meta: {
                                                name: '平台商户编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/inteSoluManage/inteSoluPlatMerchant/inteSoluPlatMerchantEditor'], resolve)
                                        },
                                        {
                                            path: 'inteSoluPlatMerchantDetails',
                                            name: 'inteSoluPlatMerchantDetails',
                                            meta: {
                                                name: '平台商户详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/inteSoluManage/inteSoluPlatMerchant/inteSoluPlatMerchantDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'xyInfoManage',
                                    name: 'xyInfoManage',
                                    meta: {
                                        name: '鲜易资讯管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'xyInfoIndex'
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsManager/xyInfoManage/index'], resolve),
                                    children: [
                                        {
                                            path: 'xyInfoIndex',
                                            name: 'xyInfoIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/xyInfoManage/xyInfoIndex/xyInfoIndex'], resolve)
                                        },
                                        {
                                            path: 'xyInfoManEditor',
                                            name: 'xyInfoManEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/xyInfoManage/xyInfoManFocusMap/xyInfoManEditor'], resolve)
                                        },
                                        {
                                            path: 'xyInfoManDetails',
                                            name: 'xyInfoManDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsManager/xyInfoManage/xyInfoManFocusMap/xyInfoManDetails'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'cmsContentManager',
                            name: 'cmsContentManager',
                            meta: {
                                name: '内容管理',
                                requestAuth: true,
                                acKey: 'cmsCenter'
                            },
                            redirect: {
                                name: 'cmsCenterIndex'
                            },
                            component: resolve => require(['views/pages/cmsCenter/cmsContentManager/index'], resolve),
                            children: [
                                {
                                    path: 'columnList',
                                    name: 'columnList',
                                    meta: {
                                        name: '栏目列表',
                                        requestAuth: true,
                                        acKey: 'cmsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsContentManager/columnList/columnList'], resolve)
                                },
                                {
                                    path: 'contentList',
                                    name: 'contentList',
                                    meta: {
                                        name: '内容列表',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'contentList_s'
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsContentManager/contentList/index'], resolve),
                                    children: [
                                        {
                                            path: 'contentList_s',
                                            name: 'contentList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsContentManager/contentList/contentList_s'], resolve)
                                        },
                                        {
                                            path: 'contentListAddnew',
                                            name: 'contentListAddnew',
                                            meta: {
                                                name: '添加',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsContentManager/contentList/contentListAddnew'], resolve)
                                        },
                                        {
                                            path: 'contentListEditor',
                                            name: 'contentListEditor',
                                            meta: {
                                                name: '编辑',
                                                requestAuth: true,
                                                acKey: 'cmsCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/cmsCenter/cmsContentManager/contentList/contentListEditor'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'cmsLogManager',
                            name: 'cmsLogManager',
                            meta: {
                                name: 'CMS日志',
                                requestAuth: true,
                                acKey: 'cmsCenter'
                            },
                            redirect: {
                                name: 'cmsCenterIndex'
                            },
                            component: resolve => require(['views/pages/cmsCenter/cmsLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'cmsLogList',
                                    name: 'cmsLogList',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'cmsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/cmsCenter/cmsLogManager/cmsLogList/cmsLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'memberCenter',
                    name: 'memberCenter',
                    meta: {
                        name: '会员中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'memberCenterIndex'
                    },
                    component: resolve => require(['views/pages/memberCenter/index'], resolve),
                    children: [
                        {
                            path: 'memberCenterIndex',
                            name: 'memberCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'memberCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/memberCenter/memberCenterIndex/memberCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'memberManager',
                            name: 'memberManager',
                            meta: {
                                name: '会员管理',
                                requestAuth: true,
                                acKey: 'memberCenter'
                            },
                            redirect: {
                                name: 'memberCenterIndex'
                            },
                            component: resolve => require(['views/pages/memberCenter/memberManager/index'], resolve),
                            children: [
                                {
                                    path: 'memberList',
                                    name: 'memberList',
                                    meta: {
                                        name: '会员列表',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'memberList_s'
                                    },
                                    component: resolve => require(['views/pages/memberCenter/memberManager/memberList/index'], resolve),
                                    children: [
                                        {
                                            path: 'memberList_s',
                                            name: 'memberList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'memberCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/memberCenter/memberManager/memberList/memberList_s'], resolve)
                                        },
                                        {
                                            path: 'memberListDetails',
                                            name: 'memberListDetails',
                                            meta: {
                                                name: '查看详情',
                                                requestAuth: true,
                                                acKey: 'memberCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/memberCenter/memberManager/memberList/memberListDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'memberTypeList',
                                    name: 'memberTypeList',
                                    meta: {
                                        name: '用户类型',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'memberTypeList_s'
                                    },
                                    component: resolve => require(['views/pages/memberCenter/memberManager/memberTypeList/index'], resolve),
                                    children: [
                                        {
                                            path: 'memberTypeList_s',
                                            name: 'memberTypeList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'memberCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/memberCenter/memberManager/memberTypeList/memberTypeList_s'], resolve)
                                        },
                                        {
                                            path: 'memberTypeListDetails',
                                            name: 'memberTypeListDetails',
                                            meta: {
                                                name: '类型详情',
                                                requestAuth: true,
                                                acKey: 'memberCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/memberCenter/memberManager/memberTypeList/memberTypeListDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'feedbackList',
                                    name: 'feedbackList',
                                    meta: {
                                        name: '意见反馈',
                                        requestAuth: true,
                                        acKey: 'memberCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/memberCenter/memberManager/feedbackList/feedbackList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'memberLogManager',
                            name: 'memberLogManager',
                            meta: {
                                name: '日志管理',
                                requestAuth: true,
                                acKey: 'memberCenter'
                            },
                            redirect: {
                                name: 'memberCenterIndex'
                            },
                            component: resolve => require(['views/pages/memberCenter/memberLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'memberLogList',
                                    name: 'memberLogList',
                                    meta: {
                                        name: '会员日志',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'memberLogList_s'
                                    },
                                    component: resolve => require(['views/pages/memberCenter/memberLogManager/memberLogList/index'], resolve),
                                    children: [
                                        {
                                            path: 'memberLogList_s',
                                            name: 'memberLogList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'memberCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/memberCenter/memberLogManager/memberLogList/memberLogList_s'], resolve)
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'infoCenter',
                    name: 'infoCenter',
                    meta: {
                        name: '信息中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'infoCenterIndex'
                    },
                    component: resolve => require(['views/pages/infoCenter/index'], resolve),
                    children: [
                        {
                            path: 'infoCenterIndex',
                            name: 'infoCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'infoCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/infoCenter/infoCenterIndex/infoCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'smsManager',
                            name: 'smsManager',
                            meta: {
                                name: '短信管理',
                                requestAuth: true,
                                acKey: 'infoCenter'
                            },
                            redirect: {
                                name: 'infoCenterIndex'
                            },
                            component: resolve => require(['views/pages/infoCenter/smsManager/index'], resolve),
                            children: [
                                {
                                    path: 'smsTemplateList',
                                    name: 'smsTemplateList',
                                    meta: {
                                        name: '短信模板',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'smsTemplateList_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/smsManager/smsTemplateList/index'], resolve),
                                    children: [
                                        {
                                            path: 'smsTemplateList_s',
                                            name: 'smsTemplateList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/smsTemplateList/smsTemplateList_s'], resolve)
                                        },
                                        {
                                            path: 'addnewsmsTemplateList',
                                            name: 'addnewsmsTemplateList',
                                            meta: {
                                                name: '新增短信模板',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/smsTemplateList/addnewsmsTemplateList'], resolve)
                                        },
                                        {
                                            path: 'editormTemplateList',
                                            name: 'editormTemplateList',
                                            meta: {
                                                name: '编辑短信模板',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/smsTemplateList/editormTemplateList'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'smsSendList',
                                    name: 'smsSendList',
                                    meta: {
                                        name: '短信记录',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'smsSendList_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/smsManager/smsSendList/index'], resolve),
                                    children: [
                                        {
                                            path: 'smsSendList_s',
                                            name: 'smsSendList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/smsSendList/smsSendList_s'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'temporarySms',
                                    name: 'temporarySms',
                                    meta: {
                                        name: '临时短信',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'temporarySms_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/smsManager/temporarySms/index'], resolve),
                                    children: [
                                        {
                                            path: 'temporarySms_s',
                                            name: 'temporarySms_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/temporarySms/temporarySms_s'], resolve)
                                        },
                                        {
                                            name: 'temporarySmsDetails',
                                            path: 'temporarySmsDetails',
                                            meta: {
                                                name: '临时短信详情',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/temporarySms/temporarySmsDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'smsParam',
                                    name: 'smsParam',
                                    meta: {
                                        name: '短信参数',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'smsParam_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/smsManager/smsParam/index'], resolve),
                                    children: [
                                        {
                                            path: 'smsParam_s',
                                            name: 'smsParam_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/smsParam/smsParam_s'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'smsCount',
                                    name: 'smsCount',
                                    meta: {
                                        name: '短信统计',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'smsCount_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/smsManager/smsCount/index'], resolve),
                                    children: [
                                        {
                                            path: 'smsCount_s',
                                            name: 'smsCount_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/smsManager/smsCount/smsCount_s'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'noticeManager',
                            name: 'noticeManager',
                            meta: {
                                name: '公告管理',
                                requestAuth: true,
                                acKey: 'infoCenter'
                            },
                            redirect: {
                                name: 'infoCenterIndex'
                            },
                            component: resolve => require(['views/pages/infoCenter/noticeManager/index'], resolve),
                            children: [
                                {
                                    path: 'noticeList',
                                    name: 'noticeList',
                                    meta: {
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'noticeList_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/noticeManager/noticeList/index'], resolve),
                                    children: [
                                        {
                                            path: 'noticeList_s',
                                            name: 'noticeList_s',
                                            meta: {
                                                name: '公告管理',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/noticeManager/noticeList/noticeList_s'], resolve)
                                        },
                                        {
                                            path: 'publishNotice',
                                            name: 'publishNotice',
                                            meta: {
                                                name: '发布公告',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/noticeManager/noticeList/publishNotice'], resolve)
                                        },
                                        {
                                            path: 'announcementDetails_xianyishop',
                                            name: 'announcementDetails_xianyishop',
                                            meta: {
                                                name: '公告详情(鲜易商城)',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/noticeManager/noticeList/announcementDetails_xianyishop'], resolve)
                                        },
                                        {
                                            path: 'announcementDetails_erp',
                                            name: 'announcementDetails_erp',
                                            meta: {
                                                name: '公告详情（ERP）',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/noticeManager/noticeList/announcementDetails_erp'], resolve)
                                        },
                                        {
                                            path: 'announcementDetails_yunpingtai',
                                            name: 'announcementDetails_yunpingtai',
                                            meta: {
                                                name: '公告详情（云管理平台）',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/noticeManager/noticeList/announcementDetails_yunpingtai'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'msgManager',
                            name: 'msgManager',
                            meta: {
                                name: '消息管理',
                                requestAuth: true,
                                acKey: 'infoCenter'
                            },
                            redirect: {
                                name: 'infoCenterIndex'
                            },
                            component: resolve => require(['views/pages/infoCenter/msgManager/index'], resolve),
                            children: [
                                {
                                    path: 'msgTemplateList',
                                    name: 'msgTemplateList',
                                    meta: {
                                        name: '消息模板',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'msgTemplateList_s'
                                    },
                                    component: resolve => require(['views/pages/infoCenter/msgManager/msgTemplateList/index'], resolve),
                                    children: [
                                        {
                                            path: 'msgTemplateList_s',
                                            name: 'msgTemplateList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/msgManager/msgTemplateList/msgTemplateList_s'], resolve)
                                        },
                                        {
                                            path: 'msgTemplateList_addnew',
                                            name: 'msgTemplateList_addnew',
                                            meta: {
                                                name: '新增消息模板',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/msgManager/msgTemplateList/msgTemplateList_addnew'], resolve)
                                        },
                                        {
                                            path: 'msgTemplateList_editro',
                                            name: 'msgTemplateList_editro',
                                            meta: {
                                                name: '修改消息模板',
                                                requestAuth: true,
                                                acKey: 'infoCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/infoCenter/msgManager/msgTemplateList/msgTemplateList_editro'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'msgSendList',
                                    name: 'msgSendList',
                                    meta: {
                                        name: '消息记录',
                                        requestAuth: true,
                                        acKey: 'infoCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/infoCenter/msgManager/msgSendList/msgSendList_s'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'infoLogManager',
                            name: 'infoLogManager',
                            meta: {
                                name: '信息日志',
                                requestAuth: true,
                                acKey: 'infoCenter'
                            },
                            redirect: {
                                name: 'infoCenterIndex'
                            },
                            component: resolve => require(['views/pages/infoCenter/infoLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'noticeLogList',
                                    name: 'noticeLogList',
                                    meta: {
                                        name: '公告日志',
                                        requestAuth: true,
                                        acKey: 'infoCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/infoCenter/infoLogManager/noticeLogList/noticeLogList'], resolve)
                                },
                                {
                                    path: 'msgLogList',
                                    name: 'msgLogList',
                                    meta: {
                                        name: '消息日志',
                                        requestAuth: true,
                                        acKey: 'infoCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/infoCenter/infoLogManager/msgLogList/msgLogList'], resolve)
                                },
                                {
                                    path: 'smsLogList',
                                    name: 'smsLogList',
                                    meta: {
                                        name: '短信日志',
                                        requestAuth: true,
                                        acKey: 'infoCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/infoCenter/infoLogManager/smsLogList/smsLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'systemCenter',
                    name: 'systemCenter',
                    meta: {
                        name: '系统中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'systemCenterIndex'
                    },
                    component: resolve => require(['views/pages/systemCenter/index'], resolve),
                    children: [
                        {
                            path: 'systemCenterIndex',
                            name: 'systemCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'systemCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/systemCenter/systemCenterIndex/systemCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'setManager',
                            name: 'setManager',
                            meta: {
                                name: '设置管理',
                                requestAuth: true,
                                acKey: 'systemCenter'
                            },
                            redirect: {
                                name: 'systemCenterIndex'
                            },
                            component: resolve => require(['views/pages/systemCenter/setManager/index'], resolve),
                            children: [
                                {
                                    path: 'cashDelivery',
                                    name: 'cashDelivery',
                                    meta: {
                                        name: '货到付款验证',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/setManager/cashDelivery/cashDelivery'], resolve)
                                },
                                {
                                    path: 'carList',
                                    name: 'carList',
                                    meta: {
                                        name: '车辆管理',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'carListIndex'
                                    },
                                    component: resolve => require(['views/pages/systemCenter/setManager/carList/index'], resolve),
                                    children: [
                                        {
                                            path: 'carListIndex',
                                            name: 'carListIndex',
                                            meta: {
                                                name: '车辆管理',
                                                requestAuth: true,
                                                acKey: 'systemCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/systemCenter/setManager/carList/carList'], resolve)
                                        },
                                        {
                                            path: 'addCar',
                                            name: 'addCar',
                                            meta: {
                                                name: '新增车辆',
                                                requestAuth: true,
                                                acKey: 'systemCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/systemCenter/setManager/carList/addCar'], resolve)
                                        },
                                        {
                                            path: 'editCar',
                                            name: 'editCar',
                                            meta: {
                                                name: '编辑车辆',
                                                requestAuth: true,
                                                acKey: 'systemCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/systemCenter/setManager/carList/editCar'], resolve)
                                        },
                                        {
                                            path: 'detailsCar',
                                            name: 'detailsCar',
                                            meta: {
                                                name: '查看车辆',
                                                requestAuth: true,
                                                acKey: 'systemCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/systemCenter/setManager/carList/detailsCar'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'confirmReceipt',
                                    name: 'confirmReceipt',
                                    meta: {
                                        name: '确认收货',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/setManager/confirmReceipt/confirmReceipt'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'userManager',
                            name: 'userManager',
                            meta: {
                                name: '用户管理',
                                requestAuth: true,
                                acKey: 'systemCenter'
                            },
                            redirect: {
                                name: 'systemCenterIndex'
                            },
                            component: resolve => require(['views/pages/systemCenter/userManager/index'], resolve),
                            children: [
                                {
                                    path: 'sysUserList',
                                    name: 'sysUserList',
                                    meta: {
                                        name: '用户列表',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/userManager/sysUserList/sysUserList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'roleManager',
                            name: 'roleManager',
                            meta: {
                                name: '角色管理',
                                requestAuth: true,
                                acKey: 'systemCenter'
                            },
                            redirect: {
                                name: 'systemCenterIndex'
                            },
                            component: resolve => require(['views/pages/systemCenter/roleManager/index'], resolve),
                            children: [
                                {
                                    path: 'sysRoleList',
                                    name: 'sysRoleList',
                                    meta: {
                                        name: '角色列表',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/roleManager/sysRoleList/sysRoleList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'actionManager',
                            name: 'actionManager',
                            meta: {
                                name: '资源管理',
                                requestAuth: true,
                                acKey: 'systemCenter'
                            },
                            redirect: {
                                name: 'systemCenterIndex'
                            },
                            component: resolve => require(['views/pages/systemCenter/actionManager/index'], resolve),
                            children: [
                                {
                                    path: 'actionList',
                                    name: 'actionList',
                                    meta: {
                                        name: '资源列表',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/actionManager/actionList/actionList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'loginManager',
                            name: 'loginManager',
                            meta: {
                                name: '登录管理',
                                requestAuth: true,
                                acKey: 'systemCenter'
                            },
                            redirect: {
                                name: 'systemCenterIndex'
                            },
                            component: resolve => require(['views/pages/systemCenter/loginManager/index'], resolve),
                            children: [
                                {
                                    path: 'loginList',
                                    name: 'loginList',
                                    meta: {
                                        name: '登录记录',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/loginManager/loginList/loginList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'sysLogManager',
                            name: 'sysLogManager',
                            meta: {
                                name: '系统日志',
                                requestAuth: true,
                                acKey: 'systemCenter'
                            },
                            redirect: {
                                name: 'systemCenterIndex'
                            },
                            component: resolve => require(['views/pages/systemCenter/sysLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'userLogList',
                                    name: 'userLogList',
                                    meta: {
                                        name: '用户日志',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/sysLogManager/userLogList/userLogList'], resolve)
                                },
                                {
                                    path: 'roleLogList',
                                    name: 'roleLogList',
                                    meta: {
                                        name: '角色日志',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/sysLogManager/roleLogList/roleLogList'], resolve)
                                },
                                {
                                    path: 'actionLogList',
                                    name: 'actionLogList',
                                    meta: {
                                        name: '资源日志',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/sysLogManager/actionLogList/actionLogList'], resolve)
                                },
                                {
                                    path: 'setLogList',
                                    name: 'setLogList',
                                    meta: {
                                        name: '设置日志',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/sysLogManager/setLogList/setLogList'], resolve)
                                },
                                {
                                    path: 'carLogList',
                                    name: 'carLogList',
                                    meta: {
                                        name: '车辆日志',
                                        requestAuth: true,
                                        acKey: 'systemCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/systemCenter/sysLogManager/carLogList/carLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'mobileCenter',
                    name: 'mobileCenter',
                    meta: {
                        name: '移动端中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'mobileCenterIndex'
                    },
                    component: resolve => require(['views/pages/mobileCenter/index'], resolve),
                    children: [
                        {
                            path: 'mobileCenterIndex',
                            name: 'mobileCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'mobileCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/mobileCenter/mobileCenterIndex/mobileCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'pageManager',
                            name: 'pageManager',
                            meta: {
                                name: '页面管理',
                                requestAuth: true,
                                acKey: 'mobileCenter'
                            },
                            redirect: {
                                name: 'mobileCenterIndex'
                            },
                            component: resolve => require(['views/pages/mobileCenter/pageManager/index'], resolve),
                            children: [
                                {
                                    path: 'indexPage',
                                    name: 'indexPage',
                                    meta: {
                                        name: '首页管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'homePageIndex'
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/index'], resolve),
                                    children: [
                                        {
                                            path: 'homePageIndex',
                                            name: 'homePageIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageIndex/homePageIndex'], resolve)
                                        },
                                        {
                                            path: 'homePageManageFocusMapEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageFocusMap/homePageManageFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'homePageManageFocusMapDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageFocusMap/homePageManageFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'homePageManageShortcutEntranceEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageShortcutEntranceEditor',
                                            meta: {
                                                name: '快捷入口编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageShortcutEntrance/homePageManageShortcutEntranceEditor'], resolve)
                                        },
                                        {
                                            path: 'homePageManageShortcutEntranceDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageShortcutEntranceDetails',
                                            meta: {
                                                name: '快捷入口详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageShortcutEntrance/homePageManageShortcutEntranceDetails'], resolve)
                                        },
                                        {
                                            path: 'homePageManageAdPositionEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageAdPositionEditor',
                                            meta: {
                                                name: '广告位编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageAdPosition/homePageManageAdPositionEditor'], resolve)
                                        },
                                        {
                                            path: 'homePageManageAdPositionDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageAdPositionDetails',
                                            meta: {
                                                name: '广告位详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageAdPosition/homePageManageAdPositionDetails'], resolve)
                                        },
                                        {
                                            path: 'homePageManagebannerOneEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManagebannerOneEditor',
                                            meta: {
                                                name: '通栏1编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManagebannerOne/homePageManagebannerOneEditor'], resolve)
                                        },
                                        {
                                            path: 'homePageManagebannerOneDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManagebannerOneDetails',
                                            meta: {
                                                name: '通栏1详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManagebannerOne/homePageManagebannerOneDetails'], resolve)
                                        },
                                        {
                                            path: 'homePageManageQualityMerchantEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageQualityMerchantEditor',
                                            meta: {
                                                name: '优质商户编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageQualityMerchant/homePageManageQualityMerchantEditor'], resolve)
                                        },
                                        {
                                            path: 'homePageManageQualityMerchantDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManageQualityMerchantDetails',
                                            meta: {
                                                name: '优质商户详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManageQualityMerchant/homePageManageQualityMerchantDetails'], resolve)
                                        },
                                        {
                                            path: 'homePageManagebannerTwoEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManagebannerTwoEditor',
                                            meta: {
                                                name: '通栏2编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManagebannerTwo/homePageManagebannerTwoEditor'], resolve)
                                        },
                                        {
                                            path: 'homePageManagebannerTwoDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'homePageManagebannerTwoDetails',
                                            meta: {
                                                name: '通栏2详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexPage/homePageManagebannerTwo/homePageManagebannerTwoDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'indexModule',
                                    name: 'indexModule',
                                    meta: {
                                        name: '首页默认板块管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'indexModuleIndex'
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/index'], resolve),
                                    children: [
                                        {
                                            path: 'indexModuleIndex',
                                            name: 'indexModuleIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuleIndex/indexModuleIndex'], resolve)
                                        },
                                        {
                                            path: 'indexModuleFocusMapEditor/:menuType/:enabledStatus',
                                            name: 'indexModuleFocusMapEditor',
                                            meta: {
                                                name: '默认焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuleFocusMap/indexModuleFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'indexModuleFocusMapDetails/:menuType/:enabledStatus',
                                            name: 'indexModuleFocusMapDetails',
                                            meta: {
                                                name: '默认焦点图详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuleFocusMap/indexModuleFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'indexModuleShortcutEntranceEditor/:menuType/:enabledStatus',
                                            name: 'indexModuleShortcutEntranceEditor',
                                            meta: {
                                                name: '默认快捷入口编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuleShortcutEntrance/indexModuleShortcutEntranceEditor'], resolve)
                                        },
                                        {
                                            path: 'indexModuleShortcutEntranceDetails/:menuType/:enabledStatus',
                                            name: 'indexModuleShortcutEntranceDetails',
                                            meta: {
                                                name: '默认快捷入口详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuleShortcutEntrance/indexModuleShortcutEntranceDetails'], resolve)
                                        },
                                        {
                                            path: 'indexModuletbottomIconEditor/:menuType/:enabledStatus',
                                            name: 'indexModuletbottomIconEditor',
                                            meta: {
                                                name: '底部icon编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuletbottomIcon/indexModuletbottomIconEditor'], resolve)
                                        },
                                        {
                                            path: 'indexModuletbottomIconDetails/:menuType/:enabledStatus',
                                            name: 'indexModuletbottomIconDetails',
                                            meta: {
                                                name: '底部icon详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/indexModule/indexModuletbottomIcon/indexModuletbottomIconDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'fineVendor',
                                    name: 'fineVendor',
                                    meta: {
                                        name: '优质商户管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'fineVendorIndex'
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/index'], resolve),
                                    children: [
                                        {
                                            path: 'fineVendorIndex',
                                            name: 'fineVendorIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorIndex/fineVendorIndex'], resolve)
                                        },
                                        {
                                            path: 'fineVendorFocusMapEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorFocusMap/fineVendorFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'fineVendorFocusMapDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorFocusMap/fineVendorFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'fineVendorQualityMerchantEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorQualityMerchantEditor',
                                            meta: {
                                                name: '优质商户编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorQualityMerchant/fineVendorQualityMerchantEditor'], resolve)
                                        },
                                        {
                                            path: 'fineVendorQualityMerchantDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorQualityMerchantDetails',
                                            meta: {
                                                name: '优质商户详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorQualityMerchant/fineVendorQualityMerchantDetails'], resolve)
                                        },
                                        {
                                            path: 'fineVendorAdPositionEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorAdPositionEditor',
                                            meta: {
                                                name: '广告位编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorAdPosition/fineVendorAdPositionEditor'], resolve)
                                        },
                                        {
                                            path: 'fineVendorAdPositionDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorAdPositionDetails',
                                            meta: {
                                                name: '广告位详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorAdPosition/fineVendorAdPositionDetails'], resolve)
                                        },
                                        {
                                            path: 'fineVendorbannerEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorbannerEditor',
                                            meta: {
                                                name: '通栏编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorbanner/fineVendorbannerEditor'], resolve)
                                        },
                                        {
                                            path: 'fineVendorbannerDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'fineVendorbannerDetails',
                                            meta: {
                                                name: '通栏详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/fineVendor/fineVendorbanner/fineVendorbannerDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'topSearchPro',
                                    name: 'topSearchPro',
                                    meta: {
                                        name: '热销商品管理',
                                        requestAuth: true
                                    },
                                    redirect: {
                                        name: 'topSearchProIndex'
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/index'], resolve),
                                    children: [
                                        {
                                            path: 'topSearchProIndex',
                                            name: 'topSearchProIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProIndex/topSearchProIndex'], resolve)
                                        },
                                        {
                                            path: 'topSearchProFocusMapEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'topSearchProFocusMapEditor',
                                            meta: {
                                                name: '焦点图编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProFocusMap/topSearchProFocusMapEditor'], resolve)
                                        },
                                        {
                                            path: 'topSearchProFocusMapDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'topSearchProFocusMapDetails',
                                            meta: {
                                                name: '焦点图详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProFocusMap/topSearchProFocusMapDetails'], resolve)
                                        },
                                        {
                                            path: 'topSearchProAdPositionEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'topSearchProAdPositionEditor',
                                            meta: {
                                                name: '广告位编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProAdPosition/topSearchProAdPositionEditor'], resolve)
                                        },
                                        {
                                            path: 'topSearchProAdPositionDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'topSearchProAdPositionDetails',
                                            meta: {
                                                name: '广告位详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProAdPosition/topSearchProAdPositionDetails'], resolve)
                                        },
                                        {
                                            path: 'topSearchProbannerEditor/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'topSearchProbannerEditor',
                                            meta: {
                                                name: '通栏编辑',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProbanner/topSearchProbannerEditor'], resolve)
                                        },
                                        {
                                            path: 'topSearchProbannerDetails/:cityId/:areaName/:menuType/:enabledStatus',
                                            name: 'topSearchProbannerDetails',
                                            meta: {
                                                name: '通栏详情',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProbanner/topSearchProbannerDetails'], resolve)
                                        },
                                        {
                                            path: 'topSearchProRecommend/:cityId/:areaName/:enabledStatus',
                                            name: 'topSearchProRecommend',
                                            meta: {
                                                name: '商品推荐',
                                                requestAuth: true,
                                                acKey: 'mobileCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/mobileCenter/pageManager/topSearchPro/topSearchProRecommend/topSearchProRecommend'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'cityManager',
                            name: 'cityManager',
                            meta: {
                                name: '城市配置',
                                requestAuth: true,
                                acKey: 'mobileCenter'
                            },
                            redirect: {
                                name: 'mobileCenterIndex'
                            },
                            component: resolve => require(['views/pages/mobileCenter/cityManager/index'], resolve),
                            children: [
                                {
                                    path: 'hotCityList',
                                    name: 'hotCityList',
                                    meta: {
                                        name: '热门城市',
                                        requestAuth: true,
                                        acKey: 'mobileCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/cityManager/hotCityList/hotCityList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'versionManager',
                            name: 'versionManager',
                            meta: {
                                name: '版本管理',
                                requestAuth: true,
                                acKey: 'mobileCenter'
                            },
                            redirect: {
                                name: 'mobileCenterIndex'
                            },
                            component: resolve => require(['views/pages/mobileCenter/versionManager/index'], resolve),
                            children: [
                                {
                                    path: 'versionList',
                                    name: 'versionList',
                                    meta: {
                                        name: '发版记录',
                                        requestAuth: true,
                                        acKey: 'mobileCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/versionManager/versionList/versionList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'terminalLogManager',
                            name: 'terminalLogManager',
                            meta: {
                                name: '移动端日志',
                                requestAuth: true,
                                acKey: 'mobileCenter'
                            },
                            redirect: {
                                name: 'mobileCenterIndex'
                            },
                            component: resolve => require(['views/pages/mobileCenter/terminalLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'terminalLogList',
                                    name: 'terminalLogList',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'mobileCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/mobileCenter/terminalLogManager/terminalLogList/terminalLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'orderCenter',
                    name: 'orderCenter',
                    meta: {
                        name: '订单中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'orderCenterIndex'
                    },
                    component: resolve => require(['views/pages/orderCenter/index'], resolve),
                    children: [
                        {
                            path: 'orderCenterIndex',
                            name: 'orderCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'orderCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/orderCenter/orderCenterIndex/orderCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'orderManager',
                            name: 'orderManager',
                            meta: {
                                name: '销售管理',
                                requestAuth: true,
                                acKey: 'orderCenter'
                            },
                            redirect: {
                                name: 'orderCenterIndex'
                            },
                            component: resolve => require(['views/pages/orderCenter/orderManager/index'], resolve),
                            children: [
                                {
                                    path: 'orderList',
                                    name: 'orderList',
                                    meta: {
                                        name: '销售订单',
                                        requestAuth: true,
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'orderList_s'
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/orderList/index'], resolve),
                                    children: [
                                        {
                                            path: 'orderList_s',
                                            name: 'orderList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'orderCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/orderCenter/orderManager/orderList/orderList_s'], resolve)
                                        },
                                        {
                                            path: 'orderListDetails',
                                            name: 'orderListDetails',
                                            meta: {
                                                name: '订单详情',
                                                requestAuth: true,
                                                acKey: 'orderCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/orderCenter/orderManager/orderList/orderListDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'inquiryList',
                                    name: 'inquiryList',
                                    meta: {
                                        name: '询价单',
                                        requestAuth: true,
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/inquiryList/inquiryList'], resolve)
                                },
                                {
                                    path: 'canceledOrderList',
                                    name: 'canceledOrderList',
                                    meta: {
                                        name: '已取消销售订单',
                                        requestAuth: true,
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'canceledOrderList_s'
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/canceledOrderList/index'], resolve),
                                    children: [
                                        {
                                            path: 'canceledOrderList_s',
                                            name: 'canceledOrderList_s',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'orderCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/orderCenter/orderManager/canceledOrderList/canceledOrderList_s'], resolve)
                                        },
                                        {
                                            path: 'canceledOrderListDetails',
                                            name: 'canceledOrderListDetails',
                                            meta: {
                                                name: '已取消点单详情',
                                                requestAuth: true,
                                                acKey: 'orderCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/orderCenter/orderManager/canceledOrderList/canceledOrderListDetails'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'orderLogManager',
                            name: 'orderLogManager',
                            meta: {
                                name: '订单日志',
                                requestAuth: true,
                                acKey: 'orderCenter'
                            },
                            redirect: {
                                name: 'orderCenterIndex'
                            },
                            component: resolve => require(['views/pages/orderCenter/orderLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'orderLogList',
                                    name: 'orderLogList',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderLogManager/orderLogList/orderLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'versionsCenter',
                    name: 'versionsCenter',
                    meta: {
                        name: '版本中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'versionsCenterIndex'
                    },
                    component: resolve => require(['views/pages/versionsCenter/index'], resolve),
                    children: [
                        {
                            path: 'versionsCenterIndex',
                            name: 'versionsCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'versionsCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/versionsCenter/versionsCenterIndex/versionsCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'versionsManager',
                            name: 'versionsManager',
                            meta: {
                                name: '版本管理',
                                requestAuth: true,
                                acKey: 'versionsCenter'
                            },
                            redirect: {
                                name: 'versionsCenterIndex'
                            },
                            component: resolve => require(['views/pages/versionsCenter/versionsManager/index'], resolve),
                            children: [
                                {
                                    path: 'versionsList',
                                    name: 'versionsList',
                                    meta: {
                                        name: '版本列表',
                                        requestAuth: true,
                                        acKey: 'versionsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/versionsCenter/versionsManager/versionsList/versionsList'], resolve)
                                },
                                {
                                    path: 'venVersionsList',
                                    name: 'venVersionsList',
                                    meta: {
                                        name: '商户户版本列表',
                                        requestAuth: true,
                                        acKey: 'versionsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/versionsCenter/versionsManager/venVersionsList/venVersionsList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'versionsLogManager',
                            name: 'versionsLogManager',
                            meta: {
                                name: '版本日志',
                                requestAuth: true,
                                acKey: 'versionsCenter'
                            },
                            redirect: {
                                name: 'versionsCenterIndex'
                            },
                            component: resolve => require(['views/pages/versionsCenter/versionsLogManager/index'], resolve),
                            children: [
                                {
                                    path: 'versionsLogList',
                                    name: 'versionsLogList',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'versionsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/versionsCenter/versionsLogManager/versionsLogList/versionsLogList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'actionManager',
                            name: 'actionManagers',
                            meta: {
                                name: 'ERP资源管理',
                                requestAuth: true,
                                acKey: 'versionsCenter'
                            },
                            redirect: {
                                name: 'versionsCenterIndex'
                            },
                            component: resolve => require(['views/pages/versionsCenter/actionManager/index'], resolve),
                            children: [
                                {
                                    path: 'actionList',
                                    name: 'actionLists',
                                    meta: {
                                        name: '资源列表',
                                        requestAuth: true,
                                        acKey: 'versionsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/versionsCenter/actionManager/actionList/actionList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    path: 'financeCenter',
                    name: 'financeCenter',
                    meta: {
                        name: '财务中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'financeCenterIndex'
                    },
                    component: resolve => require(['views/pages/financeCenter/index'], resolve),
                    children: [
                        {
                            path: 'financeCenterIndex',
                            name: 'financeCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'financeCenter',
                                pageFlag: 1
                            },
                            // component: resolve => require(['views/pages/financeCenter/financeCenterIndex/financeCenterIndex'], resolve)
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'receiptManager',
                            name: 'receiptManager',
                            meta: {
                                name: '应收管理',
                                requestAuth: true,
                                acKey: 'financeCenter'
                            },
                            redirect: {
                                name: 'financeCenterIndex'
                            },
                            component: resolve => require(['views/pages/financeCenter/receiptManager/index'], resolve),
                            children: [
                                {
                                    path: 'receiptList',
                                    name: 'receiptList',
                                    meta: {
                                        name: '收款单列表',
                                        requestAuth: true,
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/receiptManager/receiptList/receiptList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'platformPayableManager',
                            name: 'platformPayableManager',
                            meta: {
                                name: '平台应付管理',
                                requestAuth: true,
                                acKey: 'financeCenter'
                            },
                            redirect: {
                                name: 'financeCenterIndex'
                            },
                            component: resolve => require(['views/pages/financeCenter/platformPayableManager/index'], resolve),
                            children: [
                                {
                                    path: 'payableBillList',
                                    name: 'payableBillList',
                                    meta: {
                                        name: '平台应付账单',
                                        requestAuth: true,
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/platformPayableManager/payableBillList/payableBillList'], resolve)
                                },
                                {
                                    path: 'payableBrokerageList',
                                    name: 'payableBrokerageList',
                                    meta: {
                                        name: '平台佣金入账',
                                        requestAuth: true,
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/platformPayableManager/payableBrokerageList/payableBrokerageList'], resolve)
                                },
                                {
                                    path: 'brokerageList',
                                    name: 'brokerageList',
                                    meta: {
                                        name: '佣金管理',
                                        requestAuth: true,
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/platformPayableManager/brokerageList/brokerageList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'selfPaymentManager',
                            name: 'selfPaymentManager',
                            meta: {
                                name: '自营应付管理',
                                requestAuth: true,
                                acKey: 'financeCenter'
                            },
                            redirect: {
                                name: 'financeCenterIndex'
                            },
                            component: resolve => require(['views/pages/financeCenter/selfPaymentManager/index'], resolve),
                            children: [
                                {
                                    path: 'selfPaymentBillList',
                                    name: 'selfPaymentBillList',
                                    meta: {
                                        name: '自营应付账单',
                                        requestAuth: true,
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/selfPaymentManager/selfPaymentBillList/selfPaymentBillList'], resolve)
                                },
                                {
                                    path: 'selfBrokerageList',
                                    name: 'selfBrokerageList',
                                    meta: {
                                        name: '自营佣金（毛利）入账',
                                        requestAuth: true,
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/selfPaymentManager/selfBrokerageList/selfBrokerageList'], resolve)
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '*',
            name: 'p404',
            meta: {
                name: '404'
            },
            component: resolve => require(['views/404/index'], resolve)
        }
    ]
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.meta.requestAuth) {
        let nowCookie = getNowCookie();
        let userInfo = nowCookie.userInfo;
        if (userInfo) {
            next();
        } else {
            next({
                name: 'login'
            });
        }
    } else {
        next();
    }
});

router.afterEach((to, from, next) => {
    NProgress.done();
});

export default router;
