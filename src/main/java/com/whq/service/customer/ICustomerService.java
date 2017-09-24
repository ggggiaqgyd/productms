package com.whq.service.customer;

import com.whq.driver.model.Customer;

import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/10.
 */
public interface ICustomerService {
    /**
     * 根据一个客户条件，得到一个客户列表
     * @param customer
     * @return
     */
    Map<String,Object> getCustomerListTotal(Customer customer);

    /**
     * 插入一个新的客户
     * @param customer
     */
    Map<String, Object> addCustomer(Customer customer);

}
