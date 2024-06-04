<template>
	<el-container>
		<el-header class="title">
			<el-row>
				<el-col>登 录</el-col>
			</el-row>
		</el-header>
		<el-main class="main">
			<el-row class="row">
				<el-col :span="6"></el-col>
				<el-col :span="12">
					<el-input
					    v-model="sys.sysName"
					    style="width: 360px"
					    placeholder="请输入卡号"
					    clearable @blur="checkName()" />
				</el-col>
				<el-col :span="6"  class="text-left">
					{{sysMsg.sysNameMsg}}
				</el-col>
			</el-row>
			<el-row class="row">
				<el-col :span="24"></el-col>
			</el-row>
			<el-row class="row">
				<el-col :span="6"></el-col>
				<el-col :span="12">
					  <el-input
					    v-model="sys.password"
					    style="width: 360px"
					    type="password"
					    placeholder="请输入密码" @blur="checkPwd()" />
					
				</el-col>
				<el-col :span="6" class="text-left">{{sysMsg.passwordMsg}}</el-col>
			</el-row>
			
			<el-row class="row">
				<el-col :span="24"></el-col>
			</el-row>
			
			<el-row class="row">
				<el-col :span="6"></el-col>
				<el-col :span="12">
					 <el-button type="primary" @click="login()">Login</el-button>
				</el-col>
				<el-col :span="6"></el-col>
			</el-row>

		</el-main>
	</el-container>

</template>

<script setup>
import { ref,onMounted} from 'vue'
import { loginApi} from '../utils/requestApi'; 
import { ElMessage } from 'element-plus'
import { useRouter }from  'vue-router'
const router=useRouter()

//与登录框 双向绑定
let sys=ref({
	sysName:"Root",
	password:"root123"
})
let sysMsg=ref({
	sysNameMsg:"",
	passwordMsg:""
})

//登录按钮事件
const login=()=>{
	//重新验证
	if(checkName()&&checkPwd()){
		loginApi(sys.value.sysName,sys.value.password)
			//回调函数
			.then(response=>{
				
				if(response.data.result){
					//存储token
					sessionStorage.setItem("token",response.data.data);
					localStorage.setItem("token",response.data.data);
					//提示框
					ElMessage({
						message: "登录成功",
						type: 'success',
					})
					//跳转到home
					router.push("/home")		
				}else{
					//提示框
					ElMessage({
						message: response.data.message,
						type: 'danger',
					})
				}	
			})
			//请求异常处理
			.catch(err=>{
				console.log(err);
				ElMessage({
					message: "服务器异常，请稍后再试",
					type: 'danger',
				})
			})
	}
	
	
}	

//定义正则表达式，语言模式 [A-Z]/w{7}

const regName=/^[A-Z]\w{3,7}$/
const regPwd=/^\w{8,16}$/

//验证用户名
const checkName=()=>{
	if(regName.test(sys.value.sysName)){
		sysMsg.value.sysNameMsg="√";
		return true;
	}else{
		sysMsg.value.sysNameMsg="用户首字母大写，长度4-8位";
		return false;
	}
}
	
const checkPwd=()=>{
	if(regPwd.test(sys.value.password)){
		sysMsg.value.passwordMsg="√";
		return true;
	}else{
		sysMsg.value.passwordMsg="密码位数字和字母混合，长度8-16位";
		return false;
	}
}
</script>

<style>
body{
		background-color: #c6e2ff;
	}
	.title {
		text-align: center;
		vertical-align: middle;
		height: 60px;
		line-height: 60px;
		font-size: 24px;
		background-color: #409EFF;
		color: #ffffff;
	
	}
	.main{
	
	}
	.row{
		height: 30px;
		line-height: 30px;
		text-align: center;
	}	
	.text-left{
		text-align: left;
	}
	
</style>