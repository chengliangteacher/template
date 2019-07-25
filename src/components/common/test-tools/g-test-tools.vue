/*
    创建者：shuxiaokai
    创建时间：2019-05-06 16:14
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div class="test-tools" :class="{active: isActive}">
        <div class="hander" @click.stop="isActive = !isActive">
            <span>测</span>
            <span>试</span>
            <span>工</span>
            <span>具</span>
        </div>
        <div class="tools-container" @click.stop="cancleBubble">
            <div class="">
                <el-tabs v-model="currentComponent" @tab-click="handleClick">
                    <el-tab-pane label="ajax请求" name="s-a"></el-tab-pane>
                    <el-tab-pane label="一键生成数据" name="s-b"></el-tab-pane>
                    <el-tab-pane label="代码片段" name="s-c"></el-tab-pane>
                </el-tabs>
            </div>
            <div>
                <componens :is="currentComponent"></componens>
            </div>
        </div>
    </div>
</template>

<script>
import request from "./children/request.vue"
import generateData from "./children/generate-data"
import snippet from "./children/snippet"
export default {
    components: {
        "s-a": request,
        "s-b": generateData,
        "s-c": snippet,
    },
    data() {
        return {
            currentComponent: "s-a", //当前组件
            //=====================================其他参数====================================//
            isActive: false
        };
    },
    created() {
        this.hideTool();
        this.initSelectTabs();
    },
    methods: {
        hideTool() {
            document.body.addEventListener("click", (e) => {
                // e.stopPropagation();
                this.isActive = false;
            })
        },
        //=====================================初始化当前已选择的tabs====================================//
        initSelectTabs() {
            if (localStorage.getItem("currentToolSelect")) {
                this.currentComponent = localStorage.getItem("currentToolSelect")
            }
        },
        cancleBubble() {

        },
        //=====================================切换不同工具====================================//
        handleClick() {
            localStorage.setItem("currentToolSelect", this.currentComponent);
        },

    }
};
</script>



<style lang="scss">
    .test-tools {
        width: 60vw;
        height: 60%;
        position: fixed;
        z-index: $zindex-tools;
        left: 100%;
        top: 50%;
        transform: translate3D(0px, -50%, 0);
        background: $gray-100;
        transition: all .5s;
        &.active {
            transform: translate3D(-60vw, -50%, 0);
        }
        .hander {
            position: absolute;
            top: 50%;
            left: 0;
            width: 30px;
            height: 100px;
            transform: translate3D(-30px, -50%, 0);
            background: $gray-200;
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            color: #369;
            cursor: pointer;
        }
    }
    .tools-container {
        padding: 1em 2em;
        width: 100%;
        height: 100%;
    }
</style>
