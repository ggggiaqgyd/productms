/**
 * Created by wanghongqing on 2016/6/16.
 */
Ext.define("Productms.view.order.OrderProductView", {
    extend: "Ext.panel.Panel",
    alias: "widget.orderProductView",
    border:false,
    layout:'border',
    items: [{
        region:'north',
        xtype:'northPanelView'
    },{
        region:'center',
        xtype:'orderProductGridView',
        split:true,
        border:true
    }]
});