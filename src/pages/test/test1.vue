<template>
    <div>
        <s-card title="代码片段" class="mt-10">
            <el-button @click="isshowcollapse=!isshowcollapse">数据筛选</el-button>
            <el-button @click="istableshow=!istableshow">数据展示</el-button>
            <el-button class="tag-read" :data-clipboard-text="codeResult" @click="createCodepage">生成并复制代码</el-button>
            <test-serch ref="testserch" :isshowcollapse="isshowcollapse"></test-serch>
            <el-collapse v-show="istableshow" v-model="tablecollapse">
                <el-collapse-item name="table">
                    <div slot="title" class="d-flex">
                        <span>表格配置</span>
                    </div>
                    <span>请选择是否为多表格：</span>
                    <el-select v-model="istabsShow" clearable placeholder="请选择是否为多表格">
                        <el-option :value="true" label="是"></el-option>
                        <el-option :value="false" label="否"></el-option>
                    </el-select>
                    <test-table v-if="!istabsShow" ref="testtable"></test-table>
                    <!-- <test-tables v-else></test-tables> -->
                    <div v-else>
                        <el-button @click="settabsnum">请设置tabs数量</el-button>
                        <el-collapse>
                            <el-collapse-item v-for="(item,index) in tableParams.data" :key="index" :name="`table${index}`">
                                <div slot="title" class="d-flex">
                                    <span>tab {{ index+1 }}</span>
                                </div>
                                <el-form :model="item" :inline="true">
                                    <el-form-item label="tablabel">
                                        <el-input v-model="item.label" placeholder="请输入tab对应label值"></el-input>
                                    </el-form-item>
                                    <el-form-item label="tabname">
                                        <el-input v-model="item.name" placeholder="请输入tab对应name值"></el-input>
                                    </el-form-item>
                                    <el-form-item label="tabvalue">
                                        <el-input v-model="item.value" placeholder="请输入tab对应value值"></el-input>
                                    </el-form-item>
                                </el-form>
                                <test-table :ref="'tabTable' + (index+1)" class="mt-10"></test-table>
                            </el-collapse-item>
                        </el-collapse>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </s-card>
        <el-dialog title="设置tabs数量" :visible.sync="dialogTableVisible" width="20%">
            <el-input v-model="tabsNum" autocomplete="off" placeholder="请输入需配置tabs个数"></el-input>
            <el-input v-model="tableParams.tabsFormInfoName" autocomplete="off" placeholder="请输入后台映射值"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="comfirmtabs">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import CreateCode from "@/components/common/create-code";
import testTable from "./children/test1-table";
// import testTables from "./children/test1-tables";
import testSerch from "./children/test1-serch";
import Clipboard from "clipboard";
// import { exportFile } from "@/lib/utils";
const foo = new CreateCode();
export default {
    components: {
        "test-table": testTable,
        // "test-tables": testTables,
        "test-serch": testSerch
    },
    data() {
        return {
            isshowcollapse: false,
            codeResult: [],
            istableshow: false,
            istabsShow: false,
            tabsNum: null,
            dialogTableVisible: false,
            tablecollapse: null,
            tableParams: { data: [], tabsFormInfoName: "", isShow: false },
            multiTableInfo: []
        };
    },
    created() {},
    mounted() {},
    methods: {
        //=====================================生成代码====================================//
        createCodepage() {
            const search = this.$refs.testserch.collapseSerch.map(item => {
                return {
                    label: item.label,
                    vModel: item.vModel,
                    placeholder: item.placeholder,
                    type: item.selectedOptions[1],
                    dataConfig: item.dataConfig,
                    selectConfig: item.selectConfig,
                    grid: {
                        xs: "24",
                        sm: "24",
                        md: "12",
                        lg: "8",
                        xl: "6"
                    },
                    cascaderConfig: item.cascaderConfig,
                    cascaderOptions: ""
                };
            });
            const multiTableInfo = [];
            console.log(this.$refs);
            if (this.istabsShow) {
                this.tableParams.data.forEach((item, index) => {
                    multiTableInfo.push(
                        this.$refs["tabTable" + (index + 1)][0].singleTableInfo
                    );
                });
            }
            const table = {
                tabs: Object.assign(this.tableParams, {
                    isShow: this.istabsShow
                }),
                singleTableInfo: this.$refs.testtable
                    ? this.$refs.testtable.singleTableInfo
                    : null,
                multiTableInfo: multiTableInfo
            };
            console.log(table);
            console.log({ search, table });
            foo.createCode({ search, table });
            console.log(foo.result);
            // this.codeResult = foo.result.split(
            //     "###############################################"
            // );
            // exportFile(this.codeResult[1])
            console.log("风格", this.codeResult);
            var clipboard = new Clipboard(".tag-read");
            clipboard.on("success", e => {
                this.$message({
                    message: "复制成功",
                    type: "success"
                });
                clipboard.destroy();
            });
            clipboard.on("error", e => {
                this.$message.error("当前浏览器不支持复制");
                clipboard.destroy();
            });
        },
        //=====================================设置多表格tabs数量====================================//
        settabsnum() {
            this.dialogTableVisible = true;
        },
        //=====================================确定配置tabs数量====================================//
        comfirmtabs() {
            const num = parseInt(this.tabsNum);
            for (let i = 0; i < num; i++) {
                this.tableParams.data.push({
                    label: "待审核",
                    name: "s-a", //注意！！！！！！！ name不能为单独字符串，最好限制为s-a，s-b这种
                    value: "1", //切换的状态值
                    id: i + 1
                });
            }
            this.dialogTableVisible = false;
        }
    }
};
</script>



<style lang="scss">
.mt-10 {
    margin-bottom: 10px;
}
</style>
