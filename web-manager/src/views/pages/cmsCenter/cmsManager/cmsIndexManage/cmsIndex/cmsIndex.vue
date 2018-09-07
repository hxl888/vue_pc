<template lang="html">
    <div class="m-router-con">
        <!--<div class="u-opera-btnBox">-->
            <!--<el-button @click="createPageBatch"><i class="iconfont icon-shouye"></i>&nbsp;生成首页</el-button>-->
            <!--<el-button @click="createPageOneKey"><i class="iconfont icon-yijianshengcheng"></i>&nbsp;一键生成首页</el-button>-->
            <!--<el-button><i class="iconfont icon-shengchengyetou"></i>&nbsp;生成头部</el-button>-->
            <!--<el-button><i class="iconfont icon-shengchengyewei"></i>&nbsp;生成底部</el-button>-->
        <!--</div>-->
        <div class="tableList">
            <el-table class="zq-table" ref="indexModuleList" :data="indexModuleList" @selection-change="handleSelectionChange" border v-loading="loading">
                <el-table-column prop="" width="55" label="">
                     <template scope="scope">
                        <div>{{scope.$index + 1}}</div>
                    </template>
                </el-table-column>
                <el-table-column type="selection" width="50"></el-table-column>
                <el-table-column prop="menuTitle" label="模块名称">
                </el-table-column>
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
                            <el-button type="text" class="zq-restore"  @click="viewDetails(scope.row)">查看</el-button>
                            <el-button type="text" class="zq-restore" @click="editorList(scope.row)">编辑</el-button>
                            <el-button type="text" v-if="scope.row.enabledStatus == 2 && scope.row.menuType !== 1" class="zq-restore" @click="enable(scope.$index, scope.row)">启用</el-button>
                            <el-button type="text" v-if="scope.row.enabledStatus == 1 && scope.row.menuType !== 1" class="zq-restore" @click="disenable(scope.$index, scope.row)">禁用</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
       </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            areaName: '',
            selecRowIndex: '', // 单条信息下标
            selecRowArray: '', // 单条信息储存
            loading: false,
            currentAreaList: [], // 当前区域下拉列表
            indexModuleList: [],
            selectedArray: [], // 多选
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getIndexModuleList(); // 表单查询
    },
    methods: {
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
            params.cmsMenuId = this.selecRowArray.cmsMenuId;
            if (status === 1) {
                URL = '/manager/cmsPc/enable';
            } else if (status === 2) {
                URL = '/manager/cmsPc/disable';
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
        getIndexModuleList() {
            let params = {};
            this.loading = true;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cmsPc/getIndexModuleList`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.indexModuleList = res.data.moduleList;
            }).catch((error) => {
                console.log(error);
            });
        },
        viewDetails(row) {
            if (row.menuType === 1) {
                this.$router.push({name: 'cmsIndexFocusMapDetails', query: {cmsContentId: row.cmsMenuId, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 2) {
                this.$router.push({name: 'cmsIndexXyInformationDetails', query: {cmsContentId: row.cmsMenuId, enabledStatus: row.enabledStatus}});
            }
        },
        editorList(row) {
            if (row.menuType === 1) {
                this.$router.push({name: 'cmsIndexFocusMapEditor', query: {cmsContentId: row.cmsMenuId, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 2) {
                this.$router.push({name: 'cmsIndexXyInformationEditor', query: {cmsContentId: row.cmsMenuId, enabledStatus: row.enabledStatus}});
            }
        },
        createPageBatch() { // 生成页面
            if (this.selectedArray.length) {
                this.$confirm(`确定要生成页面？`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.createPagePost();
                }).catch(() => {
                });
            } else {
                this.$alert('请选择要生成内容', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        createPagePost() {
            let params = {};
            let _this = this;
            let cmsMenuIds = [];
            this.selectedArray.forEach(item => {
                cmsMenuIds.push(item.cmsMenuId);
            });
            params.cmsMenuIds = cmsMenuIds;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cmsPc/createPage`,
                data: params
            }).then(() => {
                window.$wxeMessage.success('已成功生成静态页');
                setTimeout(() => {
                    _this.getIndexModuleList();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        createPageOneKey() {
            this.$confirm(`确定要一键生成首页？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.createPageOneKeyPost();
            }).catch(() => {
            });
        },
        createPageOneKeyPost() {
            let params = {};
            let _this = this;
            params.menuGroup = 1;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cmsPc/createPageOneKey`,
                data: params
            }).then(() => {
                window.$wxeMessage.success('已成功生成首页');
                setTimeout(() => {
                    _this.getIndexModuleList();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        }
    }
};
</script>
