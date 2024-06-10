<template>
    <el-card style="max-width: 480px">
        <template #header>
            <div class="card-header">
                <span style="font-size:5vw">个人信息</span>
            </div>
        </template>
        <div v-for="(listitem, index) in info" :key="index" class="info-item">
            <span>{{ listitem.item }}</span>
            <span>{{ listitem.value }}</span>
        </div>
    </el-card>
</template>
<script setup>
import { ref } from 'vue'
// 个人信息页的数据项
// TODO 需要从接口获取信息
const info = [
    { item: "姓名", value: "张三" },
    { item: "手机号", value: "12345678901" },
];
</script>

<style scoped>
.info-item {
    display: flex;
    justify-content: space-between;
    margin: 5vw 0;
    font-size: 5vw;
}
</style>