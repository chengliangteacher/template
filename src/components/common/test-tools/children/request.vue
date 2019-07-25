<template>
    <div>
        <el-autocomplete v-model="request.url" placeholder="例如：/v1/userinfo" class="w-75" :fetch-suggestions="getOldRequest" value-key="label" value="value" @select="handleInputChange">
            <el-select slot="prepend" v-model="request.method" placeholder="请选择">
                <el-option label="get" value="get"></el-option>
                <el-option label="post" value="post"></el-option>
            </el-select>
            <el-button slot="append" @click="sendAjax">发送请求</el-button>
        </el-autocomplete>
        <el-button type="warning" icon="el-icon-circle-close" @click="clearRequestList">清除记录</el-button>
        <div class="reqAndRes">
            <div class="my-editor">
                <s-code-editor v-model="request.params"></s-code-editor>
            </div>
            <div>&nbsp;&nbsp;&nbsp;</div>
            <div v-loading="loading" element-loading-text="数据加载中..." class="result">
                <pre class="h-100">{{ result }}</pre>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {
            //=====================================请求参数====================================//
            request: {
                url: "",
                method: "get",
                params: ""
            },
            result: "",
            //=====================================其他参数====================================//
            loading: false
        };
    },
    created() {
    },
    methods: {
        //=====================================检查路径是否正确====================================//
        formatPath() {

        },
        //=====================================发送ajax请求====================================//
        sendAjax() {
            let url = "";
            const params = this.request.params;
            const method = this.request.method;
            try {
                console.log(params)
                if (params !== "") {
                    JSON.parse(params)
                }
            } catch (error) {
                console.error(error);
                this.$message.warning("请求参数格式不对");
                return;
            }
            if (this.request.url.trim() === "") {
                this.$message.warning("请输入合法的请求url");
                return;
            }

            if (!this.request.url.startsWith("/")) {
                url = "/" + this.request.url;
            } else {
                url = this.request.url;
            }
            this.loading = true;
            if (this.request.method === "get") {
                this.axios({
                    method,
                    url,
                    params: params ? JSON.parse(params) : {}
                }).then(res => {
                    this.result = res;
                    this.saveRequestMsg(res.desc);
                    this.loading = false;
                }).catch(err => {
                    console.error(err)
                    this.loading = false;
                });
            } else if (this.request.method === "post") {
                this.axios({
                    method,
                    url,
                    data: params ? JSON.parse(params) : {}
                }).then(res => {
                    this.result = res;
                    this.saveRequestMsg(res.desc);
                    this.loading = false;
                }).catch(err => {
                    console.error(err)
                    this.loading = false;
                });
            }
        },
        //=====================================存储历史发送记录====================================//
        saveRequestMsg(describe = "") {
            const oldValue = JSON.parse(localStorage.getItem("searchList") || "[]");
            const hasValue = oldValue.every(val => val.value !== this.request.url);
            const currentPath = this.$route.path;
            const desc = describe;
           
            if (hasValue) {
                oldValue.push({
                    label: `${this.request.url}----${currentPath}----${desc}`,
                    value: this.request.url
                })
                localStorage.setItem("searchList", JSON.stringify(oldValue))                
            }
        },
        //=====================================清除历史记录====================================//
        clearRequestList() {
            localStorage.removeItem("searchList")
        },
        //======================================获取请求历史记录===================================//
        getOldRequest(query, cb) {
            const data = JSON.parse(localStorage.getItem("searchList") || "[]");
            console.log(data)
            cb(data)
        },
        handleInputChange(val) {
            this.request.url = val.value;
        }
    }
};
</script>



<style lang="scss">
    .el-input-group__prepend .el-input {
        width: 80px;
    }
    .reqAndRes {
        display: flex;
        .my-editor {
            height: 400px;
            width: 40%;
        }     
        .result {
            flex: 0 0 auto;
            width: 60%;
            height: 360px;
            pre {
                 overflow-y: scroll;
            }
        }   
    }
    fieldset {
        border-width: 1px 0 0;
        border-color: #e7e7e7;
        border-style: solid;
        padding: 0;
        legend {
            padding: 0 1em;
            margin-left: 2em;
            font-size: 1.3em;
            cursor: default;
            &:hover {
                color: $gray-300;
            }
        }
    }

</style>
