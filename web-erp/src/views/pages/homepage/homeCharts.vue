<template lang="html">
    <div class="m-home-item homecharts">
        <ul class="clearfix">
            <li>
                <div class="item">
                    <div class="item-heaBox">
                        <div class="item-heaTit item-heaTitTab">每日销售额</div>
                        <div class="item-Tabcard right-tabs__nav">
                            <el-tabs v-model="activeName" class="el-tabs__navR">
                                <el-tab-pane label="标签一" name="first">1</el-tab-pane>
                                <el-tab-pane label="标签二" name="second"><img src="../../../assets/images/home_m01.jpg" alt="" width="517" height="215"></el-tab-pane>
                                <el-tab-pane label="标签三" name="fourth">3</el-tab-pane>
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
            <li>
                <div class="item">
                    <div class="item-heaBox">
                        <div class="item-heaTit item-heaTitTab">商品销售分布图</div>
                        <div class="item-Tabcard right-tabs__nav">
                            <el-tabs v-model="activeName" class="el-tabs__navR">
                                <el-tab-pane label="标签一" name="first">1</el-tab-pane>
                                <el-tab-pane label="标签二" name="second"><img src="../../../assets/images/home_m02.jpg" alt="" width="517" height="215"></el-tab-pane>
                                <el-tab-pane label="标签三" name="fourth">3</el-tab-pane>
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
            <!-- <li>
                <div class="item">1</div>
            </li>
            <li>
                <div class="item">1</div>
            </li> -->
        </ul>
    </div>
</template>

<script>
export default {
    name: 'homecharts',
    data() {
        return {
            activeName: 'second'
        };
    }
};
</script>
