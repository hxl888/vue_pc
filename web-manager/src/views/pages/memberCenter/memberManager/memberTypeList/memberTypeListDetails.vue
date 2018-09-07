<template lang="html">
    <div class="m-router-con">
       <div class="for-itemlis" v-if="htmlloading">
            <div class="item-head clearfix">
                <div class="fl item-tit">类型信息</div>
            </div>
            <div class="item-main-box martop10">
                <ul class="clearfix">
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">类型名称：{{userType.typeName}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">状态：{{userType.typeStatus | userTypeStatusfilter}}</p></li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">采购业务类型：{{userType.frozenFlag | frozenFlagtypeofiter}}</p></li>
                    <li class="list-show list-show1 fl">
                        <div class="lis_p ellipsis">
                             <el-tooltip effect="dark"  placement="top" v-if="userType.typeDesc">
                                <div slot="content">{{userType.typeDesc.substr(0, 50)}} <span v-if="userType.typeDesc.substr(50, 50)"><br/>{{userType.typeDesc.substr(50, 50)}}</span><span v-if="userType.typeDesc.substr(100, 50)"><br/>{{userType.typeDesc.substr(100, 50)}}</span><span v-if="userType.typeDesc.substr(150, 50)"><br/>{{userType.typeDesc.substr(150, 50)}}</span></div>
                                <div class="lis_p ellipsis">描述:{{userType.typeDesc}}</div>
                            </el-tooltip>
                        </div>
                    </li>
                    <li class="list-show list-show1 fl"><p class="lis_p ellipsis">创建时间：{{userType.createDate}}</p></li>
                </ul>
            </div>
        </div>
        <footer>
            <el-button type="primary"  @click="goBack" >返回</el-button>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            userType: {},
            htmlloading: false,
            productUrl: '/xe-route/xe-mis'
//            productUrl: ''
        };
    },
    created() {
        this.auditDetailsCk();
    },
    methods: {
        auditDetailsCk() {
            let typeId = this.$route.query.typeId;
            if (typeId) {
                this.$http({
                    method: 'post',
                    url: `${this.productUrl}/manager/userType/selectUserTypeByTypeId`,
                    data: {
                        typeId: typeId
                    }
                }).then((res) => {
                    console.log('res---->', res);
                    this.htmlloading = true;
                    this.userType = res.data.userType;
                }).catch((error) => {
                    console.log(error);
                });
            } else {
                this.$router.go(-1);
            }
        },
        goBack() {
            this.$router.go(-1);
        }
    }
};
</script>

<style lang="scss">
</style>
