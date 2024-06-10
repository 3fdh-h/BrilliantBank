<template>
    <div>
        <el-container style="padding:0">
            <el-header style="padding:0;margin:0">
                <div class="user-avatar">
                    <Avatar></Avatar>
                </div>
            </el-header>
            <el-main>
                <el-row style="height: 20vw">
                </el-row>
                <InfoList></InfoList>
                <el-row style="height: 25vw">
                </el-row>
                <el-row class="button-row">
                    <el-button class="infobtn" type="primary" size="large">修改登录密码</el-button>
                </el-row>
                <el-row class="button-row">
                    <el-button class="infobtn" type="primary">修改支付密码</el-button>
                </el-row>
                <el-row class="button-row">
                    <el-button class="infobtn" type="primary">退出登陆</el-button>
                </el-row>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <FootMenu></FootMenu>
            </el-footer>
        </el-container>
    </div>

</template>

<script setup>
import Avatar from "../components/Avatar.vue";
import FootMenu from "../components/Footer.vue";
import InfoList from "../components/InfoList.vue";
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
}

.user-avatar {
    margin-top: 3vw;
    display: flex;
    justify-content: center;
}
.button-row {
    display: flex;
    justify-content: center;
    width: 100%;
    margin: 10px 0;
}
.info-btn {
    height: 100%;
    width: 20vw;
    margin-top: 2vw;
    display: flex;
    justify-content: center;
}
.el-header {
    height: 30vw;
    padding: 0;
    margin: 0;
    background: linear-gradient(
        3deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 251, 220, 1) 31%,
        rgba(255, 245, 171, 1) 56%,
        rgba(255, 243, 163, 1) 67%,
        rgba(255, 228, 91, 1) 76%,
        rgba(255, 209, 0, 1) 84%,
        rgba(255, 209, 0, 1) 91%,
        rgba(255, 209, 0, 1) 94%,
        rgba(255, 209, 0, 1) 96%,
        rgba(255, 209, 0, 1) 98%,
        rgba(255, 209, 0, 1) 100%
    );
}
</style>