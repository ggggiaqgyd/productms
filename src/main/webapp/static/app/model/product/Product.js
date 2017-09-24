/**
 * Created by wanghongqing on 16/4/17.
 */
Ext.define('Productms.model.product.Product', {
    extend: 'Ext.data.Model',
    fields: ['id','prodName','prodStatus','prodBasePrice','prodStore','prodCode','imgUrl','prodSalePrice','prodSalePriceType','prodType','oderId','properties.prodType']
});