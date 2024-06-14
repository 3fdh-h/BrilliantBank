<template>
    <el-container>
        <el-header class="fix-header">
            <el-row style="height: 8vw">
                <el-col :span="5">
                    <div class="back-btn" @click="backToAccount()">
                        <el-icon>
                            <ArrowLeft />
                        </el-icon>
                        <span>返回</span>
                    </div>
                </el-col>
                <el-col :span="5">
                </el-col>
                <span>转账</span>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="3"></el-col>
                <el-col :span="7">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/cardTransfer.png" alt="银行卡转账" style="width: 90%; height: auto;">
                        <span>银行卡转账</span>
                    </div>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="7">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/phoneTransfer.png" alt="手机号转账" style="width: 90%; height: auto;">
                        <span>手机号转账</span>
                    </div>
                </el-col>
                <el-col :span="3">
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="6">
                    <div class="logo-container" @click="tranrecord()">
                        <img class="tr-logo" src="../assets/icons/transferRecord.png" alt="转账记录" style="width: 90%; height: auto;">
                        <span>转账记录</span>
                    </div>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="6">
                    <div class="logo-container" @click="tranout()">
                        <img class="tr-logo" src="../assets/icons/transferOut.png" alt="对外转账" style="width: 90%; height: auto;">
                        <span>对外转账</span>
                    </div>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="6">
                    <div class="logo-container" @click="traninner()">
                        <img class="tr-logo" src="../assets/icons/transfero2o.png" alt="账户间转账" style="width: 90%; height: auto;">
                        <span>账户间转账</span>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="10">
                    转账伙伴（<strong>{{partner_number}}</strong>个）
                </el-col>
                <el-col :span="14" class="add-container">
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-col>
            </el-row>
            <el-row style="height: 10px;"></el-row>
            <div v-for="(partner, index) in tr_partners" :key="index">
                <el-card class="partner-card">
                    <el-row class="partner-row">
                        <el-col :span="5">
                            <el-avatar shape="square" :size="60" :src="partner.avatar" />
                        </el-col>
                        <el-col :span="12">
                            <br />
                            <div class="partner-info">
                                <strong>{{ partner.name }}</strong>
                            </div>
                            <div>
                                <strong>{{ partner.account }}</strong>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="button-group">
                                <el-button class="action-button" @click="toHisRecord(partner)">转账记录</el-button>
                                <el-button class="action-button" @click="transferToHim(partner)">转账</el-button>
                                <el-button type="danger" class="action-button" @click="deletePartner(partner)">删除伙伴</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </el-card>
                <el-row style="height: 10px;"></el-row>
            </div>

        </el-main>
    </el-container>
    <!-- 点击添加转账伙伴弹出对话框 -->
    <el-dialog v-model="dialogFormVisible" title="添加转账伙伴" width="95vw">
        <el-form :model="form">
            <el-form-item label="姓名" :label-width="formLabelWidth">
                <el-input v-model="form.name" placeholder="请输入伙伴姓名" />
            </el-form-item>
            <el-form-item label="账号" :label-width="formLabelWidth">
                <el-input v-model="form.account" placeholder="请输入伙伴账号" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="commitAdd()">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive, onMounted, onBeforeMount } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {
    getPartnerApi,
    addPartnerApi,
    deletePartnerApi,
} from "../utils/transferService.js";
const router = useRouter();
let dialogFormVisible = ref(false); // 控制对话框可见性
const formLabelWidth = "20vw"; // 对话框表单的label宽度
// 表单项数据
const form = reactive({
    name: "",
    account: "",
});

let partner_number = ref(0);
const tr_partners = ref([]);
// 返回到上一级
const backToAccount = () => {
    router.push("/accountmanage");
};
// 挂载时发送请求
onMounted(() => {
    getPartnerApi().then((response) => {
        console.log(response);
        partner_number.value = response.data.data.length;
        console.log(partner_number.value);
        tr_partners.value = response.data.data.map((item) => {
            return {
                name: item.userName,
                account: item.accountName,
                avatar: item.avatar,
            };
        });
        console.log(tr_partners.value);
    });
});
// 对外转账
const tranout = () => {
    router.push({
        path: "/tranout",
    });
}

// 账户间转账
const traninner = () => {
    router.push({
        path: "/traninner"
    })
}

// 交易记录
const tranrecord = () => {
    router.push({
        path: '/transrecord',
        query: {
            account: null,
            friend_account: null,
            balance: null
        }
    })
}

// 添加好友
const commitAdd = () => {
    addPartnerApi(form.name, form.account).then((response) => {
        console.log(response);
        if (response.data.success) {
            tr_partners.value.push({
                name: form.name,
                account: form.account,
                avatar: "",
            });
            partner_number.value += 1;
            dialogFormVisible.value = false; // 使表单消失
            ElMessage.success("添加成功");
        } else {
            ElMessage.error("添加失败," + response.data.msg);
        }
    });
};
// 查询与伙伴转账记录
const toHisRecord = (partner) => {
    router.push({
        path: "/transrecord",
        query: {
            friend_account: partner.account
        }
    });
};
// 转账给伙伴
const transferToHim = (partner) => {
    // 传递伙伴信息到转账详情页面
    router.push({
        path: "/trandetail",
        query: {
            name: partner.name,
            account: partner.account,
        },
    });
};
// 删除伙伴
const deletePartner = (partner) => {
    ElMessageBox.confirm("确定要删除你的转账伙伴吗？", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            deletePartnerApi(partner.name, partner.account).then((response) => {
                if (response.data.success) {
                    ElMessage.success("删除成功");
                } else {
                    ElMessage.error("删除失败");
                }
            });
        })
        .catch(() => {
            ElMessage.info("取消删除");
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
.back-btn {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    padding-left: 0;
}
.tr-logo {
    border: solid 1px rgb(191, 176, 99);
    background: linear-gradient(
        187deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 251, 220, 1) 87%,
        rgba(255, 245, 171, 1) 90%,
        rgba(255, 243, 163, 1) 94%,
        rgba(255, 228, 91, 1) 97%,
        rgba(255, 209, 0, 1) 98%,
        rgba(255, 209, 0, 1) 100%
    );
    border-radius: 15px;
}
.partner-card {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.partner-card ::v-deep .el-card__body {
    padding: 0; /* 自定义内边距 */
    width: 100%;
}
.button-group {
    display: flex;
    flex-direction: column;
    gap: 3px; /* 添加按钮之间的间距 */
}
.action-button {
    width: 80%;
    height: 8vw; /* 确保所有按钮高度一致 */
    margin: 0; /* 重置默认外边距 */
    padding: 0; /* 重置默认内边距 */
    box-sizing: border-box; /* 包括内边距和边框在内的宽度和高度 */
}
.add-container {
    display: flex;
    justify-content: flex-end;
}
.logo-container {
    text-align: center;
}
</style>