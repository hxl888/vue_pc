<template>
    <div class="el-tree-content" v-loading="loading" element-loading-text="拼命加载中">
        <div class="el-tree-province" v-if="data2.length" v-for="(province, index) in data2" :key="province[propKeys.id]">
            <div class="el-tree-province-con clearfix">
                <div class="fl checkbox-con">
                    <el-checkbox :indeterminate="province.isIndeterminate" :disabled="disbaledIdsFn(province[propKeys.id])" v-model="province.checkAll" @change="handleCheckAllChange($event, province)"></el-checkbox>
                </div>
                <div class="fl text-con" @click.prevent="proviceOpen(province)">
                    {{province[propKeys.name]}}
                    <span v-if="showZkFn(province[propKeys.id])" style="margin-left: 20px;">可展开</span>
                </div>
            </div>
            <div class="el-tree-city"
                 v-show="province.subShowFlag"
                 v-if="province.areaList && province.areaList.length > 0"
                 v-for="city in province.areaList"
                 :key="city[propKeys.id]"
            >
                <el-checkbox-group v-model="province.checkedCities" @change="handleCheckedCitiesChange($event, city, province)" :key="province[propKeys.id]">
                    <div class="el-tree-city-con clearfix">
                        <div class="fl checkbox-con">
                            <el-checkbox :label="city[propKeys.id]" :indeterminate="city.isIndeterminate" :disabled="disbaledIdsFn(city[propKeys.id])" v-model="city.checkAll" @change="handleCheckCitysAllChange($event, city)"></el-checkbox>
                        </div>
                        <div class="fl text-con" @click.prevent="cityOpen(province, city)">
                            {{city[propKeys.name]}}
                            <span v-if="showZkFn(city[propKeys.id])" style="margin-left: 20px;">可展开</span>
                        </div>
                    </div>
                </el-checkbox-group>
                <div class="el-tree-area"
                     v-show="city.subShowFlag"
                     v-if="city.areaList && city.areaList.length > 0"
                >
                    <div class="el-tree-area-con clearfix" v-for="area in city.areaList" :key="area[propKeys.id]">
                        <el-checkbox-group v-model="city.checkedCities" @change="handleCheckedAreasChange($event, area, city, province)" :key="city[propKeys.id]">
                            <div class="fl checkbox-con">
                                <el-checkbox :label="area[propKeys.id]" :disabled="disbaledIdsFn(area[propKeys.id])" :key="area[propKeys.id]"></el-checkbox>
                            </div>
                            <div class="fl text-con">
                                {{area[propKeys.name]}}
                            </div>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import {deepCopy} from 'utils';
    export default {
        name: 'useAreaList',
        data() {
            return {
                loading: false,
                data2: [],
                filterProvince: []
            };
        },
        props: {
            propKeys: {
                type: Object,
                default() {
                    return {
                        id: 'areaId',
                        name: 'areaName',
                        ajaxParams: 'areaId', // 接口入参字符串
                        responseStr: 'areaList' // 接口response字符串
                    };
                }
            },
            ajaxUrl: {
                type: String,
                default: '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent'
            },
            defaultData: {
                type: Array,
                default() {
                    return [];
                }
            },
            disbaledIds: {
                type: Array,
                default() {
                    return [];
                }
            }
        },
        created() {
            let countryFlag = 0;
            if (this.ajaxUrl !== '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent') {
                countryFlag = '';
            };
            this.queryAreaListByParent(countryFlag, data => {
                this.data2 = data;
                this.$nextTick(() => {
                    this.setDefault();
                });
            });
        },
        watch: {
            defaultData() {
                this.setDefault();
            }
        },
        methods: {
            setDefault() {
                this.data2.forEach(item => {
                    this.$set(item, 'subShowFlag', false);
                    this.$set(item, 'checkedCities', []);
                    this.$set(item, 'isIndeterminate', false);
                    this.$set(item, 'checkAll', false);
                    if (this.defaultData.length) {
                        this.defaultData.some(dItem => {
                            if (dItem[this.propKeys.id] === item[this.propKeys.id]) {
                                if (dItem.areaCheckBoxFlag === 1) {
                                    item.checkAll = true;
                                    item.isIndeterminate = false;
                                    item.subShowFlag = false;
                                } else {
                                    item.checkAll = false;
                                    item.isIndeterminate = true;
                                    item.subShowFlag = true;
                                    let ids = [];
                                    this.$set(item, 'areaList', dItem.areaList);
                                    item.areaList.forEach(sItem => {
                                        if (sItem.areaCheckBoxFlag === 1) {
                                            this.$set(sItem, 'checkAll', true);
                                            this.$set(sItem, 'isIndeterminate', false);
                                            this.$set(sItem, 'subShowFlag', false);
                                            ids.push(sItem[this.propKeys.id]);
                                        } else {
                                            if (sItem.areaCheckBoxFlag === 2 && sItem.areaList && sItem.areaList.length > 0) {
                                                this.$set(sItem, 'checkAll', false);
                                                this.$set(sItem, 'isIndeterminate', true);
                                                this.$set(sItem, 'subShowFlag', true);
                                                let aIds = [];
                                                sItem.areaList.forEach(aitem => {
                                                    if (aitem.areaCheckBoxFlag === 1) {
                                                        aIds.push(aitem[this.propKeys.id]);
                                                    }
                                                });
                                                this.$set(sItem, 'checkedCities', aIds);
                                            }
                                        }
                                    });
                                    this.$set(item, 'checkedCities', ids);
                                }
                                return false;
                            }
                        });
                    }
                });
            },
            initData2(fn) {
                // 初始化数据
                if (this.data2.length) {
                    this.data2.forEach(item => {
                        if (item.checkAll) {
                            item.checkAll = false;
                            item.isIndeterminate = false;
                            item.subShowFlag = false;
                        }
                        if (item.isIndeterminate && !item.checkAll) {
                            item.isIndeterminate = false;
                            item.checkedCities = [];
                            if (item.areaList && item.areaList.length) {
                                item.areaList.forEach(subitem => {
                                    if (subitem.checkAll) {
                                        subitem.checkAll = false;
                                        subitem.isIndeterminate = false;
                                    }
                                    if (subitem.isIndeterminate && !subitem.checkAll) {
                                        subitem.isIndeterminate = false;
                                        subitem.checkedCities = [];
                                    }
                                });
                            }
                        }
                    });
                }
            },
            getDataResult() {
                // 先过滤一遍选中或者半选的省份数据
                let result = {
                    resultIds: [],
                    resultTexts: []
                };
                let filterProvince = this.data2.filter(item => {
                    return item.checkAll === true || item.isIndeterminate === true;
                });
                this.filterProvince = filterProvince;
                if (filterProvince.length) {
                    for (let i = 0; i < filterProvince.length; i++) {
                        if (filterProvince[i].checkAll === true) {
                            result.resultIds.push(filterProvince[i][this.propKeys.id]);
                            let obj = {
                                [this.propKeys.id]: `${filterProvince[i][this.propKeys.id]}`,
                                [this.propKeys.name]: `${filterProvince[i][this.propKeys.name]}`
                            };
                            result.resultTexts.push(obj);
                            continue;
                        }
                        console.log(filterProvince[i]);
                        if (filterProvince[i].areaList) {
                            for (let c = 0; c < filterProvince[i].areaList.length; c++) {
                                if (filterProvince[i].areaList[c].checkAll === true) {
                                    result.resultIds.push(filterProvince[i].areaList[c][this.propKeys.id]);
                                    let obj = {
                                        [this.propKeys.id]: `${filterProvince[i][this.propKeys.id]}-${filterProvince[i].areaList[c][this.propKeys.id]}`,
                                        [this.propKeys.name]: `${filterProvince[i][this.propKeys.name]}-${filterProvince[i].areaList[c][this.propKeys.name]}`
                                    };
                                    result.resultTexts.push(obj);
                                    continue;
                                }
                                if (filterProvince[i].areaList[c].isIndeterminate === true) {
                                    result.resultIds.push(...filterProvince[i].areaList[c].checkedCities);
                                    // 过滤区的数据
                                    let obj = {};
                                    filterProvince[i].areaList[c].checkedCities.forEach(item => {
                                        obj[item] = 1;
                                    });
                                    if (filterProvince[i].areaList[c].areaList) {
                                        filterProvince[i].areaList[c].areaList.forEach(item => {
                                            if (obj[item[this.propKeys.id]]) {
                                                let objs = {
                                                    [this.propKeys.id]: `${filterProvince[i][this.propKeys.id]}-${filterProvince[i].areaList[c][this.propKeys.id]}-${item[this.propKeys.id]}`,
                                                    [this.propKeys.name]: `${filterProvince[i][this.propKeys.name]}-${filterProvince[i].areaList[c][this.propKeys.name]}-${item[this.propKeys.name]}`
                                                };
                                                result.resultTexts.push(objs);
                                            }
                                        });
                                    }
                                };
                            }
                        }
                    }
                    return result;
                } else {
                    return result;
                }
            },
            resetData(data) {
                if (data.length > 0) {
                    let copyData = deepCopy(data);
                    let resetObj = {};
                    copyData.forEach(resetItem => {
                        let ids = resetItem[this.propKeys.id].split('-');
                        let idsLength = ids.length;
                        if (idsLength === 1) {
                            this.data2.some(item => {
                                if (item[this.propKeys.id] === parseInt(ids[0])) {
                                    console.log(item[this.propKeys.name]);
                                    item.checkAll = true;
                                    item.isIndeterminate = false;
                                    let checkedCities = [];
                                    if (item.areaList && item.areaList.length) {
                                        item.areaList.forEach(subitem => {
                                            let subcheckedCities = [];
                                            checkedCities.push(subitem[this.propKeys.id]);
                                            if (subitem.areaList && subitem.areaList.length) {
                                                subitem.areaList.forEach(areaitem => {
                                                    subcheckedCities.push(areaitem[this.propKeys.id]);
                                                });
                                            }
                                            subitem.checkAll = true;
                                            subitem.isIndeterminate = false;
                                            subitem.checkedCities = subcheckedCities;
                                        });
                                    }
                                    item.subShowFlag = false;
                                    item.checkedCities = checkedCities;
                                    return true;
                                }
                            });
                        }
                        if (idsLength === 2) {
                            this.data2.some(item => {
                                if (item[this.propKeys.id] === parseInt(ids[0])) {
                                    if (resetObj[item[this.propKeys.id]] === undefined) {
                                        resetObj[item[this.propKeys.id]] = {};
                                        if (!resetObj[item[this.propKeys.id]].checkedCities || !resetObj[item[this.propKeys.id]].checkedCities.length) {
                                            resetObj[item[this.propKeys.id]]['checkedCities'] = [];
                                        }
                                    }
                                    item.checkAll = false;
                                    item.isIndeterminate = true;
                                    item.areaList.some(subitem => {
                                        if (subitem[this.propKeys.id] === parseInt(ids[1])) {
                                            resetObj[item[this.propKeys.id]]['checkedCities'].push(subitem[this.propKeys.id]);
                                            subitem.checkAll = true;
                                            subitem.isIndeterminate = false;
                                            if (subitem.areaList && subitem.areaList.length) {
                                                console.log(subitem.areaName);
                                                if (resetObj[subitem[this.propKeys.id]] === undefined) {
                                                    resetObj[subitem[this.propKeys.id]] = {};
                                                    if (!resetObj[subitem[this.propKeys.id]].subcheckedCities || !resetObj[subitem[this.propKeys.id]].subcheckedCities.length) {
                                                        resetObj[subitem[this.propKeys.id]]['subcheckedCities'] = [];
                                                    }
                                                }
                                                subitem.areaList.forEach(areaitem => {
                                                    if (resetObj[subitem[this.propKeys.id]]['subcheckedCities'].length !== subitem.areaList.length) {
                                                        resetObj[subitem[this.propKeys.id]]['subcheckedCities'].push(areaitem[this.propKeys.id]);
                                                    }
                                                });
                                                this.$set(subitem, 'checkedCities', resetObj[subitem[this.propKeys.id]]['subcheckedCities']);
                                                console.log(subitem);
                                            }
                                            item.subShowFlag = true;
                                            return true;
                                        }
                                    });
                                    item.checkedCities = resetObj[item[this.propKeys.id]]['checkedCities'];
                                    return true;
                                }
                            });
                        }
                        if (idsLength === 3) {
                            this.data2.some(item => {
                                if (item[this.propKeys.id] === parseInt(ids[0])) {
                                    if (resetObj[item[this.propKeys.id]] === undefined) {
                                        resetObj[item[this.propKeys.id]] = {};
                                        if (!resetObj[item[this.propKeys.id]].checkedCities || !resetObj[item[this.propKeys.id]].checkedCities.length) {
                                            resetObj[item[this.propKeys.id]]['checkedCities'] = [];
                                        }
                                    }
                                    item.checkAll = false;
                                    item.isIndeterminate = true;
                                    item.areaList.some(subitem => {
                                        if (subitem[this.propKeys.id] === parseInt(ids[1])) {
//                                                resetObj[item[this.propKeys.id]]['checkedCities'].push(subitem[this.propKeys.id]);
                                            subitem.checkAll = false;
                                            subitem.isIndeterminate = true;
                                            if (subitem.areaList && subitem.areaList.length) {
                                                console.log(subitem.areaName);
                                                if (resetObj[subitem[this.propKeys.id]] === undefined) {
                                                    resetObj[subitem[this.propKeys.id]] = {};
                                                    if (!resetObj[subitem[this.propKeys.id]].subcheckedCities || !resetObj[subitem[this.propKeys.id]].subcheckedCities.length) {
                                                        resetObj[subitem[this.propKeys.id]]['subcheckedCities'] = [];
                                                    }
                                                }
                                                subitem.areaList.forEach(areaitem => {
                                                    if (resetObj[subitem[this.propKeys.id]]['subcheckedCities'].length !== subitem.areaList.length) {
                                                        if (areaitem[this.propKeys.id] === parseInt(ids[2])) {
                                                            resetObj[subitem[this.propKeys.id]]['subcheckedCities'].push(areaitem[this.propKeys.id]);
                                                        }
                                                    }
                                                });
                                                this.$set(subitem, 'checkedCities', resetObj[subitem[this.propKeys.id]]['subcheckedCities']);
                                                console.log(subitem);
                                            }
                                            this.$set(subitem, 'subShowFlag', true);
                                            return true;
                                        }
                                    });
                                    this.$set(item, 'subShowFlag', true);
                                    return true;
                                }
                            });
                        }
                    });
                } else {
                    return false;
                }
            },
            removeData(id, fn) {
                if (!id) return;
                let ids = id.split('-');
                let idLength = ids.length;
                if (idLength === 1) {
                    this.data2.some(item => {
                        if (item[this.propKeys.id] === parseInt(ids[0])) {
                            item.checkAll = false;
                            item.checkedCities = [];
                            if (item.areaList && item.areaList.length) {
                                item.areaList.forEach(subitem => {
                                    subitem.checkedCities = [];
                                    subitem.checkAll = false;
                                });
                            }
                            fn && fn();
                            return true;
                        }
                    });
                }
                if (idLength === 2) {
                    this.data2.some(item => {
                        if (item[this.propKeys.id] === parseInt(ids[0])) {
                            item.checkedCities.splice(item.checkedCities.indexOf(parseInt(ids[1])), 1);
                            item.areaList.some(subItem => {
                                if (parseInt(ids[1]) === subItem[this.propKeys.id]) {
                                    subItem.checkAll = false;
                                    subItem.checkedCities = [];
                                    return true;
                                }
                            });
                            if (item.checkedCities.length <= 0) {
                                item.isIndeterminate = false;
                            }
                            fn && fn();
                            return true;
                        }
                    });
                }
                if (idLength === 3) {
                    this.data2.some(item => {
                        if (item[this.propKeys.id] === parseInt(ids[0])) {
                            item.areaList.some(subItem => {
                                if (parseInt(ids[1]) === subItem[this.propKeys.id]) {
                                    subItem.checkedCities.splice(subItem.checkedCities.indexOf(parseInt(ids[2])), 1);
                                    if (subItem.checkedCities.length <= 0) {
                                        subItem.isIndeterminate = false;
                                    }
                                    if (item.checkedCities.length <= 0 && subItem.checkedCities.length <= 0) {
                                        item.isIndeterminate = false;
                                        console.log(4444454555);
                                    }
                                    console.log('=====');
                                    console.log(item);
                                    console.log(subItem);
                                    console.log('=====');
                                    return true;
                                }
                            });
                            fn && fn();
                            return true;
                        }
                    });
                }
            },
            proviceOpen(province) {
                if (this.disbaledIds.length && !this.showZkFn(province[this.propKeys.id]) && this.disbaledIdsFn(province[this.propKeys.id])) {
                    return;
                }
                if (province.areaList && province.areaList.length > 0) {
                    province.subShowFlag = !province.subShowFlag;
                } else {
                    this.queryAreaListByParent(province[this.propKeys.id], data => {
                        data.forEach(item => {
                            item.subShowFlag = false;
                        });
                        this.data2.some(item => {
                            if (item[this.propKeys.id] === province[this.propKeys.id]) {
                                this.$set(item, 'areaList', data);
                                this.$nextTick(() => {
                                    let result = [];
                                    item.areaList.forEach(cityitem => {
                                        result.push(cityitem[this.propKeys.id]);
                                        cityitem.checkAll = province.checkAll ? province.checkAll : false;
                                        if (province.checkedCities.length && province.checkedCities.indexOf(cityitem[this.propKeys.id]) >= 0) {
                                            cityitem.checkAll = true;
                                        }
                                    });
                                    item.checkedCities = item.checkAll ? result : item.checkedCities;
                                    item.isIndeterminate = item.checkedCities.length > 0 && item.checkedCities.length < item.areaList.length;
                                    item.subShowFlag = false;
                                    province.subShowFlag = true;
                                });
                                return true;
                            }
                        });
                    });
                }
            },
            cityOpen(province, city) {
                if (this.disbaledIds.length && !this.showZkFn(city[this.propKeys.id]) && this.disbaledIdsFn(city[this.propKeys.id])) {
                    return;
                }
                if (city.areaList && city.areaList.length) {
                    city.subShowFlag = !city.subShowFlag;
                } else {
                    this.queryAreaListByParent(city[this.propKeys.id], data => {
                        let result = [];
                        data.forEach(areaitem => {
                            result.push(areaitem[this.propKeys.id]);
                        });
                        this.data2.some(item => {
                            if (item[this.propKeys.id] === province[this.propKeys.id]) {
                                item.areaList.some(sitem => {
                                    if (sitem[this.propKeys.id] === city[this.propKeys.id]) {
                                        this.$set(sitem, 'areaList', data);
                                        if (province.checkAll || city.checkAll) {
                                            sitem.checkAll = true;
                                        } else {
                                            sitem.checkAll = false;
                                        }
                                        this.$set(sitem, 'checkedCities', sitem.checkAll ? result : []);
                                        this.$set(sitem, 'subShowFlag', true);
                                        this.$set(sitem, 'isIndeterminate', sitem.checkedCities.length > 0 && sitem.checkedCities.length < sitem.areaList.length);
                                        return true;
                                    }
                                });
                                return true;
                            }
                        });
                    });
                }
            },
            handleCheckAllChange(event, province) {
                let allCityIds = [];
                let flag = false;
                if (province.areaList && province.areaList.length) {
                    province.areaList.forEach(item => {
                        if (this.disbaledIds.indexOf(item[this.propKeys.id] + '') < 0) {
                            allCityIds.push(item[this.propKeys.id]);
                        } else {
                            flag = true;
                        }
                        if (item.areaList && item.areaList.length) {
                            let allAreaIds = [];
                            item.areaList.forEach(areaItem => {
                                if (this.disbaledIds.indexOf(areaItem[this.propKeys.id] + '') < 0) {
                                    allAreaIds.push(areaItem[this.propKeys.id]);
                                } else {
                                    flag = true;
                                }
                            });
                            item.checkedCities = event.target.checked ? allAreaIds : [];
                            item.isIndeterminate = false;
                        }
                        item.checkAll = event.target.checked ? event.target.checked : false;
                    });
                }
                if (flag) {
                    province.checkedCities = event.target.checked ? allCityIds : [];
                    console.log(province);
                    province.checkAll = false;
                    province.isIndeterminate = true;
                } else {
                    province.checkedCities = event.target.checked ? allCityIds : [];
                    province.isIndeterminate = false;
                }
                // 绑定change导出数据
                this.$emit('on-result-change', this.getDataResult());
            },
            handleCheckedCitiesChange(value, city, province) {
                console.log(value);
                let checkedCount = value.length;
                province.checkAll = checkedCount === province.areaList.length;
                province.isIndeterminate = checkedCount > 0 && checkedCount < province.areaList.length;
                if (value.indexOf(city[this.propKeys.id]) < 0) {
                    console.log('取消选中城市');
                    city.checkAll = false;
                    console.log(province);
                    let flag = false;
                    for (var i = 0; i < province.areaList.length; i++) {
                        if (province.areaList[i].checkedCities && province.areaList[i].checkedCities.length > 0) {
                            flag = true;
                            break;
                        }
                    }
                    if (flag) {
                        province.isIndeterminate = true;
                    }
                } else {
                    console.log('选中城市');
                    city.checkAll = true;
                }
                // 绑定change导出数据
                this.$emit('on-result-change', this.getDataResult());
            },
            handleCheckCitysAllChange(event, city) {
                let allAreaIds = [];
                if (city.areaList && city.areaList.length) {
                    city.areaList.forEach(item => {
                        if (this.disbaledIds.indexOf(item[this.propKeys.id] + '') < 0) {
                            allAreaIds.push(item[this.propKeys.id]);
                        }
                        item.checkAll = event.target.checked ? event.target.checked : false;
                    });
                    city.checkedCities = event.target.checked ? allAreaIds : [];
                }
                city.isIndeterminate = false;
                // 绑定change导出数据
//                this.$emit('on-result-change', this.getDataResult());
            },
            handleCheckedAreasChange(value, area, city, province) {
                let checkedCount = value.length;
                if (value.indexOf(area[this.propKeys.id]) < 0) {
                    console.log('取消选中区域');
                    city.checkAll = false;
                    if (province.checkedCities.indexOf(city[this.propKeys.id]) >= 0) {
                        console.log('取消选中区域3');
                        province.checkedCities.splice(province.checkedCities.indexOf(city[this.propKeys.id]), 1);
                    }
                    province.isIndeterminate = true;
                    province.checkAll = false;
                    if (province.checkedCities.length <= 0) {
                        console.log('取消选中区域1');
                        province.checkAll = false;
                        province.isIndeterminate = true;
                    }
                    if (province.checkedCities.length <= 0 && city.checkedCities.length <= 0) {
                        console.log('取消选中区域2');
                        let flag = true;
                        for (var i = 0; i < province.areaList.length; i++) {
                            if (province.areaList[i].checkedCities && province.areaList[i].checkedCities.length > 0) {
                                console.log(123123);
                                flag = false;
                                break;
                            }
                        }
                        if (flag) {
                            province.isIndeterminate = false;
                        }
                    }
                } else {
                    if (checkedCount === city.areaList.length) {
                        console.log('选中区域1');
                        city.checkAll = true;
                        province.checkedCities.push(city[this.propKeys.id]);
                        if (province.checkedCities.length === province.areaList.length) {
                            province.checkAll = true;
                            province.isIndeterminate = false;
                        }
                    } else {
                        console.log('选中区域2');
                        city.checkAll = false;
                        if (province.checkedCities.indexOf(city[this.propKeys.id]) >= 0) {
                            province.checkedCities.splice(province.checkedCities.indexOf(city[this.propKeys.id]), 1);
                        }
                        province.isIndeterminate = true;
                    }
                };
                city.isIndeterminate = checkedCount > 0 && checkedCount < city.areaList.length;

                // 绑定change导出数据
                this.$emit('on-result-change', this.getDataResult());
            },
            queryAreaListByParent(id, fn) {
                this.loading = true;
                this.$http({
                    method: 'post',
                    url: this.ajaxUrl,
                    data: {
                        [this.propKeys.ajaxParams]: id
                    }
                }).then(res => {
                    this.loading = false;
                    fn && fn(res.data[this.propKeys.responseStr]);
                }).catch(error => {
                    console.log(error);
                });
            },
            disbaledIdsFn(id) {
                if (this.disbaledIds.length) {
                    let result = false;
                    this.disbaledIds.some(item => {
                        if (item.areaId === id) {
                            result = true;
                            return true;
                        }
                    });
                    return result;
                }
            },
            showZkFn(id) {
                if (this.disbaledIds.length) {
                    let result = false;
                    this.disbaledIds.some(item => {
                        if (item.areaId === id && item.showZk) {
                            result = true;
                            return true;
                        }
                    });
                    return result;
                } else {
                    return false;
                }
            }
        }
    };
</script>
<style lang="scss">
    .el-tree-dialog {
        .el-dialog--small {
            width: 500px;
        }
    }
    .el-tree-content {
        max-height: 400px;
        min-height: 400px;
        overflow: auto;
        border: 1px solid #d1dbe5;
        padding: 5px 15px;
        .checkbox-con {
            height: 14px;
            overflow: hidden;
            margin-top: 2px;
        }
        .text-con {
            width: 250px;
            font-size: 14px;
            line-height: 18px;
            margin-left: 5px;
        }
        .el-tree-province {
            margin: 10px 0;
        }
        .el-tree-province-con {
        }
        .el-tree-city {
            margin: 10px 0;
            padding: 0px 20px 0 20px;
        }
        .el-tree-area {
            padding: 2px 20px;
            .el-tree-area-con {
                margin: 10px 0;
            }
        }
        .el-checkbox__label {
            display: none;
        }
    }
</style>
