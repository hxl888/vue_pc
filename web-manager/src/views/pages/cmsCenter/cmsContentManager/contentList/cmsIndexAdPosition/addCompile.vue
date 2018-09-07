<template lang="html">
    <div class="m-router-con">
        <div class="for-itemlis">
            <div class="item-head">
                <div class="item-tit clearfix">
                    <p style="margin-right: 20px" class="fl">基础信息</p>
                </div>
            </div>
            <div class="serch-box">
                <!-- {{filterForm}} -->
                <el-form ref="filterForm" :model="filterForm" :rules="rules" label-width="60px">
                    <div class="for-itemlis">
                        <el-form-item label="栏目" prop="column">
                            <el-select v-model="filterForm.column" class="xe-input-col3" placeholder="请选择活动区域">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标题" prop="title">
                            <el-input size="small" class="xe-input-col3" v-model="filterForm.title" placeholder="请输入用户姓名"></el-input>
                        </el-form-item>
                        <el-form-item label="内容" prop="content">
                            <div>
                                <ueditor ueditorPath="/xe-ueditor/" @ready='AppEditorReady'></ueditor>
                            </div>
                        </el-form-item>
                        <div>
                            <el-form-item label="状态" prop="state">
                                <el-radio-group v-model="filterForm.state">
                                    <el-radio label="已发布"></el-radio>
                                    <el-radio label="做草稿"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </div>
                    </div>
                    <div class="member-btnBox" style="padding-bottom: 0">
                        <el-button class="xe-button-normal" type="primary" @click="addProAll('filterForm')">
                            保存
                        </el-button>
                        <el-button class="xe-button-normal" @click="resetForm('filterForm')">
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
    export default {
        data() {
            return {
                filterForm: {
                    column: '',
                    title: '',
                    state: '做草稿',
                    content: ''
                },
                rules: {
                    column: [
                        { required: true, message: '栏目不能为空', trigger: 'blur' }
                    ],
                    title: [
                        { required: true, message: '标题不能为空，长度在20个字符以内', trigger: 'blur' }
                    ],
                    state: [
                        { required: true, message: '请选择状态', trigger: 'change' }
                    ],
                    content: [
                        { required: true, message: '请填写内容', trigger: 'change' }
                    ]
                }
            };
        },
        created() {
        },
        methods: {
            AppEditorReady(editorInstance) {
                this.appEditorInstance = editorInstance;
                if (this.appDesc) {
                    editorInstance.setContent(this.appDesc);
                }
            }
        },
        components: {
            ueditor
        }
    };
</script>
