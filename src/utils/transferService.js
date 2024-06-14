import axios from 'axios'

//请求路径的前缀
// const baseUrl = 'https://localocalhost:8080/'
const baseUrl = '/api'

// 获取转账伙伴
export const getPartnerApi = () => {
    return axios({
        url: `${baseUrl}/transaction/transfer/friends`,
        method: "get",
        headers: {
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`,
        }
    });
}

// 添加转账伙伴
export const addPartnerApi = (userName, accountName) => {
    return axios({
        url: `${baseUrl}/transaction/transfer/friends`,
        method: "post",
        data: {
            "userName": userName,
            "accountName": accountName
        },
        headers: {
            'Content-Type': 'application/json',
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`,
        }
    });
}

// 删除转账伙伴
export const deletePartnerApi = (userName, accountName) => {
    return axios({
        url: `${baseUrl}/transaction/transfer/friends`,
        method: "delete",
        data: {
            "userName": userName,
            "accountName": accountName
        },
        headers: {
            'Content-Type': 'application/json',
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`
        }
    });
}

// 对外转账
export const transferOutApi = (initiateAccountName, paymentPassword, amount, remarks, receiveUserName, receiveAccountName) => {
    return axios({
        url: `${baseUrl}/transaction/transfer/external`,
        method: "post",
        data: {
            "initiateAccountName": initiateAccountName,
            "paymentPassword": paymentPassword,
            "amount": amount,
            "remarks": remarks,
            "receiveUserName": receiveUserName,
            "receiveAccountName": receiveAccountName
        },
        headers: {
            'Content-Type': 'application/json',
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`
        }
    })
}

// 转账
export const transferApi = (initiateAccountName, paymentPassword, amount, remarks, receiveAccountName) => {
    return axios({
        url: `${baseUrl}/transaction/transfer/`,
        method: "post",
        data: {
            "initiateAccountName": initiateAccountName,
            "paymentPassword": paymentPassword,
            "amount": amount,
            "remarks": remarks,
            "receiveAccountName": receiveAccountName
        },
        headers: {
            'Content-Type': 'application/json',
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`
        }
    });
}