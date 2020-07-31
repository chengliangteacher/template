import Vue from "vue"
import Router from "vue-router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
//=====================================注册登陆页面====================================//
import login from "@/pages/login/login"
import layout from "../pages/layout/index"
import hmt from "@/pages/hmt/hmt"

//=====================================业务逻辑页面====================================//


//=====================================扩展页面====================================//
import enlarge from "./enlarge/index"
import test from "@/pages/test/test.vue"
import test2 from "@/pages/test/test1.vue"
import testA from "@/pages/test/test-a/a.vue"
import testAc from "@/pages/test/test-a/children/c.vue"
import testB from "@/pages/test/test-b/b.vue"

Vue.use(Router)

const router = new Router({
    // mode: "history",
    routes: [
        {
            path: "/",
            redirect: "/hmt"
        },
        {
            path: "/login",
            name: "login",
            meta: {
                testInfo: {
                    desc: "登陆页面",
                    key: "login",
                    trigger: "login"
                }
            },
            component: login
        },
        {
            path: "/hmt",
            name: "hmt",
            meta: {
                testInfo: {
                    desc: "登陆页面",
                    key: "hmt",
                    trigger: "hmt"
                }
            },
            component: hmt
        },
        {
            path: "/v1",
            component: layout,
            children: [
                ...enlarge
            ]
        }
    ]
})

if (1 || process.env.NODE_ENV === "development") {
    router.addRoutes([
        {
            path: "/v1",
            component: layout,
            children: [
                {
                    path: "/v1/test/config",
                    name: "config",
                    meta: {
                        title: "数据配置",
                        bread: [{ to: "/v1/test", title: "数据配置" }]
                    },
                    component: test
                },
                {
                    path: "/v1/test/a",
                    name: "aaa",
                    meta: {
                        title: "测试demo",
                        bread: [{ to: "/v1/aaa", title: "测试demo" }]
                    },
                    component: testA
                },
                {
                    path: "/v1/test/c",
                    name: "ccc",
                    meta: {
                        title: "展示和编辑",
                        bread: [{ to: "/v1/test/c", title: "展示和编辑" }]
                    },
                    component: testAc
                },
                {
                    path: "/v1/test/b",
                    name: "bbb",
                    meta: {
                        title: "填写界面",
                        bread: [{ to: "/v1/aaa", title: "填写界面" }]
                    },
                    component: testB
                },
                {
                    path: "/v1/test2",
                    name: "test2",
                    meta: {
                        title: "代码配置",
                        bread: [{ to: "/v1/aaa", title: "代码配置" }]
                    },
                    component: test2
                },
                
            ]
        }
    ])
}

router.beforeEach(async(to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done() // 页面顶部的加载条
})

export default router
