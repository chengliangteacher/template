


<template>
    <div class="s-card">
        <header v-if="isShowHeader" class="card-header" :class="{active: showContent ? 'active' : ''}" @click.stop.prevent="toggleContent">
            <div class="title">{{ title }}</div>
            <div class="d-flex align-center">
                <slot name="search-btn"></slot>
            </div>
        </header>
        <!-- 搜索 -->
        <section ref="content" class="content">
            <slot></slot>
        </section>
    </div>
</template>

<script>
export default {
    props: {
        // @vuese
        // card头部标题
        title: {
            type: String,
            default: ""
        },
        couldExpand: { // 是否允许展开
            type: Boolean,
            default: true
        },
        closed: { // 默认是否展开
            type: Boolean,
            default: false
        },
    },
    data() {
        return {
            isShowHeader: false,
            showContent: true,
            couldFold: true,
            contentHeight: 0, //内容高度
        };
    },
    watch: {
        showContent: {
            handler(val) {
                if (val === false) {
                    this.$refs["content"].style.height = 0;
                    this.$refs["content"].style.padding = 0;
                } else {
                    this.$refs["content"].style.height = "auto";
                    this.$refs["content"].style.padding = "1rem";
                }
            },
            deep: true
        }
    },
    mounted() {
        this.showContent = !this.closed;
        this.isShowHeader = this.$slots["search-btn"] || this.title;
    },
    methods: {
        toggleContent() {
            if (!this.couldExpand) {
                return
            } else {
                this.showContent = !this.showContent;
            }
        },
        //=====================================关闭====================================//
        handleClickClose() {
            this.$emit("close")
        }
    }
};
</script>



<style lang="scss">
.s-card {
    width: 100%;
    border: 1px solid #ecf5ff;
    background: #fff;
    border-radius: 3px;
    margin-bottom: 10px;
    // box-shadow: 0 3px 3px #eee;
}
.s-card header {
    display: flex;
    padding: 10px 0;
    padding-right: 1em;
    border-bottom: 1px solid #ecf5ff;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    &.active {
        cursor: pointer;
        transition: background .3s;
        &:hover {
            background: $gray-100;
        }
    }
}
.s-card header .title {
    padding-left: 1.5em;
    color: #369;
    font-weight: bolder;
    border-left: 4px solid #409eff;
}
.s-card .content {
    position: relative;
    padding: 5px 12px;
    // max-height: calc(100vh - 300px);
    overflow-y: auto;
    &.active {
        padding: 0rem!important;
        height: 0px!important;
    }
}
.s-card .content .search-item {
    display: inline-flex;
    margin-bottom: 1rem;
}
.s-card .content .label {
    color: #666;
    font-size: 12px;
    display: flex;
    align-items: center;
}
</style>
