<template>
    <div>
        <el-table v-loading="loading" :data="tableInfo" stripe border size="mini">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="name" label="名称" align="center" width></el-table-column>
            <el-table-column prop="x" label="长名称部分展示" align="center" width="200px">
                <template slot-scope="scope">
                    <span class="text-ellipsis" :title="scope.row.x">{{ scope.row.x }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="x" label="Popover显示" align="center" width="200px">
                <template slot-scope="scope">
                    <el-popover placement="top-start" title="食品细类" width="200" trigger="hover" :content="scope.row.x">
                        <span slot="reference">{{ scope.row.x.length > 10 ? (scope.row.x.slice(0,10) + '...') : scope.row.x }}</span>
                    </el-popover>
                </template>
            </el-table-column>
            <el-table-column prop="x" label="长名称全部展示" align="center" width></el-table-column>
            <el-table-column label="信息框" align="center" width>
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.b === 1" type="warning" size="small">警告</el-tag>
                    <el-tag v-if="scope.row.b === 2" type="success" size="small">成功</el-tag>
                    <el-tag v-if="scope.row.b === 3" type="info" size="small">信息</el-tag>
                    <el-tag v-if="scope.row.b === 4" type="danger" size="small">被拒绝</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="time" label="创建时间" align="center" width></el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="openDialog1(scope.row)">弹窗编辑</el-button>
                    <el-button type="text" size="mini" @click="jump1(scope.row)">跳转</el-button>
                    <el-button type="text" size="mini" @click="confirm1(scope.row)">警告</el-button>
                    <el-button type="text" size="mini" @click="confirm1(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="d-flex justify-end">
            <el-pagination layout="total, sizes, prev, pager, next" :total="total" background :page-sizes="pageSizes" :page-size="params.pageSize" :current-page="params.currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
        </div>
        <el-dialog title="这是一个dialog弹窗" :visible.sync="dialogVisible1" width="30%">
            <div>
                <el-form ref="form" :model="dialogData" label-width="100px">
                    <el-form-item label="拒绝理由">
                        <el-input v-model="xxxx"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer">
                <el-button type="primary" size="mini" @click="handleDialogSubmit1">确认添加</el-button>
                <el-button type="danger" size="mini" @click="dialogVisible1 = false">取消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    props: {
        search: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            xxxx: "",
            //==============================表格参数==============================//
            total: 0, //总数
            tableInfo: [
                {
                    b: 1,
                    name: "浙江大学",
                    x: "全脂乳粉、脱脂乳粉、部分脱脂乳粉、调制乳粉,稀奶油、奶油和无水奶油,冬瓜",
                    time: "2019-06-01"
                },
                {
                    b: 2,
                    name: "清华大学",
                    x: "全脂乳粉、脱脂乳粉",
                    time: "2019-06-01"
                },
                {
                    b: 3,
                    name: "同济大学",
                    x: "土豆",
                    time: "2019-06-01"
                },
                {
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },{
                    b: 1,
                    name: "浙江大学",
                    x: "全脂乳粉、脱脂乳粉、部分脱脂乳粉、调制乳粉,稀奶油、奶油和无水奶油,冬瓜",
                    time: "2019-06-01"
                },
               
                {
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },
                {
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },
                {
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },{
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },
                {
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },{
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                },
                {
                    b: 4,
                    name: "齐齐哈尔宠物学院",
                    x: "稀奶油、奶油和无水奶油",
                    time: "2019-06-01"
                }
            ], //表格信息
            pageSizes: [10, 20, 30], //分页数量
            params: { currentPage: 1, pageSize: 10 }, //查询参数，分页和页数大小
            dialogVisible1: false,
            currentDialogData1: {},
            dialogData: {},
            //=====================================其他参数====================================//
            loading: false
        };
    },
    created() {
        this.getTableData();
    },
    methods: {
        //=====================================confirm提示框====================================//
        confirm1(rowData) {
            this.$confirm("这是我的提示文案", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.loading = true;
                    setTimeout(() => {
                        this.$message({
                            type: "success",
                            message: "成功"
                        });
                        this.loading = false;
                    }, 2000);
                })
                .catch(() => {});
        },
        jump1(rowData) {
            this.$router.push({
                path: "/v1/test/c",
                query: { id: rowData.id, ddid: rowData.id }
            });
        },
        openDialog1(rowData) {
            this.currentDialogData1 = rowData;
            this.dialogVisible1 = true;
        },
        handleDialogSubmit1() {
            this.dialogVisible1 = false;
            this.$message.success("操作成功");
        },
        //=====================================获取table数据====================================//
        getTableData() {
            let params = Object.assign(this.params, this.search);
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 2000);
        },
        //=====================================分页====================================//
        handleSizeChange(val) {
            this.params.pageSize = val;
            this.getTableData();
        },
        handleCurrentChange(val) {
            this.params.currentPage = val;
            this.getTableData();
        }
    }
};
</script>