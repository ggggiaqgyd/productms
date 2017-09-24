/**
 * Created by wanghongqing on 2016/6/4.
 */
/**
 * Created by wanghongqing on 16/4/16.
 */
Ext.define("Productms.view.order.OrderView", {
    extend: "Ext.panel.Panel",
    alias: "widget.orderView",
    border:false,
    layout:'border',
    items: [{
        region:'center',
        xtype:'orderGridView',
        split:true,
        border:true
    }]
});