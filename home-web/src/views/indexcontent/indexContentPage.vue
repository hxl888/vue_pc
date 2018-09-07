<template lang="html">
    <div class="zhome-con">
        <div class="zh-breadcrumb">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">主页</el-breadcrumb-item>
                <a :href="oldLink" target="_self">返回旧版</a>
            </el-breadcrumb>
        </div>
        <div class="zh-carousel clearfix">
            <!--<Carousel trigger="click" height="440px">-->
                <!--<carouselItem v-for="item in 1">-->
                    <!--<h3>{{ item }}</h3>-->
                <!--</carouselItem>-->
            <!--</Carousel>-->
            <div class="zh-crar_banner">
                <img src="../../assets/image/index_nby1.png" alt="">
            </div>
        </div>
        <!--<div class="test-div" style="height: 620px;">-->
            <!--<homeIndexEcharts></homeIndexEcharts>-->
        <!--</div>-->
        <!--常用功能默认展示选中项-->
        <userFnItem :deItemDatas="uItemDes" v-loading="loading" element-loading-text="拼命加载中" @dialog-show="btnDialog"></userFnItem>
        <!--常用功能自定义弹窗-->
        <userFnDialog v-model="showFlag" :itemDatas="userFnData" :deItemDatas="uItemDes" @on-checked-change="checkedChange"></userFnDialog>
        <!--更新提示弹窗-->
        <div class="reminder" v-if="showReminder">
            <div class="reminderHeader"><i class="fa fa-volume-up" style="margin-right:8px"></i>温馨提示
                <span class="reminderClose pClose"><button @click="closereminder">X</button></span>
            </div>
            <div class="reminderBody">
                <ul class="reminderFul" v-for="item in reminderJson">
                    <li>
                        <div>
                            <span></span>
                            <span class='innerCircle'></span>
                            <p>{{item.name}}</p>
                        </div>
                        <ul>
                            <li v-for="(content,index) in item.child" class="circle">
                                <div class="homology">{{index+1}}、</div>
                                <div class='homology serial'>{{content.content}}</div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
//    import { Carousel, carouselItem } from 'element-ui';
    import userFnDialog from './indexUsefn';
    import userFnItem from './indexUseFnItem';
//    import homeIndexEcharts from 'components/echarts/homeIndexCharts/';
    export default {
        data() {
            return {
                carouselItemData: [],
                showFlag: false, // 是否显示常用功能弹窗,
                loading: false,
                showReminder: false,
                userFnData: [],
                uItemDes: [],
                reminderJson: [],
                currentVersion: ''
            };
        },
        created() {
            this.getUseCommonFns();
            this.initReminder();
        },
        methods: {
            closereminder() {
                this.showReminder = false;
            },
            initReminder() {
                let it = this;
                it.$http({
                    method: 'post',
                    url: '/page/uam/record/main/queryDefaultUpdateRecord'
                }).then(res => {
                    console.log('record', res);
                    if (res.result.list[0] === null) { return; }
                    it.currentVersion = res.result.list[0].createdTime;
                    it.reminderJson = JSON.parse(res.result.list[0].content);
                    it.queryCookieRecord();
                }).catch(error => {
                    console.log(error);
                });
            },
            queryCookieRecord() {
                let timestamp = this.$xeStore.getItem('updateTime');
                if (timestamp === null || JSON.parse(timestamp).createdTime !== this.currentVersion) {
                    this.showReminder = true;
                    console.log('show', this.showReminder);
                    this.$xeStore.setItem('updateTime', JSON.stringify({'createdTime': this.currentVersion}));
                }
            },
            getUseCommonFns() {
                this.loading = true;
                this.$http({
                    method: 'post',
                    url: '/page/uam/user/main/queryUserMenuDtoData'
                }).then(res => {
                    this.loading = false;
                    this.userFnData = res.result;
                    this.uItemDes = this.uItemDe;
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });
            },
            btnDialog() {
                this.showFlag = true;
            },
            checkedChange(value) {
                this.uItemDes = value;
            }
        },
        computed: {
            oldLink() {
                let oldLink = '';
                switch (process.env.NODE_ENV) {
                    case 'production':
                        oldLink = 'http://paas.xianyiscm.com/';
                        break;
                    case 'beta':
                        oldLink = 'http://paas-beta.xianyiscm.com/';
                        break;
                    case 'test':
                        oldLink = 'http://paas-test.xianyiscm.com/';
                        break;
                    case 'devend':
                        oldLink = 'http://paas-dev.xianyiscm.com/';
                        break;
                    default:
                        oldLink = 'http://paas-dev.xianyiscm.com/';
                };
                return oldLink;
            },
            uItemDe() {
                if (!this.userFnData.length) return;
                var result = [];
                this.userFnData.forEach(function(item, index) {
                    item.children.forEach(function(citem, cindex) {
                        if (citem.checked === true) {
                            result.push(citem);
                        }
                    });
                });
                return result;
            }
        },
        components: {
//            Carousel,
//            carouselItem,
            userFnDialog,
            userFnItem
//            homeIndexEcharts
        }
    };
</script>

<style rel="stylesheet/scss" lang="scss">
    @import "../../assets/styles/rules";

    .test-div {
        background: linear-gradient(to bottom, #ffffff 0%, #ffffff 88%, #f3f3f3 50%, #f3f3f3 95%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    }
</style>
