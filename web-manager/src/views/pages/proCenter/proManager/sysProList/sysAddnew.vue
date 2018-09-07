<template lang="html">
    <div class="pruduct-add">
          <!--搜索-->
          <div class="u-top-search" style="margin-top: 10px; margin-left: 20px;">
            <el-form :inline="true" class="resetForm clearfix"  ref = "serchFrom" :model = "serchFrom">
              <el-form-item label="" prop="proName" style="margin-right: 10px">
                <el-input class = "xe-input-col1" size="small" v-model="serchFrom.proName" placeholder="输入商品名称/货号查询"></el-input>
              </el-form-item>
              <el-form-item label="" prop="cateIdArray">
                <categoryTag v-model='cateIdArray' :width='192' :changeOnSelect="true" :filterable="true"></categoryTag>
              </el-form-item>
              <el-form-item label="" prop="typeId" style="margin-right: 10px;">
                <el-select class = "xe-input-col1" size="small" v-model="serchFrom.typeId" placeholder="选择属性类型">
                  <el-option
                    v-for="item in typeList"
                    :key="item.typeId"
                    :label="item.typeName"
                    :value="item.typeId">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="" prop="" class="item-resert fr">
                <el-button type="primary" class="xe-button-normal" @click="serchForm">搜索</el-button>
                <el-button class="xe-button-normal" @click="resetForm('serchFrom')">重置</el-button>
              </el-form-item>
            </el-form>
            <div class="u-opera-btnBox" style="padding-bottom: 0">
                <el-button @click="addProAll">
                    <span class="iconfont icon-xinzeng"></span> 添加
                </el-button>
            </div>
          </div>
          <div class="serch-content">
                <div class="serch-contentmaxHei">
                <el-table
                    :data="tableData"
                    border
                    @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="40" class-name="selectionTd" fixed="left">
                    </el-table-column>
                    <el-table-column label="商品图片" min-width="53">
                        <template scope="props">
                            <div class="z-imgbox">
                                <img :src="picServer + props.row.proMainImg" alt="" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" min-width="100" prop="proName">
                    </el-table-column>
                    <el-table-column label="商品类目" min-width="100" prop="cateName">
                    </el-table-column>
                    <el-table-column label="属性类型" min-width="100" prop="typeName" >
                    </el-table-column>
                    <el-table-column label="操作" min-width="35" fixed="right">
                        <template scope="props">
                            <div class="btn-in-table">
                                <a href="javascript:;" class="s-blue" @click="addnewpro(props.row)">添加</a>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <!--分页=======start-->
            <div class="page-showbox">
              <div class="xe-pagination-panel">
                <el-pagination
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                  :current-page="pagelist.currPage"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pagelist.pageSize"
                  layout="total, prev, pager, next, sizes, jumper"
                  :total="pagelist.total">
                </el-pagination>
              </div>
            </div>
            <!--分页=======end-->
          </div>
        </div>
</template>

<script>
    import categoryTag from '@/components/category/category';
    export default {
        props: ['dialogVisible'],
        data() {
            return {
                types: [],
                cateIdArray: null,
                serchFrom: {
                    proName: '',
                    cateId: null,
                    typeId: ''
                },
                picServer: '',
                typeList: [],
                tableData: [],
                pagelist: {
                    currPage: 1,
                    pageSize: 10,
                    total: 0
                },
                selectcontent: []
            };
        },
        created() {
            this.enquiryForm();
            // 编辑系统商品--查询属性列表
            this.typeListFun();
        },
        methods: {
            serchForm() {
                this.enquiryForm();
            },
            typeListFun() {
                let params = {};
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/sysprospu/queryAllProTypeList',
                    data: params
                }).then((res) => {
                    console.log('--查询属性列表--!!>', res);
                    this.typeList = res.data.typeList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            enquiryForm() {
                let params = {};
                params = this.serchFrom;
                if (this.cateIdArray) {
                    let cateId = this.cateIdArray;
                    params.cateId = cateId.slice(cateId.length - 1, cateId.length).join(',');
                }
                params.pageNum = this.pagelist.currPage;
                params.pageSize = this.pagelist.pageSize;
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/sysprospu/getVenProSpuList',
                    data: params
                }).then((res) => {
                    console.log('--666--!!>', res);
                    this.picServer = res.data.picServer;
                    this.pagelist.total = res.data.pageInfo.total;
                    this.tableData = res.data.venProSpuList;
                }).catch((error) => {
                    console.log(error);
                });
            },
            onSubmit() {
                this.enquiryForm();
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.cateIdArray = [];
                this.enquiryForm();
            },
            addnewpro(row) { // 单条添加
                this.addnewFun(row.proSpu);
                console.log('row.proSpu', row.proSpu);
            },
            addProAll() { // 多选添加
                if (this.selectcontent.length > 0) {
                    this.$confirm(`确定批量添加商品么？`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.addnewFun();
                    }).catch(() => {
                    });
                } else {
                    this.$alert('请勾选需要批量添加的商品', {
                        type: 'info'
                    });
                }
            },
            addnewFun(proSpu) {
                let params = {};
                if (proSpu) {
                    let array = [];
                    array.push(proSpu);
                    params.spuArray = array;
                } else {
                    params.spuArray = this.selectcontent;
                }
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-mis/manager/proList/managerSetSysSpuBatch',
                    data: params
                }).then((res) => {
                    console.log('---添加成功-!!>', res);
                    window.$wxeMessage({
                        type: 'success',
                        message: `添加系统商品成功`
                    });
                    this.$emit('selectGo');
                    this.cateIdArray = [];
                    this.$refs.serchFrom.resetFields();
                }).catch((error) => {
                    console.log(error);
                });
            },
            handleSizeChange(val) {
                this.pagelist.pageSize = val;
                this.enquiryForm();
            },
            handleCurrentChange(val) {
                if (val > 0) {
                    this.pagelist.currPage = val;
                    this.enquiryForm();
                }
            },
            handleSelectionChange(val) {
                for (let i in val) {
                    this.selectcontent.push(val[i].proSpu);
                }
            }
        },
        components: {
            categoryTag
        },
        watch: {
            dialogVisible(n) {
                if (n === false) {
                    this.resetForm('serchFrom');
                }
            }
        }
    };
</script>
<style scoped>
    .xe-input-col1 {
        margin-right: 0;
    }
</style>
