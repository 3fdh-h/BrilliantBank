//封装项目所有的网络请求
import axios from 'axios'

//请求路径的前缀
const baseUrl='http://localhost:8000'

export const loginApi=(sname,pwd)=>{
	return axios({
		url:`${baseUrl}/sys/login`,
		method:"post",
		data:{
			"sysName":sname,
			"password":pwd
		},
		headers:{
			'Content-Type': 'application/json',
		}
	});	
	
}

//用户分页请求
export const getPersonPageApi=(pn,ps,kw)=>{
	return axios({
		url:`${baseUrl}/person/page`,
		method:"get",
		params:{
			"pageNo":pn,
			"pageSize":ps,
			"searchWord":kw
		},
		headers:{
			//加上登录令牌
			'Bearer': `${sessionStorage.getItem("token")}`,
		}
	});	
	
}