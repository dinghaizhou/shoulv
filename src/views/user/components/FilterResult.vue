<template>
    <div class="filter-result">
        <el-row>
            <el-col :span="12">
                <div style="line-height:32px;font-size: 14px;margin-right:20px;" class="pull-left">筛选结果</div>
                <div style="line-height:32px;font-size: 14px;" class="pull-left">
                    <!-- <span> {{filterMode == 'custom' ? '添加' : '修改'}}标签</span> -->
                    <!-- <span style="color:#9ea1a6;font-size:12px;margin: 0 20px 0 8px">(选填)</span> -->
                    <el-input 
                    maxlength="10"
                    style="width:160px;margin-right:10px;"
                    placeholder="请输入标签名"
                    v-model="tagNames"
                    ></el-input>
                    <el-button type="primary" class="button-mini" @click="saveTags">保存</el-button>
                    <el-button class="button-mini" @click="deleteTags">删除</el-button>
                </div>
            </el-col>

            <el-col :span="12">
                 <div class="pull-right">
                    <el-button class="button-mini" @click="exportToPackage" type="primary" >导出人群包</el-button>
                    <el-button class="button-mini" @click="exportAsSelected">导出人群优选</el-button>
                </div>
            </el-col>
        </el-row>
        <div class="flex-a" style="padding-top:10px;">
            <div style="width:60%;height:170px" class="flex-b">
                <div class="flex-c-c"> 
                    <div style="height:60px;color:#0486fe;" class="flex-b-c">
                        <span>所占比例</span>
                        <span style="font-size:22px;font-weight:500;">{{filterResult.rate}}%</span>
                    </div>
                </div>
                <div class="flex-c-c">
                    <div style="height:60px;padding-left:30px;border-left:1px solid #eee;" class="flex-b-c">
                        <span>占比人数（人）</span>
                        <span style="font-size:22px;font-weight:500;">{{filterResult.searchTotal}}</span>
                    </div>
                </div>
                <div class="flex-c-c">
                    <div style="height:60px;padding-left:30px;border-left:1px solid #eee;" class="flex-b-c">
                        <span>用户总数（人）</span>
                        <span style="font-size:22px;font-weight:500">{{filterResult.total}}</span>
                    </div>
                </div>
            </div>
            <div style="width:40%;margin-left:40px">
                <div style="width:100%;max-width:400px;height:170px;margin: 8px auto 0 auto;" id="filterResult"></div>
            </div>
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
                tagName: state => state.user.tagName,
                tagId: state => state.user.tagId,
            })
        },
        mounted() {
            this.drawPie()
        },
        watch: {
            'filterResult': function() {
                this.drawPie()
            },
            'tagName': function(value) {
                this.tagNames = value
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
                if(this.filterMode == 'custom') {
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
                        this.$message.success('保存失败')
                        this.$store.commit('changeLoading', false)
                    })
                } else {
                    if(!this.tagId) {
                        this.$message.warning('请先选择标签再修改')
                        return
                    }
                    if (!this.tagNames) {
                        this.$message.warning('请输入标签名')
                        return
                    }
                    this.$http.post('/api/Consumer/tagedit',{
                        id: this.tagId,
                        name: this.tagNames
                    })
                    .then(() => {
                        this.$message.success('修改成功')
                        // this.$store.commit('changeFilterResult', {rate:0, searchTotal:0})
                        // this.$store.commit('changeTagId', '')
                        this.$store.commit('changeTagName', this.tagNames)
                        this.$store.dispatch('getTagsLists')
                        return
                    })
                    .catch((res) => {
                        if(!res.msg) {
                            this.$message.warning('修改失败')
                        }
                    })
                }
            },
            deleteTags() {
                if(this.filterMode == 'custom') {
                    this.tagNames = ''
                } else {
                    if(!this.tagId) {
                        this.$message.warning('请先选择标签再删除')
                        return
                    } 
                   
                    this.$http.post('/api/Consumer/tagdel',{
                        id: this.tagId
                    })
                    .then(() => {
                        this.$message.success('删除成功')
                        this.$store.commit('changeFilterResult', {rate:0, searchTotal:0})
                        this.$store.commit('changeTagId', '')
                        this.$store.commit('changeTagName', '')
                        this.$store.dispatch('getTagsLists')
                        return
                    })
                    .catch(() => {
                        this.$message.warning('删除失败')
                    })
                }
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
    }

</style>

