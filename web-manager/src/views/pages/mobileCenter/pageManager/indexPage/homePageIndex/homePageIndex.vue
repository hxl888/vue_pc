<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
        	<el-form :inline="true" :model="formsearch" ref="formsearch">
                <el-form-item prop="menuTitle">
                    <el-input v-model="formsearch.menuTitle" size="small" placeholder="请输入查询模块名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  class="xe-button-normal" @click="getIndexModuleList" type="primary">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal"  @click="resetForm('formsearch')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <span style="color: #687281;">当前区域：</span>
            <el-select size="small" v-model="formsearch.cityId" @change="areaSelecGo" placeholder="" class="xe-input-smal90">
                <el-option
                  v-for="item in currentAreaList"
                  :key="item.areaId"
                  :label="item.areaName"
                  :value="item.areaId">
                </el-option>
            </el-select>
        </div>
        <div class="tableList">
            <el-table class="zq-table" ref="indexModuleList" :data="indexModuleList" border v-loading="loading">
                <el-table-column prop="" width="55" label="">
                     <template scope="scope">
                        <div>{{scope.$index + 1}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="menuTitle" label="模块名称"></el-table-column>
                <el-table-column prop="enabledStatus" label="当前状态">
                    <template scope="scope">
                        <div>{{scope.row.enabledStatus | enabledStatusfilter}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="modifyUser" label="操作人"></el-table-column>
                <el-table-column prop="modifyDate" label="操作时间" sortable></el-table-column>
                 <el-table-column prop="" label="操作" width="140" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="viewDetails(scope.row)">查看</el-button>
                            <el-button type="text" class="zq-restore" @click="editorList(scope.row)">编辑</el-button>
                            <el-button type="text" v-if="scope.row.enabledStatus === 2 && scope.row.menuType !== 1 && scope.row.menuType !== 2" class="zq-restore" @click="enable(scope.$index, scope.row)">启用</el-button>
                            <el-button type="text" v-if="scope.row.enabledStatus === 1 && scope.row.menuType !== 1 && scope.row.menuType !== 2" class="zq-restore" @click="disenable(scope.$index, scope.row)">禁用</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange"
                :current-page="pagelist.currPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        if (from.path.indexOf('indexPage') !== -1) {
            next(vm => {
                let homePageIndexSelec = window.localStorage.getItem('homePageIndexSelec');
                vm.getIndexModuleList(); // 表单查询
                if (homePageIndexSelec) {
                    vm.formsearch.cityId = parseInt(homePageIndexSelec);
                } else {
                    vm.formsearch.cityId = vm.indexModulecityId;
                }
            });
        } else {
            next(vm => {
                vm.getIndexModuleList(() => {
                    vm.formsearch.cityId = vm.indexModulecityId;
                }); // 表单查询
            });
        }
    },
    data() {
        return {
            formsearch: {
                menuTitle: '',
                cityId: ''
            },
            areaName: '',
            selecRowIndex: '', // 单条信息下标
            selecRowArray: '', // 单条信息储存
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            indexModulecityId: '',
            loading: false,
            currentAreaList: [], // 当前区域下拉列表
            indexModuleList: [],
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getAreaList(); // 地区下拉框
    },
    methods: {
        areaSelecGo() {
            this.getIndexModuleList(); // 表单查询
            window.localStorage.setItem('homePageIndexSelec', this.formsearch.cityId);
        },
        getAreaList() {
            let params = {};
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getAllAreaList`,
                data: params
            }).then(res => {
                this.currentAreaList = res.data.areaList;
            }).catch(error => {
                console.log(error);
            });
        },
        enable(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.$confirm(`确定对该模块进行启用？`, '确认启用', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.enablepost(1);
            }).catch(() => {
            });
        },
        disenable(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.$confirm(`确定对该模块进行禁用？`, '确认禁用', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.enablepost(2);
            }).catch(() => {
            });
        },
        enablepost(status) { // 启用(禁用)模块接口
            let params = {};
            let URL = '';
            let _this = this;
            params.menuGroup = this.selecRowArray.menuGroup;
            params.cityId = this.formsearch.cityId;
            params.menuType = this.selecRowArray.menuType;
            if (status === 1) {
                URL = '/manager/cms/enable';
            } else if (status === 2) {
                URL = '/manager/cms/disable';
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}${URL}`,
                data: params
            }).then((res) => {
                window.$wxeMessage.success(res.msg);
//                if (status === 1) {
//                    this.indexModuleList[this.selecRowIndex].enabledStatus = 1;
//                } else if (status === 2) {
//                    this.indexModuleList[this.selecRowIndex].enabledStatus = 2;
//                }
                setTimeout(() => {
                    _this.getIndexModuleList();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        getIndexModuleList(fn) {
            let params = {};
            this.loading = true;
            params.menuTitle = this.formsearch.menuTitle;
            if (this.formsearch.cityId) {
                params.cityId = this.formsearch.cityId;
            }
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getIndexModuleList`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.indexModuleList = res.data.moduleList;
                this.indexModulecityId = res.data.cityId;
//                let homePageIndexSelec = window.localStorage.getItem('homePageIndexSelec');
//                if (homePageIndexSelec) {
//                    this.formsearch.cityId = parseInt(homePageIndexSelec);
//                } else {
//                    this.formsearch.cityId = res.data.cityId;
//                }
                fn && fn();
                this.areaName = res.data.areaName;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        viewDetails(row) {
            this.currentAreaList.forEach(item => {
                if (item.areaId === this.formsearch.cityId) {
                    this.areaName = item.areaName;
                }
            });
            if (row.menuType === 1) {
                this.$router.push({name: 'homePageManageFocusMapDetails', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 2) {
                this.$router.push({name: 'homePageManageShortcutEntranceDetails', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 3) {
                this.$router.push({name: 'homePageManageAdPositionDetails', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 4) {
                this.$router.push({name: 'homePageManagebannerOneDetails', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 5) {
                this.$router.push({name: 'homePageManageQualityMerchantDetails', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 6) {
                this.$router.push({name: 'homePageManagebannerTwoDetails', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            }
        },
        editorList(row) {
            this.currentAreaList.forEach(item => {
                if (item.areaId === this.formsearch.cityId) {
                    this.areaName = item.areaName;
                }
            });
            if (row.menuType === 1) {
                this.$router.push({name: 'homePageManageFocusMapEditor', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 2) {
                this.$router.push({name: 'homePageManageShortcutEntranceEditor', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 3) {
                this.$router.push({name: 'homePageManageAdPositionEditor', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 4) {
                this.$router.push({name: 'homePageManagebannerOneEditor', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 5) {
                this.$router.push({name: 'homePageManageQualityMerchantEditor', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 6) {
                this.$router.push({name: 'homePageManagebannerTwoEditor', params: {cityId: this.formsearch.cityId, areaName: this.areaName, menuType: row.menuType, enabledStatus: row.enabledStatus}});
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getIndexModuleList();
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.getIndexModuleList();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.currPage = val;
                this.getIndexModuleList();
            }
        }
    },
    watch: {
    }
};
</script>
