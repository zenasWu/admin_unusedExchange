'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import _xh from '../../util/util.jsx';
import _user from '../../service/user.jsx';


class Login extends React.Component{
    constructor(param) {
        super(param);
        this.state =  {
            username: '',
            password: '',
            redirect: _xh.getParam('redirect')
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }
    // 点击登录
    onLogin(e) {
        e.preventDefault();
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        },
            checkLogin = _user.checkLoginInfo(loginInfo);
        if (checkLogin.state) {
            // 登录成功后进行跳转
            _user.login(loginInfo).then(res => {
                _xh.setStorage('userInfo', res);
                window.location.href = this.state.redirect || '/home';
            }, errMsg => {
                _xh.errorTips(errMsg);
            });
        } else {
            _xh.errorTips(checkLogin.msg);
        }
    }
    // 输入框内容变化时，更新state中的字段
    onInputChange(e) {
        let ele = e.target,
            inputValue = e.target.value,
            inputName = e.target.name;
        this.setState({
            [inputName]: inputValue
        });
    }
    render() {
        return (
            <div className="row">
                <div className="col-md-4 col-md-offset-4">
                    <div className="login-panel panel panel-default">
                        <div className="panel-heading">
                            <h3 className="panel-title">请登录</h3>
                        </div>
                        <div className="panel-body">
                            <form role="form" onSubmit={this.onLogin}>
                                <div className="form-group">
                                    <input className="form-control"
                                        placeholder="User Name"
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                        autoFocus
                                        onChange={this.onInputChange} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control"
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        onChange={this.onInputChange} />
                                </div>
                                <button type="submit" className="btn btn-lg btn-primary btn-block">Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Login;