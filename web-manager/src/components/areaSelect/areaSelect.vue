<template lang='html'>
    <el-cascader
        :style="{'width': width + 'px'}"
        :options="getAreaInfo"
        :size='size'
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
        }
    },
    data() {
        return {
            getAreaInfo: [],
            provinceInfo: [],
            currentCityInfo: [],
            saleAreaIds: [],
            props: {
                label: 'areaName',
                value: 'areaId',
                children: 'subArea'
            }
        };
    },
    created() {
        this.saleAreaIds = this.value;
        this.loadArea(0, (dataList) => {
            this.getAreaInfo = dataList;
            this.provinceInfo = dataList;
            this.getAreaInfo.forEach(item => {
                this.$set(item, 'subArea', []);
            });
            this.areaChange(this.saleAreaIds);
        });
    },
    methods: {
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
                url: '/xe-route/xe-pro/ven/proSpu/queryAreaListByParent',
                data: {
                    areaId: id
                }
            }).then(res => {
                fn && fn(res.data.areaList);
            }).catch(error => {
                console.log(error);
            });
        }
    },
    watch: {
        value(val) {
            console.log('areaSelect---');
            console.log(val);
            console.log('areaSelect---');
            this.saleAreaIds = val;
            this.areaChange(val);
        }
    }
};
</script>

<style lang='scss'>
</style>
