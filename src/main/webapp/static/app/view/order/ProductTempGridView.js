
Ext.define("Productms.view.order.ProductTempGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.productTempGridView",
    store: "product.ProductStoreForOrder",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'add',
        action:'addProduct',
        text: '新增'
    }, {
        iconCls: 'edit',
        action:'editProduct',
        text: '修改'
    }, {
        action:'delProduct',
        iconCls: 'delete',
        text: '下架'
    }],
    selModel: {
        injectCheckbox: 0,
        mode: "MULTI",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    columns: [
        {header: 'id', dataIndex: 'id', hidden: true},
        {header: '商品名', dataIndex: 'prodName', width: '10%'},
        {header: '售价', dataIndex: 'prodSalePrice', width: '10%'},
        {header: '库存', dataIndex: 'prodStore', width: '30%'},
        {header: '商品编号', dataIndex: 'prodCode', width: '10%'},
        {header: '商品类型', dataIndex: 'properties.prodType',width: '10%'},
        {header: '价格类型', dataIndex: 'prodSalePriceType', width: '20%',
            renderer:function(value){
                if(value==true){
                    return "是";
                }else{
                    return "否";
                }
            }
        } ,
        {
            xtype: 'actioncolumn',
            text:'加入购物车',
            id:'addShoppingCart',
            width: 50,
            items: [{
                iconCls : 'add',
                tooltip: '加入购物车',
                handler: function(grid, item, index, colIndex, e, record){
                    this.fireEvent('editclick', {
                        record: record
                    });
                }
            }]
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "product.ProductStoreForOrder",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});