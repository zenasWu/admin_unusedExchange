'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import PageTitle from '../../component/page-title/index.jsx';
import Pagination from '../../component/pagination/index.jsx';

import _xh from '../../util/util.jsx';
import _user from '../../service/user.jsx';



class UserList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listType: 'list', // list / search
            userNumber: '',
            pageNum: 1,
            pages: 0
        };
        this.loadUserList = this.loadUserList.bind(this);
        this.onTradingNumberChange = this.onTradingNumberChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onPageNumChange = this.onPageNumChange.bind(this);
        this.onBan = this.onBan.bind(this);
    }
    componentDidMount() {
        this.loadUserList();
    }
    // 加载产品列表
    loadUserList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 按商品名搜索
        if (this.state.listType === 'search') {
            listParam.id = this.state.userNumber;
        }
        // 查询
        _user.getUserList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _xh.errorTips(errMsg);
        });
    }
    // 关键词变化
    onTradingNumberChange(e) {
        let userNumber = e.target.value.trim();
        this.setState({
            userNumber: userNumber
        });
    }
    // 搜索
    onSearch() {
        if (this.state.userNumber) {
            // setState是异步的
            this.setState({
                listType: 'search',
                pageNum: 1
            }, () => {
                this.loadUserList();
            });
        } else {
            // setState是异步的
            this.setState({
                listType: 'list',
                pageNum: 1
            }, () => {
                this.loadUserList();
            });
        }
    }
    // 页数变化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadUserList();
        });
    }
    onBan(userId) {
        _user.ban(this.setState.userNumber).then(res => {
            this.loadUserList(res);
        }, errMsg => {
            _xh.errorTips(errMsg);
        })
    }

    render() {
        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="交易管理" />
                <div className="row">
                    <div className="search-wrap col-lg-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control">
                                    <option value="userNumber">按Id查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="ID号" onChange={this.onTradingNumberChange} />
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>名字</th>
                                    <th>邮箱</th>
                                    <th>手机</th>
                                    <th>信誉</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{user.id}</td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td>{user.credit}</td>
                                                <td>
                                                    <a className="opear btn btn-danger" onClick={this.onBan.bind(this, user.id)}>封禁</a>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                        (
                                            <tr>
                                                <td colSpan="6" className="text-center">没有找到相应结果~</td>
                                            </tr>
                                        )
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        this.state.pages > 1 ? <Pagination onChange={this.onPageNumChange}
                            current={this.state.pageNum}
                            total={this.state.total}
                            showLessItems /> : null
                    }
                </div>
            </div>
        );
    }
};

export default UserList;