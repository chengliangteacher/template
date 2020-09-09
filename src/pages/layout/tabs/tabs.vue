<template>
    <div class="tabs">
        <div class="fold" @click.stop="expand">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="my-tabs d-flex">
            <el-button icon="el-icon-d-arrow-left" class="left" @click="left"></el-button>
            <div id="tabList" class="tab-list">
                <div v-for="(item, index) in tabs" :key="index" class="item" :class="{active: item.path === $route.fullPath}" @click="selectCurrentTab($event, item)" @contextmenu="handleRightClick($event, item, index)">
                    <span class="item-text">{{ item.meta.title }}</span>
                    <i class="iconfont el-icon-close close" :style="{display: showClose}" @click="closeTab($event, item, index)"></i>
                </div>
            </div>
            <el-button icon="el-icon-d-arrow-right" class="right" @click="right"></el-button>
        </div>
        <div class="d-flex align-center utils">
            <div class="icons s-dirver-notice" @click="jumpToNotice">
                <el-badge is-dot>
                    <i class="iconfont el-icon-bell"></i>
                </el-badge>
            </div>
            <div class="icons s-dirver-edit" @click="jumptoEdit">
                <i class="iconfont el-icon-edit"></i>
            </div>
            &nbsp;&nbsp;&nbsp;
            <el-dropdown>
                <span class="gray-700 cursor-pointer">
                    <span>周小川</span>
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>新消息推送</el-dropdown-item>
                    <el-dropdown-item @click.native="logout">退出登陆</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { throttle } from "@/lib/utils";
export default {
    data() {
        return {
            //tab右键弹框
            ctx: null,
        };
    },
    computed: {
        tabs() {
            return this.$store.state.layout.tabs;
        },
        showClose() {
            if (this.$store.state.layout.tabs.length === 1) {
                return "none";
            } else {
                return null;
            }
        },
    },
    watch: {
        $route: {
            handler(val) {
                const hasRoute = this.$store.state.layout.tabs.some((tab) => {
                    return tab.path === val.fullPath;
                });
                if (!hasRoute) {
                    const rObj = {
                        path: val.fullPath,
                        meta: val.meta,
                    };
                    this.$store.commit("addTabs", rObj);
                }
            },
            immediate: true,
        },
    },
    mounted() {
        this.$nextTick(() => {
            document.body.addEventListener("click", (e) => {
                // e.stopPropagation();
                if (this.ctx) {
                    document.body.removeChild(this.ctx);
                    this.ctx = null;
                }
            });
            this.$el.addEventListener("contextmenu", (e) => {
                e.returnValue = false;
            });
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
        });
    },
    methods: {
        //触发展开事件
        expand() {
            if (this.isMobile) {
                this.$store.commit("toggleMobileBanner");
            } else {
                this.$store.commit("toggleBanner");
            }
        },
        //关闭标签
        closeTab(e, item, index) {
            e.stopPropagation();
            this.$store.commit("deleteTab", index);
            if (item.path === this.$route.fullPath) {
                //如果关闭当前标签
                if (this.tabs[index]) {
                    //右侧还存在标签
                    this.$router.push(this.tabs[index].path);
                } else {
                    //右侧不存在标签
                    this.$router.push(this.tabs[index - 1].path);
                }
            }
        },
        //选择当前标签
        selectCurrentTab(e, item) {
            this.$router.push(item.path);
        },
        //右键菜单
        handleRightClick(e, item, index) {
            const x = e.clientX; //当前点击位置
            const y = e.clientY; //当前点击位置
            if (this.ctx) {
                document.body.removeChild(this.ctx);
                this.ctx = null;
            }
            //创建右键弹框
            this.ctx = document.createElement("div");
            this.ctx.style.position = "fixed";
            this.ctx.style.left = x + "px";
            this.ctx.style.top = y + "px";
            this.ctx.style.zIndex = 9999;
            const html = `
                <div style="background: #fff; border-radius: 4px; box-shadow: 1px 4px 10px #aaa;padding: 0 0;">
                    <div style="line-height: 2em;cursor: pointer;padding: .3em 2em;border-top-left-radius: 4px;border-top-right-radius: 4px;" class="c1">关闭右侧</div>
                    <div style="line-height: 2em;cursor: pointer;padding: .3em 2em;" class="c2">关闭左侧</div>
                    <div style="line-height: 2em;cursor: pointer;padding: .3em 2em;" class="c3">关闭标签</div>
                    <div style="line-height: 2em;cursor: pointer;padding: .3em 2em;" class="c4">关闭其他</div>                    
                </div>
            `;
            this.ctx.innerHTML = html;
            document.body.appendChild(this.ctx);
            //绑定相应事件
            const c1 = document.querySelector(".c1");
            const c2 = document.querySelector(".c2");
            const c3 = document.querySelector(".c3");
            const c4 = document.querySelector(".c4");
            c1.addEventListener("click", (e) => {
                if (this.tabs.length !== 1) {
                    this.$store.commit("deleteTabs", {
                        start: index + 1,
                        num: this.tabs.length - index - 1,
                    });
                    this.$router.push(this.tabs[index].path);
                }
            });
            c1.addEventListener("mouseover", (e) => {
                e.stopPropagation();
                e.target.style.background = "#eee";
            });
            c1.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                e.target.style.background = "#fff";
            });
            //=========================================================================//
            c2.addEventListener("click", (e) => {
                if (this.tabs.length !== 1) {
                    this.$store.commit("deleteTabs", { start: 0, num: index });
                    this.$router.push(this.tabs[0].path);
                }
            });
            c2.addEventListener("mouseover", (e) => {
                e.stopPropagation();
                e.target.style.background = "#eee";
            });
            c2.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                e.target.style.background = "#fff";
            });
            //=========================================================================//
            c3.addEventListener("click", (e) => {
                if (this.tabs.length === 1) {
                    return;
                }
                this.$store.commit("deleteTab", index);
                if (item.path === this.$route.fullPath) {
                    //如果关闭当前标签
                    if (this.tabs[index]) {
                        //右侧还存在标签
                        this.$router.push(this.tabs[index].path);
                    } else {
                        //右侧不存在标签
                        this.$router.push(this.tabs[index - 1].path);
                    }
                }
            });
            c3.addEventListener("mouseover", (e) => {
                e.stopPropagation();
                e.target.style.background = "#eee";
            });
            c3.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                e.target.style.background = "#fff";
            });
            //=========================================================================//
            c4.addEventListener("click", (e) => {
                if (this.tabs.length !== 1) {
                    this.$store.commit("deleteTabs", {
                        start: index + 1,
                        num: this.tabs.length - index - 1,
                    });
                    this.$store.commit("deleteTabs", { start: 0, num: index });
                    this.$router.push(this.tabs[0].path);
                }
            });
            c4.addEventListener("mouseover", (e) => {
                e.stopPropagation();
                e.target.style.background = "#eee";
            });
            c4.addEventListener("mouseout", (e) => {
                e.stopPropagation();
                e.target.style.background = "#fff";
            });
        },
        left(e) {
            const div = document.getElementById("tabList");
            div.scrollLeft -= 100;
        },
        right(e) {
            const div = document.getElementById("tabList");
            div.scrollLeft += 100;
        },
        logout() {
            sessionStorage.clear();
            localStorage.clear();
            this.$router.replace("/login");
            this.$store.commit("clearTabs");
            this.axios.get(`/login/out`).then((res) => {});
        },
        //=====================================跳转到通知界面====================================//
        jumpToNotice() {
            this.$router.push("/v1/notice");
        },
        //=====================================跳转到更新页面====================================//
        jumptoEdit() {
            this.$router.push("/v1/editnotice");
        },
    },
};
</script>

<style lang="scss">
.tabs {
    width: 100%;
    height: 40px;
    background: #eee;
    display: flex;
    .my-tabs {
        width: 80%;
    }
    .fold {
        margin: 0 1rem;
        height: 40px;
        width: 30px;
        line-height: 40px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        cursor: pointer;
        span {
            transition: all 0.33s;
            display: inline-block;
            width: 100%;
            height: 3px;
            background: #777;
            &:nth-of-type(1) {
                transform: translate(0, -4px);
            }
            &:nth-of-type(2) {
                height: 2px;
            }
            &:nth-of-type(3) {
                transform: translate(0, 4px);
            }
        }
        &:hover span:nth-of-type(1) {
            transform: translate(0, -6px);
        }
        &:hover span:nth-of-type(3) {
            transform: translate(0, 6px);
        }
    }
    .left {
        display: flex;
        justify-content: space-between;
    }
    .right {
        display: flex;
        justify-content: space-between;
        position: relative;
        right: 0px;
    }
    .tab-list {
        width: 100%;
        line-height: 40px;
        height: 40px;
        display: flex;
        color: #5f6368;
        overflow-x: hidden;
        overflow-y: hidden;
        white-space: nowrap;
        .item {
            position: relative;
            text-align: center;
            flex: 1 1 20%;
            max-width: 200px;
            cursor: default;
            padding: 0 1rem;
            .item-text {
                display: inline-block;
                max-width: 60%;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            background: rgb(222, 225, 230);
            &:hover {
                background: #e2e2e2;
            }
            .iconfont {
                font-size: 16px;
                display: flex;
                align-items: center;
            }

            &:first-of-type {
                &::before {
                    content: "";
                    display: inline-block;
                    height: 50%;
                    position: absolute;
                    transform: translate(0, -50%);
                    left: 0;
                    top: 50%;
                    width: 1px;
                    background: #aaa;
                }
            }
            &::after {
                content: "";
                display: inline-block;
                height: 50%;
                position: absolute;
                transform: translate(0, -50%);
                right: 0;
                top: 50%;
                width: 1px;
                background: #aaa;
            }
            &.active {
                background: #f0f3fa;
                margin-left: -1px;
                &::after {
                    width: 0;
                }
                &::before {
                    width: 0;
                }
            }
        }
    }
    .utils {
        display: flex;
        align-items: center;
        .icons {
            height: 40px;
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                background: $gray-400;
            }
            .iconfont {
                font-size: 18px;
            }
        }
    }
}
</style>
