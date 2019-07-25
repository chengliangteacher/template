<template>
    <div>
        <!-- 搜索条件 -->
        <s-card :could-expand="false">
            <el-form ref="form" :model="formInfo" label-width="150px">
                <el-row>
                    <el-col :xs="24" :sm="22" :md="10" :lg="7" :xl="5">
                        <el-form-item label="抽样单编号">
                            <el-input v-model="formInfo.a" size="mini" placeholder="请输入抽样单编号" class="w-100" maxlength="25" @keydown.native.enter="getData"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="10" :lg="7" :xl="5">
                        <el-form-item label="输入框可清除">
                            <el-input v-model="formInfo.b" size="mini" placeholder="请输入输入框可清除" class="w-100" maxlength="25" clearable @clear="getData"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="10" :lg="7" :xl="5">
                        <el-form-item label="单日期(默认)">
                            <el-date-picker v-model="formInfo.i" type="date" placeholder="请输入单日期(默认)" size="mini" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="w-100"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="22" :sm="22" :md="10" :lg="7" :xl="5">
                        <el-form-item label="单日期(大于今天)">
                            <el-date-picker v-model="formInfo.j" type="date" placeholder="请输入单日期(大于今天)" size="mini" value-format="yyyy-MM-dd" format="yyyy-MM-dd" class="w-100" :picker-options="timePickerOptions"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="search-btn">
                <el-button size="mini" type="primary" @click="getData">搜索</el-button>
                <el-button size="mini" type="warning" @click="resetData">重置</el-button>
            </div>
        </s-card>
        <!-- 表格展示 -->
        <s-card>
            <el-tabs v-model="tabsName" @tab-click="handleClickTabs">
                <el-tab-pane :label="tabsData" name="s-a" value="1"></el-tab-pane>
                <el-tab-pane label="已审核" name="s-b" value="2"></el-tab-pane>
            </el-tabs>

            <components :is="tabsName" :search="formInfo"></components>
        </s-card>
        <!-- dialog弹窗 -->
    </div>
</template>
<script>
/* eslint-disable */
import a from "./children/a";
import b from "./children/b";

export default {
    components: {
        "s-a": a,
        "s-b": b
    },
    data() {
        return {
            tabsData: "待审核(30)",
            //==============================查询条件==============================//
            formInfo: {
                a: "", //抽样单编号
                b: "", //输入框可清除
                i: "", //单日期(默认)
                j: "", //单日期(大于今天)
                l: "", //多日期(默认)
                startTime: "",
                endTime: "",
                status: "1"
            },
            //==============================其他参数==============================//
            timePickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },
            time: [],
            tabsName: "s-a"
        };
    },
    watch: {
        time: {
            handler(val) {
                if (val != null) {
                    this.formInfo.startTime = val[0];
                    this.formInfo.endTime = val[1];
                } else {
                    this.formInfo.startTime = "";
                    this.formInfo.endTime = "";
                }
            },
            deep: true
        }
    },
    created() {},
    methods: {
        //=====================================重置表格====================================//
        resetData() {
            this.formInfo = {
                a: "", //抽样单编号
                b: "", //输入框可清除
                i: "", //单日期(默认)
                j: "", //单日期(大于今天)
                l: "", //多日期(默认)
                startTime: "",
                endTime: ""
            };
        },
        handleClickTabs(val) {
            this.formInfo.status = val.$attrs.value;
        },
        //=====================================获取数据====================================//
        getData() {
            this.$ref[tabsName].getData();
        }
    }
};
</script>
               