/*
    创建者：chengliang
    创建时间：2019-05-05 16:09
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div>
        <fieldset class="mb-2">
            <legend>更新日志</legend>
        </fieldset>
        <el-timeline>
            <el-timeline-item v-for="(item, index) in noticeData" :key="index" timestamp="2019/4/12" placement="top" size="large" :color="index === 0 ? '#3f3' : '#909399'">
                <el-card>
                    <h4>{{ item.data }}</h4>
                    <p v-for="(item2, index2) in item.content" :key="index2">
                        <span v-if="item2.type === 'fixed'">[修复]</span>
                        <span v-else-if="item2.type === 'optimize'">[优化]</span>
                        <span v-else-if="item2.type === 'new'">[新增]</span>
                        <span v-else-if="item2.type === 'other'">[其他]</span>
                        <span>&nbsp;&nbsp;{{ item2.content }}</span>
                    </p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
    </div>
</template>
<script>

export default {
    data() {
        return {
            noticeData: [
                {
                    title: "更新 模板",
                    time: "2019/4/12",
                    content: [
                        {
                            type: "fixed",
                            content:
                                "table 组件中勾选全选后，再点击任意行复选框无法获取到值的问题"
                        },
                        {
                            type: "optimize",
                            content:
                                "table 组件的单元格溢出下拉框，让其不触发行点击事件"
                        },
                        {
                            type: "new",
                            content:
                                "table 组件的单元格溢出下拉框，让其不触发行点击事件"
                        },
                        {
                            type: "other",
                            content: "舒小凯 提交于 2019/4/3 20:46"
                        }
                    ]
                },
                {
                    title: "更新 模板",
                    time: "2019/4/11",
                    content: [
                        {
                            type: "fixed",
                            content:
                                "table 组件中勾选全选后，再点击任意行复选框无法获取到值的问题"
                        },
                        {
                            type: "optimize",
                            content:
                                "table 组件的单元格溢出下拉框，让其不触发行点击事件"
                        },
                        {
                            type: "new",
                            content:
                                "table 组件的单元格溢出下拉框，让其不触发行点击事件"
                        },
                        {
                            type: "other",
                            content: "舒小凯 提交于 2019/4/3 20:46"
                        }
                    ]
                }
            ],
        };
    },
    mounted() {},
    methods: {}
};
</script>


<style lang="scss">
fieldset {
    border-width: 1px 0 0;
    border-color: #e7e7e7;
    border-style: solid;
    padding: 0;
    legend {
        padding: 0 1em;
        margin-left: 2em;
        font-size: 1.3em;
        &:hover {
            color: $gray-700;
        }
    }
}
</style>
