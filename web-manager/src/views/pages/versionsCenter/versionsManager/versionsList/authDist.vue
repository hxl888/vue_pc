<template>
    <span>
        <ul class="authdist-item">
            <li
                v-if="itemData[0].acLevel === 1 || itemData[0].acLevel === 2"
                v-for="(item, index) in itemData"
                :key="item.acId"
                :class="{active: tmpItem.acId === item.acId}"
                @click.stop="itemLiClick(item)"
            >
                    {{item.acName}}
            </li>
            <li
                v-if="itemData[0].acLevel === 3"
                v-for="(item, index) in itemData"
                :key="item.acId"
                :class="{active: tmpItem.acId === item.acId}"
                @click.stop="itemLiClick(item)"
            >
                    <el-checkbox :true-label="1" :false-label="0" v-model="item.oauthFlag" @change="checkedThreeChange(item)"></el-checkbox> {{item.acName}}
            </li>
            <li
                v-if="itemData[0].acLevel === 4"
                class="liFour"
            >
                <div class="fourTitle">权限明细</div>
                <div class="fourItemscon">
                    <div class="fourItems" v-for="(item, index) in itemData" :key="item.acId">
                        <el-checkbox :true-label="1" :false-label="0" v-model="item.oauthFlag" @change="checkedFourChange(item)">{{item.acName}}</el-checkbox>
                    </div>
                </div>
            </li>
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
                sublist: this.itemData[0].actionList
            };
        },
        methods: {
            itemLiClick(item) {
                if (this.tmpItem.acId === item.acId) {
                    return;
                }
                const backItem = this.getBaseItem(item);
                this.tmpItem = backItem;
                this.emitUpdate([backItem]);
                console.log(item);
                if (item.actionList && item.actionList.length) {
                    this.sublist = item.actionList;
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
                if (backItem.actionList) {
                    delete backItem.actionList;
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
            checkedThreeChange(item) {
                console.log(item);
                if (item.oauthFlag === 0) {
                    item.actionList.forEach(subitem => {
                        subitem.oauthFlag = 0;
                    });
                }
            },
            checkedFourChange(item) {
                if (item.oauthFlag === 1) {
                    let index = this.getParentDataById(item.parentAcId);
                    this.$parent.itemData[index].oauthFlag = 1;
                }
            },
            getParentDataById(id) {
                let resultIndex = 0;
                if (this.$parent.itemData.length > 1) {
                    this.$parent.itemData.some((item, index) => {
                        if (item.acId === id) {
                            resultIndex = index;
                            return true;
                        }
                    });
                }
                return resultIndex;
            }
        },
        watch: {
            'itemData'(val) {
                this.tmpItem = val[0];
                this.result = [];
                this.sublist = val[0].actionList;
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .authdist-item {
        border: 1px solid #e8e8e8;
        display: inline-block;
        vertical-align: top;
        li {
            width: 158px;
            height: 40px;
            line-height: 20px;
            padding: 10px;
            border-bottom: 1px solid #e8e8e8;
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
        }
    }
</style>
