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
                <span>对外转账</span>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <div class="receive-info">
                <el-row class="receive-person">
                    <el-col :span="7">
                        <h1>收款人</h1>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <el-input v-model="receiveOne.name" placeholder="请输入收款人" type="large"></el-input>
                    </el-col>
                </el-row>
                <el-row class="receive-name">
                    <el-col :span="7">
                        <h2>账号</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <el-input v-model="receiveOne.account" placeholder="请输入账号" type="large"></el-input>
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
                        <h1>付款账户</h1>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <!-- TODO 点击后弹窗选择账户 -->
                        <el-button type="primary" class="select-button" @click="ChooseAccount()">重新选择</el-button>
                    </el-col>
                </el-row>
                <el-row class="receive-name">
                    <el-col :span="6">
                        <h2>账号</h2>
                    </el-col>
                    <el-col :span="18" class="right-container">
                        <!-- TODO 从来源获取用户信息 -->
                        <h2>{{giveOne.account}}</h2>
                    </el-col>
                </el-row>
                <el-row class="receive-account">
                    <el-col :span="7">
                        <h2>可用余额</h2>
                    </el-col>
                    <el-col :span="17" class="right-container">
                        <h2>￥{{giveOne.balance}}</h2>
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
                    <el-button class="submit-button" bg @click="toCommit()" :disabled="isSubmitDisabled">下一步</el-button>
                </div>
            </el-row>
        </el-main>
    </el-container>
    <!-- TODO 弹窗展示自己的所有账户 -->
    <el-dialog v-model="dialogFormVisible" title="选择账户" width="80vw">
        <h3>账户{{acc_num}}个</h3>
        <el-scrollbar height="40vw">
            <el-radio-group v-model="selectedAccount">
                <el-radio v-for="(acc, index) in acc_data" :key="index" :label="acc.acc_no" border @click="changeAcc(acc)" class="account-radio">
                    <span>账号：{{ acc.acc_no }}</span>
                    <br />
                    <span>余额：{{ acc.balance }}</span>
                    <br />
                    <span>今日已交易额：{{ acc.todayAmount }}</span>
                    <br />
                    <span>每日限额：{{ acc.limitAmount }}</span>
                </el-radio>
            </el-radio-group>
        </el-scrollbar>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmAcc()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { getAccountList } from "../utils/accountService";
const router = useRouter();
const route = useRoute();
// 收款方信息
const receiveOne = ref({
    name: "",
    account: ""
})
// 支付信息
let transfer_amount = ref(0);
let transfer_memo = ref("");
// 付款方
const giveOne = ref({
    account: "",
    balance: 0,
});
let acc_num = ref(0); //账户数量
// 所有账户数据
const acc_data = ref([]);
let dialogFormVisible = ref(false); // 表单

// 挂载时加载收款和付款信息
onMounted(() => {
    // 填充付款账号，默认为主账户
    getAccountList().then((response) => {
        if (response.data.success) {
            for (let i = 0; i < response.data.data.length; i++) {
                if (response.data.data[i].isPrimary == 1) {
                    giveOne.value.account = response.data.data[i].name;
                    giveOne.value.balance = response.data.data[i].balance;
                }
            }
        }
    });
});
// 返回转账界面
const backToPre = () => {
    router.back();
};
// 点击按钮填充输入框
const fitAmount = (amount) => {
    transfer_amount.value = amount;
};
let selectedAccount = ref(null); // 选中的账户
// 重选付款账户
const ChooseAccount = () => {
    dialogFormVisible.value = true;
    // 清空之前的账户数据
    acc_data.value = [];
    // 获取数据赋给数据显示在表单
    getAccountList().then((response) => {
        console.log(response);
        if (response.data.success) {
            acc_num.value = response.data.data.length;
            for (let i = 0; i < response.data.data.length; i++) {
                acc_data.value.push({
                    acc_no: response.data.data[i].name,
                    balance: response.data.data[i].balance,
                    todayAmount: response.data.data[i].transactionAmountToday,
                    limitAmount:
                        response.data.data[i].transactionLimitationDaily,
                });
            }
        }
    });
};

// 选择单选框后
const changeAcc = (acc) => {
    giveOne.value.account = acc.acc_no;
    giveOne.value.balance = acc.balance;
};
// 确认单选框选择之后
const confirmAcc = () => {
    dialogFormVisible.value = false;
    console.log(giveOne.value.account);
};
// 计算属性来控制按钮的禁用状态
const isSubmitDisabled = computed(() => {
    return (
        transfer_amount.value == null ||
        transfer_amount.value <= 0 ||
        transfer_amount.value > giveOne.value.balance ||
        receiveOne.value.account == null ||
        receiveOne.value.name == null
    );
});
// 跳转确认转账
const toCommit = () => {
    router.push({
        path: "/tranoutcommit",
        query: {
            receive_name: receiveOne.value.name,
            receive_account: receiveOne.value.account,
            give_account: giveOne.value.account,
            amount: transfer_amount.value,
            memo: transfer_memo.value,
        },
    });
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
.next-step {
    width: 100%;
    height: 10vw;
    position: absolute;
    bottom: 0;
    left: 0;
}
/* TODO 单选样式部分问题 */
.account-radio {
    width: 100%;
    height: 20vw;
}
.submit-button {
    width: 100%;
    height: 10vw;
}
</style>