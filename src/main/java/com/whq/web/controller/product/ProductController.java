package com.whq.web.controller.product;

import com.whq.common.utils.DataUtils;
import com.whq.driver.model.Product;
import com.whq.service.dictionary.IDictionaryService;
import com.whq.service.product.IProductService;
import com.whq.web.controller.BaseController;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 商品的主控制器
 * Created by wanghongqing on 16/5/14.
 */
@Controller
@RequestMapping(value = "/product")
public class ProductController extends BaseController{
    private Log logger = LogFactory.getLog(ProductController.class);
    @Autowired
    private IProductService iProductService;

    /**
     * 获取商品列表
     * @param product
     * @param request
     * @return
     */
    @RequestMapping(value = "/getProductList")
    @ResponseBody
    public Map<String,Object> getProductList(Product product, HttpServletRequest request){
        Map<String,Object> map = null;
        try {
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

    @RequestMapping("/saveProduct")
    @ResponseBody
    public Map<String, Object> saveProduct(Product reqProduct){
        HashMap<String, Object> map = new HashMap<String, Object>();
        try {
            if (reqProduct.getId() != null) {
                reqProduct.setProdStatus(1);
                iProductService.editProduct(reqProduct);
                map.put("success", true);
                map.put("msg", "保存成功!");
                return map;
            }

            Product Product = iProductService.findProductByName(reqProduct.getProdName());
            if (null != Product) {
                map.put("success", false);
                map.put("msg", "用户已存在!");
                return map;
            }
            reqProduct.setProdStatus(1);
            iProductService.saveProduct(reqProduct);
            map.put("success", true);
            map.put("msg", "保存成功!");
        } catch (Exception e) {
            logger.error("保存商品出错",e);
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
        }
        return map;
    }

    @RequestMapping("/delProduct")
    @ResponseBody
    public Map<String, Object> delProduct(HttpServletRequest request) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        try {
            String productIds = request.getParameter("productIds");
            if (null == productIds || productIds.length() == 0) {
                map.put("success", false);
                map.put("msg", "没有获取到数据");
                return map;
            }
            List<Integer> ids = DataUtils.converIds(productIds);
            iProductService.delProducts(ids);
            map.put("success", true);
            map.put("msg", "下架成功!");
        } catch (Exception e) {
            logger.error("删除商品出错",e);
            map.put("success",false);
            map.put("msg","程序出错,请联系管理员");
        }
        return map;
    }
    @RequestMapping("/getProductType")
    public Map<String,Object> getProductType(){
        HashMap<String, Object> map = new HashMap<String, Object>();
        return null;
    }
}
