<template>
    <div class="check-dialog">
        <el-dialog
            title="创建人群"
            top="30vh"
            :visible.sync="visiable"
            width="30%"
            :before-close="handleClose">
            <div class="text">
                所上传人群包中包含的人数： <span class="em">{{addData.uploadCount}}人</span>
            </div>
            <div class='text'>
                可创建人群包人数： <span class="em">{{addData.count}}人</span>
            </div>
            <el-button @click="confirm" type="primary" class="button-mini" style="margin-top:30px;min-width:98px;">
                创建
            </el-button>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'check-dialog',
        components: {},
        props: {
            visiable: {
                default: false,
            },
            addData: {
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
                this.$emit('checkConfirm')
                this.$message.success('添加成功')
            }
        },
    }
</script>
<style lang="scss" scoped>
    .check-dialog {
        .text {
            line-height:22px;
            margin-top: 20px;
            .em {
                font-size: 14px;
                font-weight: bold;
            }
        }
    }
</style>

