package com.whq.service.order;

import com.whq.driver.model.OrderM;

import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/10.
 */
public interface IOrderMService {
    Integer saveOrder(OrderM order);
    OrderM getOrderByCode(String orderCode);
    Map<String,Object> getListByOrderTotal(OrderM order);
    void deleteOrder(OrderM orderM);
    void finishOrder(Integer id);
}
