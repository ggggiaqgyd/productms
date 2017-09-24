package com.whq.service.order;

import com.whq.common.utils.DataUtils;
import com.whq.driver.dao.OrderMMapper;
import com.whq.driver.model.OrderM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/10.
 */
@Service
public class OrderMServiceImpl implements IOrderMService {
    @Autowired
    private OrderMMapper orderMMapper;

    public Integer saveOrder(OrderM order) {
        return orderMMapper.insert(order);
    }

    public OrderM getOrderByCode(String orderCode) {
        OrderM orderM = new OrderM();
        orderM.setOrderCode(orderCode);
        return orderMMapper.getOrderListTotal(orderM).get(0);
    }

    public Map<String, Object> getListByOrderTotal(OrderM order) {
        List<OrderM> list = orderMMapper.getOrderListTotal(order);
        Integer count = orderMMapper.getOrderCount(order);
        Map<String,Object> map = DataUtils.responseData(list,count);
        return map;
    }
    public void deleteOrder(OrderM orderM) {
        orderMMapper.deleteByPrimaryKey(orderM.getId());
    }

    public void finishOrder(Integer id) {
        OrderM orderM = orderMMapper.selectByPrimaryKey(id);
        orderM.setOrderStatus(2);
        orderMMapper.updateByPrimaryKey(orderM);
    }
}
