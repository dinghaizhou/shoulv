<template>
    <div class="edit-dialog">
        <el-dialog
            title="人群洞察"
            top="15vh"
            :visible.sync="visiable"
            width="86%"
            :before-close="handleClose">
            <active-user :insightData="insightData"></active-user>

        </el-dialog>
    </div>
</template>
<script>
    import ActiveUser from '@/components/ActiveUser.vue'
    export default {
        name: 'edit-dialog',
        components: {ActiveUser},
        props: {
            visiable: {
                default: false,
            },
            insightData: {
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

