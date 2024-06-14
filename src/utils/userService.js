//封装项目所有的网络请求
import axios from 'axios'

//请求路径的前缀
// const baseUrl = 'http://localhost:8080'
const baseUrl = '/api'

// 注册接口
export const regApi = (name, gender, phone, verificationCode, loginPassword) => {
	return axios({
		url: `${baseUrl}/user/register`,
		method: "post",
		data: {
			"name": name,
			"gender": gender,
			"phone": phone,
			"verificationCode": verificationCode,
			"loginPassword": loginPassword
		},
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

// 登录接口
export const loginApi = (phone, loginPassword) => {
	return axios({
		url: `/api/user/login`,
		method: "post",
		data: {
			"phone": phone,
			"loginPassword": loginPassword
		},
		headers: {
			'Content-Type': 'application/json',
		}
	});
}
// 获取验证码接口
export const getVerCodeApi = (phone) => {
	return axios({
		url: `${baseUrl}/user/verificationcode`,
		method: 'get',
		headers: {
			'Content-Type': 'application/json',
		},
		params: {
			"phone": phone
		}
	})
}

// 修改支付密码
export const changePayPwdApi = (paymentPassword, newPaymentPassword) => {
	return axios({
		url: `${baseUrl}/user/paymentPassword`,
		method: "put",
		data: {
			"paymentPassword": paymentPassword,
			"newPaymentPassword": newPaymentPassword
		},
		headers: {
			'Content-Type': 'application/json',
			'token': `${sessionStorage.getItem("token")}`
		}
	})
}

// 修改登录密码
export const changeLoginPwdApi = (loginPassword, newLoginPassword) => {
	return axios({
		url: `${baseUrl}/user/loginPassword`,
		method: "put",
		data: {
			"loginPassword": loginPassword,
			"newLoginPassword": newLoginPassword
		},
		headers: {
			'Content-Type': 'application/json',
			'token': `${sessionStorage.getItem("token")}`
		}
	})
}

// 修改头像
export const changeAvatarApi = (file) => {
	return axios({
		url: `${baseUrl}/user/avatar`,
		method: "post",
		data: file,
		headers: {
			'Content-Type': 'multipart/form-data',
			'token': `${sessionStorage.getItem("token")}`
		}
	})
}
  

// 获取个人信息
export const getPersonInfoApi = () => {
	return axios({
		url: `${baseUrl}/user/userInfo`,
		method: "get",
		headers: {
			//加上登录令牌
			'token': `${sessionStorage.getItem("token")}`,
		}
	});
}
