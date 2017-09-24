/**
 * Created by wanghongqing on 2016/6/19.
 */
Ext.define('Productms.model.orderproduct.OrderProduct', {
    extend: 'Ext.data.Model',
    fields: ['id','orderCode','productId','sellPrice','sellCount','product.prodName','oneTypeProductPrice','basePriceSum','profits','product.prodBasePrice']
});