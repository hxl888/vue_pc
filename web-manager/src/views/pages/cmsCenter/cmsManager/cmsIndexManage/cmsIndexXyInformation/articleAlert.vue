<template lang="html">
    <div class="editor_body">
        <el-form :inline="true" :model="formsearch" ref="formsearch">
            <el-form-item prop="cmsArticleTitle">
                <el-input size="small" placeholder="请输入文章标题" class="" v-model="formsearch.cmsArticleTitle">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button  class="xe-button-normal" @click="getProductList" type="primary">
                    查询
                </el-button>
                <el-button class="xe-button-normal"  @click="resetForm('formsearch')">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table ref="proList" :data="proList" border v-loading ="loading">
               <el-table-column width="65" fixed="left" label="操作">
                    <template scope="scope">
                        <el-radio class="radio label_nameOpa" v-model="radio" :label="scope.$index"  :key="scope.$index"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="cmsColumnName" label="栏目名称"></el-table-column>
                <el-table-column prop="cmsArticleTitle" label="文章名称"></el-table-column>
                <el-table-column prop="createDate" label="发布时间">
                    <template scope="scope">
                        <div>
                            {{scope.row.createDate | millisecondFormat('ms')}}
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="xe-pagination-panel">
                <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                    :current-page="pagelist.pageNum"
                    :page-sizes="[10, 20, 50, 100]"
                    :page-size="pagelist.pageSize"
                    layout="total, prev, pager, next, sizes, jumper"
                    :total="pagelist.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['savearticlebut', 'articleDialog'],
    data() {
        return {
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            radio: '',
            proList: [],
            formsearch: {
                cmsArticleTitle: ''
            },
            loading: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getProductList();
    },
    methods: {
        getProductList() {
            let params = {};
            this.loading = true;
            params = this.formsearch;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cmsPc/getArticleList`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.proList = res.data.articleList;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        resetForm(formName) { // 选择商品弹框重置
            this.$refs[formName].resetFields();
            this.getProductList();
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.getProductList();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.getProductList();
            }
        },
        savearticlemethod() {
            let array = [];
            if (this.radio !== '') {
                array[0] = this.proList[this.radio];
                this.$emit('savearticleSuc', array);
            } else {
                window.$wxeMessage.warning('请先勾选需要添加的文章');
                this.$emit('savearticleErr');
            }
        }
    },
    watch: {
        savearticlebut(n) {
            if (n === true) {
                // 保存操作
                this.savearticlemethod();
            }
        },
        articleDialog(n) {
            if (n === true) {
                this.getProductList();
            }
            if (n === false) {
                this.$refs.formsearch.resetFields();
            }
        }
    }
};
</script>
