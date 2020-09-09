/*
    创建者：chengliang
    创建时间：2019-05-05 17:45
    模块名称：xxxx
    备注：xxxx
*/

<template>
    <div class="upload">
        <el-upload 
                ref="uploadActivePic" 
                :limit="limit" 
                :action="uploadPicUrl" 
                list-type="picture-card" 
                :on-exceed="limitPic" 
                :before-upload="checkPicSize" 
                :on-success="handleSuccess" 
                :on-preview="handlePictureCardPreview" 
                :on-change="handleChange" 
                :file-list="existPics" 
                :on-remove="handleRemove"
        >
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :lock-scroll="false">
            <img v-if="activeImgUrl" :src="activeImgUrl" width="100%">
        </el-dialog>
    </div>
</template>

<script>
/*
    描述: 										  多图上传
    属性: 
        limit 类型:Number                         图书上传数量限制         默认为10张
        size  类型:Number	                      单张图片大小限制(单位M)  默认为1M
        value 类型:[{name: String, url: String}]  当前已存在的图片		   默认为[]
        type  类型:[String]						  允许上传图片类型         默认jpg, png, gif, jpeg	
    
    事件:
        success									  成功时候的回调函数
*/
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
            type: Array,
            default: function() {
                return [];
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
            uploadPicUrl: process.env.NODE_ENV === "development" ? BaseConfig.devImgUrl : BaseConfig.proImgUrl, //图片上传url, //图片上传url
            activeImgUrl: "",
            dialogVisible: false, //查看照片大图时候的对话框触发变量
            result: "" //图片上传成功时候的id字符串
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
    methods: {
        /*预览图片*/
        handlePictureCardPreview(file) {
            this.advertImgUrl = "";
            console.log(file);
            if (!file.url) {
                this.$message({
                    type: "warning",
                    message: "图片还未上传成功,请耐心等待"
                });
                return;
            } else {
                this.activeImgUrl = file.url;
            }
            this.dialogVisible = true;
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
            this.result = ret;
            this.$emit("success", this.result);
        },
        /*图片上传成功的处理函数*/
        handleSuccess(res, file, fileList) {
            var ret = [];
            console.log("图片上传成功", fileList);
            fileList.forEach(val => {
                ret.push(val.response.content);
            });
            this.result = ret;
            this.$emit("success", this.result);
        },
        /*上传之前检查图片格式*/
        checkPicSize(file) {
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
        /*超出图片个数限制的时候*/
        limitPic() {
            this.$message({
                type: "warning",
                message: `图片个数限制为${this.limit}张`
            });
        },
        //文件状态改变
        handleChange(file, fileList) {
            //console.log("change",fileList)
        }
    }
};
</script>
