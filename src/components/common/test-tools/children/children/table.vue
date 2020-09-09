/*
    创建者：chengliang
    创建时间：2019-05-07 17:33
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div>
        <el-table :data="tableInfo.table" stripe border size="mini">
            <el-table-column label="table标题" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.label" size="mini" placeholder="请输入标题"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="table值" align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.vModel" size="mini" placeholder="请输入v-model绑定的值"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200px">
                <template slot-scope="scope">
                    <el-button type="success" size="mini" @click="addTableInfo">新增</el-button>
                    <el-button type="danger" size="mini" @click="deleteTableInfo(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>     
        <div>
            <h2 class="f-sm f-normal teal">表格操作</h2>
            <div v-for="(item, index) in tableInfo.operation" :key="index" class="d-flex">
                <el-input v-model="item.key" size="mini" placeholder="操作名称" class="w-10"></el-input>    
                <el-radio-group v-model="item.type">
                    <el-radio label="1">弹窗审核</el-radio>
                    <el-radio label="2"></el-radio>
                </el-radio-group>
                <el-input v-model="item.value" size="mini" placeholder="操作类型" class="w-30"></el-input>    
                <el-input v-model="item.value" size="mini" placeholder="操作类型" class="w-30"></el-input>    
                <el-button size="mini" type="success">新增</el-button>    
            </div>
            
        </div>    
    </div>

</template>

<script>
/* eslint-disable */

export default {
    data() {
        return {
            //=====================================table数据====================================//
            tableInfo: {
                operation: [
                    {
                        key: "",
                        type: "",
                        value: ""
                    }
                ],
                table: [
                    {
                        label: "",  //label值
                        vModel: "", //v-model绑定的值
                    }
                ]
            },
          
        };
    },
    watch: {
        tableInfo: {
            handler(val) {
               
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
            });
        },
        //=====================================删除搜索框====================================//
        deleteTableInfo(index) {
            if (this.tableInfo.length === 1) {
                this.tableInfo = [
                    {
                        label: "",  //label值
                        vModel: "", //v-model绑定的值
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
