<template>
    <div v-loading="loading">
        <s-info title="普通信息展示"></s-info>
        <s-form></s-form>
        <s-card title="添加+表格">
            <div slot="search-btn">
                <el-button type="primary" size="small" @click="dialogFormVisible=true">添加</el-button>
                <el-button type="danger" size="small">删除</el-button>
                <el-button size="small">上传</el-button>
                <el-button size="small">下载</el-button>
            </div>
            <el-table v-loading="loading1" :data="tableInfo" stripe border size="mini">
                <el-table-column prop="x" label="序号" align="center"></el-table-column>
                <el-table-column label="操作" align="center" width="200px"></el-table-column>
            </el-table>
        </s-card>
        <s-photo></s-photo>
        <div>
            <el-button type="primary" size="medium" @click="click">主要按钮</el-button>
            <el-button type="primary" plain size="medium" @click="click1">普通按钮</el-button>
        </div>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动区域" :label-width="100">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            loading: false,
            tableInfo: [],
            dialogFormVisible: false,
            form: {},
            loading1: false
        };
    },
    created() {
        this.getinformation();
    },
    mounted() {},
    methods: {
        getinformation() {
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        },
        click() {
            this.$confirm("。。。。。信息。。。。。, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        click1() {
            this.getinformation();
        },
        comfirm() {
            this.dialogFormVisible = false;
            this.loading1 = true;
            setTimeout(() => {
                this.loading1 = false;
            }, 1000);
        }
    }
};
</script>



<style lang="scss">
</style>
