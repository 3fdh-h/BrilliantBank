<template>
    <el-row class="func-area" style="height: 25vw">
        <el-col :span="1">
        </el-col>
        <el-col :span="4" class="logo-container">
            <div>
                <img class="func-logo" src="../assets/icons/存款.png" alt="" style="width: 90%; height: auto;">
                <span>存款</span>
            </div>
        </el-col>
        <el-col :span="2">

        </el-col>
        <el-col :span="4" class="logo-container">
            <div>
                <img class="func-logo" src="../assets/icons/付款.png" alt="" style="width: 90%; height: auto;">
                <span>付款</span>
            </div>
        </el-col>
        <el-col :span="2">

        </el-col>
        <el-col :span="4" class="logo-container">
            <div>
                <img class="func-logo" src="../assets/icons/转账.png" alt="" style="width: 90%; height: auto;">
                <span>转账</span>
            </div>
        </el-col>
        <el-col :span="2">

        </el-col>
        <el-col :span="4" class="logo-container">
            <div>
                <img class="func-logo" src="../assets/icons/账户管理.png" alt="" style="width: 90%; height: auto;">
                <span>账户管理</span>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
</script>

<style scoped>
.logo-container {
    text-align: center;
}
.func-logo {
    border: solid 1px rgb(191, 176, 99);
    background: linear-gradient(
        187deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 251, 220, 1) 87%,
        rgba(255, 245, 171, 1) 90%,
        rgba(255, 243, 163, 1) 94%,
        rgba(255, 228, 91, 1) 97%,
        rgba(255, 209, 0, 1) 98%,
        rgba(255, 209, 0, 1) 100%
    );
    border-radius: 15px;
}
</style>