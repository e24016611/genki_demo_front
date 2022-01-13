import axios from "axios";

// const baseURL = 'https://virtserver.swaggerhub.com/mosfet/esplori/1.0.0/'
// const baseURL = 'http://18.191.147.61/'
const baseAxios = axios.create({
    // baseURL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
    },
})

baseAxios.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

baseAxios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            return Promise.resolve(response.data);
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        console.log(
            "网络请求失败，请刷新重试"
        );
    }
);

export {
    baseAxios
}