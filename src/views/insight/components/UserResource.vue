<template>
    <div class="user-resource">
        <div class="title_1">用户来源排行</div>
        <div style="width:100%;height:290px;" id="userResourceBar" text></div>
    </div>
</template>
<script>
    

    export default {
        name: 'user-resource',
        components: {},
        data: () => {
            return {
            }
        },
        methods: {
            
        },
        mounted() {
            this.myChart = this.$echarts.init(document.getElementById('userResourceBar'))
            this.containerWidth = document.getElementById('userResourceBar').offsetWidth
            this.drawTable()
        },
        methods: {
            drawTable() {

                var option = {
                    // tooltip : {
                    //     trigger: 'axis',
                    //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    //     }
                    // },
                    grid: {
                        top: 20,
                        bottom: -10,
                        left: 70,
                        bottom: 0
                    },
                    xAxis: {
                        type : 'value',
                        // position: 'top',
                        splitLine: {show: false},
                        axisLine: {show: false}, 
                        axisTick: {show: false},
                        axisLabel: {show: false},
                    },
                    yAxis: {
                        type : 'category',
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#dfdfdf'
                            }
                        }, 
                        axisLabel: {
                            show: true,
                            color: '#595a5b'

                        },
                        axisTick: {show: true},
                        axisTick: {
                            alignWithLabel: true
                        },
                        // splitLine: {show: false},
                        data : [ '未分类', '微信盆友圈', '微信公众号', '微信微博', '线下']
                    },
                    series : [
                        {
                            type:'bar',
                            stack: '总量',
                            barWidth: '50%',
                            label: {
                                show: true,
                                position: [this.containerWidth - 100, '25%'],
                                color: '#595a5b'

                            },
                            data:[
                                0.2, 
                                0.44,
                                0.08,
                                0.47,
                                0.18
                            ],
                            itemStyle: {
                                color: '#0486fe'
                            }
                        }
                    ]

                }
                
                this.myChart.setOption(option)
            }
        }
    }
</script>
<style lang="scss">
    .user-resource {
        
    }
</style>
