<template>
    <div class="custom-filter" v-loading="loading">
        <div class="section clearfix pull-left">
            <div class="section-title ">业务标签：</div>
            <div class="section-body">
                <filterCheckbox :lists="list1" v-model="primaryKind"/>
            </div>
        </div>
         <div class="section clearfix pull-left">
            <div class="section-title">行为标签：</div>
            <div class="section-body">
                <filterCheckbox :lists="list2" v-model="actionKind"/>
            </div>
        </div>
         <div class="section clearfix pull-left">
            <div class="section-title">行为频率：</div>
            <div class="section-body">
                <filterCheckbox :lists="list3" v-model="frequencyKind"/>
            </div>
        </div>
        <div class="section clearfix pull-left" v-if="!actionKind || actionKind == 3">
            <div class="section-title">客户来源：</div>
            <div class="section-body">
                <filterCheckbox :lists="list4" v-model="sourceKind"/>
            </div>
        </div>
        <div class="clearfix">
            <div class="section clearfix pull-left"> 
                <div class="section-title">消费能力：</div>
                <div class="section-body">
                    <el-select v-model="costabilityKind" clearable placeholder="不限" class="m-b-10">
                        <el-option
                        v-for="item in costAbilityOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="section clearfix pull-left">
                <div class="section-title">品牌会员：</div>
                <div class="section-body">
                    <el-select v-model="brandid" clearable placeholder="不限" class="m-b-10">
                        <el-option
                        v-for="item in brandOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="section clearfix pull-left">
                <div class="section-title" style="width:130px;">行为有效时段：</div>
                <div class="section-body" style="margin-left:130px;">
                    <el-select v-model="actionStatus" clearable placeholder="不限" class="m-b-10">
                        <el-option
                        v-for="item in actionStatusOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </div>
            </div>
        </div>
        <el-button type="primary" class="search-button button-mini" @click="search">查询</el-button>
        <el-button type="default" class="search-button button-mini" @click="reset">重置</el-button>
    </div>
</template>
<script>
    import filterCheckbox from '@/components/FilterCheckbox'
    export default {
        name: 'custom-filter',
        components: {filterCheckbox},
        data: () => {
            return {
                list1: [],
                list2: [],
                list3: [],
                list4: [],
                costAbilityOptions: [],
                brandOptions: [],
                actionStatusOptions: [],
                primaryKind: '',
                actionKind: '',
                frequencyKind: '',
                sourceKind: '',
                costabilityKind: '',
                brandid: '',
                actionStatus: '',
                loading: false
            }
        },
        mounted() {
            this.$http.get('/api/Consumer/getBaseInfo', {loading: this})
            .then((res) => {
                this.list1 = res.data.primaryKind
                this.list1.unshift({name: '不限', id: ""})
                this.list2 = res.data.actionKind
                this.list2.unshift({name: '不限', id: ""})
                this.list3 = res.data.frequencyKind
                this.list3.unshift({name: '不限', id: ""})
                this.list4 = res.data.sourceKind  
                this.list4.unshift({name: '不限', id: ""})
                this.costAbilityOptions = res.data.costabilityKind
                this.brandOptions = res.data.brand
                this.actionStatusOptions = res.data.actionStatus
            })
            .catch((res) => {
                this.$message.warning('网络错误')
            })
            this.reset()
        },
        watch: {
            'actionKind'(value) {
                this.sourceKind = ''
            }
        },
        methods: {
            search() {
                let { primaryKind,actionKind,frequencyKind,sourceKind,costabilityKind,brandid,actionStatus} = this
                var filters = {primaryKind,actionKind,frequencyKind,sourceKind,costabilityKind,brandid,actionStatus}
                this.$store.commit('changePage', 1)
                this.$store.dispatch('getFilterResultByFilters', filters)
            },
            reset() {
                this.$store.dispatch('getFilterResultByFilters', {
                    primaryKind: '',
                    actionKind: '',
                    frequencyKind: '',
                    sourceKind: '',
                    costabilityKind: '',
                    brandid: '',
                    actionStatus: '',
                })
                this.primaryKind = '';
                this.actionKind = '';
                this.frequencyKind = '';
                this.sourceKind = '';
                this.costabilityKind = '';
                this.brandid = "";
                this.actionStatus = ''
            }
        }

    }
</script>
<style lang="scss" scoped>
    .custom-filter {
        .section { 
            line-height: 36px;
            margin-right:60px;
            margin-bottom: 10px;
            .section-title {width: 90px;float: left;color:#0c0c0c;font-size: 14px;}
            .section-body {margin-left: 90px;
                .el-select {
                    width:140px;
                }
            }
        }
        .search-button {
            min-width: 98px;
            margin-top: 10px;
        }
    }

</style>

