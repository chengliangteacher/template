<template>
    <el-submenu :index="data.path">
        <template v-if="data.children && data.children.length > 0" slot="title">
            <i v-if="data.icon" :class="data.icon"></i>
            <svg v-else class="svg-icon" aria-hidden="true">
                <use :xlink:href="data.icon"></use>
            </svg>
            <span slot="title">{{ data.name }}</span>
        </template>
        <el-menu-item v-if="!data.children" :index="data.path">{{ data.name }}</el-menu-item>
        <template v-if="data.children && data.children.length > 0">
            <template v-for="item in data.children">
                <nest-nav v-if="item.children && item.children.length > 0" :key="item.path" :index="item.path" :data="item"></nest-nav>
                <router-link v-else :key="item.path" :to="item.path">
                    <el-menu-item :index="item.path">
                        <i v-if="item.icon" :class="item.icon"></i>
                        <svg v-else class="svg-icon" aria-hidden="true">
                            <use :xlink:href="item.icon"></use>
                        </svg>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>
                </router-link>
            </template>
        </template>
    </el-submenu>  
</template>

<script>
export default {
    name: "NestNav",
    props: {
        data: {
            type: Object,
            required: true
        }
    },
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {},
    methods: {

    }
};
</script>

<style lang="scss">

</style>
