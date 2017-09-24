/**
 * Created by wanghongqing on 16/4/9.
 */
Ext.define('Productms.store.menu.MenuStore', {
    extend: 'Ext.data.Store',
    model: 'Productms.model.menu.Menu',
    autoLoad:true,
    pageSize:20,
    getMethod: function(){ return 'POST'; },//亮点，设置请求方式,默认为GET
    proxy:{
        type:'ajax',
        api : {
            read : 'menu/getMenuList'
        },
        reader :{
            type:'json',
            root:'root',
            totalProperty:'totalCount'
        },
        limitParam:'pageSize'
    }
});