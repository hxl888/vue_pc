<template lang="html">
    <div class="editor_body">
        <el-form :inline="true" :model="formsearch" ref="formsearch">
            <el-form-item prop="searchType">
                <el-select size="small" style="width: 90px" v-model="formsearch.searchType" placeholder="">
                    <el-option
                        v-for="item in mobiekeyWordsProNameselList"
                        :key="item.value"
                        :label="item.name"
                        :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="keyWords">
                <el-input size="small" :placeholder="placeholders" class="" v-model="formsearch.keyWords">
                </el-input>
            </el-form-item>
            <el-form-item class="z-mr30" prop="menuTitle">
                <categoryTag v-model='cateIdArray' :width='168' :changeOnSelect="true" :filterable="true"></categoryTag>
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
            <el-table ref="proList" :data="proList" border v-loading ="loading"  @selection-change="handleSelectionChange">
                <el-table-column width="50" type="selection" fixed="left"></el-table-column>
                <el-table-column prop="venName" label="商户名称" min-width="120"></el-table-column>
                <el-table-column prop="proNum" label="货号" min-width="80"></el-table-column>
                <el-table-column prop="proSku" label="sku编码" min-width="120"></el-table-column>
                <el-table-column prop="proName" label="商品名称" min-width="120"></el-table-column>
                <el-table-column prop="specValue" label="规格" min-width="80">
                    <template scope="scope">
                        <div>{{scope.row.specValue ? scope.row.specValue : '无'}}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="cateName" label="商品分类" min-width="120"></el-table-column>
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
import { contentType, mobiekeyWordsProNamese2 } from '@/dataControl';
import categoryTag from '@/components/category/category';
export default {
    props: ['cityId', 'saveproNamebut', 'topProListNum', 'selectproNamedialog', 'selectedData'],
    data() {
        return {
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            radio: '',
            proList: [],
            cateIdArray: [],
            selectcontent: '',
            picServer: '',
            placeholders: '请输入商品名称',
            formsearch: {
                searchType: 1,
                keyWords: '',
                cateId: ''
            },
            selectedArray: '', // 批量勾选数据记录
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
            params.cityId = this.cityId;
            params.selectedData = this.selectedData;
            if (this.cateIdArray.length) {
                let cateId = this.cateIdArray;
                params.cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
            } else {
                params.cateId = '';
            }
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getProductList`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.proList = res.data.proList;
                this.picServer = res.data.picServer;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        resetForm(formName) { // 选择商品弹框重置
            this.$refs[formName].resetFields();
            this.cateIdArray = [];
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
        saveproNamemethod() {
            if (this.selectedArray.length) {
                if (this.topProListNum + this.selectedArray.length <= 200) {
                    this.selectedArray.forEach(item => {
                        this.$set(item, 'addnew', 1);
                    });
                    console.log('this.selectedArray', this.selectedArray);
                    this.$emit('saveproNamemSuc', this.selectedArray);
                } else {
                    window.$wxeMessage.warning('推荐商品数量最多为200，不可再推荐');
                    this.$emit('saveproNamemErr');
                }
//                this.toggleSelection();
            } else {
                window.$wxeMessage.warning('请先勾选需要添加的商品');
                this.$emit('saveproNamemErr');
            }
        },
        handleSelectionChange(val) {
            if (this.topProListNum + val.length <= 200) {
                this.selectedArray = val;
            } else {
                window.$wxeMessage.warning('推荐商品数量最多为200，不可再推荐');
            }
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.proList.toggleRowSelection(row);
                });
            } else {
                this.$refs.proList.clearSelection();
            }
        }
    },
    watch: {
        'formsearch.searchType'(n) {
            if (n === 1) {
                this.placeholders = '请输入商品名称';
            } else if (n === 2) {
                this.placeholders = '请输入商品货号';
            } else if (n === 3) {
                this.placeholders = '请输入商品sku编码';
            }
        },
        saveproNamebut(n) {
            if (n === true) {
                // 保存操作
                this.saveproNamemethod();
            }
        },
        selectproNamedialog(n) {
            if (n === true) {
                this.getProductList();
            }
            if (n === false) {
                this.cateIdArray = [];
                this.$refs.formsearch.resetFields();
            }
        }
    },
    computed: {
        contentTypeList() {
            return contentType;
        },
        mobiekeyWordsProNameselList() {
            return mobiekeyWordsProNamese2;
        }
    },
    components: {
        categoryTag
    }
};
</script>
