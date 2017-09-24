/**
 * Created by wanghongqing on 16/4/16.
 */
Ext.define("Productms.view.product.ProductGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.productGridView",
    store: "product.ProductStore",
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
        {header: '商品状态', dataIndex: 'prodStatus', width: '10%',
            renderer:function(value){
                if(value==1){
                    return "上架";
                }else{
                    return "下架";
                }
            }
        }
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "product.ProductStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});