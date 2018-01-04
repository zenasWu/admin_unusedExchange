'use strict';
import * as $ from "jquery";
const conf = {
    serverHost: '',
    imageHost: '',
}

var _util = {
    request(param) {
        return new Promise((resolve, reject) => {
            
            $.ajax({
                type: param.method || 'get',
                url: param.url || '',
                // contentType:para.contentType||'application/json; charset=utf-8',
                dataType: param.type || "json",
                data: param.data || null,
                success: res => {
                    // 数据成功
                    if (0 === res.status) {
                        typeof resolve === 'function' && resolve(res.data || res.msg);
                    }
                    // 没登录状态, 且强制登录, 自动跳转到登录页
                    else if (res.status === 10) {
                        this.doLogin();
                    }
                    // 其他状态，调用error
                    else {
                        typeof reject === 'function' && reject(res.msg || res.data);
                    }
                },
                error: err => {
                    typeof reject === 'function' && reject(err.statusText);
                }
            });
        });
    },
    doLogin(){
        window.location.href = '#/login?redirect=' + encodeURIComponent(window.location.hash);
    },

    //获取服务器地址
    getServerUrl(path) {
        return conf.serverHost + path;
    },
    //获取图片地址
    getImageUrl(path) {
        return conf.imageHost + path;
    },
    //获取URL参数
    getParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            queryString = window.location.href.split('?')[1] || '',
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    
    // 提示
    successTips(msg) {
        alert(msg);
    },
    errorTips: function (msg) {
        alert(msg);
    },

    //本地存储
    setStorage(name, data){
        // array / json
        if(typeof data === 'object'){
            let jsonString = JSON.stringify(data);
            window.localStorage.setItem(name, jsonString);
        }
        // number / string / boolean
        else if(typeof data === 'number' || typeof data === 'string' || typeof data === 'boolean'){
            window.localStorage.setItem(name, jsonString);
        }
        // undefined / function
        else{
            alert('该数据类型不能用于本地存储');
        }
    },
    // 从本地存储获取数据
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            // JSON.parse
            return JSON.parse(data);
        }else{
            return '';
        }
    },
    // 删除本地存储
    removeStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default _util;