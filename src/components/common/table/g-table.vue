<template>
    <div>
        <!-- //=====================================表格====================================// -->
        <el-table v-loading="loading" :data="tableInfo" :row-key="rowKey" element-loading-background="rgba(255, 255, 255, 0.9)" :highlight-current-row="highlightCurrentRow" :show-header="showHeader" :stripe="stripe" :border="border" :size="size" @selection-change="handleSelectionChange">
            <template v-for="(item, index) in tableColumns">
                <!-- //=====================================序号====================================// -->
                <el-table-column v-if="item.type === 'index'" :key="index" :width="item.width" type="index" label="序号" align="center"></el-table-column>
                <!-- //=====================================选择框====================================// -->
                <el-table-column v-if="item.type === 'selection'" :key="index" :width="item.width" :sortable="item.sortable" type="selection" :reserve-selection="item.reserveSelection" align="center"></el-table-column>
                <!-- //=====================================普通纯文本显示====================================// -->
                <el-table-column v-if="item.type === 'text'" :key="index" :width="item.width" :show-overflow-tooltip="item.showOverflowTooltip" :sortable="item.sortable" :prop="item.label" :label="item.title" align="center">
                    <template slot-scope="scope">
                        <slot :name="item.label" :scope="scope.row">
                            <span>{{ scope.row[item.label] }}</span>
                        </slot>
                    </template>
                </el-table-column>
                <!-- //=====================================链接文字====================================// -->
                <el-table-column v-if="item.type === 'link'" :key="index" :width="item.width" :sortable="item.sortable" :prop="item.label" :label="item.title" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="item.function(scope.row)">{{ scope.row[item.label] }}</el-button>
                    </template>
                </el-table-column>
                <!-- //=====================================操作====================================// -->
                <el-table-column v-if="item.type === 'do'" :key="index" :width="item.width" prop="do" :label="item.title" align="center">
                    <template slot-scope="scope">
                        <slot :scope="{...scope.row}" name="do">
                            <el-button v-for="(item2, index2) in item.buttons" :key="index2" :type="item2.color" size="small" @click="item2.function">{{ item2.title }}</el-button>
                        </slot>
                    </template>
                </el-table-column>
            </template>
        </el-table>
        <!-- //=====================================分页====================================// -->
        <div v-if="isPagination" class="d-flex justify-end mt-1">
            <slot :pageinaition="pageNum" name="pagination">
                <el-pagination :disabled="loading" :page-size="pageSize" :page-sizes="pagination.pageSizes" :background="pagination.background" :layout="pagination.layout" :total="total" @current-change="getTableData" @size-change="handleSizeChange">
                </el-pagination>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //=====================================表格参数====================================//
        tableColumns: {
            type: Array,
            default() {
                return [];
            },
        }, // 表格列数据
        border: {
            type: Boolean,
            default: false
        }, // 边框
        stripe: {
            type: Boolean,
            default: false
        }, // 斑马条纹
        size: {
            type: String,
            default: "mini"
        }, //表格大小
        getUrl: {
            type: String,
            default: ""
        },
        showHeader: {
            type: Boolean,
            default: true
        }, // 是否显示表头
        highlightCurrentRow: {
            type: Boolean,
            default: false
        },
        rowKey: {
            type: Function,
            default: function() {}
        }, // 分页记忆所需
        isPagination: {
            type: Boolean,
            default: true
        },
        pagination: {
            type: Object,
            default() {
                return {
                    pageSizes: [20, 40, 60, 80, 100],
                    pageSize: 20,
                    layout: "total, sizes, prev, pager, next, jumper",
                    background: true
                }
            }
        }
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
            loading: false, // 加载小圈圈
            total: 0, // 总条数
            pageNum: 1, // 当前页码
            pageSize: 20, // 每页条数
        };
    },
    created() {
        this.pageSize = this.pagination.pageSize;
        this.getTableData(1);
    },
    methods: {
        //=====================================向父组件传递表格checkbox数据====================================//
        handleSelectionChange(val) {
            this.$emit("handleSelectionChange", val);
        },
        //=====================================数据查询====================================//
        getTableData(page = 1) {
            this.pageNum = page;
            this.loading = true;
            const params = {
                pageNum: this.pageNum,
                pageSize: this.pageSize
            };
            this.axios
                .get(this.getUrl, { params })
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
        //=====================================条数change====================================//
        handleSizeChange(size) {
            this.pageSize = size;
            this.getTableData(1);            
        }
    },
};
</script>

<style>
</style>
