'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import _xh from '../../util/util.jsx';
import _user from '../../service/user.jsx';


class TopNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userName: ''
        }
    }
 
    componentDidMount() {
        let userInfo = _xh.getStorage('userInfo');
        if (userInfo) {
            this.setState({
                userName: userInfo.username || ''
            });
        }
    }
    onLogout() {
        _user.logout().then(res => {
            window.location.href = '/login';
        }, errMsg => {
            _xh.errorTips(errMsg);
        });
    }
    render() {
        return (
            <div>
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/">xuanhuan ADMIN</a>
                </div>
                <ul className="nav navbar-top-links navbar-right">
                    <li className="dropDown">
                        {
                            this.state.userName ?
                                <span>欢迎，{this.state.userName}</span> :
                                <span>欢迎</span>
                        }
                    </li>
                    <li className="dropDown">
                        <a className="btn-logout" onClick={this.onLogout}>退出</a>
                    </li>
                </ul>
            </div>
        );
    }
};

export default TopNav;