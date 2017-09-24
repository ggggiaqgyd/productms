/**
 * Created by wanghongqing on 2016/6/4.
 */
Ext.define('Productms.model.customer.Customer', {
    extend: 'Ext.data.Model',
    fields: ['id','customName','telephone','level','userId','properties.likeField']
});
