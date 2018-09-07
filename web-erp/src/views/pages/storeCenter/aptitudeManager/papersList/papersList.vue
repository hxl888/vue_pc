<template>
    <div class="m-router-con">
        <div class="m-title-con">
            <h3>证照管理</h3>
        </div>
        <div class="m-papersList-con">
            <ul class="clearfix">
                <li v-for="item in papersList" :key="item.apId">
                    <template v-if="item.apStatus === 2">
                        <div class="uped">
                            <!--已上传-->
                            <img :src="picServer + item.apUrl">
                            <span v-if="item.apStatus !== 2" class="el-icon-circle-close"></span>
                        </div>
                        <div class="up-name">
                            {{item.apName}}
                        </div>
                        <div class="up-status succ">
                            {{item.apStatus | apStatusToText}}
                        </div>
                    </template>
                    <template v-else>
                        <div class="nouped" v-if="item.apStatus === 9">
                            <!--未上传-->
                            <div class="upload-large">
                                <div>
                                    <span class="iconfont icon-upload2"></span>
                                    <p>上传文件</p>
                                </div>
                                <form name="papersForm" class="formfile">
                                    <input
                                        title="请编辑或者上传图片"
                                        accept="image/gif,image/jpeg,image/jpg,image/png"
                                        type="file"
                                        class="imgFiles"
                                        name='imgFiles'
                                        @change="papersImgUpload($event, item)"
                                    >
                                </form>
                            </div>
                        </div>
                        <div class="uped" v-else>
                            <!--已上传-->
                            <img :src="picServer + item.apUrl">
                            <span class="el-icon-circle-close" @click="upedClear($event, item)"></span>
                        </div>
                        <div class="up-name">
                            {{item.apName}}
                        </div>
                        <div class="up-status" :class="{'red': item.apStatus === 1 || item.apStatus === 3}">
                            {{item.apStatus | apStatusToText}}
                        </div>
                        <div class="up-btn" v-if="item.apStatus === 8">
                            <el-button class="xe-button-small" :loading="item.loading" @click="updateAptitudeInfo(item)">提交</el-button>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                papersList: [],
                picServer: ''
            };
        },
        created() {
            this.queryAptitudeInfo();
        },
        methods: {
            queryAptitudeInfo() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeaptitude/queryAptitudeInfo',
                    data: {}
                }).then(res => {
                    console.log(res);
                    this.picServer = res.data.picServer;
                    this.papersList = res.data.aptitudeList;
                }).catch(error => {
                    console.log(error);
                });
            },
            updateAptitudeInfo(item) {
                this.$set(item, 'loading', true);
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-erp/xeaptitude/updateAptitudeInfo',
                    data: {
                        apFlag: item.apFlag,
                        apId: item.apId,
                        apUrl: item.apUrl,
                        apName: item.apName
                    }
                }).then(res => {
                    console.log(res);
                    this.$xeMessage.success('提交成功');
                    item.loading = false;
                    item.apStatus = 1;
                }).catch(error => {
                    console.log(error);
                    item.loading = false;
                });
            },
            papersImgUpload(event, item) {
                let formData = new FormData($(event.target).parent('.formfile')[0]);
                formData.append('fileType', 3);
                this.$http({
                    method: 'post',
                    url: '/xe-zuul/xe-route/xe-mis/manager/uploadImg/manImgUpload',
                    data: formData
                }).then(res => {
                    console.log(res);
                    item.apUrl = res.data.imgInfoList[0].imgName;
                    item.apStatus = 8;
                }).catch(error => {
                    console.log(error);
                });
            },
            upedClear(event, item) {
                item.apStatus = 9;
                $(event.target || event.srcElement).parents('.m-papersList-con').find('.imgFiles').val('');
            }
        },
        filters: {
            apStatusToText(type) {
                let obj = {
                    1: '待审核',
                    2: '审核通过',
                    3: '驳回'
                };
                return obj[type];
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss"></style>
