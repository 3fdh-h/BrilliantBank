import axios from 'axios'

//请求路径的前缀
const baseUrl = 'https://localocalhost:8080/'

// 支付
export const payApi = (initiateAccountName, paymentPassword, amount, remarks, receiveUserName) => {
    return axios({
        url: `${baseUrl}/transaction/pay`,
        method: "post",
        data: {
            "initiateAccountName": initiateAccountName,
            "paymentPassword": paymentPassword,
            "amount": amount,
            "remarks": remarks,
            "receiveUserName": receiveUserName
        },
        headers: {
            'Content-Type': 'application/json',
        }
    })
}