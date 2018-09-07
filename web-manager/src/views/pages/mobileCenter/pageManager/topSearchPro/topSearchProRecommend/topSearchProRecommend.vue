<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
                <div class="item-tit clearfix">
                    <p style="margin-right: 20px" class="fl">当前区域：{{areaName}}</p>
                    <!--<span>状态：{{enabledStatus_s | enabledStatusfilter}}</span>-->
                    <p class="fl">
                        状态：
                         <el-radio-group v-model="enabledStatus_s">
                             <el-radio v-for="(item, index) in enabledStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                         </el-radio-group>
                    </p>
                </div>
            </div>
            <div class="u-opera-btnBox" style="padding: 0">
                <el-button class="xe-button-normal"  @click="addNewbanner">
                    <span class="iconfont icon-xinzeng"></span>&nbsp;添加商品
                </el-button>
                <el-button class="xe-button-normal"  @click="batchRemove">
                    <span class="iconfont icon-shanchu"></span>&nbsp;删除商品
                </el-button>
            </div>
        </div>
        <div class="other_HeiScro">
            <el-table ref="topProList" :data="topProList" class="" :maxHeight="800" border v-loading="topProListloading" @selection-change="handleSelectionChange">
                <el-table-column
                        label=""
                        fixed='left'
                        width="60">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                    </el-table-column>
                <el-table-column type="selection" width="45" fixed="left"></el-table-column>
                <el-table-column prop="venName" label="商户名称" min-width="160"></el-table-column>
                <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
                <el-table-column label="主图" prop="" width="95">
                    <template scope="scope">
                        <div style="padding-top: 8px" v-if="scope.row.proMainImg">
                            <img :src="picServer + scope.row.proMainImg" width="60" height="60">
                        </div>
                        <div style="width: 60px;height: 60px" v-else></div>
                    </template>
                </el-table-column>
                <el-table-column prop="proNum" label="货号" min-width="100"></el-table-column>
                <el-table-column prop="proSku" label="sku编码" min-width="150"></el-table-column>
                <el-table-column prop="specValue" label="规格" min-width="120"></el-table-column>
                <el-table-column prop="cateName" label="商品分类" min-width="200"></el-table-column>
                <el-table-column prop="upFlag" label="上架状态" min-width="120">
                    <template scope="scope">
                        <div>
                            {{scope.row.upFlag | upFlagfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="操作" width="65" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="removeRow(scope.$index)">删除</el-button>
                            <!--<el-button type="text" v-if="topProList.length > 1 && scope.$index !== 0" class="zq-restore" @click="moveUp(scope.$index, scope.row)">上移</el-button>-->
                            <!--<el-button type="text" v-if="topProList.length > 1 && scope.$index !== (topProList.length - 1)" class="zq-restore" @click="moveDown(scope.$index, scope.row)">下移</el-button>-->
                            <!--<el-button type="text" v-if="topProList.length > 1 && scope.$index !== 0" class="zq-restore" @click="topHei(scope.$index, scope.row)">置顶</el-button>-->
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!--适用区域-->
        <div class="for-itemlis" style="margin-top: 35px">
            <div class="item-head clearfix">
                <div class="item-tit">适用区域</div>
            </div>
            <div class="areaBox-content">
                <div class="area-firt">
                    <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全国</el-checkbox>
                </div>
                <el-checkbox-group v-model="areaValue" class="checkbox-group_other" @change="handleCheckedCitiesChange">
                    <el-checkbox :label="item.areaId" :key="item.areaId"  v-for="(item, index) in areaList">{{item.areaName}}
                    </el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div style="padding-top: 20px">
            <el-button type="primary" :loading="loading" @click="saveAllForm">保存</el-button>
            <el-button @click="goBack">取消</el-button>
        </div>
        <!--选择商品弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog01"  title="添加商品" :visible.sync="selectproNamedialog">
                <div style="padding-top: 5px">
                    <proname-alert :cityId="cityId" :selectedData="selectedData" :topProListNum="topProListNum" :selectproNamedialog="selectproNamedialog" :saveproNamebut="saveproNamebut"  @saveproNamemErr="saveproNamemErr" @saveproNamemSuc="saveproNamemSuc"></proname-alert>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" @click="saveproNameForm">确定</el-button>
                    <el-button @click="selectproNamedialog = false">关闭</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { enabledStatus } from '@/dataControl';
import pronameAlert from './pronameAlert';
export default {
    beforeRouteEnter(to, from, next) {
        if (to.params.cityId) {
            next(vm => {
                vm.areaName = to.params.areaName;
                vm.cityId = parseInt(to.params.cityId);
                vm.enabledStatus_s = parseInt(to.params.enabledStatus);
                vm.getTopProductListByCityId(to.params.cityId);
            });
        }
    },
    beforeRouteLeave(to, from, next) {
        window.localStorage.removeItem('topProList');
        next();
    },
    data() {
        return {
            topProList: [],
            topProListloading: false,
            hasProName: false, // 选择商品提交开关
            proNameDatas: [], // 已选择的商品信息储存
            proNameDatasDele: [], // 已删除的商品信息储存
            picServer: '',
            areaName: '',
            cityId: '',
            selectedData: [],
            enabledStatus_s: '',
            selecRowIndex: '', // 编辑点击获取对应下标
            selectproNamedialog: false, // 选择商品弹框开关
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            saveproNamebut: false, // 点击新增商品弹框确定（按钮已点击确认）
            areaList: [], // 适用区域
            areaValue: [],
            topProListNum: '', // 列表的数据长度
            areaAllNum: '',
            checkAll: false,
            citieOption: [],
            selectedArray: '', // 批量勾选数据记录
            checkedCity: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getAreaList(); // 适用区域
//        window.localStorage.setItem('topProList', []);
    },
    methods: {
        getAreaList() {
            let params = {};
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getAllAreaList`,
                data: params
            }).then(res => {
                let areaList = res.data.areaList;
                areaList.forEach(item => {
                    if (item.areaId !== this.cityId) {
                        this.areaList.push(item);
                        this.citieOption.push(item.areaId);
                    }
                });
                this.areaAllNum = this.areaList.length;
            }).catch(error => {
                console.log(error);
            });
        },
        getTopProductListByCityId(cityId) {
            let params = {};
            this.topProListloading = true;
            params.cityId = cityId;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getTopProductListByCityId`,
                data: params
            }).then((res) => {
                this.topProListloading = false;
                this.picServer = res.data.picServer;
                this.topProList = res.data.topProList;
                let topProList = window.localStorage.getItem('topProList');
                if (topProList) {
                    this.$nextTick(() => {
                        this.topProList = JSON.parse(topProList);
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        removeRow(index) { // 删除
            console.log('index--->', index);
            this.$confirm(`确定要删除该商品吗？`, '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let deles = this.topProList.splice(index, 1);
                this.proNameDatas.forEach((item, index) => {
                    if (deles[0].proSku === item.proSku) {
                        this.proNameDatas.splice(index, 1);
                        deles = [];
                    }
                });
                console.log('deles--->', deles);
                this.proNameDatasDele = this.proNameDatasDele.concat(deles);
                window.$wxeMessage.success('删除成功');
                window.localStorage.setItem('topProList', JSON.stringify(this.topProList));
            }).catch(() => {
            });
        },
//        moveUp(index, row) { // 上移
//            this.topProList.splice(index, 1);
//            this.topProList.splice(index - 1, 0, row);
//        },
//        moveDown(index, row) { // 下移
//            this.topProList.splice(index, 1);
//            this.topProList.splice(index + 1, 0, row);
//        },
//        topHei(index, row) { // 置顶
//            this.topProList.splice(index, 1);
//            this.topProList.splice(0, 0, row);
//        },
        addNewbanner() { // 新增
            if (this.topProList.length < 200) {
                this.topProList.forEach(item => {
                    this.selectedData.push(item.proSku);
                });
                this.selectproNamedialog = true;
                this.topProListNum = this.topProList.length;
            } else {
                this.$alert('推荐商品数量最多为200，不可再推荐', '数量上限', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        goBack() {
            this.$router.go(-1);
        },
        saveproNameForm() { // 选择商品弹框确定按钮
            this.saveproNamebut = true;
        },
        saveproNamemErr() {
            this.hasProName = false;
            this.saveproNamebut = false;
        },
        saveproNamemSuc(val) {
            console.log('val-商品====>', val);
            this.proNameDatas = val;
//            let paraIndex = {};
//            val.forEach((item, index) => {
//                this.topProList.forEach((items, indexs) => {
//                    if (item.proSku !== items.proSku) {
//                        this.topProList.unshift(item);
//                        console.log(index);
//                        paraIndex[index] = 1;
//                    }
//                });
//            });
//            console.log('paraIndex--->', paraIndex);
//            val.forEach((item, index) => {
//                if (paraIndex[index]) {
//                    this.topProList.unshift(item);
//                }
//            });
            val.forEach(item => {
                this.topProList.unshift(item);
            });
//            this.topProList = this.topProList.concat(val);
            window.localStorage.setItem('topProList', JSON.stringify(this.topProList));
            this.hasProName = true;
            this.saveproNamebut = false;
            this.selectproNamedialog = false;
        },
        handleCheckAllChange() {
            if (this.checkAll) {
                this.areaValue = this.citieOption;
                this.checkedCity = true;
            } else {
                this.areaValue = [];
                this.checkedCity = false;
            }
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            if (checkedCount === this.areaAllNum) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
            if (checkedCount > 0) {
                this.checkedCity = true;
            } else {
                this.checkedCity = false;
            }
        },
        saveAllForm() { // 保存
            let params = {};
            let proNameDatasDele = [];
            this.loading = true;
            params.menuType = 17;
            params.menuGroup = 3;
            params.cityId = this.cityId;
            params.cityIds = this.areaValue;
            params.enabledStatus = this.enabledStatus_s;
            this.proNameDatasDele.forEach(item => {
                proNameDatasDele.push({
                    proSku: item.proSku,
                    proSpu: item.proSpu
                });
            });
            let proNameDatas = [];
            this.topProList.forEach(item => {
                if (item.addnew) {
                    proNameDatas.push(item);
                }
            });
            this.proNameDatas = proNameDatas;
            params.contentData = JSON.stringify(this.proNameDatas);
            params.delData = JSON.stringify(proNameDatasDele);
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/saveTopProduct`,
                data: params
            }).then(res => {
                if (res.data.remote.status !== '0000') {
                    this.loading = false;
                    window.$wxeMessage.error(res.data.remote.msg);
                } else {
                    this.loading = false;
                    this.goBack();
                    window.$wxeMessage.success(res.msg);
                }
            }).catch(error => {
                this.loading = false;
                console.log(error);
            });
//            if (this.topProList.length) {
//            } else {
//                window.$wxeMessage.warning('请先添加商品');
//            }
        },
        contentTypeConten(index, val) {
            let contentType = '';
            if (val === 1) {
                contentType = this.topProList[index].proName;
            }
            if (val === 2) {
                contentType = this.topProList[index].cateName;
            }
            if (val === 3) {
                contentType = this.topProList[index].venName;
            }
            if (val === 4) {
                contentType = this.topProList[index].pageTitle;
            }
            if (val === 5) {
                contentType = this.topProList[index].contentUrl;
            }
            return contentType;
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        },
        batchRemove() { // 批量删除
            if (this.selectedArray.length) {
                this.$confirm(`确定要删除选中的商品吗？`, '确认删除', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let resultIndex = {};
                    let resultData = [];
                    for (let j = 0, len = this.topProList.length; j < len; j++) {
                        for (let i = 0, lens = this.selectedArray.length; i < lens; i++) {
                            if (this.selectedArray[i].proSku === this.topProList[j].proSku) {
                                resultIndex[j] = 1;
                                break;
                            }
                        }
                    }
                    let deles = [];
                    this.topProList.some((item, index) => {
                        if (!resultIndex[index]) {
                            resultData.push(item);
                            return false;
                        }
                    });
                    this.selectedArray.forEach(item => {
                        if (!item.addnew) {
                            deles.push(item);
                        }
                    });
                    console.log('deles--->', deles);
                    this.topProList = resultData;
                    window.$wxeMessage.success('删除成功');
                    this.proNameDatasDele = this.proNameDatasDele.concat(deles);
                    window.localStorage.setItem('topProList', JSON.stringify(this.topProList));
                }).catch(() => {
                });
            } else {
                window.$wxeMessage.warning('请先勾需要删除的商户');
            }
        }
    },
    computed: {
        enabledStatusList() {
            return enabledStatus;
        }
    },
    components: {
        pronameAlert
    }
};
</script>
<style lang="scss">
    .errtishi_Left70 {
        .el-form-item__error {
            left: 70px;
        }
    }
    /*.other_HeiScro {*/
        /*position: relative;*/
        /*max-height: 741px;*/
        /*border-top: 1px solid #ced5de ;*/
        /*border-bottom: 1px solid #ced5de ;*/
        /*overflow-y: scroll;*/
    /*}*/
</style>
