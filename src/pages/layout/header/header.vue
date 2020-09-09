<template>
    <div id="s-header" class="s-header">
        <div class="d-flex center">
            <div class="title">
                <!-- <span>logo</span> -->
                <span>系统模版xxxxxxxxxxxxxxxx</span>
            </div>
            <div class="fold" @click.stop="expand">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div id="utils" class="utils">
            <div class="icons s-dirver-notice" @click="jumpToNotice">
                <el-badge is-dot>
                    <i class="iconfont el-icon-bell"></i>
                </el-badge>
            </div>
            <div class="icons s-dirver-edit" @click="jumptoEdit">
                <i class="iconfont el-icon-edit"></i>
            </div>
            <div class="icons mr-2 s-dirver-guide" @click="guide">
                <i class="iconfont el-icon-position"></i>
            </div>
            <div class="dropdown">
                <el-dropdown>
                    <span class="gray-900 cursor-pointer">
                        <span>{{ userinfo.username }}xxxx</span>
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
    </div>
</template>

<script>
import Driver from "driver.js";
import "driver.js/dist/driver.min.css"; //引入driver
import step from "./step";
import { throttle } from "@/lib/utils";
export default {
    components: {},
    data() {
        return {
            driver: null,
            userinfo: {}, //---------------------------个人信息
        };
    },
    created() {},
    mounted() {
        this.driver = new Driver({
            stageBackground: "rgba(255,255,255,.3)",
            nextBtnText: "下一个提示",
            prevBtnText: "上一条提示",
            doneBtnText: "关闭",
            closeBtnText: "跳过",
        });
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
        //=====================================跳转到通知界面====================================//
        jumpToNotice() {
            this.$router.push("/v1/notice");
        },
        //=====================================跳转到更新页面====================================//
        jumptoEdit() {
            this.$router.push("/v1/editnotice");
        },
        //=====================================开启引导====================================//
        guide() {
            this.driver.defineSteps(step);
            this.driver.start();
        },
        //=====================================退出登录====================================//
        logout() {
            sessionStorage.clear();
            localStorage.clear();
            this.$router.replace("/login");
            this.$store.commit("clearTabs");
            this.axios.get(`/login/out`).then((res) => {});
        },
        //=====================================触发展开事件====================================//
        expand() {
            if (this.isMobile) {
                this.$store.commit("toggleMobileBanner");
            } else {
                this.$store.commit("toggleBanner");
            }
        },
    },
};
</script>



<style lang="scss">
.s-header {
    height: 60px;
    padding: 0 2em;
    background: $white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $gray-900;
    .utils {
        display: flex;
        align-items: center;
        .icons {
            height: 60px;
            width: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            &:hover {
                background: $gray-600;
            }
            .iconfont {
                font-size: 18px;
            }
        }
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
}
</style>
