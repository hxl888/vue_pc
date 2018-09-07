<template lang="html">
    <el-button :type="buttonType" :size="buttonSize" @click="deleteFn">{{buttonName}}</el-button>
</template>

<script type="text/ecmascript-6">
    import Bus from 'src/vueBus.js';
    export default {
        props: {
            buttonType: {
                type: String,
                default: 'button'
            },
            ajaxParam: {
                type: Object,
                required: false
            },
            isMask: {
                type: Boolean,
                default: true
            },
            buttonSize: {
                type: String,
                default: 'small'
            },
            buttonName: {
                type: String,
                required: true
            },
            ajaxUrl: {
                type: String,
                required: true
            },
            msgType: {
                type: String,
                default: 'warning'
            },
            cancelButtonText: {
                type: String,
                default: '取消'
            },
            confirmButtonText: {
                type: String,
                default: '确认'
            },
            callBackFunction: {
                type: Function,
                required: false
            },
            msgTitle: {
                type: String,
                default: '提示'
            },
            msgContent: {
                type: String,
                default: '此操作将永久删除该文件, 是否继续?'
            }
        },
        data() {
            return {
                messageType: 'success'
            };
        },
        methods: {
            ajaxFn() {
                let _this = this;
                _this.$xeCommonClient.ajax('post', _this.ajaxUrl, _this.ajaxParam, _this, function (res) {
                    if (!_this.callBackFunction) {
                        if (res) {
                            if (res.code !== 200) {
                                _this.messageType = 'error';
                            }
                            _this.$xeMessage({
                                type: _this.messageType,
                                message: res.message
                            });
                            Bus.$emit('pageStatus');
                        }
                    } else {
                        _this.callBackFunction(res);
                    }
                });
            },
            deleteFn() {
                let _this = this;
                if (_this.isMask) {
                    this.$xeMessageBox.confirm(_this.msgContent, _this.msgTitle, {
                        confirmButtonText: this.confirmButtonText,
                        cancelButtonText: this.cancelButtonText,
                        type: this.msgType
                    }).then(() => {
                        _this.ajaxFn();
                    }).catch(() => {
                        console.error('已取消删除');
                    });
                } else {
                    _this.ajaxFn();
                }
            }
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">

</style>
