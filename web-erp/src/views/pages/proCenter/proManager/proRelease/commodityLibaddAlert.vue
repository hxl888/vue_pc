<template lang="html">
        <div class="pruduct-add">
          <!--搜索-->
          <div class="serch-box">
            <el-form :inline="true" class="resetForm clearfix" ref="serchFrom">
              <el-form-item>
                <el-input size="small" class="xe-input-col2" v-model="proName" placeholder="输入商品名称/商品编号/货号查询"></el-input>
              </el-form-item>
              <el-form-item>
                  <category v-model="cateIds"></category>
              </el-form-item>
              <el-form-item class="item-resert">
                <el-button class="xe-button-normal" type="primary" @click="proLibSearch">搜索</el-button>
                <el-button class="xe-button-normal" @click="resetForm">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="serch-content" v-loading='loading' element-loading-text="加载中">
            <el-table :data="serchContentData" border>
                <el-table-column label="商品图片" width="116">
                    <template scope="scope">
                        <img :src="imgUrlPreFix + scope.row.proMainImg" alt="" width="80" height="80">
                    </template>
                </el-table-column>
                <el-table-column prop="proName" label="商品名称" min-width="240">
                </el-table-column>
                <el-table-column prop="cateName" label="商品类目" min-width="165">
                </el-table-column>
                <!--<el-table-column prop="brandName" label="商品品牌" min-width="146">-->
                <!--<template scope="scope">-->
                <!--{{scope.row.brandName ? scope.row.brandName : '无'}}-->
                <!--</template>-->
                <!--</el-table-column>-->
                <el-table-column prop="typeName" label="属性类型" min-width="118">
                    <template scope="scope">
                        {{scope.row.typeName ? scope.row.typeName : '无'}}
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="65">
                    <template scope="scope">
                        <span class="col_blu1" @click.prevent='add(scope.row.proName, scope.row.proSpu)'>添加</span>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页=======start-->
            <div class="page-showbox">
              <div class="xe-pagination-panel">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="pagelist.pageNum"
                  :page-sizes="[5, 10, 20, 50]"
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
    import category from 'components/category/category';
    export default {
        name: 'commodityLibaddAlert',
        data() {
            return {
                imgUrlPreFix: '',
                loading: false,
                cateIds: [],
                proName: '',
                pagelist: {
                    pageNum: 1,
                    pageSize: 5,
                    total: 0
                },
                serchContentData: []
            };
        },
        created() {
            // 获取商品
            this.querySysProList();
        },
        methods: {
            proLibSearch() {
                this.querySysProList();
            },
            resetForm() {
                this.cateIds = [];
                this.proName = '';
                this.querySysProList();
            },
            querySysProList() {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/sysprospu/getSysProSpuList',
                    data: {
                        proName: this.proName,
                        cateId: this.cateId,
                        pageNum: this.pagelist.pageNum,
                        pageSize: this.pagelist.pageSize
                    }
                }).then(res => {
                    console.log(res);
                    this.serchContentData = res.data.sysProSpuList;
                    this.pagelist = res.data.pageInfo;
                    this.imgUrlPreFix = res.data.picServer;
                }).catch(error => {
                    console.log(error);
                });
            },
            getSysProSpuByKey(spu) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/sysprospu/getSysProSpuByKey',
                    data: {
                        proSpu: spu
                    }
                }).then(res => {
                    console.log(res);
                    this.$emit('proAdd', res.data.venProSpu);
                }).catch(error => {
                    console.log(error);
                });
            },
            add(proName, proSpu) {
                this.loading = true;
                this.proIsExistByName(proName, (flag) => {
                    // 1.存在 2.不存在
                    this.loading = false;
                    if (flag === 1) {
                        this.$confirm('已存在相同名称的商品，确认添加？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.getSysProSpuByKey(proSpu);
                        }).catch(() => {});
                    } else {
                        this.getSysProSpuByKey(proSpu);
                    };
                });
            },
            proIsExistByName(proName, fn) {
                this.$http({
                    method: 'post',
                    url: '/xe-route/xe-pro/ven/proSpu/proIsExistByName',
                    data: {
                        'proName': proName
                    }
                }).then(res => {
                    fn && fn(res.data.isExist);
                }).catch(error => {
                    console.log(error);
                });
            },
            handleSizeChange(size) {
                this.pagelist.pageSize = size;
                this.querySysProList();
            },
            handleCurrentChange(currentPage) {
                this.pagelist.pageNum = currentPage;
                this.querySysProList();
            }
        },
        computed: {
            cateId() {
                if (!this.cateIds.length) {
                    return '';
                } else {
                    return this.cateIds[this.cateIds.length - 1];
                }
            }
        },
        components: {
            category
        }
    };
</script>

<style lang="scss">
    @import "../../../../../assets/styles/views/addNewAlert.scss";
</style>
