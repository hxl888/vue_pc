<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                    <el-form-item prop="searchType">
                        <el-select size="small" @change="searchTypeSelec" style="width: 85px" v-model="searchform.searchType" placeholder="请选择">
                            <el-option
                                v-for="item in cmsseleArtiSelecList"
                                :label="item.name"
                                :key="item.value"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="keyWords">
                        <el-input size="small" style="width: 140px" :placeholder="placeholder" v-model="searchform.keyWords" class="">
                          </el-input>
                    </el-form-item>
                    <el-form-item prop="cmsArticleStatus">
                        <el-select size="small" v-model="searchform.cmsArticleStatus"  class="" placeholder="请选择">
                            <el-option
                              v-for="item in cmsArticleStatusList"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="getContentManager">查询</el-button>
                        <el-button class="xe-button-normal" @click="resetForm('searchform1')">重置</el-button>
                        <el-button class="xe-button-normal" @click.stop="searchFormbut = !searchFormbut">高级搜索</el-button>
                    </el-form-item>
                </el-form>
                <!--高级搜索样式start-->
            <div class="advancedSearch" @click.stop>
                <div class="serch-head clearfix">
                    <span class="title fl">高级搜索</span>
                    <span class="fr closeBox" @click="searchFormbut = false">&times;</span>
                </div>
                <div class="serch-content">
                    <el-form :inline="true"  label-width ='73px' :model="searchform" ref="searchform" class="demo-form-inline">
                        <div class="clearfix">
                            <el-form-item label="更新时间" prop="startDate" class="marR0">
                                <el-date-picker
                                    v-model="value1"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                                <span class="data-bor">-</span>
                            </el-form-item>
                            <el-form-item prop="endDate">
                                <el-date-picker
                                    v-model="value2"
                                    class="xe-input-168"
                                    type="date"
                                    placeholder="选择日期"
                                    >
                                </el-date-picker>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="searchType" label="查询项">
                                <el-select size="small" @change="searchTypeSelec" style="width: 130px" v-model="searchform.searchType" placeholder="请选择">
                                    <el-option
                                        v-for="item in cmsseleArtiSelecList"
                                        :label="item.name"
                                        :key="item.value"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="keyWords">
                                <el-input size="small" style="width: 211px" :placeholder="placeholder" v-model="searchform.keyWords" class="">
                                  </el-input>
                            </el-form-item>
                        </div>
                        <div class="clearfix">
                            <el-form-item prop="cmsArticleStatus" label="文章状态">
                                <el-select size="small" v-model="searchform.cmsArticleStatus"  class="xe-input-168" placeholder="请选择">
                                    <el-option
                                      v-for="item in cmsArticleStatusList"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="getContentManager">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <div class="u-opera-btnBox">
            <el-button @click="addNewcontent"><i class="iconfont icon-xinzeng"></i>&nbsp;添加</el-button>
            <el-button @click="delArticleBatch"><i class="iconfont icon-shanchu"></i>&nbsp;批量删除</el-button>
            <el-button @click="topMoveBatch"><i class="iconfont icon-zhiding"></i>&nbsp;批量置顶</el-button>
        </div>
        <div>
            <el-table ref="contentData" :data="contentData" border v-loading="contentDataloading" @selection-change="handleSelectionChange">
                <el-table-column
                        label=""
                        fixed='left'
                        width="55">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                </el-table-column>
                <el-table-column type="selection" width="45" fixed="left"></el-table-column>
                <el-table-column prop="cmsArticleTitle" label="标题名称" min-width="150"></el-table-column>
                <el-table-column prop="cmsColumnName" label="栏目名称"  min-width="120"></el-table-column>
                <el-table-column prop="cmsArticleStatus" label="状态" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.cmsArticleStatus | cmsArticleStatusfiter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="isTopStr" label="置顶设置"  min-width="120"></el-table-column>
                <el-table-column prop="modifyDate" label="更新时间"  min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.modifyDate">
                            {{scope.row.modifyDate}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="105" fixed="right">
                    <template scope="scope">
                        <div class="btn-in-table">
                            <!--<a href="javascript:;" class="s-blue" @click="viewDetails">查看</a>-->
                            <a href="javascript:;" class="s-blue" @click="editorData(scope.row)">编辑</a>
                            <a href="javascript:;" v-if="scope.row.cmsArticleStatus == 2" class="s-blue" @click="removeData(scope.row)">删除</a>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="xe-pagination-panel">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pagelist.pageNum"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="pagelist.pageSize"
                layout="total, prev, pager, next, sizes, jumper"
                :total="pagelist.total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { cmsArticleStatus, cmsseleArtiSelec } from '@/dataControl';
import { millisecondFormat } from 'utils';
export default {
    data() {
        return {
            searchform: {
                searchType: '',
                keyWords: '',
                cmsArticleStatus: ''
            },
            contentData: [],
            contentDataloading: false,
            value1: '',
            value2: '',
            placeholder: '请选择',
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            selectedArray: '', // 批量勾选数据记录
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.getContentManager();
    },
    methods: {
        searchTypeSelec() {
            this.searchform.keyWords = '';
        },
        topMoveBatch() { // 批量置顶
            if (this.selectedArray.length) {
                let flag = this.selectedArray.some(item => {
                    return item.isTop === 2;
                });
                if (flag) {
                    this.$confirm(`确定批量置顶所选内容？`, '置顶', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        console.log('this.selectedArray.', this.selectedArray);
                        let obj = {
                            idList: []
                        };
                        this.selectedArray.forEach(item => {
                            if (item.isTop === 2) {
                                obj.idList.push(item.cmsArticleId);
                            }
                        });
                        console.log('obj.idList', obj);
                        this.topMovePost(obj);
                    }).catch(() => {
                    });
                } else {
                    this.$alert('您选择的内容已经置顶了', '提示', {
                        confirmButtonText: '确定',
                        type: 'info'
                    });
                }
            } else {
                window.$wxeMessage.warning('请勾选需要批量置顶的内容');
            }
        },
        topMovePost(obj) {
            let params = {};
            let _this = this;
            params = obj;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/contentManager/isTop`,
                data: params
            }).then(() => {
                window.$wxeMessage.success('已设置成功');
                setTimeout(() => {
                    _this.getContentManager();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        addNewcontent() {
            this.$router.push({name: 'contentListAddnew'});
        },
//        viewDetails() {},
        editorData(row) {
            this.$router.push({name: 'contentListEditor', query: {cmsArticleId: row.cmsArticleId}});
        },
        removeData(row) {
            this.selecRowArray = row;
            this.$confirm(`确定删除所选内容？`, '删除', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let obj = {
                    idList: [],
                    titleList: []
                };
                obj.idList = [row.cmsArticleId];
                obj.titleList = [row.cmsArticleTitle];
                this.delArticlePost(obj);
            }).catch(() => {
            });
        },
        delArticlePost(obj) {
            let params = {};
            let _this = this;
            params = obj;
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/contentManager/delArticle`,
                data: params
            }).then((res) => {
                window.$wxeMessage.success(res.msg);
                setTimeout(() => {
                    _this.getContentManager();
                }, 300);
            }).catch((error) => {
                console.log(error);
            });
        },
        delArticleBatch() {
            if (this.selectedArray.length) {
                let flag = this.selectedArray.some(item => {
                    return item.cmsArticleStatus === 2;
                });
                if (flag) {
                    this.$confirm(`确定批量删除所选内容？`, '删除', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        let obj = {
                            idList: [],
                            titleList: []
                        };
                        this.selectedArray.forEach(item => {
                            if (item.cmsArticleStatus === 2) {
                                obj.idList.push(item.cmsArticleId);
                                obj.titleList = [item.cmsArticleTitle];
                            }
                        });
                        this.delArticlePost(obj);
                    }).catch(() => {
                    });
                } else {
                    this.$alert('已发布的内容不能删除', '提示', {
                        confirmButtonText: '确定',
                        type: 'info'
                    });
                }
            } else {
                window.$wxeMessage.warning('请勾选需要批量删除的内容');
            }
        },
        getContentManager() {
            let params = {};
            this.contentDataloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.dateStart = millisecondFormat(this.value1.getTime(), 'ms');
            } else {
                params.dateStart = '';
            }
            if (this.value2) {
                params.dateEnd = millisecondFormat(this.value2.getTime(), 'ms');
            } else {
                params.dateEnd = '';
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/contentManager/selectArticle`,
                data: params
            }).then((res) => {
                this.contentDataloading = false;
                this.contentData = res.data.articleList;
                this.pagelist.total = res.data.pageInfo.total;
            }).catch((error) => {
                console.log(error);
            });
        },
        goBack() {
            this.$router.go(-1);
        },
        handleSelectionChange(val) {
            this.selectedArray = val;
        },
        handleSizeChange(val) {
            this.pagelist.pageSize = val;
            this.getContentManager();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.getContentManager();
            }
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.getContentManager();
            }, 10);
        }
    },
    watch: {
        'searchform.searchType'(n) {
            if (n === 1) {
                this.placeholder = '请输入栏目名称';
            } else if (n === 2) {
                this.placeholder = '请输入标题名称';
            }
        }
    },
    computed: {
        cmsArticleStatusList() {
            return cmsArticleStatus;
        },
        cmsseleArtiSelecList() {
            return cmsseleArtiSelec;
        }
    }
};
</script>
