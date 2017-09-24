/**
 * Created by wanghongqing on 16/3/13.
 */
Ext.define('Productms.store.user.UserStore', {
    extend: 'Ext.data.Store',
    model: 'Productms.model.user.User',
    autoLoad:true,
    pageSize:20,
    proxy:{
        type:'ajax',
        api : {
            read : 'user/getUserList',
            create : 'user/addUser',
            update : 'user/UpdateUser',
            destroy : 'user/DeleteUser'
        },
        reader :{
            type:'json',
            root:'root',
            totalProperty:'totalCount'
        },
        limitParam:'pageSize'
    }
 });