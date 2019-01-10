<template>
    <div class="annular-percent">
        <div style="width:120px;height:130px;" :id="name" text></div>
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
        name: 'annular-percent',
        props: ['name', 'color', 'percent', 'type'],
        components: {},
        data: () => {
            return {

            }
        },
        watch: {
            'percent'() {
                this.drawPercent()
            }
        },

        mounted() {
            this.myChart = this.$echarts.init(document.getElementById(this.name))
        },
        methods: {
            drawPercent() {
                var percent = this.percent ? this.percent : 0
                var data = [
                                {value: percent, name:'已经', itemStyle:{color: this.color}},
                                {value: 100 - percent, name:'没有', 
                                    itemStyle:{color: '#f6f5f5'}, 
                                    emphasis: {itemStyle:{color: '#f6f5f5'}}
                                },
                            ]
                var a=0;
                for(var i=0; i<data.length; i++){
                    a+=data[i].value;
                }
                data.push({value:a/3, name:'__other', itemStyle:{color:'rgba(0,0,0,0)'}});
                this.myChart.setOption({
                    title: { text: '' },
                    graphic: {
                        elements: [{
                            type: 'image',
                            style: {
                                image: require('@/assets/images/icon/' + this.type + '@2x.png'),
                                width: 30,
                                height: 30
                                },
                            left: 'center',
                            top: '40'
                            },
                            {
                            type: 'text',
                            left: 'center', // 相对父元素居中
                            top: '110',  // 相对父元素上下的位置
                            style: {
                                text: this.name + '  ' + percent,
                                font: 'bolder 16px "Microsoft YaHei"',
                                fill: this.color
                                }
                            }]
                        },
                    series: [
                        {
                            name:'占比',
                            type:'pie',
                            radius : [42, 48],
                            center: ['50%', '50%'],
                            startAngle: 225,

                            hoverAnimation: false,
                            // hoverOffset: 50,

                            selectedMode: 'single',
                            // clockwise: false,
                            // roseType: true,
                            data:data,
                            label: {
                                show: false,
                                // position: 'inside'
                                formatter: (params) =>  {
                                    params.name 
                                }
                            },
                            labelLine: {
                                show: false,
                                length: 50,
                                length2: 50,
                                // smooth: 0.2
                                // normal: {
                                //     lineStyle: {
                                //         color: 'rgba(255, 255, 255, 0.3)'
                                //     },
                                //     smooth: 0.2,
                                //     length: 10,
                                //     length2: 20
                                // }
                            },
                            itemStyle: {
                                
                            },
                        
                        }
                    ]
                });
            }
        },
    }
</script>
<style lang="scss" scoped>
    .annular-percent {
        
    }

</style>

