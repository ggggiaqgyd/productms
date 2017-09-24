/**
 * Created by wanghongqing on 2016/6/19.
 */
Ext.define("Productms.view.orderproduct.OrderProductStatsGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.orderProductStatsGridView",
    store: "orderproduct.OrderProductStatsStore",
    viewConfig: {
        loadMask: true
    },
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
        {header: '订单号', dataIndex: 'orderCode', width: '10%'},
        {header: '商品名称', dataIndex: 'product.prodName',width: '10%'},
        {header: '购买数量', dataIndex: 'sellCount', width: '8%'},
        {header: '进价', dataIndex: 'product.prodBasePrice', width: '15%'},
        {header: '售价', dataIndex: 'sellPrice', width: '15%'},
        {header: '进价和', dataIndex: 'basePriceSum', width: '15%'},
        {header: '售价和', dataIndex: 'oneTypeProductPrice', width: '15%'},
        {header: '利润', dataIndex: 'profits', width: '15%'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "orderproduct.OrderProductStatsStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});