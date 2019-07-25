<template>
    <div>
        <el-collapse v-show="collapseSerch.length!==0" v-model="activeName">
            <el-collapse-item v-for="(item,index) in collapseSerch" :key="index" :name="item.id">
                <div slot="title" class="d-flex">
                    <span>{{ item.label?item.label:"筛选条件配置" }}</span>
                </div>
                <el-form :model="item" :inline="true">
                    <el-form-item label="搜索框类型：">
                        <el-cascader v-model="item.selectedOptions" :options="options" clearable></el-cascader>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0" label="label：">
                        <el-input v-model="item.label" placeholder="请输入label"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0" label="vModel：">
                        <el-input v-model="item.vModel" placeholder="请输入vModel"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0" label="placeholder：">
                        <el-input v-model="item.placeholder" placeholder="请输入placeholder"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0 && (item.selectedOptions[0]==4 || item.selectedOptions[0]==5 || item.selectedOptions[0]==6)" label="format：">
                        <el-input v-model="item.dataConfig.format" placeholder="请输入format"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0 && (item.selectedOptions[0]==4 || item.selectedOptions[0]==5 || item.selectedOptions[0]==6)" label="valueFormat：">
                        <el-input v-model="item.dataConfig.valueFormat" placeholder="请输入valueFormat"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0 && item.selectedOptions[1]==21" label="下拉枚举值：">
                        <el-button @click="setselectModal(item)">点击配置本地下拉枚举值</el-button>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0 && (item.selectedOptions[1]==23 || item.selectedOptions[1]==24)" label="请求路径：">
                        <el-input v-model="item.selectConfig.remoteSelect.requestUrl" placeholder="请输入请求路径"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0 && (item.selectedOptions[1]==23 || item.selectedOptions[1]==24)" label="props-label：">
                        <el-input v-model="item.selectConfig.remoteSelect.label" placeholder="请输入下拉label映射字段"></el-input>
                    </el-form-item>
                    <el-form-item v-show="item.selectedOptions && item.selectedOptions.length!==0 && (item.selectedOptions[1]==23 || item.selectedOptions[1]==24)" label="props-value：">
                        <el-input v-model="item.selectConfig.remoteSelect.value" placeholder="请输入下拉value映射字段"></el-input>
                    </el-form-item>
                    <el-form-item label="操作：">
                        <el-button @click="deteserchone(item)">删除当前项</el-button>
                    </el-form-item>
                </el-form>
            </el-collapse-item>
        </el-collapse>
        <el-dialog title="配置个数" :visible.sync="dialogFormVisible" width="20%">
            <el-input v-model="serchAmount" autocomplete="off" placeholder="请输入需配置搜索框个数"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="homepage">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="配置本地枚举数组" :visible.sync="dialogFormVisible1" width="40%">
            <div class="d-flex mt-10">
                <el-input v-model="localSelectAmount" class="w-30" autocomplete="off" placeholder="请输入枚举项个数"></el-input>
                <el-button class="w-30" @click="setselectOption">生成配置项</el-button>
            </div>
            <div>
                <el-form v-for="(item,index) in localSelectData" :key="index" :model="item" :inline="true">
                    <el-form-item label="label：">
                        <el-input v-model="item.label" placeholder="请输入label"></el-input>
                    </el-form-item>
                    <el-form-item label="value：">
                        <el-input v-model="item.value" placeholder="请输入value"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="comfimLocalselect">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        isshowcollapse: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            srechData: {
                dataConfig: {
                    valueFormat: "yyyy-MM-dd",
                    format: "yyyy-MM-dd"
                },
                cascaderConfig: {
                    cascaderProps: {
                        label: "label",
                        value: "value",
                        children: "children"
                    }
                },
                selectConfig: {
                    //单选(多选)配置
                    localSelect: [], //单选框(多选框)本地数据
                    remoteSelect: {
                        //单选框(多选框)远程数据
                        requestUrl: "", //远程请求地址
                        //selectOptions: "", //远程单选框(多选框)数据名称
                        label: "label", //单选框(多选框)label显示的字段
                        value: "value" //单选框(多选框)value显示的字段
                    }
                }
            },
            collapseSerch: [],
            options: [
                {
                    value: "1",
                    label: "输入框",
                    children: [
                        {
                            value: "11",
                            label: "普通输入框"
                        },
                        {
                            value: "12",
                            label: "带清空的输入框"
                        }
                    ]
                },
                {
                    value: "2",
                    label: "单选框",
                    children: [
                        {
                            value: "21",
                            label: "单选框(普通)"
                        },
                        {
                            value: "22",
                            label: "单选框(可清空)"
                        },
                        {
                            value: "23",
                            label: "单选框(远程)"
                        },
                        {
                            value: "24",
                            label: "单选框(远程全部)"
                        }
                    ]
                },
                {
                    value: "3",
                    label: "多选框",
                    children: [
                        {
                            value: "31",
                            label: "多选框(远程)"
                        },
                        {
                            value: "32",
                            label: "多选框(远程可清空)"
                        }
                    ]
                },
                {
                    value: "4",
                    label: "单日期",
                    children: [
                        {
                            value: "41",
                            label: "单日期(默认)"
                        },
                        {
                            value: "42",
                            label: "单日期(大于今天)"
                        },
                        {
                            value: "43",
                            label: "单日期(大于等于今天)"
                        },
                        {
                            value: "44",
                            label: "单日期(小于今天)"
                        },
                        {
                            value: "45",
                            label: "单日期(小于等于今天)"
                        }
                    ]
                },
                {
                    value: "5",
                    label: "多日期",
                    children: [
                        {
                            value: "51",
                            label: "多日期(默认)"
                        },
                        {
                            value: "52",
                            label: "多日期(大于今天)"
                        },
                        {
                            value: "53",
                            label: "多日期(大于等于今天)"
                        },
                        {
                            value: "54",
                            label: "多日期(小于今天)"
                        },
                        {
                            value: "55",
                            label: "多日期(小于等于今天)"
                        }
                    ]
                },
                {
                    value: "6",
                    label: "日期时间",
                    children: [
                        {
                            value: "61",
                            label: "日期时间(默认)"
                        },
                        {
                            value: "62",
                            label: "日期时间(大于今天)"
                        },
                        {
                            value: "63",
                            label: "日期时间(大于等于今天)"
                        },
                        {
                            value: "64",
                            label: "日期时间(小于今天)"
                        },
                        {
                            value: "65",
                            label: "日期时间(小于等于今天)"
                        }
                    ]
                },
                {
                    value: "7",
                    label: "级联",
                    children: [
                        {
                            value: "71",
                            label: "级联(默认)"
                        },
                        {
                            value: "72",
                            label: "级联(远程)"
                        }
                    ]
                }
            ],
            isSerch: false,
            title: "新增搜索",
            activeName: "1",
            dialogFormVisible: false,
            dialogFormVisible1: false,
            serchAmount: null,
            localSelectAmount: null,
            localIndex: 0,
            localSelectData: []
        };
    },
    watch: {
        isshowcollapse() {
            this.dialogFormVisible = true;
        }
    },
    created() {},
    mounted() {},
    methods: {
        //=====================================删除搜索项====================================//
        deteserchone(val) {
            this.collapseSerch = this.collapseSerch
                .filter(item => item.id !== val.id)
                .map((item, index) => {
                    return Object.assign(item, {
                        id: index + 1
                    });
                });
        },
        //=====================================选择框类型change====================================//
        handleChange(val) {},
        //=====================================设置本地枚举项====================================//
        setselectOption() {
            this.collapseSerch[this.localIndex].selectConfig.localSelect = [];
            const num = parseInt(this.localSelectAmount);
            for (let i = 0; i < num; i++) {
                this.localSelectData.push({
                    label: null,
                    value: null
                });
            }
        },
        //=====================================主页click====================================//
        homepage() {
            const num = parseInt(this.serchAmount);
            if (num > 30) {
                this.$confirm(`你确定配置这么多?`, "?", {
                    confirmButtonText: "确定",
                    showCancelButton: false,
                    type: "error"
                });
                return;
            }
            for (let i = 0; i < num; i++) {
                this.collapseSerch.push({
                    id: this.collapseSerch.length + 1,
                    ...this.srechData
                });
            }
            this.dialogFormVisible = false;
        },
        //=====================================本地枚举项配置弹框====================================//
        setselectModal(val) {
            this.localIndex = val.id - 1;
            this.dialogFormVisible1 = true;
            this.localSelectData = this.collapseSerch[
                this.localIndex
            ].selectConfig.localSelect;
        },
        //=====================================确定后为数组赋值====================================//
        comfimLocalselect() {
            this.collapseSerch[this.localIndex].selectConfig.localSelect = [
                ...this.localSelectData
            ];
            this.dialogFormVisible1 = false;
        }
    }
};
</script>



<style lang="scss">
</style>
