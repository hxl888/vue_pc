<template>
    <div class="zh-use-dialog">
        <el-dialog title="添加功能" size="small" v-model="show" @close="close">
            <div class="zh-dialog-con" v-loading="loading">
                <div class="zh-con">
                    <el-checkbox-group v-model="checked" @change="handleChange">
                        <div class="zh-con-item" v-for="item in itemDatas" v-if="item.children.length">
                            <div class="zh-con-tit">{{item.fistMenuName}}</div>
                            <div class="zh-con-ul">
                                <ul>
                                    <li v-for="sitem in item.children" :key="sitem.leafMenuId"><el-checkbox :label="sitem">{{sitem.leafMenuName}}</el-checkbox></li>
                                </ul>
                            </div>
                        </div>
                    </el-checkbox-group>
                </div>
                <div class="zh-btns">
                    <el-button type="primary" @click.prevent="btnSureFn">确定</el-button><el-button @click.prevent="close">取消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            value: {
                type: Boolean,
                default: false
            },
            itemDatas: {
                type: Array
            },
            deItemDatas: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                checked: [],
                loading: false,
                notify: null
            };
        },
        computed: {
            show() {
                return this.value;
            },
            deItem: {
                get() {
                    return this.deItemDatas;
                },
                set(val) {
                    this.checked = val;
                }
            },
            checkedIds() {
                return this.checked.map(function (item) {
                    return item.leafMenuId;
                }).join(',');
            }
        },
        watch: {
            'deItemDatas': function (val) {
                this.checked = val;
            }
        },
        methods: {
            handleChange(value) {
                this.deItem = value;
                console.log(this.checked);
            },
            close() {
                this.checked = this.deItem;
                this.$emit('input', false);
            },
            btnSureFn() {
                this.loading = true;
                this.$http({
                    method: 'post',
                    url: '/page/uam/user/main/bindUserMenus',
                    data: {
                        menuIds: this.checkedIds
                    }
                }).then(res => {
                    console.log(res);
                    this.loading = false;
                    this.$emit('on-checked-change', this.checked);
                    this.$emit('input', false);
                    this.notify = this.$notify({
                        title: '成功',
                        message: res.message,
                        type: 'success',
                        duration: 2000
                    });
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            }
        },
        destroyed() {
            if (this.notify) {
                this.notify.close();
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/styles/rules";
    .el-dialog__title {
        font-weight:300;
    }
    .zh-use-dialog {
        .el-dialog--small {
            width: 70%;
            background: $bg-color-f3f;
        }
        .el-dialog__body {
            padding: 0;
            margin-top: 20px;
            background: #fff;
        }
    }
    .zh-dialog-con {
        position: relative;
        .zh-con {
            max-height: 400px;
            overflow-y: scroll;
        }
        .zh-con::-webkit-scrollbar {
            display:block;
            width:10px;
        }
        .zh-con-item {
            padding: 0 20px;
            margin: 10px 0;
            display: flex;
        }
        .zh-con-tit {
            flex: 0 0 90px;
            width: 90px;
            margin-right: 10px;
            font-size: 14px;
            color: #333;
            line-height: 1.2;
            margin: 5px 0;
        }
        .zh-con-ul {
            flex: 1;
            ul {
                display: flex;
                flex-wrap: wrap;
            }
            li {
                flex: 0 0 23%;
                min-width: 23%;
                margin:5px 10px 5px 0;
                .el-checkbox {
                    white-space: normal;
                }
                .el-checkbox__inner {
                    width: 16px;
                    height: 16px;
                }
                .el-checkbox__label {
                    font-size: 12px;
                    color: #333;
                }
                .el-checkbox__inner::after {
                    left: 4px;
                    top: 0px;
                }
            }
        }
    }
    .zh-btns {
        margin-top: 5px;
        padding: 10px;
        background-color: #fff;
        text-align: center;
        box-shadow: 0 0 10px rgba(0,0,0,.1);
    }
</style>
