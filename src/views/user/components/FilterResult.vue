<template>
    <div class="filter-result" v-loading="loading_setTag">
        <el-row>
            <el-col :span="12">
                <div style="line-height:32px;font-size: 14px;margin-right:20px;" class="pull-left">筛选结果</div>
                    <div v-if="!canAdd">
                        <el-button class="button-mini" icon="el-icon-plus" @click="showadd" v-if="!hasAdd">添加标签</el-button>
                        <span v-else>
                            <el-button class="button-mini no-click" disabled icon="el-icon-plus">
                                添加标签
                            </el-button>
                            <el-tooltip class="item" effect="dark" :content="filterMode == 'custom' ? '同一筛选结果不可重复创建标签' : '选择标签后不可添加'" placement="top-start">
                                <span style='display:inline;width:110px;height:32px;position:absolute;left:75px;'></span>
                            </el-tooltip>
                        </span>
                        
                    </div>
                    <div style="line-height:32px;font-size: 14px;" class="pull-left addTags" v-else>
                        <!-- <span> {{filterMode == 'custom' ? '添加' : '修改'}}标签</span> -->
                        <!-- <span style="color:#9ea1a6;font-size:12px;margin: 0 20px 0 8px">(选填)</span> -->
                        <el-input 
                        maxlength="10"
                        style="width:160px;margin-right:10px;"
                        class="pull-left"
                        placeholder="请输入标签名"
                        v-model="tagNames"
                        ></el-input>
                        <el-button type="primary" class="button-mini pull-left" @click="saveTags">保存</el-button>
                        <el-button class="button-mini pull-left" @click="deleteTags">取消</el-button>
                    </div>
                
            </el-col>

            <el-col :span="12">
                 <div class="pull-right">
                    <el-button class="button-mini" @click="exportToPackage" type="primary" >导出人群包</el-button>
                    <el-button class="button-mini" @click="exportAsSelected" type="primary" >创建人群优选</el-button>
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
                loading_setTag: state => state.user.loading_setTag,
                loading_search: state => state.user.loading_search,
                hasAdd: state => state.user.hasAdd,
                canAdd: state => state.user.canAdd,
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
            showadd() {
                this.$store.commit('changeCanAdd', true)
            },
            saveTags() {
                if(!this.filters) {
                    this.$message.warning('请先筛选出特定人群再保存')
                    return
                }
                var isEmpty = true
                for (var prop in this.filters) {
                    if(this.filters[prop]) {
                        isEmpty = false
                        break;
                    }
                }
                if(isEmpty) {
                    this.$message.warning('筛选条件为空，请重新筛选')
                    return
                }
                if(this.filterResult.searchTotal == 0) {
                    this.$message.warning('筛选人群数量为零，请重新筛选')
                    return
                }
                if (!this.tagNames) {
                    this.$message.warning('请输入标签名')
                    return
                }
                this.$store.commit('changeLoadingSetTag', true)
                this.$http.post('/api/Consumer/setTag',{
                    info: JSON.stringify(this.filters),
                    name: this.tagNames
                })
                .then((res) => {
                    this.$store.commit('changeCanAdd', false)
                    this.$store.commit('changeHasAdd', true)
                    this.$store.commit('changeLoadingSetTag', false)
                    this.$store.dispatch('getTagsLists')
                    this.$message.success('添加成功')
                    this.tagNames = ''
                })
                .catch((res) => {
                    this.$store.commit('changeLoadingSetTag', false)
                    if(!res.msg) {
                        this.$message.success('保存失败')
                    }
                })
            },
            deleteTags() {
                    this.tagNames = ''
                    this.$store.commit('changeCanAdd', false)
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
        .no-click {
            position: relative;
        }
    }

</style>

