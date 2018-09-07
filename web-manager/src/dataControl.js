// 上下架状态
export const upFlagStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '上架',
        value: 1
    },
    {
        name: '下架',
        value: 2
    },
    {
        name: '强制下架',
        value: 3
    }
];
// 用户状态
export const lockStatus00 = [
    {
        name: '用户状态',
        value: ''
    },
    {
        name: '启用',
        value: 1
    },
    {
        name: '禁用',
        value: 2
    }
];
// 车辆管理
export const carType = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '车牌号',
        value: 1
    },
    {
        name: '联系人',
        value: 2
    },
    {
        name: '手机号',
        value: 3
    }
];
export const carSource = [
    {
        name: '信息来源',
        value: ''
    },
    {
        name: '云ERP',
        value: 1
    },
    {
        name: '云管理平台',
        value: 2
    }
];
// 用户状态
export const lockStatus02 = [
    {
        name: '角色状态',
        value: ''
    },
    {
        name: '启用',
        value: 1
    },
    {
        name: '禁用',
        value: 2
    }
];
// 默认版本
export const defaultFlag = [
    {
        name: '否',
        value: 1
    },
    {
        name: '是',
        value: 2
    }
];
// 是否收费1：免费 2：收费
export const feeFlag = [
    {
        name: '免费',
        value: 1
    },
    {
        name: '收费',
        value: 2
    }
];
// 用户状态
export const lockStatus01 = [
    {
        name: '启用',
        value: 1
    },
    {
        name: '禁用',
        value: 2
    }
];
// 商品审核状态
export const proStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待审核',
        value: 1
    },
    {
        name: '已审核',
        value: 2
    },
    {
        name: '已驳回',
        value: 3
    }
];
// 入驻状态
export const venSatatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待审核',
        value: 1
    },
    {
        name: '已审核',
        value: 2
    },
    {
        name: '已驳回',
        value: 3
    },
    {
        name: '已签订',
        value: 4
    }
];
// 入驻来源
export const venSource = [
    {
        name: '全部',
        value: ''
    },
    {
        name: 'pc',
        value: 1
    },
    {
        name: '微信',
        value: 2
    }
];
// 冻结状态
export const venFreezeStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未冻结',
        value: 1
    },
    {
        name: '已冻结',
        value: 2
    }
];
// 定价方式
export const priceMethod = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '询报价',
        value: 1
    },
    {
        name: '一口价',
        value: 2
    },
    {
        name: '面议',
        value: 3
    }
];
// 商户性质
export const venTypeData = [
    {
        name: '自营',
        value: 1
    },
    {
        name: '三方',
        value: 2
    }
];
// 支付方式
export const payTypeData = [
    {
        name: '在线支付',
        value: 1
    },
    {
        name: '货到付款',
        value: 2
    }
];
// 支付类型(订单中心)
export const orderPayType = [
    {
        name: '货到付款',
        value: 1
    },
    {
        name: '在线支付',
        value: 4
    }
];
// 资质类型
export const apFlag = [
    {
        name: '组织机构代码证号码',
        value: 1
    },
    {
        name: '税务登记证号码',
        value: 2
    },
    {
        name: '身份证',
        value: 3
    },
    {
        name: '动物防疫条件合格证',
        value: 4
    },
    {
        name: '食品生产许可证',
        value: 5
    },
    {
        name: '身份证授权书',
        value: 6
    },
    {
        name: '食品流通许可证',
        value: 7
    },
    {
        name: '授权书',
        value: 8
    },
    {
        name: '生猪定点屠宰证',
        value: 9
    },
    {
        name: '捕捞许可证',
        value: 10
    },
    {
        name: '养殖证明',
        value: 11
    },
    {
        name: '产品产地证明',
        value: 12
    },
    {
        name: '酒类流通备案登记证',
        value: 13
    },
    {
        name: '进口货物报关单',
        value: 14
    },
    {
        name: '出入境检验检疫合格证明',
        value: 15
    },
    {
        name: '动植物检验检疫证',
        value: 16
    },
    {
        name: '原产地证明',
        value: 17
    },
    {
        name: '无公害产品证书',
        value: 18
    },
    {
        name: '一般纳税人',
        value: 19
    },
    {
        name: '小额纳税人资质',
        value: 20
    },
    {
        name: '其他证明',
        value: 21
    },
    {
        name: '营业执照号码',
        value: 22
    }
];
// 商品计价方式
export const pricingType = [
    {
        name: '数量',
        value: 2
    },
    {
        name: '重量',
        value: 1
    }
];
// 贮存条件
export const reserveCondition = [
    {
        name: '常温'
    },
    {
        name: '冷冻'
    },
    {
        name: '冷藏'
    }
];
// 计量单位
export const pricingTypeInfoMap = {
    1: [
        '千克'
    ],
    2: [
        '件',
        '箱',
        '袋',
        '瓶',
        '个',
        '盒',
        '桶',
        '只',
        '头',
        '条'
    ]
};
// 售卖方式 1 散装 2 包装
export const sellType = [
    {
        name: '散装',
        value: 1
    },
    {
        name: '包装',
        value: 2
    }
];
// 保质期单位 年/月/天
export const shelfLifeUnit = [
    {
        name: '年'
    },
    {
        name: '月'
    },
    {
        name: '天'
    }
];

// 采购业务状态
export const frozenFlag = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '冻品',
        value: 1
    },
    {
        name: '鲜品',
        value: 2
    },
    {
        name: '冻鲜品',
        value: 3
    }
];

// 报价失效时间
export const failureTime = [
    {
        name: '1小时',
        value: 1
    },
    {
        name: '2小时',
        value: 2
    },
    {
        name: '4小时',
        value: 4
    },
    {
        name: '8小时',
        value: 8
    },
    {
        name: '12小时',
        value: 12
    },
    {
        name: '24小时',
        value: 24
    },
    {
        name: '48小时',
        value: 48
    }
];

// 供应商运营模式
export const autoOperationFlag = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '自运营',
        value: 1
    },
    {
        name: '代运营',
        value: 2
    }
];

// 是否审核
export const auditFlag = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '免审',
        value: 1
    },
    {
        name: '审核',
        value: 2
    }
];

// 资质审核状态
export const apStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待审核',
        value: 1
    },
    {
        name: '已审核',
        value: 2
    },
    {
        name: '已驳回',
        value: 3
    }
];
// 是否标准扩展属性
export const normalExtendFlag = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否',
        value: 2
    }
];

// 是否搜索筛选
export const searchFlag = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否',
        value: 2
    }
];

// 是否包邮
export const fareMailFlag = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否',
        value: 2
    }
];

// 邮费计价方式
export const farePricingType = [
    {
        name: '按件',
        value: 1
    },
    {
        name: '按重量',
        value: 2
    }
];

// 是否共享
export const shareFlag = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否',
        value: 2
    }
];
// 验证状态
export const verificationStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待验证',
        value: 1
    },
    {
        name: '验证通过',
        value: 2
    },
    {
        name: '验证不通过',
        value: 3
    }
];

// 注册来源
export const registeredSources = [
    {
        name: '全部',
        value: ''
    },
    {
        name: 'Android',
        value: 1
    },
    {
        name: 'iPhone',
        value: 2
    },
    {
        name: '微信',
        value: 3
    },
    {
        name: '邀请链接',
        value: 4
    },
    {
        name: '地推活动',
        value: 5
    },
    {
        name: 'PC',
        value: 6
    },
    {
        name: '陌生拜访',
        value: 7
    },
    {
        name: '转介绍',
        value: 8
    },
    {
        name: '后台添加',
        value: 9
    }
];

// 用户类型
export const userType = [
    {
        name: '采购商',
        value: 1
    },
    {
        name: '供应商',
        value: 2
    }
];
// 活动类型
export const disType = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '优惠券',
        value: 1
    },
    {
        name: '订单满减',
        value: 2
    },
    {
        name: '订单满折',
        value: 3
    }
];
// 发放方式
export const sendType = [
    // {
    //     name: '全部',
    //     value: ''
    // },
    {
        name: '买家领取',
        value: 1
    },
    {
        name: '指定条件发放',
        value: 2
    },
    {
        name: '指定用户发放',
        value: 3
    }
];
// 发放状态
export const sendStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待发放',
        value: 1
    },
    {
        name: '发放中',
        value: 2
    },
    {
        name: '已发完',
        value: 3
    },
    {
        name: '已结束',
        value: 4
    }
];
// 使用状态
export const useStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '已使用',
        value: 1
    },
    {
        name: '未使用',
        value: 2
    },
    {
        name: '已过期',
        value: 3
    }
];
// 有效时间类型
export const useTimeType = [
    {
        name: '固定时段',
        value: 1
    },
    {
        name: '固定天数',
        value: 2
    }
];
// 使用平台
export const usePlat = [
    {
        name: '全平台',
        value: 1
    },
    {
        name: '移动专享',
        value: 2
    }
];
// 使用范围
export const useRange = [
    {
        name: '全部商品',
        value: 1
    },
    {
        name: '指定品类',
        value: 2
    },
    {
        name: '指定商品',
        value: 3
    }
];
// 短信发送状态
export const smsSendStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '发送成功',
        value: 1
    },
    {
        name: '发送失败',
        value: 2
    }
];
// 会员状态
export const freezeStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '正常',
        value: 1
    },
    {
        name: '冻结',
        value: 2
    }
];
// 展示平台
export const pagePlat = [
    // {
    //     name: '全部',
    //     value: ''
    // },
    {
        name: 'pc端',
        value: 1
    },
    {
        name: '移动端',
        value: 2
    }
];
// 用户类型状态
export const userTypeStatus = [
    {
        name: '开启',
        value: 1
    },
    {
        name: '关闭',
        value: 2
    }
];
// 适用对象
export const smsSendObj = [
    {
        name: '鲜易商城用户',
        value: 1
    },
    {
        name: '鲜易云ERP用户',
        value: 2
    },
    {
        name: '销销乐用户',
        value: 3
    }
];
// 使用状态
export const smsStatus = [
    {
        name: '使用中',
        value: 1
    },
    {
        name: '已禁用',
        value: 2
    }
];
// 发送数量限制
export const numType = [
    {
        name: '不限制',
        value: 1
    },
    {
        name: '限制',
        value: 2
    }
];
// 配送方式
export const shipType = [
    {
        name: '配送',
        value: 1
    },
    {
        name: '委托自提',
        value: 2
    },
    {
        name: '到店自提',
        value: 3
    }
];
// 是否指定车辆
export const appointCarFlag = [
    {
        name: '可指定车辆',
        value: 1
    },
    {
        name: '不可指定车辆',
        value: 2
    }
];
// 是否指定车辆
export const contentType = [
    {
        name: '商品',
        value: 1
    },
    {
        name: '分类',
        value: 2
    },
    {
        name: '商户',
        value: 3
    },
    {
        name: '链接',
        value: 4
    },
    {
        name: '频道页',
        value: 5
    }
];
// 移动端中心（首页管理-焦点图编辑-选择商品弹框中select勾选项）
export const mobiekeyWordsProNamesel = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '商品名称',
        value: 1
    },
    {
        name: '商品货号 ',
        value: 2
    }
];
// 移动端中心（热销商品管理-商品推荐-选择商品弹框中select勾选项）
export const mobiekeyWordsProNamese2 = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '商品名称',
        value: 1
    },
    {
        name: '商品货号 ',
        value: 2
    },
    {
        name: '商品sku编码',
        value: 3
    }
];
// 移动端中心（首页管理-焦点图编辑-选择商户弹框中select勾选项）
export const mobiekeyWordsVenNamesel = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '商户名称',
        value: 1
    },
    {
        name: '商户账号 ',
        value: 2
    },
    {
        name: '商户id ',
        value: 3
    }
];
// 移动端中心（首页管理-广告位编辑）
export const enabledStatus = [
    {
        name: '启用',
        value: 1
    },
    {
        name: '禁用 ',
        value: 2
    }
];
// 版本名称
export const appNameId = [
    {
        name: '鲜易商城',
        value: 1
    },
    {
        name: '消消乐 ',
        value: 2
    }
];
// 终端系统
export const sysType = [
    {
        name: 'Android',
        value: 1
    },
    {
        name: 'ios ',
        value: 2
    }
];
// 是否强制更新
export const forceUpdateFlag = [
    {
        name: '是',
        value: 1
    },
    {
        name: '否 ',
        value: 2
    }
];
// 平台来源
export const source = [
    {
        name: '全部',
        value: ''
    },
    {
        name: 'pc',
        value: 1
    },
    {
        name: '安卓 ',
        value: 2
    },
    {
        name: 'ios ',
        value: 3
    },
    {
        name: '微信商城 ',
        value: 4
    }
];
// 会员管理 -》意见反馈 下拉搜索
export const memberFeedbackSearch = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '手机号',
        value: 1
    },
    {
        name: '联系人 ',
        value: 2
    },
    {
        name: '反馈内容 ',
        value: 3
    }
];
// 订单中心 -》销售管理 销售订单下框框
export const orderCenterlistSearch = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '订单编号',
        value: 1
    },
    {
        name: '关联订单 ',
        value: 2
    },
    {
        name: '客户账号 ',
        value: 3
    }
];
// 订单中心 -》销售管理 销售订单时间是筛选下框框
export const orderCenterlistDateType = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '下单时间',
        value: 1
    },
    {
        name: '支付时间 ',
        value: 2
    },
    {
        name: '发货时间 ',
        value: 3
    },
    {
        name: '完成时间 ',
        value: 4
    }
];
// 订单状态
export const orderStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待付款',
        value: 10
    },
    {
        name: '待发货 ',
        value: 3
    },
    {
        name: '待收货 ',
        value: 2
    },
    {
        name: '已完成 ',
        value: 1
    }
];
// 订单来源
export const orderSource = [
    {
        name: '全部',
        value: ''
    },
    {
        name: 'android ',
        value: 1
    },
    {
        name: 'ios ',
        value: 2
    },
    {
        name: '微信 ',
        value: 3
    },
    {
        name: 'pc ',
        value: 4
    },
    {
        name: '其它 ',
        value: 6
    }
];
// 订单类型
export const orderType = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '一口价',
        value: 1
    },
    {
        name: '询报价 ',
        value: 2
    }
];
// 众品订单
export const zpOrder = [
    {
        name: '是',
        value: 2
    },
    {
        name: '否',
        value: 1
    }
];
// 生成方式
export const orderAutoFlag = [
    {
        name: '自动',
        value: 1
    },
    {
        name: '手动',
        value: 2
    }
];
// 付款状态
export const payStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '已支付',
        value: 1
    },
    {
        name: '未支付',
        value: 2
    }
];
// (订单中心询价单下拉框)
export const ordercenterInquirySelec = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '询价单号',
        value: 1
    },
    {
        name: '订单编号',
        value: 2
    },
    {
        name: '客户账户',
        value: 3
    }
];
// (订单中心询价单时间下拉框)
export const ordercenterdateSearchType = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '报价时间',
        value: 1
    },
    {
        name: '询价时间',
        value: 2
    }
];
// (订单中心询价状态)
export const inquiryStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '待询价',
        value: 0
    },
    {
        name: '已报价',
        value: 1
    },
    {
        name: '已失效',
        value: 2
    },
    {
        name: '询价中',
        value: 3
    },
    {
        name: '已完成',
        value: 4
    },
    {
        name: '已取消',
        value: 5
    },
    {
        name: '已过期',
        value: 6
    },
    {
        name: '已驳回',
        value: 7
    }
];
// 询价类型
export const inquiryType = [
    // {
    //     name: '全部',
    //     value: ''
    // },
    {
        name: '自提价',
        value: 0
    },
    {
        name: '配送价',
        value: 1
    }
];
// 订单中心（已取消销售订单下拉时间框）
export const cancelOrderDateSelec = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '下单时间',
        value: 1
    },
    {
        name: '取消时间',
        value: 5
    },
    {
        name: '支付时间',
        value: 3
    }
];
// 当前发起结算状态
export const bkgeStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未发起结算',
        value: 1
    },
    {
        name: '结算中',
        value: 2
    }
];
// 佣金签订方式
export const signWay = [
    {
        name: '按订单实付金额',
        value: 1
    },
    {
        name: '按实发重量（元/吨）',
        value: 2
    },
    {
        name: '按实发数量',
        value: 3
    }
];
// 佣金设置方式
export const bkgeSetWay = [
    {
        name: '按商户设置佣金',
        value: 1
    },
    {
        name: '按分类设置佣金',
        value: 2
    },
    {
        name: '按商品SKU设置佣金',
        value: 3
    }
];
// 结算方式
export const settleWay = [
    // {
    //     name: '全部',
    //     value: ''
    // },
    {
        name: '按固定周期',
        value: 1
    },
    {
        name: '按固定日',
        value: 2
    }
];
// 结算周期单位
export const periodUnit = [
    {
        name: '日',
        value: 1
    },
    {
        name: '周',
        value: 2
    },
    {
        name: '月',
        value: 3
    }
];
// 按固定日结算
export const weekDay = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '周一',
        value: 1
    },
    {
        name: '周二',
        value: 2
    },
    {
        name: '周三',
        value: 3
    },
    {
        name: '周四',
        value: 4
    },
    {
        name: '周五',
        value: 5
    },
    {
        name: '周六',
        value: 6
    },
    {
        name: '周日',
        value: 7
    }
];
// 账单确认情况
export const confirmBill = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未确认',
        value: 1
    },
    {
        name: '已确认',
        value: 2
    }
];
// 结账状态
export const pbStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未结账',
        value: 1
    },
    {
        name: '部分结账',
        value: 2
    },
    {
        name: '已结账',
        value: 3
    }
];
// 月份
export const monthFloor = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '1月',
        value: 1
    },
    {
        name: '2月',
        value: 2
    },
    {
        name: '3月',
        value: 3
    },
    {
        name: '4月',
        value: 4
    },
    {
        name: '5月',
        value: 5
    },
    {
        name: '6月',
        value: 6
    },
    {
        name: '7月',
        value: 7
    },
    {
        name: '8月',
        value: 8
    },
    {
        name: '9月',
        value: 9
    },
    {
        name: '10月',
        value: 10
    },
    {
        name: '11月',
        value: 11
    },
    {
        name: '12月',
        value: 12
    }
];
// 复核状态
export const reviewStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未复核',
        value: 1
    },
    {
        name: '已复核',
        value: 2
    },
    {
        name: '复核异常',
        value: 3
    }
];
// 作废状态
export const cancelStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '正常',
        value: 1
    },
    {
        name: '已作废',
        value: 2
    }
];
// 收款状态
export const sbillStatus = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '未收款',
        value: 1
    },
    {
        name: '部分收款',
        value: 2
    },
    {
        name: '已收款',
        value: 3
    }
];
// 时间下拉(财务中心收款单列表时间下拉)
export const finaCenterSalesBillTime = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '发货时间',
        value: 1
    },
    {
        name: '收款时间',
        value: 2
    }
];
// 收款方式
export const sbillPayType = [
    {
        name: '全部',
        value: ''
    },
    {
        name: 'pos',
        value: 1
    },
    {
        name: '微信',
        value: 2
    },
    {
        name: '其它',
        value: 3
    }
];
// 时间下拉(CMS中心内容列表搜索下拉)
export const cmsseleArtiSelec = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '栏目名称',
        value: 1
    },
    {
        name: '标题名称',
        value: 2
    }
];
// 文章状态(CMS中心)
export const cmsArticleStatus = [
    {
        name: '已发布',
        value: 1
    },
    {
        name: '草稿',
        value: 2
    }
];
// 标题/内容(信息中心内容列表搜索下拉)
export const smsTemSelec = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '标题',
        value: 1
    },
    {
        name: '内容',
        value: 2
    }
];
// 结算方式财务我的应付账单
export const purchSettleWay = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '账期结算',
        value: 1
    },
    {
        name: '预付款',
        value: 2
    },
    {
        name: '现结',
        value: 3
    }
];
