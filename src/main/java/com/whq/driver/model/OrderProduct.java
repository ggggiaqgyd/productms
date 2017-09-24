package com.whq.driver.model;

import java.math.BigDecimal;

public class OrderProduct extends BaseModel{
    private Integer id;

    private String orderCode;

    private Integer productId;

    private BigDecimal sellPrice;

    private Integer sellCount;

    private Product product;

    private BigDecimal oneTypeProductPrice;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getOrderCode() {
        return orderCode;
    }

    public void setOrderCode(String orderCode) {
        this.orderCode = orderCode == null ? null : orderCode.trim();
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public BigDecimal getSellPrice() {
        return sellPrice;
    }

    public void setSellPrice(BigDecimal sellPrice) {
        this.sellPrice = sellPrice;
    }

    public Integer getSellCount() {
        return sellCount;
    }

    public void setSellCount(Integer sellCount) {
        this.sellCount = sellCount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public BigDecimal getOneTypeProductPrice() {
        if(null==oneTypeProductPrice)
            return this.getSellPrice().multiply(new BigDecimal(this.sellCount));
        else
            return oneTypeProductPrice;
    }

    public void setOneTypeProductPrice(BigDecimal oneTypeProductPrice) {
        this.oneTypeProductPrice = oneTypeProductPrice;
    }
}