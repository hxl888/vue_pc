<template lang="html">
    <div class="m-router-con">
        <div class="u-top-search">
                <el-form :inline="true" :model="searchform" ref="searchform1" class="demo-form-inline">
                    <el-form-item prop="type">
                    <el-select size="small" @change="searchTypeSelec" style="width: 85px" v-model="searchform.type" placeholder="请选择">
                        <el-option
                            v-for="item in memberFeedbackSearchList"
                            :label="item.name"
                            :key="item.value"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="typeValue">
                    <el-input size="small" style="width: 140px" :placeholder="placeholder" v-model="searchform.typeValue" class="">
                      </el-input>
                </el-form-item>
                <el-form-item prop="source">
                    <el-select size="small" v-model="searchform.source"  class="xe-input-l40" placeholder="请选择平台来源">
                        <el-option
                          v-for="item in sourceList"
                          :key="item.value"
                          :label="item.name"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item prop="sysType" label="">
                    <area-select v-model="selecarea" :width="140"></area-select>
                </el-form-item>
                    <el-form-item class="z-marL20">
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
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
                        <div>
                            <el-form-item label="反馈时间" prop="startDate" class="marR0">
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
                        <div>
                            <el-form-item prop="mobile" label="手机号">
                                <el-input size="small" placeholder="查询手机号" class="xe-input-168" v-model="searchform.mobile"></el-input>
                            </el-form-item>
                             <el-form-item prop="contactPeople" label="联系人">
                                <el-input size="small" placeholder="查询联系人" class="xe-input-168" v-model="searchform.contactPeople"></el-input>
                            </el-form-item>
                        </div>
                        <div>
                             <el-form-item prop="feedbackContent" label="反馈内容">
                                <el-input size="small" placeholder="查询反馈内容" class="xe-input-168" v-model="searchform.feedbackContent"></el-input>
                            </el-form-item>
                            <el-form-item prop="source" label="平台来源">
                            <el-select size="small" v-model="searchform.source"  class="xe-input-168" placeholder="请选择平台来源">
                                <el-option
                                  v-for="item in sourceList"
                                  :key="item.value"
                                  :label="item.name"
                                  :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        </div>
                        <div>
                             <el-form-item prop="sysType" label="选择区域">
                                <area-select v-model="selecarea" :width="168"></area-select>
                            </el-form-item>
                        </div>
                    </el-form>
                    <div>
                        <el-button class="xe-button-normal" type="primary" @click="queryTabData">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resetForm('searchform')">重置</el-button>
                    </div>
                </div>
            </div>
        <!--高级搜索样式end-->
        </div>
        <!--<div class="u-opera-btnBox">-->
            <!--<el-button><i class="iconfont icon-daochu"></i> 导出</el-button>-->
        <!--</div>-->
        <div>
            <el-table ref="dataList" :data="dataList" border v-loading="dataListloading" @selection-change="handleSelectionChange">
                <el-table-column
                        label=""
                        fixed='left'
                        width="55">
                        <template scope="scope">
                            {{scope.$index + 1 }}
                        </template>
                </el-table-column>
                <el-table-column type="selection" width="45" fixed="left"></el-table-column>
                <el-table-column prop="cityName" label="区域" min-width="150"></el-table-column>
                <el-table-column prop="source" label="反馈来源" min-width="100">
                    <template scope="scope">
                        <div>
                            {{scope.row.source | sourcefilter}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="mobile" label="手机号"  min-width="120"></el-table-column>
                <el-table-column prop="contactPeople" label="联系人"  min-width="120"></el-table-column>
                <el-table-column prop="feedbackContent" label="反馈内容"  min-width="150">
                    <template scope="scope">
                        <div style="max-height: 66px;overflow: hidden">
                            <div v-if="scope.row.feedbackContent.length > 13" class="clearfix">
                                <div class="fl" style="margin-right: 6px">{{scope.row.feedbackContent.slice(0, 7)}}</div>
                                <el-tooltip class="fl" effect="dark"  placement="top" v-if="scope.row.feedbackContent">
                                    <div slot="content">{{scope.row.feedbackContent.substr(0, 50)}}<span v-if="scope.row.feedbackContent.substr(50, 50)"><br/>{{scope.row.feedbackContent.substr(50, 50)}}</span><span v-if="scope.row.feedbackContent.substr(100, 50)"><br/>{{scope.row.feedbackContent.substr(100, 50)}}</span> <span v-if="scope.row.feedbackContent.substr(150, 50)"><br/>{{scope.row.feedbackContent.substr(150, 50)}}</span></div>
                                    <div style="color: #20a0ff;cursor: pointer;width: 30px">查看</div>
                                </el-tooltip>
                            </div>
                            <div v-else>
                                {{scope.row.feedbackContent}}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="createDate" label="反馈时间"  min-width="150">
                    <template scope="scope">
                        <div v-if="scope.row.createDate">
                            {{scope.row.createDate, 'ms' | millisecondFormat}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="" label="图片" min-width="105">
                    <template scope="scope">
                        <div v-if="scope.row.imgUrl" style="padding-top: 8px">
                            <a @click="clickImg(scope.row.imgUrl)" href="javascript:void(0)">
                                <img :src="picServer + scope.row.imgUrl.split(',')[0]" width="80" height="50" alt="" >
                            </a>
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
        <!--图片弹框-->
        <div class="reset-dialog01 reset-dialog">
            <el-dialog class="error-tishi" title="查看图片" :visible.sync="edialogVisible" @close="imgboxList = []">
                <div style="padding: 20px;">
                    <el-carousel v-if="imgboxList.length" :interval=5000>
                        <el-carousel-item v-for="(item, index) in imgboxList" :key="item">
                            <p style="height: 100%;">
                                <a :href="picServer + item" style="display: inline-block;width: 100%;height: 100%" target="_blank">
                                    <img :src="picServer + item" style="display:block;margin: auto;width: 100%;height: 100%" alt="">
                                </a>
                            </p>
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import areaSelect from '@/components/areaSelect/areaSelect';
import { appNameId, sysType, forceUpdateFlag, source, memberFeedbackSearch } from '@/dataControl';
import { millisecondFormat } from 'utils';
export default {
    data() {
        return {
            searchform: {
                type: 1,
                typeValue: '',
                feedbackContent: '',
                source: '',
                cityId: '',
                mobile: '',
                contactPeople: ''
            },
            edialogVisible: false,
            dataList: [],
            appverdialog: false,
            selecarea: [],
            picServer: '',
            value1: '',
            value2: '',
            placeholder: '请输入手机号',
            pagelist: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            imgboxList: [],
            selecRowIndex: '', // 编辑点击获取对应下标
            loading: false, // 保存loading
            selecRowArray: '', // 编辑点击获取对应行数据
            selectedArray: '', // 批量勾选数据记录
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.queryTabData();
    },
    methods: {
        searchTypeSelec() {
            this.searchform.typeValue = '';
        },
        clickImg(imgs) {
            if (imgs) {
                this.edialogVisible = true;
                this.imgboxList = imgs.split(',');
            }
        },
        queryTabData() {
            let params = {};
            this.dataListloading = true;
            params = this.searchform;
            params.pageNum = this.pagelist.pageNum;
            params.pageSize = this.pagelist.pageSize;
            if (this.value1) {
                params.startDate = millisecondFormat(this.value1.getTime(), 'ms');
            } else {
                params.startDate = '';
            }
            if (this.value2) {
                params.endDate = millisecondFormat(this.value2.getTime(), 'ms');
            } else {
                params.endDate = '';
            }
            if (this.selecarea) {
                params.cityId = this.selecarea.slice(this.selecarea.length - 1, this.selecarea.length).join(',');
            }
            this.$http({
                method: 'post',
                url: `${this.productUrl}/manager/feedback/listFeedBack`,
                data: params
            }).then((res) => {
                this.dataList = res.data.list;
                this.dataListloading = false;
                this.picServer = res.data.picServer;
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
            this.queryTabData();
        },
        handleCurrentChange(val) {
            if (val > 0) {
                this.pagelist.pageNum = val;
                this.queryTabData();
            }
        },
        resetForm(formName) {
            let _this = this;
            this.value1 = '';
            this.value2 = '';
            this.selecarea = [];
            this.$refs[formName].resetFields();
            setTimeout(() => {
                _this.queryTabData();
            }, 10);
        },
        updateappver(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.updateappverpost();
                } else {
                    return false;
                }
            });
        }
    },
    watch: {
        'searchform.type'(n) {
            if (n === 1) {
                this.placeholder = '请输入手机号';
            } else if (n === 2) {
                this.placeholder = '请输入联系人';
            } else if (n === 3) {
                this.placeholder = '请输入反馈内容';
            }
        }
    },
    computed: {
        appNameIdList() {
            return appNameId;
        },
        sysTypeList() {
            return sysType;
        },
        forceUpdateFlagList() {
            return forceUpdateFlag;
        },
        sourceList() {
            return source;
        },
        memberFeedbackSearchList() {
            return memberFeedbackSearch;
        }
    },
    components: {
        areaSelect
    }
};
</script>
<style lang="scss">
    .el-textarea {
        &.other_textHei {
            textarea {
                height: 100px;
            }
        }
    }
</style>
