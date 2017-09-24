/**
 * Created by wanghongqing on 2016/6/16.
 */
Ext.define("Productms.view.order.NorthPanelView", {
    extend: "Ext.panel.Panel",
    alias: "widget.northPanelView",
    border:false,
    layout:'border',
    height:(document.body.clientHeight-30)/2,
    items: [{
        region:'north',
        xtype:'productTempQueryForm'
    },{
        region:'center',
        xtype:'productTempGridView',
        split:true,
        border:true
    }]
});