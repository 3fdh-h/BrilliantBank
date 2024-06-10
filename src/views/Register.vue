<template>
    <div class="occupy">
        <div height="500px"></div>
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
        <el-col :span="6" class="tips">手机号</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="14">
            <el-input v-model="info.Phone" placeholder="请输入手机号" clearable @blur="checkPhone()" />
        </el-col>
    </el-row>
    <el-row style="height: 10px;"></el-row>
    <!-- TODO 点击获取验证码事件，弹窗展示后端返回的验证码 -->
    <el-row class="row">
        <el-col :span="6" class="tips">验证码</el-col>
        <el-col :span="1"></el-col>
        <el-col :span="7">
            <el-input type="number" v-model="info.VerifyCode" placeholder="输入验证码" />
        </el-col>
        <el-col :span="7">
            <el-button class="yzm" type="primary" @click="getVerCode()">
                <span width>获取验证码</span>
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
            <el-button style="color: black;  height: 32px; width: 190px;" type="primary" class="commit" @click="reg()">注册</el-button>
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
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { toFormData } from "axios";
const router = useRouter();

//与注册框 双向绑定
let info = ref({
    Name: "",
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
        ElMessage.error("姓名不能为空");
        return false;
    } else {
        ElMessage.error("姓名必须为中文且不超过10个字符");
        return flase;
    }
};
// 验证手机号格式
const checkPhone = () => {
    if (regPhone.test(info.value.Phone)) {
        return true;
    } else if (info.value.Phone == "") {
        ElMessage.error("手机号不能为空");
        return false;
    } else {
        ElMessage.error("手机号格式错误");
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

// TODO 点击注册之后先检测输入框正确性，再请求接口
const reg = () => {};

// TODO 点击获取验证码
const getVerCode = () => {
    ElMessage.success("验证码已发送");
};
</script>

<style>
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