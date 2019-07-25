/*
    创建者：shuxiaokai
    创建时间：2019-05-30 19:46
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <el-form ref="formInfo" class="register-form bbb" label-width="140px" :model="formInfo" :rules="rules" status-icon>
        <s-card title="用户信息">
            <el-row>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="phone" label="电话:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.phone" class="input-width" size="mini" placeholder="请输入11位联系电话"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="username" label="登陆账号:">
                        <div class="parent-again">
                            <el-popover ref="popover" width="200" placement="right" trigger="focus" content="用户名不得少于6位"></el-popover>
                            <el-input v-model="formInfo.username" v-popover:popover class="input-width" autocomplete="new-password" size="mini" placeholder="请输入登陆账号"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="password" label="登陆密码:">
                        <div class="parent-again">
                            <el-popover ref="popover1" width="200" placement="right" trigger="focus">
                                <slot name="reference">
                                    <div>
                                        <span>密码长度至少为6位</span>
                                        <br>
                                        <span>至少包含数字,字母,-_@!#中的两种</span>
                                    </div>
                                </slot>
                            </el-popover>
                            <el-input v-model="formInfo.password" v-popover:popover1 class="input-width" type="password" autocomplete="new-password" size="mini" placeholder="请输入密码" show-password></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="password2" label="确认密码:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.password2" class="input-width" type="password" autocomplete="new-password" size="mini" placeholder="请再次输入密码" show-password></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="legalRep" label="企业法人:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.legalRep" class="input-width" size="mini" placeholder="请输入企业法人"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="contacts" label="联系人:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.contacts" class="input-width" size="mini" placeholder="请输入联系人"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="idCardNo" label="法人身份证号:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.idCardNo" maxlength="18" class="input-width" size="mini" placeholder="请输入法人身份证号"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="companyName" label="企业名称:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.companyName" class="input-width" size="mini" placeholder="请输入企业名称"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="licenseNumber" label="统一信用代码:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.licenseNumber" class="input-width" size="mini" placeholder="请输入统一社会信用代码"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="address" label="企业地址:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.address" class="input-width" size="mini" placeholder="请输入企业详细地址"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item label="许可证类型:">
                        <el-checkbox-group v-model="formInfo.certTypes" :min="1">
                            <el-checkbox :label="2">生产许可证</el-checkbox>
                            <el-checkbox :label="1">经营许可证</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item v-if="Array.isArray(formInfo.certTypes) && formInfo.certTypes.includes(1)" prop="businessNo" label="经营许可证号:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.businessNo" class="input-width" size="mini" placeholder="请输入经营许可证号"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item v-if="Array.isArray(formInfo.certTypes) && formInfo.certTypes.includes(2)" prop="qsNo" label="生产许可证号:">
                        <div class="parent-again">
                            <el-input v-model="formInfo.qsNo" class="input-width" size="mini" placeholder="请输入生产许可证号"></el-input>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>            
        </s-card>
        <!-- <div class="register-form-item"> -->
        <s-card title="图片信息">
            <el-row class="mt-1">
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="idCardFace" label="法人身份证复印件:">
                        <div class="h-100" style="width: 400px;">
                            <s-upload-avator :value="formInfo.idCardFace"></s-upload-avator>
                            <div class="f-sm gray-500 text_img">
                                <div>图片大小限制为3M</div>
                                <div>图片类型为png,jpg,jpeg,gif</div>
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="6">
                    <el-form-item prop="businessLicenseUrl" label="营业执照:">
                        <div class="h-100" style="width: 400px;">
                            <s-upload-avator :value="formInfo.businessLicenseUrl"></s-upload-avator>
                            <div class="f-sm gray-500 text_img">
                                <div>图片大小限制为3M</div>
                                <div>图片类型为png,jpg,jpeg,gif</div>
                                <div>请上传清晰的营业执照照片</div>
                            </div>
                        </div>
                    </el-form-item>
                </el-col>
            </el-row>
        </s-card>

        <div class="d-flex justify-center">
            <el-button type="primary" @click="register">注册</el-button>
        </div>
    </el-form>
</template>

<script>
export default {
    data() {
        //第一次输入的密码
        const validatePass = (rule, value, cb) => {
            let typeNum = 0;
            if (value.match(/[a-zA-Z]/)) {
                typeNum++;
            }
            if (value.match(/[0-9]/)) {
                typeNum++;
            }
            if (value.match(/[-_@!#]/)) {
                typeNum++;
            }
            if (value.trim() === "") {
                cb(new Error("密码不能为空"));
            } else if (value.length < 6) {
                cb(new Error("密码长度至少为6位"));
            } else if (typeNum < 2) {
                cb(new Error("密码类型至少包含数字,字母,-_@!#中的两种"));
            } else {
                this.$refs.formInfo.validateField("password2");
                cb();
            }
        };
        //第二次输入的密码
        const validatePass2 = (rule, value, cb) => {
            if (value.trim() === "") {
                cb(new Error("密码不能为空"));
            } else if (value !== this.formInfo.password) {
                cb(new Error("两次输入密码不一致"));
            } else {
                cb();
            }
        };
        return {
            formInfo: {
                legalRep: "", //----------------企业法人
                idCardNo: "", //---------------法人身份证号
                password: "", //--------------------登录密码
                password2: "", //------------------重复密码
                username: "", //-----------------登录名称
                companyName: "", //----------------企业名称
                licenseNumber: "", //---------------统一信用代码
                address: "", //--------------企业地址
                province: "",
                provinceName: "",
                city: "",
                cityName: "",
                region: "",
                regionName: "",
                certTypes: [1], //-----------------许可证类型
                qsNo: "", //---------------生产许可证号
                businessNo: "", //----------------经营许可证号
                contacts: "", //--------------------联系人
                phone: "", //-----------------------电话
                code: "", //-------------------------验证码
                idCardFace: "", //---------------------身份证人脸面照片
                idCardNational: "", //-----------------身份证国徽面
                businessLicenseUrl: "" //-------------营业执照照片
            },
            //=====================================校验规则====================================//
            rules: {
                legalRep: [
                    {
                        required: true,
                        message: "请输入企业法人名称",
                        trigger: "blur"
                    }
                ],
                idCardNo: [
                    {
                        required: true,
                        message: "请输入法人身份证号",
                        trigger: "blur"
                    },
                    { len: 18, message: "请输入合法身份证号", trigger: "blur" }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur" },
                    { validator: validatePass, trigger: "blur" }
                ],
                password2: [
                    {
                        required: true,
                        message: "请再次输入密码",
                        trigger: "blur"
                    },
                    { validator: validatePass2, trigger: "blur" }
                ],
                username: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: "blur"
                    },
                    {
                        min: 2,
                        max: 18,
                        message: "用户名长度限制为2-18位",
                        trigger: "blur"
                    },
                    {
                        pattern: /[\u4e00-\u9fa5a-zA-Z0-9_]{2,18}/,
                        message: "允许中文字母数字下划线,长度2到18位",
                        trigger: "blur"
                    }
                ],
                companyName: [
                    {
                        required: true,
                        message: "请输入企业名称",
                        trigger: "blur"
                    }
                ],
                licenseNumber: [
                    {
                        required: true,
                        message: "请输入位统一信用社会代码",
                        trigger: "blur"
                    }
                ],
                address: [
                    {
                        required: true,
                        message: "请输入企业地址",
                        trigger: "blur"
                    }
                ],
                region: [
                    {
                        required: true,
                        message: "请选择完整的行政区域",
                        trigger: "change"
                    }
                ],
                qsNo: [
                    {
                        required: true,
                        message: "请输入生产许可证号",
                        trigger: "blur"
                    }
                ],
                businessNo: [
                    {
                        required: true,
                        message: "请输入经营许可证号",
                        trigger: "blur"
                    }
                ],
                contacts: [
                    { required: true, message: "请输入联系人", trigger: "blur" }
                ],
                phone: [
                    {
                        required: true,
                        message: "请输入电话号码",
                        trigger: "blur"
                    },
                    {
                        type: "string",
                        len: 11,
                        message: "请输入11位的手机号码",
                        trigger: "blur"
                    },
                    {
                        pattern: /\d{11}/,
                        message: "请输入正确的手机号码",
                        trigger: "blur"
                    }
                ],
                code: [
                    { required: true, message: "请输入验证码", trigger: "blur" }
                ],
                idCardFace: [
                    {
                        required: true,
                        message: "请输入身份证照片",
                        trigger: "blur"
                    }
                ],
                businessLicenseUrl: [
                    {
                        required: true,
                        message: "请输入营业执照",
                        trigger: "blur"
                    }
                ]
            }
        };
    },
    created() {},
    methods: {
        //=====================================用户注册信息====================================//
        register() {
            this.enableCommit = false;
            this.$refs.formInfo.validate((isPass, badField) => {
                if (!isPass) {
                    this.enableCommit = true;
                } else {
                    this.$message.success("操作成功");
                }
                console.log(isPass, badField);
            });
        }
    }
};
</script>



<style lang="scss">
.bbb .el-form-item {
    margin-bottom: 15px !important;
}
</style>
