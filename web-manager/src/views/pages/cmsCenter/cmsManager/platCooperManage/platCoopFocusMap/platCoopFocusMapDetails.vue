<template lang="html">
    <div class="m-router-con">
      <div class="tit-areaHea">
          <span>状态：{{$route.query.enabledStatus | enabledStatusfilter}}</span>
      </div>
      <div>
        <el-table ref="contentList" :data="contentList" border>
          <el-table-column label="焦点图" prop="">
                <template scope="scope">
                    <div style="padding-top: 8px">
                        <img :src="picServer + scope.row.imgUrl" width="125" height="75">
                    </div>
                </template>
          </el-table-column>
          <el-table-column prop="contentUrl" label="对应链接">
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
