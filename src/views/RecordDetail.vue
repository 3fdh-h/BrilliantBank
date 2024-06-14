<template>
    <el-container>
        <el-header>
            <el-row style="height: 8vw">
                <el-col :span="5">
                    <div class="back-btn" @click="goBack">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                        <span>返回</span>
                    </div>
                </el-col>
                <el-col :span="14" class="header-title">
                    交易详情
                </el-col>
                <el-col :span="5">
                </el-col>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <div class="transaction-info">
                <h3>{{ transaction.oppo_name }}</h3>
                <el-avatar :src="transaction.oppo_avatar" :size="100" />
                <h1 :class="amountClass">{{ formattedAmount }}</h1>
                <el-row>
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">交易类型：</span>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="info-item">
                            <span v-if="transaction.type==1">转出</span>
                            <span v-if="transaction.type==2">转入</span>
                            <span v-if="transaction.type==3">存款</span>
                            <span v-if="transaction.type==4">消费</span>
                            <span v-if="transaction.type==5">收款</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">交易时间：</span>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="info-item">
                            <span>{{ transaction.time }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">对方账号：</span>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="info-item">
                            <span>{{ transaction.oppo_account }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">商品描述：</span>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="info-item">
                            <span>{{ transaction.remarks }}</span>
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="8">
                        <div class="info-item">
                            <span class="label">余额：</span>
                        </div>
                    </el-col>
                    <el-col :span="16">
                        <div class="info-item">
                            <span>{{ transaction.balance }}</span>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <el-divider />
            <div class="back-btn-container">
                <el-button type="primary" @click="goBack">返回</el-button>
            </div>
        </el-main>
    </el-container>
</template>


<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ArrowLeft } from "@element-plus/icons-vue";
import { getRecDetailApi } from "../utils/transacRecordService";
import { ElMessage } from "element-plus";

const router = useRouter();
const route = useRoute();
const recordId = ref(0);
const transaction = ref({
    type: "",
    time: "",
    oppo_name: "",
    oppo_account: "",
    oppo_avatar: "",
    remarks: "",
    balance: "",
    amount: "",
});

onMounted(() => {
    console.log("挂载");
    console.log(route.query.recordId)
    recordId.value = parseInt(route.query.recordId);
    console.log(recordId.value)
    getRecDetailApi(recordId.value).then((response) => {
        if (response.data.success) {
            transaction.value.type = response.data.data.type;
            transaction.value.time = response.data.data.time;
            transaction.value.oppo_name = response.data.data.opponentUserName;
            transaction.value.oppo_account = response.data.data.opponentAccountName;
            transaction.value.oppo_avatar = response.data.data.opponentAvatar;
            transaction.value.remarks = response.data.data.remark;
            transaction.value.balance = response.data.data.balance;
            transaction.value.amount = response.data.data.amount;
        }else {
            ElMessage.error("获取交易记录失败，请退出重试")
        }
    });
});

const goBack = () => {
    router.back();
};

const amountClass = computed(() => {
    return (transaction.value.type == 1 || transaction.value.type == 4) ? 'negative' : 'positive';
});

const formattedAmount = computed(() => {
    let sign = (transaction.value.type == 1 || transaction.value.type == 4) ? '-' : '+';
    return `${sign}${transaction.value.amount}`;
});
</script>


<style scoped>
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
    padding: 2vw;
}

.transaction-info {
    text-align: center;
    margin-bottom: 20px;
}

.logo {
    width: 50px;
    height: 50px;
    margin: 10px 0;
}

h1 {
    font-size: 2em;
    margin: 10px 0;
}

.negative {
    color: red;
}

.positive {
    color: green;
}

.info-item {
    margin: 10px 0;
}

.label {
    font-weight: bold;
}

.back-btn {
    display: flex;
    align-items: center;
    cursor: pointer;
}

.back-btn-container {
    text-align: center;
    margin-top: 20px;
}
</style>
