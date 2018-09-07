<template lang="html">
    <div class="xe-page-content">
        <div class="breadcrumb-con">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ name: 'Index' }">主页</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'CustomerListPage' }">客户中心</el-breadcrumb-item>
                <el-breadcrumb-item>供应商档案</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="xe-page-header">
            <p class="packTheme">
                <span>包装代码：{{packDetail.packid}}</span>
                <span>包装描述：{{packDetail.descr}}</span>
            </p>
        </div>
        <div>
            <div>
                <div class="packThead">
                    <span>长度</span>
                    <span>宽度</span>
                    <span>高度</span>
                    <span>体积</span>
                    <span>重量</span>
                    <span>装箱</span>
                    <span>入库标签</span>
                    <span>出库标签</span>
                    <span>补货标签</span>
                    <span>包装材料</span>
                </div>
                <div class="packModur" style="margin-top: 15px">
                    <span class="packModurThead">主菜单</span>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.lengthuom1" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.widthuom1" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.heightuom1" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.cubeuom1" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.weightuom1" placeholder=""></el-input></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.cartonizeuom1" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.inLabel1" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.outLabel1" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.rplLabel1" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.packmaterial1" placeholder=""></el-input></div>
                </div>
                <div class="packModur">
                    <span class="packModurThead">内包装</span>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.lengthuom2" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.widthuom2" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.heightuom2" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.cubeuom2" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.weightuom2" placeholder=""></el-input></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.cartonizeuom2" value="N">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.inLabel2" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.outLabel2" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.rplLabel2" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.packmaterial2" placeholder=""></el-input></div>
                </div>
                <div class="packModur">
                    <span class="packModurThead">箱</span>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.lengthuom3" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.widthuom3" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.heightuom3" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.cubeuom3" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.weightuom3" placeholder=""></el-input></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.cartonizeuom3" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.inLabel3" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.outLabel3" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.rplLabel3" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.packmaterial3" placeholder=""></el-input></div>
                </div>
                <div class="packModur">
                    <span class="packModurThead">栈板</span>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.lengthuom4" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.widthuom4" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.heightuom4" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.cubeuom4" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.weightuom4" placeholder=""></el-input></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.cartonizeuom4" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.inLabel4" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.outLabel4" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.rplLabel4" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.packmaterial4" placeholder=""></el-input></div>
                </div>
                <div class="packModur">
                    <span class="packModurThead">其他</span>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.lengthuom5" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.widthuom5" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.heightuom5" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.cubeuom5" placeholder=""></el-input></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.weightuom5" placeholder=""></el-input></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.cartonizeuom5" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.inLabel5" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.outLabel5" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurRadio"><el-radio class="radio" disabled v-model="packDetail.rplLabel5" label="Y">&nbsp;</el-radio></div>
                    <div class="packModurInput"><el-input disabled v-model="packDetail.packmaterial5" placeholder=""></el-input></div>
                </div>
                <el-button type="primary" @click="returnBefore">返回</el-button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                queryUrl: '',
                mainUrl: '',
                addUrl: '',
                ids: '',
                packDetail: {}
            };
        },
        created() {
            this.getUerId();
        },
        methods: {
            getPacklist(ids) {
                let _this = this;
                _this.$http({
                    method: 'POST',
                    url: `/page/csc/packing/queryCscPackagingInfoById/${ids}`
                }).then((res) => {
                    if (res.result) {
                        _this.packDetail = res.result;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            getUerId() {
                let _this = this;
                _this.ids = _this.$route.query.Id;
                _this.getPacklist(_this.ids);
            },
            returnBefore() {
                this.$router.go(-1);
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
    .packTheme{
        padding: 0 0 20px 0
    }
    .packTheme span{
        padding-right:50px;
    }
    .packThead{
        padding-left: 75px;
    }
    .packThead span{
        width: 85px;
        display: inline-block;
        text-align: center;
    }
    .packModur{
        width: 970px;
        padding: 10px 10px 10px 75px;
        margin: 40px 0;
        border: 1px dotted;
        position: relative;
    }
    .packModurInput{
        display: inline-block;
        width: 85px;
        padding: 0 10px;
    }
    .packModurRadio{
        display: inline-block;
        width: 85px;
        text-align: center;
    }
    .packModurThead{
        position: absolute;
        top: -15px;
        left: 15px;
        padding: 5px;
        background: #fff;
    }
    .el-radio__input.is-disabled.is-checked .el-radio__inner{
        border-color: #20a0ff;
        background: #20a0ff;
        cursor: pointer;
    }
    .el-radio__input.is-disabled .el-radio__inner::after{
        cursor:pointer;
    }
    .el-input.is-disabled .el-input__inner{
        background: #fff;
        color: #1f2d3d;
        border: 1px solid #bfcbd9;
    }
</style>
