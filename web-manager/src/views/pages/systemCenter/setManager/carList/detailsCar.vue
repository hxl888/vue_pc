<template lang="html">
    <div class="m-router-con">
    	<el-form class="detailsCar"  ref = "formData" :model = "formData" label-width = "85px">
            <div class="for-itemlis">
                <h4 class="tit-salesApply">基本信息</h4>
                <div>
                    <el-form-item label="车牌号:" prop="carPlateNum">
                        {{formData.carPlateNum}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="车辆长度(米):" prop="carLength">
                        {{formData.carLength}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="联系人:" prop="contactPerson">
                        {{formData.contactPerson}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="手机号:" prop="mobilePhone">
                        {{formData.mobilePhone}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="备注:" prop="remark">
                        {{formData.remark | noneToText}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="信息来源：" prop="carSource">
                        {{formData.carSource | carSourceToText}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="创建人:" prop="createUser">
                        {{formData.createUser}}
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="新增时间:" prop="createDate">
                        {{formData.createDate | millisecondFormat('ms')}}
                    </el-form-item>
                </div>
                <h4 class="tit-salesApply">承运信息</h4>
                <!-- listLineArr:{{listLineArr}} -->
                <div class="pub-tabDatadetails">
                    <el-tabs v-model="tabCard_val" type="card">
                        <el-tab-pane label="承运线路" name="first">
                            <div>
                                <el-table
                                :data="listLineArr"
                                border
                                style="width: 100%">
                                    <el-table-column
                                        label=""
                                        class-name="td-index"
                                        width="30">
                                        <template scope="props">
                                            <span>{{props.$index + 1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        label="线路"
                                        min-width="350">
                                        <template scope="props">
                                            {{props.row.startProvinceName + props.row.startCityName + props.row.startAreaName}} - {{props.row.endProvinceName + props.row.endCityName + props.row.endAreaName}}
                                        </template>
                                    </el-table-column>
                                    <!-- <el-table-column
                                        prop="logisticsCount"
                                        label="物流单数"
                                        min-width="150">
                                    </el-table-column> -->
                                </el-table>
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :current-page="pageInfo.pageNum"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageInfo.pageSize"
                                            layout="total, prev, pager, next, sizes, jumper"
                                            :total="pageInfo.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="服务商户" name="second">
                            <div>
                                <el-table
                                :data="venCarList"
                                border
                                style="width: 100%">
                                    <el-table-column
                                        label=""
                                        class-name="td-index"
                                        width="30">
                                        <template scope="props">
                                            <span>{{props.$index + 1}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="loginName"
                                        label="商户账号"
                                        min-width="200">
                                    </el-table-column>
                                    <el-table-column
                                        prop="shopName"
                                        label="店铺名称"
                                        min-width="200">
                                    </el-table-column>
                                    <el-table-column
                                        prop="venName"
                                        label="供应商名称"
                                        min-width="200">
                                    </el-table-column>
                                    <el-table-column
                                        prop="logisticsCount"
                                        label="物流单数"
                                        min-width="200">
                                    </el-table-column>
                                </el-table>
                                <div class="xe-pagination-panel">
                                    <el-pagination
                                            @size-change="handleSizeChange02"
                                            @current-change="handleCurrentChange02"
                                            :current-page="pageInfo02.pageNum"
                                            :page-sizes="[10, 20, 50, 100]"
                                            :page-size="pageInfo02.pageSize"
                                            layout="total, prev, pager, next, sizes, jumper"
                                            :total="pageInfo02.total">
                                    </el-pagination>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </div>
                <div>
                    <div class="u-next" style="padding: 15px 0 150px;">
                        <el-button class="xe-button-normal" @click="linkTolist">返回</el-button>
                    </div>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
import areaselectTag from '@/components/areaSelect/areaSelect';
export default {
    data() {
        return {
            formData: {
                carPlateNum: '',
                carLength: '',
                contactPerson: '',
                mobilePhone: '',
                remark: ''
            },
            pageInfo: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            pageInfo02: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            tabCard_val: 'first',
            listLineArr: [],
            venCarList: []
        };
    },
    created() {
        this.loadInfo(1);
        this.loadVenDetail(1);
    },
    methods: {
        linkTolist() {
            this.$router.push({name: 'carListIndex'});
        },
        loadInfo(pageNum) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/logisticsCar/queryLogisticsCarByCarId',
                data: {
                    carId: this.$route.query.carId,
                    pageNum: pageNum,
                    pageSize: this.pageInfo.pageSize
                }
            }).then((res) => {
                this.formData = res.data.responseDto.xeVenCarDTO;
                this.listLineArr = this.formData.listLine;
                if (res.data.responseDto.xePageInfoDto) {
                    this.pageInfo = res.data.responseDto.xePageInfoDto;
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSizeChange(val) {
            this.pageInfo.pageSize = val;
            this.loadInfo(this.pageInfo.pageNum);
        },
        handleCurrentChange(val) {
            this.pageInfo.pageNum = val;
            this.loadInfo(this.pageInfo.pageNum);
        },
        handleSizeChange02(val) {
            this.pageInfo02.pageSize = val;
            this.loadVenDetail(this.pageInfo02.pageNum);
        },
        handleCurrentChange02(val) {
            this.pageInfo02.pageNum = val;
            this.loadVenDetail(this.pageInfo02.pageNum);
        },
        loadVenDetail(pageNum) {
            this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/logisticsCar/venDetail',
                data: {
                    carId: this.$route.query.carId,
                    pageNum: pageNum,
                    pageSize: this.pageInfo02.pageSize
                }
            }).then((res) => {
                this.venCarList = res.data.responseDto.venCarList;
                this.pageInfo02 = res.data.responseDto.xePageInfoDto;
            }).catch((error) => {
                console.log(error);
            });
        }
    },
    components: {
        areaselectTag
    }
};
</script>

<style lang="scss">
    .detailsCar{
        .el-form-item__label{
            text-align: left;
        }
        .el-form-item__content{
            line-height: 30px;
        }
        .el-form-item{
            margin-bottom: 2px;
        }
    }
</style>
