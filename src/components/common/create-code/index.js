/* eslint-disable */
import metaData from "./children/desc"
import searchTemplate from "./children/search-map"
import tableTemplateMap from "./children/table-map"

const WORDNAME = ["a","b","c","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];

class GenerateCode {
    constructor() {
        //===================================搜索展示页面======================================//
        this.template = "";
        this.tabsTemplate = "";
        this.singleTableTemplate = "",
        this.multiTableTemplate = "",
        this.dialogTemplate = "",
        this.formInfoData = "";
        this.params = "";
        this.data = "";
        this.created = "";
        this.methods = "";
        this.watch = "";
        this.components = "";
        this.import = "";
        //====================================table页面=====================================//
        this.tableTemplate = "";
        this.tableParams = "";
        this.tableCreated = "";
        this.tableMethods = "";
        this.tableProps = "";

        //=====================================结果====================================//
        this.result = "";
        //=========================================================================//
        this.singleSelectOptionsIndex = 0; //远程单选select值
        this.multiSelectOptionsIndex = 0; //远程多选select值
        this.pickerOptionsIndex = 0; //时间格式过滤值
        this.tabsNameIndex = 0, //tabs命名的值 
        this.operationIndex = 0, //operation产生的数据
        this.dialogIndex = 0, //dialog计数器
        this.timeIndex = 0; //time时间临时存放变量，后台一般接收startTime和endTime不接受数组时间
    }
    //=====================================代码生成====================================//
    createCode(data) {
        let mutiTable = "";
        this.singleSelectOptionsIndex = 0; //清空远程单选值
        this.multiSelectOptionsIndex = 0;
        this.pickerOptionsIndex = 0;
        this.tabsNameIndex = 0, 
        this.operationIndex = 0, 
        this.timeIndex = 0;
        //创建search
        data.search.forEach(searchItem => {
            let itemType = searchItem.type;
            let bgType = itemType.toString().slice(0,1);
            let smType = itemType.toString().slice(1,2);
            switch (bgType) {
                case "1": //普通输入框
                    this.createInputTemplate(smType, searchItem); //创建模板
                    break;
                case "2": //单选框
                    this.createSingleSelectTemplate(smType, searchItem);
                    break;
                case "3": //多选框
                    this.createMultiSelectTemplate(smType, searchItem);
                    break;
                case "4": //单日期
                    this.createData(smType, searchItem);
                    break;
                case "5": //多日期
                    this.createDataRange(smType, searchItem);
                    break;
                case "6": //日期时间
                    this.createDataTime(smType, searchItem);
                    break;
                case "7": //级联

                    break;
                default:
                    break;
            }
        })
        //创建reset
        this.methods += `//=====================================重置表格====================================//\nresetData() {
            this.formInfo = {${this.formInfoData}}
        },`

        //创建tabs
        if (data.table && data.table.tabs.isShow) {
            this.createTabs(data.table.tabs);
            mutiTable = this.createMultiTable(data.table.multiTableInfo);
            this.multiTableTemplate = `<components :is="tabsName" :search="formInfo"></components>`
            this.methods += `\n//=====================================获取数据====================================//\ngetData() {
                this.$ref[tabsName].getData();
            },`
        } else if (data.table) {     //判断data.table 防止未配置table时候报错
            this.createSingleTable(data.table.singleTableInfo);
        } else {    //判断data.table 防止未配置table时候报错
            this.methods += `\n//=====================================获取数据====================================//\ngetData() {
                
            },`
        }
        let template = `<template>
                            <div>
                                <!-- 搜索条件 -->
                                <s-card title="搜索条件">
                                    <el-form ref="form" :model="formInfo" label-width="150px">
                                        <el-row>
                                        ${this.template}
                                        </el-row>
                                        <div class="d-flex justify-center">
                                            <el-button size="small" type="primary" @click="getData">搜索</el-button>
                                            <el-button size="small" type="warning" @click="resetData">重置</el-button>
                                        </div>
                                    </el-form>
                                </s-card>
                                <!-- 表格展示 -->
                                <s-card title="数据展示">
                                    ${this.tabsTemplate}
                                    ${this.singleTableTemplate}
                                    ${this.multiTableTemplate}
                                </s-card>
                                <!-- dialog弹窗 -->
                                ${this.dialogTemplate}
                            </div>
                        </template>`;
        let script = `\n<script>
                            /* eslint-disable */
                            ${this.import}
                            export default {
                            components: {
                                ${this.components}
                            },
                            data() {
                                return {\n//==============================查询条件==============================//\nformInfo: {${this.formInfoData}},\n//==============================其他参数==============================//\n${this.data}};
                            },
                            watch: {${this.watch}},
                            created() {${this.created}},
                            methods: {${this.methods}}
                        };
                        </script>
                `;
        
        this.result = template + script + mutiTable;
        console.log(this.result)
        return this.result
    }
    //=====================================创建搜索框模板====================================//
    /* 
        @description  公用替换LVPG(label, v-model, placeholder, grid)
        @autor        chengliang
        @create       2019-05-23 14:00"
        @params       
        @return       
    */
    commonReplaceLVPG(LVPG, template) {
        let { label, vModel, placeholder, grid } = LVPG;
        let gridWrap = `<el-col :xs="${grid.xs}" :sm="${grid.sm}" :md="${grid.md}" :lg="${grid.lg}" :xl="${grid.xl}">
                            ####
                        </el-col>`;
        template = template.replace("###name###", label);
        template = template.replace("###vModel###", `formInfo.${vModel}`);
        template = template.replace("###placeholder###", placeholder ? placeholder : `请输入${label}`);
        return gridWrap.replace("####", template);
    }
    /* 
        @description  创建普通输入框template
        @autor        chengliang
        @create       2019-05-23 13:57"
        @params       type  1.普通输入框   2.可清空输入框
        @return       无
    */
    createInputTemplate(type, searchItem) {
        if (type == 1) { //普通输入框
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.a); 
            this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
        } else if (type == 2) { //可清空输入框
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.b); 
            this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
        }
    }
    /* 
        @description  创建单选框
        @autor        chengliang
        @create       2019-05-23 14:33"
        @params       type  1.单选框(固定值)  2.单选框(可清空)   3.单选框(远程)   4.单选框(远程全部)
        @return       
    */
    createSingleSelectTemplate(type, searchItem) {
        if (type == 1) { //单选框(固定值)
            let localSelect = "";
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.c); 
            searchItem.selectConfig.localSelect.forEach(val => {
                if (typeof val.value !== "string") {
                    throw new Error("本地单选框绑定值只能为数字");
                }
                localSelect += `<el-option label="${val.label}" value="${val.value}"></el-option>`
            })
            this.template = this.template.replace("###options###", localSelect);

                this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据

        } else if (type == 2) { //单选框(可清空)
            let localSelect = "";
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.d); 
            searchItem.selectConfig.localSelect.forEach(val => {
                if (typeof val.value !== "string") {
                    throw new Error("本地单选框绑定值只能为数字");
                }
                localSelect += `<el-option label="${val.label}" value="${val.value}"></el-option>`
            })
            this.template = this.template.replace("###options###", localSelect);

                this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
        } else if (type == 3) { //单选框(远程)
            let { label, value, requestUrl } = searchItem.selectConfig.remoteSelect;
            let singleSelectOptionsName = this.singleSelectOptionsIndex === 0 ? "singleSelectOptions" : `singleSelectOptions${this.singleSelectOptionsIndex + 1}`;
            let getSingleSelectOptionsName = this.singleSelectOptionsIndex === 0 ? "getSingleSelectOptions" : `getSingleSelectOptions${this.singleSelectOptionsIndex + 1}`;
            this.singleSelectOptionsIndex ++;
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.e); 
            this.template = this.template.replace("###selectOptions###", singleSelectOptionsName); 
            this.template = this.template.replace("###label###", label); 
            this.template = this.template.replace("###value###", value); 
            this.data += `${singleSelectOptionsName}: [],`; //增加data
            this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
            this.created += `this.${getSingleSelectOptionsName}();`; //增加created
            this.methods += `${getSingleSelectOptionsName}() {
                this.axios.get("${requestUrl.indexOf("/") === 0 ? requestUrl : ('/' + requestUrl)}").then(res => {
                    this.${singleSelectOptionsName} = res.data;
                }).catch(err => {
                    console.error(err);
                });
            },`
        } else if (type == 4) { //单选框(远程全部)
            let { label, value, requestUrl } = searchItem.selectConfig.remoteSelect;
            let singleSelectOptionsName = this.singleSelectOptionsIndex === 0 ? "singleSelectOptions" : `singleSelectOptions${this.singleSelectOptionsIndex + 1}`;
            let getSingleSelectOptionsName = this.singleSelectOptionsIndex === 0 ? "getSingleSelectOptions" : `getSingleSelectOptions${this.singleSelectOptionsIndex + 1}`;
            this.singleSelectOptionsIndex ++;
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.f); 
            this.template = this.template.replace("###selectOptions###", singleSelectOptionsName); 
            this.template = this.template.replace("###label###", label); 
            this.template = this.template.replace("###value###", value); 
            this.data += `${singleSelectOptionsName}: [],`; //增加data
            this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
            this.created += `this.${getSingleSelectOptionsName}();`; //增加created
            this.methods += `${getSingleSelectOptionsName}() {
                this.axios.get("${requestUrl.indexOf("/") === 0 ? requestUrl : ('/' + requestUrl)}").then(res => {
                    this.${singleSelectOptionsName} = res.data;
                }).catch(err => {
                    console.error(err);
                });
            },`
        }
    }

    /* 
        @description  创建多选框
        @autor        chengliang
        @create       2019-05-23 16:40"
        @params       type  1.多选框(远程)    2.多选框(远程可清空)
        @return       
    */
    createMultiSelectTemplate(type, searchItem) {
        if (type == 1) {
            let { label, value, requestUrl } = searchItem.selectConfig.remoteSelect;
            let multiSelectOptionsName = this.multiSelectOptionsIndex === 0 ? "multiSelectOptions" : `multiSelectOptions${this.multiSelectOptionsIndex + 1}`;
            let getMultiOptionsName = this.multiSelectOptionsIndex === 0 ? "getMultiSelectOptions" : `getMultiSelectOptions${this.multiSelectOptionsIndex + 1}`;
            this.multiSelectOptionsIndex ++;
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.g); 
            this.template = this.template.replace("###selectOptions###", multiSelectOptionsName); 
            this.template = this.template.replace("###label###", label); 
            this.template = this.template.replace("###value###", value); 
            this.data += `${multiSelectOptionsName}: [],`; //增加data
            this.formInfoData += `${searchItem.vModel}: [],//${searchItem.label}\n`; //增加formInfo数据
            this.created += `this.${getMultiOptionsName}();`; //增加created
            this.methods += `${getMultiOptionsName}() {
                this.axios.get("${requestUrl.indexOf("/") === 0 ? requestUrl : ('/' + requestUrl)}").then(res => {
                    this.${multiSelectOptionsName} = res.data;
                }).catch(err => {
                    console.error(err);
                });
            },`
        } else if (type == 2) {
            let { label, value, requestUrl } = searchItem.selectConfig.remoteSelect;
            let multiSelectOptionsName = this.multiSelectOptionsIndex === 0 ? "multiSelectOptions" : `multiSelectOptions${this.multiSelectOptionsIndex + 1}`;
            let getMultiOptionsName = this.multiSelectOptionsIndex === 0 ? "getMultiSelectOptions" : `getMultiSelectOptions${this.multiSelectOptionsIndex + 1}`;
            this.multiSelectOptionsIndex ++;
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.h); 
            this.template = this.template.replace("###selectOptions###", multiSelectOptionsName); 
            this.template = this.template.replace("###label###", label); 
            this.template = this.template.replace("###value###", value); 
            this.data += `${multiSelectOptionsName}: [],`; //增加data
            this.formInfoData += `${searchItem.vModel}: [],//${searchItem.label}\n`; //增加formInfo数据
            this.created += `this.${getMultiOptionsName}();`; //增加created
            this.methods += `${getMultiOptionsName}() {
                this.axios.get("${requestUrl.indexOf("/") === 0 ? requestUrl : ('/' + requestUrl)}").then(res => {
                    this.${multiSelectOptionsName} = res.data;
                }).catch(err => {
                    console.error(err);
                });
            },`
        }
    }
    /* 
        @description  创建单日期
        @autor        chengliang
        @create       2019-05-23 17:36"
        @params       type  1.单日期     2.单日期(大于今天)    3.单日期(大于等于今天)     4.单日期(小于今天)     5.单日期(小于等于今天)
        @return       
    */
    createData(type, searchItem) {
        let { valueFormat, format } = searchItem.dataConfig;
            
        this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
        if (type == 1) {
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.i);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
        } else if (type == 2) {
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.j);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)

            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() < Date.now();} },`;//增加data
        } else if (type == 3) {
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.j);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)

            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;} },`;//增加data
        } else if (type == 4) {
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.j);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)

            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;} },`;//增加data
        } else if (type == 5) {
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.j);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)

            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() >= Date.now();} },`;//增加data 
        }
    }

    /* 
        @description  创建日期范围
        @autor        chengliang
        @create       2019-05-23 22:00"
        @params       type  1.多日期     2.多日期(大于今天)    3.多日期(大于等于今天)    4.多日期(小于今天)    5.多日期(小于等于今天)
        @return       
    */
    createDataRange(type, searchItem) {
        let { valueFormat, format } = searchItem.dataConfig;
            
        this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
        if (type == 1) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.n);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
                
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.timeIndex ++;
            this.data += `${timeName}: [],`;//增加data
            

            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`

        } else if (type == 2) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.o);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
                
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() < Date.now();} },`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`

        } else if (type == 3) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.o);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;} },`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`
        } else if (type == 4) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.o);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;} },`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`
        } else if (type == 5) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.o);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() >= Date.now();} },`;//增加data 
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`
        }
    }

    /* 
        @description  创建日期时间范围
        @autor        chengliang
        @create       2019-05-23 23:10"
        @params       
        @return       
    */
    createDataTime(type, searchItem) {
        let { valueFormat, format } = searchItem.dataConfig;
            
        this.formInfoData += `${searchItem.vModel}: "",//${searchItem.label}\n`; //增加formInfo数据
        if (type == 1) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;
            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.s);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
                
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;this.timeIndex ++;
            this.data += `${timeName}: [],`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`

        } else if (type == 2) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.t);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() < Date.now();} },`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`

        } else if (type == 3) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.t);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() < Date.now() - 1000 * 60 * 60 * 24;} },`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`
        } else if (type == 4) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.t);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() > Date.now() - 1000 * 60 * 60 * 24;} },`;//增加data
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`
        } else if (type == 5) {
            let timeName = this.timeIndex === 0 ? "time" : `time${this.timeIndex + 1}`;
            let startTimeName = this.timeIndex === 0 ? "startTime" : `startTime${this.timeIndex + 1}`;
            let endTimeName = this.timeIndex === 0 ? "endTime" : `endTime${this.timeIndex + 1}`;

            this.template += this.commonReplaceLVPG(searchItem, searchTemplate.t);
            this.template = this.template.replace("###valueFormat###", valueFormat); 
            this.template = this.template.replace("###format###", format); 
            this.template = this.template.replace("###currentTime###", timeName); 
            
            this.timeIndex ++;

            let pickerOptionsName = this.pickerOptionsIndex === 0 ? "timePickerOptions" : `timePickerOptions${this.pickerOptionsIndex + 1}`;
            this.pickerOptionsIndex ++;
            this.template = this.template.replace("###pickerOptions###", pickerOptionsName)
            
            this.formInfoData += `${startTimeName}: "",`;
            this.formInfoData += `${endTimeName}: "",`;
            this.data += `${timeName}: [],`;//增加data
            this.data += `${pickerOptionsName}: { disabledDate(time) {return time.getTime() >= Date.now();} },`;//增加data 
            this.watch += `${timeName}: { 
                                        handler(val) { 
                                            if (val != null) {
                                                this.formInfo.${startTimeName} = val[0];
                                                this.formInfo.${endTimeName} = val[1];
                                            } else {
                                                this.formInfo.${startTimeName} = "";
                                                this.formInfo.${endTimeName} = "";                                                   
                                            }
                                        },
                                        deep: true
                            },`
        }
    }
    
    /* 
        @description  创建tabs
        @autor        chengliang
        @create       2019-05-27 10:30"
        @params       
        @return       
    */
    createTabs(data) {
        this.data += `tabsName: "s-${WORDNAME[this.tabsNameIndex]}",`;
        this.formInfoData += `${data.tabsFormInfoName}: "${data.data[0].value}"`;
        data.data.forEach(val => {
            let tabTemp = `<el-tab-pane label="${val.label}" name="s-${WORDNAME[this.tabsNameIndex]}" value="${val.value}"></el-tab-pane>\n`;
            this.tabsTemplate += tabTemp;
            this.components += `"s-${WORDNAME[this.tabsNameIndex]}": ${WORDNAME[this.tabsNameIndex]},`;
            this.import += `import ${WORDNAME[this.tabsNameIndex]} from "./children/${WORDNAME[this.tabsNameIndex]}"\n`;
            this.tabsNameIndex++;
        });
        this.tabsTemplate = `<el-tabs v-model="tabsName" @tab-click="handleClickTabs">
                                ${this.tabsTemplate}
                            </el-tabs>`
        this.methods += `handleClickTabs(val) {
                            this.formInfo.${data.tabsFormInfoName} = val.$attrs.value;
                        },`;
    }


    /* 
        @description  创建tableTemplate
        @autor        chengliang
        @create       2019-05-28 13:24"
        @params       
        @return       
    */
    createSingleTableTemplate(tableConfig) {
        let myTableTemp = "";
        let myDialogTemp = "";
        //=====================================转换枚举类型为tag值====================================//
        const convertEnumToHtml = (data) => {
            let result = "";
            data.tagEnum.forEach((tag, index) => {
                if (tag.showName) {
                    result += `<el-tag v-if="scope.row.${data.prop} === ${tag.value}">${tag.showName}</el-tag>`
                } else {
                    result += `<el-tag v-if="scope.row.${data.prop} === ${tag.value}">{{ scope.row.${data.prop} }}</el-tag>`
                }
            })
            result = `<el-table-column label="${data.label}" align="center" width="${data.width || ''}"><template slot-scope="scope">${result}</template></el-table-column>`
            return result;
        }
        //=====================================转换operation为代码====================================//
        const convertOperationToHtml = (data) => {
            let result = "";
            data.operations.forEach(op => {
                switch (op.oType) {
                    case "1": //1代表确认框
                        result += `<el-button type="${op.btnStyle}" size="mini" @click="confirm${this.operationIndex + 1}(scope.row)">${op.label}</el-button>`;
                        break;
                    case "2": //2代表跳转
                        result += `<el-button type="${op.btnStyle}" size="mini" @click="jump${this.operationIndex + 1}(scope.row)">${op.label}</el-button>`;
                        break;
                    case "3": //3代表弹窗编辑
                        result += `<el-button type="${op.btnStyle}" size="mini" @click="openDialog${this.dialogIndex + 1}(scope.row)">${op.label}</el-button>`;
                        break;
                    default:
                        break;
                }
            })
            result = `<el-table-column label="${data.label}" align="center" width="${data.width || ''}"><template slot-scope="scope">${result}</template></el-table-column>`
            return result;
        }
        //=====================================添加confirm方法和相关参数====================================//
        const addConfimMethods = (op) => {
            this.methods += `//=====================================confirm提示框====================================//
                            confirm${this.operationIndex + 1}(rowData) {
                                this.$confirm("${op.config.tipContent}", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                }).then(() => {
                                    this.axios.post("${op.config.requestUrl}", {${op.config.remoteKey}: rowData.${op.config.localKey}}).then(res => {
                                        this.$message({type: "success",message: "${op.config.successContent}"});
                                        this.loading = false;
                                    }).catch(err => {
                                        console.error(err);
                                        this.loading = false;
                                    });
                                }).catch(() => {
                                    
                                });
                            },`
        }
        //=====================================添加jump方法和相关参数====================================//
        const addJumpMethods = (op) => {
            let query = "";
            op.config.queryEnum.forEach(val => {
                query += `${val.key}: rowData.${val.value},`
            })
            this.methods += `jump${this.operationIndex + 1}(rowData) {
                this.$router.push({path: "${op.config.to}", query: { ${query} }})
            },`
        }
        //==================================添加dialog弹窗和相关参数=======================================//
        const addDialogMethods = (op) => {
            //新增data
            this.data += `dialogVisible${this.dialogIndex+1}: false,currentDialogData${this.dialogIndex+1}: {},dialogData: {},`;
            //新增methods
            this.methods += `openDialog${this.dialogIndex + 1}(rowData) {
                                this.currentDialogData${this.dialogIndex + 1} = rowData;
                                this.dialogVisible${this.dialogIndex + 1} = true;
                            },`;
            this.methods += `handleDialogSubmit${this.dialogIndex + 1}() {
                                
                            },`;
            this.dialogTemplate += `<el-dialog title="${op.config.title}" :visible.sync="dialogVisible${this.dialogIndex + 1}" width="50%">
                                        <div>
                                            <el-form ref="form" :model="dialogData" label-width="${op.config.formInfo.labelWidth}px">
                                                
                                            </el-form>
                                        </div>
                                        <span slot="footer">
                                            <el-button type="primary" size="mini" @click="handleDialogSubmit${this.dialogIndex + 1}">确认添加</el-button>
                                            <el-button type="danger" size="mini" @click="dialogVisible${this.dialogIndex + 1} = false">取消</el-button>
                                        </span>
                                    </el-dialog>`
        }
        //=========================================================================//
        tableConfig.forEach(val => {
            switch (val.type) {
                case "normal":  //简单类型table
                    myTableTemp += `<el-table-column prop="${val.prop}" label="${val.label}" align="center" width="${val.width || ''}"></el-table-column>`;
                    break;
                case undefined:  //简单类型table
                    myTableTemp += `<el-table-column prop="${val.prop}" label="${val.label}" align="center" width="${val.width || ''}"></el-table-column>`;
                    break;
                case "tag":     //当类型为tag的时候
                    let tagTemp = convertEnumToHtml(val);
                    myTableTemp += tagTemp;
                    break;
                case "operation":
                    let operationTemp = convertOperationToHtml(val);
                    myTableTemp += operationTemp;                    
                    val.operations.forEach((op) => {
                        switch (op.oType) {
                            case "1": //类型为1代表确认框,添加方法
                                addConfimMethods(op);
                                break;
                            case "2": //类型为2代表跳转框
                                addJumpMethods(op);
                                break;
                            default:
                                addDialogMethods(op);
                                break;
                        }
                    })
                    this.operationIndex++;
                    break;
                default:
                    break;
            }
        })
        return myTableTemp
    }

    /* 
        @description  创建单个table
        @autor        chengliang
        @create       2019-05-27 16:28"
        @params       
        @return       
    */
    createSingleTable(data) {
        let tableTemplate = "";
        this.data += `tableInfo: [], params: {currentPage: 1, pageSize: 10},total: 0, pageSizes: [10, 20, 30], loading: false,`;
        this.created += `this.getTableData();`;
        //新增table基本数据
        const addTableCommonMethods = () => {
            this.methods += `
                                //=====================================获取table数据====================================//
                                getTableData() {
                                    this.axios.get("xxx", { params: this.params }).then(res => {
                                        this.tableInfo = res.data.rows;
                                        this.total = res.data.total;
                                        this.loading = false;
                                    }).catch(err => {
                                        console.error(err);
                                        this.loading = false;
                                    });
                                },
                                //=====================================分页====================================//
                                handleSizeChange(val) {
                                    this.params.pageSize = val;
                                    this.getTableData();
                                },
                                handleCurrentChange(val) {
                                    this.params.currentPage = val;
                                    this.getTableData();
                                },
                            `;
        }
        addTableCommonMethods();
        tableTemplate = this.createSingleTableTemplate(data);
        this.singleTableTemplate = `
                                    <el-table :data="tableInfo" stripe border size="mini" height="450px">${tableTemplate}</el-table>
                                    <div class="d-flex justify-end">
                                        <el-pagination layout="total, sizes, prev, pager, next" :total="total" background :page-sizes="pageSizes" :page-size="params.pageSize" :current-page="params.currentPage" @size-change="handleSizeChange" @current-change="handleCurrentChange"></el-pagination>
                                    </div>`;
    }

    /* 
        @description  创建多table
        @autor        chengliang
        @create       2019-05-27 15:27"
        @params       
        @return       
    */
   createMultiTable(data) {
        let result = "";
        const createTableCode = (tableConfig) => {
            let result = tableTemplateMap.tableTemplate;
            let tableTemplate = "";
            let dialogTemplate = "";
            let methods = "";    
            let data = "";
            let operationIndex = 0;
            let dialogIndex = 0;
            //=====================================转换枚举类型为tag值====================================//
            const convertEnumToHtml = (data) => {
                let result = "";
                data.tagEnum.forEach((tag, index) => {
                    if (tag.showName) {
                        result += `<el-tag v-if="scope.row.${data.prop} === ${tag.value}">${tag.showName}</el-tag>`
                    } else {
                        result += `<el-tag v-if="scope.row.${data.prop} === ${tag.value}">{{ scope.row.${data.prop} }}</el-tag>`
                    }
                })
                result = `<el-table-column label="${data.label}" align="center" width="${data.width || ''}"><template slot-scope="scope">${result}</template></el-table-column>`
                return result;
            }
            //=====================================转换operation为代码====================================//
            const convertOperationToHtml = (data) => {
                let result = "";
                data.operations.forEach(op => {
                    switch (op.oType) {
                        case "1": //1代表确认框
                            result += `<el-button type="${op.btnStyle}" size="mini" @click="confirm${this.operationIndex + 1}(scope.row)">${op.label}</el-button>`;
                            break;
                        case "2": //2代表跳转
                            result += `<el-button type="${op.btnStyle}" size="mini" @click="jump${this.operationIndex + 1}(scope.row)">${op.label}</el-button>`;
                            break;
                        case "3": //3代表弹窗编辑
                            result += `<el-button type="${op.btnStyle}" size="mini" @click="openDialog${this.dialogIndex + 1}(scope.row)">${op.label}</el-button>`;
                            break;
                        default:
                            break;
                    }
                })
                result = `<el-table-column label="${data.label}" align="center" width="${data.width || ''}"><template slot-scope="scope">${result}</template></el-table-column>`
                return result;
            }
            //=====================================添加confirm方法和相关参数====================================//
            const addConfimMethods = (op) => {
                methods += `//=====================================confirm提示框====================================//
                            confirm${operationIndex + 1}(rowData) {
                                this.$confirm("${op.config.tipContent}", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning"
                                }).then(() => {
                                    this.axios.post("${op.config.requestUrl}", {${op.config.remoteKey}: rowData.${op.config.localKey}}).then(res => {
                                        this.$message({type: "success",message: "${op.config.successContent}"});
                                        this.loading = false;
                                    }).catch(err => {
                                        console.error(err);
                                        this.loading = false;
                                    });
                                }).catch(() => {
                                    
                                });
                            },`
            }
            //=====================================添加jump方法和相关参数====================================//
            const addJumpMethods = (op) => {
                let query = "";
                op.config.queryEnum.forEach(val => {
                    query += `${val.key}: rowData.${val.value},`
                })
                methods += `jump${this.operationIndex + 1}(rowData) {
                    this.$router.push({path: "${op.config.to}", query: { ${query} }})
                },`
            }
            //==================================添加dialog弹窗和相关参数=======================================//
            const addDialogMethods = (op) => {
                //新增data
                data += `dialogVisible${dialogIndex+1}: false,currentDialogData${dialogIndex+1}: {},dialogData: {},`;
                //新增methods
                methods += `openDialog${dialogIndex + 1}(rowData) {
                                    this.currentDialogData${dialogIndex + 1} = rowData;
                                    this.dialogVisible${dialogIndex + 1} = true;
                                },`;
                methods += `handleDialogSubmit${dialogIndex + 1}() {
                                    
                                },`;
                dialogTemplate += `<el-dialog title="${op.config.title}" :visible.sync="dialogVisible${dialogIndex + 1}" width="50%">
                                            <div>
                                                <el-form ref="form" :model="dialogData" label-width="${op.config.formInfo.labelWidth}px">
                                                    
                                                </el-form>
                                            </div>
                                            <span slot="footer">
                                                <el-button type="primary" size="mini" @click="handleDialogSubmit${dialogIndex + 1}">确认添加</el-button>
                                                <el-button type="danger" size="mini" @click="dialogVisible${dialogIndex + 1} = false">取消</el-button>
                                            </span>
                                        </el-dialog>`;
            }

            //生成一个数据
            tableConfig.forEach(config => {
                switch (config.type) {
                    case "normal":  //简单类型table
                        tableTemplate += `<el-table-column prop="${config.prop}" label="${config.label}" align="center" width="${config.width || ''}"></el-table-column>`;
                        break;
                    case undefined:  //简单类型table
                        tableTemplate += `<el-table-column prop="${config.prop}" label="${config.label}" align="center" width="${config.width || ''}"></el-table-column>`;
                        break;
                    case "tag":     //当类型为tag的时候
                        tableTemplate += convertEnumToHtml(config);
                        break;
                    case "operation":
                        tableTemplate += convertOperationToHtml(config);                 
                        config.operations.forEach((op) => {
                            switch (op.oType) {
                                case "1": //类型为1代表确认框,添加方法
                                    addConfimMethods(op);
                                    break;
                                case "2": //类型为2代表跳转框
                                    addJumpMethods(op);
                                    break;
                                default:
                                    addDialogMethods(op);
                                    break;
                            }
                        })
                        break;
                    default:
                        break;
                }
            })
            result = result.replace("###table-column###", tableTemplate);
            result = result.replace("###dialog###", dialogTemplate);
            result = result.replace("###params###", data);
            result = result.replace("###methods###", methods);
            return result;
        }
        
        data.forEach(tableConfig => {
            result += `###############################################${createTableCode(tableConfig)}`;
        })
        return result;
   }
}


export default GenerateCode
























