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
function toIntNumber(val) {
    return parseInt(val);
};

function numberToFixed2(val) {
    return parseFloat(val).toFixed(2);
};
// 可用角色列表启用状态
function lockStatusToText(val) {
    let obj = {
        1: '启用',
        2: '禁用'
    };
    return obj[val];
}
function rejectPayListStatusToText(type) {
    //   paymentList驳回状态
    let obj = {
        1: '正常',
        2: '被驳回'
    };
    return obj[type];
};
function rejectStatusToText(type) {
    //   退货单状态
    let obj = {
        1: '退货中',
        2: '正常完成',
        3: '异常完成'
    };
    return obj[type];
};
function upFlagToText(type) {
    //   下架上架
    let obj = {
        1: '上架',
        2: '下架',
        3: '强制下架'
    };
    return obj[type];
};

function disTypeToText(type) {
    // 优惠类型 1 优惠券 2 订单满减 3 订单满折
    let obj = {
        1: '优惠券',
        2: '订单满减',
        3: '订单满折'
    };
    return obj[type];
};
function proStatusToText(type) {
    let obj = {
        1: '待审核',
        2: '已审核',
        3: '已驳回'
    };
    return obj[type];
};
function sendTypeToText(type) {
    // 优惠券发放方式
    let obj = {
        1: '买家领取',
        2: '指定条件发放',
        3: '指定用户发放'
    };
    return obj[type];
};
function carSendStatusToText(type) {
    // 优惠券发放方式
    let obj = {
        1: '待派车',
        2: '已派车'
    };
    return obj[type];
};

function sendStatusToText(status) {
    // 优惠券发放状态
    let obj = {
        1: '待发放',
        2: '发放中',
        3: '已发完',
        4: '已结束'
    };
    return obj[status];
};
function priceToText(val, type) {
    // 钱保留2位数字
    if (!val) {
        return 0;
    } else {
        return type ? parseInt(val) : parseFloat(val).toFixed(2);
    }
};
function priceToText2(val, none) {
    // 钱保留2位数字
    if (!val) {
        return '';
    } else {
        return none ? parseInt(val) : parseFloat(val).toFixed(2);
    }
};
function numberToText(val) {
    // 空转0
    if (!val) {
        return 0;
    } else {
        return val;
    }
};
function frozenFlagToText(status) {
    // 是否冻品
    let obj = {
        1: '冻品',
        2: '鲜品'
    };
    return obj[status];
};
function useStatusToText(status) {
    // 优惠券使用状态
    let obj = {
        1: '已使用',
        2: '未使用',
        3: '已过期'
    };
    return obj[status];
};

function usePlatToText(status) {
    // 优惠券使用平台
    let obj = {
        1: '全平台',
        2: '移动专享'
    };
    return obj[status];
};

function useRangeToText(status) {
    // 优惠券使用范围
    let obj = {
        1: '全部商品',
        2: '指定品类',
        3: '指定商品'
    };
    return obj[status];
};
// 采购单结算方式
function settlementMethodToText(type) {
    let obj = {
        1: '账期结算',
        2: '预付款',
        3: '现结'
    };
    return obj[type];
};
// 采购单采购类型
function purchTypeToText(type) {
    let obj = {
        1: '零采',
        2: '集采',
        3: '分拨'
    };
    return obj[type];
};
// 采购单采购类型
function purchType02ToText(type) {
    let obj = {
        3: '采购中',
        4: '已完成',
        5: '已完成'
    };
    return obj[type];
};
function pricingTypeToText(type) {
    // 计价方式1：重量 2：数量
    let obj = {
        1: '重量',
        2: '数量'
    };
    return obj[type];
};
function noneToText(val) {
    // 空字段对应无
    let obj = val;
    if (!val) {
        obj = '无';
    }
    return obj;
};
function storeStatusToText(type) {
    // ===
    let obj = {
        1: '禁用',
        2: '启用'
    };
    return obj[type];
}
function storeTypeToText(type) {
    // ===
    let obj = {
        1: '自有仓库',
        2: '三方仓库',
        3: '零采仓库',
        4: '分拨仓库',
        5: '退货仓库'
    };
    return obj[type];
}
// 负库存 记录库存
function negativeFlagToText(type) {
    // ===
    let obj = {
        1: '是',
        2: '否'
    };
    return obj[type];
}
function recordInventoryFlagToText(type) {
    // ===
    let obj = {
        1: '是',
        2: '否'
    };
    return obj[type];
}
function tmsStatusToText(type) {
    // ===
    let obj = {
        1: '未接入',
        2: '已接入'
    };
    return obj[type];
}
function psettleStatusToText(type) {
    // 采购货款状态 1：；2：3:
    let obj = {
        1: '未付款',
        2: '付款中',
        3: '已付款'
    };
    return obj[type];
}
// 订单状态
function orderStatusToText(val) {
    let obj = {
        1: '已完成',
        2: '已发货',
        3: '待发货',
        4: '已取消',
        5: '待分配',
        6: '待审核'
    };
    return obj[val];
};
// 订单来源
function orderSourceToText(val) {
    // ===
    let obj = {
        1: 'android',
        2: 'ios',
        3: '微信',
        4: 'pc',
        5: '代客下单',
        6: '其它'
    };
    return obj[val];
};
// 售后来源
function afterSaleSourceToText(val) {
    // ===
    let obj = {
        1: '线上',
        2: '线下'
    };
    return obj[val];
};
// 售后类型
function afterSaleTypeToText(val) {
    // ===
    let obj = {
        1: '仅退款',
        2: '退款退货'
    };
    return obj[val];
};
// 售后原因
function afterSaleReasonToText(val) {
    // ===
    let obj = {
        1: '商品损坏',
        2: '商品错误',
        3: '无条件退款',
        4: '其他原因'
    };
    return obj[val];
};
// 售后状态
function afterSaleStatusToText(val) {
    // ===
    let obj = {
        1: '待审核',
        2: '已审核',
        3: '审核中',
        4: '已驳回',
        5: '已作废'
    };
    return obj[val];
};
// 客服审核状态、
function serviceCheckStatusToText(val) {
    // ===
    let obj = {
        1: '待审核',
        2: '已审核',
        3: '已驳回'
    };
    return obj[val];
};
// 采购审核状态
function purchaseCheckStatusToText(val) {
    // ===
    let obj = {
        1: '待审核',
        2: '已审核',
        3: '已驳回'
    };
    return obj[val];
};
// 审核状态采购单
function cgdCheckStatusToText(val) {
    // ===
    let obj = {
        1: '待提交',
        2: '待采购审核',
        3: '待财务审核',
        4: '采购驳回',
        5: '财务驳回',
        6: '已审核'
    };
    return obj[val];
};

// 采购状态
function purchStatusToText(val) {
    // ===
    let obj = {
        1: '待提交',
        2: '审核中',
        3: '采购中',
        4: '正常完成',
        5: '异常完成',
        6: '已作废',
        7: '已删除'
    };
    return obj[val];
};
// 财务审核状态
function financeCheckStatusToText(val) {
    // ===
    let obj = {
        1: '待审核',
        2: '已审核',
        3: '已驳回'
    };
    return obj[val];
};

// 付款类型 支付类型
function payTypeToText(val) {
    // ===
    let obj = {
        1: '货到付款',
        2: '到店自提',
        3: '银行汇款',
        4: '在线支付'
    };
    return obj[val];
};
// 支付渠道
function payChannelToText(val) {
    // ===
    let obj = {
        1: '支付宝',
        2: '微信',
        3: '余额',
        4: '网银支付'
    };
    return obj[val];
};
// 付款状态
function payStatusToText(val) {
    // ===
    let obj = {
        1: '已支付',
        2: '未支付'
    };
    return obj[val];
};
// 盘点状态
function checkstateToText(val) {
    // ===
    let obj = {
        1: '盘点中',
        2: '已完成',
        3: '已废弃'
    };
    return obj[val];
};
// 盘点库存状态
function checkStateToText(val) {
    // ===
    let obj = {
        1: '未盘点',
        2: '已盘点'
    };
    return obj[val];
};
// 盘点库存状态
function checkStockresultToText(val) {
    // ===
    let obj = {
        1: '盘盈',
        2: '盘亏',
        3: '正常'
    };
    return obj[val];
};
// 调拨状态
function allotStatusToText(val) {
    let obj = {
        1: '待审核',
        2: '已驳回',
        3: '已废弃',
        4: '已完成'
    };
    return obj[val];
}
// 打印状态
function printStatusToText(val) {
    let obj = {
        1: '已打印',
        2: '未打印'
    };
    return obj[val];
}
// 确认实发数量
function confirmSendNumToText(val) {
    let obj = {
        1: '未确认',
        2: '已确认'
    };
    return obj[val];
}
// 退款状态
function refundStatusToText(val) {
    let obj = {
        1: '待确认退款',
        2: '已确认退款',
        3: '退款失败',
        4: '退款处理中',
        5: '拒绝退款',
        7: '退款成功'
    };
    return obj[val];
}
function inquiryStatusToText(val) {
    let obj = {
        1: '已报价',
        3: '待报价',
        4: '已完成',
        5: '已取消',
        6: '已过期',
        7: '已驳回'
    };
    return obj[val];
}
// 退款类型
function refundTypeToText(val) {
    let obj = {
        1: '取消订单退款',
        2: '实发差异退款',
        3: '售后退款',
        4: '售后退货退款'
    };
    return obj[val];
}

// 订单来源
function quirySourceToText(val) {
    let obj = {
        1: 'android',
        2: 'ios',
        3: '微信',
        4: 'pc',
        5: '其它'
    };
    return obj[val];
}
// 询价类型
function inquiryTypeToText(val) {
    let obj = {
        0: '自提价',
        1: '配送价'
    };
    return obj[val];
}
// 配送方式
function shipTypeToText(val) {
    let obj = {
        1: '配送',
        2: '委托自提',
        3: '到店自提'
    };
    return obj[val];
}
// 转几天几时
function MSFormat(time) {
    let xs = (1000 * 60 * 60);
    let fz = (1000 * 60);
    let t = (1000 * 60 * 60 * 24);
    if (time <= fz) {
        return Math.ceil(time / 1000) + '秒';
    } else if (time <= xs) {
        return Math.floor((time / fz)) + '分钟' + Math.floor((time % fz) / 1000) + '秒';
    } else if (1000 * 60 * 60 * 1 < time && time <= 1000 * 60 * 60 * 24) {
        return Math.floor(time / xs) + '小时' + Math.floor((time % xs) / fz) + '分钟' + Math.floor(((time % xs) % fz) / 1000) + '秒';
    } else if (1000 * 60 * 60 * 24 < time && time <= 1000 * 60 * 60 * 24 * 15) {
        return Math.floor(time / t) + '天' + Math.floor(time % t / xs) + '小时' + Math.floor(((time % t) % xs) / fz) + '分' + Math.floor((((time % t) % xs) % fz) / 1000) + '秒';
    }
};
// 收款状态
function sbillStatusToText(val) {
    let obj = {
        1: '未收款',
        2: '部分收款',
        3: '已收款'
    };
    return obj[val];
}
// 收款状态
function sbillPayTypeToText(val) {
    let obj = {
        1: 'pos',
        2: '微信',
        3: '其它'
    };
    return obj[val];
}
// 复核状态
function reviewStatusToText(val) {
    let obj = {
        1: '未复核',
        2: '已复核',
        3: '复核异常'
    };
    return obj[val];
}
// 结账状态
function pbStatusToText(val) {
    let obj = {
        1: '未结账',
        2: '部分结账',
        3: '已结账'
    };
    return obj[val];
}
// 支出类型
function expenseTypeToText(val) {
    let obj = {
        1: '采购付款',
        2: '其他'
    };
    return obj[val];
}
// 自营结算方式
function purchSettleWayToText(val) {
    let obj = {
        1: '账期结算',
        2: '预付款',
        3: '现结'
    };
    return obj[val];
}
// 采购货款状态
function purchPayStatusToText(val) {
    let obj = {
        1: '未结算',
        2: '结算中',
        3: '已结算'
    };
    return obj[val];
}
export default {
    MSFormat,
    frozenFlagToText,
    proStatusToText,
    millisecondFormat,
    toIntNumber,
    cgdCheckStatusToText,
    purchStatusToText,
    numberToFixed2,
    lockStatusToText,
    rejectPayListStatusToText,
    settlementMethodToText,
    purchTypeToText,
    purchType02ToText,
    rejectStatusToText,
    upFlagToText,
    disTypeToText,
    afterSaleSourceToText,
    afterSaleTypeToText,
    afterSaleReasonToText,
    afterSaleStatusToText,
    serviceCheckStatusToText,
    financeCheckStatusToText,
    purchaseCheckStatusToText,
    sendTypeToText,
    carSendStatusToText,
    sendStatusToText,
    priceToText,
    priceToText2,
    numberToText,
    useStatusToText,
    usePlatToText,
    useRangeToText,
    pricingTypeToText,
    noneToText,
    tmsStatusToText,
    storeStatusToText,
    storeTypeToText,
    negativeFlagToText,
    recordInventoryFlagToText,
    checkstateToText,
    checkStateToText,
    checkStockresultToText,
    psettleStatusToText,
    orderStatusToText,
    orderSourceToText,
    payTypeToText,
    payChannelToText,
    payStatusToText,
    allotStatusToText,
    printStatusToText,
    confirmSendNumToText,
    refundStatusToText,
    inquiryStatusToText,
    refundTypeToText,
    quirySourceToText,
    inquiryTypeToText,
    shipTypeToText,
    sbillStatusToText,
    sbillPayTypeToText,
    reviewStatusToText,
    pbStatusToText,
    expenseTypeToText,
    purchSettleWayToText,
    purchPayStatusToText
};
