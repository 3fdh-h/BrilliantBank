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
                <span>账户间转账</span>
            </el-row>
            <el-divider />
        </el-header>
        <el-main>
            <el-row>
                <el-col :span="3"></el-col>
                <el-col :span="7">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/银行卡转账.png" alt="银行卡转账" style="width: 90%; height: auto;">
                        <span>银行卡转账</span>
                    </div>
                </el-col>
                <el-col :span="4"></el-col>
                <el-col :span="7">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/手机转账.png" alt="手机号转账" style="width: 90%; height: auto;">
                        <span>手机号转账</span>
                    </div>
                </el-col>
                <el-col :span="3">
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="6">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/转账记录.png" alt="转账记录" style="width: 90%; height: auto;">
                        <span>转账记录</span>
                    </div>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="6">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/对外转账.png" alt="对外转账" style="width: 90%; height: auto;">
                        <span>对外转账</span>
                    </div>
                </el-col>
                <el-col :span="3"></el-col>
                <el-col :span="6">
                    <div class="logo-container">
                        <img class="tr-logo" src="../assets/icons/账户间转账.png" alt="账户间转账" style="width: 90%; height: auto;">
                        <span>账户间转账</span>
                    </div>
                </el-col>
            </el-row>
            <el-divider></el-divider>
            <el-row>
                <el-col :span="10">
                    <!-- TODO 从接口获取 -->
                    转账伙伴（{{}}个）
                </el-col>
                <el-col :span="14" class="add-container">
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </el-col>
            </el-row>
            <el-card v-for="(partner, index) in tr_partners" :key="index" class="partner-card">
                <el-row class="partner-row">
                    <el-col :span="5">
                        <el-avatar shape="square" :size="50" :src="partner.avatar" />
                    </el-col>
                    <el-col :span="12">
                        <div class="partner-info">
                            <strong>{{ partner.name }}</strong>
                        </div>
                        <div>
                            <strong>{{ partner.account }}</strong>
                        </div>
                    </el-col>
                    <el-col :span="7">
                        <div class="button-group">
                            <el-button>转账记录</el-button>
                            <el-button>转账</el-button>
                        </div>
                    </el-col>
                </el-row>
            </el-card>
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
                <el-button type="primary" @click="dialogFormVisible = false">
                    确认
                    <!-- TODO 确认调用接口添加伙伴 -->
                </el-button>
            </div>
        </template>
    </el-dialog>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
const router = useRouter();
let dialogFormVisible = ref(false);  // 控制对话框可见性
const formLabelWidth = '20vw'; // 对话框表单的label宽度
// 表单项数据
const form = reactive({
  name: '',
  account: ''
})
const tr_partners = [
    {
        name: "张三",
        account: "12345678987654321",
        avatar: "../assets/images/avatar.jpg",
    },
    {
        name: "李四",
        account: "12345678987654321",
        avatar: "../assets/images/avatar.jpg",
    },
    {
        name: "王五",
        account: "12345678987654321",
        avatar: "../assets/images/avatar.jpg",
    },
    {
        name: "赵六",
        account: "12345678987654321",
        avatar: "../assets/images/avatar.jpg",
    },
    {
        name: "孙七",
        account: "12345678987654321",
        avatar: "../assets/images/avatar.jpg",
    },
];
const backToAccount = () => {
    router.push("/accountmanage");
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
.add-container {
    display: flex;
    justify-content: flex-end;
}
.logo-container {
    text-align: center;
}
</style>