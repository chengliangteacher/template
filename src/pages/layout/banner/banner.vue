
<template>
    <div class="navbar-container" :class="{fold: isExpandBanner, mobile: isMobile, mobile_expand: isExpandMobileBanner, shadow_box: !isMobile}">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu :default-active="activeIndex" class="el-menu-list" mode="vertical" background-color="#fff" :collapse="isExpandBanner" :collapse-transition="false" @select="handleSelect">
                <template v-for="(item, index) in banner">
                    <!-- 外链接 -->
                    <template v-if="checkNavType(item) === 1">
                        <a :key="index" :href="item.path" target="__blank">
                            <el-menu-item :index="item.path">
                                <i v-if="item.icon" :class="item.icon"></i>
                                <svg v-else class="svg-icon" aria-hidden="true">
                                    <use :xlink:href="item.icon"></use>
                                </svg>
                                <span slot="title">{{ item.name }}</span>
                            </el-menu-item>
                        </a>
                    </template>
                    <!-- 嵌套的nav -->
                    <template v-if="checkNavType(item) === 2">
                        <nest-nav :key="index" :data="item"></nest-nav>
                    </template>
                    <!-- 单独的nav -->
                    <template v-if="checkNavType(item) === 3">
                        <router-link :key="index" :to="item.path">
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
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import NestNav from "./item.vue";
import { throttle } from "@/lib/utils";
export default {
    components: {
        "nest-nav": NestNav,
    },
    data() {
        return {
            activeIndex: "",
            isMobile: false,
        };
    },
    computed: {
        banner() {
            return this.$store.state.layout.banner;
        },
        isExpandBanner() {
            return this.$store.state.layout.isExpandBanner;
        },
        isExpandMobileBanner() {
            return this.$store.state.layout.isExpandMobileBanner;
        },
    },
    watch: {
        $route(val) {
            this.activeIndex = val.path;
        },
        isExpandMobileBanner(val) {
            if (val) {
                // const div = document.createElement("div");
                // div.classList.add("full-screen", "bg-gray-300")
                // document.body.appendChild(div)
            }
        },
    },
    created() {
        this.activeIndex = this.$route.path;
        if (window.innerWidth <= 992) {
            this.isMobile = true;
        }
        window.addEventListener(
            "resize",
            throttle(() => {
                window.innerWidth <= 992
                    ? (this.isMobile = true)
                    : (this.isMobile = false);
            })
        );
        document.body.addEventListener("click", (e) => {
            // e.stopPropagation();
            // this.$store.commit("closeMobileBanner");
        });
    },
    methods: {
        handleSelect() {},
        /*
            @describe:  查询导航栏类型， 1代表外链接， 2代表嵌套导航， 3代表单层导航
        */
        checkNavType(item) {
            let isNest = true;
            let isLink = false;

            if (
                item.children == null ||
                (Array.isArray(item.children) && item.children.length === 0)
            ) {
                //判断是否是嵌套
                isNest = false;
                if (
                    item.isLink ||
                    (typeof item.path === "string" &&
                        (item.path.startsWith("http://") ||
                            item.path.startsWith("https://")))
                ) {
                    //判断是否为外链
                    isLink = true;
                }
            }
            if (isNest) {
                return 2;
            } else if (isLink) {
                return 1;
            } else {
                return 3;
            }
        },
    },
};
</script> 



<style lang="scss">
.navbar-container {
    height: 100%;
    // height: calc(100vh - 40px);
    width: 200px;
    overflow-x: hidden;
    background-color: #304156;
    transition: all 0.3s;
    position: fixed;
    // top: 60px;
    z-index: 1;
    &.fold {
        width: 62px !important;
    }
    &.mobile {
        transform: translate3D(-200px, 0, 0);
    }
    &.mobile_expand {
        box-shadow: 0px 10px 20px 0px rgba(0,0,0,0.5);
        transform: translate3D(0px, 0, 0);
    }
    .scrollbar-wrapper {
        height: 100%;
        overflow-x: hidden;
    }
    .el-scrollbar,
    .el-scrollbar__view {
        height: 100%;
    }
    .el-menu-list {
        height: 100%;
    }
    .nav-icon {
        margin-right: 14px;
    }
    .el-menu {
        border: none;
    }
    &.shadow_box{
        box-shadow: none !important;
    }
    // .router-link-active .el-menu-item {
    //     color: rgb(64, 158, 255)!important;
    // }
    // .router-link-active .el-menu-item i {
    //     color: inherit!important;
    // }
    // .el-menu-item {
    //     color: rgb(255, 255, 255);
    //     background-color: rgb(48, 65, 86);
    // }
}
</style>
