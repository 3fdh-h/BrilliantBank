<template>
    <el-container>
        <el-main>
            <div class="op-result">
                <el-result icon="success" :title="`${transferInfo.type} ${transferInfo.name} ${transferInfo.amount}`" :sub-title="`${transferInfo.type}成功`" />
            </div>
            <el-row>
                <span>{{transferInfo.time}}</span>
            </el-row>
            <el-row style="height: 5vw"></el-row>
            <el-row>
                <span>{{transferInfo.remarks}}</span>
            </el-row>
        </el-main>
        <el-footer>
            <div class="back-home">
                <el-button class="back-button" type="primary" @click="router.push('/home')">返回首页</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

// 路由相关
const router = useRouter();
const route = useRoute();

// 页面信息
const transferInfo = ref({
    amount: "",
    type: "",
    name: "",
    time: "",
    remarks: "",
});

// 挂载时加载转账信息
onMounted(() => {
    transferInfo.value.amount = route.query.amount,
    transferInfo.value.type = route.query.type,
    transferInfo.value.name = route.query.name,
    transferInfo.value.time = route.query.time,
    transferInfo.value.remarks = route.query.remarks;
});
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
}
.el-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
}
.el-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 20vh; /* 调整此值来改变内容的垂直位置 */
    flex: 1;
}
.op-result {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2vw;
    margin-bottom: 5vw;
}
.op-msg {
    display: flex;
    justify-content: center;
    padding: 2vw;
    margin-bottom: 5vw;
}
.back-home {
    display: flex;
    justify-content: center;
    padding: 2vw;
}
.back-button {
    width: 80%;
    height: 10vw;
}
</style>
