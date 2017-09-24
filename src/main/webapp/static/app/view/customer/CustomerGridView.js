/**
 * Created by wanghongqing on 16/4/16.
 */
Ext.define("Productms.view.customer.CustomerGridView", {
    extend: "Ext.grid.Panel",
    alias: "widget.customerGridView",
    store: "customer.CustomerStore",
    viewConfig: {
        loadMask: true
    },
    tbar: [{
        iconCls: 'add',
        action:'addCustomer',
        text: '新建客户'
    },{
        iconCls: 'Anchor',
        action:'openCustomerTemp',
        text: '临时客户'
    }],
    selModel: {
        injectCheckbox: 0,
        mode: "MULTI",     //"SINGLE"/"SIMPLE"/"MULTI"
        checkOnly: true     //只能通过checkbox选择
    },
    selType: "checkboxmodel",
    fields: ['id','customName','telephone','level'],
    columns: [
        {header: 'id', dataIndex: 'id', hidden: true},
        {header: '客户名', dataIndex: 'customName', width: '30%'},
        {header: '电话号', dataIndex: 'telephone', width: '30%'},
        {header: '用户等级', dataIndex: 'level', width: '20%'}
    ],
    bbar: {
        xtype: 'pagingtoolbar',
        store: "customer.CustomerStore",
        displayInfo: true,
        displayMsg: '显示 {0} - {1} 条，共计 {2} 条',
        emptyMsg: '无数据'
    }
});
