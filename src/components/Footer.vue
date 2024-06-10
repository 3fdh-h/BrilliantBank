<template>
    <div class="footer">
        <div class="container">
            <el-row>
                <el-col :span="2"></el-col>
                <el-col :span="4">
                    <div class="foot-item" @click="navigateTo('/home')">
                        <el-icon>
                            <House />
                        </el-icon>
                        <span>首页</span>
                    </div>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="4">
                    <div class="foot-item" @click="navigateTo('/accountmanage')">
                        <el-icon>
                            <CreditCard />
                        </el-icon>
                        <span>账户</span>
                    </div>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="4">
                    <div class="foot-item" @click="navigateTo('/my')">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>我的</span>
                    </div>
                </el-col>
                <el-col :span="2"></el-col>
            </el-row>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter()
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    height: 14vw;
    position: fixed;
    left: 0;
    bottom: 0;
    align-items: center;
    background-color: #ffd100;
    border-top: solid 1px #ddd;
}
.container {
    width: 100%;
    height: 100%;
}
.foot-item {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
    height: 100%;
}
.foot-item span {
    font-size: 3vw;
    font-family: "Microsoft YaHei";
}
.foot-item .el-icon {
    font-size: 7vw;
}
</style>