package com.whq.driver.model;

import java.math.BigDecimal;

public class Product extends BaseModel{
    private Integer id;

    private String prodName;    //商品名

    private Integer prodStatus;    //商品状态 0,上架 1,下架

    private BigDecimal prodBasePrice;   //进价

    private Integer prodStore;      //库存

    private String prodCode;        //商品编码

    private String imgUrl;          //图片地址

    private BigDecimal prodSalePrice;   //卖价

    private Integer prodSalePriceType;  //价格类型 预留..

    private Integer prodType; //商品类型

    private Integer oderId; //展示排序

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getProdName() {
        return prodName;
    }

    public void setProdName(String prodName) {
        this.prodName = prodName == null ? null : prodName.trim();
    }

    public Integer getProdStatus() {
        return prodStatus;
    }

    public void setProdStatus(Integer prodStatus) {
        this.prodStatus = prodStatus;
    }

    public BigDecimal getProdBasePrice() {
        return prodBasePrice;
    }

    public void setProdBasePrice(BigDecimal prodBasePrice) {
        this.prodBasePrice = prodBasePrice;
    }

    public Integer getProdStore() {
        return prodStore;
    }

    public void setProdStore(Integer prodStore) {
        this.prodStore = prodStore;
    }

    public String getProdCode() {
        return prodCode;
    }

    public void setProdCode(String prodCode) {
        this.prodCode = prodCode == null ? null : prodCode.trim();
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl == null ? null : imgUrl.trim();
    }

    public BigDecimal getProdSalePrice() {
        return prodSalePrice;
    }

    public void setProdSalePrice(BigDecimal prodSalePrice) {
        this.prodSalePrice = prodSalePrice;
    }

    public Integer getProdSalePriceType() {
        return prodSalePriceType;
    }

    public void setProdSalePriceType(Integer prodSalePriceType) {
        this.prodSalePriceType = prodSalePriceType;
    }

    public Integer getProdType() {
        return prodType;
    }

    public void setProdType(Integer prodType) {
        this.prodType = prodType;
    }

    public Integer getOderId() {
        return oderId;
    }

    public void setOderId(Integer oderId) {
        this.oderId = oderId;
    }
}