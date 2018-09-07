<template lang="html">
        <div class="addres-checkbox clearfix">
            <ul class="addres-flor fl">
                <li class="flor_lis active" v-for="(item, index) in adres_lis1">
                     <el-radio-group v-model="adres_1">
                            <el-radio class="radio" key="item.key" :label="item.name">&nbsp;&nbsp;{{item.name}}</el-radio>
                     </el-radio-group>
                </li>
            </ul>
            <ul class="addres-flor fl">
                <li class="flor_lis" v-for="(item, index) in adres_lis1">
                      <el-checkbox-group v-model="adres_2" >
                            <el-checkbox :label="item.name">&nbsp;&nbsp;{{item.name}}</el-checkbox>
                      </el-checkbox-group>
                </li>
            </ul>
            <ul class="addres-flor fl">
                <li class="flor_lis">
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">&nbsp;&nbsp;全部</el-checkbox>
                </li>
                <li class="flor_lis" v-for="item in cities">
                      <el-checkbox-group v-model="checkedCities2"  @change="handleCheckedCitiesChange">
                            <el-checkbox :label="item">&nbsp;&nbsp;{{item}}</el-checkbox>
                      </el-checkbox-group>
                </li>
            </ul>
        </div>
</template>

<script>
    let cityOptions2 = ['上海', '北京', '广州', '深圳'];
    export default {
        name: 'temDlog',
        data() {
            return {
                adres_1: '',
                adres_2: [],
                dialogTableVisible: true,
                adres_lis1: [{
                    key: '1',
                    name: '安徽'
                },
                {
                    key: '3',
                    name: '安3徽'
                }],
                cities: cityOptions2,
                checkedCities2: ['上海', '北京'],
                checkAll: true,
                isIndeterminate: true
            };
        },
        created() {

        },
        methods: {
            handleCheckAllChange(event) {
                this.checkedCities2 = event.target.checked ? cityOptions2 : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../../../../assets/styles/views/newFreightTemplates.scss";
</style>
