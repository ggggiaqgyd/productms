/**
 * Created by wanghongqing on 16/4/16.
 */
Ext.define('Productms.store.product.ProductStore', {
    extend: 'Ext.data.Store',
    model: 'Productms.model.product.Product',
    autoLoad:true,
    pageSize:20,
    proxy:{
        type:'ajax',
        api : {
            read : 'product/getProductList',
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