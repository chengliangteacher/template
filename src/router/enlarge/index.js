/*
    
*/


export default [
    {
        path: "notice",
        name: "notice",
        meta: {
            title: "通知管理",
            bread: [{ to: "", title: "通知管理" }]
        },
        component: () => import("@/pages/enlarge/notice/notice.vue")
    },
    {
        path: "add/notice",
        name: "add_notice",
        meta: {
            title: "新增通知",
            bread: [{ to: "", title: "新增通知" }]
        },
        component: () => import("@/pages/enlarge/add-notice/add-notice.vue")
    },
    
];
