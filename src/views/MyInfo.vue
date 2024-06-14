<template>
    <div>
        <el-container style="padding:0">
            <el-header style="padding:0;margin:0">
                <div class="user-avatar">
                    <el-upload class="avatar-uploader" action="http://localhost:3000/api/user/avatar" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
                        :headers=uploadHeaders>
                        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </div>
            </el-header>
            <el-main>
                <el-row style="height: 10vw"></el-row>
                <el-card style="max-width: 480px">
                    <template #header>
                        <div class="card-header">
                            <span style="font-size:5vw">个人信息</span>
                        </div>
                    </template>
                    <div class="info-item">
                        <span>姓名</span>
                        <span>{{ info.name }}</span>
                    </div>
                    <div class="info-item">
                        <span>手机号</span>
                        <span>{{ info.phone }}</span>
                    </div>
                </el-card>
                <el-row style="height: 50vw"></el-row>
                <el-row class="button-row">
                    <el-button class="infobtn" type="info" @click="updateLoginVisible=true">修改登录密码</el-button>
                </el-row>
                <el-row class="button-row">
                    <el-button class="infobtn" type="info" @click="updatePayVisible=true">修改支付密码</el-button>
                </el-row>
                <el-row class="button-row">
                    <el-button class="infobtn" type="danger" @click="logout()">退出登陆</el-button>
                </el-row>
                <router-view></router-view>
            </el-main>
            <el-footer>
                <FootMenu></FootMenu>
            </el-footer>
        </el-container>
        <!-- 点击修改支付密码弹出对话框 -->
        <el-dialog v-model="updatePayVisible" title="修改支付密码" width="95vw">
            <el-form :model="updatePay">
                <el-form-item label="旧的密码" :label-width="formLabelWidth">
                    <el-input v-model="updatePay.oldPwd" placeholder="请输入原先的密码" type="password" show-password @blur="checkPayPwd(updatePay.oldPwd)" />
                </el-form-item>
                <el-form-item label="新的密码" :label-width="formLabelWidth">
                    <el-input v-model="updatePay.newPwd" placeholder="请输入新的密码" type="password" show-password @blur="checkPayPwd(updatePay.newPwd)" />
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="updatePay.newPwd2" placeholder="请重新输入新的密码" type="password" show-password @blur="checkSame(updatePay.newPwd, updatePay.newPwd2)" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="updatePayVisible = false">取消</el-button>
                    <el-button type="primary" @click="payUpdateCommit()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 点击修改登录密码弹出对话框 -->
        <el-dialog v-model="updateLoginVisible" title="修改登录密码" width="95vw">
            <el-form :model="updateLogin">
                <el-form-item label="旧的密码" :label-width="formLabelWidth">
                    <el-input v-model="updateLogin.oldPwd" placeholder="请输入原先的密码" type="password" show-password @blur="checkLoginPwd(updateLogin.oldPwd)" />
                </el-form-item>
                <el-form-item label="新的密码" :label-width="formLabelWidth">
                    <el-input v-model="updateLogin.newPwd" placeholder="请输入新的密码" type="password" show-password @blur="checkLoginPwd(updateLogin.newPwd)" />
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input v-model="updateLogin.newPwd2" placeholder="请重新输入新的密码" type="password" show-password @blur="checkSame(updateLogin.newPwd, updateLogin.newPwd2)" />
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="updateLoginVisible = false">取消</el-button>
                    <el-button type="primary" @click="loginUpdateCommit()">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { onMounted, ref } from "vue";
import {
    getPersonInfoApi,
    changeAvatarApi,
    changePayPwdApi,
    changeLoginPwdApi,
} from "../utils/userService";
import FootMenu from "../components/Footer.vue";

const router = useRouter();
// 个人信息页的数据项
const info = ref({
    avatar: "",
    name: "",
    phone: "",
});
// 修改支付密码表单的变量
const updatePayVisible = ref(false);
const updateLoginVisible = ref(false);
const updatePay = ref({
    oldPwd: "",
    newPwd: "",
    newPwd2: "",
});
const updateLogin = ref({
    oldPwd: "",
    newPwd: "",
    newPwd2: "",
});
// 挂载时加载信息
onMounted(() => {
    getPersonInfoApi().then((response) => {
        console.log(response);
        if (response.data.success) {
            imageUrl.value = response.data.data.avatar;
            info.value.name = response.data.data.name;
            info.value.phone = response.data.data.phone;
        } else {
            ElMessage.warning(response.data.msg);
        }
    });
});

const imageUrl = ref("");
// 定义请求头，包括 token
const uploadHeaders = {
    token: `${sessionStorage.getItem("token")}`,
};
const handleAvatarSuccess = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw);
    ElMessage.success("头像上传成功");
};

const beforeAvatarUpload = (rawFile) => {
    if (rawFile.type !== "image/jpeg") {
        ElMessage.error("头像必须为jpg格式");
        return false;
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error("头像大小不超过2MB");
        return false;
    }
    return true;
};
const regPay = /^\d{6}$/; // 六位数字
const regLogin = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/; //8-16位数字字母混合
// 检查支付密码框
const checkPayPwd = (pwd) => {
    if (regPay.test(pwd)) {
        return true;
    } else if (pwd === "") {
        ElMessage.warning("密码不能为空");
        return false;
    } else {
        ElMessage.warning("密码格式不正确");
        return false;
    }
};

// 检查登录密码框
const checkLoginPwd = (pwd) => {
    if (regLogin.test(pwd)) {
        return true;
    } else if (pwd === "") {
        ElMessage.warning("密码不能为空");
        return false;
    } else {
        ElMessage.warning("密码格式不正确");
        return false;
    }
};
// 检查新的密码
const checkSame = (pwd1, pwd2) => {
    if (pwd1 == pwd2) {
        return true;
    } else {
        ElMessage.warning("两次密码不一致");
        return false;
    }
};

// 修改支付密码
const payUpdateCommit = () => {
    if (
        checkPayPwd(updatePay.value.oldPwd) &&
        checkPayPwd(updatePay.value.newPwd) &&
        checkSame(updatePay.value.newPwd, updatePay.value.newPwd2)
    ) {
        changePayPwdApi(updatePay.value.oldPwd, updatePay.value.newPwd).then(
            (response) => {
                if (response.data.success) {
                    updatePayVisible.value = false;
                    ElMessage.success("密码修改成功，请牢记密码");
                    // 初始化输入框的值
                    updatePay.value.oldPwd = "";
                    updatePay.value.newPwd = "";
                    updatePay.value.newPwd2 = "";
                } else {
                    ElMessage.error(response.data.msg);
                }
            }
        );
    }
};

const loginUpdateCommit = () => {
    if (
        checkLoginPwd(updateLogin.value.oldPwd) &&
        checkLoginPwd(updateLogin.value.newPwd) &&
        checkSame(updateLogin.value.newPwd, updateLogin.value.newPwd2)
    ) {
        changeLoginPwdApi(
            updateLogin.value.oldPwd,
            updateLogin.value.newPwd
        ).then((response) => {
            if (response.data.success) {
                updateLoginVisible.value = false;
                ElMessage.success("密码修改成功，请牢记密码");
                // 初始化输入框的值
                updateLogin.value.oldPwd = "";
                updateLogin.value.newPwd = "";
                updateLogin.value.newPwd2 = "";
            } else {
                ElMessage.error(response.data.msg);
            }
        });
    }
};

// 退出
const logout = () => {
    router.push("/login");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("info");
};
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
}

.user-avatar {
    margin-top: 3vw;
    display: flex;
    justify-content: center;
}
.button-row {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 8vw;
    margin: 10px 0;
}
.info-item {
    display: flex;
    justify-content: space-between;
    margin: 5vw 0;
    font-size: 5vw;
}
.infobtn {
    height: 100%;
    width: 80vw;
    margin-top: 2vw;
    display: flex;
    justify-content: center;
}
.el-header {
    height: 30vw;
    padding: 0;
    margin: 0;
    background: linear-gradient(
        3deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(255, 251, 220, 1) 31%,
        rgba(255, 245, 171, 1) 56%,
        rgba(255, 243, 163, 1) 67%,
        rgba(255, 228, 91, 1) 76%,
        rgba(255, 209, 0, 1) 84%,
        rgba(255, 209, 0, 1) 91%,
        rgba(255, 209, 0, 1) 94%,
        rgba(255, 209, 0, 1) 96%,
        rgba(255, 209, 0, 1) 98%,
        rgba(255, 209, 0, 1) 100%
    );
}
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
    width: 30vw; /* 设置宽度 */
    height: 30vw; /* 设置高度 */
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.avatar-uploader .avatar {
    width: 30vw; /* 设置头像图片的宽度 */
    height: 30vw; /* 设置头像图片的高度 */
    display: block;
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 30vw; /* 设置图标的宽度 */
    height: 30vw; /* 设置图标的高度 */
    text-align: center;
}
</style>
