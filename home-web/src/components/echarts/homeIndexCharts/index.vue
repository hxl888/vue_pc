<template>
    <div id="homeIndex-echarts" style="height: 100%;"></div>
</template>
<script type="text/ecmascript-6">
    // 引入 ECharts 主模块
    import echarts from 'echarts/lib/echarts';
    // 引入柱状图
    require('echarts/lib/chart/bar');
    require('echarts/lib/component/timeline');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/toolbox');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');

    import {getHomeProjectLink} from 'xcms-common-plugins/src/utils/';

    export default {
        data() {
            return {
                myChart: null,
                myChartELement: null
            };
        },
        mounted() {
            this.$nextTick(() => {
                // 基于准备好的dom，初始化echarts实例
                this.myChartELement = document.getElementById('homeIndex-echarts');
                this.myChart = echarts.init(this.myChartELement);
                var colors = ['#91c7af', '#008cca', '#07850a', '#dd7435', '#d0e237', '#4db5e6'];

                // 获取当前月份前6月
                let monthFromNow = this.monthFromNow();
                let firstParams = monthFromNow[monthFromNow.length - 1].split('-').join('');
                let chartDatas = null;

                function getCountNum(zb, dq, data = chartDatas) {
                    let legendData = [];
                    let dataQuyuSet = [];
                    let dataQuyuPlan = [];
                    let dataQuyuOver = [];
                    let dataText = [];
                    let dataPlan = [];
                    let dataSet = [];
                    let dataOver = [];
                    data.some((item, index) => {
                        legendData.push(item.name);
                        if (item.name === zb) {
                            item.typeDto.some(quitem => {
                                if (quitem.areaName === dq) {
                                    dataQuyuSet.push(quitem.settleAmount);
                                    dataQuyuPlan.push(quitem.planAmount);
                                    dataQuyuOver.push(quitem.settleAmount > quitem.planAmount ? parseFloat((quitem.settleAmount - quitem.planAmount).toFixed(2)) : 0);
                                    quitem.bodyAmountVo.forEach(cityItem => {
                                        dataText.push(cityItem.baseName.replace('基地', ''));
                                        dataPlan.push(cityItem.planAmount);
                                        dataSet.push(cityItem.settleAmount);
                                        dataOver.push(cityItem.settleAmount > cityItem.planAmount ? parseFloat((cityItem.settleAmount - cityItem.planAmount).toFixed(2)) : 0);
                                    });
                                    return true;
                                }
                            });
                        }
                    });
                    return {
                        legendData: legendData,
                        dataQuyuSet: dataQuyuSet,
                        dataQuyuPlan: dataQuyuPlan,
                        dataQuyuOver: dataQuyuOver,
                        dataText: dataText,
                        dataPlan: dataPlan,
                        dataSet: dataSet,
                        dataOver: dataOver
                    };
                };

                let chartDatasHuanan = null;
                let chartDatasHuananYunshu = null;
                let chartDatasHuananCangchu = null;
                let chartDatasHuananJinrong = null;
                let chartDatasHuananMaoyi = null;
                let chartDatasHuananLiutong = null;

                let chartDatasHuadong = null;
                let chartDatasHuadongYunshu = null;
                let chartDatasHuadongCangchu = null;
                let chartDatasHuadongJinrong = null;
                let chartDatasHuadongMaoyi = null;
                let chartDatasHuadongLiutong = null;

                let chartDatasHuaBei = null;
                let chartDatasHuaBeiYunshu = null;
                let chartDatasHuaBeiCangchu = null;
                let chartDatasHuaBeiJinrong = null;
                let chartDatasHuaBeiMaoyi = null;
                let chartDatasHuaBeiLiutong = null;

                let chartDatasHuazhong = null;
                let chartDatasHuazhongYunshu = null;
                let chartDatasHuazhongCangchu = null;
                let chartDatasHuazhongJinrong = null;
                let chartDatasHuazhongMaoyi = null;
                let chartDatasHuazhongLiutong = null;

                let seriesOptions = [];

                this.myChart.showLoading();
                this.$http({
                    method: 'post',
                    baseURL: getHomeProjectLink().acApiBaseUrl,
                    url: '/page/ac/transport/searchSettlePlan',
                    data: {
                        yearMonth: firstParams
                    }
                }).then(res => {
                    console.log(res);
                    this.myChart.hideLoading();
                    chartDatas = res.result;
                    chartDatasHuanan = getCountNum('集合指标', '华南大区');
                    chartDatasHuananYunshu = getCountNum('运输指标', '华南大区');
                    chartDatasHuananCangchu = getCountNum('仓储指标', '华南大区');
                    chartDatasHuananJinrong = getCountNum('金融指标', '华南大区');
                    chartDatasHuananMaoyi = getCountNum('贸易指标', '华南大区');
                    chartDatasHuananLiutong = getCountNum('流通加工指标', '华南大区');

                    chartDatasHuadong = getCountNum('集合指标', '华东大区');
                    chartDatasHuadongYunshu = getCountNum('运输指标', '华东大区');
                    chartDatasHuadongCangchu = getCountNum('仓储指标', '华东大区');
                    chartDatasHuadongJinrong = getCountNum('金融指标', '华东大区');
                    chartDatasHuadongMaoyi = getCountNum('贸易指标', '华东大区');
                    chartDatasHuadongLiutong = getCountNum('流通加工指标', '华东大区');

                    chartDatasHuaBei = getCountNum('集合指标', '华北大区');
                    chartDatasHuaBeiYunshu = getCountNum('运输指标', '华北大区');
                    chartDatasHuaBeiCangchu = getCountNum('仓储指标', '华北大区');
                    chartDatasHuaBeiJinrong = getCountNum('金融指标', '华北大区');
                    chartDatasHuaBeiMaoyi = getCountNum('贸易指标', '华北大区');
                    chartDatasHuaBeiLiutong = getCountNum('流通加工指标', '华北大区');

                    chartDatasHuazhong = getCountNum('集合指标', '华中大区');
                    chartDatasHuazhongYunshu = getCountNum('运输指标', '华中大区');
                    chartDatasHuazhongCangchu = getCountNum('仓储指标', '华中大区');
                    chartDatasHuazhongJinrong = getCountNum('金融指标', '华中大区');
                    chartDatasHuazhongMaoyi = getCountNum('贸易指标', '华中大区');
                    chartDatasHuazhongLiutong = getCountNum('流通加工指标', '华中大区');

                    seriesOptions = [
                        {
                            series: [
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    barCategoryGap: '40%',
                                    stack: '0-123',
                                    z: 23,
                                    data: chartDatasHuanan.dataQuyuSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    barCategoryGap: '40%',
                                    stack: '0-123',
                                    z: 23,
                                    data: chartDatasHuananYunshu.dataQuyuSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    barCategoryGap: '40%',
                                    stack: '0-123',
                                    z: 23,
                                    data: chartDatasHuananCangchu.dataQuyuSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    barCategoryGap: '40%',
                                    stack: '0-123',
                                    z: 23,
                                    data: chartDatasHuananJinrong.dataQuyuSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    barCategoryGap: '40%',
                                    stack: '0-123',
                                    z: 23,
                                    data: chartDatasHuananMaoyi.dataQuyuSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    barCategoryGap: '40%',
                                    stack: '0-123',
                                    z: 23,
                                    data: chartDatasHuananLiutong.dataQuyuSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华南大区-全',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    data: chartDatasHuanan.dataQuyuPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华南大区-全',
                                    stack: '0-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 0,
                                    yAxisIndex: 0,
                                    data: chartDatasHuanan.dataQuyuOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    barCategoryGap: '40%',
                                    stack: '1-123',
                                    z: 23,
                                    data: chartDatasHuanan.dataSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    barCategoryGap: '40%',
                                    stack: '1-123',
                                    z: 23,
                                    data: chartDatasHuananYunshu.dataSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    barCategoryGap: '40%',
                                    stack: '1-123',
                                    z: 23,
                                    data: chartDatasHuananCangchu.dataSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    barCategoryGap: '40%',
                                    stack: '1-123',
                                    z: 23,
                                    data: chartDatasHuananJinrong.dataSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    barCategoryGap: '40%',
                                    stack: '1-123',
                                    z: 23,
                                    data: chartDatasHuananMaoyi.dataSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    barCategoryGap: '40%',
                                    stack: '1-123',
                                    z: 23,
                                    data: chartDatasHuananLiutong.dataSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华南大区',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    data: chartDatasHuanan.dataPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华南大区',
                                    stack: '1-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 1,
                                    yAxisIndex: 1,
                                    data: chartDatasHuanan.dataOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    barCategoryGap: '40%',
                                    stack: '2-123',
                                    z: 23,
                                    data: chartDatasHuadong.dataQuyuSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    barCategoryGap: '40%',
                                    stack: '2-123',
                                    z: 23,
                                    data: chartDatasHuadongYunshu.dataQuyuSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    barCategoryGap: '40%',
                                    stack: '2-123',
                                    z: 23,
                                    data: chartDatasHuadongCangchu.dataQuyuSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    barCategoryGap: '40%',
                                    stack: '2-123',
                                    z: 23,
                                    data: chartDatasHuadongJinrong.dataQuyuSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    barCategoryGap: '40%',
                                    stack: '2-123',
                                    z: 23,
                                    data: chartDatasHuadongMaoyi.dataQuyuSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    barCategoryGap: '40%',
                                    stack: '2-123',
                                    z: 23,
                                    data: chartDatasHuadongLiutong.dataQuyuSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华东大区-全',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    data: chartDatasHuadong.dataQuyuPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华东大区-全',
                                    stack: '2-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 2,
                                    yAxisIndex: 2,
                                    data: chartDatasHuadong.dataQuyuOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    barCategoryGap: '40%',
                                    stack: '3-123',
                                    z: 23,
                                    data: chartDatasHuadong.dataSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    barCategoryGap: '40%',
                                    stack: '3-123',
                                    z: 23,
                                    data: chartDatasHuadongYunshu.dataSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    barCategoryGap: '40%',
                                    stack: '3-123',
                                    z: 23,
                                    data: chartDatasHuadongCangchu.dataSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    barCategoryGap: '40%',
                                    stack: '3-123',
                                    z: 23,
                                    data: chartDatasHuadongJinrong.dataSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    barCategoryGap: '40%',
                                    stack: '3-123',
                                    z: 23,
                                    data: chartDatasHuadongMaoyi.dataSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    barCategoryGap: '40%',
                                    stack: '3-123',
                                    z: 23,
                                    data: chartDatasHuadongLiutong.dataSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华东大区',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    data: chartDatasHuadong.dataPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华东大区',
                                    stack: '3-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 3,
                                    yAxisIndex: 3,
                                    data: chartDatasHuadong.dataOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    barCategoryGap: '40%',
                                    stack: '4-123',
                                    z: 23,
                                    data: chartDatasHuaBei.dataQuyuSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    barCategoryGap: '40%',
                                    stack: '4-123',
                                    z: 23,
                                    data: chartDatasHuaBeiYunshu.dataQuyuSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    barCategoryGap: '40%',
                                    stack: '4-123',
                                    z: 23,
                                    data: chartDatasHuaBeiCangchu.dataQuyuSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    barCategoryGap: '40%',
                                    stack: '4-123',
                                    z: 23,
                                    data: chartDatasHuaBeiJinrong.dataQuyuSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    barCategoryGap: '40%',
                                    stack: '4-123',
                                    z: 23,
                                    data: chartDatasHuaBeiMaoyi.dataQuyuSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    barCategoryGap: '40%',
                                    stack: '4-123',
                                    z: 23,
                                    data: chartDatasHuaBeiLiutong.dataQuyuSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华北大区-全',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    data: chartDatasHuaBei.dataQuyuPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华北大区-全',
                                    stack: '4-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 4,
                                    yAxisIndex: 4,
                                    data: chartDatasHuaBei.dataQuyuOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    barCategoryGap: '40%',
                                    stack: '5-123',
                                    z: 23,
                                    data: chartDatasHuaBei.dataSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    barCategoryGap: '40%',
                                    stack: '5-123',
                                    z: 23,
                                    data: chartDatasHuaBeiYunshu.dataSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    barCategoryGap: '40%',
                                    stack: '5-123',
                                    z: 23,
                                    data: chartDatasHuaBeiCangchu.dataSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    barCategoryGap: '40%',
                                    stack: '5-123',
                                    z: 23,
                                    data: chartDatasHuaBeiJinrong.dataSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    barCategoryGap: '40%',
                                    stack: '5-123',
                                    z: 23,
                                    data: chartDatasHuaBeiMaoyi.dataSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    barCategoryGap: '40%',
                                    stack: '5-123',
                                    z: 23,
                                    data: chartDatasHuaBeiLiutong.dataSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华北大区',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    data: chartDatasHuaBei.dataPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华北大区',
                                    stack: '5-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 5,
                                    yAxisIndex: 5,
                                    data: chartDatasHuaBei.dataOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    barCategoryGap: '40%',
                                    stack: '6-123',
                                    z: 23,
                                    data: chartDatasHuazhong.dataQuyuSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    barCategoryGap: '40%',
                                    stack: '6-123',
                                    z: 23,
                                    data: chartDatasHuazhongYunshu.dataQuyuSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    barCategoryGap: '40%',
                                    stack: '6-123',
                                    z: 23,
                                    data: chartDatasHuazhongCangchu.dataQuyuSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    barCategoryGap: '40%',
                                    stack: '6-123',
                                    z: 23,
                                    data: chartDatasHuazhongJinrong.dataQuyuSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    barCategoryGap: '40%',
                                    stack: '6-123',
                                    z: 23,
                                    data: chartDatasHuazhongMaoyi.dataQuyuSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    barCategoryGap: '40%',
                                    stack: '6-123',
                                    z: 23,
                                    data: chartDatasHuazhongLiutong.dataQuyuSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华中大区-全',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    data: chartDatasHuazhong.dataQuyuPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华中大区-全',
                                    stack: '6-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 6,
                                    yAxisIndex: 6,
                                    data: chartDatasHuazhong.dataQuyuOver
                                },
                                {
                                    name: '集合指标',
                                    type: 'bar',
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    barCategoryGap: '40%',
                                    stack: '7-123',
                                    z: 23,
                                    data: chartDatasHuazhong.dataSet
                                },
                                {
                                    name: '运输指标',
                                    type: 'bar',
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    barCategoryGap: '40%',
                                    stack: '7-123',
                                    z: 23,
                                    data: chartDatasHuazhongYunshu.dataSet
                                },
                                {
                                    name: '仓储指标',
                                    type: 'bar',
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    barCategoryGap: '40%',
                                    stack: '7-123',
                                    z: 23,
                                    data: chartDatasHuazhongCangchu.dataSet
                                },
                                {
                                    name: '金融指标',
                                    type: 'bar',
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    barCategoryGap: '40%',
                                    stack: '7-123',
                                    z: 23,
                                    data: chartDatasHuazhongJinrong.dataSet
                                },
                                {
                                    name: '贸易指标',
                                    type: 'bar',
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    barCategoryGap: '40%',
                                    stack: '7-123',
                                    z: 23,
                                    data: chartDatasHuazhongMaoyi.dataSet
                                },
                                {
                                    name: '流通加工指标',
                                    type: 'bar',
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    barCategoryGap: '40%',
                                    stack: '7-123',
                                    z: 23,
                                    data: chartDatasHuazhongLiutong.dataSet
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '目标业绩-华中大区',
                                    itemStyle: {
                                        normal: {
                                            color: 'rgba(255,255,255,1)',
                                            borderColor: '#c3c3c3'
                                        }
                                    },
                                    barGap: '-100%',
                                    barCategoryGap: '40%',
                                    z: 22,
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    data: chartDatasHuazhong.dataPlan
                                },
                                {
                                    // For shadow
                                    type: 'bar',
                                    name: '超出业绩-华中大区',
                                    stack: '7-123',
                                    itemStyle: {
                                        normal: {color: 'rgba(251, 128, 95, 1)'}
                                    },
                                    z: 24,
                                    xAxisIndex: 7,
                                    yAxisIndex: 7,
                                    data: chartDatasHuazhong.dataOver
                                }
                            ]
                        }
                    ];

                    // 绘制图表
                    this.myChart.setOption({
                        baseOption: {
                            timeline: {
                                axisType: 'category',
                                top: '90%',
                                autoPlay: false,
                                controlStyle: {
                                    show: false
                                },
                                checkpointStyle: {
                                    color: 'rgba(0, 0, 0, 0)',
                                    borderColor: 'rgba(0, 0, 0, 0)'
                                },
                                playInterval: 1000,
                                data: monthFromNow,
                                label: {
                                    formatter: function (s) {
                                        return (new Date(s)).getMonth() + 1;
                                    }
                                }
                            },
                            color: colors,
                            title: {
                                text: '业绩达成指标',
                                subtextStyle: {
                                    color: '#888'
                                },
                                textAlign: 'left',
                                x: 16,
                                y: 16
                            },
                            grid: [
                                {x: '15%', y: '11%', width: '5%', height: '27%'},
                                {x: '25%', y: '11%', width: '25%', height: '27%'},
                                {x2: '35%', y: '11%', width: '5%', height: '27%'},
                                {x2: '5%', y: '11%', width: '25%', height: '27%'},
                                {x: '15%', y2: '21%', width: '5%', height: '27%'},
                                {x: '25%', y2: '21%', width: '25%', height: '27%'},
                                {x2: '35%', y2: '21%', width: '5%', height: '27%'},
                                {x2: '5%', y2: '21%', width: '25%', height: '27%'}
                            ],
                            legend: {
                                data: chartDatasHuanan.legendData,
                                align: 'left',
                                z: 22,
                                orient: 'vertical',
                                top: '11%',
                                left: '16',
                                selectedMode: 'single'
                            },
                            toolbox: {
                                show: true,
                                feature: {
                                    saveAsImage: {show: true}
                                },
                                top: '16',
                                right: '16'
                            },
                            tooltip: {},
                            xAxis: [
                                {
                                    gridIndex: 0,
                                    type: 'category',
                                    data: ['华南大区']
                                },
                                {
                                    gridIndex: 1,
                                    type: 'category',
                                    data: chartDatasHuanan.dataText
                                },
                                {
                                    gridIndex: 2,
                                    type: 'category',
                                    data: ['华东大区']
                                },
                                {
                                    gridIndex: 3,
                                    type: 'category',
                                    data: chartDatasHuadong.dataText
                                },
                                {
                                    gridIndex: 4,
                                    type: 'category',
                                    data: ['华北大区']
                                },
                                {
                                    gridIndex: 5,
                                    type: 'category',
                                    data: chartDatasHuaBei.dataText
                                },
                                {
                                    gridIndex: 6,
                                    type: 'category',
                                    data: ['华中大区']
                                },
                                {
                                    gridIndex: 7,
                                    type: 'category',
                                    data: chartDatasHuazhong.dataText
                                }
                            ],
                            yAxis: [
                                {
                                    gridIndex: 0,
                                    show: false
                                },
                                {
                                    gridIndex: 1,
                                    type: 'value'
                                },
                                {
                                    gridIndex: 2,
                                    show: false
                                },
                                {
                                    gridIndex: 3,
                                    type: 'value'
                                },
                                {
                                    gridIndex: 4,
                                    show: false
                                },
                                {
                                    gridIndex: 5,
                                    type: 'value'
                                },
                                {
                                    gridIndex: 6,
                                    show: false
                                },
                                {
                                    gridIndex: 7,
                                    type: 'value'
                                }
                            ]
                        },
                        options: seriesOptions
                    });

                    // 图表事件
                    this.myChart.on('timelinechanged', (params) => {
                        this.myChart.showLoading();
                        this.$http({
                            method: 'post',
                            baseURL: getHomeProjectLink().acApiBaseUrl,
                            url: '/page/ac/transport/searchSettlePlan',
                            data: {
                                yearMonth: monthFromNow[params.currentIndex].split('-').join('')
                            }
                        }).then(res => {
                            this.myChart.hideLoading();
                            chartDatas = res.result;
                            chartDatasHuanan = getCountNum('集合指标', '华南大区');
                            chartDatasHuananYunshu = getCountNum('运输指标', '华南大区');
                            chartDatasHuananCangchu = getCountNum('仓储指标', '华南大区');
                            chartDatasHuananJinrong = getCountNum('金融指标', '华南大区');
                            chartDatasHuananMaoyi = getCountNum('贸易指标', '华南大区');
                            chartDatasHuananLiutong = getCountNum('流通加工指标', '华南大区');

                            chartDatasHuadong = getCountNum('集合指标', '华东大区');
                            chartDatasHuadongYunshu = getCountNum('运输指标', '华东大区');
                            chartDatasHuadongCangchu = getCountNum('仓储指标', '华东大区');
                            chartDatasHuadongJinrong = getCountNum('金融指标', '华东大区');
                            chartDatasHuadongMaoyi = getCountNum('贸易指标', '华东大区');
                            chartDatasHuadongLiutong = getCountNum('流通加工指标', '华东大区');

                            chartDatasHuaBei = getCountNum('集合指标', '华北大区');
                            chartDatasHuaBeiYunshu = getCountNum('运输指标', '华北大区');
                            chartDatasHuaBeiCangchu = getCountNum('仓储指标', '华北大区');
                            chartDatasHuaBeiJinrong = getCountNum('金融指标', '华北大区');
                            chartDatasHuaBeiMaoyi = getCountNum('贸易指标', '华北大区');
                            chartDatasHuaBeiLiutong = getCountNum('流通加工指标', '华北大区');

                            chartDatasHuazhong = getCountNum('集合指标', '华中大区');
                            chartDatasHuazhongYunshu = getCountNum('运输指标', '华中大区');
                            chartDatasHuazhongCangchu = getCountNum('仓储指标', '华中大区');
                            chartDatasHuazhongJinrong = getCountNum('金融指标', '华中大区');
                            chartDatasHuazhongMaoyi = getCountNum('贸易指标', '华中大区');
                            chartDatasHuazhongLiutong = getCountNum('流通加工指标', '华中大区');

                            this.myChart.clear();
                            // 绘制图表
                            this.myChart.setOption({
                                baseOption: {
                                    timeline: {
                                        axisType: 'category',
                                        top: '90%',
                                        autoPlay: false,
                                        playInterval: 1000,
                                        data: monthFromNow,
                                        controlStyle: {
                                            show: false
                                        },
                                        checkpointStyle: {
                                            color: 'rgba(0, 0, 0, 0)',
                                            borderColor: 'rgba(0, 0, 0, 0)'
                                        },
                                        label: {
                                            formatter: function (s) {
                                                return (new Date(s)).getMonth() + 1;
                                            }
                                        }
                                    },
                                    color: colors,
                                    title: {
                                        text: '业绩达成指标',
                                        subtextStyle: {
                                            color: '#888'
                                        },
                                        textAlign: 'left',
                                        x: 16,
                                        y: 16
                                    },
                                    grid: [
                                        {x: '15%', y: '11%', width: '5%', height: '27%'},
                                        {x: '25%', y: '11%', width: '25%', height: '27%'},
                                        {x2: '35%', y: '11%', width: '5%', height: '27%'},
                                        {x2: '5%', y: '11%', width: '25%', height: '27%'},
                                        {x: '15%', y2: '21%', width: '5%', height: '27%'},
                                        {x: '25%', y2: '21%', width: '25%', height: '27%'},
                                        {x2: '35%', y2: '21%', width: '5%', height: '27%'},
                                        {x2: '5%', y2: '21%', width: '25%', height: '27%'}
                                    ],
                                    legend: {
                                        data: chartDatasHuanan.legendData,
                                        align: 'left',
                                        z: 22,
                                        orient: 'vertical',
                                        top: '11%',
                                        left: '16',
                                        selectedMode: 'single'
                                    },
                                    toolbox: {
                                        show: true,
                                        feature: {
                                            saveAsImage: {show: true}
                                        },
                                        top: '16',
                                        right: '16'
                                    },
                                    tooltip: {},
                                    xAxis: [
                                        {
                                            gridIndex: 0,
                                            type: 'category',
                                            data: ['华南大区']
                                        },
                                        {
                                            gridIndex: 1,
                                            type: 'category',
                                            data: chartDatasHuanan.dataText
                                        },
                                        {
                                            gridIndex: 2,
                                            type: 'category',
                                            data: ['华东大区']
                                        },
                                        {
                                            gridIndex: 3,
                                            type: 'category',
                                            data: chartDatasHuadong.dataText
                                        },
                                        {
                                            gridIndex: 4,
                                            type: 'category',
                                            data: ['华北大区']
                                        },
                                        {
                                            gridIndex: 5,
                                            type: 'category',
                                            data: chartDatasHuaBei.dataText
                                        },
                                        {
                                            gridIndex: 6,
                                            type: 'category',
                                            data: ['华中大区']
                                        },
                                        {
                                            gridIndex: 7,
                                            type: 'category',
                                            data: chartDatasHuazhong.dataText
                                        }
                                    ],
                                    yAxis: [
                                        {
                                            gridIndex: 0,
                                            show: false
                                        },
                                        {
                                            gridIndex: 1,
                                            type: 'value'
                                        },
                                        {
                                            gridIndex: 2,
                                            show: false
                                        },
                                        {
                                            gridIndex: 3,
                                            type: 'value'
                                        },
                                        {
                                            gridIndex: 4,
                                            show: false
                                        },
                                        {
                                            gridIndex: 5,
                                            type: 'value'
                                        },
                                        {
                                            gridIndex: 6,
                                            show: false
                                        },
                                        {
                                            gridIndex: 7,
                                            type: 'value'
                                        }
                                    ]
                                },
                                options: [
                                    {
                                        series: [
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                barCategoryGap: '40%',
                                                stack: '0-123',
                                                z: 23,
                                                data: chartDatasHuanan.dataQuyuSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                barCategoryGap: '40%',
                                                stack: '0-123',
                                                z: 23,
                                                data: chartDatasHuananYunshu.dataQuyuSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                barCategoryGap: '40%',
                                                stack: '0-123',
                                                z: 23,
                                                data: chartDatasHuananCangchu.dataQuyuSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                barCategoryGap: '40%',
                                                stack: '0-123',
                                                z: 23,
                                                data: chartDatasHuananJinrong.dataQuyuSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                barCategoryGap: '40%',
                                                stack: '0-123',
                                                z: 23,
                                                data: chartDatasHuananMaoyi.dataQuyuSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                barCategoryGap: '40%',
                                                stack: '0-123',
                                                z: 23,
                                                data: chartDatasHuananLiutong.dataQuyuSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华南大区-全',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                data: chartDatasHuanan.dataQuyuPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华南大区-全',
                                                stack: '0-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 0,
                                                yAxisIndex: 0,
                                                data: chartDatasHuanan.dataQuyuOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                barCategoryGap: '40%',
                                                stack: '1-123',
                                                z: 23,
                                                data: chartDatasHuanan.dataSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                barCategoryGap: '40%',
                                                stack: '1-123',
                                                z: 23,
                                                data: chartDatasHuananYunshu.dataSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                barCategoryGap: '40%',
                                                stack: '1-123',
                                                z: 23,
                                                data: chartDatasHuananCangchu.dataSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                barCategoryGap: '40%',
                                                stack: '1-123',
                                                z: 23,
                                                data: chartDatasHuananJinrong.dataSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                barCategoryGap: '40%',
                                                stack: '1-123',
                                                z: 23,
                                                data: chartDatasHuananMaoyi.dataSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                barCategoryGap: '40%',
                                                stack: '1-123',
                                                z: 23,
                                                data: chartDatasHuananLiutong.dataSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华南大区',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                data: chartDatasHuanan.dataPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华南大区',
                                                stack: '1-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 1,
                                                yAxisIndex: 1,
                                                data: chartDatasHuanan.dataOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                barCategoryGap: '40%',
                                                stack: '2-123',
                                                z: 23,
                                                data: chartDatasHuadong.dataQuyuSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                barCategoryGap: '40%',
                                                stack: '2-123',
                                                z: 23,
                                                data: chartDatasHuadongYunshu.dataQuyuSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                barCategoryGap: '40%',
                                                stack: '2-123',
                                                z: 23,
                                                data: chartDatasHuadongCangchu.dataQuyuSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                barCategoryGap: '40%',
                                                stack: '2-123',
                                                z: 23,
                                                data: chartDatasHuadongJinrong.dataQuyuSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                barCategoryGap: '40%',
                                                stack: '2-123',
                                                z: 23,
                                                data: chartDatasHuadongMaoyi.dataQuyuSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                barCategoryGap: '40%',
                                                stack: '2-123',
                                                z: 23,
                                                data: chartDatasHuadongLiutong.dataQuyuSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华东大区-全',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                data: chartDatasHuadong.dataQuyuPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华东大区-全',
                                                stack: '2-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 2,
                                                yAxisIndex: 2,
                                                data: chartDatasHuadong.dataQuyuOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                barCategoryGap: '40%',
                                                stack: '3-123',
                                                z: 23,
                                                data: chartDatasHuadong.dataSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                barCategoryGap: '40%',
                                                stack: '3-123',
                                                z: 23,
                                                data: chartDatasHuadongYunshu.dataSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                barCategoryGap: '40%',
                                                stack: '3-123',
                                                z: 23,
                                                data: chartDatasHuadongCangchu.dataSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                barCategoryGap: '40%',
                                                stack: '3-123',
                                                z: 23,
                                                data: chartDatasHuadongJinrong.dataSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                barCategoryGap: '40%',
                                                stack: '3-123',
                                                z: 23,
                                                data: chartDatasHuadongMaoyi.dataSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                barCategoryGap: '40%',
                                                stack: '3-123',
                                                z: 23,
                                                data: chartDatasHuadongLiutong.dataSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华东大区',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                data: chartDatasHuadong.dataPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华东大区',
                                                stack: '3-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 3,
                                                yAxisIndex: 3,
                                                data: chartDatasHuadong.dataOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                barCategoryGap: '40%',
                                                stack: '4-123',
                                                z: 23,
                                                data: chartDatasHuaBei.dataQuyuSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                barCategoryGap: '40%',
                                                stack: '4-123',
                                                z: 23,
                                                data: chartDatasHuaBeiYunshu.dataQuyuSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                barCategoryGap: '40%',
                                                stack: '4-123',
                                                z: 23,
                                                data: chartDatasHuaBeiCangchu.dataQuyuSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                barCategoryGap: '40%',
                                                stack: '4-123',
                                                z: 23,
                                                data: chartDatasHuaBeiJinrong.dataQuyuSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                barCategoryGap: '40%',
                                                stack: '4-123',
                                                z: 23,
                                                data: chartDatasHuaBeiMaoyi.dataQuyuSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                barCategoryGap: '40%',
                                                stack: '4-123',
                                                z: 23,
                                                data: chartDatasHuaBeiLiutong.dataQuyuSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华北大区-全',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                data: chartDatasHuaBei.dataQuyuPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华北大区-全',
                                                stack: '4-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 4,
                                                yAxisIndex: 4,
                                                data: chartDatasHuaBei.dataQuyuOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                barCategoryGap: '40%',
                                                stack: '5-123',
                                                z: 23,
                                                data: chartDatasHuaBei.dataSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                barCategoryGap: '40%',
                                                stack: '5-123',
                                                z: 23,
                                                data: chartDatasHuaBeiYunshu.dataSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                barCategoryGap: '40%',
                                                stack: '5-123',
                                                z: 23,
                                                data: chartDatasHuaBeiCangchu.dataSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                barCategoryGap: '40%',
                                                stack: '5-123',
                                                z: 23,
                                                data: chartDatasHuaBeiJinrong.dataSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                barCategoryGap: '40%',
                                                stack: '5-123',
                                                z: 23,
                                                data: chartDatasHuaBeiMaoyi.dataSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                barCategoryGap: '40%',
                                                stack: '5-123',
                                                z: 23,
                                                data: chartDatasHuaBeiLiutong.dataSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华北大区',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                data: chartDatasHuaBei.dataPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华北大区',
                                                stack: '5-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 5,
                                                yAxisIndex: 5,
                                                data: chartDatasHuaBei.dataOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                barCategoryGap: '40%',
                                                stack: '6-123',
                                                z: 23,
                                                data: chartDatasHuazhong.dataQuyuSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                barCategoryGap: '40%',
                                                stack: '6-123',
                                                z: 23,
                                                data: chartDatasHuazhongYunshu.dataQuyuSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                barCategoryGap: '40%',
                                                stack: '6-123',
                                                z: 23,
                                                data: chartDatasHuazhongCangchu.dataQuyuSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                barCategoryGap: '40%',
                                                stack: '6-123',
                                                z: 23,
                                                data: chartDatasHuazhongJinrong.dataQuyuSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                barCategoryGap: '40%',
                                                stack: '6-123',
                                                z: 23,
                                                data: chartDatasHuazhongMaoyi.dataQuyuSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                barCategoryGap: '40%',
                                                stack: '6-123',
                                                z: 23,
                                                data: chartDatasHuazhongLiutong.dataQuyuSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华中大区-全',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                data: chartDatasHuazhong.dataQuyuPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华中大区-全',
                                                stack: '6-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 6,
                                                yAxisIndex: 6,
                                                data: chartDatasHuazhong.dataQuyuOver
                                            },
                                            {
                                                name: '集合指标',
                                                type: 'bar',
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                barCategoryGap: '40%',
                                                stack: '7-123',
                                                z: 23,
                                                data: chartDatasHuazhong.dataSet
                                            },
                                            {
                                                name: '运输指标',
                                                type: 'bar',
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                barCategoryGap: '40%',
                                                stack: '7-123',
                                                z: 23,
                                                data: chartDatasHuazhongYunshu.dataSet
                                            },
                                            {
                                                name: '仓储指标',
                                                type: 'bar',
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                barCategoryGap: '40%',
                                                stack: '7-123',
                                                z: 23,
                                                data: chartDatasHuazhongCangchu.dataSet
                                            },
                                            {
                                                name: '金融指标',
                                                type: 'bar',
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                barCategoryGap: '40%',
                                                stack: '7-123',
                                                z: 23,
                                                data: chartDatasHuazhongJinrong.dataSet
                                            },
                                            {
                                                name: '贸易指标',
                                                type: 'bar',
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                barCategoryGap: '40%',
                                                stack: '7-123',
                                                z: 23,
                                                data: chartDatasHuazhongMaoyi.dataSet
                                            },
                                            {
                                                name: '流通加工指标',
                                                type: 'bar',
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                barCategoryGap: '40%',
                                                stack: '7-123',
                                                z: 23,
                                                data: chartDatasHuazhongLiutong.dataSet
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '目标业绩-华中大区',
                                                itemStyle: {
                                                    normal: {
                                                        color: 'rgba(255,255,255,1)',
                                                        borderColor: '#c3c3c3'
                                                    }
                                                },
                                                barGap: '-100%',
                                                barCategoryGap: '40%',
                                                z: 22,
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                data: chartDatasHuazhong.dataPlan
                                            },
                                            {
                                                // For shadow
                                                type: 'bar',
                                                name: '超出业绩-华中大区',
                                                stack: '7-123',
                                                itemStyle: {
                                                    normal: {color: 'rgba(251, 128, 95, 1)'}
                                                },
                                                z: 24,
                                                xAxisIndex: 7,
                                                yAxisIndex: 7,
                                                data: chartDatasHuazhong.dataOver
                                            }
                                        ]
                                    }
                                ]
                            });
                        }).catch(error => {
                            console.log(error);
                        });
                    });
                    // 图表事件
                    this.myChart.on('legendselectchanged', (params) => {
                        console.log(params);
                        if (params.name === '运输指标') {
                            this.myChart.setOption({options: [{
                                series: [
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区-全',
                                        data: chartDatasHuananYunshu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区-全',
                                        data: chartDatasHuananYunshu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区',
                                        data: chartDatasHuananYunshu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区',
                                        data: chartDatasHuananYunshu.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区-全',
                                        data: chartDatasHuadongYunshu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区-全',
                                        data: chartDatasHuadongYunshu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区',
                                        data: chartDatasHuadongYunshu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区',
                                        data: chartDatasHuadongYunshu.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区-全',
                                        data: chartDatasHuaBeiYunshu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区-全',
                                        data: chartDatasHuaBeiYunshu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区',
                                        data: chartDatasHuaBeiYunshu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区',
                                        data: chartDatasHuaBeiYunshu.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区-全',
                                        data: chartDatasHuazhongYunshu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区-全',
                                        data: chartDatasHuazhongYunshu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区',
                                        data: chartDatasHuazhongYunshu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区',
                                        data: chartDatasHuazhongYunshu.dataOver
                                    }
                                ]
                            }]});
                        } else if (params.name === '集合指标') {
                            this.myChart.setOption({options: [{
                                series: [
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区-全',
                                        data: chartDatasHuanan.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区-全',
                                        data: chartDatasHuanan.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区',
                                        data: chartDatasHuanan.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区',
                                        data: chartDatasHuanan.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区-全',
                                        data: chartDatasHuadong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区-全',
                                        data: chartDatasHuadong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区',
                                        data: chartDatasHuadong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区',
                                        data: chartDatasHuadong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区-全',
                                        data: chartDatasHuaBei.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区-全',
                                        data: chartDatasHuaBei.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区',
                                        data: chartDatasHuaBei.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区',
                                        data: chartDatasHuaBei.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区-全',
                                        data: chartDatasHuazhong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区-全',
                                        data: chartDatasHuazhong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区',
                                        data: chartDatasHuazhong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区',
                                        data: chartDatasHuazhong.dataOver
                                    }
                                ]
                            }]});
                        } else if (params.name === '仓储指标') {
                            this.myChart.setOption({options: [{
                                series: [
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区-全',
                                        data: chartDatasHuananCangchu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区-全',
                                        data: chartDatasHuananCangchu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区',
                                        data: chartDatasHuananCangchu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区',
                                        data: chartDatasHuananCangchu.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区-全',
                                        data: chartDatasHuadongCangchu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区-全',
                                        data: chartDatasHuadongCangchu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区',
                                        data: chartDatasHuadongCangchu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区',
                                        data: chartDatasHuadongCangchu.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区-全',
                                        data: chartDatasHuaBeiCangchu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区-全',
                                        data: chartDatasHuaBeiCangchu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区',
                                        data: chartDatasHuaBeiCangchu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区',
                                        data: chartDatasHuaBeiCangchu.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区-全',
                                        data: chartDatasHuazhongCangchu.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区-全',
                                        data: chartDatasHuazhongCangchu.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区',
                                        data: chartDatasHuazhongCangchu.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区',
                                        data: chartDatasHuazhongCangchu.dataOver
                                    }
                                ]
                            }]});
                        } else if (params.name === '金融指标') {
                            this.myChart.setOption({options: [{
                                series: [
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区-全',
                                        data: chartDatasHuananJinrong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区-全',
                                        data: chartDatasHuananJinrong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区',
                                        data: chartDatasHuananJinrong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区',
                                        data: chartDatasHuananJinrong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区-全',
                                        data: chartDatasHuadongJinrong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区-全',
                                        data: chartDatasHuadongJinrong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区',
                                        data: chartDatasHuadongJinrong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区',
                                        data: chartDatasHuadongJinrong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区-全',
                                        data: chartDatasHuaBeiJinrong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区-全',
                                        data: chartDatasHuaBeiJinrong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区',
                                        data: chartDatasHuaBeiJinrong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区',
                                        data: chartDatasHuaBeiJinrong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区-全',
                                        data: chartDatasHuazhongJinrong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区-全',
                                        data: chartDatasHuazhongJinrong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区',
                                        data: chartDatasHuazhongJinrong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区',
                                        data: chartDatasHuazhongJinrong.dataOver
                                    }
                                ]
                            }]});
                        } else if (params.name === '贸易指标') {
                            this.myChart.setOption({options: [{
                                series: [
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区-全',
                                        data: chartDatasHuananMaoyi.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区-全',
                                        data: chartDatasHuananMaoyi.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区',
                                        data: chartDatasHuananMaoyi.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区',
                                        data: chartDatasHuananMaoyi.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区-全',
                                        data: chartDatasHuadongMaoyi.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区-全',
                                        data: chartDatasHuadongMaoyi.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区',
                                        data: chartDatasHuadongMaoyi.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区',
                                        data: chartDatasHuadongMaoyi.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区-全',
                                        data: chartDatasHuaBeiMaoyi.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区-全',
                                        data: chartDatasHuaBeiMaoyi.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区',
                                        data: chartDatasHuaBeiMaoyi.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区',
                                        data: chartDatasHuaBeiMaoyi.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区-全',
                                        data: chartDatasHuazhongMaoyi.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区-全',
                                        data: chartDatasHuazhongMaoyi.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区',
                                        data: chartDatasHuazhongMaoyi.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区',
                                        data: chartDatasHuazhongMaoyi.dataOver
                                    }
                                ]
                            }]});
                        } else if (params.name === '流通加工指标') {
                            this.myChart.setOption({options: [{
                                series: [
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区-全',
                                        data: chartDatasHuananLiutong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区-全',
                                        data: chartDatasHuananLiutong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华南大区',
                                        data: chartDatasHuananLiutong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华南大区',
                                        data: chartDatasHuananLiutong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区-全',
                                        data: chartDatasHuadongLiutong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区-全',
                                        data: chartDatasHuadongLiutong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华东大区',
                                        data: chartDatasHuadongLiutong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华东大区',
                                        data: chartDatasHuadongLiutong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区-全',
                                        data: chartDatasHuaBeiLiutong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区-全',
                                        data: chartDatasHuaBeiLiutong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华北大区',
                                        data: chartDatasHuaBeiLiutong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华北大区',
                                        data: chartDatasHuaBeiLiutong.dataOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区-全',
                                        data: chartDatasHuazhongLiutong.dataQuyuPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区-全',
                                        data: chartDatasHuazhongLiutong.dataQuyuOver
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '目标业绩-华中大区',
                                        data: chartDatasHuazhongLiutong.dataPlan
                                    },
                                    {
                                        // 根据名字对应到相应的系列
                                        name: '超出业绩-华中大区',
                                        data: chartDatasHuazhongLiutong.dataOver
                                    }
                                ]
                            }]});
                        }
                    });
                }).catch(error => {
                    console.log(error);
                });
            });
        },
        methods: {
            monthFromNow() {
                var d = new Date();
                d.setMonth(d.getMonth() + 1);
                var result = [];
                for (var i = 0; i < 6; i++) {
                    d.setMonth(d.getMonth() - 1);
                    var m = d.getMonth() + 1;
                    console.log(d.getMonth() + 1);
                    m = m < 10 ? '0' + m : m;
                    result.unshift(d.getFullYear() + '-' + m);
                }
                return result;
            }
        },
        destroyed() {
            if (this.myChart) {
                this.myChart.dispose(this.myChartELement);
            }
        }
    };
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
