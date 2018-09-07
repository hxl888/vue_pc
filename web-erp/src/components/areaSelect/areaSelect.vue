<template lang='html'>
    <el-cascader
        :disabled="disabled"
        :size="size"
        :style="{'width': width + 'px'}"
        :options="getAreaInfo"
        :getName = 'getName'
        @change="areaChange"
        :change-on-select='changeOnSelects'
        @active-item-change="areaChange"
        :filterable='filterable'
        :placeholder="placeholder"
        v-model='saleAreaIds'
        :props='props'>
    </el-cascader>
</template>

<script>
export default {
    name: 'areaSelectComponent',
    props: {
        value: {},
        width: {
            type: Number,
            default: 120
        },
        ajaxUrl: {
            type: String,
            default: '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent'
        },
        getName: { // 取中文字段
            type: Boolean,
            default: false
        },
        changeOnSelects: { // 默认可以联动
            type: Boolean,
            default: true
        },
        filterable: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: 'small'
        },
        placeholder: {
            type: String,
            default: '选择区域'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        value(val) {
            this.saleAreaIds = this.value;
            this.areaChange(val);
        }
    },
    data() {
        return {
            getAreaInfo: [],
            provinceInfo: [],
            currentCityInfo: [],
            saleAreaIds: [],
            areaName: [],
            props: {
                label: 'areaName',
                value: 'areaId',
                children: 'subArea'
            }
        };
    },
    created() {
        this.saleAreaIds = this.value;
        let country = 0;
        if (this.ajaxUrl !== '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent') {
            country = '';
        };
        this.loadArea(country, (dataList) => {
            this.getAreaInfo = dataList;
            this.provinceInfo = dataList;
            this.getAreaInfo.forEach(item => {
                this.$set(item, 'subArea', []);
            });
            this.areaChange(this.saleAreaIds);
        });
    },
    methods: {
        loadAreaName(val) {
            // console.log('test', val);
            if (this.getName && val.length === 3) {
                this.getAreaInfo.some(item => {
                    if (item.areaId === val[0]) {
                        this.areaName[0] = item.areaName;
                        item.subArea.some(items => {
                            if (items.areaId === val[1]) {
                                this.areaName[1] = items.areaName;
                                items.subArea.some(itemss => {
                                    if (itemss.areaId === val[2]) {
                                        // console.log('val[2]', val[2]);
                                        // console.log('areaName', itemss.areaName);
                                        this.areaName[2] = itemss.areaName;
                                        this.$emit('areaName', this.areaName);
                                        // console.log('alll', this.areaName);
                                        return true;
                                    }
                                });
                            }
                        });
                    }
                });
            } else if (this.getName && val.length === 0) {
                this.$emit('areaName', ['', '', '']);
            }
        },
        loadlastArea(val) {
            this.currentCityInfo.some(items => {
                if (items.areaId === val[1] && !items.subArea.length) {
                    this.loadArea(val[1], (dataList) => {
                        this.getAreaInfo.some(item => {
                            if (item.areaId === val[0]) { // 省匹配上 找对应市
                                item.subArea.some(itemCity => {
                                    if (itemCity.areaId === val[1]) {
                                        itemCity.subArea = dataList;
                                    }
                                });
                            }
                        });
                        this.$set(items, 'subArea', dataList);
                    });
                    return true;
                }
            });
        },
        areaChange(val) {
            this.provinceInfo.some(item => {
                if (item.areaId === val[0] && !item.subArea.length) {
                    this.loadArea(val[0], (dataList) => {
                        this.getAreaInfo.some(item => {
                            if (item.areaId === val[0]) {
                                item.subArea = dataList;
                                item.subArea.forEach(itemIn => {
                                    this.$set(itemIn, 'subArea', []);
                                });
                                this.currentCityInfo = dataList;
                                this.loadlastArea(val);
                                return true;
                            }
                        });
                    });
                    return true;
                }
            });
            if (val[1]) {
                this.loadlastArea(val);
            }
            this.loadAreaName(val);
            if (!this.changeOnSelects) {
                if (val.length !== 3) {
                    return;
                }
                this.$emit('input', val);
            } else {
                this.$emit('input', val);
            }
        },
        loadArea(id, fn) {
            this.$http({
                method: 'post',
                url: this.ajaxUrl,
                data: {
                    areaId: id
                }
            }).then(res => {
                if (this.ajaxUrl === '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent') {
                    fn && fn(res.data.areaList);
                } else {
                    fn && fn(res.data.saleAreaList);
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }
};
</script>

<style lang='scss'>
</style>
