import content from '@/pages/layout/content/content.vue';
/*
    创建者：xxx
    创建时间：2019-05-12 12:15
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div class="s-empty">
        <div v-if="type === '0' || type === '404'" class="no-404">
            <img src="@/../public/img/404.svg" alt width="50%" height="50%">
            <span>页面走丢了</span>
        </div>
        <div v-else-if="type === '1' || type === 'permission'" class="no-permission">
            <img src="@/../public/img/permission.svg" alt>
            <span>您暂无查看权限</span>
        </div>
        <div v-else-if="type === '2' || type === 'data'" class="no-data">
            <div>
                <img src="@/../public/img/empty.svg" alt width="100%">
            </div>
            <div>数据走丢了！</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        //类型  404 代表404  permission 无权限  data 无数据  0,1,2 简化值
        type: {
            type: String,
            default: "data"
        }
    },
    data() {
        return {};
    },
    created() {},
    methods: {}
};
</script>



<style lang="scss">
    .s-empty {
        display: flex;
        align-items: center;
        justify-content: center;
        // 暂无数据
        .no-data, .no-permission, .no-404 {
            width: 100%;
            display: flex;
            flex-direction: column;
            &>div {
                width: 100%;
            }
        }
    }
</style>
