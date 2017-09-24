package com.whq.service.product;

import com.whq.driver.model.Product;

import java.util.List;
import java.util.Map;

/**
 * 商品类新增
 * Created by wanghongqing on 16/5/14.
 */
public interface IProductService {
    /**
     * 插入商品
     * @param product
     */
    void insertProduct(Product product);

    /**
     * 根据条件查询商品
     * @param product
     * @return
     */
    Map<String,Object> getProductByProductByTotal(Product product);

    /**
     * 编辑用户信息
     * @param reqProduct
     */
    void editProduct(Product reqProduct);

    /**
     * 根据用户名，找到用户
     * @param prodName
     * @return
     */
    Product findProductByName(String prodName);

    /**
     * 保存用户
     * @param reqProduct
     */
    void saveProduct(Product reqProduct);

    /**
     * 根据商品ID 删除商品
     * @param ids
     */
    void delProducts(List<Integer> ids);

    /**
     * 根据ID 查找商品
     * @param id
     * @return
     */
    Product selectById(Integer id);
}
