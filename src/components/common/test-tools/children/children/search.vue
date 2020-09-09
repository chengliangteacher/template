/*
    创建者：chengliang
    创建时间：2019-05-07 17:33
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <el-table :data="tableInfo" stripe border size="mini">
        <el-table-column label="label-vModel-placeholder" align="center" width="300px">
            <template slot-scope="scope">
                <el-input v-model="scope.row.label" size="mini" placeholder="请输入label" class="w-30"></el-input>
                <el-input v-model="scope.row.vModel" size="mini" placeholder="请输入v-model绑定的值" class="w-30"></el-input>
                <el-input v-model="scope.row.placeholder" size="mini" placeholder="placeholder(非必填)" class="w-30"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="类型" align="center">
            <template slot-scope="scope">
                <el-cascader v-model="scope.row.inputType" :options="options" size="mini"></el-cascader>
                <el-input 
                        v-if="scope.row.inputType[0] === 7"
                        v-model="scope.row.propsLabel" 
                        size="mini" 
                        placeholder="label" 
                        :disabled="scope.row.inputType[0] !== 7"
                >
                </el-input>
                <el-input 
                        v-if="scope.row.inputType[0] === 7"
                        v-model="scope.row.propsValue" 
                        size="mini" 
                        placeholder="value" 
                        :disabled="scope.row.inputType[0] !== 7"
                >
                </el-input>
                <el-input 
                        v-if="scope.row.inputType[0] === 7"
                        v-model="scope.row.propsChildren" 
                        size="mini" 
                        placeholder="children" 
                        :disabled="scope.row.inputType[0] !== 7"
                >
                </el-input>
            </template>
        </el-table-column>
        <el-table-column label="后台返回值key,value" align="center">
            <template slot-scope="scope">
                <el-input 
                        v-model="scope.row.optionsKey" 
                        size="mini" 
                        placeholder="key" 
                        :disabled="scope.row.inputType[scope.row.inputType.length - 1] !== 23 && scope.row.inputType[scope.row.inputType.length - 1] !== 24 && scope.row.inputType[scope.row.inputType.length - 1] !== 31 && scope.row.inputType[scope.row.inputType.length - 1] !== 32"
                >
                </el-input>
                <el-input 
                        v-model="scope.row.optionsValue" 
                        size="mini" 
                        placeholder="key" 
                        :disabled="scope.row.inputType[scope.row.inputType.length - 1] !== 23 && scope.row.inputType[scope.row.inputType.length - 1] !== 24 && scope.row.inputType[scope.row.inputType.length - 1] !== 31 && scope.row.inputType[scope.row.inputType.length - 1] !== 32"
                >
                </el-input>
            </template>
        </el-table-column>
        <el-table-column label="日期format和formatValue" align="center">
            <template slot-scope="scope">
                <el-input 
                        v-model="scope.row.format" 
                        size="mini" 
                        placeholder="显示格式yy-MM-dd" 
                        :disabled="scope.row.inputType[0] !== 4 && scope.row.inputType[0] !== 5 && scope.row.inputType[0] !== 6"
                >
                </el-input>
                <el-input 
                        v-model="scope.row.formatValue" 
                        size="mini" 
                        placeholder="绑定值格式yy-MM-dd" 
                        :disabled="scope.row.inputType[0] !== 4 && scope.row.inputType[0] !== 5 && scope.row.inputType[0] !== 6"
                >
                </el-input>
            </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px">
            <template slot-scope="scope">
                <el-button type="success" size="mini" @click="addTableInfo">新增</el-button>
                <el-button type="danger" size="mini" @click="deleteTableInfo(scope.$index)">删除</el-button>
            </template>
        </el-table-column>
    </el-table> 
</template>

<script>
/* eslint-disable */

export default {
    data() {
        return {
            //=====================================table数据====================================//
            tableInfo: [
                {
                    label: "",  //label值
                    vModel: "", //v-model绑定的值
                    placeholder: "", //placeholder的值
                    optionsKey: "", //单选框options的key
                    optionsValue: "", // 单选框options的value
                    propsLabel: "label", // 级联选择器props的值
                    propsValue: "value", // 级联选择器props的值
                    propsChildren: "children", // 级联选择器props的值
                    format: "yyyy-MM-dd", //时间format参数
                    formatValue: "yyyy-MM-dd",//时间formatValue值
                    inputType: [], //当前搜索框类型
                    httpUrl: "", //远程请求地址
                }
            ],
            // //=====================================相关字符串====================================//
            // colsStr: `<el-row>
            //             <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
            //                 ####
            //             </el-col>
            //         </el-row>`, //响应式字符串模板
            //=====================================搜索input框类型====================================//
            options: [
                {
                    label: "输入框",
                    value: Math.random(),
                    children: [
                        {
                            label: "输入框(普通)",
                            value: 11
                        },
                        {
                            label: "输入框(可清空)",
                            value: 12
                        }
                    ]
                },
                {
                    label: "单选框",
                    value: Math.random(),
                    children: [
                        {
                            label: "单选框(普通)",
                            value: 21
                        },
                        {
                            label: "单选框(可清空)",
                            value: 22
                        },
                        {
                            label: "单选框(远程)",
                            value: 23
                        },
                        {
                            label: "单选框(全部)",
                            value: 24
                        }
                    ]
                },
                {
                    label: "多选框",
                    value: Math.random(),
                    children: [
                        {
                            label: "多选框(远程)",
                            value: 31
                        },
                        {
                            label: "多选框(可清空)",
                            value: 32
                        },
                       
                    ]
                },
                {
                    label: "单日期",
                    value: 4,
                    children: [
                        {
                            label: "单日期(默认)",
                            value: 41
                        },
                        {
                            label: "单日期(大于今天)",
                            value: 42
                        },
                        {
                            label: "单日期(大于等于今天)",
                            value: 43
                        },
                        {
                            label: "单日期(小于今天)",
                            value: 44
                        },
                        {
                            label: "单日期(小于等于今天)",
                            value: 45
                        },
                        {
                            label: "单日期(时间戳)",
                            value: 46,
                            disabled: true
                        },
                       
                    ]
                },
                {
                    label: "多日期",
                    value: 5,
                    children: [
                        {
                            label: "多日期(默认)",
                            value: 51
                        },
                        {
                            label: "多日期(大于今天)",
                            value: 52
                        },
                        {
                            label: "多日期(大于等于今天)",
                            value: 53
                        },
                        {
                            label: "多日期(小于今天)",
                            value: 54
                        },
                        {
                            label: "多日期(小于等于今天)",
                            value: 55
                        },
                        {
                            label: "多日期(时间戳)",
                            value: 56,
                            disabled: true
                        },
                       
                    ]
                },
                {
                    label: "日期时间",
                    value: 6,
                    children: [
                        {
                            label: "日期时间(默认)",
                            value: 61
                        },
                        {
                            label: "日期时间(大于今天)",
                            value: 62
                        },
                        {
                            label: "日期时间(大于等于今天)",
                            value: 63
                        },
                        {
                            label: "日期时间(小于今天)",
                            value: 64
                        },
                        {
                            label: "日期时间(小于等于今天)",
                            value: 65
                        },
                        {
                            label: "日期时间(时间戳)",
                            value: 66,
                            disabled: true
                        },
                       
                    ]
                },
                {
                    label: "级联",
                    value: 7,
                    children: [
                        {
                            label: "级联(默认)",
                            value: 71
                        },
                        {
                            label: "级联(远程数据)",
                            value: 72,
                            disabled: true
                        },
                    ]
                },
            ],
        };
    },
    watch: {
        tableInfo: {
            handler(val) {
                const prevVal = val[val.length - 1];
                if (prevVal.name !== "" && prevVal.vModel !== "" && prevVal.inputType.length !== 0) {
                    this.$store.commit("changeSearchInfo", val);
                }
            },
            deep: true
        }
    },
    methods: {
        //=====================================新增搜索框table====================================//
        addTableInfo() {
            const prevTable = this.tableInfo[this.tableInfo.length - 1];
            if (prevTable.name === "" || prevTable.vModel === "" || prevTable.inputType.length === 0) {
                this.$message.warning("请填写完毕上一个search信息");
                return;
            }
            this.tableInfo.push({
                label: "",  //label值
                vModel: "", //v-model绑定的值
                placeholder: "", //placeholder的值
                optionsKey: "", //单选框options的key
                optionsValue: "", // 单选框options的value
                propsLabel: "label", // 级联选择器props的值
                propsValue: "value", // 级联选择器props的值
                propsChildren: "children", // 级联选择器props的值
                format: "yyyy-MM-dd", //时间format参数
                formatValue: "yyyy-MM-dd",//时间formatValue值
                inputType: [], //当前搜索框类型
                httpUrl: "", //远程请求地址
            });
        },
        //=====================================删除搜索框====================================//
        deleteTableInfo(index) {
            if (this.tableInfo.length === 1) {
                this.tableInfo = [
                    {
                        label: "",  //label值
                        vModel: "", //v-model绑定的值
                        placeholder: "", //placeholder的值
                        optionsKey: "", //单选框options的key
                        optionsValue: "", // 单选框options的value
                        propsLabel: "label", // 级联选择器props的值
                        propsValue: "value", // 级联选择器props的值
                        propsChildren: "children", // 级联选择器props的值
                        format: "yyyy-MM-dd", //时间format参数
                        formatValue: "yyyy-MM-dd",//时间formatValue值
                        inputType: [], //当前搜索框类型
                        httpUrl: "", //远程请求地址
                    }
                ];
            } else {
                this.tableInfo.splice(index, 1);
            }
        },
        //=====================================formatData====================================//
        addInputAttr(val) {
            val = val.replace("###name###", `${val.name}`);//新增name
            val = val.replace("###vModel###", `formInfo.${val.vModel}`);//新增v-model
            val = val.replace("###placeholder###", `--${val.placeholder || ('请输入' + val.placeholder)}--`);//新增placeholder
            return this.colsStr.replace("####", val);
        }
    }
};
</script>



<style lang="scss">
</style>
