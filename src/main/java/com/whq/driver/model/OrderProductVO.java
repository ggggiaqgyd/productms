package com.whq.driver.model;

import java.math.BigDecimal;

/**
 * Created by wanghongqing on 2016/6/22.
 */
public class OrderProductVO extends OrderProduct {
    private BigDecimal basePriceSum;
    private BigDecimal profits;

    public BigDecimal getBasePriceSum() {
        if(null==basePriceSum) {
            BigDecimal basePrice = this.getProduct().getProdBasePrice();
            return basePrice.multiply(new BigDecimal(this.getSellCount()));
        }
        else
            return basePriceSum;
    }

    public void setBasePriceSum(BigDecimal basePriceSum) {
        this.basePriceSum = basePriceSum;
    }

    public BigDecimal getProfits() {
        if(null==profits)
            return this.getOneTypeProductPrice().subtract(getBasePriceSum());
        else
            return profits;
    }

    public void setProfits(BigDecimal profits) {
        this.profits = profits;
    }
}
