package com.whq.service.product;

import com.whq.common.utils.DataUtils;
import com.whq.driver.dao.DictionaryMapper;
import com.whq.driver.dao.ProductMapper;
import com.whq.driver.model.Dictionary;
import com.whq.driver.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * Created by wanghongqing on 16/5/14.
 */
@Service
public class ProductServiceImpl implements IProductService {
    @Autowired
    private ProductMapper productMapper;
    @Autowired
    private DictionaryMapper dictionaryMapper;
    public void insertProduct(Product product) {
        productMapper.insert(product);
    }

    public Map<String, Object> getProductByProductByTotal(Product product) {
        List<Product> list = this.getProductByProduct(product);
        this.setProdTypeText(list);
        Integer count = this.getCountByProduct(product);
        Map<String,Object> map = DataUtils.responseData(list,count);
        return map;
    }

    private void setProdTypeText(List<Product> list) {
        Dictionary dictionary = new Dictionary();
        dictionary.setFieldName("prod_type");
        List<Dictionary> dictionaries = dictionaryMapper.getDictionaryByRecord(dictionary);
        for (Product product:list){
            for (Dictionary dict : dictionaries){
                if(dict.getDictKey().equals(product.getProdType())){
                    product.setPropertiesValue("prodType",dict.getDictValue());
                }
            }
        }
    }

    /**
     * 编辑用户信息
     * @param reqProduct
     */
    public void editProduct(Product reqProduct) {
        productMapper.updateByPrimaryKey(reqProduct);
    }

    /**
     * 根据用户名，找到用户实体
     * @param prodName
     * @return
     */
    public Product findProductByName(String prodName) {
        return productMapper.selectProductByProductName(prodName);
    }
    /**
     * 保存用户
     * @param reqProduct
     */
    public void saveProduct(Product reqProduct) {
        this.insertProduct(reqProduct);
    }
    /**
     * 保存用户
     * @param ids
     */
    @Transactional
    public void delProducts(List<Integer> ids) {
        for (Integer integer:ids){
            productMapper.deleteByPrimaryKeyUnable(integer);
        }
    }

    /**
     * @param id
     * @return
     */
    public Product selectById(Integer id) {
        return productMapper.selectByPrimaryKey(id);
    }

    /**
     * 根据条件查到商品列表
     * @param product
     * @return
     */
    private Integer getCountByProduct(Product product) {
        return productMapper.getCountByProduct(product);
    }

    /**
     * 根据条件，查询用户总数
     * @param product
     * @return
     */
    private List<Product> getProductByProduct(Product product) {
        return productMapper.selectProductByRecord(product);
    }

}
