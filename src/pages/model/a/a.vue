/*
    创建者：chengliang
    创建时间：2019-05-20 16:47
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="1"></el-tab-pane>
            <el-tab-pane label="配置管理" name="2"></el-tab-pane>
        </el-tabs>
        <s-table v-if="activeName == 1" :table-columns="tableColumns1" @handleSelectionChange="handleSelectionChange"></s-table>
        <s-table v-if="activeName == 2" :table-columns="tableColumns2" @handleSelectionChange="handleSelectionChange"></s-table>
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
            activeName: "1",
            tableColumns: [
                {
                    type: "selection",
                },
                {
                    type: "index",
                    label: "index",
                    title: "序号",
                },
                {
                    type: "link",
                    title: "编号",
                    label: "number",
                    function: this.handleDelete,
                },
                {
                    type: "text",
                    title: "姓名",
                    label: "name",
                },
                {
                    type: "text",
                    title: "年龄",
                    label: "age",
                },
                {
                    type: "text",
                    title: "性别",
                    label: "gener",
                },
                {
                    type: "text",
                    title: "身高",
                    label: "heighter",
                },
                {
                    type: "text",
                    title: "体重",
                    label: "weight",
                },
                {
                    type: "do",
                    title: "操作",
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
            dialogVisible: false,
        };
    },
    computed: {
        tableColumns1() {
            return this.tableColumns;
        },
        tableColumns2() {
            return this.tableColumns.filter(item => item.type !== "selection");
        }
    },
    created() {},
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
    },
};
</script>



<style lang="scss">
</style>
