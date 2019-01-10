<template>
    <div class="active-user">
        <div>
            <div class="title_1">活跃用户数据</div>
            <div style="width:100%;height:300px;" id="activeUser" v-show="tableShow"></div>
            <div v-show="!tableShow" style="width:100%;height:300px;line-height:300px;text-align:center;"> 暂无数据</div>
        </div>
        
        <div style="width:100%;display:flex;">
            <div class="flex-a" style="width:60%;border-right: 1px solid #eee">
                <annular-percent name="PC_" type="PC" :percent="insightData.type[0].PC" color="#5490d6"></annular-percent>
                <annular-percent name="Moblie_" type="Moblie" :percent="insightData.type[0].Mobile" color="#e07d70"></annular-percent>
                <annular-percent name="WeChat_" type="WeChat" :percent="insightData.type[0].WeChat" color="#5cc8a6"></annular-percent>
            </div>
            <div class="flex-a" style="width: 40%;border-right: 1px solid #eee">
                <annular-percent name="Male_" type="Male" :percent="insightData.type[0].boy" color="#906f65"></annular-percent>
                <annular-percent name="Female_" type="Female" :percent="insightData.type[0].girl" color="#dc6993"></annular-percent>
            </div>
            <!-- <div class="flex-a" style="width: 28;">
                <annular-percent name="Online" :percent="insightData.Online" color="#61c2b9"></annular-percent>
                <annular-percent name="Outline" :percent="insightData.Outline" color="#a998c9"></annular-percent>
            </div> -->

        </div>
    </div>
</template>
<script>
    import AnnularPercent from '@/components/AnnularPercent'
    export default {
        name: 'active-user',
        components: {AnnularPercent},
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
                console.log(this.insightData.type[0].PC)
                console.log(this.insightData)
                if(this.insightData.everyDay.length > 0) {
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
                            interval: 15,
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

                    },
                    dataZoom: [{
                        type: 'inside',
                        startValue: '2018.06-01'
                    }],
                    series: [{
                        data,
                        type: 'line',
                        symbol: 'circle',
                        // showSymbol: false,
                        // hoverAnimation: false,
                        itemStyle: {
                            color: '#0486fe',
                            borderWidth: 1.5
                        },
                        label: {
                            show: false
                        },
                    }]
                };
                console.log(this.myChart)
                this.myChart.setOption(option)
            }
        }
    }
</script>
<style lang="scss">
    .active-user {
        
    }
</style>
