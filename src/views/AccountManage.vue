<template>
    <div>
        <el-header>
            <div class="title">
                <!-- TODO 接口获取账户数量 -->
                <el-icon>
                    <Money />
                </el-icon>
                账户(2个)
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
                    <div class="button-group">
                        <el-button @click="this.$router.push">交易记录</el-button>
                        <el-button @click="transfer()">转账</el-button>
                        <el-button>存款</el-button>
                    </div>
                </el-card>
            </el-row>
        </el-main>
        <FootMenu></FootMenu>
    </div>
</template>

<script setup>
import FootMenu from "../components/Footer.vue";
import { useRouter} from "vue-router"
const router = useRouter()
// TODO获取账户信息 
const account_data = [
    {
        account_no: "1234567890",
        balance: 1000,
        isPrimary: true,
    },
    {
        account_no: "1234567891",
        balance: 100,
        isPrimary: false,
    },
];

// 跳转转账页面
const transfer = () => {
    router.push({
        path: "/transfer",
    });
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