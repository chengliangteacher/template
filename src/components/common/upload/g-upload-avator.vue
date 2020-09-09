/*
    创建者：chengliang
    创建时间：2019-05-06 14:30
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <el-upload 
            class="avatar-uploader" 
            :action="uploadPicUrl" 
            :show-file-list="false" 
            :on-success="handleSuccess" 
            :on-error="handleError"
            :before-upload="checkPicSize"
    >
        <div v-loading="loading">
            <img v-if="value || activeImgUrl" :src="value || activeImgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </div>

    </el-upload>
</template>

<script>
import { BaseConfig } from "@/config.default.js"
export default {
    props: {
        limit: {
            //图片上传限制数量
            type: Number,
            default: 5
        },
        size: {
            //单张图片大小限制
            type: Number,
            default: 3
        },
        value: {
            //当前已存在图片
            type: String,
            default: function() {
                return "";
            }
        },
        type: {
            //上传图片类型
            type: Array,
            default: function() {
                return ["jpg", "png", "gif", "jpeg"];
            }
        }
    },
    data() {
        return {
            uploadPicUrl: process.env.NODE_ENV === "development" ? BaseConfig.devImgUrl : BaseConfig.proImgUrl, //图片上传url
            activeImgUrl: "",
            loading: false
        };
    },
    computed: {
        existPics() {
            if (!this.value) {
                return [];
            } else {
                const ret = this.value.map((val, index) => {
                    return {
                        name: index,
                        url: val
                    };
                });
                return ret;
            }
        }
    },
    created() {},

    methods: {
        checkPicSize(file) {
            this.loading = true;
            const isLtnM = file.size > 1024 * 1024 * this.size;
            const isValidType = this.type.includes(
                file.type.replace("image/", "")
            );
            if (isLtnM) {
                this.$message({
                    type: "warning",
                    message: `图片大小限制为${this.size}M`
                });
            } else if (!isValidType) {
                this.$message({
                    type: "warning",
                    message: `图片类型只能为${this.type.join(", ")}`
                });
            }
            return !isLtnM && isValidType;
        },
        handleSuccess(res) {
            console.log("图片上传成功", res);
            this.loading = false;
            this.result = res.content;
            this.activeImgUrl = this.result;
            this.$emit("success", this.result);
        },
        handleError() {
            this.loading = false;
        }
    }
};
</script>



<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px!important;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
