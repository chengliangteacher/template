export default {
    //=====================================dialog模板====================================//
    tableTemplate: `<template>
        <div>
            <el-table :data="tableInfo" stripe border size="mini" height="450px">
                ###table-column###
            </el-table>
            <div class="d-flex justify-end">
                <el-pagination layout="total, sizes, prev, pager, next" :total="total" background :page-sizes="pageSizes" :page-size="params.pageSize" :current-page="params.currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
            </div>
            ###dialog###
        </div>
    </template>\n<script>
    /* eslint-disable */
    export default {
        props: {
            search: {
                type: Object,
                default() {
                    return {};
                }
            },
        },
        data() {
            return {
                //==============================表格参数==============================//
                total: 0, //总数
                tableInfo: [], //表格信息
                pageSizes: [10, 20, 30], //分页数量
                params: { currentPage: 1, pageSize: 10 }, //查询参数，分页和页数大小
                ###params###
                //=====================================其他参数====================================//
                loading: false,
            };
        },
        created() {
            this.getTableData();
        },
        methods: {
            ###methods###
            //=====================================获取table数据====================================//
            getTableData() {
                let params = Object.assign(this.params, this.search);
                this.axios
                    .get("xxx", { params })
                    .then(res => {
                        this.tableInfo = res.data.rows;
                        this.total = res.data.total;
                        this.loading = false;
                    })
                    .catch(err => {
                        console.error(err);
                        this.loading = false;
                    });
            },
            //=====================================分页====================================//
            handleSizeChange(val) {
                this.params.pageSize = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.params.currentPage = val;
                this.getTableData();
            },
        }
    };
    </script>
    `
}
