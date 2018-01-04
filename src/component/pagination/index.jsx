'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import RcPagination from 'rc-pagination';

import './index.scss';

// 通用分页组件
function Pagination(props) {
    return (
        <RcPagination {...props} />
    )
};

export default Pagination;