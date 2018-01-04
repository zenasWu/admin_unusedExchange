'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import { Route, BrowserRouter, Link, Switch } from 'react-router-dom';

import "node_modules/bootstrap/dist/css/bootstrap.min.css";
import "node_modules/bootstrap/dist/js/bootstrap.min.js";
import "./lib/fontawsome/css/fontawesome-all.min.css";
import "node_modules/sb-admin-2/dist/css/sb-admin-2.min.css";
import "node_modules/sb-admin-2/dist/js/sb-admin-2.min.js";

import Layout from './page/layout/index.jsx';
import Login from './page/login/index.jsx';
import Home from './page/home/index.jsx';
import ProductList from './page/product/index.jsx';
import TradingList from './page/trading/index.jsx';
import UserList from './page/user/index.jsx';


const contentRoutes = [
    {
        path: '/',
        exact: true,
        component: Home,
    },
    {
        path: '/home',
        exact: false,
        component: Home
    },
    {
        path: '/product',
        exact: false,
        component: ProductList
    },
    {
        path: '/trading',
        exact: false,
        component: TradingList
    },
    {
        path: '/user',
        exact: false,
        component: UserList
    },
]
const ContentRoute = ({ component: Component, exact, path }) => (
    <Route exact={exact} path={path} render={props => (
        <Layout>
            <Component {...props} />
        </Layout>
    )} />
)

ReactDom.render(
    <BrowserRouter>
        <Switch>
            <Route path='/login' component={Login} />
            {
                contentRoutes.map((route,index) => {
                    return <ContentRoute path={route.path} component={route.component} exact={route.exact} key={index}/>;
                })
            }
        </Switch>
    </BrowserRouter>,
    document.getElementById('app')
)