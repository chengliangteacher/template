/*
    创建者：shuxiaokai
    创建时间：2019-05-06 21:13
    模块名称：xxxx
    备注：xxxx
*/
<template>
    <div class="mock">
        <fieldset class="mb-2">
            <legend class="orange f-lg mb-2">{{ title }}</legend>
            <el-button type="primary" @click="generateData">生成标准数据</el-button>
            <el-button type="success" @click="generateRandomData">生成数据</el-button>
            <el-button type="success" @click="generateRandomDataAndSend">生成并且发送</el-button>
            <el-button type="success" @click="generateRandomDataAndSendMore">{{ sendMsg }}</el-button>
        </fieldset>
        <div class="mockdata">
            <el-collapse v-model="activeNames">
                <el-collapse-item title="常用" name="13">
                    <span class="name" @click="copyName('/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/',$event)">身份证号</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.id()',$event)">社保号</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('/^1(3|4|5|7|8)\d{9}$/',$event)">手机号码</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.zip()',$event)">生成一个邮政编码（六位数字）</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('/^[a-zA-Z]{2}[ ]?(\d{4}[ ]?\d{4}[ ]?\d{4})$/',$event)">生产许可证号</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('/^[a-zA-Z]{2}[ ]?(\d{4}[ ]?\d{4}[ ]?\d{4})$/',$event)">经营许可证号</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.zip()',$event)">生成一个邮政编码（六位数字）</span> &nbsp;&nbsp;
                </el-collapse-item>
                <el-collapse-item title="数字类型" name="1">
                    <span class="name" @click="copyName('Random.natural()',$event)">自然数</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.integer()',$event)">整数</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.integer()',$event)">正整数</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.integer()',$event)">负整数</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.float()',$event)">浮点数</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('/^1(3|4|5|7|8)\d{9}$/',$event)">手机号码</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.zip()',$event)">邮政编码</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.boolean()',$event)">布尔值</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/',$event)">身份证号</span>&nbsp;&nbsp;
                </el-collapse-item>
                <el-collapse-item title="文本类型" name="2">
                    <span class="name" @click="copyName('Random.character()',$event)">字符</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.string()',$event)">字符串</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.ccompany()',$event)">企业名称</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.cname()',$event)">中文姓名</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.address()',$event)">企业地址</span> &nbsp;&nbsp;
                </el-collapse-item>
                <el-collapse-item title="时间类型" name="5">
                    <span class="name" @click="copyName('Random.date()',$event)">日期字符串</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.time()',$event)">时间字符串</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.datetime()',$event)">日期和时间字符串</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Ranndom.now()',$event)">当前的日期和时间字符串</span>&nbsp;&nbsp;
                </el-collapse-item>
                <el-collapse-item title="图片和文件类型" name="7">
                    <span class="name" @click="copyName('Random.image()',$event)">图片</span>&nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.file()',$event)">文件</span>&nbsp;&nbsp;
                </el-collapse-item>
                <el-collapse-item title="地址类型" name="12">
                    <span class="name" @click="copyName('Random.address()',$event)">企业地址</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.region()',$event)">生成一个（中国）大区</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.province()',$event)">生成一个（中国）省（或直辖市、自治区、特别行政区）</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.city()',$event)">生成一个（中国）市</span> &nbsp;&nbsp;
                    <span class="name" @click="copyName('Random.county()',$event)">生成一个（中国）县</span> &nbsp;&nbsp;
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
// import { setTimeout } from "timers";
export default {
    data() {
        return {
            title: "", //测试页面名称
            triggerName: "", //触发store里面函数名称
            sendMsg: "生成并且持续发送",
            loading: false,
            activeNames: ["1"]
        };
    },
    watch: {
        $route() {
            this.initData();
        }
    },
    created() {
        this.initData();
    },
    methods: {
        //=====================================右键复制发方法====================================//
        copyName(name, e) {
            console.dir(e.target);
            const input = document.createElement("input");
            const x = e.target.getBoundingClientRect()["left"];
            const y = e.target.getBoundingClientRect()["top"];
            input.value = name;
            document.body.appendChild(input);
            input.select();
            document.execCommand("Copy");
            document.body.removeChild(input);
            const copy = document.createElement("span");
            copy.style.position = "fixed";
            copy.style.left = x + "px";
            copy.style.top = y - 24 + "px";
            copy.style.zIndex = 9999;
            copy.style.color = "#3b3";
            copy.innerHTML = "复制成功";
            copy.style.transition = "all 1s";
            document.body.appendChild(copy);
            requestAnimationFrame(() => {
                copy.style.transform = `translate3D(0, -1rem, 0)`;
            });
            copy.addEventListener("transitionend", () => {
                console.log("end");
            });
            setTimeout(() => {
                copy.remove();
            }, 500);
        },
        //=====================================初始化数据====================================//
        initData() {
            const testInfo = this.$route.meta ? this.$route.meta.testInfo : {};
            this.title = testInfo ? testInfo.desc : "";
            this.triggerName = testInfo ? testInfo.trigger : "";
        },
        //================================生成标准数据=========================================//
        generateData() {
            this.$store.commit("initData", this.$route.meta);
        },
        //=================================生成数据========================================//
        generateRandomData() {
            this.$store.commit("initRandomData", this.$route.meta);
        },
        //=====================================生成数据并且发送====================================//
        generateRandomDataAndSend() {
            this.$store.commit("initRandomDataAndSend", this.$route.meta);
        },
        //=====================================无限生成数据并且发送====================================//
        generateRandomDataAndSendMore() {
            if (this.$store.state.testData.enableSendMoreMsg) {
                this.sendMsg = "生成并且持续发送";
                // this.loading = false;
            } else {
                this.sendMsg = "停止";
                // this.loading = true;
            }
            this.$store.commit("initRandomDataAndSendMore", this.$route.meta);
        }
    }
};
</script>



<style lang="scss">
.name {
    cursor: pointer;
    .mockdata {
    }
}
</style>
