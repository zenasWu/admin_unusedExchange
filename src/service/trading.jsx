'use strict';

import _xh from '../util/util.jsx';

export default {
    //获取列表
    getTradingList(listParam) {
        if (listParam.listType == 'list') {
            return _xh.request({
                url: _xh.getServerUrl('/manage/trading/list.do'),
                data: {
                    pageNum: listParam.pageNum || 1
                }
            });
        }
        else if (listParam.listType == 'search') {
            return _xh.request({
                url: _xh.getServerUrl('/manage/trading/search.do'),
                data: listParam
            });
        }
    },
    // 获取订单详情
    getTradingDetail(orderNo) {
        return _xh.request({
            url: _xh.getServerUrl('/manage/trading/detail.do'),
            data: {
                orderNo: orderNo || 0
            }
        });
    }
}