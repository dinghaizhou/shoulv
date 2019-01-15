<template>
    <div class="active-user">
        <div>
            <div class="title_1">活跃用户数据</div>
            <div style="width:100%;height:300px;" id="activeUser" v-show="tableShow"></div>
            <div v-show="!tableShow" style="width:100%;height:300px;line-height:300px;text-align:center;"> 暂无数据</div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'active-user',
        props: {
            insightData: {
                default: function() {
                    return {}
                }
            }
        },

        data: () => {
            return {
                tableShow: true
            }
        },
        watch: {
            insightData: function() {
                if(this.insightData && this.insightData.everyDay.length > 0) {
                    this.tableShow = true
                    this.drawTable()
                } else {
                    this.tableShow = false
                }
            }
        },
        mounted() {
            this.myChart = this.$echarts.init(document.getElementById('activeUser'))
        },
        methods: {
            drawTable() {
                this.myChart = this.$echarts.init(document.getElementById('activeUser'))
                var Totaldata =  this.insightData.everyDay
                var xData = this.insightData.everyDay.map((item) => {
                    return item.time
                })
                var data = this.insightData.everyDay.map((item) => {
                    return item.total
                })
                let option = {
                    xAxis: {
                        // type: 'category',
                        // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                        data: xData,
                        axisLabel: {
                            interval: 4,
                            showMaxLabel: true,
                            showMinLabel: true,
                            color: '#595a5b'
                        },
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#dfdfdf'
                            }
                        }
                        
                    },
                    grid: {
                        left: '0%',
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        // min: function(value) {
                        //     return Math.floor((value.min)/1000000)*1000000 - 1000000;
                        // },
                        // min: '500000',
                        // splitNumber: 2,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#dfdfdf'
                            }
                        },
                        axisLabel: {
                            show: true,
                            color: '#595a5b'
                        }

                    },
                    tooltip: {
                        // trigger: 'axis',
                        show: true,
                        formatter: '{b}: {c}人'
                    },
                    dataZoom: [{
                        type: 'inside',
                        startValue: '2018.06-01'
                    }],
                    series: [{
                        data,
                        type: 'line',
                        symbol: 'circle',
                        symbolSize: 8,

                        // showSymbol: false,
                        hoverAnimation: false,
                        itemStyle: {
                            color: '#0486fe',
                            borderWidth: 1.5
                        },
                        label: {
                            show: false
                        },
                    }]
                };
                this.myChart.setOption(option)
            }
        }
    }
</script>
<style lang="scss">
    .active-user {
        
    }
</style>
