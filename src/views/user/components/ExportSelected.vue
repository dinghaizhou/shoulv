<template>
    <div class="export-selected" v-loading='loading_serach'>
        <el-dialog
            title="导出到人群优选"
            top="30vh"
            :visible.sync="visiable"
            width="30%"
            :before-close="handleClose">
            <el-input maxlength="10" placeholder="请输入人群标题" v-model="title">
                <span slot="suffix" style="line-height:34px;font-size:14px;">{{title.length}}/10</span>
            </el-input>
            <div style="position:relative">
                <el-input
                    style="margin-top:20px;"
                    type="textarea"
                    placeholder="请输入人群描述"
                    resize="none"
                    v-model="detail"
                    maxlength="50"
                    :rows="3">
                </el-input>
                <span class="text-length">{{detail.length}}/50</span>
            </div>
            <div style="margin-top:30px;">
                <el-button class="button-mini" type="primary" style="min-width:98px;" @click="exportToSelected">导出</el-button>
                <span style='margin-left:20px;color:#9fa1a7;font-size:12px;line-height:12px;vertical-align:bottom'>人群数量： {{this.filterResult.searchTotal}}人</span>
            </div>
            
        </el-dialog>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    export default {
        name: 'export-selected',
        components: {},
        props: {
            visiable: {
                default: false,
            }
        },
        data: () => {
            return {
                title: '',
                detail: ''
            }
        },
        computed: {
            ...mapState({
                filterMode: state => state.user.filterMode,
                filters: state => state.user.filters,
                filterResult: state => state.user.filterResult,
                tagId: state => state.user.tagId,
                loading_serach: state => state.user.loading_serach
            })
        },
        mounted() {

        },
        methods: {
            handleClose() {
                this.$emit('update:visiable', false)
                this.title = ''
                this.detail = ''
            },
            exportToSelected() {
                if(!this.tagId) {
                    var isEmpty = true
                    for (var prop in this.filters) {
                        if(this.filters[prop]) {
                            isEmpty = false
                            break;
                        }
                    }
                    if(isEmpty) {
                        this.$message.warning('筛选条件为空,请重新筛选')
                        return
                    }
                    if(this.filterResult.searchTotal == 0) {
                        this.$message.warning('筛选人群数量为零，请重新筛选')
                        return
                    }
                    if (!this.title.trim()) {
                        this.$message.warning('请输入标题')
                        return
                    }
                    if (!this.detail.trim()) {
                        this.$message.warning('请输入描述')
                        return
                    }
                    this.$store.commit('changeLoading', true)
                    this.$http.post('/api/Consumer/exportToCrowdChoose', {
                        name: this.title,
                        info: JSON.stringify(this.filters),
                        describe: this.detail
                    })
                    .then((res) => {
                        this.$store.commit('changeLoading', false)
                        this.$message.success('导出成功')
                        this.$emit('update:visiable', false)
                        this.title = ''
                        this.detail = ''
                    })
                    .catch((res) => {
                        if(res.msg) {
                            this.$message.warning(res.msg)
                        } else {
                            this.$message.warning('导出失败')
                        }
                        
                        this.$store.commit('changeLoading', false)
                    })
                } else {
                    if(this.filterResult.searchTotal == 0) {
                        this.$message.warning('筛选人群数量为零，请重新筛选')
                        return
                    }
                    if (!this.title) {
                        this.$message.warning('请输入标题')
                        return
                    }
                    if (!this.detail) {
                        this.$message.warning('请输入描述')
                        return
                    }
                    this.$store.commit('changeLoading', true)
                    this.$http.post('/api/Consumer/exportToCrowdChooseByTagId', {
                        id: this.tagId,
                        name: this.title,
                        describe: this.detail
                    })
                    .then((res) => {
                        this.$store.commit('changeLoading', false)
                        this.$message.success('导出成功')
                        this.$emit('update:visiable', false)
                        this.title = ''
                        this.detail = ''
                    })
                    .catch((res) => {
                        this.$message.success('导出失败')
                        this.$store.commit('changeLoading', false)
                    })
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .export-selected {
        .text-length {
            line-height:34px;
            color: #c0c4cc;
            position: absolute;
            bottom: 0;
            right: 10px;
            font-size:14px;
        }
    }
</style>

