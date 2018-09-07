<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="u-opera-btnBox" style="padding: 0">
                <el-button class="xe-button-normal"  @click="addNewcity">
                    <span class="iconfont icon-shezhi2"></span>&nbsp;设置区域
                </el-button>
                <el-button class="xe-button-normal"  @click="batchRemove">
                    <span class="iconfont icon-shanchu"></span>&nbsp;删除
                </el-button>
            </div>
        </div>
        <div>
            <el-table ref="listHot" v-if="listHot.length" :data="listHot" border v-loading="listHotloading" @selection-change="handleSelectionChange">
                <el-table-column
                        label=""
                        fixed='left'
                        width="55">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                    </el-table-column>
                <el-table-column type="selection" width="45" fixed="left"></el-table-column>
                <el-table-column prop="hotCityName" label="城市名称"></el-table-column>
                <el-table-column prop="modifyUser" label="操作人"></el-table-column>
                <el-table-column prop="modifyDate" label="操作时间">
                    <template scope="scope">
                        <div>
                            {{scope.row.modifyDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="180" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="removeRow(scope.$index, scope.row)">删除</el-button>
                            <el-button type="text" v-if="listHot.length > 1 && scope.$index !== 0" class="zq-restore" @click="moveHotCity(scope.row, 1)">上移</el-button>
                            <el-button type="text" v-if="listHot.length > 1 && scope.$index !== (listHot.length - 1)" class="zq-restore" @click="moveHotCity(scope.row, 2)">下移</el-button>
                            <el-button type="text" v-if="listHot.length > 1 && scope.$index !== 0" class="zq-restore" @click="moveHotCity(scope.row, 3)">置顶</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--<div style="padding-top: 20px">-->
            <!--<el-button type="primary" :loading="loading" @click="saveAllForm">保存</el-button>-->
            <!--<el-button @click="goBack">取消</el-button>-->
        <!--</div>-->
        <!--设置区域弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog05"  title="设置区域" :visible.sync="listHotdialog">
                <div class="clearfix" style="padding: 20px 20px">
                    <div class="areaBox-content fl" style="margin-right: 14px;height: 282px">
                        <ul class="cityListbox">
                            <li :key="item.areaId" :class="{active: cityName.split('-')[0] == item.areaName}"  v-for="(item, index) in areaList" @click="citySelect(item.areaId, item.areaName)">{{item.areaName}}</li>
                        </ul>
                    </div>
                    <div class="areaBox-content fl" style="height: 282px">
                        <el-checkbox-group v-model="areaValue"  style="top: 0" class="checkbox-group_other" @change="citieshandle">
                            <el-checkbox  :label="item.areaId" :disabled="areaValue.indexOf(item.areaId) !== -1" :key="item.areaId"   v-for="(item, index) in cityList">{{item.areaName}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
                <div style="padding: 0 20px">
                    <h2 style="font-size: 14px">已选区域</h2>
                    <div style="padding: 10px 0">
                        <el-tag
                            style="margin:0 10px 8px 0"
                            :key="tag"
                            v-for="tag in dynamicTags"
                            :closable="true"
                            :close-transition="false"
                            @close="handleClose(tag)"
                        >
                            {{tag}}
                        </el-tag>
                    </div>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" :loading="loading" @click="savelistHotForm">确定</el-button>
                    <el-button @click="listHotdialog = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            listHot: [],
            listHotloading: false,
            hasProName: false, // 选择商品提交开关
            proNameDatas: [], // 已选择的商品信息储存
            areaName: '',
            cityId: '',
            enabledStatus_s: '',
            selecRowIndex: '', // 编辑点击获取对应下标
            listHotdialog: false, // 设置区域开关
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            cityList: [],
            areaList: [], // 适用区域
            cityName: '',
            deletaIndex: '',
            areaValue: [],
            allCityList: [],
            dynamicTags: [],
            selectedArray: '', // 批量勾选数据记录
            checkedCity: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.listHotCity();
        this.getAreaList();
    },
    methods: {
        getAreaList(areaId) {
            let params = {};
            if (areaId) {
                params.areaId = areaId;
            }
            this.$http({
                method: 'post',
                url: `/xe-route/xe-pro/ven/proSpu/queryAreaListByParent`,
                data: params
            }).then(res => {
                let areaList = res.data.areaList;
                if (areaId) {
                    this.cityList = areaList;
                } else {
                    this.areaList = areaList;
                    this.cityName = this.areaList[0].areaName + '-';
                }
            }).catch(error => {
                console.log(error);
            });
        },
        getAllareaList() {
            let params = {};
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/hotcity/allCity`,
                data: params
            }).then(res => {
                let list = res.data.list;
                list.forEach(item => {
                    item.child.forEach(items => {
                        this.allCityList.push(items);
                    });
                });
            }).catch(error => {
                console.log(error);
            });
        },
        listHotCity() {
            let params = {};
            this.listHotloading = true;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/hotcity/listHotCity`,
                data: params
            }).then((res) => {
                this.listHotloading = false;
                this.listHot = res.data.list;
                this.areaValue = [];
                this.dynamicTags = [];
                this.listHot.forEach(item => {
                    this.areaValue.push(parseInt(item.hotCityId));
                    this.dynamicTags.push(item.hotCityName);
                });
            }).catch((error) => {
                console.log(error);
            });
        },
        removeRow(index, row) { // 删除
            this.$confirm(`确定要删除当前城市？`, '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = [];
                let _this = this;
                this.selecRowIndex = index;
                obj.push(row.hotId);
                this.deleteData(obj);
                setTimeout(() => {
                    _this.listHotCity();
                }, 300);
//                this.listHot.splice(index, 1);
//                this.selecRowArray = row;
            }).catch(() => {
            });
        },
        deleteData(obj) {
            let params = {};
            params.hotIds = obj;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/hotcity/delHotCity`,
                data: params
            }).then((res) => {
                window.$wxeMessage.success(res.msg);
            }).catch((error) => {
                console.log(error);
            });
        },
        moveHotCity(row, moveFlag) {
            let params = {};
            let _this = this;
            params.hotId = row.hotId;
            params.moveFlag = moveFlag;
            params.sort = row.sort;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/hotcity/moveHotCity`,
                data: params
            }).then((res) => {
                window.$wxeMessage.success(res.msg);
                setTimeout(() => {
                    _this.listHotCity();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        addNewcity() { // 设置区域
            this.listHotdialog = true;
            this.getAllareaList();
            this.getAreaList(this.areaList[0].areaId);
        },
        goBack() {
            this.$router.go(-1);
        },
        citySelect(val, areaName) {
            this.getAreaList(val);
            this.cityName = areaName + '-';
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        },
        citieshandle(val) {
            if (this.areaValue.length < 16) {
                let newtag = [];
                console.log('val', val);
                this.areaValue = val;
                this.cityList.forEach(item => {
                    this.areaValue.forEach(items => {
                        if (item.areaId === items) {
                            newtag.push(item.areaName);
                        }
                    });
                });
                for (let j = 0, lens = newtag.length; j < lens; j++) {
                    newtag[j] = this.cityName + newtag[j];
                }
                this.dynamicTags = [...new Set(this.dynamicTags.concat(newtag))];
            } else {
                this.$alert('最多可添加15个热门城市，当前已达到上限，不能再添加新的城市。', '热门城市数量', {
                    type: 'info'
                });
                this.areaValue.splice(this.areaValue.length - 1, this.areaValue.length);
            }
        },
        handleClose(tag) {
            this.deletaIndex = this.dynamicTags.indexOf(tag);
            this.dynamicTags.splice(this.deletaIndex, 1);
            this.areaValue.splice(this.deletaIndex, 1);
        },
        batchRemove() { // 批量删除
            if (this.selectedArray.length) {
                this.$confirm(`确定要删除当前城市？`, '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let obj = [];
                    this.selectedArray.forEach(item => {
                        obj.push(item.hotId);
                    });
                    this.deleteData(obj);
                }).catch(() => {
                });
            } else {
                window.$wxeMessage.warning('请先勾需要删除的城市列表');
            }
        },
        savelistHotForm() {
            if (this.areaValue.length) {
                let params = {};
                let _this = this;
                this.loading = true;
                params.cityIdArray = this.areaValue;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/hotcity/insertcity`,
                    data: params
                }).then(res => {
                    this.areaValue = [];
                    this.dynamicTags = [];
                    this.loading = false;
                    this.listHotdialog = false;
                    this.cityName = this.areaList[0].areaName + '-';
                    window.$wxeMessage.success(res.msg);
                    setTimeout(() => {
                        _this.listHotCity();
                    }, 300);
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                });
            } else {
                window.$wxeMessage.warning('请先设置区域');
            }
        }
    }
};
</script>
