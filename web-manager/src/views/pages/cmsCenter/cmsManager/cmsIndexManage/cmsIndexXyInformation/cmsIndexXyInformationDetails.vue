<template lang="html">
    <div class="m-router-con">
      <div class="tit-areaHea">
          <span>状态：{{$route.query.enabledStatus | enabledStatusfilter}}</span>
      </div>
      <div>
        <el-table ref="contentList" :data="contentList" border>
            <el-table-column label="图片" prop="">
                <template scope="scope">
                    <div style="padding-top: 8px" v-if="scope.row.imgUrl">
                        <img :src="picServer + scope.row.imgUrl" width="200" height="100">
                    </div>
                    <div style="width: 200px;height: 100px" v-else></div>
                </template>
            </el-table-column>
            <el-table-column label="建议尺寸" prop="">
                <template scope="scope">
                    <div style="color: #f83030">
                        {{sizeBox[scope.$index]}}
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="contentTitle">
            </el-table-column>
            <el-table-column label="简介" prop="contentDesc">
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
    data() {
        return {
            contentList: [],
            areaName: '',
            enabledStatus: '',
            picServer: '',
            sizeBox: ['520X320', ' 260X170', '260X170', '260X170', '260X170'],
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getContentByCmsContentId(this.$route.query.cmsContentId);
    },
    methods: {
        getContentByCmsContentId(cmsContentId) {
            if (cmsContentId) {
                let params = {};
                params.cmsMenuId = cmsContentId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/cmsPc/getContentListByCmsMenuId`,
                    data: params
                }).then((res) => {
                    this.contentList = res.data.contentList;
                    this.picServer = res.data.picServer;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
