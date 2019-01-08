<template>
    <div class="add-dialog">
        <el-dialog
            title="创建人群"
            top="15vh"
            :visible.sync="visiable"
            width="30%"
            :before-close="handleClose">
            <el-input maxlength="10" placeholder="请输入人群标题" v-model="title" style="margin-top:15px;">
                <span slot="suffix" style="line-height:34px;">{{title.length}}/10</span>
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
            <div class="title-tips">选择人群包类型</div>
            <filter-checkbox :lists="typeLists" v-model="type" right="20px"></filter-checkbox>
            <div class="title-tips">
                EXCEL表格形式，大小不超过***
                <span style="color:#1790ff;margin-left:10px;cursor:pointer">下载模版示例</span>
            </div>
            <div class="upload" v-if="show_button">
               <input @change="uploadFile" ref="upload" type="file" id="packageUpload" style="display: none;">
               <label for="packageUpload"> <span style="margin-right:10px;font-size: 14px;">+</span> 点击上传人群包</label>
            </div>
            <div v-else>
                <div class="flex-b">
                    <span style="line-height: 28px;">{{file ? file.name : ''}}</span>
                    <!-- <i class="el-icon-delete" style="cursor:pointer"></i> -->
                   <el-button
                    @click="deletefile"
                    style="color:#f78484;margin:0 30px 0 0;"
                    type="text"
                    size="small">
                    删除
                    </el-button>
                </div>
                <div class="flex-b" style="align-items:center;">
                    <div class="process-bar" >
                        <div class="inner-bar" :style="{width: process + '%'}">

                        </div>
                    </div>
                    <div  class="process-text">
                        {{process}}%
                    </div>
                </div>
            </div>
            <el-button @click="confirm" type="primary" class="button-mini" style="margin-top: 30px;min-width:98px;">
                确定
            </el-button>
        </el-dialog>
    </div>
</template>
<script>
    import FilterCheckbox from '@/components/FilterCheckbox.vue'
    export default {
        name: 'add-dialog',
        components: {FilterCheckbox},
        props: {
            visiable: {
                default: false,
            }
        },
        data: () => {
            return {
                title: '',
                detail: '',
                typeLists: [
                    {
                        name: '用户ID',
                        id: 'userid'
                    }
                ],
                type: 'userid',
                show_button: true,
                process: '0',
                file: null,
                filename: '',
                is_uploading: false
            }
        },
        mounted() {
        },
        methods: {
            handleClose() {
                this.is_uploading = false
                this.process = '0'
                this.file = null
                this.show_button = true
                this.filename = ''
                this.$emit('update:visiable', false)
            },
            uploadFile(e) {
                let CancelToken = this.$http.CancelToken
                var file = this.$refs.upload.files[0]  
                this.file = file  

                var that = this
                var fd = new FormData();
                fd.append('source', file);
                this.$http.post('/api/Crowdchoose/upload',fd, 
                {
                    headers: { 'Content-Type': 'multipart/form-data'},
                    onUploadProgress: progressEvent => {
                        that.show_button = false
                        this.is_uploading = true
                        var complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
                        this.process = complete
                    },
                    cancelToken: new CancelToken(function executor(c) {
                        that.cancel = c
                    })
                })
                .then((res) => {
                    this.is_uploading = false
                    this.filename = res.data.filename
                })
                .catch((res) => {
                    this.is_uploading = false
                    this.process = '0'
                    this.file = null
                    this.show_button = true
                    this.filename = ''
                })
            },
            confirm() {
                if(!this.filename) {
                    this.$message.warning('请上传文件')
                    return
                }
                if(!this.title) {
                    this.$message.warning('请填写标题')
                    return
                }
                if(!this.detail) {
                    this.$message.warning('请填写描述')
                    return
                }

                this.$http.post('/api/Crowdchoose/import',{
                    name: this.title,
                    describe: this.detail,
                    filename: this.filename,
                    type: this.type
                })
                .then((res) => {
                    this.$emit('addConfirm', res.data)
                    this.process = '0'
                    this.show_button = true
                    this.file = null
                    this.filename = ''
                })
            },
            deletefile() {
                if(this.is_uploading) {
                    this.cancel()
                } else {
                    this.process = '0'
                    this.file = null
                    this.show_button = true
                    this.filename = ''
                }
            }
        },
    }
</script>
<style lang="scss" scoped>
    .add-dialog {
        .text-length {
            line-height:34px;
            color: #c0c4cc;
            position: absolute;
            bottom: 0;
            right: 10px;
        }
        .title-tips {
            color: #92959b;
            font-size: 12px;
            line-height: 16px;
            margin: 20px 0 15px 0;
        }
        .upload {
            border: 1px solid #eee;
            line-height: 46px;
            border-radius: 6px;
            text-align: center;
            label {
                display: block;
                width:100%;
                color:#1790ff;
                cursor:pointer;
                line-height: 46px;
                &:hover {
                    opacity: 0.6;
                }
            }
        }
        .process-bar {
            width: 88%;
            height: 8px;
            border: 1px solid #dcdfe6;
            border-radius: 4px;
            overflow: hidden;
            .inner-bar {
                background:#1790ff;
                height:6px;
                border-radius: 0 3px 3px 0;
            }
        }
        .process-text {
            width:10%;
            color: #1790ff;
        }
    }


</style>

