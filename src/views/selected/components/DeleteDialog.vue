<template>
    <div class="edit-dialog">
        <el-dialog
            title="创建人群"
            top="30vh"
            :visible.sync="visiable"
            width="30%"
            :before-close="handleClose">
            <div style="line-height:60px;">你确定要删除吗</div>
            <div>
                <el-button class="button-mini" type="primary" @click="confirm">
                    确定
                </el-button>
                <el-button class="button-mini" @click="handleClose">
                    取消
                </el-button>
            </div>
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
               
            }
        },
        mounted() {
        },
        methods: {
            handleClose() {
                this.$emit('update:visiable', false)
            },
            confirm() {
                this.$http.post('/api/Crowdchoose/del', {
                    id: this.currentRow.id
                }, {loading: this})
                .then(() => {
                    this.$message.success('删除成功')
                    this.$emit('update:visiable', false)
                    this.$emit('updateTable')
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .edit-dialog {
        .text-length {
            line-height:34px;
            color: #c0c4cc;
            position: absolute;
            bottom: 0;
            right: 10px;
        }

    }

</style>

