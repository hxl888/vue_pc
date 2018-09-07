<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
        	<el-form :inline="true" :model="formsearch" ref="formsearch" class="demo-form-inline">
                <el-form-item class="" prop="filterText">
                    <el-input v-model="formsearch.filterText" size="small" placeholder="输入分类名称" class="xe-input-col2"></el-input>
                </el-form-item>
                <el-form-item class="z-marL20">
                    <!--<el-button type="primary" @click="queryData">-->
                        <!--查询-->
                    <!--</el-button>-->
                    <el-button class="xe-button-normal"  @click="resetForm('formsearch')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="addfirstlist" class="xe-button-normal">
                <span class="iconfont icon-xinzeng"></span> 新增一级分类
            </el-button>
            <!--<el-button class="xe-button-normal">-->
                <!--<span class="iconfont icon-daochu"></span> 导出-->
            <!--</el-button>-->
            <!--<el-button @click="zhankai" class="xe-button-normal">-->
                <!--<span class="iconfont icon-zhankai1"></span> 展开-->
            <!--</el-button>-->
            <!--<el-button @click="shouqi" class="xe-button-normal">-->
                <!--<span class="iconfont icon-shouqi"></span> 收起-->
            <!--</el-button>-->
        </div>
        <div class="goodsTree">
            <el-tree
                class="tree_specSty"
                accordion
                ref="datas"
                :data="datas"
                node-key="cateId"
                :props="defaultProps"
                empty-tex="暂时没有数据"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                :default-expand-all="deploymenteffec"
                :render-content="renderContent"
                >
            </el-tree>
        </div>
        <!--新增一级分类-->
        <el-dialog :title="addnewTit" :visible.sync="dilogbut" class="reset-dialog dialog_wid340 error-tishi">
                <el-form :model="formObj" :rules="rules"  label-width="70px" ref="formObj">
                    <el-form-item prop="cateName"label="分类名称">
                        <el-input v-model.trim="formObj.cateName" :maxlength="6"  class="xe-input-col2" placeholder=""></el-input>
                    </el-form-item>
                    <div class="el-dialog__footer">
                        <el-button type="primary" @click="submit('formObj')">确定</el-button>
                        <el-button @click="cancelReject">取 消</el-button>
                    </div>
                </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        var parentIdvolid = (rule, value, callback) => {
            if (value) {
                let reg = /^[\u4E00-\u9FA5]+$/;
                if (reg.test(value)) {
                    if (value.length <= 6) {
                        this.cateNameCk(value, () => {
                            callback();
                        }, (err) => {
                            callback(new Error(err.msg));
                        });
                    } else {
                        callback(new Error('分类名称在6个汉字以内'));
                    }
                } else {
                    callback(new Error('请输入汉字'));
                }
            } else {
                callback(new Error('分类名称不能为空'));
            }
        };
        return {
            formsearch: {
                filterText: ''
            },
            formObj: {
                parentId: 0,
                cateName: ''
            },
            defaultopen: [],
            rules: {
                cateName: [
                    { required: true, validator: parentIdvolid, trigger: 'blur' }
                ]
            },
            addnewTit: '新增一级分类',
            dilogbut: false,
            datas: [],
            defaultProps: {
                children: 'childList',
                label: 'cateName'
            },
            cateId: '',
            lineDatas: null, // 选中行信息储存
            lineParentDatas: null, // 选中行父级信息储存
            deploymenteffec: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.enquiryDatas();
    },
    methods: {
        cateNameCk(val, fn, err) { // 分类名称重复检验查询
            let params = {};
            if (this.lineDatas) {
                params.parentId = this.lineDatas.parentId;
            } else {
                params.parentId = 0;
            }
            params.cateName = val;
            params.cateId = this.cateId;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/category/checkName`,
                data: params
            }).then((res) => {
                if (res.data.remote && res.data.remote.status !== '0000') {
                    err && err(res.data.remote);
                } else {
                    fn && fn();
                }
            }).catch((error) => {
                console.log(error);
            });
        },
        addfirstlist() {
            this.formObj.cateName = '';
            this.addnewTit = '新增一级分类';
            this.dilogbut = true;
        },
        zhankai() {
            console.log('展开');
            this.deploymenteffec = true;
            this.enquiryDatas();
            console.log('this.deploymenteffect', this.deploymenteffec);
        },
        shouqi() {
            console.log('收起');
            this.deploymenteffec = false;
            console.log('this.deploymenteffect', this.deploymenteffec);
        },
        enquiryDatas() {
            let params = {};
            params.cateName = '';
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/category/toListCate`,
                data: params
            }).then((res) => {
//                console.log('--询分类列表--!!>', res);
                this.datas = res.data.list;
//                this.defaultopen.push(this.datas[0].cateId);
            }).catch((error) => {
                console.log(error);
            });
        },
        queryData() {
            console.log('submit!');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.enquiryDatas();
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.cateName.indexOf(value) !== -1;
        },
        // 方法列表------
        addnewcate(datas) { // 添加分类
            let params = {};
            let _this = this;
            params = this.formObj;
            if (datas) {
                params.parentId = datas.cateId;
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/category/addCategory`,
                data: params
            }).then((res) => {
//                console.log('--新增加分类--!!>', res);
                this.dilogbut = false;
                this.$refs.formObj.resetFields();
                if (datas) { // 新增子集-----
                    if (datas.childList) {
                        datas.childList.push({ cateName: this.formObj.cateName, childList: [] });
                    } else {
                        datas.childList = [];
                        datas.childList.push({ cateName: this.formObj.cateName, childList: [] });
                    }
                    window.$wxeMessage({
                        message: '新子集成功',
                        type: 'success'
                    });
                } else { // 新增一级分类-----
                    window.$wxeMessage({
                        message: '新增一级分类成功',
                        type: 'success'
                    });
                }
                setTimeout(() => {
                    _this.enquiryDatas();
                }, 300);
                this.lineDatas = '';
            }).catch((error) => {
                console.log(error);
            });
        },
        modifycate(datas) { // 修改分类信息
            let params = {};
            let _this = this;
            params.cateId = datas.cateId;
            params.cateName = this.formObj.cateName;
            params.parentId = datas.parentId;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/category/editCategory`,
                data: params
            }).then((res) => {
//                console.log('--修改分类--!!>', res);
                window.$wxeMessage({
                    message: '修改分类成功',
                    type: 'success'
                });
                this.dilogbut = false;
                this.lineDatas = '';
                this.$refs.formObj.resetFields();
                setTimeout(() => {
                    _this.enquiryDatas();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        removecate(datas) { // 删除分类
            let params = {};
            let _this = this;
            params.cateId = datas.cateId;
            params.orgCode = datas.orgCode;
            params.delFlag = 2;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/category/delCategory`,
                data: params
            }).then((res) => {
//                console.log('--删除分类--!!>', res);
                window.$wxeMessage({
                    message: '删除分类成功',
                    type: 'success'
                });
                setTimeout(() => {
                    _this.enquiryDatas();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        movecate(datas, status) { // 商品分类 -- 上下移动分类
            let params = {};
            let _this = this;
            params.cateId = datas.cateId;
            params.parentId = datas.parentId;
            params.cateSort = datas.cateSort;
            params.moveFlag = status;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/category/moveCategory`,
                data: params
            }).then((res) => {
//                console.log('--上下移动分类--!!>', res);
                window.$wxeMessage({
                    message: `${status === 1 ? '上移' : '下移'}成功`,
                    type: 'success'
                });
                setTimeout(() => {
                    _this.enquiryDatas();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        submit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log('--->', valid);
                    if (this.addnewTit === '新增一级分类') {
                        this.addnewcate();
                    } else if (this.addnewTit === '新增子集') {
                        this.addnewcate(this.lineDatas);
                    } else if (this.addnewTit === '修改分类名称') {
                        console.log('修改分类名称');
                        this.modifycate(this.lineDatas);
                    }
                } else {
                    return false;
                }
            });
        },
        cancelReject() {
            this.dilogbut = false;
            this.$refs.formObj.resetFields();
        },
        // 分类表中对应滴标签按钮--
        append(store, data) {
            this.formObj.cateName = '';
            this.addnewTit = '新增子集';
            this.dilogbut = true;
            this.lineDatas = data;
        },
        remove(store, data) {
            this.$confirm(`确定要删除${data.cateName}分类么？`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.removecate(data);
            }).catch(() => {
            });
        },
        modify(store, data, node) { // 修改
            this.addnewTit = '修改分类名称';
            this.dilogbut = true;
            this.lineDatas = data; // 选中信息
            this.formObj.cateName = this.lineDatas.cateName;
            this.cateId = data.cateId;
//            this.lineParentDatas = node.parent.data; // 父级信息获取
        },
        moveUp(store, data) { // 上移
            this.movecate(data, 1);
//            this.$confirm(`确定要上移${data.cateName}分类么？`, '提示', {
//                confirmButtonText: '确定',
//                cancelButtonText: '取消',
//                type: 'warning'
//            }).then(() => {
//            }).catch(() => {
//            });
        },
        moveDown(store, data) { // 下移
            this.movecate(data, 2);
//            this.$confirm(`确定要下移${data.cateName}分类么？`, '提示', {
//                confirmButtonText: '确定',
//                cancelButtonText: '取消',
//                type: 'warning'
//            }).then(() => {
//            }).catch(() => {
//            });
        },
        origcodselec(data) { // 根据数据显示对应滴新增子集按钮
            if (data) {
                let datas = data;
                let num = 0;
                for (let i in datas.orgCode) {
                    if (datas.orgCode[i] === '_') {
                        num += 1;
                    }
                }
                if (num !== 4) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        renderContent(h, { node, data, store }) {
            let strs;
            if (this.origcodselec(data)) {
                strs = <el-button type="text" size="mini" on-click={ () => this.append(store, data) }><span class="iconfont icon-xinzeng"></span>&nbsp;新增子级</el-button>;
            }
            return (
                <div class="clearfix">
                    <div class="fl">
                        <span>{node.label}</span>
                    </div>
                    <div class="treeEditor-options" style="float: right; margin-right: 20px">
                        {strs}
                        <el-button type="text" size="mini" on-click={ () => this.modify(store, data, node) }><span class="iconfont icon-xiugai1"></span>&nbsp;修改</el-button>
                        <el-button type="text"size="mini" on-click={ () => this.remove(store, data) }><span class="iconfont icon-shanchu"></span>&nbsp;删除</el-button>
                        <el-button type="text"size="mini" on-click={ () => this.moveUp(store, data) }><span class="iconfont icon-xiangshang"></span>&nbsp;上移</el-button>
                        <el-button type="text"size="mini" on-click={ () => this.moveDown(store, data) }><span class="iconfont icon-xiangxia"></span>&nbsp;下移</el-button>
                    </div>
                </div>
            );
        }
    },
    watch: {
        'formsearch.filterText'(val) {
            this.$refs.datas.filter(val);
        }
    }
};
</script>

<style lang="scss">
    .goodsTree{
        width: 695px;
        .el-tree{
            border: none;
            border-top: 1px solid #d1dbe5;
            color: #657180;
        }
    }
    .el-tree {
        &.tree_specSty {
            .treeEditor-options {
                display: none;
            }
            .el-tree-node__expand-icon {
                position: relative;
                top: 11px;
                display: block;
                float: left;
            }
        }
    }
    .el-tree-node__content:hover > div > .treeEditor-options{
        display: inline-block;
    }
</style>
