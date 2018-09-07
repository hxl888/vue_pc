<template>
    <span class="userdistspan">
        <ul class="userdist-item">
            <template v-if="itemData[0].level === 1">
                <li
                    v-for="(item, index) in itemData"
                    :key="item.userCode"
                    :class="{active: tmpItem.userCode === item.userCode}"
                    @click.stop="itemLiClick(item)"
                >
                        {{item.userName}}
                </li>
            </template>
            <template v-if="itemData[0].level === 2">
                <li v-for="(item, index) in itemData" :key="item.userId" class="auto">
                    <el-checkbox class="userCheckbox" :true-label="1" :false-label="0" v-model="item.selected" @change="checkedTwoChange(item, itemData)">{{item.userName}} ({{item.roleName}})</el-checkbox>
                </li>
            </template>
        </ul>
        <authPanel v-if="sublist && sublist.length" :itemData="sublist"></authPanel>
    </span>
</template>
<script type="text/ecmascript-6">
    export default {
        name: 'authPanel',
        props: {
            itemData: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        data() {
            return {
                tmpItem: this.itemData[0],
                result: [],
                sublist: this.itemData[0].userList
            };
        },
        methods: {
            groupChange(item) {
                console.log(item);
            },
            itemLiClick(item) {
                if (this.tmpItem.userCode === item.userCode) {
                    return;
                }
                const backItem = this.getBaseItem(item);
                this.tmpItem = backItem;
                this.emitUpdate([backItem]);
                console.log(item);
                if (item.userList && item.userList.length) {
                    this.sublist = item.userList;
                } else {
                    this.sublist = [];
                }
            },
            updateResult (item) {
                this.result = [this.tmpItem].concat(item);
                this.emitUpdate(this.result);
            },
            getBaseItem (item) {
                let backItem = Object.assign({}, item);
                if (backItem.userList) {
                    delete backItem.userList;
                }
                return backItem;
            },
            emitUpdate (result) {
                if (this.$parent.$options.name === 'authPanel') {
                    this.$parent.updateResult(result);
                } else {
                    this.$parent.updateResult(result);
                }
            },
            checkedTwoChange(item, itemData) {
                if (item.selected === 1) {
                    itemData.forEach(list => {
                        if (list.userId !== item.userId) {
                            list.selected = 0;
                        }
                    });
                }
            }
        },
        watch: {
            'itemData'(val) {
                this.tmpItem = val[0];
                this.result = [];
                this.sublist = val[0].userList;
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .userdist-item {
        border: 1px solid #e8e8e8;
        display: inline-block;
        vertical-align: top;
        li {
            width: 158px;
            line-height: 20px;
            padding: 10px;
            border-bottom: 1px solid #e8e8e8;
            &.auto {
                width: auto;
                max-width: 350px;
            }
            &:last-child {
                border-bottom: none;
            }
            &.active {
                background-color: #f3f3f3;
                color: #2d8cf0;
            }
             &.liFour {
                  width: 300px;
                  height: auto;
                    padding: 0 10px;
                    .fourTitle {
                        height: 40px;
                        line-height: 20px;
                        padding: 10px;
                        font-weight: bold;
                        border-bottom: 1px solid #e8e8e8;
                    }
                    .fourItemscon {
                        overflow: hidden;
                        padding: 10px 0;
                    }
                    .fourItems {
                        float: left;
                        width: 120px;
                        margin: 5px 10px;
                    }
             }
            .userCheckbox {
                .el-checkbox__label {
                    white-space: pre-wrap;
                }
            }
        }
    }
</style>
