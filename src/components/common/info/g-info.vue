<template>
    <div>
        <s-card :title="title">
            <el-form ref="form" :model="data" label-width="150px">
                <el-row>
                    <el-col v-for="(value, key, index) in data" :key="index" :xs="24" :sm="22" :md="12" :lg="6" :xl="6 ">
                        <el-form-item :label="`${key}：`">
                            <span class="gray-500">{{ value }}</span>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </s-card>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    任务来源: "浙江省市场监督管理局",
                    计划名称: "计划制定评价性抽检",
                    部署机构: "浙江省市场监督管理局",
                    抽样编号: "SC19000000300700041",
                    检验目的: "评价性抽检",
                    食品大类: "餐饮食品",
                    食品亚类: "其他餐饮食品",
                    食品次亚类: "油炸小吃(餐饮) ",
                    食品细类: "油炸小吃(餐饮)"
                };
            }
        },
        title: {
            type: String,
            default: "信息"
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {}
};
</script>



<style lang="scss">
</style>
