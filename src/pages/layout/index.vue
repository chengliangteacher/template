<template>
    <div class="layout-container">
        <s-header v-if="true"></s-header>
        <div class="layout-wrap">
            <!-- <div class="layout-banner"> -->
            <s-banner></s-banner>
            <!-- </div> -->
            <div class="layout-content" :class="{active: isExpandBanner, mobile: isMobile}">
                <div v-if="isShowTabs" class="content-tabs">
                    <s-tabs></s-tabs>
                </div>
                <div v-if="isShowBread" class="content-bread">
                    <s-bread></s-bread>
                </div>
                <el-scrollbar wrap-class="content-wrap">
                    <s-content>
                        <s-bread slot="header"></s-bread>
                    </s-content>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>
<script>
import header from "@/pages/layout/header/header.vue";
import content from "@/pages/layout/content/content.vue";
import banner from "@/pages/layout/banner/banner.vue";
import tabs from "@/pages/layout/tabs/tabs.vue";
import bread from "@/pages/layout/bread/bread.vue";
import { throttle } from "@/lib/utils";
export default {
    components: {
        "s-header": header,
        "s-content": content,
        "s-banner": banner,
        "s-tabs": tabs,
        "s-bread": bread,
    },
    data() {
        return {
            isShowTabs: false,
            isShowBread: false,
            isMobile: false,
        };
    },
    computed: {
        isExpandBanner() {
            return this.$store.state.layout.isExpandBanner;
        },
    },
    created() {
        if (process.env.NODE_ENV === "development") {
            this.isShowTabs = false;
            this.isShowBread = false;
        }
        if (window.innerWidth <= 992) {
            this.isMobile = true;
        }
        window.innerWidth <= 992
            ? (this.isMobile = true)
            : (this.isMobile = false);
        window.addEventListener(
            "resize",
            throttle(() => {
                window.innerWidth <= 992
                    ? (this.isMobile = true)
                    : (this.isMobile = false);
            })
        );
    },
};
</script>

<style lang='scss' >
.layout-container {
    width: 100%;
}
.layout-wrap {
    display: flex;
    height: calc(100vh - 60px);
    // height: 100vh;
    width: 100%;
}

.layout-content {
    flex: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background: rgb(240, 240, 240);
    margin-left: 200px;
    transition: margin-left 0.3s;
    // position: fixed;
    // width: calc(100vw - 200px);
    &.active {
        margin-left: 62px;
    }
    &.mobile {
        margin-left: 0px;
    }
    .content-wrap {
        .el-scrollbar {
            height: calc(100vh - 80px);
        }
        padding: 10px 10px 0 10px;
        height: calc(100vh - 60px);
        @media (max-width: 992px) {
            padding: 0;
        }
    }
    .content-bread {
        position: relative;
        z-index: 2;
    }
}
</style>
