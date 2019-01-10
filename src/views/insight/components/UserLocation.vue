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
        props: {
            insightData: {
                default: function() {
                    return {
                        
                    }
                }
            }
        },
        data: () => {
            return {
            }
        },
        methods: {
            
        },
        watch: {
            insightData: function() {
                this.drawTable()
            }
        },
        mounted() {
            this.myChart = this.$echarts.init(document.getElementById('userLocationMap'))
            this.screenWidth = document.body.offsetWidth
        },
        methods: {
            drawTable() {
                var data = this.insightData.province.map((item) => {
                    return {
                        name: item.province,
                        value: item.percent
                    }
                })
                let orient,right,left;
                if(this.screenWidth <= 1440) {
                    orient = 'horizontal'
                    right = '0%'
                    left = '0%'
                } else if (this.screenWidth <= 1680) {
                    orient = 'horizontal'
                    right = '15%'
                    left = '0%'
                } else if(this.screenWidth <= 1920) {
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
                            data,
                            nameMap: {
                                 '北京': '北京市',
                                 '天津': '天津市',
                                 '上海': '上海市',
                                 '重庆': '重庆市',
                                 '河北': '河北省',
                                 '河南': '河南省',
                                 '云南': '云南省',
                                 '辽宁': '辽宁省',
                                 '黑龙江': '黑龙江省',
                                 '湖南': '湖南省',
                                 '安徽': '安徽省',
                                 '山东': '山东省',
                                 '新疆': '新疆维吾尔自治区',
                                 '江苏': '江苏省',
                                 '浙江': '浙江省',
                                 '江西': '江西省',
                                 '湖北': '湖北省',
                                 '广西': '广西壮族自治区',
                                 '甘肃': '甘肃省',
                                 '山西': '山西省',
                                 '内蒙古': '内蒙古自治区',
                                 '陕西': '陕西省',
                                 '吉林': '吉林省',
                                 '福建': '福建省',
                                 '贵州': '贵州省',
                                 '广东': '广东省',
                                 '青海': '青海省',
                                 '西藏': '西藏自治区',
                                 '四川': '四川省',
                                 '宁夏': '宁夏回族自治区',
                                 '海南': '海南省',
                                 '台湾': '台湾省',
                                 '香港': '香港',
                                 '澳门': '澳门'
                            }
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
