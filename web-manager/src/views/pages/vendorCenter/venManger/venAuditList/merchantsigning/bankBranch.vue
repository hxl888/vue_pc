<template lang="html">
    <div class="bankBranchBox">
        <div class="banSerchBox">
            <div class="u-top-search">
                <el-form :inline="true"  :label-width="xeLabelWidth80" >
                    <el-form-item label="支行名称">
                        <el-input size="small" class="xe-input-200_hei30" @keyup.enter.native="queryBranch" v-model="banckbranchData" placeholder="请输入支行名称"></el-input>
                        <input type="text" typeof="hidden" style="font-size: 0">
                    </el-form-item>
                    <el-form-item label="">
                        <el-button class="xe-button-normal" type="primary"  @click="queryBranch">查询</el-button>
                        <el-button class="xe-button-normal"  @click="resert">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="bankshowBox">
            <ul class="clearfix">
                <li class="bankLis fl" v-for="(item, index) in bankBranchs" @click="liItemClick(item, index)">
                    <p>{{item.branchName}}</p>
                    <p class="iconfont" :class="{'active_click': index === flagIndex}"></p>
                </li>
            </ul>
        </div>
        <div class="bankFoot">
            <div class="xe-pagination-panel">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="pagelist.currPage"
                  :page-size="pagelist.pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="pagelist.total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['accBankCode', 'branchdilog'],
    data() {
        return {
            banckbranchData: '',
            bankBranchs: {},
            pagelist: {
                currPage: 1,
                pageSize: 12,
                total: 0
            },
            flagIndex: ''
        };
    },
    created() {
        this.banckBranSeach();
        console.log('parentCode', this.accBankCode);
    },
    methods: {
        handleCurrentChange(val) {
            if (val !== 0) {
                this.pagelist.currPage = val;
                this.banckBranSeach();
                this.flagIndex = '';
            }
        },
        queryBranch() {
            this.banckBranSeach();
        },
        liItemClick(item, index) {
            this.flagIndex = index;
            this.$emit('branchBankMsg', item);
        },
        resert() {
            this.banckbranchData = '';
            this.banckBranSeach();
        },
        banckBranSeach() {
            let _this = this;
            let params = {};
            params.page = this.pagelist.currPage;
            params.pageSize = this.pagelist.pageSize;
            params.parentCode = this.accBankCode;
            params.branchName = this.banckbranchData;
            console.log('params', this.pagelist);
            _this.$http({
                method: 'post',
                url: '/xe-route/xe-mis/manager/venmanager/queryVenBankBranch',
                data: params
            }).then((res) => {
                if (res.data.bankBranchs) {
                    this.bankBranchs = res.data.bankBranchs;
                    this.pagelist.currPage = res.data.pageInfo.pageNum;
                    this.pagelist.pageSize = res.data.pageInfo.pageSize;
                    this.pagelist.total = res.data.pageInfo.total;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }
};
</script>

<style lang="scss">
</style>
