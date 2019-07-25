/*
    创建者：shuxiaokai
    创建时间：2019-05-07 17:33
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div>
        <el-button size="mini" @click="toggleSeachInfo">{{ searchText }}</el-button>
        <el-button size="mini" @click="toggleTable">{{ tableText }}</el-button>
        <el-button size="mini" @click="exportData">生成代码</el-button>
        <el-collapse v-model="activeNames">
            <el-collapse-item v-if="isShowSearch" title="条件搜索" name="1">
                <s-search></s-search>
            </el-collapse-item>
        </el-collapse>
        <el-collapse v-model="activeNames">
            <el-collapse-item v-if="isShowTable" title="表格" name="2">
                <s-table></s-table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
/* eslint-disable */
import search from "./children/search"
import table from "./children/table"
import searchMap from "./children/search-map"
export default {
    components: {
        "s-search": search,
        "s-table": table,
    },
    data() {
        return {

            //=====================================其他参数====================================//
            activeNames: "1",
            searchText: "新增搜索",
            isShowSearch: false,
            tableText: "新增表格",
            isShowTable: false
        };
    },
    methods: {
        //=====================================新增删除搜索框====================================//
        toggleSeachInfo() {
            this.isShowSearch = !this.isShowSearch;
            this.isShowSearch ? this.searchText = "删除搜索" : this.searchText = "新增搜索";
            this.isShowSearch ? this.activeNames = "1" : "";
        },
        toggleTable() {
            this.isShowTable = !this.isShowTable;
            this.isShowTable ? this.tableText = "删除表格" : this.tableText = "新增表格";
            this.isShowTable ? this.activeNames = "2" : "";
        },
        //=====================================生成数据====================================//
        exportData() {
            this.$store.commit("clearCurrentOptionsIndex"); //清除options计数器
            this.$store.commit("clearPickerOptions"); //清除pickerOptions计数器
            this.$store.commit("clearCascaderOptions"); //清除级联属性计数器
            this.$store.commit("clearPropsOptions"); //清除级联props计数器
            this.$store.commit("clearData"); //清除data数据
            this.$store.commit("clearMethods"); //清除所有方法
            this.$store.commit("clearCreated"); //清除所有created
            let searchInfo = this.$store.state.snippetData.searchInfo;
            let result = "";
            let data = {};
            searchInfo.forEach(val => {
                let type = val.inputType[val.inputType.length - 1];
                let tempIptStr = "";
                switch (type) {
                    case 11:    //普通输入框
                        var tmpInput = searchMap.a;
                        tempIptStr = this.assignLpv(val, tmpInput);
                        result += tempIptStr;
                        this.$store.commit("addData", {key: val.vModel, value: ""})
                        
                        break;
                    case 12:    //普通输入框(带清空)
                        var tmpInput = searchMap.b;
                        tempIptStr = this.assignLpv(val, tmpInput);
                        result += tempIptStr;
                        this.$store.commit("addData", {key: val.vModel, value: ""})
                        
                        break;
                    case 21:    //单选框(固定值)
                        var tmpInput = searchMap.c;
                        tempIptStr = this.assignLpv(val, tmpInput);
                        result += tempIptStr;
                        this.$store.commit("addData", {key: val.vModel, value: ""})
                        
                        break;
                    case 22:    //单选框(可清空)
                        var tmpInput = searchMap.d;
                        tempIptStr = this.assignLpv(val, tmpInput);
                        result += tempIptStr;
                        this.$store.commit("addData", {key: val.vModel, value: ""})
                        
                        break;
                    case 23:    //单选框(远程)
                        var tmpInput = searchMap.e;
                        var selectOptionsIndex = this.$store.state.snippetData.currentOptionIndex;
                        var selectOptionsName = "";
                        var selectMethodsName = "";
                        selectOptionsIndex === 0 ? selectOptionsName = "selectOptions" : selectOptionsName = `selectOptions${selectOptionsIndex}`;
                        selectOptionsIndex === 0 ? selectMethodsName = "getSelectOptions" : selectMethodsName = `getSelectOptions${selectOptionsIndex}`;
                        
                        this.$store.commit("addCurrentOptionsIndex");
                        tempIptStr = this.assignLpv(Object.assign(val, {optName: selectOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增created====================================//
                        this.$store.commit("addCreated", `this.${selectMethodsName}();`)
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: selectOptionsName, value: `[]`}); //新增单选框options名字
                        //=====================================新增methods====================================//
                        this.addMethods(1, {
                            url: val.httpUrl,
                            fnName: selectMethodsName
                        }); 
                        
                        break;
                    case 24:    //单选框(全部)
                        var tmpInput = searchMap.f;
                        var selectOptionsIndex = this.$store.state.snippetData.currentOptionIndex;
                        var selectOptionsName = "";
                        var selectMethodsName = "";
                        selectOptionsIndex === 0 ? selectOptionsName = "selectOptions" : selectOptionsName = `selectOptions${selectOptionsIndex}`;
                        selectOptionsIndex === 0 ? selectMethodsName = "getSelectOptions" : selectMethodsName = `getSelectOptions${selectOptionsIndex}`;
                        
                        this.$store.commit("addCurrentOptionsIndex");
                        tempIptStr = this.assignLpv(Object.assign(val, {optName: selectOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增created====================================//
                        this.$store.commit("addCreated", `this.${selectMethodsName}();`)
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: selectOptionsName, value: `[]`})//新增单选框options名字
                        //=====================================新增methods====================================//
                        this.addMethods(1, {
                            url: val.httpUrl,
                            fnName: selectMethodsName
                        }); 
                        
                        break;
                    case 31:    //多选框(远程)
                        var tmpInput = searchMap.g;
                        var selectOptionsIndex = this.$store.state.snippetData.currentOptionIndex;
                        var selectOptionsName = "";
                        var selectMethodsName = "";
                        selectOptionsIndex === 0 ? selectOptionsName = "selectOptions" : selectOptionsName = `selectOptions${selectOptionsIndex}`;
                        selectOptionsIndex === 0 ? selectMethodsName = "getSelectOptions" : selectMethodsName = `getSelectOptions${selectOptionsIndex}`;
                        
                        this.$store.commit("addCurrentOptionsIndex");
                        tempIptStr = this.assignLpv(Object.assign(val, {optName: selectOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增created====================================//
                        this.$store.commit("addCreated", `this.${selectMethodsName}();`)
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: selectOptionsName, value: `[]`})//新增单选框options名字
                        //=====================================新增methods====================================//
                        this.addMethods(1, {
                            url: val.httpUrl,
                            fnName: selectMethodsName
                        }); 
                        
                        break;
                    case 32:    //多选框(远程可清空)
                        var tmpInput = searchMap.h;
                        var selectOptionsIndex = this.$store.state.snippetData.currentOptionIndex;
                        var selectOptionsName = "";
                        var selectMethodsName = "";
                        selectOptionsIndex === 0 ? selectOptionsName = "selectOptions" : selectOptionsName = `selectOptions${selectOptionsIndex}`;
                        selectOptionsIndex === 0 ? selectMethodsName = "getSelectOptions" : selectMethodsName = `getSelectOptions${selectOptionsIndex}`;
                        
                        this.$store.commit("addCurrentOptionsIndex");
                        tempIptStr = this.assignLpv(Object.assign(val, {optName: selectOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增created====================================//
                        this.$store.commit("addCreated", `this.${selectMethodsName}();`)
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: selectOptionsName, value: `[]`})//新增单选框options名字
                        //=====================================新增methods====================================//
                        this.addMethods(1, {
                            url: val.httpUrl,
                            fnName: selectMethodsName
                        }); 
                        
                        break;
                    case 41:    //单日期(默认)
                        var tmpInput = searchMap.i;
                        tempIptStr = this.assignLpv(val, tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                    case 42:    //单日期(大于今天)
                        var tmpInput = searchMap.j;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//  
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() < Date.now();}}`})//新增pickerOptions          
                        
                        break;
                    case 43:    //单日期(大于等于今天)
                        var tmpInput = searchMap.k;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;}}`})//新增pickerOptions     
                        break;
                    case 44:    //单日期(小于今天)
                        var tmpInput = searchMap.l;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;}}`})//新增pickerOptions   
                        
                        break;
                    case 45:    //单日期(小于等于今天)
                        var tmpInput = searchMap.m;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: ""})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() >= Date.now();}}`})//新增pickerOptions   
                        
                        break;

                    case 51:    //多日期(默认)
                        var tmpInput = searchMap.n;
                        tempIptStr = this.assignLpv(val, tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                    case 52:    //多日期(大于今天)
                        var tmpInput = searchMap.o;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//  
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() < Date.now();}}`})//新增pickerOptions          
                        
                        break;
                    case 53:    //多日期(大于等于今天)
                        var tmpInput = searchMap.p;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;}}`})//新增pickerOptions     
                        break;
                    case 54:    //多日期(小于今天)
                        var tmpInput = searchMap.q;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;}}`})//新增pickerOptions   
                        
                        break;
                    case 55:    //多日期(小于等于今天)
                        var tmpInput = searchMap.r;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() >= Date.now();}}`})//新增pickerOptions   
                        
                        break;
                    
                    case 61:    //多日期(默认)
                        var tmpInput = searchMap.s;
                        tempIptStr = this.assignLpv(val, tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                    case 62:    //多日期(大于今天)
                        var tmpInput = searchMap.t;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//  
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() < Date.now();}}`})//新增pickerOptions          
                        
                        break;
                    case 63:    //多日期(大于等于今天)
                        var tmpInput = searchMap.u;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;}}`})//新增pickerOptions     
                        break;
                    case 64:    //多日期(小于今天)
                        var tmpInput = searchMap.v;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;}}`})//新增pickerOptions   
                        
                        break;
                    case 65:    //多日期(小于等于今天)
                        var tmpInput = searchMap.w;
                        var pickerOptionIndex = this.$store.state.snippetData.pickerOptionsIndex;
                        var pickerOptionsName = "";
                        pickerOptionIndex === 0 ? pickerOptionsName = "pickerOptions" : pickerOptionsName = `pickerOptions${pickerOptionIndex}`;
                        
                        this.$store.commit("addPickerOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {pickName: pickerOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: pickerOptionsName, value: `{disabledDate(time) {return time.getTime() >= Date.now();}}`})//新增pickerOptions   
                        
                        break;
                    case 71:    //级联(默认)
                        var tmpInput = searchMap.x;
                        var cascaderOptionsIndex = this.$store.state.snippetData.cascaderOptionsIndex;
                        var propsOptionIndex = this.$store.state.snippetData.propsOptionsIndex;
                        var cascaderOptionsName = "";
                        var propsOptionsName = "";
                        cascaderOptionsIndex === 0 ? cascaderOptionsName = "cascaderOptions" : cascaderOptionsName = `cascaderOptions${cascaderOptionsIndex}`;
                        propsOptionIndex === 0 ? propsOptionsName = "cascaderPropsOptions" : propsOptionsName = `cascaderPropsOptions${propsOptionIndex}`;
                        
                        this.$store.commit("addPropsOptions");
                        this.$store.commit("addCascaderOptions");
                        tempIptStr = this.assignLpv(Object.assign(val, {cascaderName: cascaderOptionsName, cascaderProps: propsOptionsName}), tmpInput); //更新插槽以后的input
                        result += tempIptStr;
                        //=====================================新增data属性 ====================================//         
                        this.$store.commit("addData", {key: val.vModel, value: `[]`})  //新增搜索变量
                        this.$store.commit("addData", {key: cascaderOptionsName, value: `[{label: "四川",value: 1,children: [{label: "成都",value: 2,}, {label: "绵阳",value: 3,}]}]`})//新增pickerOptions   
                        this.$store.commit("addData", {key: propsOptionsName, value: `{label: "${val.propsLabel}",value: "${val.propsValue}",children: "${val.propsChildren}"}`})//新增pickerOptions   
                        
                        break;

                        
                    default:
                        break;
                }
            });

            // this.$store.commit("changeData", data)

            console.log(searchInfo, result)
            console.log(this.$store.state.snippetData.data)
            console.log(this.$store.state.snippetData.methods)
        },
        //=====================================赋值输入框默认选项(lable-placeholder-vModel)====================================//
        assignLpv(data, template) {
            console.log("temp", data)
            let tempWrap = `<el-row>
                                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                                    ####
                                </el-col>
                            </el-row>`;
            template = template.replace("###name###", data.label);
            template = template.replace("###vModel###", data.vModel);
            template = template.replace("###placeholder###", data.placeholder ? data.placeholder : `请输入${data.label}`);
            if (data.optionsKey && data.optionsValue) { //单选框options
                template = template.replace("###label###", data.optionsKey);
                template = template.replace("###value###", data.optionsValue);
            }
            if (data.optName) {//多选框循环变量名称
                template = template.replace("###selectOptions###", data.optName);
            }
            if (data.pickName) {//时间选择pickerOptions
                template = template.replace("###pickerOptions###", data.pickName);
            }
            if (data.inputType[0] === 7 && data.cascaderName && data.propsOptionsName) { //级联选择器
                template = template.replace("###cascaderOptions###", data.cascaderName);
                template = template.replace("###cascaderProps###", data.propsOptionsName);
            }

            if ((data.inputType[0] === 4 || data.inputType[0] === 5) && data.format && data.formatValue) { //日期format，formatValue
                template = template.replace("###valueFormat###", data.formatValue);
                template = template.replace("###format###", data.format);
            }

            return tempWrap.replace("####", template);
        },
        //=====================================添加方法====================================//
        /* 
            @description  新增方法
            @autor        shuxiaokai
            @create       2019-05-21 13:59"
            @params       type 1代表获取selectOptions数据   
            @params       {
                            url: "",//代表获取请求的远程地址
                            fnName: "",//代表函数名字
            @params       }  
            @return       
        */
        addMethods(type, config) {
            switch (type) {
                case 1:
                    var { url, fnName } = config;
                    var fn = `${fnName}() {
                                    this.axios.get("${url}").then(res => {
                                        this.${fnName} = res.data;
                                    }).catch(err => {
                                        console.error(err);
                                    });
                                },
                    `;
                    this.$store.commit("addMethods", fn)
                    break;
            
                default:
                    break;
            }

        }

    }
};
</script>

                       

<style lang="scss">
</style>
