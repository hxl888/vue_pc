<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
            <el-form :inline="true" :model="formsearch" ref="formsearch">
                <el-form-item class="z-mr30" prop="menuTitle">
                    <el-input v-model="formsearch.menuTitle" size="small" placeholder="请输入查询模块名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button  class="xe-button-normal" @click="getDefaultModuleList" type="primary">
                        查询
                    </el-button>
                    <el-button class="xe-button-normal"  @click="resetForm('formsearch')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="goodsTable">
            <el-table ref="moduleList" :data="moduleList" border v-loading="loading">
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
                 <el-table-column prop="" label="操作" width="105" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="viewDetails(scope.row)">查看</el-button>
                            <el-button type="text" class="zq-restore" @click="editorList(scope.row)">编辑</el-button>
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
            formsearch: {
                menuTitle: '',
                cityId: ''
            },
            moduleList: [],
            loading: false,
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 0
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getDefaultModuleList(); // 表单查询
    },
    methods: {
        getDefaultModuleList() {
            let params = {};
            this.loading = true;
            params.menuTitle = this.formsearch.menuTitle;
            params.pageNum = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getDefaultModuleList`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.moduleList = res.data.moduleList;
//                this.formsearch.cityId = res.data.cityId;
//                this.areaName = res.data.areaName;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        viewDetails(row) {
            if (row.menuType === 7) {
                this.$router.push({name: 'indexModuleFocusMapDetails', params: {menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 8) {
                this.$router.push({name: 'indexModuleShortcutEntranceDetails', params: {menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 9) {
                this.$router.push({name: 'indexModuletbottomIconDetails', params: {menuType: row.menuType, enabledStatus: row.enabledStatus}});
            }
        },
        editorList(row) {
            if (row.menuType === 7) {
                this.$router.push({name: 'indexModuleFocusMapEditor', params: {menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 8) {
                this.$router.push({name: 'indexModuleShortcutEntranceEditor', params: {menuType: row.menuType, enabledStatus: row.enabledStatus}});
            } else if (row.menuType === 9) {
                this.$router.push({name: 'indexModuletbottomIconEditor', params: {menuType: row.menuType, enabledStatus: row.enabledStatus}});
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.getDefaultModuleList();
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.getDefaultModuleList();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.currPage = val;
                this.getDefaultModuleList();
            }
        }
    }
};
</script>

<style lang="scss">
</style>
