<template>
    <el-container>
        <el-main>
            <div class="op-result">
                <el-avatar shape="square" :size="100" :src="avatarUrl"></el-avatar>
                <h2>操作成功/失败</h2>
            </div>
            <div class="op-msg">
                <h3>消息，例如收款人：张无忌</h3>
            </div>
        </el-main>
        <el-footer>
            <div class="back-home">
                <el-button class="back-button" type="primary" @click="this.$router.push('/home')">返回首页</el-button>
            </div>
        </el-footer>
    </el-container>
</template>

<script setup>
const avatarUrl = ''; // 这里可以放置头像的URL
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
