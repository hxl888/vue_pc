<template lang="html">
    <div class="goodsTable">
        <div class="goodsTitle">
            <span>
                供货商: {{supplierName}}
            </span>
            <span>
                供货商电话: {{linkPhone}}
            </span>
            <span>
                供货商手机: {{linkMobile}}
            </span>
            <span>
                结算方式: {{settlementWay | settlementMethodToText}}
            </span>
        </div>
    </div>
</template>
<script>
    export default {
        props: ['detailCode'],
        data() {
            return {
                supplierName: '',
                linkPhone: '',
                linkMobile: '',
                settlementWay: ''
            };
        },
        methods: {
        },
        watch: {
            'detailCode.supplier'(n) {
                if (n) {
                    this.supplierName = this.detailCode.supplier.supplierName;
                    this.linkPhone = this.detailCode.supplier.linkPhone;
                    this.linkMobile = this.detailCode.supplier.linkMobile;
                    this.settlementWay = this.detailCode.supplier.settlementWay;
                }
            }
        }
    };
</script>

<style lang="scss">
.goodsTitle{
    font-size: 12px;
    color: #687281;
    margin-bottom: 11px;
    span{
        margin-right: 30px;
    }
}
</style>
