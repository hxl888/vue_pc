import Vue from 'vue';
import Router from 'vue-router';

import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条 样式

import {getNowCookie} from 'utils/commonBase';

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
                    // 1 客户中心
                    path: 'customerCenter',
                    name: 'customerCenter',
                    meta: {
                        name: '客户中心',
                        requestAuth: true,
                        acKey: 'customerCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'customerCenterIndex'
                    },
                    component: resolve => require(['views/pages/customerCenter/index'], resolve),
                    children: [
                        {
                            path: 'customerCenterIndex',
                            name: 'customerCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'customerCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 1-2 商品管理
                            path: 'customerManager',
                            name: 'customerManager',
                            meta: {
                                requestAuth: true,
                                name: '客户管理'
                            },
                            redirect: {
                                name: 'customerCenterIndex'
                            },
                            component: resolve => require(['views/pages/customerCenter/customerManager/index'], resolve),
                            children: [
                                {
                                    path: 'customerGoup',
                                    name: 'customerGoup',
                                    meta: {
                                        requestAuth: true,
                                        name: '客户分组',
                                        acKey: 'customerCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/customerCenter/customerManager/customerGoup/customerGoup'], resolve)
                                }, {
                                    path: 'customerList',
                                    name: 'customerList',
                                    meta: {
                                        requestAuth: true,
                                        name: '客户列表',
                                        acKey: 'customerCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/customerCenter/customerManager/customerList/customerList'], resolve)
                                }
                            ]
                        }, { // 1-5客户日志
                            path: 'logManager',
                            name: 'customerCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '客户日志'
                            },
                            redirect: {
                                name: 'customerCenterIndex'
                            },
                            component: resolve => require(['views/pages/customerCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'logList',
                                    name: 'customerCenterlogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '客户日志列表',
                                        acKey: 'customerCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/customerCenter/logManager/logList/logList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 7 客服中心
                    path: 'callCenter',
                    name: 'callCenter',
                    meta: {
                        name: '客服中心',
                        requestAuth: true,
                        acKey: 'callCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'callCenterIndex'
                    },
                    component: resolve => require(['views/pages/callCenter/index'], resolve),
                    children: [
                        {
                            path: 'callCenterIndex',
                            name: 'callCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'callCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 7-8 售后管理
                            path: 'after-salesManager',
                            name: 'after-salesManager',
                            meta: {
                                requestAuth: true,
                                name: '售后管理'
                            },
                            redirect: {
                                name: 'callCenterIndex'
                            },
                            component: resolve => require(['views/pages/callCenter/after-salesManager/index'], resolve),
                            children: [
                                {
                                    path: 'after-salesList',
                                    name: 'after-salesList',
                                    meta: {
                                        requestAuth: true,
                                        name: '售后单列表',
                                        acKey: 'callCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/index'], resolve),
                                    redirect: {
                                        name: 'after-salesIndex'
                                    },
                                    children: [ // 售后单列表
                                        {
                                            path: 'after-salesIndex',
                                            name: 'after-salesIndex',
                                            component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/after-salesList'], resolve)
                                        },
                                        {
                                            path: 'newservication',
                                            name: 'newservication',
                                            meta: {
                                                name: '新建售后单',
                                                requestAuth: true,
                                                acKey: 'callCenter'
                                            },
                                            component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/newservication'], resolve)
                                        },
                                        {
                                            path: 'particulars',
                                            name: 'particulars',
                                            meta: {
                                                name: '查看售后单详情',
                                                requestAuth: true,
                                                acKey: 'callCenter'
                                            },
                                            component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/particulars'], resolve)
                                        },
                                        {
                                            path: 'compile',
                                            name: 'compile',
                                            meta: {
                                                name: '编辑售后单',
                                                requestAuth: true,
                                                acKey: 'callCenter'
                                            },
                                            component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/compile'], resolve)
                                        }
                                    ]
                                }, {
                                    path: 'logList',
                                    name: 'callCenterlogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '售后日志列表',
                                        acKey: 'callCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/erplogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                { // 101 财务中心
                    path: 'financeCenter',
                    name: 'financeCenter',
                    meta: {
                        name: '财务中心',
                        requestAuth: true,
                        acKey: 'financeCenter',
                        level: 1
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
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 退款管理
                            path: 'refundManager',
                            name: 'refundManager',
                            meta: {
                                requestAuth: true,
                                name: '退款管理'
                            },
                            redirect: {
                                name: 'financeCenterIndex'
                            },
                            component: resolve => require(['views/pages/financeCenter/refundManager/index'], resolve),
                            children: [
                                {
                                    path: 'refundConfirmList',
                                    name: 'refundConfirmList',
                                    meta: {
                                        requestAuth: true,
                                        name: '退款单列表',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/refundManager/refundConfirmList/refundConfirmList'], resolve)
                                }
                            ]
                        },
                        { // 财务管理
                            path: 'financeManager',
                            name: 'financeManager',
                            meta: {
                                requestAuth: true,
                                name: '财务管理'
                            },
                            redirect: {
                                name: 'financeCenterIndex'
                            },
                            component: resolve => require(['views/pages/financeCenter/financeManager/index'], resolve),
                            children: [
                                {
                                    path: 'receiptList',
                                    name: 'receiptList',
                                    meta: {
                                        requestAuth: true,
                                        name: '收款单',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/financeManager/receiptList/receiptList'], resolve)
                                },
                                {
                                    path: 'paymentList',
                                    name: 'paymentList',
                                    meta: {
                                        requestAuth: true,
                                        name: '付款单',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/financeManager/paymentList/paymentList'], resolve)
                                }
                            ]
                        },
                        { // 审核管理
                            path: 'checkManager',
                            name: 'checkManager',
                            meta: {
                                requestAuth: true,
                                name: '审核管理'
                            },
                            redirect: {
                                name: 'financeCenterIndex'
                            },
                            component: resolve => require(['views/pages/financeCenter/checkManager/index'], resolve),
                            children: [
                                {
                                    path: 'supplierCheckList',
                                    name: 'supplierCheckList',
                                    meta: {
                                        requestAuth: true,
                                        name: '供货商审核',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'supplierCheckListIndex'
                                    },
                                    component: resolve => require(['views/pages/financeCenter/checkManager/supplierCheckList/index'], resolve),
                                    children: [
                                        {
                                            path: 'supplierCheckListIndex',
                                            name: 'supplierCheckListIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'financeCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/supplierCheckList/supplierCheckList'], resolve)
                                        }, {
                                            path: 'finalsupplierDetails',
                                            name: 'finalsupplierDetails',
                                            meta: {
                                                name: '查看供货商',
                                                acKey: 'financeCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/supplierCheckList/finalsupplierDetails'], resolve)
                                        }, {
                                            path: 'checkSuppliers',
                                            name: 'checkSuppliers',
                                            meta: {
                                                name: '供货商审核',
                                                acKey: 'financeCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/supplierCheckList/checkSuppliers'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'returnedCheckList',
                                    name: 'returnedCheckList',
                                    meta: {
                                        requestAuth: true,
                                        name: '售后单审核',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'returnedCheckListIndex'
                                    },
                                    component: resolve => require(['views/pages/financeCenter/checkManager/returnedCheckList/index'], resolve),
                                    children: [
                                        {
                                            path: 'returnedCheckListIndex',
                                            name: 'returnedCheckListIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'financeCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/returnedCheckList/returnedCheckList'], resolve)
                                        }, {
                                            path: 'finalreturnedDetails',
                                            name: 'finalreturnedDetails',
                                            meta: {
                                                name: '查看售后单',
                                                acKey: 'financeCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/particulars'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'procurementCheckList',
                                    name: 'procurementCheckList',
                                    meta: {
                                        requestAuth: true,
                                        name: '采购单审核',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'procurementCheckListIndex'
                                    },
                                    component: resolve => require(['views/pages/financeCenter/checkManager/procurementCheckList/index'], resolve),
                                    children: [
                                        {
                                            path: 'procurementCheckListIndex',
                                            name: 'procurementCheckListIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'financeCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/procurementCheckList/procurementCheckList'], resolve)
                                        }, {
                                            path: 'finalCheckoutProcurement',
                                            name: 'finalCheckoutProcurement',
                                            meta: {
                                                name: '采购单审核',
                                                acKey: 'financeCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/procurementCheckList/finalCheckoutProcurement'], resolve)
                                        }, {
                                            path: 'finalProcurementDetails',
                                            name: 'finalProcurementDetails',
                                            meta: {
                                                name: '查看采购单',
                                                acKey: 'financeCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/financeCenter/checkManager/procurementCheckList/finalProcurementDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'myPayableBillList',
                                    name: 'myPayableBillList',
                                    meta: {
                                        requestAuth: true,
                                        name: '我的应付账单',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/checkManager/myPayableBillList/myPayableBillList'], resolve)
                                },
                                {
                                    path: 'platformPayableBillList',
                                    name: 'platformPayableBillList',
                                    meta: {
                                        requestAuth: true,
                                        name: '平台应付账单',
                                        acKey: 'financeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/financeCenter/checkManager/platformPayableBillList/platformPayableBillList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 11 营销中心
                    path: 'salesCenter',
                    name: 'salesCenter',
                    meta: {
                        name: '营销中心',
                        requestAuth: true,
                        acKey: 'salesCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'salesCenterIndex'
                    },
                    component: resolve => require(['views/pages/salesCenter/index'], resolve),
                    children: [
                        {
                            path: 'salesCenterIndex',
                            name: 'salesCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'salesCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            // 11-12 促销管理
                            path: 'salesManager',
                            name: 'salesManager',
                            meta: {
                                requestAuth: true,
                                name: '促销管理'
                            },
                            redirect: {
                                name: 'salesCenterIndex'
                            },
                            component: resolve => require(['views/pages/salesCenter/salesManager/index'], resolve),
                            children: [
                                {
                                    path: 'salesApply',
                                    name: 'salesApply',
                                    meta: {
                                        requestAuth: true,
                                        name: '新建优惠券',
                                        acKey: 'salesCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/salesCenter/salesManager/salesApply/salesApply'], resolve)
                                },
                                {
                                    path: 'salesType',
                                    name: 'salesType',
                                    meta: {
                                        requestAuth: true,
                                        name: '促销方式',
                                        acKey: 'salesCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/salesCenter/salesManager/salesType/salesType'], resolve)
                                },
                                {
                                    path: 'couponList',
                                    name: 'couponList',
                                    meta: {
                                        requestAuth: true,
                                        name: '优惠券列表'
                                    },
                                    redirect: {
                                        name: 'couponListIndex'
                                    },
                                    component: resolve => require(['views/pages/salesCenter/salesManager/couponList/index'], resolve),
                                    children: [
                                        {
                                            path: 'couponListIndex',
                                            name: 'couponListIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'salesCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/salesCenter/salesManager/couponList/couponList'], resolve)
                                        },
                                        {
                                            path: 'couponDetails/:type/:couTempId',
                                            name: 'couponDetails',
                                            meta: {
                                                name: '优惠券详情',
                                                requestAuth: true,
                                                acKey: 'salesCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/salesCenter/salesManager/couponList/couponDetails'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'couponRecordList',
                                    name: 'couponRecordList',
                                    meta: {
                                        requestAuth: true,
                                        name: '优惠券记录',
                                        acKey: 'salesCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/salesCenter/salesManager/couponRecordList/couponRecordList'], resolve)
                                }
                            ]
                        },
                        { // 客户日志
                            path: 'logManager',
                            name: 'salesCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '客户日志'
                            },
                            redirect: {
                                name: 'salesCenterLogList'
                            },
                            component: resolve => require(['views/pages/salesCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'logList',
                                    name: 'salesCenterLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '促销日志列表',
                                        acKey: 'salesCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/logList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 17 设置中心
                    path: 'setingCenter',
                    name: 'setingCenter',
                    meta: {
                        name: '设置中心',
                        requestAuth: true,
                        acKey: 'setingCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'setingCenterIndex'
                    },
                    component: resolve => require(['views/pages/setingCenter/index'], resolve),
                    children: [
                        {
                            path: 'setingCenterIndex',
                            name: 'setingCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'setingCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 17-18 系统参数设置
                            path: 'sysParamManager',
                            name: 'sysParamManager',
                            meta: {
                                requestAuth: true,
                                name: '系统参数设置'
                            },
                            redirect: {
                                name: 'setingCenterIndex'
                            },
                            component: resolve => require(['views/pages/setingCenter/sysParamManager/index'], resolve),
                            children: [
                                {
                                    path: 'sysParamSet',
                                    name: 'sysParamSet',
                                    meta: {
                                        requestAuth: true,
                                        name: '系统参数设置',
                                        acKey: 'setingCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/setingCenter/sysParamManager/sysParamSet/sysParamSet'], resolve)
                                }, {
                                    path: 'stockCostSet',
                                    name: 'stockCostSet',
                                    meta: {
                                        requestAuth: true,
                                        name: '库存成本设置',
                                        acKey: 'setingCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/setingCenter/sysParamManager/stockCostSet/stockCostSet'], resolve)
                                }, {
                                    path: 'autoCostSet',
                                    name: 'autoCostSet',
                                    meta: {
                                        requestAuth: true,
                                        name: '自动分仓设置',
                                        acKey: 'setingCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/setingCenter/sysParamManager/autoCostSet/autoCostSet'], resolve)
                                }
                            ]
                        },
                        { // 17-18 组织管理
                            path: 'orgManager',
                            name: 'orgManager',
                            meta: {
                                requestAuth: true,
                                name: '组织管理'
                            },
                            redirect: {
                                name: 'orgManagerIndex'
                            },
                            component: resolve => require(['views/pages/setingCenter/orgManager/index'], resolve),
                            children: [
                                {
                                    path: 'userList',
                                    name: 'userList',
                                    meta: {
                                        requestAuth: true,
                                        name: '用户列表',
                                        acKey: 'setingCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/setingCenter/orgManager/userList/userList'], resolve)
                                }, {
                                    path: 'roleList',
                                    name: 'roleList',
                                    meta: {
                                        requestAuth: true,
                                        name: '角色列表',
                                        acKey: 'setingCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/setingCenter/orgManager/roleList/roleList'], resolve)
                                }
                            ]
                        },
                        { // 商品日志
                            path: 'logManager',
                            name: 'setingCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '登陆日志'
                            },
                            redirect: {
                                name: 'setingCenterLogList'
                            },
                            component: resolve => require(['views/pages/setingCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'loginLogList',
                                    name: 'setingCenterLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '日志列表',
                                        acKey: 'setingCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/setingCenter/logManager/loginLogList/loginLogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 47 商品中心
                    path: 'proCenter',
                    name: 'proCenter',
                    meta: {
                        name: '商品中心',
                        requestAuth: true,
                        acKey: 'proCenter',
                        level: 1
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
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            // 2商品管理
                            path: 'proManager',
                            name: 'proManager',
                            meta: {
                                requestAuth: true,
                                name: '商品管理'
                            },
                            redirect: {
                                name: 'proCenterIndex'
                            },
                            component: resolve => require(['views/pages/proCenter/proManager/index'], resolve),
                            children: [
                                {
                                    path: 'proRelease',
                                    name: 'proRelease',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/proRelease/index'], resolve),
                                    redirect: {
                                        name: 'proReleaseIndex'
                                    },
                                    children: [
                                        {
                                            path: 'proReleaseIndex',
                                            name: 'proReleaseIndex',
                                            meta: {
                                                requestAuth: true,
                                                name: '发布商品',
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proRelease/proRelease'], resolve)
                                        },
                                        {
                                            path: 'methodofprice',
                                            name: 'methodofprice',
                                            meta: {
                                                name: '定价方式',
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proRelease/methodofprice'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'proReleaseEditor/:type/:proSpu',
                                    name: 'proReleaseEditor',
                                    meta: {
                                        requestAuth: true,
                                        name: '编辑商品',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/proRelease/proRelease'], resolve)
                                },
                                {
                                    path: 'proImport',
                                    name: 'proImport',
                                    meta: {
                                        requestAuth: true,
                                        name: '商品导入',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/proImport/index'], resolve),
                                    redirect: {
                                        name: 'proIndex'
                                    },
                                    children: [
                                        {
                                            path: 'proIndex',
                                            name: 'proIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proImport/proImport'], resolve)
                                        },
                                        {
                                            path: 'importofgoods',
                                            name: 'importofgoods',
                                            meta: {
                                                name: '导入日志',
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proImport/importofgoods'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'saleProList',
                                    name: 'saleProList',
                                    meta: {
                                        requestAuth: true,
                                        name: '在售商品',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/saleProList/saleProList'], resolve)
                                },
                                {
                                    path: 'areaProList',
                                    name: 'areaProList',
                                    meta: {
                                        requestAuth: true,
                                        name: '区域商品',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/areaProList/areaProList'], resolve)
                                },
                                {
                                    path: 'inquiryProList',
                                    name: 'inquiryProList',
                                    meta: {
                                        requestAuth: true,
                                        name: '询报价商品',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/inquiryProList/inquiryProList'], resolve)
                                },
                                {
                                    path: 'proOverview',
                                    name: 'proOverview',
                                    meta: {
                                        requestAuth: true,
                                        name: '商品一览表',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/proManager/proOverview/index'], resolve),
                                    redirect: {
                                        name: 'proOverviewIndex'
                                    },
                                    children: [
                                        {
                                            path: 'proOverviewIndex',
                                            name: 'proOverviewIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proOverview/proOverview'], resolve)
                                        }, {
                                            path: 'recycleBin',
                                            name: 'recycleBin',
                                            meta: {
                                                name: '回收站',
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proOverview/recycleBin'], resolve)
                                        }, {
                                            path: 'draft',
                                            name: 'draft',
                                            meta: {
                                                name: '草稿箱',
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/proManager/proOverview/draft'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        { // 2基础设置
                            path: 'baseSetManager',
                            name: 'baseSetManager',
                            meta: {
                                requestAuth: true,
                                name: '基础设置'
                            },
                            redirect: {
                                name: 'proCenterIndex'
                            },
                            component: resolve => require(['views/pages/proCenter/baseSetManager/index'], resolve),
                            children: [ // 3
                                {
                                    path: 'brandList',
                                    name: 'brandList',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'proCenter',
                                        name: '品牌列表',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'brandlistIndexs'
                                    },
                                    component: resolve => require(['views/pages/proCenter/baseSetManager/brandList/index'], resolve),
                                    children: [
                                        {
                                            path: 'brandlistIndexs',
                                            name: 'brandlistIndexs',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/proCenter/baseSetManager/brandList/brandList'], resolve)
                                        },
                                        {
                                            path: 'addNewBrand',
                                            name: 'addNewBrand',
                                            meta: {
                                                requestAuth: true,
                                                name: '新增品牌',
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/baseSetManager/brandList/addNewBrand'], resolve)
                                        },
                                        {
                                            path: 'editBrand',
                                            name: 'editBrand',
                                            meta: {
                                                requestAuth: true,
                                                name: '编辑品牌',
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/baseSetManager/brandList/editBrand'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'extendedAttrs',
                                    name: 'extendedAttrs',
                                    meta: {
                                        requestAuth: true,
                                        acKey: 'proCenter',
                                        name: '扩展属性',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/proCenter/baseSetManager/extendedAttrs/index'], resolve),
                                    redirect: {
                                        name: 'extendedAttrsIndex'
                                    },
                                    children: [
                                        {
                                            path: 'extendedAttrsIndex',
                                            name: 'extendedAttrsIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/baseSetManager/extendedAttrs/extendedAttrs'], resolve)
                                        }, {
                                            path: 'basesettingsnewproperties',
                                            name: 'basesettingsnewproperties',
                                            meta: {
                                                name: '新增属性',
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/baseSetManager/extendedAttrs/basesettingsnewproperties'], resolve)
                                        }, {
                                            path: 'basesettingseditproperties',
                                            name: 'basesettingseditproperties',
                                            meta: {
                                                name: '编辑属性',
                                                requestAuth: true,
                                                acKey: 'proCenter'
                                            },
                                            component: resolve => require(['views/pages/proCenter/baseSetManager/extendedAttrs/basesettingseditproperties'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        { // 商品日志
                            path: 'logManager',
                            name: 'proCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '商品日志'
                            },
                            redirect: {
                                name: 'proCenterLogList'
                            },
                            component: resolve => require(['views/pages/proCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'logList',
                                    name: 'proCenterLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '商品日志列表',
                                        acKey: 'proCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/logList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 60 订单中心
                    path: 'orderCenter',
                    name: 'orderCenter',
                    meta: {
                        name: '订单中心',
                        requestAuth: true,
                        acKey: 'orderCenter',
                        level: 1
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
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 订单管理
                            path: 'orderManager',
                            name: 'orderManager',
                            meta: {
                                requestAuth: true,
                                name: '订单管理'
                            },
                            redirect: {
                                name: 'orderCenterIndex'
                            },
                            component: resolve => require(['views/pages/orderCenter/orderManager/index'], resolve),
                            children: [
                                {
                                    path: 'orderQueryList',
                                    name: 'orderQueryList',
                                    meta: {
                                        requestAuth: true,
                                        name: '订单查询',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/orderQueryList/orderQueryList'], resolve)
                                }, {
                                    path: 'non-paymentOrderList',
                                    name: 'non-paymentOrderList',
                                    meta: {
                                        requestAuth: true,
                                        name: '待付款订单',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/non-paymentOrderList/non-paymentOrderList'], resolve)
                                }, {
                                    path: 'exceptionOrderList',
                                    name: 'exceptionOrderList',
                                    meta: {
                                        requestAuth: true,
                                        name: '异常订单',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/exceptionOrderList/exceptionOrderList'], resolve)
                                }, {
                                    path: 'orderProcessingList',
                                    name: 'orderProcessingList',
                                    meta: {
                                        requestAuth: true,
                                        name: '订单处理',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/orderProcessingList/orderProcessingList'], resolve)
                                }, {
                                    path: 'orderPrintList',
                                    name: 'orderPrintList',
                                    meta: {
                                        requestAuth: true,
                                        name: '订单打印发货',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/orderPrintList/orderPrintList'], resolve)
                                }, {
                                    path: 'orderSendList',
                                    name: 'orderSendList',
                                    meta: {
                                        requestAuth: true,
                                        name: '订单汇总采购',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/orderManager/orderSendList/orderSendList'], resolve)
                                }
                            ]
                        },
                        { // 询价单管理
                            path: 'inquiryManager',
                            name: 'inquiryManager',
                            meta: {
                                requestAuth: true,
                                name: '询价单管理'
                            },
                            redirect: {
                                name: 'orderCenterIndex'
                            },
                            component: resolve => require(['views/pages/orderCenter/inquiryManager/index'], resolve),
                            children: [
                                {
                                    path: 'inquiryList',
                                    name: 'inquiryList',
                                    meta: {
                                        requestAuth: true,
                                        name: '询价单',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/orderCenter/inquiryManager/inquiryList/inquiryList'], resolve)
                                }
                            ]
                        },
                        {
                            path: 'logManager',
                            name: 'orderCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '订单中心日志'
                            },
                            redirect: {
                                name: 'orderCenterLogList'
                            },
                            component: resolve => require(['views/pages/orderCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'logList',
                                    name: 'orderCenterLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '订单日志列表',
                                        acKey: 'orderCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/erplogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 37 店铺中心
                    path: 'storeCenter',
                    name: 'storeCenter',
                    meta: {
                        name: '店铺中心',
                        requestAuth: true,
                        acKey: 'storeCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'storeCenterIndex'
                    },
                    component: resolve => require(['views/pages/storeCenter/index'], resolve),
                    children: [
                        {
                            path: 'storeCenterIndex',
                            name: 'storeCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'storeCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            // 店铺管理
                            path: 'storeManager',
                            name: 'storeManager',
                            meta: {
                                requestAuth: true,
                                name: '店铺管理'
                            },
                            redirect: {
                                name: 'storeCenterIndex'
                            },
                            component: resolve => require(['views/pages/storeCenter/storeManager/index'], resolve),
                            children: [
                                {
                                    path: 'storeOverview',
                                    name: 'storeOverview',
                                    meta: {
                                        requestAuth: true,
                                        name: '店铺概览',
                                        acKey: 'storeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storeCenter/storeManager/storeOverview/storeOverview'], resolve)
                                },
                                {
                                    path: 'vendorInfo',
                                    name: 'vendorInfo',
                                    meta: {
                                        requestAuth: true,
                                        name: '商家信息',
                                        acKey: 'storeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storeCenter/storeManager/vendorInfo/vendorInfo'], resolve)
                                },
                                {
                                    path: 'storeInfo',
                                    name: 'storeInfo',
                                    meta: {
                                        requestAuth: true,
                                        name: '店铺信息',
                                        acKey: 'storeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storeCenter/storeManager/storeInfo/storeInfo'], resolve)
                                }
                            ]
                        },
                        {
                            // 资质管理
                            path: 'aptitudeManager',
                            name: 'aptitudeManager',
                            meta: {
                                requestAuth: true,
                                name: '资质管理'
                            },
                            redirect: {
                                name: 'storeCenterIndex'
                            },
                            component: resolve => require(['views/pages/storeCenter/aptitudeManager/index'], resolve),
                            children: [
                                {
                                    path: 'papersList',
                                    name: 'store_papersList',
                                    meta: {
                                        requestAuth: true,
                                        name: '证照管理',
                                        acKey: 'storeCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storeCenter/aptitudeManager/papersList/papersList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 82 仓储中心
                    path: 'storageCenter',
                    name: 'storageCenter',
                    meta: {
                        name: '仓储中心',
                        requestAuth: true,
                        acKey: 'storageCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'storageCenterIndex'
                    },
                    component: resolve => require(['views/pages/storageCenter/index'], resolve),
                    children: [
                        {
                            path: 'storageCenterIndex',
                            name: 'storageCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'storageCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 仓库管理
                            path: 'storageManager',
                            name: 'storageManager',
                            meta: {
                                requestAuth: true,
                                name: '仓库管理'
                            },
                            redirect: {
                                name: 'storageCenterIndex'
                            },
                            component: resolve => require(['views/pages/storageCenter/storageManager/index'], resolve),
                            children: [
                                {
                                    path: 'storageList',
                                    name: 'storageList',
                                    meta: {
                                        requestAuth: true,
                                        name: '仓库列表',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/storageManager/storageList/index'], resolve),
                                    redirect: {
                                        name: 'storageListIndex'
                                    },
                                    children: [
                                        {
                                            path: 'storageListIndex',
                                            name: 'storageListIndex',
                                            meta: {
                                                acKey: 'storageCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/storageCenter/storageManager/storageList/storageList'], resolve)
                                        },
                                        {
                                            path: 'editorstorage',
                                            name: 'editorstorage',
                                            meta: {
                                                name: '编辑仓库',
                                                acKey: 'storageCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/storageCenter/storageManager/storageList/addstorage'], resolve)
                                        },
                                        {
                                            path: 'addstorage',
                                            name: 'addstorage',
                                            meta: {
                                                name: '新增仓库',
                                                acKey: 'storageCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/storageCenter/storageManager/storageList/addstorage'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        { // 库存管理
                            path: 'stockManager',
                            name: 'stockManager',
                            meta: {
                                requestAuth: true,
                                name: '库存管理'
                            },
                            redirect: {
                                name: 'storageCenterIndex'
                            },
                            component: resolve => require(['views/pages/storageCenter/stockManager/index'], resolve),
                            children: [
                                {
                                    path: 'allotOrderList',
                                    name: 'allotOrderList',
                                    meta: {
                                        requestAuth: true,
                                        name: '调拨单',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/index'], resolve),
                                    redirect: {
                                        name: 'allotOrderindex'
                                    },
                                    children: [
                                        {
                                            path: 'allotOrderindex',
                                            name: 'allotOrderindex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/allotOrderList'], resolve)
                                        }, {
                                            path: 'editorrequisition',
                                            name: 'editorrequisition',
                                            meta: {
                                                name: '调拨单商品',
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/editorrequisition'], resolve)
                                        }, {
                                            path: 'refundMerchandise',
                                            name: 'refundMerchandise',
                                            meta: {
                                                name: '调拨单商品',
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/refundMerchandise'], resolve)
                                        }, {
                                            path: 'addallotOrder',
                                            name: 'addallotOrder',
                                            meta: {
                                                name: '新建调拨单',
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/addallotOrder'], resolve)
                                        }, {
                                            path: 'editorallotOrder',
                                            name: 'editorallotOrder',
                                            meta: {
                                                name: '调拨单编辑',
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/editorallotOrder'], resolve)
                                        }, {
                                            path: 'seeallotOrder',
                                            name: 'seeallotOrder',
                                            meta: {
                                                name: '调拨单详情',
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/allotOrderList/seeallotOrder'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'stockInitialize',
                                    name: 'stockInitialize',
                                    meta: {
                                        requestAuth: true,
                                        name: '库存初始化',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/stockInitialize/stockInitialize'], resolve)
                                },
                                {
                                    path: 'checkOrderList',
                                    name: 'checkOrderList',
                                    meta: {
                                        requestAuth: true,
                                        name: '盘点单',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/checkOrderList/index'], resolve),
                                    redirect: {
                                        name: 'checkOrderListindex'
                                    },
                                    children: [
                                        {
                                            path: 'checkOrderListindex',
                                            name: 'checkOrderListindex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/checkOrderList/checkOrderList'], resolve)
                                        }, {
                                            path: 'inventoryCheck',
                                            name: 'inventoryCheck',
                                            meta: {
                                                name: '库存盘点',
                                                requestAuth: true,
                                                acKey: 'storageCenter'
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/checkOrderList/inventoryCheck'], resolve)
                                        }, {
                                            path: 'stockTaking',
                                            name: 'stockTaking',
                                            meta: {
                                                name: '库存盘点',
                                                requestAuth: true,
                                                acKey: 'storageCenter'
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/checkOrderList/stockTaking'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'stockOutOrderList',
                                    name: 'stockOutOrderList',
                                    meta: {
                                        requestAuth: true,
                                        name: '出库单',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/stockOutOrderList/stockOutOrderList'], resolve)
                                },
                                {
                                    path: 'purchaseReceipt',
                                    name: 'purchaseReceipt',
                                    meta: {
                                        requestAuth: true,
                                        name: '采购收货入库',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/purchaseReceipt/index'], resolve),
                                    redirect: {
                                        name: 'purchaseReceiptindex'
                                    },
                                    children: [
                                        {
                                            path: 'purchaseReceiptindex',
                                            name: 'purchaseReceiptindex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'storageCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/storageCenter/stockManager/purchaseReceipt/purchaseReceiptlist'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'stockOrderList',
                                    name: 'stockOrderList',
                                    meta: {
                                        requestAuth: true,
                                        name: '入库单',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/stockOrderList/stockOrderList'], resolve)
                                },
                                {
                                    path: 'stockMonitoring',
                                    name: 'stockMonitoring',
                                    meta: {
                                        requestAuth: true,
                                        name: '库存监控',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/stockMonitoring/stockMonitoring'], resolve)
                                },
                                {
                                    path: 'returnedProList',
                                    name: 'returnedProList',
                                    meta: {
                                        requestAuth: true,
                                        name: '退货单',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/returnedProList/returnedProList'], resolve)
                                },
                                {
                                    path: 'refundReceipt',
                                    name: 'refundReceipt',
                                    meta: {
                                        requestAuth: true,
                                        name: '退货收货入库',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/storageCenter/stockManager/refundReceipt/refundReceipt'], resolve)
                                }
                            ]
                        },
                        { // 仓储中心日志
                            path: 'logManager',
                            name: 'storageCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '仓储中心日志'
                            },
                            redirect: {
                                name: 'storageCenterLogList'
                            },
                            component: resolve => require(['views/pages/storageCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'storageLogList',
                                    name: 'storageCenterLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '仓储日志列表',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/erplogList'], resolve)
                                },
                                {
                                    path: 'stockLogList',
                                    name: 'stockLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '库存日志列表',
                                        acKey: 'storageCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/erplogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 采购中心
                    path: 'procurementCenter',
                    name: 'procurementCenter',
                    meta: {
                        name: '采购中心',
                        requestAuth: true,
                        acKey: 'procurementCenter',
                        level: 1
                    },
                    redirect: {
                        name: 'procurementCenterIndex'
                    },
                    component: resolve => require(['views/pages/procurementCenter/index'], resolve),
                    children: [
                        {
                            path: 'procurementCenterIndex',
                            name: 'procurementCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'procurementCenter',
                                pageFlag: 2
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        { // 供货商管理
                            path: 'supplierManager',
                            name: 'supplierManager',
                            meta: {
                                requestAuth: true,
                                name: '供货商管理'
                            },
                            redirect: {
                                name: 'procurementCenterIndex'
                            },
                            component: resolve => require(['views/pages/procurementCenter/supplierManager/index'], resolve),
                            children: [
                                {
                                    path: 'supplierList',
                                    name: 'supplierList',
                                    meta: {
                                        requestAuth: true,
                                        name: '供货商列表',
                                        acKey: 'procurementCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/index'], resolve),
                                    redirect: {
                                        name: 'supplierListIndex'
                                    },
                                    children: [
                                        {
                                            path: 'supplierListIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'procurementCenter'
                                            },
                                            name: 'supplierListIndex',
                                            component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/supplierList'], resolve)
                                        }, {
                                            path: 'addsupplier',
                                            name: 'addsupplier',
                                            meta: {
                                                name: '新增供货商',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/addsupplier'], resolve)
                                        }, {
                                            path: 'editsupplier',
                                            name: 'editsupplier',
                                            meta: {
                                                name: '编辑供货商',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/editsupplier'], resolve)
                                        }, {
                                            path: 'supplierDetails',
                                            name: 'supplierDetails',
                                            meta: {
                                                name: '查看供货商',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/supplierDetails'], resolve)
                                        }, {
                                            path: 'checkSupplier',
                                            name: 'checkSupplier',
                                            meta: {
                                                name: '供货商审核',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/checkSupplier'], resolve)
                                        }, {
                                            path: 'signSupplier',
                                            name: 'signSupplier',
                                            meta: {
                                                name: '供货商签订',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/supplierManager/supplierList/signSupplier'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'proInfoList',
                                    name: 'proInfoList',
                                    meta: {
                                        requestAuth: true,
                                        name: '商品信息管理',
                                        acKey: 'procurementCenter'
                                    },
                                    component: resolve => require(['views/pages/procurementCenter/supplierManager/proInfoList/proInfoList'], resolve)
                                }
                            ]
                        },
                        { // 售后管理
                            path: 'returnedProManager',
                            name: 'returnedProManager',
                            meta: {
                                requestAuth: true,
                                name: '售后管理'
                            },
                            redirect: {
                                name: 'procurementCenterIndex'
                            },
                            component: resolve => require(['views/pages/procurementCenter/returnedProManager/index'], resolve),
                            children: [
                                {
                                    path: 'afterSaleList',
                                    name: 'afterSaleList',
                                    meta: {
                                        requestAuth: true,
                                        name: '售后单审核',
                                        acKey: 'procurementCenter',
                                        level: 3
                                    },
                                    redirect: {
                                        name: 'afterSaleListIndex'
                                    },
                                    component: resolve => require(['views/pages/procurementCenter/returnedProManager/afterSaleAuditList/index'], resolve),
                                    children: [
                                        {
                                            path: 'afterSaleListIndex',
                                            name: 'afterSaleListIndex',
                                            meta: {
                                                requestAuth: true,
                                                name: '售后单审核',
                                                acKey: 'procurementCenter',
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/returnedProManager/afterSaleAuditList/afterSaleAuditList'], resolve)
                                        }, {
                                            path: 'procurereturnedDetails',
                                            name: 'procurereturnedDetails',
                                            meta: {
                                                name: '查看售后单',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/callCenter/after-salesManager/after-salesList/particulars'], resolve)
                                        }
                                    ]
                                },
                                {
                                    path: 'returnedProList',
                                    name: 'procurementReturnedProList',
                                    meta: {
                                        requestAuth: true,
                                        name: '退货单列表',
                                        acKey: 'procurementCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/procurementCenter/returnedProManager/returnedProList/returnedProList'], resolve)
                                }
                            ]
                        },
                        { // 采购管理
                            path: 'procurementManager',
                            name: 'procurementManager',
                            meta: {
                                requestAuth: true,
                                name: '采购管理'
                            },
                            redirect: {
                                name: 'procurementCenterIndex'
                            },
                            component: resolve => require(['views/pages/procurementCenter/procurementManager/index'], resolve),
                            children: [
                                {
                                    path: 'procurementList',
                                    name: 'procurementList',
                                    meta: {
                                        requestAuth: true,
                                        name: '采购单列表',
                                        acKey: 'procurementCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/index'], resolve),
                                    redirect: {
                                        name: 'procurementListIndex'
                                    },
                                    children: [
                                        {
                                            path: 'procurementListIndex',
                                            meta: {
                                                requestAuth: true,
                                                acKey: 'procurementCenter'
                                            },
                                            name: 'procurementListIndex',
                                            component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/procurementList'], resolve)
                                        }, {
                                            path: 'addprocurement',
                                            name: 'addprocurement',
                                            meta: {
                                                name: '新增采购单',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/addprocurement'], resolve)
                                        }, {
                                            path: 'editprocurement',
                                            name: 'editprocurement',
                                            meta: {
                                                name: '编辑采购单',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/editProcurement'], resolve)
                                        }, {
                                            path: 'procureDetails',
                                            name: 'procureDetails',
                                            meta: {
                                                name: '查看采购单',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/procureDetails'], resolve)
                                        }, {
                                            path: 'checkoutProcurement',
                                            name: 'checkoutProcurement',
                                            meta: {
                                                name: '采购单审核',
                                                acKey: 'procurementCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/checkoutProcurement'], resolve)
                                        }
                                        // , {
                                        //     path: 'signSupplier',
                                        //     name: 'signSupplier',
                                        //     meta: {
                                        //         name: '采购单签订',
                                        //         acKey: 'procurementCenter',
                                        //         requestAuth: true
                                        //     },
                                        //     component: resolve => require(['views/pages/procurementCenter/procurementManager/procurementList/signSupplier'], resolve)
                                        // }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'logManager',
                            name: 'procurementCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '采购中心日志'
                            },
                            redirect: {
                                name: 'procurementCenterLogList'
                            },
                            component: resolve => require(['views/pages/procurementCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'procurementLogList',
                                    name: 'procurementCenterLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '采购中心日志列表',
                                        acKey: 'procurementCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/erplogList'], resolve)
                                },
                                {
                                    path: 'supplierLogList',
                                    name: 'supplierLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '供货商日志列表',
                                        acKey: 'procurementCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/erplogList'], resolve)
                                }
                            ]
                        }
                    ]
                },
                {
                    // 物流中心
                    path: 'logisticsCenter',
                    name: 'logisticsCenter',
                    meta: {
                        name: '物流中心',
                        requestAuth: true
                    },
                    redirect: {
                        name: 'logisticsCenterIndex'
                    },
                    component: resolve => require(['views/pages/logisticsCenter/index'], resolve),
                    children: [
                        {
                            path: 'logisticsCenterIndex',
                            name: 'logisticsCenterIndex',
                            meta: {
                                requestAuth: true,
                                acKey: 'logisticsCenter',
                                pageFlag: 1
                            },
                            component: resolve => require(['views/pages/pageIndex'], resolve)
                        },
                        {
                            path: 'freightManager',
                            name: 'freightManager',
                            meta: {
                                name: '运费管理',
                                acKey: 'logisticsCenter',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'freightTemplate'
                            },
                            component: resolve => require(['views/pages/logisticsCenter/freightManager/index'], resolve),
                            children: [
                                {
                                    path: 'freightTemplate',
                                    meta: {
                                        name: '运费模板',
                                        acKey: 'logisticsCenter',
                                        requestAuth: true,
                                        level: 3
                                    },
                                    name: 'freightTemplate',
                                    component: resolve => require(['views/pages/logisticsCenter/freightManager/freightTemplate/index'], resolve),
                                    redirect: {
                                        name: 'freightTemplateIndex'
                                    },
                                    children: [
                                        {
                                            path: 'freightTemplateIndex',
                                            name: 'freightTemplateIndex',
                                            meta: {
                                                name: '',
                                                acKey: 'logisticsCenter',
                                                requestAuth: true,
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/freightManager/freightTemplate/freightTemplate'], resolve)
                                        },
                                        {
                                            path: 'newFreightTemplates',
                                            name: 'newFreightTemplates',
                                            meta: {
                                                name: '基础设置－新增运费模版',
                                                acKey: 'logisticsCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/freightManager/freightTemplate/newFreightTemplates'], resolve)
                                        },
                                        {
                                            path: 'editorFreightTemplates',
                                            name: 'editorFreightTemplates',
                                            meta: {
                                                name: '基础设置－编辑运费模版',
                                                acKey: 'logisticsCenter',
                                                requestAuth: true
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/freightManager/freightTemplate/editorFreightTemplates'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            path: 'logisticsManager',
                            name: 'logisticsManager',
                            meta: {
                                name: '物流派车',
                                acKey: 'logisticsCenter',
                                requestAuth: true
                            },
                            redirect: {
                                name: 'orderList'
                            },
                            component: resolve => require(['views/pages/logisticsCenter/logisticsManager/index'], resolve),
                            children: [
                                {
                                    path: 'orderList',
                                    name: 'orderList',
                                    meta: {
                                        name: '物流单查询',
                                        requestAuth: true,
                                        acKey: 'logisticsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/logisticsCenter/logisticsManager/orderList/orderList'], resolve)
                                },
                                {
                                    path: 'carList',
                                    name: 'carList',
                                    meta: {
                                        name: '车辆记录',
                                        requestAuth: true,
                                        acKey: 'logisticsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/logisticsCenter/logisticsManager/carList/carList'], resolve)
                                },
                                {
                                    path: 'allotCarList',
                                    meta: {
                                        name: '物流派车',
                                        acKey: 'logisticsCenter',
                                        requestAuth: true,
                                        level: 3
                                    },
                                    name: 'allotCarList',
                                    component: resolve => require(['views/pages/logisticsCenter/logisticsManager/allotCarList/index'], resolve),
                                    redirect: {
                                        name: 'allotCarListIndex'
                                    },
                                    children: [
                                        {
                                            path: 'allotCarListIndex',
                                            name: 'allotCarListIndex',
                                            meta: {
                                                acKey: 'logisticsCenter',
                                                requestAuth: true,
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/logisticsManager/allotCarList/allotCarList'], resolve)
                                        },
                                        {
                                            path: 'carSendEdit',
                                            name: 'carSendEdit',
                                            meta: {
                                                name: '修改派车',
                                                acKey: 'logisticsCenter',
                                                requestAuth: true,
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/logisticsManager/allotCarList/carSendEdit'], resolve)
                                        },
                                        {
                                            path: 'carLotEdit',
                                            name: 'carLotEdit',
                                            meta: {
                                                name: '批量派车',
                                                acKey: 'logisticsCenter',
                                                requestAuth: true,
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/logisticsManager/allotCarList/carLotEdit'], resolve)
                                        },
                                        {
                                            path: 'carSend',
                                            name: 'carSend',
                                            meta: {
                                                name: '派车',
                                                acKey: 'logisticsCenter',
                                                requestAuth: true,
                                                level: 3
                                            },
                                            component: resolve => require(['views/pages/logisticsCenter/logisticsManager/allotCarList/carSend'], resolve)
                                        }
                                    ]
                                }
                            ]
                        },
                        { // 日志
                            path: 'logManager',
                            name: 'logisticsCenterlogManager',
                            meta: {
                                requestAuth: true,
                                name: '物流日志'
                            },
                            redirect: {
                                name: 'freightLogList'
                            },
                            component: resolve => require(['views/pages/logisticsCenter/logManager/index'], resolve),
                            children: [
                                {
                                    path: 'freightLogList',
                                    name: 'freightLogList',
                                    meta: {
                                        requestAuth: true,
                                        name: '物流日志列表',
                                        acKey: 'logisticsCenter',
                                        level: 3
                                    },
                                    component: resolve => require(['views/pages/logList'], resolve)
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            path: '/apply',
            name: 'apply',
            meta: {
                name: '入驻首页',
                requestAuth: true
            },
            component: resolve => require(['views/apply/index'], resolve),
            redirect: {
                name: 'applyAccount'
            },
            children: [
                {
                    path: 'applyAccount',
                    name: 'applyAccount',
                    meta: {
                        name: '入驻申请',
                        requestAuth: true,
                        noRequestApprove: true
                    },
                    component: resolve => require(['views/apply/applyAccount/applyAccount'], resolve)
                },
                {
                    path: 'applyData',
                    name: 'applyData',
                    meta: {
                        name: '填写申请资料',
                        requestAuth: true,
                        noRequestApprove: true
                    },
                    component: resolve => require(['views/apply/applyData/applyData'], resolve)
                },
                {
                    path: 'applyResult/:typeId',
                    name: 'applyResult',
                    meta: {
                        name: '鲜易网审核',
                        requestAuth: true,
                        noRequestApprove: true
                    },
                    component: resolve => require(['views/apply/applyResult/applyResult'], resolve)
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
            if (to.meta.noRequestApprove) {
                next();
            } else {
                switch (userInfo.code) {
                    case 1 :
                        // 待审核
                        next({
                            name: 'applyResult',
                            params: {
                                typeId: 1
                            }
                        });
                        break;
                    case 2 :
                        // 审核通过
                        next({
                            name: 'applyResult',
                            params: {
                                typeId: 2
                            }
                        });
                        break;
                    case 3 :
                        // 驳回
                        next({
                            name: 'applyResult',
                            params: {
                                typeId: 3
                            }
                        });
                        break;
                    case 4 :
                        // 已签订
                        next();
                        break;
                    default :
                        // 未入住
                        console.log('待审核页');
                        next({
                            name: 'applyAccount'
                        });
                        break;
                }
            }
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
