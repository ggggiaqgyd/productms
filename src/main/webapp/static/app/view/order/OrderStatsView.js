/**
 * Created by wanghongqing on 2016/6/21.
 */
Ext.define("Productms.view.order.OrderStatsView", {
    extend: "Ext.panel.Panel",
    alias: "widget.orderStatsView",
    border:false,
    layout:'border',
    items: [{
        region:'center',
        xtype:'orderStatsGridView',
        split:true,
        border:true
    }]
});