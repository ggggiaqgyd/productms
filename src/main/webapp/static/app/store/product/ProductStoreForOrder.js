/**
 * Created by wanghongqing on 2016/6/18.
 */
Ext.define('Productms.store.product.ProductStoreForOrder',{
    extend: 'Ext.data.Store',
    model: 'Productms.model.product.Product',
    autoLoad:false,
    pageSize:20,
    proxy:{
        type:'ajax',
        api : {
            read : 'order/getProductList',
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