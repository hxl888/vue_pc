
export default [
    {
        name: 'Index',
        path: '/',
        redirect: {name: 'CustomerListPage'}
    },
    {
        meta: {
            name: '客户中心'
        },
        name: 'CustomerListPage',
        path: '/csc',
        redirect: {name: 'toMaintainCscCustomerListPage'},
        component: resolve => require(['views/csc/index'], resolve),
        children: [
            {
                meta: {
                    name: '客户档案',
                    auth: true
                },
                name: 'toMaintainCscCustomerListPage',
                path: 'customer/toMaintainCscCustomerListPage',
                component: resolve => require(['views/csc/toMaintainCscCustomerListPage/'], resolve)
            },
            {
                meta: {
                    name: '编辑客户档案',
                    auth: true,
                    level: 3
                },
                name: 'editRecord',
                path: 'customer/editRecord',
                component: resolve => require(['views/csc/toMaintainCscCustomerListPage/editClient/'], resolve)
            },
            {
                meta: {
                    name: '添加客户档案',
                    auth: true,
                    level: 3
                },
                name: 'toClient',
                path: 'customergoods/toMaintainCscCustomerGoodsListPage/toClient',
                component: resolve => require(['views/csc/toMaintainCscCustomerListPage/newClient'], resolve)
            },
            {
                meta: {
                    name: '货品档案',
                    auth: true
                },
                name: 'toMaintainCscCustomerGoodsListPage',
                path: 'customergoods/toMaintainCscCustomerGoodsListPage',
                component: resolve => require(['views/csc/toMaintainCscCustomerGoodsListPage/'], resolve)
            },
            {
                meta: {
                    name: '添加货品档案',
                    auth: true,
                    level: 3
                },
                name: 'toAddGoods',
                path: 'customergoods/toMaintainCscCustomerGoodsListPage/toAddGoods',
                component: resolve => require(['views/csc/toMaintainCscCustomerGoodsListPage/addGoods'], resolve)
            },
            {
                meta: {
                    name: '添加客户仓库',
                    auth: true,
                    level: 3
                },
                name: 'toAddStorehouse',
                path: 'customergoods/toMaintainCustomerWarehouseListPage/toAddStorehouse',
                component: resolve => require(['views/csc/toMaintainCustomerWarehouseListPage/addStorehouse'], resolve)
            },
            {
                meta: {
                    name: '添加收发货方档案',
                    auth: true,
                    level: 3
                },
                name: 'toAddprocess',
                path: 'customergoods/toMainReceivAndDispatchFilePage/toAddprocess',
                component: resolve => require(['views/csc/toMainReceivAndDispatchFilePage/addProcess'], resolve)
            },
            {
                meta: {
                    name: '收发货方档案',
                    auth: true
                },
                name: 'toMainReceivAndDispatchFilePage',
                path: 'receive/toMainReceivAndDispatchFilePage',
                component: resolve => require(['views/csc/toMainReceivAndDispatchFilePage/'], resolve)
            },
            {
                meta: {
                    name: '供应商档案',
                    auth: true
                },
                name: 'toMaintainOperCscSupplierListPage',
                path: 'supplier/oper/toMaintainOperCscSupplierListPage',
                component: resolve => require(['views/csc/toMaintainOperCscSupplierListPage/'], resolve)
            },
            {
                meta: {
                    name: '新增供应商档案',
                    auth: true,
                    level: 3
                },
                name: 'addSupplierlist',
                path: 'supplier/oper/addSupplierlist',
                component: resolve => require(['views/csc/toMaintainOperCscSupplierListPage/newSupplier'], resolve)
            },
            {
                meta: {
                    name: '编辑供应商档案',
                    auth: true,
                    level: 3
                },
                name: 'toEditSupplier',
                path: 'supplier/oper/toEditSupplier',
                component: resolve => require(['views/csc/toMaintainOperCscSupplierListPage/editSupplier'], resolve)
            },
            {
                meta: {
                    name: '修改供应商联系人',
                    auth: true,
                    level: 3
                },
                name: 'ModifySupplierContact',
                path: 'supplier/oper/ModifySupplierContact',
                component: resolve => require(['views/csc/toMaintainOperCscSupplierListPage/ModifySupplierContact'], resolve)
            },
            {
                meta: {
                    name: '增加供应商联系人',
                    auth: true,
                    level: 3
                },
                name: 'AddSupplierContact',
                path: 'supplier/oper/toViewSupplierNamePage',
                component: resolve => require(['views/csc/toMaintainOperCscSupplierListPage/AddSupplierContact'], resolve)
            },
            {
                meta: {
                    name: '供应商列表',
                    auth: true,
                    level: 3
                },
                name: 'curNamelist',
                path: 'supplier/oper/curNamelist',
                component: resolve => require(['views/csc/toMaintainOperCscSupplierListPage/curNamelist'], resolve)
            },
            {
                meta: {
                    name: '包装档案',
                    auth: true
                },
                name: 'toMaintainCscPackingListPage',
                path: 'packing/toMaintainCscPackingListPage',
                component: resolve => require(['views/csc/toMaintainCscPackingListPage/'], resolve)
            },
            {
                meta: {
                    name: '包装档案详情',
                    auth: true,
                    level: 3
                },
                name: 'viewPackingList',
                path: 'packing/viewPackingList',
                component: resolve => require(['views/csc/toMaintainCscPackingListPage/viewPackingList'], resolve)
            },
            {
                meta: {
                    name: '客户创建仓库',
                    auth: true
                },
                name: 'toMaintainCustomerWarehouseListPage',
                path: 'customerwarehouse/toMaintainCustomerWarehouseListPage',
                component: resolve => require(['views/csc/toMaintainCustomerWarehouseListPage/'], resolve)
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
