<template lang="html">
    <div>
        <el-dialog title="设置区域价格" :visible="dialogVisible" class="popAreaPrice" :before-close='dialogBeforeClose'>
            <div class="popAreaPrice-con">
                <div class="content">
                    <!--<div class="item-con">-->
                        <!--<div class="item-tit">-->
                            <!--<el-radio class="radio" v-model="priceType" :label="1">统一价</el-radio>-->
                            <!--<span class='item-des'>所有区域价格一致</span>-->
                        <!--</div>-->
                        <!--<div v-show='priceType === 1' class="item-list">-->
                            <!--<div class="item-list-ty clearfix">-->
                                <!--<div class="item-list-col1 fl">-->
                                    <!--<el-input size="small" placeholder="请输入价格" v-model.number="tyDataObj.tyNumber" @blur="tyDataObj.tyNumber = tyDataObj.tyNumber ? parseFloat(tyDataObj.tyNumber).toFixed(2) : ''"></el-input>-->
                                <!--</div>-->
                                <!--<div class="fl">-->
                                    <!--<el-checkbox  @change="tyStepPrice(tyDataObj)" v-model="tyDataObj.stepFlag" :true-label='1' :false-label='2'>数量阶梯价</el-checkbox>-->
                                <!--</div>-->
                                <!--<div class="fl" @click.prevent="tyStepEditor(tyDataObj)" v-show="tyDataObj.stepFlag === 1 && tyDataObj.areaStepList && tyDataObj.areaStepList.length > 1" style="margin-left: 10px; color: #2480ff;">-->
                                    <!--修改-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                    <div class="item-con">
                        <div class="item-tit">
                            <!--<el-radio class="radio" v-model="priceType" :label="2">区域价</el-radio>-->
                            <p style="margin-left: 10px; margin-bottom: 10px; font-weight: bold;">区域价</p>
                            <span class='item-des'>针对每个区域设置不同的价格</span>
                        </div>
                        <div v-show='priceType === 2' class="item-list area-item-con" v-if='saleAreaList.length' v-loading='loading'>
                            <div class="item-list-item" v-for='(province, index) in saleAreaList' :key='province.areaId'>
                                <div class="item-province">
                                    <div class="item-province-con clearfix">
                                        <div class="fl province-radio">
                                            <el-checkbox :disabled='province.tyPriceFlag === 2' :true-label='1' :false-label='2' v-model='province.areaCheckBoxFlag'>{{province.areaName}}</el-checkbox>
                                        </div>
                                        <div class="fl">
                                            <el-checkbox :true-label='1' :false-label='2' v-model='province.tyPriceFlag' @change='provinceTyChange(province)'>全省统一价</el-checkbox>
                                        </div>
                                        <div class="fl province-input">
                                            <el-input size="small" v-model.number='province.areaPrice' placeholder="请输入价格" @blur="province.areaPrice = parseFloat(province.areaPrice) ? parseFloat(province.areaPrice).toFixed(2) : ''"></el-input>
                                        </div>
                                        <div class="fl">
                                            <el-checkbox :disabled='province.tyPriceFlag === 2' :true-label='1' :false-label='2' v-model='province.stepFlag' @change="proStepPrice(province)">数量阶梯价</el-checkbox>
                                        </div>
                                        <div class="fl" @click.prevent="provinceStepEditor(province)" v-show="province.stepFlag === 1 && province.areaStepList && province.areaStepList.length > 1" style="margin-left: 10px; color: #2480ff;">
                                            修改
                                        </div>
                                    </div>
                                    <div v-show='province.tyPriceFlag === 2' v-if='province.areaList && province.areaList.length' class="item-city-contanier">
                                        <div class="item-city" v-for='city in province.areaList' :key='city.areaId'>
                                            <div class="item-city-con clearfix">
                                                <div class="fl city-radio">
                                                    <el-checkbox :disabled='city.tyPriceFlag === 2' :true-label='1' :false-label='2' v-model='city.areaCheckBoxFlag' @change='cityNameChange(province)'>{{city.areaName}}</el-checkbox>
                                                </div>
                                                <div class="fl">
                                                    <el-checkbox :true-label='1' :false-label='2' v-model='city.tyPriceFlag' @change='cityTyChange(city, province)'>全市统一价</el-checkbox>
                                                </div>
                                                <div class="fl city-input">
                                                    <el-input size="small" v-model.number='city.areaPrice' placeholder="请输入价格" @blur="city.areaPrice = parseFloat(city.areaPrice) ? parseFloat(city.areaPrice).toFixed(2) : ''"></el-input>
                                                </div>
                                                <div class="fl">
                                                    <el-checkbox :disabled='city.tyPriceFlag === 2' :true-label='1' :false-label='2' v-model='city.stepFlag' @change="cityStepPrice(city)">数量阶梯价</el-checkbox>
                                                </div>
                                                <div class="fl" @click.prevent="cityStepEditor(city)" v-show="city.stepFlag === 1 && city.areaStepList && city.areaStepList.length > 1" style="margin-left: 10px; color: #2480ff;">
                                                    修改
                                                </div>
                                            </div>
                                            <div class="item-area" v-show='city.tyPriceFlag === 2' v-if='city.areaList && city.areaList.length'>
                                                <ul>
                                                    <li class="clearfix" v-for="area in city.areaList">
                                                        <div class="fl">
                                                            <el-checkbox :true-label='1' :false-label='2' v-model='area.areaCheckBoxFlag'  @change='areaNameChange(city, province)'>{{area.areaName}}</el-checkbox>
                                                        </div>
                                                        <div class="fl area-input">
                                                            <el-input size="small" v-model.number='area.areaPrice' placeholder="请输入价格" @blur="area.areaPrice = parseFloat(area.areaPrice) ? parseFloat(area.areaPrice).toFixed(2) : ''"></el-input>
                                                        </div>
                                                        <div class="fl">
                                                            <el-checkbox :true-label='1' :false-label='2' v-model='area.stepFlag' @change="areaStepPrice(area)">数量阶梯价</el-checkbox>
                                                        </div>
                                                        <div class="fl" @click.prevent="areaStepEditor(area)" v-show="area.stepFlag === 1 && area.areaStepList && area.areaStepList.length > 1" style="margin-left: 10px; color: #2480ff;">
                                                            修改
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="btnSure">确 定</el-button>
                <el-button @click="btnCancel">取 消</el-button>
            </div>
        </el-dialog>

        <el-dialog
            class="jtBox"
            title="阶梯价设置"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="false"
            :visible.sync="flag2">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column prop="date" label="数量区间">
                    <template scope='scope'>
                        <div class='jt-endnum-div' v-if='scope.$index === 0 && scope.row.startNum === 1'>1</div>
                        <el-input size="small" v-else class="jt-num-input" v-model.number.lazy='scope.row.startNum'></el-input>
                        <span class='jt-num-stripe'>-</span>
                        <div class='jt-endnum-div' v-if='scope.row.endNum === 999999'>以上</div>
                        <el-input size="small" v-else-if="scope.$index === 0" class="jt-num-input" v-model.number.lazy='scope.row.endNum' @input="tableData[1].startNum = tableData[0].endNum + 1"></el-input>
                        <el-input size="small" v-else-if="scope.$index === 1" class="jt-num-input" v-model.number.lazy='scope.row.endNum' @input="tableData[2].startNum = tableData[1].endNum + 1"></el-input>
                        <el-input size="small" v-else class="jt-num-input" v-model.number.lazy='scope.row.endNum'></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="单价(元)">
                    <template scope='scope'>
                        <el-input size="small" class="jt-num-input" v-model.number.lazy='scope.row.stepPrice' maxlength='8'></el-input>
                        <span class="jt-btn iconfont icon-zengjia" :class="{'disabled': tableData.length > 2}" v-if='scope.$index === 0' @click.prevent='jtBtnAdd'></span>
                        <span class="jt-btn iconfont icon-jianshao" v-else-if='scope.$index === 1 && tableData.length > 2' @click.prevent='jtBtnDel'></span>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="saveJtPop">确 定</el-button>
                <el-button @click="cancelJtPop">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {deepCopy} from 'utils';
export default {
    data() {
        return {
            loading: false,
            flag2: false,
            flag2Item: {},
            priceType: 2, // 区域价格标识
            saleAreaList: [], // 区域信息列表
            tableData: [], // 阶梯价
            tyDataObj: {
                tyNumber: '', // 统一价价格
                stepFlag: 2 // 统一价数量阶梯价
            },
            priceTypeOldFlag: ''
        };
    },
    props: {
        dialogVisible: {
            type: Boolean,
            default: false
        },
        itemData: {
            type: Object
        }
    },
    methods: {
        tyStepEditor(item) {
            this.flag2Item = item;
            this.flag2 = true;
            if (item.areaStepList && item.areaStepList.length > 1) {
                this.tableData = item.areaStepList;
            }
        },
        tyStepPrice(item) {
            // 统一价数量阶梯价设置
            if (item.stepFlag === 1) {
                this.flag2Item = item;
                if (item.areaStepList && item.areaStepList.length > 1) {
                    this.tableData = item.areaStepList;
                } else {
                    this.tableData = [
                        {
                            startNum: 1,
                            endNum: '',
                            stepPrice: ''
                        },
                        {
                            startNum: '',
                            endNum: 999999,
                            stepPrice: ''
                        }
                    ];
                }
                this.flag2 = true;
            }
        },
        querySaleAreaList(id = '', sku = '', fn) {
            // 查询当前商户售卖区域信息
            this.loading = true;
            this.$http({
                method: 'post',
                url: '/xe-route/xe-pro/ven/proSpu/queryVenProAreaListBySku',
                data: {
                    proSku: sku,
                    areaId: id
                }
            }).then(res => {
                this.loading = false;
                let saleAreaList = res.data.saleAreaList;
                saleAreaList.forEach(item => {
                    if (item.areaPrice === '' || !item.areaPrice) {
                        item.areaPrice = this.itemData.skuPrice;
                    }
                });
                fn && fn(saleAreaList, res.data.proAreaType);
            }).catch(error => {
                console.log(error);
            });
        },
        provinceStepEditor(item) {
            this.flag2Item = item;
            this.flag2 = true;
            if (item.areaStepList && item.areaStepList.length > 1) {
                this.tableData = item.areaStepList;
            }
        },
        proStepPrice(item) {
            if (item.stepFlag === 1) {
                this.flag2Item = item;
                this.flag2 = true;
                if (item.areaStepList && item.areaStepList.length > 1) {
                    this.tableData = item.areaStepList;
                } else {
                    this.tableData = [
                        {
                            startNum: 1,
                            endNum: '',
                            stepPrice: ''
                        },
                        {
                            startNum: '',
                            endNum: 999999,
                            stepPrice: ''
                        }
                    ];
                }
            }
        },
        cityStepEditor(item) {
            this.flag2Item = item;
            this.flag2 = true;
            if (item.areaStepList && item.areaStepList.length > 1) {
                this.tableData = item.areaStepList;
            }
        },
        cityStepPrice(item) {
            if (item.stepFlag === 1) {
                this.flag2Item = item;
                this.flag2 = true;
                if (item.areaStepList && item.areaStepList.length > 1) {
                    this.tableData = item.areaStepList;
                } else {
                    this.tableData = [
                        {
                            startNum: 1,
                            endNum: '',
                            stepPrice: ''
                        },
                        {
                            startNum: '',
                            endNum: 999999,
                            stepPrice: ''
                        }
                    ];
                }
            }
        },
        areaStepEditor(item) {
            this.flag2Item = item;
            this.flag2 = true;
            if (item.areaStepList && item.areaStepList.length > 1) {
                this.tableData = item.areaStepList;
            }
        },
        areaStepPrice(item) {
            if (item.stepFlag === 1) {
                this.flag2Item = item;
                this.flag2 = true;
                if (item.areaStepList && item.areaStepList.length > 1) {
                    this.tableData = item.areaStepList;
                } else {
                    this.tableData = [
                        {
                            startNum: 1,
                            endNum: '',
                            stepPrice: ''
                        },
                        {
                            startNum: '',
                            endNum: 999999,
                            stepPrice: ''
                        }
                    ];
                }
            }
        },
        provinceTyChange(item) {
            if (item.tyPriceFlag === 2) {
                if (!item.areaList || !item.areaList.length) {
                    this.querySaleAreaList(item.areaId, '', (data) => {
                        this.$set(item, 'areaList', data);
                    });
                }
                this.cityNameChange(item); // 重置省的复选框
                item.stepFlag = 2; // 重置省的阶梯价复选框
            }
        },
        cityTyChange(item, province) {
            if (item.tyPriceFlag === 2) {
                if (!item.areaList || !item.areaList.length) {
                    this.querySaleAreaList(item.areaId, '', (data) => {
                        this.$set(item, 'areaList', data);
                    });
                }
                this.areaNameChange(item, province); // 重置市的复选框
                item.stepFlag = 2; // 重置市的阶梯价复选框

                this.cityNameChange(province);
            }
        },
        cityNameChange(province) {
            let arrs = province.areaList && province.areaList.filter(item => {
                return item.areaCheckBoxFlag === 1;
            });
            if (arrs && arrs.length) {
                province.areaCheckBoxFlag = 1;
            } else {
                province.areaCheckBoxFlag = 2;
            }
        },
        areaNameChange(city, province) {
            let arrs = city.areaList && city.areaList.filter(item => {
                return item.areaCheckBoxFlag === 1;
            });
            if (arrs && arrs.length) {
                city.areaCheckBoxFlag = 1;
            } else {
                city.areaCheckBoxFlag = 2;
            }
            this.cityNameChange(province);
        },
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
        saveJtPop() {
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
            console.log('===flag2Item===');
            console.log(this.flag2Item);
            console.log('===flag2Item===');
            if (this.tableData.length === 2) {
                if (flag0 && flag1) {
                    console.log(this.tableData);
                    this.$set(this.flag2Item, 'areaStepList', this.tableData);
                    this.itemData.areaStepPriceList = this.tableData;
                    this.flag2 = false;
                    console.log(this.saleAreaList);
                }
            } else {
                if (flag0 && flag1 && flag2) {
                    console.log(this.tableData);
                    this.$set(this.flag2Item, 'areaStepList', this.tableData);
                    this.itemData.areaStepPriceList = this.tableData;
                    this.flag2 = false;
                    console.log(this.saleAreaList);
                }
            }
        },
        cancelJtPop() {
            console.log(this.flag2Item);
            if (this.flag2Item.areaStepList && this.flag2Item.areaStepList.length === 0) {
                this.flag2Item.stepFlag = 2;
            }
            this.flag2 = false;
        },
        btnSure() {
            if (this.priceType === 1) {
                // 统一价
                if (!this.tyDataObj.tyNumber) {
                    this.$xeMessage.error('请填写统一价的区域价');
                } else {
                    let obj = {
                        tyPriceFlag: 1,
                        priceType: 1,
                        areaId: 0,
                        areaPrice: this.tyDataObj.tyNumber,
                        stepFlag: this.tyDataObj.stepFlag
                    };
                    let resultArr = [];
                    if (this.tyDataObj.stepFlag === 1) {
                        obj.areaStepList = this.tyDataObj.areaStepList;
                    } else {
                        obj.areaStepList = [];
                    }
                    resultArr.push(obj);
                    this.itemData.priceType = this.priceType;
                    this.itemData.skuPrice = this.tyDataObj.tyNumber;
                    this.itemData.stepFlag = this.tyDataObj.stepFlag;
                    this.itemData.proAreaList = resultArr;
                    this.$emit('update:dialogVisible', false);
                }
            } else {
                // 区域价
                console.log(this.saleAreaList);
                let result = [];
                for (let i = 0; i < this.saleAreaList.length; i++) {
                    if (this.saleAreaList[i].areaCheckBoxFlag === 1 && this.saleAreaList[i].tyPriceFlag === 1) {
                        let datasPro = {...this.saleAreaList[i]};
                        datasPro.areaList = [];
                        result.push(datasPro);
                        continue;
                    }
                    if (this.saleAreaList[i].areaCheckBoxFlag === 1 && this.saleAreaList[i].tyPriceFlag === 2) {
                        for (let c = 0; c < this.saleAreaList[i].areaList.length; c++) {
                            if (this.saleAreaList[i].areaList[c].areaCheckBoxFlag === 1 && this.saleAreaList[i].areaList[c].tyPriceFlag === 1) {
                                let datasCity = {...this.saleAreaList[i].areaList[c]};
                                datasCity.areaList = [];
                                result.push(datasCity);
                                continue;
                            }
                            if (this.saleAreaList[i].areaList[c].areaCheckBoxFlag === 1 && this.saleAreaList[i].areaList[c].tyPriceFlag === 2) {
                                for (let a = 0; a < this.saleAreaList[i].areaList[c].areaList.length; a++) {
                                    if (this.saleAreaList[i].areaList[c].areaList[a].areaCheckBoxFlag === 1) {
                                        result.push(this.saleAreaList[i].areaList[c].areaList[a]);
                                    }
                                }
                            }
                        }
                    }
                }
                if (result.length) {
                    let reflag = false;
                    result.some(item => {
                        if (!item.areaPrice) {
                            reflag = true;
                        }
                    });
                    if (reflag) {
                        this.$xeMessage.error('请在对应区域填写区域价');
                        return;
                    }
                    this.itemData.priceType = this.priceType;
                    console.log(deepCopy(this.saleAreaList));
                    this.itemData.saleAreaList = deepCopy(this.saleAreaList);
                    this.itemData.proAreaList = result;
                    this.$emit('update:dialogVisible', false);
                } else {
                    this.$xeMessage.error('请选择区域');
                }
            }
            this.itemData.loadFlag = 1;
            console.log(this.itemData);
        },
        btnCancel() {
            this.$emit('update:dialogVisible', false);
        },
        dialogBeforeClose(done) {
            this.$emit('update:dialogVisible', false);
        }
    },
    watch: {
        priceType(newVal, oldVal) {
            console.log(newVal);
            console.log(this.itemData);
            if (newVal === 2) {
                if (!this.itemData.saleAreaList) {
                    let skuParmas = this.itemData.proSku;
                    if (this.priceTypeOldFlag === 1) {
                        skuParmas = '';
                    }
                    this.querySaleAreaList('', skuParmas, (data) => {
                        this.saleAreaList = data;
                    });
                }
            }
        },
        itemData(val) {
            console.log('===val changes===');
            console.log(val.proSku);
            console.log('===val changes===');
            if (val.proSku) {
                // 有SKU时
                console.log('有sku1');
                if (!this.itemData.loadFlag) {
                    console.log('有sku2');
                    this.querySaleAreaList('', val.proSku, (data, type) => {
                        console.log(data, type);
                        this.priceType = type;
                        this.priceTypeOldFlag = type;
                        if (type === 1) {
                            // 统一价
                            let dataProMsg = data[0];
                            this.tyDataObj.tyNumber = dataProMsg.areaPrice;
                            this.tyDataObj.stepFlag = dataProMsg.stepFlag;
                            this.tyDataObj.areaStepList = dataProMsg.areaStepList ? dataProMsg.areaStepList : [];
                        } else {
                            this.saleAreaList = data.length ? data : [];
                        }
                    });
                } else {
                    console.log('有sku3');
                    this.priceType = val.priceType ? val.priceType : 2;
                    this.tyDataObj.tyNumber = val.skuPrice;
                    this.tyDataObj.stepFlag = val.stepFlag ? val.stepFlag : 2;
                    this.tyDataObj.areaStepList = val.areaStepPriceList ? val.areaStepPriceList : [];
                    this.saleAreaList = val.saleAreaList ? val.saleAreaList : [];
                }
            } else {
                // 没有SKU时
                console.log('没有sku');
                this.priceType = val.priceType ? val.priceType : 2;
                this.tyDataObj.tyNumber = val.skuPrice;
                this.tyDataObj.stepFlag = val.stepFlag ? val.stepFlag : 2;
                this.tyDataObj.areaStepList = val.areaStepPriceList ? val.areaStepPriceList : [];
//                this.saleAreaList = val.saleAreaList ? val.saleAreaList : [];
                if (!this.itemData.saleAreaList) {
                    let skuParmas = this.itemData.proSku;
                    if (this.priceTypeOldFlag === 1) {
                        skuParmas = '';
                    }
                    this.querySaleAreaList('', skuParmas, (data) => {
                        this.saleAreaList = data;
                    });
                } else {
                    this.saleAreaList = val.saleAreaList;
                }
            }
        }
    }
};
</script>

<style lang="scss">
.popAreaPrice {
    .el-dialog__title {
        font-size: 14px;
    }
    .el-dialog__header {
        padding-bottom: 20px;
        border-bottom: 1px solid #dbe0e6;
    }
    .el-dialog__body {
        padding: 20px;
        .el-input__inner {
            line-height: 24px;
        }
    }
    .el-dialog__footer {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #dbe0e6;
    }
    .item-list.area-item-con {
        max-height: 320px;
        overflow: auto;
    }
    .item-list {
        min-height: 50px;
        overflow: hidden;
    }
    .item-des {
        color: #c8d0db;
        margin-left: 10px;
    }
    .item-list-ty {
        margin: 15px 0;
        line-height: 30px;
        overflow: hidden;
        .item-list-col1 {
            margin-right: 10px;
        }
    }
    .dialog-footer {
        text-align: center;
    }
    .item-con {
        margin-bottom: 15px;
    }
    .item-list-item {
        margin: 15px;
    }
    .item-province {
        .province-radio, .city-radio {
            margin-right: 10px;
        }
        .province-input, .city-input, .area-input {
            margin: 0 10px;
        }
        .item-province-con, .item-city-con {
            height: 30px;
            line-height: 30px;
        }
        .item-area {
            li {
                margin: 15px 0;
                height: 30px;
                line-height: 30px;
            }
        }
        .item-city-contanier {
            overflow: hidden;
            padding: 0 10px;
            margin: 10px;
            background: #f6f7f9;
        }
        .item-city {
            margin: 15px 0;
        }
        .item-area {
            margin: 10px 30px;
        }
    }
}
.jtBox {
    .el-dialog__header {
        padding-bottom: 20px;
        border-bottom: 1px solid #dbe0e6;
    }
    .el-dialog__body {
        padding: 20px;
    }
    .el-dialog__footer {
        text-align: center;
        padding-top: 20px;
        border-top: 1px solid #dbe0e6;
    }
    .jt-num-input, .jt-price-input {
        vertical-align: top;
        display: inline-block;
        width: 95px;
        height: 26px;
        border-radius: 4px;
        input {
            height: 26px;
            line-height: 20px;
        }
    }
    .jt-endnum-div {
        vertical-align: top;
        display: inline-block;
        width: 95px;
        height: 26px;
        border-radius: 4px;
        background: #f5f5f5;
        border: 1px solid #ced5de;
        line-height: 16px;
        padding: 5px;
        color: #687281;
    }
    .jt-num-stripe {
        display: inline-block;
        vertical-align: top;
        line-height: 26px;
        margin:0 5px;
        font-size: 20px;
    }
    .jt-btn {
        display: inline-block;
        vertical-align: top;
        width: 20px;
        height: 20px;
        font-size: 20px;
        margin:3px 15px;
        text-align: center;
        line-height: 1;
        color: #2a95fd;
        &.disabled {
            color: #d1dbe5;
        }
    }
}
</style>
