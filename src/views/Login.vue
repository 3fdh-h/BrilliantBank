<template>
    <div class="occupy">
        <div height="500px"></div>
    </div>
    <el-row class="title">
        <el-col :span="5"></el-col>
        <el-col :span="14" class="title">
            <span>登录</span>
        </el-col>
        <el-col :span="5"></el-col>
    </el-row>
    <el-row class="row">
        <el-col :span="5"></el-col>
        <el-col :span="14">
            <el-input v-model="info.sysName" placeholder="请输入手机号" clearable @blur="checkName()" />
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="5"></el-col>
        <el-col :span="14">
            <span class="error-msg">{{sysMsg.sysNameMsg}}</span>
        </el-col>
        <el-col :span="5"></el-col>
    </el-row>

    <el-row class="row">
        <el-col :span="5"></el-col>
        <el-col :span="14">
            <el-input v-model="info.password" type="password" placeholder="请输入密码" @blur="checkPwd()" />
        </el-col>
        <el-col :span="5"></el-col>
    </el-row>
    <el-row>
        <el-col :span="5"></el-col>
        <el-col :span="14">
            <span class="error-msg">{{sysMsg.passwordMsg}}</span>
        </el-col>
        <el-col :span="5"></el-col>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { loginApi } from "../utils/requestApi";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { toFormData } from "axios";
const router = useRouter();

//与登录框 双向绑定
let info = ref({
    sysName: "",
    password: "",
});
let sysMsg = ref({
    sysNameMsg: "",
    passwordMsg: "",
});
//登录按钮事件
const login = () => {
    //重新验证
    if (checkName() && checkPwd()) {
        loginApi(info.value.sysName, info.value.password)
            //回调函数
            .then((response) => {
                if (response.data.result) {
                    //存储token
                    sessionStorage.setItem("token", response.data.msg);
                    sessionStorage.setItem(
                        "info",
                        JSON.stringify(response.data.data)
                    );
                    localStorage.setItem("token", response.data.msg);
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
                        message: response.data.message,
                        type: "danger",
                    });
                }
            })
            //请求异常处理
            .catch((err) => {
                console.log(err);
                ElMessage({
                    message: "服务器异常，请稍后再试",
                    type: "danger",
                });
            });
    }
};

//定义正则表达式，语言模式 [A-Z]/w{7}
// TODO 正则表达式根据后面的需求更改需要更改
const regName = /^[1][3-9][0-9]{9}$/;
const regPwd = /^(?=.*\d)(?=.*[a-zA-Z]).{8,16}$/;

//验证用户名
const checkName = () => {
    if (regName.test(info.value.sysName)) {
        sysMsg.value.sysNameMsg = "√";
        return true;
    } else {
        sysMsg.value.sysNameMsg = "用户首字母大写，长度4-8位";
        return false;
    }
};

const checkPwd = () => {
    if (regPwd.test(info.value.password)) {
        sysMsg.value.passwordMsg = "√";
        return true;
    } else {
        sysMsg.value.passwordMsg = "密码位数字和字母混合，长度8-16位";
        return false;
    }
};
</script>

<style>
body {
    background-image: url("../assets/images/03.jpg");
    background-size: cover;
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
.ipt {
    height: 35px;
}
.error-msg{
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