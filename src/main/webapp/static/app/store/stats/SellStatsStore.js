/**
 * Created by wanghongqing on 2016/7/3.
 */
Ext.define('Productms.store.stats.SellStatsStore', {
    extend: 'Ext.data.Store',
    model: 'Productms.model.orderproduct.OrderProduct',
    autoLoad:false,
    pageSize:1000,
    proxy:{
        type:'ajax',
        api : {
            read : 'order/getOrderProductStatsList',
            create : 'user/addUser',
            update : 'user/UpdateUser',
            destroy : 'user/DeleteUser'
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