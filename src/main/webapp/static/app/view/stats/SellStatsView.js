/**
 * Created by wanghongqing on 2016/7/3.
 */
Ext.define("Productms.view.stats.SellStatsView", {
    extend: "Ext.grid.Panel",
    alias: "widget.sellStatsView",
    store: "stats.SellStatsStore",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'find',
        action:'selectDate',
        text: '选择日期'
    }],
    selModel: {
        injectCheckbox: 0,
        mode: "MULTI",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    //fields: ['id','orderCode','productId','sellPrice','sellCount']
    columns: [
        {header: 'id', dataIndex: 'id', hidden: true},
        {header: 'productId', dataIndex: 'productId', hidden: true},
        {header: '订单号', dataIndex: 'orderCode', width: '20%'},
        {header: '商品名称', dataIndex: 'product.prodName',width: '10%'},
        {header: '购买数量', dataIndex: 'sellCount', width: '8%'},
        {header: '售价', dataIndex: 'sellPrice', width: '15%'},
        {header: '售价和', dataIndex: 'oneTypeProductPrice', width: '15%'},
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "stats.SellStatsStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});