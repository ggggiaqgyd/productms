/**
 * Created by wanghongqing on 2016/6/4.
 */
Ext.define('Productms.store.customer.CustomerStore', {
    extend: 'Ext.data.Store',
    model: 'Productms.model.customer.Customer',
    pageSize:20,
    getMethod: function(){ return 'POST'; },//亮点，设置请求方式,默认为GET
    proxy:{
        type:'ajax',
        api : {
            read : 'customer/getCustomerList'
        },
        getMethod: function(){ return 'POST'; },//
        reader :{
            type:'json',
            root:'root',
            totalProperty:'totalCount'
        },
        limitParam:'pageSize'
    }
});