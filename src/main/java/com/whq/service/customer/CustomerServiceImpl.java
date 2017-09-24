package com.whq.service.customer;

import com.whq.common.utils.DataUtils;
import com.whq.driver.dao.CustomerMapper;
import com.whq.driver.model.Customer;
import com.whq.driver.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/10.
 */
@Service
public class CustomerServiceImpl implements  ICustomerService {
    @Autowired
    private CustomerMapper customerMapper;
    public Map<String, Object> getCustomerListTotal(Customer customer) {
        List<Product> list = customerMapper.getCustomerListTotal(customer);
        Integer count = customerMapper.CustomerTotalCount(customer);
        Map<String,Object> map = DataUtils.responseData(list,count);
        return map;
    }

    public Map<String, Object> addCustomer(Customer customer) {
        Map<String, Object> map = new HashMap<String, Object>();
        Customer oldCustomer = customerMapper.selectByTelephone(customer.getTelephone());
        if(null != oldCustomer){
            map.put("success","false");
            map.put("msg","该用户电话号码已经存在");
            return map;
        }
        customerMapper.insert(customer);
        map.put("success","true");
        map.put("msg","新增客户成功");
        return map;
    }
}
