'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import PageTitle from '../../component/page-title/index.jsx';
import Pagination from '../../component/pagination/index.jsx';

import _xh from '../../util/util.jsx';
import _trading from '../../service/trading.jsx';



class TradingList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            listType: 'list', // list / search
            tradingNumber: '',
            pageNum: 1,
            pages: 0
        };
        this.loadTradingList = this.loadTradingList.bind(this);
        this.onTradingNumberChange = this.onTradingNumberChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onPageNumChange = this.onPageNumChange.bind(this);
    }
    componentDidMount() {
        this.loadTradingList();
    }
    // 加载产品列表
    loadTradingList() {
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum = this.state.pageNum;
        // 按商品名搜索
        if (this.state.listType === 'search') {
            listParam.tradingNo = this.state.tradingNumber;
        }
        // 查询
        _trading.getTradingList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            _xh.errorTips(errMsg);
        });
    }
    // 关键词变化
    onTradingNumberChange(e) {
        let tradingNumber = e.target.value.trim();
        this.setState({
            tradingNumber: tradingNumber
        });
    }
    // 搜索
    onSearch() {
        if (this.state.tradingNumber) {
            // setState是异步的
            this.setState({
                listType: 'search',
                pageNum: 1
            }, () => {
                this.loadTradingList();
            });
        } else {
            // setState是异步的
            this.setState({
                listType: 'list',
                pageNum: 1
            }, () => {
                this.loadTradingList();
            });
        }
    }
    // 页数变化
    onPageNumChange(pageNum) {
        this.setState({
            pageNum: pageNum
        }, () => {
            this.loadTradingList();
        });
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
                                    <option value="tradingNumber">按交易单号查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="交易单号" onChange={this.onTradingNumberChange} />
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>订单号</th>
                                    <th>交换物品</th>
                                    <th>交易人</th>
                                    <th>交易方式</th>
                                    <th>交易时间</th>
                                    {/* <th>操作</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((trading, index) => {
                                        return (
                                            <tr key={trading.tradingId}>
                                                <td>{trading.tradingId}</td>
                                                <td>
                                                    {trading.tradingItems.map(item => {
                                                        return <p key={item.productId}>{item.name}</p>;
                                                    })}
                                                </td>
                                                <td>
                                                    {trading.traders.map(trader => {
                                                        return <p key={trader.id}>{trader.username}</p>;
                                                    })}
                                                </td>
                                                <td>{trading.tradingDesc}</td>
                                                <td>{trading.tradingTime}</td>
                                                {/* <td>
                                                    <Link className="opear" to={'/trading/detail/' + trading.tradingNo}>查看</Link>
                                                </td> */}
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

export default TradingList;