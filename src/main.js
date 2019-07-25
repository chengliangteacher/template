import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import { BaseConfig } from "@/config.default.js"
import "./directive"
import "./mixin"
import "./components/index"

//========================第三方模块引入=============================//
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import "@/assert/css/animate.css" //引入动画库
import axios from "./api/api"

Vue.use(ElementUI)
Vue.use(axios)

//=================================================================//
Vue.config.productionTip = true

new Vue({
    data: {
        VUE_BASE_CONFIG:
            process.env.NODE_ENV === "development" ? BaseConfig : {}
    },
    store,
    router,
    render: h => h(App)
}).$mount("#app")

// Vue.config.errorHandler = (err, vm, info) => {
//     Vue.nextTick(() => {
//         console.log(err)
//         console.log(vm)
//         console.log(info)
//     })
// }


