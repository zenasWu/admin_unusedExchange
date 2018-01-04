'use strict';

import _xh from '../util/util.jsx';

export default {
    // 检查用于登录的信息是否合法
    checkLoginInfo(userInfo) {
        if (!userInfo.username) {
            return {
                state: false,
                msg: '用户名不能为空'
            }
        }
        if (!userInfo.password) {
            return {
                state: false,
                msg: '密码不能为空'
            }
        }
        return {
            state: true,
            msg: '验证通过'
        }
    },
    // 登录
    login(userInfo) {
        return _xh.request({
            url: _xh.getServerUrl('/manage/user/login.do'),
            method: 'POST',
            data: {
                username: userInfo.username || '',
                password: userInfo.password || ''
            }
        });
    },
    // 退出登录
    logout() {
        return _xh.request({
            url: _xh.getServerUrl('/user/logout.do'),
            method: 'POST',
        });
    },

    ban(userId) {
        return _xh.request({
            url: _xh.getServerUrl('/manage/user/ban.do'),
            method: 'POST',
            data: {
                id: userId || '',
            }
        })
    },

    getUserList(listParam) {
        if (listParam.listType == 'list') {
            return _xh.request({
                url: _xh.getServerUrl('/manage/user/list.do'),
                data: {
                    pageNum: listParam.pageNum || 1
                }
            });
        }
        else if (listParam.listType == 'search') {
            return _xh.request({
                url: _xh.getServerUrl('/manage/user/search.do'),
                data: listParam
            });
        }
    },
}