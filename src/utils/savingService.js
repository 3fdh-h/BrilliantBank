import axios from 'axios'

//请求路径的前缀
// const baseUrl = 'https://localocalhost:8080/'
const baseUrl = '/api'

// 存款
export const savingApi = (amount, accountName, remarks) => {
    return axios({
        url: `${baseUrl}/transaction/deposit`,
        method: "post",
        data: {
            "amount": amount,
            "accountName": accountName,
            "remarks": remarks
        },
        headers: {
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`,
        }
    });
}