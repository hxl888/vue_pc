<template lang="html">
    <div class="m-home-item homecharts">
        <ul class="clearfix">
            <li>
                <div class="item">
                    <div class="item-heaBox">
                        <div class="item-heaTit item-heaTitTab">2017年-业务员销售排名</div>
                        <div class="item-Tabcard">
                            <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs__navR">
                                <el-tab-pane label="标签一" name="first">
                                    <img src="../../../assets/images/homeBanner_1.png" alt="" style="width: 100%;height: 100%">
                                </el-tab-pane>
                                <el-tab-pane label="标签二" name="second">标签二</el-tab-pane>
                                <el-tab-pane label="标签三" name="fourth">标签三</el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                    <div class="coverWord">
                        <div class="wordcontent">
                            <p class="firsthea">敬请期待！</p>
                            <p class="seconhea">Coming soon!Please expecting!</p>
                        </div>
                    </div>
                </div>
            </li>
            <!--<li>-->
                <!--<div class="item">-->
                    <!--<div class="item-heaBox clearfix item-heaBoxNotab">-->
                        <!--<div class="item-heaTit fl">订单统计趋势图</div>-->
                        <!--<div class="item-Tabcard fr" style="padding-right: 5px">-->
                             <!--<el-select style="width: 60px" class="xe-input-smal"  v-model="value" placeholder="">-->
                                <!--<el-option-->
                                <!--v-for="item in options"-->
                                <!--:label="item.name"-->
                                <!--:key="item.value"-->
                                <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item-picbox">-->
                        <!--<img src="../../../assets/images/homeBanner_2.png" alt="">-->
                    <!--</div>-->
                    <!--<div class="coverWord">-->
                        <!--<div class="wordcontent">-->
                            <!--<p class="firsthea">敬请期待！</p>-->
                            <!--<p class="seconhea">Coming soon!Please expecting!</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
            <li>
                <div class="item">
                    <div class="item-heaBox">
                        <div class="item-heaTit item-heaTitTab">地区销售分布图</div>
                        <div class="item-Tabcard">
                            <el-tabs v-model="activeName" @tab-click="handleClick" class="el-tabs__navR">
                                <el-tab-pane label="标签一" name="first">
                                     <img src="../../../assets/images/homeBanner_2.png" style="width: 100%;height: 100%" alt="">
                                </el-tab-pane>
                                <el-tab-pane label="标签二" name="second">标签二</el-tab-pane>
                                <el-tab-pane label="标签三" name="fourth">标签三</el-tab-pane>
                            </el-tabs>
                        </div>
                    </div>
                    <div class="coverWord">
                        <div class="wordcontent">
                            <p class="firsthea">敬请期待！</p>
                            <p class="seconhea">Coming soon!Please expecting!</p>
                        </div>
                    </div>
                </div>
            </li>
            <!--<li>-->
                 <!--<div class="item">-->
                    <!--<div class="item-heaBox clearfix item-heaBoxNotab">-->
                        <!--<div class="item-heaTit fl">订购商品数</div>-->
                        <!--<div class="item-Tabcard fr" style="padding-right: 5px">-->
                             <!--<el-select style="width: 60px" class="xe-input-smal"  v-model="value" placeholder="">-->
                                <!--<el-option-->
                                <!--v-for="item in options"-->
                                <!--:label="item.name"-->
                                <!--:key="item.value"-->
                                <!--:value="item.value">-->
                                <!--</el-option>-->
                            <!--</el-select>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="item-picbox"></div>-->
                    <!--<div class="coverWord">-->
                        <!--<div class="wordcontent">-->
                            <!--<p class="firsthea">敬请期待！</p>-->
                            <!--<p class="seconhea">Coming soon!Please expecting!</p>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</li>-->
        </ul>
    </div>
</template>

<script>
export default {
    name: 'homecharts',
    data() {
        return {
            activeName: 'first',
            value: 1,
            options: [{name: '订单', value: 1}]
        };
    },
    methods: {
        handleClick() {}
    }
};
</script>
