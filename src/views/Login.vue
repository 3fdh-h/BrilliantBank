<template>
    <div class="occupy">
        <div height="50vw">
            <LogoVue />
        </div>
    </div>
    <el-row class="title">
        <el-col :span="5"></el-col>
        <el-col :span="14" class="title">
            <span>登录</span>
        </el-col>
        <el-col :span="5"></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="6" class="tips">手机号</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
            <el-input v-model="info.Name" placeholder="请输入手机号" clearable @blur="checkName()" />
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>

    <el-row class="row">
        <el-col :span="6" class="tips">密码</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="10">
            <el-input v-model="info.Pwd" type="password" placeholder="请输入密码" clearable show-password @blur="checkPwd()" />
        </el-col>
    </el-row>

    <el-row class="row">
        <el-col :span="24"></el-col>
    </el-row>

    <el-row class="row">
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <el-button style="color: black" type="primary" class="commit" @click="login()">登录</el-button>
        </el-col>
        <el-col :span="6"></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="6"></el-col>
        <el-col :span="12">
            <div>
                <span style="color: darkslateblue; font-size: 12px" @click="router.push('/register')">
                    没有账号，去注册
                    <el-icon :size="8" color="darkslateblue">
                        <DArrowRight />
                    </el-icon>
                </span>
            </div>
        </el-col>
    </el-row>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loginApi } from "../utils/userService";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { toFormData } from "axios";
import LogoVue from "../components/Logo.vue";
const router = useRouter();

//与登录框 双向绑定
let info = ref({
    Name: "",
    Pwd: "",
});
//登录按钮事件
const login = () => {
    //重新验证
    if (checkName() && checkPwd()) {
        loginApi(info.value.Name, info.value.Pwd)
            //回调函数
            .then((response) => {
                if (response.data.success) {
                    //存储token
                    sessionStorage.setItem("token", response.data.data.token);
                    sessionStorage.setItem(
                        "info",
                        JSON.stringify(response.data.data.userId)
                    );
                    //提示框
                    ElMessage({
                        message: "登录成功",
                        type: "success",
                    });
                    //跳转到home
                    router.push("/home");
                } else {
                    //提示框
                    ElMessage({
                        message: response.data.msg,
                        type: "error",
                    });
                }
            })
            //请求异常处理
            .catch((err) => {
                console.log(err);
                ElMessage({
                    message: "服务器异常，请稍后再试",
                    type: "error",
                });
            });
    }
};

//定义正则表达式，语言模式 [A-Z]/w{7}
const regName = /^[1][3-9][0-9]{9}$/;
const regPwd = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/; // 8到16位的字母数字混合密码

//验证用户名
const checkName = () => {
    if (regName.test(info.value.Name)) {
        return true;
    } else if (info.value.Name == "") {
        ElMessage.warning("手机号不能为空");
        return false;
    } else {
        ElMessage.warning("手机号格式不正确");
        return false;
    }
};

const checkPwd = () => {
    if (regPwd.test(info.value.Pwd)) {
        return true;
    } else if (info.value.Pwd == "") {
        ElMessage.warning("密码不能为空");
        return false;
    } else {
        ElMessage.warning("密码为8到16位的字母数字混合密码");
        return false;
    }
};
</script>

<style>
html, body {
    padding: 0;
    margin: 0;
    /* background-image: url("../assets/images/bg.png"); */
}
.occupy {
    height: 50vw
}
.tips {
    text-align: right;
    font-family: "Microsoft YaHei";
    font-size: 15px;
}
.title {
    text-align: left;
    vertical-align: middle;
    height: 90px;
    line-height: 100px;
    font-size: 40px;
    color: black;
}
.ipt {
    height: 30px;
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