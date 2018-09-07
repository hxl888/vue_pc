<template lang="html">
    <div class="m-router-con">
      <div class="tit-areaHea">
          <span style="margin-right: 20px">当前区域：{{areaName}}</span>
          <span>状态：{{enabledStatus | enabledStatusfilter}}</span>
      </div>
      <div>
        <el-table ref="contentList" :data="contentList" border>
          <el-table-column label="焦点图" prop="" width="160">
                <template scope="scope">
                    <div style="padding-top: 8px">
                        <img :src="picServer + scope.row.imgUrl" width="125" height="75">
                    </div>
                </template>
          </el-table-column>
          <el-table-column prop="contentType" label="类型">
              <template scope="scope">
                  <div>
                      {{scope.row.contentType | contentTypefilter}}
                  </div>
              </template>
          </el-table-column>
          <el-table-column label="详细信息" prop="" >
              <template scope="scope">
                  <div v-if="scope.row.contentType">
                      {{contentTypeConten(scope.$index, scope.row.contentType)}}
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
        if (to.params.cityId && to.params.menuType) {
            next(vm => {
                vm.areaName = to.params.areaName;
                vm.enabledStatus = to.params.enabledStatus;
                vm.getDetailByMenuType(to.params.cityId, to.params.menuType);
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
        getDetailByMenuType(cityId, menuType) {
            let params = {};
            params.cityId = cityId;
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
        contentTypeConten(index, val) {
            let contentType = '';
            if (val === 1) {
                contentType = this.contentList[index].proName;
            }
            if (val === 2) {
                contentType = this.contentList[index].cateName;
            }
            if (val === 3) {
                contentType = this.contentList[index].venName;
            }
            if (val === 4) {
                contentType = this.contentList[index].pageTitle;
            }
            if (val === 5) {
                contentType = this.contentList[index].contentUrl;
            }
            return contentType;
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>
