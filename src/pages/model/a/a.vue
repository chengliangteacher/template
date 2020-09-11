/*
    创建者：chengliang
    创建时间：2019-05-20 16:47
    模块名称：表格
    备注：测试页面
*/
<template>
    <div>
        <!-- //=====================================搜索====================================// -->
        <s-search></s-search>
        <!-- //=====================================tab-表格====================================// -->
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="1">
                <s-table ref="usertable" :table-columns="tableColumns1" :row-key="rowKey" get-url="/plans" :highlight-current-row="true" :is-pagination="true" :pagination="pagination" @handleSelectionChange="handleSelectionChange">
                    <!-- //=====================================替换操作列，不替换可使用josn数据自动渲染====================================// -->
                    <template v-slot:do>
                        <div>
                            <el-button type="danger" size="small">删除</el-button>
                        </div>
                    </template>
                    <!-- //=====================================个性化表格列文本展示====================================// -->
                    <template v-slot:name="scope">
                        <span>{{ scope.scope.name }}</span>
                    </template>
                </s-table>
            </el-tab-pane>
            <el-tab-pane label="配置管理" name="2">
                <s-table :table-columns="tableColumns2" get-url="/plans" @handleSelectionChange="handleSelectionChange"></s-table>
            </el-tab-pane>
        </el-tabs>
        <!-- //=====================================删除弹框====================================// -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: "1", // tab参数
            //=====================================表格列====================================//
            tableColumns: [
                {
                    type: "selection",
                    width: 50,
                    reserveSelection: true,
                },
                {
                    type: "index",
                    label: "index",
                    title: "序号",
                    width: 50,
                },
                {
                    type: "link",
                    title: "编号",
                    label: "planSmallTypeCode",
                    function: this.handleDelete,
                    width: 120,
                },
                {
                    type: "text",
                    title: "名称",
                    label: "name",
                    width: 300,
                    sortable: true,
                    showOverflowTooltip: true,
                },
                {
                    type: "text",
                    title: "机构",
                    label: "sampleCompanyName",
                },
                {
                    type: "text",
                    title: "检测名称",
                    label: "planTypeName",
                },
                {
                    type: "text",
                    title: "创建者",
                    label: "creatorName",
                },
                {
                    type: "text",
                    title: "市场来源",
                    label: "taskSource",
                },
                {
                    type: "do",
                    title: "操作",
                    width: 300,
                    buttons: [
                        {
                            color: "primary",
                            title: "编辑",
                            function: this.handleDelete,
                        },
                        {
                            color: "danger",
                            title: "删除",
                            function: this.handleDelete,
                        },
                        {
                            color: "primary",
                            title: "新增",
                            function: this.handleDelete,
                        },
                    ],
                },
            ],
            //=====================================弹框modal====================================//
            dialogVisible: false,
            //=====================================分页参数====================================//
            pagination: {
                pageSizes: [20, 40, 60, 80],
                pageSize: 40,
                layout: "total, sizes, prev, pager, next, jumper",
                background: true
            }
        };
    },
    computed: {
        tableColumns1() {
            return this.tableColumns;
        },
        tableColumns2() {
            return this.tableColumns.filter(
                (item) => item.type !== "selection"
            );
        },
    },
    created() {
    },
    methods: {
        //=====================================删除====================================//
        handleDelete(val) {
            console.log("-----delete----", val);
            this.dialogVisible = true;
        },
        //=====================================表格checkbox====================================//
        handleSelectionChange(val) {
            console.log("-----checkbox------", val);
        },
        rowKey(val) {
            return val.id;
        },
    },
};
</script>



<style lang="scss">
</style>
