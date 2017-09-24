/**
 * Created by wanghongqing on 2016/6/3.
 */
Ext.define('Productms.store.order.OrderStore', {
    extend: 'Ext.data.Store',
    model: 'Productms.model.order.Order',
    autoLoad:true,
    pageSize:20,
    getMethod: function(){ return 'POST'; },//亮点，设置请求方式,默认为GET
    proxy:{
        type:'ajax',
        api : {
            read : 'order/getOrderList'
        },
        reader :{
            type:'json',
            root:'root',
            totalProperty:'totalCount'
        },
        limitParam:'pageSize'
    }
});