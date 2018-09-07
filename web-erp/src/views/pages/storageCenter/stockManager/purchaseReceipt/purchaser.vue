<template lang="html">
    <div class="goodsTable">
        <div class="goodsTitle">
            <span>
                仓库: {{detailCode.purch.storeName}}
            </span>
            <span>
                定金: {{detailCode.purch.frontMoney}}
            </span>
            <span>
                采购类型: {{detailCode.purch.purchType | purchTypeToText}}
            </span>
            <span>
                创建人: {{detailCode.purch.createUser}}
            </span>
            <span>
                创建时间: {{detailCode.purch.createDate}}
            </span>
            <span>
                预计到货时间: {{detailCode.purch.expectedArrivalDate}}
            </span>
            <span>
                备注: {{detailCode.purch.remark}}
            </span>
        </div>
        <div class="table-below-tips">
            <div class="inf-tipsBelow">
                计划采购合计: <span>需要采购费用总额:</span>{{Number(detailCode.purch.purchAmount).toFixed(2)}}
            </div>
        </div>
        <div class="table-below-tips">
            <div class="inf-tipsBelow">
                已收货合计: <span>已收货采购费用总额:</span>{{Number(detailCode.purch.arriveAmount).toFixed(2)}}
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['detailCode'],
        data() {
            return {
            };
        },
        methods: {
        }
    };
</script>

<style lang="scss">
.table-below-tips{
    border: 1px solid #ced5de;
    padding: 5px 0;
    margin-top: -1px;
    .inf-tipsBelow{
        padding: 15px 0 15px 20px;
    }
}
.goodsTitle{
    font-size: 12px;
    color: #687281;
    margin-bottom: 11px;
    span{
        margin-right: 30px;
    }
}
</style>
