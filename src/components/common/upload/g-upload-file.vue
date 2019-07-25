/*
    创建者：shuxiaokai
    创建时间：2019-05-06 14:30
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <el-upload 
            ref="upload"
            drag 
            :action="uploadPicUrl"
            :before-upload="checkTypeSize" 
            :on-success="handleSuccess" 
            :on-exceed="limitFile" 
            :limit="limit" 
            :on-remove="handleRemove"
            multiple
    >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
        </div>
        <div slot="tip" class="el-upload__tip">
            <slot name="tip"></slot>
            {{ tip }}
        </div>
    </el-upload>
</template>

<script>
import { BaseConfig } from "@/config.default.js";
export default {
    props: {
        limit: {
            //文件上传限制数量
            type: Number,
            default: 1
        },
        size: {
            //单张文件大小限制
            type: Number,
            default: 5
        },
        value: {
            //当前已存在文件
            type: Array,
            default: function() {
                return [];
            }
        },
        type: {
            //上传文件类型
            type: Array,
            default: function() {
                return ["application/pdf", "image/jpg", "image/png", "image/gif", "image/jpeg"];
            }
        },
        tip: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
            uploadPicUrl: process.env.NODE_ENV === "development" ? BaseConfig.devImgUrl : BaseConfig.proImgUrl, //图片上传url, //文件上传url
            activeImgUrl: "",
            loading: false,
            result: ""
        };
    },
    created() {},
    methods: {
        checkTypeSize(file) {
            this.loading = true;
            const isLtnM = file.size > 1024 * 1024 * this.size;
            console.log("type", file.type)
            const isValidType = this.type.includes(file.type);
            if (isLtnM) {
                this.$message({
                    type: "warning",
                    message: `文件大小限制为${this.size}M`
                });
            } else if (!isValidType) {
                this.$message({
                    type: "warning",
                    message: `文件类型不正确`
                });
            }
            return !isLtnM && isValidType;
        },
        handleSuccess(res, file, fileList) {
            var ret = [];
            fileList.forEach(val => {
                if (val.response) {
                    ret.push(val.response.content);
                }
            });
            this.result = ret.join(",");
            this.$emit("success", this.result);
        },
        /*删除图片*/
        handleRemove(file, fileList) {
            var ret = [];
            console.log("删除一张图片", fileList);
            fileList.forEach(val => {
                if (val.response) {
                    ret.push(val.response.content);
                } else {
                    ret.push(val.url);
                }
            });
            this.result = ret.join(",");
            this.$emit("success", this.result);
        },
        /*超出文件个数限制的时候*/
        limitFile() {
            this.$message({
                type: "warning",
                message: `文件个数限制为${this.limit}张`
            });
        },
        handleError() {
            this.loading = false;
        },
        uploadFile(file) {
            console.log(file)
        },
        handleChange(file) {
            console.log(file, "change")
        }
    }
};
</script>



<style lang="scss">
</style>
