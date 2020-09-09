/*
    创建者：chengliang
    创建时间：2019-05-27 10:05
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <el-table :data="tableInfo" stripe border size="mini" height="450px">
        <el-table-column prop="x" label="序号2" align="center"></el-table-column>
        <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
                <el-button type="primary" size="small">审核{{ scope.row }}</el-button>
                <el-button type="success" size="small">查看</el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
    data() {
        return {
            tableInfo: [],
        };
    },
    created() {},
    methods: {}
};
</script>



<style lang="scss">
</style>
