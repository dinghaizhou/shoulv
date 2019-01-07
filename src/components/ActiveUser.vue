<template>
    <div class="active-user">
        <div>
            <div class="title_1">活跃用户数据</div>
            <div style="width:100%;height:300px;" id="activeUserLine" text></div>
        </div>
        
        <div style="width:100%;display:flex;">
            <div class="flex-a" style="width:44%;border-right: 1px solid #eee">
                <annular-percent name="PC" percent="25%" color="#5490d6"></annular-percent>
                <annular-percent name="Moblie" percent="75%" color="#e07d70"></annular-percent>
                <annular-percent name="Wechat" percent="15%" color="#5cc8a6"></annular-percent>
            </div>
            <div class="flex-a" style="width: 28%;border-right: 1px solid #eee">
                <annular-percent name="Male" percent="34%" color="#906f65"></annular-percent>
                <annular-percent name="Female" percent="35%" color="#dc6993"></annular-percent>
            </div>
            <div class="flex-a" style="width: 28%;">
                <annular-percent name="Online" percent="26%" color="#61c2b9"></annular-percent>
                <annular-percent name="Outline" percent="55%" color="#a998c9"></annular-percent>
            </div>

        </div>
    </div>
</template>
<script>
    import AnnularPercent from '@/components/AnnularPercent'

    export default {
        name: 'active-user',
        components: {AnnularPercent},

        data: () => {
            return {
            }
        },
        methods: {
            
        },
        mounted() {
            this.myChart = this.$echarts.init(document.getElementById('activeUserLine'))
            this.drawTable()
        },
        methods: {
            drawTable() {
                var xData = []
                var data = []
                for (var i = 1; i <= 30; i ++) {
                    xData.push('2018-12-' + i)
                    data.push(1000000 + Math.random()*9000000)
                }

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
                        min: function(value) {
                            return Math.floor((value.min)/1000000)*1000000 - 1000000;
                        },
                        // min: '500000',
                        splitNumber: 2,
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
                this.myChart.setOption(option)
            }
        }
    }
</script>
<style lang="scss">
    .active-user {
        
    }
</style>
