<template lang="html">
    <div class="m-router-con">
        <div class="m-actionlist-con" v-loading="loading" element-loading-text="拼命加载中...">
            <div class="u-top-search">
                <el-button type="primary" class="xe-button-normal" @click.prevent="addNewLevelOne">新增一级菜单</el-button>
            </div>
            <el-tree
                style="max-width: 1200px;"
                class="tree_border"
                v-if="data2.length"
                :data="data2"
                :props="defaultProps"
                node-key="acId"
                :accordion="true"
                :render-content="renderContent">
            </el-tree>
        </div>
        <el-dialog title="新增资源" :visible.sync="dialogTableVisible" class="zw-resetDialog-w650">
            <div v-loading="addLoading">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="70px" class="demo-ruleForm-st1">
                    <el-form-item label="所属服务" prop="serviceName">
                        <el-select v-model="ruleForm.serviceName" placeholder="请选择所属服务" style="width: 100%;" :disabled="serviceNameFlag">
                            <el-option v-for="(item, index) in serviceNameArr" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单级别" prop="acLevel">
                        <el-select v-model="ruleForm.acLevel" placeholder="请选择资源级别" style="width: 100%;" disabled>
                            <el-option v-for="(item, index) in acLevelArr" :label="item.name" :value="item.id" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="父级资源" prop="parentAcId">
                        <el-select v-model="ruleForm.parentAcId" placeholder="请选择活动区域" style="width: 100%;" disabled>
                            <el-option v-for="(item, index) in parentAcIdArr" :label="item.acName" :value="item.acId" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="菜单名称" prop='acName'>
                        <el-input v-model.trim="ruleForm.acName" placeholder="如: 系统中心"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单Key" prop="acKey">
                        <el-input v-model.trim="ruleForm.acKey"placeholder="如: systemCenter"></el-input>
                    </el-form-item>
                    <el-form-item label="菜单URL" prop="url">
                        <el-input v-model.trim="ruleForm.url" placeholder="对应的controller请求路径，如：/user/sys/login"></el-input>
                    </el-form-item>
                    <el-form-item label="白名单">
                        <el-switch on-text="是" off-text="否" :on-value="2" :off-value="1"  v-model="ruleForm.whiteFlag"></el-switch>
                    </el-form-item>
                    <el-form-item label="是否启用">
                        <el-switch on-text="启用" off-text="禁用" :on-value="1" :off-value="2" v-model="ruleForm.lockStatus"></el-switch>
                    </el-form-item>
                    <el-form-item label="资源描述" prop="acDesc">
                        <el-input type="textarea" v-model.trim="ruleForm.acDesc"></el-input>
                    </el-form-item>
                </el-form>
                <div class="dialog__footers">
                    <el-button @click="dialogTableVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog title="设置共享菜单" :visible.sync="shareVisible" class="zw-resetDialog-w650">
            <el-form v-if="shareActionList.length" ref="form" :model="shareform" label-width="80px">
                <el-form-item label="可设置菜单">
                    <el-checkbox-group v-model="shareform.type">
                        <el-checkbox v-for="item in shareActionList" :label="item.acId" name="type" :key="item.acId">{{item.acName}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="shareAdd">添 加</el-button>
                    <el-button @click.prevent="shareVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
            <div style="text-align: center" v-else>暂无可共享的菜单</div>
        </el-dialog>
    </div>
</template>

<script>
    import {Switch} from 'element-ui';
    let nowStore = null;
    let nowData = null;
    export default {
        data() {
            return {
                dialogTableVisible: false,
                loading: true,
                addLoading: false,
                data2: [],
                acLevelArr: [
                    {
                        name: '一级资源',
                        id: 1
                    },
                    {
                        name: '二级资源',
                        id: 2
                    },
                    {
                        name: '三级资源',
                        id: 3
                    },
                    {
                        name: '四级资源',
                        id: 4
                    }
                ],
                serviceNameArr: [
                    {
                        name: '云ERP',
                        id: 'xe-erp'
                    },
                    {
                        name: '云管理平台',
                        id: 'xe-mis'
                    },
                    {
                        name: '商品中心',
                        id: 'xe-pro'
                    },
                    {
                        name: '权限中心',
                        id: 'xe-rms'
                    }
                ],
                parentAcIdArr: [],
                defaultProps: {
                    children: 'actionList',
                    label: 'acName'
                },
                serviceNameFlag: false,
                ruleForm: {
                    serviceName: 'xe-erp', // 所属服务 xe-erp：云ERP, xe-mis:云管理平台，xe-pro:商品中心，xe-rms:权限中心
                    acLevel: 1, // 菜单层级 1：一级菜单 2：二级菜单 3：三级菜单 4：四级菜单
                    parentAcId: 1, // 父级菜单id
                    acName: '', // 菜单名称字符长度2-20
                    acKey: '', // 菜单key字符长度1-50
                    url: '', // 菜单url路径字符长度1-100
                    acDesc: '', // 菜单描述字符长度0-50
                    whiteFlag: 1, // 是否为白名单权限(不做权限验证) 1:否，2：是
                    lockStatus: 1 // 启用状态 1:启用，2:停用
                },
                rules: {
                    acLevel: [
                        { type: 'number', required: true, message: '请选择资源级别', trigger: 'change' }
                    ],
                    parentAcId: [
                        { type: 'number', required: true, message: '请选择父级资源', trigger: 'change' }
                    ],
                    acName: [
                        { required: true, message: '请输入资源名称', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    acKey: [
                        { required: true, message: '请输入资源Key', trigger: 'blur' },
                        { min: 1, max: 50, message: '长度在 1 到 50 个字符', trigger: 'blur' },
                        { pattern: /^[\w0-9]+$/, message: '只能输入英文字母或者数字', trigger: 'blur' }
                    ],
                    url: [
                        { type: 'string', required: true, message: '请输入资源Url', trigger: 'blur' },
                        { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
                        { pattern: /^[\w0-9/]+$/, message: '只能输入英文字母', trigger: 'blur' }
                    ]
                },
                shareVisible: false,
                shareActionList: [],
                shareThreeLevel: '',
                shareform: {
                    type: []
                },
                actionFlag: 1 // 1 是新增一级分类 2 是新增（2，3，4分类） 3 是修改
            };
        },
        created() {
            this.queryActionTree();
        },
        methods: {
            queryActionTree() {
                this.$http({
                    methods: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/queryActionTree',
                    data: {}
                }).then(res => {
                    console.log(res);
                    this.loading = false;
                    this.data2 = res.data.actionTreeList;
                }).catch(error => {
                    console.log(error);
                });
            },
            addNewLevelOne() {
                this.dialogTableVisible = true;
                this.resetForm();
                this.actionFlag = 1;
                this.serviceNameFlag = false;
                this.parentAcIdArr = [{
                    acName: '不可选择父级资源',
                    acId: 0
                }];
                this.ruleForm.serviceName = 'xe-erp';
                this.ruleForm.parentAcId = 0;
                this.ruleForm.acLevel = 1;
            },
            append(event, store, data) {
                event.stopPropagation();
                // 当前数据暂存
                nowStore = store;
                nowData = data;
                this.serviceNameFlag = true;
                this.resetForm();
                this.actionFlag = 2;
                this.dialogTableVisible = true;
                this.parentAcIdArr = [{
                    acName: data.acName,
                    acId: data.acId
                }];
                this.ruleForm.serviceName = data.serviceName;
                this.ruleForm.parentAcId = data.acId;
                this.ruleForm.acLevel = data.acLevel + 1;
            },
            editor(event, store, data) {
                event.stopPropagation();
                nowStore = store;
                nowData = data;
                this.serviceNameFlag = true;
                this.resetForm();
                this.actionFlag = 3;
                this.dialogTableVisible = true;
                this.queryAction(data.acId, actionData => {
                    if (actionData.acLevel === 1) {
                        this.parentAcIdArr = [{
                            acName: '不可选择父级资源',
                            acId: 0
                        }];
                    } else {
                        this.parentAcIdArr = [{
                            acName: actionData.parentAcName,
                            acId: actionData.parentAcId
                        }];
                    }
                    this.ruleForm.serviceName = actionData.serviceName;
                    this.ruleForm.acLevel = actionData.acLevel;
                    this.ruleForm.parentAcId = actionData.parentAcId;
                    this.ruleForm.acName = actionData.acName;
                    this.ruleForm.acKey = actionData.acKey;
                    this.ruleForm.url = actionData.url;
                    this.ruleForm.acDesc = actionData.acDesc;
                    this.ruleForm.whiteFlag = actionData.whiteFlag;
                    this.ruleForm.lockStatus = actionData.lockStatus;
                });
            },
            remove(event, store, data) {
                event.stopPropagation();
                this.$xeMessageBox.confirm('确信删除此资源？').then(action => {
                    this.delAction(data.acId, resdata => {
                        store.remove(data);
                    });
                }).catch(cancel => {
                    console.log(cancel);
                });
            },
            queryShare(event, store, data) {
                event.stopPropagation();
                nowStore = store;
                nowData = data;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/queryShareActionList',
                    data: {
                        acId: data.acId
                    }
                }).then(res => {
                    console.log(res);
                    this.shareVisible = true;
                    this.shareThreeLevel = data.acId;
                    this.shareActionList = res.data.actionList;
                }).catch(error => {
                    console.log(error);
                });
            },
            shareAdd() {
                if (!this.shareform.type.length) {
                    this.$xeMessage.warning('请至少选择一项');
                    return;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/addShareAction',
                    data: {
                        parentAcId: this.shareThreeLevel,
                        acIdList: this.shareform.type
                    }
                }).then(res => {
                    console.log(res);
                    this.shareVisible = false;
                    nowData.actionList.push(...res.data.actionList);
                }).catch(error => {
                    console.log(error);
                });
            },
            setShare(event, store, data) {
                // 四级设置或取消共享
                event.stopPropagation();
                console.log(data);
                if (data.shareFlag === 1) {
                    // 设置成共享
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-rms/oauth/erp/shareAction',
                        data: {
                            acId: data.acId
                        }
                    }).then(res => {
                        console.log(res);
                        data.shareFlag = 2;
                        this.$xeMessage.success('设置共享成功');
                    }).catch(error => {
                        console.log(error);
                    });
                } else {
                    // 取消共享
                    this.$http({
                        method: 'post',
                        url: '/xe-route/xe-rms/oauth/erp/cancelShareAction',
                        data: {
                            acId: data.acId
                        }
                    }).then(res => {
                        console.log(res);
                        data.shareFlag = 1;
                        this.$xeMessage.success('取消共享成功');
                    }).catch(error => {
                        console.log(error);
                    });
                }
            },
            renderContent(h, {node, data, store}) {
                let btntext = '';
                if (data.acLevel === 1) {
                    btntext = '新增二级分类';
                } else if (data.acLevel === 2) {
                    btntext = '新增三级分类';
                } else if (data.acLevel === 3) {
                    btntext = '新增四级分类';
                } else {
                };
                return (
                    <div class="clearfix">
                        <div class="fl">
                            <span>{node.label}</span>
                        </div>
                        <div style='float: right; margin-right: 20px'>
                            {
                                data.acLevel === 3 ? <el-button size="mini" on-click={ event => this.queryShare(event, store, data) }>查询共享菜单</el-button> : ''
                            }
                            {
                                data.acLevel !== 4 ? <el-button size="mini" on-click={ event => this.append(event, store, data) }>{btntext}</el-button> : ''
                            }
                            {
                                data.acLevel === 4 && data.shareFlag !== 3 ? <el-button size="mini" on-click={ event => this.setShare(event, store, data) }>{data.shareFlag === 1 ? '设置共享' : '取消共享'}</el-button> : ''
                            }
                            <el-button size="mini" on-click={ event => this.editor(event, store, data) }>修改</el-button>
                            <el-button size="mini" on-click={ event => this.remove(event, store, data) }>删除</el-button>
                        </div>
                    </div>
                );
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.actionFlag === 1) {
                            console.log('新增1级');
                            this.addAction(data => {
                                if (data.code === '0000') {
                                    this.data2.push({
                                        acId: data.acId,
                                        acName: this.ruleForm.acName,
                                        actionList: [],
                                        acLevel: data.acLevel,
                                        lockStatus: this.ruleForm.lockStatus,
                                        parentAcId: this.ruleForm.parentAcId,
                                        serviceName: this.ruleForm.serviceName,
                                        whiteFlag: this.ruleForm.whiteFlag
                                    });
                                    this.dialogTableVisible = false;
                                } else {
                                    this.$xeMessage.error(data.msg);
                                }
                            });
                        } else if (this.actionFlag === 2) {
                            console.log('新增2,3,4级');
                            this.addAction(data => {
                                if (data.code === '0000') {
                                    nowStore.append({ acId: data.acId, acName: this.ruleForm.acName, actionList: [], acLevel: data.acLevel, serviceName: data.serviceName }, nowData);
                                    this.dialogTableVisible = false;
                                } else {
                                    this.$xeMessage.error(data.msg);
                                }
                            });
                        } else {
                            console.log('修改');
                            this.modifyAction(nowData.acId, resdata => {
                                if (resdata.code === '0000') {
                                    this.dialogTableVisible = false;
                                } else {
                                    this.$xeMessage.error(resdata.msg);
                                }
                            });
                        }
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm() {
                if (this.$refs['ruleForm']) {
                    this.$refs['ruleForm'].resetFields();
                }
            },
            addAction(fn) {
                // 新增
                this.addLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/addAction',
                    data: this.ruleForm
                }).then(res => {
                    console.log(res);
                    this.addLoading = false;
                    fn && fn(res.data);
                }).catch(error => {
                    console.log(error);
                    this.addLoading = false;
                });
            },
            modifyAction(id, fn) {
                // 修改
                this.addLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/modifyAction',
                    data: Object.assign(this.ruleForm, {acId: id})
                }).then(res => {
                    console.log(res);
                    this.addLoading = false;
                    fn && fn(res.data);
                }).catch(error => {
                    console.log(error);
                    this.addLoading = false;
                });
            },
            delAction(id, fn) {
                // 删除
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/delAction',
                    data: {
                        acId: id
                    }
                }).then(res => {
                    console.log(res);
                    fn && fn(res.data);
                }).catch(error => {
                    console.log(error);
                });
            },
            queryAction(id, fn) {
                this.addLoading = true;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-rms/oauth/erp/queryAction',
                    data: {
                        acId: id
                    }
                }).then(res => {
                    console.log(res);
                    this.addLoading = false;
                    fn && fn(res.data.action);
                }).catch(error => {
                    console.log(error);
                    this.addLoading = false;
                });
            }
        },
        components: {
            [Switch.name]: Switch
        }
    };
</script>

<style lang="scss">
    .m-actionlist-con {
        min-height: 100px;
    }
    .demo-ruleForm-st1 {
        width: 500px;
        margin: 0 auto;
    }
    .el-tree {
        &.tree_border {
            padding: 15px 0;
            .el-tree-node__expand-icon {
                position: relative;
                top: 11px;
                display: block;
                float: left;
            }
        }
    }
</style>
