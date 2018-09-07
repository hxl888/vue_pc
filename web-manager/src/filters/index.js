/**
 * 毫秒转换成日期
 *
 */
function millisecondFormat(time, flag) {
    if (typeof time === 'number') {
        var oDate = new Date(time);
        var year = oDate.getFullYear();
        var month = (oDate.getMonth() + 1) >= 10 ? oDate.getMonth() + 1 : '0' + (oDate.getMonth() + 1);
        var date = oDate.getDate() >= 10 ? oDate.getDate() : '0' + oDate.getDate();
        var hours = oDate.getHours() >= 10 ? oDate.getHours() : '0' + oDate.getHours();
        var minutes = oDate.getMinutes() >= 10 ? oDate.getMinutes() : '0' + oDate.getMinutes();
        var seconds = oDate.getSeconds() >= 10 ? oDate.getSeconds() : '0' + oDate.getSeconds();
        if (flag === 'ms') {
            return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
        } else {
            return `${year}-${month}-${date}`;
        }
    } else {
        return '无';
    }
};
// 是否审核
function auditFlagfiter(val) {
    let obj = {
        1: '免审',
        2: '非免审'
    };
    return obj[val];
}
// 运营模式
function autoOperationFlagfiter(val) {
    let obj = {
        1: '自运营',
        2: '代运营'
    };
    return obj[val];
}
// 确认收货范围
function receivingTimePlatToText(val) {
    let obj = {
        1: '全平台'
    };
    return obj[val];
}
// 是否收费1：免费 2：收费
function feeFlagToText(val) {
    let obj = {
        1: '免费',
        2: '收费'
    };
    return obj[val];
}
// 信息来源
function carSourceToText(val) {
    let obj = {
        1: '云ERP ',
        2: '云管理平台'
    };
    return obj[val];
}
function noneToText(val) {
    // 空字段对应无
    let obj = val;
    if (!val) {
        obj = '无';
    }
    return obj;
};
// 可用角色列表启用状态
function lockStatusToText(val) {
    let obj = {
        1: '启用',
        2: '禁用'
    };
    return obj[val];
}
// 角色状态
function roleIdToText(val) {
    let obj = {
        1: '启用',
        2: '冻结'
    };
    return obj[val];
}

// 冻结状态
function venFreezeStatusfiter(val) {
    let obj = {
        1: '未冻结',
        2: '已冻结'
    };
    return obj[val];
}
// 支付方式
function payTypefiter(val) {
    let obj = {
        1: '在线支付',
        2: '货到付款',
        3: '在线支付    货到付款'
    };
    return obj[val];
}
// 支付类型（订单中心）
function payTypeOrderfiter(val) {
    let obj = {
        1: '货到付款',
        2: '到店自提',
        3: '银行汇款',
        4: '在线支付'
    };
    return obj[val];
}
// 商户性质
function venTypefiter(val) {
    let obj = {
        1: '自营',
        2: '三方'
    };
    if (!val || val === null || null === '') {
        return '无';
    } else {
        return obj[val];
    }
}
// 审核状态
function venSatatusfiter(val) {
    let obj = {
        1: '待审核',
        2: '已审核',
        3: '驳回',
        4: '已签订'
    };
    return obj[val];
}
// 企业类型
function comTypefiter(val) {
    let obj = {
        1: '企业类型',
        3: '生产加工厂',
        4: '代理商',
        5: '品牌商',
        6: '经销商',
        7: '进出口贸易',
        8: '协会合作社'
    };
    return obj[val];
}
// 企业性质
function venPropertiesfiter(val) {
    let obj = {
        1: '公司企业',
        3: '个体工商户',
        4: '个人',
        9: '其他性质'
    };
    return obj[val];
}
// 主营类型
function businessTypefiter(val) {
    let obj = {
        1: '肉禽蛋类',
        2: '海鲜水产',
        3: '水果蔬菜',
        4: '干调类',
        5: '蔬菜类',
        6: '粮油副食',
        7: '酒水饮品',
        8: '酒店用品',
        9: '进口食品'
    };
    return obj[val];
}
// 资质标识
function apFlagfiter(val) {
    let obj = {
        1: '组织机构代码证号码',
        2: '税务登记证号码',
        3: '身份证',
        4: '动物防疫条件合格证',
        5: '食品生产许可证',
        6: '身份证授权书',
        7: '食品流通许可证',
        8: '授权书',
        9: '生猪定点屠宰证',
        10: '捕捞许可证',
        11: '养殖证明',
        12: '产品产地证明',
        13: '酒类流通备案登记证',
        14: '进口货物报关单',
        15: '出入境检验检疫合格证明',
        16: '动植物检验检疫证',
        17: '原产地证明',
        18: '无公害产品证书',
        19: '一般纳税人',
        20: '小额纳税人资质',
        21: '其他证明',
        22: '营业执照号码'
    };
    return obj[val];
}
// 商品是否上架
function upFlagfiter(val) {
    let obj = {
        1: '上架',
        2: '下架',
        3: '强制下架'
    };
    return obj[val];
}
// 是否冻品
function frozenFlagfiter(val) {
    let obj = {
        1: '是',
        2: '否'
    };
    return obj[val];
}
// 采购业务状态
function frozenFlagtypeofiter(val) {
    let obj = {
        1: '冻品',
        2: '鲜品',
        3: '冻鲜品'
    };
    return obj[val];
}
// 定价方式
function priceMethodfiter(val) {
    let obj = {
        1: '询报价',
        2: '一口价',
        3: '面议'
    };
    return obj[val];
}
// 售卖方式
function sellTypefiter(val) {
    let obj = {
        1: '散装',
        2: '包装'
    };
    return obj[val];
}
// 计价方式
function pricingTypefiter(val) {
    let obj = {
        1: '重量',
        2: '数量'
    };
    return obj[val];
}
// 用户类型 --
function userTypefiter(val) {
    let obj = {
        1: '采购商',
        2: '供应商'
    };
    return obj[val];
}
// 验证状态
function verifyFlagfiter(val) {
    let obj = {
        1: '待验证',
        2: '验证通过',
        3: '验证不通过'
    };
    return obj[val];
}
// 注册来源
function regSourcefiter(val) {
    let obj = {
        1: 'Android',
        2: 'iPhone',
        3: '微信',
        4: '邀请链接',
        5: '地推活动',
        6: 'PC',
        7: '陌生拜访',
        8: '转介绍',
        9: '后台添加'
    };
    return obj[val];
}
// 活动类型
function disTypefilter(val) {
    let obj = {
        1: '优惠券',
        2: '订单满减',
        3: '订单满折'
    };
    return obj[val];
}
// 发放方式
function sendTypefilter(val) {
    let obj = {
        1: '买家领取',
        2: '指定条件发放',
        3: '指定用户发放'
    };
    return obj[val];
}
// 发放状态
function sendStatusfilter(val) {
    let obj = {
        1: '待发放',
        2: '发放中',
        3: '已发完',
        4: '已结束'
    };
    return obj[val];
}
// 使用状态
function useStatusfilter(val) {
    let obj = {
        1: '已使用',
        2: '未使用',
        3: '已过期'
    };
    return obj[val];
}
// 使用平台
function usePlatfilter(val) {
    let obj = {
        1: '全平台',
        2: '移动专享'
    };
    return obj[val];
}
// 使用范围
function useRangefilter(val) {
    let obj = {
        1: '全部商品',
        2: '指定品类',
        3: '指定商品'
    };
    return obj[val];
}
// 有效时间类型
function useTimeTypefilter(val) {
    let obj = {
        1: '固定时段',
        2: '固定天数'
    };
    return obj[val];
}
// 发送状态
function smsSendStatusfilter(val) {
    let obj = {
        1: '发送成功',
        2: '发送失败'
    };
    return obj[val];
}
// 会员状态
function freezeStatusfilter(val) {
    let obj = {
        1: '正常',
        2: '冻结'
    };
    return obj[val];
}
// 展示终端
function pagePlatfilter(val) {
    let obj = {
        1: 'pc端',
        2: '移动端'
    };
    return obj[val];
}
// 类型状态
function userTypeStatusfilter(val) {
    let obj = {
        1: '开启',
        2: '关闭'
    };
    return obj[val];
}
// 适用对象
function smsSendObjfilter(val) {
    let obj = {
        1: '鲜易商城用户',
        2: '鲜易云ERP用户',
        3: '销销乐用户'
    };
    return obj[val];
}
// 适用对象
function numTypefilter(val) {
    let obj = {
        1: '不限制',
        2: '限制'
    };
    return obj[val];
}
// 使用状态
function smsStatusfilter(val) {
    let obj = {
        1: '使用中',
        2: '已禁用'
    };
    return obj[val];
}
// 联系人类型
function contactTypefilter(val) {
    let obj = {
        1: '店铺负责人',
        2: '运营联系人',
        3: '售后联系人',
        4: '财务联系人'
    };
    return obj[val];
}
// 配送方式
function shipTypefilter(val) {
    let obj = {
        1: '配送',
        2: '委托自提',
        3: '到店自提'
    };
    return obj[val];
}
// 是否指定车辆
function appointCarFlagfilter(val) {
    let obj = {
        1: '可指定车辆',
        2: '不可指定车辆'
    };
    return obj[val];
}
// 状态
function enabledStatusfilter(val) {
    let obj = {
        1: '启用',
        2: '禁用'
    };
    return obj[val];
}
// 内容类型
function contentTypefilter(val) {
    let obj = {
        1: '商品',
        2: '分类',
        3: '商户',
        4: '链接',
        5: '频道页',
        6: '底部icon'
    };
    return obj[val];
}
// 版本名称
function appNameIdfilter(val) {
    let obj = {
        1: '鲜易商城',
        2: '消消乐'
    };
    return obj[val];
}
// 终端系统
function sysTypefilter(val) {
    let obj = {
        1: 'Android',
        2: 'ios'
    };
    return obj[val];
}
// 是否强制更新
function forceUpdateFlagfilter(val) {
    let obj = {
        1: '是',
        2: '否'
    };
    return obj[val];
}
// 版本名称
function statusfilter(val) {
    let obj = {
        1: '启用',
        2: '禁用'
    };
    return obj[val];
}
// 版本名称
function sourcefilter(val) {
    let obj = {
        1: 'pc',
        2: '安卓',
        3: 'ios',
        4: '微信商城'
    };
    return obj[val];
}
function priceToText(val) {
    // 钱保留2位数字
    if (!val) {
        return 0;
    } else {
        return parseFloat(val).toFixed(2);
    }
};
// 订单状态
function orderStatusfilter(val) {
    let obj = {
        1: '已完成',
        2: '已发货',
        3: '待发货',
        4: '已取消',
        5: '待分配',
        6: '待审核',
        10: '待处理',
        11: '支付处理中'
    };
    return obj[val];
}
// 订单来源
function orderSourcefilter(val) {
    let obj = {
        1: 'android',
        2: 'ios',
        3: '微信',
        4: 'pc',
        5: '代客下单',
        6: '其它'
    };
    return obj[val];
}
// 生成订单方式
function orderAutoFlagfilter(val) {
    let obj = {
        1: '自动',
        2: '手动'
    };
    return obj[val];
}
// 付款状态
function payStatusfilter(val) {
    let obj = {
        1: '已支付',
        2: '未支付'
    };
    return obj[val];
}
// 定价方式
function orderTypefiter(val) {
    let obj = {
        1: '一口价',
        2: '询报价'
    };
    return obj[val];
}
// 询价状态
function inquiryStatusfilter(val) {
    let obj = {
        0: '待询价',
        1: '已报价',
        2: '已失效',
        3: '询价中',
        4: '已完成',
        5: '已取消',
        6: '已过期',
        7: '已驳回'
    };
    return obj[val];
}
// 询价类型
function inquiryTypefiter(val) {
    let obj = {
        0: '自提价',
        1: '配送价'
    };
    return obj[val];
}
// 当前发起结算状态
function bkgeStatusfiter(val) {
    let obj = {
        1: '未发起结算',
        2: '结算中'
    };
    return obj[val];
}
// 佣金签订方式
function signWayfiter(val) {
    let obj = {
        1: '按订单实付金额',
        2: '按实发重量（元/吨）',
        3: '按实发数量'
    };
    return obj[val];
}
// 结算方式
function settleWayfiter(val) {
    let obj = {
        1: '按固定周期',
        2: '按固定日'
    };
    return obj[val];
}
// 结算周期单位
function periodUnitfiter(val) {
    let obj = {
        1: '天',
        2: '周',
        3: '月'
    };
    return obj[val];
}
// 佣金设置方式
function bkgeSetWayfiter(val) {
    let obj = {
        1: '按商户设置佣金',
        2: '按分类设置佣金',
        3: '按商品SKU设置佣金'
    };
    return obj[val];
}
// 结账状态
function pbStatusfiter(val) {
    let obj = {
        1: '未结账',
        2: '部分结账',
        3: '已结账'
    };
    return obj[val];
}
// 支出类型
function expenseTypefiter(val) {
    let obj = {
        1: '采购付款',
        2: '其他'
    };
    return obj[val];
}
// 复核状态
function reviewStatusfiter(val) {
    let obj = {
        1: '未复核',
        2: '已复核',
        3: '复核异常'
    };
    return obj[val];
}
// 账单确认情况
function confirmBillfiter(val) {
    let obj = {
        1: '未确认',
        2: '已确认'
    };
    return obj[val];
}
// 平台结算方式
function bkgeSettleWayfiter(val) {
    let obj = {
        1: '按固定周期',
        2: '按固定日'
    };
    return obj[val];
}
// 作废状态
function cancelStatusfiter(val) {
    let obj = {
        1: '正常',
        2: '已作废'
    };
    return obj[val];
}
// 采购货款状态
function purchPayStatusfiter(val) {
    let obj = {
        1: '未结算',
        2: '结算中',
        3: '已结算'
    };
    return obj[val];
}
// 收款状态
function sbillStatusfiter(val) {
    let obj = {
        1: '未收款',
        2: '部分收款',
        3: '已收款'
    };
    return obj[val];
}
// 收款状态
function sbillPayTypefiter(val) {
    let obj = {
        1: 'pos',
        2: '微信',
        3: '其它'
    };
    return obj[val];
}
// 发票内容
function taxContentfiter(val) {
    let obj = {
        1: '明细',
        2: '生鲜'
    };
    return obj[val];
}
// 文章状态
function cmsArticleStatusfiter(val) {
    let obj = {
        1: '已发布',
        2: '草稿'
    };
    return obj[val];
}
// 结算方式
function purchSettleWayfiter(val) {
    let obj = {
        1: '账期结算',
        2: '预付款',
        3: '现结'
    };
    return obj[val];
}
// 首页数据统计请求类型
function homepageDatafiter(val) {
    let obj = {
        userNum: '本月新增用户',
        waitProNum: '待审核商品',
        waitSalesNum: '待审核促销',
        applyVenNum: '本月商户试用申请',
        orderNum: '本月订单数',
        signVenNum: '本月签订商户',
        waitVenNum: '待审核商户',
        waitSignVenNum: '待签订商户'
    };
    return obj[val];
}
export default {
    contactTypefilter,
    smsStatusfilter,
    numTypefilter,
    smsSendObjfilter,
    userTypeStatusfilter,
    pagePlatfilter,
    freezeStatusfilter,
    smsSendStatusfilter,
    useTimeTypefilter,
    useRangefilter,
    usePlatfilter,
    useStatusfilter,
    sendStatusfilter,
    sendTypefilter,
    disTypefilter,
    regSourcefiter,
    verifyFlagfiter,
    userTypefiter,
    pricingTypefiter,
    sellTypefiter,
    priceMethodfiter,
    frozenFlagtypeofiter,
    frozenFlagfiter,
    upFlagfiter,
    apFlagfiter,
    businessTypefiter,
    venPropertiesfiter,
    comTypefiter,
    venSatatusfiter,
    venTypefiter,
    payTypefiter,
    venFreezeStatusfiter,
    noneToText,
    autoOperationFlagfiter,
    receivingTimePlatToText,
    feeFlagToText,
    carSourceToText,
    lockStatusToText,
    roleIdToText,
    auditFlagfiter,
    millisecondFormat,
    shipTypefilter,
    appointCarFlagfilter,
    enabledStatusfilter,
    contentTypefilter,
    appNameIdfilter,
    sysTypefilter,
    forceUpdateFlagfilter,
    statusfilter,
    sourcefilter,
    priceToText,
    orderStatusfilter,
    orderSourcefilter,
    orderAutoFlagfilter,
    payTypeOrderfiter,
    payStatusfilter,
    orderTypefiter,
    inquiryStatusfilter,
    inquiryTypefiter,
    bkgeStatusfiter,
    signWayfiter,
    settleWayfiter,
    periodUnitfiter,
    bkgeSetWayfiter,
    pbStatusfiter,
    expenseTypefiter,
    reviewStatusfiter,
    confirmBillfiter,
    bkgeSettleWayfiter,
    cancelStatusfiter,
    purchPayStatusfiter,
    sbillStatusfiter,
    sbillPayTypefiter,
    taxContentfiter,
    cmsArticleStatusfiter,
    purchSettleWayfiter,
    homepageDatafiter
};
