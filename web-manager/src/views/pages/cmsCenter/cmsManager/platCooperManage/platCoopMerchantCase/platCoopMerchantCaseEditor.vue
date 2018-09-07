<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
               <p>
                    状态：
                     <el-radio-group v-model="enabledStatus_s">
                         <el-radio v-for="(item, index) in enabledStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                     </el-radio-group>
                </p>
            </div>
            <!--<div class="u-opera-btnBox" style="padding: 0">-->
                <!--<el-button class="xe-button-normal"  @click="addNewbanner">-->
                    <!--<span class="iconfont icon-xinzeng"></span> 新增-->
                <!--</el-button>-->
            <!--</div>-->
        </div>
      <div>
            <el-table ref="contentList" :data="contentList" border>
                <el-table-column label="图片" prop="">
                    <template scope="scope">
                        <div style="padding-top: 8px" v-if="scope.row.imgUrl">
                            <img  :src="picServer + scope.row.imgUrl" width="125" height="75">
                        </div>
                        <div v-else style="width: 125px;height: 75px;padding-top: 8px"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="contentTitle" label="推荐名称">
                </el-table-column>
                <el-table-column prop="contentDesc" label="简介">
                </el-table-column>
                <el-table-column prop="" label="操作" width="65" fixed="right">
                    <template scope="scope">
                        <div>
                            <el-button type="text" class="zq-restore" @click="editorRow(scope.$index, scope.row)">编辑</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
      </div>
      <div style="padding-top: 20px">
          <el-button type="primary" :loading="loading" @click="saveAllForm">保存</el-button>
          <el-button @click="goBack">取消</el-button>
      </div>
        <!--新增修改弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog05" :title="editorTit" :visible.sync="editordialog">
                <div class="editor_body">
                    <el-form :inline="true" :rules="rules" :model="editorForm" ref="editorForm" labelWidth="70px">
                        <el-form-item prop="contentTitle" label="推荐名称">
                            <el-input placeholder="请输入推荐名称" :maxlength="20" v-model="editorForm.contentTitle" style="width: 290px">
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="contentDesc" label="简介">
                            <el-input placeholder="请输入简介100字符以内" type="textarea" :maxlength="100" v-model="editorForm.contentDesc" style="width: 290px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="imgUrl">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">建议上传图片尺寸为100X50</i>
                                    <form name='form' id='formFile'>
                                        <input type="hidden" name="fileType" v-model="fileType">
                                        <input type="file" name='imgFiles'  class='inputFile2' @change="inputFile2Fn('formFile')" accept="image/gif,image/jpeg,image/jpg,image/png">
                                    </form>
                                </div>
                                <p v-if="uploadImg.length && uploadImg[0].imgName" v-for='item in uploadImg' class="h-brand-img" style="width: 62px">
                                    <img :src="picServer + item.imgName" alt="" style="width: 62px; height: 62px;">
                                    <span style="width: 62px;bottom: 10px" @click.prevent='removeImg()'>删除</span>
                                </p>
                            </div>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" @click="preservation('editorForm')">确定</el-button>
                    <el-button @click="editordialog = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { contentType, enabledStatus } from '@/dataControl';
export default {
    beforeRouteEnter(to, from, next) {
        if (to.query.cmsContentId && to.query.enabledStatus) {
            next(vm => {
                vm.enabledStatus_s = parseInt(to.query.enabledStatus);
                vm.getContentByCmsContentId(to.query.cmsContentId);
            });
        }
    },
    data() {
        return {
            contentList: [],
            editorForm: {
                imgUrl: '',
                contentDesc: '',
                contentTitle: ''
            },
            editorTit: '编辑',
            loadingUploadImg: false,
            fileType: '2',
            uploadImg: [],
            picServer: '',
            enabledStatus_s: '',
            selecRowIndex: '', // 编辑点击获取对应下标
            editordialog: false, // 修改弹框开关
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            rules: {
                imgUrl: [
                    { required: true, message: '图片不能为空', trigger: 'change' }
                ],
                contentTitle: [
                    { required: true, message: '推荐名称不能为空', trigger: 'change' }
                ],
                contentDesc: [
                    { required: true, message: '简介不能为空', trigger: 'change' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
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
                    this.picServer = res.data.picServer;
                    if (res.data.contentList && res.data.contentList.length) {
                        this.contentList = res.data.contentList;
                    } else {
                        for (let i = 0; i < 4; i++) {
                            this.contentList.push({
                                imgUrl: '',
                                contentTitle: '',
                                contentDesc: ''
                            });
                        }
                    }
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
//        addNewbanner() { // 新增
//            if (this.contentList.length < 6) {
//                this.selecRowIndex = '';
//                this.selecRowArray = '';
//                this.editordialog = true;
//                this.editorTit = '新增';
//                this.uploadImg = [];
//            } else {
//                this.$alert('此处焦点图最多可添加六张，已达到数量上线', '数量上限', {
//                    confirmButtonText: '确定',
//                    type: 'info'
//                });
//            }
//        },
        editorRow(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.editorTit = '编辑';
            this.editordialog = true;
            this.editorForm.imgUrl = row.imgUrl;
            this.uploadImg = [{imgName: row.imgUrl}];
            this.editorForm.contentDesc = row.contentDesc;
            this.editorForm.contentTitle = row.contentTitle;
        },
        preservation(formName) { // 修改保存
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.editorTit === '编辑') {
                        this.editordialog = false;
                        this.contentList[this.selecRowIndex].imgUrl = this.editorForm.imgUrl;
                        this.contentList[this.selecRowIndex].contentDesc = this.editorForm.contentDesc;
                        this.contentList[this.selecRowIndex].contentTitle = this.editorForm.contentTitle;
                    }
                } else {
                    return false;
                }
            });
        },
        inputFile2Fn(id) {
            this.loadingUploadImg = true;
            var formData = new FormData(document.getElementById(id));
            this.$http({
                method: 'post',
                url: `/xe-zuul/${this.productUrl}/manager/uploadImg/manImgUpload`,
                data: formData
            }).then(res => {
                let imgInfoList = res.data.imgInfoList;
                this.picServer = res.data.picServer;
                this.uploadImg = imgInfoList;
                this.loadingUploadImg = false;
                this.editorForm.imgUrl = imgInfoList[0].imgName;
            }).catch(error => {
                console.log(error);
            });
        },
        removeImg() {
            this.uploadImg = '';
            this.editorForm.imgUrl = '';
        },
        goBack() {
            this.$router.go(-1);
        },
        resetForm(contentType) {
        },
        saveAllForm() { // 保存
            let flag = this.contentList.every(item => {
                return item.imgUrl !== '';
            });
            if (flag) {
                let params = {};
                this.loading = true;
                params.enabledStatus = this.enabledStatus_s;
                params.cmsMenuId = this.$route.query.cmsContentId;
                params.contentData = JSON.stringify(this.contentList);
                params.menuType = 3;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/cmsPc/insertContent`,
                    data: params
                }).then(res => {
                    if (res.data.remote.status !== '0000') {
                        this.loading = false;
                        window.$wxeMessage.error(res.data.remote.msg);
                    } else {
                        this.goBack();
                        this.loading = false;
                        window.$wxeMessage.success(res.msg);
                    }
                }).catch(error => {
                    this.loading = false;
                    console.log(error);
                });
            } else {
                this.$alert('四条数据编辑完成才能保存', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        }
    },
    watch: {
        editordialog(n) {
            let _this = this;
            if (n === false) {
                setTimeout(() => {
                    _this.$refs.editorForm.resetFields();
                }, 300);
            }
        }
    },
    computed: {
        contentTypeList() {
            return contentType;
        },
        enabledStatusList() {
            return enabledStatus;
        }
    }
};
</script>
