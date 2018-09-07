<template lang="html">
    <div class="m-router-con">
        <div   v-if="htmlloading">
           <ul class="details-content">
                <li class="clearfix">
                    <div class="fl">临时短信标题：</div><div class="fl mobelcontent">{{smsTemp.smsTitle}}</div>
                </li>
                <li class="clearfix">
                    <div class="fl">临时短信内容：</div><div class="fl mobelcontent">{{smsTemp.smsContent}}</div>
                </li>
                <li class="clearfix">
                    <div class="fl">短信发送时间：</div><div class="fl mobelcontent">{{smsTemp.createDate, 'ms' | millisecondFormat}}</div>
                </li>
                <li class="clearfix">
                    <div class="fl">短信发送对象：</div><div class="fl mobelcontent" v-if="smsTemp.count">共{{smsTemp.count}}位，&nbsp;{{smsTemp.sengMobileStr}}</div>
                </li>
           </ul>
           <footer style="margin-top: 20px">
                <el-button type="primary"  @click="goBack" >返回</el-button>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            htmlloading: false,
            smsTemp: {},
            productUrl: '/xe-route/xe-mis'
//                productUrl: ''
        };
    },
    created() {
        this.enquiryForm();
    },
    methods: {
        enquiryForm() {
            let smsNumber = this.$route.query.smsNumber;
            if (smsNumber) {
                let params = {};
                params.smsNumber = smsNumber;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/smsSendRecord/queryTempDetail`,
                    data: params
                }).then((res) => {
                    this.htmlloading = true;
                    this.smsTemp = res.data.smsTemp;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss" scoped>
    .details-content {
        margin-top: -10px;
        li {
            line-height: 32px;
            font-size: 12px;
            color: #687281;
        }
        .mobelcontent {
            max-width: 960px;
            overflow: hidden;
        }
    }
</style>
