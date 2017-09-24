/**
 * Created by wanghongqing on 2016/6/4.
 */
Ext.define("Productms.view.customer.CustomerOrderView", {
    extend: "Ext.panel.Panel",
    alias: "widget.customerOrderView",
    border:false,
    layout:'border',
    // requires:['CustomerQueryForm','CustomerGridView'],
    items: [{
        region:'north',
        xtype:'customerQueryForm',
    },{
        region:'center',
        xtype:'customerGridView',
        split:true,
        border:true
    }]
});