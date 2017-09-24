package com.whq.web.controller.customer;

import com.whq.driver.model.Customer;
import com.whq.service.customer.ICustomerService;
import com.whq.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/6.
 */
@Controller
@RequestMapping(value = "/customer")
public class CustomerController extends BaseController{
    @Autowired
    private ICustomerService iCustomerService;
    @RequestMapping(value = "/getCustomerList")
    @ResponseBody
    public Map<String, Object> getCustomerList(Customer customer,HttpServletRequest request){
        String likeField = request.getParameter("likeField");
        this.setLimit(customer,request);
        customer.putProperties("likeField",likeField);
        return iCustomerService.getCustomerListTotal(customer);
    }
    @RequestMapping(value = "/saveCustomer")
    @ResponseBody
    public Map<String, Object> addCustomer(Customer customer){
        customer.setLevel(1);
        return iCustomerService.addCustomer(customer);
    }
}
