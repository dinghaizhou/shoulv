<template>
    <div class="user-location">
        <div class="title_1">用户分布</div>
        <div style="width:100%;height:290px;" id="userLocationMap" text></div>
    </div>
</template>
<script>
    
    import '../../../../node_modules/echarts/map/js/china.js'

    export default {
        name: 'user-location',
        components: {},
        data: () => {
            return {
            }
        },
        methods: {
            
        },
        mounted() {
            this.myChart = this.$echarts.init(document.getElementById('userLocationMap'))
            // this.screenWidth = window.screen.width 
            this.screenWidth = document.body.offsetWidth
            console.log(this.screenWidth)
            this.drawTable()
        },
        methods: {
            drawTable() {
                let orient,right,left;
                if(this.screenWidth <= 1440) {
                    console.log(1)
                    orient = 'horizontal'
                    right = '0%'
                    left = '0%'
                } else if (this.screenWidth <= 1680) {
                    console.log(2)
                    orient = 'horizontal'
                    right = '15%'
                    left = '0%'
                } else if(this.screenWidth <= 1920) {
                    console.log(3)
                    orient = 'vertical'
                    right = '10%'
                    left = '10%'
                } else {
                    orient = 'vertical'
                    right = '25%'
                    left = '25%'
                }

                var option = {
                    tooltip: {
                        // position: ['80%', '50%'],
                        formatter: (params) => {
                            console.log(params)
                            return  '省份：   ' + params.name + '</br>' +
                                    '人数：   ' + params.data.people + '</br>' + 
                                    '占比：   ' + params.data.value + '%'
                        }
                    },
                    
                    visualMap: {
                        min: 0,
                        max: 100,
                        left: 'right',
                        top: 'bottom',
                        text:['100%','0%'],           // 文本，默认为数值文本
                        calculable : false,
                        orient,
                        itemWidth: '',
                        itemHeight: '100',
                        inRange: {
                            color: [ '#e6f7ff','#bae7ff','#91d5ff','#69c0ff','#40a9ff','#096dd9','#0050b3','#003a8c','#003a8c'],
                            symbolSize: [100, 100]
                        },
                        formatter: function (value) {

                            return value.toFixed() + '%'; // 范围标签显示内容。
                        }
                        // align: "left"
                        // textGap: 20
                    },
                    
                    series : [
                        {
                            type:'map',
                            map: 'china',
                            left,
                            top: '0',
                            right,
                            showLegendSymbol: true,
                            label: {
                                show: false
                            },
                            itemStyle: {
                            },
                            emphasis: {
                                label: {
                                    show: false
                                },
                                itemStyle: {
                                }
                            },
                            data:[
                                {name: '北京',value: Math.round(Math.random()*100),people: '33333'},
                                {name: '天津',value: Math.round(Math.random()*100),people: '31233'},
                                {name: '上海',value: Math.round(Math.random()*100),people: '33323'},
                                {name: '重庆',value: Math.round(Math.random()*100),people: '434333'},
                                {name: '河北',value: Math.round(Math.random()*100),people: '323433'},
                                {name: '河南',value: Math.round(Math.random()*100)},
                                {name: '云南',value: Math.round(Math.random()*100)},
                                {name: '辽宁',value: Math.round(Math.random()*100)},
                                {name: '黑龙江',value: Math.round(Math.random()*100)},
                                {name: '湖南',value: Math.round(Math.random()*100)},
                                {name: '安徽',value: Math.round(Math.random()*100)},
                                {name: '山东',value: Math.round(Math.random()*100)},
                                {name: '新疆',value: Math.round(Math.random()*100)},
                                {name: '江苏',value: Math.round(Math.random()*100)},
                                {name: '浙江',value: Math.round(Math.random()*100)},
                                {name: '江西',value: Math.round(Math.random()*100)},
                                {name: '湖北',value: Math.round(Math.random()*100)},
                                {name: '广西',value: Math.round(Math.random()*100)},
                                {name: '甘肃',value: Math.round(Math.random()*100)},
                                {name: '山西',value: Math.round(Math.random()*100)},
                                {name: '内蒙古',value: Math.round(Math.random()*100)},
                                {name: '陕西',value: Math.round(Math.random()*100)},
                                {name: '吉林',value: Math.round(Math.random()*100)},
                                {name: '福建',value: Math.round(Math.random()*100)},
                                {name: '贵州',value: Math.round(Math.random()*100)},
                                {name: '广东',value: Math.round(Math.random()*100)},
                                {name: '青海',value: Math.round(Math.random()*100)},
                                {name: '西藏',value: Math.round(Math.random()*100)},
                                {name: '四川',value: Math.round(Math.random()*100)},
                                {name: '宁夏',value: Math.round(Math.random()*100)},
                                {name: '海南',value: Math.round(Math.random()*100)},
                                {name: '台湾',value: Math.round(Math.random()*100)},
                                {name: '香港',value: Math.round(Math.random()*100)},
                                {name: '澳门',value: Math.round(Math.random()*100)}
                            ]
                        },
                    ]
                }
                var that = this
                this.myChart.setOption(option)
            }
        }
    }
</script>
<style lang="scss">
    .user-location {
        
    }
</style>
