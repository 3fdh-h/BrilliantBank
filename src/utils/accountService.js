import axios from 'axios'

//请求路径的前缀
// const baseUrl = 'https://localocalhost:8080'
const baseUrl = '/api'  //代理

// 获取账号下的所有账户
export const getAccountList = () => {
  return axios({
		url: `${baseUrl}/account/`,
		method: "get",
		headers: {
			//加上登录令牌
			'token': `${sessionStorage.getItem("token")}`,
		}
	});
}

// TODO 添加账户待定
export const addAccount = (account) => {
  return axios({
		url: `${baseUrl}/account/`,
		method: "post",
		data: {
			"account": account
		},
		headers: {
			'Content-Type': 'application/json',
			'token': `${sessionStorage.getItem("token")}`
		}
	})
}