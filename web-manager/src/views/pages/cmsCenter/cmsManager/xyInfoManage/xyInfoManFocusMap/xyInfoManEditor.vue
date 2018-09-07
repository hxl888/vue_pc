<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
                <div class="item-tit clearfix">
                    <span>状态：{{$route.query.enabledStatus | enabledStatusfilter}}</span>
                </div>
            </div>
            <div class="u-opera-btnBox" style="padding: 0">
                <el-button class="xe-button-normal"  @click="addNewbanner">
                    <span class="iconfont icon-xinzeng"></span> 新增
                </el-button>
            </div>
        </div>
      <div>
            <el-table ref="contentList" :data="contentList" border>
                <el-table-column label="焦点图" prop="">
                <template scope="scope">
                    <div style="padding-top: 8px" v-if="scope.row.imgUrl">
                        <img :src="picServer + scope.row.imgUrl" width="200" height="100">
                    </div>
                    <div style="width: 200px;height: 100px" v-else></div>
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="contentTitle">
            </el-table-column>
            <el-table-column prop="" label="操作" width="215" fixed="right">
                <template scope="scope">
                    <div>
                        <el-button type="text" class="zq-restore" @click="editorRow(scope.$index, scope.row)">编辑</el-button>
                        <el-button type="text" class="zq-restore" v-if="contentList.length > 1" @click="removeRow(scope.$index)">删除</el-button>
                        <el-button type="text" v-if="contentList.length > 1 && scope.$index !== 0" class="zq-restore" @click="moveUp(scope.$index, scope.row)">上移</el-button>
                        <el-button type="text" v-if="contentList.length > 1 && scope.$index !== (contentList.length - 1)" class="zq-restore" @click="moveDown(scope.$index, scope.row)">下移</el-button>
                        <el-button type="text" v-if="contentList.length > 1 && scope.$index !== 0" class="zq-restore" @click="topHei(scope.$index, scope.row)">置顶</el-button>
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
                        <el-form-item prop="cmsArticleId" label="选择文章" required class="h-uploadImgBox">
                            <span @click="articleDialog = true">选择文章</span>
                            <div class="el-form-item__error" style="width: 200px;padding-top: 2px" v-if="error_article">请先选择文章</div>
                        </el-form-item>
                        <el-form-item prop="contentTitle" label="标题">
                            <el-input placeholder="标题" :maxlength="20" v-model="editorForm.contentTitle" style="width: 290px">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="imgUrl">
                            <div class="item-uploadImg_box item-uploadImg_box_reset clearfix" v-loading='loadingUploadImg'>
                                <div class="uploadImg-btn h-uploadImgBox">
                                    <span>选择文件</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i class="upload-des">建议上传图片尺寸为1920X250</i>
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
        <!--选择文章弹框-->
        <div>
            <el-dialog class="reset-dialog reset-dialog01"  title="选择文章" :visible.sync="articleDialog">
                <div style="padding-top: 5px">
                    <article-alert :savearticlebut="savearticlebut":articleDialog="articleDialog" @savearticleErr="savearticleErr" @savearticleSuc="savearticleSuc"></article-alert>
                </div>
                <div class="dialog-footer-bor">
                    <el-button type="primary" @click="savearticleForm">确定</el-button>
                    <el-button @click="articleDialog = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { enabledStatus } from '@/dataControl';
import articleAlert from './articleAlert';
export default {
    beforeRouteEnter(to, from, next) {
        if (to.query.cmsContentId && to.query.enabledStatus) {
            next(vm => {
                vm.getContentByCmsContentId(to.query.cmsContentId);
            });
        }
    },
    data() {
        return {
            contentList: [],
            editorForm: {
                contentUrl: '',
                contentTitle: '',
                contentDesc: '',
                cmsArticleId: '',
                imgUrl: ''
            },
            error_article: false,
            articleDialog: false, // 选择文章弹框
            savearticlebut: false, // 点击选择文章弹框确定（按钮已点击确认）
            hasarticle: false,  // 选择文章提交开关
            editorTit: '编辑',
            enabledStatus_s: '',
            loadingUploadImg: false,
            fileType: '2',
            uploadImg: [],
            picServer: '',
            selecRowIndex: '', // 编辑点击获取对应下标
            editordialog: false, // 修改弹框开关
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            rules: {
                contentTitle: [
                    { required: true, message: '标题不能为空', trigger: 'blur' }
                ],
                imgUrl: [
                    { required: true, message: '图片不能为空', trigger: 'change' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    methods: {
        getContentByCmsContentId(cmsContentId) {
            let params = {};
            params.cmsMenuId = cmsContentId;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cmsPc/getContentListByCmsMenuId`,
                data: params
            }).then((res) => {
                this.picServer = res.data.picServer;
                this.contentList = res.data.contentList;
            }).catch((error) => {
                console.log(error);
            });
        },
        removeRow(index) { // 删除
            this.$confirm(`确定要删除该焦点图吗？`, '确认删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.contentList.splice(index, 1);
            }).catch(() => {
            });
        },
        moveUp(index, row) { // 上移
            this.contentList.splice(index, 1);
            this.contentList.splice(index - 1, 0, row);
        },
        moveDown(index, row) { // 下移
            this.contentList.splice(index, 1);
            this.contentList.splice(index + 1, 0, row);
        },
        topHei(index, row) { // 置顶
            this.contentList.splice(index, 1);
            this.contentList.splice(0, 0, row);
        },
        addNewbanner() { // 新增
            if (this.contentList.length < 6) {
                this.selecRowIndex = '';
                this.selecRowArray = '';
                this.editordialog = true;
                this.editorTit = '新增';
                this.uploadImg = [];
                this.editorForm.imgUrl = '';
                this.editorForm.contentTitle = '';
                this.editorForm.cmsArticleId = '';
            } else {
                this.$alert('此处焦点图最多可添加六张，已达到数量上线', '数量上限', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        editorRow(index, row) {
            this.selecRowIndex = index;
            this.selecRowArray = row;
            this.editorTit = '编辑';
            this.editordialog = true;
            this.editorForm.imgUrl = row.imgUrl;
            this.uploadImg = [{imgName: row.imgUrl}];
            this.editorForm.contentTitle = row.contentTitle;
            this.editorForm.cmsArticleId = row.cmsArticleId;
            if (row.cmsArticleId) {
                this.hasarticle = true;
                this.error_article = false;
            }
        },
        preservation(formName) { // 修改保存
            this.$refs[formName].validate((valid) => {
                if (this.hasarticle) {
                    this.error_article = false;
                    if (valid) {
                        if (this.editorTit === '编辑') {
                            this.editordialog = false;
                            this.contentList[this.selecRowIndex].imgUrl = this.editorForm.imgUrl;
                            this.contentList[this.selecRowIndex].contentTitle = this.editorForm.contentTitle;
                            this.contentList[this.selecRowIndex].cmsArticleId = this.editorForm.cmsArticleId;
                        } else if (this.editorTit === '新增') {
                            this.editordialog = false;
                            this.contentList.push({
                                imgUrl: this.editorForm.imgUrl,
                                contentTitle: this.editorForm.contentTitle,
                                cmsArticleId: this.editorForm.cmsArticleId
                            });
                        }
                    } else {
                        return false;
                    }
                } else {
                    this.error_article = true;
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
        saveAllForm() { // 保存
            if (this.contentList.length >= 1) {
                let params = {};
                this.loading = true;
                params.menuType = 1;
                params.enabledStatus = this.$route.query.enabledStatus;
                params.cmsMenuId = this.$route.query.cmsContentId;
                params.contentData = JSON.stringify(this.contentList);
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
                this.$alert('至少添加一张焦点图才能保存', '提示', {
                    confirmButtonText: '确定',
                    type: 'info'
                });
            }
        },
        savearticleForm() { // 选择文章弹框确定按钮
            this.savearticlebut = true;
        },
        savearticleErr() {
            this.hasarticle = false;
            this.savearticlebut = false;
        },
        savearticleSuc(val) {
            this.articleDatas = val;
            this.hasarticle = true;
            this.savearticlebut = false;
            this.articleDialog = false;
            this.editorForm.cmsArticleId = this.articleDatas[0].cmsArticleId;
            this.editorForm.contentTitle = this.articleDatas[0].cmsArticleTitle;
        }
    },
    watch: {
        editordialog(n) {
            let _this = this;
            if (n === false) {
                setTimeout(() => {
                    _this.hasarticle = false;
                    _this.error_article = false;
                    _this.$refs.editorForm.resetFields();
                }, 300);
            }
        }
    },
    computed: {
        enabledStatusList() {
            return enabledStatus;
        }
    },
    components: {
        articleAlert
    }
};
</script>
