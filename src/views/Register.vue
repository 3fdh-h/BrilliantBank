<template>
    <div class="occupy">
        <div height="500px">
            <LogoVue />
        </div>
    </div>
    <el-row class="title">
        <el-col :span="5"></el-col>
        <el-col :span="14" class="title">
            <span>注册</span>
        </el-col>
        <el-col :span="5"></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="6" class="tips">姓名</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="14">
            <el-input v-model="info.Name" placeholder="请输入姓名" clearable @blur="checkName()" />
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>
    <el-row class="row">
        <el-col :span="6" class="tips">性别</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="14">
            <el-select v-model="info.Gender" placeholder="请选择性别" clearable>
                <el-option label="男" value="男" />
                <el-option label="女" value="女" />
            </el-select>
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>
    <el-row class="row">
        <el-col :span="6" class="tips">手机号</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="14">
            <el-input v-model="info.Phone" placeholder="请输入手机号" clearable @blur="checkPhone()" />
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>
    <el-row class="row">
        <el-col :span="6" class="tips">验证码</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="7">
            <el-input type="number" v-model="info.VerifyCode" placeholder="输入验证码" />
        </el-col>
        <el-col :span="7">
            <el-button class="yzm" type="primary" @click="getVerCode(info.Phone)">
                <span>获取验证码</span>
            </el-button>
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>

    <el-row class="row">
        <el-col :span="6" class="tips">密码</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="14">
            <el-input type="password" v-model="info.password" placeholder="请输入密码" clearable show-password @blur="checkPwd()" />
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>
    <el-row class="row">
        <el-col :span="6" class="tips">确认密码</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="14">
            <el-input type="password" v-model="info.password2" placeholder="再次输入密码" clearable show-password @blur="checkTPwd()" />
        </el-col>
    </el-row>

    <el-row class="row">
        <el-col :span="24"></el-col>
    </el-row>

    <el-row class="row">
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-button style="color: black;  height: 32px; width: 190px;" type="primary" class="commit" @click="reg(info.Name, info.Gender, info.Phone, info.VerifyCode, info.password)">注册</el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
    <el-row style="height: 10px"></el-row>
    <el-row class="row">
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-button style="color: black; height: 32px; width:190px" type="primary" class="commit" @click="router.push('/login')">回到登录</el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loginApi } from "../utils/userService";
import { ElMessage, ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { toFormData } from "axios";
import LogoVue from "../components/Logo.vue";
import { getVerCodeApi, regApi } from "../utils/userService";
const router = useRouter();

//与注册框 双向绑定
let info = ref({
    Name: "",
    Gender: "",
    Phone: "",
    VerifyCode: "",
    password: "",
    password2: "",
});
let sysMsg = ref({
    Msg: "",
});

const regName = /^[\u4e00-\u9fa5]{1,10}$/;
const regPhone = /^[1][3-9][0-9]{9}$/;
const regPwd = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;

// 验证姓名为中文且长度不超过10
const checkName = () => {
    if (regName.test(info.value.Name)) {
        return true;
    } else if (info.value.Name == "") {
        ElMessage.warning("姓名不能为空");
        return false;
    } else {
        ElMessage.warning("姓名必须为中文且不超过10个字符");
        return flase;
    }
};
// 验证手机号格式
const checkPhone = () => {
    if (regPhone.test(info.value.Phone)) {
        return true;
    } else if (info.value.Phone == "") {
        ElMessage.warning("手机号不能为空");
        return false;
    } else {
        ElMessage.warning("手机号格式错误");
        return false;
    }
};
// 验证密码格式
const checkPwd = () => {
    if (regPwd.test(info.value.password)) {
        return true;
    } else if (info.value.password == "") {
        ElMessage.error("密码不能为空");
        return false;
    } else {
        ElMessage.error("密码必须为8-16位且包含字母和数字");
        return false;
    }
};
// 验证两次密码是否一致
const checkTPwd = () => {
    if (info.value.password == info.value.password2) {
        return true;
    } else {
        ElMessage.error("两次密码不一致");
    }
};

const reg = (name, gender, phone, verificationCode, loginPassword) => {
    if (checkName() && checkPhone() && checkPwd() && checkTPwd()) {
        regApi(name, gender, phone, verificationCode, loginPassword).then(
            (response) => {
                if (response.data.success) {
                    ElMessage.success("注册成功");
                    router.push("/login");
                } else {
                    ElMessage.error(response.data.msg);
                }
            }
        );
    }
};

const getVerCode = (phone) => {
    try {
        if (checkPhone()) {
            getVerCodeApi(phone).then((response) => {
                if (response.data.success) {
                    ElMessage.success("获取验证码成功");
                    const code = response.data.data.verificationCode
                    ElNotification({
                        title: "验证码",
                        message:
                            "您的验证码是" +
                            code +
                            "有效期10分钟，打死也不要告诉别人哦",
                        duration: 0,
                    });
                } else {
                    ElMessage.error("获取验证码失败");
                }
            });
        }
    } catch (error) {
        ElMessage.error("获取验证码失败");
    }
};
</script>

<style>
html,
body {
    padding: 0;
    margin: 0;
}
.occupy {
    height: 200px;
}
.title {
    text-align: left;
    vertical-align: middle;
    height: 90px;
    line-height: 100px;
    font-size: 40px;
    color: black;
}
.tips {
    text-align: right;
    font-family: "Microsoft YaHei";
    font-size: 15px;
}
.ipt {
    height: 35px;
}
.error-msg {
    color: red;
    font-size: 10px;
    font-family: "Microsoft YaHei";
}
.commit {
    height: 35px;
    width: 80px;
}
.row {
    height: 30px;
    line-height: 30px;
    text-align: center;
}
.text-left {
    text-align: left;
}
</style>