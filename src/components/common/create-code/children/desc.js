export default {
    /* 
        @description  搜索框结构
        @autor        shuxiaokai
        @create       2019-05-23 12:02"
        @params       

        type:   11.普通输入框         12.带清空的输入框
                21.单选框(固定值)     22.单选框(可清空)         23.单选框(远程)     24.单选框(远程全部)
                31.多选框(远程)       32.多选框(远程可清空)
                41.单日期             42.单日期(大于今天)       43.单日期(大于等于今天)      44.单日期(小于今天)       45.单日期(小于等于今天)
                51.多日期             52.多日期(大于今天)       53.多日期(大于等于今天)      54.多日期(小于今天)       55.多日期(小于等于今天)
                61.日期时间           62.日期时间(大于今天)      63.日期时间(大于等于今天)    64.日期时间(小于今天)     65.日期时间(小于等于今天)
                71.固定级联           72.级联(远程)
        @return       
    */
    search: [
        {
            //=====================================这四个参数为所有输入框共享====================================//
            label: "抽样单编号", //输入框的label属性
            vModel: "a", //默认搜索条件会添加formInfo前缀 fromInfo.a
            placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
            grid: {
                xs: "24",
                sm: "24",
                md: "12",
                lg: "8",
                xl: "6"
            }, //响应式配置
            //=====================================其余参数针对特殊类型进行处理====================================//
            type: "11", //参数类型，最好为字符串，默认情况会进行类型转换
            selectConfig: { //单选(多选)配置
                localSelect: [
                    { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
                    { label: "苹果", value: "2" },
                ], //单选框(多选框)本地数据       
                remoteSelect: { //单选框(多选框)远程数据    
                    requestUrl: "", //远程请求地址  
                    //selectOptions: "", //远程单选框(多选框)数据名称
                    label: "label", //单选框(多选框)label显示的字段
                    value: "value", //单选框(多选框)value显示的字段
                },                         
            },
            dataConfig: { //日期配置
                valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
                format: "yyyy-MM-dd", //呈现给用户的数据格式
                // pickerOptions: "", //时间过滤属性
            },
            cascaderConfig: { //级联选择器配置
                cascaderProps: { //级联选择props
                    label: "label",
                    value: "value",
                    children: "children", 
                }, 
                cascaderOptions: "", //级联选择器数据变量
            }
        },
        {
            //=====================================这四个参数为所有输入框共享====================================//
            label: "输入框可清除", //输入框的label属性
            vModel: "b", //默认搜索条件会添加formInfo前缀 fromInfo.a
            placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
            grid: {
                xs: "24",
                sm: "24",
                md: "12",
                lg: "8",
                xl: "6"
            }, //响应式配置
            //=====================================其余参数针对特殊类型进行处理====================================//
            type: "12", //参数类型，最好为字符串，默认情况会进行类型转换
            selectConfig: { //单选(多选)配置
                localSelect: [
                    { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
                    { label: "苹果", value: "2" },
                ], //单选框(多选框)本地数据       
                remoteSelect: { //单选框(多选框)远程数据    
                    requestUrl: "", //远程请求地址  
                    //selectOptions: "", //远程单选框(多选框)数据名称
                    label: "label", //单选框(多选框)label显示的字段
                    value: "value", //单选框(多选框)value显示的字段
                },                         
            },
            dataConfig: { //日期配置
                valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
                format: "yyyy-MM-dd", //呈现给用户的数据格式
                // pickerOptions: "", //时间过滤属性
            },
            cascaderConfig: { //级联选择器配置
                cascaderProps: { //级联选择props
                    label: "label",
                    value: "value",
                    children: "children", 
                }, 
                cascaderOptions: "", //级联选择器数据变量
            }
        },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单选框(固定值)", //输入框的label属性
        //     vModel: "c", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "21", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label", //单选框(多选框)label显示的字段
        //             value: "value", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单选框(可清空)", //输入框的label属性
        //     vModel: "d", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "22", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label", //单选框(多选框)label显示的字段
        //             value: "value", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单选框(远程)", //输入框的label属性
        //     vModel: "e", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "23", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label2", //单选框(多选框)label显示的字段
        //             value: "value2", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单选框(远程全部)", //输入框的label属性
        //     vModel: "f", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "24", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多选框(远程)", //输入框的label属性
        //     vModel: "g", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "31", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多选框(远程可清空)", //输入框的label属性
        //     vModel: "h", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "32", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        {
            //=====================================这四个参数为所有输入框共享====================================//
            label: "单日期(默认)", //输入框的label属性
            vModel: "i", //默认搜索条件会添加formInfo前缀 fromInfo.a
            placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
            grid: {
                xs: "24",
                sm: "24",
                md: "12",
                lg: "8",
                xl: "6"
            }, //响应式配置
            //=====================================其余参数针对特殊类型进行处理====================================//
            type: "41", //参数类型，最好为字符串，默认情况会进行类型转换
            selectConfig: { //单选(多选)配置
                localSelect: [
                    { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
                    { label: "苹果", value: "2" },
                ], //单选框(多选框)本地数据       
                remoteSelect: { //单选框(多选框)远程数据    
                    requestUrl: "/api/test", //远程请求地址  
                    //selectOptions: "", //远程单选框(多选框)数据名称
                    label: "label3", //单选框(多选框)label显示的字段
                    value: "value3", //单选框(多选框)value显示的字段
                },                         
            },
            dataConfig: { //日期配置
                valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
                format: "yyyy-MM-dd", //呈现给用户的数据格式
                // pickerOptions: "", //时间过滤属性
            },
            cascaderConfig: { //级联选择器配置
                cascaderProps: { //级联选择props
                    label: "label",
                    value: "value",
                    children: "children", 
                }, 
                cascaderOptions: "", //级联选择器数据变量
            }
        },
        {
            //=====================================这四个参数为所有输入框共享====================================//
            label: "单日期(大于今天)", //输入框的label属性
            vModel: "j", //默认搜索条件会添加formInfo前缀 fromInfo.a
            placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
            grid: {
                xs: "24",
                sm: "24",
                md: "12",
                lg: "8",
                xl: "6"
            }, //响应式配置
            //=====================================其余参数针对特殊类型进行处理====================================//
            type: "42", //参数类型，最好为字符串，默认情况会进行类型转换
            selectConfig: { //单选(多选)配置
                localSelect: [
                    { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
                    { label: "苹果", value: "2" },
                ], //单选框(多选框)本地数据       
                remoteSelect: { //单选框(多选框)远程数据    
                    requestUrl: "/api/test", //远程请求地址  
                    //selectOptions: "", //远程单选框(多选框)数据名称
                    label: "label3", //单选框(多选框)label显示的字段
                    value: "value3", //单选框(多选框)value显示的字段
                },                         
            },
            dataConfig: { //日期配置
                valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
                format: "yyyy-MM-dd", //呈现给用户的数据格式
                // pickerOptions: "", //时间过滤属性
            },
            cascaderConfig: { //级联选择器配置
                cascaderProps: { //级联选择props
                    label: "label",
                    value: "value",
                    children: "children", 
                }, 
                cascaderOptions: "", //级联选择器数据变量
            }
        },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单日期(大于等于今天)", //输入框的label属性
        //     vModel: "h", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "43", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单日期(小于今天)", //输入框的label属性
        //     vModel: "j", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "44", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "单日期(小于等于今天)", //输入框的label属性
        //     vModel: "k", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "45", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        {
            //=====================================这四个参数为所有输入框共享====================================//
            label: "多日期(默认)", //输入框的label属性
            vModel: "l", //默认搜索条件会添加formInfo前缀 fromInfo.a
            placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
            grid: {
                xs: "24",
                sm: "24",
                md: "12",
                lg: "8",
                xl: "6"
            }, //响应式配置
            //=====================================其余参数针对特殊类型进行处理====================================//
            type: "51", //参数类型，最好为字符串，默认情况会进行类型转换
            selectConfig: { //单选(多选)配置
                localSelect: [
                    { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
                    { label: "苹果", value: "2" },
                ], //单选框(多选框)本地数据       
                remoteSelect: { //单选框(多选框)远程数据    
                    requestUrl: "/api/test", //远程请求地址  
                    //selectOptions: "", //远程单选框(多选框)数据名称
                    label: "label3", //单选框(多选框)label显示的字段
                    value: "value3", //单选框(多选框)value显示的字段
                },                         
            },
            dataConfig: { //日期配置
                valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
                format: "yyyy-MM-dd", //呈现给用户的数据格式
                // pickerOptions: "", //时间过滤属性
            },
            cascaderConfig: { //级联选择器配置
                cascaderProps: { //级联选择props
                    label: "label",
                    value: "value",
                    children: "children", 
                }, 
                cascaderOptions: "", //级联选择器数据变量
            }
        },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多日期(默认)", //输入框的label属性
        //     vModel: "l", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "51", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多日期(大于今天)", //输入框的label属性
        //     vModel: "m", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "52", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多日期(大于等于今天)", //输入框的label属性
        //     vModel: "n", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "53", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多日期(小于今天)", //输入框的label属性
        //     vModel: "o", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "54", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "多日期(小于等于今天)", //输入框的label属性
        //     vModel: "p", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "55", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },

        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "日期时间(默认)", //输入框的label属性
        //     vModel: "m", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "61", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "日期时间(大于今天)", //输入框的label属性
        //     vModel: "n", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "62", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "日期时间(大于等于今天)", //输入框的label属性
        //     vModel: "o", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "63", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "日期时间(小于今天)", //输入框的label属性
        //     vModel: "p", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "64", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
        // {
        //     //=====================================这四个参数为所有输入框共享====================================//
        //     label: "日期时间(小于等于今天)", //输入框的label属性
        //     vModel: "q", //默认搜索条件会添加formInfo前缀 fromInfo.a
        //     placeholder: "", //placeholder的值,可以不传，不传取值为 "请输入" + label。比如label为抽样单编号，那么placeholder为 请输入抽样单编号
        //     grid: {
        //         xs: "24",
        //         sm: "24",
        //         md: "12",
        //         lg: "8",
        //         xl: "6"
        //     }, //响应式配置
        //     //=====================================其余参数针对特殊类型进行处理====================================//
        //     type: "65", //参数类型，最好为字符串，默认情况会进行类型转换
        //     selectConfig: { //单选(多选)配置
        //         localSelect: [
        //             { label: "香蕉", value: "1" }, //注意value值只能为字符串，不允许为数字
        //             { label: "苹果", value: "2" },
        //         ], //单选框(多选框)本地数据       
        //         remoteSelect: { //单选框(多选框)远程数据    
        //             requestUrl: "/api/test", //远程请求地址  
        //             //selectOptions: "", //远程单选框(多选框)数据名称
        //             label: "label3", //单选框(多选框)label显示的字段
        //             value: "value3", //单选框(多选框)value显示的字段
        //         },                         
        //     },
        //     dataConfig: { //日期配置
        //         valueFormat: "yyyy-MM-dd", //vModel绑定值类型(默认yyyy-MM-dd)
        //         format: "yyyy-MM-dd", //呈现给用户的数据格式
        //         // pickerOptions: "", //时间过滤属性
        //     },
        //     cascaderConfig: { //级联选择器配置
        //         cascaderProps: { //级联选择props
        //             label: "label",
        //             value: "value",
        //             children: "children", 
        //         }, 
        //         cascaderOptions: "", //级联选择器数据变量
        //     }
        // },
    ],


    /* 
        @description  表格展示
        @autor        shuxiaokai
        @create       2019-05-27 09:45"
        @params       
        @return       
    */

    table: {
        tabs: {
            isShow: true, //是否展示tabs 若为false则所有数据不生效
            tabsFormInfoName: "status", //tabs 
            data: [
                {
                    label: "待审核",
                    name: "s-a", //注意！！！！！！！ name不能为单独字符串，最好限制为s-a，s-b这种
                    value: "1", //切换的状态值
                },
                {
                    label: "已审核",
                    name: "s-b", //注意！！！！！！！ name不能为单独字符串，最好限制为s-a，s-b这种
                    value: "2",
                }
            ]
        },
        singleTableInfo: [
            {
                label: "序号",  //label值
                prop: "a",     //绑定后台值
                width: null,   //是否绑定宽度，null或者undefined 则宽度自适应
                type: "normal", //最简单的tableItem类型
            },
            {
                label: "序号",
                prop: "b",
                type: "tag",  // 1代表显示为tag类型
                tagEnum: [
                    {
                        value: 1,   //比如后台返回状态 0代表失败  1代表警告  2代表成功  那么对应为  0-error   1-warning    2-success
                        style: "primary",
                        showName: "警告"
                    },
                    {
                        value: 2,   //比如后台返回状态 0代表失败  1代表警告  2代表成功  那么对应为  0-error   1-warning    2-success
                        style: "success",
                        showName: "成功"
                    }
                ],
                width: null,   //是否绑定宽度，null或者undefined 则宽度自适应
            },
            {
                label: "操作",
                type: "operation", //操作类型  operation  tag
                width: 250,   //是否绑定宽度，null或者undefined 则宽度自适应 
                operations: [
                    {
                        label: "删除",
                        btnStyle: "primary",
                        oType: "1",   //操作类型， 1代表confirm类型，会弹出确认框让用户确认，确认以后会发送一次请求到后台
                        config: {
                            tipContent: "这是我的提示文案", //提示文案
                            successContent: "删除成功", //操作成功以后的文案
                            requestUrl: "/xxx/xxx/xxx",
                            localKey: "id", //当前绑定本地变量key
                            remoteKey: "id", //当前绑定远程变量key
                        }
                    },      
                    {
                        label: "跳转",
                        btnStyle: "primary",
                        oType: "2",   //操作类型，2代表跳转类型，会携带一定的参数并且跳转到某个路由
                        config: {
                            to: "/login",
                            queryEnum: [
                                {
                                    key: "id",  //枚举映射
                                    value: "id"
                                },
                                {
                                    key: "ddid",  //枚举映射
                                    value: "id"
                                }
                            ],

                        }
                    },        
                    {
                        label: "弹窗",
                        btnStyle: "primary",
                        oType: "3",   //操作类型，3代表dialog弹窗
                        config: {
                            width: 50, //默认宽度百分之50，数字类型
                            title: "这是一个dialog弹窗", //dialog标题文案
                            formInfo: {
                                labelWidth: 160, //默认form表单label宽度为160

                            }

                        }
                    },    
                ],                  
            }                       
        ],                          
        multiTableInfo: [
            [
                {
                    label: "序号",  //label值
                    prop: "a",     //绑定后台值
                    width: null,   //是否绑定宽度，null或者undefined 则宽度自适应
                },
                {
                    label: "序号",
                    prop: "b",
                    type: "tag",  // 1代表显示为tag类型
                    tagEnum: [
                        {
                            value: 1,   //比如后台返回状态 0代表失败  1代表警告  2代表成功  那么对应为  0-error   1-warning    2-success
                            style: "primary",
                            showName: "警告"
                        },
                        {
                            value: 2,   //比如后台返回状态 0代表失败  1代表警告  2代表成功  那么对应为  0-error   1-warning    2-success
                            style: "success",
                            showName: "成功"
                        }
                    ],
                    width: null,   //是否绑定宽度，null或者undefined 则宽度自适应
                },
                {
                    label: "操作",
                    type: "operation", //操作类型  operation  tag
                    width: 250,   //是否绑定宽度，null或者undefined 则宽度自适应 
                    operations: [
                        {
                            label: "删除",
                            btnStyle: "primary",
                            oType: "1",   //操作类型， 1代表confirm类型，会弹出确认框让用户确认，确认以后会发送一次请求到后台
                            config: {
                                tipContent: "这是我的提示文案", //提示文案
                                successContent: "删除成功", //操作成功以后的文案
                                requestUrl: "/xxx/xxx/xxx",
                                localKey: "id", //当前绑定本地变量key
                                remoteKey: "id", //当前绑定远程变量key
                            }
                        },      
                        {
                            label: "跳转",
                            btnStyle: "primary",
                            oType: "2",   //操作类型，2代表跳转类型，会携带一定的参数并且跳转到某个路由
                            config: {
                                to: "/login",
                                queryEnum: [
                                    {
                                        key: "id",  //枚举映射
                                        value: "id"
                                    },
                                    {
                                        key: "ddid",  //枚举映射
                                        value: "id"
                                    }
                                ],
    
                            }
                        },        
                        {
                            label: "弹窗",
                            btnStyle: "primary",
                            oType: "3",   //操作类型，3代表dialog弹窗
                            config: {
                                width: 50, //默认宽度百分之50，数字类型
                                title: "这是一个dialog弹窗", //dialog标题文案
                                formInfo: {
                                    labelWidth: 160, //默认form表单label宽度为160
    
                                }
    
                            }
                        },    
                    ],                  
                }                       
            ]
        ],
    }
}
