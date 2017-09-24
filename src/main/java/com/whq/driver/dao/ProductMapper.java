package com.whq.driver.dao;

import com.whq.driver.model.Product;

import java.util.List;

public interface ProductMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(Product record);

    int insertSelective(Product record);

    Product selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Product record);

    int updateByPrimaryKey(Product record);

    /**
     * 根据条件得到商品列表
     * @param record
     * @return
     */
    List<Product> selectProductByRecord(Product record);

    /**
     * 根据实体条件 得到总数
     * @param product
     * @return
     */
    Integer getCountByProduct(Product product);

    Product selectProductByProductName(String prodName);

    /**
     * 将商品状态置为不可用
     * @param integer
     */
    void deleteByPrimaryKeyUnable(Integer integer);
}