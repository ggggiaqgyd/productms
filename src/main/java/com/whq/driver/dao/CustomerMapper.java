package com.whq.driver.dao;

import com.whq.driver.model.Customer;
import com.whq.driver.model.Product;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface CustomerMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Customer record);

    int insertSelective(Customer record);

    Customer selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Customer record);

    int updateByPrimaryKey(Customer record);

    List<Product> getCustomerListTotal(Customer customer);

    Integer CustomerTotalCount(Customer customer);
    Customer selectByTelephone(@Param("telephone") String telephone);
}