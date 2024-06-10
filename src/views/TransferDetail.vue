<template>
    <el-container>
        <el-header>
            <el-row style="height: 8vw">
                <el-col :span="5">
                    <div class="back-btn" @click="backToPre()">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                        <span>返回</span>
                    </div>
                </el-col>
                <el-col :span="5">
                </el-col>
                <!-- TODO 根据不同入口展现不同文案 -->
                <span>向他人转账</span>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <div class="receive-info">
                <el-row class="receive-person">
                    <el-col :span="7">
                        <h1>收款账户</h1>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <!-- TODO 点击后弹窗回到转账界面 -->
                        <el-button type="primary" class="select-button" @click="this.$router.push('/transfer')">重新选择</el-button>
                    </el-col>
                </el-row>
                <el-row class="receive-name">
                    <el-col :span="6">
                        <h2>户名</h2>
                    </el-col>
                    <el-col :span="18" class="right-container">
                        <!-- TODO 从来源获取用户信息 -->
                        <h2>张思</h2>
                    </el-col>
                </el-row>
                <el-row class="receive-account">
                    <el-col :span="6">
                        <h2>账号</h2>
                    </el-col>
                    <el-col :span="18" class="right-container">
                        <h2>1234567654321</h2>
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div class="amount-input">
                <el-row>
                    <h2>转账金额</h2>
                </el-row>
                <el-row>
                    <div class="amount-button">
                        <el-button class="amount-chose" plain @click="fitAmount(100)">100</el-button>
                        <el-button class="amount-chose" plain @click="fitAmount(500)">500</el-button>
                        <el-button class="amount-chose" plain @click="fitAmount(1000)">1000</el-button>
                        <el-button class="amount-chose" plain @click="fitAmount(5000)">5000</el-button>
                    </div>
                </el-row>
                <el-row class="input-container">
                    <el-col :span="3">
                        <h1>￥</h1>
                    </el-col>
                    <el-col :span="21">
                        <!-- TODO max属性可以控制输入框的最大值 -->
                        <el-input v-model="transfer_amount" type="number" placeholder="请输入金额" suffix-icon="Coin" style="height:10vw"></el-input>
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <div class="pay-account">
                <el-row class="receive-person">
                    <el-col :span="7">
                        <h1>收款账户</h1>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <!-- TODO 点击后弹窗选择账户 -->
                        <el-button type="primary" class="select-button" @click="dialogFormVisible=true">重新选择</el-button>
                    </el-col>
                </el-row>
                <el-row class="receive-name">
                    <el-col :span="6">
                        <h2>账号</h2>
                    </el-col>
                    <el-col :span="18" class="right-container">
                        <!-- TODO 从来源获取用户信息 -->
                        <h2>09876567890</h2>
                    </el-col>
                </el-row>
                <el-row class="receive-account">
                    <el-col :span="7">
                        <h2>可用余额</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h2>￥100</h2>
                    </el-col>
                </el-row>
            </div>
            <div class="memo">
                <h3>备注</h3>
                <el-input v-model="transfer_memo" type="textarea" placeholder="请输入备注信息" maxlength="100"></el-input>
            </div>
            <el-row></el-row>
            <el-row>
                <div class="next-step">
                    <!-- TODO 下一步之前检查：
                    1. 是否超过限额
                    2. 余额是否够用 -->
                    <!-- TODO 必填信息未填之前禁止下一步按钮 -->
                    <el-button class="submit-button" bg @click="toCommit()">下一步</el-button>
                </div>
            </el-row>
        </el-main>
    </el-container>
    <!-- TODO 弹窗展示自己的所有账户 -->
    <el-dialog v-model="dialogFormVisible">
        
    </el-dialog>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import AccountVue from "../components/Account.vue";
const router = useRouter();
let transfer_amount = ref(null);
let transfer_memo = ref("");
let dialogFormVisible = ref(false);  // 表单
// 返回转账界面
const backToPre = () => {
    router.push("/transfer");
};
// 点击按钮填充输入框
const fitAmount = (amount) => {
    transfer_amount.value = amount;
};
// 跳转确认转账
const toCommit = () => {
    router.push("/trancommit")
}
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
}
.el-header {
    background-color: #fff;
    color: #333;
    text-align: center;
    line-height: 60px;
    font-size: 20px;
    font-weight: 600;
}
.el-main {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: scroll;
}
.el-row {
    height: 12vw;
}
.back-btn {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    padding-left: 0;
}
.right-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}
.select-button {
    height: 10vw;
    width: 22vw;
    font-size: 4vw;
    font-family: emoji;
    font-weight: 900;
}
/* 金额输入框样式 */
.input-container {
    display: flex;
    align-items: center;
}
.amount-chose {
    height: 9vw;
    width: 19vw;
    font-size: 4vw;
    font-family: emoji;
    font-weight: 900;
}
.next-step{
    width: 100%;
    height: 10vw;
    position: absolute;
    bottom: 0;
    left: 0;
}
.submit-button {
    width: 100%;
    height: 10vw;
}
</style>