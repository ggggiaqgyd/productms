package com.whq.service.product;

import com.whq.driver.model.Product;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 16/5/14.
 */
@RunWith(SpringJUnit4ClassRunner.class) // 整合
@ContextConfiguration(locations="classpath:config/spring-mybatis.xml") // 加载配置
public class TestProductService {
    @Autowired
    private IProductService iProductService;

    @Test
    public void testInsert(){
        for (int i = 0; i <30 ; i++) {
            Product product = new Product();
            product.setProdName("狗粮阳"+i);
            product.setImgUrl("http://slkdfjlsdfj"+i);
            product.setProdSalePrice(new BigDecimal(i));
            product.setProdStatus(1);
            product.setProdStore(i);
            product.setProdSalePriceType(2);
            iProductService.insertProduct(product);
        }

    }
    @Test
    public void testSelect(){
        Product product = new Product();
        product.setProdName("狗粮阳");
        product.setImgUrl("http://slkdfjlsdfj");
        product.setProdSalePrice(new BigDecimal(20));
        product.setProdStatus(1);
        product.setProdStore(20);
        product.setProdSalePriceType(2);
        Map<String,Object> map  = iProductService.getProductByProductByTotal(product);
        System.out.println(map);
    }

}
