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
                <el-col :span="5"></el-col>
                <span>交易记录</span>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <div class="select-condition">
                <el-row>
                    <el-col :span="17">当前账户:{{ condition.account }}</el-col>
                    <el-col :span="7">
                        <el-button type="primary" @click="ChooseAccount()">切换账户</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <span>余额 :{{ display.balance }}</span>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <span>总收入 :+{{ display.all_income }}</span>
                    </el-col>
                    <el-col :span="12">
                        <span>总支出 :-{{ display.all_outcome }}</span>
                    </el-col>
                </el-row>
                <el-row>
                    <div class="date-picker">
                        <span class="demonstration">开始日期&nbsp;</span>
                        <el-date-picker v-model="condition.datebegin" type="date" placeholder="选择开始日期" />
                    </div>
                </el-row>
                <el-row>
                    <div class="date-picker">
                        <span class="demonstration">结束日期&nbsp;</span>
                        <el-date-picker v-model="condition.dateend" type="date" placeholder="选择结束日期" />
                    </div>
                </el-row>
                <el-row>
                    <span>交易类型&nbsp;</span>
                    <el-select v-model="condition.type" placeholder="选择交易类型" size="default" style="width: 51vw">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                </el-row>
                <el-row>
                    <el-col :span="5">
                        <span>共{{record_num}}条</span>
                    </el-col>
                    <el-col :span="7">
                        <el-button type="success" @click="exportReco()">
                            导出记录
                        </el-button>
                    </el-col>
                </el-row>
            </div>
            <el-divider></el-divider>
            <el-scrollbar>
                <div class="transaction-records">
                    <el-row v-for="record in records" :key="record.recordId" class="record-item" gutter="10" @click="toDetail(record.recordId)">
                        <el-col :span="6">
                            <el-avatar :src="record.opponentAvatar" />
                        </el-col>
                        <el-col :span="18">
                            <div>{{ record.opponentUserName }}</div>
                            <div>{{ record.time }}</div>
                            <div :class="{ income: (record.type == 2||record.type == 3||record.type==5), outcome: (record.type == 1||record.type==4||record.typ==6) }">
                                {{ (record.type == 2||record.type == 3||record.type == 5) ? '+' : '-' }}{{ record.amount }}
                            </div>
                            <div>余额: {{ record.balance }}</div>
                        </el-col>
                    </el-row>
                </div>
            </el-scrollbar>
        </el-main>
    </el-container>
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
import { ref, onMounted, watch } from "vue";
import { getAccountList } from "../utils/accountService";
import {
    getRecordByCondApi,
    exportRecoApi,
} from "../utils/transacRecordService";
import { useRoute, useRouter } from "vue-router";
import dayjs from "dayjs";
const router = useRouter();
const route = useRoute();

const dialogFormVisible = ref(false);
const acc_data = ref([]);
const acc_num = ref(0);
// 筛选条件集合
const condition = ref({
    account: "",
    datebegin: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    dateend: dayjs().format("YYYY-MM-DD"),
    type: 1,
    friend_accout: "",
});
// 展示数额
const display = ref({
    balance: "",
    all_income: "",
    all_outcome: "",
});

// 交易记录集合
const records = ref([]);
const record_num = ref(0);
// 交易类型选项
const options = [
    { value: 1, label: "转出" },
    { value: 2, label: "转入" },
    { value: 3, label: "存款" },
    { value: 4, label: "消费" },
    { value: 5, label: "收款" },
    { value: 6, label: "取款" }, // 忽略取款
];

// 获取交易类型
const getTransactionType = (type) => {
    const option = options.find((opt) => opt.value === String(type));
    return option ? option.label : "未知类型";
};
// 获取交易记录
const getRecords = () => {
    getRecordByCondApi(
        condition.value.type,
        condition.value.account,
        condition.value.friend_accout,
        condition.value.datebegin,
        condition.value.dateend
    ).then((response) => {
        if (response.data.success) {
            (records.value = response.data.data.records),
                (display.value.all_income = response.data.data.income),
                (display.value.all_outcome = response.data.data.expenditure),
                (record_num.value = response.data.data.allCount);
        }
    });
};
// 查看交易记录详情
const toDetail = (id) => {
    router.push({
        path: "/recorddetail",
        query: {
            recordId: id
        },
    });
};

// 导出交易记录
const exportReco = () => {
    exportRecoApi(
        condition.value.type,
        condition.value.account,
        condition.value.friend_accout,
        condition.value.datebegin,
        condition.value.dateend
    )
        .then((response) => {
            // 检查响应的数据类型是否为 Blob，如果不是，可能需要进行适当的转换或者确保服务器返回的是二进制数据
            console.log(response)
            console.log(response.data);
            if (!(response.data instanceof Blob)) {
                throw new Error("导出数据格式错误");
            }

            // 创建一个下载链接并触发下载
            const url = URL.createObjectURL(response.data);
            const a = document.createElement("a");
            a.href = url;
            a.download = "transaction_records.xlsx"; // 假设文件名为 transaction_records.xlsx
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        })
        .catch((error) => {
            // 错误处理
            console.error("导出交易记录失败", error);
        });
};


// 挂载时加载交易记录
onMounted(() => {
    // 先从前面的页获取参数
    (condition.value.type = null),
        (condition.value.account = route.query.account),
        (condition.value.friend_accout = route.query.friend_account),
        (display.value.balance = route.query.balance);
    if (!condition.value.account) {
        getAccountList().then((response) => {
            if (response.data.success) {
                for (let i = 0; i < response.data.data.length; i++) {
                    if (response.data.data[i].isPrimary) {
                        condition.value.account = response.data.data[i].name;
                        display.value.balance = response.data.data[i].balance;
                    }
                }
            }
        });
    }

    getRecords();
});
// 监听条件变化，当条件变化时重新获取数据
watch(condition, getRecords, { deep: true });

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
            console.log(response.data.data.length);
            console.log(acc_num);
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
    condition.value.account = acc.acc_no;
    display.value.balance = acc.balance;
};
// 确认单选框选择之后
const confirmAcc = () => {
    dialogFormVisible.value = false;
    console.log(giveOne.value.account);
};
const backToPre = () => {
    router.back();
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
    margin: 10px 0;
}
.back-btn {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    padding-left: 0;
}
/* TODO 单选样式部分问题 */
.account-radio {
    width: 100%;
    height: 20vw;
}
/* 时间选择器 */
.date-picker {
    display: inline-block;
    width: 100%;
}
/* 交易记录样式 */
.transaction-records {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.record-item {
    display: flex;
    width: 100%;
    padding: 10px;
    border-bottom: 1px solid #ebeef5;
}
.record-item .el-col {
    display: flex;
    align-items: center;
}
.record-item .el-col:nth-child(2) {
    flex-direction: column;
    align-items: flex-start;
}
/* 收入为绿色 */
.income {
    color: green;
}
.outcome {
    color: red;
}
</style>
