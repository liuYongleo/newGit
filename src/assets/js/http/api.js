import axios from 'axios';
import Qs from 'qs';
import store from '@/store/store';
import {router, } from '@/router/index';
import {Message, } from 'element-ui';

axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.delete['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

// 超时时间
// axios.defaults.timeout = 7000;
axios.defaults.timeout = 50000;
// 重试次数
axios.defaults.retry = 1;
// 重试延时
axios.defaults.retryDelay = 1000;
// 重试条件，默认只要是错误都需要重试
axios.defaults.shouldRetry = (error) => true;

// 设置本地dev环境的baseURL，用于本地web服务器的代理的拦截名
if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = './dayi';
}

// 设置线上环境的baseURL，用于线上环境服务器的代理的拦截名
if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = './dayi';
}

// response的拦截器
axios.interceptors.response.use((response) => {
    // 对响应数据处理
    return response;
}, (error) => {
    // 对响应错误处理
    return Promise.reject(error);
});

const api = {
    get: async function (url, params, config = {}) {
        try {
            let headers = {};
            if (config && config.authorization !== -1) {
                headers.authorization = config.authorization || store.state.authorization;
            }
            if (process.env.NODE_ENV === 'development') {
                if (config.baseURL) {
                    axios.defaults.baseURL = '/zb';
                } else {
                    axios.defaults.baseURL = '/dayi';
                }
            }
            let res = await axios({
                method: 'get',
                url: url,
                params: params,
                headers: headers,
                responseType: config.responseType || 'json',
            });

            return convertRes(res, config);
        } catch (e) {
            return dealError(e);
        }
    },

    post: async function (url, params = {}, config = {}) {
        try {
            let headers = {};
            if (config && config.authorization !== -1) {
                headers.authorization = config.authorization || store.state.authorization;
            }
            let requestData;
            if (config['Content-Type']) {
                if (config['Content-Type'].toUpperCase() === 'application/x-www-form-urlencoded;charset=utf-8'.toUpperCase()) {
                    requestData = Qs.stringify(params);
                }
                // application/x-www-form-urlencoded;charset=utf-8
                if (config['Content-Type'].toUpperCase() === 'application/json;charset=utf-8'.toUpperCase()) {
                    requestData = params;
                }
            } else {
                if (Object.keys(params).length <= 3) {
                    // 参数3个及以内，使用application/x-www-form-urlencoded
                    requestData = Qs.stringify(params);
                } else {
                    // 参数大于3个，使用application/json
                    requestData = params;
                }
            }


            let res = await axios({
                method: 'post',
                url: url,
                data: requestData,
                headers: headers,
                responseType: config.responseType || 'json',
            });
            return convertRes(res, config);
        } catch (e) {
            return dealError(e);
        }
    },

    put: async function (url, params, config = {}) {
        try {
            let headers = {};
            if (config && config.authorization !== -1) {
                headers.authorization = config.authorization || store.state.authorization;
            }
            let requestData;
            if (config['Content-Type'] && config['Content-Type'].toUpperCase() === 'application/x-www-form-urlencoded;charset=utf-8'.toUpperCase()) {
                requestData = Qs.stringify(params);
            } else {
                requestData = params;
            }
            let res = await axios({
                method: 'put',
                url: url,
                data: requestData,
                headers: headers,
                responseType: config.responseType || 'json',
            });

            return convertRes(res, config);
        } catch (e) {
            return dealError(e);
        }
    },

    delete: async function (url, params, config = {}) {
        try {
            let headers = {};
            if (config && config.authorization !== -1) {
                headers.authorization = config.authorization || store.state.authorization;
            }

            let res = await axios({
                method: 'get',
                url: url,
                params: params,
                headers: headers,
                responseType: config.responseType || 'json',
            });

            return convertRes(res, config);
        } catch (e) {
            return dealError(e);
        }
    },
};


function convertRes (res, config) {
    if (res.data.code === 200 && res.data.data) {
        // value有 'null'的情况
        if (res.data.data.value && res.data.data.value !== 'null' && !config.notParse) {
            res.data.data.value = parseJSON(res.data.data.value).parseData;
        }
    }

    return new Promise((resolve, reject) => {
        resolve(res.data);
    });
}

let msgArr = [];

/* eslint-disable */
function dealError (err) {
    // console.log('err', err);

    if (err.message) {
        if (err.message.includes('timeout')) {
            setMsg('响应超时!');
        }
    }

    if (err.response) {
        let status = err.response.status;

        // 401 无权限，跳转登录页面
        if (status === 401) {
            router.push({name: 'login'});
        }

        // 400或者500错误
        if (/^[45]\d\d$/.test(status)) {
            // setMsg('服务器异常!')
            setMsg(err.response.data.message);
        }
    }

    return new Promise((resolve, reject) => {
        reject(err);
    });
}

// 重复的错误提示只显示一次
function setMsg (text) {
    if (!msgArr.some(item => item === text)) {
        msgArr.push(text);
        Message(
            {
                type: 'error',
                message: text,
                onClose: () => {
                    msgArr = msgArr.filter(item => item !== text);
                }
            }
        );
    }
}

/* eslint-enable */

function parseJSON (str) {
    if (typeof str === 'string') {
        try {
            let obj = JSON.parse(str);
            if (typeof obj === 'object' && obj) {
                return {
                    isJSON: true,
                    parseData: obj,
                };
            }
        } catch (e) {
            return {
                isJSON: false,
                parseData: str,
            };
        }
    }
}

export default api;
