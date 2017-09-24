package com.whq.driver.dao;

import com.whq.driver.model.OrderProduct;
import com.whq.driver.model.OrderProductVO;

import java.util.List;

public interface OrderProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderProduct record);

    int insertSelective(OrderProduct record);

    OrderProduct selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(OrderProduct record);

    int updateByPrimaryKey(OrderProduct record);

    List<OrderProduct> getListByTotal(OrderProduct orderProduct);

    Integer getListCount(OrderProduct orderProduct);

    List<OrderProductVO> getListByTotalForStats(OrderProduct orderProduct);
}