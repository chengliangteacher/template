/*
    创建者：shuxiaokai
    创建时间：2019-05-06 22:03
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <pre id="editor"></pre>
</template>

<script>
import ace from "brace";
import "brace/mode/json"
import "brace/theme/github"
export default {
    data() {
        return {};
    },
    mounted() {
        this.initEditor();
    },
    methods: {
        initEditor() {
            const editor = ace.edit(this.$el);
            editor.getSession().setMode("ace/mode/json");
            editor.setTheme("ace/theme/github");
            editor.setOptions({
                // enableBasicAutocompletion: true,
                // enableSnippets: true,
                // enableLiveAutocompletion: false
            });
            editor.on("change", () => {
                const content = editor.getValue();
                this.$emit("input", content);
            });
        }
    }
};
</script>



<style lang="scss">
    #editor {
        width: 100%;
        height: 90%;
    }
</style>
