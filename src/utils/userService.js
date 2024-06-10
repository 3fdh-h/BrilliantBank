//封装项目所有的网络请求
import axios from 'axios'

//请求路径的前缀
const baseUrl = 'https://localocalhost:8080/'

// 注册接口
export const regAPi = (name, gender, phone, verificationCode, loginPassword) => {
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
		url: `${baseUrl}/user/login`,
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
export const getVerCode = (phone) => {
	return axios({
		url: `${baseUrl}/user/verificationcode`,
		method: 'get',
		data: {
			"phone": phone
		},
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

// 修改支付密码
export const changePayPwdApi = (paymentPassword, newPaymentPassword) => {
	return axios({
		url: `${baseUrl}/user/paymentPassword`,
		method: "post",
		data: {
			"paymentPassword": paymentPassword,
			"newPaymentPassword": newPaymentPassword
		},
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

// 修改登录密码
export const changeLoginPwdApi = (loginPassword, newLoginPassword) => {
	return axios({
		url: `${baseUrl}/user/loginPassword`,
		method: "post",
		data: {
			"loginPassword": loginPassword,
			"newLoginPassword": newLoginPassword
		},
		headers: {
			'Content-Type': 'application/json',
		}
	})
}

// 修改头像
export const changeAvatarApi = (avatar) => {
	return axios({
		url: `${baseUrl}/user/avatar`,
		method: "post",
		data: {
			"avatar": avatar
		},
		headers: {
			'Content-Type': 'multipart/form-data',
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
			'Bearer': `${sessionStorage.getItem("token")}`,
		}
	});
}
