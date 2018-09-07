<template lang="html">
    <div class="m-home-item linkitem">
        <router-link tag="a" :to="{name: 'memberList_s'}">
            <span class="linkitem-01"></span>
            销售订单
        </router-link>
        <router-link tag="a" :to="{name: 'inquiryList'}">
           <span class="linkitem-02"></span>
            询价单
        </router-link>
        <router-link tag="a" :to="{name: 'merchantlist'}">
           <span class="linkitem-03"></span>
            商户列表
        </router-link>
        <router-link tag="a" :to="{name: 'table-look-ups'}">
             <span class="linkitem-04"></span>
            商品一览表
        </router-link>
         <router-link tag="a" :to="{name: 'memberList_s'}">
              <span class="linkitem-05"></span>
            会员列表
        </router-link>
         <router-link tag="a" :to="{name: 'receiptList'}">
              <span class="linkitem-06"></span>
            收款单列表
        </router-link>
         <router-link tag="a" :to="{name: 'payableBillList'}">
              <span class="linkitem-07"></span>
            平台应付账单
        </router-link>
         <router-link tag="a" :to="{name: 'couponList_s'}">
                <span class="linkitem-08"></span>
            优惠券列表
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'linkitem'
};
</script>
