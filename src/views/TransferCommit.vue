<template>
    <el-container>
        <el-header>
            <el-row style="height: 8vw">
                <el-col :span="5">
                    <div class="back-btn" @click="backToTra()">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                        <span>返回按钮</span>
                    </div>
                </el-col>
                <el-col :span="14" class="header-title">
                    转账确认
                </el-col>
                <el-col :span="5">
                </el-col>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <div class="transfer-info">
                <el-row>
                    <el-col :span="7">
                        <h2>收款人</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h3>张无忌</h3>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <h2>收款账号</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h3>123456789012345678</h3>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <h2>转账金额</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h3>￥1234.56</h3>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <h2>付款账号</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h3>123456789012345678</h3>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <h2>备注</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h3>买花</h3>
                    </el-col>
                </el-row>
            </div>
            <el-divider />
            <el-row style="height: 20vw"></el-row>
            <div class="password-input">
                <el-row>
                    <el-col :span="24">
                        <el-input v-model="pay_pwd" type="password" placeholder="支付密码" style="height:15vw"></el-input>
                    </el-col>
                </el-row>
                <el-row>
                    <!-- TODO 错误信息需要自定义 -->
                    <el-col :span="24" v-show="error_msg!=''" class="error-message">
                        {{error_msg.value}}
                    </el-col>
                </el-row>
                <el-row class="keypad">
                    <el-button class="keypad-button" @click="input_number(1)">1</el-button>
                    <el-button class="keypad-button" @click="input_number(2)">2</el-button>
                    <el-button class="keypad-button" @click="input_number(3)">3</el-button>
                    <el-button class="keypad-button" @click="input_number(4)">4</el-button>
                    <el-button class="keypad-button" @click="input_number(5)">5</el-button>
                    <el-button class="keypad-button" @click="input_number(6)">6</el-button>
                    <el-button class="keypad-button" @click="input_number(7)">7</el-button>
                    <el-button class="keypad-button" @click="input_number(8)">8</el-button>
                    <el-button class="keypad-button" @click="input_number(9)">9</el-button>
                    <el-button class="keypad-button" @click="transfer_confirm()">确认</el-button>
                    <el-button class="keypad-button" @click="input_number(0)">0</el-button>
                    <el-button class="keypad-button" @click="backspace_one()">退格</el-button>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
const router = useRouter();
let pay_pwd = ref(""); // 输入的密码
let error_msg = ref(""); // 错误消息
const backToTra = () => {
    router.push("/transfer");
};
// 按钮输入数字到输入框
const input_number = (key) => {
    if (pay_pwd.value.length < 6) {
        pay_pwd.value += key;  // 手动限制输入长度
    }
};
// TODO 确认密码后需要检查
const transfer_confirm = () => {
    //1. 检查密码
};
// 退格
const backspace_one = () => {
    pay_pwd.value = pay_pwd.value.slice(0, -1);
};
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
.header-title {
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-main {
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
    overflow-y: scroll;
}
.el-row {
    margin-bottom: 1vw;
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
.transfer-info {
    padding: 1vw;
}
.password-input {
    padding: 1vw;
}
.error-message {
    color: red;
    text-align: center;
    font-size: 4vw;
    margin: 1vw 0;
}
.keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1vw;
}
.keypad-button {
    height: 10vw;
    font-size: 4vw;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0;
}
.next-step {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 1vw 0;
}
</style>
