<template>
  <div class="selected" v-loading="loading">
        <el-row>
            <el-col :span="12"><div class="menu-title">{{this.$route.meta.title}}</div></el-col>
            <el-col :span="12">
                <el-button @click="addVisiable = !addVisiable" style="min-width:98px;line-height: 30px;" type="primary" class="button-mini pull-right">创建人群</el-button> 
            </el-col>
        </el-row>
        <div class="innerbox">
            <el-row class="clearfix" style="margin-bottom:20px;">
                <el-input v-model="search_text" class="pull-left" placeholder="请输入搜索内容" style="width:322px;margin-right:30px;"></el-input>
                <el-button class="button-max pull-left" style="line-height:38px;" @click="search">确认</el-button>
                <el-button class="button-max pull-left" style="line-height:38px;" @click="cancel_search">重置</el-button>
            </el-row>
            <el-row>
                <el-table
                :data="tableData"
                style="width: 100%"
                header-row-class-name="table-header">
                    <el-table-column
                    type="selection"
                    width="55">
                    </el-table-column>
                    <el-table-column align="center" prop="name" label="人群名称"></el-table-column>
                    <el-table-column align="center" prop="describe" label="人群描述"></el-table-column>
                    <el-table-column align="center" prop="mode" label="创建方式"></el-table-column>
                    <el-table-column align="center" prop="type" label="类型"></el-table-column>
                    <el-table-column align="center" prop="number" label="包含人数"></el-table-column>
                    <el-table-column align="center" prop="time" label="创建时间"></el-table-column>
                    <el-table-column align="center" width='250' label="操作">
                        <template slot-scope="scope">
                            <el-button
                            @click="edit(scope.row)"
                            type="text"
                            style="color:#1989FA;margin:0 30px 0 0;"
                            size="small">
                            编辑
                            </el-button>
                             <el-button
                            @click="insight(scope.row)"
                            style="color:#1989FA;margin:0 30px 0 0;"
                            type="text"
                            size="small">
                            洞察
                            </el-button>
                            <el-button
                            @click="exportPackage(scope.row)"
                            style="color:#1989FA;margin:0 30px 0 0;"
                            type="text"
                            size="small">
                            导出
                            </el-button>
                            <el-button
                            @click="deletePackage(scope.row)"
                            style="color:#f78484;margin:0 30px 0 0;"
                            type="text"
                            size="small">
                            删除
                            </el-button>
                        </template>
                    </el-table-column>
                    <div slot="empty">
                        <img src="@/assets/images/no-vip.png" style="margin-top: 90px;" alt="">
                        <div style="margin:25px 0 90px;font-size: 14px;color: #575759;">还未创建人群列表</div>
                    </div>
                </el-table>
                <div>
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="1"
                    :page-sizes="[10, 50, 100, 200]"
                    :page-size="10"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                    </el-pagination>
                </div>
            </el-row>
        </div>
        <check-dialog :addData="addData" @checkConfirm="checkConfirm" :visiable.sync="checkVisiable"></check-dialog>
        <add-dialog @addConfirm="addConfirm" :visiable.sync="addVisiable"></add-dialog>

        <edit-dialog @updateTable="updateTable" :currentRow="currentRow" :visiable.sync="editVisiable"></edit-dialog>
        <insight-dialog :visiable.sync="insightVisiable" :currentRow="currentRow"></insight-dialog>
        <export-package :currentRow="currentRow"  :visiable.sync="packageDialogVisiable"></export-package>
        <delete-dialog :currentRow="currentRow" @updateTable="updateTable"  :visiable.sync="deleteVisiable"></delete-dialog>
  </div>
</template>
<script>
    import CheckDialog from './components/CheckDialog.vue'
    import AddDialog from './components/AddDialog.vue'
    import EditDialog from './components/EditDialog.vue'
    import InsightDialog from './components/InsightDialog.vue'
    import ExportPackage from '@/components/ExportPackage.vue'
    import DeleteDialog from './components/DeleteDialog.vue'

    export default {
        name: 'selected',
        components: {CheckDialog, AddDialog, EditDialog, InsightDialog, ExportPackage, DeleteDialog},
        data: () => {
            return {
                loading: true,
                tableData: [],
                page: 1,
                pageSize: 10,
                total:0,
                checkVisiable: false,
                addVisiable: false,
                editVisiable: false,
                insightVisiable: false,
                packageDialogVisiable: false,
                deleteVisiable: false,
                currentRow: {},
                insightData: {
                    PC: 25,
                    Moblie: 25,
                    Wechat: 50,
                    Male: 75,
                    Female: 25,
                    Online: 25,
                    Outline: 75,
                },
                addData: {},
                search_text: ''
            }
        },
        mounted() {
            this.getList()
        },
        methods: {
            handleSizeChange(value) {
                this.pageSize = value
                this.getList()
            },
            handleCurrentChange(value) {
                this.page = value
                this.getList()
            },
            add() {

            },
            insight(row) {
                this.insightVisiable = true
                this.currentRow = row
            },
            edit(row) {
                this.editVisiable = true
                this.currentRow = row
            },
            exportPackage(row) {
                this.packageDialogVisiable = true
                this.currentRow = row
            },
            deletePackage(row) {
                this.deleteVisiable = true
                this.currentRow = row
            },
            addConfirm(data) {

                this.getList()
                this.checkVisiable = true
                this.addVisiable = false
                this.addData = data
            },
            checkConfirm() {
                this.checkVisiable = false
            },
            updateTable() {
                this.getList()
            },
            getList() {
                this.$http.post('/api/Crowdchoose/getCrowdChooselist',{page:this.page, pageSize: this.pageSize}, {loading: this})
                .then((res) => {
                    this.tableData = res.data.list
                    this.total = res.data.searchTotal
                })
            },
            search() {
                this.$http.post('/api/Crowdchoose/getCrowdChooselist',{page:this.page, pageSize: this.pageSize, name: this.search_text}, {loading: this})
                .then((res) => {
                    this.tableData = res.data.list
                    this.total = res.data.searchTotal
                })
            },
            cancel_search() {
                this.search_text = ''
                this.getList()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .selected {
        .el-pagination {
            margin-top: 20px;
        }
    }
</style>

