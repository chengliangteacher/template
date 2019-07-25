<template>
    <div>
        <div>
            <el-button @click="dialogFormVisible2=true">{{ tableTitle }}</el-button>
            <el-collapse>
                <el-collapse-item v-for="(item,index) in singleTableInfo" :key="index" :title="item.label" span="4">
                    <el-form :model="item" :inline="true">
                        <el-form-item label="配置列类型：">
                            <el-select v-model="item.type" clearable placeholder="请输入配置列类型">
                                <el-option value="normal" label="普通列"></el-option>
                                <el-option value="tag" label="状态列"></el-option>
                                <el-option value="operation" label="操作列"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-show="item.type" label="列名：">
                            <el-input v-model="item.label" clearable placeholder="请输入列名"></el-input>
                        </el-form-item>
                        <el-form-item v-show="item.type" label="列宽：">
                            <el-input v-model="item.width" clearable placeholder="请输入列宽"></el-input>
                        </el-form-item>
                        <el-form-item v-show="item.type" label="映射字段名：">
                            <el-input v-model="item.prop" clearable placeholder="请输入映射字段名"></el-input>
                        </el-form-item>
                        <el-form-item v-show="item.type && item.type === 'tag'" label="配置状态列">
                            <el-button @click="setstatetabletag(item)">点击配置状态列状态值</el-button>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-dialog title="配置表格列数" :visible.sync="dialogFormVisible2" width="20%">
            <el-input v-model="comleAmount" autocomplete="off" placeholder="请输入需配置表格列个数"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="comfimcomlenum">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="配置状态列tag状态" :visible.sync="dialogFormVisible3" width="60%">
            <div class="d-flex mt-10">
                <el-input v-model="tabletagAmount" class="w-30" autocomplete="off" placeholder="请输入状态个数"></el-input>
                <el-button class="w-30" @click="tabletagproduct">生成</el-button>
            </div>
            <div>
                <el-form v-for="(item,index) in tagEnum" :key="index" :model="item" :inline="true">
                    <el-form-item label="展示信息：">
                        <el-input v-model="item.showName" placeholder="请输入展示信息"></el-input>
                    </el-form-item>
                    <el-form-item label="提示颜色：">
                        <el-select v-model="item.style" placeholder="请选择提示颜色">
                            <el-option value="primary">primary</el-option>
                            <el-option value="success">success</el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="标志字段：">
                        <el-input v-model="item.value" placeholder="请输入标志字段"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="comfimtabnum">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            tablecollapse: "table",
            tableParams: {
                isShow: false, //是否展示tabs 若为false则所有数据不生效
                tabsFormInfoName: "status", //tabs
                data: [
                    {
                        label: "待审核",
                        name: "s-a", //注意！！！！！！！ name不能为单独字符串，最好限制为s-a，s-b这种
                        value: "1" //切换的状态值
                    },
                    {
                        label: "已审核",
                        name: "s-b", //注意！！！！！！！ name不能为单独字符串，最好限制为s-a，s-b这种
                        value: "2"
                    }
                ]
            },
            tableTitle: "请输入表格列数",
            dialogFormVisible2: false,
            singleTableInfo: [],
            tableInfo: [],
            tabsactiveName: "1",
            dialogFormVisible3: false,
            tagEnum: [],
            tabletagAmount: null,
            tableIndex: null,
            tableonedata: {
                label: "序号", //label值
                prop: "a", //绑定后台值
                width: "50px", //是否绑定宽度，null或者undefined 则宽度自适应
                type: "normal", //最简单的tableItem类
                operations: [
                    {
                        label: "删除",
                        btnStyle: "primary",
                        oType: "1", //操作类型， 1代表confirm类型，会弹出确认框让用户确认，确认以后会发送一次请求到后台
                        config: {
                            tipContent: "这是我的提示文案", //提示文案
                            successContent: "删除成功", //操作成功以后的文案
                            requestUrl: "/xxx/xxx/xxx",
                            localKey: "id", //当前绑定本地变量key
                            remoteKey: "id" //当前绑定远程变量key
                        }
                    },
                    {
                        label: "跳转",
                        btnStyle: "primary",
                        oType: "2", //操作类型，2代表跳转类型，会携带一定的参数并且跳转到某个路由
                        config: {
                            to: "/login",
                            queryEnum: [
                                {
                                    key: "id", //枚举映射
                                    value: "id"
                                },
                                {
                                    key: "ddid", //枚举映射
                                    value: "id"
                                }
                            ]
                        }
                    },
                    {
                        label: "弹窗",
                        btnStyle: "primary",
                        oType: "3", //操作类型，3代表dialog弹窗
                        config: {
                            width: 50, //默认宽度百分之50，数字类型
                            title: "这是一个dialog弹窗", //dialog标题文案
                            formInfo: {
                                labelWidth: 160 //默认form表单label宽度为160
                            }
                        }
                    }
                ]
            },
            multiTableInfo: [],
            comleAmount: null
        };
    },
    created() {},
    mounted() {},
    methods: {
        //=====================================改变上方tabs的值====================================//
        changetabistabs(val) {
            if (!val) {
                this.tableTitle = "请输入表格列数";
            } else {
                this.tableTitle = "请输入tab数";
            }
        },
        //=====================================配置状态列状态值====================================//
        setstatetabletag(val) {
            this.dialogFormVisible3 = true;
            this.tableIndex = val.id;
        },
        //=====================================配置表格列数====================================//
        comfimcomlenum() {
            const num = parseInt(this.comleAmount);
            for (let i = 0; i < num; i++) {
                this.singleTableInfo.push({ ...this.tableonedata, id: i + 1 });
            }
            this.dialogFormVisible2 = false;
        },
        //=====================================生成tag状态列枚举====================================//
        tabletagproduct() {
            const num = parseInt(this.tabletagAmount);
            for (let i = 0; i < num; i++) {
                this.tagEnum.push({
                    value: 1, //比如后台返回状态 0代表失败  1代表警告  2代表成功  那么对应为  0-error   1-warning    2-success
                    style: "primary",
                    showName: "警告"
                });
            }
        },
        //=====================================tabnum加入到表格配置参数====================================//
        comfimtabnum() {
            this.singleTableInfo[this.tableIndex - 1].tagEnum = this.tagEnum;
            this.dialogFormVisible3 = false;
        }
    }
};
</script>



<style lang="scss">
</style>
