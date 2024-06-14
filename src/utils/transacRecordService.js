import axios from 'axios'

//请求路径的前缀
// const baseUrl = 'https://localocalhost:8080/'
const baseUrl = '/api'

// 根据条件获取全部交易记录
export const getRecordByCondApi = (type, accountName, friendAccountName, dateBegin, dateEnd) => {
    return axios({
        url: `${baseUrl}/transaction/record/`,
        method: "post",
        data: {
            "type": type,
            "accountName": accountName,
            "friendAccountName": friendAccountName,
            "dateBegin": dateBegin,
            "dateEnd": dateEnd
        },
        headers: {
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`,
        }
    });
}

// 获取交易记录详情
export const getRecDetailApi = (id) => {
    return axios({
        url: `${baseUrl}/transaction/record/detail`,
        method: "get",
        params: {
            "id": id
        },
        headers: {
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`,
        }
    });
}

// 导出交易记录
export const exportRecoApi = (type, accountName, friendAccountName, dateBegin, dateEnd) => {
    return axios({
        url: `${baseUrl}/transaction/record/export`,
        method: "post",
        data: {
            "type": type,
            "accountName": accountName,
            "friendAccountName": friendAccountName,
            "dateBegin": dateBegin,
            "dateEnd": dateEnd
        },
        responseType: 'blob',
        headers: {
            //加上登录令牌
            'token': `${sessionStorage.getItem("token")}`,
        }
    })
}