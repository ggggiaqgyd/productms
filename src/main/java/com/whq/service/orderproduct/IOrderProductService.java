package com.whq.service.orderproduct;

import com.whq.driver.model.OrderProduct;
import com.whq.driver.model.Product;

import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/19.
 */
public interface IOrderProductService {
    void addProductToShopcarts(String orderCode, Product product);
    List<OrderProduct> getListTotal(OrderProduct orderProduct);
    Map<String,Object> getListMapTotal(OrderProduct orderProduct);
    Map<String,Object> getListMapTotalForStats(OrderProduct orderProduct);
    OrderProduct getOrderProductById(Integer id);
    void orderProductHandle(OrderProduct orderProduct, Product product,String Type);
}
