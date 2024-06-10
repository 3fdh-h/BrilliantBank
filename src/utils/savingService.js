import axios from 'axios'

//请求路径的前缀
const baseUrl = 'https://localocalhost:8080/'

// 存款
const savingApi = (amount, accountName, remarks) => {
    return axios({
        url: `${baseUrl}/transaction/deposit`,
        method: "post",
        data: {
            "amount": 0,
            "accountName": "",
            "remarks": ""
        },
        headers: {
            //加上登录令牌
            'Bearer': `${sessionStorage.getItem("token")}`,
        }
    });
}