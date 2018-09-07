<template lang="html">
    <div class="m-router-con">
        <!-- 5区域商品 -->
        <div class="u-top-search">
            <el-form :inline="true" :model="formInline" ref="formInline" class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="调拨单号自动生成"></el-input>
                </el-form-item><el-form-item>
                    <el-select v-model="formInline.region" placeholder="调出仓库">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item><el-form-item>
                    <el-select v-model="formInline.region" placeholder="调入仓库">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item><el-form-item class="z-mr30">
                    <el-input placeholder="调拨备注"></el-input>
                </el-form-item><el-form-item>
                    <el-button type="primary" @click="onSubmit">
                        查询
                    </el-button><el-button  @click="resetForm('formInline')">
                        重置
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="u-opera-btnBox">
            <el-button>
                <span class="iconfont icon-tiaobodan"></span> 选中调拨商品
            </el-button>
        </div>
        <div class="goodsTable">
            <el-table 
                :data="tableData" 
                style="width: 100%" 
                border>
                <el-table-column type="selection" width="34" class-name="selectionTd">
                    </el-table-column>
                    <el-table-column label="商品图片" width="100">
                        <!-- 商品图片{{props.row.img}} -->
                        <template scope="props">
                            <!-- 商品图片{{props.row.img}} -->
                            <div class="z-imgbox">
                                <img :src=props.row.img alt="商品图片" width="60" height="60">
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="商品名称" prop="name" width="85">
                    </el-table-column>
                    <el-table-column label="商品货号" prop="desc" width="85">
                    </el-table-column>
                    <el-table-column label="商品条码" prop="id" width="85">
                    </el-table-column>
                    <el-table-column label="商品分类" prop="name" width="85">
                    </el-table-column>
                    <el-table-column label="计量方式" prop="id" width="85">
                    </el-table-column>
                    <el-table-column label="单位" prop="name" width="">
                    </el-table-column>
                    <el-table-column label="规格" prop="name" width="">
                    </el-table-column>
                    <el-table-column label="实际库存" prop="name" width="85">
                    </el-table-column>
                    <el-table-column label="可用库存" prop="desc" width="85">
                    </el-table-column>
                    <el-table-column label="调拨数量" prop="id" width="85">
                    </el-table-column>
                    <el-table-column label="调拨重量" prop="name" width="85">
                    </el-table-column>
                    <el-table-column label="调拨金额" prop="id" width="85">
                    </el-table-column>
                    <el-table-column label="实际出库量" prop="name" width="105">
                    </el-table-column>
                    <el-table-column label="实际入库量" prop="name" width="105">
                    </el-table-column>
                    <el-table-column label="备注" prop="name" width="">
                    </el-table-column>
                    <el-table-column label="操作"  width="110" fixed="right">
                        <template scope="props">
                            <div class="btn-in-table">
                                <a href="javascript:;" class="s-blue" @click="dialogVisible = true">修改</a>
                                <a href="javascript:;" class="s-blue" @click="deletBtn(props.row.id)">删除</a>
                            </div>
                        </template>
                    </el-table-column>
            </el-table>
        </div>
        <div class="btn-next">
            <el-button type="primary">
                保存
            </el-button><el-button>
                取 消
            </el-button>
        </div>
        <div class="reset-dialog set-editrequise">
            <el-dialog
                title="选择调拨商品"
                :visible.sync="dialogVisible"
                size="large"
                :before-close="handleClose">
                    <div class="tab-editrequise">
                        <el-form :inline="true" :model="formInline">
                            <el-form-item>
                                <el-input v-model="formInline.region" placeholder="调拨单号自动生成" style="width:210px"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-checkbox-group v-model="formInline.type">
                                    <el-checkbox label="零库存商品" name="type"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="editBtn">查询</el-button>
                            </el-form-item>
                        </el-form>
                        <div class="tab-result clearfix">
                            <div class="tree-editrequise">
                                <h4>商品分类</h4>
                                <el-tree
                                    :data="data2"
                                    node-key="id"
                                    :default-expanded-keys="[2, 3]"
                                    :props="defaultProps">
                                </el-tree>
                            </div>
                            <div class="table-editrequise">
                                <el-table 
                                    :data="tableData" 
                                    style="width: 100%" 
                                    border>
                                    <el-table-column type="selection" width="34" class-name="selectionTd">
                                        </el-table-column>
                                        <el-table-column label="商品图" width="100">
                                            <!-- 商品图片{{props.row.img}} -->
                                            <template scope="props">
                                                <!-- 商品图片{{props.row.img}} -->
                                                <div class="z-imgbox">
                                                    <img :src=props.row.img alt="商品图片" width="60" height="60">
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="商品名称" prop="name" width="110">
                                        </el-table-column>
                                        <el-table-column label="商品货号" prop="desc" width="85">
                                        </el-table-column>
                                        <el-table-column label="商品条码" prop="id" width="85">
                                        </el-table-column>
                                        <el-table-column label="商品分类" prop="name" width="85">
                                        </el-table-column>
                                        <el-table-column label="计量方式" prop="id" width="85">
                                        </el-table-column>
                                        <el-table-column label="单位" prop="name" width="">
                                        </el-table-column>
                                        <el-table-column label="规格" prop="name" width="">
                                        </el-table-column>
                                        <el-table-column label="成本价" prop="id" width="">
                                        </el-table-column>
                                        <el-table-column label="实际库存" prop="name" width="85">
                                        </el-table-column>
                                        <el-table-column label="可用库存" prop="name" width="85">
                                        </el-table-column>
                                        <!-- <el-table-column label="操作"  width="110" fixed=right>
                                            <template scope="props">
                                                <div class="btn-in-table">
                                                    <a href="javascript:;" class="s-blue" @click="editBtn(props.row.id)">修改</a>
                                                    <a href="javascript:;" class="s-blue" @click="deletBtn(props.row.id)">删除</a>
                                                </div>
                                            </template>
                                        </el-table-column> -->
                                </el-table>
                            </div>
                        </div>
                        <div class="page-showbox">
                            <div class="xe-pagination-panel">
                                <el-pagination
                                    @size-change="handleSizeChange"
                                    @current-change="handleCurrentChange"
                                    :current-page="pagelist.currPage"
                                    :page-sizes="[10, 20, 50, 100]"
                                    :page-size="pagelist.pageSize"
                                    layout="total, prev, pager, next, sizes, jumper"
                                    :total="pagelist.total">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="dialogVisible = false">选中</el-button>
                        <el-button @click="dialogVisible = false">选中并关闭</el-button>
                        <el-button @click="dialogVisible = false">关闭</el-button>
                    </span>
            </el-dialog>
        </div>
    </div>
</template>

<style lang="scss">
</style>

<script>
let id = 1000;
export default {
    name: 'homepage',
    data() {
        return {
            dialogVisible: true,
            formInline: {
                region: '',
                type: []
            },
            pagelist: {
                currPage: 1,
                pageSize: 10,
                total: 20
            },
            data2: [{ // tree
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            tableData: [
                {
                    img: 'https://img.alicdn.com/imgextra/i4/5/TB2hFlXqXXXXXcyXXXXXXXXXXXX_!!5-0-yamato.jpg',
                    name: '好滋好味鸡蛋仔好',
                    category: '江浙小吃、小吃零食',
                    desc: '修改',
                    address: '上海市普陀区真北路',
                    skus: [{
                        shop1: '王小虎夫妻店',
                        shop2: '王小虎夫妻店2',
                        shop3: '王小虎夫妻店3'
                    }, {
                        shop1: '王小虎夫妻店',
                        shop2: '王小虎夫妻店2',
                        shop3: '王小虎夫妻店3'
                    }],
                    shopId: '10333',
                    id: 3232424
                }, {
                    img: 'https://img.alicdn.com/imgextra/i4/5/TB2hFlXqXXXXXcyXXXXXXXXXXXX_!!5-0-yamato.jpg',
                    name: '好滋好味鸡蛋仔好',
                    category: '江浙小吃、小吃零食',
                    desc: '修改',
                    address: '上海市普陀区真北路',
                    skus: [{
                        shop1: '王小虎夫妻店',
                        shop2: '王小虎夫妻店2',
                        shop3: '王小虎夫妻店3'
                    }, {
                        shop1: '王小虎夫妻店',
                        shop2: '王小虎夫妻店2',
                        shop3: '王小虎夫妻店3'
                    }],
                    shopId: '10333',
                    id: 3232424
                }
            ]
        };
    },
    mounted() {},
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        append(store, data) {
            store.append({ id: id++, label: 'testtest', children: [] }, data);
        },

        remove(store, data) {
            store.remove(data);
        },
        editBtn(spu) {
            console.log(`edit ${spu}`);
        },
        deletBtn(spu) {
            console.log('delet' + spu);
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
            .then(_ => {
                done();
            })
            .catch(_ => {});
        },
        handleSizeChange() {},
        handleCurrentChange() {}
    }
};
</script>
