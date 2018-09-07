<template>
    <div class='jtBox'>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="date" label="数量区间">
                <template scope='scope'>
                    <div class='jt-endnum-div' v-if='scope.$index === 0 && scope.row.startNum === 1'>1</div>
                    <el-input v-else class="jt-num-input" v-model.number.lazy='scope.row.startNum'></el-input>
                    <span class='jt-num-stripe'>-</span>
                    <div class='jt-endnum-div' v-if='scope.row.endNum === 999999'>以上</div>
                    <el-input v-else-if="scope.$index === 0" class="jt-num-input" v-model.number.lazy='scope.row.endNum' @input="tableData[1].startNum = tableData[0].endNum + 1"></el-input>
                    <el-input v-else-if="scope.$index === 1" class="jt-num-input" v-model.number.lazy='scope.row.endNum' @input="tableData[2].startNum = tableData[1].endNum + 1"></el-input>
                    <el-input v-else class="jt-num-input" v-model.number.lazy='scope.row.endNum'></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="单价(元)">
                <template scope='scope'>
                    <el-input class="jt-num-input" v-model.number.lazy='scope.row.stepPrice'></el-input>
                    <span class="jt-btn iconfont icon-zengjia" :class="{'disabled': tableData.length > 2}" v-if='scope.$index === 0' @click.prevent='jtBtnAdd'></span>
                    <span class="jt-btn iconfont icon-jianshao" v-else-if='scope.$index === 1 && tableData.length > 2' @click.prevent='jtBtnDel'></span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        props: {
            defaultData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                tableData: [{
                    startNum: 1,
                    endNum: '',
                    stepPrice: ''
                },
                {
                    startNum: '',
                    endNum: 999999,
                    stepPrice: ''
                }]
            };
        },
        created() {
            this.tableData = this.defaultData;
        },
        methods: {
            jtBtnAdd() {
                if (this.tableData.length > 2) {
                    this.$xeMessage.error('最多可填写三级价格区间');
                } else {
                    this.tableData.splice(1, 0, {
                        startNum: this.tableData[0].endNum ? this.tableData[0].endNum + 1 : '',
                        endNum: '',
                        stepPrice: ''
                    });
                    this.tableData[2].startNum = '';
                }
            },
            jtBtnDel() {
                this.tableData.splice(1, 1);
                this.tableData[1].startNum = this.tableData[0].endNum + 1;
            },
            saveJtPop(fn) {
                let flag0 = false;
                let flag1 = false;
                let flag2 = false;
                this.tableData.some((item, index) => {
                    item.startNum = item.startNum ? parseInt(item.startNum) : '';
                    if (item.endNum !== 999999) {
                        item.endNum = item.endNum ? parseInt(item.endNum) : '';
                    };
                    item.stepPrice = item.stepPrice ? parseFloat(item.stepPrice).toFixed(2) : '';
                    if (index === 0) {
                        if (isNaN(parseFloat(item.startNum)) || isNaN(parseFloat(item.endNum))) {
                            this.$xeMessage.error('请在第一行输入数字');
                            return true;
                        } else {
                            if (parseFloat(item.endNum) <= parseFloat(item.startNum)) {
                                this.$xeMessage.error('第一行后面数量要大于前面的数量');
                                return true;
                            } else {
                                if (!item.stepPrice) {
                                    this.$xeMessage.error('请在第一行填写单价');
                                    flag0 = false;
                                    return true;
                                } else {
                                    flag0 = true;
                                }
                            }
                        }
                    };

                    if (index === 1) {
                        if (isNaN(parseFloat(item.startNum)) || (item.endNum !== 999999 && isNaN(parseFloat(item.endNum)))) {
                            this.$xeMessage.error('请在第二行输入数字');
                            return true;
                        } else {
                            if (parseFloat(item.endNum) <= parseFloat(item.startNum)) {
                                this.$xeMessage.error('第二行后面数量要大于前面的数量');
                                return true;
                            } else if (parseFloat(item.startNum) <= parseFloat(this.tableData[0].endNum)) {
                                this.$xeMessage.error('第二行前面数量要大于第一行后面的数量');
                                return true;
                            } else if (!item.stepPrice || parseFloat(item.stepPrice) >= parseFloat(this.tableData[0].stepPrice)) {
                                this.$xeMessage.error('请在第二行填写单价且要小于第一行单价');
                                return true;
                            } else {
                                flag1 = true;
                            }
                        }
                    };

                    if (index === 2) {
                        if (isNaN(parseFloat(item.startNum))) {
                            this.$xeMessage.error('请第三行输入数字');
                            return true;
                        } else {
                            if (parseFloat(item.endNum) <= parseFloat(item.startNum)) {
                                this.$xeMessage.error('第三行后面价格要大于前面的价格');
                            } else if (parseFloat(item.startNum) <= parseFloat(this.tableData[1].endNum)) {
                                this.$xeMessage.error('第三行前面数量要大于第二行后面的数量');
                                return true;
                            } else if (!item.stepPrice || parseFloat(item.stepPrice) >= parseFloat(this.tableData[1].price)) {
                                this.$xeMessage.error('第三行单价要小于第二行单价');
                                return true;
                            } else {
                                flag2 = true;
                            }
                        }
                    }
                });
                if (this.tableData.length === 2) {
                    if (flag0 && flag1) {
                        fn && fn(this.tableData);
                    }
                } else {
                    if (flag0 && flag1 && flag2) {
                        fn && fn(this.tableData);
                    }
                }
            }
        },
        watch: {
            defaultData(val) {
                console.log('watch');
                console.log(val);
                console.log('watch');
                this.tableData = val;
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss"></style>
