<template>
    <div id="s-header" class="s-header">
        <div class="title">
            <!-- <span>logo</span> -->
            <span>社会共治</span>
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
                    <span class="gray-200 cursor-pointer">
                        <span>{{ userinfo.username }}周小川</span>
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
export default {
    components: {},
    data() {
        return {
            driver: null,
            userinfo: {} //---------------------------个人信息
        };
    },
    created() {},
    mounted() {
        this.driver = new Driver({
            stageBackground: "rgba(255,255,255,.3)",
            nextBtnText: "下一个提示",
            prevBtnText: "上一条提示",
            doneBtnText: "关闭",
            closeBtnText: "跳过"
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
            this.axios.get(`/login/out`).then(res => {});
        }
    }
};
</script>



<style lang="scss">
.s-header {
    height: 60px;
    padding: 0 2em;
    background: $gray-700;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: $white;
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
}
</style>
