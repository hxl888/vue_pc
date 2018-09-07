<template lang="html">
    <div>
        <div class="yam_tim">
           <el-button :plain="true" v-if="showTime" :class="{phone_cod: !pho_sur}" @click.prevent.stop="getCode">获取验证码</el-button>
           <el-button type="primary"  v-else :disabled="true">{{timeTex}}</el-button>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: {
            smsboxset: {
                type: Object
            }
        },
        data() {
            return {
                timeTex: '',
                countNum: 60, // 需要传的倒计时秒数 默认为60s
                showTime: true,
                pho_sur: false, // 手机号验证通过返回true
                Url: null, // 需要传的发送验证码的url路径
                phone: null // 需要发送验证码的手机号
            };
        },
        watch: {
            'smsboxset.pho_sur': function(n) {
                this.pho_sur = n;
            },
            'smsboxset.Url': function(n) {
                this.Url = n;
            },
            'smsboxset.phone': function(n) {
                this.phone = n;
            }
        },
        methods: {
            getCode() {
                //  验证码发送
                let that = this;
                if (that.pho_sur) {
                    that.$http({
                        method: 'post',
                        url: that.Url,
                        data: {
                            mobile: that.phone
                        }
                    }).then(res => {
                        console.log(res);
                        if (res.code === 200) {
                            that.remainingTime();
                        } else {
                            that.$xeMessage.error(res.message);
                        };
                    }).catch(error => {
                        console.log(error);
                        that.$xeMessage.error(error.message);
                    });
                }
            },
            remainingTime() {
                let that = this;
                clearInterval(that.timer);
                that.timer = setInterval(() => {
                    that.countNum --;
                    that.showTime = false;
                    that.timeTex = that.countNum + 's';
                    if (that.countNum === 0) {
                        clearInterval(that.timer);
                        that.showTime = true;
                        that.countNum = 60;
                        that.timeTex = '获取验证码';
                    }
                }, 1000);
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    .yam_tim {
        width: 100%;
        button{
            width: 100%;
            &.phone_cod {
                background: #eef1f6;
                color: #1f2d3d;
                border: none;
            }
        }
    }
</style>
