<template>
    <div class="export-package">
        <el-dialog
            title="导出人群包"
            top="30vh"
            :visible.sync="visiable"
            width="30%"
            :before-close="handleClose">
            <div>请选择导出形式</div>
            <div class="mode-style">
                <el-checkbox v-model="isAPI" @change="handleIsAPIChange"></el-checkbox>
                <span style="margin-left:5px;">API形式</span>  
            </div>
            <div v-if="isAPI">
                <div class="tips">选择要导入的人群包类型</div>
                <filterCheckbox :lists="list" v-model="type"/>
            </div>
            <div class="mode-style">
                <el-checkbox v-model="isFile" @change="handleIsFileChange"></el-checkbox>
                <span style="margin-left:5px;">文件形式</span>  
            </div>
            <div v-if="isFile">
                <div class='tips'>选择要导入的人群包类型</div>
                <filterCheckbox :lists="list" v-model="type"/>
            </div>
            <div style="margin-top:30px;">
                <el-button class="button-mini" type="primary" style="min-width:98px;" @click="exportOut">导出</el-button>
                <span style='margin-left:20px;color:#9fa1a7;font-size:12px;line-height:12px;vertical-align:bottom'>人群数量： {{currentRow.number}}人</span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import FilterCheckbox from "@/components/FilterCheckbox"
    export default {
        name: 'export-package',
        components: {FilterCheckbox},
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
                isAPI: false,
                isFile: true,
                list: [
                    {name: '用户ID', id: 'userid'},
                ],
                type: 'userid'
            }
        },
        mounted() {

        },
        methods: {
            handleClose() {
                this.$emit('update:visiable', false)
            },
            handleIsAPIChange(value) {
                this.isFile = !value
            },
            handleIsFileChange(value) {
                this.isAPI = !value
            },
            exportOut() {
                
                window.open('api/Crowdchoose/export?id=' + this.currentRow.id)
            }
        },
        
       
    }
</script>
<style lang="scss" scoped>
    .export-package {
        .mode-style {
            font-size: 14px;
            font-weight: bolder;
            margin-top: 30px;
        }
        .tips {
            line-height: 42px;
            color: #9ea1a6;
        }
    }

</style>

