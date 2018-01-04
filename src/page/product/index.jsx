'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

import PageTitle from '../../component/page-title/index.jsx';
import Pagination from '../../component/pagination/index.jsx';

import _xh from '../../util/util.jsx';
import _product from '../../service/product.jsx';

import './index.scss';

class ProductList extends React.Component {
    constructor(para) {
        super(para);
        this.state = {
            list: [],
            listType: 'list', // list / search
            searchType: 'productId', // productId / productName
            searchKeyword: '',
            pageNum: 1
        };
        this.onKeywordChange = this.onKeywordChange.bind(this);
        this.onPageNumChange = this.onPageNumChange.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSearchTypeChange = this.onSearchTypeChange.bind(this);
        this.onDeleteProduct = this.onDeleteProduct.bind(this);
    }
    componentDidMount() {
        this.loadProductList();
    }
    // 加载产品列表
    loadProductList(pageNum) {
        let listParam = {},
            listType = this.state.listType,
            searchType = this.state.searchType;

        listParam.listType = listType;
        listParam.pageNum = pageNum || this.state.pageNum;
        // 按商品名搜索
        if (listType == 'search' && searchType == "productName") {
            listParam.productName = this.state.searchKeyword;
        }
        // 按商品id搜索
        if (listType == 'search' && searchType == "productId") {
            listParam.productId = this.state.searchKeyword;
        }
        // 查询
        _product.getProductList(listParam).then(res => {
            console.log(res)
            this.setState(res);
        }, err => {
            _xh.errorTips(err.msg || err.statusText);
        });
    }
    // 搜索类型变化
    onSearchTypeChange(e) {
        let searchType = e.target.value;
        this.setState({
            searchType: searchType
        });
    }
    // 关键词变化
    onKeywordChange(e) {
        let keyword = e.target.value;
        this.setState({
            searchKeyword: keyword
        });
    }
    // 搜索
    onSearch() {
        this.setState({
            listType: 'search'
        }, () => {
            this.loadProductList(1);
        });
    }
    // 页数变化
    onPageNumChange(pageNum) {
        this.loadProductList(pageNum);
    }

    onDeleteProduct(productId){
        _product.delProduct(productId).then(res => {
            this.loadProductList(1);
        }, err => {
            _xh.errorTips(err.msg || err.statusText);
        });
    }

    render() {

        return (
            <div id="page-wrapper">
                <PageTitle pageTitle="物品管理" />

                <div className="row">
                    <div className="search-wrap col-lg-12">
                        <div className="form-inline">
                            <div className="form-group">
                                <select className="form-control" onChange={this.onSearchTypeChange}>
                                    <option value="productId">按id查询</option>
                                    <option value="productName">按名称查询</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="关键词" onChange={this.onKeywordChange} />
                            </div>
                            <button type="button" className="btn btn-default" onClick={this.onSearch}>查询</button>
                        </div>
                    </div>
                    <div className="table-wrap col-lg-12">
                        <table className="table table-striped table-bordered table-hover">
                            <thead>
                                <tr>
                                    <th>id</th>
                                    <th>信息</th>
                                    <th>持有人</th>
                                    <th>状态</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.list.length ? this.state.list.map((product, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{product.id}</td>
                                                <td>
                                                    <p>{product.name}</p>
                                                    <p>{product.subtitle}</p>
                                                </td>
                                                <td>{product.userName}</td>
                                                <td>{product.statusDecs}</td>
                                                <td>
                                                    {/* <Link className="btn btn-primary btn-sm opera" to={'/product/detail/' + product.id}>查看</Link> */}
                                                    <a className="btn btn-danger btn-sm opera" onClick={this.onDeleteProduct.bind(this,product.id)}>删除</a>
                                                </td>
                                            </tr>
                                        );
                                    }) :
                                        (
                                            <tr>
                                                <td colSpan="5" className="text-center">暂无结果~</td>
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

export default ProductList;
