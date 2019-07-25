
export default [
    {
        path: "a",
        name: "a",
        meta: {
            title: "a页面",
            bread: [{ to: "/v1/a", title: "a页面" }]
        },
        component: () => import("@/pages/model/a/a.vue")
    },
];
