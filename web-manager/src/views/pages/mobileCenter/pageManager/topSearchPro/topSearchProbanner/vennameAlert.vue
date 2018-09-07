<template lang="html">
    <div class="editor_body">
        <el-form :inline="true" :model="formsearch" ref="formsearch">
            <el-form-item prop="searchType">
                <el-select size="small" style="width: 90px" v-model="formsearch.searchType" placeholder="">
                    <el-option
                        v-for="item in mobiekeyWordsVenNameselList"
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
            <el-form-item>
                <el-button  class="xe-button-normal" @click="getVenInfoList" type="primary">
                    查询
                </el-button>
                <el-button class="xe-button-normal"  @click="resetForm('formsearch')">
                    重置
                </el-button>
            </el-form-item>
        </el-form>
        <div>
            <el-table ref="venInfoList" :data="venInfoList" border v-loading ="loading">
               <el-table-column width="65" fixed="left" label="操作">
                    <template scope="scope">
                        <el-radio class="radio label_nameOpa" v-model="radio" :label="scope.$index"  :key="scope.$index"></el-radio>
                    </template>
                </el-table-column>
                <el-table-column prop="userCode" label="商户ID"></el-table-column>
                <el-table-column prop="regAccount" label="商户账号"></el-table-column>
                <el-table-column prop="venName" label="商户名称"></el-table-column>
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
import { contentType, mobiekeyWordsVenNamesel } from '@/dataControl';
import categoryTag from '@/components/category/category';
export default {
    props: ['cityId', 'savevenNamebut'],
    data() {
        return {
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            radio: '',
            venInfoList: [],
            selectcontent: '',
            placeholders: '请输入商户名称',
            formsearch: {
                searchType: 1,
                keyWords: ''
            },
            loading: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getVenInfoList();
    },
    methods: {
        getVenInfoList() {
            let params = {};
            this.loading = true;
            params = this.formsearch;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/cms/getVenInfoList`,
                data: params
            }).then((res) => {
                this.loading = false;
                this.venInfoList = res.data.venInfoList;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        resetForm(formName) { // 选择商品弹框重置
            this.$refs[formName].resetFields();
            this.getVenInfoList();
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.getVenInfoList();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.getVenInfoList();
            }
        },
        savevenNamemethod() {
//            let _this = this;
            let array = [];
            if (this.radio !== '') {
                array[0] = this.venInfoList[this.radio];
                this.$emit('savevenNamemSuc', array);
//                setTimeout(() => {
//                    _this.radio = '';
//                }, 300);
            } else {
                window.$wxeMessage.warning('请先勾选需要添加的商户');
                this.$emit('savevenNamemErr');
            }
        }
    },
    watch: {
        'formsearch.searchType'(n) {
            if (n === 1) {
                this.placeholders = '请输入商户名称';
            } else if (n === 2) {
                this.placeholders = '请输入商户账号';
            } else if (n === 3) {
                this.placeholders = '请输入商户id';
            }
        },
        savevenNamebut(n) {
            if (n === true) {
                // 保存操作
                this.savevenNamemethod();
            }
        }
    },
    computed: {
        contentTypeList() {
            return contentType;
        },
        mobiekeyWordsVenNameselList() {
            return mobiekeyWordsVenNamesel;
        }
    },
    components: {
        categoryTag
    }
};
</script>
