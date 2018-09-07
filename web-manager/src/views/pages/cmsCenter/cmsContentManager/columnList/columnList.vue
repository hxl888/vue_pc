<template lang="html">
    <div class="m-router-con">
        <div class="m-actionlist-con" v-if="columnData.length" v-loading="loading" element-loading-text="拼命加载中...">
            <div class="u-top-search">
                <el-button type="primary" class="xe-button-normal" @click.prevent="pageOneKey">一键生成资讯</el-button>
            </div>
            <el-tree
                style="max-width: 1200px;"
                v-if="columnData.length"
                class="tree_specSty"
                :data="columnData"
                :props="defaultProps"
                node-key="acId"
                :accordion="true"
                :render-content="renderContent">
            </el-tree>
        </div>
        <div v-if="!columnData.length">暂时没有数据</div>
        <el-dialog title="编辑" :visible.sync="dialogTableVisible" class="zw-resetDialog-w650 zw-resetDialog-w400">
            <div v-loading="addLoading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm-st1">
                     <el-form-item label="栏目级别">
                        <div v-if="ruleForm.cmsColumnLevel">{{ruleForm.cmsColumnLevel == 1 ? '一' : '二'}}级栏目</div>
                        <div v-else>无父级栏目</div>
                    </el-form-item>
                    <el-form-item label="父级栏目">
                        <div>{{ruleForm.cmsColumnParentName}}</div>
                    </el-form-item>
                    <el-form-item label="栏目名称" prop='cmsColumnName'>
                        <el-input v-model.trim="ruleForm.cmsColumnName" :maxlength="20" placeholder="请输入栏目名称20字以内"></el-input>
                    </el-form-item>
                     <el-form-item label="栏目描述" prop='cmsColumnDepict'>
                        <el-input v-model.trim="ruleForm.cmsColumnDepict" :maxlength="20" placeholder="请输入栏目描述20字以内"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog__footers">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" :loading="saveLoading" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                dialogTableVisible: false,
                loading: true,
                addLoading: false,
                saveLoading: false,
                columnData: [],
                parentAcIdArr: [],
                defaultProps: {
                    children: 'xeSysCmsPcColumnEntity',
                    label: 'cmsColumnName'
                },
                ruleForm: {
                    cmsColumnId: '',
                    cmsColumnName: '',
                    cmsColumnDepict: ''
                },
                rules: {
                    cmsColumnName: [
                        { required: true, message: '请输入栏目名称', trigger: 'blur' }
                    ]
                },
                shareVisible: false,
                shareActionList: [],
                shareThreeLevel: '',
                shareform: {
                    type: []
                },
                actionFlag: 1, // 1 是新增一级分类 2 是新增（2，3，4分类） 3 是修改
                productUrl: '/xe-route/xe-mis'
//            productUrl: ''
            };
        },
        created() {
            this.getselectColum();
        },
        methods: {
            getselectColum() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/contentManager/getColumn`,
                    data: params
                }).then(res => {
                    this.loading = false;
                    this.columnData = res.data.columnList;
                }).catch(error => {
                    console.log(error);
                });
            },
            editor(event, store, data) {
                event.stopPropagation();
                this.ruleForm.cmsColumnId = data.cmsColumnId;
                this.ruleForm.cmsColumnName = data.cmsColumnName;
                this.ruleForm.cmsColumnLevel = data.cmsColumnLevel;
                this.ruleForm.cmsColumnDepict = data.cmsColumnDepict;
                this.ruleForm.cmsColumnParentName = data.cmsColumnParentName;
                this.dialogTableVisible = true;
            },
            renderContent(h, {node, data, store}) {
                return (
                    <div class="clearfix">
                        <div class="fl">
                            <span>{node.label}</span>
                        </div>
                        <div class="treeEditor-options" style='float: right; margin-right: 20px'>
                            <el-button size="mini" on-click={ event => this.editor(event, store, data) }>修改</el-button>
                        </div>
                    </div>
                );
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.updateColumn();
                    } else {
                        return false;
                    }
                });
            },
            updateColumn() { // 栏目列表信息修改接口
                let _this = this;
                let params = {};
                this.saveLoading = true;
                params = this.ruleForm;
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/contentManager/updateColumn`,
                    data: params
                }).then(res => {
                    this.saveLoading = false;
                    setTimeout(() => {
                        _this.getselectColum();
                    }, 300);
                    this.dialogTableVisible = false;
                    window.$wxeMessage.success(res.msg);
                }).catch(error => {
                    console.log(error);
                    this.saveLoading = false;
                });
            },
            pageOneKey() { // 一键生成资讯
                this.$confirm(`确定一键生成资讯么？`, '键生成', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.createPageOneKey();
                }).catch(() => {
                });
            },
            createPageOneKey() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/contentManager/createPageOneKey`,
                    data: params
                }).then(res => {
                    window.$wxeMessage.success(res.msg);
                }).catch(error => {
                    console.log(error);
                });
            },
            resetForm() {
                if (this.$refs['ruleForm']) {
                    this.$refs['ruleForm'].resetFields();
                }
            }
        },
        watch: {
            dialogTableVisible(n) {
                let _this = this;
                if (n === false) {
                    setTimeout(() => {
                        _this.resetForm();
                    }, 300);
                }
            }
        }
    };
</script>
<style lang="scss">
    .el-tree {
        &.tree_specSty {
            padding: 15px 0;
            .treeEditor-options {
                display: none;
            }
            .el-tree-node__expand-icon {
                position: relative;
                top: 11px;
                display: block;
                float: left;
            }
            .el-tree-node__content:hover > div > .treeEditor-options{
                display: inline-block;
            }
        }
    }
</style>
