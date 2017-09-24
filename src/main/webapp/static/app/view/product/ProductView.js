/**
 * Created by wanghongqing on 16/4/16.
 */
Ext.define("Productms.view.product.ProductView", {
    extend: "Ext.panel.Panel",
    alias: "widget.productView",
    border:false,
    layout:'border',
    items: [{
        region:'north',
        xtype:'productQueryForm',
    },{
        region:'center',
        xtype:'productGridView',
        split:true,
        border:true
    }]
});