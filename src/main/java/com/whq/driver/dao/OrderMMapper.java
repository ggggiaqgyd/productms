package com.whq.driver.dao;

import com.whq.driver.model.OrderM;

import java.util.List;

public interface OrderMMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderM record);

    int insertSelective(OrderM record);

    OrderM selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrderM record);

    int updateByPrimaryKey(OrderM record);

    List<OrderM> getOrderListTotal(OrderM orderM);

    Integer getOrderCount(OrderM orderM);
}