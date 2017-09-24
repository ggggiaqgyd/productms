package com.whq.web.controller.orderm;

import com.whq.driver.model.OrderM;
import com.whq.driver.model.OrderProduct;
import com.whq.driver.model.Product;
import com.whq.driver.model.User;
import com.whq.service.order.IOrderMService;
import com.whq.service.orderproduct.IOrderProductService;
import com.whq.service.product.IProductService;
import com.whq.web.controller.BaseController;
import com.whq.web.controller.product.ProductController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/12.
 */
@Controller
@RequestMapping(value = "/order")
public class OrderMController extends BaseController{
    private Log logger = LogFactory.getLog(OrderMController.class);
    @Autowired
    private IOrderMService iOrderMService;
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IOrderProductService iOrderProductService;
    @RequestMapping(value = "/saveOrder")
    @ResponseBody
    public Map<String,Object> saveOrder(HttpServletRequest request){
        HashMap<String,Object> map = new HashMap<String, Object>();
        try {
            User user = this.getCurrentUser(request);
            int customerId = 0;
            if(request.getParameter("customerId")!=null||request.getParameter("customerId").length()>0){
                customerId = Integer.parseInt(request.getParameter("customerId"));
            }
            String orderCode = new SimpleDateFormat("yyyyMMddHHmmssSSS") .format(new Date());
            OrderM orderM = new OrderM();
            orderM.setCustomerId(customerId);
            orderM.setOrderStatus(1);
            orderM.setUserid(user.getId());
            orderM.setOrderCode(orderCode);
            orderM.setOrderTime(new Date());
            iOrderMService.saveOrder(orderM);
            map.put("success",true);
            map.put("msg","保存成功!");
            map.put("orderCode",orderCode);
        } catch (Exception e) {
            map.put("success",false);
            map.put("msg","保存失败!");
            e.printStackTrace();
        }
        return map;
    }
    @RequestMapping(value = "/getOrderList")
    @ResponseBody
    public Map<String,Object> getOrderList(OrderM orderM,HttpServletRequest request){
        Map<String,Object> map = null;
        try {
            this.setLimit(orderM, request);
            orderM.setOrderStatus(1);
            map = iOrderMService.getListByOrderTotal(orderM);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }
    @RequestMapping(value = "/delOrder")
    @ResponseBody
    @Transactional
    public Map<String,Object> delOrder(HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        try {
            String orderId = request.getParameter("orderId");
            String orderCode = request.getParameter("orderCode");
            if(null != orderId){
                Integer id = Integer.parseInt(orderId);
                OrderM orderM  = new OrderM();
                orderM.setId(id);
                orderM.setOrderCode(orderCode);
                iOrderMService.deleteOrder(orderM);
            }
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrderCode(orderCode);
            List<OrderProduct> list = iOrderProductService.getListTotal(orderProduct);
            for (OrderProduct op:list){
                Product product = iProductService.selectById(op.getProductId());
                iOrderProductService.orderProductHandle(op,product,"clear");
            }
            map.put("success",true);
            map.put("msg","删除成功");
        } catch (Exception e) {
            logger.error("删除失败",e);
            map.put("success",false);
            map.put("msg","删除失败");
        }
        return map;
    }
    @RequestMapping(value = "/getProductList")
    @ResponseBody
    public Map<String,Object> getProductList(Product product, HttpServletRequest request){
        Map<String,Object> map = null;
        try {
            product.setProdStatus(1);
            this.setOtherCondition(product,request);
            this.setLimit(product, request);
            map = iProductService.getProductByProductByTotal(product);
        } catch (Exception e) {
            logger.error("得到商品列表失败",e);
        }
        return map;
    }
    /**
     * 设置一些其它的条件
     * @param product
     * @param request
     */
    private void setOtherCondition(Product product, HttpServletRequest request) {
        String prodStoreDown = request.getParameter("prodStoreDown");
        String prodStoreUp = request.getParameter("prodStoreUp");
        if(null!=prodStoreDown && prodStoreDown.length()>0){
            product.setPropertiesValue("prodStoreDown",Integer.parseInt(prodStoreDown));
        }
        if(null!=prodStoreUp && prodStoreUp.length()>0){
            product.setPropertiesValue("prodStoreUp",Integer.parseInt(prodStoreUp));
        }
    }
    @RequestMapping(value = "/addToShoppingCarts")
    @ResponseBody
    public Map<String,Object> addToShoppingCarts(HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        String orderCode = request.getParameter("orderCode");
        String _productId = request.getParameter("productId");
        Product product = null;
        try {
            OrderM orderM = iOrderMService.getOrderByCode(orderCode);
            if("2".equals(orderM.getOrderStatus())){
                map.put("success",false);
                map.put("msg","该定单已经完成，请退回到原始页面，重新操作");
                return map;
            }
            if(null!=_productId){
                int productId = Integer.parseInt(_productId);
                product = iProductService.selectById(productId);
            }
            if(product.getProdStore()<=0){
                map.put("success",false);
                map.put("msg","库存不足");
                return map;
            }
            List<OrderProduct> orderProducts = this.getOrderProductList(orderCode,product.getId());
            if(null!=orderProducts && orderProducts.size()>0){
                OrderProduct orderProduct = orderProducts.get(0);
                iOrderProductService.orderProductHandle(orderProduct,product,"add");
                map.put("success",true);
                return map;
            }
            iOrderProductService.addProductToShopcarts(orderCode,product);
            map.put("success",true);
        } catch (Exception e) {
            logger.error("加入购物车失败",e);
            map.put("success",false);
            map.put("msg","程序出错");
        }
        return map;
    }

    private List<OrderProduct> getOrderProductList(String orderCode, Integer productId) {
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrderCode(orderCode);
        orderProduct.setProductId(productId);
        return iOrderProductService.getListTotal(orderProduct);
    }
    @RequestMapping(value = "/getOrderProductList")
    @ResponseBody
    public Map<String,Object> getOrderProductListByTotel(HttpServletRequest request){
        Map<String,Object> map = null;
        String orderCode = request.getParameter("orderCode");
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrderCode(orderCode);
        try {
            map = iOrderProductService.getListMapTotal(orderProduct);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  map;
    }

    @RequestMapping(value = "/shoppingCartsHandle")
    @ResponseBody
    public Map<String,Object> shoppingCartHandle(HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        String _id = request.getParameter("id");
        String type = request.getParameter("type");
        try {
            Integer id = Integer.parseInt(_id);
            OrderProduct orderProduct = iOrderProductService.getOrderProductById(id);
            Product product = iProductService.selectById(orderProduct.getProductId());
            if ("add".equals(type)){
                if(product.getProdStore()<=0){
                    map.put("success",false);
                    map.put("msg","库存不足");
                    return map;
                }
                iOrderProductService.orderProductHandle(orderProduct,product,type);
            }else if("minus".equals(type)){
                if(orderProduct.getSellCount()<=1){
                    map.put("success",false);
                    map.put("msg","最小购买1件");
                    return map;
                }
                iOrderProductService.orderProductHandle(orderProduct,product,type);
            }else if("clear".equals(type)){
                iOrderProductService.orderProductHandle(orderProduct,product,type);
            }
            map.put("success",true);
        } catch (Exception e) {
            logger.error("加入购物车失败",e);
            map.put("success",false);
            map.put("msg","程序出错");
        }
        return map;
    }
    @RequestMapping(value = "/finishOrder")
    @ResponseBody
    public Map<String,Object> finishOrder(HttpServletRequest request){
        Map<String,Object> map = new HashMap<String, Object>();
        String orderId = request.getParameter("orderId");
        Integer id = null;
        if(null!=orderId){
            id = Integer.parseInt(orderId);
        }
        try {
            iOrderMService.finishOrder(id);
            map.put("success",true);
            map.put("msg","操作成功");
        } catch (Exception e) {
            map.put("success",false);
            map.put("msg","程序出错");
        }
        return map;
    }
    @RequestMapping(value = "/getOrderStatsList")
    @ResponseBody
    public Map<String,Object> getOrderStatsList(OrderM orderM,HttpServletRequest request){
        Map<String,Object> map = null;
        try {
            this.setLimit(orderM, request);
            orderM.setOrderStatus(2);
            map = iOrderMService.getListByOrderTotal(orderM);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return map;
    }
    @RequestMapping(value = "/getOrderProductStatsList")
    @ResponseBody
    public Map<String,Object> getOrderProductStatsListByTotel(HttpServletRequest request){
        Map<String,Object> map = null;
        String orderCode = request.getParameter("orderCode");
        String _date = request.getParameter("date");
        Date date = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            if(null!=_date)date = sdf.parse(_date);
            OrderProduct orderProduct = new OrderProduct();
            orderProduct.setOrderCode(orderCode);
            orderProduct.setPropertiesValue("date",date);
            map = iOrderProductService.getListMapTotalForStats(orderProduct);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return  map;
    }
}
