'use strict';
import React from 'react';
import ReactDOM from 'react-dom';

import { NavLink } from 'react-router-dom';

function SideNav(props) {
    return (
        <div className="navbar-default sidebar" role="navigation">
            <div className="sidebar-nav navbar-collapse">
                <ul className="nav" id="side-menu">
                    <li>
                        <NavLink to="/home" >
                            <i className="fas fa-list fa-fw"></i>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <a className="category-header">
                            <i className="fas fa-user fa-fw"></i>
                            <span>用户</span>
                        </a>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/user" >用户管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="category-header">
                            <i className="fas fa-archive fa-fw"></i>
                            <span>物品</span>
                        </a>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/product" >物品管理</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <a className="category-header">
                            <i className="fas fa-balance-scale fa-fw"></i>
                            <span>交易</span>
                        </a>
                        <ul className="nav nav-second-level collapse in">
                            <li>
                                <NavLink to="/trading">交易管理</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideNav;