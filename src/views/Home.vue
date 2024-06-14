<template>
    <div>
        <el-container style="padding:0">
            <el-header style="padding:0;margin:0">
                <MyHeader></MyHeader>
            </el-header>
            <el-main style="padding:0">
                <LogoVue></LogoVue>
                <el-row></el-row>
                <FuncArea></FuncArea>
                <Slider></Slider>
                <router-view></router-view>
                <!-- TODO 从支付宝、云闪付截图直接贴上来 -->
                <el-row>
                    <div>
                        <img style="width: 100%; height: auto;" src="../assets/images/home-banner-1.jpg" />
                    </div>
                </el-row>
                <el-row>
                    <div>
                        <img style="width: 100%; height: auto;" src="../assets/images/home-banner-3.jpg" />
                    </div>
                </el-row>
            </el-main>
            <el-footer>
                <FootMenu></FootMenu>
            </el-footer>
        </el-container>
    </div>
</template>

<script setup>
import MyHeader from "../components/Header.vue";
import FootMenu from "../components/Footer.vue";
import LogoVue from "../components/Logo.vue";
import FuncArea from "../components/FuncArea.vue";
import Slider from "../components/Slider.vue";
import { onMounted } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { useRoute, useRouter} from "vue-router";

const router = useRouter();
const route = useRoute();

var websocket = null;
onMounted(() => {
    var clientId = sessionStorage.getItem("info");
    connectWebSocket(clientId)
})
//连接WebSocket节点
function connectWebSocket(clientId) {
    if ("WebSocket" in window) {
        websocket = new WebSocket("ws://localhost:8080/ws/" + clientId);
        websocket.onerror = function () {
            logMessage("连接错误");
        };
        websocket.onopen = function () {
            logMessage("连接成功");
        };
        websocket.onmessage = function (event) {
            setMessage(event.data);
        };
        websocket.onclose = function () {
            logMessage("连接已关闭");
        };
        window.onbeforeunload = function () {
            websocket.close();
        };
    } else {
        alert("不支持websocket");
    }
}

//将消息显示在网页上
function setMessage(data) {
    ElNotification({
    title: '很行银行',
    message: '您有一笔新的交易，点击查看详情',
    duration: 5000,
    onClick: () => {
        const parsedData = JSON.parse(data);
        console.log(parsedData)
        console.log(parsedData.transactionId)
        router.push({
            path: '/recorddetail',
            query: {
                recordId: parsedData.transactionId
            }
        })
    }
  })
}
// 打印消息
function logMessage(msg) {
    console.log(msg);
}

//发送消息
function send(message) {
    if (!websocket) {
        ElMessage.error("websocket未连接，无法发送消息");
        return;
    }
    websocket.send(message);
}

//关闭连接
function closeWebSocket() {
    if (!websocket) {
        console.log("连接已关闭");
        return;
    }
    websocket.close();
}
</script>

<style>
html,
body {
    margin: 0;
    padding: 0;
}

.el-footer {
    padding: 0;
}
</style>
