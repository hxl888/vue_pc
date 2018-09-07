<script type="text/ecmascript-6">
    import LiItem from './userliItem';
    import NodeItem from './NodeItem';
    export default {
        render(h) {
            let noneItems = {
                on: {
                    noneShows: this.showDialog
                }
            };
            let liItems = {
                props: {
                    datas: this.deItem
                }
            };
            return (
                <div class="zh-commonfn">
                    <div class="zm-top clearfix">
                        <div class="title fl">常用功能</div>
                        <div class="setbtn fr" onClick={this.showDialog}><i class="el-icon-setting"></i>自定义</div>
                    </div>
                    <div class="zm-con">
                        {
                            this.deItemDatas.length ? <LiItem {...liItems}/> : <NodeItem {...noneItems}/>
                        }
                    </div>
                </div>
            );
        },
        props: {
            deItemDatas: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {};
        },
        computed: {
            deItem() {
                return this.deItemDatas;
            }
        },
        methods: {
            showDialog() {
                this.$emit('dialog-show');
            }
        },
        components: {
            LiItem,
            NodeItem
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/styles/rules";
    .zh-commonfn {
        margin: 10px 16px;
        min-height: 100px;
        .zm-top {
            padding: 0 10px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            border-bottom:1px solid $border-color-e5e;
        }
        .title {
            font-weight: 600;
            color: #333;
        }
        .setbtn {
            color: #999;
            i {
                margin-right:5px;
            }
            &:hover {
                cursor: pointer;
                color: #008bca;
            }
        }
    }
    .zm-con {
        padding-top: 10px;
        .zm-con-item {
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            li {
                flex: 0 0 92px;
                min-width: 92px;
                text-align: center;
                margin: 10px;
                a {
                    display: block;
                }
                div {
                    width: 72px;
                    height: 72px;
                    border: 1px solid $main-color;
                    color: $main-color;
                    line-height: 72px;
                    text-align: center;
                    font-size: 26px;
                    border-radius: 50%;
                    overflow: hidden;
                    margin: 0 auto;
                }
                p {
                    margin-top: 5px;
                    line-height: 1.4;
                    font-size: 12px;
                    color: $a-color;
                }
                &:hover {
                    div {
                        background: #008bca;
                        color: #fff;
                    }
                }
            }
        }
        .zm-tips {
            padding:20px 10px;
            text-align: center;
            font-size: 14px;
            a {
                color: $a-color;
                margin: 0 4px;
            }
        }
    }
</style>
