/**
 * Created by wanghongqing on 2016/6/3.
 */
Ext.define('Productms.model.order.Order', {
    extend: 'Ext.data.Model',
    fields: ['id','orderCode','orderName','orderTime','orderStatus','customerId','customer.customName','customer.telephone','customer.level']
});