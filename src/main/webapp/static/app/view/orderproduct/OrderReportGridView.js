/**
 * Created by wanghongqing on 2016/6/19.
 */
Ext.define("Productms.view.orderproduct.OrderProductStatsGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.orderProductStatsGridView",
    store: "orderproduct.OrderProductStore",
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
        //{header: 'productId', dataIndex: 'productId', hidden: true},
        {header: '订单号', dataIndex: 'orderCode', width: '10%'},
        {header: '商品名称', dataIndex: 'product.prodName',width: '10%'},
        {header: '购买数量', dataIndex: 'sellCount', width: '30%'},
        {header: '购买价格', dataIndex: 'sellPrice', width: '15%'},
        {header: '单品合计', dataIndex: 'oneTypeProductPrice', width: '15%'},
        {
            xtype: 'actioncolumn',
            text:'操作',
            id:'shoppingCasrtHandle',
            width: '10%',
            items: [{
                iconCls : 'add',
                tooltip: '库存加1',
                handler: function(grid, item, index, colIndex, e, record){
                    this.fireEvent('addShoppingCarts', {
                        record: record
                    });
                }
            },{},{
                iconCls : 'delete',
                tooltip: '库存减1',
                handler: function(grid, item, index, colIndex, e, record){
                    this.fireEvent('minsShoppingCart', {
                        record: record
                    });
                }
            },{},{
                iconCls : 'cancel',
                tooltip: '取消该条目',
                handler: function(grid, item, index, colIndex, e, record){
                    this.fireEvent('deleteShoppingCart', {
                        record: record
                    });
                }
            }]
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "orderproduct.OrderProductStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});