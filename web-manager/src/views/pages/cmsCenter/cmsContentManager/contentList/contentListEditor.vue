<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
                <div class="item-tit clearfix">
                    <p style="margin-right: 20px" class="fl">基础信息</p>
                </div>
            </div>
            <div class="serch-box">
                <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="60px">
                    <div class="for-itemlis">
                        <el-form-item label="栏目" prop="cmsColumnId">
                           <el-select size="small" v-model="filterForm.cmsColumnId" class="xe-input-col3" placeholder="请选择">
                                <el-option
                                    v-for="(item, index) in columnName"
                                    :label="item"
                                    :key="item"
                                    :value="index">
                                </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="标题" prop="cmsArticleTitle">
                            <el-input size="small" class="xe-input-col3" :maxlength="20" v-model="filterForm.cmsArticleTitle" placeholder="请输入用户姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="cmsArticleContent" required>
                            <div>
                                <ueditor ueditorPath="/xe-ueditor/" @ready='cmsEditorReady'></ueditor>
                            </div>
                            <div class="el-form-item__error" style="width: 200px;padding-top: 2px" v-if="error_ueditor">请输入内容</div>
                        </el-form-item>
                        <div>
                            <el-form-item label="状态" prop="cmsArticleStatus" required>
                                <el-radio-group v-model="filterForm.cmsArticleStatus">
                                    <el-radio v-for="(item, index) in cmsArticleStatusList" :label="item.value" :key='item.value'>{{item.name}}</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="member-btnBox" style="padding-bottom: 0">
                        <el-button class="xe-button-normal" type="primary" :loading="saveLoading" @click="saveData('filterForm')">
                            保存
                        </el-button>
                        <el-button class="xe-button-normal" @click="goBack">
                            取消
                        </el-button>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import ueditor from 'vue-ueditor';
import {cmsArticleStatus} from '@/dataControl';
export default {
    data() {
        return {
            filterForm: {
                cmsArticleId: '',
                cmsColumnId: '',
                cmsArticleTitle: '',
                cmsArticleContent: '',
                cmsArticleStatus: 1
            },
            articleData: '', // 回显数据
            columnName: '',
            error_ueditor: false, // 富文本提示
            cmseditorInstance: '', // 富文本
            cmsDesc: '', // 富文本
            saveLoading: false,
            rules: {
                cmsColumnId: [
                    { required: true, message: '栏目不能为空', trigger: 'change' }
                ],
                cmsArticleTitle: [
                    { required: true, message: '标题不能为空，长度在20个字符以内', trigger: 'blur' }
                ]
            },
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getColumnName(); // 栏目下拉选项获取
    },
    methods: {
        cmsEditorReady(editorInstance) {
            this.cmseditorInstance = editorInstance;
            this.getArticleOne(() => {
                editorInstance.setContent(this.cmsDesc);
            });
        },
        getArticleOne(fn) { // 编辑回显
            let cmsArticleId = this.$route.query.cmsArticleId;
            if (cmsArticleId) {
                let params = {};
                params.cmsArticleId = this.$route.query.cmsArticleId;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/contentManager/getArticleOne`,
                    data: params
                }).then((res) => {
                    this.articleData = res.data.article;
                    if (this.articleData.cmsColumnId) {
                        this.filterForm.cmsColumnId = this.articleData.cmsColumnId.toString();
                    }
                    this.filterForm.cmsArticleId = cmsArticleId;
                    this.cmsDesc = this.articleData.cmsArticleContent;
                    this.filterForm.cmsArticleTitle = this.articleData.cmsArticleTitle;
                    this.filterForm.cmsArticleContent = this.articleData.cmsArticleContent;
                    this.filterForm.cmsArticleStatus = this.articleData.cmsArticleStatus;
                    fn && fn();
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.goBack();
            }
        },
        getColumnName() {
            let params = {};
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/contentManager/getColumnName`,
                data: params
            }).then((res) => {
                this.columnName = res.data.columnMap;
            }).catch((error) => {
                console.log(error);
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        saveData(formName) {
            this.$refs[formName].validate((valid) => {
                let cmseditorInstance = this.cmseditorInstance ? this.cmseditorInstance.getContent() : '';
                if (cmseditorInstance) {
                    this.error_ueditor = false;
                } else {
                    this.error_ueditor = true;
                }
                if (valid) {
                    this.updateArticle(cmseditorInstance);
                } else {
                    return false;
                }
            });
        },
        updateArticle(cmseditorInstance) {
            if (cmseditorInstance) {
                let params = {};
                this.error_ueditor = false;
                this.saveLoading = true;
                params = this.filterForm;
                params.cmsArticleContent = cmseditorInstance;
                console.log('params', params);
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/contentManager/updateArticle`,
                    data: params
                }).then((res) => {
                    this.goBack();
                    this.saveLoading = false;
                    window.$wxeMessage.success(res.msg);
                }).catch((error) => {
                    console.log(error);
                    this.saveLoading = false;
                });
            } else {
                this.error_ueditor = true;
            }
        }
    },
    computed: {
        cmsArticleStatusList() {
            return cmsArticleStatus;
        }
    },
    components: {
        ueditor
    }
};
</script>
