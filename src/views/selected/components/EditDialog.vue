<template>
    <div class="edit-dialog" v-loading="loading">
        <el-dialog
            title="编辑人群"
            top="30vh"
            :visible.sync="visiable"
            width="30%"
            :before-close="handleClose">
            <el-input maxlength="10" placeholder="请输入人群标题" v-model="title" style="margin-top:15px;">
                <span slot="suffix" style="line-height:34px; font-size:14px;color:#DCDFE6">{{title.length}}/10</span>
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
            <el-button @click="confirm" type="primary" class="button-mini" style="margin-top: 30px;min-width:98px;">
                确定
            </el-button>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'edit-dialog',
        components: {},
        props: {
            visiable: {
                default: false,
            },
            currentRow: {
                type: Object,
                default: function() {
                    return {}
                }
            }
        },
        data: () => {
            return {
                title: '',
                detail: '',
                loading: false
            }
        },
        watch: {
            currentRow() {
                if(!this.currentRow.name) this.currentRow.name = ''
                if(!this.currentRow.describe) this.currentRow.describe = ''
                this.title = this.currentRow.name
                this.detail = this.currentRow.describe
            }
        },
        mounted() {
            
        },
        methods: {
            handleClose() {
                this.$emit('update:visiable', false)
            },
            confirm() {
                if(this.title && this.detail) {
                    this.$http.post('/api/Crowdchoose/edit', {
                        name: this.title,
                        describe: this.detail,
                        id: this.currentRow.id
                    }, {loading: this})
                    .then(() => {
                        this.$message.success('修改成功')
                        this.$emit('update:visiable', false)
                        this.$emit('updateTable')
                    
                    })
                } else {
                    this.$message.warning('请完善填写内容')
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .edit-dialog {
        .text-length {
            line-height:34px;
            position: absolute;
            bottom: 0;
            right: 5px;
            font-size:14px;
            color:#DCDFE6
        }

    }

</style>

