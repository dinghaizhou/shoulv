<template>
    <div class="filter-result">
        <div style="line-height: 20px;font-size: 14px;">筛选结果</div>
        <div style="width:100%;height:170px;margin: 8px auto 0 auto;" id="filterResult"></div>
        <div style="line-height: 36px;font-size: 14px;" v-if="filterMode == 'custom'">
            <span >添加标签</span>
            <span style="color:#9ea1a6;font-size:12px;margin: 0 20px 0 8px">(选填)</span>
            <el-input 
            maxlength="10"
            style="width:300px;margin-right:20px;"
            placeholder="请输入标签名，最多支持10个字"
            v-model="tagNames"
            ></el-input>
            <el-button class="button-max m-t-10" @click="saveTags">保存</el-button>
            <el-button class="button-max m-t-10" @click="deleteTags">删除</el-button>
        </div>
        <div style="margin-top: 22px;">
            <el-button class="button-mini" @click="exportToPackage" type="primary" >导出人群包</el-button>
            <el-button class="button-mini" @click="exportAsSelected">导出人群优选</el-button>
        </div>
        <export-package :visiable.sync="packageDialogVisiable"></export-package>
        <export-selected :visiable.sync="selectedDialogVisiable"></export-selected>
    </div>
</template>
<script>
    import echarts from 'echarts'
    import ExportPackage from '@/components/ExportPackage.vue'
    import ExportSelected from './ExportSelected.vue'
    import { mapState } from 'vuex'

    function calXY(A) {
        var x = 65 + 65 * Math.cos(Math.PI/2 - A  * Math.PI)
        var y = 65 + 65 * Math.sin(Math.PI/2 - A  * Math.PI)
        if (A > 0.25) {
            x = y = 110.96
        } 
        if ( A < 0.027777777) {
            x = 70.66512327859778 
            y = 129.75265537596346
        }
        return {x,y}
    }
    export default {
        name: 'filter-result',
        components: {ExportPackage, ExportSelected},
        data: () => {
            return {
                packageDialogVisiable: false,
                selectedDialogVisiable: false,
                tagNames: ''
            }
        },
        props:[],
        computed: {

            ...mapState({
                filterMode: state => state.user.filterMode,
                filters: state => state.user.filters,
                filterResult: state => state.user.filterResult,
            })
        },
        mounted() {
            this.drawPie()
        },
        watch: {
            'filterResult': function() {
                this.drawPie()
            } 
        },
        methods: {
            exportToPackage() {
                this.packageDialogVisiable = true
            },
            exportAsSelected() {
                this.selectedDialogVisiable = true
            },
            saveTags() {
                if(!this.filters) {
                    this.$message.warning('请先筛选出特定人群再保存')
                    return
                }
                if (!this.tagNames) {
                    this.$message.warning('请输入标签名')
                    return
                }
                this.$store.commit('changeLoading', true)
                this.$http.post('/api/Consumer/setTag',{
                    info: JSON.stringify(this.filters),
                    name: this.tagNames
                })
                .then((res) => {
                    this.$store.commit('changeLoading', false)
                    this.$message.success('添加成功')
                    this.tagNames = ''
                })
                .catch((res) => {
                    this.$message.warning('保存失败')
                    this.$store.commit('changeLoading', false)
                })

            },
            deleteTags() {
                this.tagNames = ''
            },
            drawPie() {
                let myChart = this.$echarts.init(document.getElementById('filterResult'))
                var colorLists = ['#65a0e6', '#f9c83e']
                var data =  [
                                {value: 100 -  this.filterResult.rate, name:'吃饭'},
                                {value: this.filterResult.rate, name:'旅游',selected: true},
                            ]
                var percent = data[1].value/100
                myChart.setOption({
                    title: { text: '' },
                    // tooltip: {
                    //     trigger: 'item',
                    //     formatter: "{a} <br/>{b}: {c} ({d}%)"
                    // },
                    series: [
                        {
                            name:'占比',
                            type:'pie',
                            radius :  '65px',
                            center: ['65px', '75px'],
                            startAngle:270,
                            hoverAnimation: false,
                            selectedMode: false,
                            selectedOffset: 5,
                            // minAngle: 10,
                            data:data,
                            label: {
                                show: false,
                                formatter: (params) =>  {
                                    params.name 
                                }
                            },
                            labelLine: {
                                show: false,
                                length: 50,
                                length2: 50,
                            },
                            itemStyle: {
                                color: (params) => {
                                    return colorLists[params.dataIndex]
                                }
                            },
                        
                        }
                    ]
                
                });
                var xy = calXY(percent)
                myChart.setOption({
                    graphic:[
                        {
                            type: 'line',
                            z: 22,
                            style: {fill: '#e9ebef',
                                    stroke: '#e9ebef',
                                    lineWidth: 1
                                },
                            shape: {
                                x1: xy.x,
                                y1: xy.y,
                                x2: 140,
                                y2: 150,
                            }
                        },
                        {
                            type: 'line',
                            z: 22,
                            style: {fill: '#e9ebef',
                                    stroke: '#e9ebef',
                                    lineWidth: 1
                                },
                            shape: {
                                x1: 140,
                                y1: 150,
                                x2: 450,
                                y2: 150,
                            }
                        },
                        {
                            type: 'text',
                            left: '180', // 相对父元素居中
                            top: '40',  // 相对父元素上下的位置
                            style: {
                                text: '合计：       ' + this.filterResult.searchTotal +'人',
                                font: 'bolder 16px "Microsoft YaHei"',
                                fill: this.color
                                }
                        },
                        {
                            type: 'text',
                            left: '180', // 相对父元素居中
                            top: '95',  // 相对父元素上下的位置
                            style: {
                                text: '占比：        ' + this.filterResult.rate + '%',
                                font: 'bolder 16px "Microsoft YaHei"',
                                fill: this.color
                                }
                        }
                    ] 
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .filter-result {
        width: 100%;
        padding-left: 60px;
    }

</style>

