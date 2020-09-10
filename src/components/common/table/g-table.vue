<template>
    <div>
        <el-table v-loading="loading" :data="tableInfo" element-loading-background="rgba(255, 255, 255, 0.9)" stripe border size="mini" @selection-change="handleSelectionChange">
            <template v-for="(item, index) in tableColumns">
                <!-- //=====================================序号====================================// -->
                <el-table-column v-if="item.type === 'index'" :key="index" type="index" label="序号" align="center"></el-table-column>
                <!-- //=====================================选择框====================================// -->
                <el-table-column v-if="item.type === 'selection'" :key="index" type="selection" align="center"></el-table-column>
                <!-- //=====================================普通纯文本显示====================================// -->
                <el-table-column v-if="item.type === 'text'" :key="index" :prop="item.label" :label="item.title" align="center"></el-table-column>
                <!-- //=====================================链接文字====================================// -->
                <el-table-column v-if="item.type === 'link'" :key="index" :prop="item.label" :label="item.title" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="item.function(scope.row)">{{ scope.row.number }}</el-button>
                    </template>
                </el-table-column>
                <!-- //=====================================操作====================================// -->
                <el-table-column v-if="item.type === 'do'" :key="index" prop="do" :label="item.title" align="center">
                    <el-button v-for="(item2, index2) in item.buttons" :key="index2" :type="item2.color" size="small" @click="item2.function">{{ item2.title }}</el-button>
                </el-table-column>
            </template>
        </el-table>
        <div class="d-flex justify-end mt-1">
            <el-pagination :page-size="20" background layout="total, prev, pager, next, jumper" :total="total" @current-change="getTableData">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tableColumns: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    data() {
        return {
            //=====================================表格参数====================================//
            tableInfo: [
                {
                    name: "chengliang",
                    age: "23",
                    weight: "72",
                    number: "32239237310121",
                    heighter: "175",
                },
                {
                    name: "chengliang",
                    age: "23",
                    weight: "72",
                    number: "32239237310121",
                    heighter: "175",
                },
                {
                    name: "chengliang",
                    age: "23",
                    weight: "72",
                    number: "32239237310121",
                    heighter: "175",
                },
                {
                    name: "chengliang",
                    age: "23",
                    weight: "72",
                    number: "32239237310121",
                    heighter: "175",
                },
                {
                    name: "chengliang",
                    age: "23",
                    weight: "72",
                    number: "32239237310121",
                    heighter: "175",
                },
                {
                    name: "chengliang",
                    age: "23",
                    weight: "72",
                    number: "32239237310121",
                    heighter: "175",
                },
            ],
            loading: false,
            total: 0,
            pageNum: 1,
        };
    },
    created() {
        this.getTableData(1);
    },
    methods: {
        handleSelectionChange(val) {
            this.$emit("handleSelectionChange", val);
        },
        //=====================================数据查询====================================//
        getTableData(page = 1) {
            this.pageNum = page;
            this.loading = true;
            this.axios
                .get(`/plans?pageNum=${this.pageNum}&pageSize=20`)
                .then((res) => {
                    this.tableInfo = res.data;
                    this.total = res.total;
                })
                .catch((err) => {
                    console.error(err);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style>
</style>
