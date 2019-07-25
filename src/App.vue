<template>
    <div id="app">
        <!-- <keep-alive> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
        <s-test-tools v-if="$root.VUE_BASE_CONFIG.enableHttpTest"></s-test-tools>
    </div>
</template>
 
<script>

export default {
    data() {
        return {};
    },
    created() {
        this.getRule();
        this.addTabs();
    },
    mounted() {},
    methods: {
        //=====================================获取用户拥有的权限====================================//
        getRule() {
            if (sessionStorage.getItem("permission")) {
                this.$store.commit(
                    "changePermission",
                    JSON.parse(sessionStorage.getItem("permission"))
                );
            }
        },
        //=====================================进入页面直接读取localstorage里面的tabs列表展示====================================//
        addTabs() {
            try {
                const tabs = JSON.parse(localStorage.getItem("layout-tabs"));
                if (tabs) {
                    tabs.forEach(tab => {
                        this.$store.commit("addTabs", tab);
                    });
                }
            } catch (error) {
                console.error(error);
            }
        },

    }
};
</script>

 

<style lang="scss">
#app {
    // min-width: 600px;

    height: 100%;
}
</style>
