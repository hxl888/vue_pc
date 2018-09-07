<template lang="html">
    <div class="buyerInformation resetForm" v-if="buyerInfor">
         <el-form :inline="true" :model="buyerInfor" v-if="buyerInfor"  ref="buyerInfor" label-width="85px">
                <div>
                    <el-form-item label="客户名称：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.loginAccount}}
                        </div>
                    </el-form-item>
                    <el-form-item label="客户账号：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.loginAccount}}
                        </div>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="收货人姓名：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.caConsignee}}
                        </div>
                    </el-form-item>
                    <el-form-item label="收货人手机：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.caPhone}}
                        </div>
                    </el-form-item>
               </div>
               <div>
                    <el-form-item label="收货店铺：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.caStoreName}}
                        </div>
                    </el-form-item>
                    <el-form-item label="发票抬头：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.taxCompany}}
                        </div>
                    </el-form-item>
               </div>
               <!--<div>-->
                    <!--<el-form-item label="业务员姓名" prop="">-->
                        <!--<el-input placeholder="" v-model="buyerInfor.salesmanName"  :disabled="flag" class="xe-input-smal300_hei30"></el-input>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="业务员手机" prop="">-->
                        <!--<el-input placeholder="" v-model="buyerInfor.salesmanPhone"  :disabled="flag" class="xe-input-smal300_hei30"></el-input>-->
                    <!--</el-form-item>-->
                <!--</div>-->
               <div>
                     <el-form-item label="详细地址：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.caArea}}{{buyerInfor.caStreet}}
                        </div>
                    </el-form-item>
                    <!--<el-form-item label="收货地址" prop="">-->
                        <!--<areaselect-tag class="xe-input-smal300_hei30" :disabled="flag" v-model='selecarea' :width='300' :changeOnSelect="true"></areaselect-tag>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item label="详细地址：" prop="">-->
                        <!--<div class="list-infor">-->
                            <!--{{buyerInfor.caStreet}}-->
                        <!--</div>-->
                    <!--</el-form-item>-->
               </div>
               <div>
                   <el-form-item label="税号：" prop="">
                        <div class="list-infor">
                            {{buyerInfor.taxNum}}
                        </div>
                    </el-form-item>
                </div>
         </el-form>
    </div>
</template>

<script>
    import areaselectTag from '@/components/areaSelect/areaSelect';
    export default {
        props: ['buyerInfor'],
        data() {
            return {
                flag: true,
                selecarea: []
            };
        },
        created() {
        },
        methods: {
            handleChange() {}
        },
        watch: {
            buyerInfor() {
                if (this.buyerInfor.caProvinceId && this.buyerInfor.caCityId && this.buyerInfor.caAreaId) {
                    this.selecarea = [parseInt(this.buyerInfor.caProvinceId), parseFloat(this.buyerInfor.caCityId), parseFloat(this.buyerInfor.caAreaId)];
                }
            }
        },
        components: {
            areaselectTag
        }
    };
</script>

<style lang="scss">
    .el-cascader.is-disabled .el-cascader__label {
        color: #687281;
    }
</style>
