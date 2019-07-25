<template>
    <div>
        <s-card title="图片上传">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
        </s-card>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            dialogImageUrl: "",
            dialogVisible: false
        };
    },
    created() {},
    mounted() {},
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        }
    }
};
</script>



<style lang="scss">
</style>
