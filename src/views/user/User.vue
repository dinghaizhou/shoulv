<template>
    <div class="user">
        <div class="menu-title">{{this.$route.meta.title}}</div>
        <div class="innerbox clearfix" style="margin-bottom: 20px;"  v-loading="loading_search">
            <ul class="clearfix title">
                <li :class="{'active': filterMode == 'custom'}" @click="changeFilterMode('custom')">自定义筛选</li>
                <li :class="{'active': filterMode == 'tags'}" @click="changeFilterMode('tags')">标签筛选</li>
            </ul>
            <div class="content">
                <div>
                    <custom-filter v-if="filterMode == 'custom'"/>
                    <tags-filter v-if="filterMode == 'tags'"/>
                </div>
            </div>
        </div>
        <div class="innerbox" style="margin-bottom: 20px;">
            <filter-result></filter-result>
        </div>
        <div class="innerbox">
            <el-table
            v-loading="loading_table"
            :data="filterResult.list"
            header-row-class-name="table-header">
                <el-table-column  prop="userid" width="100" label="用户ID"></el-table-column>
                <el-table-column  prop="sourcetype" label="用户来源">
                    <template slot-scope="scope">
                        {{scope.row.sourcetype ? scope.row.sourcetype  : '——'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="cost" label="消费总额">
                    <template slot-scope="scope">
                        {{scope.row.cost ? scope.row.cost  : '——'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="brand" label="会员">
                    <template slot-scope="scope">
                        {{scope.row.brand ? scope.row.brand  : '——'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="sex" label="性别">
                    <!-- <template slot-scope="scope">
                        {{scope.row.sex ? scope.row.sex  : '——'}}
                    </template> -->
                </el-table-column>

                <el-table-column  prop="year" label="年龄"></el-table-column>
                <el-table-column  prop="birthday" label="生日">
                    <template slot-scope="scope">
                        {{scope.row.birthday ? scope.row.birthday  : '——'}}
                    </template>
                </el-table-column>
                <el-table-column  prop="phone" label="手机">
                    <template slot-scope="scope">
                        {{scope.row.phone ? scope.row.phone  : '——'}}
                    </template>
                </el-table-column>
                <div slot="empty">
                    <img src="@/assets/images/no-list.png" style="margin-top: 90px;width:200px;" alt="">
                    <div style="margin:25px 0 90px;font-size: 14px;color: #575759;">还未创建会员列表</div>
                </div>
            </el-table>
            <div v-if="filterResult.list">
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="10"
                layout="total, sizes, prev, pager, next, jumper"
                :total="filterResult.searchTotal">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
    import CustomFilter from './components/CustomFilter'
    import FilterResult from './components/FilterResult'
    import TagsFilter from './components/TagsFilter'
    import { mapState } from 'vuex'
    export default {
        name: 'user',
        components: {CustomFilter, FilterResult, TagsFilter},
        data: () => {
            return {
                sex: ['男', '女', '未知']
            }
        },
        computed: {
            ...mapState({
                filterMode: state => state.user.filterMode,
                filters: state => state.user.filters,
                filterResult: state => state.user.filterResult,
                loading_search: state => state.user.loading_search,
                loading_table: state => state.user.loading_table
            })
            
        },
        mounted() {
            this.$store.commit('changeFilterMode', 'custom')
            this.$store.commit('changeFilterResult', {rate:0, searchTotal:0})
            this.$store.commit('changeTagId', '')
            this.$store.commit('changeTagName', '')
            this.$store.commit('changeFilters', null)

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
        },
        updated() {
        },
        methods: {
            changeFilterMode(value) {
                if(this.filterMode != value) {
                    this.$store.commit('changeFilterMode', value)
                    //切换时清楚tagid
                    this.$store.commit('changeTagId', '')
                    this.$store.commit('changeTagName', '')
                    // this.$store.commit('changeFilterResult', {rate:0, searchTotal:0})
                    // this.$store.commit('changeFilters', null)
                }
            },
            handleSizeChange(pageSize) {
                this.$store.commit('changePageSize', pageSize)
                this.$store.dispatch('getFilterResultByPage')
            },
            handleCurrentChange(page) {
                this.$store.commit('changePage', page)
                this.$store.dispatch('getFilterResultByPage')
            },

            customResult(res) {

            },
            getLists(page, pageSize, filters) {
                
            }
            
        }
    }
</script>
<style lang="scss" scoped>
    .user {
        .title {
            margin-bottom: 30px;
            line-height: 14px;
            font-size: 14px;
            li {position: relative;float:left;margin-right:40px;cursor: pointer;}
            li.active {color: #0486fe}
            li.active:before {
                content: '';
                width:100%;
                height:2px;
                display: inline-block;
                position: absolute;
                border-bottom: 2px solid #0486fe;
                bottom: -13px;
            }
        }
        .content {
            width:100%;
        }    
        .el-pagination {
            margin-top: 20px;
        } 
    }
</style>

