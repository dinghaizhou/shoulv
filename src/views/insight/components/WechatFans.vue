<template>
    <div class="wechat-fans">
        <div class="title_1">微信公众号粉丝变化趋势</div>
        <div class="total_fans">当前公众号粉丝：<span>123,123,123</span>  人</div>
        <div style="width:100%;height:270px;" id="wechatFansLine" text></div>
    </div>
</template>
<script>
    

    export default {
        name: 'wechat-fans',
        components: {},
        data: () => {
            return {
            }
        },
        methods: {
            
        },
        mounted() {
            this.myChart = this.$echarts.init(document.getElementById('wechatFansLine'))
            this.drawTable()
        },
        methods: {
            drawTable() {
                var xData = []
                var data1 = []
                var data2 = []
                for (var i = 0; i <= 30; i ++) {
                    xData.push('2018.12.' + i)
                    data1.push(10000 + Math.random()*90000)
                    data2.push(10000 + Math.random()*90000)
                }

                var option = {
                    // tooltip : {
                    //     trigger: 'axis',
                    //     axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    //         type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    //     }
                    // },
                        // 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none''

                    legend: {
                        type: 'scroll',
                        right: 0,
                        top: 20,
                        data:[
                        '新关注用户',
                        '取消关注用户'],
                        formatter: function (name) {
                            return name;
                        },
                        icon: 'roundRect',
                        itemWidth: 20,  // 设置宽度
                        itemHeight: 3, // 设置高度
                    },
                    grid: {
                        left: 60,
                        right: 0,
                        bottom: 30
                    },
                    xAxis: {
                        type : 'category',
                        data : xData,
                        axisTick: {
                            alignWithLabel: true
                        },
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
                    yAxis: {
                        type : 'value',
                        splitLine: {
                            lineStyle: {
                                type: 'dashed'
                            }
                        },
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
                        // splitLine: {show: false},
                        
                    },
                    series : [
                        {
                            name:'新关注用户',
                            type:'line',
                            barWidth: '50%',
                            data: data1,
                            itemStyle: {
                                color: '#48ba9b'
                            }
                        },
                        {
                            name:'取消关注用户',
                            type:'line',
                            barWidth: '50%',
                            data: data2,
                            itemStyle: {
                                color: '#f56c6c'
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
    .wechat-fans {
        .total_fans {
            color: #5c5f63;
            margin-top:10px;
            line-height: 16px;
            font-size: 12px;
            span {
                color:#0486fe;
                font-weight: bolder;
            }
        }
    }
</style>
