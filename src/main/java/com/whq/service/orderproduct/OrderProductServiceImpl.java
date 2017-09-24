package com.whq.service.orderproduct;

import com.whq.common.utils.DataUtils;
import com.whq.driver.dao.OrderProductMapper;
import com.whq.driver.dao.ProductMapper;
import com.whq.driver.model.OrderProduct;
import com.whq.driver.model.OrderProductVO;
import com.whq.driver.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 2016/6/19.
 */
@Service
public class OrderProductServiceImpl implements IOrderProductService {
    @Autowired
    private OrderProductMapper orderProductMapper;
    @Autowired
    private ProductMapper productMapper;
    /**
     * @param orderCode
     * @param product
     */
    @Transactional
    public void addProductToShopcarts(String orderCode, Product product) {
        OrderProduct orderProduct = new OrderProduct();
        orderProduct.setOrderCode(orderCode);
        orderProduct.setProductId(product.getId());
        orderProduct.setSellCount(1);
        orderProduct.setSellPrice(product.getProdSalePrice());
        orderProductMapper.insert(orderProduct);
        product.setProdStore((product.getProdStore()-1));
        productMapper.updateByPrimaryKey(product);
    }

    public List<OrderProduct> getListTotal(OrderProduct orderProduct) {
        return orderProductMapper.getListByTotal(orderProduct);
    }

    public Map<String, Object> getListMapTotal(OrderProduct orderProduct) {
        List<OrderProduct> list = orderProductMapper.getListByTotal(orderProduct);
        Map<String, Object> map = DataUtils.responseData(list,1000);
        return map;
    }
    public Map<String, Object> getListMapTotalForStats(OrderProduct orderProduct) {
        List<OrderProductVO> list = orderProductMapper.getListByTotalForStats(orderProduct);
        BigDecimal basePriceSums = null;
        BigDecimal oneTypeProductPrice = null;
        BigDecimal profitses = null;

        for(OrderProductVO orderProductVO:list){
            if(null==basePriceSums)
                basePriceSums=orderProductVO.getBasePriceSum();
            else
                basePriceSums = basePriceSums.add(orderProductVO.getBasePriceSum());

            if(null==oneTypeProductPrice)
                oneTypeProductPrice=orderProductVO.getOneTypeProductPrice();
            else
                oneTypeProductPrice = oneTypeProductPrice.add(orderProductVO.getOneTypeProductPrice());

            if(null==profitses)
                profitses=orderProductVO.getProfits();
            else
                profitses = profitses.add(orderProductVO.getProfits());
        }
        OrderProductVO orderProductVO = new OrderProductVO();
        orderProductVO.setBasePriceSum(basePriceSums);
        orderProductVO.setOneTypeProductPrice(oneTypeProductPrice);
        orderProductVO.setProfits(profitses);
        list.add(orderProductVO);
        Map<String, Object> map = DataUtils.responseData(list,1000);
        return map;
    }
    public OrderProduct getOrderProductById(Integer id) {
        return orderProductMapper.selectByPrimaryKey(id);
    }

    @Transactional
    public void orderProductHandle(OrderProduct orderProduct, Product product,String type) {
        if ("add".equals(type)){
            product.setProdStore((product.getProdStore()-1));
            orderProduct.setSellCount((orderProduct.getSellCount()+1));
            orderProductMapper.updateByPrimaryKey(orderProduct);
        }else if("minus".equals(type)){
            product.setProdStore((product.getProdStore()+1));
            orderProduct.setSellCount((orderProduct.getSellCount()-1));
            orderProductMapper.updateByPrimaryKey(orderProduct);
        }else if("clear".equals(type)){
            product.setProdStore((product.getProdStore()+orderProduct.getSellCount()));
            orderProductMapper.deleteByPrimaryKey(orderProduct.getId());
        }
        productMapper.updateByPrimaryKey(product);
    }
}
