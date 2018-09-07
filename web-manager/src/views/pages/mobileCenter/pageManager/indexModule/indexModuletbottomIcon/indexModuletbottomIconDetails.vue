<template lang="html">
    <div class="m-router-con">
        <div class="tit-areaHea">
            <span>状态：{{enabledStatus | enabledStatusfilter}}</span>
        </div>
        <div>
            <el-table ref="contentList" :data="contentList" border>
                <el-table-column label="常规" prop="">
                    <template scope="scope">
                        <div style="padding-top: 8px">
                            <img :src="picServer + scope.row.imgUrl" width="125" height="75">
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="选中" prop="">
                    <template scope="scope">
                        <div style="padding-top: 8px">
                            <img :src="picServer + scope.row.focusImgUrl" width="125" height="75">
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="padding-top: 20px">
            <el-button type="primary" @click="goBack">返回</el-button>
        </div>
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        if (to.params.menuType) {
            next(vm => {
                vm.enabledStatus = to.params.enabledStatus;
                vm.getDetailByMenuType(to.params.menuType);
            });
        }
    },
    data() {
        return {
            contentList: [],
            areaName: '',
            enabledStatus: '',
            picServer: '',
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    methods: {
        getDetailByMenuType(menuType) {
            let params = {};
            params.menuType = menuType;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getDetailByMenuTypeAndCityId`,
                data: params
            }).then((res) => {
                this.contentList = res.data.contentList;
                this.picServer = res.data.picServer;
            }).catch((error) => {
                console.log(error);
            });
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
