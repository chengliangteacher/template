<template>
    <!-- 面包屑 -->
    <div class="breadcrumb">
        <div class="text-gray-600 pl-1">
            <i class="iconfont icon-dizhi"></i>&nbsp;&nbsp;
            <span>您的位置:&nbsp;&nbsp;&nbsp;</span>
        </div>
        <div>
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item v-for="(item,index) in breadcrumbName" :key="index" :to="item.to">{{ item.title }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    computed: {
        breadcrumbName() {
            return this.$route.meta.bread;
        }
    },

    created() {},
    mounted() {},
    methods: {}
};
</script>



<style lang="scss">
    .breadcrumb {
        height: 40px;
        display: flex;
        align-items: center;
        box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    }
    .el-breadcrumb__inner a, .el-breadcrumb__inner.is-link {
        font-weight: normal!important;
    }
</style>
