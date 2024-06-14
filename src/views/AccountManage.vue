<template>
    <div>
        <el-header>
            <div class="title">
                <el-icon>
                    <Money />
                </el-icon>
                账户(<strong>{{account_num}}</strong>个)
            </div>
        </el-header>
        <el-main>
            <el-row v-for="(account, index) in account_data" :key="index" class="account-row">
                <el-card class="account-card">
                    <div class="account-info">
                        <strong>账号:</strong>{{ account.account_no }}
                        <span v-show="account.isPrimary==true" class="primary-tips">主账户</span>
                    </div>
                    <div>
                        <strong>余额:</strong>{{ account.balance }}
                    </div>
                    <div>
                        <strong>今日已交易:</strong>{{account.todayAmount}}
                    </div>
                    <div>
                        <strong>每日限额:</strong>{{account.limitAmount}}
                    </div>
                    <div class="button-group">
                        <!-- TODO 点击跳转交易记录，带上该账户的信息 -->
                        <el-button @click="tranrecord(account.account_no, account.balance)">交易记录</el-button>
                        <!-- TODO 点击跳转转账，带上该账户信息 -->
                        <el-button @click="transfer()">转账</el-button>
                        <!-- TODO 点击跳转存款，带上该账户信息 -->
                        <el-button @click="save(account.account_no, account.balance)" >存款</el-button>
                    </div>
                </el-card>
            </el-row>
        </el-main>
        <FootMenu></FootMenu>
    </div>
</template>

<script setup>
import FootMenu from "../components/Footer.vue";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { getAccountList, addAccount } from "../utils/accountService";
const router = useRouter();
const account_data = ref([]); // 账户信息
const account_num = ref(0); // 账户数量

// 挂载时加载账户
onMounted(() => {
    console.log("挂载")
    getAccountList().then((response) => {
        if (response.data.success) {
            console.log(response);
            account_num.value = response.data.data.length;
            console.log(account_num.value);
            account_data.value = response.data.data.map((item) => {
                return {
                    account_no: item.name,
                    balance: item.balance,
                    isPrimary: item.isPrimary,
                    todayAmount: item.transactionAmountToday,
                    limitAmount: item.transactionLimitationDaily,
                };
            });
        }
    });
});
// 跳转交易记录
const tranrecord = (acno, bal) => {
    router.push({
        path: '/transrecord',
        query: {
            account: acno,
            friend_account: null,
            balance: bal
        }
    })
}

// 跳转转账页面
const transfer = () => {
    router.push({
        path: "/transfer",
    });
};

//跳转存款页面
const save = (acno, bal) => {
    router.push({
        path: '/saving',
        query:{
            account: acno,
            balance: bal
        }
    })
}
</script>

<style scoped>
.el-header {
    display: flex;
    align-items: center;
}

.title {
    font-size: 7vw;
    font-weight: bold;
    color: #333333;
}

.account-row {
    margin: 10px 0;
}

.account-card {
    width: 100%;
    padding: 10px;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    background: linear-gradient(
        0deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 251, 220, 1) 47%,
        rgba(255, 245, 171, 1) 80%,
        rgba(255, 243, 163, 1) 98%,
        rgba(255, 228, 91, 1) 100%
    );
}

.account-info {
    display: flex;
    align-items: center;
}

.primary-tips {
    background-color: #ffcc00;
    padding: 2px 8px;
    border-radius: 3px;
    color: white;
    position: absolute;
    right: 0;
}
.button-group {
    margin-top: 10px;
    padding: 2vw;
    justify-content: space-between;
}
.el-button {
    margin: 0 5px;
    border-radius: 5px;
}
</style>