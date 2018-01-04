'use strict';

import _xh from '../util/util.jsx';

export default {
    // 获取商品信息
    getProduct(productId) {
        return _xh.request({
            url: _xh.getServerUrl('/manage/product/detail.do'),
            data: {
                productId: productId || 0
            }
        });
    },
    // 获取商品信息
    delProduct(productId) {
        return _xh.request({
            url: _xh.getServerUrl('/manage/product/del.do'),
            data: {
                productId: productId || 0
            },
            method:"POST"
        });
    },
    // 获取商品信息
    getProductList(listParam) {
        if (listParam.listType == 'list') {
            return _xh.request({
                url: _xh.getServerUrl('/manage/product/list.do'),
                data: {
                    pageNum: listParam.pageNum || 1
                }
            });
        }
        else if (listParam.listType == 'search') {
            return _xh.request({
                url: _xh.getServerUrl('/manage/product/search.do'),
                data: listParam
            });
        }
    },
}